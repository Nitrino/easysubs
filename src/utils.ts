import { learningServiceStore } from "./store";
import EnglishWithFun from './services/english-with-fun';
import KinoPub from './services/kinopub';
import Netflix from './services/netflix';
import YouTube from './services/youtube';
import Lingualeo from "./learning-services/lingualeo";
import PuzzleEnglish from "./learning-services/PuzzleEnglish";

class Utils {
  public static castSubTime(time: number | string) {
    return typeof time === "number" ? time : parseInt(time, 10)
  }

  public static detectService(): YouTube | Netflix | KinoPub | EnglishWithFun {
    const titleContent = document.querySelector('title').textContent
    if (titleContent.includes("YouTube") || window.location.host === "www.youtube.com") {
      document.querySelector('html').id = "youtube"
      return new YouTube
    }
    if (titleContent.includes("Netflix") || window.location.host === "www.netflix.com") {
      document.querySelector('html').id = "netflix"
      return new Netflix
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

  public static getCurrentLearningService() {
    const currentServiceName = learningServiceStore.getState()
    switch (currentServiceName) { 
      case "lingualeo": 
        return new Lingualeo()
      case "puzzle-english":
        return new PuzzleEnglish()
      default:
        console.error("Call add word for unknown learning service");
        break;
    }
  }
}

export default Utils
