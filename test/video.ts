import { vi } from "vitest";

// A <video> that plays and seeks without media: jsdom implements neither
export function createVideo({ currentTime = 0, paused = true } = {}) {
  const video = document.createElement("video");
  let time = currentTime;
  let isPaused = paused;
  Object.defineProperties(video, {
    currentTime: { get: () => time, set: (value: number) => void (time = value), configurable: true },
    paused: { get: () => isPaused, configurable: true },
  });
  video.play = vi.fn(async () => void (isPaused = false));
  video.pause = vi.fn(() => void (isPaused = true));
  return video;
}
