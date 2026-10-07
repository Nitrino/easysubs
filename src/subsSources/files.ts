import { unzipSync } from "fflate";

import { normalizeLanguage } from "@src/utils/languages";

// What a downloaded subtitle file becomes before it reaches the content script: text in SRT or WebVTT, which the
// `subtitle` parser reads. Sources send ZIPs (SubDL, SubSource, Jimaku), ASS (anime) and old 8-bit encodings.

const SUBTITLE_FILE = /\.(srt|vtt|ass|ssa)$/i;
const isAss = (name: string, text: string) => /\.(ass|ssa)$/i.test(name) || /^\s*\[Script Info\]/i.test(text);

// The code page old files of a language were usually saved in, when they aren't UTF-8
const LEGACY_ENCODINGS: Record<string, string> = {
  ru: "windows-1251",
  uk: "windows-1251",
  be: "windows-1251",
  bg: "windows-1251",
  mk: "windows-1251",
  sr: "windows-1251",
  pl: "windows-1250",
  cs: "windows-1250",
  sk: "windows-1250",
  hu: "windows-1250",
  ro: "windows-1250",
  hr: "windows-1250",
  sl: "windows-1250",
  bs: "windows-1250",
  el: "windows-1253",
  tr: "windows-1254",
  he: "windows-1255",
  ar: "windows-1256",
  fa: "windows-1256",
  et: "windows-1257",
  lv: "windows-1257",
  lt: "windows-1257",
  vi: "windows-1258",
  th: "windows-874",
  ja: "shift_jis",
  ko: "euc-kr",
  "zh-hans": "gbk",
  "zh-hant": "big5",
};

const startsWith = (bytes: Uint8Array, prefix: number[]) => prefix.every((byte, index) => bytes[index] === byte);

// UTF-8 when the bytes are valid UTF-8 or carry a byte order mark, the language's old code page otherwise
export function decodeSubtitle(bytes: Uint8Array, language: string): string {
  if (startsWith(bytes, [0xef, 0xbb, 0xbf])) return new TextDecoder("utf-8").decode(bytes.subarray(3));
  if (startsWith(bytes, [0xff, 0xfe])) return new TextDecoder("utf-16le").decode(bytes.subarray(2));
  if (startsWith(bytes, [0xfe, 0xff])) return new TextDecoder("utf-16be").decode(bytes.subarray(2));
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    const encoding = LEGACY_ENCODINGS[normalizeLanguage(language)] ?? "windows-1252";
    return new TextDecoder(encoding).decode(bytes);
  }
}

export const isZip = (bytes: Uint8Array) => startsWith(bytes, [0x50, 0x4b, 0x03, 0x04]);

// "S01E02", "1x02", "E02", "- 02 ": an episode number in a file name
const matchesEpisode = (name: string, episode: number) =>
  new RegExp(`(e|x|ep|episode|\\s-\\s|_)0*${episode}(?!\\d)`, "i").test(name);

// The subtitle file of a ZIP: the episode's when the archive holds a season, SRT before ASS
export function pickFromZip(bytes: Uint8Array, episode?: number): { name: string; data: Uint8Array } | null {
  const files = unzipSync(bytes, {
    filter: (file) => SUBTITLE_FILE.test(file.name) && !file.name.startsWith("__MACOSX/"),
  });
  const entries = Object.entries(files).sort(
    ([a], [b]) => Number(/\.(ass|ssa)$/i.test(a)) - Number(/\.(ass|ssa)$/i.test(b)),
  );
  if (entries.length === 0) return null;
  const [name, data] = (episode !== undefined && entries.find(([file]) => matchesEpisode(file, episode))) || entries[0];
  return { name, data };
}

// "0:01:02.35" → ms
const assTime = (value: string) => {
  const [hours, minutes, seconds] = value.trim().split(":");
  return Math.round((Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)) * 1000);
};

const srtTime = (ms: number) => {
  const pad = (value: number, length = 2) => String(value).padStart(length, "0");
  return `${pad(Math.floor(ms / 3_600_000))}:${pad(Math.floor(ms / 60_000) % 60)}:${pad(Math.floor(ms / 1000) % 60)},${pad(ms % 1000, 3)}`;
};

// The dialogue of an ASS/SSA file as SRT: styling and positioning go, line breaks stay. Lines drawn with \p
// (vector shapes) are dropped.
export function assToSrt(text: string): string {
  let format: string[] = [];
  let inEvents = false;
  const cues: { start: number; end: number; text: string }[] = [];

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[")) {
      inEvents = /^\[events\]$/i.test(trimmed);
      continue;
    }
    if (!inEvents) continue;
    if (/^format:/i.test(trimmed)) {
      format = trimmed
        .slice(trimmed.indexOf(":") + 1)
        .split(",")
        .map((field) => field.trim().toLowerCase());
      continue;
    }
    if (!/^dialogue:/i.test(trimmed) || format.length === 0) continue;

    const fields = trimmed.slice(trimmed.indexOf(":") + 1).split(",");
    // The text is the last field and may contain commas
    const values = [...fields.slice(0, format.length - 1), fields.slice(format.length - 1).join(",")];
    const field = (name: string) => values[format.indexOf(name)] ?? "";
    const raw = field("text");
    if (/\{[^}]*\\p[1-9]/.test(raw)) continue;
    const cueText = raw
      .replace(/\{[^}]*\}/g, "")
      .replace(/\\N/gi, "\n")
      .replace(/\\h/g, " ")
      .split("\n")
      .map((part) => part.trim())
      .filter(Boolean)
      .join("\n");
    if (cueText) cues.push({ start: assTime(field("start")), end: assTime(field("end")), text: cueText });
  }

  return cues
    .sort((a, b) => a.start - b.start)
    .map((cue, index) => `${index + 1}\n${srtTime(cue.start)} --> ${srtTime(cue.end)}\n${cue.text}\n`)
    .join("\n");
}

// A downloaded file as SRT or WebVTT text: unzipped, decoded, ASS converted
export function toSubtitleText(
  bytes: Uint8Array,
  { name = "", language, episode }: { name?: string; language: string; episode?: number },
): string {
  if (isZip(bytes)) {
    const file = pickFromZip(bytes, episode);
    if (!file) throw new Error("The archive has no subtitle file");
    return toSubtitleText(file.data, { name: file.name, language });
  }
  const text = decodeSubtitle(bytes, language);
  return isAss(name, text) ? assToSrt(text) : text;
}
