import { learningServiceStore } from '../store'
import { Lingualeo } from './Lingualeo'
import { PuzzleEnglish } from './PuzzleEnglish'

export const getCurrentLearningService = () => {
  const currentServiceName = learningServiceStore.getState()
  switch (currentServiceName) {
    case 'lingualeo':
      return new Lingualeo()
    case 'puzzle-english':
      return new PuzzleEnglish()
    default:
      return undefined
  }
}
