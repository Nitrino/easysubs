import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

import { TWordTranslate, googleTranslateBatchFetcher } from "@src/utils/googleTranslateBatchFetcher";
import { googleTranslateSingleFetcher } from "@src/utils/googleTranslateSingleFetcher";

import "webext-dynamic-content-scripts";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(function (object) {
  let optionsUrl = chrome.runtime.getURL("src/pages/options/index.html");

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: optionsUrl }, function (tab) {
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
    googleTranslateSingleFetcher
      .getFullTextTranslation({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
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
      .then((resp) => resp.json())
      .then((data) => sendResponse(data));
  }

  if (message.type === "speak") {
    console.log("speak request: ", message);
    chrome.tts.speak(message.text, { lang: message.lang }, function () {
      if (chrome.runtime.lastError) {
        console.log("Error: " + chrome.runtime.lastError.message);
      }
    });
  }

  return true;
});
