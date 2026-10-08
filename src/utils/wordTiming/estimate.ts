import type { TSub, TWordTime } from "@src/models/types";
import { pauseAfter, wordWeight } from "./words";

// Estimating when the words of a cue are said from its text and its time on screen. A line appears about when the
// speech starts and stays up after it ends (subtitlers keep short lines up long enough to read), so the words are
// spread from the start at the video's speaking rate and squeezed only when the line is shorter than that.

export const LEAD_IN_MS = 120;
// ms per syllable unit when the video has too few lines to learn it from
export const DEFAULT_MS_PER_UNIT = 190;
const MIN_MS_PER_UNIT = 110;
const MAX_MS_PER_UNIT = 360;
// A pause between two speakers of one cue ("- Hi. - Hello."), in units
const SPEAKER_CHANGE_UNITS = 1.5;
// Services that read lines off the page don't know when a line ends and give it 100 s
const OPEN_ENDED_MS = 30_000;
const MIN_LINES_TO_LEARN = 8;

// The pause after each item, in units: punctuation, and a change of speaker before a dash
function pauses(sub: TSub): number[] {
  return sub.items.map((item, index) => {
    if (index === sub.items.length - 1) return 0;
    const next = sub.items[index + 1].text;
    return pauseAfter(item.text) + (/^[-–—]/.test(next) ? SPEAKER_CHANGE_UNITS : 0);
  });
}

const totalUnits = (sub: TSub, language: string) => {
  const gaps = pauses(sub);
  return sub.items.reduce((sum, item, index) => sum + wordWeight(item.text, language) + gaps[index], 0);
};

// How fast people speak in the video, in ms per unit. Lines stay up after the speech but never end before it, so the
// faster lines tell the speaking rate.
export function speakingRate(subs: TSub[], language = ""): number {
  const rates: number[] = [];
  for (const sub of subs) {
    const duration = sub.end - sub.start;
    if (sub.items.length < 3 || duration < 500 || duration > 10_000) continue;
    const units = totalUnits(sub, language);
    if (units > 0) rates.push((duration - LEAD_IN_MS) / units);
  }
  if (rates.length < MIN_LINES_TO_LEARN) return DEFAULT_MS_PER_UNIT;
  rates.sort((a, b) => a - b);
  const rate = rates[Math.floor(rates.length * 0.25)];
  return Math.min(MAX_MS_PER_UNIT, Math.max(MIN_MS_PER_UNIT, rate));
}

export const isOpenEnded = (sub: TSub) => sub.end - sub.start > OPEN_ENDED_MS;

// When each item of the cue is said, from `start` (the line's start, or where speech was heard to begin)
export function estimateWordTimes(
  sub: TSub,
  msPerUnit = DEFAULT_MS_PER_UNIT,
  language = "",
  start = sub.start + LEAD_IN_MS,
): (TWordTime | null)[] {
  const weights = sub.items.map((item) => wordWeight(item.text, language));
  const gaps = pauses(sub);
  const natural = (weights.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0)) * msPerUnit;
  const available = sub.end - start;
  const scale = !isOpenEnded(sub) && natural > available && available > 0 ? available / natural : 1;
  const unit = msPerUnit * scale;

  let time = start;
  return weights.map((weight, index) => {
    if (weight === 0) {
      time += gaps[index] * unit;
      return null;
    }
    const word = { start: time, end: time + weight * unit };
    time = word.end + gaps[index] * unit;
    return word;
  });
}
