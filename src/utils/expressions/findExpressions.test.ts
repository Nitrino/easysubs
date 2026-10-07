import { describe, expect, it } from "vitest";
import { expressionAt, findExpressions, indexLexicon } from "./findExpressions";
import type { TLexicon } from "./lexicon";
import { lexiconIndex } from "@root/test/expressions";

// The expressions of a cue in a language, as "expression [indexes]"
const found = (language: string, cue: string) =>
  findExpressions(lexiconIndex(language), cue.split(" ")).map(
    (match) => `${match.expression} [${match.indexes.join(",")}]`,
  );

const synthetic = (language: string, expressions: TLexicon["expressions"], verbs: TLexicon["verbs"] = {}) =>
  indexLexicon({ language, source: "", license: "", expressions, verbs });

describe("findExpressions in English", () => {
  it("finds a phrasal verb with the indexes of its words and its kind", () => {
    expect(findExpressions(lexiconIndex("en"), "Almost. I just need to pick up my keys.".split(" "))).toContainEqual({
      expression: "pick up",
      kind: "phrasal verb",
      indexes: [5, 6],
    });
  });

  it("finds the forms of a phrasal verb", () => {
    expect(found("en", "She picked up the keys.")).toContain("pick up [1,2]");
    expect(found("en", "We won't. Don't give up before we even start.")).toContain("give up [3,4]");
    expect(found("en", "Wake me up when we see the sea.")).toContain("wake up [0,2]");
  });

  it("finds a phrasal verb with its object between the verb and the particle", () => {
    expect(found("en", "I will pick it up later.")).toContain("pick up [2,4]");
    expect(found("en", "Pick the box up!")).toContain("pick up [0,3]");
  });

  it("ignores a particle too far from the verb or after a preposition", () => {
    expect(found("en", "Did you turn the radio and the lights off?")).not.toContain("turn off [2,8]");
    expect(found("en", "Look at the man up there.").map((match) => match.split(" [")[0])).not.toContain("look up");
  });

  it("ignores words of a phrasal verb in the wrong order or in another sentence", () => {
    expect(found("en", "Up the hill they pick flowers").join()).not.toContain("pick up");
    expect(found("en", "I will pick. Up there it is.").join()).not.toContain("pick up");
  });

  it("finds a phrasal verb at the start of a sentence, before punctuation", () => {
    expect(found("en", "Hold on, the train leaves at 7:45, right?")).toContain("hold on [0,1]");
  });

  it("finds idioms with their inflected forms and placeholders", () => {
    expect(found("en", "He finally kicked the bucket.")).toContain("kick the bucket [2,3,4]");
    expect(found("en", "I made up my mind.")).toContain("make up one's mind [1,2,3,4]");
    expect(findExpressions(lexiconIndex("en"), "He kicked the bucket".split(" "))[0].kind).toBe("idiom");
  });

  it("finds an expression after a dialogue dash, not across it", () => {
    expect(found("en", "- Right. - Then we should set off now.")).toContain("set off [6,7]");
  });
});

describe("findExpressions in other languages", () => {
  it("finds a German separable verb split around its object", () => {
    expect(findExpressions(lexiconIndex("de"), "Ich rufe dich morgen an.".split(" "))).toContainEqual({
      expression: "anrufen",
      kind: "separable verb",
      indexes: [1, 4],
    });
    expect(found("de", "Ruf mich an, wenn du kannst.")).toContain("anrufen [0,2]");
  });

  it("takes a German particle followed by more words for a preposition", () => {
    expect(found("de", "Ich rufe an der Tür.").join()).not.toContain("anrufen");
  });

  it("finds German idioms with the verb first", () => {
    expect(found("de", "Er biss ins Gras.")).toContain("ins Gras beißen [1,2,3]");
    expect(found("de", "Er hat ins Gras gebissen.")).toContain("ins Gras beißen [2,3,4]");
  });

  it("finds a Dutch separable verb", () => {
    expect(found("nl", "Ik bel je morgen op.")).toContain("opbellen [1,4]");
  });

  it("finds Spanish expressions with their pronouns", () => {
    expect(found("es", "No me di cuenta de nada.")).toContain("darse cuenta [1,2,3]");
    expect(found("es", "¿Te das cuenta?")).toContain("darse cuenta [0,1,2]");
  });

  it("conjugates verb expressions that have no forms of their own", () => {
    expect(found("ru", "Он весь день бьёт баклуши.")).toContain("бить баклуши [3,4]");
    expect(found("fr", "Il fait semblant de dormir.")).toContain("faire semblant [1,2]");
    expect(found("it", "Fa finta di niente.")).toContain("fare finta [0,1]");
  });
});

describe("findExpressions rules", () => {
  it("finds nothing in a language without expressions", () => {
    expect(findExpressions(synthetic("xx", []), ["any", "words"])).toEqual([]);
  });

  it("lets a placeholder stand for up to three words, without highlighting them", () => {
    const index = synthetic("en", [["give someone the slip", "i"]]);

    expect(findExpressions(index, "She gave her old friend the slip".split(" "))).toEqual([]);
    const withForms = synthetic("en", [["give someone the slip", "i", ["gave someone the slip"], 1]]);
    expect(findExpressions(withForms, "She gave her old friend the slip".split(" "))[0].indexes).toEqual([1, 5, 6]);
    expect(findExpressions(withForms, "She gave a very old friend the slip".split(" "))).toEqual([]);
  });

  it("drops placeholders at the ends of an expression", () => {
    const index = synthetic("de", [["etwas auf die lange Bank schieben", "i"]]);

    expect(findExpressions(index, "Wir dürfen das nicht auf die lange Bank schieben".split(" "))[0].indexes).toEqual([
      4, 5, 6, 7, 8,
    ]);
  });

  it("keeps the longer of two overlapping matches of one expression", () => {
    const index = synthetic("es", [["darse cuenta", "i", ["me di cuenta"], 1]], { dar: ["di"] });

    expect(findExpressions(index, "No me di cuenta".split(" "))).toEqual([
      { expression: "darse cuenta", kind: "idiom", indexes: [1, 2, 3] },
    ]);
  });

  it("doesn't take words named like object properties for placeholders or verbs", () => {
    // "constructor" is a property of every object
    const index = synthetic("ru", [["constructor test", "e", [], 1]]);

    expect(findExpressions(index, ["constructor", "test"])).toHaveLength(1);
  });
});

describe("expressionAt", () => {
  const matches = [
    { expression: "run out", kind: "phrasal verb" as const, indexes: [3, 4] },
    { expression: "run out of", kind: "expression" as const, indexes: [3, 4, 5] },
    { expression: "out of time", kind: "idiom" as const, indexes: [4, 5, 6] },
  ];

  it("shows the expression with the most words at a word", () => {
    expect(expressionAt(matches, 3)?.expression).toBe("run out of");
    expect(expressionAt(matches, 6)?.expression).toBe("out of time");
  });

  it("shows nothing for a word outside the expressions", () => {
    expect(expressionAt(matches, 0)).toBe(null);
  });
});
