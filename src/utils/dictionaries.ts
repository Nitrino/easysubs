import type { TDictionaryService } from "@src/models/types";

// What each service of the Dictionary row gives a hovered word: several meanings with parts of speech (Wiktionary,
// ChatGPT, Ollama) or one translation, like a translator does with any text (Google's endpoint answers without its
// dictionary now)
export const DICTIONARY_DETAILS: Record<TDictionaryService, boolean> = {
  google: false,
  wiktionary: true,
  "wiktionary-bergamot": true,
  chatgpt: true,
  ollama: true,
  deepl: false,
  bing: false,
  yandex: false,
  chrome: false,
  bergamot: false,
};

// In the menu's order: those with meanings first
export const DICTIONARY_TITLES: Record<TDictionaryService, string> = {
  wiktionary: "Wiktionary (on device)",
  "wiktionary-bergamot": "Wiktionary + Bergamot",
  chatgpt: "ChatGPT",
  ollama: "Ollama",
  google: "Google Translate",
  deepl: "DeepL",
  bing: "Bing Translator",
  yandex: "Yandex Translate",
  chrome: "Chrome (on device)",
  bergamot: "Bergamot (on device)",
};

// The translators among them, which translate a word as text; Google has a request of its own for words
export type TWordTranslator = "deepl" | "bing" | "yandex" | "chrome" | "bergamot";
export const isWordTranslator = (service: string): service is TWordTranslator =>
  service !== "google" && service in DICTIONARY_DETAILS && !DICTIONARY_DETAILS[service as TDictionaryService];

// The Wiktionary dictionary looks words up for both Wiktionary services
export const usesDictionary = (service: string) => service === "wiktionary" || service === "wiktionary-bergamot";
