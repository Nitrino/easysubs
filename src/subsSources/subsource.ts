import type { TFoundResult } from "@src/models/types";
import { languageName, normalizeLanguage } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { request, requestJson, type SubsSource, type TSourceAuth } from "./types";

// SubSource (https://subsource.net/api-docs), the site that replaced Subscene. Each user adds a personal key from
// their profile (60 requests a minute); a title is looked up first, then its subtitles, which come as ZIPs.

const API_URL = "https://api.subsource.net/api/v1";

// SubSource names languages in English, lower case, with a few names of its own
export function subsourceLanguage(language: string): string {
  const [base, region = ""] = language.toLowerCase().split("-");
  if (base === "pt") return region === "br" ? "brazilian_portuguese" : "portuguese";
  if (base === "fa") return "farsi_persian";
  if (base === "zh") return region === "tw" || region === "hant" ? "big_5_code" : "chinese_bg_code";
  return languageName(normalizeLanguage(base))
    .replace(/\s*\(.*\)$/, "")
    .toLowerCase()
    .replace(/\s+/g, "_");
}

type TTitle = { movieId: number; title?: string; releaseYear?: number | string };
type TSubsourceSubtitle = {
  subtitleId: number | string;
  releaseInfo?: string | string[];
  hearingImpaired?: boolean;
  downloads?: number;
};

const withKey = (auth: TSourceAuth, params: Record<string, string>) =>
  new URLSearchParams({ api_key: auth.subsourceApiKey ?? "", ...params });
const keyHeaders = (auth: TSourceAuth) => ({ "X-API-Key": auth.subsourceApiKey ?? "" });

// "S01E02" in a release name: whether it's the episode, or names no episode (a season pack)
const fitsEpisode = (release: string, season?: number, episode?: number) => {
  const match = release.match(/S(\d{1,2})E(\d{1,3})/i);
  if (!match || !season || !episode) return true;
  return Number(match[1]) === season && Number(match[2]) === episode;
};

export const subsource: SubsSource = {
  name: "subsource",
  isAvailable: (auth) => Boolean(auth.subsourceApiKey),

  async search(query, auth) {
    const lookup = query.imdbId
      ? { searchType: "imdb", imdb: query.imdbId }
      : { searchType: "text", q: query.title.toLowerCase() };
    const season = query.type === "episode" && query.season ? { season: String(query.season) } : {};
    const titles = await requestJson<{ data?: TTitle[] }>(
      `${API_URL}/movies/search?${withKey(auth, { ...lookup, ...season })}`,
      { headers: keyHeaders(auth) },
      "SubSource",
    );
    const candidates = titles.data ?? [];
    const title =
      candidates.find((candidate) => !query.year || Number(candidate.releaseYear) === query.year) ?? candidates[0];
    if (!title) return [];

    const subtitles = await requestJson<{ data?: TSubsourceSubtitle[] }>(
      `${API_URL}/subtitles?${withKey(auth, { language: subsourceLanguage(query.language), limit: "100", movieId: String(title.movieId) })}`,
      { headers: keyHeaders(auth) },
      "SubSource",
    );
    return (subtitles.data ?? [])
      .map((subtitle): TFoundResult => {
        const releases = Array.isArray(subtitle.releaseInfo) ? subtitle.releaseInfo : [subtitle.releaseInfo ?? ""];
        return {
          source: "subsource",
          id: String(subtitle.subtitleId),
          language: query.language,
          release: releases.filter(Boolean).join(" / "),
          downloads: subtitle.downloads,
          hearingImpaired: subtitle.hearingImpaired,
          episode: query.type === "episode" ? query.episode : undefined,
        };
      })
      .filter((result) => fitsEpisode(result.release, query.season, query.episode));
  },

  async download(result, auth) {
    const response = await request(
      `${API_URL}/subtitles/${result.id}/download?${withKey(auth, {})}`,
      { headers: keyHeaders(auth) },
      "SubSource",
    );
    return {
      text: toSubtitleText(new Uint8Array(await response.arrayBuffer()), {
        language: result.language,
        episode: result.episode,
      }),
    };
  },
};
