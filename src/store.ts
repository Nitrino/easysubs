import { createStore, createEvent } from "effector";
import { parse } from "subtitle";
import { withPersist } from "./effector-persist";

export const enableState = withPersist(createStore(true));
export const showProgressBarState = withPersist(createStore(true));
export const showSubsBackgroundState = withPersist(createStore(true));
export const subsFontSizeStore = withPersist(createStore(100));
export const userLanguageStore = withPersist(createStore(window.navigator.language.split("-")[0]));
export const learningServiceStore = withPersist(createStore(null));
export const subsStore = createStore(parse(""));
export const showFullSubTranslatePopupStore = createStore(false);
export const autoPauseStore = createStore(false);

export const learningServiceSkyEngEmail = withPersist(createStore("", {name: "skyeng_email"}));
export const learningServiceSkyEngToken = withPersist(createStore("", {name: "skyeng_token"}));
