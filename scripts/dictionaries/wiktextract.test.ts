import { describe, expect, it } from "vitest";
import {
  backTranslations,
  buildDictionary,
  collectBackTranslations,
  dictionaryKey,
  dictionaryWord,
  formsOf,
  glossedSenses,
  mergeWords,
  transcription,
  translatedSenses,
  type TWiktextractRecord,
} from "./wiktextract";

// Wiktextract records reduced to the fields the build reads, like those of kaikki.org's dumps
const record = (fields: Partial<TWiktextractRecord> & Pick<TWiktextractRecord, "word">): TWiktextractRecord => ({
  pos: "verb",
  lang_code: "en",
  senses: [{ glosses: ["A meaning."] }],
  ...fields,
});

const ru = (word: string, sense?: string, _dis1?: string) => ({ code: "ru", word, sense, _dis1 });

describe("translatedSenses", () => {
  it("gives an English word's senses their translations, without Russian stress marks", () => {
    const lose = record({
      word: "lose",
      senses: [
        { glosses: ["To cause something to cease to be in one's possession."], translations: [ru("теря́ть")] },
        { glosses: ["To be defeated."], translations: [ru("прои́грывать"), ru("проигра́ть"), ru("проигра́ть")] },
        { glosses: ["An obsolete sense."], tags: ["obsolete"], translations: [ru("губи́ть")] },
      ],
    });

    expect(translatedSenses(lose, "ru")).toEqual([
      [["терять"], "To cause something to cease to be in one's possession."],
      [["проигрывать", "проиграть"], "To be defeated."],
    ]);
  });

  it("puts tables tied to a sense by its description where Wiktextract scored them best", () => {
    const house = record({
      word: "house",
      pos: "noun",
      senses: [{ glosses: ["An abode."] }, { glosses: ["A legislative body."], translations: [ru("пала́та")] }],
      translations: [ru("дом", "abode", "15 2"), ru("жили́ще", "abode", "15 2")],
    });

    expect(translatedSenses(house, "ru")).toEqual([
      [["дом", "жилище"], "abode"],
      [["палата"], "A legislative body."],
    ]);
  });

  it("puts the back translations first when the first meaning has no table", () => {
    const dog = record({
      word: "dog",
      pos: "noun",
      senses: [{ glosses: ["A canine."] }, { glosses: ["A male dog."], translations: [ru("кобе́ль")] }],
    });
    const ask = record({ word: "ask", senses: [{ glosses: ["To request."], translations: [ru("спра́шивать")] }] });

    expect(translatedSenses(dog, "ru", ["собака", "пёс"])).toEqual([[["собака", "пёс"]], [["кобель"], "A male dog."]]);
    expect(translatedSenses(ask, "ru", ["проситься"])).toEqual([[["спрашивать"], "To request."]]);
  });

  it("finds Chinese under Wiktionary's code for Mandarin", () => {
    const tea = record({
      word: "tea",
      pos: "noun",
      senses: [{ glosses: ["A drink."], translations: [{ code: "cmn", word: "茶" }] }],
    });

    expect(translatedSenses(tea, "zh")).toEqual([[["茶"], "A drink."]]);
  });
});

describe("glossedSenses", () => {
  it("splits a gloss that lists translations and keeps usage labels", () => {
    const perder = record({
      word: "perder",
      lang_code: "es",
      senses: [
        { glosses: ["to lose; to misplace"] },
        { glosses: ["to waste (time)"], tags: ["colloquial", "transitive"] },
        { glosses: ["first-person form"], form_of: [{ word: "perder" }] },
      ],
    });

    expect(glossedSenses(perder)).toEqual([[["to lose", "to misplace"]], [["to waste (time)"], "colloquial"]]);
  });
});

describe("backTranslations", () => {
  it("takes the glosses that are just an English word, by sense", () => {
    const sobaka = record({
      word: "соба́ка",
      pos: "noun",
      lang_code: "ru",
      senses: [{ glosses: ["dog"] }, { glosses: ["a detestable person, a cur"] }, { glosses: ["hound"] }],
    });

    expect(backTranslations(sobaka, "ru")).toEqual([
      ["dog", "noun", "собака", 0],
      ["detestable person", "noun", "собака", 1],
      ["cur", "noun", "собака", 1],
      ["hound", "noun", "собака", 2],
    ]);
  });

  it("keeps the words whose main meaning is the English word", () => {
    const back = collectBackTranslations([
      ["dog", "noun", "кобель", 1],
      ["dog", "noun", "собака", 0],
      ["dog", "noun", "пёс", 0],
      ["dog", "verb", "преследовать", 0],
    ]);

    expect(back.get("dog\nnoun")).toEqual(["собака", "пёс"]);
    expect(dictionaryWord(record({ word: "dog", pos: "noun", senses: [] }), "en", "ru", back)).toEqual([
      "dog",
      "",
      [["noun", [[["собака", "пёс"]]]]],
    ]);
  });
});

describe("dictionaryWord", () => {
  it("keeps a word with its transcription, but not inflected forms or words without translations", () => {
    const go = record({
      word: "go",
      sounds: [{ ipa: "/ɡəʊ/" }],
      senses: [{ glosses: ["To move."], translations: [ru("идти́")] }],
    });

    expect(dictionaryWord(go, "en", "ru")).toEqual(["go", "ɡəʊ", [["verb", [[["идти"], "To move."]]]]]);
    expect(
      dictionaryWord(record({ word: "went", senses: [{ glosses: ["past"], form_of: [{ word: "go" }] }] }), "en", "ru"),
    ).toBeNull();
    expect(dictionaryWord(go, "en", "de")).toBeNull();
    expect(dictionaryWord(go, "es", "en")).toBeNull();
  });

  it("reads the first transcription", () => {
    expect(transcription(record({ word: "a", sounds: [{}, { ipa: "[ə]" }] }))).toBe("ə");
  });
});

describe("formsOf", () => {
  it("takes the inflections a word lists, not its other spellings or rare forms", () => {
    const go = record({
      word: "go",
      forms: [
        { form: "goes", tags: ["present", "singular", "third-person"] },
        { form: "Went", tags: ["past"] },
        { form: "gan", tags: ["past", "archaic"] },
        { form: "goe", tags: ["alternative"] },
        { form: "gone" },
      ],
    });

    expect(formsOf(go, "en")).toEqual([
      ["goes", "go", false],
      ["went", "go", false],
    ]);
  });

  it("takes what an entry of a form is a form of, unless it's an archaic one", () => {
    const went = record({
      word: "went",
      senses: [
        { glosses: ["past of go"], form_of: [{ word: "go" }], tags: ["form-of"] },
        { glosses: ["past of wend"], form_of: [{ word: "wend" }], tags: ["form-of", "archaic"] },
      ],
    });

    expect(formsOf(went, "en")).toEqual([["went", "go", true]]);
  });

  it("normalizes Russian forms like the subtitles' words", () => {
    expect(dictionaryKey("Шёл", "ru")).toBe("шел");
    expect(formsOf(record({ word: "идти́", lang_code: "ru", forms: [{ form: "шёл", tags: ["past"] }] }), "ru")).toEqual([
      ["шел", "идти", false],
    ]);
  });
});

describe("mergeWords and buildDictionary", () => {
  it("joins the entries of a word, minor ones like letters last and meanings once", () => {
    const letter = ["i", "aɪ", [["noun", [[["и"], "The name of the Latin script letter I/i."]]]]] as const;
    const pronoun = ["I", "aɪ", [["pron", [[["я"], "personal pronoun"]]]]] as const;

    expect(mergeWords([structuredClone(letter), structuredClone(pronoun), structuredClone(pronoun)] as never)).toEqual([
      "I",
      "aɪ",
      [
        ["pron", [[["я"], "personal pronoun"]]],
        ["noun", [[["и"], "The name of the Latin script letter I/i."]]],
      ],
    ]);
  });

  it("keeps the forms of words it has, and not those of too many words", () => {
    const words = new Map([
      ["go", [["go", "", [["verb", [[["идти"]]]]]] as never]],
      ["leave", [["leave", "", [["verb", [[["уходить"]]]]]] as never]],
    ]);
    const forms = new Map([
      ["went", new Set(["go"])],
      ["left", new Set(["leave", "unknown"])],
      ["them", new Set(["go", "leave", "they", "it"])],
    ]);

    const dictionary = buildDictionary({ from: "en", to: "ru", source: "test", license: "test" }, words, forms);

    expect(dictionary.forms).toEqual({ went: ["go"], left: ["leave"] });
    expect(Object.keys(dictionary.words)).toEqual(["go", "leave"]);
  });

  it("keeps for a word with meanings of its own only the forms its own entry declares", () => {
    const word = (key: string) => [[key, "", [["pron", [[["слово"]]]]]] as never];
    const words = new Map([
      ["she", word("she")],
      ["herself", word("herself")],
      ["saw", word("saw")],
      ["see", word("see")],
    ]);
    const forms = new Map([
      ["she", new Set(["herself"])],
      ["saw", new Set(["see"])],
    ]);

    const dictionary = buildDictionary(
      { from: "en", to: "ru", source: "test", license: "test" },
      words,
      forms,
      new Map([["saw", new Set(["see"])]]),
    );

    expect(dictionary.forms).toEqual({ saw: ["see"] });
  });
});
