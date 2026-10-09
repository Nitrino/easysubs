import { test, expect, offlineTranslations, type Playground } from "./playground";

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

  test("highlights a phrasal verb and shows its translations and the word's own", async ({ playground }) => {
    await playground.word("pick").hover();

    await expect(playground.word("up")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.word("my")).not.toHaveClass(/es-sub-item-highlighted/);
    const popover = playground.wordPopover;
    await expect(popover.locator(".es-title")).toHaveText("pick up");
    await expect(popover.locator(".es-label")).toHaveText("phrasal verb");
    await expect(popover.locator(".es-pv-main")).toHaveText(enRu.words["pick up"].main);
    const [main, ...alternatives] = enRu.words["pick up"].verb as string[];
    await expect(popover.locator(".es-pv-item")).toHaveText([main, ...alternatives.map((text) => `${text}verb`)]);
    await expect(popover.locator(".es-pv-word")).toHaveText(`pick${enRu.words.pick.main}`);
    expect(await playground.messages("translateWordFull")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ text: "pick up", language: "ru" }),
        expect.objectContaining({ text: "pick", language: "ru" }),
      ]),
    );
  });

  test("looks up the expressions of the whole track in one message", async ({ playground }) => {
    expect(await playground.messages("findExpressions")).toEqual([
      expect.objectContaining({
        language: "en",
        cues: expect.arrayContaining([["Almost.", "I", "just", "need", "to", "pick", "up", "my", "keys."]]),
      }),
    ]);
  });

  test("shows the word popover for words outside expressions", async ({ playground }) => {
    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText(enRu.words.keys.main);
    await expect(playground.subs.locator(".es-sub-item-highlighted")).toHaveCount(0);
  });

  test("highlights a phrasal verb split by its object", async ({ playground }) => {
    await playground.loadSubtitles("1\n00:00:00,000 --> 00:01:00,000\nCould you turn the radio off, please?\n");
    await expect(playground.subs).toHaveText("Could you turn the radio off, please?");

    await playground.word("off").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText("turn off");
    await expect(playground.word("turn")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.word("radio")).not.toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.subs.locator(".es-sub-item-highlighted")).toHaveCount(2);
  });

  test("highlights an expression only in its own cue", async ({ playground }) => {
    await playground.loadSubtitles(
      "1\n00:00:00,000 --> 00:01:00,000\nPlease pick up my keys.\n\n" +
        "2\n00:00:00,000 --> 00:01:00,000\nI am up to it.\n",
    );
    await expect(playground.subs.locator(".es-sub")).toHaveCount(2);

    await playground.word("pick").hover();

    await expect(playground.wordPopover.locator(".es-title")).toHaveText("pick up");
    await expect(playground.subs.locator(".es-sub").first().locator(".es-sub-item-highlighted")).toHaveCount(2);
    await expect(playground.subs.locator(".es-sub").nth(1).locator(".es-sub-item-highlighted")).toHaveCount(0);
  });

  test("shows idioms", async ({ playground }) => {
    await playground.loadSubtitles("1\n00:00:00,000 --> 00:01:00,000\nI finally made up my mind.\n");
    await expect(playground.subs).toHaveText("I finally made up my mind.");

    await playground.word("mind").hover();

    await expect(playground.word("my")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.word("finally")).not.toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.subs.locator(".es-sub-item-highlighted")).toHaveCount(4);
    await expect(playground.wordPopover.locator(".es-title")).toHaveText("make up one's mind");
    await expect(playground.wordPopover.locator(".es-label")).toHaveText("idiom");
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
  test.beforeEach(async ({ playground }) => {
    await playground.recordSpeech();
    await playground.recordAudio();
    await playground.open();
    await playground.seek(5);
  });

  const pronounce = async (playground: Playground, word = "keys") => {
    await playground.word(word).hover();
    await playground.wordPopover.getByTitle("Pronounce").click();
  };

  test("plays the word in the subtitles language from Google", async ({ playground }) => {
    await pronounce(playground);

    await expect.poll(() => playground.played()).toEqual([{ duration: expect.closeTo(0.25) }]);
    expect(await playground.messages("pronounce")).toEqual([
      { type: "pronounce", text: "keys", language: "en", service: "google" },
    ]);
    expect(await playground.spoken()).toEqual([]);
  });

  for (const [option, service] of [
    ["Youdao", "youdao"],
    ["Wiktionary", "wiktionary"],
  ]) {
    test(`plays the word from ${option}`, async ({ playground }) => {
      await playground.changeSettings("General", () => playground.choose("Pronunciation", option));

      await pronounce(playground);

      await expect.poll(() => playground.played()).toHaveLength(1);
      expect(await playground.messages("pronounce")).toEqual([expect.objectContaining({ text: "keys", service })]);
    });
  }

  test("speaks the word slowly with the browser voice", async ({ playground }) => {
    await playground.changeSettings("General", () => playground.choose("Pronunciation", "Browser voice"));

    await pronounce(playground);

    await expect.poll(() => playground.spoken()).toEqual([{ text: "keys", lang: "en", rate: expect.closeTo(0.8) }]);
    expect(await playground.messages("pronounce")).toEqual([]);
    expect(await playground.played()).toEqual([]);
  });

  test("speaks with the browser voice when no service has the word", async ({ playground }) => {
    await playground.mockAnswer("pronounce", { error: 'Google has no pronunciation of "keys"' });

    await pronounce(playground);

    await expect.poll(() => playground.spoken()).toEqual([{ text: "keys", lang: "en", rate: expect.closeTo(0.8) }]);
    expect(await playground.played()).toEqual([]);
  });

  test("asks for a ChatGPT API key and sends it with the word", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Pronunciation", "ChatGPT");

    const modal = page.locator(".es-modal-content");
    await expect(modal.getByRole("heading")).toHaveText("ChatGPT API Key Configuration");
    await modal.getByLabel("API Key:").fill("test-chatgpt-key");
    await modal.getByRole("button", { name: "Save" }).click();
    await playground.closeSettings();

    await pronounce(playground);

    await expect.poll(() => playground.played()).toHaveLength(1);
    expect(await playground.messages("pronounce")).toEqual([
      expect.objectContaining({ service: "chatgpt", chatGPTApiKey: "test-chatgpt-key" }),
    ]);
  });

  test("plays a word again without fetching it again", async ({ playground }) => {
    await pronounce(playground);
    await expect.poll(() => playground.played()).toHaveLength(1);

    await playground.wordPopover.getByTitle("Pronounce").click();

    await expect.poll(() => playground.played()).toHaveLength(2);
    expect(await playground.messages("pronounce")).toHaveLength(1);
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

  test("translates all the expressions of a line with ChatGPT in one request", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Translation service", "ChatGPT");
    const modal = page.locator(".es-modal-content");
    await modal.getByLabel("API Key:").fill("test-chatgpt-key");
    await modal.getByRole("button", { name: "Save" }).click();
    await playground.closeSettings();
    await playground.seek(25);
    await expect(playground.subs).toContainText("What if we run out of time");

    await playground.word("run").hover();
    await expect(playground.wordPopover.locator(".es-label")).toHaveText("phrasal verbIn this line");
    await expect(playground.wordPopover.locator(".es-pv-main")).toHaveText(enRu.words["run out"].main);
    await playground.word("time").hover();
    await expect(playground.wordPopover.locator(".es-title")).toHaveText("out of time");
    await expect(playground.wordPopover.locator(".es-pv-main")).toHaveText(enRu.words["out of time"].main);

    expect(await playground.messages("translateExpressions")).toEqual([
      expect.objectContaining({ expressions: ["run out", "out of time"], chatGPTApiKey: "test-chatgpt-key" }),
    ]);
  });
});

test.describe("Chrome's built-in translator", () => {
  test("translates lines and expressions on the device", async ({ playground }) => {
    await playground.stubChromeTranslator();
    await playground.open();
    await playground.seek(5);
    await playground.changeSettings("General", () => playground.choose("Translation service", "Chrome (on device)"));

    await playground.word("need").click();
    await expect(playground.linePopover).toHaveText("[chrome:ru] Almost. I just need to pick up my keys.");
    await playground.word("pick").hover();
    await expect(playground.wordPopover.locator(".es-pv-main")).toHaveText("[chrome:ru] pick up");

    expect(await playground.messages("translateFullText")).toEqual([]);
    expect(await playground.chromeTranslators()).toEqual([{ sourceLanguage: "en", targetLanguage: "ru" }]);
  });

  test("translates with Google where Chrome can't", async ({ playground }) => {
    await playground.stubChromeTranslator({ availability: "unavailable" });
    await playground.open();
    await playground.seek(5);
    await playground.changeSettings("General", () => playground.choose("Translation service", "Chrome (on device)"));

    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
    expect(await playground.messages("translateFullText")).toEqual([
      expect.objectContaining({ translationService: "google" }),
    ]);
  });

  test("isn't offered in browsers without it", async ({ playground, page }) => {
    await page.addInitScript(() => delete (window as { Translator?: unknown }).Translator);
    await playground.open();
    await playground.openSettings("General");

    await playground.settingsRow("Translation service").locator(".es-select").click();

    await expect(page.getByRole("option", { name: "ChatGPT", exact: true })).toBeVisible();
    await expect(page.getByRole("option", { name: "Chrome (on device)" })).toHaveCount(0);
  });
});

test.describe("on-device translation", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
  });

  test("looks words up in the Wiktionary dictionary of the pair", async ({ playground }) => {
    await playground.openSettings("General");
    await playground.choose("Dictionary", "Wiktionary (on device)");
    await expect(playground.settingsPanel).toContainText("The English → Russian dictionary is on this device.");
    await playground.closeSettings();

    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toContainText(enRu.words.keys.main);
    expect(await playground.messages("dictionaryLookup")).toEqual([
      expect.objectContaining({ from: "en", to: "ru", text: "keys" }),
    ]);
    expect(await playground.messages("translateWordFull")).toEqual([]);
  });

  test("offers every service for words, telling which give meanings", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.settingsRow("Dictionary").locator(".es-select").click();

    // The picked one has a checkmark before its name
    for (const name of ["Google Translate", "Wiktionary (on device)", "ChatGPT", "Ollama"]) {
      await expect(page.getByRole("option", { name })).toContainText("Meanings");
    }
    for (const name of ["DeepL", "Bing Translator", "Yandex Translate", "Chrome (on device)", "Bergamot (on device)"]) {
      await expect(page.getByRole("option", { name })).toContainText("One translation");
    }
  });

  test("asks for the DeepL key when DeepL translates words", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Dictionary", "DeepL");

    const modal = page.locator(".es-modal-content");
    await modal.getByLabel("API Key:").fill("test-deepl-key:fx");
    await modal.getByRole("button", { name: "Save" }).click();
    await expect(playground.settingsPanel).toContainText("One translation of the word");
    await playground.closeSettings();

    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toContainText(enRu.words.keys.main);
    expect(await playground.messages("translateFullText")).toContainEqual(
      expect.objectContaining({ text: "keys", translationService: "deepl", deeplApiKey: "test-deepl-key:fx" }),
    );
    expect(await playground.messages("translateWordFull")).toEqual([]);
  });

  test("translates a word and an expression with Bergamot as they're used in the line", async ({ playground }) => {
    await playground.changeSettings("General", () => playground.choose("Dictionary", "Bergamot (on device)"));

    // The word alone translates differently from the line: the line's on top, the word's below
    await playground.word("keys").hover();
    await expect(playground.wordPopover.locator(".es-title")).toContainText(`↳${enRu.words.keys.main}`);
    await expect(playground.wordPopover.locator(".es-title .es-badge")).toHaveText("In this line");
    await expect(playground.wordPopover.locator(".es-alt-word")).toHaveText([enRu.words.keys.main]);
    await playground.word("pick").hover();
    await expect(playground.wordPopover.locator(".es-label")).toHaveText("phrasal verbIn this line");
    await expect(playground.wordPopover.locator(".es-pv-main")).toHaveText(`↳${enRu.words["pick up"].main}`);

    expect(await playground.messages("bergamot")).toContainEqual(
      expect.objectContaining({
        request: expect.objectContaining({
          texts: ["Almost. I just need to <b>pick</b> <b>up</b> my keys."],
          html: true,
        }),
      }),
    );
  });

  test("translates lines with Bergamot, telling it the subtitles' language", async ({ playground }) => {
    await playground.openSettings("General");
    await playground.choose("Translation service", "Bergamot (on device)");
    await expect(playground.settingsPanel).toContainText("English → Russian translates on this device.");
    await playground.closeSettings();

    await playground.word("need").click();

    await expect(playground.linePopover).toHaveText(enRu.lines["Almost. I just need to pick up my keys."]);
    // The hovered word's expression ("need to") goes to Bergamot too
    expect(await playground.messages("translateFullText")).toContainEqual(
      expect.objectContaining({
        text: "Almost. I just need to pick up my keys.",
        translationService: "bergamot",
        sourceLanguage: "en",
        language: "ru",
      }),
    );
  });

  test("shows ChatGPT's translation of the word in its line over its meanings", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Dictionary", "ChatGPT");
    const modal = page.locator(".es-modal-content");
    await modal.getByLabel("API Key:").fill("test-chatgpt-key");
    await modal.getByRole("button", { name: "Save" }).click();
    await playground.closeSettings();

    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toContainText(`↳${enRu.words.keys.main}`);
    await expect(playground.wordPopover.locator(".es-title .es-badge")).toHaveText("In this line");
    await expect(playground.wordPopover.locator(".es-alt-word")).toHaveText([enRu.words.keys.main]);
    expect(await playground.messages("chatGPTWord")).toEqual([
      expect.objectContaining({ text: "keys", line: "Almost. I just need to pick up my keys." }),
    ]);
  });

  test("asks which Ollama model translates and looks words up with it", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Dictionary", "Ollama");

    const modal = page.locator(".es-modal-content");
    await expect(modal.getByRole("heading")).toHaveText("Ollama");
    await expect(modal).toContainText("Ollama has 2 models: translategemma:4b, gemma3:4b.");
    await expect(modal.getByLabel("Model:")).toHaveValue("translategemma:4b");
    await modal.getByRole("button", { name: "Save" }).click();
    await expect(playground.settingsPanel).toContainText("translategemma:4b at http://localhost:11434");
    await playground.closeSettings();

    await playground.word("keys").hover();

    await expect(playground.wordPopover.locator(".es-title")).toContainText(enRu.words.keys.main);
    expect(await playground.messages("ollamaWord")).toEqual([
      expect.objectContaining({ text: "keys", ollamaModel: "translategemma:4b", ollamaUrl: "http://localhost:11434" }),
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
