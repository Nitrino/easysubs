import { createStore, createEvent, sample, createEffect } from "effector";
import { debug } from "patronum";

import { withPersist } from "@src/utils/withPersist";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { TLearningService, TTranslationService } from "../types";
import { fetchCurrentStreamingFx } from "../streamings";

// Settings are saved under their names. Up to v3.1.3 they were saved under the ids effector gave the stores
// ("persist:202"), which change with the order units are created in; withPersist moves them from there once.
const createSetting = <State>(name: string, defaultState: State, legacyId: number) =>
  withPersist(createStore<State>(defaultState, { name }), { legacyKey: `persist:${legacyId}` });

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
