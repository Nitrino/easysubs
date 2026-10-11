import type { TSavedWord, TSub, TWordStatus } from "@src/models/types";

// The words the user knows or learns (src/models/words): how a subtitle word is matched to them, the episode's score,
// the review schedule of the saved words and their CSV file.

// The language words are kept under: "en" for "en-US"
export const wordsLanguage = (language: string) => language.split("-")[0].toLowerCase();

// A subtitle word as it's kept: lowercased, without the quotes and punctuation around it ("“Don't," → "don't");
// null for what isn't a word (numbers, dashes, notes like ♪)
export function normalizeWord(text: string): string | null {
  const word = text
    .toLowerCase()
    .normalize("NFC")
    .replace(/’/g, "'")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  return /\p{L}/u.test(word) ? word : null;
}

export const wordKey = (language: string, word: string) => `${wordsLanguage(language)}:${word}`;

export function wordStatus(words: Record<string, TSavedWord>, language: string, text: string): TWordStatus | null {
  const word = normalizeWord(text);
  if (!word) return null;
  return words[wordKey(language, word)]?.status ?? "new";
}

export type TEpisodeScore = {
  // Every word of the subtitles, as many times as it's said
  total: number;
  known: number;
  learning: number;
  // Different words that are neither known nor learned, by how often they're said
  newWords: string[];
  // Known words among all said, rounded down: 87 for 87.9%
  percent: number;
};

export function episodeScore(subs: TSub[], words: Record<string, TSavedWord>, language: string): TEpisodeScore {
  let total = 0;
  let known = 0;
  let learning = 0;
  const unknown = new Map<string, number>();
  for (const sub of subs) {
    for (const item of sub.items) {
      const word = normalizeWord(item.text);
      if (!word) continue;
      total += 1;
      const status = words[wordKey(language, word)]?.status;
      if (status === "known") known += 1;
      else if (status === "learning") learning += 1;
      else unknown.set(word, (unknown.get(word) ?? 0) + 1);
    }
  }
  const newWords = [...unknown].sort((a, b) => b[1] - a[1]).map(([word]) => word);
  return { total, known, learning, newWords, percent: total ? Math.floor((known / total) * 100) : 0 };
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

export const CSV_COLUMNS = ["word", "translation", "status", "language", "context", "source", "url", "added"] as const;

const csvCell = (value: string) => (/[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

// Anki, spreadsheets and other apps read it: a header, a row per word, quoted where needed
export function wordsToCsv(words: TSavedWord[]): string {
  const rows = words.map((word) =>
    [
      word.word,
      word.translation ?? "",
      word.status,
      word.language,
      word.context?.line ?? "",
      word.context?.source ?? "",
      word.context?.url ?? "",
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
      const word = normalizeWord(at(cells, "word") ?? "");
      if (!word) continue;
      const status = at(cells, "status") === "known" ? "known" : "learning";
      const line = at(cells, "context");
      const added = Date.parse(at(cells, "added") ?? "");
      words.push({
        word,
        language: wordsLanguage(at(cells, "language") ?? language),
        status,
        ...(at(cells, "translation") && { translation: at(cells, "translation") }),
        ...(line && { context: { line, source: at(cells, "source"), url: at(cells, "url") } }),
        added: Number.isFinite(added) ? added : now,
      });
    }
    return words;
  }

  for (const cells of rows) {
    const word = normalizeWord(cells[0] ?? "");
    if (word) words.push({ word, language: wordsLanguage(language), status: "known", added: now });
  }
  return words;
}
