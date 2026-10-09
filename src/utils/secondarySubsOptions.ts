import type {
  TFoundResult,
  TSecondaryChoice,
  TSecondarySource,
  TSecondaryTranslator,
  TSubsTrack,
} from "@src/models/types";
import { LANGUAGES, isSameLanguage, languageName, normalizeLanguage, translationLanguageCode } from "./languages";
import { FOUND_SOURCE_TITLES, foundName } from "./foundSubsText";

export type TSecondaryOption = {
  value: string;
  label: string;
  // Shown after the label in the menu: the language "Same as translation" stands for
  hint?: string;
  // Where the line comes from: the video ("Track", "YouTube"), a found file ("OpenSubtitles") or a translator
  tag?: string;
  tagKind?: "track" | "translate" | "found";
  isDisabled?: boolean;
};
export type TSecondaryOptionGroup = { label: string; options: TSecondaryOption[] };

const SERVICE_TITLES: Record<string, string> = {
  amazon: "Prime Video",
  coursera: "Coursera",
  inoriginal: "InOriginal",
  jellyfin: "Jellyfin",
  kinopoisk: "Kinopoisk",
  kinopub: "KinoPub",
  netflix: "Netflix",
  plex: "Plex",
  playground: "the playground",
  udemy: "Udemy",
  youtube: "YouTube",
};

export const serviceTitle = (name: string) => SERVICE_TITLES[name] ?? name.charAt(0).toUpperCase() + name.slice(1);

export const TRANSLATOR_TITLES: Record<TSecondaryTranslator, string> = {
  google: "Google Translate",
  deepl: "DeepL",
  chatgpt: "ChatGPT",
  chrome: "Chrome (on device)",
  bergamot: "Bergamot (on device)",
  ollama: "Ollama",
};

const TRANSLATOR_TAGS: Record<TSecondaryTranslator, string> = {
  google: "Google",
  deepl: "DeepL",
  chatgpt: "ChatGPT",
  chrome: "Chrome",
  bergamot: "Bergamot",
  ollama: "Ollama",
};

const trackLabel = (track: TSubsTrack) => `${languageName(track.language)}${track.kind === "cc" ? " (CC)" : ""}`;

type TOptionsParams = {
  tracks: TSubsTrack[];
  translateLanguage: string;
  // The main subtitles' language, "auto" until detected: it's left out of both groups
  subsLanguage: string;
  translator: TSecondaryTranslator;
  service: string;
  isOnFlight: boolean;
  // The file loaded on this video's second line
  found?: TFoundResult | null;
};

// Values of the Found online group: the loaded file, the search sheet, a file to open
export const FOUND_OPTION = "found:current";
export const FIND_OPTION = "find";
export const FILE_OPTION = "file";

// The second line's language picker: the video's own tracks, files found online, then every language for the
// translator, those with a track too, for a translation in place of the track
export function secondarySubsOptions({
  tracks,
  translateLanguage,
  subsLanguage,
  translator,
  service,
  isOnFlight,
  found = null,
}: TOptionsParams): TSecondaryOptionGroup[] {
  const isMainLanguage = (language: string) => subsLanguage !== "auto" && isSameLanguage(language, subsLanguage);
  const usable = tracks.filter((track) => track.kind !== "forced" && !isMainLanguage(track.language));
  const ownTracks = usable.filter((track) => track.kind !== "machine");
  const withTrack = new Set(ownTracks.map((track) => normalizeLanguage(track.language)));
  const machineTracks = usable.filter(
    (track) => track.kind === "machine" && !withTrack.has(normalizeLanguage(track.language)),
  );

  const trackOptions: TSecondaryOption[] = [
    ...ownTracks.map((track) => ({
      value: `track:${track.label}`,
      label: trackLabel(track),
      tag: "Track",
      tagKind: "track" as const,
    })),
    ...machineTracks.map((track) => ({
      value: `track:${track.label}`,
      label: trackLabel(track),
      tag: serviceTitle(service),
      tagKind: "track" as const,
    })),
  ];

  const translateOptions: TSecondaryOption[] = LANGUAGES.filter((language) => !isMainLanguage(language.value)).map(
    (language) => ({
      value: `translate:${language.value}`,
      label: language.label,
      tag: TRANSLATOR_TAGS[translator],
      tagKind: "translate" as const,
    }),
  );

  const groups: TSecondaryOptionGroup[] = [
    {
      label: "",
      options: [
        { value: "off", label: "Off" },
        { value: "same", label: "Same as translation", hint: languageName(translateLanguage) },
      ],
    },
    {
      label: "In this video",
      options:
        trackOptions.length > 0
          ? trackOptions
          : [
              {
                value: "no-tracks",
                label: isOnFlight ? `${serviceTitle(service)} shows one track at a time` : "No other subtitles",
                isDisabled: true,
              },
            ],
    },
    {
      label: "Found online",
      options: [
        ...(found
          ? [
              {
                value: FOUND_OPTION,
                label: foundName(found),
                tag: FOUND_SOURCE_TITLES[found.source],
                tagKind: "found" as const,
              },
            ]
          : []),
        { value: FIND_OPTION, label: "Find subtitles…" },
        { value: FILE_OPTION, label: "Open a file…" },
      ],
    },
  ];
  if (translateOptions.length > 0) groups.push({ label: "Auto-translate", options: translateOptions });
  return groups;
}

// The picker's value for what's chosen: the track in use, or the language being translated
export function secondarySubsValue(choice: TSecondaryChoice, source: TSecondarySource): string {
  if (source.type === "found") return FOUND_OPTION;
  if (choice.language === "off" || choice.language === "same") return choice.language;
  if (source.type === "track" && !choice.translate) return `track:${source.track.label}`;
  return `translate:${translationLanguageCode(choice.language)}`;
}

// What picking an option saves: a track is kept as its language and kind, since labels change between videos, and
// falls back to the translator on videos without it; a language picked to be translated is always translated
export function secondarySubsChoice(value: string, tracks: TSubsTrack[]): TSecondaryChoice | null {
  if (value === "off" || value === "same") return { language: value };
  if (value.startsWith("track:")) {
    const track = tracks.find((candidate) => `track:${candidate.label}` === value);
    return track ? { language: track.language, kind: track.kind } : null;
  }
  if (value.startsWith("translate:")) return { language: value.slice("translate:".length), translate: true };
  return null;
}

type TDescribeParams = {
  source: TSecondarySource;
  service: string;
  translator: TSecondaryTranslator;
  error: string | null;
};

// The status line under the picker: where the second line comes from
export function describeSecondarySource({ source, service, translator, error }: TDescribeParams): {
  tag: "track" | "translate" | "found" | null;
  text: string;
} {
  const serviceName = serviceTitle(service);
  const capitalized = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  const failed = error ? ` Couldn't load it: ${error}` : "";

  switch (source.type) {
    case "off":
      return { tag: null, text: "Pick a language to show a second line under the subtitles." };
    case "same":
      return { tag: null, text: `The subtitles are already in ${languageName(source.language)}.` };
    case "track": {
      const name = languageName(source.language);
      if (source.track.kind === "machine") {
        return { tag: "track", text: `${name} from ${serviceName} auto-translate. No translation needed.${failed}` };
      }
      const what = source.track.kind === "cc" ? "captions" : "subtitles";
      return { tag: "track", text: `${name} ${what} from ${serviceName}. No translation needed.${failed}` };
    }
    case "found":
      return {
        tag: "found",
        text:
          source.result.source === "file"
            ? `From ${source.result.release}, for this video.`
            : `${foundName(source.result)} from ${FOUND_SOURCE_TITLES[source.result.source]}, for this video.`,
      };
    case "translate": {
      const name = languageName(source.language);
      const by = TRANSLATOR_TITLES[translator];
      const text =
        source.mode === "line"
          ? `${capitalized} shows one line at a time, so ${by} translates each line as it appears.`
          : source.instead
            ? `${by} translates as you watch, in place of the video's ${name} subtitles.`
            : `No ${name} subtitles in this video. ${by} translates as you watch.`;
      return { tag: "translate", text: error ? `${text} ${by} failed: ${error}` : text };
    }
  }
}
