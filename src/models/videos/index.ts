import { createStore, createEffect, createEvent, StoreValue, sample } from "effector";
import { debug } from "patronum";
import { $currentSubs, $subs } from "../subs";
import { TMoveDirection } from "../types";
import { moveVideoToTime } from "@src/utils/moveVideoToTime";
import { $streaming, fetchCurrentStreamingFx } from "../streamings";

const TIME_SEEK_TIME = 5000;

export const $video = createStore<HTMLVideoElement | null>(null);
export const getCurrentVideoFx = createEffect<void, HTMLVideoElement>(() => document.querySelector("video"));
export const videoTimeUpdate = createEvent<void>();

export const $wasPaused = createStore<boolean>(false);
export const wasPausedChanged = createEvent<boolean>();
$wasPaused.on(wasPausedChanged, (_, wasPaused) => wasPaused);

$video.on(getCurrentVideoFx.doneData, (_, video) => video);
getCurrentVideoFx.use(async () => document.querySelector("video")!);

type TMoveFX = {
  video: StoreValue<typeof $video>;
  subs: StoreValue<typeof $subs>;
  currentSubs: StoreValue<typeof $currentSubs>;
  streaming: StoreValue<typeof $streaming>;
  direction: TMoveDirection;
  force: boolean;
};
export const moveKeyPressed = createEvent<{ direction: TMoveDirection; force: boolean }>();
export const moveFx = createEffect<TMoveFX, void>(({ video, subs, streaming, direction, currentSubs, force }) => {
  if (video === null) {
    return;
  }

  if (direction === "next") {
    const currentTime = video.currentTime * 1000;
    const nextSub = subs.find((sub) => sub.start > currentTime);
    const isNextSubClose = nextSub && nextSub.start - currentTime <= TIME_SEEK_TIME;

    if (nextSub && (force || isNextSubClose)) {
      moveVideoToTime(video, streaming, nextSub.start);
    } else {
      moveVideoToTime(video, streaming, currentTime + TIME_SEEK_TIME);
    }
  }

  if (direction === "prev") {
    const currentTime = video.currentTime * 1000;
    const prevSub = subs
      .slice()
      .reverse()
      .find((sub) => sub.end <= currentTime);

    const isPrevSubClose = prevSub && currentTime - prevSub.end <= TIME_SEEK_TIME;

    if (prevSub && (force || isPrevSubClose)) {
      moveVideoToTime(video, streaming, prevSub.start);
    } else {
      moveVideoToTime(video, streaming, currentTime - TIME_SEEK_TIME);
    }
  }

  if (direction === "current") {
    if (currentSubs.length > 0) {
      moveVideoToTime(video, streaming, currentSubs[0].start);
      video.play();
    }
  }
});

export const moveToTimeRequested = createEvent<number>();
export const moveToTimeFx = createEffect<
  { video: StoreValue<typeof $video>; streaming: StoreValue<typeof $streaming>; time: number },
  void
>(({ video, streaming, time }) => {
  moveVideoToTime(video, streaming, time);
});

sample({
  clock: moveToTimeRequested,
  source: { video: $video, streaming: $streaming },
  fn: ({ video, streaming }, time) => ({ video, streaming, time }),
  target: moveToTimeFx,
});

sample({
  clock: moveKeyPressed,
  source: { video: $video, subs: $subs, currentSubs: $currentSubs, streaming: $streaming },
  fn: ({ video, subs, currentSubs, streaming }, { direction, force }) => ({
    video,
    subs,
    currentSubs,
    streaming,
    direction,
    force,
  }),
  target: moveFx,
});

debug($video, moveKeyPressed, moveFx, $wasPaused);
