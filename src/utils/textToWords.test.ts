import { describe, expect, it } from "vitest";
import { textToWords } from "./textToWords";

describe("textToWords", () => {
  it("splits text on spaces and keeps punctuation", () => {
    expect(textToWords("Hello there! Are you ready to go?")).toEqual([
      "Hello",
      "there!",
      "Are",
      "you",
      "ready",
      "to",
      "go?",
    ]);
  });

  it("reads the text inside markup", () => {
    expect(textToWords("<i>She always says that.</i>")).toEqual(["She", "always", "says", "that."]);
  });

  it("finds no words in the spaces between tags", () => {
    expect(textToWords("<i>Hi</i> <i>there</i>")).toEqual(["Hi", "there"]);
  });

  it("keeps a line break at the end of the line's last word", () => {
    expect(textToWords("What if we run out of time\nat the station?")).toEqual([
      ...["What", "if", "we", "run", "out", "of", "time\n", "at", "the", "station?"],
    ]);
  });
});
