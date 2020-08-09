import translate from "google-translate-open-api";
import { stringify } from "querystring";
import translateToken from "./token";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === "translate") {
    translate(request.text, { to: request.lang, raw: true })
      .then((response: object) => {
        sendResponse(response);
      })
      .catch((err: any) => {
        console.error(err);
        sendResponse({error_msg: err.message});
      });

  } else if (request.contentScriptQuery === "getSingleTranslation") {
    translateToken
      .get(request.text, { tld: "com", proxy: false })
      .then((token: { name: string; value: string }) => {
        const url = "https://translate.google.com/translate_a/single";
        const data = {
          client: "webapp",
          dt: ["bd", "ex", "md", "ss", "t"],
          hl: "en",
          ie: "UTF-8",
          kc: 1,
          oe: "UTF-8",
          otf: 1,
          q: request.text,
          sl: "auto",
          ssel: 0,
          tl: request.lang,
          tsel: 0,
          [token.name]: token.value
        };

        const fullUrl = `${url}?${stringify(data)}`;
        fetch(fullUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
          }
        })
          .then(resp => resp.json())
          .then(respData => sendResponse(respData));
      })
      .catch(err => {
        console.error(err);
        sendResponse({error_msg: err.message});
      });
  } else if (request.contentScriptQuery === "getRequest") {
    fetch(request.url, {
      method: "GET"
    })
      .then(resp => resp.json())
      .then(data => sendResponse(data))
      .catch(err => {
        console.error(err);
        sendResponse({error_msg: err.message});
      });
  } else if (request.contentScriptQuery === "postFormDataRequest") {
    const formData = new FormData();
    for (const key in request.data) {
      formData.append(key, request.data[key].toString());
    }

    fetch(request.url, {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(data => sendResponse(data));

  } else if (request.contentScriptQuery === "putRequest") {
    fetch(request.url, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.data)
    })
      .then(resp => resp.json())
      .then(data => sendResponse(data))
      .catch(err => {
        console.error(err);
        sendResponse({error_msg: err.message});
      });
  } else {
    sendResponse();
  }
  return true; // Will respond asynchronously.
});
