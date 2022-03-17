import { subTitleType } from 'subtitle'

import { getCurrentTime } from '../utils/videoHelpers'

export const getCurrentSubsTexts = (video: HTMLVideoElement, subs: subTitleType[]): string[] => {
  const currentTime = getCurrentTime(video)
  const currentSubs = getAllCurrentSub(subs, currentTime)
  return currentSubs.map((sub: subTitleType) => sub.text || '')
}

export const subTextToChildNodesArray = (text: string): ChildNode[] => {
  const tmpDiv = document.createElement('div') as HTMLDivElement
  tmpDiv.innerHTML = text.replace(/(<\d+:\d+:\d+.\d+>)?<[/]?[c].*?>/g, '').replace(/[\r\n]+/g, '\r\n ')
  return Array.from(tmpDiv.childNodes)
}

export const getCleanSubText = (text: string): string => {
  const tmpDiv = document.createElement('div') as HTMLDivElement
  tmpDiv.innerHTML = text
    .replace(/<\d+:\d+:\d+.\d+><c>/g, '')
    .replace(/<\/c>/g, '')
    .replace(/(\r\n|\n|\r)/gm, ' ')
  return tmpDiv.textContent || ''
}

export const getCurrentFirstSub = (subs: subTitleType[], currentTime: number) => {
  return getAllCurrentSub(subs, currentTime)[0]
}

export const getCurrentLastSub = (subs: subTitleType[], currentTime: number) => {
  return getAllCurrentSub(subs, currentTime).slice(-1)[0]
}

export const getPrevSub = (subs: subTitleType[], currentTime: number): subTitleType | undefined => {
  const currentSub = getCurrentLastSub(subs, currentTime)
  if (currentSub) {
    const indexCurrentSub = subs.findIndex((sub) => sub === currentSub)
    return subs[indexCurrentSub - 1]
  }

  return subs.find((sub, index) => {
    return sub.end <= currentTime && (!subs[index + 1] || subs[index + 1].start >= currentTime)
  })
}

export const getNextSub = (subs: subTitleType[], currentTime: number): subTitleType | undefined => {
  const currentSub = getCurrentFirstSub(subs, currentTime)
  if (currentSub) {
    const indexCurrentSub = subs.findIndex((sub) => sub === currentSub)
    return subs[indexCurrentSub + 1]
  }

  return subs.find((sub) => sub.start >= currentTime)
}

const getAllCurrentSub = (subs: subTitleType[], currentTime: number) => {
  return subs.filter((sub: subTitleType) => sub.start <= currentTime && sub.end >= currentTime)
}
