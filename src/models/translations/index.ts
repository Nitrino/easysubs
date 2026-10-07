import { createEffect, createEvent, createStore, sample, split } from "effector";
import { debug } from "patronum";

import { TWordTranslation } from "../types";
import { $translateLanguage, $translationService, $deeplApiKey, $chatGPTApiKey, $chatGPTModel } from "../settings";
import { createGate } from "effector-react";
import { $subsLanguage } from "../subs";
import { parseGoogleWordAnswer } from "@src/utils/googleWordAnswer";
import { chromeTranslate } from "@src/utils/chromeTranslator";

export const $wordTranslations = createStore<TWordTranslation[]>([]);
export const $wordTranslationsPendings = createStore<Record<string, boolean>>({});
export const WordTranslationsGate = createGate<string>("WordTranslationsGate");
export const $currentWordTranslation = createStore<TWordTranslation>(null);
export const requestWordTranslation = createEvent<string>();

export const $currentSubTranslation = createStore<string>(null);
export const $subTranslationPendings = createStore<Record<string, boolean>>({});
export const SubTranslationGate = createGate<string>("SubTranslationGate");
export const requestSubTranslation = createEvent<string>();
export const cleanSubTranslation = createEvent();

type TSubTranslationParams = {
  source: string;
  language: string;
  // The subtitles' language, for Chrome's translator, which can't detect it
  sourceLanguage: string;
  translationService: string;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
};

async function translateWithBackground({
  source,
  language,
  translationService,
  deeplApiKey,
  chatGPTApiKey,
  chatGPTModel,
}: TSubTranslationParams): Promise<string> {
  const resp = await chrome.runtime.sendMessage({
    type: "translateFullText",
    language: language,
    text: source,
    translationService: translationService,
    deeplApiKey: deeplApiKey,
    chatGPTApiKey: chatGPTApiKey,
    chatGPTModel: chatGPTModel,
  });

  if (resp.error) {
    throw new Error(resp.error);
  }

  if (
    translationService === "deepl" ||
    translationService === "bing" ||
    translationService === "yandex" ||
    translationService === "chatgpt"
  ) {
    return resp;
  }
  return JSON.parse(resp)
    ["sentences"].map((sentence) => sentence["trans"])
    .join(" ");
}

export const fetchSubTranslationFx = createEffect<TSubTranslationParams, string>(async (params) => {
  try {
    if (params.translationService === "chrome") {
      try {
        return await chromeTranslate(params.source, params.sourceLanguage, params.language);
      } catch (error) {
        // Google where Chrome can't translate: another browser, a pair it has no model for
        console.warn("Chrome's translator failed, using Google:", error);
        return await translateWithBackground({ ...params, translationService: "google" });
      }
    }
    return await translateWithBackground(params);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const fetchWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(async ({ source, language }) => {
  try {
    const result = await chrome.runtime.sendMessage({
      type: "translateWordFull",
      language: language,
      text: source,
    });
    const { transcription, mainTranslation, translations } = parseGoogleWordAnswer(result);

    return {
      source: source,
      mainTranslation: mainTranslation,
      targetLanguage: language,
      translations: translations,
      transcription: transcription,
    };
  } catch (error) {
    console.error(error);
  }
});

export const updateCurrentWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(({ translation }) => translation);

const wordTranslationDataCombined = sample({
  clock: requestWordTranslation,
  source: { wordTranslations: $wordTranslations, language: $translateLanguage },
  fn: ({ wordTranslations, language }, source) => {
    const sourceLowerCase = source.toLowerCase();
    return {
      translation: wordTranslations.find((t) => t?.source === sourceLowerCase) ?? null,
      source: sourceLowerCase,
      language: language,
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
$wordTranslations.on(fetchWordTranslationFx.doneData, (allTranslation, translation) => [
  ...allTranslation,
  translation,
]);

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
  },
  fn: ({ language, sourceLanguage, translationService, deeplApiKey, chatGPTApiKey, chatGPTModel }, source) => ({
    source,
    language,
    sourceLanguage,
    translationService,
    deeplApiKey,
    chatGPTApiKey,
    chatGPTModel,
  }),
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

$wordTranslations.reset($translateLanguage);

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
