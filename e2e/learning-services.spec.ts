import { test, expect, offlineTranslations, type Playground } from "./playground";

const enRu = offlineTranslations("en-ru");
const CUE = "Almost. I just need to pick up my keys.";

type AnkiNote = { note: { fields: Record<string, string> } };

// What the content script asked AnkiConnect, through the background's "post" messages
async function ankiRequests(playground: Playground) {
  return (await playground.messages("post")).map((message) => message.data as { action: string; params?: unknown });
}

async function ankiParams(playground: Playground, action: string) {
  return (await ankiRequests(playground)).find((request) => request.action === action)?.params;
}

async function addedAnkiNote(playground: Playground) {
  return ((await ankiParams(playground, "addNote")) as AnkiNote).note.fields;
}

test.describe("learning services", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");
  });

  const chooseService = (playground: Playground, service: string) =>
    playground.changeSettings("General", () => playground.choose("Learning service", service));

  test("offers no words to add when disabled", async ({ playground }) => {
    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);
    await expect(playground.wordPopover.locator(".es-addable")).toHaveCount(0);
  });

  test("adds a word to Anki", async ({ playground }) => {
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word added to Anki");
    expect((await ankiRequests(playground)).map((request) => request.action)).toEqual([
      "createDeck",
      "modelNames",
      "modelFieldNames",
      "findNotes",
      "storeMediaFile",
      "addNote",
    ]);
    const frame = (await ankiParams(playground, "storeMediaFile")) as { filename: string; data: string };
    expect(frame.filename).toMatch(/^easysubs-.+\.jpg$/);
    expect(Buffer.from(frame.data, "base64").subarray(0, 2)).toEqual(Buffer.from([0xff, 0xd8]));
    expect(await addedAnkiNote(playground)).toEqual({
      Word: "keys",
      Translation: enRu.words.keys.main,
      "Part of Speech": "",
      Context: "Almost. I just need to pick up my <b>keys</b>.",
      "Context Translation": enRu.lines[CUE],
      Picture: `<img src="${frame.filename}">`,
      // The playground's player doesn't stream through Media Source Extensions: there's no buffered sound to cut
      Audio: "",
      Source: expect.stringMatching(/^<a href="http:\/\/localhost:5180\/[^"]*">The Night Train · S1E2 · 0:0\d<\/a>$/),
    });
  });

  test("adds the word alone when the line is turned off", async ({ playground }) => {
    await playground.changeSettings("General", async () => {
      await playground.choose("Learning service", "Anki");
      await playground.settingsRow("Line on Anki cards").locator(".es-switch").click();
      await expect(playground.settingsRow("Video frame")).toHaveCount(0);
    });

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word added to Anki");
    expect(await addedAnkiNote(playground)).toEqual({
      Word: "keys",
      Translation: enRu.words.keys.main,
      "Part of Speech": "",
      Context: "",
    });
    expect(await playground.messages("translateFullText")).toEqual([]);
  });

  test("offers the line's parts for Anki only", async ({ playground }) => {
    await playground.openSettings("General");
    for (const row of ["Line on Anki cards", "Line's translation", "Video frame", "Line's audio"]) {
      await expect(playground.settingsRow(row)).toHaveCount(0);
    }

    await playground.choose("Learning service", "Anki");

    for (const row of ["Line on Anki cards", "Line's translation", "Video frame", "Line's audio"]) {
      await expect(playground.settingsRow(row).locator(".es-switch input")).toBeChecked();
    }
  });

  test("adds a new line to the word already in Anki", async ({ playground }) => {
    const oldLine = "Where are my <b>keys</b>?";
    await playground.mockAnswer("post:findNotes", { result: [7], error: null });
    await playground.mockAnswer("post:notesInfo", {
      result: [
        {
          noteId: 7,
          fields: {
            Word: { value: "keys", order: 0 },
            Translation: { value: enRu.words.keys.main, order: 1 },
            Context: { value: oldLine, order: 3 },
            Examples: { value: "", order: 8 },
          },
        },
      ],
      error: null,
    });
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word already in Anki: added this line to it");
    const { note } = (await ankiParams(playground, "updateNoteFields")) as {
      note: { id: number; fields: Record<string, string> };
    };
    expect(note.id).toBe(7);
    expect(note.fields.Context).toBe("Almost. I just need to pick up my <b>keys</b>.");
    expect(note.fields.Examples).toBe(
      `<div class="es-example"><div class="es-example-sentence">${oldLine}</div></div>`,
    );
    expect((await ankiRequests(playground)).map((request) => request.action)).not.toContain("addNote");
  });

  test("adds another translation with its part of speech to Anki", async ({ playground }) => {
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-alt-word", { hasText: "клавиши" }).click();

    await expect(playground.toast).toHaveText("Word added to Anki");
    expect(await addedAnkiNote(playground)).toMatchObject({ Translation: "клавиши", "Part of Speech": "noun" });
  });

  test("adds a phrasal verb to Anki", async ({ playground }) => {
    await chooseService(playground, "Anki");

    await playground.word("pick").hover();
    await playground.wordPopover.locator(".es-pv-item.es-addable").first().click();

    await expect(playground.toast).toHaveText("Word added to Anki");
    expect(await addedAnkiNote(playground)).toMatchObject({
      Word: "pick up",
      "Part of Speech": "phrase",
      Context: "Almost. I just need to <b>pick up</b> my keys.",
    });
  });

  test("creates the Easysubs note type in Anki", async ({ playground }) => {
    await playground.mockAnswer("post:modelNames", { result: ["Basic"], error: null });
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word added to Anki");
    expect((await ankiRequests(playground)).map((request) => request.action)).toContain("createModel");
  });

  test("tells when the word is already in Anki", async ({ playground }) => {
    await playground.mockAnswer("post:addNote", {
      result: null,
      error: "cannot create note because it is a duplicate",
    });
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word already exists in Anki");
  });

  test("shows Anki errors", async ({ playground }) => {
    await playground.mockAnswer("post:addNote", { result: null, error: "collection is not available" });
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Anki Error: collection is not available");
  });

  test("asks to start Anki when it doesn't answer", async ({ playground }) => {
    // What the background answers when nothing listens on AnkiConnect's port
    await playground.mockAnswer("post:createDeck", { error: "connection error" });
    await chooseService(playground, "Anki");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText(
      "Error connecting to Anki. Please make sure Anki is running and AnkiConnect is installed.",
    );
  });

  test("adds a word to LinguaLeo", async ({ playground }) => {
    await chooseService(playground, "LinguaLeo");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word added to LinguaLeo");
    expect(await playground.messages("addWordToLingualeo")).toEqual([
      { type: "addWordToLingualeo", word: "keys", translation: enRu.words.keys.main },
    ]);
  });

  test("asks to log in to LinguaLeo", async ({ playground }) => {
    await playground.mockAnswer("addWordToLingualeo", { error: "not_authenticated" });
    await chooseService(playground, "LinguaLeo");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("LinguaLeo: please log in at lingualeo.com");
  });

  test("adds a word to Puzzle English", async ({ playground }) => {
    await chooseService(playground, "Puzzle English");

    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await expect(playground.toast).toHaveText("Word added to Puzzle English");
    expect(await playground.messages("addWordToPuzzleEnglish")).toEqual([
      { type: "addWordToPuzzleEnglish", word: "keys" },
    ]);
  });
});
