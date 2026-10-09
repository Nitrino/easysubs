import type { TWordTranslation } from "@src/models/types";
import { languageName } from "./languages";
import { partOfSpeech } from "./dictionary/lookup";
import { repeatsTranslation } from "./wordInLine";

// A hovered word looked up like in a dictionary by a language model, ChatGPT (src/utils/chatGPTWord.ts) or the user's
// Ollama (src/utils/ollama.ts): the same request to either, and their JSON answer as the word popover shows it.

const MAX_MEANINGS = 6;

export const WORD_INSTRUCTIONS = `You are a bilingual dictionary for someone learning a language from films. You get \
a word, its language, the learner's language and, when known, the subtitle line the word is in. Answer with JSON only: \
{"lemma":"<dictionary form of the word>","transcription":"<IPA without slashes, or empty>","inLine":"<the word's \
translation as it's used in the line, in the form the line needs; empty without a line>","meanings":[{"translation":\
"<in dictionary form>","partOfSpeech":"noun|verb|adj|adv|pron|prep|conj|intj|det|num|phrase","note":"<a few words in \
the learner's language telling this meaning apart>"}]}. Give up to ${MAX_MEANINGS} meanings, the most common first, \
translations in the learner's language.`;

// `line`: the subtitle line the word is in, when it was hovered in one
export type TWordRequest = { text: string; from: string; to: string; line?: string };

export const wordQuestion = ({ text, from, to, line }: TWordRequest) => ({
  word: text,
  language: languageName(from),
  learnerLanguage: languageName(to),
  ...(line && { line }),
});

export type TWordAnswer = {
  lemma?: string;
  transcription?: string;
  inLine?: string;
  meanings?: { translation?: string; partOfSpeech?: string; note?: string }[];
};

// `model` names who answered, for the error when nothing came back
export function wordTranslation(
  answer: TWordAnswer,
  { text, to, line }: TWordRequest,
  model: string,
): TWordTranslation {
  const translations = (answer.meanings ?? [])
    .filter((meaning) => typeof meaning.translation === "string" && meaning.translation.trim())
    .slice(0, MAX_MEANINGS)
    .map((meaning, index) => ({
      word: meaning.translation!.trim(),
      partOfSpeech: partOfSpeech(String(meaning.partOfSpeech ?? "")),
      synonyms: [],
      popularity: index,
      ...(meaning.note && { note: String(meaning.note) }),
    }));
  if (translations.length === 0) throw new Error(`${model} didn't translate the word`);
  const lemma = typeof answer.lemma === "string" ? answer.lemma.trim() : "";
  // The translation in the line, unless it only repeats the first meaning
  const first = translations[0];
  const inLine = line && typeof answer.inLine === "string" ? answer.inLine.trim() : "";
  const showsInLine = inLine && !repeatsTranslation(inLine, [first.word, ...first.synonyms]);
  return {
    source: text.toLowerCase(),
    mainTranslation: translations[0].word,
    targetLanguage: to,
    translations,
    transcription: typeof answer.transcription === "string" ? answer.transcription.replace(/^[/[]|[/\]]$/g, "") : "",
    ...(lemma && lemma.toLowerCase() !== text.toLowerCase() && { lemma }),
    ...(showsInLine && { inLine }),
  };
}
