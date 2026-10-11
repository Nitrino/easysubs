import { describe, expect, it } from "vitest";
import { buildFrequency, lemmaOf } from "./frequency.ts";

const DICTIONARY = {
  words: { go: [], left: [], key: [] },
  forms: { went: ["go"], left: ["leave"], keys: ["key"], goes: ["go"] },
} as unknown as Parameters<typeof lemmaOf>[1];

describe("lemmaOf", () => {
  it("keeps a word with its own entry and leads a form to its dictionary form", () => {
    expect(lemmaOf("left", DICTIONARY)).toBe("left");
    expect(lemmaOf("went", DICTIONARY)).toBe("go");
    expect(lemmaOf("gerald", DICTIONARY)).toBe("gerald");
  });
});

describe("buildFrequency", () => {
  it("ranks dictionary forms by the counts of all their forms", () => {
    const frequency = buildFrequency(
      "en",
      [
        ["keys", 50],
        ["Went", 40],
        ["go", 30],
        ["key", 20],
        ["goes", 5],
        ["7", 100],
        ["went", 1000],
      ],
      DICTIONARY,
    );

    // go 75, key 70; numbers and repeated forms are left out
    expect(frequency.lemmas).toEqual(["go", "key"]);
    expect(frequency.forms).toEqual({ keys: 1, went: 0, go: 0, key: 1, goes: 0 });
    expect(frequency.license).toBe("CC BY-SA 4.0");
  });
});
