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

export type TWordTranslation = {
  source: string;
  target_language: string;
  translations: string[];
  synonyms: string[];
};

export type TGoogleTranslation = unknown;

export type TLearningService = "lingualeo" | "puzzle-english" | "disabled";

export type Captions = subTitleType[];

export type TPhrasalVerb = {
  key: string;
  text: string;
  indexes: number[];
  translations: string[];
};
