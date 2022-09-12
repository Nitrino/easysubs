import { createStore, createEffect, attach } from 'effector'
import { TWordTranslate } from '@/utils/googleTranslateFetcher'

export const $wordTranslations = createStore<TWordTranslate[]>([])

export const fetchWordTranslationFx = createEffect<
  { text: string; lang: string; wordTranslations: TWordTranslate[] },
  TWordTranslate
>()

export const getWordTranslationFx = attach<
  { text: string; lang: string },
  typeof $wordTranslations,
  typeof fetchWordTranslationFx
>({
  effect: fetchWordTranslationFx,
  source: $wordTranslations,
  mapParams: ({ text, lang }, wordTranslations) => ({ text, lang, wordTranslations }),
})
