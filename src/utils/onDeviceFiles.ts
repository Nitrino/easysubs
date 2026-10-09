// Files the on-device translators download once and keep: the Wiktionary dictionaries (src/utils/dictionary) and
// Bergamot's models (src/bergamot). They're kept with the Cache API under the extension's origin, which the service
// worker, the offscreen document and Firefox's background page share. Where there's no Cache API (tests) they're
// downloaded every time.

const CACHE_NAME = "easysubs-on-device";

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

const openCache = () => (typeof caches === "undefined" ? Promise.resolve(null) : caches.open(CACHE_NAME));

export async function isCached(url: string): Promise<boolean> {
  const cache = await openCache();
  return Boolean(await cache?.match(url));
}

// The file's bytes: kept ones, or downloaded with the progress reported and kept
export async function onDeviceFile(url: string, onProgress?: TProgress, expectedSize = 0): Promise<ArrayBuffer> {
  const cache = await openCache();
  const kept = await cache?.match(url);
  if (kept) return kept.arrayBuffer();

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
  await cache?.put(url, new Response(bytes, { headers: { "content-type": "application/octet-stream" } }));
  return bytes.buffer;
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
