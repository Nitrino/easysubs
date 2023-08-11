import { Anki } from "@src/learning-service/anki";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { PuzzleEnglish } from "@src/learning-service/puzzleEnglish";
import { TLearningService } from "@src/models/types";

export const getLearningService = (learningService: TLearningService) => {
  if (learningService === "anki") {
    return new Anki();
  }
  if (learningService === "lingualeo") {
    return new LinguaLeo();
  }
  if (learningService === "puzzle-english") {
    return new PuzzleEnglish();
  }
};
