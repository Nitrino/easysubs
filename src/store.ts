import { createStore } from "effector";
import { withPersist } from "./effector-persist";

export const enableState = withPersist(createStore(true));
export const userLanguageStore = withPersist(createStore(window.navigator.language.split("-")[0]));
