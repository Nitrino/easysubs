import { createStore, createEvent, createEffect, attach } from 'effector'
import { Captions } from 'subtitle'

import { TStreaming, $streaming } from '../streamings'

export const $subs = createStore<Captions>([])

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: TStreaming }, Captions>()

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
