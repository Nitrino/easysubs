import Service from './service'
import { parse, subTitleType } from 'subtitle'
import { ready } from '../ready'

class Coursera implements Service {
  constructor() {
    this.injectScript = this.injectScript.bind(this)
  }

  public init() {
    ready('video', this.injectScript)
  }

  public async getSubs(language: string): Promise<subTitleType[]> {
    if (!language) return parse('')
    const track: HTMLTrackElement | null = document.querySelector(`track[srclang="${language}"]`)

    if (!track) {
      console.error("Can't find track with lang=${language}")
      return []
    }

    const subUri: string = track.src
    const resp = await fetch(subUri)
    const text = await resp.text()

    return parse(text)
  }

  public settingsSelector(): string {
    return '.rc-FullscreenToggle'
  }

  public settingsContentSelector(): string {
    return '.easysubs-settings-container'
  }

  public playerContainerSelector(): string {
    return '.rc-VideoControlsContainer'
  }

  private injection = () => {
    function getLanguage(playerInstance: any) {
      return playerInstance.currentTrack()?.language || ''
    }

    const player = (document.querySelector('.video-js') as any).player
    window.dispatchEvent(new CustomEvent('easysubsVideoReady'))

    player.on('loadeddata', () => {
      window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: getLanguage(player) }))
      window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
    })

    player.textTracks().on('change', () => {
      window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: getLanguage(player) }))
      window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
    })
  }

  private injectScript() {
    const sc = document.createElement('script')
    sc.innerHTML = `(${this.injection.toString()})()`
    document.head.appendChild(sc)
    document.head.removeChild(sc)
  }
}

export default Coursera
