import Service from './service'
import { parse, subTitleType } from 'subtitle'

const WEBVTT = 'webvtt-lssdh-ios8'
const SUB_TYPES = {
  closedcaptions: '[cc]',
  subtitles: '',
}

type TTrack = {
  isNoneTrack: boolean
  isForcedNarrative: boolean
  language: string
  rawTrackType: 'subtitles' | 'closedcaptions'
  ttDownloadables: {
    'webvtt-lssdh-ios8': {
      downloadUrls: Record<string, string>
    }
    simplesdh: {
      downloadUrls: Record<string, string>
    }
  }
}

class Netflix implements Service {
  private subCache: {
    [moveId: string]: {
      [lang: string]: string
    }
  }

  constructor() {
    this.subCache = {}
    this.processSubData = this.processSubData.bind(this)
    window.addEventListener('easysubsData', this.processSubData as EventListener)
  }

  public init(): void {
    this.injectScript()
    setInterval(() => {
      const videoControlContainer = document.querySelector('.watch-video--bottom-controls-container')
      const easysubsSettings = document.querySelector('.easysubs-settings')
      if (videoControlContainer && !easysubsSettings) {
        window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
      }
    }, 100)
  }

  // Selector to find player container
  public async getSubs(language: string): Promise<subTitleType[]> {
    if (language === '') return parse('')

    const ccLanguage = language + SUB_TYPES.closedcaptions
    const subsList = this.subCache[this.getMoveId()]
    const langKey = Object.keys(subsList).find((key) => key === language || key === ccLanguage) || ''

    const subUri = subsList[langKey]
    const resp = await fetch(subUri)
    const data = await resp.text()
    return parse(data)
  }

  // Selector to insert estention settings menu
  public playerContainerSelector(): string {
    return '.watch-video--player-view'
  }

  // Selector to insert estention settings menu
  public settingsSelector(): HTMLElement | string {
    return document.querySelector('[data-uia="control-fullscreen-enter"]')?.parentElement || ''
  }

  public settingsContentSelector(): string {
    return '#appMountPoint'
  }

  // Injectes the script into the service page
  private injectScript(): void {
    const sc = document.createElement('script')
    sc.innerHTML = `(${this.injection.toString()})()`
    document.head.appendChild(sc)
    document.head.removeChild(sc)
  }

  // A script that injectes into service page and can intercept events and add our logic
  private injection = (): void => {
    const parseMock = JSON.parse
    const stringifyMock = JSON.stringify
    const jsonMock = JSON

    // Override the standard JSON.parse function.
    // This is required to intercept subtitles from the server response.
    JSON.parse = function () {
      const data = parseMock.apply(this, arguments as any)
      if (data && data.result && data.result.timedtexttracks) {
        // Sends subtitles from the site page to the extension via a browser event
        window.dispatchEvent(new CustomEvent('easysubsData', { detail: data.result }))
      }
      return data
    }

    // Override the standard JSON.stringify function.
    // This is required for the Netflix server to respond with subtitles in vtt format.
    // Also here we request all available audio tracks and subtitles, regardless of the region
    JSON.stringify = function (response: typeof JSON.stringify) {
      if (!response) return jsonMock.stringify.apply(this, arguments as any)
      const data = parseMock(stringifyMock.apply(this, arguments as any))

      let modified = false
      if (data && data.params && data.params.showAllSubDubTracks != null) {
        data.params.showAllSubDubTracks = true
        modified = true
      }
      if (data && data.params && data.params.profiles) {
        data.params.profiles.push('webvtt-lssdh-ios8')
        modified = true
      }

      return modified ? stringifyMock(data) : stringifyMock.apply(this, arguments as any)
    }

    // We find the global variable of the Netflix player to subscribe to its events and control the player
    function getPlayer() {
      const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer
      const sessionId = videoPlayer.getAllPlayerSessionIds()[0]
      return videoPlayer.getVideoPlayerBySessionId(sessionId)
    }

    function handleSeek(event: CustomEvent) {
      getPlayer().seek(event.detail)
    }

    window.addEventListener('easysubsSeek', handleSeek as EventListener)

    // Hack to wait for the player to load
    window.setInterval(() => {
      const player = getPlayer()

      if (player && document.querySelector('.watch-video--player-view')) {
        if (!window.isLoaded) {
          window.isLoaded = true
          // We send a message to the extension that the player has loaded and is ready to play
          window.dispatchEvent(new CustomEvent('easysubsVideoReady'))
        }

        if (window.currentLanguage !== player.getTimedTextTrack().bcp47) {
          window.currentLanguage = player.getTimedTextTrack().bcp47
          // When changing subtitles, we send an event to the extension
          window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: window.currentLanguage }))
        }
      } else {
        window.isLoaded = false
        window.currentLanguage = ''
      }
    }, 500)
  }

  // Convert the response of the Netflix server to a convenient format and save it to the cache
  private processSubData(event: CustomEvent): void {
    if (!['EPISODE', 'MOVIE'].includes(event.detail.viewableType)) {
      return
    }

    this.subCache[event.detail.movieId] = {}
    const tracks: TTrack[] = event.detail.timedtexttracks

    for (const track of tracks) {
      if (track.isNoneTrack) {
        continue
      }

      let type = SUB_TYPES[track.rawTrackType]
      if (typeof type === 'undefined') type = `[${track.rawTrackType}]`
      const lang = track.language + type + (track.isForcedNarrative ? '-forced' : '')
      this.subCache[event.detail.movieId][lang] = this.randomProperty(track.ttDownloadables[WEBVTT].downloadUrls)
    }
  }

  private getMoveId(): string {
    const videoIdElement: HTMLElement | null = document.querySelector('*[data-videoid]')
    return videoIdElement?.dataset?.videoid || ''
  }

  private randomProperty = (obj: Record<string, string>): string => {
    const keys = Object.keys(obj)
    return obj[keys[(keys.length * Math.random()) << 0]]
  }
}

export default Netflix
