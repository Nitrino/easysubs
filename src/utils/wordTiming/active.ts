import type { TWordTime } from "@src/models/types";

// Breaths between two words of a phrase keep the earlier word lit
const BRIDGE_MS = 200;

// The item being said at `time`, -1 between words and outside the cue's speech
export function activeWordIndex(times: (TWordTime | null)[] | null | undefined, time: number): number {
  if (!times) return -1;
  for (let index = 0; index < times.length; index++) {
    const word = times[index];
    if (!word || time < word.start) continue;
    if (time < word.end) return index;
    const next = times.slice(index + 1).find(Boolean);
    if (next && time < next.start && next.start - word.end <= BRIDGE_MS) return index;
  }
  return -1;
}
