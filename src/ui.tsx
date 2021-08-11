import React from 'react'
import ReactDOM from 'react-dom'
import Notification from './components/notification/Notification'
import ProgressBar from './components/progress/ProgressBar'
import SettingsComponent from './components/settings/Settings'
import SubsComponent from './components/subs/SubsComponent'

class UI {
  public static renderSubs(playerContainerElementSelector: string) {
    const playerContainerElement = document.querySelector(playerContainerElementSelector)
    const subsContainerElement = document.createElement('div')
    subsContainerElement.id = 'easysubs'
    playerContainerElement?.appendChild(subsContainerElement)

    ReactDOM.render(<SubsComponent />, document.querySelector('#easysubs'))
  }

  public static renderProgressBar(playerContainerElementSelector: string) {
    const playerContainerElement = document.querySelector(playerContainerElementSelector)
    const progressBarElement = document.createElement('div')
    progressBarElement.className = 'easysubs-progress-bar'
    playerContainerElement?.appendChild(progressBarElement)

    ReactDOM.render(<ProgressBar />, document.querySelector('.easysubs-progress-bar'))
  }

  public static renderSettings(settingsSelector: string, settingsContentSelector: string) {
    const referenceNode = document.querySelector(settingsSelector)
    const parentNode = referenceNode?.parentNode
    const settingNode = document.createElement('div')
    settingNode.className = 'easysubs-settings'
    parentNode?.insertBefore(settingNode, referenceNode)

    ReactDOM.render(
      <SettingsComponent settingsContentSelector={settingsContentSelector} />,
      document.querySelector('.easysubs-settings'),
    )
  }

  public static renderNotifications() {
    const referenceNode = document.querySelector('body')
    const parentNode = referenceNode?.parentNode
    const settingNode = document.createElement('div')
    settingNode.className = 'easysubs-notifications'
    parentNode?.insertBefore(settingNode, referenceNode)

    ReactDOM.render(<Notification />, document.querySelector('.easysubs-notifications'))
  }
}

export default UI
