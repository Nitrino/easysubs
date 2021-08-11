import { useStore } from 'effector-react'
import React, { useEffect, useState, useLayoutEffect, ReactElement } from 'react'
import { toggleShowFullSubTranslatePopup, toggleAutoPause } from '../../event'
import { showFullSubTranslatePopupStore, subsStore, autoPauseStore, subsFontSizeStore } from '../../store'
import Subs from '../../subs'
import Word from './Word'
import SubComponent from './SubComponent'
import Utils from '../../utils'
import Draggable from 'react-draggable'

function SubsComponent() {
  const subs = useStore(subsStore)
  const autoPause = useStore(autoPauseStore)
  const subsFontSize = useStore(subsFontSizeStore)
  const [fontSize, setFontSize] = useState(38)
  const [currentSubs, setCurrentSubs] = useState<ReactElement[]>([])
  const videoElement = document.querySelector('video')

  useEffect(() => {
    if (!videoElement) {
      return
    }

    const handleTimeUpdate = (): void => {
      const subsTextsVtt = Subs.getCurrentSubsTexts(videoElement, subs)
      setCurrentSubs(
        subsTextsVtt.map((subTextVtt: string, index: number) => {
          const subWordsNodes = getSubWordsNodes(subTextVtt)
          const cleanSubText = Subs.getCleanSubText(subTextVtt)
          return <SubComponent text={cleanSubText} words={subWordsNodes} key={index} />
        }),
      )

      toggleShowFullSubTranslatePopup(false)
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    handleTimeUpdate()

    return () => {
      videoElement?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [subs, videoElement])

  useLayoutEffect(() => {
    const updateSize = (): void => {
      if (!videoElement) {
        return
      }

      setFontSize(((videoElement.clientWidth / 100) * subsFontSize) / 43)
    }

    if (videoElement) {
      const ro = new ResizeObserver(() => {
        updateSize()
      })
      ro.observe(videoElement)
    }

    return () => window.removeEventListener('resize', updateSize)
  }, [subsFontSize, videoElement])

  function handleOnMouseEnter() {
    if (videoElement && !videoElement.paused) {
      toggleAutoPause(true)
      videoElement.pause()
    }
  }

  function handleOnMouseLeave() {
    toggleShowFullSubTranslatePopup(false)
    if (videoElement && autoPause) {
      toggleAutoPause(false)
      videoElement.play()
    }
  }

  function getSubWordsNodes(subtitleText: string) {
    return Subs.subTextToChildNodesArray(subtitleText)
      .map((node: any, nodeIndex: number) => {
        if (node.textContent.match(/[^ ]/g) == null) {
          return false
        }

        return node.textContent.match(/[^ ]+/g).map((word: string, wordIndex: number) => {
          const tagName = node.tagName ? node.tagName.toLowerCase() : 'span'
          return (
            <Word
              tagName={tagName}
              word={word}
              context={Utils.clearWordContext(subtitleText, word)}
              key={word + nodeIndex + wordIndex}
              keyName={word + nodeIndex + wordIndex}
            />
          )
        })
      })
      .flat()
  }

  return (
    <Draggable>
      <div
        className="easysubs-subtitles"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{ fontSize: `${fontSize}px` }}
      >
        {currentSubs}
      </div>
    </Draggable>
  )
}

;(showFullSubTranslatePopupStore as any).on(toggleShowFullSubTranslatePopup, (state: any, isShow: boolean) => isShow)
;(autoPauseStore as any).on(toggleAutoPause, (_state: any, enable: boolean) => enable)

export default SubsComponent
