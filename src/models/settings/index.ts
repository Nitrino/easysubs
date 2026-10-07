import { createStore, createEvent, sample, createEffect } from "effector";
import { debug } from "patronum";

import { withPersist } from "@src/utils/withPersist";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import {
  TFoundShow,
  TFoundVideo,
  TLearningService,
  TNextEpisodeMode,
  TOpenSubtitlesQuota,
  TSecondaryChoice,
  TSecondaryPosition,
  TSecondaryReveal,
  TSecondaryTranslator,
  TTranslationService,
  TTtsService,
} from "../types";
import { fetchCurrentStreamingFx } from "../streamings";

// Settings are saved under their names. Up to v3.1.3 they were saved under the ids effector gave the stores
// ("persist:202"), which change with the order units are created in; withPersist moves them from there once. Settings
// added later have no legacy id.
const createSetting = <State>(name: string, defaultState: State, legacyId?: number) =>
  withPersist(
    createStore<State>(defaultState, { name }),
    legacyId === undefined ? undefined : { legacyKey: `persist:${legacyId}` },
  );

export const $enabled = createSetting("enabled", true, 202);
export const enableToggleChanged = createEvent<boolean>();
export const enableToggleChangeFx = createEffect<boolean, boolean>((isEnabled) => isEnabled);

export const $activeSettingsTab = createSetting("activeSettingsTab", 0, 220);
export const activeSettingsTabChanged = createEvent<number>();

export const $progressBarEnabled = createSetting("progressBarEnabled", true, 225);
export const progressBarEnabledChanged = createEvent<boolean>();
export const progressBarEnabledChangeFx = createEffect<boolean, boolean>((isEnabled) => isEnabled);

export const $autoStopEnabled = createSetting("autoStopEnabled", true, 243);
export const autoStopEnabledChanged = createEvent<boolean>();

export const $netflixOnFlightEnabled = createSetting("netflixOnFlightEnabled", false, 248);
export const netflixOnFlightEnabledChanged = createEvent<boolean>();
export const netflixOnFlightEnabledChangedFx = createEffect<boolean, void>(() => location.reload());

export const $moveBySubsEnabled = createSetting("moveBySubsEnabled", true, 266);
export const moveBySubsEnabledChanged = createEvent<boolean>();
export const moveBySubsEnabledChangeFx = createEffect<boolean, boolean>((isEnabled) => {
  if (isEnabled) {
    addKeyboardEventsListeners();
  } else {
    removeKeyboardEventsListeners();
  }
  return isEnabled;
});

export const $translateLanguage = createSetting("translateLanguage", window.navigator.language.split("-")[0], 284);
export const translateLanguageChanged = createEvent<string>();
export const translateLanguageChangeFx = createEffect<string, string>((value) => value);

export const $learningService = createSetting<TLearningService>("learningService", "disabled", 302);
export const learningServiceChanged = createEvent<TLearningService>();
export const learningServiceChangeFx = createEffect<TLearningService, TLearningService>((value) => value);

export const $translationService = createSetting<TTranslationService>("translationService", "google", 320);
export const translationServiceChanged = createEvent<TTranslationService>();
export const translationServiceChangeFx = createEffect<TTranslationService, TTranslationService>((value) => value);

export const $deeplApiKey = createSetting("deeplApiKey", "", 338);
export const deeplApiKeyChanged = createEvent<string>();
export const deeplApiKeyChangeFx = createEffect<string, string>((value) => value);

export const $deeplApiKeyModalOpen = createStore<boolean>(false);
export const deeplApiKeyModalOpened = createEvent();
export const deeplApiKeyModalClosed = createEvent();

export const $chatGPTApiKey = createSetting("chatGPTApiKey", "", 361);
export const chatGPTApiKeyChanged = createEvent<string>();
export const chatGPTApiKeyChangeFx = createEffect<string, string>((value) => value);

export const $chatGPTModel = createSetting("chatGPTModel", "gpt-4o-mini", 379);
export const chatGPTModelChanged = createEvent<string>();
export const chatGPTModelChangeFx = createEffect<string, string>((value) => value);

export const $ttsService = createSetting<TTtsService>("ttsService", "google");
export const ttsServiceChanged = createEvent<TTtsService>();
export const ttsServiceChangeFx = createEffect<TTtsService, TTtsService>((value) => value);

export const $chatGPTApiKeyModalOpen = createStore<boolean>(false);
export const chatGPTApiKeyModalOpened = createEvent();
export const chatGPTApiKeyModalClosed = createEvent();

export const $subsFontSize = createSetting("subsFontSize", 100, 402);
export const subsFontSizeButtonPressed = createEvent<number>();
export const subsFontSizeChangeFx = createEffect<number, number>((value) => value);

export const $subsBackground = createSetting("subsBackground", true, 420);
export const subsBackgroundButtonPressed = createEvent<boolean>();
export const subsBackgroundToggleFx = createEffect<boolean, boolean>((value) => value);

export const $subsBackgroundOpacity = createSetting("subsBackgroundOpacity", 50, 438);
export const subsBackgroundOpacityButtonPressed = createEvent<number>();
export const subsBackgroundOpacityChangeFx = createEffect<number, number>((value) => value);

export const $autoPause = createSetting("autoPause", false, 456);
export const autoPauseChanged = createEvent<boolean>();
$autoPause.on(autoPauseChanged, (_, value) => value);

// The second subtitle line (src/models/secondarySubs). Off until it's turned on in the Second line tab.
export const $secondarySubs = createSetting<TSecondaryChoice>("secondarySubs", { language: "off" });
export const secondarySubsChanged = createEvent<TSecondaryChoice>();

// Google unless DeepL or ChatGPT is picked for the second line itself: a film uses far more characters than words
export const $secondarySubsTranslator = createSetting<TSecondaryTranslator>("secondarySubsTranslator", "google");
export const secondarySubsTranslatorChanged = createEvent<TSecondaryTranslator>();

export const $secondarySubsPosition = createSetting<TSecondaryPosition>("secondarySubsPosition", "below");
export const secondarySubsPositionChanged = createEvent<TSecondaryPosition>();

// Percent of the main subtitles' size
export const SECONDARY_SUBS_SIZE_MIN = 50;
export const SECONDARY_SUBS_SIZE_MAX = 100;
export const $secondarySubsSize = createSetting("secondarySubsSize", 75);
export const secondarySubsSizeButtonPressed = createEvent<number>();

export const SECONDARY_SUBS_COLORS = [
  { name: "Amber", value: "#ffd866" },
  { name: "White", value: "#ffffff" },
  { name: "Gray", value: "#b9c1cc" },
  { name: "Sky", value: "#9ccbff" },
  { name: "Mint", value: "#a6e3b8" },
] as const;
export const $secondarySubsColor = createSetting<string>("secondarySubsColor", SECONDARY_SUBS_COLORS[0].value);
export const secondarySubsColorChanged = createEvent<string>();

export const $secondarySubsBackground = createSetting("secondarySubsBackground", true);
export const secondarySubsBackgroundChanged = createEvent<boolean>();

export const $secondarySubsReveal = createSetting<TSecondaryReveal>("secondarySubsReveal", "always");
export const secondarySubsRevealChanged = createEvent<TSecondaryReveal>();

// Where the second line's own block was dragged with the Top position, per service: players put their controls in
// different places
export type TOffset = { x: number; y: number };
export const $secondarySubsTopOffset = createSetting<Record<string, TOffset>>("secondarySubsTopOffset", {});
export const secondarySubsTopMoved = createEvent<{ service: string } & TOffset>();

// Subtitles found online (src/models/foundSubs). Accounts and keys are set in the search sheet's Sources view.

// The Stremio mirror stands in for OpenSubtitles when the day's downloads are used or its API is down
export const $foundSubsMirror = createSetting("foundSubsMirror", true);
export const foundSubsMirrorChanged = createEvent<boolean>();
// Addic7ed through Gestdown, for TV episodes
export const $foundSubsAddic7ed = createSetting("foundSubsAddic7ed", true);
export const foundSubsAddic7edChanged = createEvent<boolean>();
// Machine and AI translations are left out of the results unless the sheet's switch shows them
export const $foundSubsHideMachine = createSetting("foundSubsHideMachine", true);
export const foundSubsHideMachineChanged = createEvent<boolean>();
// Sound descriptions of hearing-impaired files: "[door creaks]", "♪ … ♪", "JOHN:"
export const $foundSubsStripSdh = createSetting("foundSubsStripSdh", false);
export const foundSubsStripSdhChanged = createEvent<boolean>();
export const $foundSubsNextEpisode = createSetting<TNextEpisodeMode>("foundSubsNextEpisode", "ask");
export const foundSubsNextEpisodeChanged = createEvent<TNextEpisodeMode>();

// The user's own keys of sources that need one
export const $subdlApiKey = createSetting("subdlApiKey", "");
export const subdlApiKeyChanged = createEvent<string>();
export const $subsourceApiKey = createSetting("subsourceApiKey", "");
export const subsourceApiKeyChanged = createEvent<string>();
export const $jimakuApiKey = createSetting("jimakuApiKey", "");
export const jimakuApiKeyChanged = createEvent<string>();

// The OpenSubtitles account the background signed in to (src/subsSources/session.ts keeps its password and token)
export const $opensubtitlesAccount = createSetting<{ username: string } | null>("opensubtitlesAccount", null);
export const opensubtitlesAccountChanged = createEvent<{ username: string } | null>();
// Downloads left today, as OpenSubtitles last said
export const $opensubtitlesQuota = createSetting<TOpenSubtitlesQuota | null>("opensubtitlesQuota", null);
export const opensubtitlesQuotaChanged = createEvent<TOpenSubtitlesQuota | null>();

// What was loaded on each video ("service:page"), and the last found file of each show
export const $foundSubsByVideo = createSetting<Record<string, TFoundVideo>>("foundSubsByVideo", {});
export const $foundSubsShows = createSetting<Record<string, TFoundShow>>("foundSubsShows", {});

export const esRenderSetings = createEvent();

sample({
  clock: enableToggleChanged,
  target: enableToggleChangeFx,
});

sample({
  clock: progressBarEnabledChanged,
  target: progressBarEnabledChangeFx,
});

sample({
  clock: moveBySubsEnabledChanged,
  target: moveBySubsEnabledChangeFx,
});

sample({
  clock: translateLanguageChanged,
  target: translateLanguageChangeFx,
});

sample({
  clock: learningServiceChanged,
  target: learningServiceChangeFx,
});

sample({
  clock: translationServiceChanged,
  target: translationServiceChangeFx,
});

sample({
  clock: translationServiceChanged,
  filter: (service) => service === "deepl",
  target: deeplApiKeyModalOpened,
});

sample({
  clock: translationServiceChanged,
  filter: (service) => service === "chatgpt",
  target: chatGPTApiKeyModalOpened,
});

sample({
  clock: ttsServiceChanged,
  target: ttsServiceChangeFx,
});

// Pronunciation shares the key with translation; ask for it only if there's none yet
sample({
  clock: ttsServiceChanged,
  source: $chatGPTApiKey,
  filter: (apiKey, service) => service === "chatgpt" && !apiKey,
  target: chatGPTApiKeyModalOpened,
});

sample({
  clock: deeplApiKeyChanged,
  target: deeplApiKeyChangeFx,
});

sample({
  clock: chatGPTApiKeyChanged,
  target: chatGPTApiKeyChangeFx,
});

sample({
  clock: chatGPTModelChanged,
  target: chatGPTModelChangeFx,
});

sample({
  clock: subsFontSizeButtonPressed,
  target: subsFontSizeChangeFx,
});

sample({
  clock: subsBackgroundButtonPressed,
  target: subsBackgroundToggleFx,
});

sample({
  clock: subsBackgroundOpacityButtonPressed,
  filter: (value) => value >= 0 && value <= 100,
  target: subsBackgroundOpacityChangeFx,
});

$enabled.on(enableToggleChangeFx.doneData, (_, isEnabled) => isEnabled);
$progressBarEnabled.on(progressBarEnabledChangeFx.doneData, (_, isEnabled) => isEnabled);
$autoStopEnabled.on(autoStopEnabledChanged, (_, isEnabled) => isEnabled);
$netflixOnFlightEnabled.on(netflixOnFlightEnabledChanged, (_, isEnabled) => isEnabled);
$moveBySubsEnabled.on(moveBySubsEnabledChangeFx.doneData, (_, isEnabled) => isEnabled);
$translateLanguage.on(translateLanguageChangeFx.doneData, (_, language) => language);
$learningService.on(learningServiceChangeFx.doneData, (_, service) => service);
$translationService.on(translationServiceChangeFx.doneData, (_, service) => service);
$ttsService.on(ttsServiceChangeFx.doneData, (_, service) => service);
$deeplApiKey.on(deeplApiKeyChangeFx.doneData, (_, key) => key);
$deeplApiKeyModalOpen.on(deeplApiKeyModalOpened, () => true);
$deeplApiKeyModalOpen.on(deeplApiKeyModalClosed, () => false);
$chatGPTApiKey.on(chatGPTApiKeyChangeFx.doneData, (_, key) => key);
$chatGPTModel.on(chatGPTModelChangeFx.doneData, (_, model) => model);
$chatGPTApiKeyModalOpen.on(chatGPTApiKeyModalOpened, () => true);
$chatGPTApiKeyModalOpen.on(chatGPTApiKeyModalClosed, () => false);
$subsFontSize.on(subsFontSizeChangeFx.doneData, (_, subsFontSize) => subsFontSize);
$subsBackground.on(subsBackgroundToggleFx.doneData, (_, value) => value);
$subsBackgroundOpacity.on(subsBackgroundOpacityChangeFx.doneData, (_, value) => value);
$activeSettingsTab.on(activeSettingsTabChanged, (_, value) => value);
$secondarySubs.on(secondarySubsChanged, (_, choice) => choice);
$secondarySubsTranslator.on(secondarySubsTranslatorChanged, (_, translator) => translator);
$secondarySubsPosition.on(secondarySubsPositionChanged, (_, position) => position);
$secondarySubsSize.on(secondarySubsSizeButtonPressed, (size, value) =>
  value >= SECONDARY_SUBS_SIZE_MIN && value <= SECONDARY_SUBS_SIZE_MAX ? value : size,
);
$secondarySubsColor.on(secondarySubsColorChanged, (_, color) => color);
$secondarySubsBackground.on(secondarySubsBackgroundChanged, (_, value) => value);
$secondarySubsReveal.on(secondarySubsRevealChanged, (_, reveal) => reveal);
$secondarySubsTopOffset.on(secondarySubsTopMoved, (offsets, { service, x, y }) => ({
  ...offsets,
  [service]: { x, y },
}));
$foundSubsMirror.on(foundSubsMirrorChanged, (_, value) => value);
$foundSubsAddic7ed.on(foundSubsAddic7edChanged, (_, value) => value);
$foundSubsHideMachine.on(foundSubsHideMachineChanged, (_, value) => value);
$foundSubsStripSdh.on(foundSubsStripSdhChanged, (_, value) => value);
$foundSubsNextEpisode.on(foundSubsNextEpisodeChanged, (_, value) => value);
$subdlApiKey.on(subdlApiKeyChanged, (_, key) => key.trim());
$subsourceApiKey.on(subsourceApiKeyChanged, (_, key) => key.trim());
$jimakuApiKey.on(jimakuApiKeyChanged, (_, key) => key.trim());
$opensubtitlesAccount.on(opensubtitlesAccountChanged, (_, account) => account);
$opensubtitlesQuota.on(opensubtitlesQuotaChanged, (_, quota) => quota);

// Picking a paid translator for the second line asks for its key when there's none yet
sample({
  clock: secondarySubsTranslatorChanged,
  source: $deeplApiKey,
  filter: (apiKey, translator) => translator === "deepl" && !apiKey,
  target: deeplApiKeyModalOpened,
});

sample({
  clock: secondarySubsTranslatorChanged,
  source: $chatGPTApiKey,
  filter: (apiKey, translator) => translator === "chatgpt" && !apiKey,
  target: chatGPTApiKeyModalOpened,
});

$enabled.watch((isEnabled) => {
  document.body.classList.toggle("es-enabled", isEnabled);
});

sample({
  clock: netflixOnFlightEnabledChanged,
  target: netflixOnFlightEnabledChangedFx,
});

$progressBarEnabled.watch((isEnabled) => {
  document.body.classList.toggle("es-progress-bar-enabled", isEnabled);
});
$moveBySubsEnabled.watch((isEnabled) => {
  document.body.classList.toggle("es-move-by-subs-enabled", isEnabled);
});
$netflixOnFlightEnabled.watch((isEnabled) => {
  document.body.classList.toggle("es-netflix-on-flight", isEnabled);
  fetchCurrentStreamingFx();
});

debug(
  $enabled,
  $translateLanguage,
  $learningService,
  $translationService,
  $subsFontSize,
  $subsBackground,
  $moveBySubsEnabled,
);
