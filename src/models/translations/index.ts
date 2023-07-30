import { createEffect, createEvent, createStore, sample, split } from "effector";
import { debug } from "patronum";

import { TWordTranslation } from "../types";
import { $translateLanguage } from "../settings";

export const $wordTranslations = createStore<TWordTranslation[]>([]);
export const $currentWordTranslation = createStore<TWordTranslation>(null);
export const requestWordTranslation = createEvent<string>();
export const cleanWordTranslation = createEvent();

export const $currentSubTranslation = createStore<string>(null);
export const requestSubTranslation = createEvent<string>();
export const cleanSubTranslation = createEvent();
export const fetchSubTranslationFx = createEffect<{ source: string; language: string }, string>(
  async ({ source, language }) => {
    return await chrome.runtime.sendMessage({
      type: "translateFullText",
      language: language,
      text: source,
    });
  }
);

export const fetchWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(async ({ source, language }) => {
  const result: any = await chrome.runtime.sendMessage({
    type: "translateWordFull",
    language: language,
    text: source,
  });

  const translations: string[] = result[1][0][0][5][0][4].map((val: string[]) => val[0]);
  const synonyms: string[] = result[1][0][0][9][1];

  return {
    source: source,
    target_language: language,
    translations: translations,
    synonyms: synonyms,
  };
});

export const updateCurrentWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(({ translation }) => translation);

const wordTranslationDataCombined = sample({
  clock: requestWordTranslation,
  source: { wordTranslations: $wordTranslations, language: $translateLanguage },
  fn: ({ wordTranslations, language }, source) => {
    return {
      translation: wordTranslations.find((t) => t.source === source) ?? null,
      source: source,
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
  (_, translation) => translation
);
$currentWordTranslation.reset(cleanWordTranslation);
$wordTranslations.on(fetchWordTranslationFx.doneData, (allTranslation, translation) => [
  ...allTranslation,
  translation,
]);

sample({
  clock: requestSubTranslation,
  source: $translateLanguage,
  fn: (language, source) => ({ source, language }),
  target: fetchSubTranslationFx,
});

$currentSubTranslation.on(fetchSubTranslationFx.doneData, (_, translation) => translation);
$currentSubTranslation.reset(cleanSubTranslation);

debug(
  $wordTranslations,
  $currentWordTranslation,
  requestWordTranslation,
  cleanWordTranslation,
  fetchWordTranslationFx.doneData,
  $currentSubTranslation,
  requestSubTranslation,
  cleanSubTranslation,
  fetchSubTranslationFx.doneData
);
