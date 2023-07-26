import { createEffect, createEvent, createStore, sample } from "effector";
import { debug } from "patronum";

import { TWordTranslation } from "../types";
import { $translateLanguage } from "../settings";

export const $wordTranslations = createStore<TWordTranslation[]>([], { name: "wordTranslations" });
export const $currentWordTranslation = createStore<TWordTranslation>(null, { name: "currentWordTranslation" });

export const requestWordTranslation = createEvent<string>();
export const cleanWordTranslation = createEvent();

export const fetchWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(async ({ source, language, translation }) => {
  if (translation) return translation;
  return await chrome.runtime.sendMessage({
    type: "translateWord",
    language: language,
    text: source,
  });
});

sample({
  clock: requestWordTranslation,
  source: { wordTranslations: $wordTranslations, language: $translateLanguage },
  fn: ({ wordTranslations, language }, source) => {
    return {
      translation: wordTranslations.find((t) => t.source === source) ?? null,
      source: source,
      language: language,
    };
  },
  target: fetchWordTranslationFx,
});

$currentWordTranslation.on(fetchWordTranslationFx.doneData, (_, translation) => translation);
$currentWordTranslation.reset(cleanWordTranslation);

debug($currentWordTranslation, requestWordTranslation, cleanWordTranslation, fetchWordTranslationFx.doneData);
