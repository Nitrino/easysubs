import translate from 'google-translate-open-api';

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery == 'translate') {
      translate(request.text, { to: request.lang, raw: true })
        .then((response: object) => { sendResponse(response) })
        .catch((err: Error) => console.error(err));
    } else {
      sendResponse();
    }
    return true;  // Will respond asynchronously.
  }
);
