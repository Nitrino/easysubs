import type { TFoundResult, TFoundSource, TOpenSubtitlesQuota } from "@src/models/types";
import { FPS_RATES, isSameTiming, type TAlignment, type TTiming } from "./alignSubs";
import { languageName } from "./languages";

// Words of the search sheet and the status lines about found files

export const FOUND_SOURCE_TITLES: Record<TFoundSource, string> = {
  opensubtitles: "OpenSubtitles",
  stremio: "Stremio mirror",
  gestdown: "Addic7ed",
  subdl: "SubDL",
  subsource: "SubSource",
  jimaku: "Jimaku",
  file: "Your file",
};

// "+1.20 s", "−2.40 s", "0.00 s"
export function formatShift(seconds: number): string {
  const rounded = Math.round(seconds * 100) / 100;
  if (Math.abs(rounded) < 0.005) return "0.00 s";
  return `${rounded > 0 ? "+" : "−"}${Math.abs(rounded).toFixed(2)} s`;
}

// "25 → 23.976 fps" for the stretch of a file timed for a PAL release
export function formatRate(rate: number): string {
  if (Math.abs(rate - FPS_RATES[1]) < 1e-6) return "25 → 23.976 fps";
  if (Math.abs(rate - FPS_RATES[2]) < 1e-6) return "23.976 → 25 fps";
  return "";
}

// The name of a found file in a menu: its language, or the file name of a file without one
export const foundName = (result: TFoundResult) => (result.language ? languageName(result.language) : result.release);

type TSyncStatus = {
  sync: "pending" | "running" | "skipped" | "done" | "unsure" | "no-reference" | "restored" | "none";
  timing: TTiming;
  synced: TAlignment | null;
};

// The line under a loaded file: whether and how it was moved to fit the video
export function describeSync({ sync, timing, synced }: TSyncStatus): string {
  const own = isSameTiming(timing, { shift: 0, rate: 1 });
  const moved = [formatShift(timing.shift), formatRate(timing.rate)].filter(Boolean).join(", ");
  switch (sync) {
    case "pending":
    case "running":
      return "Auto-syncing…";
    case "skipped":
      return own ? "A release of this service: Auto-sync skipped." : `Shifted by hand: ${moved}.`;
    case "no-reference":
      return "Nothing to sync with: the video has no subtitles, or the file has too few lines. Use the shift buttons.";
    case "unsure":
      return "Auto-sync isn't sure this file fits the video. Press Auto-sync to apply its best guess.";
    case "restored":
      return own ? "Loaded again for this video." : `Loaded again for this video: ${moved}.`;
    default:
      if (synced && isSameTiming(timing, synced)) {
        return own ? "Auto-sync: already in step with the video." : `Auto-synced: ${moved}.`;
      }
      return own ? "The file's own timing." : `Shifted by hand: ${moved}.`;
  }
}

// The short timing line of the file card in the Subtitles tab: the shift and stretch, or what's happening instead
export function describeTiming({ sync, timing }: TSyncStatus): string {
  const own = isSameTiming(timing, { shift: 0, rate: 1 });
  if (sync === "pending" || sync === "running") return "Syncing…";
  if (sync === "no-reference" && own) return "Nothing to sync with";
  if (sync === "unsure" && own) return "Not sure it fits the video";
  if (sync === "skipped" && own) return "Same release as the video";
  if (own) return "Original timing";
  return [formatShift(timing.shift), formatRate(timing.rate)].filter(Boolean).join(" · ");
}

// "3 of 5 left today"
export function describeQuota(quota: TOpenSubtitlesQuota | null, signedIn: boolean): string {
  const allowed = quota?.allowed ?? (signedIn ? 20 : 5);
  const remaining = Math.max(0, quota?.remaining ?? allowed);
  return `${remaining} of ${allowed} left today`;
}
