import { afterEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import { $captionWords, $sourceStatus, $speech, $wordTiming, $yandexWords, resolveWordTimes, wordTimesFor } from ".";
import { $subs, $subsLanguage, esSubsChanged } from "../subs";
import { $streaming } from "../streamings";
import { $video } from "../videos";
import { $spokenWordEnabled, $spokenWordYandex } from "../settings";
import type { Captions, TSubsTrack } from "../types";
import { playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { answerNextMessage, sentMessages } from "@root/test/chrome";

const TRACKS: TSubsTrack[] = [
  { label: "es", language: "es", kind: "subtitles" },
  { label: "track:en:asr", language: "en", kind: "cc" },
];

// The playground's English lines as an auto-generated track would time them: speech starting 300 ms into each line,
// a word every 250 ms
const autoCaptions = (): Captions =>
  playgroundCaptions("en").map((cue) => {
    const words = cue.text
      .split(/\s+/)
      .map((text, index) => ({ text, start: 300 + index * 250, end: 550 + index * 250 }));
    return { ...cue, words };
  });

function setup({ tracks = TRACKS, yandex = false } = {}) {
  const streaming = createService({
    getSubsTracks: vi.fn(async () => tracks),
    getSubs: vi.fn(async (label: string) => (label === "track:en:asr" ? autoCaptions() : playgroundCaptions("en"))),
  });
  const scope = fork({
    values: [
      [$streaming, streaming],
      [$video, createVideo({ currentTime: 5 })],
      [$spokenWordEnabled, true],
      [$spokenWordYandex, yandex],
    ],
  });
  return { scope, streaming };
}

afterEach(() => {
  window.history.pushState({}, "", "/");
});

describe("word times from the video's auto-generated captions", () => {
  it("loads the auto-generated track in the main line's language and times the cues by its words", async () => {
    const { scope, streaming } = setup();

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(scope.getState($subsLanguage)).toBe("en");
    expect(streaming.getSubs).toHaveBeenCalledWith("track:en:asr");
    expect(scope.getState($captionWords).length).toBeGreaterThan(50);
    expect(scope.getState($sourceStatus).captions).toBe("ready");

    const sub = scope.getState($subs)[1];
    const times = wordTimesFor(sub, "captions", scope.getState($wordTiming));
    expect(times.map((time) => time.start - sub.start)).toEqual(sub.items.map((_, index) => 300 + index * 250));
  });

  it("takes the most precise source that has times for the cue", async () => {
    const { scope } = setup();
    await allSettled(esSubsChanged, { scope, params: "en" });
    const timing = scope.getState($wordTiming);
    const sub = scope.getState($subs)[1];

    expect(resolveWordTimes(sub, "auto", timing).source).toBe("captions");
    expect(resolveWordTimes(sub, "estimate", timing).source).toBe("estimate");
    // A picked source without times leaves the cue without a highlight
    expect(resolveWordTimes(sub, "yandex", timing)).toBeNull();
  });

  it("has nothing to load when the video has no auto-generated track", async () => {
    const { scope, streaming } = setup({ tracks: TRACKS.slice(0, 1) });

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(streaming.getSubs).not.toHaveBeenCalledWith("track:en:asr");
    expect(scope.getState($captionWords)).toEqual([]);
    expect(resolveWordTimes(scope.getState($subs)[1], "auto", scope.getState($wordTiming)).source).toBe("estimate");
  });
});

describe("word times from Yandex", () => {
  it("asks the background for Yandex's recognition of the video in the main line's language", async () => {
    const { scope } = setup({ yandex: true });
    const recognized = ["almost", "i", "just", "need"].map((text, index) => ({
      text,
      start: 4300 + index * 300,
      end: 4600 + index * 300,
    }));
    answerNextMessage("yandexWordTimes", { words: recognized });

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(sentMessages("yandexWordTimes")).toEqual([expect.objectContaining({ language: "en" })]);
    expect(scope.getState($yandexWords)).toHaveLength(4);
    expect(scope.getState($sourceStatus).yandex).toBe("ready");
    const sub = scope.getState($subs)[1];
    expect(wordTimesFor(sub, "yandex", scope.getState($wordTiming))[0]).toEqual({ start: 4300, end: 4600 });
  });

  it("waits while Yandex is still processing the video", async () => {
    const { scope } = setup({ yandex: true });
    answerNextMessage("yandexWordTimes", { waiting: true });

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(scope.getState($sourceStatus).yandex).toBe("waiting");
  });
});

describe("word times from the speech heard", () => {
  it("fits the words into the speech once the cue's audio was heard", async () => {
    const { scope } = setup({ tracks: [] });
    await allSettled(esSubsChanged, { scope, params: "en" });
    const sub = scope.getState($subs)[1];
    const timing = { ...scope.getState($wordTiming) };

    expect(wordTimesFor(sub, "speech", timing)).toBeNull();

    timing.speech = { speech: [{ start: sub.start + 400, end: sub.start + 2000 }], heard: [{ start: 0, end: 60_000 }] };
    const times = wordTimesFor(sub, "speech", timing);
    expect(times[0].start).toBe(sub.start + 400);
    expect(times.at(-1).end).toBeCloseTo(sub.start + 2000);
    expect(scope.getState($speech)).toEqual({ speech: [], heard: [] });
  });
});
