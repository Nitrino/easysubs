import Service from 'service'
import { subTitleType, parse } from 'subtitle'
class KinoPub implements Service {
  getSubs(language: string) {
    return new Promise<subTitleType[]>((resolve, reject) => {
      return parse("")
    });
  }

  playerContainerElement(): HTMLElement {
    return document.createElement("div")
  }
}

export default KinoPub;
