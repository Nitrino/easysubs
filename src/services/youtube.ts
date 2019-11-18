import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import { alpha3TToAlpha2 } from "@cospired/i18n-iso-languages";
import { ready } from "../ready"

interface Subtitle {
  baseUrl: string
  isTranslatable: boolean
  languageCode: string
  name: { simpleText: string }
  vssId: string
}

class YouTube implements Service {
  subs: object
  constructor() {
    this.subs = {}
  }

  init() {
    ready('video', (videoElement: HTMLVideoElement) => {
      videoElement.addEventListener("loadeddata", (event: any) => {
        window.dispatchEvent(new CustomEvent('easysubsVideoReady'));
        window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: "en" }));
      })
    })

    let oldHref = document.location.href;
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          window.dispatchEvent(new CustomEvent('easysubsSubtitlesChanged', { detail: "en" }));
          oldHref = document.location.href;
        }
      });
    });
    var config = { childList: true, subtree: true };
    observer.observe(document.querySelector("body"), config);
  }

  async getSubs(language: string) {
    const videoId = this.getVideoId()
    const subItem = await this.getVideoInfo(videoId, language);
    const subUri: string = subItem.baseUrl + "&fmt=vtt";

    const resp = await fetch(subUri);
    const text = await resp.text();
    return parse(text);
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

  settingSelector(): string {
    return ".ytp-right-controls > .ytp-size-button"
  }

  private async getVideoInfo(videoId: string, lang: string) {
    const resp = await fetch(`https://youtube.com/get_video_info?video_id=${videoId}`);
    const text = await resp.text();
    const data = decodeURIComponent(text);

    if (!data.includes('captionTracks'))
      throw new Error(`Could not find captions for video: ${videoId}`);

    const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
    const [match] = regex.exec(data);
    const { captionTracks } = JSON.parse(`${match}}`);

    const subtitle: Subtitle = captionTracks.find((track: any) => { return track.vssId == `.${lang}`; }) ||
      captionTracks.find((track: any) => { return track.vssId == `a.${lang}`; }) ||
      captionTracks.find((track: any) => { return track.vssId.match(`.${lang}`); });

    if (!subtitle || (subtitle && !subtitle.baseUrl))
      throw new Error(`Could not find ${lang} captions for ${videoId}`);

    return subtitle;
  }
}

export default YouTube;
