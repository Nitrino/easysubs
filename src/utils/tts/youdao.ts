import { baseLanguage, readSpeech, TSpeechRequest } from "./speech";

// Youdao's dictionary: English words in the American voice (type=2, type=1 is British), other languages by le=. It
// answers JSON errors for languages it has no voice for (pt, nl, uk) and for words that aren't in its dictionary.
export async function fetchYoudaoSpeech({ text, lang }: TSpeechRequest) {
  const language = baseLanguage(lang);
  const params = new URLSearchParams(language === "en" ? { audio: text, type: "2" } : { audio: text, le: language });
  const response = await fetch(`https://dict.youdao.com/dictvoice?${params}`);
  return readSpeech(response, "Youdao", text);
}
