import { readSpeech, TSpeechRequest } from "./speech";

// The voice of Google Translate's speaker button
export async function fetchGoogleSpeech({ text, lang }: TSpeechRequest) {
  const params = new URLSearchParams({ ie: "UTF-8", client: "tw-ob", tl: lang, q: text });
  const response = await fetch(`https://translate.google.com/translate_tts?${params}`);
  return readSpeech(response, "Google", text);
}
