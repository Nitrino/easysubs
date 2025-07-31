import { createStore, createEvent, sample, createEffect } from "effector";
import { debug } from "patronum";

import { withPersist } from "@src/utils/withPersist";
import {
  addKeyboardEventsListeners,
  removeKeyboardEventsListeners,
} from "@src/utils/keyboardHandler";
import { TLearningService, TTranslationService } from "../types";
import { fetchCurrentStreamingFx } from "../streamings";

export const $enabled = withPersist(createStore<boolean>(true));
export const enableToggleChanged = createEvent<boolean>();
export const enableToggleChangeFx = createEffect<boolean, boolean>(
  (isEnabled) => isEnabled,
);

export const $activeSettingsTab = withPersist(createStore<number>(0));
export const activeSettingsTabChanged = createEvent<number>();

export const $progressBarEnabled = withPersist(createStore<boolean>(true));
export const progressBarEnabledChanged = createEvent<boolean>();
export const progressBarEnabledChangeFx = createEffect<boolean, boolean>(
  (isEnabled) => isEnabled,
);

export const $autoStopEnabled = withPersist(createStore<boolean>(true));
export const autoStopEnabledChanged = createEvent<boolean>();

export const $netflixOnFlightEnabled = withPersist(createStore<boolean>(false));
export const netflixOnFlightEnabledChanged = createEvent<boolean>();
export const netflixOnFlightEnabledChangedFx = createEffect<boolean, void>(() =>
  location.reload(),
);

export const $moveBySubsEnabled = withPersist(createStore<boolean>(true));
export const moveBySubsEnabledChanged = createEvent<boolean>();
export const moveBySubsEnabledChangeFx = createEffect<boolean, boolean>(
  (isEnabled) => {
    if (isEnabled) {
      addKeyboardEventsListeners();
    } else {
      removeKeyboardEventsListeners();
    }
    return isEnabled;
  },
);

export const $translateLanguage = withPersist(
  createStore<string>(window.navigator.language.split("-")[0]),
);
export const translateLanguageChanged = createEvent<string>();
export const translateLanguageChangeFx = createEffect<string, string>(
  (value) => value,
);

export const $learningService = withPersist(
  createStore<TLearningService>("disabled"),
);
export const learningServiceChanged = createEvent<TLearningService>();
export const learningServiceChangeFx = createEffect<
  TLearningService,
  TLearningService
>((value) => value);

export const $translationService = withPersist(
  createStore<TTranslationService>("google"),
);
export const translationServiceChanged = createEvent<TTranslationService>();
export const translationServiceChangeFx = createEffect<
  TTranslationService,
  TTranslationService
>((value) => value);

export const $deeplApiKey = withPersist(createStore<string>(""));
export const deeplApiKeyChanged = createEvent<string>();
export const deeplApiKeyChangeFx = createEffect<string, string>(
  (value) => value,
);

export const $deeplApiKeyModalOpen = createStore<boolean>(false);
export const deeplApiKeyModalOpened = createEvent();
export const deeplApiKeyModalClosed = createEvent();

export const $subsFontSize = withPersist(createStore<number>(100));
export const subsFontSizeButtonPressed = createEvent<number>();
export const subsFontSizeChangeFx = createEffect<number, number>(
  (value) => value,
);

export const $subsBackground = withPersist(createStore<boolean>(true));
export const subsBackgroundButtonPressed = createEvent<boolean>();
export const subsBackgroundToggleFx = createEffect<boolean, boolean>(
  (value) => value,
);

export const $subsBackgroundOpacity = withPersist(createStore<number>(50));
export const subsBackgroundOpacityButtonPressed = createEvent<number>();
export const subsBackgroundOpacityChangeFx = createEffect<number, number>(
  (value) => value,
);

export const $autoPause = withPersist(createStore<boolean>(false));
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
  clock: deeplApiKeyChanged,
  target: deeplApiKeyChangeFx,
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
$progressBarEnabled.on(
  progressBarEnabledChangeFx.doneData,
  (_, isEnabled) => isEnabled,
);
$autoStopEnabled.on(autoStopEnabledChanged, (_, isEnabled) => isEnabled);
$netflixOnFlightEnabled.on(
  netflixOnFlightEnabledChanged,
  (_, isEnabled) => isEnabled,
);
$moveBySubsEnabled.on(
  moveBySubsEnabledChangeFx.doneData,
  (_, isEnabled) => isEnabled,
);
$translateLanguage.on(
  translateLanguageChangeFx.doneData,
  (_, language) => language,
);
$learningService.on(learningServiceChangeFx.doneData, (_, service) => service);
$translationService.on(
  translationServiceChangeFx.doneData,
  (_, service) => service,
);
$deeplApiKey.on(deeplApiKeyChangeFx.doneData, (_, key) => key);
$deeplApiKeyModalOpen.on(deeplApiKeyModalOpened, () => true);
$deeplApiKeyModalOpen.on(deeplApiKeyModalClosed, () => false);
$subsFontSize.on(
  subsFontSizeChangeFx.doneData,
  (_, subsFontSize) => subsFontSize,
);
$subsBackground.on(subsBackgroundToggleFx.doneData, (_, value) => value);
$subsBackgroundOpacity.on(
  subsBackgroundOpacityChangeFx.doneData,
  (_, value) => value,
);
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
