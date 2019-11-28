import { createStore } from "effector";
import { withPersist } from "./effector-persist";
import { parse } from 'subtitle'

export const enableState = withPersist(createStore(true));
export const userLanguageStore = withPersist(createStore(window.navigator.language.split("-")[0]));
export const subsStore = createStore(parse(""))
