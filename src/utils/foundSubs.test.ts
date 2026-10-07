import { describe, expect, it } from "vitest";

import type { Captions, TFoundVideo } from "@src/models/types";
import { FPS_RATES, alignSubs, isSameTiming, overlapScore, retimeCaptions } from "./alignSubs";
import { cleanFoundCaptions, isAdLine, stripSoundDescriptions } from "./cleanFoundSubs";
import {
  MAX_CACHED_FILES,
  MAX_REMEMBERED_VIDEOS,
  readFoundFile,
  rememberVideo,
  writeFoundFile,
} from "./foundSubsCache";
import { describeQuota, describeSync, describeTiming, formatRate, formatShift } from "./foundSubsText";
import { playgroundCaptions } from "@root/test/fixtures";

// The playground's English lines are the reference; its Spanish file is found online, timed for other releases
const english = playgroundCaptions("en");
const spanish = playgroundCaptions("es");

describe("alignSubs", () => {
  it("finds a file in step as it is", () => {
    expect(alignSubs(spanish, english)).toEqual({ shift: 0, rate: 1, confident: true });
  });

  it("finds the shift of a release with a longer opening", () => {
    const late = retimeCaptions(spanish, { shift: 2.4, rate: 1 });
    expect(alignSubs(late, english)).toEqual({ shift: -2.4, rate: 1, confident: true });
  });

  it("finds the stretch of a file timed for 25 fps", () => {
    const pal = retimeCaptions(spanish, { shift: 1.6, rate: 23.976 / 25 });
    const alignment = alignSubs(pal, english);
    expect(alignment?.rate).toBe(FPS_RATES[1]);
    expect(alignment?.shift).toBeCloseTo(-1.67, 1);
    expect(alignment?.confident).toBe(true);
  });

  it("isn't confident about a file of something else, and has nothing to say without lines", () => {
    const other: Captions = Array.from({ length: 40 }, (_, index) => ({
      start: 200_000 + index * 9000,
      end: 200_000 + index * 9000 + 700,
      text: "x",
    }));
    expect(alignSubs(other, english)?.confident).toBe(false);
    expect(alignSubs([], english)).toBeNull();
    expect(alignSubs(spanish, [])).toBeNull();
    // One line fits anywhere
    expect(alignSubs([{ start: 4000, end: 6800, text: "Dropped line." }], english)).toBeNull();
  });

  it("scores the time lines overlap", () => {
    const cues = [{ start: 0, end: 1000 }];
    expect(overlapScore(cues, [{ start: 500, end: 2000 }], 1, 0)).toBe(500);
    expect(overlapScore(cues, [{ start: 500, end: 2000 }], 1, 500)).toBe(1000);
  });

  it("moves captions and compares timings", () => {
    expect(retimeCaptions([{ start: 1000, end: 2000, text: "a" }], { shift: -0.5, rate: 2 })).toEqual([
      { start: 1500, end: 3500, text: "a" },
    ]);
    expect(isSameTiming({ shift: 1.001, rate: 1 }, { shift: 1, rate: 1 })).toBe(true);
    expect(isSameTiming({ shift: 1, rate: 1 }, { shift: 1, rate: FPS_RATES[1] })).toBe(false);
  });
});

describe("cleaning found files", () => {
  it("drops the ads subtitle sites add", () => {
    expect(isAdLine("Support us and become VIP member\nto remove all ads from www.OpenSubtitles.org")).toBe(true);
    expect(isAdLine("<font color=yellow>Advertise your product or brand here</font>")).toBe(true);
    expect(isAdLine("Synced and corrected by VitoSilans\nwww.addic7ed.com")).toBe(true);
    expect(isAdLine("I'll open subtitles for you.")).toBe(false);
  });

  it("removes sound descriptions, speaker names and lyrics", () => {
    expect(stripSoundDescriptions("[door creaks]\nWho's there?")).toBe("Who's there?");
    expect(stripSoundDescriptions("(SIGHS) Fine.")).toBe("Fine.");
    expect(stripSoundDescriptions("I said (quietly) no.")).toBe("I said (quietly) no.");
    expect(stripSoundDescriptions("- JOHN: Hello.\n- MARY: Hi.")).toBe("- Hello.\n- Hi.");
    expect(stripSoundDescriptions("♪ La la la ♪")).toBe("");
    expect(stripSoundDescriptions("- [gasps]\n- Run!")).toBe("- Run!");
  });

  it("keeps the dialogue in time order", () => {
    const captions: Captions = [
      { start: 5000, end: 6000, text: "Second" },
      { start: 1000, end: 2000, text: "Downloaded from www.OpenSubtitles.org" },
      { start: 2000, end: 3000, text: "[thunder]" },
      { start: 3000, end: 4000, text: "First" },
    ];
    expect(cleanFoundCaptions(captions).map((cue) => cue.text)).toEqual(["[thunder]", "First", "Second"]);
    expect(cleanFoundCaptions(captions, { stripSdh: true }).map((cue) => cue.text)).toEqual(["First", "Second"]);
  });
});

describe("the cache of found files", () => {
  it("keeps the most recently loaded files", async () => {
    await writeFoundFile("opensubtitles:1", "first");
    expect(await readFoundFile("opensubtitles:1")).toBe("first");
    for (let index = 2; index <= MAX_CACHED_FILES + 1; index++) await writeFoundFile(`opensubtitles:${index}`, "x");
    expect(await readFoundFile("opensubtitles:1")).toBeNull();
    expect(await readFoundFile(`opensubtitles:${MAX_CACHED_FILES + 1}`)).toBe("x");
  });

  it("remembers videos, the newest first, and forgets one that has nothing", () => {
    const choice = { result: { source: "file", id: "a", language: "", release: "a.srt" }, shift: 0, rate: 1 } as const;
    let videos: Record<string, TFoundVideo> = {};
    for (let index = 0; index <= MAX_REMEMBERED_VIDEOS; index++) {
      videos = rememberVideo(videos, `test:page${index}`, { main: choice, at: index });
    }
    expect(Object.keys(videos)).toHaveLength(MAX_REMEMBERED_VIDEOS);
    expect(videos["test:page0"]).toBeUndefined();
    expect(rememberVideo(videos, "test:page5", { at: 999 })["test:page5"]).toBeUndefined();
  });
});

describe("words of the sheet", () => {
  it("formats shifts and stretches", () => {
    expect(formatShift(-2.4)).toBe("−2.40 s");
    expect(formatShift(1.25)).toBe("+1.25 s");
    expect(formatShift(0.001)).toBe("0.00 s");
    expect(formatRate(FPS_RATES[1])).toBe("25 → 23.976 fps");
    expect(formatRate(1)).toBe("");
  });

  it("says how a file was fitted to the video", () => {
    const timing = { shift: -2.4, rate: 1 };
    const synced = { ...timing, confident: true };
    expect(describeSync({ sync: "running", timing, synced: null })).toBe("Auto-syncing…");
    expect(describeSync({ sync: "done", timing, synced })).toBe("Auto-synced: −2.40 s.");
    expect(
      describeSync({ sync: "done", timing: { shift: 0, rate: 1 }, synced: { shift: 0, rate: 1, confident: true } }),
    ).toBe("Auto-sync: already in step with the video.");
    expect(describeSync({ sync: "done", timing: { shift: -2.15, rate: 1 }, synced })).toBe("Shifted by hand: −2.15 s.");
    expect(describeSync({ sync: "skipped", timing: { shift: 0, rate: 1 }, synced: null })).toBe(
      "A release of this service: Auto-sync skipped.",
    );
    expect(describeSync({ sync: "none", timing: { shift: 0, rate: 1 }, synced })).toBe("The file's own timing.");
  });

  it("puts the timing of the Subtitles tab's file card in a few words", () => {
    const none = { shift: 0, rate: 1 };
    expect(describeTiming({ sync: "done", timing: { shift: -7.78, rate: FPS_RATES[1] }, synced: null })).toBe(
      "\u22127.78 s \u00b7 25 \u2192 23.976 fps",
    );
    expect(describeTiming({ sync: "running", timing: none, synced: null })).toBe("Syncing\u2026");
    expect(describeTiming({ sync: "skipped", timing: none, synced: null })).toBe("Same release as the video");
    expect(describeTiming({ sync: "restored", timing: none, synced: null })).toBe("Original timing");
  });

  it("counts OpenSubtitles downloads", () => {
    expect(describeQuota(null, false)).toBe("5 of 5 left today");
    expect(describeQuota(null, true)).toBe("20 of 20 left today");
    expect(describeQuota({ remaining: 3, allowed: 5, resetAt: "" }, false)).toBe("3 of 5 left today");
  });
});
