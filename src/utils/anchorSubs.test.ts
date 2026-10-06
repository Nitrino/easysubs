import { describe, expect, it } from "vitest";
import { anchorSubs, plainCueText } from "./anchorSubs";
import { convertRawSubs } from "./convertRawSubs";
import { captions, playgroundCaptions, playgroundSubs } from "@root/test/fixtures";

const english = playgroundSubs("en");
const idAt = (seconds: number) => english.find((sub) => sub.start <= seconds * 1000 && seconds * 1000 <= sub.end)!.id;

describe("anchorSubs", () => {
  it("pairs the cues of the Spanish track with the English ones", () => {
    const byLine = anchorSubs(english, playgroundCaptions("es"));

    expect(byLine[idAt(5)]).toBe("Casi. Solo tengo que buscar mis llaves.");
    expect(byLine[idAt(40)]).toBe("Primero vamos a buscar la cafetería.");
    expect(Object.keys(byLine)).toHaveLength(9);
  });

  it("leaves an English cue without a Spanish one empty", () => {
    const byLine = anchorSubs(english, playgroundCaptions("es"));

    // "She always says that…" at 14 s has no Spanish cue
    expect(byLine[idAt(15)]).toBeUndefined();
  });

  it("keeps the line breaks of a cue", () => {
    const byLine = anchorSubs(english, playgroundCaptions("es"));

    expect(byLine[idAt(12)]).toBe("- Sí.\n- Entonces deberíamos irnos ya.");
  });

  it("joins a sentence the second track splits in two", () => {
    const main = convertRawSubs(captions([7.2, 10, "Hold on, the train leaves at 7:45, right?"]));
    const second = captions([7.4, 9, "Espera, el tren sale a las 7:45,"], [9, 10.2, "¿verdad?"]);

    expect(anchorSubs(main, second)).toEqual({ 0: "Espera, el tren sale a las 7:45, ¿verdad?" });
  });

  it("pairs a cue with the main cue it overlaps by more than half", () => {
    const main = convertRawSubs(captions([1, 4, "One"], [4, 8, "Two"]));
    const second = captions([3, 7, "Dos"]);

    expect(anchorSubs(main, second)).toEqual({ 1: "Dos" });
  });

  it("drops cues that fall between the main cues", () => {
    const main = convertRawSubs(captions([1, 3, "One"], [10, 12, "Two"]));
    const second = captions([4, 9, "Nadie habla"], [10, 12, "Dos"]);

    expect(anchorSubs(main, second)).toEqual({ 1: "Dos" });
  });

  it("pairs a cue without length with the main cue it sits in", () => {
    const main = convertRawSubs(captions([1, 3, "One"]));

    expect(anchorSubs(main, captions([2, 2, "Uno"]))).toEqual({ 0: "Uno" });
  });

  it("skips empty cues", () => {
    const main = convertRawSubs(captions([1, 3, "One"]));

    expect(anchorSubs(main, captions([1, 3, ""], [1.2, 2.8, "<i> </i>"]))).toEqual({});
  });
});

describe("plainCueText", () => {
  it("drops markup and YouTube's timing tags", () => {
    expect(plainCueText("<i>She always</i> says <00:00:01.500><c>that</c>")).toBe("She always says that");
  });

  it("decodes entities without running the markup", () => {
    expect(plainCueText('Tom &amp; Jerry<img src="x" onerror="window.hacked = true">')).toBe("Tom & Jerry");
    expect((window as { hacked?: boolean }).hacked).toBeUndefined();
  });

  it("keeps line breaks and trims the lines", () => {
    expect(plainCueText(" - Right.\r\n- Then we go. ")).toBe("- Right.\n- Then we go.");
  });
});
