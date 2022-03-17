/**
 * Helpers for working with video
 */
import { subTitleType } from 'subtitle'

import { getCurrentLastSub, getCurrentFirstSub, getPrevSub, getNextSub } from './subsHelpers'
import { castSubTime } from './castSubTime'
import { rewindBySubsState } from '../store'

const rewindTime = 5000

export const getCurrentTime = (video: HTMLVideoElement) => {
  return Math.round(video.currentTime * 1000)
}

export const moveToPrevSub = (video: HTMLVideoElement, subs: subTitleType[], force: boolean) => {
  let timeToRewind = getCurrentTime(video)
  const currentSub = getCurrentLastSub(subs, timeToRewind)
  if (currentSub) {
    // NOTE: -1 is hack for cases when prev sub ends same time as next sub starts
    timeToRewind = castSubTime(currentSub.start) - 1
  }

  const prevSub = getPrevSub(subs, timeToRewind)
  const rewindBySubs = rewindBySubsState.getState()

  if (rewindBySubs && prevSub && (timeToRewind - castSubTime(prevSub.end) < 5000 || force)) {
    moveToTime(video, castSubTime(prevSub.start))
  } else {
    moveToTime(video, castSubTime(timeToRewind - rewindTime))
  }
}

export const moveToNextSub = (video: HTMLVideoElement, subs: subTitleType[], force: boolean) => {
  let timeToRewind = getCurrentTime(video)
  const currentSub = getCurrentFirstSub(subs, timeToRewind)

  if (currentSub) {
    timeToRewind = castSubTime(currentSub.end)
  }
  const nextSub = getNextSub(subs, timeToRewind)

  const rewindBySubs = rewindBySubsState.getState()

  if (rewindBySubs && nextSub && (castSubTime(nextSub.start) - timeToRewind < 5000 || force)) {
    moveToTime(video, castSubTime(nextSub.start))
  } else {
    moveToTime(video, castSubTime(timeToRewind + rewindTime))
  }
}

export const moveToTime = (video: HTMLVideoElement, time: number | string) => {
  isNetflix()
    ? window.dispatchEvent(new CustomEvent('easysubsSeek', { detail: castSubTime(time) }))
    : (video.currentTime = castSubTime(time) / 1000)
}

const isNetflix = () => {
  return ['www.netflix.com', 'netflix.com'].includes(window.location.host)
}
