import { ReactElement, useEffect, useState, useRef } from 'react'
import { useStore } from 'effector-react'
import { subTitleType } from 'subtitle'

import { subsStore } from '../../store'
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from '../../utils/keyboardHelpers'
import { moveToTime, getCurrentTime } from '../../utils/videoHelpers'
import { castSubTime } from '../../utils/castSubTime'

const timePeriod = 30000

function ProgressBar() {
  const subs = useStore(subsStore)

  const [videoElement] = useState(document.querySelector('video'))
  const [progressBarElement] = useState(document.querySelector('.easysubs-progress-bar'))
  const [elements, updateElements] = useState<ReactElement[]>([])
  const animateRef = useRef<number>()

  function handleClick(event: any) {
    if (!videoElement || !progressBarElement) {
      return
    }

    const time = getCurrentTime(videoElement)
    const leftBorder = time - timePeriod / 2
    const msInPx = timePeriod / progressBarElement.clientWidth
    const moveTime = leftBorder + event.nativeEvent.offsetX * msInPx
    moveToTime(videoElement, moveTime)
  }

  useEffect(() => {
    const updateProgressBar = (): void => {
      if (!videoElement || !progressBarElement) {
        return
      }

      const time = getCurrentTime(videoElement)
      const leftBorder = time + timePeriod / 2
      const rightBorder = time - timePeriod / 2
      const msInPx = progressBarElement.clientWidth / timePeriod

      const subsInDuration = subs.filter(
        (sub: subTitleType) =>
          (sub.end > rightBorder && sub.end < leftBorder) || (sub.start > rightBorder && sub.start < leftBorder),
      )

      updateElements(
        subsInDuration.map((sub: subTitleType) => {
          const subWidth = msInPx * (castSubTime(sub.end) - castSubTime(sub.start))
          const x = msInPx * (castSubTime(sub.start) - rightBorder)
          return (
            <div
              className="easysubs-progress-bar-element"
              style={{ width: `${subWidth}px`, transform: `translateX(${x}px)` }}
              key={`id${sub.start}-${sub.end}-${sub.text}`}
            />
          )
        }),
      )
    }

    const animate = (): void => {
      if (subs.length === 0) return
      updateProgressBar()
      animateRef.current = requestAnimationFrame(animate)
    }

    animateRef.current = requestAnimationFrame(animate)
    addKeyboardEventsListeners()

    return () => {
      animateRef.current && cancelAnimationFrame(animateRef.current)
      removeKeyboardEventsListeners()
      updateElements([])
    }
  }, [subs, progressBarElement, videoElement])

  return (
    <div className="easysubs-progress-bar-container" onClick={handleClick}>
      {elements}
    </div>
  )
}

export default ProgressBar
