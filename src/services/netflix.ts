import Service from "service";
import { parse } from "subtitle";
import { ready } from "../ready";

const WEBVTT = "webvtt-lssdh-ios8";
const MAIN_TITLE = ".player-status-main-title, .ellipsize-text>h4, .video-title>h4";
const SUB_TYPES = {
  closedcaptions: "[cc]",
  subtitles: ""
};

interface Track {
  isNoneTrack: boolean;
  isForcedNarrative: boolean;
  language: string;
  rawTrackType: "subtitles" | "closedcaptions";
  ttDownloadables: {
    "webvtt-lssdh-ios8": {
      downloadUrls: {};
    };
  };
}

class Netflix implements Service {
  private currentPathName: string;
  private subCache: any;

  constructor() {
    this.subCache = {};
    this.currentPathName = location.pathname;
    this.processSubData = this.processSubData.bind(this);
    this.injectScript();
    window.addEventListener("easysubs_data", this.processSubData);
  }

  public init() {
    ready("video", (videoElement: HTMLVideoElement) => {
      if (location.pathname.split("/")[1] === "watch") {
        if (Object.keys(this.subCache).length === 0 || this.currentPathName !== location.pathname) {
          this.currentPathName = localStorage.href;
          location.reload(true);
        }

        window.dispatchEvent(new CustomEvent("easysubsVideoReady"));
        window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: "en" }));
      }
    });
  }

  public getSubs(language: string) {
    const ccLanguage = language + SUB_TYPES.closedcaptions;
    const langKey = Object.keys(this.subCache).find(key => key === language || key === ccLanguage);

    const subUri = this.subCache[langKey];
    return fetch(subUri).then(resp => resp.text()).then(data => parse(data));
  }

  public playerContainerSelector(): string {
    return ".VideoContainer";
  }

  public settingSelector(): string {
    return ".button-nfplayerFullscreen";
  }

  private injection = () => {
    // tslint:disable-next-line: no-shadowed-variable
    const WEBVTT = "webvtt-lssdh-ios8";
    // hijack JSON.parse and JSON.stringify functions
    // tslint:disable-next-line: no-shadowed-variable
    ((parse, stringify) => {
      JSON.parse = text => {
        const data = parse(text);
        if (data && data.result && data.result.timedtexttracks && data.result.movieId) {
          if (location.pathname.split("/")[1] === "watch") {
            window.dispatchEvent(new CustomEvent("easysubs_data", { detail: data.result }));
          }
        }
        return data;
      };
      JSON.stringify = (data: any) => {
        if (data && data.params && data.params.profiles) {
          data.params.profiles.unshift(WEBVTT);
        }
        return stringify(data);
      };
    })(JSON.parse, JSON.stringify);
  };

  private randomProperty = (obj: any) => {
    const keys = Object.keys(obj);
    // tslint:disable-next-line: no-bitwise
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  private processSubData(event: any) {
    if (!["EPISODE", "MOVIE"].includes(event.detail.viewableType)) {
      return;
    }

    const tracks: Track[] = event.detail.timedtexttracks;

    for (const track of tracks) {
      if (track.isNoneTrack) {
        continue;
      }

      let type = SUB_TYPES[track.rawTrackType];
      if (typeof type === "undefined") type = `[${track.rawTrackType}]`;
      const lang = track.language + type + (track.isForcedNarrative ? "-forced" : "");

      this.subCache[lang] = this.randomProperty(track.ttDownloadables[WEBVTT].downloadUrls);
    }
  }

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default Netflix;
