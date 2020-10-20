import Service from "service";
import { parse } from "subtitle";

const WEBVTT = "webvtt-lssdh-ios8";
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
  private subCache: any;

  constructor() {
    this.subCache = {};
    this.processSubData = this.processSubData.bind(this);
    window.addEventListener("easysubs_data", this.processSubData);
  }

  public init() {
    this.injectScript();
  }

  public async getSubs(language: string) {
    if (language === "") return parse("");

    const ccLanguage = language + SUB_TYPES.closedcaptions;
    const subsList = this.subCache[this.getMoveId()];
    const langKey = Object.keys(subsList).find(key => key === language || key === ccLanguage);

    const subUri = subsList[langKey];
    const resp = await fetch(subUri);
    const data = await resp.text();
    return parse(data);
  }

  public playerContainerSelector(): string {
    return ".VideoContainer";
  }

  public settingsSelector(): string {
    return ".button-nfplayerFullscreen";
  }

  public settingsContentSelector(): string {
    return "#appMountPoint";
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

    function getPlayer() {
      const videoPlayer = netflix.appContext.state.playerApp.getAPI().videoPlayer;
      const sessionId = videoPlayer.getAllPlayerSessionIds()[0];
      return videoPlayer.getVideoPlayerBySessionId(sessionId);
    }

    function handleSeek(event: any) {
      getPlayer().seek(event.detail);
    }

    window.addEventListener("easysubsSeek", handleSeek);

    window.setInterval(() => {
      const player = getPlayer();

      if (player && "getLoaded" in player && player.getLoaded()) {
        if (!window.isLoaded) {
          window.isLoaded = true;
          window.dispatchEvent(new CustomEvent("easysubsVideoReady"));
        }

        if (window.currentLanguage !== player.getTimedTextTrack().bcp47) {
          window.currentLanguage = player.getTimedTextTrack().bcp47;
          window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: window.currentLanguage }));
        }
      } else {
        window.isLoaded = false;
        window.currentLanguage = null;
      }
    }, 500);
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

    this.subCache[event.detail.movieId] = {};
    const tracks: Track[] = event.detail.timedtexttracks;

    for (const track of tracks) {
      if (track.isNoneTrack) {
        continue;
      }

      let type = SUB_TYPES[track.rawTrackType];
      if (typeof type === "undefined") type = `[${track.rawTrackType}]`;
      const lang = track.language + type + (track.isForcedNarrative ? "-forced" : "");
      this.subCache[event.detail.movieId][lang] = this.randomProperty(track.ttDownloadables[WEBVTT].downloadUrls);
    }
  }

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }

  private getMoveId() {
    return window.location.pathname.match(/\/watch\/(.*)/)[1];
  }
}

export default Netflix;
