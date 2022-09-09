import { createStore, createEffect, createEvent } from 'effector'

export const $video = createStore<HTMLVideoElement | null>(null)
export const getCurrentVideoFx = createEffect<void, HTMLVideoElement>()
export const videoTimeUpdate = createEvent('videoTimeUpdate')

videoTimeUpdate.watch(() => {
  console.log('+++ videoTimeUpdate')
})
