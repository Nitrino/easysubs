/* @refresh reload */
import { render } from 'solid-js/web'

import { esRenderSetings, esSubsChanged, fetchServiceSubsFx } from '@/models/subs'
import { $streaming, fetchCurrentStreamingFx } from '@/models/streamings'
import { $video, getCurrentVideoFx, videoTimeUpdate } from '@/models/videos'

import { Subs } from './components/Subs'
import { Settings } from './components/Settings'
import './models/init'
import './main.css'

fetchCurrentStreamingFx()
const handleTimeUpdate = () => videoTimeUpdate()

$streaming.watch((streaming) => {
  if (streaming == null) {
    return
  }

  esRenderSetings.watch(() => {
    document.querySelectorAll('.es-settings').forEach((e) => e.remove())
    const buttonContainer = streaming.getSettingsButtonContainer()
    const contentContainer = streaming.getSettingsContentContainer()

    const parentNode = buttonContainer?.parentNode
    const settingNode = document.createElement('div')
    settingNode.className = 'es-settings'
    parentNode?.insertBefore(settingNode, buttonContainer)

    getCurrentVideoFx()
    $video.watch((video) => {
      video?.removeEventListener('timeupdate', handleTimeUpdate)
      video?.addEventListener('timeupdate', handleTimeUpdate)
    })
    render(() => <Settings contentContainer={contentContainer} />, settingNode)
  })

  esSubsChanged.watch((language) => {
    fetchServiceSubsFx(language)
    console.log('Event:', 'esSubsChanged')
    console.log('Language:', language)

    document.querySelectorAll('#es').forEach((e) => e.remove())
    const subsContainer = streaming.getSubsContainer()
    const subsNode = document.createElement('div')
    subsNode.id = 'es'
    subsContainer?.appendChild(subsNode)

    render(() => <Subs />, subsNode)
  })

  streaming.init()
})
