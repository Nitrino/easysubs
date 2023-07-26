import { createStore, createEvent, sample, createEffect } from "effector";
import { withPersist } from "@src/utils/withPersist";
import { debug } from "patronum";
import { TLearningService } from "../types";

export const $enabled = withPersist(createStore<boolean>(true, { name: "es-enabled" }));
export const enableToggleChanged = createEvent<boolean>();
export const enableToggleChangeFx = createEffect<boolean, boolean>((isEnabled) => isEnabled);

export const $translateLanguage = withPersist(createStore<string>(window.navigator.language.split("-")[0]));
export const translateLanguageChanged = createEvent<string>();
export const translateLanguageChangeFx = createEffect<string, string>((value) => value);

export const $learningService = withPersist(createStore<TLearningService>("disabled"));
export const learningServiceChanged = createEvent<TLearningService>();
export const learningServiceChangeFx = createEffect<TLearningService, TLearningService>((value) => value);

export const $subsDelay = createStore<number>(0);
export const subsDelayButtonPressed = createEvent<number>();
export const subsDelayChangeFx = createEffect<number, number>((value) => value);

export const $subsSize = withPersist(createStore<number>(100));
export const subsSizeButtonPressed = createEvent<number>();
export const subsSizeChangeFx = createEffect<number, number>((value) => value);

export const $subsBackground = withPersist(createStore<boolean>(true));
export const subsBackgroundButtonPressed = createEvent<boolean>();
export const subsBackgroundToggleFx = createEffect<boolean, boolean>((value) => value);

export const $subsBackgroundOpacity = withPersist(createStore<number>(50));
export const subsBackgroundOpacityButtonPressed = createEvent<number>();
export const subsBackgroundOpacityChangeFx = createEffect<number, number>((value) => value);

export const $autoPause = withPersist(createStore<boolean>(false, { name: "es-auto-pause" }));

export const esRenderSetings = createEvent();

sample({
  clock: enableToggleChanged,
  target: enableToggleChangeFx,
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
  clock: subsDelayButtonPressed,
  target: subsDelayChangeFx,
});

sample({
  clock: subsSizeButtonPressed,
  target: subsSizeChangeFx,
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
$translateLanguage.on(translateLanguageChangeFx.doneData, (_, language) => language);
$learningService.on(learningServiceChangeFx.doneData, (_, service) => service);
$subsDelay.on(subsDelayChangeFx.doneData, (_, newSubsDelay) => newSubsDelay);
$subsSize.on(subsSizeChangeFx.doneData, (_, subsSize) => subsSize);
$subsBackground.on(subsBackgroundToggleFx.doneData, (_, value) => value);
$subsBackgroundOpacity.on(subsBackgroundOpacityChangeFx.doneData, (_, value) => value);

$enabled.watch((isEnables) => {
  document.body.classList.toggle("es-enabled", isEnables);
});

debug($enabled, $translateLanguage, $learningService, $subsDelay, $subsSize, $subsBackground);
