export {}

declare global {
  interface Window {
    playerInstance: any
    isLoaded: boolean
    subtitlesEnabled: boolean
  }
}
