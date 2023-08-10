import { createEffect, createEvent, createStore, sample, split } from "effector";
import { debug } from "patronum";

import { TPartOfSpeach, TTranslateAlternative, TWordTranslation, TWordTranslationItem } from "../types";
import { $translateLanguage } from "../settings";
import { googleNumberToPartOfSpeach } from "@src/utils/googleNumberToPartOfSpeach";

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
  try {
    const result: any = await chrome.runtime.sendMessage({
      type: "translateWordFull",
      language: language,
      text: source,
    });

    console.log("++result", result);

    const transcription: string = result[0][0];
    const mainTranslation: string = result[1][0][0][5][0][0];
    const alternativesRaw = (result[3] && result[3][5] && result[3][5][0]) || [];
    const alternatives: [] = alternativesRaw
      .flatMap((alternative: TTranslateAlternative): TWordTranslationItem[] => {
        const variants: [string, string[], number][] = alternative[1].map((val) => [val[0], val[2], val[3]]);
        return variants.map((variant) => ({
          word: variant[0],
          partOfSpeech: googleNumberToPartOfSpeach(alternative[4]) as TPartOfSpeach,
          synonyms: variant[1].slice(0, 3),
          popularity: variant[2],
        }));
      })
      .sort((a: TWordTranslationItem, b: TWordTranslationItem) => a.popularity - b.popularity)
      .slice(0, 5);

    return {
      source: source,
      mainTranslation: mainTranslation,
      targetLanguage: language,
      translations: alternatives.slice(0, 5),
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
      translation: wordTranslations.find((t) => t.source === sourceLowerCase) ?? null,
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
