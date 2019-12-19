import { createEvent } from "effector";

type IPersistConfig = {
  key?: string;
};

const defaultConfig = {
  key: "persist"
};

export const withPersist = <State>(store: any, config: IPersistConfig = defaultConfig) => {
  const name = store.shortName;
  const persistKey = `${config.key}:${name}`;
  const rehydrate = createEvent("@PERSIST/REHYDRATE");

  chrome.storage.sync.get([persistKey], result => {
    if (result[persistKey]) {
      store.on(rehydrate, () => JSON.parse(result[persistKey]));
      rehydrate();
    }
  });

  store.watch((state: any) => {
    chrome.storage.sync.set({ [persistKey]: JSON.stringify(state) });
  });

  return store;
};
