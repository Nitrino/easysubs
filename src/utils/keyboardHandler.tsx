import { moveToSubsFx } from '@/models/videos'
import { $enabled } from '@/models/global'

const keyboardEvents = ['keyup', 'keydown', 'keypress']
export const keyboardHandler = (event: KeyboardEvent) => {
  const videoElement = document.querySelector('video')
  if (!videoElement) {
    return
  }

  $enabled.watch((enabled) => {
    if (!enabled) {
      return
    }

    if (event.code === 'ArrowLeft') {
      event.stopPropagation()
      if (event.type === 'keydown') {
        moveToSubsFx('prev')
      }
    }
    if (event.code === 'ArrowRight') {
      event.stopPropagation()
      if (event.type === 'keydown') {
        moveToSubsFx('next')
      }
    }
  })
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
