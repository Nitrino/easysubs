import { useRef } from 'react'
import { updateSubs } from '../../event'
import { parse } from 'subtitle'
import { toast } from 'react-toastify'

function CustomSubs() {
  const inputFile = useRef<HTMLInputElement>(null)

  function handleFileSelect(event: any) {
    event.preventDefault()
    inputFile.current?.click()
  }

  function handleOnChange(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const data: string = reader.result as string

      updateSubs(parse(data))
      ;(toast as any).info(chrome.i18n.getMessage('customSubtitlesLoaded'))
    }
    reader.readAsText(file)
  }

  return (
    <div className="easysubs-settings__custom-subs easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <span>{chrome.i18n.getMessage('customSubtitles')}</span>
      </div>
      <div className="easysubs-settings__item__right-side">
        <input
          type="file"
          accept=".vtt,.srt"
          id="file"
          ref={inputFile}
          onChange={handleOnChange}
          style={{ display: 'none' }}
        />
        <div className="easysubs-settings__button" onClick={handleFileSelect}>
          {chrome.i18n.getMessage('selectFile')}
        </div>
      </div>
    </div>
  )
}

export default CustomSubs
