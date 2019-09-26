import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import { alpha3TToAlpha2 } from "@cospired/i18n-iso-languages";
import UI from "../ui"

class YouTube implements Service {
  getSubs(language: string) {
    const base_path = "https://www.youtube.com/api/timedtext"
    const videoId = this.getVideoId()
    const params = new URLSearchParams({
      v: videoId,
      lang: alpha3TToAlpha2(language),
      name: alpha3TToAlpha2(language),
      fmt: "vtt"
    });
    const url = base_path + "?" + params.toString()
    console.log(url);

    return fetch(url)
      .then((resp) => resp.text())
      .then(function (text) {
        return parse(text)
      })
  }

  playerContainerElement(): HTMLElement {
    return document.querySelector(".html5-video-player")
  }

  getVideoId() {
    const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = window.location.href.match(regExpression);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      console.error("Can't get youtube video id");
    }
  }
}

export default YouTube;
