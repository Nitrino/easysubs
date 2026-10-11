import { describe, expect, it } from "vitest";
import {
  TRANSCRIPT_MARGIN_LINES,
  findMatches,
  formatTranscriptTime,
  searchTranscript,
  transcriptBatch,
  type TTranscriptLine,
} from "./transcript";
import { MAX_BATCH_LINES } from "./secondaryTranslationWindow";
import { convertRawSubs } from "./convertRawSubs";

const line = (id: number, text: string, second: string | null = null): TTranscriptLine => ({
  id,
  start: id * 1000,
  end: id * 1000 + 900,
  text,
  second,
  pending: false,
});

// A cue every 3 s for 10 minutes
const longFilm = convertRawSubs(
  Array.from({ length: 200 }, (_, index) => ({
    start: index * 3000,
    end: index * 3000 + 2500,
    text: `Line number ${index}`,
  })),
);

describe("formatTranscriptTime", () => {
  it("shows minutes and seconds, and hours when there are some", () => {
    expect(formatTranscriptTime(5_400)).toBe("0:05");
    expect(formatTranscriptTime(65_000)).toBe("1:05");
    expect(formatTranscriptTime(3_725_000)).toBe("1:02:05");
  });
});

describe("findMatches", () => {
  it("finds every match, whatever the case and accents", () => {
    expect(findMatches("Café, CAFE and cafe", "cafe")).toEqual([
      [0, 4],
      [6, 10],
      [15, 19],
    ]);
    expect(findMatches("Ёлка", "елка")).toEqual([[0, 4]]);
  });

  it("finds nothing for an empty query", () => {
    expect(findMatches("Anything", "  ")).toEqual([]);
  });
});

describe("searchTranscript", () => {
  const lines = [line(0, "Where are my keys?", "¿Dónde están mis llaves?"), line(1, "In the kitchen.", null)];

  it("finds lines in either language", () => {
    expect(searchTranscript(lines, "keys")).toEqual([lines[0]]);
    expect(searchTranscript(lines, "donde")).toEqual([lines[0]]);
    expect(searchTranscript(lines, "kitchen")).toEqual([lines[1]]);
    expect(searchTranscript(lines, "nothing like it")).toEqual([]);
  });

  it("keeps every line for an empty query", () => {
    expect(searchTranscript(lines, " ")).toBe(lines);
  });
});

describe("transcriptBatch", () => {
  const batch = (from: number, to: number, translations: Record<string, string> = {}) =>
    transcriptBatch({ subs: longFilm, from, to, translations, pendings: {} });

  it("takes the lines shown first, then those after and before them", () => {
    const texts = batch(100, 109);

    expect(texts.slice(0, 10)).toEqual(Array.from({ length: 10 }, (_, i) => `Line number ${100 + i}`));
    expect(texts[10]).toBe("Line number 110");
    expect(texts).toHaveLength(Math.min(MAX_BATCH_LINES, 10 + 2 * TRANSCRIPT_MARGIN_LINES));
  });

  it("leaves out lines that are translated", () => {
    const translated = Object.fromEntries(batch(100, 109).map((text) => [text, "translated"]));

    expect(batch(100, 109, translated)).toEqual([]);
  });
});
