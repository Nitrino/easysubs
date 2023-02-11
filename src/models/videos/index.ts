import { createStore, createEffect, createEvent, attach, UnitValue, split } from 'effector'
import { TMoveDirection } from './types'
import { $subs, $currentSubs } from '@/models/subs'

export const $video = createStore<HTMLVideoElement | null>(null)
export const getCurrentVideoFx = createEffect<void, HTMLVideoElement>()
export const videoTimeUpdate = createEvent<number>('videoTimeUpdate')

export const move = {
  all: createMoveToSubsFx(),
  prev: createMoveToSubsFx(),
  next: createMoveToSubsFx(),
}

split({
  source: move.all,
  match: (params) => params.direction,
  cases: {
    next: move.next,
    prev: move.prev,
  },
})

export const moveToSubsFx = attach({
  effect: move.all,
  source: { video: $video, subs: $subs, currentSubs: $currentSubs },
  mapParams: (direction: TMoveDirection, data) => {
    return { direction: direction, ...data }
  },
})

function createMoveToSubsFx() {
  return createEffect<
    {
      direction: TMoveDirection
      video: UnitValue<typeof $video>
      subs: UnitValue<typeof $subs>
      currentSubs: UnitValue<typeof $currentSubs>
    },
    void
  >()
}
