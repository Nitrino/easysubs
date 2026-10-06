/**
 * An offline stand-in for src/pages/background: answers the same messages in the shapes the content script
 * parses, with deterministic "translations" (`[ru] word`). Used by the e2e tests and `?background=mock`.
 */

type Message = { type: string } & Record<string, unknown>;

const LATENCY_MS = 80;

// Part of speech numbers as Google returns them, see src/utils/googleNumberToPartOfSpeach.ts
const NOUN = 1;
const VERB = 2;

export const mockTranslate = (text: string, language: string) => `[${language}] ${text}`;

export function detectLanguage(text: string) {
  if (/[а-яё]/i.test(text)) return "ru";
  // Accents alone don't count: English subtitles have words like "café"
  if (/[ñ¿¡]/i.test(text) || /(^|\s)(el|la|los|las|que|está|pero|para|sí)(\s|$)/i.test(text)) return "es";
  return "en";
}

// Google's batchexecute payload, reduced to the fields read by fetchWordTranslationFx
function wordFullTranslation(word: string, language: string) {
  const main = mockTranslate(word, language);
  const alternative = (partOfSpeech: number, variants: string[]) => [
    word,
    variants.map((variant, index) => [variant, null, [`${variant} synonym`], index + 1, false]),
    word,
    word,
    partOfSpeech,
  ];
  return [
    [`/${word}/`],
    [[[null, null, null, null, null, [[main]]]]],
    detectLanguage(word),
    [null, null, null, null, null, [[alternative(NOUN, [main, `${main} 2`]), alternative(VERB, [`${main} (v)`])]]],
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
      return { original: text, lang: language, main: mockTranslate(text, language), alternatives: [] };
    case "translateWordFull":
      return wordFullTranslation(text, language);
    case "translateFullText": {
      const translation = mockTranslate(text, language);
      const service = message.translationService ?? "google";
      return service === "google" ? JSON.stringify({ sentences: [{ trans: translation }] }) : translation;
    }
    case "getTextLanguage":
      return detectLanguage(text);
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
