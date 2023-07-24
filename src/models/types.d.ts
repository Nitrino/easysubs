export type TMoveDirection = "next" | "prev";

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
  source_lang: string;
  target_lang: string;
  quick_translations: string[];
  full_translations: FullTranslation[];
  examples: string[];
};
export type TGoogleTranslation = unknown;
