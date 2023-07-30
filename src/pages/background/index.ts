import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { TWordTranslate, googleTranslateFetcher } from "@src/utils/googleTranslateFetcher";

reloadOnUpdate("pages/background");

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.runtime.onMessage.addListener(function (message, _sender, sendResponse) {
  console.log("read: ", message);

  if (message.type === "translateWord") {
    googleTranslateFetcher
      .getWordTranslation({ text: message.text, lang: message.language })
      .then((respData: TWordTranslate) => sendResponse(respData));
  }
  if (message.type === "translateWordFull") {
    googleTranslateFetcher
      .getWordFullTranslation({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
  }
  if (message.type === "translateFullText") {
    googleTranslateFetcher
      .getFullTextTranslation({ text: message.text, lang: message.language })
      .then((respData: unknown) => sendResponse(respData));
  }
  return true;
});
