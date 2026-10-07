// How a word of the subtitles and a word of the expression lists (scripts/expressions) are compared: lowercased,
// without the punctuation around it, with straight apostrophes. Russian, Ukrainian and Belarusian lose the stress
// marks Wiktionary puts on their forms, and ё is written as е, like most subtitles do. Italian loses its accents:
// Wiktionary marks the stress of its forms with them ("fàccio").
// No imports: scripts/expressions/build.ts runs it in Node.

const STRESSED_LANGUAGES = new Set(["ru", "uk", "be"]);
const UNACCENTED_LANGUAGES = new Set(["it"]);

// Quotes, brackets, dashes and sentence punctuation around a word; apostrophes and hyphens inside it stay
const EDGE_PUNCTUATION = /^[\s"“”„«»‹›'‘’`´([{¿¡*_~.,;:!?…–—-]+|[\s"“”„«»‹›'‘’`´)\]}*_~.,;:!?…–—-]+$/g;

export function normalizeWord(word: string, language: string): string {
  let normalized = word
    .replace(/[’‘ʼ`´]/g, "'")
    .replace(EDGE_PUNCTUATION, "")
    .toLowerCase();
  if (STRESSED_LANGUAGES.has(language)) {
    normalized = normalized
      .normalize("NFD")
      .replace(/[\u0300\u0301]/g, "")
      .normalize("NFC")
      .replace(/ё/g, "е");
  } else if (UNACCENTED_LANGUAGES.has(language)) {
    normalized = normalized
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .normalize("NFC");
  }
  return normalized;
}

// Words of an expression or of one of its forms
export const expressionWords = (text: string, language: string) =>
  text
    .split(/\s+/)
    .map((word) => normalizeWord(word, language))
    .filter(Boolean);

// A word that ends a clause: the next word can't belong to the same expression
export const endsClause = (word: string) => /[.,;:!?…]["”»’')\]]*$/.test(word.trim());
