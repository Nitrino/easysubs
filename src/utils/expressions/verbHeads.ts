// Many verb expressions have no forms of their own in Wiktionary ("бить баклуши", "faire semblant"); their verb is
// conjugated with the forms of the verb itself, which the lists keep under "verbs". This finds that verb.
// No imports with aliases: scripts/expressions/build.ts runs it in Node.

// Languages whose verb expressions start with the verb and get its forms
export const HEAD_VERB_LANGUAGES = new Set(["es", "fr", "it", "pt", "ru"]);

// French expressions start with the reflexive or adverbial pronoun that goes before the conjugated verb: "se rendre
// compte" → "je me suis rendu compte"
const FRENCH_PRONOUNS = new Set(["se", "s'", "s'en", "s'y", "en", "y"]);

export type THeadVerb = {
  // The verb's dictionary form, the key of its forms
  lemma: string;
  // Words of the expression after the verb
  rest: string[];
};

// The verb an expression starts with, given its words (normalized) and whether a verb has forms in the list
export function headVerb(words: string[], language: string, isVerb: (lemma: string) => boolean): THeadVerb | null {
  if (!HEAD_VERB_LANGUAGES.has(language)) return null;
  let start = 0;
  if (language === "fr") while (start < words.length - 1 && FRENCH_PRONOUNS.has(words[start])) start++;
  const [first, ...rest] = words.slice(start);
  if (!first || rest.length === 0) return null;

  for (const lemma of lemmaCandidates(first, language)) {
    if (isVerb(lemma)) return { lemma, rest };
  }
  return null;
}

// The word itself, or the infinitive without the reflexive pronoun attached to it
function lemmaCandidates(word: string, language: string) {
  const candidates = [word];
  // darse → dar, irse → ir
  if (language === "es" && word.endsWith("se")) candidates.push(word.slice(0, -2));
  // tenersi → tenere, farsi → fare
  if (language === "it" && word.endsWith("si")) candidates.push(`${word.slice(0, -2)}e`);
  // dar-se → dar
  if (language === "pt" && word.includes("-")) candidates.push(word.split("-")[0]);
  return candidates;
}
