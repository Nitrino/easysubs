import { describe, expect, it } from "vitest";
import { googleNumberToPartOfSpeach } from "./googleNumberToPartOfSpeach";

describe("googleNumberToPartOfSpeach", () => {
  it("names the parts of speech of Google Translate", () => {
    expect(googleNumberToPartOfSpeach(1)).toBe("noun");
    expect(googleNumberToPartOfSpeach(2)).toBe("verb");
    expect(googleNumberToPartOfSpeach(3)).toBe("adjective");
    expect(googleNumberToPartOfSpeach(10)).toBe("phrase");
    expect(googleNumberToPartOfSpeach(19)).toBe("particle");
  });

  it("names every number from 1 to 19 differently", () => {
    const names = Array.from({ length: 19 }, (_, index) => googleNumberToPartOfSpeach(index + 1));

    expect(new Set(names).size).toBe(19);
    expect(names.some((name) => name.startsWith("unknown"))).toBe(false);
  });

  it("marks an unknown number", () => {
    expect(googleNumberToPartOfSpeach(0)).toBe("unknown number 0");
  });
});
