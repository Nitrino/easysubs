import * as Sentry from '@sentry/browser'
import { subTitleType } from 'subtitle'
import { updateSubs } from './event'
import { subsStore } from './store'
import UI from './ui'
import { detectService } from './utils/detectService'

Sentry.init({
  dsn: 'https://f0696dfa1f80424f9f0f628d8d1d7796@sentry.io/1849876',
  defaultIntegrations: Sentry.defaultIntegrations.filter(({ name }: any) => name !== 'TryCatch'),
})

window.addEventListener('unhandledrejection', (event) => {
  Sentry.captureEvent(event.reason)
})

try {
  const service = detectService()

  if (service) {
    const handleEasysubsSubtitlesChanged = (event: CustomEvent) => {
      console.log('Event:', 'easysubsSubtitlesChanged')
      console.log('Language:', event.detail)

      UI.renderSubs(service.playerContainerSelector())
      UI.renderProgressBar(service.playerContainerSelector())
      UI.renderNotifications()
      service.getSubs(event.detail).then((subs: subTitleType[]) => {
        updateSubs(subs)
      })
    }

    const handleEasysubsVideoReady = () => {
      console.log('Event:', 'easysubsVideoReady')

      window.addEventListener('easysubsRenderSettings', () => {
        UI.renderSettings(service.settingsSelector(), service.settingsContentSelector())
      })
    }

    console.log('Easysubs initialized. Service:', service.constructor.name)

    window.addEventListener('easysubsVideoReady', handleEasysubsVideoReady)
    window.addEventListener('easysubsSubtitlesChanged', handleEasysubsSubtitlesChanged as EventListener)
    service.init()

    subsStore.on(updateSubs, (_, subs: subTitleType[]) => subs)
  }
} catch (e) {
  console.error('Easysubs unknown error:', e)
  Sentry.captureEvent(e as any)
}
