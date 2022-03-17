import { enableState, subsStore } from '../store'
import { moveToNextSub, moveToPrevSub } from './videoHelpers'

const keyboardEvents = ['keyup', 'keydown', 'keypress']

export const keyboardHandler = (event: KeyboardEvent) => {
  if (!enableState.getState()) return

  const videoElement = document.querySelector('video')
  if (!videoElement) {
    return
  }

  if (event.code === 'ArrowLeft') {
    event.stopPropagation()
    if (event.type === 'keydown') {
      moveToPrevSub(videoElement, subsStore.getState(), event.altKey)
    }
  }
  if (event.code === 'ArrowRight') {
    event.stopPropagation()
    if (event.type === 'keydown') {
      moveToNextSub(videoElement, subsStore.getState(), event.altKey)
    }
  }
}

export const addKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.addEventListener(eventType as any, keyboardHandler, true)
  })
}

export const removeKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.removeEventListener(eventType as any, keyboardHandler, true)
  })
}
