import KinoPub from '@/streamings/kinopub'
import Service from '@/streamings/service'
import ServiceStub from '@/streamings/ServiceStub'

export const getCurrentService = (): Service | null => {
  const titleContent = document.querySelector('title')?.textContent
  // if (titleContent?.includes('YouTube') || window.location.host === 'www.youtube.com') {
  //   document.querySelector('html')?.setAttribute('id', 'youtube')
  //   return 'youtube'
  // }
  // if (titleContent?.includes('Netflix') || window.location.host === 'www.netflix.com') {
  //   document.querySelector('html')?.setAttribute('id', 'netflix')
  //   return 'netflix'
  // }
  if (titleContent?.includes('Кинопаб') || document.querySelector('meta[content="Кинопаб"]') != null) {
    document.querySelector('html')?.setAttribute('id', 'kinopub')
    return new KinoPub()
  }
  // if (titleContent?.includes('English-With-Fun') || window.location.host === 'english-with-fun.com') {
  //   document.querySelector('html')?.setAttribute('id', 'english-with-fun')
  //   return 'englishwithfun'
  // }
  // if (titleContent?.includes('Coursera') || window.location.host === 'www.coursera.org') {
  //   document.querySelector('html')?.setAttribute('id', 'coursera')
  //   return 'coursera'
  // }

  return new ServiceStub()
}
