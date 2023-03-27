import { $wordTranslations, fetchWordQuickTranslationFx, saveTranslationFx, addTranslationFx } from './'
import { TTranslation } from './types'
import translations from './api'

$wordTranslations.on(saveTranslationFx.doneData, (state, translation) => {
  console.log('state', state)
  console.log('translation', translation)
  return [...state, translation]
})
$wordTranslations.on(addTranslationFx.doneData, (state, translation) => [...state, translation])

fetchWordQuickTranslationFx.use(async ({ text, lang, wordTranslations }) => {
  // Try to find translation in store
  const translation = findTranslationInStore(wordTranslations, text, lang)

  if (translation) {
    return translation.quick_translations
  }

  // Try to find translation on server
  // const translationFromServer = await findTranslationOnServer(text, 'en', lang)
  // if (translationFromServer) {
  //   addTranslationFx(translationFromServer)
  //   return translationFromServer.quick_translations
  // }

  // Try to fetch translation from google

  const gooogleResponse = await chrome.runtime.sendMessage({
    type: 'translateWordFull',
    lang: lang,
    text: text,
  })

  const data = gooogleResponse[1][0][0][5][0][4] as string[]
  console.log('data', data)

  saveTranslationFx({
    source: text,
    source_lang: 'en',
    target_lang: lang,
    translation: { translate: gooogleResponse },
  })
  return data.map((t) => t[0])
})

saveTranslationFx.use(async (rawTranslation) => {
  const { data } = await translations.create(rawTranslation)
  return data
})

function findTranslationInStore(wordTranslations: TTranslation[], text: string, lang: string) {
  return wordTranslations.find((t) => t.source === text && t.target_lang === lang)
}

async function findTranslationOnServer(source: string, sourseLang: string, targetLang: string) {
  try {
    const { data } = await translations.find(source, sourseLang, targetLang)
    return data
  } catch (error) {
    console.error('Find translation error: ', error)
  }
}

$wordTranslations.watch((translations) => console.log('wordTranslations', translations))
