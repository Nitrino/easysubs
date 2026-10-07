import { parse } from "subtitle";

import type Service from "@src/streamings/service";
import { esRenderSetings } from "@src/models/settings";
import { esSubsChanged } from "@src/models/subs";
import type { TSubsTrack, TTitleInfo } from "@src/models/types";
import {
  SAMPLE_VIDEO,
  getActiveTrack,
  getTrack,
  getTracks,
  getVideoSource,
  onTrackChange,
  playerRoot,
  trackMenu,
} from "./player";

// The sample's train scene stands for an episode of a series, so the search for subtitles has one to look for; the
// mock background answers for it (playground/src/mockBackground.ts)
export const SAMPLE_TITLE: TTitleInfo = { title: "The Night Train", type: "episode", season: 1, episode: 2 };

let initialized = false;

// Also used by playground/scripts/record-translations.ts to read the subtitles the way the player does
export async function loadCaptions(url: string) {
  const resp = await fetch(url);
  return parse(await resp.text());
}

// The streaming service for the playground player, see src/streamings/service.ts
class Playground implements Service {
  name = "playground";

  public init(): void {
    if (initialized) return;
    initialized = true;

    esRenderSetings();
    // The track id is passed as the subtitles "language", like other services pass their track names
    onTrackChange((track) => esSubsChanged(track?.id ?? ""));

    // main.tsx subscribes to esSubsChanged only after calling init(), so announce the initial track on the next
    // task, as real services do when their player reports its subtitles
    setTimeout(() => {
      const track = getActiveTrack();
      if (track) esSubsChanged(track.id);
    });
  }

  public async getSubs(trackId: string) {
    const track = getTrack(trackId);
    if (!track) throw new Error(`Unknown subtitle track: ${trackId}`);
    return loadCaptions(track.url);
  }

  // The video's tracks; a subtitle file opened by hand has no language
  public async getSubsTracks(): Promise<TSubsTrack[]> {
    return getTracks()
      .filter((track) => track.language)
      .map((track) => ({ label: track.id, language: track.language, kind: "subtitles", name: track.label }));
  }

  public async getTitle(): Promise<TTitleInfo | null> {
    const source = getVideoSource();
    if (source.movie) return { title: source.movie.title, type: "movie", year: source.movie.year };
    return source.id === SAMPLE_VIDEO.id ? SAMPLE_TITLE : null;
  }

  public getSubsContainer() {
    return playerRoot;
  }

  // The EasySubs button is inserted right before the subtitles menu
  public getSettingsButtonContainer() {
    return trackMenu;
  }

  public getSettingsContentContainer() {
    return playerRoot;
  }

  public isOnFlight() {
    return false;
  }
}

export default Playground;
