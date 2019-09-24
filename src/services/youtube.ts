import Service from 'service'
import { subTitleType, parse } from 'subtitle'

class YouTube implements Service {
  getSubs(language: string) {
    return new Promise<subTitleType[]>((resolve, reject) => {
      return parse("")
    });
  }

  playerContainerElement(): HTMLElement {
    return document.createElement("div")
  }
}

export default YouTube;
