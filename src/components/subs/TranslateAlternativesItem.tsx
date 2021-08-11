import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import Plus from '../../images/plus.svg'
import Utils from '../../utils'
import FrequencyDots from './FrequencyDots'
import Lingualeo from '../../learning-services/lingualeo'
import PuzzleEnglish from '../../learning-services/PuzzleEnglish'

interface Props {
  alternative: any[]
  word: string
  context: string
  groupIndex: number
  currentService: null | Lingualeo | PuzzleEnglish
}

function TranslateAlternativesItem(props: Props) {
  const translateNode: any = useRef()

  function handleOnClick(e: any) {
    e.stopPropagation()
    const partOfSpeechNode = document.querySelector(`#part-of-speech-${props.groupIndex}`)

    props.currentService
      .addWord(
        Utils.clearWord(props.word),
        translateNode.current.textContent,
        partOfSpeechNode.textContent,
        props.context,
      )
      .then((text: string) => {
        ;(toast as any).info(text)
      })
      .catch((error: string) => {
        ;(toast as any).error(error)
      })
  }

  return [
    props.currentService ? (
      <td key={'plus'} className="easysubs-translate-alternative-item-add-to-learn" onClick={handleOnClick}>
        <Plus style={{ fill: props.currentService.color }} />
      </td>
    ) : null,
    <td key={'translate'} className="easysubs-translate-alternative-item-translate" ref={translateNode}>
      {props.alternative[0]}
    </td>,
    <td key={'original'} className="easysubs-translate-alternative-item-original">
      {props.alternative[2]?.slice(0, 3)?.join(', ')}
    </td>,
    <td key={'frequency'} className="easysubs-translate-alternative-item-frequency">
      <FrequencyDots frequency={props.alternative[3]} />
    </td>,
  ] as any
}

export default TranslateAlternativesItem
