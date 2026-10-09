// The Wiktionary dictionaries hovered words are looked up in on the device: a file per language pair, built by
// scripts/dictionaries/build.ts from kaikki.org's Wiktextract dumps and attached to the GitHub release
// DICTIONARIES_RELEASE, which the background downloads a pair from when it's first needed (src/utils/dictionary).
// No imports: the build runs it in Node.

// A meaning of a word: its translations, most common first, and what tells it apart from the other meanings (the
// English sense of an English word, a usage label like "colloquial" of a word translated into English)
export type TDictionarySense = [translations: string[], note?: string];
// A part of speech of the word with its meanings, in Wiktionary's order
export type TDictionaryEntry = [partOfSpeech: string, senses: TDictionarySense[]];
// The word as Wiktionary writes it, its transcription ("" when there's none) and its parts of speech
export type TDictionaryWord = [word: string, transcription: string, entries: TDictionaryEntry[]];

export type TDictionary = {
  from: string;
  to: string;
  source: string;
  license: string;
  // By the word normalized (src/utils/expressions/normalize.ts): "pick up", "perro"
  words: Record<string, TDictionaryWord>;
  // Inflected forms, normalized, and the words they're forms of: "went" → ["go"], "left" → ["leave"]
  forms: Record<string, string[]>;
};

// The pairs there are files for. English Wiktionary translates English words into other languages in its
// translation tables, and explains the words of other languages in English, so every pair has English on one side.
// The words of the other side are the languages of the expression lists, whose dumps the expressions build reads too.
export const DICTIONARY_TARGETS = ["ru", "uk", "es", "de", "fr", "it", "pt", "nl", "pl", "tr", "ja", "zh", "ko"];
export const DICTIONARY_SOURCES = ["ru", "es", "de", "fr", "it", "pt", "nl"];
export const DICTIONARY_PAIRS = [
  ...DICTIONARY_TARGETS.map((language) => `en-${language}`),
  ...DICTIONARY_SOURCES.map((language) => `${language}-en`),
];

// Bumped when the format changes, with a new release: extensions already out keep reading the files they know
export const DICTIONARIES_RELEASE = "dictionaries-1";
export const DICTIONARIES_URL = `https://github.com/Nitrino/easysubs/releases/download/${DICTIONARIES_RELEASE}/`;
export const dictionaryFile = (from: string, to: string) => `${from}-${to}.json.gz`;
