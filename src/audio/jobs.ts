import type { TTimedWord, TWordTime } from "@src/models/types";

// What the content script asks the speech models for (src/audio/models.ts). They run in the offscreen document in
// Chrome (src/pages/offscreen), in the page itself in the playground. Audio goes as base64 16-bit PCM at 16 kHz.

export type TAudioJob =
  // Silero VAD's speech probability for every 32 ms of the audio
  | { type: "vad"; pcm: string }
  // When each of the words is said in the audio, by wav2vec2 (English); times from the audio's start
  | { type: "align"; pcm: string; words: string[] }
  // Whisper's words with times from the audio's start
  | { type: "whisper"; pcm: string; language: string };

export type TAudioJobResult = {
  vad: number[];
  align: (TWordTime | null)[];
  whisper: TTimedWord[];
};

// What the worker tells the content script on its own: model downloads, and the tab's audio while it's captured
export type TAudioWorkerEvent =
  | { type: "status"; model: "silero" | "whisper" | "aligner"; status: string }
  | { type: "tabAudio"; epochEnd: number; pcm: string }
  | { type: "tabCaptureEnded" };

export type TAudioWorker = {
  request<Type extends TAudioJob["type"]>(job: Extract<TAudioJob, { type: Type }>): Promise<TAudioJobResult[Type]>;
  onEvent(listener: (event: TAudioWorkerEvent) => void): void;
  close(): void;
};
