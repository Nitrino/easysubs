import ILearningService, { TAditionalData } from "./learningService";

const ANKI_API_VERSION = 6;
const ANKI_DESK = "Easysubs";
const ANKI_URL = "http://localhost:8765";

export class Anki implements ILearningService {
  public color: string;

  constructor() {
    this.color = "#0d6efd";
  }

  /**
   * Test if a model is compatible by attempting to create and delete a test note
   * This is language-agnostic and works with any Anki version
   */
  private async testModelCompatibility(modelName: string, frontField: string, backField: string): Promise<boolean> {
    try {
      // Try to create a test note
      const testNote = {
        deckName: ANKI_DESK,
        modelName: modelName,
        fields: {
          [frontField]: "__easysubs_test__",
          [backField]: "__easysubs_test__",
        },
        options: {
          allowDuplicate: true,
        },
        tags: ["__easysubs_test__"],
      };

      const addResult = await chrome.runtime.sendMessage({
        type: "post",
        url: ANKI_URL,
        data: {
          action: "addNote",
          version: ANKI_API_VERSION,
          params: { note: testNote },
        },
      });

      // If creation succeeded (result is a note ID), delete the test note immediately
      if (addResult.result && typeof addResult.result === "number") {
        await chrome.runtime.sendMessage({
          type: "post",
          url: ANKI_URL,
          data: {
            action: "deleteNotes",
            version: ANKI_API_VERSION,
            params: { notes: [addResult.result] },
          },
        });
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Find a compatible note model by testing actual note creation
   * This approach is language-agnostic and works with any Anki version
   */
  private async findCompatibleModel(): Promise<{ modelName: string; frontField: string; backField: string } | null> {
    // Get all available models
    const modelNamesResult = await chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: { action: "modelNames", version: ANKI_API_VERSION },
    });

    if (modelNamesResult.error || !modelNamesResult.result) {
      return null;
    }

    const modelNames: string[] = modelNamesResult.result;
    const candidates: Array<{ modelName: string; frontField: string; backField: string }> = [];

    // Collect all candidate models with their field mappings
    for (const modelName of modelNames) {
      const modelFieldsResult = await chrome.runtime.sendMessage({
        type: "post",
        url: ANKI_URL,
        data: { action: "modelFieldNames", version: ANKI_API_VERSION, params: { modelName } },
      });

      if (modelFieldsResult.error || !modelFieldsResult.result) {
        continue;
      }

      const fields: string[] = modelFieldsResult.result;

      // Skip models with less than 2 fields
      if (fields.length < 2) {
        continue;
      }

      // Check for Front/Back fields (case-insensitive)
      const frontField = fields.find(f => f.toLowerCase() === "front");
      const backField = fields.find(f => f.toLowerCase() === "back");

      if (frontField && backField) {
        // Prefer models with Front/Back fields - add to beginning of array
        candidates.unshift({ modelName, frontField, backField });
      } else {
        // Use first two fields as fallback - add to end of array
        candidates.push({ modelName, frontField: fields[0], backField: fields[1] });
      }
    }

    // Test each candidate model until we find a compatible one
    for (const candidate of candidates) {
      const isCompatible = await this.testModelCompatibility(
        candidate.modelName,
        candidate.frontField,
        candidate.backField
      );

      if (isCompatible) {
        return candidate;
      }
    }

    return null;
  }

  public async addWord(word: string, translation: string, aditionalData: TAditionalData): Promise<string> {
    const createDeskResult = await chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: { action: "createDeck", version: ANKI_API_VERSION, params: { deck: ANKI_DESK } },
    });

    if (createDeskResult.error === "connection error") {
      return Promise.reject("Error connecting to Anki. Please make sure Anki is running and AnkiConnect is installed.");
    }

    if (createDeskResult.error) {
      return Promise.reject("Anki Error: " + createDeskResult.error);
    }

    // Find a compatible model
    const modelInfo = await this.findCompatibleModel();
    if (!modelInfo) {
      return Promise.reject("No compatible Anki note type found. Please create a note type with at least 2 fields (ideally 'Front' and 'Back').");
    }

    const addWordResult = await chrome.runtime.sendMessage({
      type: "post",
      url: ANKI_URL,
      data: {
        action: "addNote",
        version: ANKI_API_VERSION,
        params: {
          note: {
            deckName: ANKI_DESK,
            modelName: modelInfo.modelName,
            fields: {
              [modelInfo.frontField]: word,
              [modelInfo.backField]: translation,
            },
            options: {
              allowDuplicate: false,
            },
          },
        },
      },
    });

    if (addWordResult.error) {
      if (addWordResult.error === "cannot create note because it is a duplicate") {
        return Promise.resolve("Word already exists in Anki");
      }

      return Promise.reject("Anki Error: " + addWordResult.error);
    } else if (addWordResult.result === null || addWordResult.result === undefined) {
      return Promise.reject("Anki Error: cannot create note for unknown reason");
    } else {
      return Promise.resolve("Word added to Anki");
    }
  }
}
