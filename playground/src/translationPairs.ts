// Offline translations for the mock background, written for the playground's subtitles (not machine translated
// at runtime). One file per pair in playground/fixtures/translations; `pnpm playground:translations` lists what's
// missing after subtitles change.

const LANGUAGES = ["en", "ru", "es", "de"] as const;

// [subtitles language, translation language]: every direction between the languages of the playground's subtitles
export const TRANSLATION_PAIRS = LANGUAGES.flatMap((source) =>
  LANGUAGES.filter((target) => target !== source).map((target) => [source, target] as const),
);

// A word: its main translation, then other translations grouped by part of speech, e.g.
// "snail": { "main": "улитка", "noun": ["улитка", "слизень"] }
export type WordTranslation = { main: string } & Record<string, string | string[]>;

export type TranslationFixture = {
  // Where the subtitle lines come from, for the movies' attribution
  credit?: string;
  lines: Record<string, string>;
  words: Record<string, WordTranslation>;
};
