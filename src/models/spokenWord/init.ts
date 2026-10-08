import { combine, createEffect, createEvent, createStore, sample } from "effector";

import {
  $alignedWords,
  $captionWords,
  $sourceStatus,
  $speech,
  $spokenWord,
  $whisperWords,
  $wordTiming,
  $yandexWords,
  audioReset,
  cueAligned,
  cueKey,
  loadCaptionWordsFx,
  loadYandexWordsFx,
  resolveWordTimes,
  sourceStatusChanged,
  speechHeard,
  spokenWordChanged,
  wordsRecognized,
  type TSpokenWord,
} from ".";
import { $currentSubs, $subs, $subsLanguage, esSubsChanged } from "../subs";
import { $streaming } from "../streamings";
import { $video } from "../videos";
import {
  $spokenWordAligner,
  $spokenWordAudio,
  $spokenWordDetector,
  $spokenWordEnabled,
  $spokenWordSource,
  $spokenWordWhisper,
  $spokenWordYandex,
} from "../settings";
import { AudioSession } from "@src/audio/session";
import { addInterval } from "@src/utils/wordTiming/speech";
import { currentVideoPage } from "@src/utils/videoKey";
import { activeWordIndex } from "@src/utils/wordTiming/active";
import { yandexVideoUrl } from "@src/utils/wordTiming/yandexVideoUrl";

$spokenWord.on(spokenWordChanged, (_, word) => word);
$sourceStatus.on(sourceStatusChanged, (statuses, { source, status }) => ({ ...statuses, [source]: status }));

// The auto-generated captions of the video in the main line's language, once per track: lines that come with their
// own word times don't need them
const $captionsRequested = createStore("").reset(esSubsChanged);
$captionWords.reset(esSubsChanged);

sample({
  clock: [$subsLanguage.updates, $spokenWordEnabled.updates, $subs.updates],
  source: {
    streaming: $streaming,
    language: $subsLanguage,
    enabled: $spokenWordEnabled,
    subs: $subs,
    requested: $captionsRequested,
  },
  filter: ({ streaming, language, enabled, subs, requested }) =>
    enabled &&
    language !== "auto" &&
    subs.length > 0 &&
    !subs.some((sub) => sub.words) &&
    Boolean(streaming?.getSubsTracks) &&
    requested !== `${currentVideoPage()}|${language}`,
  fn: ({ streaming, language }) => ({ streaming, language }),
  target: loadCaptionWordsFx,
});
$captionsRequested.on(loadCaptionWordsFx, (_, { language }) => `${currentVideoPage()}|${language}`);
$captionWords.on(loadCaptionWordsFx.doneData, (_, words) => words);

sample({
  clock: loadCaptionWordsFx,
  fn: () => ({ source: "captions" as const, status: "loading" as const }),
  target: sourceStatusChanged,
});
sample({
  clock: loadCaptionWordsFx.doneData,
  fn: (words) => ({ source: "captions" as const, status: words.length ? ("ready" as const) : ("none" as const) }),
  target: sourceStatusChanged,
});
sample({
  clock: loadCaptionWordsFx.fail,
  fn: () => ({ source: "captions" as const, status: "failed" as const }),
  target: sourceStatusChanged,
});

// Yandex's recognition of the video, asked again while Yandex is still processing it
const YANDEX_RETRY_MS = 30_000;
const YANDEX_MAX_TRIES = 10;
const yandexRetry = createEvent();
const $yandexRequested = createStore("");
const $yandexTries = createStore(0);
const scheduleYandexRetryFx = createEffect(() => {
  setTimeout(() => yandexRetry(), YANDEX_RETRY_MS);
});

sample({
  clock: [$subsLanguage.updates, $spokenWordEnabled.updates, $spokenWordYandex.updates, yandexRetry],
  source: {
    streaming: $streaming,
    language: $subsLanguage,
    enabled: $spokenWordEnabled,
    yandex: $spokenWordYandex,
    requested: $yandexRequested,
  },
  filter: ({ language, enabled, yandex, requested }) =>
    enabled && yandex && language !== "auto" && requested !== `${currentVideoPage()}|${language}`,
  fn: ({ streaming, language }) => ({ url: yandexVideoUrl(streaming?.name, location.href), language }),
  target: loadYandexWordsFx,
});
$yandexRequested.on(loadYandexWordsFx, () => `${currentVideoPage()}|${$subsLanguage.getState()}`);
$yandexRequested.reset(yandexRetry);
$yandexWords.on(loadYandexWordsFx.doneData, (words, answer) => ("words" in answer ? answer.words : words));
$yandexWords.reset(esSubsChanged);
$yandexTries.on(loadYandexWordsFx.doneData, (tries, answer) => ("waiting" in answer ? tries + 1 : 0));

sample({
  clock: loadYandexWordsFx,
  fn: () => ({ source: "yandex" as const, status: "loading" as const }),
  target: sourceStatusChanged,
});
sample({
  clock: loadYandexWordsFx.doneData,
  fn: (answer) => ({
    source: "yandex" as const,
    status:
      "words" in answer
        ? answer.words.length
          ? ("ready" as const)
          : ("none" as const)
        : "waiting" in answer
          ? ("waiting" as const)
          : ("failed" as const),
  }),
  target: sourceStatusChanged,
});
sample({
  clock: loadYandexWordsFx.failData,
  fn: () => ({ source: "yandex" as const, status: "failed" as const }),
  target: sourceStatusChanged,
});
sample({
  clock: loadYandexWordsFx.doneData,
  source: $yandexTries,
  filter: (tries, answer) => "waiting" in answer && tries < YANDEX_MAX_TRIES,
  target: scheduleYandexRetryFx,
});

// The word being said, checked every frame while the highlight is on: `timeupdate` comes about 4 times a second and
// a word lasts about a quarter of one
const sameWord = (a: TSpokenWord | null, b: TSpokenWord | null) =>
  a === b || (a !== null && b !== null && a.cueId === b.cueId && a.index === b.index && a.source === b.source);

export function findSpokenWord(time: number): TSpokenWord | null {
  const preferred = $spokenWordSource.getState();
  const timing = $wordTiming.getState();
  for (const sub of $currentSubs.getState()) {
    const resolved = resolveWordTimes(sub, preferred, timing);
    const index = activeWordIndex(resolved?.times, time);
    if (index >= 0) return { cueId: sub.id, index, source: resolved.source };
  }
  return null;
}

function startLoop(video: HTMLVideoElement) {
  let frame = 0;
  let last: TSpokenWord | null = null;
  const tick = () => {
    frame = requestAnimationFrame(tick);
    const word = findSpokenWord(video.currentTime * 1000);
    if (!sameWord(word, last)) {
      last = word;
      spokenWordChanged(word);
    }
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

let stopLoop: (() => void) | null = null;
combine($spokenWordEnabled, $video).watch(([enabled, video]) => {
  stopLoop?.();
  stopLoop = null;
  if (enabled && video && typeof requestAnimationFrame === "function") stopLoop = startLoop(video);
  else spokenWordChanged(null);
});

// Listening to the video (src/audio/session.ts), restarted whenever what it listens with changes
$speech
  .on(speechHeard, (state, found) => ({
    speech: found.speech.reduce((all, interval) => addInterval(all, interval), state.speech),
    heard: addInterval(state.heard, found.heard, 60),
  }))
  .reset(audioReset);
$alignedWords.on(cueAligned, (aligned, { sub, times }) => ({ ...aligned, [cueKey(sub)]: times })).reset(audioReset);
$whisperWords
  .on(wordsRecognized, (words, { from, to, words: recognized }) =>
    [...words.filter((word) => word.start < from || word.start >= to), ...recognized].sort((a, b) => a.start - b.start),
  )
  .reset(audioReset);

let session: AudioSession | null = null;
combine({
  enabled: $spokenWordEnabled,
  audio: $spokenWordAudio,
  detector: $spokenWordDetector,
  whisper: $spokenWordWhisper,
  aligner: $spokenWordAligner,
  video: $video,
}).watch(({ enabled, audio, detector, whisper, aligner, video }) => {
  session?.stop();
  session = null;
  if (!enabled || audio === "off" || !video) return;
  audioReset();
  const status = (source: "speech" | "whisper" | "aligned", value: string) =>
    sourceStatusChanged({ source, status: value });
  session = new AudioSession(
    video,
    { audio, detector, whisper, aligner },
    {
      speechHeard,
      cueAligned,
      wordsRecognized,
      status,
      subs: () => $subs.getState(),
      language: () => {
        const language = $subsLanguage.getState();
        return language === "auto" ? "en" : language;
      },
    },
  );
  void session.start();
});
