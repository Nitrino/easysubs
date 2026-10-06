import { describe, expect, it, vi } from "vitest";
import { moveVideoToTime } from "./moveVideoToTime";
import { getCurrentVideoTime } from "./getCurrentVideoTime";
import Netflix from "@src/streamings/netflix";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";

describe("moveVideoToTime", () => {
  it("seeks the video to a time in milliseconds", () => {
    const video = createVideo({ currentTime: 20 });

    moveVideoToTime(video, createService(), 4000);

    expect(video.currentTime).toBe(4);
  });

  it("asks the Netflix player to seek, which breaks when the video is seeked directly", () => {
    vi.useFakeTimers();
    const video = createVideo({ currentTime: 20 });
    const seek = vi.fn();
    window.addEventListener("esNetflixSeek", (event: CustomEvent) => seek(event.detail), { once: true });

    moveVideoToTime(video, new Netflix(), 4000);

    expect(seek).toHaveBeenCalledWith(4000);
    expect(video.currentTime).toBe(20);
    vi.useRealTimers();
  });
});

describe("getCurrentVideoTime", () => {
  it("gives the video time in whole milliseconds", () => {
    expect(getCurrentVideoTime(createVideo({ currentTime: 5.2345 }))).toBe(5235);
  });
});
