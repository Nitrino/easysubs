import {createEvent} from "effector";

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
  const rehydrateFromListener = createEvent("@PERSIST/REHYDRATE_FROM_LISTENER");
  const uniqId = generateUniqId();

  chrome.storage.local.get([persistKey], result => {
    if (result[persistKey]) {
      store.on(rehydrate, () => JSON.parse(result[persistKey].value));
      rehydrate();
    }
  });

  store.watch((state: any) => {
    if (state === store.defaultState) {
      return;
    }
    chrome.storage.local.set({
      [persistKey]: {
        writer: uniqId,
        value: JSON.stringify(state)
      }
    });
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local'
      && changes[persistKey]
      && uniqId !== changes[persistKey].newValue.writer
    ) {
      const newState = JSON.parse(changes[persistKey].newValue.value);
      if (newState !== store.getState()) {
        console.log('ckesc SYNC!', newState, changes)
        store.on(rehydrateFromListener, () => newState);
        rehydrateFromListener();
      }
    }
  });

  return store;
};

const generateUniqId = (): string => "withPersist." + performance.now();

