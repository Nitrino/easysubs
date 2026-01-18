import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

import {
  type TWordTranslate,
  googleTranslateBatchFetcher,
} from "@src/utils/googleTranslateBatchFetcher";
import { googleTranslateSingleFetcher } from "@src/utils/googleTranslateSingleFetcher";
import { deeplTranslateFetcher } from "@src/utils/deeplTranslateFetcher";
import { bingTranslateFetcher } from "@src/utils/bingTranslateFetcher";
import { yandexTranslateFetcher } from "@src/utils/yandexTranslateFetcher";
import { chatGPTTranslateFetcher } from "@src/utils/chatGPTTranslateFetcher";

import "webext-dynamic-content-scripts";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(function (object) {
  const onboardingUrl = "https://easysubs.cc/onboarding/";

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: onboardingUrl }, function (tab) {
      console.log("New tab launched with options page");
    });
  }
});

chrome.runtime.onMessage.addListener(function (message, _sender, sendResponse) {
  console.log("read: ", message);

  if (message.type === "translateWord") {
    googleTranslateBatchFetcher
      .getWordTranslation({ text: message.text, lang: message.language })
      .then((respData: TWordTranslate) => sendResponse(respData));
  }
  if (message.type === "translateWordFull") {
    googleTranslateBatchFetcher
      .getWordFullTranslation({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
  }
  if (message.type === "translateFullText") {
    const translationService = message.translationService || "google";

    if (translationService === "deepl") {
      deeplTranslateFetcher.setApiKey(message.deeplApiKey);
      deeplTranslateFetcher
        .getFullTextTranslation({ text: message.text, lang: message.language })
        .then((respData: string) => sendResponse(respData))
        .catch((error: Error) => sendResponse({ error: error.message }));
    } else if (translationService === "bing") {
      bingTranslateFetcher
        .getFullTextTranslation({ text: message.text, lang: message.language })
        .then((respData: string) => sendResponse(respData))
        .catch((error: Error) => sendResponse({ error: error.message }));
    } else if (translationService === "yandex") {
      yandexTranslateFetcher
        .getFullTextTranslation({ text: message.text, lang: message.language })
        .then((respData: string) => sendResponse(respData))
        .catch((error: Error) => sendResponse({ error: error.message }));
    } else if (translationService === "chatgpt") {
      chatGPTTranslateFetcher.setApiKey(message.chatGPTApiKey, message.chatGPTModel);
      chatGPTTranslateFetcher
        .getFullTextTranslation({ text: message.text, lang: message.language })
        .then((respData: string) => sendResponse(respData))
        .catch((error: Error) => sendResponse({ error: error.message }));
    } else {
      googleTranslateSingleFetcher
        .getFullTextTranslation({ text: message.text, lang: message.language })
        .then((respData: unknown) => sendResponse(respData));
    }
  }
  if (message.type === "getTextLanguage") {
    googleTranslateBatchFetcher
      .getTextLanguage({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
  }

  if (message.type === "fetchTTS") {
    const { text, lang } = message;
    if (lang === 'auto') throw new Error('fetchTTS cannot detect language')
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          sendResponse({ audioData: reader.result });
        };
      })
      .catch((error) => {
        console.error("TTS fetch failed", error);
        sendResponse({ error: error.message });
      });
  }

  if (message.type === "postFormDataRequest") {
    console.log("postFormDataRequest: ", message);

    const formData = new FormData();
    for (const key in message.data) {
      formData.append(key, message.data[key].toString());
    }

    fetch(message.url, {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => sendResponse(data));
  }
  if (message.type === "post") {
    console.log("Post request: ", message);

    fetch(message.url, {
      method: "POST",
      body: JSON.stringify(message.data),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => sendResponse(data))
      .catch((error) => {
        sendResponse({ error: error.message || error });
      });
  }

  return true;
});
