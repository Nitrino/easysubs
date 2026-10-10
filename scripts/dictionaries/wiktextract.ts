// Turns Wiktextract records (Wiktionary entries as JSON, https://kaikki.org) into the words of a dictionary, see
// src/utils/dictionary/format.ts. Pure functions, so build.ts only streams the dumps.
import type {
  TDictionary,
  TDictionaryEntry,
  TDictionarySense,
  TDictionaryWord,
} from "../../src/utils/dictionary/format.ts";
import { normalizeWord } from "../../src/utils/expressions/normalize.ts";

type TTranslation = { code?: string; word?: string; sense?: string; _dis1?: string };

export type TWiktextractRecord = {
  word: string;
  pos: string;
  lang_code: string;
  forms?: { form: string; tags?: string[] }[];
  sounds?: { ipa?: string }[];
  senses?: {
    glosses?: string[];
    tags?: string[];
    form_of?: { word: string }[];
    translations?: TTranslation[];
  }[];
  // Older translation tables that Wiktextract couldn't tie to a sense, with the sense they're for as text
  translations?: TTranslation[];
};

const MAX_SENSES = 8;
const MAX_TRANSLATIONS = 4;
const MAX_NOTE_LENGTH = 90;
// A gloss longer than this explains the word rather than translating it; it's kept whole
const MAX_SPLIT_GLOSS = 60;

// Wiktionary's codes for the languages of translation tables, where they aren't ours
const TRANSLATION_CODES: Record<string, string[]> = { zh: ["cmn", "zh"] };

// Russian, Ukrainian and Belarusian words carry stress marks in Wiktionary ("теря́ть"), which their speakers don't write
const STRESSED_LANGUAGES = new Set(["ru", "uk", "be"]);
const plainWord = (word: string, language: string) =>
  STRESSED_LANGUAGES.has(language) ? word.normalize("NFD").replace(/[̀́]/g, "").normalize("NFC") : word;

// Senses no one meets in films any more
const SKIPPED_SENSE_TAGS = new Set(["obsolete", "archaic", "misspelling"]);
// Forms that aren't words of the language
const SKIPPED_FORM_TAGS = new Set([
  "table-tags",
  "inflection-template",
  "class",
  "romanization",
  "auxiliary",
  "archaic",
  "obsolete",
  "dated",
  "rare",
  "nonstandard",
  "misspelling",
  "dialectal",
  "alternative",
  "abbreviation",
  "pre-reform",
]);
// A form that seems to be a form of this many words is a table of pronouns or the like, not a word to look up by
const MAX_LEMMAS = 3;
// Usage labels worth showing next to a word translated into English
const NOTE_TAGS = new Set([
  "colloquial",
  "informal",
  "slang",
  "vulgar",
  "figuratively",
  "humorous",
  "derogatory",
  "offensive",
  "formal",
  "literary",
  "euphemistic",
  "dated",
  "rare",
  "regional",
]);

// The key of a word or expression: its words normalized like those of the subtitles
export const dictionaryKey = (text: string, language: string) =>
  text
    .split(/\s+/)
    .map((word) => normalizeWord(word, language))
    .filter(Boolean)
    .join(" ");

const shorten = (text: string) => {
  const trimmed = text.trim();
  if (trimmed.length <= MAX_NOTE_LENGTH) return trimmed;
  const cut = trimmed.slice(0, MAX_NOTE_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : MAX_NOTE_LENGTH)}…`;
};

// Inflected forms have entries of their own ("went" of "go"); every sense of one says what it's a form of
const isFormOf = (record: TWiktextractRecord) =>
  (record.senses ?? []).length > 0 &&
  (record.senses ?? []).every((sense) => sense.tags?.includes("form-of") || (sense.form_of ?? []).length > 0);

const isCurrent = (sense: NonNullable<TWiktextractRecord["senses"]>[number]) =>
  !(sense.tags ?? []).some((tag) => SKIPPED_SENSE_TAGS.has(tag));

const unique = (words: string[]) => [...new Set(words.filter(Boolean))];

// The first transcription, without the slashes or brackets around it
export function transcription(record: TWiktextractRecord): string {
  const ipa = (record.sounds ?? []).find((sound) => sound.ipa)?.ipa ?? "";
  return ipa.replace(/^[/[]|[/\]]$/g, "");
}

// Where an untied translation table belongs: Wiktextract scores it against each sense ("_dis1": "15 15 0 1 …"), and the
// best score is its sense. Tables it couldn't score come first, as Wiktionary lists its tables in the senses' order.
function senseIndexOf(translation: TTranslation): number {
  const scores = (translation._dis1 ?? "").split(" ").map(Number);
  const best = Math.max(...scores);
  return scores.length > 1 && best > 0 ? scores.indexOf(best) : -1;
}

// An English word's meanings translated into `target`: its back translations first (`back`, the words of `target`
// glossed with it), then the translation tables in the order of the senses they're for
export function translatedSenses(record: TWiktextractRecord, target: string, back: string[] = []): TDictionarySense[] {
  const codes = new Set(TRANSLATION_CODES[target] ?? [target]);
  const wordsOf = (translations: TTranslation[] = []) =>
    unique(
      translations
        .filter((translation) => codes.has(translation.code ?? "") && translation.word)
        .map((translation) => plainWord(translation.word!.trim(), target)),
    ).slice(0, MAX_TRANSLATIONS);

  const ranked: [index: number, sense: TDictionarySense][] = [];
  (record.senses ?? []).forEach((sense, index) => {
    if (!isCurrent(sense)) return;
    const words = wordsOf(sense.translations);
    if (words.length > 0) ranked.push([index, [words, shorten(sense.glosses?.at(-1) ?? "")]]);
  });
  const tables = new Map<string, TTranslation[]>();
  for (const translation of record.translations ?? []) {
    const sense = translation.sense ?? "";
    tables.set(sense, [...(tables.get(sense) ?? []), translation]);
  }
  for (const [sense, translations] of tables) {
    const words = wordsOf(translations);
    if (words.length > 0) ranked.push([senseIndexOf(translations[0]), [words, shorten(sense)]]);
  }
  ranked.sort(([a], [b]) => a - b);
  const senses = ranked.map(([, sense]) => sense);
  // The main meaning may have no table: "dog" has its tables on a page of their own, which the dump lacks
  const firstMissing = ranked.length === 0 || ranked[0][0] > 0;
  const backWords = unique(back).slice(0, MAX_TRANSLATIONS);
  if (firstMissing && backWords.length > 0) senses.unshift([backWords]);
  return senses.slice(0, MAX_SENSES).map(([words, note]) => (note ? [words, note] : [words]));
}

// A word of another language explained in English: each gloss is a meaning, split into its translations when it's
// a list of them ("to lose; to misplace")
export function glossedSenses(record: TWiktextractRecord): TDictionarySense[] {
  const senses: TDictionarySense[] = [];
  for (const sense of record.senses ?? []) {
    if (!isCurrent(sense) || (sense.form_of ?? []).length > 0) continue;
    const gloss = sense.glosses?.at(-1)?.trim().replace(/\.$/, "");
    if (!gloss) continue;
    const words = gloss.length > MAX_SPLIT_GLOSS ? [gloss] : unique(gloss.split(/\s*;\s*/));
    const labels = (sense.tags ?? []).filter((tag) => NOTE_TAGS.has(tag));
    senses.push(labels.length > 0 ? [words.slice(0, MAX_TRANSLATIONS), labels.join(", ")] : [words]);
  }
  return senses.slice(0, MAX_SENSES);
}

// The English words a word of another language is glossed with, where a gloss is just a word: "dog" for "собака",
// "to eat" for "есть". With the index of the sense, the most common meanings coming first.
export function backTranslations(
  record: TWiktextractRecord,
  language: string,
): [english: string, partOfSpeech: string, word: string, rank: number][] {
  if (record.lang_code !== language || isFormOf(record)) return [];
  const found: [string, string, string, number][] = [];
  (record.senses ?? []).forEach((sense, index) => {
    if (!isCurrent(sense) || (sense.form_of ?? []).length > 0) return;
    for (const gloss of (sense.glosses?.at(-1) ?? "").split(/\s*[;,]\s*/)) {
      const english = gloss.replace(/\.$/, "").replace(/^(to|a|an|the) /i, "");
      if (/^[a-z][a-z' -]{0,29}$/i.test(english)) {
        found.push([dictionaryKey(english, "en"), record.pos, plainWord(record.word, language), index]);
      }
    }
  });
  return found;
}

// The back translations of English words by word and part of speech
export type TBackTranslations = Map<string, string[]>;
export const backKey = (english: string, partOfSpeech: string) => `${english}\n${partOfSpeech}`;
export function collectBackTranslations(found: Iterable<[string, string, string, number]>): TBackTranslations {
  const ranked = new Map<string, [word: string, rank: number][]>();
  for (const [english, partOfSpeech, word, rank] of found) {
    const key = backKey(english, partOfSpeech);
    ranked.set(key, [...(ranked.get(key) ?? []), [word, rank]]);
  }
  // Only words whose main meaning is the English word: "проситься" means "ask" second to "ask for leave"
  return new Map(
    [...ranked]
      .map(([key, words]): [string, string[]] => [
        key,
        unique(words.filter(([, rank]) => rank === 0).map(([word]) => word)),
      ])
      .filter(([, words]) => words.length > 0),
  );
}

// What the record adds to a dictionary from `from` into `to`: the word with its meanings, or nothing for a word with
// no translation into `to` and for inflected forms, which formsOf() takes. English words get the back translations
// of their part of speech.
export function dictionaryWord(
  record: TWiktextractRecord,
  from: string,
  to: string,
  back: TBackTranslations = new Map(),
): TDictionaryWord | null {
  if (record.lang_code !== from || isFormOf(record)) return null;
  const senses =
    from === "en"
      ? translatedSenses(record, to, back.get(backKey(dictionaryKey(record.word, "en"), record.pos)))
      : glossedSenses(record);
  if (senses.length === 0) return null;
  return [record.word, transcription(record), [[record.pos, senses]]];
}

// The inflected forms the record knows, by their keys: those it lists ("went" of "go"), or the words it's itself a
// form of, when it's the entry of a form. `declared` tells the second: a form's own entry is surer than another word's
// table, which may list a word of its own ("she" in the table of "herself").
export function formsOf(
  record: TWiktextractRecord,
  language: string,
): [form: string, word: string, declared: boolean][] {
  if (record.lang_code !== language) return [];
  const key = dictionaryKey(record.word, language);
  if (isFormOf(record)) {
    return unique(
      (record.senses ?? []).filter(isCurrent).flatMap((sense) => (sense.form_of ?? []).map((of) => of.word)),
    )
      .map((word) => [key, dictionaryKey(word, language), true] as [string, string, boolean])
      .filter(([form, word]) => form && word && form !== word);
  }
  // Inflections have tags saying which they are ("past", "genitive plural"); untagged forms are spellings and others
  return unique(
    (record.forms ?? [])
      .filter((form) => (form.tags ?? []).length > 0 && !form.tags!.some((tag) => SKIPPED_FORM_TAGS.has(tag)))
      .map((form) => dictionaryKey(form.form, language)),
  )
    .filter((form) => form && form !== key && form !== "-")
    .map((form) => [form, key, false]);
}

// Parts of speech hardly anyone hovers a word for: "I" is the pronoun before it's the letter
const MINOR_POS = new Set(["character", "symbol", "letter", "name", "prefix", "suffix", "infix", "abbrev", "punct"]);
const isMinor = ([partOfSpeech, senses]: TDictionaryEntry) =>
  MINOR_POS.has(partOfSpeech) ||
  senses.some(([, note]) => /letter of the .*alphabet|(script|alphabet) letter|name of the .*letter/i.test(note ?? ""));

// The words of one key put together: their parts of speech in order, the meanings of a part of speech that shows
// up twice (two etymologies) under the first one
export function mergeWords(words: TDictionaryWord[]): TDictionaryWord {
  const ordered = [
    ...words.filter((word) => !word[2].every(isMinor)),
    ...words.filter((word) => word[2].every(isMinor)),
  ];
  const entries: TDictionaryEntry[] = [];
  for (const [, , wordEntries] of ordered) {
    for (const [partOfSpeech, senses] of wordEntries) {
      const entry = entries.find(([pos]) => pos === partOfSpeech) ?? entries[entries.push([partOfSpeech, []]) - 1];
      // Back translations come with every record of the part of speech
      for (const sense of senses) {
        if (!entry[1].some((known) => JSON.stringify(known) === JSON.stringify(sense))) entry[1].push(sense);
      }
    }
  }
  const [word, transcription] = ordered.find(([, ipa]) => ipa) ?? ordered[0];
  const major = [...entries.filter((entry) => !isMinor(entry)), ...entries.filter(isMinor)];
  return [word, transcription, major.map(([pos, senses]) => [pos, senses.slice(0, MAX_SENSES)])];
}

// The dictionary with the forms of its words only: a form of a word it doesn't have finds nothing anyway. A word with
// meanings of its own keeps only the forms its own entry declares ("saw" of "see"), see formsOf().
export function buildDictionary(
  meta: Pick<TDictionary, "from" | "to" | "source" | "license">,
  words: Map<string, TDictionaryWord[]>,
  forms: Map<string, Set<string>>,
  declared: Map<string, Set<string>> = new Map(),
): TDictionary {
  const merged: TDictionary["words"] = {};
  for (const [key, list] of words) merged[key] = mergeWords(list);
  const known: TDictionary["forms"] = {};
  for (const [form, of] of forms) {
    const candidates = form in merged ? (declared.get(form) ?? new Set<string>()) : of;
    const lemmas = [...candidates].filter((word) => word in merged && word !== form);
    if (lemmas.length > 0 && of.size <= MAX_LEMMAS) known[form] = lemmas;
  }
  return { ...meta, words: merged, forms: known };
}
