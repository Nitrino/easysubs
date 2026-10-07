import type { TFoundResult, TFoundSource } from "@src/models/types";
import { opensubtitles, opensubtitlesLogin } from "./opensubtitles";
import { stremio } from "./stremio";
import { gestdown } from "./gestdown";
import { subdl } from "./subdl";
import { subsource } from "./subsource";
import { jimaku } from "./jimaku";
import { lookupTitle } from "./cinemeta";
import { sessionAuth, signIn, signOut } from "./session";
import { SourceError, type SubsSource, type TDownloaded, type TSourceAuth, type TSubsQuery } from "./types";

// Subtitle libraries, run by the background script for the content script's messages (searchSubtitles,
// downloadSubtitle, lookupTitle, opensubtitlesLogin). Each source maps its answers to TFoundResult.

export { lookupTitle, opensubtitlesLogin, signIn as opensubtitlesSignIn, signOut as opensubtitlesSignOut };

export const SOURCES: SubsSource[] = [opensubtitles, gestdown, subdl, subsource, jimaku];
const ALL_SOURCES: SubsSource[] = [...SOURCES, stremio];

const SEARCH_TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>, source: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new SourceError(`${source} took too long`, undefined, "unavailable")),
      SEARCH_TIMEOUT_MS,
    );
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

export type TSearchRequest = {
  query: TSubsQuery;
  // The sources turned on in the settings
  sources: TFoundSource[];
  auth: TSourceAuth;
  // Whether the Stremio mirror may stand in for OpenSubtitles
  mirror: boolean;
  // OpenSubtitles said today's downloads are used: its files come from the mirror until the count resets
  limitReached?: boolean;
};

export type TSearchFailure = { source: TFoundSource; error: string };
export type TSearchAnswer = { results: TFoundResult[]; failed: TSearchFailure[]; mirrored: boolean };

const errorText = (error: unknown) => (error instanceof Error ? error.message : String(error));

// Every source turned on, at once. The mirror replaces OpenSubtitles when OpenSubtitles can't serve downloads: no
// key in this build, no answer, or the day's downloads used.
export async function searchSubtitles({
  query,
  sources,
  auth: keys,
  mirror,
  limitReached,
}: TSearchRequest): Promise<TSearchAnswer> {
  // The OpenSubtitles token is the background's own
  const auth = sources.includes("opensubtitles") ? { ...keys, ...(await sessionAuth()) } : keys;
  const enabled = SOURCES.filter((source) => sources.includes(source.name) && source.isAvailable(auth));
  const settled = await Promise.allSettled(
    enabled.map((source) => withTimeout(source.search(query, auth), source.name)),
  );

  const results: TFoundResult[] = [];
  const failed: TSearchFailure[] = [];
  let openSubtitlesDown = sources.includes("opensubtitles") && !opensubtitles.isAvailable(auth);
  settled.forEach((outcome, index) => {
    const source = enabled[index];
    if (outcome.status === "fulfilled") {
      if (!(source.name === "opensubtitles" && limitReached && mirror)) results.push(...outcome.value);
      return;
    }
    if (
      source.name === "opensubtitles" &&
      outcome.reason instanceof SourceError &&
      outcome.reason.kind === "unavailable"
    ) {
      openSubtitlesDown = true;
    }
    failed.push({ source: source.name, error: errorText(outcome.reason) });
  });

  const mirrored = mirror && sources.includes("opensubtitles") && (openSubtitlesDown || Boolean(limitReached));
  if (mirrored) {
    try {
      results.push(...(await withTimeout(stremio.search(query, auth), "stremio")));
    } catch (error) {
      failed.push({ source: "stremio", error: errorText(error) });
    }
  }

  return {
    results,
    failed: mirrored ? failed.filter((failure) => failure.source !== "opensubtitles") : failed,
    mirrored,
  };
}

// What downloadSubtitle answers when it fails: the error, and what kind it is for the sheet to explain
export type TDownloadFailure = { error: string; kind: SourceError["kind"]; status?: number } & Omit<
  TDownloaded,
  "text"
>;

export async function downloadSubtitle({
  result,
  auth,
}: {
  result: TFoundResult;
  auth: TSourceAuth;
}): Promise<TDownloaded> {
  const source = ALL_SOURCES.find((candidate) => candidate.name === result.source);
  if (!source) throw new SourceError(`Unknown source: ${result.source}`);
  if (source.name !== "opensubtitles") return source.download(result, auth);

  try {
    return await source.download(result, { ...auth, ...(await sessionAuth()) });
  } catch (error) {
    // A refused token is renewed once
    if (!(error instanceof SourceError) || error.kind !== "auth") throw error;
    return source.download(result, { ...auth, ...(await sessionAuth({ renew: true })) });
  }
}

export function downloadFailure(error: unknown): TDownloadFailure {
  if (error instanceof SourceError) {
    return { error: error.message, kind: error.kind, status: error.status, ...error.quota };
  }
  return { error: errorText(error), kind: "failed" };
}
