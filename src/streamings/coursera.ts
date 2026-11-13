import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged } from "@src/models/subs";
import type { Captions, TSubsTrack } from "@src/models/types";

// Coursera's player is its own React player now (video.js before): its parts are found by their data-testid, as their
// class names are generated
const PLAYER = "[data-testid='playerContainer']";
const SETTINGS_BUTTON = "[data-testid='videoSettingsMenuButton']";
const POLL_MS = 500;

class Coursera implements Service {
  name = "coursera";

  // What's on the page now: the player's settings button and the subtitles playing, to tell when they change
  private settingsButton: Element | null = null;
  private subsKey: string | null = null;

  constructor() {
    this.check = this.check.bind(this);
  }

  // The player comes and goes as the course's items are opened, and its tracks change with the language picked in it:
  // checked on the page itself, it needs no script in the page
  public init() {
    window.setInterval(this.check, POLL_MS);
    this.check();
  }

  private check() {
    const button = document.querySelector(`${PLAYER} ${SETTINGS_BUTTON}`);
    if (!button) {
      this.settingsButton = null;
      this.subsKey = null;
      return;
    }
    // A new player, or the player rendered again without EasySubs' button
    if (button !== this.settingsButton || !document.querySelector(".es-settings")) {
      this.settingsButton = button;
      esRenderSetings();
    }

    const video = document.querySelector<HTMLVideoElement>(`${PLAYER} video`);
    const language = showingLanguage(video);
    const key = `${language}|${video?.querySelector<HTMLTrackElement>(`track[srclang="${language}"]`)?.src ?? ""}`;
    // Captions turned on or off, another language or another item, or the subtitles' node gone with a render
    if (key !== this.subsKey || (language && !document.getElementById("es"))) {
      this.subsKey = key;
      esSubsChanged(language);
    }
  }

  public async getSubs(language: string): Promise<Captions> {
    if (!language) return parse("");
    const track = document.querySelector<HTMLTrackElement>(`${PLAYER} track[srclang="${language}"]`);
    if (!track) {
      console.error(`Can't find track with lang=${language}`);
      return [];
    }

    // The cues the browser loaded for the track playing: no request, and Firefox's content scripts fetch without the
    // page's own requests' cookies
    const cues = track.track?.cues;
    if (cues?.length) return cuesToCaptions(cues);

    const resp = await fetch(track.src, { credentials: "include" });
    return parse(await resp.text());
  }

  // The player's <track> elements, one per language
  public async getSubsTracks(): Promise<TSubsTrack[]> {
    const tracks = [...document.querySelectorAll<HTMLTrackElement>("track[srclang]")];
    const languages = [...new Set(tracks.map((track) => track.srclang).filter(Boolean))];
    return languages.map((language) => ({
      label: language,
      language,
      kind: "subtitles",
      name: tracks.find((track) => track.srclang === language)?.label || undefined,
    }));
  }

  public getSettingsButtonContainer() {
    const selector = document.querySelector(`${PLAYER} ${SETTINGS_BUTTON}`);
    if (selector === null) throw new Error("Settings button container not found");
    return selector as HTMLElement;
  }

  public getSettingsContentContainer() {
    return this.getPlayer();
  }

  // The player itself rather than its control bar, which hides when the mouse stops
  public getSubsContainer() {
    return this.getPlayer();
  }

  public isOnFlight() {
    return false;
  }

  private getPlayer() {
    const selector = document.querySelector(PLAYER);
    if (selector === null) throw new Error("Coursera player not found");
    return selector as HTMLElement;
  }
}

// The language of the captions turned on in the player, "" when they're off
export function showingLanguage(video: HTMLVideoElement | null): string {
  const tracks = video ? [...video.textTracks] : [];
  return tracks.find((track) => track.mode === "showing" && track.language)?.language ?? "";
}

export function cuesToCaptions(cues: TextTrackCueList): Captions {
  return [...cues].map((cue) => ({
    start: Math.round(cue.startTime * 1000),
    end: Math.round(cue.endTime * 1000),
    text: (cue as VTTCue).text ?? "",
  }));
}

export default Coursera;
