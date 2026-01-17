import { createStore, createEvent, createEffect, type UnitValue, type StoreValue } from "effector";

import { convertRawSubs } from "@src/utils/convertRawSubs";
import type { $video } from "@src/models/videos";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import type { TSub } from "../types";
import { type Service } from "@src/streamings/service";
import type { $autoPause } from "../settings";
import { type NodeList } from "subtitle";
import { resyncSync } from "@root/src/utils/resyncNode";

export const ES_CUSTOM_SUB_LABEL = "custom";
export const $rawSubs = createStore<NodeList>([]);
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $subsLanguage = createStore<string>("auto");
export const $subsTitle = createStore<string | null>(null);
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
>(({ video }) => {
  if (!video) throw new Error('autoPauseFx failed: video nullish')
  video.pause()
});

export const subsRequested = createEvent<string>();
export const subsReloadRequested = createEvent();
export const fetchSubs = createEvent<{ streaming: Service; language: string }>();
export const resetSubs = createEvent<string>();
export const fetchSubsFx = createEffect<{ streaming: Service; language: string }, NodeList | undefined>(
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
export const rawSubsAdded = createEvent<NodeList>();
export const updateCustomSubsFx = createEffect<NodeList, NodeList>((subs) => subs);

export const $subsDelay = createStore<number>(0);
export const subsDelayButtonPressed = createEvent<number>();
export const subsDelayChangeFx = createEffect<number, number>((value) => value);
export const subsResyncFx = createEffect<
  { rawSubs: NodeList; subsDelay: StoreValue<typeof $subsDelay>; delay: number },
  NodeList
>(({ rawSubs, subsDelay, delay }) => resyncSync(rawSubs, (delay - subsDelay) * 1000));

export const subsLanguageDetectFx = createEffect<TSub[], string | undefined>(async (subs) => {
  try {
    return await chrome.runtime.sendMessage({
      type: "getTextLanguage",
      language: "en",
      text: subs[Math.floor(Math.random() * subs.length)]!.cleanedText,
    });
  } catch (error) {
    console.error(error);
  }
});
