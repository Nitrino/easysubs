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
    const parseMock = JSON.parse;
    const stringifyMock = JSON.stringify;

    JSON.parse = function() {
      const data = parseMock.apply(this, arguments);
      if (data && data.result && data.result.timedtexttracks) {
        window.dispatchEvent(new CustomEvent("easysubs_data", { detail: data.result }));
      }
      return data;
    };

    JSON.stringify = function(response: any) {
      if (!response) return stringifyMock.apply(this, arguments);
      const data = parseMock(stringifyMock.apply(this, arguments));

      let modified = false;
      if (data && data.params && data.params.showAllSubDubTracks != null) {
        data.params.showAllSubDubTracks = true;
        modified = true;
      }
      if (data && data.params && data.params.profiles) {
        data.params.profiles.push("webvtt-lssdh-ios8");
        modified = true;
      }

      return modified ? stringifyMock(data) : stringifyMock.apply(this, arguments);
    };
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
