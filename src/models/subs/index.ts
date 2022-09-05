import { createStore, createEvent, createEffect, attach } from 'effector'
import { Captions } from 'subtitle'

import type Service from '@/streamings/service'

import { $streaming } from '../streamings'

export const $subs = createStore<Captions>([])

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: Service }, Captions>()

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
