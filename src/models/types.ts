export type TMoveDirection = "next" | "prev" | "current";

export type TSubItem = {
  text: string;
  cleanedText: string;
  tag: "span" | "b" | "i" | "u";
  type: "word" | "phrasal-verb" | "punctuation";
};

export type TSub = {
  id: number;
  start: number;
  end: number;
  text: string;
  cleanedText: string;
  items: TSubItem[];
};

export type TTranslateAlternativeItem = [
  string,
  null,
  string[],
  number,
  boolean,
];

export function unknown_assertIsTTranslateAlternativeItem(v: unknown): asserts v is TTranslateAlternativeItem {
  if (!Array.isArray(v)) {
    throw new Error("TTranslateAlternativeItem must be an array");
  }
  if (v.length !== 5) {
    throw new Error(`TTranslateAlternativeItem must have exactly 5 elements, got ${v.length}`);
  }
  if (typeof v[0] !== "string") {
    throw new Error("TTranslateAlternativeItem[0] must be a string");
  }
  if (v[1] !== null) {
    throw new Error("TTranslateAlternativeItem[1] must be null");
  }
  if (!Array.isArray(v[2]) || !v[2].every((item) => typeof item === "string")) {
    throw new Error("TTranslateAlternativeItem[2] must be an array of strings");
  }
  if (typeof v[3] !== "number") {
    throw new Error("TTranslateAlternativeItem[3] must be a number");
  }
  if (typeof v[4] !== "boolean") {
    throw new Error("TTranslateAlternativeItem[4] must be a boolean");
  }
}

export type TTranslateAlternative = [
  string,
  TTranslateAlternativeItem[],
  string,
  string,
  number
];

export function unknown_assertIsTTranslateAlternative(v: unknown): asserts v is TTranslateAlternative {
  if (!Array.isArray(v)) {
    throw new Error("TTranslateAlternative must be an array");
  }
  if (v.length !== 5) {
    throw new Error(`TTranslateAlternative must have exactly 5 elements, got ${v.length}`);
  }
  if (typeof v[0] !== "string") {
    throw new Error("TTranslateAlternative[0] must be a string");
  }

  // Validate the nested array of TTranslateAlternativeItem
  if (!Array.isArray(v[1])) {
    throw new Error("TTranslateAlternative[1] must be an array");
  }
  for (let i = 0; i < v[1].length; i++) {
    try {
      unknown_assertIsTTranslateAlternativeItem(v[1][i]);
    } catch (e) {
      // Re-throw with index information for easier debugging
      throw new Error(`Invalid TTranslateAlternativeItem at index ${i}: ${(e as Error).message}`);
    }
  }

  if (typeof v[2] !== "string") {
    throw new Error("TTranslateAlternative[2] must be a string");
  }
  if (typeof v[3] !== "string") {
    throw new Error("TTranslateAlternative[3] must be a string");
  }
  if (typeof v[4] !== "number") {
    throw new Error("TTranslateAlternative[4] must be a number");
  }
}

export type TPartOfSpeach =
  | "noun"
  | "pronoun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "abbreviation"
  | "phrase"
  | "suffix"
  | "combining form"
  | "exclamation"
  | "plural"
  | "prefix"
  | "article"
  | "numeral"
  | "auxiliary verb"
  | "particle"
  | "unknown";

export type TWordTranslationItem = {
  word: string;
  partOfSpeech: TPartOfSpeach;
  synonyms: string[];
  popularity: number;
};

export type TWordTranslation = {
  source: string;
  detectedSourceLanguage: string;
  mainTranslation: string;
  targetLanguage: string;
  translations: TWordTranslationItem[];
  transcription: string;
};

export type TGoogleTranslation = unknown;

export type TLearningService = "anki" | "lingualeo" | "puzzle-english" | "disabled";

export type TTranslationService = "google" | "deepl" | "bing" | "yandex" | "chatgpt";

export type TPhrasalVerb = {
  key: string;
  text: string;
  indexes: number[];
  translations: string[];
};
