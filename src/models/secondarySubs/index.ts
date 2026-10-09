import { combine, createEffect, createEvent, createStore } from "effector";

import type Service from "@src/streamings/service";
import type { Captions, TSecondarySource, TSecondaryTranslator, TSubsTrack } from "../types";
import { $currentSubs, $subs, $subsLanguage, $subsTitle } from "../subs";
import { $streaming } from "../streamings";
import { $secondarySubs, $secondarySubsTranslator, $translateLanguage } from "../settings";
import { resolveSecondarySubs } from "@src/utils/resolveSecondarySubs";
import { anchorSubs } from "@src/utils/anchorSubs";
import { readTranslationCache, writeTranslationCache, type TTranslations } from "@src/utils/translationCache";
import { $foundSecondCaptions, $foundSecondResult } from "../foundSubs";
import { chromeTranslateBatch } from "@src/utils/chromeTranslator";

// The second subtitle line: a track of the video in another language, anchored to the main subtitles, or the main
// subtitles translated a window ahead of the playhead. The settings are in src/models/settings ($secondarySubs…).

// The video's subtitle tracks other than the one the player shows
export const $secondaryTracks = createStore<TSubsTrack[]>([]);
export const secondaryTracksRequested = createEvent();
export const fetchSecondaryTracksFx = createEffect<Service, TSubsTrack[]>(async (streaming) => {
  try {
    return (await streaming.getSubsTracks?.()) ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
});
export const $otherTracks = combine($secondaryTracks, $subsTitle, (tracks, title) =>
  tracks.filter((track) => track.label !== title),
);

export const $secondarySource = combine(
  {
    choice: $secondarySubs,
    tracks: $otherTracks,
    translateLanguage: $translateLanguage,
    subsLanguage: $subsLanguage,
    streaming: $streaming,
    found: $foundSecondResult,
  },
  ({ choice, tracks, translateLanguage, subsLanguage, streaming, found }): TSecondarySource =>
    resolveSecondarySubs({
      choice,
      tracks,
      translateLanguage,
      subsLanguage,
      // The stub stands in until a service is detected, and implements nothing
      isOnFlight: streaming.name !== "stub" && streaming.isOnFlight(),
      found,
    }),
);

// The track to load, null when the second line doesn't come from a track
export const $secondaryTrackLabel = $secondarySource.map((source) =>
  source.type === "track" ? source.track.label : null,
);
export const $secondaryRawSubs = createStore<Captions>([]);
export const fetchSecondarySubsFx = createEffect<{ streaming: Service; label: string }, Captions>(
  ({ streaming, label }) => streaming.getSubs(label),
);
// The second track's text by main cue id
export const $secondaryTrackLines = combine($subs, $secondaryRawSubs, anchorSubs);
// The same for a found file, see src/models/foundSubs
export const $foundSecondLines = combine($subs, $foundSecondCaptions, (subs, captions) =>
  captions ? anchorSubs(subs, captions) : {},
);

// "language:translator" when the second line is translated, null otherwise; translations start over when it changes
export const $secondaryTranslationKey = combine($secondarySource, $secondarySubsTranslator, (source, translator) =>
  source.type === "translate" ? `${source.language}:${translator}` : null,
);
// Translations of the main lines by their text, and the lines being translated
export const $secondaryTranslations = createStore<TTranslations>({});
export const $secondaryPendings = createStore<Record<string, boolean>>({});
export const $secondaryError = createStore<string | null>(null);
// After a failed request the next one waits, so a service that's down isn't asked on every time update
export const SECONDARY_RETRY_DELAY_MS = 15_000;
export const $secondaryRetryAt = createStore(0);
export type TTranslateSecondaryParams = {
  texts: string[];
  language: string;
  // The main subtitles' language, for Chrome's translator and Bergamot, which can't detect it
  sourceLanguage: string;
  translator: TSecondaryTranslator;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
  ollamaUrl: string;
  ollamaModel: string;
};
export const secondaryBatchPicked = createEvent<TTranslateSecondaryParams>();
async function translateWithBackground({
  sourceLanguage,
  ollamaUrl,
  ollamaModel,
  ...params
}: TTranslateSecondaryParams) {
  const response = await chrome.runtime.sendMessage({
    type: "translateBatch",
    ...params,
    // What only one translator needs goes to that one
    ...(params.translator === "bergamot" && { sourceLanguage }),
    ...(params.translator === "ollama" && { ollamaUrl, ollamaModel }),
  });
  if (!Array.isArray(response)) throw new Error(response?.error ?? "No translation received");
  return response;
}

// Chrome's translator runs here, in the content script, Bergamot on the device through the background; Google
// translates where they can't
export const translateSecondaryFx = createEffect<TTranslateSecondaryParams, string[]>(async (params) => {
  if (params.translator !== "chrome" && params.translator !== "bergamot") return translateWithBackground(params);
  try {
    return params.translator === "chrome"
      ? await chromeTranslateBatch(params.texts, params.sourceLanguage, params.language)
      : await translateWithBackground(params);
  } catch (error) {
    console.warn(`${params.translator === "chrome" ? "Chrome's translator" : "Bergamot"} failed, using Google:`, error);
    return translateWithBackground({ ...params, translator: "google" });
  }
});

export const secondaryTranslationsReceived = createEvent<TTranslations>();

// Translations of earlier visits of the video, see src/utils/translationCache.ts
export const readSecondaryCacheFx = createEffect<{ cacheKey: string; translationKey: string }, TTranslations>(
  ({ cacheKey }) => readTranslationCache(cacheKey),
);
export const writeSecondaryCacheFx = createEffect<{ key: string; translations: TTranslations }, void>(
  ({ key, translations }) => writeTranslationCache(key, translations),
);

// What the second line shows for each cue on screen; `pending` while its text is on the way
export type TSecondaryLine = { text: string; pending: boolean };
export const $currentSecondarySubs = combine(
  {
    current: $currentSubs,
    source: $secondarySource,
    trackLines: $secondaryTrackLines,
    trackLoading: fetchSecondarySubsFx.pending,
    foundLines: $foundSecondLines,
    translations: $secondaryTranslations,
  },
  ({ current, source, trackLines, trackLoading, foundLines, translations }): TSecondaryLine[] =>
    current.map((sub) => {
      if (source.type === "track") return { text: trackLines[sub.id] ?? "", pending: trackLoading };
      if (source.type === "found") return { text: foundLines[sub.id] ?? "", pending: false };
      if (source.type === "translate") {
        const translation = translations[sub.cleanedText];
        return translation === undefined ? { text: "", pending: true } : { text: translation, pending: false };
      }
      return { text: "", pending: false };
    }),
);

// V hides the second line for the current video, holding R reveals it when it's blurred until hover or pause
export const $secondaryHidden = createStore(false);
export const secondaryLineToggled = createEvent();
export const $secondaryRevealed = createStore(false);
export const secondaryRevealHeld = createEvent<boolean>();
// The page of the video the main subtitles were loaded for, so hiding lasts until another video
export const $secondaryPage = createStore("");

// The shift the delay buttons gave the main subtitles since they were loaded, in seconds: a second track loaded
// later gets it too
export const $mainSubsShift = createStore(0);
