import React from 'react'
import Language from './Language'
import LearningService from './LearningService'
import Toggle from './Toggle'
import ShowProgressBar from './ShowProgressBar'
import SubsFontSize from './SubsFontSize'
import ResyncSubs from './ResyncSubs'
import CustomSubs from './CustomSubs'
import SubsBackground from './SubsBackground'
import onClickOutside from 'react-onclickoutside'

// tslint:disable-next-line: variable-name
const Content = (props: any) => {
  function closeSettings() {
    props.toggleShowSettings(false)
  }

  ;(Content as any).handleClickOutside = () => {
    props.toggleShowSettings(false)
  }

  return (
    <div className="easysubs-settings-wrapper" style={{ display: props.display }}>
      <div className="easysubs-settings-close" onClick={closeSettings} />
      <div className="easysubs-settings-header">{chrome.i18n.getMessage('easysubsSettings')}</div>
      <div className="easysubs-settings__content">
        <div className="easysubs-settings__content__header">{chrome.i18n.getMessage('global')}</div>
        <Toggle />
        <ShowProgressBar />
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

const clickOutsideConfig = {
  handleClickOutside: () => (Content as any).handleClickOutside,
}

export default onClickOutside(Content, clickOutsideConfig)
