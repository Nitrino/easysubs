import { TSub } from "@src/models/types";

export const getCurrentSubs = (subs: TSub[], time: number): TSub[] => {
  return subs.filter((sub) => sub.start <= time && sub.end >= time);
};
