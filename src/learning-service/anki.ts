import ILearningService, { TAditionalData, TMediaFile, TWordContext } from "./learningService";
import {
  ANKI_CARD_TEMPLATE,
  ANKI_MODEL,
  ANKI_MODEL_BACK,
  ANKI_MODEL_CSS,
  ANKI_MODEL_FIELDS,
  ANKI_MODEL_FRONT,
  contextFields,
  hasLine,
  withNewLine,
  type TNoteFields,
  type TStoredContext,
} from "./ankiNote";

const ANKI_API_VERSION = 6;
const ANKI_DESK = "Easysubs";
const ANKI_URL = "http://localhost:8765";

const ALREADY_EXISTS = "Word already exists in Anki";

type TAnkiAnswer<T = unknown> = { result?: T; error?: string | null };
type TNoteInfo = { noteId: number; fields: Record<string, { value: string; order: number }> };

// Anki's search treats * and _ as wildcards
const searchValue = (value: string) => value.replace(/[\\"*_]/g, "\\$&");

const mediaName = (extension: string) =>
  `easysubs-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

export class Anki implements ILearningService {
  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const createDeskResult = await this.request("createDeck", { deck: ANKI_DESK });

    if (createDeskResult.error === "connection error") {
      return Promise.reject("Error connecting to Anki. Please make sure Anki is running and AnkiConnect is installed.");
    }

    if (createDeskResult.error) {
      return Promise.reject("Anki Error: " + createDeskResult.error);
    }

    const modelError = await this.prepareModel();

    if (modelError) {
      return Promise.reject("Anki Error: " + modelError);
    }

    const { context } = aditionalData;
    try {
      if (context) {
        const note = await this.findNote(word);
        if (note) return await this.addLine(note, context);
      }

      return await this.addNote(word, translation, aditionalData);
    } catch (error) {
      return Promise.reject("Anki Error: " + error);
    }
  }

  private async addNote(word: string, translation: string, { partOfSpeech, context }: TAditionalData) {
    const stored = context ? await this.storeMedia(context) : null;
    const addWordResult = await this.request("addNote", {
      note: {
        deckName: ANKI_DESK,
        modelName: ANKI_MODEL,
        fields: {
          Word: word,
          Translation: translation,
          "Part of Speech": partOfSpeech === "unknown" ? "" : (partOfSpeech ?? ""),
          ...(stored ? contextFields(stored) : { Context: "" }),
        },
      },
    });

    if (addWordResult.error === "cannot create note because it is a duplicate") return ALREADY_EXISTS;
    if (addWordResult.error) throw addWordResult.error;
    return "Word added to Anki";
  }

  // The word is in Anki already: the new line goes on its card
  private async addLine(note: { id: number; fields: TNoteFields }, context: TWordContext) {
    if (hasLine(note.fields, context.sentence)) return ALREADY_EXISTS;

    const stored = await this.storeMedia(context);
    const result = await this.request("updateNoteFields", {
      note: { id: note.id, fields: withNewLine(note.fields, stored) },
    });
    if (result.error) throw result.error;
    return "Word already in Anki: added this line to it";
  }

  private async findNote(word: string): Promise<{ id: number; fields: TNoteFields } | null> {
    const found = await this.request<number[]>("findNotes", {
      query: `"note:${ANKI_MODEL}" "Word:${searchValue(word)}"`,
    });
    if (found.error) throw found.error;
    if (!found.result?.length) return null;

    const info = await this.request<TNoteInfo[]>("notesInfo", { notes: [found.result[0]] });
    if (info.error) throw info.error;
    const note = info.result?.[0];
    if (!note?.fields) return null;
    const fields = Object.fromEntries(Object.entries(note.fields).map(([name, field]) => [name, field.value]));
    return { id: note.noteId, fields };
  }

  // The picture and the sound go into Anki's media folder, the note refers to them by name
  private async storeMedia({ picture, audio, ...context }: TWordContext): Promise<TStoredContext> {
    const store = async (file?: TMediaFile) => {
      if (!file) return undefined;
      const result = await this.request<string>("storeMediaFile", {
        filename: mediaName(file.extension),
        data: file.data,
      });
      if (result.error) throw result.error;
      return result.result;
    };
    return { ...context, picture: await store(picture), audio: await store(audio) };
  }

  // Creates the note type, or adds the fields a note type of an earlier version doesn't have
  private async prepareModel(): Promise<string | null> {
    const modelNamesResult = await this.request<string[]>("modelNames");

    if (modelNamesResult.error) {
      return modelNamesResult.error;
    }

    if (!modelNamesResult.result.includes(ANKI_MODEL)) {
      const createModelResult = await this.request("createModel", {
        modelName: ANKI_MODEL,
        inOrderFields: ANKI_MODEL_FIELDS,
        css: ANKI_MODEL_CSS,
        cardTemplates: [{ Name: ANKI_CARD_TEMPLATE, Front: ANKI_MODEL_FRONT, Back: ANKI_MODEL_BACK }],
      });

      // Another addWord call may have created the model in the meantime
      if (createModelResult.error && createModelResult.error !== "Model name already exists") {
        return createModelResult.error;
      }

      return null;
    }

    return this.upgradeModel();
  }

  private async upgradeModel(): Promise<string | null> {
    const fieldNamesResult = await this.request<string[]>("modelFieldNames", { modelName: ANKI_MODEL });
    if (fieldNamesResult.error) return fieldNamesResult.error;

    const fieldNames = fieldNamesResult.result ?? [];
    const missing = ANKI_MODEL_FIELDS.filter((field) => !fieldNames.includes(field));
    if (missing.length === 0) return null;

    for (const [offset, fieldName] of missing.entries()) {
      const result = await this.request("modelFieldAdd", {
        modelName: ANKI_MODEL,
        fieldName,
        index: fieldNames.length + offset,
      });
      // Old versions of AnkiConnect can't add fields
      if (result.error === "unsupported action") return "please update AnkiConnect to add the line to the cards";
      if (result.error) return result.error;
    }

    // The templates and styling of the version that had the fields
    const templates = await this.request("updateModelTemplates", {
      model: {
        name: ANKI_MODEL,
        templates: { [ANKI_CARD_TEMPLATE]: { Front: ANKI_MODEL_FRONT, Back: ANKI_MODEL_BACK } },
      },
    });
    if (templates.error) return templates.error;
    const styling = await this.request("updateModelStyling", { model: { name: ANKI_MODEL, css: ANKI_MODEL_CSS } });
    return styling.error || null;
  }

  private request<T = unknown>(action: string, params?: object): Promise<TAnkiAnswer<T>> {
    return chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: { action, version: ANKI_API_VERSION, params },
    });
  }
}
