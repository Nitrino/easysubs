import { sample } from "effector";
import { debug } from "patronum";

import {
  $appliedMain,
  $candidates,
  $credentials,
  $found,
  $foundMainCaptions,
  $loadError,
  $loadingKey,
  $loginError,
  $nextEpisodeOffer,
  $query,
  $queryPage,
  $results,
  $searchError,
  $searchFailed,
  $searchMirrored,
  $searchedQuery,
  $sheet,
  $titleDetected,
  applyMainFx,
  autoSyncFx,
  autoSyncRequested,
  candidatePicked,
  episodePicked,
  fileLoadFx,
  fileOpened,
  foundLabel,
  foundRemoved,
  isLimitReached,
  languagePicked,
  loadFx,
  logoutFx,
  loadRequested,
  loginFx,
  lookupTitleFx,
  nextEpisodeAccepted,
  nextEpisodeDismissed,
  nextEpisodeFx,
  nextTitleFx,
  queryChanged,
  readTitleFx,
  restoreFx,
  sameCaptions,
  searchFx,
  searchRequested,
  serviceTrackRestoreFx,
  sheetClosed,
  sheetOpened,
  sheetRoleChanged,
  sheetViewChanged,
  serviceTrackRequested,
  shiftNudged,
  signedOut,
  syncUndone,
  titleSubmitted,
  typePicked,
  type TEpisodeOf,
  type TFoundState,
  type TFoundTrack,
} from ".";
import {
  $pinnedSubs,
  $rawSubs,
  $serviceRawSubs,
  $serviceSubsLabel,
  $subsLanguage,
  esSubsChanged,
  fetchSubsFx,
  ownSubsLoaded,
  resetSubs,
  subsResyncFx,
} from "../subs";
import { $streaming } from "../streamings";
import { videoTimeUpdate } from "../videos";
import {
  $foundSubsAddic7ed,
  $foundSubsByVideo,
  $foundSubsMirror,
  $foundSubsNextEpisode,
  $foundSubsShows,
  $foundSubsStripSdh,
  $opensubtitlesAccount,
  $opensubtitlesQuota,
  $secondarySubs,
  opensubtitlesAccountChanged,
  opensubtitlesQuotaChanged,
  secondarySubsChanged,
} from "../settings";
import type { TFoundChoice, TFoundRole, TFoundShow, TFoundSource, TFoundVideo, TTitleInfo } from "../types";
import { pickCandidate } from "@src/subsSources/cinemeta";
import { isSameServiceRelease, releaseGroup } from "@src/subsSources/rank";
import { NO_TIMING, isSameTiming } from "@src/utils/alignSubs";
import { foundFileKey, rememberVideo } from "@src/utils/foundSubsCache";
import { translationLanguageCode } from "@src/utils/languages";
import { currentVideoPage } from "@src/utils/videoKey";

const currentPage = currentVideoPage;
const videoKey = (service: string, page: string) => `${service}:${page}`;
const showKey = (title: string) => title.trim().toLowerCase();

const withTrack = (state: TFoundState, role: TFoundRole, change: (track: TFoundTrack) => TFoundTrack | null) => {
  const track = state[role];
  return track ? { ...state, [role]: change(track) } : state;
};

// ---- Sheet ---------------------------------------------------------------------------------------

$sheet.on(sheetOpened, (_, { role }) => ({ role, view: "search" }));
$sheet.on(sheetViewChanged, (sheet, view) => (sheet ? { ...sheet, view } : sheet));
$sheet.on(sheetRoleChanged, (sheet, role) => (sheet ? { ...sheet, role } : sheet));
$sheet.reset(sheetClosed);

// The language: the one the sheet was opened for (the second line's), else the main subtitles'
$query.on(sheetOpened, (query, { language }) =>
  language ? { ...query, language: translationLanguageCode(language) } : query,
);
sample({
  clock: sheetOpened,
  source: { queryPage: $queryPage, subsLanguage: $subsLanguage },
  filter: ({ queryPage, subsLanguage }, { language }) =>
    !language && queryPage !== currentPage() && subsLanguage !== "auto",
  fn: ({ subsLanguage }) => ({ language: translationLanguageCode(subsLanguage) }),
  target: queryChanged,
});

// Another title or kind drops the IMDb id and year of the old one
$query.on(queryChanged, (query, change) => {
  const renamed =
    (change.title !== undefined && change.title !== query.title) ||
    (change.type !== undefined && change.type !== query.type);
  // A title typed by hand has no year or id of its own until the lookup finds them
  return { ...query, ...(renamed ? { imdbId: undefined, year: undefined } : {}), ...change };
});
$candidates.on(queryChanged, (candidates, change) => (change.title !== undefined ? [] : candidates));

// The title of a video is read when the sheet first opens on it
sample({
  clock: sheetOpened,
  source: { streaming: $streaming, queryPage: $queryPage },
  filter: ({ queryPage }) => queryPage !== currentPage(),
  fn: ({ streaming }) => streaming,
  target: readTitleFx,
});
$queryPage.on(readTitleFx, () => currentPage());
const titleFields = (info: TTitleInfo | null) => ({
  title: info?.title ?? "",
  year: info?.year,
  type: info?.type ?? "movie",
  season: info?.season,
  episode: info?.episode,
  imdbId: info?.imdbId,
});
$query.on(readTitleFx.doneData, (query, info) => ({ ...query, ...titleFields(info) }));
$titleDetected.on(readTitleFx.doneData, (_, info) => Boolean(info?.title));
$candidates.reset(readTitleFx);
$results.reset(readTitleFx);
$searchedQuery.reset(readTitleFx);

// The IMDb id from Cinemeta when the service doesn't know it, then the search
sample({
  clock: readTitleFx.doneData,
  filter: (info): info is TTitleInfo => Boolean(info?.title) && !info?.imdbId,
  fn: (info) => ({ title: info.title, type: info.type }),
  target: lookupTitleFx,
});
sample({ clock: readTitleFx.doneData, filter: (info) => Boolean(info?.imdbId), target: searchRequested });
$candidates.on(lookupTitleFx.doneData, (_, candidates) => candidates);
$query.on(lookupTitleFx.doneData, (query, candidates) => ({
  ...query,
  imdbId: pickCandidate(candidates, query.title, query.year)?.imdbId,
}));
// A failed lookup still searches by title
sample({ clock: [lookupTitleFx.done, lookupTitleFx.fail], target: searchRequested });

$query.on(candidatePicked, (query, imdbId) => ({ ...query, imdbId }));
sample({ clock: candidatePicked, target: searchRequested });

// Changes in the sheet: another title or kind is looked up again, another language or episode searched again
sample({ clock: titleSubmitted, fn: (title) => ({ title: title.trim() }), target: queryChanged });
sample({ clock: typePicked, fn: (type) => ({ type }), target: queryChanged });
sample({
  clock: [titleSubmitted, typePicked],
  source: $query,
  filter: (query) => Boolean(query.title),
  fn: (query) => ({ title: query.title, type: query.type }),
  target: lookupTitleFx,
});
sample({ clock: languagePicked, fn: (language) => ({ language }), target: queryChanged });
sample({ clock: episodePicked, target: queryChanged });
sample({ clock: [languagePicked, episodePicked], target: searchRequested });

// The same video again: search when the language changed since the last results
sample({
  clock: sheetOpened,
  source: { queryPage: $queryPage, query: $query, searched: $searchedQuery },
  filter: ({ queryPage, query, searched }) =>
    queryPage === currentPage() && Boolean(query.title) && (searched === null || searched.language !== query.language),
  target: searchRequested,
});

// ---- Search --------------------------------------------------------------------------------------

const enabledSources = (addic7ed: boolean): TFoundSource[] => [
  "opensubtitles",
  ...(addic7ed ? (["gestdown"] as const) : []),
  "subdl",
  "subsource",
  "jimaku",
];

sample({
  clock: searchRequested,
  source: {
    query: $query,
    streaming: $streaming,
    addic7ed: $foundSubsAddic7ed,
    mirror: $foundSubsMirror,
    quota: $opensubtitlesQuota,
    shows: $foundSubsShows,
    credentials: $credentials,
  },
  filter: ({ query }) => Boolean(query.title.trim() || query.imdbId),
  fn: ({ query, streaming, addic7ed, mirror, quota, shows, credentials }) => ({
    query,
    credentials,
    sources: enabledSources(addic7ed),
    mirror,
    limitReached: isLimitReached(quota),
    service: streaming.name,
    group: shows[showKey(query.title)]?.group,
  }),
  target: searchFx,
});
$searchedQuery.on(searchFx, (_, { query }) => query);
// Only the answer to the latest search: an older one that comes later doesn't replace it
const searchAnswered = sample({
  clock: searchFx.done,
  source: $searchedQuery,
  filter: (latest, { params }) => latest === params.query,
  fn: (_, { result }) => result,
});
const searchFailed = sample({
  clock: searchFx.fail,
  source: $searchedQuery,
  filter: (latest, { params }) => latest === params.query,
  fn: (_, { error }) => error.message,
});
$results.on(searchAnswered, (_, { results }) => results);
$searchFailed.on(searchAnswered, (_, { failed }) => failed).reset(searchFailed);
$searchMirrored.on(searchAnswered, (_, { mirrored }) => mirrored);
$searchError.on(searchFailed, (_, message) => message).reset(searchAnswered);

// ---- OpenSubtitles account -----------------------------------------------------------------------

sample({ clock: loginFx.doneData, fn: ({ username }) => ({ username }), target: opensubtitlesAccountChanged });
// A new account has its own count; the next download tells what's left
sample({
  clock: loginFx.doneData,
  fn: ({ allowed }) => (allowed ? { remaining: allowed, allowed, resetAt: "" } : null),
  target: opensubtitlesQuotaChanged,
});
$loginError.on(loginFx.failData, (_, error) => error.message).reset(loginFx, signedOut, sheetClosed);
sample({ clock: signedOut, target: logoutFx });
sample({ clock: signedOut, fn: () => null, target: [opensubtitlesAccountChanged, opensubtitlesQuotaChanged] });

// ---- Loading -------------------------------------------------------------------------------------

const newTrack = (
  params: { result: TFoundTrack["result"]; service: string },
  captions: TFoundTrack["captions"],
  fromCache: boolean,
): TFoundTrack => ({
  result: params.result,
  captions,
  timing: NO_TIMING,
  synced: null,
  before: null,
  // A release of the service itself has its timing already (an NF file on Netflix)
  sync: isSameServiceRelease(params.result.release, params.service) ? "skipped" : "pending",
  fromCache,
});

// The state of the page playing: what was loaded on another video doesn't carry over
const onPage = (state: TFoundState): TFoundState => {
  const page = currentPage();
  return state.page === page ? state : { page, main: null, second: null };
};

sample({
  clock: loadRequested,
  source: { streaming: $streaming, stripSdh: $foundSubsStripSdh, credentials: $credentials },
  fn: ({ streaming, stripSdh, credentials }, params) => ({
    ...params,
    service: streaming.name,
    stripSdh,
    credentials,
    page: currentPage(),
  }),
  target: loadFx,
});
$loadingKey.on(loadFx, (_, { result }) => foundFileKey(result)).reset(loadFx.finally);
$loadError.on(loadFx.failData, (_, error) => error.message).reset(loadFx, sheetClosed, sheetOpened);
// A file that arrives after another video started isn't put on it
$found.on(loadFx.done, (state, { params, result }) =>
  params.page === currentPage()
    ? { ...onPage(state), [params.role]: newTrack(params, result.captions, result.fromCache) }
    : state,
);

sample({
  clock: fileOpened,
  source: $foundSubsStripSdh,
  fn: (stripSdh, file) => ({ ...file, stripSdh, page: currentPage() }),
  target: fileLoadFx,
});
$found.on(fileLoadFx.done, (state, { params, result }) => ({
  ...onPage(state),
  [params.role]: newTrack({ result: result.result, service: "" }, result.captions, true),
}));
$loadError.on(fileLoadFx.failData, (_, error) => error.message).reset(fileLoadFx);

// Loading on the second line turns it on
sample({
  clock: [
    loadFx.done.map(({ params }) => params),
    fileLoadFx.done.map(({ params, result }) => ({ ...params, result: result.result })),
  ],
  source: $secondarySubs,
  filter: (choice, { role }) => role === "second" && choice.language === "off",
  fn: (_, { result }) => ({ language: result.language || "same" }),
  target: secondarySubsChanged,
});

// What OpenSubtitles says is left today
sample({
  clock: loadFx.done,
  source: { quota: $opensubtitlesQuota, session: $opensubtitlesAccount },
  filter: (_, { params, result }) => params.result.source === "opensubtitles" && result.quota?.remaining !== undefined,
  fn: ({ quota, session }, { result }) => ({
    remaining: result.quota.remaining,
    allowed: result.quota.allowed ?? quota?.allowed ?? (session ? 20 : 5),
    resetAt: result.quota.resetAt ?? "",
  }),
  target: opensubtitlesQuotaChanged,
});
// Out of downloads: the count goes to zero and the search runs again, through the mirror
sample({
  clock: loadFx.failData,
  source: { quota: $opensubtitlesQuota, session: $opensubtitlesAccount },
  filter: (_, error) => error.kind === "limit",
  fn: ({ quota, session }, error) => ({
    remaining: 0,
    allowed: error.quota?.allowed ?? quota?.allowed ?? (session ? 20 : 5),
    resetAt: error.quota?.resetAt ?? "",
  }),
  target: opensubtitlesQuotaChanged,
});
sample({ clock: loadFx.failData, filter: (error) => error.kind === "limit", target: searchRequested });
// The show of an episode, for its next one
sample({
  clock: loadFx.done,
  source: $foundSubsShows,
  filter: (_, { params }) => params.episodeOf !== undefined,
  fn: (shows, { params }): Record<string, TFoundShow> => {
    const episodeOf = params.episodeOf as TEpisodeOf;
    return {
      ...shows,
      [showKey(episodeOf.title)]: {
        ...episodeOf,
        language: params.result.language,
        role: params.role,
        source: params.result.source,
        group: releaseGroup(params.result.release),
      },
    };
  },
  target: $foundSubsShows,
});

// ---- Auto-sync -----------------------------------------------------------------------------------

const autoSyncSource = {
  found: $found,
  streaming: $streaming,
  serviceLabel: $serviceSubsLabel,
  serviceCues: $serviceRawSubs,
  mainCues: $rawSubs,
};

// Right after loading, unless the release is the service's own
for (const role of ["main", "second"] as const) {
  sample({
    clock: $found.updates,
    source: autoSyncSource,
    filter: ({ found }) => found[role]?.sync === "pending",
    fn: ({ found, streaming, serviceLabel, serviceCues, mainCues }) => ({
      role,
      captions: (found[role] as TFoundTrack).captions,
      auto: true,
      streaming,
      serviceLabel,
      serviceCues,
      mainCues,
    }),
    target: autoSyncFx,
  });
}
// The button: any time, applying what it finds
sample({
  clock: autoSyncRequested,
  source: autoSyncSource,
  filter: ({ found }, role) => found[role] !== null && found[role]?.sync !== "running",
  fn: ({ found, streaming, serviceLabel, serviceCues, mainCues }, role) => ({
    role,
    captions: (found[role] as TFoundTrack).captions,
    auto: false,
    streaming,
    serviceLabel,
    serviceCues,
    mainCues,
  }),
  target: autoSyncFx,
});
$found.on(autoSyncFx, (state, { role, captions }) =>
  withTrack(state, role, (track) => (track.captions === captions ? { ...track, sync: "running" } : track)),
);
$found.on(autoSyncFx.done, (state, { params, result }) =>
  withTrack(state, params.role, (track) => {
    if (track.captions !== params.captions) return track;
    if (!result) return { ...track, sync: "no-reference" };
    if (params.auto && !result.confident) return { ...track, synced: result, sync: "unsure" };
    const timing = { shift: result.shift, rate: result.rate };
    return {
      ...track,
      synced: result,
      timing,
      before: isSameTiming(timing, track.timing) ? null : track.timing,
      sync: "done",
    };
  }),
);
$found.on(autoSyncFx.fail, (state, { params }) =>
  withTrack(state, params.role, (track) =>
    track.captions === params.captions ? { ...track, sync: "no-reference" } : track,
  ),
);

$found.on(syncUndone, (state, role) =>
  withTrack(state, role, (track) =>
    track.before ? { ...track, timing: track.before, before: null, sync: "none" } : track,
  ),
);
$found.on(shiftNudged, (state, { role, delta }) =>
  withTrack(state, role, (track) => ({
    ...track,
    timing: { ...track.timing, shift: Math.round((track.timing.shift + delta) * 100) / 100 },
  })),
);
// The delay buttons move found lines too, and the saved timing keeps it
$found.on(subsResyncFx.done, (state, { params }) => {
  if (state.page !== currentPage()) return state;
  const delta = params.delay - params.subsDelay;
  const move = (track: TFoundTrack) => ({
    ...track,
    timing: { ...track.timing, shift: Math.round((track.timing.shift + delta) * 100) / 100 },
  });
  return { ...state, main: state.main && move(state.main), second: state.second && move(state.second) };
});
$found.on(foundRemoved, (state, role) => ({ ...state, [role]: null }));

// ---- The main line -------------------------------------------------------------------------------

applyMainFx.use(({ label, captions, remount }) => {
  ownSubsLoaded({ label, captions });
  if (remount) esSubsChanged(label);
});
$appliedMain.on(applyMainFx, (_, { label }) => ({ label, page: currentPage() }));
$pinnedSubs.on(applyMainFx, (_, { label }) => ({ label, page: currentPage() }));

// A new file re-renders the subtitles; a new timing only replaces the lines
sample({
  clock: $foundMainCaptions.updates,
  source: { found: $found, applied: $appliedMain, rawSubs: $rawSubs },
  filter: ({ found, applied, rawSubs }, captions) => {
    if (captions === null || found.main === null || found.page !== currentPage()) return false;
    const remount = applied?.label !== foundLabel(found.main.result) || applied?.page !== found.page;
    return remount || !sameCaptions(captions, rawSubs);
  },
  fn: ({ found, applied }, captions) => {
    const label = foundLabel((found.main as TFoundTrack).result);
    return { label, captions: captions ?? [], remount: applied?.label !== label || applied?.page !== found.page };
  },
  target: applyMainFx,
});

// The service changing its own track doesn't replace a found main line
sample({
  clock: esSubsChanged,
  source: { found: $found, applied: $appliedMain, captions: $foundMainCaptions },
  filter: ({ found, applied, captions }, label) =>
    found.main !== null &&
    captions !== null &&
    applied !== null &&
    applied.page === currentPage() &&
    label !== applied.label,
  fn: ({ applied, captions }) => ({ label: applied?.label ?? "", captions: captions ?? [], remount: true }),
  target: applyMainFx,
});

// Removing it goes back to the service's track
serviceTrackRestoreFx.use((label) => {
  esSubsChanged(label);
});
sample({
  clock: foundRemoved,
  source: $serviceSubsLabel,
  filter: (_, role) => role === "main",
  target: serviceTrackRestoreFx,
});
sample({ clock: serviceTrackRequested, source: $serviceSubsLabel, target: serviceTrackRestoreFx });
$appliedMain.on(foundRemoved, (applied, role) => (role === "main" ? null : applied));
$pinnedSubs.on(foundRemoved, (pinned, role) => (role === "main" ? null : pinned));

// ---- Videos --------------------------------------------------------------------------------------

// Another video: what was loaded on the last one stays with it, and what was loaded on this one comes back
// Noticed with the subtitles' events, and while the video plays: a service may switch videos without them (YouTube
// with captions off)
const pageChecked = sample({
  clock: [fetchSubsFx.finally, resetSubs, esSubsChanged, videoTimeUpdate],
  fn: () => currentPage(),
});
const pageLeft = sample({
  clock: pageChecked,
  source: $found,
  filter: (found, page) => found.page !== page,
  fn: (found, page) => ({ page, hadMain: found.main !== null && found.page !== "" }),
});
const videoChanged = pageLeft.map(({ page }) => page);
$found.on(videoChanged, (_, page) => ({ page, main: null, second: null }));
$appliedMain.reset(videoChanged);
$pinnedSubs.reset(videoChanged);
// The last video's found main line isn't shown over this one; the service's own track comes when it announces it
sample({ clock: pageLeft, filter: ({ hadMain }) => hadMain, fn: () => "", target: resetSubs });
$nextEpisodeOffer.on(videoChanged, (offer, page) => (offer?.page === page ? offer : null));

sample({
  clock: videoChanged,
  source: {
    videos: $foundSubsByVideo,
    streaming: $streaming,
    stripSdh: $foundSubsStripSdh,
    credentials: $credentials,
  },
  filter: ({ videos, streaming }, page) => Boolean(videos[videoKey(streaming.name, page)]),
  fn: ({ videos, streaming, stripSdh, credentials }, page) => ({
    page,
    video: videos[videoKey(streaming.name, page)],
    stripSdh,
    credentials,
  }),
  target: restoreFx,
});
$found.on(restoreFx.doneData, (state, restored) =>
  state.page === restored.page
    ? { ...state, main: state.main ?? restored.main ?? null, second: state.second ?? restored.second ?? null }
    : state,
);
// A main line that couldn't come back: the service's track, which the old pin may have kept out
sample({
  clock: restoreFx.doneData,
  source: $serviceSubsLabel,
  filter: (label, restored) => restored.hadMain && !restored.main && restored.page === currentPage() && Boolean(label),
  target: serviceTrackRestoreFx,
});

// What's loaded on the video, saved whenever it changes
const choice = (track: TFoundTrack | null): TFoundChoice | undefined =>
  track ? { result: track.result, shift: track.timing.shift, rate: track.timing.rate } : undefined;
sample({
  clock: [loadFx.done, fileLoadFx.done, autoSyncFx.done, syncUndone, shiftNudged, foundRemoved, subsResyncFx.done],
  source: { found: $found, videos: $foundSubsByVideo, streaming: $streaming },
  filter: ({ found }) => found.page !== "" && found.page === currentPage(),
  fn: ({ found, videos, streaming }) =>
    rememberVideo(videos, videoKey(streaming.name, found.page), {
      main: choice(found.main),
      second: choice(found.second),
      at: Date.now(),
    } satisfies TFoundVideo),
  target: $foundSubsByVideo,
});

// ---- Next episode --------------------------------------------------------------------------------

// A video nothing was loaded on: its title, when the setting asks for next episodes
sample({
  clock: videoChanged,
  source: { videos: $foundSubsByVideo, streaming: $streaming, mode: $foundSubsNextEpisode, shows: $foundSubsShows },
  filter: ({ videos, streaming, mode, shows }, page) =>
    mode !== "off" && Object.keys(shows).length > 0 && !videos[videoKey(streaming.name, page)],
  fn: ({ streaming }, page) => ({ streaming, page }),
  target: nextTitleFx,
});

const isNextEpisode = (show: TFoundShow, info: TTitleInfo) =>
  info.type === "episode" &&
  info.season !== undefined &&
  info.episode !== undefined &&
  ((info.season === show.season && info.episode === show.episode + 1) ||
    (info.season === show.season + 1 && info.episode === 1));

sample({
  clock: nextTitleFx.doneData,
  source: {
    shows: $foundSubsShows,
    streaming: $streaming,
    addic7ed: $foundSubsAddic7ed,
    mirror: $foundSubsMirror,
    quota: $opensubtitlesQuota,
    credentials: $credentials,
  },
  filter: ({ shows }, { info, page }) =>
    page === currentPage() &&
    Boolean(info && shows[showKey(info.title)] && isNextEpisode(shows[showKey(info.title)], info)),
  fn: ({ shows, streaming, addic7ed, mirror, quota, credentials }, { info, page }) => {
    const title = info as TTitleInfo;
    const show = shows[showKey(title.title)];
    return {
      episodeOf: {
        title: title.title,
        imdbId: title.imdbId ?? show.imdbId,
        season: title.season ?? 0,
        episode: title.episode ?? 0,
      },
      language: show.language,
      request: { sources: enabledSources(addic7ed), mirror, limitReached: isLimitReached(quota) },
      service: streaming.name,
      group: show.group,
      credentials,
      page,
    };
  },
  target: nextEpisodeFx,
});

sample({
  clock: nextEpisodeFx.done,
  source: { mode: $foundSubsNextEpisode, shows: $foundSubsShows },
  // Only for the episode still playing
  filter: (_, { params, result }) => result !== null && params.page === currentPage(),
  fn: ({ shows }, { params, result }) => ({
    result: result?.result as NonNullable<typeof result>["result"],
    role: shows[showKey(params.episodeOf.title)]?.role ?? "main",
    episodeOf: result?.episodeOf as TEpisodeOf,
    page: params.page,
  }),
  target: $nextEpisodeOffer,
});
// Set to Load: no question
sample({
  clock: $nextEpisodeOffer.updates,
  source: $foundSubsNextEpisode,
  filter: (mode, offer) => mode === "load" && offer !== null,
  fn: (_, offer) => offer as NonNullable<typeof offer>,
  target: [loadRequested, nextEpisodeDismissed],
});
sample({
  clock: nextEpisodeAccepted,
  source: $nextEpisodeOffer,
  filter: Boolean,
  fn: (offer) => offer as NonNullable<typeof offer>,
  target: [loadRequested, nextEpisodeDismissed],
});
$nextEpisodeOffer.reset(nextEpisodeDismissed);

debug($found, $sheet, $query, searchFx.doneData, loadFx.failData, autoSyncFx.doneData, $nextEpisodeOffer);
