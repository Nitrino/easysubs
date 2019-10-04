import translate from 'google-translate-open-api';
import { getSubtitles } from 'youtube-captions-scraper';
import translateToken from "./token";
import { stringify } from "querystring";

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == 'translate') {
      translate(request.text, { to: request.lang, raw: true })
        .then((response: object) => { sendResponse(response) })
        .catch((err: Error) => console.error(err));
    } else if (request.contentScriptQuery == 'getSingleTranslation') {
      translateToken.get(request.text, { tld: 'com', proxy: false })
        .then((token: { name: string, value: string }) => {
          const url = "https://translate.google.com/translate_a/single";
          const data = {
            client: "gtx",
            sl: "en",
            tl: request.lang,
            hl: "en",
            dt: ["at"],
            ie: "UTF-8",
            oe: "UTF-8",
            otf: 1,
            ssel: 0,
            tsel: 0,
            kc: 7,
            q: request.text,
            [token.name]: token.value
          };
          var fullUrl = url + "?" + stringify(data);
          fetch(fullUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
            },
          })
            .then(resp => resp.json())
            .then(data => sendResponse(data))
        })
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
