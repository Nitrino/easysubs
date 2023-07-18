import { createEvent, Store } from "effector";

type PersistConfig = {
  key?: string;
  expire?: number;
};

const defaultConfig = {
  key: "persist",
};

export const withPersist = <State>(
  store: Store<State>,
  config: PersistConfig = defaultConfig
) => {
  const name = store.shortName;
  const { key, expire } = config;
  const persistKey = `${key}:${name}`;
  const rehydrate = createEvent("@PERSIST/REHYDRATE");

  if (expire && isExpired(expire)) {
    localStorage.removeItem(persistKey);
  }

  chrome.storage.local.get([persistKey], (result) => {
    if (result[persistKey]) {
      store.on(rehydrate, () => JSON.parse(result[persistKey]));
      rehydrate();
    }
  });

  store.watch((state: any) => {
    chrome.storage.local.set({ [persistKey]: JSON.stringify(state) });
  });

  return store;
};

const isExpired = (expire: number) => expire < Date.now();
