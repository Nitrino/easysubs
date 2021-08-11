import Service from './service'
import { parse, subTitleType } from 'subtitle'

class YouTube implements Service {
  private subCache: any

  constructor() {
    this.subCache = {}
    this.processSubData = this.processSubData.bind(this)
    window.addEventListener('easysubs_data', this.processSubData)
  }

  public init(): void {
    this.injectScript()
  }

  public async getSubs(language: string): Promise<subTitleType[]> {
    if (language === '') return parse('')
    const videoId = this.getVideoId()

    const urlObject: URL = new URL(this.subCache[videoId][language])
    urlObject.searchParams.set('fmt', 'vtt')
    const subUri: string = urlObject.href

    const resp = await fetch(subUri)
    const text = await resp.text()
    return parse(text)
  }

  public settingsSelector(): string {
    return '.ytp-right-controls > .ytp-size-button'
  }

  public settingsContentSelector(): string {
    return '.easysubs-settings-container'
  }

  public playerContainerSelector(): string {
    return '.html5-video-player'
  }

  private getVideoId(): string {
    const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = window.location.href.match(regExpression)
    if (match && match[2].length === 11) {
      return match[2]
    }
    console.error("Can't get youtube video id")
    return ''
  }

  private injection = () => {
    window.setInterval(() => {
      const player: any = document.getElementById('movie_player')
      const subsToggleElement = document.querySelector('.ytp-subtitles-button')

      if (player) {
        if (!window.isLoaded) {
          window.isLoaded = true
          window.dispatchEvent(new CustomEvent('easysubsVideoReady'))

          if (subsToggleElement && subsToggleElement.getAttribute('aria-pressed') === 'true') {
            player.toggleSubtitles()
            player.toggleSubtitles()
          } else {
            window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: '' }))
          }
        }
      } else {
        window.isLoaded = false
      }

      if (subsToggleElement) {
        if (window.subtitlesEnabled && subsToggleElement.getAttribute('aria-pressed') === 'false') {
          window.subtitlesEnabled = false
          window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: '' }))
        }
      }
    }, 500)
    ;((open) => {
      XMLHttpRequest.prototype.open = function (method: string, url: string) {
        if (url.match(/^http/g) !== null) {
          const urlObject = new URL(url)
          if (urlObject.pathname === '/api/timedtext') {
            window.subtitlesEnabled = true
            const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang')
            window.dispatchEvent(new CustomEvent('easysubs_data', { detail: urlObject.href }))
            window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: lang }))
          }
        }
        open.call(this, method, url, true)
      }
    })(XMLHttpRequest.prototype.open)
  }

  private processSubData(event: any): void {
    const urlObject = new URL(event.detail)
    const lang = urlObject.searchParams.get('tlang') || urlObject.searchParams.get('lang') || ''
    const videoId = urlObject.searchParams.get('v') || ''
    this.subCache[videoId] = {}
    this.subCache[videoId][lang] = urlObject.href
  }

  private injectScript(): void {
    const sc = document.createElement('script')
    sc.innerHTML = `(${this.injection.toString()})()`
    document.head.appendChild(sc)
    document.head.removeChild(sc)
  }
}

export default YouTube
