import { createStore, createEffect, attach } from 'effector'
import { TTranslation, TGoogleTranslation } from './types'
import { TCreateRequest } from './api'

export const $wordTranslations = createStore<TTranslation[]>([])

export const fetchWordTranslationFx = createEffect<
  { text: string; lang: string; wordTranslations: TTranslation[] },
  TTranslation
>()

export const fetchWordQuickTranslationFx = createEffect<
  { text: string; lang: string; wordTranslations: TTranslation[] },
  TTranslation['quick_translations']
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

export const getWordQuickTranslationFx = attach<
  { text: string; lang: string },
  typeof $wordTranslations,
  typeof fetchWordQuickTranslationFx
>({
  effect: fetchWordQuickTranslationFx,
  source: $wordTranslations,
  mapParams: ({ text, lang }, wordTranslations) => ({ text, lang, wordTranslations }),
})

export const saveTranslationFx = createEffect<TCreateRequest, TTranslation>()
export const addTranslationFx = createEffect<TTranslation, TTranslation>()
