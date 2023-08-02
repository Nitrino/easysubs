import { createStore, createEvent, createEffect, attach, UnitValue, sample, StoreValue } from "effector";
import { debug } from "patronum";
import { resync } from "subtitle";

import { convertRawSubs } from "@src/utils/convertRawSubs";
import { $video } from "@src/models/videos";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import type { Captions, TPhrasalVerb, TSub } from "../types";
import type Service from "@src/streamings/service";

export const $rawSubs = createStore<Captions>([], { name: "rawSubs" });
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $currentSubs = createStore<TSub[]>([], { name: "currentSubs" });
export const esSubsChanged = createEvent<string>();
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

debug($rawSubs, $subs, $subsDelay, subsResyncFx, fetchSubsFx, $activePhrasalVerb);
