import { createEffect, createEvent, sample } from "effector";

import { playAudio } from "@src/utils/playAudio";
import { speak } from "@src/utils/speak";
import { $chatGPTApiKey, $ttsService } from "../settings";
import { $subsLanguage } from "../subs";
import { TTtsService } from "../types";

type TPronounceRequest = {
  text: string;
  language: string;
  service: TTtsService;
  chatGPTApiKey: string;
};

type TPronounceResponse = { audio?: string; service?: string; error?: string } | undefined;

const CACHE_SIZE = 50;
// Audio of the words pronounced lately, by service, language and text, so clicking the speaker again plays at once
const cache = new Map<string, string>();

async function fetchAudio({ text, language, service, chatGPTApiKey }: TPronounceRequest) {
  const key = `${service}:${language}:${text}`;
  if (cache.has(key)) return cache.get(key);

  const response: TPronounceResponse = await chrome.runtime.sendMessage({
    type: "pronounce",
    text,
    language,
    service,
    chatGPTApiKey: service === "chatgpt" ? chatGPTApiKey : undefined,
  });
  if (!response?.audio) {
    console.error("Pronunciation failed:", response?.error);
    return undefined;
  }

  cache.set(key, response.audio);
  if (cache.size > CACHE_SIZE) cache.delete(cache.keys().next().value);
  return response.audio;
}

export const wordPronounced = createEvent<string>();

// The browser voice speaks when it's chosen, when every service failed (the background tries Google after the chosen
// one) and before the subtitles' language is detected ("auto"), which the services need
export const pronounceFx = createEffect(async (request: TPronounceRequest) => {
  const { text, language, service } = request;
  const audio = service === "browser" || language === "auto" ? undefined : await fetchAudio(request);
  if (audio) {
    try {
      return await playAudio(audio);
    } catch (error) {
      console.error("Pronunciation audio can't be played:", error);
    }
  }
  speak(text, language);
});

sample({
  clock: wordPronounced,
  source: { service: $ttsService, language: $subsLanguage, chatGPTApiKey: $chatGPTApiKey },
  fn: (settings, text) => ({ ...settings, text }),
  target: pronounceFx,
});
