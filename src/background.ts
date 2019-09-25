import translate from 'google-translate-open-api';
import { getSubtitles } from 'youtube-captions-scraper';

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == 'translate') {
      translate(request.text, { to: request.lang, raw: true })
        .then((response: object) => { sendResponse(response) })
        .catch((err: Error) => console.error(err));
    } else if (request.contentScriptQuery == 'getYoutubeSubs') {
      getSubtitles({ videoID: request.id, lang: "en" })
        .then((response: object) => { sendResponse(response) });
    } else {
      sendResponse();
    }
    return true;  // Will respond asynchronously.
  }
);
