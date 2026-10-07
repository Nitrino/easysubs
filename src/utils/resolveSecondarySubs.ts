import type { TFoundResult, TSecondaryChoice, TSecondarySource, TSubsTrack, TSubsTrackKind } from "@src/models/types";
import { isSameLanguage, translationLanguageCode } from "./languages";

type TResolveParams = {
  choice: TSecondaryChoice;
  // The video's other tracks; the main track is left out
  tracks: TSubsTrack[];
  translateLanguage: string;
  // The language of the main subtitles, "auto" until it's detected
  subsLanguage: string;
  // Services that read each line off the page have no look-ahead
  isOnFlight: boolean;
  // A file found online or opened for this video's second line
  found?: TFoundResult | null;
};

// Subtitles first, then captions, then the service's own translation; forced tracks only translate signs
const KIND_ORDER: TSubsTrackKind[] = ["subtitles", "cc", "machine"];

// The language the second line shows: the translation language for "Same as translation"
export const secondaryLanguage = (choice: TSecondaryChoice, translateLanguage: string) =>
  choice.language === "same" ? translateLanguage : choice.language;

// Where the second line comes from: a track of the video in the chosen language when there is one (YouTube's
// auto-translate counts), otherwise the translator. The track kind picked in the settings wins when the video has it;
// a language picked to be translated is translated even when the video has a track in it. A file loaded on the second
// line of this video comes before all of that.
export function resolveSecondarySubs({
  choice,
  tracks,
  translateLanguage,
  subsLanguage,
  isOnFlight,
  found = null,
}: TResolveParams): TSecondarySource {
  if (choice.language === "off") return { type: "off" };
  const language = secondaryLanguage(choice, translateLanguage);
  if (found) return { type: "found", language: found.language || language, result: found };
  if (subsLanguage !== "auto" && isSameLanguage(subsLanguage, language)) return { type: "same", language };

  const matches = tracks
    .filter((track) => track.kind !== "forced" && isSameLanguage(track.language, language))
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind));
  const track = matches.find((match) => match.kind === choice.kind) ?? matches[0];
  if (track && !choice.translate) return { type: "track", language, track };

  return {
    type: "translate",
    language: translationLanguageCode(language),
    mode: isOnFlight ? "line" : "window",
    ...(track ? { instead: true } : {}),
  };
}
