import { googleTranslateFetcher, TWordTranslate } from '@/utils/googleTranslateFetcher'

chrome.runtime.onMessage.addListener(function (request, _sender, sendResponse) {
  console.log('read: ', request)

  if (request.type === 'translateWord') {
    googleTranslateFetcher
      .getWordTranslation({ text: request.text, lang: request.lang })
      .then((respData: TWordTranslate) => sendResponse(respData))
  }
  if (request.type === 'translateWordFull') {
    googleTranslateFetcher
      .getWordFullTranslation({ text: request.text, lang: request.lang })
      .then((respData: unknown) => sendResponse(respData))
  }
  return true
})
