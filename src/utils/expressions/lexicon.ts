import type { TExpressionKind } from "@src/models/types";

// The expression lists in public/expressions/<language>.json, built from Wiktionary by scripts/expressions/build.ts:
// multi-word verbs, idioms and set phrases, and German and Dutch separable verbs, with their inflected forms.

// Languages with a list, see scripts/expressions/build.ts
export const EXPRESSION_LANGUAGES = ["en", "de", "es", "fr", "it", "pt", "ru", "nl"];

export type TKindCode = "p" | "i" | "s" | "e";

export const EXPRESSION_KINDS: Record<TKindCode, TExpressionKind> = {
  p: "phrasal verb",
  i: "idiom",
  s: "separable verb",
  e: "expression",
};

// [base form as Wiktionary writes it, kind, other forms (normalized, see normalize.ts), 1 for verbs]
export type TLexiconEntry = [base: string, kind: TKindCode, forms?: string[], verb?: 1];

export type TLexicon = {
  language: string;
  source: string;
  license: string;
  expressions: TLexiconEntry[];
  // The forms of the verbs that start verb expressions without forms of their own, see verbHeads.ts
  verbs: Record<string, string[]>;
};

export const lexiconPath = (language: string) => `expressions/${language}.json`;
