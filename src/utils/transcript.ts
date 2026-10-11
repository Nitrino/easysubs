import type { TSub } from "@src/models/types";
import { MAX_BATCH_CHARS, MAX_BATCH_LINES } from "./secondaryTranslationWindow";

// One line of the transcript sidebar: the main line and the second language's text, see src/models/transcript
export type TTranscriptLine = {
  id: number;
  start: number;
  end: number;
  text: string;
  // null when the sidebar has no second language; "" when the line has none
  second: string | null;
  // The second language's text is on the way
  pending: boolean;
};

// "1:05" or "1:02:05" for a time in ms
export function formatTranscriptTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = String(total % 60).padStart(2, "0");
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}` : `${minutes}:${seconds}`;
}

// Case and accents don't count: "cafe" finds "Café"
const fold = (text: string) => text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

// Folding keeps the length of most text but not all ("ß" stays, "ﬁ" doesn't decompose), so matches are found on the
// folded text character by character and mapped back to the original
function foldWithMap(text: string): { folded: string; map: number[] } {
  let folded = "";
  const map: number[] = [];
  for (let index = 0; index < text.length;) {
    const char = String.fromCodePoint(text.codePointAt(index)!);
    const part = fold(char);
    for (let i = 0; i < part.length; i++) map.push(index);
    folded += part;
    index += char.length;
  }
  map.push(text.length);
  return { folded, map };
}

// Where the query is in a text, as [start, end) ranges of the original text
export function findMatches(text: string, query: string): [number, number][] {
  const needle = fold(query.trim());
  if (!needle || !text) return [];
  const { folded, map } = foldWithMap(text);
  const ranges: [number, number][] = [];
  for (let at = folded.indexOf(needle); at !== -1; at = folded.indexOf(needle, at + needle.length)) {
    ranges.push([map[at], map[at + needle.length]]);
  }
  return ranges;
}

// The lines with the query in either language; all of them for an empty query
export function searchTranscript(lines: TTranscriptLine[], query: string): TTranscriptLine[] {
  const needle = fold(query.trim());
  if (!needle) return lines;
  return lines.filter(
    (line) => fold(line.text).includes(needle) || (line.second && fold(line.second).includes(needle)),
  );
}

type TBatchParams = {
  subs: TSub[];
  // The ids of the first and last lines shown in the sidebar
  from: number;
  to: number;
  translations: Record<string, string>;
  pendings: Record<string, boolean>;
};

// Lines around those shown, so scrolling a little finds them translated
export const TRANSCRIPT_MARGIN_LINES = 20;

// The texts of the lines shown in the sidebar (and a few around them) that have no translation yet, in one batch
export function transcriptBatch({ subs, from, to, translations, pendings }: TBatchParams): string[] {
  const near = subs.filter((sub) => sub.id >= from - TRANSCRIPT_MARGIN_LINES && sub.id <= to + TRANSCRIPT_MARGIN_LINES);
  // The lines shown first, then those after them, then those before
  const shown = (sub: TSub) => (sub.id < from ? 2 : sub.id > to ? 1 : 0);
  const ordered = [...near].sort((a, b) => shown(a) - shown(b));

  const texts: string[] = [];
  let chars = 0;
  for (const sub of ordered) {
    const text = sub.cleanedText;
    if (text.trim() === "" || text in translations || pendings[text] || texts.includes(text)) continue;
    if (texts.length === MAX_BATCH_LINES || (texts.length > 0 && chars + text.length > MAX_BATCH_CHARS)) break;
    texts.push(text);
    chars += text.length;
  }
  return texts;
}
