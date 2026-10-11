import { describe, expect, it, vi } from "vitest";
import type { TFrequency } from "./format";
import { LEVEL_BANDS, createFrequencyLookup, frequencyLanguage, rankOf } from "./lookup";

// "go" said most, then "it", "s", "key"; "went" and "keys" are their forms
const FREQUENCY: TFrequency = {
  language: "en",
  source: "test",
  license: "CC BY-SA 4.0",
  lemmas: ["go", "it", "s", "key", "don", "t"],
  forms: { go: 0, went: 0, it: 1, s: 2, key: 3, keys: 3, don: 4, t: 5 },
};

describe("frequencyLanguage", () => {
  it("shares a list between a language's regions", () => {
    expect(frequencyLanguage("pt-BR")).toBe("pt");
    expect(frequencyLanguage("en")).toBe("en");
    expect(frequencyLanguage("ja")).toBeNull();
  });
});

describe("rankOf", () => {
  it("gives a form its dictionary form's rank", () => {
    expect(rankOf(FREQUENCY, "went")).toEqual(["go", 1]);
    expect(rankOf(FREQUENCY, "keys")).toEqual(["key", 4]);
    expect(rankOf(FREQUENCY, "gerald")).toBeNull();
  });

  it("ranks a contraction by its rarer part, as its own word", () => {
    expect(rankOf(FREQUENCY, "it's")).toEqual(["it's", 3]);
    expect(rankOf(FREQUENCY, "don't")).toEqual(["don't", 6]);
    expect(rankOf(FREQUENCY, "gerald's")).toBeNull();
  });
});

describe("createFrequencyLookup", () => {
  it("loads a language's list once and answers for the words it has", async () => {
    const load = vi.fn(async () => FREQUENCY);
    const lookup = createFrequencyLookup(load);

    expect(await lookup.ranks("en-US", ["Went", "keys", "Gerald"])).toEqual({
      Went: ["go", 1],
      keys: ["key", 4],
    });
    await lookup.ranks("en", ["it"]);
    expect(load).toHaveBeenCalledTimes(1);
    expect(await lookup.ranks("ja", ["it"])).toEqual({});
  });

  it("loads a list again after it failed", async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue(FREQUENCY);
    const lookup = createFrequencyLookup(load);
    await expect(lookup.ranks("en", ["it"])).rejects.toThrow("offline");
    expect(await lookup.ranks("en", ["it"])).toEqual({ it: ["it", 2] });
  });

  it("samples words of each band longer than two letters", async () => {
    const lemmas = Array.from({ length: 20000 }, (_, index) => (index % 10 === 0 ? "ab" : `word${index}`));
    const lookup = createFrequencyLookup(async () => ({ ...FREQUENCY, lemmas, forms: {} }));

    const words = await lookup.sample("en", 2, () => 0);

    expect(words).toHaveLength(LEVEL_BANDS.length * 2);
    expect(words.slice(0, 2)).toEqual([
      { word: "word1", rank: 2 },
      { word: "word2", rank: 3 },
    ]);
    expect(words[2]).toEqual({ word: "word1001", rank: 1002 });
  });
});
