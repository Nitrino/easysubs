import { describe, expect, it } from "vitest";
import { MAX_BATCH_CHARS, MAX_BATCH_LINES, nextTranslationBatch } from "./secondaryTranslationWindow";
import { convertRawSubs } from "./convertRawSubs";
import { playgroundSubs } from "@root/test/fixtures";

const english = playgroundSubs("en");
const textAt = (seconds: number) =>
  english.find((sub) => sub.start <= seconds * 1000 && seconds * 1000 <= sub.end)!.cleanedText;

// A cue every 3 s for 10 minutes
const longFilm = convertRawSubs(
  Array.from({ length: 200 }, (_, index) => ({
    start: index * 3000,
    end: index * 3000 + 2500,
    text: `Line number ${index}`,
  })),
);

const batch = (time: number, translations: Record<string, string> = {}, pendings: Record<string, boolean> = {}) =>
  nextTranslationBatch({ subs: longFilm, time, translations, pendings });

describe("nextTranslationBatch", () => {
  it("takes the lines of the next two minutes from the playhead", () => {
    const texts = batch(60_000);

    expect(texts[0]).toBe("Line number 20");
    expect(texts.at(-1)).toBe("Line number 59");
    expect(texts).toHaveLength(40);
  });

  it("includes the line on screen", () => {
    expect(batch(61_000)[0]).toBe("Line number 20");
  });

  it("waits while the next 30 seconds are translated", () => {
    const translated = Object.fromEntries(batch(0).map((text) => [text, "translated"]));

    expect(batch(60_000, translated)).toEqual([]);
    // 30 s before the end of the window, the next one is asked for
    expect(batch(95_000, translated)[0]).toBe("Line number 40");
  });

  it("skips the lines being translated", () => {
    const pendings = Object.fromEntries(batch(0).map((text) => [text, true]));

    expect(batch(0, {}, pendings)).toEqual([]);
  });

  it("starts at the new time after a seek", () => {
    const translated = Object.fromEntries(batch(0).map((text) => [text, "translated"]));

    expect(batch(300_000, translated)[0]).toBe("Line number 100");
  });

  it("asks once for a line said twice", () => {
    const repeated = convertRawSubs([
      { start: 0, end: 1000, text: "Yes." },
      { start: 2000, end: 3000, text: "Yes." },
    ]);

    expect(nextTranslationBatch({ subs: repeated, time: 0, translations: {}, pendings: {} })).toEqual(["Yes."]);
  });

  it("keeps a batch within the translators' limits", () => {
    const dense = convertRawSubs(
      Array.from({ length: 120 }, (_, index) => ({ start: index * 500, end: index * 500 + 400, text: `${index}` })),
    );
    const wordy = convertRawSubs(
      Array.from({ length: 40 }, (_, index) => ({
        start: index * 2000,
        end: index * 2000 + 1500,
        text: `${index} ${"long ".repeat(40)}`,
      })),
    );

    expect(nextTranslationBatch({ subs: dense, time: 0, translations: {}, pendings: {} })).toHaveLength(
      MAX_BATCH_LINES,
    );
    const texts = nextTranslationBatch({ subs: wordy, time: 0, translations: {}, pendings: {} });
    expect(texts.join("").length).toBeLessThanOrEqual(MAX_BATCH_CHARS);
    expect(texts.length).toBeLessThan(40);
  });

  it("translates the playground's subtitles in one batch", () => {
    const texts = nextTranslationBatch({ subs: english, time: 5000, translations: {}, pendings: {} });

    expect(texts[0]).toBe(textAt(5));
    expect(texts).toHaveLength(22);
  });
});
