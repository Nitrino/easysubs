import { useRef } from 'react'
import { toast } from 'react-toastify'
import Plus from '../../images/plus.svg'
import { clearWord } from '../../utils/clearWord'
import FrequencyDots from './FrequencyDots'
import { Lingualeo } from '../../learning-services/Lingualeo'
import { PuzzleEnglish } from '../../learning-services/PuzzleEnglish'

interface Props {
  alternative: any[]
  word: string
  context: string
  groupIndex: number
  currentService: undefined | Lingualeo | PuzzleEnglish
}

function TranslateAlternativesItem(props: Props) {
  const translateNode = useRef<any>()

  function handleOnClick(event: React.MouseEvent<HTMLTableCellElement>) {
    event.stopPropagation()
    const partOfSpeechNode = document.querySelector(`#part-of-speech-${props.groupIndex}`)

    if (!props.currentService) {
      return
    }

    props.currentService
      .addWord(
        clearWord(props.word),
        translateNode.current.textContent,
        partOfSpeechNode?.textContent || '',
        props.context,
      )
      .then((text) => {
        toast.info(text)
      })
      .catch((error: string) => {
        toast.error(error)
      })
  }

  return (
    <>
      {props.currentService ? (
        <td key={'plus'} className="easysubs-translate-alternative-item-add-to-learn" onClick={handleOnClick}>
          <Plus style={{ fill: props.currentService.color }} />
        </td>
      ) : null}
      <td key={'translate'} className="easysubs-translate-alternative-item-translate" ref={translateNode}>
        {props.alternative[0]}
      </td>
      <td key={'original'} className="easysubs-translate-alternative-item-original">
        {props.alternative[2]?.slice(0, 3)?.join(', ')}
      </td>
      <td key={'frequency'} className="easysubs-translate-alternative-item-frequency">
        <FrequencyDots frequency={props.alternative[3]} />
      </td>
    </>
  )
}

export default TranslateAlternativesItem
