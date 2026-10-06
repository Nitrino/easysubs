import { readSpeech, TSpeechRequest } from "./speech";

const MODEL = "gpt-4o-mini-tts";
const VOICE = "coral";

function languageName(lang: string) {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(lang) ?? lang;
  } catch {
    return lang;
  }
}

// OpenAI's speech model with the user's key; told the language so it doesn't read a word with an English accent
export async function fetchChatGPTSpeech({ text, lang, chatGPTApiKey }: TSpeechRequest) {
  if (!chatGPTApiKey) {
    throw new Error("ChatGPT API key is required for pronunciation");
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${chatGPTApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      voice: VOICE,
      input: text,
      instructions: `Say this ${languageName(lang)} word or phrase clearly, like a native speaker. Say nothing else.`,
      response_format: "mp3",
    }),
  });
  if (response.status === 401) {
    throw new Error("Invalid OpenAI API key");
  }
  if (!response.ok) {
    const error = await response.json().catch(() => undefined);
    throw new Error(`ChatGPT: ${error?.error?.message ?? `request failed with status ${response.status}`}`);
  }
  return readSpeech(response, "ChatGPT", text);
}
