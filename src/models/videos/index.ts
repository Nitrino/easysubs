import { createStore, createEffect, createEvent, UnitValue, attach, sample } from "effector";
import { esRenderSetings } from "../settings";
import { debug } from "patronum";

export const $video = createStore<HTMLVideoElement | null>(null);
export const getCurrentVideoFx = createEffect<void, HTMLVideoElement>(() => document.querySelector("video"));
export const videoTimeUpdate = createEvent<void>("videoTimeUpdate");

sample({
  clock: esRenderSetings,
  target: getCurrentVideoFx,
});

$video.on(getCurrentVideoFx.doneData, (_, video) => video);

debug($video);
