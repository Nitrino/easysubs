import type { TExpressionMatch } from "@src/models/types";
import { findExpressions, indexLexicon, type TExpressionIndex } from "./findExpressions";
import { EXPRESSION_LANGUAGES, lexiconPath, type TLexicon } from "./lexicon";
import { normalizeLanguage } from "../languages";

export type TLexiconLoader = (language: string) => Promise<TLexicon>;

// The list of a language from the extension's files (public/expressions)
const fetchLexicon: TLexiconLoader = async (language) => {
  const response = await fetch(chrome.runtime.getURL(lexiconPath(language)));
  if (!response.ok) throw new Error(`No expressions for "${language}": ${response.status}`);
  return response.json();
};

// The language's list, if it has one: "pt-BR" and "pt" share one
export const expressionLanguage = (language: string) => {
  const code = normalizeLanguage(language);
  return EXPRESSION_LANGUAGES.includes(code) ? code : null;
};

// The background's answer to `findExpressions`: the expressions of each cue, given as its words. A language's list is
// loaded and indexed once, on its first cues; languages without a list have none.
export function createExpressionFinder(load: TLexiconLoader = fetchLexicon) {
  const indexes = new Map<string, Promise<TExpressionIndex>>();

  return async (language: string, cues: string[][]): Promise<TExpressionMatch[][]> => {
    const code = expressionLanguage(language);
    if (!code) return cues.map(() => []);
    if (!indexes.has(code)) {
      const index = load(code).then(indexLexicon);
      // A failed load is tried again with the next cues
      index.catch(() => indexes.delete(code));
      indexes.set(code, index);
    }
    const index = await indexes.get(code);
    return cues.map((words) => findExpressions(index, words));
  };
}
