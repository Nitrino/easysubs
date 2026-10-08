import { describe, expect, it } from "vitest";

import { captions, playgroundSubs } from "@root/test/fixtures";
import { convertRawSubs } from "@src/utils/convertRawSubs";
import { youtubeCaptions } from "@src/streamings/youtube";
import type { TTimedWord, TWordTime } from "@src/models/types";
import { normalizeWord, pauseAfter, syllables } from "./words";
import { DEFAULT_MS_PER_UNIT, LEAD_IN_MS, estimateWordTimes, speakingRate } from "./estimate";
import { inlineTimedWords, itemTimes } from "./fileWords";
import { transferWordTimes } from "./transfer";
import { addInterval, estimateFromOnset, snapToSpeech } from "./speech";
import { activeWordIndex } from "./active";
import { yandexVideoUrl } from "./yandexVideoUrl";

const sub = (start: number, end: number, text: string) => convertRawSubs(captions([start, end, text]))[0];
const starts = (times: (TWordTime | null)[] | null) => times?.map((time) => (time ? Math.round(time.start) : null));

describe("words", () => {
  it("writes a word the way two sources of the same speech would both write it", () => {
    expect(normalizeWord("Don’t,")).toBe("don't");
    expect(normalizeWord("«Hola!»")).toBe("hola");
    expect(normalizeWord("-")).toBe("");
  });

  it("counts syllables by vowel groups, letters of syllabic scripts and digits", () => {
    expect(syllables("station")).toBe(2);
    expect(syllables("make", "en")).toBe(1);
    expect(syllables("grande", "es")).toBe(2);
    expect(syllables("молоко")).toBe(3);
    expect(syllables("ありがとう")).toBe(5);
    expect(syllables("1984")).toBe(4);
    expect(syllables("—")).toBe(0);
  });

  it("pauses longer at a full stop than at a comma", () => {
    expect(pauseAfter("Listen,")).toBeGreaterThan(0);
    expect(pauseAfter("now.")).toBeGreaterThan(pauseAfter("Listen,"));
    expect(pauseAfter("word")).toBe(0);
  });
});

describe("estimateWordTimes", () => {
  it("spreads the words from the line's start at the speaking rate and leaves the lingering end empty", () => {
    const cue = sub(10, 16, "We have to go.");
    const times = estimateWordTimes(cue, 200, "en");

    expect(times[0].start).toBe(10_000 + LEAD_IN_MS);
    expect(times.at(-1).end).toBeLessThan(13_000);
    times.slice(1).forEach((time, index) => expect(time.start).toBeGreaterThanOrEqual(times[index].end));
  });

  it("squeezes the words into a line that is shorter than the speech", () => {
    const cue = sub(10, 11, "Listen, we have to get off before the next station.");
    const times = estimateWordTimes(cue, 200, "en");

    expect(times.at(-1).end).toBeCloseTo(11_000);
  });

  it("pauses at a comma and between two speakers", () => {
    const cue = sub(0, 10, "Hi, you.\n- Hello.");
    const [hi, you, , hello] = estimateWordTimes(cue, 200, "en");

    expect(you.start - hi.end).toBeGreaterThan(0);
    expect(hello.start - you.end).toBeGreaterThan(you.start - hi.end);
  });

  it("starts from where speech was heard", () => {
    const times = estimateWordTimes(sub(10, 14, "Hello there"), 200, "en", 10_600);

    expect(times[0].start).toBe(10_600);
  });

  it("doesn't squeeze a line that is read off the page with no known end", () => {
    const cue = sub(10, 110, "Listen, we have to get off before the next station.");
    const times = estimateWordTimes(cue, 200, "en");

    expect(times.at(-1).end).toBeLessThan(20_000);
  });

  it("learns the speaking rate from the faster lines of the video", () => {
    const rate = speakingRate(playgroundSubs("en"), "en");

    expect(rate).toBeGreaterThan(110);
    expect(rate).toBeLessThan(360);
    expect(speakingRate(playgroundSubs("en").slice(0, 3), "en")).toBe(DEFAULT_MS_PER_UNIT);
  });
});

describe("word times from the subtitles", () => {
  // An auto-generated line of a json3 track: a seg per word, timed from the line's start
  const ASR_EVENTS = [
    {
      tStartMs: 1000,
      dDurationMs: 4000,
      segs: [
        { utf8: "we" },
        { utf8: " have", tOffsetMs: 200 },
        { utf8: " to", tOffsetMs: 450 },
        { utf8: " go", tOffsetMs: 600 },
      ],
    },
    { tStartMs: 2000, dDurationMs: 3000, segs: [{ utf8: "\n" }] },
    { tStartMs: 2100, dDurationMs: 3000, segs: [{ utf8: "right" }, { utf8: " now", tOffsetMs: 300 }] },
  ];

  it("keeps the words of YouTube's auto-generated captions and ends a line with its last word", () => {
    const [line] = youtubeCaptions(ASR_EVENTS);

    expect(line).toMatchObject({ start: 1000, text: "we have to go" });
    expect(line.words.map((word) => [word.text.trim(), word.start, word.end])).toEqual([
      ["we", 0, 200],
      ["have", 200, 450],
      ["to", 450, 600],
      ["go", 600, Number(line.end) - 1000],
    ]);
    // Ends before the next line with words starts, not when the event does
    expect(line.end).toBeLessThanOrEqual(2100);
    expect(line.end).toBeGreaterThan(1600);
  });

  it("gives manual YouTube lines no words and their event's duration", () => {
    const [line] = youtubeCaptions([{ tStartMs: 500, dDurationMs: 2000, segs: [{ utf8: "Hello there" }] }]);

    expect(line).toEqual({ start: 500, end: 2500, text: "Hello there" });
  });

  it("times every item of an auto-generated line in video time", () => {
    const [line] = convertRawSubs(youtubeCaptions(ASR_EVENTS));

    expect(starts(line.words)).toEqual([1000, 1200, 1450, 1600]);
  });

  it("moves the words with their line when the subtitles are delayed", () => {
    const shifted = youtubeCaptions(ASR_EVENTS).map((cue) => ({
      ...cue,
      start: Number(cue.start) + 500,
      end: Number(cue.end) + 500,
    }));

    expect(starts(convertRawSubs(shifted)[0].words)).toEqual([1500, 1700, 1950, 2100]);
  });

  it("reads WebVTT word timestamps", () => {
    const text = "<c>Hello</c><00:00:01.500><c> there</c><00:00:02.000><c> friend</c>";
    const words = inlineTimedWords(text, 1000, 3000);

    expect(words).toEqual([
      { text: "Hello", start: 0, end: 500 },
      { text: " there", start: 500, end: 1000 },
      { text: " friend", start: 1000, end: 2000 },
    ]);
    expect(starts(convertRawSubs([{ start: 1000, end: 3000, text }])[0].words)).toEqual([1000, 1500, 2000]);
  });

  it("ignores timestamps that don't belong to the cue any more", () => {
    expect(inlineTimedWords("Hi<00:01:00.000> there", 1000, 3000)).toBeNull();
    expect(inlineTimedWords("Hi there", 1000, 3000)).toBeNull();
  });

  it("splits a piece that holds two items by its characters", () => {
    const times = itemTimes(["don't", "go"], [{ text: "don't go", start: 0, end: 700 }]);

    expect(times.map((time) => [Math.round(time.start), Math.round(time.end)])).toEqual([
      [0, 500],
      [500, 700],
    ]);
    expect(itemTimes(["other"], [{ text: "words", start: 0, end: 100 }])).toBeNull();
  });
});

describe("transferWordTimes", () => {
  const timed = (...words: [string, number, number][]): TTimedWord[] =>
    words.map(([text, start, end]) => ({ text, start, end }));

  it("gives each cue the times of its words in the other source", () => {
    const subs = convertRawSubs(captions([1, 4, "We have to go."], [4.5, 7, "Right now!"]));
    const words = timed(
      ["we", 1200, 1400],
      ["have", 1400, 1650],
      ["to", 1650, 1750],
      ["go", 1750, 2100],
      ["right", 4700, 5000],
      ["now", 5000, 5400],
    );

    const result = transferWordTimes(subs, words, "en");

    expect(starts(result[0])).toEqual([1200, 1400, 1650, 1750]);
    expect(starts(result[1])).toEqual([4700, 5000]);
  });

  it("matches words written differently and fills the words the other source missed", () => {
    const [cue] = convertRawSubs(captions([1, 4, "Don't touch the 20 crates!"]));
    const words = timed(["don’t", 1100, 1300], ["touch", 1300, 1600], ["twenty", 1700, 2000], ["crate", 2000, 2400]);

    const [dont, touch, the, twenty, crates] = transferWordTimes([cue], words, "en")[0];

    expect([dont.start, touch.start, crates.start]).toEqual([1100, 1300, 2000]);
    // "the" and "20" weren't recognized as such: they share the time between their neighbours
    expect(the.start).toBe(1600);
    expect(twenty.end).toBe(2000);
  });

  it("doesn't give a word to two cues and skips cues whose words aren't there", () => {
    const subs = convertRawSubs(captions([1, 2, "Go."], [2.2, 3, "Go."], [10, 12, "Something else entirely"]));
    const words = timed(["go", 1100, 1300], ["go", 2300, 2500]);

    const result = transferWordTimes(subs, words, "en");

    expect(starts(result[0])).toEqual([1100]);
    expect(starts(result[1])).toEqual([2300]);
    expect(result[2]).toBeUndefined();
  });
});

describe("speech", () => {
  it("merges intervals that touch", () => {
    let intervals = addInterval([], { start: 0, end: 100 });
    intervals = addInterval(intervals, { start: 300, end: 400 });
    intervals = addInterval(intervals, { start: 90, end: 310 });

    expect(intervals).toEqual([{ start: 0, end: 400 }]);
    expect(addInterval([{ start: 0, end: 100 }], { start: 150, end: 200 }, 60)).toEqual([{ start: 0, end: 200 }]);
  });

  it("fits a cue's words into the speech around it", () => {
    const cue = sub(1, 5, "Listen, we have to go.");
    const speech = [
      { start: 1450, end: 1850 },
      { start: 2150, end: 3350 },
    ];
    const times = snapToSpeech(cue, speech, [{ start: 0, end: 10_000 }], 200, "en");

    expect(times[0].start).toBe(1450);
    expect(times.at(-1).end).toBeCloseTo(3350);
    // Every word inside the speech
    times.forEach((time) =>
      expect(speech.some((part) => time.start >= part.start && time.end <= part.end + 1)).toBe(true),
    );
  });

  it("waits until the cue's audio was heard and has speech in it", () => {
    const cue = sub(1, 5, "Listen, we have to go.");

    expect(snapToSpeech(cue, [{ start: 1450, end: 3350 }], [{ start: 0, end: 3000 }])).toBeNull();
    expect(snapToSpeech(cue, [], [{ start: 0, end: 10_000 }])).toBeNull();
  });

  it("starts the estimate at the speech heard so far", () => {
    const cue = sub(1, 5, "Listen, we have to go.");
    const times = estimateFromOnset(cue, [{ start: 1450, end: 1700 }], [{ start: 0, end: 1700 }], 200, "en");

    expect(times[0].start).toBe(1450);
  });
});

describe("activeWordIndex", () => {
  const times = [{ start: 0, end: 100 }, null, { start: 150, end: 300 }, { start: 800, end: 900 }];

  it("finds the word being said and keeps it through a breath", () => {
    expect(activeWordIndex(times, 50)).toBe(0);
    expect(activeWordIndex(times, 120)).toBe(0);
    expect(activeWordIndex(times, 200)).toBe(2);
    expect(activeWordIndex(times, 500)).toBe(-1);
    expect(activeWordIndex(times, 900)).toBe(-1);
    expect(activeWordIndex(null, 50)).toBe(-1);
  });
});

describe("yandexVideoUrl", () => {
  it("uses YouTube's short link and the page elsewhere", () => {
    expect(yandexVideoUrl("youtube", "https://www.youtube.com/watch?v=arj7oStGLkU&t=10")).toBe(
      "https://youtu.be/arj7oStGLkU",
    );
    expect(yandexVideoUrl("youtube", "https://www.youtube.com/shorts/arj7oStGLkU")).toBe(
      "https://youtu.be/arj7oStGLkU",
    );
    expect(yandexVideoUrl("coursera", "https://www.coursera.org/learn/x/lecture/abc#top")).toBe(
      "https://www.coursera.org/learn/x/lecture/abc",
    );
  });
});
