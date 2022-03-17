import { subTitleType } from 'subtitle'
interface Service {
  // Getting subtitles from a service
  getSubs(language: string): Promise<subTitleType[]>

  // Player container selector, required to render subtitles
  playerContainerSelector(): string

  // Selector for injecting the application icon in the player
  settingsSelector(): string | HTMLElement

  // Selector for rendering extension settings inside the player container
  settingsContentSelector(): string
}

export default Service
