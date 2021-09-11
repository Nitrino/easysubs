import { subTitleType } from 'subtitle'
interface Service {
  getSubs(language: string): Promise<subTitleType[]>
  playerContainerSelector(): string
  settingsSelector(): string | HTMLElement
  settingsContentSelector(): string
}

export default Service
