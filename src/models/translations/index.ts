import { createEffect, createEvent, createStore, sample, split } from "effector";
import { debug } from "patronum";

import type { TDictionaryService, TTranslationService, TWordTranslation } from "../types";
import {
  $translateLanguage,
  $translationService,
  $deeplApiKey,
  $chatGPTApiKey,
  $chatGPTModel,
  $dictionaryService,
  $ollamaUrl,
  $ollamaModel,
} from "../settings";
import { createGate } from "effector-react";
import { $subs, $subsLanguage } from "../subs";
import { parseGoogleWordAnswer } from "@src/utils/googleWordAnswer";
import { chromeTranslate } from "@src/utils/chromeTranslator";
import { dictionaryTranslation, type TDictionaryAnswer } from "@src/utils/dictionary/lookup";
import { escapeHtml, htmlText, markedLine, markedTranslation, repeatsTranslation } from "@src/utils/wordInLine";

export const $wordTranslations = createStore<TWordTranslation[]>([]);
export const $wordTranslationsPendings = createStore<Record<string, boolean>>({});
// The hovered word, with where it is when it's in a line on screen: Bergamot translates it in its line
export type TWordPlace = { text: string; cueId: number; index: number };
export const WordTranslationsGate = createGate<string | TWordPlace>("WordTranslationsGate");
const $wordPlace = WordTranslationsGate.state.map((props): TWordPlace | null =>
  typeof props === "object" && props && "cueId" in props ? props : null,
);
export const $currentWordTranslation = createStore<TWordTranslation>(null);
export const requestWordTranslation = createEvent<string>();

export const $currentSubTranslation = createStore<string>(null);
export const $subTranslationPendings = createStore<Record<string, boolean>>({});
export const SubTranslationGate = createGate<string>("SubTranslationGate");
export const requestSubTranslation = createEvent<string>();
export const cleanSubTranslation = createEvent();

export type TSubTranslationParams = {
  source: string;
  language: string;
  // The subtitles' language, for Chrome's translator and Bergamot, which can't detect it
  sourceLanguage: string;
  translationService: string;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
  ollamaUrl?: string;
  ollamaModel?: string;
};

async function translateWithBackground({
  source,
  language,
  sourceLanguage,
  translationService,
  deeplApiKey,
  chatGPTApiKey,
  chatGPTModel,
  ollamaUrl,
  ollamaModel,
}: TSubTranslationParams): Promise<string> {
  const resp = await chrome.runtime.sendMessage({
    type: "translateFullText",
    language: language,
    text: source,
    translationService: translationService,
    deeplApiKey: deeplApiKey,
    chatGPTApiKey: chatGPTApiKey,
    chatGPTModel: chatGPTModel,
    // What only one service needs goes to that one
    ...(translationService === "bergamot" && { sourceLanguage }),
    ...(translationService === "ollama" && { ollamaUrl, ollamaModel }),
  });

  if (resp?.error) {
    throw new Error(resp.error);
  }

  if (translationService !== "google") {
    return resp;
  }
  return JSON.parse(resp)
    ["sentences"].map((sentence) => sentence["trans"])
    .join(" ");
}

// A subtitle line by the translation service from the settings
export async function translateLine(params: TSubTranslationParams): Promise<string> {
  if (params.translationService === "chrome") {
    try {
      return await chromeTranslate(params.source, params.sourceLanguage, params.language);
    } catch (error) {
      // Google where Chrome can't translate: another browser, a pair it has no model for
      console.warn("Chrome's translator failed, using Google:", error);
      return await translateWithBackground({ ...params, translationService: "google" });
    }
  }
  if (params.translationService === "bergamot") {
    try {
      return await translateWithBackground(params);
    } catch (error) {
      // Google where Mozilla has no model for the pair, or the language isn't detected yet
      console.warn("Bergamot failed, using Google:", error);
      return await translateWithBackground({ ...params, translationService: "google" });
    }
  }
  return await translateWithBackground(params);
}

export const fetchSubTranslationFx = createEffect<TSubTranslationParams, string>(async (params) => {
  try {
    return await translateLine(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export type TWordParams = {
  source: string;
  language: string;
  translation: TWordTranslation | null;
  dictionary: TDictionaryService;
  sourceLanguage: string;
  service: TTranslationService;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
  ollamaUrl: string;
  ollamaModel: string;
  // The hovered word's line, with the word marked for Bergamot, and "cueId:index", when it's in a line on screen
  line: string | null;
  marked: string | null;
  context: string | null;
};

async function googleWord(source: string, language: string): Promise<TWordTranslation> {
  const result = await chrome.runtime.sendMessage({ type: "translateWordFull", language, text: source });
  const { transcription, mainTranslation, translations } = parseGoogleWordAnswer(result);
  return { source, mainTranslation, targetLanguage: language, translations, transcription };
}

// A word translated as text by a translator: one translation, without meanings
async function translatedWord(params: TWordParams, translationService: string): Promise<TWordTranslation> {
  const mainTranslation = await translateLine({ ...params, translationService });
  return {
    source: params.source,
    mainTranslation: mainTranslation.trim(),
    targetLanguage: params.language,
    translations: [],
    transcription: "",
  };
}

// A word asked of a language model, which answers like a dictionary
// The model also gets the line, and translates the word as it's used there besides its meanings
async function modelWord(type: "chatGPTWord" | "ollamaWord", params: TWordParams): Promise<TWordTranslation> {
  const response = await chrome.runtime.sendMessage({
    type,
    text: params.source,
    from: params.sourceLanguage,
    to: params.language,
    ...(params.line && { line: params.line }),
    ...(type === "chatGPTWord"
      ? { chatGPTApiKey: params.chatGPTApiKey, chatGPTModel: params.chatGPTModel }
      : { ollamaUrl: params.ollamaUrl, ollamaModel: params.ollamaModel }),
  });
  const translation: TWordTranslation | undefined = response?.translation;
  if (!translation) throw new Error(response?.error ?? "No translation received");
  return translation.inLine && params.context ? { ...translation, context: params.context } : translation;
}

// The word translated by Bergamot as it's used in its line, and alone when `alone` is asked too: one request, both in
// HTML mode (the word alone is plain text in it). Null where there's no line, the word merged into another, or
// Bergamot failed.
async function bergamotTexts(
  params: TWordParams,
  alone = false,
): Promise<{ inLine: string | null; alone: string | null }> {
  const texts = [...(params.marked ? [params.marked] : []), ...(alone ? [escapeHtml(params.source)] : [])];
  if (texts.length === 0) return { inLine: null, alone: null };
  try {
    const answer = await chrome.runtime.sendMessage({
      type: "bergamot",
      request: { type: "translate", texts, from: params.sourceLanguage, to: params.language, html: true },
    });
    if (!Array.isArray(answer?.result)) throw new Error(answer?.error ?? "Bergamot didn't answer");
    const result: string[] = answer.result;
    // Bergamot capitalizes a word alone like a sentence: "Спроси" for "asked"
    const word = alone ? htmlText(result[texts.length - 1] ?? "") : "";
    const lowercase = params.source.charAt(0) === params.source.charAt(0).toLowerCase();
    return {
      inLine: params.marked ? markedTranslation(result[0] ?? "") : null,
      alone: (lowercase ? word.charAt(0).toLowerCase() + word.slice(1) : word) || null,
    };
  } catch (error) {
    console.warn("Bergamot couldn't translate the word:", error);
    return { inLine: null, alone: null };
  }
}

const wordInLine = async (params: TWordParams) => (await bergamotTexts(params)).inLine;

// A word translated by Bergamot alone and as it's used in its line: both when they differ, the line's on top
async function bergamotWord(params: TWordParams): Promise<TWordTranslation> {
  const { inLine, alone } = await bergamotTexts(params, true);
  if (!alone) return translatedWord(params, "bergamot");
  const translation: TWordTranslation = {
    source: params.source,
    mainTranslation: alone,
    targetLanguage: params.language,
    translations: [],
    transcription: "",
  };
  if (!inLine || repeatsTranslation(inLine, [alone])) return translation;
  return {
    ...translation,
    translations: [{ word: alone, partOfSpeech: "unknown", synonyms: [], popularity: 0 }],
    inLine,
    context: params.context ?? undefined,
  };
}

async function lookUpWord(params: TWordParams): Promise<TWordTranslation> {
  const { source, language, sourceLanguage, dictionary } = params;
  switch (dictionary) {
    case "wiktionary": {
      const response = await chrome.runtime.sendMessage({
        type: "dictionaryLookup",
        from: sourceLanguage,
        to: language,
        text: source,
      });
      if (response?.answer) {
        const translation = dictionaryTranslation(response.answer as TDictionaryAnswer, source, language);
        // With Bergamot as the translation service, the meanings come with the word's translation in the line,
        // unless it only repeats the first meaning
        const inLine = params.service === "bergamot" ? await wordInLine(params) : null;
        const [first] = translation.translations;
        if (!inLine || (first && repeatsTranslation(inLine, [first.word, ...first.synonyms]))) return translation;
        return { ...translation, inLine, context: params.context ?? undefined };
      }
      if (response?.error) console.warn("The Wiktionary dictionary failed:", response.error);
      // A word the dictionary doesn't have: Google's dictionary when Google is the translation service, the word
      // translated as text by the translation service otherwise
      if (params.service === "bergamot") return bergamotWord(params);
      return params.service === "google" ? googleWord(source, language) : translatedWord(params, params.service);
    }
    case "bergamot":
      return bergamotWord(params);
    case "chatgpt":
      return modelWord("chatGPTWord", params);
    case "ollama":
      return modelWord("ollamaWord", params);
    case "google":
      return googleWord(source, language);
    default:
      return translatedWord(params, dictionary);
  }
}

// An error shows in the popover instead of the translation, and isn't kept: the next hover asks again
export const fetchWordTranslationFx = createEffect<TWordParams, TWordTranslation>(async (params) => {
  try {
    return await lookUpWord(params);
  } catch (error) {
    console.error(error);
    return {
      source: params.source,
      mainTranslation: "",
      targetLanguage: params.language,
      translations: [],
      transcription: "",
      error: (error as Error).message,
    };
  }
});

export const updateCurrentWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(({ translation }) => translation);

const wordTranslationDataCombined = sample({
  clock: requestWordTranslation,
  source: {
    wordTranslations: $wordTranslations,
    place: $wordPlace,
    subs: $subs,
    language: $translateLanguage,
    dictionary: $dictionaryService,
    sourceLanguage: $subsLanguage,
    service: $translationService,
    deeplApiKey: $deeplApiKey,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
    ollamaUrl: $ollamaUrl,
    ollamaModel: $ollamaModel,
  },
  fn: ({ wordTranslations, place, subs, ...settings }, source): TWordParams => {
    const sourceLowerCase = source.toLowerCase();
    const sub =
      place && place.text.toLowerCase() === sourceLowerCase ? subs.find(({ id }) => id === place.cueId) : null;
    const context = sub ? `${place!.cueId}:${place!.index}` : null;
    return {
      ...settings,
      // A translation in another line isn't this word's here
      translation:
        wordTranslations.find((t) => t?.source === sourceLowerCase && (!t.context || t.context === context)) ?? null,
      source: sourceLowerCase,
      line: sub ? sub.cleanedText : null,
      marked: sub ? markedLine(sub.items, [place!.index]) : null,
      context,
    };
  },
});

split({
  source: wordTranslationDataCombined,
  match: {
    hasTranslation: ({ translation }) => translation !== null,
    noTranslation: ({ translation }) => translation === null,
  },
  cases: {
    hasTranslation: updateCurrentWordTranslationFx,
    noTranslation: fetchWordTranslationFx,
  },
});

sample({
  clock: fetchWordTranslationFx.doneData,
  source: $wordTranslations,
  fn: (translations, translation) => {
    return { translations, translation };
  },
});

$currentWordTranslation.on(
  [fetchWordTranslationFx.doneData, updateCurrentWordTranslationFx.doneData],
  (_, translation) => translation,
);
$currentWordTranslation.reset(WordTranslationsGate.close);
$wordTranslations.on(fetchWordTranslationFx.doneData, (allTranslation, translation) =>
  translation.error ? allTranslation : [...allTranslation, translation],
);

$wordTranslationsPendings.on(fetchWordTranslationFx, (pendings, { source }) => ({
  ...pendings,
  [source]: true,
}));

$wordTranslationsPendings.on(fetchWordTranslationFx.finally, (pendings, { params: { source } }) => {
  const copy = { ...pendings };
  delete copy[source];
  return copy;
});

sample({
  clock: WordTranslationsGate.open,
  fn: (props) => (typeof props === "string" ? props : props.text),
  target: requestWordTranslation,
});

sample({
  clock: requestSubTranslation,
  source: {
    language: $translateLanguage,
    sourceLanguage: $subsLanguage,
    translationService: $translationService,
    deeplApiKey: $deeplApiKey,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
    ollamaUrl: $ollamaUrl,
    ollamaModel: $ollamaModel,
  },
  fn: (settings, source) => ({ source, ...settings }),
  target: fetchSubTranslationFx,
});

$currentSubTranslation.on(fetchSubTranslationFx.doneData, (_, translation) => translation);
$currentSubTranslation.reset(SubTranslationGate.close);
$subTranslationPendings.on(fetchSubTranslationFx, (pendings, { source }) => ({
  ...pendings,
  [source]: true,
}));
$subTranslationPendings.on(fetchSubTranslationFx.finally, (pendings, { params: { source } }) => {
  const copy = { ...pendings };
  delete copy[source];
  return copy;
});
sample({
  clock: SubTranslationGate.open,
  target: requestSubTranslation,
});

$wordTranslations.reset([$translateLanguage, $dictionaryService, $translationService]);

sample({
  clock: $translateLanguage,
  source: $currentWordTranslation,
  filter: (translation) => translation !== null,
  fn: (translation) => translation.source,
  target: requestWordTranslation,
});

debug(
  $wordTranslations,
  $currentWordTranslation,
  requestWordTranslation,
  fetchWordTranslationFx.doneData,
  $currentSubTranslation,
  requestSubTranslation,
  cleanSubTranslation,
  fetchSubTranslationFx.doneData,
);
