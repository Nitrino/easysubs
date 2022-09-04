/* @refresh reload */
import { render } from 'solid-js/web'
import { Captions } from 'subtitle'

import { esRenderSetings, esSubsChanged, fetchServiceSubsFx } from '@/models/subs'
import { $streaming, fetchCurrentStreamingFx } from '@/models/streamings'

import Subs from './Subs'
import './models/init'

fetchCurrentStreamingFx()

$streaming.watch((streaming) => {
  if (streaming == null) {
    return
  }

  esRenderSetings.watch(() => {
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
  })

  esSubsChanged.watch((language) => {
    console.log('Event:', 'esSubsChanged')
    console.log('Language:', language)

    // UI.renderSubs(service.playerContainerSelector())
    // UI.renderProgressBar(service.playerContainerSelector())
    // UI.renderNotifications()

    fetchServiceSubsFx(language)
    // streaming.getSubs(language).then((subs: Captions) => {
    //   console.log('Subs:', subs)
    // })
  })

  streaming.init()
})
