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
import { $deeplApiKey, $translateLanguage, $translationService, translateLanguageChanged } from "../settings";
import { $subsLanguage } from "../subs";
import type { TTranslationService } from "../types";
import { chromeMock, sentMessages } from "@root/test/chrome";
import { offlineTranslations } from "@root/test/fixtures";
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

describe("word translation", () => {
  it("translates a word into the chosen language", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

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
    const scope = fork({ values: [[$translateLanguage, "ru"]] });
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
    const scope = fork({ values: [[$translateLanguage, "ru"]] });
    chromeMock.runtime.sendMessage.mockResolvedValueOnce([[null], [[[null, null, null, null, null, [["Сэм"]]]]], "en"]);

    await allSettled(requestWordTranslation, { scope, params: "Sam" });

    expect(scope.getState($currentWordTranslation)).toMatchObject({ mainTranslation: "Сэм", translations: [] });
  });

  it("translates each word once", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

    await allSettled(requestWordTranslation, { scope, params: "keys" });
    await allSettled(requestWordTranslation, { scope, params: "cat" });
    await allSettled(requestWordTranslation, { scope, params: "Keys" });

    expect(sentMessages("translateWordFull")).toHaveLength(2);
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enRu.words.keys.main);
  });

  it("marks the word as pending until the translation arrives", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

    const translated = allSettled(requestWordTranslation, { scope, params: "keys" });
    expect(scope.getState($wordTranslationsPendings)).toEqual({ keys: true });

    await translated;
    expect(scope.getState($wordTranslationsPendings)).toEqual({});
  });

  it("translates the hovered word and forgets it when the pointer leaves", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

    await allSettled(WordTranslationsGate.open, { scope, params: "keys" });
    expect(scope.getState($currentWordTranslation).source).toBe("keys");

    await allSettled(WordTranslationsGate.close, { scope, params: "keys" });
    expect(scope.getState($currentWordTranslation)).toBe(null);
  });

  it("translates the open word again into a newly chosen language", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });
    await allSettled(requestWordTranslation, { scope, params: "keys" });

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(sentMessages("translateWordFull").at(-1)).toMatchObject({ text: "keys", language: "de" });
    expect(scope.getState($currentWordTranslation).mainTranslation).toBe(enDe.words.keys.main);
    expect(scope.getState($wordTranslations).map((translation) => translation.targetLanguage)).toEqual(["de"]);
  });

  it("changes the language without errors when no word is open", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const scope = fork({ values: [[$translateLanguage, "ru"]] });

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(console.error).not.toHaveBeenCalled();
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
