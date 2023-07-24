import { createStore, createEvent, createEffect, attach, UnitValue, sample } from "effector";
import { Captions } from "subtitle";
import { convertRawSubs } from "@src/utils/convertRawSubs";
import { TSub } from "../types";
import { $video } from "@src/models/videos";

import type Service from "@src/streamings/service";

import { $streaming } from "../streamings";
import { withPersist } from "@src/utils/withPersist";
import { debug } from "patronum";

export const $rawSubs = createStore<Captions>([], { name: "rawSubs" });
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $currentSubs = createStore<TSub[]>([], { name: "currentSubs" });

export const esSubsChanged = createEvent<string>();

export const fetchSubsFx = createEffect<{ streaming: Service; language: string }, Captions>(({ streaming, language }) =>
  streaming.getSubs(language)
);

sample({
  clock: esSubsChanged,
  source: $streaming,
  fn: (streaming, language) => ({ streaming, language }),
  target: fetchSubsFx,
});
// export const fetchCustomSubsFx = createEffect<Captions, Captions>(
//   (subs) => subs
// );
// export const updateCurrentSubsFx = createEffect<
//   { subs: TSub[]; video: UnitValue<typeof $video> },
//   TSub[]
// >();

debug({ $rawSubs, $subs, $currentSubs });
