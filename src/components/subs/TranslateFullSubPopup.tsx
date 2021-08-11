import { useStore } from 'effector-react'
import React, { useEffect, useState } from 'react'
import { userLanguageStore } from '../../store'

interface Props {
  text: string
}

interface Translate {
  original: string
  main: string
}

function TranslateFullSubPopup(props: Props) {
  const [translation, changeTranslation] = useState<Translate>({
    main: '',
    original: '',
  })
  const language = useStore(userLanguageStore)

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: 'translate',
        lang: language,
        text: props.text,
      },
      (response) => {
        const main: string = response
        changeTranslation({
          main: main,
          original: props.text,
        })
      },
    )
  }, [])

  if (translation.original !== '') {
    return (
      <div className="easysubs-translate-container -full-sub">
        <div className="easysubs-translate-result">{translation.main}</div>
      </div>
    )
  }
  return null
}

export default TranslateFullSubPopup
