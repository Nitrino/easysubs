interface Window {
  isEnabled: boolean
  netflix: any
  playerInstance: any
  jwPlayer: any
  currentLanguage: string
  isLoaded: boolean
  subtitlesEnabled: boolean
}

declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>

  export default ReactComponent
}

declare module 'm3u8-parser' {
  export class Parser {
    push: (string: string) => void
    end: () => void
    manifest: {
      allowCache: boolean
      endList: boolean
      mediaSequence: number
      discontinuitySequence: number
      playlistType: string
      custom: Record<unknown, unknown>
      playlists: [
        {
          attributes: Record<unknown, unknown>
          Manifest
        },
      ]
      mediaGroups: {
        AUDIO: {
          'GROUP-ID': {
            NAME: {
              default: boolean
              autoselect: boolean
              language: string
              uri: string
              instreamId: string
              characteristics: string
              forced: boolean
            }
          }
        }
        VIDEO: Record<unknown, unknown>
        'CLOSED-CAPTIONS': Record<unknown, unknown>
        SUBTITLES: {
          sub: Record<
            string,
            {
              uri: string
            }
          >
        }
      }
      dateTimeString: string
      dateTimeObject: Date
      targetDuration: number
      totalDuration: number
      discontinuityStarts: [number]
      segments: [
        {
          byterange: {
            length: number
            offset: number
          }
          duration: number
          attributes: Record<unknown, unknown>
          discontinuity: number
          uri: string
          timeline: number
          key: {
            method: string
            uri: string
            iv: string
          }
          map: {
            uri: string
            byterange: {
              length: number
              offset: number
            }
          }
          'cue-out': string
          'cue-out-cont': string
          'cue-in': string
          custom: Record<unknown, unknown>
        },
      ]
    }
  }
}
