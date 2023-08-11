import { TPhrasalVerb } from "@src/models/types";
import { PHRASAL_VERBS } from "./phrasalVerbs";
import { textToWords } from "./textToWords";
import { cleanWord } from "./cleanWord";

export const findPhrasalVerbs = (text: string): TPhrasalVerb[] => {
  const words = textToWords(text).map((w) => cleanWord(w));
  const foundPhrasalVerbs: TPhrasalVerb[] = [];

  Object.entries(PHRASAL_VERBS).forEach(([key, item]) => {
    const phrasalVerbList: string[] = [key, ...(item["derivatives"] ?? [])];
    for (const phrasalVerb of phrasalVerbList) {
      const phrasalVerbWords = phrasalVerb.match(/[^ ]+/g);
      if (words.includes(phrasalVerbWords[0])) {
        const phrasalVerbIncluded = phrasalVerbWords.every((v) => words.includes(v));
        if (phrasalVerbIncluded) {
          const indexes = phrasalVerbWords.map((v) => words.findIndex((w) => w === v));
          const isSorted = indexes.every((v, i, a) => !i || a[i - 1] <= v);
          const checkWordProximity = indexes.every((v, index) =>
            indexes[index + 1] ? indexes[index + 1] - v <= 2 : true
          );

          if (isSorted && checkWordProximity) {
            foundPhrasalVerbs.push({
              key: key,
              text: phrasalVerb,
              indexes: indexes,
              translations: item["translations"] as string[],
            });
          }
        }
      }
    }
  });

  return foundPhrasalVerbs;
};
