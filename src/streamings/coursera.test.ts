import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { esRenderSetings, esSubsChanged } = vi.hoisted(() => ({ esRenderSetings: vi.fn(), esSubsChanged: vi.fn() }));
vi.mock("@src/models/settings", () => ({ esRenderSetings }));
vi.mock("@src/models/subs", () => ({ esSubsChanged }));

import Coursera from "./coursera";

// Coursera's player as it is now: its own React player found by data-testid, the captions as the video's text tracks
function renderPlayer() {
  document.body.innerHTML = `
    <div data-testid="playerContainer" aria-label="Media player">
      <video>
        <track srclang="en" label="English (auto)" src="https://www.coursera.org/api/subtitleAssetProxy.v1/en">
        <track srclang="es" label="Spanish" src="https://www.coursera.org/api/subtitleAssetProxy.v1/es">
      </video>
      <div data-testid="customCaptions"></div>
      <div class="rc-VideoControlsContainer">
        <button aria-label="Settings" data-testid="videoSettingsMenuButton"></button>
      </div>
    </div>`;
  return document.querySelector("video")!;
}

// jsdom has no text tracks: the video's, with the one turned on and its cues
function setTracks(
  video: HTMLVideoElement,
  showing: string | null,
  cues: { startTime: number; endTime: number; text: string }[] = [],
) {
  const tracks = ["en", "es"].map((language) => ({ language, mode: language === showing ? "showing" : "disabled" }));
  Object.defineProperty(video, "textTracks", { configurable: true, value: tracks });
  for (const element of video.querySelectorAll("track")) {
    Object.defineProperty(element, "track", {
      configurable: true,
      value: { cues: element.srclang === showing ? cues : [] },
    });
  }
}

describe("Coursera", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    esRenderSetings.mockClear();
    esSubsChanged.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("renders the settings and the subtitles of the captions turned on once the player shows", () => {
    new Coursera().init();
    expect(esRenderSetings).not.toHaveBeenCalled();

    setTracks(renderPlayer(), "en");
    vi.advanceTimersByTime(500);

    expect(esRenderSetings).toHaveBeenCalledTimes(1);
    expect(esSubsChanged).toHaveBeenCalledWith("en");
  });

  it("follows the captions turned off and another language", () => {
    const video = renderPlayer();
    setTracks(video, "en");
    new Coursera().init();
    document.body.insertAdjacentHTML("beforeend", `<div class="es-settings"></div><div id="es"></div>`);

    setTracks(video, null);
    vi.advanceTimersByTime(500);
    expect(esSubsChanged).toHaveBeenLastCalledWith("");

    setTracks(video, "es");
    vi.advanceTimersByTime(500);
    expect(esSubsChanged).toHaveBeenLastCalledWith("es");

    vi.advanceTimersByTime(2000);
    expect(esSubsChanged).toHaveBeenCalledTimes(3);
    expect(esRenderSetings).toHaveBeenCalledTimes(1);
  });

  it("renders the settings again when the player is rendered without them", () => {
    setTracks(renderPlayer(), "en");
    new Coursera().init();
    expect(esRenderSetings).toHaveBeenCalledTimes(1);

    // Coursera renders a new player for the next item
    setTracks(renderPlayer(), "en");
    vi.advanceTimersByTime(500);
    expect(esRenderSetings).toHaveBeenCalledTimes(2);
  });

  it("reads the cues the browser loaded for the track, without a request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    setTracks(renderPlayer(), "en", [
      { startTime: 1.5, endTime: 3.25, text: "Welcome to the course." },
      { startTime: 3.5, endTime: 5, text: "Let's begin." },
    ]);

    expect(await new Coursera().getSubs("en")).toEqual([
      { start: 1500, end: 3250, text: "Welcome to the course." },
      { start: 3500, end: 5000, text: "Let's begin." },
    ]);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("mounts the button by the player's settings button and the subtitles in the player", () => {
    renderPlayer();
    const coursera = new Coursera();
    expect(coursera.getSettingsButtonContainer().dataset.testid).toBe("videoSettingsMenuButton");
    expect(coursera.getSubsContainer().dataset.testid).toBe("playerContainer");
    expect(coursera.getSettingsContentContainer().dataset.testid).toBe("playerContainer");
  });
});
