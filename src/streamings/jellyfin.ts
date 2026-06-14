import { esRenderSetings } from "@src/models/settings";
import Service from "./service";
import { parse } from "subtitle";
import { esSubsChanged, rawSubsAdded } from "@src/models/subs";
import { $video, getCurrentVideoFx } from "@src/models/videos";

class Jellyfin implements Service {
  name = "jellyfin";

  private videoSubsObserver: MutationObserver | null = null;
  private waitForElementGen = 0;
  private initialized = false;

  constructor() {
    setInterval(() => {
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

      // Suppress Jellyfin's native ::cue rendering via CSS injection.
      // We cannot use track.mode="hidden" because Jellyfin immediately resets it
      // via setTimeout(0) inside forceClearTextTrackActiveCues().
      injectHideCueStyle();

      // Track which TextTrack objects we already attached oncuechange to
      const attachedTracks = new Set<TextTrack>();

      const attachTrack = (track: TextTrack) => {
        if (track.kind !== "subtitles" && track.kind !== "captions") return;
        if (attachedTracks.has(track)) return;
        attachedTracks.add(track);

        track.oncuechange = () => {
          // Only forward when this track is actually active
          if (track.mode === "disabled") return;
          const cues = [...(track.activeCues ?? [])] as VTTCue[];
          if (cues.length === 0) return;
          const text = cues
            .map((c) => cleanVttText(c.text ?? ""))
            .join("\n")
            .trim();
          if (!text) return;
          rawSubsAdded([
            {
              start: cues[0].startTime * 1000,
              end: cues[cues.length - 1].endTime * 1000,
              text,
            },
          ]);
        };
      };

      const getActiveLang = () => {
        for (let i = 0; i < video.textTracks.length; i++) {
          const t = video.textTracks[i];
          if (t.mode !== "disabled" && (t.kind === "subtitles" || t.kind === "captions")) {
            return t.language || t.label || "und";
          }
        }
        return null;
      };

      // Attach to tracks that are already showing
      for (let i = 0; i < video.textTracks.length; i++) {
        if (video.textTracks[i].mode !== "disabled") {
          attachTrack(video.textTracks[i]);
        }
      }

      // Trigger subs pipeline if a track is already active
      const lang = getActiveLang();
      if (lang) esSubsChanged(lang);

      // Handle subtitle language change (new track becomes showing)
      video.textTracks.onchange = () => {
        for (let i = 0; i < video.textTracks.length; i++) {
          if (video.textTracks[i].mode !== "disabled") {
            attachTrack(video.textTracks[i]);
          }
        }
        const newLang = getActiveLang();
        if (newLang) esSubsChanged(newLang);
      };
      video.textTracks.onaddtrack = (e) => {
        if (e?.track) attachTrack(e.track);
      };

      // --- Fallback: custom .videoSubtitlesInner (Firefox / Edge / custom mode) ---
      // Jellyfin creates this div only when useCustomSubtitles() is true.
      waitForElement(".videoSubtitles", () => {
        if (this.waitForElementGen !== myGen) return; // stale, a new video loaded
        const subtitleSource = document.querySelector(".videoSubtitles");
        if (!subtitleSource) return;
        // Hide Jellyfin's custom div (EasySubs renders its own overlay)
        (subtitleSource as HTMLElement).style.opacity = "0";
        (subtitleSource as HTMLElement).style.pointerEvents = "none";

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

  public async getSubs(_title: string) {
    return parse("");
  }

  public getSubsContainer() {
    const selector = document.querySelector(".videoPlayerContainer");
    if (selector === null) throw new Error("Subtitles container not found");
    return selector as HTMLElement;
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
    return true;
  }
}

// Injected once per page: hides the browser-native ::cue rendering so only
// EasySubs' overlay is visible. We avoid track.mode="hidden" because Jellyfin
// resets it synchronously via setTimeout(0).
function injectHideCueStyle() {
  if (document.getElementById("es-jellyfin-hide-cue")) return;
  const style = document.createElement("style");
  style.id = "es-jellyfin-hide-cue";
  style.textContent =
    "video.htmlvideoplayer::cue { opacity: 0 !important; color: transparent !important; text-shadow: none !important; }";
  document.head.appendChild(style);
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

function waitForElement(selector: string, callBack: () => void) {
  window.setTimeout(() => {
    if (document.querySelector(selector)) {
      callBack();
    } else {
      waitForElement(selector, callBack);
    }
  }, 300);
}

export default Jellyfin;
