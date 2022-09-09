import { createStore, createEvent, createEffect, attach } from 'effector'
import { Subtitles } from 'subtitle'
import { convertRawSubs } from './utils/covertRawSubs'

import type Service from '@/streamings/service'

import { $streaming } from '../streamings'

export const $subs = createStore<Subtitles>([])
export const $rawSubs = $subs.map((subtitle) => convertRawSubs(subtitle))

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: Service }, Subtitles>()

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
