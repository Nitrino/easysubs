import type { TSub, TWordTime } from "@src/models/types";
import { DEFAULT_MS_PER_UNIT, LEAD_IN_MS, estimateWordTimes } from "./estimate";
import { wordWeight } from "./words";

// Fitting a cue's words into the speech heard in the audio (src/audio): voice activity detection tells when someone
// speaks, not what, so the words are spread over the speech around the cue by how long each takes to say.

export type TInterval = { start: number; end: number };

// Speech just before or after the cue still belongs to it: lines are timed by hand
const PAD_MS = 400;
// Gaps shorter than this are breaths inside a phrase, speech shorter than this is a click or a cough
const MIN_GAP_MS = 120;
const MIN_SPEECH_MS = 80;
// Less speech than this around a cue isn't its words
const MIN_TOTAL_MS = 150;
// A cue's speech starts this close to the line's start; after the previous line's speech, a little later still counts
const ONSET_BEFORE_MS = 200;
const ONSET_AFTER_MS = 1500;
const ONSET_AFTER_ONGOING_MS = 1200;
// A pause this long ends a line's speech, between these many times as long as its words take at the speaking rate
const END_PAUSE_MS = 250;
const MIN_STRETCH = 0.6;
const MAX_STRETCH = 1.4;
// Under this share of that, the detector missed speech
const MIN_SPEECH_SHARE = 0.4;

// Adds an interval to sorted, non-overlapping intervals, merging what touches it
export function addInterval(intervals: TInterval[], interval: TInterval, joinWithin = 0): TInterval[] {
  const result: TInterval[] = [];
  let merged = { ...interval };
  let placed = false;
  for (const current of intervals) {
    if (current.end + joinWithin < merged.start) {
      result.push(current);
    } else if (merged.end + joinWithin < current.start) {
      if (!placed) result.push(merged);
      placed = true;
      result.push(current);
    } else {
      merged = { start: Math.min(merged.start, current.start), end: Math.max(merged.end, current.end) };
    }
  }
  if (!placed) result.push(merged);
  return result;
}

// Whether the intervals cover [start, end] completely
export function covers(intervals: TInterval[], start: number, end: number): boolean {
  return intervals.some((interval) => interval.start <= start && interval.end >= end);
}

// The speech around a cue, clipped to it, short gaps closed and short noises dropped
export function speechAround(sub: TSub, speech: TInterval[]): TInterval[] {
  const from = sub.start - PAD_MS;
  const to = sub.end + PAD_MS;
  let parts: TInterval[] = [];
  for (const segment of speech) {
    if (segment.end <= from || segment.start >= to) continue;
    parts = addInterval(parts, { start: Math.max(from, segment.start), end: Math.min(to, segment.end) }, MIN_GAP_MS);
  }
  return parts.filter((part) => part.end - part.start >= MIN_SPEECH_MS);
}

// The speech a cue's words go into. It starts with the speech that begins near the line's start; speech that began
// well before it is the previous line's, still going, and then the line's start is the best guess. It ends at a pause
// near where the words would end at the video's speaking rate, or there when the speech goes on (back-to-back lines).
function speechOfCue(sub: TSub, parts: TInterval[], natural: number): TInterval[] {
  const starting = parts.find(
    (part) => part.start >= sub.start - ONSET_BEFORE_MS && part.start < sub.start + ONSET_AFTER_MS,
  );
  const ongoing = parts.some((part) => part.start < sub.start - ONSET_BEFORE_MS && part.end > sub.start);
  const onset =
    starting && !(ongoing && starting.start > sub.start + ONSET_AFTER_ONGOING_MS)
      ? starting.start
      : ongoing
        ? sub.start
        : null;
  if (onset === null) return [];

  const target = onset + natural;
  const pauses = parts
    .filter((part, index) => {
      const next = parts[index + 1];
      return (!next || next.start - part.end >= END_PAUSE_MS) && part.end > onset;
    })
    .map((part) => part.end)
    .filter((end) => end >= onset + natural * MIN_STRETCH && end <= onset + natural * MAX_STRETCH);
  const end = pauses.length
    ? pauses.reduce((best, candidate) => (Math.abs(candidate - target) < Math.abs(best - target) ? candidate : best))
    : target;

  return parts
    .filter((part) => part.end > onset && part.start < end)
    .map((part) => ({ start: Math.max(part.start, onset), end: Math.min(part.end, end) }));
}

// The cue's word times inside the heard speech; null when the audio around the cue wasn't heard yet or holds no
// speech. `heard` is what the audio analysis has covered so far.
export function snapToSpeech(
  sub: TSub,
  speech: TInterval[],
  heard: TInterval[],
  msPerUnit = DEFAULT_MS_PER_UNIT,
  language = "",
): (TWordTime | null)[] | null {
  if (!covers(heard, sub.start - PAD_MS, Math.min(sub.end + PAD_MS, sub.start + 60_000))) return null;
  const weights = sub.items.map((item) => wordWeight(item.text, language));
  const units = weights.reduce((a, b) => a + b, 0);
  if (units === 0) return weights.map(() => null);

  const estimate = estimateWordTimes(sub, msPerUnit, language);
  const said = estimate.filter(Boolean);
  const natural = said.length ? said.at(-1).end - said[0].start : 0;
  const parts = speechOfCue(sub, speechAround(sub, speech), natural);
  const total = parts.reduce((sum, part) => sum + part.end - part.start, 0);
  if (total < MIN_TOTAL_MS) return null;
  // Too little speech for the words: the detector missed some, the start is all it tells
  if (total < natural * MIN_SPEECH_SHARE) return estimateWordTimes(sub, msPerUnit, language, parts[0].start);

  // The speech time at a share of the cue's words, skipping the gaps
  const timeAt = (share: number) => {
    let left = share * total;
    for (const part of parts) {
      const length = part.end - part.start;
      if (left <= length) return part.start + left;
      left -= length;
    }
    return parts.at(-1).end;
  };

  let done = 0;
  return weights.map((weight) => {
    if (weight === 0) return null;
    const start = timeAt(done / units);
    done += weight;
    // A word that would straddle a gap keeps to the part it starts in
    const part = parts.find((candidate) => candidate.start <= start && start < candidate.end);
    return { start, end: Math.min(timeAt(done / units), part?.end ?? Infinity) };
  });
}

// While the audio is heard live, only the start of a cue's speech may be known yet: the estimate then starts there
// instead of at the line's start
export function estimateFromOnset(
  sub: TSub,
  speech: TInterval[],
  heard: TInterval[],
  msPerUnit = DEFAULT_MS_PER_UNIT,
  language = "",
): (TWordTime | null)[] | null {
  const from = sub.start - PAD_MS;
  if (!covers(heard, from, sub.start + LEAD_IN_MS)) return null;
  const onset = speechAround(sub, speech)[0];
  if (!onset || onset.start > sub.start + 1500) return null;
  return estimateWordTimes(sub, msPerUnit, language, Math.max(from, onset.start));
}
