import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse, subTitleType } from "subtitle";
import { esSubsChanged, subsReloadRequested } from "@src/models/subs";
import type { TSubsTrack } from "@src/models/types";

const WEBVTT = "webvtt-lssdh-ios8";

type TUrl = {
  cdn_id: string;
  url: string;
};

type TDownloadables = {
  "webvtt-lssdh-ios8"?: {
    urls: Record<string, TUrl>;
  };
};

type TTrack = {
  isNoneTrack: boolean;
  isForcedNarrative: boolean;
  language: string;
  rawTrackType: "subtitles" | "closedcaptions";
  // Netflix renamed ttDownloadables to downloadables; keep both for older responses
  downloadables?: TDownloadables;
  ttDownloadables?: TDownloadables;
};

type TTrackChanged = {
  isForcedNarrative: boolean;
  rawTrackType: "SUBTITLES" | "CLOSEDCAPTIONS";
  bcp47: string;
};

type TSubCache = {
  originalData?: subTitleType[];
  videoId: string;
  title: string;
  url: string;
  data?: subTitleType[];
  adBreaks?: TAdBreak[];
};

type TAd = {
  locationMs: number;
  ads: {
    id: number;
    startTimeMs: number;
    endTimeMs: number;
  }[];
};

type TAdBreak = {
  id: number;
  locationMs: number;
  durationMs: number;
};

class Netflix implements Service {
  name = "netflix";

  private subCache: TSubCache[];
  private adBreaks: TAdBreak[];

  constructor() {
    this.subCache = [];
    this.adBreaks = [];

    this.handleNetflixData = this.handleNetflixData.bind(this);
    this.handleNetflixVideoReady = this.handleNetflixVideoReady.bind(this);
    this.handleNetflixSubtitlesChanged = this.handleNetflixSubtitlesChanged.bind(this);
    this.handleAddStateChanged = this.handleAddStateChanged.bind(this);
    this.handleAddHide = this.handleAddHide.bind(this);

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
    window.addEventListener("esNetflixAddStateChanged", this.handleAddStateChanged as EventListener);
    window.addEventListener("esNetflixAddHide", this.handleAddHide as EventListener);
  }

  public async getSubs(title: string) {
    if (title === "") return parse("");

    const moveId = this.getMoveId();
    const subCacheItem = this.subCache.find((item) => item.videoId == moveId && item.title === title);

    const isSubCacheAdBreaksSame = JSON.stringify(subCacheItem.adBreaks) == JSON.stringify(this.adBreaks);

    if (subCacheItem.data && isSubCacheAdBreaksSame) {
      console.log("getSubs from cache", subCacheItem.adBreaks, this.adBreaks);
      return subCacheItem.data;
    }

    if (subCacheItem.data) {
      console.log("getSubs from cache with resync", subCacheItem.adBreaks, this.adBreaks);
      const subs = this.resyncSubsWithAds(subCacheItem.originalData);
      subCacheItem.data = subs;
      subCacheItem.adBreaks = JSON.parse(JSON.stringify(this.adBreaks));
      return subs;
    } else {
      console.log("getSubs from server", this.adBreaks);
      const resp = await fetch(subCacheItem.url);
      const data = await resp.text();
      const subs = parse(data);
      subCacheItem.originalData = subs;
      subCacheItem.data = subs;
      subCacheItem.adBreaks = JSON.parse(JSON.stringify(this.adBreaks));
      return subs;
    }
  }

  // Every text track of the title arrived with its manifest, so the second line loads like the main one
  public async getSubsTracks(): Promise<TSubsTrack[]> {
    const moveId = this.getMoveId();
    const titles = new Set(this.subCache.filter((item) => item.videoId == moveId).map((item) => item.title));
    return [...titles].map(netflixTrack);
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

  public isOnFlight() {
    return false;
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

    // Netflix renamed timedtexttracks to textTracks; keep both for older responses
    const tracks: TTrack[] = event.detail.textTracks ?? event.detail.timedtexttracks ?? [];
    console.log("tracks", tracks);

    tracks.forEach((track) => {
      if (track.isNoneTrack) {
        return;
      }

      const title = this.getTrackTitle(track);
      const urls = (track.downloadables ?? track.ttDownloadables)?.[WEBVTT]?.urls;

      if (urls) {
        this.subCache.push({
          videoId: event.detail.movieId,
          title: title,
          url: this.randomProperty(urls).url,
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

  private handleAddStateChanged(event: CustomEvent<{ currentBreak: TAd; delay: number }>) {
    console.log("handleNetflixSubtitlesChanged", event.detail);
    const currentBreak = event.detail.currentBreak;
    const existedBreak = this.adBreaks.find((adBreak) => currentBreak.ads[0] && adBreak.id === currentBreak.ads[0].id);

    if (!existedBreak && currentBreak.ads[0]) {
      const addDurationMs = currentBreak.ads.map((ad) => ad.endTimeMs).reduce((a, b) => a + b, 0);
      this.adBreaks.push({
        id: currentBreak.ads[0] && currentBreak.ads[0].id,
        locationMs: currentBreak.locationMs,
        durationMs: addDurationMs,
      });
      console.log("this.adBreaks", this.adBreaks);
      subsReloadRequested();
    }
  }
  private handleAddHide(event: CustomEvent<number>) {
    console.log("handleAddHide", event.detail);
    const currentBreak = this.adBreaks[this.adBreaks.length - 1];
    console.log("old durationMs", currentBreak.durationMs);
    console.log("timeVideo", event.detail);
    console.log("new durationMs", event.detail - currentBreak.locationMs);

    currentBreak.durationMs = Math.round(event.detail - currentBreak.locationMs) - 200;
    subsReloadRequested();
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

  private resyncSubsWithAds(subs: subTitleType[]) {
    const adBreak = this.adBreaks[this.adBreaks.length - 1];
    console.log("resynced with time: ", adBreak.durationMs);

    subs = subs.map((sub) => {
      if (Number(sub.start) >= adBreak.locationMs) {
        const start = Number(sub.start) + adBreak.durationMs;
        const end = Number(sub.end) + adBreak.durationMs;

        return Object.assign({}, sub, {
          start,
          end,
        });
      } else {
        return sub;
      }
    });
    return subs;
  }
}

// A track from its subCache title: "en", "en[cc]", "pt-BR-forced"
export function netflixTrack(title: string): TSubsTrack {
  if (title.endsWith("[cc]")) return { label: title, language: title.slice(0, -"[cc]".length), kind: "cc" };
  if (title.endsWith("-forced")) return { label: title, language: title.slice(0, -"-forced".length), kind: "forced" };
  return { label: title, language: title, kind: "subtitles" };
}

export default Netflix;
