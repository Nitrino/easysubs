import { googleTranslateFetcher } from "./utils/google-translate-fetcher"

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.contentScriptQuery === "translate") {
    googleTranslateFetcher.getTextTranslation({ text: request.text, lang: request.lang })
      .then((respData: string) => sendResponse(respData));
  } else if (request.contentScriptQuery === "getSingleTranslation") {
    googleTranslateFetcher.getWordTranslation({ text: request.text, lang: request.lang })
      .then((respData: any) => sendResponse(respData));
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
