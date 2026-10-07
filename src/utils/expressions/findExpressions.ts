import type { TExpressionMatch } from "@src/models/types";
import { EXPRESSION_KINDS, type TLexicon, type TLexiconEntry } from "./lexicon";
import { endsClause, expressionWords, normalizeWord } from "./normalize";
import { headVerb } from "./verbHeads";

// Finds the expressions of a list (lexicon.ts) in the words of a subtitle cue. Every form of every expression is a
// pattern, indexed by its first word, so a cue only looks at the patterns starting with its own words.

// Words of an expression that stand for any words: "make up one's mind" is also "made up my mind"
type TPlaceholder = "any" | "possessive" | "reflexive";
type TSlot = string | TPlaceholder[];
type TPattern = { slots: TSlot[]; entry: number };

export type TExpressionIndex = {
  language: string;
  entries: TLexiconEntry[];
  byFirstWord: Map<string, TPattern[]>;
};

const PLACEHOLDERS: Record<string, Record<string, TPlaceholder>> = {
  en: {
    someone: "any",
    somebody: "any",
    something: "any",
    "someone's": "possessive",
    "somebody's": "possessive",
    "one's": "possessive",
    oneself: "reflexive",
  },
  de: {
    jemand: "any",
    jemanden: "any",
    jemandem: "any",
    jemandes: "any",
    etwas: "any",
    sich: "reflexive",
    // "sein" is also "to be"
    seine: "possessive",
    seinen: "possessive",
    seinem: "possessive",
    seiner: "possessive",
    seines: "possessive",
  },
  nl: { iemand: "any", iets: "any", zich: "reflexive" },
  es: { alguien: "any", algo: "any" },
  fr: { "quelqu'un": "any", qqn: "any", qqch: "any" },
  it: { qualcuno: "any", qualcosa: "any" },
  pt: { alguém: "any", algo: "any" },
  ru: Object.fromEntries(
    ["кого", "кому", "кем", "ком", "что", "чего", "чему", "чем", "куда", "где"].flatMap((pronoun) => [
      [`${pronoun}-либо`, "any"],
      [`${pronoun}-то`, "any"],
    ]),
  ),
};

const POSSESSIVES: Record<string, (word: string) => boolean> = {
  en: (word) => /^(my|your|his|her|its|our|their|one's|thy)$/.test(word) || /.'s$/.test(word),
  de: (word) => /^(mein|dein|sein|ihr|unser|euer|eur)(e|en|em|er|es)?$/.test(word),
};

const REFLEXIVES: Record<string, Set<string>> = {
  en: new Set(["myself", "yourself", "himself", "herself", "itself", "ourselves", "yourselves", "themselves"]),
  de: new Set(["mich", "dich", "sich", "uns", "euch", "mir", "dir"]),
  nl: new Set(["me", "mij", "je", "zich", "ons", "jullie"]),
};

// How many words "someone" can stand for
const MAX_ANY_WORDS = 3;

// English phrasal verbs whose particle can go after the object: "pick the box up". The object is short and has no
// preposition or conjunction in it, or "look at the man up there" would be "look up".
const EN_PARTICLES = new Set(
  "up down out off in on away back over around round about through along apart aside together forward ahead by".split(
    " ",
  ),
);
const EN_MAX_OBJECT_WORDS = 3;
const EN_NOT_IN_OBJECT = new Set([
  ...EN_PARTICLES,
  ..."at to for with of from into onto upon than and or but so because when while if as".split(" "),
]);
// After these a word is a noun, not the verb of an expression: "pick the box up" isn't "box up"
const EN_DETERMINERS = new Set(
  "a an the my your his her its our their this that these those some any every each no".split(" "),
);

// German and Dutch put the conjugated verb second and the rest of the expression at the end of the clause: "Ich rufe
// dich morgen an", "Er biss gestern ins Gras". A separable verb's particle closes the clause, or comes before a
// conjunction, which is how it differs from a preposition ("Ich rufe an der Tür").
const VERB_LAST_LANGUAGES = new Set(["de", "nl"]);
const VERB_LAST_MAX_GAP = 8;
const CLAUSE_STARTERS: Record<string, Set<string>> = {
  de: new Set("und oder aber denn sondern weil dass wenn als ob bis".split(" ")),
  nl: new Set("en of maar want omdat dat als toen tot".split(" ")),
};

const fits = (placeholders: TPlaceholder[], word: string, language: string) =>
  placeholders.some((placeholder) =>
    placeholder === "possessive"
      ? (POSSESSIVES[language]?.(word) ?? false)
      : placeholder === "reflexive"
        ? (REFLEXIVES[language]?.has(word) ?? false)
        : true,
  );

// The words of a pattern as slots; placeholders at its ends are dropped, the words around them are enough
function patternSlots(words: string[], language: string): TSlot[] | null {
  const placeholders = PLACEHOLDERS[language] ?? {};
  const slots: TSlot[] = words.map((word) => (Object.hasOwn(placeholders, word) ? [placeholders[word]] : word));
  while (slots.length > 0 && typeof slots[0] !== "string") slots.shift();
  while (slots.length > 0 && typeof slots[slots.length - 1] !== "string") slots.pop();
  return slots.filter((slot) => typeof slot === "string").length >= 2 ? slots : null;
}

export function indexLexicon(lexicon: TLexicon): TExpressionIndex {
  const { language, expressions } = lexicon;
  const verbs = lexicon.verbs ?? {};
  const byFirstWord = new Map<string, TPattern[]>();

  expressions.forEach(([base, , forms = [], verb], entry) => {
    const seen = new Set<string>();
    const add = (words: string[]) => {
      const key = words.join(" ");
      if (seen.has(key)) return;
      seen.add(key);
      const slots = patternSlots(words, language);
      if (!slots) return;
      const first = slots[0] as string;
      if (!byFirstWord.has(first)) byFirstWord.set(first, []);
      byFirstWord.get(first).push({ slots, entry });
    };

    const baseWords = expressionWords(base, language);
    if (baseWords.length > 1) add(baseWords);
    for (const form of forms) add(form.split(" "));
    if (verb) {
      const head = headVerb(baseWords, language, (lemma) => Object.hasOwn(verbs, lemma));
      if (head) [head.lemma, ...verbs[head.lemma]].forEach((form) => add([form, ...head.rest]));
    }
  });

  return { language, entries: expressions, byFirstWord };
}

// The expressions in a cue, given its words as they're shown ("Pick", "it", "up!"), with the indexes of their words.
// Where one expression is found in two overlapping ways ("me di cuenta" and "di cuenta"), the longer one stays.
export function findExpressions(index: TExpressionIndex, words: string[]): TExpressionMatch[] {
  const { language, entries } = index;
  const tokens = words.map((word) => normalizeWord(word, language));
  // After a word that ends a clause, or that is only punctuation ("-"), the next word can't continue an expression
  const breaks = words.map((word, position) => tokens[position] === "" || endsClause(word));
  const found: { entry: number; indexes: number[] }[] = [];

  const allowedGap = (pattern: TPattern, slot: number) => {
    if (slot !== 1) return 0;
    const [, kind, , verb] = entries[pattern.entry];
    if (language === "en") {
      const particle = pattern.slots[1];
      return kind === "p" && pattern.slots.length === 2 && typeof particle === "string" && EN_PARTICLES.has(particle)
        ? EN_MAX_OBJECT_WORDS
        : 0;
    }
    return VERB_LAST_LANGUAGES.has(language) && verb === 1 ? VERB_LAST_MAX_GAP : 0;
  };
  const canSkip = (token: string) => !(language === "en" && EN_NOT_IN_OBJECT.has(token));

  function match(pattern: TPattern, slot: number, last: number, indexes: number[]): number[] | null {
    if (slot === pattern.slots.length) return indexes;
    const expected = pattern.slots[slot];

    if (typeof expected !== "string") {
      if (expected.includes("any")) {
        for (let end = last + 1; end <= last + MAX_ANY_WORDS && end < tokens.length; end++) {
          if (breaks[end - 1] || !tokens[end]) return null;
          const result = match(pattern, slot + 1, end, indexes);
          if (result) return result;
        }
        return null;
      }
      const next = last + 1;
      if (next >= tokens.length || breaks[last] || !fits(expected, tokens[next], language)) return null;
      return match(pattern, slot + 1, next, [...indexes, next]);
    }

    const gap = allowedGap(pattern, slot);
    for (let next = last + 1; next <= last + 1 + gap && next < tokens.length; next++) {
      if (breaks[next - 1]) return null;
      if (tokens[next] === expected) {
        const result = match(pattern, slot + 1, next, [...indexes, next]);
        if (result) return result;
      }
      if (!canSkip(tokens[next])) return null;
    }
    return null;
  }

  const closesClause = (position: number) =>
    position === tokens.length - 1 || breaks[position] || CLAUSE_STARTERS[language]?.has(tokens[position + 1]);

  tokens.forEach((token, start) => {
    const afterDeterminer =
      language === "en" && start > 0 && !breaks[start - 1] && EN_DETERMINERS.has(tokens[start - 1]);
    for (const pattern of index.byFirstWord.get(token) ?? []) {
      if (afterDeterminer && entries[pattern.entry][3] === 1) continue;
      const indexes = match(pattern, 1, start, [start]);
      if (!indexes) continue;
      if (entries[pattern.entry][1] === "s" && !closesClause(indexes[indexes.length - 1])) continue;
      found.push({ entry: pattern.entry, indexes });
    }
  });

  const span = (match: { indexes: number[] }) => match.indexes[match.indexes.length - 1] - match.indexes[0];
  const hasGap = (match: { indexes: number[] }) => span(match) + 1 > match.indexes.length;
  const kept = found.filter((candidate) =>
    found.every((other) => {
      if (other === candidate || !other.indexes.some((position) => candidate.indexes.includes(position))) return true;
      // A word belongs to the expression that holds it tightest: "turn off", not "do … off" in "Did you turn off"
      if (other.entry !== candidate.entry) return !(hasGap(candidate) && span(other) < span(candidate));
      return (
        other.indexes.length < candidate.indexes.length ||
        (other.indexes.length === candidate.indexes.length && found.indexOf(other) > found.indexOf(candidate))
      );
    }),
  );
  return kept.map(({ entry, indexes }) => ({
    expression: entries[entry][0],
    kind: EXPRESSION_KINDS[entries[entry][1]],
    indexes,
  }));
}

// The expression shown for a hovered word: the one with the most words, then the tightest, then the first
export function expressionAt(matches: TExpressionMatch[], position: number): TExpressionMatch | null {
  const span = (match: TExpressionMatch) => match.indexes[match.indexes.length - 1] - match.indexes[0];
  return (
    matches
      .filter((match) => match.indexes.includes(position))
      .sort((a, b) => b.indexes.length - a.indexes.length || span(a) - span(b) || a.indexes[0] - b.indexes[0])[0] ??
    null
  );
}
