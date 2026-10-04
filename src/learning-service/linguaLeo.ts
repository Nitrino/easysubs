import ILearningService, { TAditionalData } from "./learningService";

type TLingualeoMessageResponse = {
  error?: string;
  lingualeoResponse?: { data?: { error?: { code?: unknown }; word?: unknown }[] };
};

export class LinguaLeo implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#FFC900";
  }

  public async addWord(word: string, translation: string, _aditionalData: TAditionalData): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { type: "addWordToLingualeo", word: word, translation: translation },
        (response: TLingualeoMessageResponse) => {
          if (chrome.runtime.lastError) {
            reject("Extension Error: " + chrome.runtime.lastError.message);
            return;
          }
          if (response?.error === "not_authenticated") {
            reject("LinguaLeo: please log in at lingualeo.com");
            return;
          }
          if (response && response.error) {
            reject("LinguaLeo Fetch Error: " + response.error);
            return;
          }
          const leo = response?.lingualeoResponse;
          if (!leo) {
            reject("LinguaLeo Error: Empty response from background script.");
            return;
          }

          if (leo.data && leo.data[0] && leo.data[0].error) {
            const errCode = leo.data[0].error.code;
            if (errCode === "6") {
              reject("LinguaLeo: Premium required (meatballs error).");
            } else {
              reject("LinguaLeo API Error: " + JSON.stringify(leo.data[0].error));
            }
          } else if (leo.data && leo.data[0] && leo.data[0].word) {
            resolve("Word added to LinguaLeo");
          } else {
            reject("LinguaLeo Unknown Error: " + JSON.stringify(leo));
          }
        },
      );
    });
  }
}
