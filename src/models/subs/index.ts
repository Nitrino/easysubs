import { createStore, createEvent, createEffect, attach, UnitValue, sample, StoreValue } from "effector";
import { debug } from "patronum";
import { resync } from "subtitle";

import { convertRawSubs } from "@src/utils/convertRawSubs";
import { $video } from "@src/models/videos";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import type { Captions, TPhrasalVerb, TSub } from "../types";
import type Service from "@src/streamings/service";
import { $autoPause } from "../settings";

export const $rawSubs = createStore<Captions>([]);
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $currentSubs = createStore<TSub[]>([]);
export const $prevCurrentSubs = createStore<TSub[]>([]);
export const esSubsChanged = createEvent<string>();
export const autoPauseFx = createEffect<
  {
    currentSubs: UnitValue<typeof $currentSubs>;
    video: UnitValue<typeof $video>;
    autoPause: StoreValue<typeof $autoPause>;
  },
  void
>(({ currentSubs, video, autoPause }) => {
  const timeDiff = currentSubs[0].end - video.currentTime * 1000;
  if (autoPause && timeDiff < 250 && timeDiff > 0) {
    video.pause();
  }
});

export const subsRequested = createEvent<string>();
export const fetchSubs = createEvent<{ streaming: Service; language: string }>();
export const resetSubs = createEvent<string>();
export const fetchSubsFx = createEffect<{ streaming: Service; language: string }, Captions>(
  async ({ streaming, language }) => {
    try {
      return await streaming.getSubs(language);
    } catch (error) {
      console.error(error);
    }
  }
);
export const updateCurrentSubsFx = createEffect<{ subs: TSub[]; video: UnitValue<typeof $video> }, TSub[]>(
  ({ subs, video }) => getCurrentSubs(subs, video!.currentTime * 1000)
);
export const updatePrevCurrentSubsFx = createEffect<TSub[], TSub[]>((subs) => subs);
export const updateCustomSubsFx = createEffect<Captions, Captions>((subs) => subs);

export const $subsDelay = createStore<number>(0);
export const $activePhrasalVerb = createStore<TPhrasalVerb>(null);
export const activePhrasalVerbChanged = createEvent<TPhrasalVerb>();
export const subsDelayButtonPressed = createEvent<number>();
export const subsDelayChangeFx = createEffect<number, number>((value) => value);
export const subsResyncFx = createEffect<
  { rawSubs: Captions; subsDelay: StoreValue<typeof $subsDelay>; delay: number },
  Captions
>(({ rawSubs, subsDelay, delay }) => resync(rawSubs, (delay - subsDelay) * 1000));
