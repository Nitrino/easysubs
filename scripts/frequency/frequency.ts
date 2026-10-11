// The pure part of scripts/frequency/build.ts: a frequency list from the counts of words in subtitles and the forms of
// the Wiktionary dictionary
import type { TDictionary } from "../../src/utils/dictionary/format.ts";
import type { TFrequency } from "../../src/utils/frequency/format.ts";
import { normalizeWord } from "../../src/utils/expressions/normalize.ts";

// The dictionary form of a word: its own when Wiktionary has an entry for it ("left", "better"), else the first word
// it's a form of ("went" → "go"), else the word itself
export function lemmaOf(word: string, dictionary: Pick<TDictionary, "words" | "forms">): string {
  if (dictionary.words[word]) return word;
  return dictionary.forms[word]?.[0] ?? word;
}

export function buildFrequency(
  language: string,
  counts: [word: string, count: number][],
  dictionary: Pick<TDictionary, "words" | "forms">,
): TFrequency {
  const lemmaCounts = new Map<string, number>();
  const lemmaOfForm = new Map<string, string>();
  for (const [said, count] of counts) {
    const word = normalizeWord(said, language);
    if (!/\p{L}/u.test(word) || lemmaOfForm.has(word)) continue;
    const lemma = lemmaOf(word, dictionary);
    lemmaOfForm.set(word, lemma);
    lemmaCounts.set(lemma, (lemmaCounts.get(lemma) ?? 0) + count);
  }
  const lemmas = [...lemmaCounts].sort((a, b) => b[1] - a[1]).map(([lemma]) => lemma);
  const index = new Map(lemmas.map((lemma, position) => [lemma, position]));
  const forms: Record<string, number> = {};
  for (const [word, lemma] of lemmaOfForm) forms[word] = index.get(lemma)!;
  return {
    language,
    source:
      "OpenSubtitles 2018 word counts by hermitdave/FrequencyWords, forms from Wiktionary (kaikki.org, Wiktextract)",
    license: "CC BY-SA 4.0",
    lemmas,
    forms,
  };
}
