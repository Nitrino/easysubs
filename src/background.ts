import { stringify } from "querystring";
import translateToken from "./token";
import Utils from "./utils"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const baseUrl = "https://translate.google.com"
  if (request.contentScriptQuery === "translate") {
    fetch(baseUrl)
      .then(resp => resp.text())
      .then(resp => {
        return {
          query: {
            'rpcids': 'MkEWBc',
            'f.sid': Utils.extract('FdrFJe', resp),
            'bl': Utils.extract('cfb2h', resp),
            'hl': 'en',
            'soc-app': 1,
            'soc-platform': 1,
            'soc-device': 1,
            '_reqid': Math.floor(1000 + (Math.random() * 9000)),
            'rt': 'c'
          },
          at: Utils.extract('SNlM0e', resp)
        };
      })
      .then(data => {
        const url = baseUrl + '/_/TranslateWebserverUi/data/batchexecute?' + stringify(data.query);
        const payload = JSON.stringify([[request.text.replace(/(\r\n|\n|\r)/gm, ""), "auto", request.lang, true]])
        const req = JSON.stringify([[['MkEWBc', payload, null, 'generic']]])
        const body = 'f.req=' + encodeURIComponent(req) + '&at=' + data.at
        const headers = { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }

        fetch(url, {
          method: 'POST',
          body: body,
          headers: headers
        })
          .then(resp => resp.text())
          .then((resp: any) => Utils.getTranslateFromGoogleResponse(resp))
          .then(respData => sendResponse(respData));
      })
      .catch((err: Error) => console.error(err));
  } else if (request.contentScriptQuery === "getSingleTranslation") {
    translateToken
      .get(request.text, { tld: "com", proxy: false })
      .then((token: { name: string; value: string }) => {
        const url = "https://translate.google.com/translate_a/single";
        const data = {
          client: "gtx",
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
      .catch((err: Error) => console.error(err));
  } else if (request.contentScriptQuery === "getRequest") {
    fetch(request.url).then(resp => resp.json()).then(data => sendResponse(data));
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
  } else {
    sendResponse();
  }
  return true; // Will respond asynchronously.
});
