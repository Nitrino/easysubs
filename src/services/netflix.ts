import Service from 'service'
import { subTitleType, parse } from 'subtitle'
class Netflix implements Service {
  getSubs(language: string) {
    return Promise.resolve(parse(""))
  }

  playerContainerElement(): HTMLElement {
    return document.createElement("div")
  }
}

export default Netflix;
