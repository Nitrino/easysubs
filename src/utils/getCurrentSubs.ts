import { TSub } from "@src/models/types";

// A cue is on screen from its start up to its end, not at its end: where the next cue starts exactly as one ends,
// a paused video shows only the next one
export const getCurrentSubs = (subs: TSub[], time: number): TSub[] => {
  return subs.filter((sub) => sub.start <= time && sub.end > time);
};
