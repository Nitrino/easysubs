import Service from 'service'
import { subTitleType, parse } from 'subtitle'
import { alpha3TToAlpha2 } from "@cospired/i18n-iso-languages";

const WEBVTT = 'webvtt-lssdh-ios8';
const MAIN_TITLE = '.player-status-main-title, .ellipsize-text>h4, .video-title>h4';
const SUB_TYPES = {
  'subtitles': '',
  'closedcaptions': '[cc]'
};

interface Track {
  isNoneTrack: boolean,
  isForcedNarrative: boolean,
  language: string,
  rawTrackType: "subtitles" | "closedcaptions",
  ttDownloadables: {
    "webvtt-lssdh-ios8": {
      downloadUrls: {}
    }
  }
}

class Netflix implements Service {
  subCache: any;

  constructor() {
    this.subCache = {}
    this.processSubData = this.processSubData.bind(this)
    this.injectScript()
    window.addEventListener('easysubs_data', this.processSubData)
  }

  getSubs(language: string) {
    const languageAlpha2 = alpha3TToAlpha2(language)
    const ccLanguageAlpha2 = languageAlpha2 + SUB_TYPES['closedcaptions']
    const langKey = Object.keys(this.subCache).find(key => key == languageAlpha2 || key == ccLanguageAlpha2)

    const subUri = this.subCache[langKey]
    return fetch(subUri)
      .then(resp => resp.text())
      .then(data => parse(data))
  }

  playerContainerElement(): HTMLElement {
    return document.querySelector(".VideoContainer")
  }

  private injection = () => {
    const WEBVTT = "webvtt-lssdh-ios8";
    // hijack JSON.parse and JSON.stringify functions
    ((parse, stringify) => {
      JSON.parse = function (text) {
        const data = parse(text);
        if (data && data.result && data.result.timedtexttracks && data.result.movieId) {
          window.dispatchEvent(new CustomEvent('easysubs_data', { detail: data.result }));
        }
        return data;
      };
      JSON.stringify = function (data: any) {

        if (data && data.params && data.params.profiles) {
          data.params.profiles.unshift(WEBVTT);
        }
        return stringify(data);
      };
    })(JSON.parse, JSON.stringify);
  }

  private randomProperty = (obj: any) => {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
  };

  private processSubData(event: any) {
    if (event.detail.viewableType != "EPISODE") { return }
    const tracks: Track[] = event.detail.timedtexttracks;

    for (const track of tracks) {
      if (track.isNoneTrack) { continue }

      let type = SUB_TYPES[track.rawTrackType];
      if (typeof type === 'undefined')
        type = `[${track.rawTrackType}]`;
      const lang = track.language + type + (track.isForcedNarrative ? '-forced' : '');

      this.subCache[lang] = this.randomProperty(track.ttDownloadables[WEBVTT].downloadUrls);
    }
  }

  private injectScript() {
    const sc = document.createElement('script');
    sc.innerHTML = '(' + this.injection.toString() + ')()';
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default Netflix;
