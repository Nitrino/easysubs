import { $wordTranslations, fetchWordTranslationFx } from './'
import { TWordTranslate } from '@/utils/googleTranslateFetcher'
import translations from './api'

$wordTranslations.on(fetchWordTranslationFx.doneData, (state, translation) => {
  const existTranslation = findTranslationInStore(state, translation.original, translation.lang)
  if (existTranslation == undefined) {
    state = [...state, translation]
  }
  return state
})

fetchWordTranslationFx.use(async ({ text, lang, wordTranslations }) => {
  const translation = findTranslationInStore(wordTranslations, text, lang)
  if (translation) {
    return translation
  }

  const translationFromServer = await findTranslationOnServer(text, 'en', lang)
  if (translationFromServer) {
    return translationFromServer
  }

  const response = (await chrome.runtime.sendMessage({
    type: 'translateWord',
    lang: lang,
    text: text,
  })) as TWordTranslate

  // TODO: use subcription on Effect getting google translation data
  storeTranslationOnServer(text, 'en', lang, response)

  return response
})

function findTranslationInStore(wordTranslations: TWordTranslate[], text: string, lang: string) {
  return wordTranslations.find((t) => t.original === text && t.lang === lang)
}

async function findTranslationOnServer(source: string, sourseLang: string, targetLang: string) {
  try {
    const { data } = await translations.find(source, sourseLang, targetLang)
    if (data) {
      return data.translation
    }
  } catch (error) {
    console.error('Find translation error: ', error)
  }
}

async function storeTranslationOnServer(
  source: string,
  sourseLang: string,
  targetLang: string,
  translation: TWordTranslate,
) {
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

$wordTranslations.watch((translations) => console.log('wordTranslations', translations))
