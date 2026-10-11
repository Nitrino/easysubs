import { combine, createEffect, createEvent, createStore } from "effector";

import type { TTimedWord } from "../types";
import type { TInterval } from "@src/utils/wordTiming/speech";
import { $subsDelay } from "../subs";
import { wordsToCues } from "@src/utils/aiSubs/wordsToCues";

// AI subtitles: the main line made on the device from the video's audio, for videos without subtitles. Whisper (the
// spoken-word experiment's model, src/audio/models.ts) transcribes 20 s windows of what plays and what the player
// buffered ahead (src/audio/session.ts); the words become lines (src/utils/aiSubs/wordsToCues.ts) as they come. Picked
// in the Subtitles tab's "Subtitles from" row; like a found file it's pinned on the video until something else is
// picked there, and stops on another video.

// The video it runs on and the language Whisper is told, null while off
export const $aiSubs = createStore<{ page: string; language: string } | null>(null);
// Whisper's words so far, by video time
export const $aiWords = createStore<TTimedWord[]>([]);
// The stretches of the video Whisper went through, by video time, for the progress
export const $aiTranscribed = createStore<TInterval[]>([]);
// The model's last word ("downloading 40%", "recognizing", "ready", "failed: …") and a problem hearing the video
export const $aiStatus = createStore<{ whisper: string; audio: string }>({ whisper: "", audio: "" });

export const aiSubsRequested = createEvent();
// Picked "From <service>" or Remove: back to the service's track
export const aiSubsStopped = createEvent();
// Another video, or a file put on the main line: off without bringing the service's track back
export const aiSubsReplaced = createEvent();
export const aiLanguagePicked = createEvent<string>();

export const aiWordsRecognized = createEvent<{ from: number; to: number; words: TTimedWord[] }>();
export const aiStatusChanged = createEvent<{ source: "speech" | "whisper" | "aligned"; status: string }>();

export const startAiSessionFx = createEffect<{ video: HTMLVideoElement | null; language: string }, void>();
export const stopAiSessionFx = createEffect<void, void>();

// The lines, moved by the delay buttons like any track
export const $aiCaptions = combine($aiWords, $aiSubs, $subsDelay, (words, ai, delay) =>
  wordsToCues(words, ai?.language ?? "en").map((cue) => ({
    ...cue,
    start: Number(cue.start) + delay * 1000,
    end: Number(cue.end) + delay * 1000,
  })),
);

// Whisper went through the moment `at` (ms)
export const isTranscribed = (transcribed: TInterval[], at: number) =>
  transcribed.some((interval) => interval.start <= at && at < interval.end);

// Where the transcribed stretch around `at` ends, null when `at` isn't transcribed yet
export const transcribedUntil = (transcribed: TInterval[], at: number) =>
  transcribed.find((interval) => interval.start <= at && at < interval.end)?.end ?? null;
