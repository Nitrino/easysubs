import { words30 } from '@/utils/30kwords'
import translations from '@/models/translations/api'

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const parseTranslation = async (start: number, end: number) => {
  for (let i = start; i < end; i++) {
    const response = await chrome.runtime.sendMessage({
      type: 'translateWordFull',
      lang: 'ru',
      text: words30[i],
    })

    storeTranslationOnServer(words30[i], 'en', 'ru', { translate: response })

    console.log(i, words30[i])
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
