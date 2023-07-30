import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged } from "@src/models/subs";

const WEBVTT = "webvtt-lssdh-ios8";
const SUB_TYPES = {
  closedcaptions: "[cc]",
  subtitles: "",
};

type TUrl = {
  cdn_id: string;
  url: string;
};

type TTrack = {
  isNoneTrack: boolean;
  isForcedNarrative: boolean;
  language: string;
  rawTrackType: "subtitles" | "closedcaptions";
  ttDownloadables: {
    "webvtt-lssdh-ios8": {
      urls: Record<string, TUrl>;
    };
  };
};

class Netflix implements Service {
  private subCache: {
    [moveId: string]: {
      [lang: string]: string;
    };
  };

  constructor() {
    this.subCache = {};

    this.handleNetflixData = this.handleNetflixData.bind(this);
    this.handleNetflixVideoReady = this.handleNetflixVideoReady.bind(this);
    this.handleNetflixSubtitlesChanged = this.handleNetflixSubtitlesChanged.bind(this);

    setInterval(() => {
      const videoControlContainer = document.querySelector(".watch-video--bottom-controls-container");
      const easysubsSettings = document.querySelector(".es-settings");
      if (videoControlContainer && !easysubsSettings) {
        esRenderSetings();
      }
    }, 100);
  }

  public init(): void {
    this.injectScript();
    window.addEventListener("esNetflixData", this.handleNetflixData as EventListener);
    window.addEventListener("esNetflixVideoReady", this.handleNetflixVideoReady as EventListener);
    window.addEventListener("esNetflixSubtitlesChanged", this.handleNetflixSubtitlesChanged as EventListener);
  }

  public async getSubs(language: string) {
    if (language === "") return parse("");

    const ccLanguage = language + SUB_TYPES.closedcaptions;
    const subsList = this.subCache[this.getMoveId()];
    const langKey = Object.keys(subsList).find((key) => key === language || key === ccLanguage) || "";

    const subUri = subsList[langKey];
    const resp = await fetch(subUri);
    const data = await resp.text();

    return parse(data);
  }

  public getSubsContainer() {
    const selector = document.querySelector(".watch-video--player-view");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = (
      document.querySelector('[data-uia="control-fullscreen-enter"]') ||
      document.querySelector('[data-uia="control-fullscreen-exit"]')
    ).parentElement;
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("#appMountPoint");
    if (selector === null) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  // Injectes the script into the service page
  private injectScript(): void {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/netflix.js");
    script.type = "module";
    document.head.prepend(script);
  }

  // Convert the response of the Netflix server to a convenient format and save it to the cache
  private handleNetflixData(event: CustomEvent): void {
    if (!["EPISODE", "MOVIE"].includes(event.detail.viewableType)) {
      return;
    }

    console.log("handleNetflixData", event.detail.timedtexttracks);

    this.subCache[event.detail.movieId] = {};
    const tracks: TTrack[] = event.detail.timedtexttracks;
    tracks.forEach((track) => {
      if (track.isNoneTrack) {
        return;
      }

      let type = SUB_TYPES[track.rawTrackType];
      if (typeof type === "undefined") type = `[${track.rawTrackType}]`;
      const lang = track.language + type + (track.isForcedNarrative ? "-forced" : "");

      if (track.ttDownloadables[WEBVTT]?.urls) {
        this.subCache[event.detail.movieId][lang] = this.randomProperty(track.ttDownloadables[WEBVTT].urls).url;
      }
    });
  }

  private handleNetflixVideoReady() {
    esRenderSetings();
  }

  private handleNetflixSubtitlesChanged(event: CustomEvent) {
    esSubsChanged(event.detail);
  }

  private getMoveId(): string {
    const videoIdElement: HTMLElement | null = document.querySelector("*[data-videoid]");
    return videoIdElement?.dataset?.videoid || "";
  }

  private randomProperty = (obj: Record<string, TUrl>) => {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };
}

export default Netflix;
