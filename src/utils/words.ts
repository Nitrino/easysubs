import type { TExpressionMatch, TSavedWord, TSub, TWordLine, TWordStatus } from "@src/models/types";
import { normalizeWord as normalizeInLanguage } from "./expressions/normalize";
import type { TWordRank } from "./frequency/lookup";

// The words the user knows or learns (src/models/words): how a subtitle word is matched to them by its dictionary
// form and the user's level, the episode's score, the review schedule of the saved words and their CSV file.

// The language words are kept under: "en" for "en-US"
export const wordsLanguage = (language: string) => language.split("-")[0].toLowerCase();

// A subtitle word as it's kept and looked up: normalized like the expression lists and the frequency lists ("“Don’t,"
// → "don't"); null for what isn't a word (numbers, dashes, notes like ♪)
export function normalizeWord(text: string, language = ""): string | null {
  const word = normalizeInLanguage(text.normalize("NFC"), wordsLanguage(language));
  return /\p{L}/u.test(word) ? word : null;
}

export const wordKey = (language: string, word: string) => `${wordsLanguage(language)}:${word}`;

// Levels to pick instead of the check: the known words' rank for each, roughly the vocabulary of the level
export const CEFR_LEVELS: { level: string; rank: number }[] = [
  { level: "A1", rank: 500 },
  { level: "A2", rank: 1000 },
  { level: "B1", rank: 2000 },
  { level: "B2", rank: 4000 },
  { level: "C1", rank: 8000 },
  { level: "C2", rank: 16000 },
];

// How far past the user's level new words are worth learning now; rarer ones aren't colored, like Language Reactor's
// grey words
export const newWordsUpTo = (level: number) => level + Math.max(3000, level);

// What a subtitle word is to the user. Known words are the ones they marked known and, unless they marked them
// otherwise, the ones within their level; new ones are the next most said; rare ones are rarer, or not in the
// frequency list at all (names, made-up words)
export type TWordView = {
  word: string;
  lemma: string;
  rank: number | null;
  status: TWordStatus | "rare";
  // Marked by the user, not known by their level
  marked: boolean;
};

export type TWordsState = {
  words: Record<string, TSavedWord>;
  language: string;
  // The track's words and their dictionary forms and ranks; null for languages without a frequency list, where every
  // word not marked is new
  ranks: Record<string, TWordRank> | null;
  // The rank the user knows the words up to; null until they've set their level
  level: number | null;
};

export function viewWord(state: TWordsState, text: string): TWordView | null {
  const word = normalizeWord(text, state.language);
  if (!word) return null;
  const found = state.ranks?.[word];
  const lemma = found?.[0] ?? word;
  const rank = found?.[1] ?? null;
  const saved = state.words[wordKey(state.language, lemma)] ?? state.words[wordKey(state.language, word)];
  if (saved) return { word, lemma, rank, status: saved.status, marked: true };
  // Phrasal verbs, idioms and picked words aren't in the frequency lists: new until they're marked
  if (!state.ranks || /\s/.test(word)) return { word, lemma, rank, status: "new", marked: false };
  const level = state.level ?? 0;
  if (rank !== null && rank <= level) return { word, lemma, rank, status: "known", marked: false };
  if (rank !== null && rank <= newWordsUpTo(level)) return { word, lemma, rank, status: "new", marked: false };
  return { word, lemma, rank, status: "rare", marked: false };
}

// The words of the cue's expressions the user learns, by their indexes, colored like learning words
export function learningExpressionWords(state: TWordsState, matches: TExpressionMatch[]): Set<number> {
  const indexes = new Set<number>();
  for (const match of matches) {
    const expression = normalizeWord(match.expression, state.language);
    if (expression && state.words[wordKey(state.language, expression)]?.status === "learning") {
      for (const index of match.indexes) indexes.add(index);
    }
  }
  return indexes;
}

// "B1 · Top 2k" for a word among the 2000 most said: the first level whose words cover it, by CEFR_LEVELS
export function rankBadge(rank: number | null): string | null {
  if (rank === null) return null;
  const level = CEFR_LEVELS.find((cefr) => rank <= cefr.rank);
  if (!level) return "Rare";
  const top = level.rank < 1000 ? `${level.rank}` : `${level.rank / 1000}k`;
  return `${level.level} · Top ${top}`;
}

export type TEpisodeScore = {
  // Every word of the subtitles in the frequency list, as many times as it's said; names and words the list lacks
  // aren't counted
  total: number;
  known: number;
  learning: number;
  // Different words worth learning now, most said first
  newWords: string[];
  // The dictionary forms of every word not known, for "New ones are known"
  unknown: string[];
  // Known words among all said, rounded down: 87 for 87.9%
  percent: number;
};

export function episodeScore(subs: TSub[], state: TWordsState): TEpisodeScore {
  let total = 0;
  let known = 0;
  let learning = 0;
  const counts = new Map<string, number>();
  const unknown = new Set<string>();
  for (const sub of subs) {
    for (const item of sub.items) {
      const view = viewWord(state, item.text);
      if (!view) continue;
      if (view.status !== "known") unknown.add(view.lemma);
      // Names and words the list lacks don't count, unless the user marked them
      if (state.ranks && view.rank === null && !view.marked) continue;
      total += 1;
      if (view.status === "known") known += 1;
      else if (view.status === "learning") learning += 1;
      else if (view.status === "new") counts.set(view.lemma, (counts.get(view.lemma) ?? 0) + 1);
    }
  }
  const newWords = [...counts].sort((a, b) => b[1] - a[1]).map(([word]) => word);
  return {
    total,
    known,
    learning,
    newWords,
    unknown: [...unknown],
    percent: total ? Math.floor((known / total) * 100) : 0,
  };
}

// ---- The level check ----

// The vocabulary the answers of the check tell: each band's share of words known times the band's size, the bands
// LEVEL_BANDS of src/utils/frequency/lookup.ts. `answers` are the checked words' ranks and whether they're known.
export function estimateLevel(answers: { rank: number; known: boolean }[], bands: number[]): number {
  let estimate = 0;
  let start = 0;
  for (const end of bands) {
    const inBand = answers.filter(({ rank }) => rank > start && rank <= end);
    if (inBand.length) estimate += (inBand.filter(({ known }) => known).length / inBand.length) * (end - start);
    start = end;
  }
  return Math.round(estimate / 100) * 100;
}

// ---- Saved lines ----

// A word keeps the lines it was saved from, the latest first
export const MAX_LINES = 3;

export function withLine(lines: TWordLine[] | undefined, line: TWordLine | undefined): TWordLine[] | undefined {
  if (!line) return lines;
  const others = (lines ?? []).filter((saved) => saved.line !== line.line);
  return [line, ...others].slice(0, MAX_LINES);
}

// ---- Review ----

const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;
// Days until the next review after each right answer; a word right after the last one is known
export const REVIEW_INTERVALS = [1, 3, 7, 16, 35];
// A wrong answer shows the word again in this session, after the others
const AGAIN_DELAY = MINUTE;

export type TReviewGrade = "again" | "good" | "known";

// Learning words are due once their time comes; a word saved and never reviewed is due at once
export const isDue = (word: TSavedWord, now: number) => word.status === "learning" && (word.review?.due ?? 0) <= now;

export function reviewWord(word: TSavedWord, grade: TReviewGrade, now: number): TSavedWord {
  if (grade === "known") return { ...word, status: "known", review: undefined };
  if (grade === "again") return { ...word, review: { step: 0, due: now + AGAIN_DELAY } };
  const step = word.review ? word.review.step + 1 : 0;
  if (step >= REVIEW_INTERVALS.length) return { ...word, status: "known", review: undefined };
  return { ...word, review: { step, due: now + REVIEW_INTERVALS[step] * DAY } };
}

// ---- CSV ----

export const CSV_COLUMNS = [
  "word",
  "translation",
  "part of speech",
  "status",
  "language",
  "context",
  "source",
  "url",
  "added",
] as const;

const csvCell = (value: string) => (/[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

// Anki, spreadsheets and other apps read it: a header, a row per word, quoted where needed
export function wordsToCsv(words: TSavedWord[]): string {
  const rows = words.map((word) =>
    [
      word.word,
      word.translation ?? "",
      word.partOfSpeech ?? "",
      word.status,
      word.language,
      word.lines?.[0]?.line ?? "",
      word.lines?.[0]?.source ?? "",
      word.lines?.[0]?.url ?? "",
      new Date(word.added).toISOString(),
    ].map(csvCell),
  );
  return [CSV_COLUMNS.join(","), ...rows.map((row) => row.join(","))].join("\r\n") + "\r\n";
}

// RFC 4180: quoted cells may hold commas, quotes and line breaks
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += char;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((cells) => cells.some((value) => value.trim()));
}

// A file of words to add: the CSV this exports, or any list with a word per line (a known-words list from another
// app), whose words become known in `language`
export function parseWordsFile(text: string, language: string, now: number): TSavedWord[] {
  const rows = parseCsv(text.replace(/^\uFEFF/, ""));
  const header = rows[0]?.map((cell) => cell.trim().toLowerCase()) ?? [];
  const column = (name: (typeof CSV_COLUMNS)[number]) => header.indexOf(name);
  const words: TSavedWord[] = [];

  if (column("word") !== -1) {
    const at = (cells: string[], name: (typeof CSV_COLUMNS)[number]) => cells[column(name)]?.trim() || undefined;
    for (const cells of rows.slice(1)) {
      const wordLanguage = wordsLanguage(at(cells, "language") ?? language);
      const word = normalizeWord(at(cells, "word") ?? "", wordLanguage);
      if (!word) continue;
      const status = at(cells, "status") === "known" ? "known" : "learning";
      const line = at(cells, "context");
      const added = Date.parse(at(cells, "added") ?? "");
      words.push({
        word,
        language: wordLanguage,
        status,
        ...(at(cells, "translation") && { translation: at(cells, "translation") }),
        ...(at(cells, "part of speech") && { partOfSpeech: at(cells, "part of speech") }),
        ...(line && { lines: [{ line, source: at(cells, "source"), url: at(cells, "url") }] }),
        added: Number.isFinite(added) ? added : now,
      });
    }
    return words;
  }

  for (const cells of rows) {
    const word = normalizeWord(cells[0] ?? "", language);
    if (word) words.push({ word, language: wordsLanguage(language), status: "known", added: now });
  }
  return words;
}
