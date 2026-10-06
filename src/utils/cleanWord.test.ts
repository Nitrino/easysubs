import { describe, expect, it } from "vitest";
import { cleanWord } from "./cleanWord";

describe("cleanWord", () => {
  it("strips punctuation around a word", () => {
    expect(cleanWord("keys.")).toBe("keys");
    expect(cleanWord('"B",')).toBe("B");
    expect(cleanWord("(Hello!)")).toBe("Hello");
    expect(cleanWord("go?\n")).toBe("go");
  });

  it("keeps apostrophes, accents and non-Latin letters", () => {
    expect(cleanWord("won't")).toBe("won't");
    expect(cleanWord("café")).toBe("café");
    expect(cleanWord("¿Estás")).toBe("¿Estás");
    expect(cleanWord("ключи.")).toBe("ключи");
  });

  it("joins hyphenated words and times", () => {
    expect(cleanWord("well-known")).toBe("wellknown");
    expect(cleanWord("7:45")).toBe("745");
  });
});
