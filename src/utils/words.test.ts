import { describe, expect, it } from "vitest";
import type { TSavedWord } from "@src/models/types";
import { captions } from "@root/test/fixtures";
import { convertRawSubs } from "./convertRawSubs";
import {
  REVIEW_INTERVALS,
  episodeScore,
  estimateLevel,
  isDue,
  normalizeWord,
  parseCsv,
  parseWordsFile,
  rankBadge,
  reviewWord,
  viewWord,
  withLine,
  wordsToCsv,
  type TWordsState,
} from "./words";
import type { TWordRank } from "./frequency/lookup";

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

// Ranks as the frequency list gives them for the sample lines
const RANKS: Record<string, TWordRank> = {
  hello: ["hello", 150],
  there: ["there", 60],
  again: ["again", 300],
  the: ["the", 1],
  train: ["train", 2500],
  leaves: ["leave", 400],
  left: ["left", 200],
  at: ["at", 30],
  quixotic: ["quixotic", 40000],
};
const state = (words: Record<string, TSavedWord> = {}, level: number | null = 1000): TWordsState => ({
  words,
  language: "en",
  ranks: RANKS,
  level,
});

describe("viewWord", () => {
  it("knows a word within the level by its dictionary form", () => {
    expect(viewWord(state(), "Leaves,")).toEqual({
      word: "leaves",
      lemma: "leave",
      rank: 400,
      status: "known",
      marked: false,
    });
  });

  it("calls the next most said words new and rarer ones and names rare", () => {
    expect(viewWord(state(), "train")?.status).toBe("new");
    expect(viewWord(state(), "quixotic")?.status).toBe("rare");
    expect(viewWord(state(), "Gerald")).toMatchObject({ lemma: "gerald", rank: null, status: "rare" });
    expect(viewWord(state(), "7:45")).toBeNull();
  });

  it("puts the user's mark over the level, by the dictionary form or the form saved before", () => {
    expect(viewWord(state({ "en:leave": saved("leave", "learning") }), "leaves")).toMatchObject({
      status: "learning",
      marked: true,
    });
    expect(viewWord(state({ "en:train": saved("train", "known") }), "Train")?.status).toBe("known");
    expect(viewWord(state({ "en:leaves": saved("leaves", "learning") }), "leaves")?.status).toBe("learning");
  });

  it("has every word unmarked new where the language has no frequency list", () => {
    const view = viewWord({ words: {}, language: "ja", ranks: null, level: null }, "Hello");
    expect(view).toMatchObject({ lemma: "hello", rank: null, status: "new" });
  });
});

describe("rankBadge", () => {
  it("rounds the rank up to a top", () => {
    expect(rankBadge(60)).toBe("Top 100");
    expect(rankBadge(400)).toBe("Top 500");
    expect(rankBadge(2500)).toBe("Top 3k");
    expect(rankBadge(40000)).toBe("Rare");
    expect(rankBadge(null)).toBeNull();
  });
});

describe("episodeScore", () => {
  const subs = convertRawSubs(captions([0, 1, "Hello there! Hello again."], [1, 2, "- The train leaves at 7:45."]));

  it("counts every ranked word as said, known ones toward the percent", () => {
    // hello hello there again the train leaves at: all known but train at level 1000
    expect(episodeScore(subs, state())).toEqual({
      total: 8,
      known: 7,
      learning: 0,
      newWords: ["train"],
      unknown: ["train"],
      percent: 87,
    });
  });

  it("leaves names out unless they're marked", () => {
    const named = convertRawSubs(captions([0, 1, "Hello Gerald."]));
    expect(episodeScore(named, state())).toMatchObject({ total: 1, known: 1, unknown: ["gerald"] });
    expect(episodeScore(named, state({ "en:gerald": saved("gerald", "known") }))).toMatchObject({
      total: 2,
      known: 2,
      unknown: [],
    });
  });

  it("counts learning words and the new ones said most first", () => {
    const score = episodeScore(subs, state({ "en:train": saved("train", "learning") }, 0));
    expect(score.newWords[0]).toBe("hello");
    expect(score.newWords).not.toContain("train");
    expect(score.learning).toBe(1);
    expect(score.percent).toBe(0);
  });

  it("is zero without words", () => {
    expect(episodeScore([], state()).percent).toBe(0);
  });
});

describe("estimateLevel", () => {
  it("adds up each band's share of known words", () => {
    const answers = [
      { rank: 10, known: true },
      { rank: 900, known: true },
      { rank: 1500, known: true },
      { rank: 1900, known: false },
      { rank: 2500, known: false },
    ];
    // 1000 + 500 + 0
    expect(estimateLevel(answers, [1000, 2000, 3000])).toBe(1500);
    expect(estimateLevel([], [1000])).toBe(0);
  });
});

describe("withLine", () => {
  it("keeps the latest lines first, each once", () => {
    const lines = ["a", "b", "c"].map((line) => ({ line }));
    expect(withLine(lines, { line: "d" })?.map(({ line }) => line)).toEqual(["d", "a", "b"]);
    expect(withLine(lines, { line: "b" })?.map(({ line }) => line)).toEqual(["b", "a", "c"]);
    expect(withLine(lines, undefined)).toBe(lines);
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
      partOfSpeech: "noun",
      lines: [{ line: 'I need my "keys", now.', source: "The Night Train", url: "https://example.com/?t=4s" }],
    }),
    saved("train", "known"),
  ];

  it("writes a header and a row per word, quoting cells with commas and quotes", () => {
    expect(wordsToCsv(words)).toBe(
      "word,translation,part of speech,status,language,context,source,url,added\r\n" +
        'keys,ключи,noun,learning,en,"I need my ""keys"", now.",The Night Train,https://example.com/?t=4s,2026-10-11T12:00:00.000Z\r\n' +
        "train,,,known,en,,,,2026-10-11T12:00:00.000Z\r\n",
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
