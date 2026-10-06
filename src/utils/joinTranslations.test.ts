import { describe, expect, it } from "vitest";
import { joinTranslations } from "./joinTranslations";

describe("joinTranslations", () => {
  it("lists lowercased synonyms that don't wrap inside", () => {
    expect(joinTranslations(["Keys", "Door keys", "Pass"])).toBe("keys, door\xa0keys, pass");
  });

  it("gives an empty string without synonyms", () => {
    expect(joinTranslations([])).toBe("");
  });
});
