/* @refresh reload */
import { render } from 'solid-js/web'
import { Captions } from 'subtitle'

import { $streaming, fetchCurrentService } from '@/models/subs'
import Subs from './Subs'
import './models/init'

fetchCurrentService()

$streaming.watch((streaming) => {
  if (streaming == null) {
    return
  }

  const handleRenderSettings = () => {
    const buttonContainer = streaming.getSettingsButtonContainer()
    const contentContainer = streaming.getSettingsContentContainer()
    document.querySelectorAll('.easysubs-settings').forEach((e) => e.remove())

    const parentNode = buttonContainer?.parentNode
    const settingNode = document.createElement('div')
    settingNode.className = 'easysubs-settings'
    parentNode?.insertBefore(settingNode, buttonContainer)

    render(
      () => <Subs contentContainer={contentContainer} />,
      document.querySelector('.easysubs-settings') as HTMLElement,
    )
  }

  const handleSubsChanged = (event: CustomEvent) => {
    console.log('Event:', 'easysubsSubsChanged')
    console.log('Language:', event.detail)

    // UI.renderSubs(service.playerContainerSelector())
    // UI.renderProgressBar(service.playerContainerSelector())
    // UI.renderNotifications()
    streaming.getSubs(event.detail).then((subs: Captions) => {
      console.log('Subs:', subs)
    })
  }

  window.addEventListener('easysubsRenderSettings', handleRenderSettings)
  window.addEventListener('easysubsSubsChanged', handleSubsChanged as EventListener)

  streaming.init()
})
