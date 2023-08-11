import ILearningService, { TAditionalData } from "./learningService";

export class PuzzleEnglish implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#88BA28";
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const url = "https://puzzle-english.com/api2/userDictionary/addWord";
    const data = {
      post_id: 0,
      word: word,
      translation: translation,
      piece_index: 0,
      part_of_speech: aditionalData["partOfSpeech"] ?? "verb",
    };

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: "postFormDataRequest", url: url, data: data }, (response) => {
        response.success ? resolve("Word added to Puzzle English") : reject("Puzzle English Error: " + response.error);
      });
    });
  }
}
