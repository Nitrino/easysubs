import type { TFoundResult } from "@src/models/types";
import { isSameLanguage, translationLanguageCode } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { request, requestJson, type SubsSource } from "./types";

// Stremio's OpenSubtitles addon: a mirror of part of the old opensubtitles.org catalogue, with no key and no daily
// limit. It's undocumented and Stremio's terms don't cover this use, so it's only the fallback for when OpenSubtitles
// can't serve a download (the day's downloads are used, the API is down), behind a switch under Sources.

const BASE_URL = "https://opensubtitles-v3.strem.io/subtitles";

// ISO 639-2 codes the addon uses that LANGUAGES doesn't spell that way
const MIRROR_LANGUAGES: Record<string, string> = {
  pob: "pt-BR",
  alb: "sq",
  arm: "hy",
  aze: "az",
  baq: "eu",
  bel: "be",
  ben: "bn",
  bos: "bs",
  bur: "my",
  cat: "ca",
  chi: "zh-CN",
  zht: "zh-TW",
  ze: "zh-CN",
  cym: "cy",
  wel: "cy",
  epo: "eo",
  fas: "fa",
  per: "fa",
  fil: "tl",
  tgl: "tl",
  gle: "ga",
  glg: "gl",
  ice: "is",
  isl: "is",
  khm: "km",
  kur: "ku",
  lao: "lo",
  lat: "la",
  mac: "mk",
  mkd: "mk",
  mal: "ml",
  may: "ms",
  msa: "ms",
  mon: "mn",
  nep: "ne",
  scc: "sr",
  sin: "si",
  swa: "sw",
  tam: "ta",
  tel: "te",
  urd: "ur",
  uzb: "uz",
};

export const mirrorLanguage = (code: string) => MIRROR_LANGUAGES[code] ?? code;

type TMirrorSubtitle = {
  id: string;
  url: string;
  lang: string;
  subtitleFileName?: string;
  movieReleaseName?: string;
  fpsMilli?: number;
};

export const stremio: SubsSource = {
  name: "stremio",
  isAvailable: () => true,

  // IMDb ids only; every language comes in one answer
  async search(query) {
    if (!query.imdbId) return [];
    const path =
      query.type === "episode" && query.season && query.episode
        ? `series/${query.imdbId}:${query.season}:${query.episode}.json`
        : `movie/${query.imdbId}.json`;
    const answer = await requestJson<{ subtitles?: TMirrorSubtitle[] }>(
      `${BASE_URL}/${path}`,
      {},
      "The Stremio mirror",
    );
    return (answer.subtitles ?? [])
      .filter((subtitle) => isSameLanguage(mirrorLanguage(subtitle.lang), query.language))
      .map((subtitle): TFoundResult => ({
        source: "stremio",
        id: subtitle.id,
        language: translationLanguageCode(mirrorLanguage(subtitle.lang)),
        release: (subtitle.movieReleaseName || subtitle.subtitleFileName || "").replace(/\.(srt|sub|ass)$/i, ""),
        fps: subtitle.fpsMilli ? subtitle.fpsMilli / 1000 : undefined,
        url: subtitle.url,
      }));
  },

  // The link already converts the file to UTF-8; nothing is counted
  async download(result) {
    const response = await request(result.url ?? "", {}, "The Stremio mirror");
    return { text: toSubtitleText(new Uint8Array(await response.arrayBuffer()), { language: result.language }) };
  },
};
