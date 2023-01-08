import { createStore, createEffect } from 'effector'
import { withPersist } from '../utils/withPersist'

export const $enabled = withPersist(createStore<boolean>(true, { name: 'es-enables' }))
export const setEnabledFx = createEffect<boolean, boolean>((value) => value)
