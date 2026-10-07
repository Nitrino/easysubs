import type { TFoundResult } from "@src/models/types";
import { isSameLanguage } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { request, requestJson, type SubsSource, type TSourceAuth } from "./types";

// Jimaku (https://jimaku.cc/api/docs): Japanese subtitles for anime, often ASS or in archives. Each user adds a key
// of their own.

const API_URL = "https://jimaku.cc/api";

type TEntry = { id: number; name: string; english_name?: string | null; flags?: { movie?: boolean } };
type TFile = { url: string; name: string };

const authHeaders = (auth: TSourceAuth) => ({ Authorization: auth.jimakuApiKey ?? "" });

export const jimaku: SubsSource = {
  name: "jimaku",
  isAvailable: (auth) => Boolean(auth.jimakuApiKey),

  async search(query, auth) {
    if (!isSameLanguage(query.language, "ja") || !query.title) return [];
    const search = (anime: boolean) =>
      requestJson<TEntry[]>(
        `${API_URL}/entries/search?${new URLSearchParams({ anime: String(anime), query: query.title })}`,
        { headers: authHeaders(auth) },
        "Jimaku",
      );
    const anime = await search(true);
    const entries = anime.length > 0 ? anime : await search(false);
    const title = query.title.toLowerCase();
    const entry =
      entries.find((candidate) =>
        [candidate.name, candidate.english_name].some((name) => name?.toLowerCase() === title),
      ) ?? entries[0];
    if (!entry) return [];

    const episode = query.type === "episode" && query.episode && !entry.flags?.movie ? `?episode=${query.episode}` : "";
    const files = await requestJson<TFile[]>(
      `${API_URL}/entries/${entry.id}/files${episode}`,
      { headers: authHeaders(auth) },
      "Jimaku",
    );
    return files.map((file): TFoundResult => ({
      source: "jimaku",
      id: file.url,
      language: "ja",
      release: file.name,
      url: file.url,
      episode: query.type === "episode" ? query.episode : undefined,
    }));
  },

  async download(result, auth) {
    const response = await request(result.url ?? "", { headers: authHeaders(auth) }, "Jimaku");
    return {
      text: toSubtitleText(new Uint8Array(await response.arrayBuffer()), {
        name: result.release,
        language: "ja",
        episode: result.episode,
      }),
    };
  },
};
