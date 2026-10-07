import { combine, createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

import type { TExpressionMatch, TExpressionTranslation, TTranslationService } from "../types";
import { $translateLanguage, $translationService } from "../settings";
import { expressionAt } from "@src/utils/expressions/findExpressions";
import { parseGoogleWordAnswer } from "@src/utils/googleWordAnswer";
import { chromeTranslate } from "@src/utils/chromeTranslator";

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

// Who translates expressions: ChatGPT and Chrome when they're the translation service, Google's dictionary for the
// others, like single words
export type TExpressionTranslator = "google" | "chrome" | "chatgpt";
export const expressionTranslator = (service: TTranslationService): TExpressionTranslator =>
  service === "chatgpt" || service === "chrome" ? service : "google";

// ChatGPT translates an expression as it's used in its cue, the others the same everywhere
export const expressionTranslationKey = (
  translator: TExpressionTranslator,
  language: string,
  expression: string,
  cue: string,
) =>
  translator === "chatgpt" ? `chatgpt:${language}:${cue}:${expression}` : `${translator}:${language}:${expression}`;

export const $expressionTranslations = createStore<Record<string, TExpressionTranslation>>({});
export const $expressionTranslationPendings = createStore<Record<string, true>>({});
export const $expressionTranslationErrors = createStore<Record<string, string>>({});

export const ExpressionTranslationGate = createGate<{ expression: string; cue: string }>("ExpressionTranslationGate");
export const expressionTranslationRequested = createEvent<{ expression: string; cue: string }>();

export type TTranslateExpressionParams = {
  translator: TExpressionTranslator;
  expression: string;
  cue: string;
  // All the expressions of the cue: ChatGPT translates them in one request
  cueExpressions: string[];
  // The subtitles' language, for Chrome's translator
  sourceLanguage: string;
  language: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
};

// The keys an answer fills: every expression of the cue for ChatGPT, the one asked for otherwise
export const requestedKeys = (params: TTranslateExpressionParams) =>
  (params.translator === "chatgpt" ? params.cueExpressions : [params.expression]).map((expression) =>
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

// Translations by their keys (expressionTranslationKey)
export const translateExpressionFx = createEffect<TTranslateExpressionParams, Record<string, TExpressionTranslation>>(
  async (params) => {
    const [key] = requestedKeys(params);
    if (params.translator === "chatgpt") {
      const response = await chrome.runtime.sendMessage({
        type: "translateExpressions",
        text: params.cue,
        expressions: params.cueExpressions,
        language: params.language,
        chatGPTApiKey: params.chatGPTApiKey,
        chatGPTModel: params.chatGPTModel,
      });
      if (!response || response.error) throw new Error(response?.error ?? "No translation received");
      return Object.fromEntries(
        Object.entries(response as Record<string, TExpressionTranslation>).map(([expression, translation]) => [
          expressionTranslationKey("chatgpt", params.language, expression, params.cue),
          translation,
        ]),
      );
    }
    if (params.translator === "chrome") {
      try {
        const main = await chromeTranslate(params.expression, params.sourceLanguage, params.language);
        return { [key]: { main, alternatives: [] } };
      } catch (error) {
        console.warn("Chrome's translator failed, using Google:", error);
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
    language: $translateLanguage,
  },
  ({ expression, translations, pendings, errors, service, language }) => {
    if (!expression) return null;
    const key = expressionTranslationKey(
      expressionTranslator(service),
      language,
      expression.expression,
      expression.cue,
    );
    return {
      translation: translations[key] ?? null,
      pending: Boolean(pendings[key]),
      error: errors[key] ?? null,
      inContext: expressionTranslator(service) === "chatgpt",
    };
  },
);
