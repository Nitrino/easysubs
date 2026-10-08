import { describe, expect, it } from "vitest";
import { Anki } from "./anki";
import { ANKI_MODEL_FIELDS } from "./ankiNote";
import type { TAditionalData, TWordContext } from "./learningService";
import { chromeMock, sentMessages } from "@root/test/chrome";

type AnkiRequest = {
  type: string;
  url: string;
  data: { action: string; version: number; params?: Record<string, unknown> };
};
type AnkiAnswer = { result?: unknown; error: string | null };

// AnkiConnect's answers by action, through the background's "post" message
function answerAnki(answers: Record<string, AnkiAnswer | ((params: Record<string, unknown>) => AnkiAnswer)> = {}) {
  const defaults = {
    modelNames: { result: ["Basic", "Easysubs"], error: null },
    modelFieldNames: { result: ANKI_MODEL_FIELDS, error: null },
    findNotes: { result: [], error: null },
    storeMediaFile: (params: Record<string, unknown>) => ({ result: params.filename, error: null }),
  };
  chromeMock.runtime.sendMessage.mockImplementation(async (message: AnkiRequest) => {
    const answer = { ...defaults, ...answers }[message.data.action] ?? { result: null, error: null };
    return typeof answer === "function" ? answer(message.data.params ?? {}) : answer;
  });
}

// A note with the word, as notesInfo describes it
function existingNote(fields: Record<string, string>) {
  const values = Object.fromEntries(ANKI_MODEL_FIELDS.map((name) => [name, fields[name] ?? ""]));
  return {
    findNotes: { result: [42], error: null },
    notesInfo: {
      result: [
        {
          noteId: 42,
          fields: Object.fromEntries(Object.entries(values).map(([name, value], order) => [name, { value, order }])),
        },
      ],
      error: null,
    },
  };
}

const ankiRequests = () => sentMessages() as unknown as AnkiRequest[];
const actions = () => ankiRequests().map((message) => message.data.action);
const params = (action: string) => ankiRequests().find((message) => message.data.action === action)?.data.params;
const addWord = (data: TAditionalData = { partOfSpeech: "noun" }, word = "keys") =>
  new Anki().addWord(word, "ключи", data);

const CONTEXT: TWordContext = {
  sentence: "I just need to pick up my <b>keys</b>.",
  translation: "Мне только нужно взять ключи.",
  source: '<a href="https://example.com/">The Night Train · S1E2 · 0:05</a>',
  picture: { data: "/9j/frame", extension: "jpg" },
};

describe("Anki", () => {
  it("adds a note to the Easysubs deck through AnkiConnect", async () => {
    answerAnki();

    await expect(addWord()).resolves.toBe("Word added to Anki");

    expect(actions()).toEqual(["createDeck", "modelNames", "modelFieldNames", "addNote"]);
    expect(
      ankiRequests().every(
        ({ type, url, data }) => type === "post" && url === "http://localhost:8765" && data.version === 6,
      ),
    ).toBe(true);
    expect(params("createDeck")).toEqual({ deck: "Easysubs" });
    expect(params("addNote")).toEqual({
      note: {
        deckName: "Easysubs",
        modelName: "Easysubs",
        fields: { Word: "keys", Translation: "ключи", "Part of Speech": "noun", Context: "" },
      },
    });
  });

  it("leaves out an unknown part of speech", async () => {
    answerAnki();

    await addWord({ partOfSpeech: "unknown" });

    expect(params("addNote")).toMatchObject({ note: { fields: { "Part of Speech": "" } } });
  });

  it("creates the Easysubs note type when Anki doesn't have it", async () => {
    answerAnki({ modelNames: { result: ["Basic"], error: null } });

    await expect(addWord()).resolves.toBe("Word added to Anki");

    expect(actions()).toEqual(["createDeck", "modelNames", "createModel", "addNote"]);
    expect(params("createModel")).toMatchObject({
      modelName: "Easysubs",
      inOrderFields: [
        "Word",
        "Translation",
        "Part of Speech",
        "Context",
        "Context Translation",
        "Picture",
        "Audio",
        "Source",
        "Examples",
      ],
      cardTemplates: [{ Name: "Word" }],
    });
  });

  it("adds the note when another word created the note type first", async () => {
    answerAnki({
      modelNames: { result: ["Basic"], error: null },
      createModel: { result: null, error: "Model name already exists" },
    });

    await expect(addWord()).resolves.toBe("Word added to Anki");
  });

  it("adds the line's fields to the note type of the first version", async () => {
    answerAnki({ modelFieldNames: { result: ["Word", "Translation", "Part of Speech", "Context"], error: null } });

    await expect(addWord()).resolves.toBe("Word added to Anki");

    expect(actions()).toEqual([
      "createDeck",
      "modelNames",
      "modelFieldNames",
      ...Array(5).fill("modelFieldAdd"),
      "updateModelTemplates",
      "updateModelStyling",
      "addNote",
    ]);
    expect(
      ankiRequests()
        .filter((message) => message.data.action === "modelFieldAdd")
        .map((message) => message.data.params),
    ).toEqual([
      { modelName: "Easysubs", fieldName: "Context Translation", index: 4 },
      { modelName: "Easysubs", fieldName: "Picture", index: 5 },
      { modelName: "Easysubs", fieldName: "Audio", index: 6 },
      { modelName: "Easysubs", fieldName: "Source", index: 7 },
      { modelName: "Easysubs", fieldName: "Examples", index: 8 },
    ]);
    const templates = params("updateModelTemplates") as { model: { templates: { Word: { Front: string } } } };
    expect(templates.model.templates.Word.Front).toContain("{{Picture}}");
    expect(params("updateModelStyling")).toMatchObject({ model: { name: "Easysubs" } });
  });

  it("asks to update AnkiConnect when it can't add fields", async () => {
    answerAnki({
      modelFieldNames: { result: ["Word", "Translation", "Part of Speech", "Context"], error: null },
      modelFieldAdd: { result: null, error: "unsupported action" },
    });

    await expect(addWord()).rejects.toBe("Anki Error: please update AnkiConnect to add the line to the cards");
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

  describe("with the line", () => {
    it("adds the word with its line, the frame stored in Anki's media", async () => {
      answerAnki();

      await expect(addWord({ partOfSpeech: "noun", context: CONTEXT })).resolves.toBe("Word added to Anki");

      expect(actions()).toEqual([
        "createDeck",
        "modelNames",
        "modelFieldNames",
        "findNotes",
        "storeMediaFile",
        "addNote",
      ]);
      expect(params("findNotes")).toEqual({ query: '"note:Easysubs" "Word:keys"' });
      const stored = params("storeMediaFile") as { filename: string; data: string };
      expect(stored.filename).toMatch(/^easysubs-[a-z0-9]+-[a-z0-9]+\.jpg$/);
      expect(stored.data).toBe("/9j/frame");
      expect(params("addNote")).toEqual({
        note: {
          deckName: "Easysubs",
          modelName: "Easysubs",
          fields: {
            Word: "keys",
            Translation: "ключи",
            "Part of Speech": "noun",
            Context: CONTEXT.sentence,
            "Context Translation": CONTEXT.translation,
            Picture: `<img src="${stored.filename}">`,
            Audio: "",
            Source: CONTEXT.source,
          },
        },
      });
    });

    it("stores the line's sound and plays it on the front", async () => {
      answerAnki();

      await addWord({ context: { sentence: "My <b>keys</b>.", audio: { data: "UklGR", extension: "wav" } } });

      const stored = params("storeMediaFile") as { filename: string };
      expect(stored.filename).toMatch(/\.wav$/);
      expect(params("addNote")).toMatchObject({
        note: { fields: { Audio: `[sound:${stored.filename}]`, Picture: "" } },
      });
    });

    it("escapes Anki's wildcards when looking for the word", async () => {
      answerAnki();

      await addWord({ context: CONTEXT }, 'a_b*"c');

      expect(params("findNotes")).toEqual({ query: '"note:Easysubs" "Word:a\\_b\\*\\"c"' });
    });

    it("puts a new line on the front of the word's card and the one before it among the examples", async () => {
      answerAnki(
        existingNote({
          Word: "keys",
          Translation: "ключи",
          Context: "Where are my <b>keys</b>?",
          "Context Translation": "Где мои ключи?",
          Picture: '<img src="old.jpg">',
          Audio: "[sound:old.wav]",
          Source: "The Night Train · S1E1 · 3:10",
        }),
      );

      await expect(addWord({ context: CONTEXT })).resolves.toBe("Word already in Anki: added this line to it");

      expect(actions()).toEqual([
        "createDeck",
        "modelNames",
        "modelFieldNames",
        "findNotes",
        "notesInfo",
        "storeMediaFile",
        "updateNoteFields",
      ]);
      expect(params("notesInfo")).toEqual({ notes: [42] });
      const { note } = params("updateNoteFields") as { note: { id: number; fields: Record<string, string> } };
      expect(note.id).toBe(42);
      expect(note.fields).toMatchObject({
        Context: CONTEXT.sentence,
        "Context Translation": CONTEXT.translation,
        Source: CONTEXT.source,
        Audio: "",
      });
      expect(note.fields).not.toHaveProperty("Translation");
      expect(note.fields.Examples).toBe(
        '<div class="es-example"><img src="old.jpg"><div class="es-example-sentence">Where are my <b>keys</b>?</div>' +
          '<div class="es-example-translation">Где мои ключи?</div>' +
          '<audio controls preload="none" src="old.wav"></audio>' +
          '<div class="es-example-source">The Night Train · S1E1 · 3:10</div></div>',
      );
    });

    it("keeps three lines, the oldest going first", async () => {
      const example = (line: string) => `<div class="es-example"><div class="es-example-sentence">${line}</div></div>`;
      answerAnki(
        existingNote({
          Word: "keys",
          Context: "Line three <b>keys</b>",
          Examples: example("Line two keys") + example("Line one keys"),
        }),
      );

      await addWord({ context: CONTEXT });

      const { note } = params("updateNoteFields") as { note: { fields: Record<string, string> } };
      expect(note.fields.Examples).toBe(
        '<div class="es-example"><div class="es-example-sentence">Line three <b>keys</b></div></div>' +
          example("Line two keys"),
      );
    });

    it("puts the line on the front of a card that has none", async () => {
      answerAnki(existingNote({ Word: "keys", Translation: "ключи" }));

      await expect(addWord({ context: CONTEXT })).resolves.toBe("Word already in Anki: added this line to it");

      const { note } = params("updateNoteFields") as { note: { fields: Record<string, string> } };
      expect(note.fields.Context).toBe(CONTEXT.sentence);
      expect(note.fields).not.toHaveProperty("Examples");
    });

    it.each([
      ["on the front", { Context: "I just need to pick up my <b>keys</b>." }],
      [
        "among the examples",
        {
          Context: "Other keys",
          Examples:
            '<div class="es-example"><div class="es-example-sentence">I just need to pick up  my keys.</div></div>',
        },
      ],
    ])("doesn't add a line the card has %s", async (_, fields) => {
      answerAnki(existingNote({ Word: "keys", ...fields }));

      await expect(addWord({ context: CONTEXT })).resolves.toBe("Word already exists in Anki");

      expect(actions()).not.toContain("storeMediaFile");
      expect(actions()).not.toContain("updateNoteFields");
    });

    it.each(["findNotes", "notesInfo", "storeMediaFile", "updateNoteFields"])(
      "shows the Anki error of %s",
      async (action) => {
        answerAnki({
          ...existingNote({ Word: "keys", Context: "Other keys" }),
          [action]: { result: null, error: "collection is not available" },
        });

        await expect(addWord({ context: CONTEXT })).rejects.toBe("Anki Error: collection is not available");
      },
    );
  });
});
