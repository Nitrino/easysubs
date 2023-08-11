import ILearningService, { TAditionalData } from "./learningService";

const ANKI_API_VERSION = 6;
const ANKI_DESK = "Easysubs";
const ANKI_URL = "http://localhost:8765";

export class Anki implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#0d6efd";
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const createDeskResult = await chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: { action: "createDeck", version: ANKI_API_VERSION, params: { deck: ANKI_DESK } },
    });

    if (createDeskResult.error) {
      return Promise.reject("Anki Error: " + JSON.stringify(createDeskResult));
    }

    const assWordResult = await chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: {
        action: "addNote",
        version: ANKI_API_VERSION,
        params: {
          note: {
            deckName: ANKI_DESK,
            modelName: "Basic",
            fields: {
              Front: word,
              Back: translation,
            },
          },
        },
      },
    });

    if (assWordResult.error) {
      return Promise.reject("Anki Error: " + JSON.stringify(assWordResult));
    } else {
      return Promise.resolve("Word added to Anki");
    }
  }
}
