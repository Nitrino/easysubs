import { describe, expect, it } from "vitest";
import { findPhrasalVerbs } from "./findPhrasalVerbs";
import { PHRASAL_VERBS } from "./phrasalVerbs";

const keysIn = (text: string) => findPhrasalVerbs(text).map((phrasalVerb) => phrasalVerb.key);

describe("findPhrasalVerbs", () => {
  it("finds a phrasal verb with the indexes of its words and its translations", () => {
    expect(findPhrasalVerbs("Almost. I just need to pick up my keys.")).toContainEqual({
      key: "pick up",
      text: "pick up",
      indexes: [5, 6],
      translations: PHRASAL_VERBS["pick up"].translations,
    });
  });

  it("finds the phrasal verbs of the playground subtitles", () => {
    expect(keysIn("Did you turn off the lights in the kitchen?")).toEqual(["turn off"]);
    expect(keysIn("Yes. And I asked Sam to look after the cat.")).toEqual(["look after"]);
    expect(keysIn("I still can't figure out how to read this ticket.")).toEqual(["figure out"]);
    expect(keysIn("What if we run out of time at the station?")).toEqual(
      expect.arrayContaining(["run out", "run out of"]),
    );
  });

  it("finds the other forms of a phrasal verb", () => {
    expect(findPhrasalVerbs("She picked up the keys.")).toContainEqual(
      expect.objectContaining({ key: "pick up", text: "picked up", indexes: [1, 2] }),
    );
  });

  it("finds a phrasal verb with one word between its parts", () => {
    expect(findPhrasalVerbs("I will pick it up later.")).toContainEqual(
      expect.objectContaining({ key: "pick up", indexes: [2, 4] }),
    );
  });

  it("ignores the words of a phrasal verb that are too far apart", () => {
    expect(keysIn("Did you turn the radio and the lights off?")).not.toContain("turn off");
  });

  it("ignores the words of a phrasal verb in the wrong order", () => {
    expect(keysIn("Up the hill they pick flowers")).not.toContain("pick up");
  });

  it("finds a phrasal verb at the start of a sentence", () => {
    expect(keysIn("Hold on, the train leaves at 7:45, right?")).toContain("hold on");
    expect(findPhrasalVerbs("Wake me up when we see the sea.")).toContainEqual(
      expect.objectContaining({ key: "wake up", indexes: [0, 2] }),
    );
  });

  it("finds a phrasal verb after another use of one of its words", () => {
    expect(findPhrasalVerbs("Up there, I will pick it up.")).toContainEqual(
      expect.objectContaining({ key: "pick up", indexes: [4, 6] }),
    );
  });
});
