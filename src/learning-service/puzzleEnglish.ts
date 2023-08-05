import ILearningService from "./learningService";

export class PuzzleEnglish implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#88BA28";
  }

  public addWord(word: string, translation: string, aditionalData: Record<string, string>): Promise<string> {
    const url = "https://puzzle-english.com/api2/userDictionary/addWord";
    const data = {
      post_id: 0,
      word: word,
      translation: translation,
      piece_index: 0,
      ...(aditionalData["partOfSpeech"] ? { part_of_speech: aditionalData["partOfSpeech"] } : null),
    };

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: "postFormDataRequest", url: url, data: data }, (response) => {
        response.success ? resolve("Word added to Puzzle English") : reject("Puzzle English Error: " + response.error);
      });
    });
  }
}
