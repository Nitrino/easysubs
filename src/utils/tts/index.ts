import { TTtsService } from "@src/models/types";
import { TSpeech, TSpeechRequest } from "./speech";
import { fetchGoogleSpeech } from "./google";
import { fetchYoudaoSpeech } from "./youdao";
import { fetchWiktionarySpeech } from "./wiktionary";
import { fetchChatGPTSpeech } from "./chatgpt";

// The browser voice speaks in the content script, the rest are fetched by the background
export type TRemoteTtsService = Exclude<TTtsService, "browser">;

const fetchers: Record<TRemoteTtsService, (request: TSpeechRequest) => Promise<TSpeech>> = {
  google: fetchGoogleSpeech,
  youdao: fetchYoudaoSpeech,
  wiktionary: fetchWiktionarySpeech,
  chatgpt: fetchChatGPTSpeech,
};

type TPronounceRequest = {
  text: string;
  language: string;
  service: TRemoteTtsService;
  chatGPTApiKey?: string;
};

// Messages are serialized as JSON, so the audio goes to the content script as a data: URL
export function toDataUrl({ type, data }: TSpeech) {
  const bytes = new Uint8Array(data);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return `data:${type};base64,${btoa(binary)}`;
}

// The chosen service, then Google: Wiktionary has no recordings of many words and Youdao no voices for some languages
export async function fetchSpeech({ text, language, service, chatGPTApiKey }: TPronounceRequest) {
  const services = [...new Set([service in fetchers ? service : "google", "google"])] as TRemoteTtsService[];
  let lastError: unknown;
  for (const name of services) {
    try {
      const speech = await fetchers[name]({ text, lang: language, chatGPTApiKey });
      return { audio: toDataUrl(speech), service: name };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}
