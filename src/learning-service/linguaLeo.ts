import ILearningService, { TAditionalData } from "./learningService";

export class LinguaLeo implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#FFC900";
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const url = new URL("https://api.lingualeo.com/addword");
    const data = {
      word: word,
      tword: translation,
      port: 1001,
      context_url: window.location.href,
      context_title: document.title,
      ...(aditionalData["context"] ? { part_of_speech: aditionalData["context"] } : null),
    };

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { type: "postFormDataRequest", url: url.toString(), data: data },
        (response: { error_msg?: string }) => {
          response.error_msg
            ? reject("LinguaLeo Error: " + JSON.stringify(response))
            : resolve("Word added to LinguaLeo");
        }
      );
    });
  }
}
