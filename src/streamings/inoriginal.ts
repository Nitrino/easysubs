import { Parser } from "m3u8-parser";
import { parse } from "subtitle";

import { esSubsChanged } from "@src/models/subs";
import { esRenderSetings } from "@src/models/settings";
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
    name == "off" ? (this.subsName = null) : (this.subsName = name);
  }
}

export default Inoriginal;
