import { parse } from "subtitle";

import { esSubsChanged } from "@src/models/subs";
import { esRenderSetings } from "@src/models/settings";
import Service from "./service";

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

    const urlObject: URL = new URL(this.subCache[videoId][label]);
    urlObject.searchParams.set("fmt", "vtt");
    const subUri: string = urlObject.href;

    const resp = await fetch(subUri);
    const text = await resp.text();
    return parse(text);
  }

  public getSubsContainer() {
    const selector = document.querySelector(".html5-video-player");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(".ytp-right-controls > .ytp-size-button");
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

export default Youtube;
