import { createStore, createEffect } from 'effector'
import { withPersist } from '../utils/withPersist'

export const $enabled = withPersist(createStore<boolean>(true, { name: 'es-enables' }))
export const setEnabledFx = createEffect<boolean, boolean>((value) => value)

export const $translateLanguage = withPersist(
  createStore<string>(window.navigator.language.split('-')[0], { name: 'es-translate-language' }),
)
export const setTranslateLanguageFx = createEffect<string, string>((value) => value)
