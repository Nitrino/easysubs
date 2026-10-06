import { test, expect, offlineTranslations } from "./playground";

// The mock background answers from playground/fixtures/translations
const enRu = offlineTranslations("en-ru");

test.describe("translation", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");
  });

  test("translates a hovered word", async ({ playground }) => {
    await playground.word("keys").hover();

    const popover = playground.wordPopover;
    await expect(popover.locator(".es-title")).toHaveText(enRu.words.keys.main);
    expect(await playground.messages("translateWordFull")).toContainEqual(
      expect.objectContaining({ text: "keys", language: "ru" }),
    );
  });

  test("translates the whole line on click", async ({ playground }) => {
    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
  });

  test("highlights a phrasal verb and shows its dictionary translation", async ({ playground }) => {
    await playground.word("pick").hover();

    await expect(playground.word("up")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.wordPopover).toContainText("pick up");
    expect(await playground.messages("translateWordFull")).toHaveLength(0);
  });

  test("highlights a phrasal verb that starts a sentence", async ({ playground }) => {
    await playground.seek(8);
    await expect(playground.subs).toHaveText("Hold on, the train leaves at 7:45, right?");

    await playground.word("Hold").hover();

    await expect(playground.word("on")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.wordPopover.locator(".es-title")).toHaveText("hold on");
  });

  test("pauses while the pointer is over the subtitles", async ({ playground, page }) => {
    await page.getByLabel("Play or pause").click();
    await expect.poll(() => playground.isPaused()).toBe(false);

    await playground.word("keys").hover();
    await expect.poll(() => playground.isPaused()).toBe(true);

    await page.mouse.move(0, 0);
    await expect.poll(() => playground.isPaused()).toBe(false);
  });

  test("lists the other translations with their parts of speech", async ({ playground }) => {
    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-alt-word")).toHaveText(enRu.words.keys.noun as string[]);
    await expect(playground.wordPopover.locator(".es-alt-pos")).toHaveText(["noun", "noun"]);
  });

  test("links an English word to dictionaries", async ({ playground }) => {
    await playground.word("keys").hover();

    const links = playground.wordPopover.locator(".es-link");
    await expect(links).toHaveText(["Cambridge", "Forvo", "Urban", "YouGlish"]);
    await expect(links.first()).toHaveAttribute("href", "https://dictionary.cambridge.org/dictionary/english/keys");
  });

  test("translates each word once", async ({ playground, page }) => {
    await playground.word("keys").hover();
    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);
    await page.mouse.move(0, 0);
    await expect(playground.wordPopover).toBeHidden();

    await playground.word("keys").hover();
    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);

    expect(await playground.messages("translateWordFull")).toHaveLength(1);
  });

  test("translates into the language chosen in the settings", async ({ playground }) => {
    await playground.changeSettings("General", () => playground.choose("Translate to", "German"));

    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText(offlineTranslations("en-de").words.keys.main);
    expect(await playground.messages("translateWordFull")).toEqual([
      expect.objectContaining({ text: "keys", language: "de" }),
    ]);
  });

  test("leaves a paused video paused", async ({ playground, page }) => {
    await playground.word("keys").hover();
    await page.mouse.move(0, 0);

    await expect(playground.wordPopover).toBeHidden();
    expect(await playground.isPaused()).toBe(true);
  });

  test("keeps playing under the pointer when auto stop is off", async ({ playground, page }) => {
    await playground.changeSettings("Experiments", () =>
      playground.settingsRow("Enable auto stop").locator(".es-switch").click(),
    );
    await playground.play();

    await playground.word("keys").hover();
    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);

    expect(await playground.isPaused()).toBe(false);
    await page.mouse.move(0, 0);
  });

  test("hides the line translation when the service fails", async ({ playground }) => {
    await playground.mockAnswer("translateFullText", { error: "Translation service is unavailable" });

    await playground.word("need").click();

    await expect.poll(() => playground.messages("translateFullText")).toHaveLength(1);
    await expect(playground.linePopover).toBeHidden();
  });
});

test.describe("pronunciation", () => {
  test("pronounces the word in the subtitles language, slowly", async ({ playground }) => {
    await playground.recordSpeech();
    await playground.open();
    await playground.seek(5);

    await playground.word("keys").hover();
    await playground.wordPopover.getByTitle("Pronounce").click();

    expect(await playground.spoken()).toEqual([{ text: "keys", lang: "en", rate: expect.closeTo(0.8) }]);
  });
});

test.describe("line translation services", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
  });

  test("translates lines with the chosen service", async ({ playground }) => {
    await playground.changeSettings("General", () => playground.choose("Translation service", "Bing Translator"));

    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
    expect(await playground.messages("translateFullText")).toEqual([
      expect.objectContaining({ translationService: "bing", language: "ru" }),
    ]);
  });

  test("asks for a DeepL API key and sends it with translations", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Translation service", "DeepL");

    const modal = page.locator(".es-modal-content");
    await expect(modal.getByRole("heading")).toHaveText("DeepL API Key Configuration");
    await modal.getByLabel("API Key:").fill("test-deepl-key:fx");
    await modal.getByRole("button", { name: "Save" }).click();
    await expect(modal).toBeHidden();
    // The settings stay open behind the modal
    await playground.closeSettings();

    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
    expect(await playground.messages("translateFullText")).toEqual([
      expect.objectContaining({ translationService: "deepl", deeplApiKey: "test-deepl-key:fx" }),
    ]);
  });

  test("asks for a ChatGPT API key and model", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Translation service", "ChatGPT");

    const modal = page.locator(".es-modal-content");
    await expect(modal.getByRole("heading")).toHaveText("ChatGPT API Key Configuration");
    await modal.getByLabel("API Key:").fill("test-chatgpt-key");
    await modal.getByLabel("Model:").fill("gpt-4o");
    await modal.getByRole("button", { name: "Save" }).click();
    await playground.closeSettings();

    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
    expect(await playground.messages("translateFullText")).toEqual([
      expect.objectContaining({
        translationService: "chatgpt",
        chatGPTApiKey: "test-chatgpt-key",
        chatGPTModel: "gpt-4o",
      }),
    ]);
  });
});

test.describe("translation language like the subtitles", () => {
  // The translation language follows the browser language, English like the subtitles
  test.use({ locale: "en-US" });

  test("asks for another translation language", async ({ playground, page }) => {
    await playground.open();
    await playground.seek(5);

    await playground.word("keys").hover();
    await expect(playground.wordPopover.locator(".es-note")).toHaveText("Select the translation language:");

    // The language list is searchable, so the pointer can stay on the word
    await playground.wordPopover.locator(".es-picker .es-select").click();
    await page.keyboard.type("Russian");
    await page.keyboard.press("Enter");

    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);
  });
});

test.describe("translation into English", () => {
  // The translation language follows the browser language by default
  test.use({ locale: "en-US" });
  const esEn = offlineTranslations("es-en");

  test("translates Spanish subtitles", async ({ playground }) => {
    await playground.open({ subs: "es" });
    await playground.seek(2);
    await expect(playground.subs).toHaveText("¡Hola! ¿Estás lista para salir?");

    await playground.word("lista").hover();
    await expect(playground.wordPopover.locator(".es-title")).toHaveText(esEn.words.lista.main);

    await playground.word("salir").click();
    await expect(playground.linePopover).toHaveText(esEn.lines["¡Hola! ¿Estás lista para salir?"]);
  });

  test("links only English words to dictionaries", async ({ playground }) => {
    await playground.open({ subs: "es" });
    await playground.seek(2);

    await playground.word("lista").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText(esEn.words.lista.main);
    await expect(playground.wordPopover.locator(".es-links")).toHaveCount(0);
  });
});
