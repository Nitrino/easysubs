import { FC, useRef } from 'react'
import Language from './Language'
import LearningService from './LearningService'
import Toggle from './Toggle'
import ShowProgressBar from './ShowProgressBar'
import SubsFontSize from './SubsFontSize'
import ResyncSubs from './ResyncSubs'
import CustomSubs from './CustomSubs'
import SubsBackground from './SubsBackground'
import RewindBySubs from './RewindBySubs'
import { useOnClickOutside } from './../../hooks/useOnClickOutside'

type TContentProps = {
  toggleShowSettings: (toggleShow: boolean) => void
  display: string
}

export const Content: FC<TContentProps> = ({ toggleShowSettings, display }) => {
  const ref = useRef(null)
  const closeSettings = (): void => {
    toggleShowSettings(false)
  }

  useOnClickOutside(ref, () => toggleShowSettings(false))

  return (
    <div ref={ref} className="easysubs-settings-wrapper" style={{ display: display }}>
      <div className="easysubs-settings-close" onClick={closeSettings} />
      <div className="easysubs-settings-header">{chrome.i18n.getMessage('easysubsSettings')}</div>
      <div className="easysubs-settings__content">
        <div className="easysubs-settings__content__header">{chrome.i18n.getMessage('global')}</div>
        <Toggle />
        <ShowProgressBar />
        <RewindBySubs />
        <Language />
        <LearningService />
        {/* <div className="easysubs-settings__content__header">Interface</div> */}
        <div className="easysubs-settings__content__header">{chrome.i18n.getMessage('subtitles')}</div>
        <SubsBackground />
        <SubsFontSize />
        <ResyncSubs />
        <CustomSubs />
      </div>
    </div>
  )
}
