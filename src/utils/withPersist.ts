import { createEvent, type StoreWritable } from "effector";

type PersistConfig = {
  key?: string;
  expire?: number;
};

const defaultConfig = {
  key: "persist",
};

export const withPersist = <State>(
  store: StoreWritable<State>,
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
    const str: unknown = result[persistKey]
    if (str) {
      if (typeof str !== 'string') throw new Error('expected string')
      store.on(rehydrate, () => JSON.parse(str));
      rehydrate();
    }
  });

  store.watch((state: any) => {
    chrome.storage.local.set({ [persistKey]: JSON.stringify(state) });
  });

  return store;
};

const isExpired = (expire: number) => expire < Date.now();
