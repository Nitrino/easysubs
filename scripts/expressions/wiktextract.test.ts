import { describe, expect, it } from "vitest";
import {
  headVerbForms,
  lexiconEntry,
  mergeEntries,
  serializeLexicon,
  verbForms,
  type TWiktextractRecord,
} from "./wiktextract";

// Wiktextract records reduced to the fields the build reads, like those of kaikki.org's dumps
const record = (fields: Partial<TWiktextractRecord> & Pick<TWiktextractRecord, "word">): TWiktextractRecord => ({
  pos: "verb",
  lang_code: "en",
  senses: [{ glosses: ["A meaning."] }],
  ...fields,
});

describe("lexiconEntry", () => {
  it("keeps a phrasal verb with its forms, normalized", () => {
    const pickUp = record({
      word: "pick up",
      forms: [
        { form: "picks up", tags: ["present", "singular", "third-person"] },
        { form: "Picking up", tags: ["participle", "present"] },
        { form: "picked up", tags: ["past"] },
        { form: "picked up", tags: ["participle", "past"] },
      ],
      senses: [{ glosses: ["To lift."], categories: [{ name: 'English phrasal verbs formed with "up"' }] }],
    });

    expect(lexiconEntry(pickUp)).toEqual(["pick up", "p", ["picks up", "picking up", "picked up"], 1]);
  });

  it("marks idioms by their senses or categories", () => {
    expect(
      lexiconEntry(record({ word: "kick the bucket", senses: [{ glosses: ["To die."], tags: ["idiomatic"] }] })),
    ).toEqual(["kick the bucket", "i", [], 1]);
    expect(lexiconEntry(record({ word: "break a leg", pos: "intj", categories: ["English idioms"] }))).toEqual([
      "break a leg",
      "i",
    ]);
  });

  it("keeps other phrases as expressions, and multi-word nouns only when idiomatic", () => {
    expect(lexiconEntry(record({ word: "by and large", pos: "adv" }))).toEqual(["by and large", "e"]);
    expect(lexiconEntry(record({ word: "ice cream", pos: "noun" }))).toBe(null);
    expect(
      lexiconEntry(
        record({ word: "piece of cake", pos: "noun", senses: [{ glosses: ["Easy."], tags: ["idiomatic"] }] }),
      ),
    ).toEqual(["piece of cake", "i"]);
  });

  it("leaves out English phrases of function words only", () => {
    expect(lexiconEntry(record({ word: "to the", pos: "phrase" }))).toBe(null);
    expect(
      lexiconEntry(record({ word: "at all", pos: "adv", senses: [{ glosses: ["X."], tags: ["idiomatic"] }] })),
    ).toEqual(["at all", "i"]);
  });

  it("leaves out single words, inflected forms, obsolete entries and templates", () => {
    expect(lexiconEntry(record({ word: "pick" }))).toBe(null);
    expect(
      lexiconEntry(record({ word: "picked up", senses: [{ glosses: ["past of pick up"], tags: ["form-of"] }] })),
    ).toBe(null);
    expect(lexiconEntry(record({ word: "take umbrage", senses: [{ glosses: ["X."], tags: ["obsolete"] }] }))).toBe(
      null,
    );
    expect(lexiconEntry(record({ word: "A1 grade" }))).toBe(null);
    expect(lexiconEntry(record({ word: "one two three four five six seven eight" }))).toBe(null);
  });

  it("drops rare forms and forms that contain shorter ones", () => {
    const entry = lexiconEntry(
      record({
        word: "ins Gras beißen",
        lang_code: "de",
        forms: [
          { form: "biss ins Gras", tags: ["past"] },
          { form: "ins Gras gebissen", tags: ["participle", "past"] },
          { form: "hat ins Gras gebissen", tags: ["perfect"] },
          { form: "bisse ins Gras", tags: ["subjunctive-ii", "rare"] },
          { form: "de-conj", tags: ["inflection-template"] },
        ],
        senses: [{ glosses: ["To die."], tags: ["idiomatic"] }],
      }),
    );

    expect(entry).toEqual(["ins Gras beißen", "i", ["biss ins gras", "ins gras gebissen"], 1]);
  });

  it("keeps the split forms of German separable verbs", () => {
    const anrufen = record({
      word: "anrufen",
      lang_code: "de",
      forms: [
        { form: "ruft an", tags: ["present", "singular", "third-person"] },
        { form: "rief an", tags: ["past"] },
        { form: "angerufen", tags: ["participle", "past"] },
        { form: "rufen Sie an", tags: ["imperative", "formal"] },
      ],
    });

    expect(lexiconEntry(anrufen)).toEqual(["anrufen", "s", ["ruft an", "rief an"], 1]);
    expect(lexiconEntry({ ...anrufen, lang_code: "en" })).toBe(null);
    expect(lexiconEntry(record({ word: "besuchen", lang_code: "de", forms: [{ form: "besucht" }] }))).toBe(null);
  });

  it("strips stress marks from Russian forms", () => {
    expect(
      lexiconEntry(
        record({
          word: "водить за нос",
          lang_code: "ru",
          forms: [{ form: "вожу́ за́ нос", tags: ["first-person", "present", "singular"] }],
        }),
      ),
    ).toEqual(["водить за нос", "e", ["вожу за нос"], 1]);
  });
});

describe("verb forms", () => {
  it("keeps the one-word forms of verbs in languages whose expressions are conjugated through them", () => {
    const faire = record({
      word: "faire",
      lang_code: "fr",
      forms: [{ form: "fait" }, { form: "font" }, { form: "avoir fait" }, { form: "fis", tags: ["archaic"] }],
    });

    expect(verbForms(faire)).toEqual(["faire", ["fait", "font"]]);
    expect(verbForms({ ...faire, lang_code: "en" })).toBe(null);
    expect(verbForms({ ...faire, pos: "noun" })).toBe(null);
  });

  it("lists the forms of the verbs that start verb expressions", () => {
    const verbs = new Map([
      ["faire", ["fait", "font"]],
      ["rendre", ["rend", "rendu"]],
      ["manger", ["mange"]],
    ]);
    const entries = mergeEntries(
      [
        ["faire semblant", "e", [], 1],
        ["se rendre compte", "e", [], 1],
        ["à table", "e"],
      ],
      "fr",
    );

    expect(headVerbForms(entries, verbs, "fr")).toEqual({ faire: ["fait", "font"], rendre: ["rend", "rendu"] });
  });
});

describe("mergeEntries", () => {
  it("merges the entries of one expression, its strongest kind and all its forms", () => {
    expect(
      mergeEntries(
        [
          ["pick up", "e", ["picks up"]],
          ["give up", "p", ["gives up"], 1],
          ["pick up", "p", ["picked up"], 1],
        ],
        "en",
      ),
    ).toEqual([
      ["give up", "p", ["gives up"], 1],
      ["pick up", "p", ["picks up", "picked up"], 1],
    ]);
  });
});

describe("serializeLexicon", () => {
  it("writes one expression and one verb per line, as valid JSON", () => {
    const json = serializeLexicon(
      { language: "fr", license: "CC BY-SA 4.0" },
      [
        ["faire semblant", "e", [], 1],
        ["à table", "e"],
      ],
      { faire: ["fait"] },
    );

    expect(json.split("\n")).toContain('    ["faire semblant","e",[],1],');
    expect(JSON.parse(json)).toEqual({
      language: "fr",
      license: "CC BY-SA 4.0",
      expressions: [
        ["faire semblant", "e", [], 1],
        ["à table", "e"],
      ],
      verbs: { faire: ["fait"] },
    });
    expect(JSON.parse(serializeLexicon({}, [], {}))).toEqual({ expressions: [], verbs: {} });
  });
});
