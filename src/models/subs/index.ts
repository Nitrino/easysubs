import { createStore, createEvent, createEffect, attach } from 'effector'
import { Subtitles } from 'subtitle'
import { convertRawSubs } from './utils/convertRawSubs'
import { TSubs } from './types'

import type Service from '@/streamings/service'

import { $streaming } from '../streamings'

export const $rawSubs = createStore<Subtitles>([])
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle))
export const $currentSubs = createStore<TSubs>([])

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: Service }, Subtitles>()
export const updateCurrentSubsFx = createEffect<{ subs: TSubs; time: number }, TSubs>()

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
