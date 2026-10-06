/**
 * An offline stand-in for src/pages/background: answers the same messages in the shapes the content script parses.
 * Words and lines of the playground's subtitles get the translations from playground/fixtures/translations (see
 * translationPairs.ts); anything else gets a placeholder like `[ru] word`. Used by the e2e tests and
 * `?background=mock`.
 */

import { googleNumberToPartOfSpeach } from "@src/utils/googleNumberToPartOfSpeach";
import { TRANSLATION_PAIRS, type TranslationFixture, type WordTranslation } from "./translationPairs";

type Message = { type: string } & Record<string, unknown>;

const LATENCY_MS = 80;

const fixtures = import.meta.glob<TranslationFixture>("../fixtures/translations/*-*.json", {
  eager: true,
  import: "default",
});
const fixtureFor = (source: string, target: string) => fixtures[`../fixtures/translations/${source}-${target}.json`];

// Part of speech names back to the numbers Google uses, see src/utils/googleNumberToPartOfSpeach.ts
const PART_OF_SPEECH_NUMBERS = new Map(
  Array.from({ length: 19 }, (_, index) => [googleNumberToPartOfSpeach(index + 1), index + 1]),
);

// The language of the subtitles on screen, from the last detection, so a word that exists in several languages
// ("no", "a") is looked up in the right one
let subtitlesLanguage: string | null = null;

export const mockTranslate = (text: string, language: string) => `[${language}] ${text}`;

function guessLanguage(text: string) {
  if (/[а-яё]/i.test(text)) return "ru";
  if (/[äöüß]/i.test(text) || /(^|\s)(der|die|das|und|ich|nicht|ist)(\s|$)/i.test(text)) return "de";
  // Accents alone don't count: English subtitles have words like "café"
  if (/[ñ¿¡]/i.test(text) || /(^|\s)(el|la|los|las|que|está|pero|para|sí)(\s|$)/i.test(text)) return "es";
  return "en";
}

function detectLanguage(text: string) {
  const pair = TRANSLATION_PAIRS.find(([source, target]) => text in (fixtureFor(source, target)?.lines ?? {}));
  return pair ? pair[0] : guessLanguage(text);
}

// Fixtures translating into `target`, the current subtitles' language first
function fixturesInto(target: string) {
  return TRANSLATION_PAIRS.filter(([, pairTarget]) => pairTarget === target)
    .sort(([a], [b]) => Number(b === subtitlesLanguage) - Number(a === subtitlesLanguage))
    .map(([source]) => ({ source, fixture: fixtureFor(source, target) }))
    .filter(({ fixture }) => fixture);
}

function findWord(word: string, target: string) {
  for (const { source, fixture } of fixturesInto(target)) {
    if (fixture.words[word]) return { source, translation: fixture.words[word] };
  }
  return null;
}

function findLine(line: string, target: string) {
  return fixturesInto(target).find(({ fixture }) => line in fixture.lines)?.fixture.lines[line] ?? null;
}

const partsOfSpeech = (translation: WordTranslation) =>
  Object.entries(translation).filter((entry): entry is [string, string[]] => entry[0] !== "main");

// Google's batchexecute payload, reduced to the fields read by fetchWordTranslationFx
function wordFullTranslation(word: string, target: string) {
  const found = findWord(word, target);
  const main = found?.translation.main ?? mockTranslate(word, target);
  const groups = found ? partsOfSpeech(found.translation) : [["noun", [main]] as [string, string[]]];
  const alternatives = groups.map(([partOfSpeech, variants]) => [
    word,
    variants.map((variant, index) => [variant, null, [], index + 1, false]),
    word,
    word,
    PART_OF_SPEECH_NUMBERS.get(partOfSpeech) ?? 0,
  ]);
  return [
    [null],
    [[[null, null, null, null, null, [[main]]]]],
    found?.source ?? guessLanguage(word),
    [null, null, null, null, null, [alternatives]],
  ];
}

function ankiResponse(action: string) {
  switch (action) {
    case "modelNames":
      return { result: ["Easysubs"], error: null };
    case "addNote":
      return { result: Date.now(), error: null };
    default:
      return { result: null, error: null };
  }
}

function handle(message: Message): unknown {
  const text = String(message.text ?? "");
  const language = String(message.language ?? "en");

  switch (message.type) {
    case "translateWord":
      return {
        original: text,
        lang: language,
        main: findWord(text, language)?.translation.main ?? mockTranslate(text, language),
        alternatives: [],
      };
    case "translateWordFull":
      return wordFullTranslation(text, language);
    case "translateFullText": {
      const translation = findLine(text, language) ?? mockTranslate(text, language);
      const service = message.translationService ?? "google";
      return service === "google" ? JSON.stringify({ sentences: [{ trans: translation }] }) : translation;
    }
    case "getTextLanguage":
      subtitlesLanguage = detectLanguage(text);
      return subtitlesLanguage;
    case "post":
      return ankiResponse(String((message.data as { action?: string })?.action));
    case "addWordToLingualeo":
      return { lingualeoResponse: { status: "ok" } };
    case "addWordToPuzzleEnglish":
      return { status: true };
    default:
      return { error: `Mock background: unsupported message type "${message.type}"` };
  }
}

chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  setTimeout(() => sendResponse(handle(message)), LATENCY_MS);
  return true;
});
