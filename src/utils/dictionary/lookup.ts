import type { TPartOfSpeach, TWordTranslation, TWordTranslationItem } from "@src/models/types";
import { normalizeLanguage } from "../languages";
import { normalizeWord } from "../expressions/normalize";
import { DICTIONARY_PAIRS, type TDictionary, type TDictionaryEntry } from "./format";

// Looking a word up in a Wiktionary dictionary (see format.ts) and showing it like Google's dictionary does

// Rows of the popover and other words of a row, which have to fit over the video
const MAX_MEANINGS = 6;
const MAX_SYNONYMS = 3;

// The pair's name when there's a dictionary for it: "en-ru"; both Chinese scripts share one
export function dictionaryPair(from: string, to: string): string | null {
  const code = (language: string) => {
    const normalized = normalizeLanguage(language);
    return normalized.startsWith("zh") ? "zh" : normalized;
  };
  const pair = `${code(from)}-${code(to)}`;
  return DICTIONARY_PAIRS.includes(pair) ? pair : null;
}

// A word or expression as the dictionary's keys have it, see scripts/dictionaries/wiktextract.ts
export const dictionaryKey = (text: string, language: string) =>
  text
    .split(/\s+/)
    .map((word) => normalizeWord(word, language))
    .filter(Boolean)
    .join(" ");

// What the dictionary has for a word: the meanings of its dictionary form first when it's an inflected one ("saw" is
// mostly "see" in films), then those of the word itself
export type TDictionaryAnswer = { word: string; transcription: string; lemma?: string; entries: TDictionaryEntry[] };

export function lookUpWord(dictionary: TDictionary, text: string): TDictionaryAnswer | null {
  const key = dictionaryKey(text, dictionary.from);
  if (!key) return null;
  const own = dictionary.words[key];
  const lemmaKey = (dictionary.forms[key] ?? []).find((lemma) => dictionary.words[lemma]);
  const lemma = lemmaKey ? dictionary.words[lemmaKey] : undefined;
  if (!own && !lemma) return null;
  return {
    word: own?.[0] ?? text,
    transcription: own?.[1] || lemma?.[1] || "",
    ...(lemma && { lemma: lemma[0] }),
    entries: [...(lemma?.[2] ?? []), ...(own?.[2] ?? [])],
  };
}

// Wiktionary's parts of speech by the names the popup shows
const PARTS_OF_SPEECH: Record<string, TPartOfSpeach> = {
  noun: "noun",
  verb: "verb",
  adj: "adjective",
  adv: "adverb",
  pron: "pronoun",
  prep: "preposition",
  postp: "preposition",
  conj: "conjunction",
  intj: "interjection",
  det: "determiner",
  article: "article",
  num: "numeral",
  particle: "particle",
  abbrev: "abbreviation",
  prefix: "prefix",
  name: "name",
  phrase: "phrase",
  prep_phrase: "phrase",
  adv_phrase: "phrase",
  proverb: "phrase",
};

export const partOfSpeech = (code: string): TPartOfSpeach => PARTS_OF_SPEECH[code] ?? "unknown";

// The answer as the word popover shows translations: the first meaning's first word on top, every meaning below it
// with the other words of the meaning and what tells it apart. A word that translates several senses of the same part
// of speech ("ключ" for the key of a lock and of a database) is one row, with the first sense's note.
export function dictionaryTranslation(answer: TDictionaryAnswer, source: string, language: string): TWordTranslation {
  const translations: TWordTranslationItem[] = [];
  for (const [pos, senses] of answer.entries) {
    for (const [words, note] of senses) {
      const partOfSpeechName = partOfSpeech(pos);
      const row = translations.find((item) => item.word === words[0] && item.partOfSpeech === partOfSpeechName);
      if (row) {
        row.synonyms = [...new Set([...row.synonyms, ...words.slice(1)])].slice(0, MAX_SYNONYMS);
        continue;
      }
      translations.push({
        word: words[0],
        partOfSpeech: partOfSpeechName,
        synonyms: words.slice(1, MAX_SYNONYMS + 1),
        popularity: translations.length,
        ...(note && { note }),
      });
    }
  }
  const shown = translations.slice(0, MAX_MEANINGS);
  return {
    source,
    mainTranslation: shown[0]?.word ?? "",
    targetLanguage: language,
    translations: shown,
    transcription: answer.transcription,
    ...(answer.lemma && answer.lemma.toLowerCase() !== source.toLowerCase() && { lemma: answer.lemma }),
  };
}
