import { createStore, createEvent, sample, createEffect } from "effector";
import { withPersist } from "@src/utils/withPersist";
import { debug } from "patronum";

export const $enabled = withPersist(createStore<boolean>(true, { name: "es-enabled" }));
export const enableToggleChanged = createEvent<boolean>();
export const enableToggleChangeFx = createEffect<boolean, boolean>((isEnabled) => isEnabled);

export const $translateLanguage = withPersist(
  createStore<string>(window.navigator.language.split("-")[0], {
    name: "es-translate-language",
  })
);

export const translateLanguageChanged = createEvent<string>();
export const translateLanguageChangeFx = createEffect<string, string>((value) => value);

export const $subsSize = withPersist(createStore<number>(100, { name: "es-subs-size" }));
export const $subsBackground = withPersist(createStore<boolean>(true, { name: "es-subs-background" }));
export const $subsBackgroundOpacity = withPersist(createStore<number>(50, { name: "es-subs-background-opacity" }));

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

$enabled.on(enableToggleChangeFx.doneData, (_, isEnabled) => isEnabled);
$translateLanguage.on(translateLanguageChangeFx.doneData, (_, language) => language);

$enabled.watch((isEnables) => {
  document.body.classList.toggle("es-enabled", isEnables);
});

debug($enabled, $translateLanguage);
