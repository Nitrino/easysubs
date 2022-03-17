import EnglishWithFun from '../services/english-with-fun'
import KinoPub from '../services/kinopub'
import Netflix from '../services/netflix'
import YouTube from '../services/youtube'
import Coursera from '../services/coursera'

export const detectService = (): YouTube | Netflix | KinoPub | EnglishWithFun | Coursera | undefined => {
  const titleContent = document.querySelector('title')?.textContent
  if (titleContent?.includes('YouTube') || window.location.host === 'www.youtube.com') {
    document.querySelector('html')?.setAttribute('id', 'youtube')
    return new YouTube()
  }
  if (titleContent?.includes('Netflix') || window.location.host === 'www.netflix.com') {
    document.querySelector('html')?.setAttribute('id', 'netflix')
    return new Netflix()
  }
  if (titleContent?.includes('Кинопаб') || document.querySelector('meta[content="Кинопаб"]')) {
    document.querySelector('html')?.setAttribute('id', 'kinopub')
    return new KinoPub()
  }
  if (titleContent?.includes('English-With-Fun') || window.location.host === 'english-with-fun.com') {
    document.querySelector('html')?.setAttribute('id', 'english-with-fun')
    return new EnglishWithFun()
  }
  if (titleContent?.includes('Coursera') || window.location.host === 'www.coursera.org') {
    document.querySelector('html')?.setAttribute('id', 'coursera')
    return new Coursera()
  }

  return undefined
}
