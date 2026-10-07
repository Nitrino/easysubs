import { requestJson } from "./types";

// Cinemeta, Stremio's public metadata API: a title and its year to an IMDb id, with no key. Subtitle libraries are
// keyed by IMDb id, and services don't tell us the id of what's playing.

const BASE_URL = "https://v3-cinemeta.strem.io/catalog";

export type TTitleCandidate = { imdbId: string; name: string; year?: number; type: "movie" | "episode" };

type TMeta = { id?: string; imdb_id?: string; name: string; releaseInfo?: string };

async function search(title: string, type: "movie" | "episode"): Promise<TTitleCandidate[]> {
  const catalog = type === "episode" ? "series" : "movie";
  const answer = await requestJson<{ metas?: TMeta[] }>(
    `${BASE_URL}/${catalog}/top/search=${encodeURIComponent(title)}.json`,
    {},
    "Cinemeta",
  );
  return (answer.metas ?? [])
    .map((meta) => ({
      imdbId: meta.imdb_id ?? meta.id ?? "",
      name: meta.name,
      year: Number.parseInt(meta.releaseInfo ?? "", 10) || undefined,
      type,
    }))
    .filter((candidate) => candidate.imdbId.startsWith("tt"));
}

// Titles named like `title`, the exact name first; the other catalogue when the asked one has none (a service may
// not say whether it plays a film or a show)
export async function lookupTitle({ title, type }: { title: string; type: "movie" | "episode" }) {
  const found = await search(title, type);
  const candidates = found.length > 0 ? found : await search(title, type === "episode" ? "movie" : "episode");
  const exact = title.trim().toLowerCase();
  return [...candidates].sort(
    (a, b) => Number(b.name.toLowerCase() === exact) - Number(a.name.toLowerCase() === exact),
  );
}

// "The Night Train!" and "the night train" name the same title
const sameName = (a: string, b: string) => {
  const normalize = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  return normalize(a) === normalize(b);
};

// The candidate that's the title playing: one of the same name, of its year when known. None when no name matches:
// a near name is another title ("Fright Night" for "Sprite Fright"), and the search goes by the title instead.
export function pickCandidate(
  candidates: TTitleCandidate[],
  title: string,
  year?: number,
): TTitleCandidate | undefined {
  const named = candidates.filter((candidate) => sameName(candidate.name, title));
  return (year && named.find((candidate) => candidate.year === year)) || named[0];
}
