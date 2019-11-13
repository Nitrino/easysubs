import { createEvent } from "effector";

type PersistConfig = {
  key?: string;
}

const defaultConfig = {
  key: 'persist'
};

export const withPersist = <State>(store: any, config: PersistConfig = defaultConfig) => {
  const name = store.shortName;
  const persistKey = `${config.key}:${name}`;
  const rehydrate = createEvent('@PERSIST/REHYDRATE');

  chrome.storage.sync.get([persistKey], function (result) {
    if (result[persistKey]) {
      store.on(rehydrate, () => JSON.parse(result[persistKey]));
      rehydrate();
    }
  });

  store.watch((state: any) => {
    chrome.storage.sync.set({ [persistKey]: JSON.stringify(state) }, function () {
      console.log('Value is set to ' + JSON.stringify(state));
    });
  });

  return store;
};
