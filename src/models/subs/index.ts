import { createStore, createEvent, createEffect, UnitValue, StoreValue } from "effector";
import { resync } from "subtitle";

import { convertRawSubs } from "@src/utils/convertRawSubs";
import { $video } from "@src/models/videos";
import { getCurrentSubs } from "@src/utils/getCurrentSubs";
import type { Captions, TSub } from "../types";
import type Service from "@src/streamings/service";
import { $autoPause } from "../settings";

export const ES_CUSTOM_SUB_LABEL = "custom";
// The label of a found file on the main line: "found:opensubtitles:123"
export const FOUND_SUBS_PREFIX = "found:";
// Subtitles that don't come from the service: a file opened in the settings, a found file
export const isOwnSubsLabel = (label: string) => label === ES_CUSTOM_SUB_LABEL || label.startsWith(FOUND_SUBS_PREFIX);

export const $rawSubs = createStore<Captions>([]);
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle));
export const $subsLanguage = createStore<string>("auto");
export const $subsTitle = createStore<string>(null);
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
>(({ video }) => video.pause());

export const subsRequested = createEvent<string>();
export const subsReloadRequested = createEvent();
export const fetchSubs = createEvent<{ streaming: Service; language: string }>();
export const resetSubs = createEvent<string>();
export const fetchSubsFx = createEffect<{ streaming: Service; language: string }, Captions>(
  async ({ streaming, language }) => {
    try {
      return await streaming.getSubs(language);
    } catch (error) {
      console.error(error);
    }
  },
);
export const updateCurrentSubsFx = createEffect<{ subs: TSub[]; video: UnitValue<typeof $video> }, TSub[]>(
  ({ subs, video }) => getCurrentSubs(subs, video!.currentTime * 1000),
);
export const updatePrevCurrentSubsFx = createEffect<TSub[], TSub[]>((subs) => subs);
export const rawSubsAdded = createEvent<Captions>();
export const updateCustomSubsFx = createEffect<Captions, Captions>((subs) => subs);

// A found file on the main line (src/models/foundSubs): its cues, under its label
export const ownSubsLoaded = createEvent<{ label: string; captions: Captions }>();
// While a found file is the main line of a video, the service's own track changes don't replace it
export const $pinnedSubs = createStore<{ label: string; page: string } | null>(null);
// The last track the service showed, to go back to, and its cues, to sync a found file against
export const $serviceSubsLabel = createStore<string>("");
export const $serviceRawSubs = createStore<Captions>([]);

export const $subsDelay = createStore<number>(0);
export const subsDelayButtonPressed = createEvent<number>();
export const subsDelayChangeFx = createEffect<number, number>((value) => value);
export const subsResyncFx = createEffect<
  { rawSubs: Captions; subsDelay: StoreValue<typeof $subsDelay>; delay: number },
  Captions
>(({ rawSubs, subsDelay, delay }) => resync(rawSubs, (delay - subsDelay) * 1000));

export const subsLanguageDetectFx = createEffect<TSub[], string>(async (subs) => {
  try {
    return await chrome.runtime.sendMessage({
      type: "getTextLanguage",
      language: "en",
      text: subs[Math.floor(Math.random() * subs.length)].cleanedText,
    });
  } catch (error) {
    console.error(error);
  }
});
