import { createStore, createEffect } from 'effector'
import Service from '@/streamings/service'

export type TStreaming = Service | null
export const $streaming = createStore<TStreaming>(null)

export const fetchCurrentStreamingFx = createEffect<void, TStreaming>()
