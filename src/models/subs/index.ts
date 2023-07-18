import {
  createStore,
  createEvent,
  createEffect,
  attach,
  UnitValue,
} from "effector";
import { Captions } from "subtitle";
import { convertRawSubs } from "@src/utils/convertRawSubs";
import { TSub } from "../types";
import { $video } from "@src/models/videos";

import type Service from "@src/streamings/service";

import { $streaming } from "../streamings";
import { withPersist } from "@src/utils/withPersist";

export const $rawSubs = createStore<Captions>([]);
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $currentSubs = createStore<TSub[]>([]);

export const esSubsChanged = createEvent<string>();
export const esRenderSetings = createEvent();

export const fetchSubsFx = createEffect<
  { language: string; streaming: Service },
  Captions
>();
export const fetchCustomSubsFx = createEffect<Captions, Captions>(
  (subs) => subs
);
export const updateCurrentSubsFx = createEffect<
  { subs: TSub[]; video: UnitValue<typeof $video> },
  TSub[]
>();
export const updateSubsDelayFx = createEffect<number, number>();
export const updateSubsSizeFx = createEffect<number, number>((size) => size);
export const updateSubsBackgroundFx = createEffect<boolean, boolean>(
  (value) => value
);
export const updateSubsBackgroundOpacityFx = createEffect<number, number>(
  (value) => value
);
export const resyncSubsFx = createEffect<
  { currentDelay: number; delay: number },
  { currentDelay: number; delay: number }
>((data) => data);

export const fetchServiceSubsFx = attach<
  string,
  typeof $streaming,
  typeof fetchSubsFx
>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
});
