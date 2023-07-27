import { createStore, createEffect, createEvent, StoreValue, sample } from "effector";
import { esRenderSetings } from "../settings";
import { debug } from "patronum";
import { $currentSubs, $subs } from "../subs";
import { TMoveDirection } from "../types";

const TIME_SEEK_TIME = 5000;

export const $video = createStore<HTMLVideoElement | null>(null);
export const getCurrentVideoFx = createEffect<void, HTMLVideoElement>(() => document.querySelector("video"));
export const videoTimeUpdate = createEvent<void>();

$video.on(getCurrentVideoFx.doneData, (_, video) => video);
getCurrentVideoFx.use(async () => document.querySelector("video")!);

type TMoveFX = {
  video: StoreValue<typeof $video>;
  subs: StoreValue<typeof $subs>;
  currentSubs: StoreValue<typeof $currentSubs>;
  direction: TMoveDirection;
};
export const moveKeyPressed = createEvent<TMoveDirection>();
export const moveFx = createEffect<TMoveFX, void>(({ video, subs, direction }) => {
  if (video === null) {
    return;
  }

  if (direction === "next") {
    const currentTime = video.currentTime * 1000;
    const nextSub = subs.find((sub) => sub.start > currentTime);
    console.log("nextSub", nextSub);
    console.log("video.currentTime", video.currentTime);

    const isNextSubClose = nextSub && nextSub.start - currentTime <= TIME_SEEK_TIME;

    if (nextSub && isNextSubClose) {
      video.currentTime = nextSub.start / 1000;
    } else {
      video.currentTime += TIME_SEEK_TIME / 1000;
    }
  }

  if (direction === "prev") {
    const currentTime = video.currentTime * 1000;
    const prevSub = subs
      .slice()
      .reverse()
      .find((sub) => sub.end <= currentTime);

    const isPrevSubClose = prevSub && currentTime - prevSub.end <= TIME_SEEK_TIME;

    if (prevSub && isPrevSubClose) {
      video.currentTime = prevSub.start / 1000;
    } else {
      video.currentTime -= TIME_SEEK_TIME / 1000;
    }
  }
});

export const moveToTimeRequested = createEvent<number>();
export const moveToTimeFx = createEffect<{ video: StoreValue<typeof $video>; time: number }, void>(
  ({ video, time }) => {
    video.currentTime = time / 1000;
  }
);

sample({
  clock: moveToTimeRequested,
  source: { video: $video },
  fn: ({ video }, time) => ({ video, time }),
  target: moveToTimeFx,
});

sample({
  clock: esRenderSetings,
  target: getCurrentVideoFx,
});

$video.on(getCurrentVideoFx.doneData, (_, video) => video);

sample({
  clock: moveKeyPressed,
  source: { video: $video, subs: $subs, currentSubs: $currentSubs },
  fn: ({ video, subs, currentSubs }, direction) => ({ video, subs, currentSubs, direction }),
  target: moveFx,
});

debug($video, moveKeyPressed, moveFx);
