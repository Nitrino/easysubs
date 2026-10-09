import { combine, createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

import type { TDictionaryService, TExpressionMatch, TExpressionTranslation, TTranslationService } from "../types";
import { $dictionaryService, $translateLanguage, $translationService } from "../settings";
import { expressionAt } from "@src/utils/expressions/findExpressions";
import { parseGoogleWordAnswer } from "@src/utils/googleWordAnswer";
import { chromeTranslate } from "@src/utils/chromeTranslator";
import { dictionaryTranslation, type TDictionaryAnswer } from "@src/utils/dictionary/lookup";
import { translateLine } from "../translations";
import { isWordTranslator } from "@src/utils/dictionaries";
import { markedTranslation } from "@src/utils/wordInLine";

// Phrasal verbs, idioms and other expressions in the subtitles (src/utils/expressions): looked up by the background
// for the whole track, shown when a word of one is hovered, and translated by the service picked in the settings.

// The expressions of the cues by cue text (TSub.text), for the cues looked up so far in the subtitles' language
export type TFoundExpressions = { language: string; cues: Record<string, TExpressionMatch[]> };
export const $expressions = createStore<TFoundExpressions>({ language: "", cues: {} });
// Cues being looked up, by lookupKey()
export const $expressionLookups = createStore<Record<string, true>>({});
export const lookupKey = (language: string, cue: string) => `${language}\n${cue}`;
export type TFindExpressionsParams = { language: string; cues: { text: string; words: string[] }[] };
export const findExpressionsFx = createEffect<TFindExpressionsParams, TExpressionMatch[][]>(
  async ({ language, cues }) => {
    const response = await chrome.runtime.sendMessage({
      type: "findExpressions",
      language,
      cues: cues.map((cue) => cue.words),
    });
    if (!Array.isArray(response)) throw new Error(response?.error ?? "No expressions received");
    return response;
  },
);
// Cues sent to the background in one message; a film has 1-2 thousand
export const MAX_CUES_PER_LOOKUP = 2000;

// The hovered word: its cue and its index among the cue's words
export type THoveredWord = { id: number; cue: string; index: number };
export const wordHovered = createEvent<THoveredWord>();
export const wordLeft = createEvent();
export const $hoveredWord = createStore<THoveredWord | null>(null);

// The expression of the hovered word, with the cue it's in
export type TCurrentExpression = TExpressionMatch & { id: number; cue: string };
export const $currentExpression = combine($expressions, $hoveredWord, (expressions, hovered) => {
  if (!hovered) return null;
  const match = expressionAt(expressions.cues[hovered.cue] ?? [], hovered.index);
  return match ? { ...match, id: hovered.id, cue: hovered.cue } : null;
});

// Who translates expressions: ChatGPT and Ollama as they're used in the line when they're the translation service,
// then the service of the Dictionary row, like single words, when it isn't Google, then Chrome or Bergamot when
// they're the translation service, and Google's dictionary otherwise
export type TExpressionTranslator = TDictionaryService;
export const expressionTranslator = (
  service: TTranslationService,
  dictionary: TDictionaryService = "google",
): TExpressionTranslator => {
  if (service === "chatgpt" || service === "ollama") return service;
  if (dictionary !== "google") return dictionary;
  return service === "chrome" || service === "bergamot" ? service : "google";
};
// ChatGPT and Ollama translate all the expressions of a cue in one request, as they're used in it
const batched = (translator: TExpressionTranslator) => translator === "chatgpt" || translator === "ollama";
// Bergamot translates the expression in its cue too (src/utils/wordInLine.ts)
const inContext = (translator: TExpressionTranslator) => batched(translator) || translator === "bergamot";

// ChatGPT, Ollama and Bergamot translate an expression as it's used in its cue, the others the same everywhere
export const expressionTranslationKey = (
  translator: TExpressionTranslator,
  language: string,
  expression: string,
  cue: string,
) =>
  inContext(translator) ? `${translator}:${language}:${cue}:${expression}` : `${translator}:${language}:${expression}`;

export const $expressionTranslations = createStore<Record<string, TExpressionTranslation>>({});
export const $expressionTranslationPendings = createStore<Record<string, true>>({});
export const $expressionTranslationErrors = createStore<Record<string, string>>({});

export const ExpressionTranslationGate = createGate<{ expression: string; cue: string }>("ExpressionTranslationGate");
export const expressionTranslationRequested = createEvent<{ expression: string; cue: string }>();

export type TTranslateExpressionParams = {
  translator: TExpressionTranslator;
  expression: string;
  cue: string;
  // All the expressions of the cue: ChatGPT and Ollama translate them in one request
  cueExpressions: string[];
  // The subtitles' language, for Chrome's translator, Bergamot and the dictionary
  sourceLanguage: string;
  language: string;
  // The translation service, for expressions the dictionary doesn't have
  service: TTranslationService;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
  ollamaUrl: string;
  ollamaModel: string;
  // The cue with the expression's words marked, for Bergamot
  marked: string | null;
};

// The keys an answer fills: every expression of the cue for ChatGPT and Ollama, the one asked for otherwise
export const requestedKeys = (params: TTranslateExpressionParams) =>
  (batched(params.translator) ? params.cueExpressions : [params.expression]).map((expression) =>
    expressionTranslationKey(params.translator, params.language, expression, params.cue),
  );

async function translateWithGoogle(expression: string, language: string): Promise<TExpressionTranslation> {
  const answer = await chrome.runtime.sendMessage({ type: "translateWordFull", language, text: expression });
  const { mainTranslation, translations } = parseGoogleWordAnswer(answer);
  return {
    main: mainTranslation,
    alternatives: translations
      .filter((translation) => translation.word !== mainTranslation)
      .map((translation) => ({ text: translation.word, partOfSpeech: translation.partOfSpeech })),
  };
}

// An expression the Wiktionary dictionary has, with its meanings as alternatives
async function translateWithDictionary(params: TTranslateExpressionParams): Promise<TExpressionTranslation | null> {
  const response = await chrome.runtime.sendMessage({
    type: "dictionaryLookup",
    from: params.sourceLanguage,
    to: params.language,
    text: params.expression,
  });
  if (!response?.answer) return null;
  const { mainTranslation, translations } = dictionaryTranslation(
    response.answer as TDictionaryAnswer,
    params.expression,
    params.language,
  );
  return {
    main: mainTranslation,
    alternatives: translations
      .filter((translation) => translation.word !== mainTranslation)
      .map((translation) => ({ text: translation.word, partOfSpeech: translation.partOfSpeech })),
  };
}

// Translations by their keys (expressionTranslationKey)
export const translateExpressionFx = createEffect<TTranslateExpressionParams, Record<string, TExpressionTranslation>>(
  async (params) => {
    const [key] = requestedKeys(params);
    if (batched(params.translator)) {
      const response = await chrome.runtime.sendMessage({
        type: "translateExpressions",
        translator: params.translator,
        text: params.cue,
        expressions: params.cueExpressions,
        language: params.language,
        ...(params.translator === "chatgpt"
          ? { chatGPTApiKey: params.chatGPTApiKey, chatGPTModel: params.chatGPTModel }
          : { ollamaUrl: params.ollamaUrl, ollamaModel: params.ollamaModel }),
      });
      if (!response || response.error) throw new Error(response?.error ?? "No translation received");
      return Object.fromEntries(
        Object.entries(response as Record<string, TExpressionTranslation>).map(([expression, translation]) => [
          expressionTranslationKey(params.translator, params.language, expression, params.cue),
          translation,
        ]),
      );
    }
    if (params.translator === "wiktionary") {
      const found = await translateWithDictionary(params).catch((error) => {
        console.warn("The Wiktionary dictionary failed:", error);
        return null;
      });
      if (found) return { [key]: found };
    }
    // A translator, also for what the dictionary doesn't have: the translation service then
    const translator = params.translator === "wiktionary" ? params.service : params.translator;
    if (translator === "chrome") {
      try {
        const main = await chromeTranslate(params.expression, params.sourceLanguage, params.language);
        return { [key]: { main, alternatives: [] } };
      } catch (error) {
        console.warn("Chrome's translator failed, using Google:", error);
      }
    }
    if (params.translator === "bergamot" && params.marked) {
      const answer = await chrome.runtime
        .sendMessage({
          type: "bergamot",
          request: {
            type: "translate",
            texts: [params.marked],
            from: params.sourceLanguage,
            to: params.language,
            html: true,
          },
        })
        .catch(() => null);
      const main = Array.isArray(answer?.result) ? markedTranslation(answer.result[0] ?? "") : null;
      if (main) return { [key]: { main, alternatives: [] } };
    }
    if (isWordTranslator(translator) && translator !== "chrome") {
      try {
        const main = await translateLine({
          source: params.expression,
          sourceLanguage: params.sourceLanguage,
          language: params.language,
          translationService: translator,
          deeplApiKey: params.deeplApiKey,
          chatGPTApiKey: "",
          chatGPTModel: "",
        });
        return { [key]: { main, alternatives: [] } };
      } catch (error) {
        console.warn(`${translator} failed, using Google:`, error);
      }
    }
    return { [key]: await translateWithGoogle(params.expression, params.language) };
  },
);

// The translation of the hovered expression in the current settings, and whether it's on the way or failed
export const $currentExpressionTranslation = combine(
  {
    expression: $currentExpression,
    translations: $expressionTranslations,
    pendings: $expressionTranslationPendings,
    errors: $expressionTranslationErrors,
    service: $translationService,
    dictionary: $dictionaryService,
    language: $translateLanguage,
  },
  ({ expression, translations, pendings, errors, service, dictionary, language }) => {
    if (!expression) return null;
    const translator = expressionTranslator(service, dictionary);
    const key = expressionTranslationKey(translator, language, expression.expression, expression.cue);
    return {
      translation: translations[key] ?? null,
      pending: Boolean(pendings[key]),
      error: errors[key] ?? null,
      inContext: inContext(translator),
    };
  },
);
