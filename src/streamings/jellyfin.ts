import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";
import { $video, getCurrentVideoFx } from "@src/models/videos";
import type { Captions, TSubsTrack } from "@src/models/types";
import { languageFromTrack } from "@src/utils/languages";

class Jellyfin implements Service {
  name = "jellyfin";

  private videoSubsObserver: MutationObserver | null = null;
  private waitForElementGen = 0;
  private initialized = false;
  // Whether the active track had cues on the last getSubs() call
  private hasLoadedCues = false;

  constructor() {
    setInterval(() => {
      // Jellyfin removes the player on exit, while our overlay lives in <body>.
      // Dropping .es-settings also makes the next video re-run the setup.
      if (!document.querySelector("video.htmlvideoplayer")) {
        document.querySelectorAll("#es, #es-top, .es-progress-bar, .es-settings").forEach((e) => e.remove());
        return;
      }

      const settingsButton = this.findOsdButton();
      const easysubsSettings = document.querySelector(".es-settings");
      if (settingsButton && !easysubsSettings) {
        esRenderSetings();
      }
    }, 500);
  }

  private findOsdButton(): HTMLElement | null {
    // Jellyfin renders two OSD button rows (one hidden), so we must pick the
    // visible instance. The settings gear is `.btnVideoOsdSettings`; fall back
    // to fullscreen. Note: `.btnSettings` is NOT the video OSD button — it
    // belongs elsewhere in the Jellyfin UI, so we must not target it here.
    const selectors = [".btnVideoOsdSettings", ".btnFullscreen"];
    for (const selector of selectors) {
      const candidates = document.querySelectorAll<HTMLElement>(selector);
      for (const el of candidates) {
        if (el.offsetParent !== null && el.getClientRects().length > 0) {
          return el;
        }
      }
    }
    return null;
  }

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    getCurrentVideoFx();
    $video.watch((video) => {
      if (!video) return;

      // Clean up observers from the previous video (SPA navigation)
      this.videoSubsObserver?.disconnect();
      this.videoSubsObserver = null;
      this.waitForElementGen++;
      const myGen = this.waitForElementGen;
      this.hasLoadedCues = false;

      // Track which TextTrack objects we already attached oncuechange to
      const attachedTracks = new Set<TextTrack>();

      const requestSubs = () => {
        const track = getActiveTrack(video);
        if (track) esSubsChanged(track.language || track.label || "und");
      };

      const attachTrack = (track: TextTrack) => {
        if (!isSubtitlesTrack(track) || attachedTracks.has(track)) return;
        attachedTracks.add(track);

        // Cues may arrive after subs were requested — request them again
        track.oncuechange = () => {
          if (track.mode === "disabled" || this.hasLoadedCues) return;
          if (track.cues?.length) requestSubs();
        };
      };

      for (let i = 0; i < video.textTracks.length; i++) {
        attachTrack(video.textTracks[i]);
      }

      // Trigger subs pipeline if a track is already active
      requestSubs();

      // Jellyfin reuses a single TextTrack for every subtitle stream: it swaps
      // the cues and toggles the mode, so reload subs on every change
      video.textTracks.onchange = () => {
        for (let i = 0; i < video.textTracks.length; i++) {
          attachTrack(video.textTracks[i]);
        }
        requestSubs();
      };
      video.textTracks.onaddtrack = (e) => {
        if (e?.track) attachTrack(e.track);
      };

      // --- Fallback: custom .videoSubtitlesInner (Firefox / Edge / custom mode) ---
      // Jellyfin creates this div only when useCustomSubtitles() is true,
      // so stop waiting once a new video is loaded or the player is closed.
      const isStale = () => this.waitForElementGen !== myGen || !video.isConnected;
      waitForElement(".videoSubtitles", isStale, () => {
        const subtitleSource = document.querySelector(".videoSubtitles");
        if (!subtitleSource) return;

        this.videoSubsObserver?.disconnect();
        this.videoSubsObserver = new MutationObserver(() => {
          const inner = subtitleSource.querySelector(".videoSubtitlesInner");
          const text = inner ? getText(inner).trim() : "";
          if (!text) return;
          rawSubsAdded([
            {
              start: video.currentTime * 1000,
              end: (video.currentTime + 5) * 1000,
              text,
            },
          ]);
        });
        this.videoSubsObserver.observe(subtitleSource, { childList: true, subtree: true });
      });
    });
  }

  public async getSubs(title: string): Promise<Captions> {
    // Read the active track on every request instead of caching cues: Jellyfin
    // swaps cues inside the same TextTrack when the subtitle stream changes
    const video = $video.getState();
    const secondary =
      title.startsWith(SECONDARY_PREFIX) && video?.textTracks[Number(title.slice(SECONDARY_PREFIX.length))];
    if (secondary) return cuesToCaptions(secondary);

    const track = video && getActiveTrack(video);
    const cues = track?.cues ? ([...track.cues] as VTTCue[]) : [];
    this.hasLoadedCues = cues.length > 0;
    return cues
      .map((c) => ({ start: c.startTime * 1000, end: c.endTime * 1000, text: cleanVttText(c.text ?? "") }))
      .filter((s) => s.text);
  }

  // Jellyfin usually swaps one TextTrack between subtitle streams, so a second track exists only when the video has
  // several tracks with their cues loaded; their modes are left to Jellyfin
  public async getSubsTracks(): Promise<TSubsTrack[]> {
    const video = $video.getState();
    if (!video) return [];
    const active = getActiveTrack(video);
    const tracks: TSubsTrack[] = [];
    for (let i = 0; i < video.textTracks.length; i++) {
      const track = video.textTracks[i];
      if (track === active || !isSubtitlesTrack(track) || !track.cues?.length) continue;
      const language = languageFromTrack(track.language, track.label);
      if (language) tracks.push({ label: `${SECONDARY_PREFIX}${i}`, language, kind: "subtitles", name: track.label });
    }
    return tracks;
  }

  public getSubsContainer() {
    return document.body;
  }

  public getSettingsButtonContainer() {
    const selector = this.findOsdButton();
    if (selector === null) throw new Error("Settings button container not found");
    return selector;
  }

  public getSettingsContentContainer() {
    return document.body;
  }

  public isOnFlight() {
    return false;
  }
}

// Labels of other tracks: their index in video.textTracks
const SECONDARY_PREFIX = "textTrack:";

function cuesToCaptions(track: TextTrack): Captions {
  const cues = track.cues ? ([...track.cues] as VTTCue[]) : [];
  return cues
    .map((c) => ({ start: c.startTime * 1000, end: c.endTime * 1000, text: cleanVttText(c.text ?? "") }))
    .filter((s) => s.text);
}

function isSubtitlesTrack(track: TextTrack) {
  return track.kind === "subtitles" || track.kind === "captions";
}

function getActiveTrack(video: HTMLVideoElement): TextTrack | null {
  for (let i = 0; i < video.textTracks.length; i++) {
    const track = video.textTracks[i];
    if (track.mode !== "disabled" && isSubtitlesTrack(track)) return track;
  }
  return null;
}

// Strip WebVTT tags before passing text to the EasySubs tokenizer:
// <00:00:01.000> timestamp tags, <v Speaker>, <c.class>, <b>, </b>, etc.
function cleanVttText(text: string): string {
  return text
    .replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, "")
    .replace(/<\/?[^>]+>/g, "")
    .trim();
}

function getText(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (node.nodeName === "BR") return "\n";
  return [...node.childNodes].map((el) => getText(el)).join("");
}

function waitForElement(selector: string, isCancelled: () => boolean, callBack: () => void) {
  window.setTimeout(() => {
    if (isCancelled()) return;
    if (document.querySelector(selector)) {
      callBack();
    } else {
      waitForElement(selector, isCancelled, callBack);
    }
  }, 300);
}

export default Jellyfin;
