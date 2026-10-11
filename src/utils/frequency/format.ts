// The word frequency lists in public/frequency/<language>.json, built by scripts/frequency/build.ts: the dictionary
// forms of the words said in subtitles, most said first, and the forms that lead to them. The known words
// (src/models/words) are kept by dictionary form and the user's level is a rank in this list.
// No imports: the build runs it in Node.

export type TFrequency = {
  language: string;
  source: string;
  license: string;
  // Dictionary forms by how often they're said with all their forms: the first is rank 1
  lemmas: string[];
  // The words of the subtitles as they're said, normalized (src/utils/expressions/normalize.ts), and the index of
  // their dictionary form in `lemmas`: "went" → the index of "go"; dictionary forms lead to themselves
  forms: Record<string, number>;
};

// Languages with a list: the ones whose Wiktionary dictionary gives the forms of their words (DICTIONARY_SOURCES and
// English)
export const FREQUENCY_LANGUAGES = ["en", "ru", "es", "de", "fr", "it", "pt", "nl"];

export const frequencyPath = (language: string) => `frequency/${language}.json`;
