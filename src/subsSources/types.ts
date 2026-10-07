import type { TFoundResult, TFoundSource } from "@src/models/types";

// What to search for: a title, with the show's IMDb id and the episode when known
export type TSubsQuery = {
  title: string;
  year?: number;
  type: "movie" | "episode";
  // "tt0133093"; for an episode, the show's id
  imdbId?: string;
  season?: number;
  episode?: number;
  // A code from LANGUAGES: "es", "pt", "zh-CN"
  language: string;
};

// Keys and the OpenSubtitles token, sent by the content script with each message like DeepL's key
export type TSourceAuth = {
  opensubtitlesToken?: string;
  // The API host the OpenSubtitles login returned
  opensubtitlesBaseUrl?: string;
  subdlApiKey?: string;
  subsourceApiKey?: string;
  jimakuApiKey?: string;
};

// A downloaded file as text (SRT or WebVTT), with the OpenSubtitles count when the source has one
export type TDownloaded = { text: string; remaining?: number; allowed?: number; resetAt?: string };

export interface SubsSource {
  name: Exclude<TFoundSource, "file">;
  // Whether the source can search at all with these keys: SubDL and SubSource need the user's own
  isAvailable(auth: TSourceAuth): boolean;
  search(query: TSubsQuery, auth: TSourceAuth): Promise<TFoundResult[]>;
  download(result: TFoundResult, auth: TSourceAuth): Promise<TDownloaded>;
}

// An error with what the sheet needs to explain it: the HTTP status, and for OpenSubtitles whether the day's
// downloads are used up (406) or the source can't be used now (no key, down), which sends it to the mirror
export class SourceError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly kind: "limit" | "unavailable" | "auth" | "failed" = "failed",
    // OpenSubtitles' count when the limit is reached
    readonly quota?: Omit<TDownloaded, "text">,
  ) {
    super(message);
    this.name = "SourceError";
  }
}

// fetch() that throws a SourceError for a failed answer and for no answer at all
export async function request(url: string, init: RequestInit = {}, source = "The source"): Promise<Response> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch {
    throw new SourceError(`${source} didn't answer`, undefined, "unavailable");
  }
  if (response.ok) return response;
  const kind = response.status >= 500 || response.status === 429 ? "unavailable" : "failed";
  throw new SourceError(`${source} answered ${response.status}`, response.status, kind);
}

export async function requestJson<T>(url: string, init: RequestInit = {}, source = "The source"): Promise<T> {
  const response = await request(url, init, source);
  try {
    return (await response.json()) as T;
  } catch {
    throw new SourceError(`${source} sent something other than JSON`);
  }
}
