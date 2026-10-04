import ILearningService, { TAditionalData } from "./learningService";

export class PuzzleEnglish implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#88BA28";
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { type: "addWordToPuzzleEnglish", word: word },
        (response: { error?: string, status?: boolean }) => {
          if (chrome.runtime.lastError) {
            reject("Extension Error: " + chrome.runtime.lastError.message);
            return;
          }
          response && response.error
            ? reject("Puzzle English Error: " + response.error)
            : response && response.status === false
            ? reject("Puzzle English failed to add word. Might already exist.")
            : resolve("Word added to Puzzle English");
        }
      );
    });
  }
}
