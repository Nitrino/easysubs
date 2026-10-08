import type { TSub, TTimedWord, TWordTime } from "@src/models/types";
import { DEFAULT_MS_PER_UNIT } from "./estimate";
import { normalizeWord, wordWeight } from "./words";

// Timed words from another source of the same speech (the video's auto-generated captions, Yandex's or Whisper's
// recognition) given to the cues: each cue's words are matched with the timed words around its time, in order (the
// longest common subsequence), and the words left unmatched get the time between their matched neighbours.

// How far around a cue its words are looked for: lines and recognized speech drift apart by a second or so
const WINDOW_MS = 1500;
// A cue takes the times only when this share of its words is found
const MIN_MATCHED_SHARE = 0.34;

// One letter added, dropped or changed, for words long enough that it doesn't turn them into other words
function nearlyEqual(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  let j = 0;
  while (j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j++;
  return Math.max(a.length, b.length) - i - j <= 1;
}

const sameWord = (a: string, b: string) => a === b || (a.length >= 4 && b.length >= 4 && nearlyEqual(a, b));

// The first word that starts at or after `time`
function firstFrom(words: TTimedWord[], time: number): number {
  let low = 0;
  let high = words.length;
  while (low < high) {
    const middle = (low + high) >> 1;
    if (words[middle].start < time) low = middle + 1;
    else high = middle;
  }
  return low;
}

// Times for the unmatched words of a cue: the gap between matched neighbours split by how long each word takes, the
// words before the first match and after the last at the speaking rate, inside the cue
export function fillWordTimes(
  sub: TSub,
  anchors: (TWordTime | null)[],
  language = "",
  msPerUnit = DEFAULT_MS_PER_UNIT,
): (TWordTime | null)[] {
  const weights = sub.items.map((item) => wordWeight(item.text, language));
  const times = anchors.map((time) => (time ? { ...time } : null));
  const matched = times.map((time, index) => (time ? index : -1)).filter((index) => index >= 0);
  if (matched.length === 0) return times;

  const spread = (from: number, to: number, start: number, end: number) => {
    const total = weights.slice(from, to).reduce((a, b) => a + b, 0);
    if (total === 0) return;
    let time = start;
    for (let index = from; index < to; index++) {
      if (weights[index] === 0) continue;
      const length = (Math.max(0, end - start) * weights[index]) / total;
      times[index] = { start: time, end: time + length };
      time += length;
    }
  };
  const unitsBetween = (from: number, to: number) => weights.slice(from, to).reduce((a, b) => a + b, 0);

  const first = matched[0];
  const firstStart = times[first].start;
  spread(0, first, Math.max(sub.start, firstStart - unitsBetween(0, first) * msPerUnit), firstStart);

  for (let k = 0; k < matched.length - 1; k++) {
    const [a, b] = [matched[k], matched[k + 1]];
    if (b > a + 1) spread(a + 1, b, times[a].end, Math.max(times[a].end, times[b].start));
  }

  const last = matched.at(-1);
  const lastEnd = times[last].end;
  const tail = unitsBetween(last + 1, weights.length) * msPerUnit;
  spread(last + 1, weights.length, lastEnd, lastEnd + Math.max(Math.min(tail, sub.end - lastEnd), tail / 2));

  return times;
}

// The cues' word times from timed words of the same speech, by cue id. Cues with too few words found are left out.
export function transferWordTimes(
  subs: TSub[],
  words: TTimedWord[],
  language = "",
  msPerUnit = DEFAULT_MS_PER_UNIT,
): Record<number, (TWordTime | null)[]> {
  const timed = words
    .map((word) => ({ ...word, normalized: normalizeWord(word.text) }))
    .filter((word) => word.normalized)
    .sort((a, b) => a.start - b.start);
  const result: Record<number, (TWordTime | null)[]> = {};
  // Words matched to a cue aren't matched again to the next one
  let next = 0;

  for (const sub of subs) {
    const items = sub.items.map((item) => normalizeWord(item.text));
    const spoken = items.filter(Boolean).length;
    if (spoken === 0) continue;

    const from = Math.max(firstFrom(timed, sub.start - WINDOW_MS), next);
    const to = firstFrom(timed, sub.end + WINDOW_MS);
    const n = items.length;
    const m = to - from;
    if (m <= 0) continue;

    // lcs[i * (m + 1) + j]: the longest common subsequence of items[i..] and timed[from + j..]
    const lcs = new Int32Array((n + 1) * (m + 1));
    const at = (i: number, j: number) => i * (m + 1) + j;
    const matches = (i: number, j: number) => Boolean(items[i]) && sameWord(items[i], timed[from + j].normalized);
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        lcs[at(i, j)] = matches(i, j) ? lcs[at(i + 1, j + 1)] + 1 : Math.max(lcs[at(i + 1, j)], lcs[at(i, j + 1)]);
      }
    }

    const anchors: (TWordTime | null)[] = Array(n).fill(null);
    let count = 0;
    let lastMatched = -1;
    for (let i = 0, j = 0; i < n && j < m;) {
      if (matches(i, j) && lcs[at(i, j)] === lcs[at(i + 1, j + 1)] + 1) {
        anchors[i] = { start: timed[from + j].start, end: timed[from + j].end };
        lastMatched = from + j;
        count++;
        i++;
        j++;
      } else if (lcs[at(i + 1, j)] >= lcs[at(i, j + 1)]) {
        i++;
      } else {
        j++;
      }
    }

    if (count === 0 || (count / spoken < MIN_MATCHED_SHARE && !(spoken <= 2 && count >= 1))) continue;
    next = lastMatched + 1;
    result[sub.id] = fillWordTimes(sub, anchors, language, msPerUnit);
  }

  return result;
}
