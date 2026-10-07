import type { Captions } from "@src/models/types";

// Fitting a subtitle file found online to the video: a file timed for another release of the title starts early or
// late (a longer intro, a studio logo) and drifts when it was made for a 25 fps release. Auto-sync compares when lines
// start and end with a track of the video (the words don't matter, so Spanish lines up against English) and keeps
// the shift and frame-rate stretch under which the lines overlap the most.

// How a file is moved: shown at `time × rate + shift`, shift in seconds
export type TTiming = { shift: number; rate: number };
export const NO_TIMING: TTiming = { shift: 0, rate: 1 };

// The common frame-rate stretches: a file for a 25 fps (PAL) release on a 23.976 fps stream, and back
export const FPS_RATES = [1, 25 / 23.976, 23.976 / 25];

const MAX_SHIFT_MS = 60_000;
const COARSE_STEP_MS = 100;
const FINE_STEP_MS = 10;
// The share of the shorter track's spoken time that has to overlap for a result to count
const MIN_CONFIDENCE = 0.35;
// A few lines fit almost anywhere: below this, the timing pattern says nothing
export const MIN_ALIGN_LINES = 5;
// A frame-rate stretch makes lines longer, which overlaps a little more by itself: it has to win clearly
const STRETCH_MARGIN = 1.03;

type TInterval = { start: number; end: number };

const intervals = (captions: Captions): TInterval[] =>
  captions
    .map((cue) => ({ start: Number(cue.start), end: Number(cue.end) }))
    .filter((cue) => Number.isFinite(cue.start) && cue.end > cue.start)
    .sort((a, b) => a.start - b.start);

const total = (cues: TInterval[]) => cues.reduce((sum, cue) => sum + cue.end - cue.start, 0);

// How long the moved lines overlap the reference, in ms. Both are sorted by start time, so it's a two-pointer walk.
export function overlapScore(found: TInterval[], reference: TInterval[], rate: number, shiftMs: number): number {
  let first = 0;
  let score = 0;
  for (const cue of found) {
    const start = cue.start * rate + shiftMs;
    const end = cue.end * rate + shiftMs;
    while (first < reference.length && reference[first].end <= start) first++;
    for (let index = first; index < reference.length && reference[index].start < end; index++) {
      score += Math.max(0, Math.min(end, reference[index].end) - Math.max(start, reference[index].start));
    }
  }
  return score;
}

export type TAlignment = TTiming & { confident: boolean };

// The timing that fits `found` to `reference`, null when either has too few lines to tell. `confident` is false when
// even the best timing overlaps little: the file may belong to another cut, or the reference to another episode.
export function alignSubs(found: Captions, reference: Captions): TAlignment | null {
  const foundCues = intervals(found);
  const referenceCues = intervals(reference);
  if (foundCues.length < MIN_ALIGN_LINES || referenceCues.length < MIN_ALIGN_LINES) return null;

  // The best shift for each rate; the smallest shift wins a tie
  const bestShift = (rate: number) => {
    let best = { rate, shiftMs: 0, score: -1 };
    const consider = (shiftMs: number) => {
      const score = overlapScore(foundCues, referenceCues, rate, shiftMs) - Math.abs(shiftMs) * 1e-6;
      if (score > best.score) best = { rate, shiftMs, score };
    };
    for (let shiftMs = -MAX_SHIFT_MS; shiftMs <= MAX_SHIFT_MS; shiftMs += COARSE_STEP_MS) consider(shiftMs);
    const coarse = best.shiftMs;
    for (let shiftMs = coarse - COARSE_STEP_MS; shiftMs <= coarse + COARSE_STEP_MS; shiftMs += FINE_STEP_MS) {
      consider(shiftMs);
    }
    return best;
  };
  const [plain, ...stretched] = FPS_RATES.map(bestShift);
  const best = stretched.reduce(
    (winner, candidate) => (candidate.score > winner.score * STRETCH_MARGIN ? candidate : winner),
    plain,
  );

  const confidence = best.score / Math.min(total(foundCues), total(referenceCues));
  return { rate: best.rate, shift: Math.round(best.shiftMs / 10) / 100, confident: confidence >= MIN_CONFIDENCE };
}

// The captions moved by a timing
export function retimeCaptions(captions: Captions, { shift, rate }: TTiming): Captions {
  if (shift === 0 && rate === 1) return captions;
  return captions.map((cue) => ({
    ...cue,
    start: Math.round(Number(cue.start) * rate + shift * 1000),
    end: Math.round(Number(cue.end) * rate + shift * 1000),
  }));
}

export const isSameTiming = (a: TTiming, b: TTiming) =>
  Math.abs(a.shift - b.shift) < 0.005 && Math.abs(a.rate - b.rate) < 1e-6;
