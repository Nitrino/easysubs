import { Parser } from 'm3u8-parser'
import { parse } from 'subtitle'

import { esRenderSetings, esSubsChanged } from '@/models/subs'
import Service from '../service'
import injection from './injection?script&module'

class KinoPub implements Service {
  private videoPlaylistUrl: string | undefined
  private subsName: string | undefined

  constructor() {
    this.handleEasysubsPlaylistChanged = this.handleEasysubsPlaylistChanged.bind(this)
  }

  public init(): void {
    this.injectScript()
    window.addEventListener('easysubsPlaylistChanged', this.handleEasysubsPlaylistChanged as EventListener)
    window.addEventListener('easysubsSubsChanged', ((event: CustomEvent) => {
      this.subsName = event.detail
    }) as EventListener)
  }

  public async getSubs(label: string) {
    if (!label) return parse('')
    if (!this.videoPlaylistUrl) return parse('')

    const cdnHostName = new URL(this.videoPlaylistUrl)?.hostname ?? 'cdn-azure.net'
    const resp = await fetch(this.videoPlaylistUrl)
    const data = await resp.text()
    const parser = new Parser()
    parser.push(data)
    parser.end()
    const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub

    const uri = `https://${cdnHostName}${subsSegments[label].uri}`
    const subsSegmentsResp = await fetch(uri)
    const subsSegmentsData = await subsSegmentsResp.text()

    const subsSegmentsParser = new Parser()
    subsSegmentsParser.push(subsSegmentsData)
    subsSegmentsParser.end()
    const subPath = subsSegmentsParser.manifest.segments[0].uri.match(/.*\/hls\/(.*)\/seg.*/)?.[1]
    const subUri = `https://${cdnHostName}/pd/${subPath}`

    const subsResp = await fetch(subUri)
    const subsData = await subsResp.text()

    const subs = parse(subsData)

    return subs
  }

  public getSubsContainer() {
    const selector = document.querySelector('#player')
    if (selector === null) throw new Error('Subtitles container not found')
    return selector as HTMLElement
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector('.jw-button-container > div:last-child')
    if (selector === null) throw new Error('Settings button container not found')
    return selector as HTMLElement
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector('#player')
    if (selector === null) throw new Error('Settings content container not found')
    return selector as HTMLElement
  }

  private injectScript() {
    const script = document.createElement('script')
    script.src = chrome.runtime.getURL(injection)
    script.type = 'module'
    document.head.prepend(script)
  }

  private handleEasysubsPlaylistChanged(event: CustomEvent) {
    console.log('easysubsPlaylistChanged', event.detail)

    this.videoPlaylistUrl = event.detail
    if (this.subsName) {
      esSubsChanged(this.subsName)
    }
    esRenderSetings()
    window.dispatchEvent(new CustomEvent('easysubsSubsChanged', { detail: this.subsName }))
    window.dispatchEvent(new CustomEvent('easysubsRenderSettings'))
  }
}

export default KinoPub
