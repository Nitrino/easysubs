import type { TFoundResult } from "@src/models/types";
import { normalizeLanguage } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { request, requestJson, type SubsSource } from "./types";

// SubDL (https://subdl.com/api-doc): a large catalogue with the old Subscene archive. Each user adds a free key of
// their own (2000 searches a day); files come as ZIPs.

const API_URL = "https://api.subdl.com/api/v1/subtitles";
const DOWNLOAD_URL = "https://dl.subdl.com";

// SubDL's language codes: upper case, with a few of its own
export function subdlLanguage(language: string): string {
  const [base, region = ""] = language.toLowerCase().split("-");
  if (base === "pt" && region === "br") return "BR_PT";
  if (base === "zh") return region === "tw" || region === "hant" ? "ZH_BG" : "ZH";
  return normalizeLanguage(base).toUpperCase();
}

type TSubdlSubtitle = {
  release_name?: string;
  name?: string;
  url: string;
  hi?: boolean;
  season?: number | null;
  episode?: number | null;
  full_season?: boolean;
};

export const subdl: SubsSource = {
  name: "subdl",
  isAvailable: (auth) => Boolean(auth.subdlApiKey),

  async search(query, auth) {
    const params = new URLSearchParams({
      api_key: auth.subdlApiKey ?? "",
      languages: subdlLanguage(query.language),
      subs_per_page: "30",
      type: query.type === "episode" ? "tv" : "movie",
    });
    if (query.imdbId) params.set("imdb_id", query.imdbId);
    else params.set("film_name", query.title);
    if (query.type === "episode") {
      if (query.season) params.set("season_number", String(query.season));
      if (query.episode) params.set("episode_number", String(query.episode));
    }
    const answer = await requestJson<{ status?: boolean; subtitles?: TSubdlSubtitle[]; error?: string }>(
      `${API_URL}?${params}`,
      {},
      "SubDL",
    );
    return (answer.subtitles ?? [])
      .filter((subtitle) => !query.episode || !subtitle.episode || subtitle.episode === query.episode)
      .map((subtitle): TFoundResult => ({
        source: "subdl",
        id: subtitle.url,
        language: query.language,
        release: subtitle.release_name || subtitle.name || "",
        hearingImpaired: subtitle.hi,
        url: `${DOWNLOAD_URL}${subtitle.url}`,
        episode: query.type === "episode" ? query.episode : undefined,
      }));
  },

  async download(result) {
    const response = await request(result.url ?? "", {}, "SubDL");
    return {
      text: toSubtitleText(new Uint8Array(await response.arrayBuffer()), {
        language: result.language,
        episode: result.episode,
      }),
    };
  },
};
