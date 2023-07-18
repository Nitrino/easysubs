import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import KinoPub from "@src/streamings/kinopub";

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

chrome.runtime.onMessage.addListener(async function (
  message,
  _sender,
  sendResponse
) {
  console.log("read: ", message);

  // TODO: Add translations
  return true;
});
