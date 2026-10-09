import { describe, expect, it } from "vitest";
import { dictionaryPair, dictionaryTranslation, lookUpWord } from "./lookup";
import type { TDictionary } from "./format";

const enRu: TDictionary = {
  from: "en",
  to: "ru",
  source: "test",
  license: "test",
  words: {
    go: ["go", "ɡəʊ", [["verb", [[["идти", "ходить"], "To move."]]]]],
    saw: ["saw", "sɔː", [["noun", [[["пила"], "A tool."]]]]],
    see: ["see", "siː", [["verb", [[["видеть"], "To perceive."]]]]],
    "pick up": ["pick up", "", [["verb", [[["забрать", "подобрать"], "To collect a passenger."]]]]],
  },
  forms: { went: ["go"], saw: ["see"], "picked up": ["pick up"] },
};

describe("dictionaryPair", () => {
  it("names the pairs there are dictionaries for", () => {
    expect(dictionaryPair("en", "ru")).toBe("en-ru");
    expect(dictionaryPair("en-US", "zh-TW")).toBe("en-zh");
    expect(dictionaryPair("es", "en")).toBe("es-en");
    expect(dictionaryPair("es", "ru")).toBeNull();
    expect(dictionaryPair("auto", "ru")).toBeNull();
  });
});

describe("lookUpWord", () => {
  it("finds a word as the subtitles write it", () => {
    expect(lookUpWord(enRu, "Go!")).toEqual({ word: "go", transcription: "ɡəʊ", entries: enRu.words.go[2] });
    expect(lookUpWord(enRu, "nothing")).toBeNull();
  });

  it("finds an inflected form's dictionary form, its meanings before the form's own", () => {
    expect(lookUpWord(enRu, "went")).toEqual({
      word: "went",
      transcription: "ɡəʊ",
      lemma: "go",
      entries: enRu.words.go[2],
    });
    expect(lookUpWord(enRu, "saw")?.entries).toEqual([...enRu.words.see[2], ...enRu.words.saw[2]]);
    expect(lookUpWord(enRu, "Picked  up")?.lemma).toBe("pick up");
  });
});

describe("dictionaryTranslation", () => {
  it("shows the meanings like Google's dictionary, with what tells them apart", () => {
    const answer = lookUpWord(enRu, "went")!;

    expect(dictionaryTranslation(answer, "went", "ru")).toEqual({
      source: "went",
      mainTranslation: "идти",
      targetLanguage: "ru",
      transcription: "ɡəʊ",
      lemma: "go",
      translations: [{ word: "идти", partOfSpeech: "verb", synonyms: ["ходить"], popularity: 0, note: "To move." }],
    });
  });
});

describe("dictionaryTranslation rows", () => {
  it("shows a word translating several senses of a part of speech once, six rows at most", () => {
    const key = {
      word: "key",
      transcription: "kiː",
      entries: [
        [
          "noun",
          [
            [["ключ"], "An object that opens a lock."],
            [["ключ", "разгадка"], "A crucial step."],
            [["клавиша"], "A button on a keyboard."],
            [["легенда"], "A guide to symbols."],
            [["тональность"], "A musical key."],
            [["код"], "A cipher."],
            [["остров"], "A small island."],
          ],
        ],
        ["adj", [[["ключевой"], "Important."]]],
      ],
    } as const;

    const { translations } = dictionaryTranslation(structuredClone(key) as never, "key", "ru");

    expect(translations.map((item) => item.word)).toEqual([
      "ключ",
      "клавиша",
      "легенда",
      "тональность",
      "код",
      "остров",
    ]);
    expect(translations[0]).toMatchObject({ synonyms: ["разгадка"], note: "An object that opens a lock." });
  });
});
