import type { TFoundResult, TFoundVideo } from "@src/models/types";

// Found files kept on the device, so loading one again (a reload, a rewatch, the choice restored on a video) costs no
// OpenSubtitles download. Only the most recently used files are kept, like the translation cache.

const PREFIX = "foundSubsFile:";
const INDEX_KEY = `${PREFIX}index`;
export const MAX_CACHED_FILES = 40;
// Videos whose choices are remembered
export const MAX_REMEMBERED_VIDEOS = 200;

// A season pack is one id for every episode; the episode taken out of it is part of the key
export const foundFileKey = (result: Pick<TFoundResult, "source" | "id" | "episode">) =>
  `${result.source}:${result.id}${result.episode ? `:e${result.episode}` : ""}`;

export async function readFoundFile(key: string): Promise<string | null> {
  const items = await chrome.storage.local.get(PREFIX + key);
  const text = items[PREFIX + key];
  return typeof text === "string" ? text : null;
}

export async function writeFoundFile(key: string, text: string): Promise<void> {
  const items = await chrome.storage.local.get(INDEX_KEY);
  const index = Array.isArray(items[INDEX_KEY]) ? (items[INDEX_KEY] as string[]) : [];
  const keys = [key, ...index.filter((cachedKey) => cachedKey !== key)];

  // Room first: a full storage would refuse the new file
  const evicted = keys.slice(MAX_CACHED_FILES);
  if (evicted.length > 0) await chrome.storage.local.remove(evicted.map((evictedKey) => PREFIX + evictedKey));
  await chrome.storage.local.set({ [PREFIX + key]: text, [INDEX_KEY]: keys.slice(0, MAX_CACHED_FILES) });
}

// A file loaded again is kept the longest
export async function touchFoundFile(key: string): Promise<void> {
  const items = await chrome.storage.local.get(INDEX_KEY);
  const index = Array.isArray(items[INDEX_KEY]) ? (items[INDEX_KEY] as string[]) : [];
  if (index[0] === key || !index.includes(key)) return;
  await chrome.storage.local.set({ [INDEX_KEY]: [key, ...index.filter((cachedKey) => cachedKey !== key)] });
}

// The videos' choices with `key` set to `video` (or removed when it holds nothing), the oldest dropped past the limit
export function rememberVideo(
  videos: Record<string, TFoundVideo>,
  key: string,
  video: TFoundVideo,
): Record<string, TFoundVideo> {
  const rest = Object.entries(videos).filter(([videoKey]) => videoKey !== key);
  const entries = video.main || video.second ? [[key, video] as const, ...rest] : rest;
  return Object.fromEntries([...entries].sort(([, a], [, b]) => b.at - a.at).slice(0, MAX_REMEMBERED_VIDEOS));
}
