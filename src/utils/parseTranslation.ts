import { words30 } from '@/utils/30kwords'
import translations from '@/models/translations/api'

const timer = (ms) => new Promise((res) => setTimeout(res, ms))
async function load() {
  for (let i = 23578; i < words30.length; i = i + 5) {
    const promise = chrome.runtime.sendMessage({
      type: 'translateWord',
      lang: 'ru',
      text: words30[i],
    })

    const promise1 = chrome.runtime.sendMessage({
      type: 'translateWord',
      lang: 'ru',
      text: words30[i + 1],
    })

    const promise2 = chrome.runtime.sendMessage({
      type: 'translateWord',
      lang: 'ru',
      text: words30[i + 2],
    })

    const promise3 = chrome.runtime.sendMessage({
      type: 'translateWord',
      lang: 'ru',
      text: words30[i + 3],
    }) as Promise<any>

    const promise4 = chrome.runtime.sendMessage({
      type: 'translateWord',
      lang: 'ru',
      text: words30[i + 4],
    }) as Promise<any>

    const [response, response1, response2, response3, response4] = await Promise.all([
      promise,
      promise1,
      promise2,
      promise3,
      promise4,
    ])

    storeTranslationOnServer(words30[i], 'en', 'ru', response)
    storeTranslationOnServer(words30[i + 1], 'en', 'ru', response1)
    storeTranslationOnServer(words30[i + 2], 'en', 'ru', response2)
    storeTranslationOnServer(words30[i + 3], 'en', 'ru', response3)
    storeTranslationOnServer(words30[i + 4], 'en', 'ru', response4)
    // TODO: use subcription on Effect getting google translation data
    console.log(i, words30[i], words30[i + 1], words30[i + 2], words30[i + 3], words30[i + 4])
    await timer(1)
  }
}

async function storeTranslationOnServer(source: string, sourseLang: string, targetLang: string, translation: any) {
  translations
    .create({
      source: source,
      source_lang: sourseLang,
      target_lang: targetLang,
      translation: translation,
    })
    .then((res) => {
      console.log('success store translation', res)
    })
}
