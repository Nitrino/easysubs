import { createStore, createEvent, createEffect } from 'effector'
import { Captions } from 'subtitle'
import Service from '@/streamings/service'

type TStreaming = Service | null
export const $subs = createStore<Captions>([])
export const $streaming = createStore<TStreaming>(null)

export const updateSubsEvent = createEvent<Captions>()
export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchCurrentService = createEffect<void, TStreaming>()
