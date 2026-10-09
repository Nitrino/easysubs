import { describe, expect, it, vi } from "vitest";
import { allSettled, fork, type Scope } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $currentExpression,
  $currentExpressionTranslation,
  $expressions,
  ExpressionTranslationGate,
  expressionTranslationRequested,
  wordHovered,
  wordLeft,
  expressionTranslator,
} from ".";
import { $chatGPTApiKey, $translateLanguage, $translationService, translateLanguageChanged } from "../settings";
import { $rawSubs, $subs, $subsLanguage, rawSubsAdded } from "../subs";
import type { TTranslationService } from "../types";
import { answerNextMessage, sentMessages } from "@root/test/chrome";
import { captions, offlineTranslations, playgroundCaptions } from "@root/test/fixtures";
import { stubChromeTranslator } from "@root/test/chromeTranslator";

const enRu = offlineTranslations("en-ru");
const CUE = "Almost. I just need to pick up my keys.";
// "What if we run out of time / at the station?": "run out" and "out of time"
const TWO_EXPRESSIONS = "What if we run out of time";

// The playground's English subtitles, translated into Russian by `service`, once their language is detected
async function loadSubtitles({ language = "en", service = "google" as TTranslationService } = {}) {
  const scope = fork({
    values: [
      [$translateLanguage, "ru"],
      [$translationService, service],
      [$chatGPTApiKey, "sk-test"],
    ],
  });
  await allSettled($rawSubs, { scope, params: playgroundCaptions("en") });
  await allSettled($subsLanguage, { scope, params: language });
  return scope;
}

const subStartingWith = (scope: Scope, text: string) =>
  scope.getState($subs).find((sub) => sub.cleanedText.startsWith(text));

// Hovers the word at `index` of the cue that starts with `text`
async function hover(scope: Scope, text: string, index: number) {
  const sub = subStartingWith(scope, text);
  await allSettled(wordHovered, { scope, params: { id: sub.id, cue: sub.text, index } });
  return sub;
}

// Hovers a word of an expression and opens its translation, like the popover does
async function openExpression(scope: Scope, text: string, index: number) {
  const sub = await hover(scope, text, index);
  const expression = scope.getState($currentExpression).expression;
  await allSettled(expressionTranslationRequested, { scope, params: { expression, cue: sub.text } });
  return scope.getState($currentExpressionTranslation);
}

describe("finding expressions", () => {
  it("looks up the whole track in one message once the subtitles' language is known", async () => {
    const scope = await loadSubtitles();

    const [message] = sentMessages("findExpressions");
    expect(sentMessages("findExpressions")).toHaveLength(1);
    expect(message).toMatchObject({ language: "en" });
    expect(message.cues).toHaveLength(new Set(playgroundCaptions("en").map((cue) => cue.text)).size);
    expect(message.cues).toContainEqual(["Almost.", "I", "just", "need", "to", "pick", "up", "my", "keys."]);
    expect(scope.getState($expressions).cues[subStartingWith(scope, CUE).text]).toContainEqual({
      expression: "pick up",
      kind: "phrasal verb",
      indexes: [5, 6],
    });
  });

  it("looks up nothing in a language without a list", async () => {
    answerNextMessage("getTextLanguage", "ja");

    await loadSubtitles({ language: "ja" });

    expect(sentMessages("findExpressions")).toEqual([]);
  });

  it("looks up only the cues that arrive later", async () => {
    const scope = await loadSubtitles();

    await allSettled(rawSubsAdded, { scope, params: captions([100_000, 102_000, "She gave up smoking."]) });

    expect(sentMessages("findExpressions").map((message) => message.cues)).toEqual([
      expect.any(Array),
      [["She", "gave", "up", "smoking."]],
    ]);
  });

  it("finds the expressions of every subtitle language with a list", async () => {
    const scope = fork({ values: [[$translateLanguage, "ru"]] });
    await allSettled($rawSubs, { scope, params: captions([0, 2000, "Ich rufe dich morgen an."]) });
    await allSettled($subsLanguage, { scope, params: "de" });

    expect(scope.getState($expressions).cues["Ich rufe dich morgen an."]).toEqual([
      { expression: "anrufen", kind: "separable verb", indexes: [1, 4] },
    ]);
  });

  it("looks up a track again in its new language", async () => {
    const scope = await loadSubtitles();

    await allSettled($subsLanguage, { scope, params: "de" });

    expect(sentMessages("findExpressions").map((message) => message.language)).toEqual(["en", "de"]);
    expect(scope.getState($expressions).language).toBe("de");
  });

  it("leaves the cues without expressions when the lookup fails, without asking again", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    answerNextMessage("findExpressions", { error: 'No expressions for "en": 404' });

    const scope = await loadSubtitles();

    expect(sentMessages("findExpressions")).toHaveLength(1);
    expect(scope.getState($expressions).cues[subStartingWith(scope, CUE).text]).toEqual([]);
  });
});

describe("hovering an expression", () => {
  it("shows the expression of a hovered word in its cue until the pointer leaves", async () => {
    const scope = await loadSubtitles();

    const sub = await hover(scope, CUE, 6);
    expect(scope.getState($currentExpression)).toEqual({
      expression: "pick up",
      kind: "phrasal verb",
      indexes: [5, 6],
      id: sub.id,
      cue: sub.text,
    });

    await allSettled(wordLeft, { scope });
    expect(scope.getState($currentExpression)).toBe(null);
  });

  it("shows no expression for other words", async () => {
    const scope = await loadSubtitles();

    await hover(scope, CUE, 8);

    expect(scope.getState($currentExpression)).toBe(null);
  });
});

describe("translating an expression", () => {
  it("translates it with Google's dictionary, in its dictionary form", async () => {
    const scope = await loadSubtitles();

    const translation = await openExpression(scope, CUE, 5);

    expect(sentMessages("translateWordFull")).toEqual([{ type: "translateWordFull", language: "ru", text: "pick up" }]);
    expect(translation).toMatchObject({ pending: false, error: null, inContext: false });
    expect(translation.translation.main).toBe(enRu.words["pick up"].main);
    expect(translation.translation.alternatives).toContainEqual({ text: "поднять", partOfSpeech: "verb" });
  });

  it.each<TTranslationService>(["deepl", "bing", "yandex"])("uses Google's dictionary with %s too", async (service) => {
    const scope = await loadSubtitles({ service });

    await openExpression(scope, CUE, 5);

    expect(sentMessages("translateWordFull")).toHaveLength(1);
  });

  it("translates each expression once", async () => {
    const scope = await loadSubtitles();

    await openExpression(scope, CUE, 5);
    await openExpression(scope, CUE, 6);

    expect(sentMessages("translateWordFull")).toHaveLength(1);
  });

  it("translates it with Chrome's built-in translator when it's the translation service", async () => {
    const translator = stubChromeTranslator();
    const scope = await loadSubtitles({ service: "chrome" });

    const translation = await openExpression(scope, CUE, 5);

    expect(translation.translation).toEqual({ main: "[chrome:ru] pick up", alternatives: [] });
    expect(translator.create).toHaveBeenCalledWith({ sourceLanguage: "en", targetLanguage: "ru" });
    expect(sentMessages("translateWordFull")).toEqual([]);
  });

  it("translates it with Google where Chrome can't", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    stubChromeTranslator({ availability: "unavailable" });
    const scope = await loadSubtitles({ service: "chrome" });

    const translation = await openExpression(scope, CUE, 5);

    expect(translation.translation.main).toBe(enRu.words["pick up"].main);
  });

  it("translates all the expressions of a line in one ChatGPT request, as they're used in it", async () => {
    const scope = await loadSubtitles({ service: "chatgpt" });

    const runOut = await openExpression(scope, TWO_EXPRESSIONS, 3);
    const outOfTime = await openExpression(scope, TWO_EXPRESSIONS, 6);

    expect(sentMessages("translateExpressions")).toEqual([
      {
        type: "translateExpressions",
        translator: "chatgpt",
        text: subStartingWith(scope, TWO_EXPRESSIONS).text,
        expressions: ["run out", "out of time"],
        language: "ru",
        chatGPTApiKey: "sk-test",
        chatGPTModel: "gpt-4o-mini",
      },
    ]);
    expect(runOut).toMatchObject({ inContext: true, translation: { main: enRu.words["run out"].main } });
    expect(outOfTime.translation.main).toBe(enRu.words["out of time"].main);
  });

  it("shows ChatGPT's error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const scope = await loadSubtitles({ service: "chatgpt" });
    answerNextMessage("translateExpressions", { error: "Invalid OpenAI API key" });

    const translation = await openExpression(scope, CUE, 5);

    expect(translation).toMatchObject({ pending: false, translation: null, error: "Invalid OpenAI API key" });
  });

  it("says when ChatGPT's answer leaves the expression out", async () => {
    const scope = await loadSubtitles({ service: "chatgpt" });
    answerNextMessage("translateExpressions", {});

    const translation = await openExpression(scope, CUE, 5);

    expect(translation).toMatchObject({ translation: null, error: "No translation" });
  });

  it("translates the open expression again into a new language", async () => {
    const scope = await loadSubtitles();
    const sub = await hover(scope, CUE, 5);
    await allSettled(ExpressionTranslationGate.open, { scope, params: { expression: "pick up", cue: sub.text } });

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(sentMessages("translateWordFull").map((message) => message.language)).toEqual(["ru", "de"]);
  });
});

describe("expressionTranslator", () => {
  it("translates in the line with ChatGPT or Ollama as the translation service, else like single words", () => {
    expect(expressionTranslator("chatgpt", "wiktionary")).toBe("chatgpt");
    expect(expressionTranslator("ollama", "google")).toBe("ollama");
    expect(expressionTranslator("google", "wiktionary")).toBe("wiktionary");
    expect(expressionTranslator("google", "chatgpt")).toBe("chatgpt");
    expect(expressionTranslator("google", "deepl")).toBe("deepl");
    expect(expressionTranslator("chrome", "google")).toBe("chrome");
    expect(expressionTranslator("deepl", "google")).toBe("google");
  });
});
