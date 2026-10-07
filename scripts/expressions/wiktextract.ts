// Turns Wiktextract records (Wiktionary entries as JSON, https://kaikki.org) into the entries of an expression list,
// see src/utils/expressions/lexicon.ts. Pure functions, so build.ts only streams the dumps.
import type { TKindCode, TLexiconEntry } from "../../src/utils/expressions/lexicon.ts";
import { expressionWords } from "../../src/utils/expressions/normalize.ts";
import { HEAD_VERB_LANGUAGES, headVerb } from "../../src/utils/expressions/verbHeads.ts";

export type TWiktextractRecord = {
  word: string;
  pos: string;
  lang_code: string;
  forms?: { form: string; tags?: string[] }[];
  senses?: { tags?: string[]; glosses?: string[]; categories?: (string | { name: string })[] }[];
  categories?: (string | { name: string })[];
};

// Parts of speech of the multi-word entries kept as they are; nouns, adjectives and others only when idiomatic,
// or the list fills up with compounds like "ice cream" that translate word by word
const PHRASE_POS = new Set(["verb", "phrase", "prep_phrase", "adv", "adv_phrase", "intj", "conj", "prep", "proverb"]);
const MAX_WORDS = 7;
const MAX_PROVERB_WORDS = 6;

// Forms that aren't words of the language, or too rare to show up in subtitles
const SKIPPED_FORM_TAGS = new Set([
  "table-tags",
  "inflection-template",
  "class",
  "auxiliary",
  "romanization",
  "rare",
  "archaic",
  "obsolete",
  "dated",
  "nonstandard",
  "misspelling",
]);
const SKIPPED_SENSE_TAGS = new Set(["obsolete", "archaic", "misspelling"]);

// Phrases made only of these ("to the", "out of", "this is someone") are in every other English line and translate
// word by word. Idioms and phrasal verbs among them ("at all", "come on") stay.
const FUNCTION_WORDS: Record<string, Set<string>> = {
  en: new Set(
    `a an the to of in on at by for with from into onto out up down off over about as and or but if so than that this
    these those it is are was were be been am i you he she we they me him her us them my your his its our their what
    which who where when how not no do does did have has had will would can could shall should may might must there
    here someone somebody something one's`.split(/\s+/),
  ),
};

// Languages whose verbs split off a particle: "anrufen" → "ich rufe dich an"
const SEPARABLE_VERB_LANGUAGES = new Set(["de", "nl"]);

const categoryNames = (record: TWiktextractRecord) =>
  [...(record.categories ?? []), ...(record.senses ?? []).flatMap((sense) => sense.categories ?? [])].map((category) =>
    typeof category === "string" ? category : category.name,
  );

const isIdiomatic = (record: TWiktextractRecord) =>
  (record.senses ?? []).some((sense) => sense.tags?.includes("idiomatic")) ||
  categoryNames(record).some((name) => name.includes(" idioms"));

// Entries whose every sense is obsolete, archaic or a misspelling are left out
const hasCurrentSense = (record: TWiktextractRecord) =>
  (record.senses ?? []).some(
    (sense) => sense.glosses?.length && !(sense.tags ?? []).some((tag) => SKIPPED_SENSE_TAGS.has(tag)),
  );

// Inflected forms have entries of their own ("fällt um" of "umfallen"); the lemma's entry lists them
const isFormOf = (record: TWiktextractRecord) =>
  (record.senses ?? []).length > 0 && (record.senses ?? []).every((sense) => sense.tags?.includes("form-of"));

// Numbers, brackets, slashes and ellipses mark templates and abbreviations rather than words
const isPlainText = (text: string) => !/[0-9/()[\]{}<>…=+&@#%]|\.\.\./.test(text);

function kindOf(record: TWiktextractRecord): TKindCode {
  if (categoryNames(record).some((name) => name.includes(" phrasal verbs"))) return "p";
  return isIdiomatic(record) ? "i" : "e";
}

// The forms Wiktionary lists for the entry, normalized, with `minWords` to `maxWords` words
function wordForms(record: TWiktextractRecord, minWords: number, maxWords = MAX_WORDS) {
  const language = record.lang_code;
  return (record.forms ?? [])
    .filter((form) => form.form && !(form.tags ?? []).some((tag) => SKIPPED_FORM_TAGS.has(tag)))
    .filter((form) => isPlainText(form.form))
    .map((form) => expressionWords(form.form, language))
    .filter((words) => words.length >= minWords && words.length <= maxWords)
    .map((words) => words.join(" "));
}

// A multi-word verb, idiom or phrase, or a separable verb with its split forms; null for anything else
export function lexiconEntry(record: TWiktextractRecord): TLexiconEntry | null {
  const title = record.word?.trim();
  if (!title || !isPlainText(title) || !hasCurrentSense(record) || isFormOf(record)) return null;
  const words = expressionWords(title, record.lang_code);
  const verb = record.pos === "verb";

  if (words.length === 1) {
    if (!verb || !SEPARABLE_VERB_LANGUAGES.has(record.lang_code)) return null;
    // "rufe an", "rief an": the verb, then its particle, which is how the word starts
    const splitForms = wordForms(record, 2).filter((form) => {
      const [, particle, ...rest] = form.split(" ");
      return rest.length === 0 && particle.length < words[0].length && words[0].startsWith(particle);
    });
    return splitForms.length > 0 ? [title, "s", unique(splitForms), 1] : null;
  }

  if (words.length > MAX_WORDS) return null;
  if (record.pos === "proverb" && words.length > MAX_PROVERB_WORDS) return null;
  const kind = kindOf(record);
  if (!PHRASE_POS.has(record.pos) && kind !== "i") return null;
  const functionWords = FUNCTION_WORDS[record.lang_code];
  if (kind === "e" && functionWords && words.every((word) => functionWords.has(word))) return null;

  const base = words.join(" ");
  const forms = withoutLongerForms(base, unique(wordForms(record, 2)));
  return verb ? [title, kind, forms, 1] : forms.length > 0 ? [title, kind, forms] : [title, kind];
}

const unique = <T>(values: T[]) => [...new Set(values)];

const containsWords = (form: string, part: string) => ` ${form} `.includes(` ${part} `);

// A form that contains the base or another form is found through that one: "hat ins gras gebissen" through
// "ins gras gebissen"
function withoutLongerForms(base: string, forms: string[]) {
  const shorter = [base, ...forms];
  return forms.filter(
    (form) => form !== base && !shorter.some((other) => other !== form && containsWords(form, other)),
  );
}

// A one-word verb and its one-word forms, for the expressions it starts (see verbHeads.ts); null for anything else
export function verbForms(record: TWiktextractRecord): [lemma: string, forms: string[]] | null {
  if (record.pos !== "verb" || !HEAD_VERB_LANGUAGES.has(record.lang_code) || isFormOf(record)) return null;
  const words = expressionWords(record.word ?? "", record.lang_code);
  if (words.length !== 1 || !isPlainText(record.word)) return null;
  const forms = unique(wordForms(record, 1, 1)).filter((form) => form !== words[0]);
  return forms.length > 0 ? [words[0], forms] : null;
}

// The forms of the verbs that start the list's verb expressions
export function headVerbForms(entries: TLexiconEntry[], verbs: Map<string, string[]>, language: string) {
  const used: Record<string, string[]> = {};
  for (const [base, , , verb] of entries) {
    if (verb !== 1) continue;
    const head = headVerb(expressionWords(base, language), language, (lemma) => verbs.has(lemma));
    if (head) used[head.lemma] = verbs.get(head.lemma);
  }
  return Object.fromEntries(Object.entries(used).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
}

// Kinds that win when one expression has several entries ("pick up" the phrasal verb and the noun)
const KIND_PRIORITY: TKindCode[] = ["p", "s", "i", "e"];

// Entries of the same expression merged into one, sorted for stable diffs
export function mergeEntries(entries: TLexiconEntry[], language: string): TLexiconEntry[] {
  const merged = new Map<string, TLexiconEntry>();
  for (const entry of entries) {
    const key = entry[0];
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, entry);
      continue;
    }
    const kind = KIND_PRIORITY.find((code) => code === existing[1] || code === entry[1]);
    const base = expressionWords(key, language).join(" ");
    const forms = withoutLongerForms(base, unique([...(existing[2] ?? []), ...(entry[2] ?? [])]));
    const verb = existing[3] === 1 || entry[3] === 1;
    merged.set(key, verb ? [key, kind, forms, 1] : forms.length > 0 ? [key, kind, forms] : [key, kind]);
  }
  return [...merged.values()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
}

// The list as JSON with one expression or verb per line, so a rebuild shows up in diffs line by line
export function serializeLexicon(
  header: Record<string, string>,
  entries: TLexiconEntry[],
  verbs: Record<string, string[]>,
) {
  const head = Object.entries(header)
    .map(([key, value]) => `  ${JSON.stringify(key)}: ${JSON.stringify(value)},`)
    .join("\n");
  const expressions = entries.map((entry) => `    ${JSON.stringify(entry)}`).join(",\n");
  const verbLines = Object.entries(verbs)
    .map(([lemma, forms]) => `    ${JSON.stringify(lemma)}: ${JSON.stringify(forms)}`)
    .join(",\n");
  return `{\n${head}\n  "expressions": [\n${expressions}\n  ],\n  "verbs": {\n${verbLines}\n  }\n}\n`.replace(
    '"verbs": {\n\n  }',
    '"verbs": {}',
  );
}
