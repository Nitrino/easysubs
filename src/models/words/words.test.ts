import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import {
  $newWordsColored,
  $episodeScore,
  $levelSetupOpen,
  $savedWordsOpen,
  $wordLevel,
  $wordLevels,
  $wordRanks,
  $words,
  episodeWordsMarkedKnown,
  fetchWordRanksFx,
  levelSet,
  levelSetupOpened,
  syncAnkiFx,
  savedWordsClosed,
  savedWordsOpened,
  wordReviewed,
  wordStatusChanged,
  wordsImported,
  wordsRemoved,
} from ".";
import { $rawSubs, $subsLanguage } from "../subs";
import { captions } from "@root/test/fixtures";
import { answerNextMessage } from "@root/test/chrome";
import type { TSavedWord } from "../types";
import type { TWordRank } from "@src/utils/frequency/lookup";
import { Anki } from "@src/learning-service/anki";

const NOW = Date.parse("2026-10-11T12:00:00Z");
const RAW = captions([4, 6.8, "Almost. I just need to pick up my keys."], [7.2, 10, "Hold on, the keys!"]);

// The frequency list's dictionary forms and ranks of the lines' words; "almost" and "hold" are left out as names are
const RANKS: Record<string, TWordRank> = {
  i: ["i", 1],
  just: ["just", 40],
  need: ["need", 90],
  to: ["to", 5],
  pick: ["pick", 900],
  up: ["up", 50],
  my: ["my", 20],
  keys: ["key", 2600],
  on: ["on", 25],
  the: ["the", 2],
};
const ranksOf = ({ words }: { words: string[] }) =>
  Object.fromEntries(words.map((word) => [word, RANKS[word] ?? null]));

const scopeWith = (words: Record<string, TSavedWord> = {}, language = "en", level: number | null = 1000) =>
  fork({
    values: [
      [$rawSubs, RAW],
      [$subsLanguage, language],
      [$words, words],
      [$wordRanks, { language: "en", ranks: ranksOf({ words: [...Object.keys(RANKS), "almost", "hold"] }) }],
      [$wordLevels, level === null ? {} : { en: level }],
    ],
    handlers: [[fetchWordRanksFx, async (params: { words: string[] }) => ranksOf(params)]],
  });

describe("words", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });
  afterEach(() => vi.useRealTimers());

  it("saves a word as learning with its translation and the line it's from", async () => {
    const scope = scopeWith();

    await allSettled(wordStatusChanged, {
      scope,
      params: { text: "keys.", status: "learning", translation: "ключ", partOfSpeech: "noun", cueId: 0 },
    });

    expect(scope.getState($words)).toEqual({
      "en:key": {
        word: "key",
        language: "en",
        status: "learning",
        translation: "ключ",
        partOfSpeech: "noun",
        lines: [{ line: "Almost. I just need to pick up my keys.", url: location.href, time: 4000 }],
        added: NOW,
      },
    });
  });

  it("marks a word known and forgets it as new; nothing changes before the language is known", async () => {
    const scope = scopeWith({}, "auto");
    await allSettled(wordStatusChanged, { scope, params: { text: "Hold", status: "known" } });
    expect(scope.getState($words)).toEqual({});

    await allSettled($subsLanguage, { scope, params: "en-US" });
    await allSettled(wordStatusChanged, { scope, params: { text: "Hold", status: "known" } });
    expect(scope.getState($words)["en:hold"]).toMatchObject({ status: "known", added: NOW });

    await allSettled(wordStatusChanged, { scope, params: { text: "hold", status: "new" } });
    expect(scope.getState($words)).toEqual({});
  });

  it("keeps the translation and adds the line to the ones a word was saved with, by its form before", async () => {
    const earlier = { line: "Earlier line", time: 1 };
    const scope = scopeWith({
      "en:keys": { word: "keys", language: "en", status: "known", translation: "ключи", lines: [earlier], added: 1 },
    });

    await allSettled(wordStatusChanged, { scope, params: { text: "keys", status: "learning", cueId: 1 } });

    expect(scope.getState($words)).toEqual({
      "en:key": {
        word: "key",
        language: "en",
        status: "learning",
        translation: "ключи",
        lines: [{ line: "Hold on, the keys!", url: location.href, time: 7200 }, earlier],
        added: 1,
      },
    });
  });

  it("tells how much of the episode is known by the level and the marks", async () => {
    const scope = scopeWith({ "en:the": { word: "the", language: "en", status: "learning", added: 1 } });

    // 11 ranked words: keys twice past the level, "the" learning
    expect(scope.getState($episodeScore)).toMatchObject({ total: 11, known: 8, learning: 1, percent: 72 });
    expect(scope.getState($episodeScore)?.newWords).toEqual(["key"]);

    // The names become known words too, and count
    await allSettled(episodeWordsMarkedKnown, { scope });
    expect(scope.getState($episodeScore)).toMatchObject({ total: 13, known: 12, learning: 1, newWords: [] });
    expect(scope.getState($words)["en:key"].status).toBe("known");
    expect(scope.getState($words)["en:the"].status).toBe("learning");
  });

  it("colors new words once the level is set", async () => {
    const scope = scopeWith({}, "en", null);
    expect(scope.getState($wordLevel)).toBeNull();
    expect(scope.getState($newWordsColored)).toBe(false);

    await allSettled(levelSetupOpened, { scope });
    expect(scope.getState($levelSetupOpen)).toBe(true);
    await allSettled(levelSet, { scope, params: { language: "en-US", rank: 2000 } });
    expect(scope.getState($wordLevels)).toEqual({ en: 2000 });
    expect(scope.getState($levelSetupOpen)).toBe(false);
    expect(scope.getState($newWordsColored)).toBe(true);
  });

  it("colors new words at once in languages without a frequency list", () => {
    expect(scopeWith({}, "ja", null).getState($newWordsColored)).toBe(true);
  });

  it("reads Anki's cards: a mature card is known, others learning, known words stay known", async () => {
    vi.spyOn(Anki.prototype, "readWords").mockResolvedValue([
      { word: "keys", translation: "ключи", interval: 30 },
      { word: "pick", translation: "выбирать", interval: 3 },
      { word: "need", translation: "нужно", interval: 1 },
    ]);
    const scope = scopeWith({ "en:need": { word: "need", language: "en", status: "known", added: 1 } });
    answerNextMessage("wordRanks", { ranks: ranksOf({ words: ["keys", "pick", "need"] }) });

    const result = await allSettled(syncAnkiFx, { scope });

    expect(result).toMatchObject({ status: "done", value: { cards: 3, changed: 2 } });
    expect(scope.getState($words)).toEqual({
      "en:need": { word: "need", language: "en", status: "known", added: 1 },
      "en:key": { word: "key", language: "en", status: "known", translation: "ключи", added: NOW, anki: true },
      "en:pick": { word: "pick", language: "en", status: "learning", translation: "выбирать", added: NOW, anki: true },
    });
  });

  it("has no score until the language is known", () => {
    expect(scopeWith({}, "auto").getState($episodeScore)).toBeNull();
  });

  it("reviews a word and removes words", async () => {
    const scope = scopeWith({ "en:keys": { word: "keys", language: "en", status: "learning", added: 1 } });

    await allSettled(wordReviewed, { scope, params: { key: "en:keys", grade: "good" } });
    expect(scope.getState($words)["en:keys"].review).toEqual({ step: 0, due: NOW + 24 * 60 * 60 * 1000 });

    await allSettled(wordsRemoved, { scope, params: ["en:keys"] });
    expect(scope.getState($words)).toEqual({});
  });

  it("adds imported words without replacing the ones kept", async () => {
    const kept: TSavedWord = { word: "keys", language: "en", status: "learning", added: 1 };
    const scope = scopeWith({ "en:keys": kept });

    await allSettled(wordsImported, {
      scope,
      params: [
        { word: "keys", language: "en", status: "known", added: 2 },
        { word: "train", language: "en", status: "known", added: 2 },
      ],
    });

    expect(scope.getState($words)).toEqual({
      "en:keys": kept,
      "en:train": { word: "train", language: "en", status: "known", added: 2 },
    });
  });

  it("opens and closes the saved words", async () => {
    const scope = scopeWith();
    await allSettled(savedWordsOpened, { scope });
    expect(scope.getState($savedWordsOpen)).toBe(true);
    await allSettled(savedWordsClosed, { scope });
    expect(scope.getState($savedWordsOpen)).toBe(false);
  });
});
