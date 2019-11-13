import { createStore } from "effector";
import { withPersist } from "./effector-persist";

export const enableState = withPersist(createStore(true));
