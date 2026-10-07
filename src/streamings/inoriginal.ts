import { parse } from "subtitle";

import { esSubsChanged } from "@src/models/subs";
import { esRenderSetings } from "@src/models/settings";
import type { TSubsTrack, TTitleInfo } from "@src/models/types";
import { languageFromTrack } from "@src/utils/languages";
import Service from "./service";

type TFolder = {
  file: string;
  id: string;
  skip: string;
  subtitle: string; // "[Английские]/../../uploads/subtitles/series/new-girl-2011/s1/e1/eng.vtt,[Русские]/../../uploads/subtitles/series/new-girl-2011/s1/e1/rus.vtt"
  t1: string;
  t2: string;
  title: string;
};

type TPlaylist = {
  title: string;
  folder: TFolder[];
};

const BASE_URL = "https://inoriginal.online";

class Inoriginal implements Service {
  name = "inoriginal";
  private subsName: string | undefined;
  private episodes: TFolder[];
  private videoId: string;

  constructor() {
    this.handleInoriginalVideoStarted = this.handleInoriginalVideoStarted.bind(this);
    this.handleInoriginalSubtitlesChanged = this.handleInoriginalSubtitlesChanged.bind(this);
    this.handleInoriginalPlayerConfig = this.handleInoriginalPlayerConfig.bind(this);
    this.handleInoriginalVideoId = this.handleInoriginalVideoId.bind(this);
  }

  public init(): void {
    this.injectScript();

    window.addEventListener("esInoriginalVideoStarted", this.handleInoriginalVideoStarted as EventListener);
    window.addEventListener("esInoriginalSubtitlesChanged", this.handleInoriginalSubtitlesChanged as EventListener);
    window.addEventListener("esInoriginalPlayerConfig", this.handleInoriginalPlayerConfig as EventListener);
    window.addEventListener("esInoriginalVideoId", this.handleInoriginalVideoId as EventListener);
  }

  public async getSubs(label: string) {
    if (!label || label == "off") return parse("");

    const episode = this.episodes.find((item) => item.id === this.videoId);
    const subtitles = episode.subtitle.split(",").map((sub) => {
      const parts = sub.match(/\[(.*?)\]\/..\/..(.*)/);
      return {
        lang: parts[1],
        url: parts[2],
      };
    });
    const subtitle = subtitles.find((sub) => sub.lang === label);

    const subsResp = await fetch(BASE_URL + subtitle.url);
    const subsData = await subsResp.text();
    return parse(subsData);
  }

  // The episode's subtitles: "[Английские]/…/eng.vtt", named by the bracketed label
  public async getSubsTracks(): Promise<TSubsTrack[]> {
    const episode = this.episodes?.find((item) => item.id === this.videoId);
    if (!episode?.subtitle) return [];
    return episode.subtitle.split(",").flatMap((subtitle): TSubsTrack[] => {
      const [, label, path = ""] = subtitle.match(/\[(.*?)\](.*)/) ?? [];
      const file = path.split("/").pop()?.split(".")[0] ?? "";
      const language = label && languageFromTrack(undefined, `${label} ${file}`);
      if (!language) return [];
      return [{ label, language, kind: /forced|форс/i.test(label) ? "forced" : "subtitles", name: label }];
    });
  }

  // The episodes of a show play on one page
  public getVideoKey(): string | null {
    return this.videoId ? `${location.host}${location.pathname}#${this.videoId}` : null;
  }

  // The subtitle paths name the title: ".../series/new-girl-2011/s1/e1/eng.vtt"
  public async getTitle(): Promise<TTitleInfo | null> {
    const episode = this.episodes?.find((item) => item.id === this.videoId);
    const path = episode?.subtitle?.split(",")[0]?.replace(/^\[.*?\]/, "");
    return path ? inoriginalTitle(path) : null;
  }

  public getSubsContainer() {
    const selector = document.querySelector("#oframeplayerjs");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector("#oframeplayerjs").querySelectorAll("svg")[13].parentElement.parentElement;
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector("#oframeplayerjs");
    if (selector === null) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return false;
  }

  private handleInoriginalVideoStarted(event: CustomEvent) {
    this.setSubName(event.detail);
  }

  private handleInoriginalSubtitlesChanged(event: CustomEvent) {
    console.log("handleInoriginalSubtitlesChanged", event.detail);
    this.setSubName(event.detail);
    esSubsChanged(this.subsName);
  }

  private handleInoriginalPlayerConfig(event: CustomEvent) {
    const playlists: TPlaylist[] = JSON.parse(event.detail);
    this.episodes = playlists.flatMap((playlist) => playlist.folder);
  }

  private handleInoriginalVideoId(event: CustomEvent) {
    this.videoId = event.detail;
    esRenderSetings();
    esSubsChanged(this.subsName);
  }

  private injectScript() {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/inoriginal.js");
    script.type = "module";
    document.head.prepend(script);
  }

  private setSubName(name: string) {
    this.subsName = name == "off" ? null : name;
  }
}

// "new-girl-2011/s1/e1" → New Girl, 2011, S1 E1
export function inoriginalTitle(path: string): TTitleInfo | null {
  const match = path.match(
    /\/(series|films?|movies?|cartoons?)\/([a-z0-9-]+?)(?:-(\d{4}))?\/(?:s(\d+)\/e(\d+)\/)?[^/]*$/i,
  );
  if (!match) return null;
  const [, kind, slug, year, season, episode] = match;
  const title = slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const isSeries = /^series$/i.test(kind) || Boolean(season);
  return {
    title,
    type: isSeries ? "episode" : "movie",
    ...(year ? { year: Number(year) } : {}),
    ...(season && episode ? { season: Number(season), episode: Number(episode) } : {}),
  };
}

export default Inoriginal;
