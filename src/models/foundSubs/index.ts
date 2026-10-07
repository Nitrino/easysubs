import { combine, createEffect, createEvent, createStore } from "effector";
import { parse } from "subtitle";

import type Service from "@src/streamings/service";
import type { Captions, TFoundResult, TFoundRole, TOpenSubtitlesQuota, TTitleInfo } from "../types";
import type { TDownloadFailure, TSearchAnswer, TSearchRequest } from "@src/subsSources";
import type { TSubsQuery } from "@src/subsSources/types";
import { pickCandidate, type TTitleCandidate } from "@src/subsSources/cinemeta";
import { rankResults } from "@src/subsSources/rank";
import { FOUND_SUBS_PREFIX, subsReloadRequested } from "../subs";
import { $streaming } from "../streamings";
import { alignSubs, retimeCaptions, type TAlignment, type TTiming } from "@src/utils/alignSubs";
import { cleanFoundCaptions } from "@src/utils/cleanFoundSubs";
import { foundFileKey, readFoundFile, touchFoundFile, writeFoundFile } from "@src/utils/foundSubsCache";
import { currentAuth, sendMessage, type TCredentials } from "./auth";
import { $jimakuApiKey, $subdlApiKey, $subsourceApiKey } from "../settings";

// The user's keys sent with each search and download
export const $credentials = combine({
  subdlApiKey: $subdlApiKey,
  subsourceApiKey: $subsourceApiKey,
  jimakuApiKey: $jimakuApiKey,
});

// Subtitles found online (src/subsSources, searched and downloaded by the background) or opened from a file, on the
// main line or the second line of the current video. The search sheet opens in place of the settings panel. What's
// loaded on a video is remembered with its timing ($foundSubsByVideo in the settings); the files are kept on the
// device (src/utils/foundSubsCache.ts) so that costs no download.

// ---- Sheet ---------------------------------------------------------------------------------------

export type TSheetView = "search" | "sources";
export const $sheet = createStore<{ role: TFoundRole; view: TSheetView } | null>(null);
export const sheetOpened = createEvent<{ role: TFoundRole; language?: string }>();
export const sheetClosed = createEvent();
export const sheetViewChanged = createEvent<TSheetView>();
export const sheetRoleChanged = createEvent<TFoundRole>();

// ---- What to search for --------------------------------------------------------------------------

export const $query = createStore<TSubsQuery>({ title: "", type: "movie", language: "en" });
export const queryChanged = createEvent<Partial<TSubsQuery>>();
// The page the query was filled in for: on another video it's read from the service again
export const $queryPage = createStore("");
// Whether the title came from the service
export const $titleDetected = createStore(false);
export const $candidates = createStore<TTitleCandidate[]>([]);
export const candidatePicked = createEvent<string>();
// Changes made in the sheet, each searching again
export const titleSubmitted = createEvent<string>();
export const languagePicked = createEvent<string>();
export const typePicked = createEvent<TSubsQuery["type"]>();
export const episodePicked = createEvent<{ season?: number; episode?: number }>();

const readTitle = async (streaming: Service): Promise<TTitleInfo | null> => {
  try {
    return (await streaming.getTitle?.()) ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const readTitleFx = createEffect(readTitle);

export const lookupTitleFx = createEffect<{ title: string; type: TSubsQuery["type"] }, TTitleCandidate[]>(
  ({ title, type }) => sendMessage({ type: "lookupTitle", title, kind: type }),
);

// ---- Search --------------------------------------------------------------------------------------

export const searchRequested = createEvent();
export type TSearchParams = Omit<TSearchRequest, "auth"> & {
  service: string;
  group?: string;
  credentials: TCredentials;
};
// Ranked: the service's own release first, see src/subsSources/rank.ts
export const searchFx = createEffect<TSearchParams, TSearchAnswer>(
  async ({ service, group, credentials, ...request }) => {
    const auth = currentAuth(credentials);
    const answer = await sendMessage<TSearchAnswer>({ type: "searchSubtitles", ...request, auth });
    return { ...answer, results: rankResults(answer.results, { service, group }) };
  },
);
export const $results = createStore<TFoundResult[]>([]);
export const $searchFailed = createStore<TSearchAnswer["failed"]>([]);
// Whether the OpenSubtitles results come from the Stremio mirror
export const $searchMirrored = createStore(false);
// The query the results are for, null before the first search
export const $searchedQuery = createStore<TSubsQuery | null>(null);
export const $searchError = createStore<string | null>(null);

// ---- OpenSubtitles account -----------------------------------------------------------------------

// The background signs in and keeps the password to renew the token; the page learns the username
export const loginFx = createEffect(({ username, password }: { username: string; password: string }) =>
  sendMessage<{ username: string; allowed?: number }>({ type: "opensubtitlesLogin", username, password }),
);
export const signedOut = createEvent();
export const logoutFx = createEffect(() => sendMessage<unknown>({ type: "opensubtitlesLogout" }));
export const $loginError = createStore<string | null>(null);

// Whether OpenSubtitles said today's downloads are used, until its count resets
export const isLimitReached = (quota: TOpenSubtitlesQuota | null, now = Date.now()) =>
  Boolean(quota && quota.remaining <= 0 && (!quota.resetAt || Date.parse(quota.resetAt) > now));

// ---- Loading -------------------------------------------------------------------------------------

// A found file on a line of the current video
export type TFoundTrack = {
  result: TFoundResult;
  // The file's lines, cleaned, in the file's own timing
  captions: Captions;
  timing: TTiming;
  // What Auto-sync found, and the timing before it was applied, for Undo
  synced: TAlignment | null;
  before: TTiming | null;
  // pending: Auto-sync runs next; running; skipped: a release of the same service; unsure: no timing fits well;
  // no-reference: the video has no track to compare with; restored: brought back with the video
  sync: "pending" | "running" | "skipped" | "done" | "unsure" | "no-reference" | "restored" | "none";
  fromCache: boolean;
};
export type TFoundState = { page: string; main: TFoundTrack | null; second: TFoundTrack | null };
export const $found = createStore<TFoundState>({ page: "", main: null, second: null });

// The episode a file is for, to offer the next one later
export type TEpisodeOf = { title: string; imdbId?: string; season: number; episode: number };
export const loadRequested = createEvent<{ result: TFoundResult; role: TFoundRole; episodeOf?: TEpisodeOf }>();
export type TLoadParams = {
  result: TFoundResult;
  role: TFoundRole;
  credentials: TCredentials;
  // The video it was asked for: a file that arrives after the user moved on isn't put on the next video
  page: string;
  // The service playing, which skips Auto-sync for its own releases
  service: string;
  stripSdh: boolean;
  episodeOf?: TEpisodeOf;
};
type TQuota = Omit<TDownloadFailure, "error" | "kind" | "status">;
export type TLoaded = { captions: Captions; fromCache: boolean; quota?: TQuota };

export class LoadError extends Error {
  constructor(
    message: string,
    readonly kind: TDownloadFailure["kind"] = "failed",
    readonly quota?: TQuota,
  ) {
    super(message);
  }
}

export const toFoundCaptions = (text: string, stripSdh: boolean) => {
  const captions = cleanFoundCaptions(parse(text), { stripSdh });
  if (captions.length === 0) throw new LoadError("The file has no subtitles in it");
  return captions;
};

// Keeping a file on the device is a convenience: a full storage doesn't fail the load
async function keepFile(key: string, text: string) {
  try {
    await writeFoundFile(key, text);
  } catch (error) {
    console.error(error);
  }
}

// From the device when it was loaded before, downloaded by the background otherwise
export async function loadFoundFile(
  result: TFoundResult,
  { stripSdh, credentials, cachedOnly = false }: { stripSdh: boolean; credentials: TCredentials; cachedOnly?: boolean },
): Promise<TLoaded> {
  const key = foundFileKey(result);
  const cached = await readFoundFile(key);
  if (cached !== null) {
    touchFoundFile(key).catch((error) => console.error(error));
    return { captions: toFoundCaptions(cached, stripSdh), fromCache: true };
  }
  if (cachedOnly || result.source === "file") throw new LoadError("The file is no longer on this device");

  const answer = await chrome.runtime.sendMessage({ type: "downloadSubtitle", result, auth: currentAuth(credentials) });
  if (!answer || typeof answer.text !== "string") {
    const failure = (answer ?? {}) as Partial<TDownloadFailure>;
    throw new LoadError(failure.error ?? "Nothing was downloaded", failure.kind, failure);
  }
  const captions = toFoundCaptions(answer.text, stripSdh);
  await keepFile(key, answer.text);
  return { captions, fromCache: false, quota: answer };
}

export const loadFx = createEffect<TLoadParams, TLoaded, LoadError>(({ result, stripSdh, credentials }) =>
  loadFoundFile(result, { stripSdh, credentials }),
);
export const $loadingKey = createStore<string | null>(null);
export const $loadError = createStore<string | null>(null);

// A subtitle file opened from the settings or dropped on the player
export const fileOpened = createEvent<{ name: string; text: string; role: TFoundRole }>();
export const fileLoadFx = createEffect(
  async ({
    name,
    text,
    stripSdh,
  }: {
    name: string;
    text: string;
    role: TFoundRole;
    stripSdh: boolean;
    page: string;
  }) => {
    const result: TFoundResult = { source: "file", id: `${name}:${text.length}`, language: "", release: name };
    const captions = toFoundCaptions(text, stripSdh);
    await keepFile(foundFileKey(result), text);
    return { result, captions };
  },
);

// ---- Timing --------------------------------------------------------------------------------------

export const autoSyncRequested = createEvent<TFoundRole>();
export type TAutoSyncParams = {
  role: TFoundRole;
  captions: Captions;
  // Auto-sync on load applies only a timing it's sure of; the button applies what it finds
  auto: boolean;
  streaming: Service;
  // For the main line: the service's track it showed. For the second line: the main line.
  serviceLabel: string;
  serviceCues: Captions;
  mainCues: Captions;
};
// The service's track a found main line is compared with: the one it showed, or another of its tracks
async function referenceCues({ role, streaming, serviceLabel, serviceCues, mainCues }: TAutoSyncParams) {
  if (role === "second") return mainCues;
  if (serviceCues.length > 0) return serviceCues;
  if (serviceLabel) return (await streaming.getSubs(serviceLabel)) ?? [];
  const [track] = (await streaming.getSubsTracks?.()) ?? [];
  return track ? ((await streaming.getSubs(track.label)) ?? []) : [];
}
export const autoSyncFx = createEffect<TAutoSyncParams, TAlignment | null>(async (params) =>
  alignSubs(params.captions, await referenceCues(params)),
);
export const syncUndone = createEvent<TFoundRole>();
export const shiftNudged = createEvent<{ role: TFoundRole; delta: number }>();
export const foundRemoved = createEvent<TFoundRole>();

// Netflix moves its tracks for each ad break and asks for the subtitles again; found lines are moved the same way
export const $adsRevision = createStore(0).on(subsReloadRequested, (revision) => revision + 1);

// The lines as shown: the file moved by its timing, and by the service for its ad breaks
const shown = (track: TFoundTrack | null) => {
  if (!track) return null;
  const captions = retimeCaptions(track.captions, track.timing);
  const streaming = $streaming.getState();
  return streaming.adjustCaptions ? streaming.adjustCaptions(captions) : captions;
};
export const $foundMainCaptions = combine($found, $adsRevision, (state) => shown(state.main));
export const $foundSecondCaptions = combine($found, $adsRevision, (state) => shown(state.second));
export const $foundSecondResult = $found.map((state) => state.second?.result ?? null);
export const foundLabel = (result: TFoundResult) => `${FOUND_SUBS_PREFIX}${result.source}:${result.id}`;

// Puts the found main line in place of the service's subtitles; `remount` re-renders the subtitles for a new file
export const applyMainFx = createEffect<{ label: string; captions: Captions; remount: boolean }, void>();
// The found main line applied last, on its page
export const $appliedMain = createStore<{ label: string; page: string } | null>(null);
export const serviceTrackRestoreFx = createEffect<string, void>();
// "From Netflix" in the Subtitles from row: the service's track again
export const serviceTrackRequested = createEvent();

// Whether two lists of cues show the same lines at the same times
export const sameCaptions = (a: Captions, b: Captions) =>
  a === b ||
  (a.length === b.length &&
    a.every(
      (cue, index) =>
        Number(cue.start) === Number(b[index].start) &&
        Number(cue.end) === Number(b[index].end) &&
        cue.text === b[index].text,
    ));

// What a video remembered: brought back from the device (or downloaded again from a source that doesn't count)
export const restoreFx = createEffect<
  { page: string; video: import("../types").TFoundVideo; stripSdh: boolean; credentials: TCredentials },
  { page: string; main?: TFoundTrack; second?: TFoundTrack; hadMain: boolean }
>(async ({ page, video, stripSdh, credentials }) => {
  const restore = async (choice: import("../types").TFoundChoice | undefined) => {
    if (!choice) return undefined;
    try {
      const metered = choice.result.source === "opensubtitles";
      const { captions } = await loadFoundFile(choice.result, { stripSdh, credentials, cachedOnly: metered });
      return {
        result: choice.result,
        captions,
        timing: { shift: choice.shift, rate: choice.rate },
        synced: null,
        before: null,
        sync: "restored",
        fromCache: true,
      } satisfies TFoundTrack;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };
  return { page, main: await restore(video.main), second: await restore(video.second), hadMain: Boolean(video.main) };
});

// ---- Next episode --------------------------------------------------------------------------------

export type TNextEpisodeOffer = { result: TFoundResult; role: TFoundRole; episodeOf: TEpisodeOf; page: string };
export const $nextEpisodeOffer = createStore<TNextEpisodeOffer | null>(null);
export const nextEpisodeAccepted = createEvent();
export const nextEpisodeDismissed = createEvent();
export const nextTitleFx = createEffect(async ({ streaming, page }: { streaming: Service; page: string }) => ({
  info: await readTitle(streaming),
  page,
}));
// The top result for the next episode, in the language, source and release group of the last one
export const nextEpisodeFx = createEffect(
  async ({
    episodeOf,
    language,
    request,
    service,
    group,
    credentials,
  }: {
    episodeOf: TEpisodeOf;
    language: string;
    request: Omit<TSearchRequest, "auth" | "query">;
    service: string;
    group?: string;
    credentials: TCredentials;
    // The episode's video: the offer is dropped if another one plays by the time it's found
    page: string;
  }) => {
    let imdbId = episodeOf.imdbId;
    if (!imdbId) {
      const candidates = await sendMessage<TTitleCandidate[]>({
        type: "lookupTitle",
        title: episodeOf.title,
        kind: "episode",
      });
      imdbId = pickCandidate(candidates, episodeOf.title)?.imdbId;
    }
    const query: TSubsQuery = { ...episodeOf, imdbId, type: "episode", language };
    const answer = await sendMessage<TSearchAnswer>({
      type: "searchSubtitles",
      ...request,
      query,
      auth: currentAuth(credentials),
    });
    const [top] = rankResults(
      answer.results.filter((result) => !result.machineTranslated),
      { service, group },
    );
    return top ? { result: top, episodeOf: { ...episodeOf, imdbId } } : null;
  },
);
