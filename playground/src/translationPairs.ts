// Offline translations for the mock background, written for the playground's subtitles (not machine translated
// at runtime). One file per pair in playground/fixtures/translations; `pnpm playground:translations` lists what's
// missing after subtitles change.

// [subtitles language, translation language]: each subtitle track into Russian, and Russian into English
export const TRANSLATION_PAIRS = [
  ["en", "ru"],
  ["es", "ru"],
  ["de", "ru"],
  ["ru", "en"],
] as const;

// A word: its main translation, then other translations grouped by part of speech, e.g.
// "snail": { "main": "улитка", "noun": ["улитка", "слизень"] }
export type WordTranslation = { main: string } & Record<string, string | string[]>;

export type TranslationFixture = {
  // Where the subtitle lines come from, for the movies' attribution
  credit?: string;
  lines: Record<string, string>;
  words: Record<string, WordTranslation>;
};
