import type { TFoundResult } from "@src/models/types";
import { normalizeLanguage } from "@src/utils/languages";
import { toSubtitleText } from "./files";
import { SourceError, request, requestJson, type SubsSource, type TDownloaded, type TSourceAuth } from "./types";

// OpenSubtitles.com REST API v1 (https://opensubtitles.stoplight.io). Searching is free; each download counts: 5 a
// day per IP address without a signed-in user, 20 for a free account, 1000 for VIP. The key identifies EasySubs as
// the app and is set at build time (VITE_OPENSUBTITLES_API_KEY); OpenSubtitles bans apps that ask users for theirs.

export const opensubtitlesApiKey = (): string => import.meta.env.VITE_OPENSUBTITLES_API_KEY ?? "";
const DEFAULT_HOST = "api.opensubtitles.com";

const appVersion = () => globalThis.chrome?.runtime?.getManifest?.()?.version ?? "dev";

// The app name with its version: extensions can't set User-Agent, X-User-Agent stands in for it
export const opensubtitlesUserAgent = () => `EasySubs v${appVersion()}`;

const baseUrl = (auth: TSourceAuth) => `https://${auth.opensubtitlesBaseUrl || DEFAULT_HOST}/api/v1`;

function headers(auth: TSourceAuth, json = false): Record<string, string> {
  if (!opensubtitlesApiKey()) {
    throw new SourceError("OpenSubtitles isn't set up in this build", undefined, "unavailable");
  }
  return {
    Accept: "application/json",
    "Api-Key": opensubtitlesApiKey(),
    "X-User-Agent": opensubtitlesUserAgent(),
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(auth.opensubtitlesToken ? { Authorization: `Bearer ${auth.opensubtitlesToken}` } : {}),
  };
}

// The codes OpenSubtitles takes: both Portuguese variants for "pt", "zh-cn" and "zh-tw" for Chinese
export function opensubtitlesLanguages(language: string): string {
  const normalized = normalizeLanguage(language);
  if (normalized === "pt") return "pt-br,pt-pt";
  if (normalized === "zh-hans") return "zh-cn";
  if (normalized === "zh-hant") return "zh-tw";
  return normalized;
}

// "tt0133093" → "133093": ids without "tt" and leading zeros, as the docs ask, so no redirect is needed
const numericId = (imdbId: string) => imdbId.replace(/^tt0*/i, "");

// Search parameters, sorted and lower case as the docs ask
export function opensubtitlesSearchParams(query: Parameters<SubsSource["search"]>[0]): URLSearchParams {
  const params: Record<string, string> = { languages: opensubtitlesLanguages(query.language) };
  if (query.imdbId && query.type === "episode") {
    params.parent_imdb_id = numericId(query.imdbId);
  } else if (query.imdbId) {
    params.imdb_id = numericId(query.imdbId);
  } else {
    params.query = query.title.toLowerCase();
    params.type = query.type;
    if (query.year) params.year = String(query.year);
  }
  if (query.type === "episode") {
    if (query.season) params.season_number = String(query.season);
    if (query.episode) params.episode_number = String(query.episode);
  }
  return new URLSearchParams(Object.entries(params).sort(([a], [b]) => a.localeCompare(b)));
}

type TOpenSubtitlesSubtitle = {
  id: string;
  attributes: {
    language: string;
    download_count?: number;
    hearing_impaired?: boolean;
    ai_translated?: boolean;
    machine_translated?: boolean;
    fps?: number;
    from_trusted?: boolean;
    release?: string;
    files: { file_id: number; file_name?: string }[];
  };
};

export function opensubtitlesResult({ attributes }: TOpenSubtitlesSubtitle): TFoundResult | null {
  const file = attributes.files?.[0];
  if (!file) return null;
  return {
    source: "opensubtitles",
    id: String(file.file_id),
    language: attributes.language,
    release: attributes.release || file.file_name || "",
    fps: attributes.fps || undefined,
    downloads: attributes.download_count,
    hearingImpaired: attributes.hearing_impaired,
    machineTranslated: Boolean(attributes.machine_translated || attributes.ai_translated),
    trusted: attributes.from_trusted,
  };
}

type TDownloadAnswer = {
  link?: string;
  remaining?: number;
  requests?: number;
  reset_time_utc?: string;
  message?: string;
};

export const opensubtitles: SubsSource = {
  name: "opensubtitles",
  isAvailable: () => Boolean(opensubtitlesApiKey()),

  async search(query, auth) {
    const answer = await requestJson<{ data: TOpenSubtitlesSubtitle[] }>(
      `${baseUrl(auth)}/subtitles?${opensubtitlesSearchParams(query)}`,
      { headers: headers(auth) },
      "OpenSubtitles",
    );
    return (answer.data ?? []).map(opensubtitlesResult).filter((result): result is TFoundResult => result !== null);
  },

  async download(result, auth) {
    const response = await fetch(`${baseUrl(auth)}/download`, {
      method: "POST",
      headers: headers(auth, true),
      body: JSON.stringify({ file_id: Number(result.id) }),
    }).catch(() => {
      throw new SourceError("OpenSubtitles didn't answer", undefined, "unavailable");
    });
    const answer: TDownloadAnswer = await response.json().catch(() => ({}));
    const quota = {
      remaining: answer.remaining,
      allowed:
        answer.remaining !== undefined && answer.requests !== undefined
          ? answer.remaining + answer.requests
          : undefined,
      resetAt: answer.reset_time_utc,
    };

    if (response.status === 406) {
      throw new SourceError("Today's OpenSubtitles downloads are used", 406, "limit", quota);
    }
    if (response.status === 401) throw new SourceError("The OpenSubtitles sign-in has expired", 401, "auth");
    if (!response.ok || !answer.link) {
      const kind = response.status >= 500 || response.status === 429 ? "unavailable" : "failed";
      throw new SourceError(answer.message || `OpenSubtitles answered ${response.status}`, response.status, kind);
    }

    const file = await request(answer.link, {}, "OpenSubtitles");
    const text = toSubtitleText(new Uint8Array(await file.arrayBuffer()), { name: ".srt", language: result.language });
    return { text, ...quota } satisfies TDownloaded;
  },
};

type TLoginAnswer = { token?: string; base_url?: string; user?: { allowed_downloads?: number }; message?: string };

// The user's token, valid 24 hours, and the host to use with it
export async function opensubtitlesLogin(username: string, password: string) {
  const response = await fetch(`https://${DEFAULT_HOST}/api/v1/login`, {
    method: "POST",
    headers: headers({}, true),
    body: JSON.stringify({ username, password }),
  }).catch(() => {
    throw new SourceError("OpenSubtitles didn't answer", undefined, "unavailable");
  });
  const answer: TLoginAnswer = await response.json().catch(() => ({}));
  if (response.status === 401) throw new SourceError("Wrong username or password", 401, "auth");
  if (!response.ok || !answer.token) {
    throw new SourceError(answer.message || `OpenSubtitles answered ${response.status}`, response.status);
  }
  return { token: answer.token, baseUrl: answer.base_url || DEFAULT_HOST, allowed: answer.user?.allowed_downloads };
}
