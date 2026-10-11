import { combine, createEffect, createEvent, createStore } from "effector";

import { withPersist } from "@src/utils/withPersist";
import { isSameLanguage, translationLanguageCode } from "@src/utils/languages";
import type { TTranscriptLine } from "@src/utils/transcript";
import type { TTranslations } from "@src/utils/translationCache";
import { $subs, $subsLanguage } from "../subs";
import { $secondarySubsTranslator, $translateLanguage } from "../settings";
import {
  $foundSecondLines,
  $secondarySource,
  $secondaryPendings,
  $secondaryTrackLines,
  $secondaryTranslationKey,
  $secondaryTranslations,
  fetchSecondarySubsFx,
  translateSecondaryFx,
  type TTranslateSecondaryParams,
} from "../secondarySubs";

// The transcript sidebar: every line of the subtitles with its second language, to jump to and search. The second
// language is the second line's when it's on (its track, found file or translations), the translation language
// otherwise, translated as the lines are shown in the sidebar.

// Open or closed stays from video to video
export const $transcriptOpen = withPersist(createStore(false, { name: "transcriptOpen" }));
export const transcriptToggled = createEvent();
export const transcriptClosed = createEvent();

export const $transcriptQuery = createStore("");
export const transcriptQueryChanged = createEvent<string>();

// The ids of the first and last lines shown in the sidebar, to translate those
export const $transcriptShown = createStore<{ from: number; to: number } | null>(null);
export const transcriptShownChanged = createEvent<{ from: number; to: number }>();

// Where the sidebar's second language comes from
export type TTranscriptSecond =
  { type: "none" } | { type: "track" } | { type: "found" } | { type: "translate"; language: string };

export const $transcriptSecond = combine(
  $secondarySource,
  $translateLanguage,
  $subsLanguage,
  (source, translateLanguage, subsLanguage): TTranscriptSecond => {
    if (source.type === "track" || source.type === "found") return { type: source.type };
    if (source.type === "translate") return { type: "translate", language: source.language };
    if (source.type === "same") return { type: "none" };
    // The second line is off: the translation language, unless the subtitles are in it
    if (subsLanguage !== "auto" && isSameLanguage(subsLanguage, translateLanguage)) return { type: "none" };
    return { type: "translate", language: translationLanguageCode(translateLanguage) };
  },
);

// "language:translator" while the sidebar translates, like $secondaryTranslationKey
export const $transcriptTranslationKey = combine($transcriptSecond, $secondarySubsTranslator, (second, translator) =>
  second.type === "translate" ? `${second.language}:${translator}` : null,
);

// The sidebar's own translations; those of the second line count too while it translates into the same language
export const $transcriptOwnTranslations = createStore<TTranslations>({});
export const $transcriptTranslations = combine(
  $transcriptOwnTranslations,
  $transcriptTranslationKey,
  $secondaryTranslationKey,
  $secondaryTranslations,
  (own, key, secondaryKey, secondary): TTranslations =>
    key !== null && key === secondaryKey ? { ...own, ...secondary } : own,
);
export const $transcriptPendings = createStore<Record<string, boolean>>({});
// The lines being translated for the sidebar, or for the second line when it translates the same way
export const $transcriptAllPendings = combine(
  $transcriptPendings,
  $transcriptTranslationKey,
  $secondaryTranslationKey,
  $secondaryPendings,
  (own, key, secondaryKey, secondary) => (key !== null && key === secondaryKey ? { ...secondary, ...own } : own),
);
export const $transcriptError = createStore<string | null>(null);
export const $transcriptRetryAt = createStore(0);

// Through the second line's translator, so the answers also fill the second line when it translates the same way
export const transcriptTranslateFx = createEffect<TTranslateSecondaryParams, string[]>((params) =>
  translateSecondaryFx(params),
);

export const $transcriptLines = combine(
  {
    subs: $subs,
    second: $transcriptSecond,
    trackLines: $secondaryTrackLines,
    trackLoading: fetchSecondarySubsFx.pending,
    foundLines: $foundSecondLines,
    translations: $transcriptTranslations,
  },
  ({ subs, second, trackLines, trackLoading, foundLines, translations }): TTranscriptLine[] =>
    subs.map((sub) => {
      const line = { id: sub.id, start: sub.start, end: sub.end, text: sub.cleanedText };
      if (second.type === "track") return { ...line, second: trackLines[sub.id] ?? "", pending: trackLoading };
      if (second.type === "found") return { ...line, second: foundLines[sub.id] ?? "", pending: false };
      if (second.type === "translate") {
        if (sub.cleanedText.trim() === "") return { ...line, second: "", pending: false };
        const translation = translations[sub.cleanedText];
        return { ...line, second: translation ?? "", pending: translation === undefined };
      }
      return { ...line, second: null, pending: false };
    }),
);
