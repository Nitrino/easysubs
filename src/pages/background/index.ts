import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

import { TWordTranslate, googleTranslateBatchFetcher } from "@src/utils/googleTranslateBatchFetcher";
import { googleTranslateSingleFetcher } from "@src/utils/googleTranslateSingleFetcher";
import { deeplTranslateFetcher } from "@src/utils/deeplTranslateFetcher";
import { bingTranslateFetcher } from "@src/utils/bingTranslateFetcher";
import { yandexTranslateFetcher } from "@src/utils/yandexTranslateFetcher";
import { chatGPTTranslateFetcher } from "@src/utils/chatGPTTranslateFetcher";
import { fetchSpeech } from "@src/utils/tts";
import { translateBatch } from "@src/utils/translateBatch";

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
    chrome.tabs.create({ url: onboardingUrl }, function () {
      console.log("New tab launched with options page");
    });
  }
});

class LinguaLeoAuthError extends Error {}

// The LinguaLeo session cookie is sent via `credentials: "include"`, so the API itself tells us whether the user is logged in.
async function lingualeoPost(path: string, body: object) {
  const resp = await fetch(`https://api.lingualeo.com/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  if (resp.status === 401 || resp.status === 403) {
    throw new LinguaLeoAuthError();
  }
  if (!resp.ok) {
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
  const data = await resp.json();
  if (data.error_msg) {
    throw new Error(data.error_msg);
  }
  return data;
}

async function addWordToLingualeo(word: string, translation: string) {
  const profile = await lingualeoPost("getUserProfile", {
    apiVersion: "1.0.1",
    port: 1001,
    attrList: { targetLang: "targetLang", nativeLang: "nativeLang" },
  });
  if (!profile.data?.targetLang || !profile.data?.nativeLang) {
    throw new LinguaLeoAuthError();
  }

  return lingualeoPost("SetWords", {
    apiVersion: "1.0.0",
    port: 1001,
    data: [
      {
        action: "add",
        valueList: {
          wordValue: word,
          wordSetId: 3,
          langPair: { source: profile.data.targetLang.slice(0, 2).toLowerCase(), target: profile.data.nativeLang },
          translation: { tr: translation, ctx: "", pic: "" },
        },
      },
    ],
  });
}

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
  // The second subtitle line: several lines in one request, one translation per line in the same order
  if (message.type === "translateBatch") {
    translateBatch(message)
      .then((translations) => sendResponse(translations))
      .catch((error: Error) => sendResponse({ error: error.message }));
  }
  if (message.type === "pronounce") {
    fetchSpeech(message)
      .then((speech) => sendResponse(speech))
      .catch((error: Error) => sendResponse({ error: error.message }));
  }
  if (message.type === "getTextLanguage") {
    googleTranslateBatchFetcher
      .getTextLanguage({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
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
        // fetch() rejects with a TypeError when nothing answers, e.g. Anki isn't running
        sendResponse({ error: error instanceof TypeError ? "connection error" : error.message || error });
      });
  }

  if (message.type === "addWordToLingualeo") {
    console.log("addWordToLingualeo: ", message);

    addWordToLingualeo(message.word, message.translation)
      .then((data) => sendResponse({ lingualeoResponse: data }))
      .catch((error) =>
        sendResponse(
          error instanceof LinguaLeoAuthError ? { error: "not_authenticated" } : { error: error.message || error },
        ),
      );
    return true; // Will respond asynchronously
  }

  if (message.type === "addWordToPuzzleEnglish") {
    console.log("addWordToPuzzleEnglish: ", message);

    // Step 1: Check words
    const checkFormData = new FormData();
    checkFormData.append("words", message.word);

    fetch("https://puzzle-english.com/api2/dictionary/checkWordsFromMassImport", {
      method: "POST",
      body: checkFormData,
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d1) => {
        if (d1.previewWords) {
          // Step 2: Add words
          const addFormData = new FormData();
          addFormData.append("words", JSON.stringify(d1.previewWords));
          addFormData.append("idSet", "0");

          fetch("https://puzzle-english.com/api2/dictionary/addWordsFromMassImport", {
            method: "POST",
            body: addFormData,
            credentials: "include",
          })
            .then((r) => r.json())
            .then((d2) => sendResponse(d2))
            .catch((err) => sendResponse({ error: err.toString() }));
        } else {
          sendResponse({ error: "Failed to preview words for Puzzle English", detail: d1 });
        }
      })
      .catch((err) => sendResponse({ error: err.toString() }));

    return true; // Will respond asynchronously
  }

  return true;
});
