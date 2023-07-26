import { createStore, createEvent, createEffect, attach, UnitValue, sample, StoreValue } from "effector";
import { debug } from "patronum";
import { Captions, resync } from "subtitle";

import { convertRawSubs } from "@src/utils/convertRawSubs";
import { $video, videoTimeUpdate } from "@src/models/videos";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import type { TSub } from "../types";
import type Service from "@src/streamings/service";
import { $streaming } from "../streamings";

export const $rawSubs = createStore<Captions>([], { name: "rawSubs" });
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $currentSubs = createStore<TSub[]>([], { name: "currentSubs" });
export const esSubsChanged = createEvent<string>();
export const fetchSubsFx = createEffect<{ streaming: Service; language: string }, Captions>(({ streaming, language }) =>
  streaming.getSubs(language)
);

export const updateCurrentSubsFx = createEffect<{ subs: TSub[]; video: UnitValue<typeof $video> }, TSub[]>(
  ({ subs, video }) => getCurrentSubs(subs, video!.currentTime * 1000)
);

export const $subsDelay = createStore<number>(0);
export const subsDelayButtonPressed = createEvent<number>();
export const subsDelayChangeFx = createEffect<number, number>((value) => value);
export const subsResyncFx = createEffect<
  { rawSubs: Captions; subsDelay: StoreValue<typeof $subsDelay>; delay: number },
  Captions
>(({ rawSubs, subsDelay, delay }) => resync(rawSubs, (delay - subsDelay) * 1000));

sample({
  clock: esSubsChanged,
  source: $streaming,
  fn: (streaming, language) => ({ streaming, language }),
  target: fetchSubsFx,
});

sample({
  clock: [videoTimeUpdate, $rawSubs],
  source: { subs: $subs, video: $video },
  fn: ({ subs, video }, _) => ({ subs, video }),
  target: updateCurrentSubsFx,
});

sample({
  clock: subsDelayButtonPressed,
  target: subsDelayChangeFx,
});

sample({
  clock: subsDelayButtonPressed,
  source: { rawSubs: $rawSubs, subsDelay: $subsDelay },
  fn: ({ rawSubs, subsDelay }, delay) => ({ rawSubs, subsDelay, delay }),
  target: subsResyncFx,
});

$rawSubs.on([fetchSubsFx.doneData, subsResyncFx.doneData], (_, subs) => subs);
$currentSubs.on(updateCurrentSubsFx.doneData, (_, subs) => subs);
$subsDelay.on(subsDelayChangeFx.doneData, (_, newSubsDelay) => newSubsDelay);

debug($rawSubs, $subs, $currentSubs, $subsDelay, subsResyncFx);
