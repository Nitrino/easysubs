import type { Captions, TTimedWord } from "@src/models/types";

// Subtitle lines from Whisper's words (src/models/aiSubs): a line ends at a pause, after a sentence, or when it gets
// too long to read. The words stay on the line with their times, relative to its start, so the spoken-word highlight
// takes them like a file's own word times.

// Two lines of about 42 characters, the usual subtitle limit
const MAX_CHARS = 84;
const MAX_MS = 6000;
// A pause this long starts a new line
const PAUSE_MS = 700;
// A sentence ends the line once it has this much
const SENTENCE_CHARS = 16;
// Lines stay up a little after their last word, to be read, until the next one starts
const LINGER_MS = 600;
const MIN_MS = 1000;
// Whisper repeats itself on music and silence: a word more often than this in a row is a loop, not speech
const MAX_REPEATS = 3;

// Written without spaces between words
const NO_SPACES = new Set(["zh", "ja", "th", "lo", "my", "km", "bo"]);

const SENTENCE_END = /[.!?…。！？]["'»”)]*$/;

export function wordsToCues(words: TTimedWord[], language: string): Captions {
  const joiner = NO_SPACES.has(language.split("-")[0]) ? "" : " ";
  const lines: TTimedWord[][] = [];
  let line: TTimedWord[] = [];
  const length = (parts: TTimedWord[]) => parts.map((word) => word.text).join(joiner).length;

  for (const word of withoutLoops(clean(words))) {
    const last = line.at(-1);
    if (
      last &&
      (word.start - last.end >= PAUSE_MS ||
        word.end - line[0].start > MAX_MS ||
        length([...line, word]) > MAX_CHARS ||
        (SENTENCE_END.test(last.text) && length(line) >= SENTENCE_CHARS))
    ) {
      lines.push(line);
      line = [];
    }
    line.push(word);
  }
  if (line.length) lines.push(line);

  return lines.map((parts, index) => {
    const start = parts[0].start;
    const next = lines[index + 1]?.[0].start ?? Infinity;
    const end = Math.min(Math.max(parts.at(-1).end + LINGER_MS, start + MIN_MS), next);
    return {
      start: Math.round(start),
      end: Math.round(Math.max(end, parts.at(-1).end)),
      text: parts.map((word) => word.text).join(joiner),
      words: parts.map((word) => ({ text: word.text, start: word.start - start, end: word.end - start })),
    };
  });
}

// Plain text in time order: the lines go through HTML like a file's
function clean(words: TTimedWord[]): TTimedWord[] {
  return words
    .map((word) => ({ ...word, text: word.text.replace(/<[^>]*>|[<>]/g, "").trim() }))
    .filter((word) => word.text && Number.isFinite(word.start))
    .sort((a, b) => a.start - b.start);
}

function withoutLoops(words: TTimedWord[]): TTimedWord[] {
  const kept: TTimedWord[] = [];
  let repeats = 0;
  for (const word of words) {
    const same = kept.at(-1)?.text.toLowerCase() === word.text.toLowerCase();
    repeats = same ? repeats + 1 : 0;
    if (repeats < MAX_REPEATS) kept.push(word);
  }
  return kept;
}
