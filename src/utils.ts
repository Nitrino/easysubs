import Onvix from './services/onvix';
import KinoPub from './services/kinopub';
import YouTube from './services/youtube';
import Netflix from './services/netflix';

class Utils {
  static castSubTime(time: number | string) {
    return typeof time == "number" ? time : parseInt(time)
  }

  static detectService(): YouTube | Netflix | Onvix | KinoPub {
    const titleContent = document.querySelector('title').textContent
    if (titleContent.includes("YouTube") || window.location.host == "www.youtube.com") {
      document.querySelector('html').id = "youtube"
      return new YouTube
    }
    else if (titleContent.includes("Netflix") || window.location.host == "www.netflix.com") {
      document.querySelector('html').id = "netflix"
      return new Netflix
    }
    else if (titleContent.includes("Onvix") || document.querySelector('meta[content="ONVIX"]')) {
      document.querySelector('html').id = "onvix"
      return new Onvix
    }
    else if (titleContent.includes("Кинопаб") || document.querySelector('meta[content="Кинопаб"]')) {
      document.querySelector('html').id = "kinopub"
      return new KinoPub
    }
    else {
      return null
    }
  }

  static removeAllElements(elms: NodeListOf<Element>) {
    elms.forEach(el => el.remove());
  }
}

export default Utils
