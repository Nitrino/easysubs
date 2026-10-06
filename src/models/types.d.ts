import type { subTitleType } from "subtitle";

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

type FullTranslationItemDefinition = {
  meaning: string;
  example: string;
  synonyms: string[];
};

type FullTranslationItem = {
  word: string;
  translations: string[];
  popularity: number;
  definitions: FullTranslationItemDefinition[];
};

type FullTranslation = {
  part_of_speech: string;
  items: FullTranslationItem[];
};

export type TTranslateAlternativeItem = [string, null, string[], number, boolean];
export type TTranslateAlternative = [string, TTranslateAlternativeItem[], string, string, number];
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
  | "prefix"
  | "article"
  | "numeral"
  | "auxiliary verb"
  | "particle"
  | "unknown";

return `unknown number ${val}`;

export type TWordTranslationItem = {
  word: string;
  partOfSpeech: TPartOfSpeach;
  synonyms: string[];
  popularity: number;
};

export type TWordTranslation = {
  source: string;
  mainTranslation: string;
  targetLanguage: string;
  translations: TWordTranslationItem[];
  transcription: string;
};

export type TGoogleTranslation = unknown;

export type TLearningService = "anki" | "lingualeo" | "puzzle-english" | "disabled";

export type TTranslationService = "google" | "deepl" | "bing" | "yandex" | "chatgpt";

export type TTtsService = "google" | "youdao" | "wiktionary" | "chatgpt" | "browser";

export type Captions = subTitleType[];

// A subtitle track a service can load besides the one its player shows, see Service.getSubsTracks()
export type TSubsTrackKind = "subtitles" | "cc" | "forced" | "machine";
export type TSubsTrack = {
  // What the service's getSubs() takes: "en[cc]" on Netflix, a track name on KinoPub
  label: string;
  // A language code: "en", "pt-BR", "zh-Hans"
  language: string;
  kind: TSubsTrackKind;
  // How the player names the track, when it has a name of its own
  name?: string;
};

// The second subtitle line picked in the settings: "off", "same" (the translation language) or a language code; the
// kind of track when one was picked from the video's own tracks, or `translate` when the language was picked to be
// translated even where the video has a track in it
export type TSecondaryChoice = { language: string; kind?: TSubsTrackKind; translate?: boolean };

export type TSecondaryTranslator = "google" | "deepl" | "chatgpt";
export type TSecondaryPosition = "below" | "above" | "top";
export type TSecondaryReveal = "always" | "hover" | "paused";

// Where the second line comes from for the current video
export type TSecondarySource =
  | { type: "off" }
  // The main subtitles are already in the chosen language
  | { type: "same"; language: string }
  | { type: "track"; language: string; track: TSubsTrack }
  // Translated by the extension: ahead of the playhead, or line by line on services that show one line at a time.
  // `instead` when the video has a track in the language, but translation was picked.
  | { type: "translate"; language: string; mode: "window" | "line"; instead?: boolean };

export type TPhrasalVerb = {
  key: string;
  text: string;
  indexes: number[];
  translations: string[];
};
