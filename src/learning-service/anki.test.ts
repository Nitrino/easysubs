import { describe, expect, it } from "vitest";
import { Anki } from "./anki";
import { chromeMock, sentMessages } from "@root/test/chrome";

type AnkiRequest = {
  type: string;
  url: string;
  data: { action: string; version: number; params?: Record<string, unknown> };
};

// AnkiConnect's answers by action, through the background's "post" message
function answerAnki(answers: Record<string, { result?: unknown; error: string | null }> = {}) {
  const defaults = { modelNames: { result: ["Basic", "Easysubs"], error: null } };
  chromeMock.runtime.sendMessage.mockImplementation(async (message: AnkiRequest) => {
    return { ...defaults, ...answers }[message.data.action] ?? { result: null, error: null };
  });
}

const ankiRequests = () => sentMessages() as unknown as AnkiRequest[];
const actions = () => ankiRequests().map((message) => message.data.action);
const addWord = (partOfSpeech = "noun") => new Anki().addWord("keys", "ключи", { partOfSpeech });

describe("Anki", () => {
  it("adds a note to the Easysubs deck through AnkiConnect", async () => {
    answerAnki();

    await expect(addWord()).resolves.toBe("Word added to Anki");

    expect(actions()).toEqual(["createDeck", "modelNames", "addNote"]);
    expect(
      ankiRequests().every(
        ({ type, url, data }) => type === "post" && url === "http://localhost:8765" && data.version === 6,
      ),
    ).toBe(true);
    expect(ankiRequests()[0].data.params).toEqual({ deck: "Easysubs" });
    expect(ankiRequests()[2].data.params).toEqual({
      note: {
        deckName: "Easysubs",
        modelName: "Easysubs",
        fields: { Word: "keys", Translation: "ключи", "Part of Speech": "noun", Context: "" },
      },
    });
  });

  it("leaves out an unknown part of speech", async () => {
    answerAnki();

    await addWord("unknown");

    expect(ankiRequests()[2].data.params).toMatchObject({ note: { fields: { "Part of Speech": "" } } });
  });

  it("creates the Easysubs note type when Anki doesn't have it", async () => {
    answerAnki({ modelNames: { result: ["Basic"], error: null } });

    await expect(addWord()).resolves.toBe("Word added to Anki");

    expect(actions()).toEqual(["createDeck", "modelNames", "createModel", "addNote"]);
    expect(ankiRequests()[2].data.params).toMatchObject({
      modelName: "Easysubs",
      inOrderFields: ["Word", "Translation", "Part of Speech", "Context"],
    });
  });

  it("adds the note when another word created the note type first", async () => {
    answerAnki({
      modelNames: { result: ["Basic"], error: null },
      createModel: { result: null, error: "Model name already exists" },
    });

    await expect(addWord()).resolves.toBe("Word added to Anki");
  });

  it("tells when the word is already in Anki", async () => {
    answerAnki({ addNote: { result: null, error: "cannot create note because it is a duplicate" } });

    await expect(addWord()).resolves.toBe("Word already exists in Anki");
  });

  it.each(["createDeck", "modelNames", "createModel", "addNote"])("shows the Anki error of %s", async (action) => {
    answerAnki({
      modelNames: { result: ["Basic"], error: null },
      [action]: { result: null, error: "collection is not available" },
    });

    await expect(addWord()).rejects.toBe("Anki Error: collection is not available");
  });
});
