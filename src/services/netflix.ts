import Service from 'service'
import { subTitleType, parse } from 'subtitle'
class Netflix implements Service {
  getSubs(language: string) {
    return new Promise<subTitleType[]>((resolve, reject) => {
      return parse("")
    });
  }

  createSubsElement() {
    return document.createElement("p")
  }

  createSubsTranslateElement(subs: HTMLElement, originalText: string, translatedText: string) {
    return document.createElement("div")
  }

  createSubsProgressBarElement() {
    return document.createElement("div")
  }
}

export default Netflix;
