import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { indexLexicon, type TExpressionIndex } from "@src/utils/expressions/findExpressions";
import { lexiconPath, type TLexicon } from "@src/utils/expressions/lexicon";

// The expression lists of public/expressions, as the background loads them
const lexicons = new Map<string, TLexicon>();
const indexes = new Map<string, TExpressionIndex>();

export function lexicon(language: string): TLexicon {
  if (!lexicons.has(language)) {
    const file = resolve(import.meta.dirname, "../public", lexiconPath(language));
    lexicons.set(language, JSON.parse(readFileSync(file, "utf8")));
  }
  return lexicons.get(language);
}

export function lexiconIndex(language: string): TExpressionIndex {
  if (!indexes.has(language)) indexes.set(language, indexLexicon(lexicon(language)));
  return indexes.get(language);
}
