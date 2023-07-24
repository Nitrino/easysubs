import { createStore, createEvent, createEffect, attach, UnitValue, sample } from "effector";
import { Captions } from "subtitle";
import { convertRawSubs } from "@src/utils/convertRawSubs";
import { TSub } from "../types";
import { $video, videoTimeUpdate } from "@src/models/videos";

import type Service from "@src/streamings/service";

import { $streaming } from "../streamings";
import { debug } from "patronum";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";

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

$rawSubs.on(fetchSubsFx.doneData, (_, subs) => subs);
$currentSubs.on(updateCurrentSubsFx.doneData, (_, subs) => subs);

debug($rawSubs, $subs, $currentSubs);
