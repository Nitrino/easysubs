import { describe, expect, it } from "vitest";
import type { TSavedWord } from "@src/models/types";
import { captions } from "@root/test/fixtures";
import { convertRawSubs } from "./convertRawSubs";
import {
  REVIEW_INTERVALS,
  episodeScore,
  isDue,
  normalizeWord,
  parseCsv,
  parseWordsFile,
  reviewWord,
  wordStatus,
  wordsToCsv,
} from "./words";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse("2026-10-11T12:00:00Z");

const saved = (word: string, status: TSavedWord["status"], extra: Partial<TSavedWord> = {}): TSavedWord => ({
  word,
  language: "en",
  status,
  added: NOW,
  ...extra,
});

describe("normalizeWord", () => {
  it("lowercases and strips the punctuation around a word", () => {
    expect(normalizeWord("“Don’t,")).toBe("don't");
    expect(normalizeWord("Hello!")).toBe("hello");
    expect(normalizeWord("¿Qué?")).toBe("qué");
    expect(normalizeWord("well-known")).toBe("well-known");
  });

  it("isn't a word without letters", () => {
    expect(normalizeWord("7:45")).toBeNull();
    expect(normalizeWord("-")).toBeNull();
    expect(normalizeWord("♪")).toBeNull();
  });
});

describe("wordStatus", () => {
  it("is new unless the word is kept in the language", () => {
    const words = { "en:keys": saved("keys", "learning"), "es:hola": saved("hola", "known", { language: "es" }) };
    expect(wordStatus(words, "en", "Keys.")).toBe("learning");
    expect(wordStatus(words, "en-US", "hola")).toBe("new");
    expect(wordStatus(words, "es", "¡Hola!")).toBe("known");
    expect(wordStatus(words, "en", "7:45")).toBeNull();
  });
});

describe("episodeScore", () => {
  const subs = convertRawSubs(captions([0, 1, "Hello there! Hello again."], [1, 2, "- The train leaves at 7:45."]));

  it("counts every word as said, known ones toward the percent", () => {
    const words = { "en:hello": saved("hello", "known"), "en:the": saved("the", "known") };
    // hello hello there again the train leaves at: 3 known of 8
    expect(episodeScore(subs, words, "en")).toEqual({
      total: 8,
      known: 3,
      learning: 0,
      newWords: ["there", "again", "train", "leaves", "at"],
      percent: 37,
    });
  });

  it("puts the new words said most first and leaves learning ones out of them", () => {
    const score = episodeScore(subs, { "en:train": saved("train", "learning") }, "en");
    expect(score.newWords[0]).toBe("hello");
    expect(score.newWords).not.toContain("train");
    expect(score.learning).toBe(1);
    expect(score.percent).toBe(0);
  });

  it("is zero without words", () => {
    expect(episodeScore([], {}, "en").percent).toBe(0);
  });
});

describe("reviewWord", () => {
  it("waits longer after each right answer and knows the word after the last", () => {
    let word = saved("keys", "learning");
    expect(isDue(word, NOW)).toBe(true);

    word = reviewWord(word, "good", NOW);
    expect(word.review).toEqual({ step: 0, due: NOW + REVIEW_INTERVALS[0] * DAY });
    expect(isDue(word, NOW)).toBe(false);

    for (let step = 1; step < REVIEW_INTERVALS.length; step++) word = reviewWord(word, "good", NOW);
    expect(word.review).toEqual({ step: 4, due: NOW + REVIEW_INTERVALS[4] * DAY });

    word = reviewWord(word, "good", NOW);
    expect(word.status).toBe("known");
    expect(word.review).toBeUndefined();
  });

  it("starts over after a wrong answer, a minute later", () => {
    const word = reviewWord(saved("keys", "learning", { review: { step: 3, due: NOW } }), "again", NOW);
    expect(word.review).toEqual({ step: 0, due: NOW + 60_000 });
  });

  it("marks the word known", () => {
    const word = reviewWord(saved("keys", "learning"), "known", NOW);
    expect(word.status).toBe("known");
    expect(isDue(word, NOW)).toBe(false);
  });
});

describe("CSV", () => {
  const words = [
    saved("keys", "learning", {
      translation: "ключи",
      context: { line: 'I need my "keys", now.', source: "The Night Train", url: "https://example.com/?t=4s" },
    }),
    saved("train", "known"),
  ];

  it("writes a header and a row per word, quoting cells with commas and quotes", () => {
    expect(wordsToCsv(words)).toBe(
      "word,translation,status,language,context,source,url,added\r\n" +
        'keys,ключи,learning,en,"I need my ""keys"", now.",The Night Train,https://example.com/?t=4s,2026-10-11T12:00:00.000Z\r\n' +
        "train,,known,en,,,,2026-10-11T12:00:00.000Z\r\n",
    );
  });

  it("reads back what it wrote", () => {
    expect(parseWordsFile(wordsToCsv(words), "es", 0)).toEqual(words);
  });

  it("reads quoted line breaks", () => {
    expect(parseCsv('a,"b\nc"\n\nd,e')).toEqual([
      ["a", "b\nc"],
      ["d", "e"],
    ]);
  });

  it("reads a plain list of words as known in the subtitles' language", () => {
    expect(parseWordsFile("\uFEFFHello\nthe\n42\n", "en-GB", NOW)).toEqual([
      saved("hello", "known"),
      saved("the", "known"),
    ]);
  });
});
