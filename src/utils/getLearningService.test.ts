import { describe, expect, it } from "vitest";
import { getLearningService } from "./getLearningService";
import { Anki } from "@src/learning-service/anki";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { PuzzleEnglish } from "@src/learning-service/puzzleEnglish";

describe("getLearningService", () => {
  it("gives the service chosen in the settings", () => {
    expect(getLearningService("anki")).toBeInstanceOf(Anki);
    expect(getLearningService("lingualeo")).toBeInstanceOf(LinguaLeo);
    expect(getLearningService("puzzle-english")).toBeInstanceOf(PuzzleEnglish);
  });

  it("gives nothing when adding words is disabled", () => {
    expect(getLearningService("disabled")).toBeUndefined();
  });
});
