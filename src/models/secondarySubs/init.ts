import { sample } from "effector";
import { resync } from "subtitle";

import {
  $currentSecondarySubs,
  $mainSubsShift,
  $secondaryError,
  $secondaryHidden,
  $secondaryPage,
  $secondaryPendings,
  $secondaryRawSubs,
  $secondaryRetryAt,
  $secondaryRevealed,
  $secondarySource,
  $secondaryTrackLabel,
  $secondaryTracks,
  $secondaryTranslationKey,
  $secondaryTranslations,
  SECONDARY_RETRY_DELAY_MS,
  fetchSecondarySubsFx,
  fetchSecondaryTracksFx,
  readSecondaryCacheFx,
  secondaryBatchPicked,
  secondaryLineToggled,
  secondaryRevealHeld,
  secondaryTracksRequested,
  secondaryTranslationsReceived,
  translateSecondaryFx,
  writeSecondaryCacheFx,
} from ".";
import { $subs, $subsLanguage, $subsTitle, fetchSubsFx, subsResyncFx, updateCustomSubsFx } from "../subs";
import { $streaming } from "../streamings";
import { $video, videoTimeUpdate } from "../videos";
import { $chatGPTApiKey, $chatGPTModel, $deeplApiKey, $secondarySubsTranslator } from "../settings";
import { nextTranslationBatch } from "@src/utils/secondaryTranslationWindow";
import { videoPageKey } from "@src/utils/translationCache";
import { debug } from "patronum";

// ---- Tracks --------------------------------------------------------------------------------------

// Whenever the main subtitles load (another video or track), and when the settings open
sample({
  clock: [fetchSubsFx.done, secondaryTracksRequested],
  source: $streaming,
  target: fetchSecondaryTracksFx,
});
$secondaryTracks.on(fetchSecondaryTracksFx.doneData, (_, tracks) => tracks);

$secondaryPage.on(fetchSubsFx.done, () => videoPageKey(location));

// ---- Second track --------------------------------------------------------------------------------

$mainSubsShift.on(subsResyncFx.done, (_, { params }) => params.delay);
$mainSubsShift.reset(fetchSubsFx.done, updateCustomSubsFx.done);

$secondaryRawSubs.reset($secondaryTrackLabel.updates);

// A new track, and again with the main subtitles: Netflix moves both after an ad break
sample({
  clock: [$secondaryTrackLabel.updates, fetchSubsFx.done],
  source: { streaming: $streaming, label: $secondaryTrackLabel },
  filter: (source): source is { streaming: typeof source.streaming; label: string } => source.label !== null,
  target: fetchSecondarySubsFx,
});

// Only the track that's still wanted, moved by the delay the main subtitles have
sample({
  clock: fetchSecondarySubsFx.done,
  source: { label: $secondaryTrackLabel, shift: $mainSubsShift },
  filter: ({ label }, { params }) => label === params.label,
  fn: ({ shift }, { result }) => (shift ? resync(result ?? [], shift * 1000) : (result ?? [])),
  target: $secondaryRawSubs,
});

// The delay buttons move both tracks
$secondaryRawSubs.on(subsResyncFx.done, (subs, { params }) => resync(subs, (params.delay - params.subsDelay) * 1000));

// ---- Translation ---------------------------------------------------------------------------------

$secondaryTranslations.reset($secondaryTranslationKey.updates);
$secondaryPendings.reset($secondaryTranslationKey.updates);
$secondaryRetryAt.reset($secondaryTranslationKey.updates);
$secondaryError.reset($secondaryTranslationKey.updates, $secondaryTrackLabel.updates);

const cacheKey = (streaming: string, title: string, translationKey: string) =>
  `${streaming}:${videoPageKey(location)}:${title}:${translationKey}`;

// Whole tracks only: services that show one line at a time have nothing to look ahead in
sample({
  clock: [$secondaryTranslationKey.updates, fetchSubsFx.done],
  source: { source: $secondarySource, key: $secondaryTranslationKey, streaming: $streaming, title: $subsTitle },
  filter: ({ source, key }) => source.type === "translate" && source.mode === "window" && key !== null,
  fn: ({ key, streaming, title }) => ({ cacheKey: cacheKey(streaming.name, title, key), translationKey: key }),
  target: readSecondaryCacheFx,
});

// The next window of lines, checked as the video plays, after a seek and once a batch's translations are in (not
// on its `finally`: its lines stop being pending a step before their translations arrive)
sample({
  clock: [
    videoTimeUpdate,
    $subs,
    $secondaryTranslationKey,
    secondaryTranslationsReceived,
    $secondaryHidden,
    readSecondaryCacheFx.fail,
    $subsLanguage,
  ],
  source: {
    source: $secondarySource,
    subs: $subs,
    video: $video,
    translations: $secondaryTranslations,
    pendings: $secondaryPendings,
    retryAt: $secondaryRetryAt,
    hidden: $secondaryHidden,
    inFlight: translateSecondaryFx.pending,
    // Lines of an earlier visit come from the cache first
    readingCache: readSecondaryCacheFx.pending,
    translator: $secondarySubsTranslator,
    sourceLanguage: $subsLanguage,
    deeplApiKey: $deeplApiKey,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
  },
  filter: ({ source, video, hidden, inFlight, readingCache, retryAt, translator, sourceLanguage }) =>
    source.type === "translate" &&
    video !== null &&
    !hidden &&
    !inFlight &&
    !readingCache &&
    Date.now() >= retryAt &&
    // Chrome's translator needs the subtitles' language, which is detected after they load
    (translator !== "chrome" || sourceLanguage !== "auto"),
  fn: ({
    source,
    subs,
    video,
    translations,
    pendings,
    translator,
    sourceLanguage,
    deeplApiKey,
    chatGPTApiKey,
    chatGPTModel,
  }) => ({
    texts: nextTranslationBatch({ subs, time: video.currentTime * 1000, translations, pendings }),
    language: source.type === "translate" ? source.language : "",
    sourceLanguage,
    translator,
    deeplApiKey,
    chatGPTApiKey,
    chatGPTModel,
  }),
  target: secondaryBatchPicked,
});

sample({
  clock: secondaryBatchPicked,
  filter: ({ texts }) => texts.length > 0,
  target: translateSecondaryFx,
});

$secondaryPendings.on(translateSecondaryFx, (pendings, { texts }) => ({
  ...pendings,
  ...Object.fromEntries(texts.map((text) => [text, true])),
}));
$secondaryPendings.on(translateSecondaryFx.finally, (pendings, { params }) =>
  Object.fromEntries(Object.entries(pendings).filter(([text]) => !params.texts.includes(text))),
);

// Only answers in the language and from the translator still chosen
sample({
  clock: translateSecondaryFx.done,
  source: $secondaryTranslationKey,
  filter: (key, { params }) => key === `${params.language}:${params.translator}`,
  fn: (_, { params, result }) => Object.fromEntries(params.texts.map((text, index) => [text, result[index] ?? ""])),
  target: secondaryTranslationsReceived,
});
$secondaryTranslations.on(secondaryTranslationsReceived, (translations, received) => ({
  ...translations,
  ...received,
}));

$secondaryError.on([translateSecondaryFx.failData, fetchSecondarySubsFx.failData], (_, error) => error.message);
$secondaryError.reset(translateSecondaryFx.done, fetchSecondarySubsFx.done);
$secondaryRetryAt.on(translateSecondaryFx.fail, () => Date.now() + SECONDARY_RETRY_DELAY_MS);

// ---- Translation cache ---------------------------------------------------------------------------

sample({
  clock: readSecondaryCacheFx.done,
  source: { key: $secondaryTranslationKey, translations: $secondaryTranslations },
  // Also when the cache has nothing: that's what starts the first window
  filter: ({ key }, { params }) => key === params.translationKey,
  // Lines translated in the meantime stay
  fn: ({ translations }, { result }) => ({ ...result, ...translations }),
  target: secondaryTranslationsReceived,
});

sample({
  clock: secondaryTranslationsReceived,
  source: {
    source: $secondarySource,
    key: $secondaryTranslationKey,
    streaming: $streaming,
    title: $subsTitle,
    subs: $subs,
    translations: $secondaryTranslations,
  },
  filter: ({ source, key }, received) =>
    source.type === "translate" && source.mode === "window" && key !== null && Object.keys(received).length > 0,
  fn: ({ key, streaming, title, subs, translations }) => {
    const texts = new Set(subs.map((sub) => sub.cleanedText));
    return {
      key: cacheKey(streaming.name, title, key),
      translations: Object.fromEntries(Object.entries(translations).filter(([text]) => texts.has(text))),
    };
  },
  target: writeSecondaryCacheFx,
});

// ---- Showing and hiding --------------------------------------------------------------------------

$secondaryHidden.on(secondaryLineToggled, (hidden) => !hidden);
$secondaryHidden.reset($secondaryPage.updates);
$secondaryRevealed.on(secondaryRevealHeld, (_, held) => held);

debug(
  $secondarySource,
  $secondaryTracks,
  fetchSecondarySubsFx.failData,
  translateSecondaryFx.failData,
  $currentSecondarySubs,
  $secondaryHidden,
);
