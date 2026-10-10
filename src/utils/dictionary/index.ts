import { gunzipText, isCached, onDeviceFile, type TOnDeviceStatus } from "../onDeviceFiles";
import { DICTIONARIES_URL, dictionaryFile, type TDictionary } from "./format";
import { dictionaryPair, lookUpWord, type TDictionaryAnswer } from "./lookup";

// The background's Wiktionary dictionaries: a pair's file downloads from the GitHub release when it's first needed,
// stays on the device (src/utils/onDeviceFiles.ts) and is parsed once while the background lives.

declare global {
  var easysubsDictionariesUrl: string | undefined;
}

// The playground serves the files it builds itself
const baseUrl = () => globalThis.easysubsDictionariesUrl ?? DICTIONARIES_URL;
const fileUrl = (pair: string) => {
  const [from, to] = pair.split("-");
  return new URL(dictionaryFile(from, to), baseUrl()).href;
};

export function createDictionaries() {
  const loaded = new Map<string, Promise<TDictionary>>();
  // Pairs whose dictionary is parsed and in memory
  const ready = new Set<string>();
  const downloads = new Map<string, { loaded: number; total: number }>();
  const errors = new Map<string, string>();

  function load(pair: string): Promise<TDictionary> {
    if (!loaded.has(pair)) {
      errors.delete(pair);
      const dictionary = onDeviceFile(fileUrl(pair), (bytes, total) => downloads.set(pair, { loaded: bytes, total }))
        .then(gunzipText)
        .then((text) => {
          const parsed = JSON.parse(text) as TDictionary;
          ready.add(pair);
          return parsed;
        })
        .finally(() => downloads.delete(pair));
      // A failed download is tried again on the next word
      dictionary.catch((error: Error) => {
        loaded.delete(pair);
        errors.set(pair, error.message);
      });
      loaded.set(pair, dictionary);
    }
    return loaded.get(pair)!;
  }

  return {
    // The word's meanings, null when there's no dictionary for the pair or the word isn't in it
    async lookUp(from: string, to: string, text: string): Promise<TDictionaryAnswer | null> {
      const pair = dictionaryPair(from, to);
      if (!pair) return null;
      return lookUpWord(await load(pair), text);
    },
    // Downloads the pair's dictionary ahead of the first word
    prepare(from: string, to: string) {
      const pair = dictionaryPair(from, to);
      if (pair) load(pair).catch(() => {});
    },
    // Drops a pair whose file was deleted from the device: the next word downloads it again
    forget(pair: string) {
      loaded.delete(pair);
      ready.delete(pair);
      errors.delete(pair);
    },
    async status(from: string, to: string): Promise<TOnDeviceStatus> {
      const pair = dictionaryPair(from, to);
      if (!pair) return { state: "unavailable" };
      const download = downloads.get(pair);
      if (download) return { state: "downloading", ...download };
      if (errors.has(pair)) return { state: "error", error: errors.get(pair)! };
      if (ready.has(pair) || (await isCached(fileUrl(pair)))) return { state: "ready" };
      // Asked for, before its first bytes arrive
      return loaded.has(pair) ? { state: "downloading", loaded: 0, total: 0 } : { state: "missing" };
    },
  };
}
