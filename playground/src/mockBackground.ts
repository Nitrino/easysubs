/**
 * An offline stand-in for src/pages/background: answers the same messages in the shapes the content script parses.
 * Words and lines of the playground's subtitles get the translations from playground/fixtures/translations (see
 * translationPairs.ts); anything else gets a placeholder like `[ru] word`. Used by the e2e tests, the unit tests and
 * `?background=mock`. Tests replace answers through `window.easysubsPlayground.mockAnswers`, see answerOverride().
 */

import { googleNumberToPartOfSpeach } from "@src/utils/googleNumberToPartOfSpeach";
import { createExpressionFinder } from "@src/utils/expressions/lookup";
import { ANKI_MODEL_FIELDS } from "@src/learning-service/ankiNote";
import type { TLexicon } from "@src/utils/expressions/lexicon";
import type { TExpressionTranslation } from "@src/models/types";
import type { TKeptFile } from "@src/utils/onDeviceFiles";
import { groupDownloads } from "@src/utils/downloads";
import { TRANSLATION_PAIRS, type TranslationFixture, type WordTranslation } from "./translationPairs";
import {
  downloadSubtitle,
  lookupTitle,
  opensubtitlesLogin,
  opensubtitlesLogout,
  searchSubtitles,
} from "./mockSubtitles";

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

// What the on-device translators keep on the device: the en-ru dictionary, Bergamot's en-ru model used today and its
// es-en one 12 days ago, with their real sizes
const DAY_MS = 24 * 60 * 60 * 1000;
const RELEASES = "https://github.com/Nitrino/easysubs/releases/download";
const modelFiles = (pair: string, sizes: number[], used: number): TKeptFile[] =>
  ["model.bin", "lex.bin", "vocab.spm"].map((name, index) => ({
    url: `${RELEASES}/bergamot-models-1/${pair}.${name}`,
    size: sizes[index],
    used,
  }));
let keptFiles: TKeptFile[] = [
  { url: `${RELEASES}/dictionaries-1/en-ru.json.gz`, size: 4969946, used: Date.now() },
  ...modelFiles("en-ru", [42992955, 2768468, 904455], Date.now()),
  ...modelFiles("es-en", [31561787, 4636248, 816054], Date.now() - 12 * DAY_MS),
];

let tone: string | undefined;

// What every pronunciation service "says" offline: a short beep, as a WAV data: URL like the background's audio
export function toneWav() {
  if (tone) return tone;
  const sampleRate = 22050;
  const samples = Math.round(sampleRate * 0.25);
  const view = new DataView(new ArrayBuffer(44 + samples * 2));
  const writeText = (offset: number, text: string) =>
    [...text].forEach((char, index) => view.setUint8(offset + index, char.charCodeAt(0)));
  writeText(0, "RIFF");
  view.setUint32(4, 36 + samples * 2, true);
  writeText(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, samples * 2, true);
  for (let i = 0; i < samples; i++) {
    const fade = Math.min(1, i / 400, (samples - i) / 400);
    view.setInt16(44 + i * 2, Math.sin((2 * Math.PI * 660 * i) / sampleRate) * 8000 * fade, true);
  }
  tone = `data:audio/wav;base64,${btoa(String.fromCharCode(...new Uint8Array(view.buffer)))}`;
  return tone;
}

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

// The extension's own expression lists and matcher: phrasal verbs and idioms are found offline as in the extension
const lexicons = import.meta.glob<TLexicon>("../../public/expressions/*.json", { import: "default" });
const findExpressionsInCues = createExpressionFinder(async (language) => {
  const load = lexicons[`../../public/expressions/${language}.json`];
  if (!load) throw new Error(`Mock background: no expressions for "${language}"`);
  return load();
});

// The Wiktionary dictionary's answer, from the words of the fixtures: a meaning per translation, like Google's rows
function dictionaryAnswer(text: string, target: string) {
  const found = findWord(text.toLowerCase(), target);
  if (!found) return null;
  return {
    word: text,
    transcription: "",
    entries: partsOfSpeech(found.translation).map(([partOfSpeech, variants]) => [
      DICTIONARY_POS[partOfSpeech] ?? partOfSpeech,
      variants.map((variant) => [[variant]]),
    ]),
  };
}
// The fixtures name parts of speech like the popover, the dictionary like Wiktionary
const DICTIONARY_POS: Record<string, string> = {
  adjective: "adj",
  adverb: "adv",
  pronoun: "pron",
  preposition: "prep",
  conjunction: "conj",
  interjection: "intj",
  numeral: "num",
};

// Bergamot's translations of lines, like Google's. In HTML mode the marked words of a line come back marked, as their
// translation from the words of the fixtures with a "↳" to tell it from the word's own, so the popover gets the word's
// translation "in its line".
function bergamotAnswer(request: { type: string; texts?: string[]; to?: string; html?: boolean }) {
  const target = request.to ?? "";
  if (request.type === "translate" && request.html) {
    return {
      result: (request.texts ?? []).map((line) => {
        // A word alone comes back as its translation
        if (!line.includes("<b>"))
          return findWord(line.toLowerCase(), target)?.translation.main ?? mockTranslate(line, target);
        const marked = Array.from(line.matchAll(/<b>(.*?)<\/b>/g), (match) => match[1]).join(" ");
        const found = findWord(marked.toLowerCase(), target);
        return `<b>${found ? `↳${found.translation.main}` : mockTranslate(marked, target)}</b>`;
      }),
    };
  }
  if (request.type === "translate") {
    return { result: (request.texts ?? []).map((line) => findLine(line, target) ?? mockTranslate(line, target)) };
  }
  if (request.type === "status") return { result: { state: "ready" } };
  return { result: null };
}

// ChatGPT's translations of a line's expressions, from the words of the fixtures (they have "pick up" and others)
function expressionTranslations(expressions: string[], target: string) {
  return Object.fromEntries(
    expressions.map((expression): [string, TExpressionTranslation] => {
      const found = findWord(expression, target)?.translation;
      const main = found?.main ?? mockTranslate(expression, target);
      const alternatives = found ? partsOfSpeech(found).flatMap(([, variants]) => variants) : [];
      return [
        expression,
        { main, alternatives: alternatives.filter((text) => text !== main).map((text) => ({ text })) },
      ];
    }),
  );
}

// AnkiConnect with the Easysubs note type and no notes yet
function ankiResponse(action: string, params: Record<string, unknown> = {}) {
  switch (action) {
    case "modelNames":
      return { result: ["Easysubs"], error: null };
    case "modelFieldNames":
      return { result: ANKI_MODEL_FIELDS, error: null };
    case "findNotes":
      return { result: [], error: null };
    case "storeMediaFile":
      return { result: params.filename, error: null };
    case "addNote":
      return { result: Date.now(), error: null };
    default:
      return { result: null, error: null };
  }
}

// An answer set by a test, by message type ("translateFullText") or, for AnkiConnect, by action ("post:addNote")
function answerOverride(message: Message) {
  const answers = window.easysubsPlayground?.mockAnswers ?? {};
  const action = message.type === "post" ? (message.data as { action?: string })?.action : undefined;
  const key = [action && `post:${action}`, message.type].find((name) => name && name in answers);
  return key ? { found: true, answer: answers[key] } : { found: false };
}

function handle(message: Message): unknown {
  const override = answerOverride(message);
  if (override.found) return override.answer;

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
      // A word or expression translated as text gets its main translation from the words of the fixtures
      const translation =
        findLine(text, language) ??
        findWord(text.toLowerCase(), language)?.translation.main ??
        mockTranslate(text, language);
      const service = message.translationService ?? "google";
      return service === "google" ? JSON.stringify({ sentences: [{ trans: translation }] }) : translation;
    }
    case "translateBatch":
      return ((message.texts as string[]) ?? []).map(
        (line) => findLine(line, language) ?? mockTranslate(line, language),
      );
    case "getTextLanguage":
      subtitlesLanguage = detectLanguage(text);
      return subtitlesLanguage;
    case "findExpressions":
      return findExpressionsInCues(language, (message.cues as string[][]) ?? []);
    case "translateExpressions":
      return expressionTranslations((message.expressions as string[]) ?? [], language);
    case "dictionaryLookup":
      return { answer: dictionaryAnswer(text, String(message.to ?? "")) };
    case "dictionaryStatus":
      return { state: "ready" };
    case "downloads":
      return { downloads: groupDownloads(keptFiles) };
    case "deleteDownloads": {
      const urls = groupDownloads(keptFiles)
        .filter((download) => ((message.ids as string[]) ?? []).includes(download.id))
        .flatMap((download) => download.urls);
      keptFiles = keptFiles.filter((file) => !urls.includes(file.url));
      return { downloads: groupDownloads(keptFiles) };
    }
    case "bergamot":
      return bergamotAnswer(message.request as { type: string });
    case "ollamaModels":
      return { models: ["translategemma:4b", "gemma3:4b"] };
    // ChatGPT and Ollama look a word up like a dictionary
    case "chatGPTWord":
    case "ollamaWord": {
      const target = String(message.to ?? "");
      const found = findWord(text.toLowerCase(), target);
      const main = found?.translation.main ?? mockTranslate(text, target);
      return {
        translation: {
          source: text.toLowerCase(),
          mainTranslation: main,
          targetLanguage: target,
          translations: [{ word: main, partOfSpeech: "unknown", synonyms: [], popularity: 0 }],
          transcription: "",
          // Given the line, also the word as it's used there
          ...(message.line ? { inLine: `↳${main}` } : {}),
        },
      };
    }
    case "post": {
      const { action, params } = (message.data ?? {}) as { action?: string; params?: Record<string, unknown> };
      return ankiResponse(String(action), params);
    }
    case "addWordToLingualeo":
      return { lingualeoResponse: { status: "ok", data: [{ word: { wordValue: message.word } }] } };
    case "addWordToPuzzleEnglish":
      return { status: true };
    case "pronounce":
      return { audio: toneWav(), service: message.service ?? "google" };
    // Subtitles found online, see mockSubtitles.ts
    case "lookupTitle":
      return lookupTitle(message);
    case "searchSubtitles":
      return searchSubtitles(message);
    case "downloadSubtitle":
      return downloadSubtitle(message);
    case "opensubtitlesLogin":
      return opensubtitlesLogin(message);
    case "opensubtitlesLogout":
      return opensubtitlesLogout();
    // Yandex knows nothing of the playground's videos; tests answer with words of their own
    case "yandexWordTimes":
      return { words: [] };
    default:
      return { error: `Mock background: unsupported message type "${message.type}"` };
  }
}

chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  Promise.resolve(handle(message))
    .catch((error: Error) => ({ error: error.message }))
    .then((answer) => setTimeout(() => sendResponse(answer), LATENCY_MS));
  return true;
});
