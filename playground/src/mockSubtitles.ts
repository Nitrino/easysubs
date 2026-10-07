/**
 * Offline answers of the subtitle sources for the mock background (src/subsSources): the playground's sample stands
 * for "The Night Train" S1 E2, and its English and Spanish files (playground/public/subs) are found as releases timed
 * differently, so Auto-sync has work to do: one as is (a Netflix release), one 2.4 s late, one timed for 25 fps, and
 * a machine translation. OpenSubtitles counts downloads like the real one: 5 a day, 20 when signed in.
 */

import type { TFoundResult } from "@src/models/types";

type Message = Record<string, unknown>;

// A made-up IMDb id for the made-up show
export const NIGHT_TRAIN_IMDB_ID = "tt9900012";
const LANGUAGES_WITH_FILES = ["en", "es"];

type TVariant = { id: string; release: string; shift: number; rate: number; extra?: Partial<TFoundResult> };
const VARIANTS: TVariant[] = [
  {
    id: "1001",
    release: "The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb",
    shift: 0,
    rate: 1,
    extra: { fps: 23.976, downloads: 12400, trusted: true },
  },
  {
    id: "1003",
    release: "The.Night.Train.S01E02.720p.BluRay.x264-GROUP",
    shift: 1.6,
    rate: 23.976 / 25,
    extra: { fps: 25, downloads: 860 },
  },
  {
    id: "1004",
    release: "The.Night.Train.S01E02.WEB",
    shift: 0,
    rate: 1,
    extra: { downloads: 95, machineTranslated: true },
  },
];
const ADDIC7ED_VARIANT: TVariant = {
  id: "a7-1002",
  release: "the night train S01E02 WEB",
  shift: 2.4,
  rate: 1,
  extra: { downloads: 3100 },
};

const variantOf = (result: TFoundResult) =>
  [...VARIANTS, ADDIC7ED_VARIANT].find((variant) => result.id.endsWith(variant.id)) ?? VARIANTS[0];

let openSubtitlesDownloads = 0;
// The account the background signed in to, as the real one keeps it to itself
let signedIn = false;
// For tests: a new day, signed out
export const resetMockSubtitles = () => {
  openSubtitlesDownloads = 0;
  signedIn = false;
};
const openSubtitlesAllowed = () => (signedIn ? 20 : 5);

const isNightTrain = (query: { title?: string; imdbId?: string }) =>
  query.imdbId === NIGHT_TRAIN_IMDB_ID || /night train/i.test(query.title ?? "");

export function lookupTitle(message: Message) {
  const title = String(message.title ?? "");
  if (!title) return [];
  return [
    {
      imdbId: isNightTrain({ title }) ? NIGHT_TRAIN_IMDB_ID : "tt9900099",
      name: title,
      year: 2025,
      type: message.kind === "episode" ? "episode" : "movie",
    },
  ];
}

export function searchSubtitles(message: Message) {
  const query = message.query as {
    title?: string;
    imdbId?: string;
    language: string;
    season?: number;
    episode?: number;
  };
  const sources = (message.sources as string[]) ?? [];
  const mirrored = Boolean(message.mirror && message.limitReached);
  const language = query.language.split("-")[0];
  if (!isNightTrain(query) || !LANGUAGES_WITH_FILES.includes(language) || query.season !== 1 || query.episode !== 2) {
    return { results: [], failed: [], mirrored };
  }

  const opensubtitles = VARIANTS.map((variant): TFoundResult => ({
    source: mirrored ? "stremio" : "opensubtitles",
    id: mirrored ? `m${variant.id}` : variant.id,
    language,
    release: variant.release,
    ...(mirrored ? { fps: variant.extra?.fps } : variant.extra),
  }));
  const addic7ed: TFoundResult[] = sources.includes("gestdown")
    ? [
        {
          source: "gestdown",
          id: ADDIC7ED_VARIANT.id,
          language,
          release: ADDIC7ED_VARIANT.release,
          ...ADDIC7ED_VARIANT.extra,
        },
      ]
    : [];
  return { results: [...opensubtitles, ...addic7ed], failed: [], mirrored };
}

// "00:00:04,000" moved by a variant's timing
const retime = (text: string, { shift, rate }: TVariant) =>
  text.replace(/(\d{2}):(\d{2}):(\d{2})[,.](\d{3})/g, (_, h, m, s, ms) => {
    const time = Math.max(
      0,
      Math.round((Number(h) * 3600 + Number(m) * 60 + Number(s)) * 1000 * rate + Number(ms) * rate + shift * 1000),
    );
    const pad = (value: number, length = 2) => String(value).padStart(length, "0");
    return `${pad(Math.floor(time / 3_600_000))}:${pad(Math.floor(time / 60_000) % 60)}:${pad(Math.floor(time / 1000) % 60)},${pad(time % 1000, 3)}`;
  });

export async function downloadSubtitle(message: Message) {
  const result = message.result as TFoundResult;
  const metered = result.source === "opensubtitles";
  const allowed = openSubtitlesAllowed();
  if (metered && openSubtitlesDownloads >= allowed) {
    return {
      error: "Today's OpenSubtitles downloads are used",
      kind: "limit",
      status: 406,
      remaining: 0,
      allowed,
      resetAt: "",
    };
  }
  const file = await fetch(`/subs/${result.language}.srt`);
  if (!file.ok) return { error: `No ${result.language} file in the playground`, kind: "failed" };
  const text = retime(await file.text(), variantOf(result));
  if (!metered) return { text };
  openSubtitlesDownloads += 1;
  return { text, remaining: allowed - openSubtitlesDownloads, allowed, resetAt: "" };
}

export function opensubtitlesLogin(message: Message) {
  if (message.password === "wrong") return { error: "Wrong username or password" };
  signedIn = true;
  return { username: message.username, allowed: 20 };
}

export function opensubtitlesLogout() {
  signedIn = false;
  return { signedOut: true };
}
