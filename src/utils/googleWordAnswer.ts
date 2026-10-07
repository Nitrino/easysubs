import type { TPartOfSpeach, TTranslateAlternative, TWordTranslationItem } from "@src/models/types";
import { googleNumberToPartOfSpeach } from "./googleNumberToPartOfSpeach";

const MAX_ALTERNATIVES = 5;

// Google Translate's answer to the background's `translateWordFull` (its batchexecute payload): the transcription,
// the main translation and the five most common other translations with their parts of speech
export function parseGoogleWordAnswer(result: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const answer = result as any;
  const transcription: string = answer[0][0];
  const mainTranslation: string = answer[1][0][0][5][0][0];
  const alternativesRaw: TTranslateAlternative[] = answer[3]?.[5]?.[0] || [];
  const translations = alternativesRaw
    .flatMap((alternative): TWordTranslationItem[] =>
      alternative[1].map((variant) => ({
        word: variant[0],
        partOfSpeech: googleNumberToPartOfSpeach(alternative[4]) as TPartOfSpeach,
        synonyms: variant[2].slice(0, 3),
        popularity: variant[3],
      })),
    )
    .sort((a, b) => a.popularity - b.popularity)
    .slice(0, MAX_ALTERNATIVES);
  return { transcription, mainTranslation, translations };
}
