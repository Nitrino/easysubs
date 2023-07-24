import { createEffect, createEvent, createStore, sample } from "effector";
import { TWordTranslation } from "../types";
import { $translateLanguage } from "../settings";

export const $wordTranslations = createStore<TWordTranslation[]>([], { name: "wordTranslations" });
export const $currentWordTranslation = createStore<TWordTranslation>(null, { name: "currentWordTranslation" });

const wordMouseEnter = createEvent<string>("wordMouseEntered");
const wordMouseLeave = createEvent("wordMouseEntered");
const chromeSendMessage = createEffect<{ type: "translateWord"; language: string; text: string }, any>(
  chrome.runtime.sendMessage
);

export const fetchWordTranslationFx = createEffect<
  { source: string; language: string; translation: TWordTranslation | null },
  TWordTranslation
>(async ({ source, language, translation }) => {
  if (translation) return translation;
  return await chromeSendMessage({ type: "translateWord", language, text: source });
});

sample({
  clock: wordMouseEnter,
  source: { wordTranslations: $wordTranslations, language: $translateLanguage },
  fn: ({ wordTranslations, language }, source) => {
    return {
      translation: wordTranslations.find((t) => t.source === source) ?? null,
      source: source,
      language: language,
    };
  },
});

$currentWordTranslation.on(fetchWordTranslationFx.doneData, (_, translation) => translation);
$currentWordTranslation.reset(wordMouseLeave);
