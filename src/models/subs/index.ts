import { createStore, createEvent, createEffect, attach } from 'effector'
import { Captions } from 'subtitle'
import { convertRawSubs } from './utils/convertRawSubs'
import { TSub } from './types'

import type Service from '@/streamings/service'

import { $streaming } from '../streamings'

export const $rawSubs = createStore<Captions>([])
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle))
export const $currentSubs = createStore<TSub[]>([])

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: Service }, Captions>()
export const updateCurrentSubsFx = createEffect<{ subs: TSub[]; time: number }, TSub[]>()

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
