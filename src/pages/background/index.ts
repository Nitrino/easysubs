import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

import {
  TWordTranslate,
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

  if (message.type === "addWordToLingualeo") {
    console.log("addWordToLingualeo: ", message);
    
    chrome.cookies.get({ url: "https://lingualeo.com", name: "userid" }, (useridCookie) => {
      chrome.cookies.get({ url: "https://lingualeo.com", name: "remember" }, (rememberCookie) => {
        if (!useridCookie || !rememberCookie) {
          sendResponse({ error: "LinguaLeo cookies not found. Please log in." });
          return;
        }

        const profileData = {
          apiVersion: "1.0.1",
          port: 1001,
          attrList: { targetLang: "targetLang", nativeLang: "nativeLang" }
        };

        fetch("https://api.lingualeo.com/getUserProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(profileData),
          credentials: "include"
        })
        .then(profileResp => profileResp.json())
        .then(profileJson => {
          if (!profileJson.data || !profileJson.data.targetLang || !profileJson.data.nativeLang) {
            sendResponse({ error: "LinguaLeo: Could not fetch user profile to determine correct dictionary."});
            return;
          }
          const nativeLang = profileJson.data.nativeLang;
          const learningLang = profileJson.data.targetLang.slice(0, 2).toLowerCase();

          const setData = {
            apiVersion: "1.0.0",
            userId: useridCookie.value,
            port: 1001,
            data: [
              {
                action: "add",
                valueList: {
                  wordValue: message.word,
                  wordSetId: 3,
                  langPair: { source: learningLang, target: nativeLang },
                  translation: { tr: message.translation, ctx: "", pic: "" }
                }
              }
            ]
          };

          fetch("https://api.lingualeo.com/SetWords", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(setData),
            credentials: "include"
          })
          .then(resp => resp.json())
          .then(data => sendResponse({ lingualeoResponse: data }))
          .catch(err => sendResponse({ error: err.toString() }));
        })
        .catch(err => sendResponse({ error: "LinguaLeo profile error: " + err.toString() }));
      });
    });
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
      credentials: "include"
    })
    .then(r => r.json())
    .then(d1 => {
      if (d1.previewWords) {
        // Step 2: Add words
        const addFormData = new FormData();
        addFormData.append("words", JSON.stringify(d1.previewWords));
        addFormData.append("idSet", "0");

        fetch("https://puzzle-english.com/api2/dictionary/addWordsFromMassImport", {
          method: "POST",
          body: addFormData,
          credentials: "include"
        })
        .then(r => r.json())
        .then(d2 => sendResponse(d2))
        .catch(err => sendResponse({ error: err.toString() }));
      } else {
        sendResponse({ error: "Failed to preview words for Puzzle English", detail: d1 });
      }
    })
    .catch(err => sendResponse({ error: err.toString() }));
    
    return true; // Will respond asynchronously
  }

  return true;
});
