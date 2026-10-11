import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import {
  $episodeScore,
  $savedWordsOpen,
  $words,
  episodeWordsMarkedKnown,
  savedWordsClosed,
  savedWordsOpened,
  wordReviewed,
  wordStatusChanged,
  wordsImported,
  wordsRemoved,
} from ".";
import { $rawSubs, $subsLanguage } from "../subs";
import { captions } from "@root/test/fixtures";
import type { TSavedWord } from "../types";

const NOW = Date.parse("2026-10-11T12:00:00Z");
const RAW = captions([4, 6.8, "Almost. I just need to pick up my keys."], [7.2, 10, "Hold on, the keys!"]);

const scopeWith = (words: Record<string, TSavedWord> = {}, language = "en") =>
  fork({
    values: [
      [$rawSubs, RAW],
      [$subsLanguage, language],
      [$words, words],
    ],
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
      params: { text: "keys.", status: "learning", translation: "ключи", cueId: 0 },
    });

    expect(scope.getState($words)).toEqual({
      "en:keys": {
        word: "keys",
        language: "en",
        status: "learning",
        translation: "ключи",
        context: {
          line: "Almost. I just need to pick up my keys.",
          url: location.href,
          time: 4000,
        },
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

  it("keeps the line and translation a word was saved with", async () => {
    const context = { line: "Earlier line", time: 1 };
    const scope = scopeWith({
      "en:keys": { word: "keys", language: "en", status: "known", translation: "ключи", context, added: 1 },
    });

    await allSettled(wordStatusChanged, { scope, params: { text: "keys", status: "learning", cueId: 1 } });

    expect(scope.getState($words)["en:keys"]).toMatchObject({ status: "learning", translation: "ключи", context });
  });

  it("tells how much of the episode is known", async () => {
    const scope = scopeWith({
      "en:keys": { word: "keys", language: "en", status: "known", added: 1 },
      "en:the": { word: "the", language: "en", status: "learning", added: 1 },
    });

    // 13 words, keys twice
    expect(scope.getState($episodeScore)).toMatchObject({ total: 13, known: 2, learning: 1, percent: 15 });
    expect(scope.getState($episodeScore)?.newWords).toHaveLength(10);

    await allSettled(episodeWordsMarkedKnown, { scope });
    expect(scope.getState($episodeScore)).toMatchObject({ known: 12, learning: 1, percent: 92, newWords: [] });
    expect(scope.getState($words)["en:the"].status).toBe("learning");
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
