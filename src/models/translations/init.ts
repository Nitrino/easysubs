import { $wordTranslations, fetchWordTranslationFx } from './'
import { TWordTranslate } from '@/utils/googleTranslateFetcher'

$wordTranslations.on(fetchWordTranslationFx.doneData, (state, translation) => {
  const existTranslation = findTranslation(state, translation.original, translation.lang)
  if (existTranslation == undefined) {
    state = [...state, translation]
  }
  return state
})

fetchWordTranslationFx.use(async ({ text, lang, wordTranslations }) => {
  const translation = findTranslation(wordTranslations, text, lang)
  if (translation) {
    return translation
  }
  const response = (await chrome.runtime.sendMessage({
    type: 'translateWord',
    lang: lang,
    text: text,
  })) as TWordTranslate

  return response
})

function findTranslation(wordTranslations: TWordTranslate[], text: string, lang: string) {
  return wordTranslations.find((t) => t.original === text && t.lang === lang)
}

$wordTranslations.watch((translations) => console.log('wordTranslations', translations))
