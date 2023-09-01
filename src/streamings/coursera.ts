import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged } from "@src/models/subs";

class Coursera implements Service {
  private subsName: string | undefined;

  constructor() {
    this.handleCourseraRenderSettings = this.handleCourseraRenderSettings.bind(this);
    this.handleCourseraSubtitlesChanged = this.handleCourseraSubtitlesChanged.bind(this);
  }

  public init() {
    setTimeout(() => {
      this.injectScript();
    }, 4000);
    window.addEventListener("esCourseraRenderSettings", this.handleCourseraRenderSettings as EventListener);
    window.addEventListener("esCourseraSubtitlesChanged", this.handleCourseraSubtitlesChanged as EventListener);
  }

  public async getSubs(language: string) {
    if (!language) return parse("");
    const track: HTMLTrackElement | null = document.querySelector(`track[srclang="${language}"]`);

    if (!track) {
      console.error("Can't find track with lang=${language}");
      return [];
    }

    const subUri: string = track.src;
    const resp = await fetch(subUri);
    const text = await resp.text();

    return parse(text);
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(".rc-VideoSettingsMenu");
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    const selector = document.querySelector(".video-main-player-container");
    if (selector === null) throw new Error("Settings content container not found");
    return selector as HTMLElement;
  }

  public getSubsContainer() {
    const selector = document.querySelector(".rc-VideoControlsContainer");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
  }

  public isOnFlight() {
    return false;
  }

  private handleCourseraRenderSettings(event: CustomEvent) {
    esRenderSetings();
  }

  private handleCourseraSubtitlesChanged(event: CustomEvent) {
    this.subsName = event.detail;
    esSubsChanged(this.subsName);
    esRenderSetings();
  }

  private injectScript() {
    console.log("injectScript");

    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("assets/js/coursera.js");
    script.type = "module";
    document.head.prepend(script);
  }
}

export default Coursera;
