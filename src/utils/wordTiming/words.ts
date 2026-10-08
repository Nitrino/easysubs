// Comparing and weighing the words of subtitles, for the times of spoken words (src/models/spokenWord)

// A word as two sources of the same speech would both write it: "Don't," and "don’t" are "don't"
export const normalizeWord = (text: string): string =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[^\p{L}\p{N}']+/gu, "")
    .replace(/^'+|'+$/g, "");

const LATIN_VOWEL_GROUPS = /[aeiouyàáâãäåæèéêëìíîïòóôõöøùúûüýÿœāēīōūăĕĭŏŭąęįų]+/gu;
// Every Cyrillic vowel letter is a syllable of its own
const CYRILLIC_VOWELS = /[аеёиоуыэюяіїє]/gu;
const SYLLABIC_SCRIPTS = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}]/u;

// About how many syllables a word has: its vowel groups, a character for scripts written by syllable, a digit for
// numbers. English drops a silent final "e" ("make"), other languages say it ("grande").
export function syllables(word: string, language = ""): number {
  const letters = word.replace(/[^\p{L}]/gu, "");
  if (!letters) return /\p{N}/u.test(word) ? word.replace(/\D/g, "").length : 0;
  if (SYLLABIC_SCRIPTS.test(letters)) return letters.length;
  const lower = letters.toLowerCase();
  let groups = (lower.match(LATIN_VOWEL_GROUPS)?.length ?? 0) + (lower.match(CYRILLIC_VOWELS)?.length ?? 0);
  if (language.startsWith("en") && groups > 1 && /[^aeiouyl]e$/.test(lower)) groups--;
  return Math.max(1, groups);
}

// How long a word takes to say, in syllable units: a short word still takes some time
export const wordWeight = (word: string, language = ""): number => {
  const count = syllables(word, language);
  return count === 0 ? 0 : count + 0.3;
};

// The pause a speaker makes after a word, in units of a syllable: at commas and dashes, longer at a full stop
export const pauseAfter = (word: string): number => {
  if (/[.!?…]["'»”)]*$/.test(word)) return 2;
  if (/[,;:—–]["'»”)]*$/.test(word)) return 1.2;
  return 0;
};
