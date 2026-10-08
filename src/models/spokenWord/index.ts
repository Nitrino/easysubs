import { combine, createEffect, createEvent, createStore } from "effector";

import { $subs, $subsLanguage } from "../subs";
import type { TSpokenWordSource, TSub, TTimedWord, TWordTime, TWordTimingSource } from "../types";
import type Service from "@src/streamings/service";
import { estimateWordTimes, speakingRate } from "@src/utils/wordTiming/estimate";
import { transferWordTimes } from "@src/utils/wordTiming/transfer";
import { estimateFromOnset, snapToSpeech, type TInterval } from "@src/utils/wordTiming/speech";
import { captionWordsOfVideo } from "@src/utils/wordTiming/captionWords";

// Highlighting the word being said. Every source of word times is kept side by side so they can be compared in the
// player (the Compare row of the Experiments tab); the highlight takes the one picked, or the most precise one that
// has times for the cue.

// The order "auto" tries them in: given by the video first, then recognized, then heard, then guessed
export const SOURCE_ORDER: TWordTimingSource[] = [
  "file",
  "captions",
  "yandex",
  "aligned",
  "whisper",
  "speech",
  "estimate",
];

export const SOURCE_NAMES: Record<TWordTimingSource, string> = {
  file: "Subtitles",
  captions: "Auto captions",
  yandex: "Yandex",
  aligned: "wav2vec2",
  whisper: "Whisper",
  speech: "Speech",
  estimate: "Estimate",
};

// Timed words of the video in the main line's language from other sources, in video ms
export const $captionWords = createStore<TTimedWord[]>([]);
export const $yandexWords = createStore<TTimedWord[]>([]);
export const $whisperWords = createStore<TTimedWord[]>([]);
// wav2vec2's times by cue (cueKey), as the audio of each cue is aligned
export const $alignedWords = createStore<Record<string, (TWordTime | null)[]>>({});
// What the audio analysis heard: when someone speaks, and which stretches of the video it has covered
export const $speech = createStore<{ speech: TInterval[]; heard: TInterval[] }>({ speech: [], heard: [] });

// How the sources that load or listen are doing, for the settings and the comparison: "loading", "ready", "none",
// "waiting" (Yandex is processing the video), "downloading 40%" (a model), "listening", a failure
export type TSourceStatus = string;
export const $sourceStatus = createStore<Partial<Record<TWordTimingSource, TSourceStatus>>>({});
export const sourceStatusChanged = createEvent<{ source: TWordTimingSource; status: TSourceStatus }>();

// What the audio analysis found (src/audio/session.ts)
export const speechHeard = createEvent<{ speech: TInterval[]; heard: TInterval }>();
export const cueAligned = createEvent<{ sub: TSub; times: (TWordTime | null)[] }>();
export const wordsRecognized = createEvent<{ from: number; to: number; words: TTimedWord[] }>();
export const audioReset = createEvent();

// Cues are told apart across tracks by when they start and what they say: ids are only indexes
export const cueKey = (sub: Pick<TSub, "start" | "text">) => `${Math.round(sub.start)}|${sub.text}`;

export const $speakingRate = combine($subs, $subsLanguage, (subs, language) =>
  speakingRate(subs, language === "auto" ? "" : language),
);

const transferred = (words: typeof $captionWords) =>
  combine($subs, words, $subsLanguage, $speakingRate, (subs, timed, language, rate) =>
    timed.length ? transferWordTimes(subs, timed, language === "auto" ? "" : language, rate) : {},
  );

export const $wordTiming = combine({
  captions: transferred($captionWords),
  yandex: transferred($yandexWords),
  whisper: transferred($whisperWords),
  aligned: $alignedWords,
  speech: $speech,
  rate: $speakingRate,
  language: $subsLanguage,
});
export type TWordTimingState = typeof $wordTiming extends { getState(): infer State } ? State : never;

// One source's times for the cue's items; null when it has none
export function wordTimesFor(
  sub: TSub,
  source: TWordTimingSource,
  timing: TWordTimingState,
): (TWordTime | null)[] | null {
  const language = timing.language === "auto" ? "" : timing.language;
  switch (source) {
    case "file":
      return sub.words ?? null;
    case "captions":
    case "yandex":
    case "whisper":
      return timing[source][sub.id] ?? null;
    case "aligned":
      return timing.aligned[cueKey(sub)] ?? null;
    case "speech":
      return (
        snapToSpeech(sub, timing.speech.speech, timing.speech.heard, timing.rate, language) ??
        estimateFromOnset(sub, timing.speech.speech, timing.speech.heard, timing.rate, language)
      );
    case "estimate":
      return estimateWordTimes(sub, timing.rate, language);
  }
}

const cache = new WeakMap<
  TWordTimingState,
  Map<string, { source: TWordTimingSource; times: (TWordTime | null)[] } | null>
>();

// The times the highlight uses for a cue: the picked source's, or the first source in SOURCE_ORDER that has some
export function resolveWordTimes(sub: TSub, preferred: TSpokenWordSource, timing: TWordTimingState) {
  let byCue = cache.get(timing);
  if (!byCue) cache.set(timing, (byCue = new Map()));
  const key = `${preferred}|${sub.id}|${cueKey(sub)}`;
  if (byCue.has(key)) return byCue.get(key);

  let resolved: { source: TWordTimingSource; times: (TWordTime | null)[] } | null = null;
  for (const source of preferred === "auto" ? SOURCE_ORDER : [preferred]) {
    const times = wordTimesFor(sub, source, timing);
    if (times?.some(Boolean)) {
      resolved = { source, times };
      break;
    }
  }
  byCue.set(key, resolved);
  return resolved;
}

// The word being said: its cue and index in the cue's items
export type TSpokenWord = { cueId: number; index: number; source: TWordTimingSource };
export const $spokenWord = createStore<TSpokenWord | null>(null);
export const spokenWordChanged = createEvent<TSpokenWord | null>();

export const loadCaptionWordsFx = createEffect<{ streaming: Service; language: string }, TTimedWord[]>(
  ({ streaming, language }) => captionWordsOfVideo(streaming, language),
);

export const loadYandexWordsFx = createEffect<{ url: string; language: string }, TYandexAnswer>(({ url, language }) =>
  chrome.runtime.sendMessage({ type: "yandexWordTimes", url, language }),
);
export type TYandexAnswer = { words: TTimedWord[] } | { waiting: true } | { error: string };
