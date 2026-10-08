import { attach, combine, createEffect } from "effector";

import type Service from "@src/streamings/service";
import type { TMediaFile, TWordContext } from "@src/learning-service/learningService";
import type { TAnkiContext, TLearningService, TSecondarySource, TSub, TTitleInfo } from "../types";
import {
  $ankiContext,
  $chatGPTApiKey,
  $chatGPTModel,
  $deeplApiKey,
  $learningService,
  $translateLanguage,
  $translationService,
} from "../settings";
import { $subs, $subsLanguage } from "../subs";
import { $video } from "../videos";
import { $streaming } from "../streamings";
import { $foundSecondLines, $secondarySource, $secondaryTrackLines, $secondaryTranslations } from "../secondarySubs";
import { translateLine } from "../translations";
import { getLearningService } from "@src/utils/getLearningService";
import { sentenceHtml, sourceHtml, timedUrl, titleLabel } from "@src/utils/wordContext";
import { captureFrame } from "@src/utils/videoFrame";
import { BufferedAudio } from "@src/audio/bufferedAudio";

// Adding a word to the learning service picked in the settings. Anki gets the subtitle line it was added from: the
// line with the word in bold, its translation, the frame on screen, the line's sound and where it's from
// (src/learning-service/anki.ts).

// The audio the player buffered, kept while Anki cards get the line's sound (src/audio/bufferedAudio.ts)
const bufferedAudio = new BufferedAudio();
export const $keepAudio = combine(
  $learningService,
  $ankiContext,
  (service, context) => service === "anki" && context.sentence && context.audio,
);
let stopKeepingAudio: (() => void) | null = null;
$keepAudio.watch((keep) => {
  if (keep && !stopKeepingAudio) {
    stopKeepingAudio = bufferedAudio.listen(() => ($video.getState()?.currentTime ?? 0) * 1000);
  } else if (!keep && stopKeepingAudio) {
    stopKeepingAudio();
    stopKeepingAudio = null;
  }
});
export const clipLineFx = createEffect<{ start: number; end: number }, TMediaFile | null>(({ start, end }) =>
  bufferedAudio.clip(start, end),
);

export type TWordToAdd = {
  word: string;
  translation: string;
  partOfSpeech?: string;
  // The cue the word was hovered in and the word's items in it, several for an expression
  cueId?: number;
  indexes?: number[];
};

type TAddParams = TWordToAdd & {
  service: TLearningService;
  options: TAnkiContext;
  subs: TSub[];
  subsLanguage: string;
  video: HTMLVideoElement | null;
  streaming: Service;
  translateLanguage: string;
  translationService: string;
  deeplApiKey: string;
  chatGPTApiKey: string;
  chatGPTModel: string;
  secondary: {
    source: TSecondarySource;
    trackLines: Record<number, string>;
    foundLines: Record<number, string>;
    translations: Record<string, string>;
  };
};

// The service's title is only waited for so long: the card goes without it
const TITLE_TIMEOUT_MS = 1500;

const baseLanguage = (language: string) => language.split("-")[0].toLowerCase();

// The second line of the cue, when it shows the cue in `language`
function secondaryText(secondary: TAddParams["secondary"], sub: TSub, language: string): string | null {
  const { source } = secondary;
  if (source.type !== "track" && source.type !== "found" && source.type !== "translate") return null;
  if (baseLanguage(source.language) !== baseLanguage(language)) return null;
  if (source.type === "track") return secondary.trackLines[sub.id] || null;
  if (source.type === "found") return secondary.foundLines[sub.id] || null;
  return secondary.translations[sub.cleanedText] || null;
}

async function lineTranslation(params: TAddParams, sub: TSub): Promise<string | undefined> {
  if (baseLanguage(params.subsLanguage) === baseLanguage(params.translateLanguage)) return undefined;
  const shown = secondaryText(params.secondary, sub, params.translateLanguage);
  if (shown) return shown;
  try {
    const translation = await translateLine({
      source: sub.cleanedText,
      language: params.translateLanguage,
      sourceLanguage: params.subsLanguage,
      translationService: params.translationService,
      deeplApiKey: params.deeplApiKey,
      chatGPTApiKey: params.chatGPTApiKey,
      chatGPTModel: params.chatGPTModel,
    });
    // Google's sentences come joined with a space after each
    return translation.trim() || undefined;
  } catch (error) {
    console.warn("The line's translation failed, the card goes without it:", error);
    return undefined;
  }
}

async function readTitle(streaming: Service): Promise<TTitleInfo | null> {
  if (!streaming.getTitle) return null;
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), TITLE_TIMEOUT_MS));
  try {
    return await Promise.race([streaming.getTitle(), timeout]);
  } catch {
    return null;
  }
}

async function collectContext(params: TAddParams): Promise<TWordContext | undefined> {
  const { options, cueId, indexes = [] } = params;
  const sub = params.subs.find((cue) => cue.id === cueId);
  if (!options.sentence || !sub) return undefined;

  // The frame on screen and the sound before anything is waited for: the effect keeps its scope until then
  const picture = options.picture && params.video ? captureFrame(params.video) : null;
  const audio = options.audio ? clipLineFx({ start: sub.start, end: sub.end }).catch(() => null) : null;
  const [translation, title, clip] = await Promise.all([
    options.translation ? lineTranslation(params, sub) : undefined,
    readTitle(params.streaming),
    audio,
  ]);
  const source = sourceHtml({
    label: titleLabel(title, document.title),
    url: timedUrl(location.href, params.streaming.name, sub.start),
    time: sub.start,
  });

  return {
    sentence: sentenceHtml(sub, indexes),
    ...(translation && { translation }),
    source,
    ...(picture && { picture }),
    ...(clip && { audio: clip }),
  };
}

export const addWordFx = attach({
  source: {
    service: $learningService,
    options: $ankiContext,
    subs: $subs,
    subsLanguage: $subsLanguage,
    video: $video,
    streaming: $streaming,
    translateLanguage: $translateLanguage,
    translationService: $translationService,
    deeplApiKey: $deeplApiKey,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
    secondarySource: $secondarySource,
    trackLines: $secondaryTrackLines,
    foundLines: $foundSecondLines,
    translations: $secondaryTranslations,
  },
  mapParams: (word: TWordToAdd, { secondarySource, trackLines, foundLines, translations, ...source }): TAddParams => ({
    ...word,
    ...source,
    secondary: { source: secondarySource, trackLines, foundLines, translations },
  }),
  effect: createEffect<TAddParams, string, string>(async (params) => {
    const service = getLearningService(params.service);
    if (!service) throw "Pick a learning service in the settings";

    const context = params.service === "anki" ? await collectContext(params) : undefined;
    return service.addWord(params.word, params.translation, {
      partOfSpeech: params.partOfSpeech,
      ...(context && { context }),
    });
  }),
});
