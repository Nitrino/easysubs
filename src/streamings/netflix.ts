import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse, subTitleType } from "subtitle";
import { esSubsChanged, subsReloadRequested } from "@src/models/subs";

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

type TTrackChanged = {
  isForcedNarrative: boolean;
  rawTrackType: "SUBTITLES" | "CLOSEDCAPTIONS";
  bcp47: string;
};

type TSubCache = {
  videoId: string;
  title: string;
  url: string;
  data?: subTitleType[];
};

class Netflix implements Service {
  private subCache: TSubCache[];

  constructor() {
    this.subCache = [];

    this.handleNetflixData = this.handleNetflixData.bind(this);
    this.handleNetflixVideoReady = this.handleNetflixVideoReady.bind(this);
    this.handleNetflixSubtitlesChanged = this.handleNetflixSubtitlesChanged.bind(this);

    setInterval(() => {
      const videoControlContainer = document.querySelector(".watch-video--bottom-controls-container");
      const subsContainer = document.querySelector(".watch-video--player-view");
      const easysubsSettings = document.querySelector(".es-settings");
      if (videoControlContainer && subsContainer && !easysubsSettings) {
        esRenderSetings();
        subsReloadRequested();
      }
    }, 100);
  }

  public init(): void {
    this.injectScript();
    window.addEventListener("esNetflixData", this.handleNetflixData as EventListener);
    window.addEventListener("esNetflixVideoReady", this.handleNetflixVideoReady as EventListener);
    window.addEventListener("esNetflixSubtitlesChanged", this.handleNetflixSubtitlesChanged as EventListener);
  }

  public async getSubs(title: string) {
    if (title === "") return parse("");

    const moveId = this.getMoveId();
    const subCacheItem = this.subCache.find((item) => item.videoId == moveId && item.title === title);

    const resp = await fetch(subCacheItem.url);
    const data = await resp.text();

    if (subCacheItem.data) {
      return subCacheItem.data;
    }

    const parsedSubs = parse(data);
    subCacheItem.data = parsedSubs;
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
    console.log("injectScript");

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/netflix.js");
    script.type = "module";
    document.head.prepend(script);
  }

  // Convert the response of the Netflix server to a convenient format and save it to the cache
  private handleNetflixData(event: CustomEvent): void {
    console.log("handleNetflixData", event.detail);

    if (!["EPISODE", "MOVIE"].includes(event.detail.viewableType)) {
      return;
    }

    console.log("handleNetflixData", event.detail.timedtexttracks);

    const tracks: TTrack[] = event.detail.timedtexttracks;
    console.log("tracks", tracks);

    tracks.forEach((track) => {
      if (track.isNoneTrack) {
        return;
      }

      const title = this.getTrackTitle(track);

      if (track.ttDownloadables[WEBVTT]?.urls) {
        this.subCache.push({
          videoId: event.detail.movieId,
          title: title,
          url: this.randomProperty(track.ttDownloadables[WEBVTT].urls).url,
        });
      }
    });
  }

  private handleNetflixVideoReady() {
    console.log("handleNetflixVideoReady");
    esRenderSetings();
  }

  private handleNetflixSubtitlesChanged(event: CustomEvent<TTrackChanged>) {
    console.log("handleNetflixSubtitlesChanged", event.detail);
    esSubsChanged(this.getTrackChangedTitle(event.detail));
  }

  private getMoveId(): string {
    const videoIdElement: HTMLElement | null = document.querySelector("*[data-videoid]");
    return videoIdElement?.dataset?.videoid || "";
  }

  private randomProperty = (obj: Record<string, TUrl>) => {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
  };

  private getTrackTitle(track: TTrack): string {
    let postfix = "";
    if (track.isForcedNarrative) {
      postfix = "-forced";
    }
    if (track.rawTrackType === "closedcaptions") {
      postfix = "[cc]";
    }
    return track.language + postfix;
  }

  private getTrackChangedTitle(track: TTrackChanged): string {
    let postfix = "";
    if (track.isForcedNarrative) {
      postfix = "-forced";
    }
    if (track.rawTrackType === "CLOSEDCAPTIONS") {
      postfix = "[cc]";
    }
    return track.bcp47 + postfix;
  }
}

export default Netflix;
