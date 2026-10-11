import { describe, expect, it } from "vitest";

import type { TTimedWord } from "@src/models/types";
import { wordsToCues } from "./wordsToCues";
import { describeAiStatus } from "./status";
import { AI_SUBS_LANGUAGES } from "./languages";

// Words said one after another, `gap` ms apart, each 300 ms long
const said = (text: string, start = 0, gap = 100): TTimedWord[] =>
  text
    .split(" ")
    .map((word, index) => ({ text: word, start: start + index * (300 + gap), end: start + index * (300 + gap) + 300 }));

describe("wordsToCues", () => {
  it("makes a line of a phrase, keeping its words' times from the line's start", () => {
    const cues = wordsToCues(said("I just need to pick up my keys", 2000), "en");

    expect(cues).toHaveLength(1);
    expect(cues[0]).toMatchObject({ start: 2000, text: "I just need to pick up my keys" });
    expect(cues[0].words[1]).toEqual({ text: "just", start: 400, end: 700 });
    // It stays up a little after the last word
    expect(cues[0].end).toBe(2000 + 7 * 400 + 300 + 600);
  });

  it("starts a new line after a pause, until the next line starts", () => {
    const cues = wordsToCues([...said("Wait for me", 0), ...said("Almost there", 2000)], "en");

    expect(cues.map((cue) => cue.text)).toEqual(["Wait for me", "Almost there"]);
    expect(cues[0].end).toBe(1700);
  });

  it("ends a line after a sentence once it has some length, not after a short one", () => {
    const cues = wordsToCues(said("Okay. We should get going now. The train leaves at nine."), "en");

    expect(cues.map((cue) => cue.text)).toEqual(["Okay. We should get going now.", "The train leaves at nine."]);
  });

  it("splits what's too long to read", () => {
    const long = Array.from({ length: 30 }, (_, index) => `word${index}`).join(" ");
    const cues = wordsToCues(said(long, 0, 0), "en");

    expect(cues.length).toBeGreaterThan(1);
    cues.forEach((cue) => {
      expect(String(cue.text).length).toBeLessThanOrEqual(84);
      expect(Number(cue.end) - Number(cue.start)).toBeLessThanOrEqual(6000 + 600);
    });
  });

  it("joins words without spaces in Japanese and Chinese", () => {
    const cues = wordsToCues(said("今日 は 雨 です"), "ja");

    expect(cues[0].text).toBe("今日は雨です");
  });

  it("drops Whisper's loops and tags, and sorts what comes out of order", () => {
    const words = [
      ...said("thank you", 1000),
      ...said("you you you you you", 2000, 0),
      { text: "<i>", start: 50, end: 60 },
    ];
    const cues = wordsToCues(words.reverse(), "en");

    expect(cues.map((cue) => cue.text).join(" ")).toBe("thank you you you");
  });
});

describe("describeAiStatus", () => {
  it("tells the download, then the lines as they come", () => {
    expect(describeAiStatus({ whisper: "", audio: "" }, 0)).toMatch(/play it/);
    expect(describeAiStatus({ whisper: "", audio: "listening" }, 0)).toBe("Listening to the video…");
    expect(describeAiStatus({ whisper: "downloading 40%", audio: "" }, 0)).toMatch(/speech model.*40%/);
    expect(describeAiStatus({ whisper: "recognizing", audio: "" }, 0)).toBe("Transcribing…");
    expect(describeAiStatus({ whisper: "ready", audio: "" }, 12)).toBe("12 lines so far, more as the video plays");
  });

  it("points protected video to listening to the tab", () => {
    expect(describeAiStatus({ whisper: "", audio: "no audio from the video: not supported with EME" }, 0)).toMatch(
      /Listen to this tab/,
    );
    expect(describeAiStatus({ whisper: "no speech models: The speech models need Chrome", audio: "" }, 0)).toBe(
      "Can't run the speech model here: The speech models need Chrome",
    );
  });
});

describe("AI_SUBS_LANGUAGES", () => {
  it("lists the languages Whisper knows, by Whisper's codes", () => {
    const codes = AI_SUBS_LANGUAGES.map((language) => language.value);

    expect(codes).toEqual(expect.arrayContaining(["en", "ru", "es", "zh", "jw"]));
    expect(codes).not.toContain("zh-CN");
    expect(codes).not.toContain("ceb");
  });
});
