import { test, expect, offlineTranslations, type Playground } from "./playground";

const enRu = offlineTranslations("en-ru");

type AnkiNote = { note: { fields: Record<string, string> } };

// What the content script asked AnkiConnect, through the background's "post" messages
async function ankiRequests(playground: Playground) {
  return (await playground.messages("post")).map((message) => message.data as { action: string; params?: unknown });
}

async function addedAnkiNote(playground: Playground) {
  const addNote = (await ankiRequests(playground)).find((request) => request.action === "addNote");
  return (addNote.params as AnkiNote).note.fields;
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
      "addNote",
    ]);
    expect(await addedAnkiNote(playground)).toEqual({
      Word: "keys",
      Translation: enRu.words.keys.main,
      "Part of Speech": "",
      Context: "",
    });
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
    expect(await addedAnkiNote(playground)).toMatchObject({ Word: "pick up", "Part of Speech": "phrase" });
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
