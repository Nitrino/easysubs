import { TPhrasalVerb } from "@src/models/types";
import { PHRASAL_VERBS } from "./phrasalVerbs";
import { textToWords } from "./textToWords";
import { cleanWord } from "./cleanWord";

// The words of a phrasal verb may have one word between them: "pick it up"
const MAX_WORD_DISTANCE = 2;

// Indexes of the phrasal verb's words in the text, in order and close to each other
const findWords = (words: string[], phrasalVerbWords: string[]): number[] | null => {
  const [first, ...rest] = phrasalVerbWords;
  for (let start = words.indexOf(first); start !== -1; start = words.indexOf(first, start + 1)) {
    const indexes = [start];
    for (const word of rest) {
      const previous = indexes[indexes.length - 1];
      const offset = words.slice(previous + 1, previous + 1 + MAX_WORD_DISTANCE).indexOf(word);
      if (offset === -1) break;
      indexes.push(previous + 1 + offset);
    }
    if (indexes.length === phrasalVerbWords.length) return indexes;
  }
  return null;
};

export const findPhrasalVerbs = (text: string): TPhrasalVerb[] => {
  // Lowercased, so a phrasal verb that starts a sentence is found too
  const words = textToWords(text).map((w) => cleanWord(w).toLowerCase());
  const foundPhrasalVerbs: TPhrasalVerb[] = [];

  Object.entries(PHRASAL_VERBS).forEach(([key, item]) => {
    const phrasalVerbList: string[] = [key, ...(item["derivatives"] ?? [])];
    for (const phrasalVerb of phrasalVerbList) {
      const indexes = findWords(words, phrasalVerb.match(/[^ ]+/g));
      if (indexes) {
        foundPhrasalVerbs.push({
          key: key,
          text: phrasalVerb,
          indexes: indexes,
          translations: item["translations"] as string[],
        });
      }
    }
  });

  return foundPhrasalVerbs;
};
