import EnglishWithFun from './services/english-with-fun';
import KinoPub from './services/kinopub';
import Netflix from './services/netflix';
import Onvix from './services/onvix';
import YouTube from './services/youtube';

class Utils {
  public static castSubTime(time: number | string) {
    return typeof time === "number" ? time : parseInt(time, 10)
  }

  public static detectService(): YouTube | Netflix | Onvix | KinoPub | EnglishWithFun {
    const titleContent = document.querySelector('title').textContent
    if (titleContent.includes("YouTube") || window.location.host === "www.youtube.com") {
      document.querySelector('html').id = "youtube"
      return new YouTube
    }
    if (titleContent.includes("Netflix") || window.location.host === "www.netflix.com") {
      document.querySelector('html').id = "netflix"
      return new Netflix
    }
    if (titleContent.includes("Onvix") || document.querySelector('meta[content="ONVIX"]')) {
      document.querySelector('html').id = "onvix"
      return new Onvix
    }
    if (titleContent.includes("Кинопаб") || document.querySelector('meta[content="Кинопаб"]')) {
      document.querySelector('html').id = "kinopub"
      return new KinoPub
    }
    if (titleContent.includes("English-With-Fun") || window.location.host === "english-with-fun.com") {
      document.querySelector('html').id = "english-with-fun"
      return new EnglishWithFun
    }
    return null
  }

  public static clearWord(word: string): string {
    return word.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/g)?.shift() || ""
  }

  public static getVideoCurrentTime(video: HTMLVideoElement) {
    return Math.round(video.currentTime * 1000)
  }
}

export default Utils
