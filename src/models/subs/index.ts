import { createStore, createEvent, createEffect, attach, UnitValue } from 'effector'
import { Captions } from 'subtitle'
import { convertRawSubs } from './utils/convertRawSubs'
import { TSub } from './types'
import { $video } from '@/models/videos'

import type Service from '@/streamings/service'

import { $streaming } from '../streamings'

export const $rawSubs = createStore<Captions>([])
export const $subs = $rawSubs.map((subtitle) => convertRawSubs(subtitle))
export const $currentSubs = createStore<TSub[]>([])
export const $subsDelay = createStore<number>(0)

export const esSubsChanged = createEvent<string>()
export const esRenderSetings = createEvent()

export const fetchSubsFx = createEffect<{ language: string; streaming: Service }, Captions>()
export const updateCurrentSubsFx = createEffect<{ subs: TSub[]; video: UnitValue<typeof $video> }, TSub[]>()
export const updateSubsDelayFx = createEffect<number, number>()
export const resyncSubsFx = createEffect<
  { currentDelay: number; delay: number },
  { currentDelay: number; delay: number }
>((data) => data)

export const fetchServiceSubsFx = attach<string, typeof $streaming, typeof fetchSubsFx>({
  effect: fetchSubsFx,
  source: $streaming,
  mapParams: (language, streaming) => ({ language, streaming }),
})
