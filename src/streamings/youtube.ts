import { parse, subTitleType } from "subtitle";

import { esSubsChanged } from "@src/models/subs";
import { esRenderSetings } from "@src/models/settings";
import type { TSubsTrack } from "@src/models/types";
import Service from "./service";

// The caption tracks of the video as the page script reads them from the player, see public/assets/js/youtube.js
export type YoutubeTrackList = {
  videoId: string;
  captionTracks: { languageCode: string; kind: string; name: string; isTranslatable: boolean }[];
  translationLanguages: { languageCode: string; name: string }[];
};

// What the captured /api/timedtext URL of the main track asks for
type YoutubeRequest = { lang: string; kind: string; tlang: string };

const TRACKS_TIMEOUT_MS = 1000;

type YoutubeSubtitle = {
  dDurationMs: number;
  tStartMs: number;
  segs:
    | {
        utf8: string;
        tOffsetMs: number;
      }[]
    | undefined;
};

class Youtube implements Service {
  name = "youtube";

  private subCache: {
    [moveId: string]: {
      [lang: string]: string;
    };
  };

  constructor() {
    this.subCache = {};
    this.handleCaptionsData = this.handleCaptionsData.bind(this);
    this.handleCaptionsChanges = this.handleCaptionsChanges.bind(this);
  }

  public init(): void {
    this.injectScript();
    window.addEventListener("esYoutubeCaptionsData", this.handleCaptionsData as EventListener);
    window.addEventListener("esYoutubeCaptionsChanged", this.handleCaptionsChanges as EventListener);
    window.addEventListener("esYoutubeLoaded", this.handleLoaded as EventListener);
  }

  public async getSubs(label: string) {
    if (!label) return parse("");
    const videoId = this.getVideoId();
    const cached = this.subCache[videoId]?.[label];
    const subUri: string = cached ? new URL(cached).href : this.secondaryTrackUrl(videoId, label);
    const resp = await fetch(subUri);
    const respJson: { events: YoutubeSubtitle[] } = await resp.json();

    const subs: subTitleType[] = respJson.events.map((sub) => {
      if (!sub.segs) {
        return {
          start: sub.tStartMs,
          end: sub.tStartMs,
          text: "",
        };
      }

      const end = sub.segs.at(-1).tOffsetMs ? sub.segs.at(-1).tOffsetMs + sub.tStartMs : sub.tStartMs + sub.dDurationMs;

      return {
        start: sub.tStartMs,
        end: end,
        text: sub.segs.map((seg) => seg.utf8).join(""),
      };
    });
    return subs;
  }

  // The video's other caption tracks, and YouTube's auto-translation of the main track into every language it offers.
  // Both load from the URL the player requested for the main track, with another `lang` or an added `tlang`.
  public getSubsTracks(): Promise<TSubsTrack[]> {
    const videoId = this.getVideoId();
    const base = this.mainRequest(videoId);
    if (!base) return Promise.resolve([]);

    return new Promise((resolve) => {
      const handleTracks = (event: CustomEvent<string>) => {
        clearTimeout(timer);
        const list: YoutubeTrackList = JSON.parse(event.detail);
        resolve(list.videoId === videoId ? youtubeTracks(list, base) : []);
      };
      const timer = setTimeout(() => {
        window.removeEventListener("esYoutubeTracks", handleTracks as EventListener);
        resolve([]);
      }, TRACKS_TIMEOUT_MS);
      window.addEventListener("esYoutubeTracks", handleTracks as EventListener, { once: true });
      window.dispatchEvent(new CustomEvent("esYoutubeGetTracks"));
    });
  }

  public getSubsContainer() {
    const selector = document.querySelector(".html5-video-player");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(".ytp-right-controls .ytp-size-button");
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector(".html5-video-player");
    if (selector === null) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return false;
  }

  // What the player asked for the main track: the last /api/timedtext URL it requested for the video
  private mainRequest(videoId: string): YoutubeRequest | null {
    const url = Object.values(this.subCache[videoId] ?? {})[0];
    if (!url) return null;
    const params = new URL(url).searchParams;
    return { lang: params.get("lang") ?? "", kind: params.get("kind") ?? "", tlang: params.get("tlang") ?? "" };
  }

  // The main track's URL asking for another track ("track:es", "track:en:asr") or a translation ("tlang:ru")
  private secondaryTrackUrl(videoId: string, label: string): string {
    const base = Object.values(this.subCache[videoId] ?? {})[0];
    if (!base) throw new Error(`No subtitles of the video to load ${label} from`);
    const url = new URL(base);
    const [type, language, kind] = label.split(":");
    if (type === "tlang") {
      url.searchParams.set("tlang", language);
    } else if (type === "track") {
      url.searchParams.set("lang", language);
      url.searchParams.delete("tlang");
      url.searchParams.delete("name");
      if (kind === "asr") url.searchParams.set("kind", "asr");
      else url.searchParams.delete("kind");
    } else {
      throw new Error(`Unknown YouTube subtitles: ${label}`);
    }
    return url.href;
  }

  private getVideoId(): string {
    const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = window.location.href.match(regExpression);
    if (match && match[2].length === 11) {
      return match[2];
    }
    console.error("Can't get youtube video id");
    return "";
  }

  private handleCaptionsData(event: CustomEvent): void {
    const urlObject = new URL(event.detail);
    const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang") || "";
    const videoId = urlObject.searchParams.get("v") || "";
    this.subCache[videoId] = {};
    this.subCache[videoId][lang] = urlObject.href;
  }

  private handleCaptionsChanges(event: CustomEvent): void {
    esSubsChanged(event.detail);
  }

  private handleLoaded() {
    console.log("handleLoaded");

    esRenderSetings();
  }

  private injectScript() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/youtube.js");
    script.type = "module";
    document.head.prepend(script);
  }
}

// The tracks the second line can load besides the main one. Auto-generated captions count as captions, YouTube's
// translations of the main track as machine translations, for languages without a track of their own.
export function youtubeTracks(list: YoutubeTrackList, main: YoutubeRequest): TSubsTrack[] {
  const isMain = (languageCode: string, kind: string) =>
    !main.tlang && languageCode === main.lang && kind === main.kind;
  const tracks: TSubsTrack[] = list.captionTracks
    .filter((track) => !isMain(track.languageCode, track.kind))
    .map((track) => ({
      label: `track:${track.languageCode}${track.kind === "asr" ? ":asr" : ""}`,
      language: track.languageCode,
      kind: track.kind === "asr" ? "cc" : "subtitles",
      name: track.name,
    }));

  const mainTrack = list.captionTracks.find((track) => track.languageCode === main.lang && track.kind === main.kind);
  if (!mainTrack?.isTranslatable) return tracks;

  const withTrack = new Set(list.captionTracks.map((track) => track.languageCode));
  const translations: TSubsTrack[] = list.translationLanguages
    .filter((language) => !withTrack.has(language.languageCode) && language.languageCode !== main.tlang)
    .map((language) => ({
      label: `tlang:${language.languageCode}`,
      language: language.languageCode,
      kind: "machine",
      name: language.name,
    }));
  return [...tracks, ...translations];
}

export default Youtube;
