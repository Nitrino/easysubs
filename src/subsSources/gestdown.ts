import type { TFoundResult } from "@src/models/types";
import { normalizeLanguage } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { SourceError, request, requestJson, type SubsSource } from "./types";

// Addic7ed through Gestdown (https://api.gestdown.info), an open proxy with no key: TV episodes only, strongest in
// English. It answers 423 while it refreshes a show from Addic7ed.

const BASE_URL = "https://api.gestdown.info";

type TShow = { id: string; name: string };
type TGestdownSubtitle = {
  subtitleId: string;
  version?: string;
  completed?: boolean;
  hearingImpaired?: boolean;
  downloadUri: string;
  downloadCount?: number;
};

const pad = (value: number) => String(value).padStart(2, "0");
const bareName = (name: string) => name.replace(/\s*\(\d{4}\)$/, "").toLowerCase();

// The show the title names: the one of that year when Addic7ed has several ("Doctor Who (2005)"), an exact name
// before a partial one
export function pickShow(shows: TShow[], title: string, year?: number): TShow | undefined {
  const named = shows.filter((show) => bareName(show.name) === title.trim().toLowerCase());
  return (
    (year && named.find((show) => show.name.includes(`(${year})`))) ||
    named.find((show) => !/\(\d{4}\)$/.test(show.name)) ||
    named[0]
  );
}

async function gestdownJson<T>(path: string): Promise<T> {
  try {
    return await requestJson<T>(`${BASE_URL}${path}`, {}, "Addic7ed");
  } catch (error) {
    if (error instanceof SourceError && error.status === 423) {
      throw new SourceError("Addic7ed is refreshing this show. Try again in a minute.", 423, "unavailable");
    }
    throw error;
  }
}

export const gestdown: SubsSource = {
  name: "gestdown",
  isAvailable: () => true,

  async search(query) {
    if (query.type !== "episode" || !query.title || !query.season || !query.episode) return [];
    const { shows } = await gestdownJson<{ shows?: TShow[] }>(`/shows/search/${encodeURIComponent(query.title)}`).catch(
      (error) => {
        if (error instanceof SourceError && error.status === 404) return { shows: [] };
        throw error;
      },
    );
    const show = pickShow(shows ?? [], query.title, query.year);
    if (!show) return [];

    const language = normalizeLanguage(query.language).split("-")[0];
    const answer = await gestdownJson<{ matchingSubtitles?: TGestdownSubtitle[] }>(
      `/subtitles/get/${show.id}/${query.season}/${query.episode}/${language}`,
    ).catch((error) => {
      if (error instanceof SourceError && error.status === 404) return { matchingSubtitles: [] };
      throw error;
    });

    const episode = `${bareName(show.name)} S${pad(query.season)}E${pad(query.episode)}`;
    return (answer.matchingSubtitles ?? [])
      .filter((subtitle) => subtitle.completed !== false)
      .map((subtitle): TFoundResult => ({
        source: "gestdown",
        id: subtitle.subtitleId,
        language: query.language,
        release: `${episode} ${subtitle.version ?? ""}`.trim(),
        downloads: subtitle.downloadCount,
        hearingImpaired: subtitle.hearingImpaired,
        url: `${BASE_URL}${subtitle.downloadUri}`,
      }));
  },

  async download(result) {
    const response = await request(result.url ?? "", {}, "Addic7ed");
    return { text: toSubtitleText(new Uint8Array(await response.arrayBuffer()), { language: result.language }) };
  },
};
