import { createStore, Store } from 'effector'
import { subTitleType } from 'subtitle'
import { withPersist } from './effector-persist'

export const enableState: Store<boolean> = withPersist(createStore<boolean>(true))
export const showProgressBarState: Store<boolean> = withPersist(createStore<boolean>(true))
export const showSubsBackgroundState: Store<boolean> = withPersist(createStore<boolean>(true))
export const subsFontSizeStore: Store<number> = withPersist(createStore<number>(100))
export const userLanguageStore: Store<string> = withPersist(
  createStore<string>(window.navigator.language.split('-')[0]),
)
export const learningServiceStore: Store<string> = withPersist(createStore<string>(''))
export const subsStore = createStore<subTitleType[]>([])
export const showFullSubTranslatePopupStore = createStore<boolean>(false)
export const autoPauseStore = createStore<boolean>(false)
