import { describe, expect, it, vi } from "vitest";
import { createExpressionFinder, expressionLanguage } from "./lookup";
import { EXPRESSION_LANGUAGES } from "./lexicon";
import { lexicon } from "@root/test/expressions";

describe("expressionLanguage", () => {
  it("finds the list of a language, with or without its region", () => {
    expect(expressionLanguage("en")).toBe("en");
    expect(expressionLanguage("pt-BR")).toBe("pt");
    expect(expressionLanguage("ja")).toBe(null);
    expect(expressionLanguage("auto")).toBe(null);
  });

  it("has a list for every language it names", () => {
    for (const language of EXPRESSION_LANGUAGES) {
      expect(lexicon(language)).toMatchObject({ language, license: expect.stringContaining("CC BY-SA") });
      expect(lexicon(language).expressions.length).toBeGreaterThan(1000);
    }
  });
});

describe("createExpressionFinder", () => {
  it("finds the expressions of each cue, loading a language's list once", async () => {
    const load = vi.fn(async (language: string) => lexicon(language));
    const find = createExpressionFinder(load);

    expect(await find("en", [["She", "picked", "up", "the", "keys."], ["Hello."]])).toEqual([
      [{ expression: "pick up", kind: "phrasal verb", indexes: [1, 2] }],
      [],
    ]);
    await find("en-US", [["Give", "up."]]);

    expect(load.mock.calls).toEqual([["en"]]);
  });

  it("finds nothing in languages without a list, without loading one", async () => {
    const load = vi.fn();
    const find = createExpressionFinder(load);

    expect(await find("ja", [["こんにちは"], ["さようなら"]])).toEqual([[], []]);
    expect(load).not.toHaveBeenCalled();
  });

  it("loads a list again after it failed to", async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error("404")).mockResolvedValue(lexicon("en"));
    const find = createExpressionFinder(load);

    await expect(find("en", [["Give", "up."]])).rejects.toThrow("404");
    expect(await find("en", [["Give", "up."]])).toEqual([
      [{ expression: "give up", kind: "phrasal verb", indexes: [0, 1] }],
    ]);
  });
});
