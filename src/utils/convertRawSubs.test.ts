import { describe, expect, it } from "vitest";
import { convertRawSubs } from "./convertRawSubs";
import { captions, playgroundCaptions } from "@root/test/fixtures";

describe("convertRawSubs", () => {
  it("turns the playground subtitles into cues with millisecond timings", () => {
    const subs = convertRawSubs(playgroundCaptions("en"));

    expect(subs).toHaveLength(23);
    expect(subs[1]).toMatchObject({
      id: 1,
      start: 4000,
      end: 6800,
      text: "Almost. I just need to pick up my keys.",
      cleanedText: "Almost. I just need to pick up my keys.",
    });
  });

  it("splits a cue into words that keep their punctuation for display", () => {
    const [sub] = convertRawSubs(captions([4, 6.8, "Almost. I just need to pick up my keys."]));

    expect(sub.items.map((item) => item.text)).toEqual([
      "Almost.",
      "I",
      "just",
      "need",
      "to",
      "pick",
      "up",
      "my",
      "keys.",
    ]);
    expect(sub.items.map((item) => item.cleanedText)).toEqual([
      ...["Almost", "I", "just", "need", "to", "pick", "up", "my", "keys"],
    ]);
    expect(sub.items.every((item) => item.type === "word")).toBe(true);
  });

  it("keeps the line break of a multi-line cue in its words but not in the text to translate", () => {
    const [sub] = convertRawSubs(captions([10.5, 13.5, "- Right.\n- Then we should set off now."]));

    expect(sub.items.map((item) => item.text)).toEqual([
      "-",
      "Right.\n",
      "-",
      "Then",
      "we",
      "should",
      "set",
      "off",
      "now.",
    ]);
    expect(sub.cleanedText).toBe("- Right. - Then we should set off now.");
  });

  it("strips markup from the words and the text to translate", () => {
    const [sub] = convertRawSubs(captions([50.5, 54, "<b>Next train:</b> 7:45 to the coast."]));

    expect(sub.items.map((item) => item.text)).toEqual(["Next", "train:", "7:45", "to", "the", "coast."]);
    expect(sub.cleanedText).toBe("Next train: 7:45 to the coast.");
  });

  it("strips the karaoke timing tags of YouTube auto-generated subtitles", () => {
    const [sub] = convertRawSubs(captions([1, 2, "hello<00:00:01.500><c> world</c><00:00:01.800><c> again</c>"]));

    expect(sub.items.map((item) => item.text)).toEqual(["hello", "world", "again"]);
    expect(sub.cleanedText).toBe("hello world again");
  });

  it("marks italic and bold words", () => {
    const [italic] = convertRawSubs(captions([14, 17, "<i>She always says that.</i>"]));
    const [bold] = convertRawSubs(captions([50.5, 54, "<b>Next train:</b> 7:45 to the coast."]));

    expect(italic.items.map((item) => item.tag)).toEqual(["i", "i", "i", "i"]);
    expect(bold.items.map((item) => item.tag)).toEqual(["b", "b", "span", "span", "span", "span"]);
  });

  it("marks a word by the innermost style around it", () => {
    const [sub] = convertRawSubs(captions([1, 2, "<b>Next <i>train</i></b> <u>now</u>"]));

    expect(sub.items.map(({ text, tag }) => [text, tag])).toEqual([
      ["Next", "b"],
      ["train", "i"],
      ["now", "u"],
    ]);
  });
});
