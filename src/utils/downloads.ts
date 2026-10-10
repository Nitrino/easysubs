import type { TKeptFile } from "./onDeviceFiles";
import { dictionaryPair } from "./dictionary/lookup";
import { languageName } from "./languages";
import { bergamotLanguage } from "@src/bergamot/languages";

// What the settings' Downloaded sheet lists: the files kept on the device (src/utils/onDeviceFiles.ts) by what they
// are. A Wiktionary dictionary is one file per pair, a Bergamot model three per direction, a speech model of the
// spoken word experiment several per Hugging Face repository.

export type TDownloadKind = "dictionary" | "bergamot" | "speech";

export type TDownload = {
  id: string;
  kind: TDownloadKind;
  // The pair of a dictionary or a model, the name of a speech model and what it does
  from?: string;
  to?: string;
  name?: string;
  about?: string;
  size: number;
  // When it was last read, if known
  used?: number;
  urls: string[];
};

// The speech models of src/audio/models.ts by their repository
const SPEECH_MODELS: Record<string, { name: string; about: string }> = {
  "onnx-community/whisper-base_timestamped": { name: "Whisper base", about: "word times from speech" },
  "Xenova/wav2vec2-base-960h": { name: "wav2vec2", about: "words aligned to speech" },
  "onnx-community/silero-vad": { name: "Silero VAD", about: "speech detection" },
  runtime: { name: "ONNX Runtime", about: "runs the models" },
};

const fileName = (url: string) => decodeURIComponent(new URL(url).pathname.split("/").pop() ?? "");

// "en-ru.json.gz" of a dictionary, "en-zh-Hans.model.enzh.intgemm.alphas.bin" of a model: every model goes from or to
// English (src/bergamot/registry.ts, mirroredName)
function filePair(url: string): { from: string; to: string } | null {
  const pair = fileName(url).split(".")[0];
  if (pair.startsWith("en-")) return { from: "en", to: pair.slice(3) };
  if (pair.endsWith("-en")) return { from: pair.slice(0, -3), to: "en" };
  return null;
}

// A model's Hugging Face repository; transformers.js also keeps ONNX Runtime's WebAssembly with the models
function speechRepository(url: string): string {
  const { hostname, pathname } = new URL(url);
  const [, owner, name] = pathname.split("/");
  return hostname === "huggingface.co" && owner && name ? `${owner}/${name}` : RUNTIME;
}
const RUNTIME = "runtime";

const KIND_ORDER: TDownloadKind[] = ["dictionary", "bergamot", "speech"];

export function groupDownloads(files: TKeptFile[]): TDownload[] {
  const downloads = new Map<string, TDownload>();
  for (const file of files) {
    let id: string;
    let download: Omit<TDownload, "size" | "urls" | "used">;
    if (file.speech) {
      const repository = speechRepository(file.url);
      id = `speech:${repository}`;
      const known = SPEECH_MODELS[repository];
      download = { id, kind: "speech", name: known?.name ?? repository.split("/")[1], about: known?.about };
    } else {
      const pair = filePair(file.url);
      if (!pair) continue;
      const kind = file.url.endsWith(".json.gz") ? "dictionary" : "bergamot";
      id = `${kind}:${pair.from}-${pair.to}`;
      download = { id, kind, ...pair };
    }
    const entry = downloads.get(id) ?? { ...download, size: 0, urls: [] };
    entry.size += file.size;
    entry.urls.push(file.url);
    if (file.used && file.used > (entry.used ?? 0)) entry.used = file.used;
    downloads.set(id, entry);
  }
  return [...downloads.values()].sort(
    (a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind) || (b.used ?? 0) - (a.used ?? 0),
  );
}

// Whether the current settings use a download: the dictionary of the subtitles' pair, or a Bergamot model of it
// (through English between two other languages)
export type TDownloadUse = { from: string; to: string; dictionary: boolean; bergamot: boolean };

export function downloadInUse(download: TDownload, use: TDownloadUse): boolean {
  if (use.from === "auto") return false;
  if (download.kind === "dictionary")
    return use.dictionary && dictionaryPair(use.from, use.to) === `${download.from}-${download.to}`;
  if (download.kind === "bergamot" && use.bergamot) {
    const [from, to] = [bergamotLanguage(use.from), bergamotLanguage(use.to)];
    const pairs = from === "en" || to === "en" ? [`${from}-${to}`] : [`${from}-en`, `en-${to}`];
    return pairs.includes(`${download.from}-${download.to}`);
  }
  return false;
}

export const megabytes = (bytes: number) => `${(bytes / 1e6).toFixed(bytes < 1e7 ? 1 : 0)} MB`;

// "English → Russian" of a dictionary or a model, the name of a speech model
export const downloadTitle = (download: TDownload) =>
  download.name ?? `${languageName(download.from ?? "")} → ${languageName(download.to ?? "")}`;

const DAY_MS = 24 * 60 * 60 * 1000;

// When a download was last read: "used today", "used yesterday", "used 12 days ago"
export function usedAgo(used: number, now = Date.now()): string {
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);
  if (used >= startOfToday) return "used today";
  const days = Math.ceil((startOfToday - used) / DAY_MS);
  return days === 1 ? "used yesterday" : `used ${days} days ago`;
}
