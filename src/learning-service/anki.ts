import ILearningService, { TAditionalData } from "./learningService";

const ANKI_API_VERSION = 6;
const ANKI_DESK = "Easysubs";
const ANKI_URL = "http://localhost:8765";

// Own note type, so cards don't depend on the user's note types or Anki UI language
const ANKI_MODEL = "Easysubs";
const ANKI_MODEL_FIELDS = ["Word", "Translation", "Part of Speech", "Context"];
const ANKI_MODEL_CSS = `.card {
  font-family: arial;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
}

.word {
  font-size: 28px;
}

.part-of-speech,
.context {
  font-size: 16px;
  opacity: 0.6;
}`;
const ANKI_MODEL_FRONT = `<div class="word">{{Word}}</div>
{{#Context}}<div class="context">{{Context}}</div>{{/Context}}`;
const ANKI_MODEL_BACK = `{{FrontSide}}

<hr id=answer>

<div class="translation">{{Translation}}</div>
{{#Part of Speech}}<div class="part-of-speech">{{Part of Speech}}</div>{{/Part of Speech}}`;

export class Anki implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#0d6efd";
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const createDeskResult = await this.request("createDeck", { deck: ANKI_DESK });

    if (createDeskResult.error === "connection error") {
      return Promise.reject("Error connecting to Anki. Please make sure Anki is running and AnkiConnect is installed.");
    }

    if (createDeskResult.error) {
      return Promise.reject("Anki Error: " + createDeskResult.error);
    }

    const createModelError = await this.createModelIfMissing();

    if (createModelError) {
      return Promise.reject("Anki Error: " + createModelError);
    }

    const partOfSpeech = aditionalData.partOfSpeech === "unknown" ? "" : aditionalData.partOfSpeech;
    const addWordResult = await this.request("addNote", {
      note: {
        deckName: ANKI_DESK,
        modelName: ANKI_MODEL,
        fields: {
          Word: word,
          Translation: translation,
          "Part of Speech": partOfSpeech ?? "",
          Context: aditionalData.context ?? "",
        },
      },
    });

    if (addWordResult.error) {
      if (addWordResult.error === "cannot create note because it is a duplicate") {
        return Promise.resolve("Word already exists in Anki");
      }

      return Promise.reject("Anki Error: " + addWordResult.error);
    } else {
      return Promise.resolve("Word added to Anki");
    }
  }

  private async createModelIfMissing(): Promise<string | null> {
    const modelNamesResult = await this.request("modelNames");

    if (modelNamesResult.error) {
      return modelNamesResult.error;
    }

    if (modelNamesResult.result.includes(ANKI_MODEL)) {
      return null;
    }

    const createModelResult = await this.request("createModel", {
      modelName: ANKI_MODEL,
      inOrderFields: ANKI_MODEL_FIELDS,
      css: ANKI_MODEL_CSS,
      cardTemplates: [{ Name: "Word", Front: ANKI_MODEL_FRONT, Back: ANKI_MODEL_BACK }],
    });

    // Another addWord call may have created the model in the meantime
    if (createModelResult.error && createModelResult.error !== "Model name already exists") {
      return createModelResult.error;
    }

    return null;
  }

  private request(action: string, params?: object) {
    return chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: { action, version: ANKI_API_VERSION, params },
    });
  }
}
