import { createStore } from "effector";
import { parse } from "subtitle";
import { withPersist } from "./effector-persist";

export const enableState = withPersist(createStore(true));
export const showProgressBarState = withPersist(createStore(true));
export const userLanguageStore = withPersist(createStore(window.navigator.language.split("-")[0]));
export const learningServiceStore = withPersist(createStore(null));
export const subsStore = createStore(parse(""));
export const showFullSubTranslatePopupStore = createStore(false);
export const autoPauseStore = createStore(false);
