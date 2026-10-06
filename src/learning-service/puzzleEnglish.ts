import ILearningService, { TAditionalData } from "./learningService";

export class PuzzleEnglish implements ILearningService {
  public async addWord(word: string, _translation: string, _aditionalData: TAditionalData): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { type: "addWordToPuzzleEnglish", word: word },
        (response: { error?: string; status?: boolean }) => {
          if (chrome.runtime.lastError) {
            reject("Extension Error: " + chrome.runtime.lastError.message);
            return;
          }
          if (response && response.error) {
            reject("Puzzle English Error: " + response.error);
          } else if (response && response.status === false) {
            reject("Puzzle English failed to add word. Might already exist.");
          } else {
            resolve("Word added to Puzzle English");
          }
        },
      );
    });
  }
}
