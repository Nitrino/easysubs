import { describe, expect, it } from "vitest";
import { getCurrentSubs } from "./getCurrentSubs";
import { playgroundSubs } from "@root/test/fixtures";

const subs = playgroundSubs("en");
const textsAt = (time: number, list = subs) => getCurrentSubs(list, time).map((sub) => sub.text);

describe("getCurrentSubs", () => {
  it("finds the cue on screen at a time in milliseconds", () => {
    expect(textsAt(5000)).toEqual(["Almost. I just need to pick up my keys."]);
  });

  it("shows a cue from its first millisecond until its end", () => {
    expect(textsAt(4000)).toEqual(["Almost. I just need to pick up my keys."]);
    expect(textsAt(6799)).toEqual(["Almost. I just need to pick up my keys."]);
    expect(textsAt(6800)).toEqual([]);
  });

  it("shows only the next cue where it starts as the previous one ends", () => {
    const touching = [
      { ...subs[0], start: 1000, end: 4000 },
      { ...subs[1], start: 4000, end: 6800 },
    ];

    expect(textsAt(4000, touching)).toEqual(["Almost. I just need to pick up my keys."]);
  });

  it("finds nothing between cues", () => {
    expect(textsAt(3700)).toEqual([]);
  });

  it("finds every overlapping cue", () => {
    const overlapping = [
      { ...subs[0], start: 1000, end: 5000 },
      { ...subs[1], start: 4000, end: 6800 },
    ];

    expect(textsAt(4500, overlapping)).toHaveLength(2);
  });
});
