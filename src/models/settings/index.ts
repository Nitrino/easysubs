import { createStore, createEvent } from "effector";
import { withPersist } from "@src/utils/withPersist";

export const $enabled = withPersist(
  createStore<boolean>(true, { name: "es-enabled" })
);

export const $translateLanguage = withPersist(
  createStore<string>(window.navigator.language.split("-")[0], {
    name: "es-translate-language",
  })
);

export const $autoPause = withPersist(
  createStore<boolean>(false, { name: "es-auto-pause" })
);

export const esRenderSetings = createEvent();
