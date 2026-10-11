import { SAMPLE_RATE, toMono16k } from "./pcm";

// The whole sound of a video played from a plain file (the playground, Jellyfin's direct play, sites serving MP4):
// players that don't stream through Media Source Extensions have nothing buffered ahead to tap, so the speech models
// would only hear what already played. The file is fetched and decoded once instead. Files from another origin without
// CORS, and files too big to hold, are left to the element's audio.

const MAX_BYTES = 500 * 1024 * 1024;
const MAX_DURATION_S = 3 * 60 * 60;
// Passed on in pieces around the playhead, as the timeline keeps only so much: again when it dropped them
const CHUNK_SECONDS = 30;
const BEHIND_MS = 30_000;
const AHEAD_MS = 5 * 60_000;

export type TFileAudio = { refill(now: number): void; stop(): void };

export function decodeFileAudio(
  video: HTMLVideoElement,
  onChunk: (start: number, samples: Float32Array) => void,
  covers: (start: number, end: number) => boolean,
): TFileAudio {
  const src = video.currentSrc || video.src;
  const controller = new AbortController();
  let samples: Float32Array | null = null;
  const step = CHUNK_SECONDS * SAMPLE_RATE;

  const refill = (now: number) => {
    if (!samples || controller.signal.aborted) return;
    // Another video in the same element
    if ((video.currentSrc || video.src) !== src) return void (samples = null);
    for (let at = 0; at < samples.length; at += step) {
      const start = (at / SAMPLE_RATE) * 1000;
      const end = (Math.min(at + step, samples.length) / SAMPLE_RATE) * 1000;
      if (end < now - BEHIND_MS || start > now + AHEAD_MS || covers(start, end)) continue;
      onChunk(start, samples.slice(at, at + step));
    }
  };
  if (!/^https?:/.test(src) || video.duration > MAX_DURATION_S) return { refill, stop: () => {} };

  (async () => {
    const response = await fetch(src, { signal: controller.signal });
    if (!response.ok) throw new Error(`${response.status}`);
    const length = Number(response.headers.get("content-length"));
    if (length > MAX_BYTES) throw new Error(`${Math.round(length / 1024 / 1024)} MB is too big`);
    const bytes = await response.arrayBuffer();
    if (controller.signal.aborted) return;
    // decodeAudioData resamples to the context's rate
    const audio = await new OfflineAudioContext(1, 1, SAMPLE_RATE).decodeAudioData(bytes);
    const channels = Array.from({ length: audio.numberOfChannels }, (_, index) => audio.getChannelData(index));
    samples = toMono16k(channels, audio.sampleRate);
    refill(video.currentTime * 1000);
  })().catch((error: Error) => {
    if (!controller.signal.aborted) console.debug("EasySubs: the video file's audio wasn't read ahead", error.message);
  });

  return {
    refill,
    stop: () => {
      controller.abort();
      samples = null;
    },
  };
}
