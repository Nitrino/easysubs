import { describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $currentSubTranslation,
  $currentWordTranslation,
  $subTranslationPendings,
  $wordTranslations,
  $wordTranslationsPendings,
  SubTranslationGate,
  WordTranslationsGate,
  requestSubTranslation,
  requestWordTranslation,
} from ".";
import {
  $chatGPTApiKey,
  $deeplApiKey,
  $dictionaryService,
  $ollamaModel,
  $translateLanguage,
  $translationService,
  translateLanguageChanged,
} from "../settings";
import { $subs, $subsLanguage, rawSubsAdded } from "../subs";
import type { TTranslationService } from "../types";
import { answerNextMessage, chromeMock, sentMessages } from "@root/test/chrome";
import { captions, offlineTranslations } from "@root/test/fixtures";
import { stubChromeTranslator } from "@root/test/chromeTranslator";

const enRu = offlineTranslations("en-ru");
const enDe = offlineTranslations("en-de");
const CUE = "Almost. I just need to pick up my keys.";

// Google Translate's answer to translateWordFull, reduced to what fetchWordTranslationFx reads
const googleWordAnswer = (
  main: string,
  alternatives: [partOfSpeech: number, variants: [word: string, synonyms: string[], popularity: number][]][],
) => [
  ["transcription"],
  [[[null, null, null, null, null, [[main]]]]],
  "en",
  [
    null,
    null,
    null,
    null,
    null,
    [
      alternatives.map(([partOfSpeech, variants]) => [
        "word",
        variants.map(([word, synonyms, popularity]) => [word, null, synonyms, popularity, false]),
        "word",
        "word",
        partOfSpeech,
      ]),
    ],
  ],
];

// Google's dictionary for words; Wiktionary is the default
const googleScope = () =>
  fork({
    values: [
      [$translateLanguage, "ru"],
      [$dictionaryService, "google"],
    ],
  });

describe("word translation", () => {
  it("translates a word into the chosen language", async () => {
    const scope = googleScope();

    await allSettled(requestWordTranslation, { scope, params: "Keys" });

    expect(sentMessages()).toEqual([{ type: "translateWordFull", language: "ru", text: "keys" }]);
    expect(scope.getState($currentWordTranslation)).toEqual({
      source: "keys",
      mainTranslation: enRu.words.keys.main,
      targetLanguage: "ru",
      transcription: null,
      translations: [
        { word: "ключи", partOfSpeech: "noun", synonyms: [], popularity: 1 },
        { word: "клавиши", partOfSpeech: "noun", synonyms: [], popularity: 2 },
      ],
    });
  });

  it("lists the five most common translations with three synonyms at most", async () => {
    const scope = googleScope();
    chromeMock.runtime.sendMessage.mockResolvedValueOnce(
      googleWordAnswer("брать", [
        [
          2,
          [
            ["брать", ["take", "pick", "get", "grab"], 1],
            ["выбирать", ["choose", "select"], 2],
            ["собирать", ["gather"], 3],
          ],
        ],
        [
          1,
          [
            ["выбор", ["choice"], 1],
            ["кирка", ["pickaxe"], 3],
          ],
        ],
      ]),
    );

    await allSettled(requestWordTranslation, { scope, params: "pick" });

    const translation = scope.getState($currentWordTranslation);
    expect(translation.mainTranslation).toBe("брать");
    expect(translation.transcription).toBe("transcription");
    expect(translation.translations).toEqual([
      { word: "брать", partOfSpeech: "verb", synonyms: ["take", "pick", "get"], popularity: 1 },
      { word: "выбор", partOfSpeech: "noun", synonyms: ["choice"], popularity: 1 },
      { word: "выбирать", partOfSpeech: "verb", synonyms: ["choose", "select"], popularity: 2 },
      { word: "собирать", partOfSpeech: "verb", synonyms: ["gather"], popularity: 3 },
      { word: "кирка", partOfSpeech: "noun", synonyms: ["pickaxe"], popularity: 3 },
    ]);
  });

  it("shows a word without alternative translations", async () => {
    const scope = googleScope();
    chromeMock.runtime.sendMessage.mockResolvedValueOnce([[null], [[[null, null, null, null, null, [["Сэм"]]]]], "en"]);

    await allSettled(requestWordTranslation, { scope, params: "Sam" });

    expect(scope.getState($currentWordTranslation)).toMatchObject({ mainTranslation: "Сэм", translations: [] });
  });

  it("translates each word once", async () => {
    const scope = googleScope();

    await allSettled(requestWordTranslation, { scope, params: "keys" });
    await allSettled(requestWordTranslation, { scope, params: "cat" });
    await allSettled(requestWordTranslation, { scope, params: "Keys" });

    expect(sentMessages("translateWordFull")).toHaveLength(2);
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);
  });

  it("marks the word as pending until the translation arrives", async () => {
    const scope = googleScope();

    const translated = allSettled(requestWordTranslation, { scope, params: "keys" });
    expect(scope.getState($wordTranslationsPendings)).toEqual({ keys: true });

    await translated;
    expect(scope.getState($wordTranslationsPendings)).toEqual({});
  });

  it("translates the hovered word and forgets it when the pointer leaves", async () => {
    const scope = googleScope();

    await allSettled(WordTranslationsGate.open, { scope, params: "keys" });
    expect(scope.getState($currentWordTranslation).source).toBe("keys");

    await allSettled(WordTranslationsGate.close, { scope, params: "keys" });
    expect(scope.getState($currentWordTranslation)).toBe(null);
  });

  it("translates the open word again into a newly chosen language", async () => {
    const scope = googleScope();
    await allSettled(requestWordTranslation, { scope, params: "keys" });

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(sentMessages("translateWordFull").at(-1)).toMatchObject({ text: "keys", language: "de" });
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enDe.words.keys.main);
    expect(scope.getState($wordTranslations).map((translation) => translation.targetLanguage)).toEqual(["de"]);
  });

  it("changes the language without errors when no word is open", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const scope = googleScope();

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(console.error).not.toHaveBeenCalled();
  });
});

// Two lines with "pick"
const PICK_LINES = captions([1000, 2000, "Almost. I just need to pick up my keys."], [3000, 4000, "Pick it up."]);

describe("word lookup in another dictionary", () => {
  const settings = (dictionary: string, service = "google") =>
    fork({
      values: [
        [$translateLanguage, "ru"],
        [$subsLanguage, "en"],
        [$dictionaryService, dictionary],
        [$translationService, service],
        [$ollamaModel, "translategemma:4b"],
      ],
    });

  it("looks a word up in the Wiktionary dictionary of the subtitles' language", async () => {
    const scope = settings("wiktionary");

    await allSettled(requestWordTranslation, { scope, params: "Keys" });

    expect(sentMessages()).toEqual([{ type: "dictionaryLookup", from: "en", to: "ru", text: "keys" }]);
    expect(scope.getState($currentWordTranslation)).toMatchObject({
      source: "keys",
      mainTranslation: enRu.words.keys.main,
      translations: (enRu.words.keys.noun as string[]).map((word) => ({ word, partOfSpeech: "noun" })),
    });
  });

  it("shows which meaning a dictionary row is, and the dictionary form of an inflected word", async () => {
    const scope = settings("wiktionary");
    answerNextMessage("dictionaryLookup", {
      answer: {
        word: "went",
        transcription: "ɡəʊ",
        lemma: "go",
        entries: [["verb", [[["идти", "ходить"], "To move."], [["ехать"]]]]],
      },
    });

    await allSettled(requestWordTranslation, { scope, params: "went" });

    expect(scope.getState($currentWordTranslation)).toEqual({
      source: "went",
      mainTranslation: "идти",
      targetLanguage: "ru",
      transcription: "ɡəʊ",
      lemma: "go",
      translations: [
        { word: "идти", partOfSpeech: "verb", synonyms: ["ходить"], popularity: 0, note: "To move." },
        { word: "ехать", partOfSpeech: "verb", synonyms: [], popularity: 1 },
      ],
    });
  });

  it("asks Google's dictionary for a word the dictionary lacks when Google is the translation service", async () => {
    const scope = settings("wiktionary");
    answerNextMessage("dictionaryLookup", { answer: null });

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    expect(sentMessages().map((message) => message.type)).toEqual(["dictionaryLookup", "translateWordFull"]);
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);
  });

  it("translates a word the dictionary lacks as text with another translation service", async () => {
    const scope = settings("wiktionary", "bergamot");
    answerNextMessage("dictionaryLookup", { answer: null });

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    expect(sentMessages().map((message) => message.type)).toEqual(["dictionaryLookup", "translateFullText"]);
    expect(sentMessages("translateFullText")).toEqual([
      expect.objectContaining({ text: "keys", translationService: "bergamot", sourceLanguage: "en" }),
    ]);
    expect(scope.getState($currentWordTranslation)).toMatchObject({
      mainTranslation: enRu.words.keys.main,
      translations: [],
    });
  });

  it("shows only Wiktionary's meanings with Wiktionary alone, whatever the translation service", async () => {
    const scope = settings("wiktionary", "bergamot");
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first] = scope.getState($subs);

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "keys", cueId: first.id, index: 8 } });

    expect(sentMessages("dictionaryLookup")).toHaveLength(1);
    expect(sentMessages("bergamot")).toEqual([]);
    expect(scope.getState($currentWordTranslation)).not.toHaveProperty("inLine");
  });

  it("translates a word Wiktionary lacks with Bergamot, alone and in its line, with Wiktionary + Bergamot", async () => {
    const scope = settings("wiktionary-bergamot");
    answerNextMessage("dictionaryLookup", { answer: null });

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    // One request to Bergamot, asked with the dictionary's
    expect(sentMessages().map((message) => message.type)).toEqual(["dictionaryLookup", "bergamot"]);
    expect(sentMessages("bergamot")).toEqual([
      { type: "bergamot", request: { type: "translate", texts: ["keys"], from: "en", to: "ru", html: true } },
    ]);
    expect(scope.getState($currentWordTranslation)).toMatchObject({
      mainTranslation: enRu.words.keys.main,
      translations: [],
    });
  });

  it("leaves out the word's translation in its line when it only repeats the first meaning", async () => {
    const scope = settings("wiktionary-bergamot");
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first] = scope.getState($subs);
    answerNextMessage("bergamot", { result: ["Почти. Мне просто нужно взять <b>ключи</b>.", "ключи"] });

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "keys", cueId: first.id, index: 8 } });

    expect(scope.getState($currentWordTranslation)).not.toHaveProperty("inLine");
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);
  });

  it("gives ChatGPT the line, and keeps its translation there for that line", async () => {
    const scope = settings("chatgpt");
    await allSettled($chatGPTApiKey, { scope, params: "sk-test" });
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first] = scope.getState($subs);

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "keys", cueId: first.id, index: 8 } });

    expect(sentMessages("chatGPTWord")).toEqual([
      expect.objectContaining({ text: "keys", line: "Almost. I just need to pick up my keys." }),
    ]);
    expect(scope.getState($currentWordTranslation)).toMatchObject({
      inLine: `↳${enRu.words.keys.main}`,
      context: `${first.id}:8`,
    });
  });

  it("asks ChatGPT with the key from the settings", async () => {
    const scope = settings("chatgpt");
    await allSettled($chatGPTApiKey, { scope, params: "sk-test" });

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    expect(sentMessages()).toEqual([
      {
        type: "chatGPTWord",
        text: "keys",
        from: "en",
        to: "ru",
        chatGPTApiKey: "sk-test",
        chatGPTModel: "gpt-4o-mini",
      },
    ]);
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);
  });

  it("translates the word as text with a translator, whatever the translation service", async () => {
    const scope = settings("deepl", "google");
    await allSettled($deeplApiKey, { scope, params: "key:fx" });
    answerNextMessage("translateFullText", "ключи");

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    expect(sentMessages()).toEqual([
      expect.objectContaining({
        type: "translateFullText",
        text: "keys",
        translationService: "deepl",
        deeplApiKey: "key:fx",
      }),
    ]);
    expect(scope.getState($currentWordTranslation)).toMatchObject({ mainTranslation: "ключи", translations: [] });
  });

  it("shows one Bergamot translation when the word alone translates as in its line", async () => {
    const scope = settings("bergamot");
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first] = scope.getState($subs);
    answerNextMessage("bergamot", { result: ["Почти. Мне просто нужно взять <b>ключи</b>.", "ключ"] });

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "keys", cueId: first.id, index: 8 } });

    expect(scope.getState($currentWordTranslation)).toEqual({
      source: "keys",
      mainTranslation: "ключ",
      targetLanguage: "ru",
      translations: [],
      transcription: "",
    });
  });

  it("translates the word in its line with Bergamot, apart from the same word in another line", async () => {
    const scope = settings("bergamot");
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first, second] = scope.getState($subs);

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "pick", cueId: first.id, index: 5 } });

    expect(sentMessages("bergamot")).toEqual([
      {
        type: "bergamot",
        request: {
          type: "translate",
          texts: ["Almost. I just need to <b>pick</b> up my keys.", "pick"],
          from: "en",
          to: "ru",
          html: true,
        },
      },
    ]);
    // Alone and in the line differ: both, the line's on top
    expect(scope.getState($currentWordTranslation)).toMatchObject({
      source: "pick",
      mainTranslation: enRu.words.pick.main,
      inLine: `↳${enRu.words.pick.main}`,
      translations: [{ word: enRu.words.pick.main }],
      context: `${first.id}:5`,
    });

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "Pick", cueId: second.id, index: 0 } });
    expect(sentMessages("bergamot")).toHaveLength(2);
  });

  it("adds the word's translation in its line to Wiktionary's meanings with Wiktionary + Bergamot", async () => {
    const scope = settings("wiktionary-bergamot");
    await allSettled(rawSubsAdded, { scope, params: PICK_LINES });
    const [first] = scope.getState($subs);

    await allSettled(WordTranslationsGate.open, { scope, params: { text: "keys", cueId: first.id, index: 8 } });

    expect(scope.getState($currentWordTranslation)).toMatchObject({
      mainTranslation: enRu.words.keys.main,
      inLine: `↳${enRu.words.keys.main}`,
      context: `${first.id}:8`,
    });
  });

  it("asks Ollama, and shows its error without keeping it", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const scope = settings("ollama");

    await allSettled(requestWordTranslation, { scope, params: "keys" });

    expect(sentMessages()).toEqual([
      {
        type: "ollamaWord",
        text: "keys",
        from: "en",
        to: "ru",
        ollamaUrl: "http://localhost:11434",
        ollamaModel: "translategemma:4b",
      },
    ]);
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);

    answerNextMessage("ollamaWord", { error: "Can't reach Ollama at http://localhost:11434. Is it running?" });
    await allSettled(requestWordTranslation, { scope, params: "keys" });
    // The word was kept the first time; another word fails
    answerNextMessage("ollamaWord", { error: "Can't reach Ollama at http://localhost:11434. Is it running?" });
    await allSettled(requestWordTranslation, { scope, params: "pick" });

    expect(scope.getState($currentWordTranslation)).toMatchObject({
      source: "pick",
      error: "Can't reach Ollama at http://localhost:11434. Is it running?",
    });
    expect(scope.getState($wordTranslations).map((translation) => translation.source)).toEqual(["keys"]);
  });
});

describe("line translation", () => {
  const translateLine = async (translationService: TTranslationService, text = CUE) => {
    const scope = fork({
      values: [
        [$translateLanguage, "ru"],
        [$subsLanguage, "en"],
        [$translationService, translationService],
        [$deeplApiKey, "key:fx"],
      ],
    });
    await allSettled(requestSubTranslation, { scope, params: text });
    return scope;
  };

  it("translates a line with Google Translate", async () => {
    const scope = await translateLine("google");

    expect(scope.getState($currentSubTranslation)).toBe(enRu.lines[CUE]);
    expect(sentMessages()).toEqual([
      {
        type: "translateFullText",
        language: "ru",
        text: CUE,
        translationService: "google",
        deeplApiKey: "key:fx",
        chatGPTApiKey: "",
        chatGPTModel: "gpt-4o-mini",
      },
    ]);
  });

  it("joins the sentences Google Translate answers with", async () => {
    chromeMock.runtime.sendMessage.mockResolvedValueOnce(
      JSON.stringify({ sentences: [{ trans: "Почти." }, { trans: "Только ключи возьму." }] }),
    );

    const scope = await translateLine("google");

    expect(scope.getState($currentSubTranslation)).toBe("Почти. Только ключи возьму.");
  });

  it.each<TTranslationService>(["deepl", "bing", "yandex", "chatgpt"])(
    "shows the text %s answers with",
    async (translationService) => {
      const scope = await translateLine(translationService);

      expect(sentMessages()).toEqual([expect.objectContaining({ translationService })]);
      expect(scope.getState($currentSubTranslation)).toBe(enRu.lines[CUE]);
    },
  );

  it("translates a line with Chrome's built-in translator, without the background", async () => {
    const translator = stubChromeTranslator();

    const scope = await translateLine("chrome");

    expect(scope.getState($currentSubTranslation)).toBe(`[chrome:ru] ${CUE}`);
    expect(translator.create).toHaveBeenCalledWith({ sourceLanguage: "en", targetLanguage: "ru" });
    expect(sentMessages()).toEqual([]);
  });

  it.each([
    ["the browser has no built-in translator", () => {}],
    ["Chrome can't translate the pair", () => stubChromeTranslator({ availability: "unavailable" })],
    ["Chrome may not download the pair without a click", () => stubChromeTranslator({ refuseCreate: true })],
  ])("translates a line with Google when %s", async (_, stub) => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    stub();

    const scope = await translateLine("chrome");

    expect(scope.getState($currentSubTranslation)).toBe(enRu.lines[CUE]);
    expect(sentMessages()).toEqual([
      expect.objectContaining({ type: "translateFullText", translationService: "google" }),
    ]);
  });

  it("shows no translation when the service fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    chromeMock.runtime.sendMessage.mockResolvedValueOnce({ error: "Invalid DeepL API key or quota exceeded" });

    const scope = await translateLine("deepl");

    expect(scope.getState($currentSubTranslation)).toBe(null);
    expect(scope.getState($subTranslationPendings)).toEqual({});
  });

  it("translates the clicked line and forgets it when the pointer leaves", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

    const translated = allSettled(SubTranslationGate.open, { scope, params: CUE });
    expect(scope.getState($subTranslationPendings)).toEqual({ [CUE]: true });
    await translated;
    expect(scope.getState($currentSubTranslation)).toBe(enRu.lines[CUE]);

    await allSettled(SubTranslationGate.close, { scope, params: CUE });
    expect(scope.getState($currentSubTranslation)).toBe(null);
  });
});
