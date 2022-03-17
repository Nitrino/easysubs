import Service from './service'
import { parse } from 'subtitle'

class EnglishWithFun implements Service {
  private subUrl: string

  constructor() {
    this.subUrl = ''
  }

  public init() {
    window.addEventListener('easysubsChangePlaylist', ((event: CustomEvent) => {
      this.subUrl = event.detail
    }) as EventListener)
    this.injectScript()
  }

  public async getSubs(label: string) {
    if (!label) return parse('')

    const subsResp = await fetch(this.subUrl)
    const subsData = await subsResp.text()

    const subs = parse(subsData)
    return subs
  }

  public playerContainerSelector(): string {
    return '#video-player'
  }

  public settingsSelector(): string {
    return '.jw-icon-settings.jw-settings-submenu-button'
  }

  public settingsContentSelector(): string {
    return '.easysubs-settings-container'
  }

  private injectScript() {
    const sc = document.createElement('script')
    sc.innerHTML = `(${this.injection.toString()})()`
    document.head.appendChild(sc)
    document.head.removeChild(sc)
  }

  private injection = () => {
    if (!window.jwPlayer) return

    window.dispatchEvent(new CustomEvent('easysubsVideoReady'))

    window.jwPlayer.on('captionsChanged', () => {
      const track = window.jwPlayer.getConfig().captionsTrack
      const label = track ? track.label : null

      if (track) {
        window.dispatchEvent(new CustomEvent('easysubsChangePlaylist', { detail: track.file }))
      }
      window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: label }))
      window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
    })

    window.jwPlayer.on('firstFrame', () => {
      const track = window.jwPlayer.getConfig().captionsTrack
      if (track) {
        window.dispatchEvent(new CustomEvent('easysubsChangePlaylist', { detail: track.file }))
      }
      const label = track ? track.label : null
      window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: label }))
      window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
    })
  }
}

export default EnglishWithFun
