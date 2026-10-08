import type { TTimedWord, TWordTime } from "@src/models/types";

// Word times that come with the subtitles: YouTube's auto-generated captions time every word (`segs` of json3), and
// WebVTT can put a timestamp before a word ("<00:00:01.500><c> word</c>").

const INLINE_TIMESTAMP = /<((?:\d+:)?\d+:\d+\.\d+)>/g;

const timestampMs = (value: string): number => {
  const parts = value.split(":").map(Number);
  const [hours, minutes, seconds] = parts.length === 3 ? parts : [0, ...parts];
  return Math.round(((hours * 60 + minutes) * 60 + seconds) * 1000);
};

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };
const plainText = (markup: string) =>
  markup.replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|apos|nbsp|#39);/g, (_, name: string) => ENTITIES[name]);

// The words of a cue with WebVTT timestamps, relative to the cue's start; null without timestamps. A word lasts until
// the next one starts, the last one until the cue ends.
export function inlineTimedWords(text: string, cueStart: number, cueEnd: number): TTimedWord[] | null {
  if (!INLINE_TIMESTAMP.test(text)) return null;
  INLINE_TIMESTAMP.lastIndex = 0;

  const pieces: { text: string; start: number }[] = [];
  let last = 0;
  let start = cueStart;
  for (const match of text.matchAll(INLINE_TIMESTAMP)) {
    pieces.push({ text: plainText(text.slice(last, match.index)), start });
    start = timestampMs(match[1]);
    last = match.index + match[0].length;
  }
  pieces.push({ text: plainText(text.slice(last)), start });

  // Timestamps of a file whose cues were moved don't belong to them any more
  const inCue = pieces.every((piece) => piece.start >= cueStart - 2000 && piece.start <= cueEnd + 2000);
  if (!inCue) return null;

  return pieces
    .map((piece, index) => ({
      text: piece.text,
      start: piece.start - cueStart,
      end: (pieces[index + 1]?.start ?? cueEnd) - cueStart,
    }))
    .filter((word) => word.text.trim());
}

const squeeze = (text: string) => text.replace(/\s+/g, "").toLowerCase();
const lettersOnly = (text: string) => text.replace(/[^\p{L}\p{N}]+/gu, "").toLowerCase();

// The times of the cue's items (space-separated words) from timed pieces of the same text, cut differently: a piece
// can hold several items or part of one. Times inside a piece go by characters. Null when the texts differ.
export function itemTimes(items: string[], pieces: TTimedWord[]): (TWordTime | null)[] | null {
  for (const normalize of [squeeze, lettersOnly]) {
    const itemTexts = items.map(normalize);
    const pieceTexts = pieces.map((piece) => normalize(piece.text));
    if (itemTexts.join("") !== pieceTexts.join("") || !itemTexts.join("")) continue;

    // The piece and the time of every character
    const charTimes: number[] = [];
    pieces.forEach((piece, index) => {
      const length = pieceTexts[index].length;
      for (let char = 0; char < length; char++) {
        charTimes.push(piece.start + ((piece.end - piece.start) * char) / length);
      }
    });
    const charEnd = (position: number) => {
      // The end of the character at `position`: where the next one starts, or its piece's end
      let total = 0;
      for (let index = 0; index < pieces.length; index++) {
        total += pieceTexts[index].length;
        if (position < total) {
          return position + 1 < total ? charTimes[position + 1] : pieces[index].end;
        }
      }
      return pieces.at(-1).end;
    };

    let position = 0;
    return itemTexts.map((text) => {
      if (!text) return null;
      const time = { start: charTimes[position], end: charEnd(position + text.length - 1) };
      position += text.length;
      return time;
    });
  }
  return null;
}
