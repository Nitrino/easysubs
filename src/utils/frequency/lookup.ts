import { FREQUENCY_LANGUAGES, frequencyPath, type TFrequency } from "./format";
import { normalizeLanguage } from "../languages";
import { normalizeWord } from "../expressions/normalize";

// The background's answers from the frequency lists (public/frequency, see format.ts): the dictionary form and rank
// of the words of the subtitles (`wordRanks`), and words of each frequency band for the level check
// (`frequencySample`). A language's list is loaded once.

export type TFrequencyLoader = (language: string) => Promise<TFrequency>;
// A word's dictionary form and its rank, 1 for the most said
export type TWordRank = [lemma: string, rank: number];

const fetchFrequency: TFrequencyLoader = async (language) => {
  const response = await fetch(chrome.runtime.getURL(frequencyPath(language)));
  if (!response.ok) throw new Error(`No frequency list for "${language}": ${response.status}`);
  return response.json();
};

// The language's list, if it has one: "pt-BR" and "pt" share one
export const frequencyLanguage = (language: string) => {
  const code = normalizeLanguage(language);
  return FREQUENCY_LANGUAGES.includes(code) ? code : null;
};

// The rank of a word of the list, or of a contraction by its parts, as the lists split them ("it's" as "it" and "s",
// "don't" as "don" and "t"): the rarer part's, with the contraction as its own dictionary form
export function rankOf(frequency: TFrequency, word: string): TWordRank | null {
  const index = frequency.forms[word];
  if (index !== undefined) return [frequency.lemmas[index], index + 1];
  if (!word.includes("'")) return null;
  const parts = word.split("'").filter(Boolean);
  if (parts.length < 2) return null;
  let rank = 0;
  for (const part of parts) {
    const found = frequency.forms[part];
    if (found === undefined) return null;
    rank = Math.max(rank, found + 1);
  }
  return [word, rank];
}

// The bands of the level check, by rank: the words the user says they know in each tell how many of its words they know
export const LEVEL_BANDS = [1000, 2000, 3000, 5000, 8000, 12000, 20000];

export function createFrequencyLookup(load: TFrequencyLoader = fetchFrequency) {
  const lists = new Map<string, Promise<TFrequency>>();
  const list = (code: string) => {
    if (!lists.has(code)) {
      const loaded = load(code);
      // A failed load is tried again next time
      loaded.catch(() => lists.delete(code));
      lists.set(code, loaded);
    }
    return lists.get(code)!;
  };

  // Words as the subtitles show them, normalized; the ones the list lacks (names, rare words) aren't in the answer
  const ranks = async (language: string, words: string[]): Promise<Record<string, TWordRank>> => {
    const code = frequencyLanguage(language);
    if (!code) return {};
    const frequency = await list(code);
    const answer: Record<string, TWordRank> = {};
    for (const word of words) {
      const found = rankOf(frequency, normalizeWord(word, code));
      if (found) answer[word] = found;
    }
    return answer;
  };

  // `perBand` words of each band of LEVEL_BANDS, picked at random among words longer than two letters
  const sample = async (language: string, perBand: number, random = Math.random) => {
    const code = frequencyLanguage(language);
    if (!code) return [];
    const { lemmas } = await list(code);
    const words: { word: string; rank: number }[] = [];
    let start = 0;
    for (const end of LEVEL_BANDS) {
      const band = lemmas
        .slice(start, Math.min(end, lemmas.length))
        .map((word, index) => ({ word, rank: start + index + 1 }))
        .filter(({ word }) => [...word].length > 2 && !word.includes("'"));
      for (let picked = 0; picked < perBand && band.length > 0; picked++) {
        words.push(...band.splice(Math.floor(random() * band.length), 1));
      }
      start = end;
    }
    return words;
  };

  return { ranks, sample };
}
