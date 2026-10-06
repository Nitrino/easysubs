// Translations of the second subtitle line, kept in chrome.storage per video, track, language and translator, so a
// video watched again is translated without requests. Only the most recently translated videos are kept.

const PREFIX = "secondarySubsCache:";
const INDEX_KEY = `${PREFIX}index`;
export const MAX_CACHED_VIDEOS = 30;

export type TTranslations = Record<string, string>;

export async function readTranslationCache(key: string): Promise<TTranslations> {
  const items = await chrome.storage.local.get(PREFIX + key);
  const cached = items[PREFIX + key];
  return cached && typeof cached === "object" ? (cached as TTranslations) : {};
}

export async function writeTranslationCache(key: string, translations: TTranslations): Promise<void> {
  const items = await chrome.storage.local.get(INDEX_KEY);
  const index = Array.isArray(items[INDEX_KEY]) ? (items[INDEX_KEY] as string[]) : [];
  const keys = [key, ...index.filter((cachedKey) => cachedKey !== key)];

  await chrome.storage.local.set({ [PREFIX + key]: translations, [INDEX_KEY]: keys.slice(0, MAX_CACHED_VIDEOS) });
  const evicted = keys.slice(MAX_CACHED_VIDEOS);
  if (evicted.length > 0) await chrome.storage.local.remove(evicted.map((evictedKey) => PREFIX + evictedKey));
}

// The page of the video without the parts that change while it plays (Netflix's trackId, YouTube's t)
export function videoPageKey(location: Location): string {
  const video = new URLSearchParams(location.search).get("v");
  return `${location.hostname}${location.pathname}${video ? `?v=${video}` : ""}`;
}
