import Service from 'service'
import { subTitleType, parse } from 'subtitle'
class Netflix implements Service {
  getSubs(language: string) {
    return new Promise<subTitleType[]>((resolve, reject) => {
      return parse("")
    });
  }

  playerContainerElement(): HTMLElement {
    return document.createElement("div")
  }
}

export default Netflix;
