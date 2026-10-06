import { createEvent, StoreWritable } from "effector";

type PersistConfig = {
  key?: string;
  expire?: number;
  // Where the state was saved before; it's restored from there once and moved to the current key
  legacyKey?: string;
};

const defaultConfig = {
  key: "persist",
};

export const withPersist = <State>(store: StoreWritable<State>, config: PersistConfig = defaultConfig) => {
  const name = store.shortName;
  const { key = defaultConfig.key, expire, legacyKey } = config;
  const persistKey = `${key}:${name}`;
  const rehydrate = createEvent("@PERSIST/REHYDRATE");

  if (expire && isExpired(expire)) {
    localStorage.removeItem(persistKey);
  }

  // Read before the watcher below saves the initial state
  chrome.storage.local.get(legacyKey ? [persistKey, legacyKey] : [persistKey], (result) => {
    const persisted = result[persistKey] ?? (legacyKey ? result[legacyKey] : undefined);
    if (typeof persisted === "string" && persisted) {
      store.on(rehydrate, () => JSON.parse(persisted));
      rehydrate();
    }
    if (legacyKey && legacyKey in result) {
      chrome.storage.local.remove(legacyKey);
    }
  });

  store.watch((state: State) => {
    chrome.storage.local.set({ [persistKey]: JSON.stringify(state) });
  });

  return store;
};

const isExpired = (expire: number) => expire < Date.now();
