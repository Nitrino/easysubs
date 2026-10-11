import { merge, sample } from "effector";
import { debounce, debug } from "patronum";

import {
  $transcriptError,
  $transcriptOpen,
  $transcriptOwnTranslations,
  $transcriptAllPendings,
  $transcriptPendings,
  $transcriptQuery,
  $transcriptRetryAt,
  $transcriptSecond,
  $transcriptShown,
  $transcriptTranslationKey,
  $transcriptTranslations,
  transcriptClosed,
  transcriptQueryChanged,
  transcriptShownChanged,
  transcriptToggled,
  transcriptTranslateFx,
} from ".";
import { $subs, $subsLanguage } from "../subs";
import { videoTimeUpdate } from "../videos";
import {
  $chatGPTApiKey,
  $chatGPTModel,
  $deeplApiKey,
  $ollamaModel,
  $ollamaUrl,
  $secondarySubsTranslator,
} from "../settings";
import { SECONDARY_RETRY_DELAY_MS } from "../secondarySubs";
import { transcriptBatch } from "@src/utils/transcript";

const BATCH_DEBOUNCE_MS = 50;

$transcriptOpen.on(transcriptToggled, (open) => !open);
$transcriptOpen.on(transcriptClosed, () => false);

$transcriptQuery.on(transcriptQueryChanged, (_, query) => query);
$transcriptShown.on(transcriptShownChanged, (_, shown) => shown);
// Another video or track: the sidebar reports what it shows again
$transcriptShown.reset($subs);

// ---- Translation ---------------------------------------------------------------------------------

$transcriptOwnTranslations.reset($transcriptTranslationKey.updates);
$transcriptPendings.reset($transcriptTranslationKey.updates);
$transcriptRetryAt.reset($transcriptTranslationKey.updates);
$transcriptError.reset($transcriptTranslationKey.updates);

// The untranslated lines the sidebar shows, while it's open, as it scrolls, once a batch is done and, after a failed
// one, as the video plays. Several of these change at once (a new track, a batch that's done), and each would pick the
// same lines before the request marks them pending, so they're taken together a moment later.
const batchWanted = debounce(
  merge([
    $transcriptOpen,
    $transcriptShown,
    $transcriptTranslationKey,
    transcriptTranslateFx.finally,
    $subsLanguage,
    $subs,
    videoTimeUpdate,
  ]),
  BATCH_DEBOUNCE_MS,
);
const batchPicked = sample({
  clock: batchWanted,
  source: {
    open: $transcriptOpen,
    shown: $transcriptShown,
    second: $transcriptSecond,
    subs: $subs,
    translations: $transcriptTranslations,
    pendings: $transcriptAllPendings,
    retryAt: $transcriptRetryAt,
    inFlight: transcriptTranslateFx.pending,
    translator: $secondarySubsTranslator,
    sourceLanguage: $subsLanguage,
    deeplApiKey: $deeplApiKey,
    chatGPTApiKey: $chatGPTApiKey,
    chatGPTModel: $chatGPTModel,
    ollamaUrl: $ollamaUrl,
    ollamaModel: $ollamaModel,
  },
  filter: ({ open, shown, second, inFlight, retryAt, translator, sourceLanguage }) =>
    open &&
    shown !== null &&
    second.type === "translate" &&
    !inFlight &&
    Date.now() >= retryAt &&
    // Chrome's translator and Bergamot need the subtitles' language, which is detected after they load
    ((translator !== "chrome" && translator !== "bergamot") || sourceLanguage !== "auto"),
  fn: ({
    shown,
    second,
    subs,
    translations,
    pendings,
    translator,
    sourceLanguage,
    deeplApiKey,
    chatGPTApiKey,
    chatGPTModel,
    ollamaUrl,
    ollamaModel,
  }) => ({
    texts: transcriptBatch({ subs, from: shown!.from, to: shown!.to, translations, pendings }),
    language: second.type === "translate" ? second.language : "",
    sourceLanguage,
    translator,
    deeplApiKey,
    chatGPTApiKey,
    chatGPTModel,
    ollamaUrl,
    ollamaModel,
  }),
});

sample({
  clock: batchPicked,
  filter: ({ texts }) => texts.length > 0,
  target: transcriptTranslateFx,
});

$transcriptPendings.on(transcriptTranslateFx, (pendings, { texts }) => ({
  ...pendings,
  ...Object.fromEntries(texts.map((text) => [text, true])),
}));
$transcriptPendings.on(transcriptTranslateFx.finally, (pendings, { params }) =>
  Object.fromEntries(Object.entries(pendings).filter(([text]) => !params.texts.includes(text))),
);

// Only answers in the language and from the translator still chosen
sample({
  clock: transcriptTranslateFx.done,
  source: { key: $transcriptTranslationKey, translations: $transcriptOwnTranslations },
  filter: ({ key }, { params }) => key === `${params.language}:${params.translator}`,
  fn: ({ translations }, { params, result }) => ({
    ...translations,
    ...Object.fromEntries(params.texts.map((text, index) => [text, result[index] ?? ""])),
  }),
  target: $transcriptOwnTranslations,
});

$transcriptError.on(transcriptTranslateFx.failData, (_, error) => error.message);
$transcriptError.reset(transcriptTranslateFx.done);
$transcriptRetryAt.on(transcriptTranslateFx.fail, () => Date.now() + SECONDARY_RETRY_DELAY_MS);

debug($transcriptOpen, $transcriptSecond, transcriptTranslateFx.failData);
