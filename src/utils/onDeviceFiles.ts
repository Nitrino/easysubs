// Files the on-device translators download once and keep: the Wiktionary dictionaries (src/utils/dictionary) and
// Bergamot's models (src/bergamot). They're kept with the Cache API under the extension's origin, which the service
// worker, the offscreen document and Firefox's background page share. Where there's no Cache API (tests) they're
// downloaded every time. The settings list them with the speech models and delete them (src/utils/downloads.ts).

const CACHE_NAME = "easysubs-on-device";
// When each kept file was last read, a mark per file so two contexts reading files at once don't overwrite each other
const USED_CACHE_NAME = "easysubs-on-device-used";
// The speech models of the spoken word experiment, which transformers.js keeps itself (its env.cacheKey)
const SPEECH_CACHE_NAME = "transformers-cache";
const SIZE_HEADER = "x-easysubs-size";

// What a pair needs before it works on the device
export type TOnDeviceStatus =
  // Nothing exists for the pair
  | { state: "unavailable" }
  // It'll download `size` bytes when it's first needed
  | { state: "missing"; size?: number }
  | { state: "downloading"; loaded: number; total: number }
  | { state: "ready" }
  | { state: "error"; error: string };

export type TProgress = (loaded: number, total: number) => void;

const openCache = (name = CACHE_NAME) => (typeof caches === "undefined" ? Promise.resolve(null) : caches.open(name));

function markUsed(url: string) {
  openCache(USED_CACHE_NAME)
    .then((cache) => cache?.put(url, new Response(String(Date.now()))))
    .catch(() => {});
}

export async function isCached(url: string): Promise<boolean> {
  const cache = await openCache();
  return Boolean(await cache?.match(url));
}

// The file's bytes: kept ones, or downloaded with the progress reported and kept
export async function onDeviceFile(url: string, onProgress?: TProgress, expectedSize = 0): Promise<ArrayBuffer> {
  const cache = await openCache();
  const kept = await cache?.match(url);
  if (kept) {
    markUsed(url);
    return kept.arrayBuffer();
  }

  const response = await fetch(url);
  if (!response.ok || !response.body) throw new Error(`Download failed with status ${response.status}`);
  const total = Number(response.headers.get("content-length")) || expectedSize;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let loaded = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress?.(loaded, Math.max(total, loaded));
  }
  const bytes = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  await cache?.put(
    url,
    new Response(bytes, { headers: { "content-type": "application/octet-stream", [SIZE_HEADER]: String(loaded) } }),
  );
  markUsed(url);
  return bytes.buffer;
}

// A file kept on the device: an on-device translator's or a speech model's, with when it was last read when that's
// known (speech models don't tell)
export type TKeptFile = { url: string; size: number; used?: number; speech?: true };

const responseSize = async (response: Response) =>
  Number(response.headers.get(SIZE_HEADER) ?? response.headers.get("content-length")) || (await response.blob()).size;

async function cacheEntries(name: string): Promise<[string, Response][]> {
  // Opening a cache creates it: transformers.js' isn't there until the experiment needs a model
  if (!(await caches.has(name))) return [];
  const cache = await caches.open(name);
  const entries = await Promise.all(
    (await cache.keys()).map(async (request) => [request.url, await cache.match(request)] as const),
  );
  return entries.filter((entry): entry is [string, Response] => Boolean(entry[1]));
}

export async function keptFiles(): Promise<TKeptFile[]> {
  if (typeof caches === "undefined") return [];
  const used = new Map(
    await Promise.all(
      (await cacheEntries(USED_CACHE_NAME)).map(
        async ([url, response]) => [url, Number(await response.text())] as const,
      ),
    ),
  );
  const files = async (name: string, speech: boolean) =>
    Promise.all(
      (await cacheEntries(name)).map(async ([url, response]): Promise<TKeptFile> => ({
        url,
        size: await responseSize(response),
        ...(used.has(url) && { used: used.get(url) }),
        ...(speech && { speech: true as const }),
      })),
    );
  return [...(await files(CACHE_NAME, false)), ...(await files(SPEECH_CACHE_NAME, true))];
}

export async function deleteKeptFiles(urls: string[]): Promise<void> {
  if (typeof caches === "undefined") return;
  for (const name of [CACHE_NAME, USED_CACHE_NAME, SPEECH_CACHE_NAME]) {
    if (!(await caches.has(name))) continue;
    const cache = await caches.open(name);
    await Promise.all(urls.map((url) => cache.delete(url)));
  }
}

// The text of a gzipped file
export async function gunzipText(data: ArrayBuffer): Promise<string> {
  return new Response(new Response(data).body!.pipeThrough(new DecompressionStream("gzip"))).text();
}

// Several downloads as one: what's loaded of all of them and their total, for a pair whose files download together
export function combinedProgress(sizes: number[], onProgress?: TProgress) {
  const loaded = sizes.map(() => 0);
  const total = sizes.reduce((sum, size) => sum + size, 0);
  return (index: number): TProgress =>
    (fileLoaded) => {
      loaded[index] = fileLoaded;
      onProgress?.(
        loaded.reduce((sum, value) => sum + value, 0),
        total,
      );
    };
}
