import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import { NIGHT_TRAIN_IMDB_ID, resetMockSubtitles } from "@root/playground/src/mockSubtitles";
import {
  $found,
  $foundSecondCaptions,
  $nextEpisodeOffer,
  $query,
  $results,
  $searchMirrored,
  $sheet,
  autoSyncRequested,
  foundRemoved,
  loadRequested,
  sheetOpened,
  shiftNudged,
  syncUndone,
  fileOpened,
  loginFx,
  signedOut,
  nextEpisodeAccepted,
} from ".";
import { $currentSecondarySubs, $secondarySource } from "../secondarySubs";
import { $pinnedSubs, $rawSubs, $subsTitle, esSubsChanged, subsReloadRequested } from "../subs";
import { $streaming } from "../streamings";
import { $video } from "../videos";
import {
  $foundSubsByVideo,
  $foundSubsNextEpisode,
  $foundSubsShows,
  $opensubtitlesAccount,
  $opensubtitlesQuota,
  $secondarySubs,
  $translateLanguage,
} from "../settings";
import type { Captions, TFoundResult, TTitleInfo } from "../types";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { sentMessages } from "@root/test/chrome";
import { stubFetch } from "@root/test/fetch";
import { videoPageKey } from "@src/utils/translationCache";
import type Service from "@src/streamings/service";

const NIGHT_TRAIN: TTitleInfo = { title: "The Night Train", type: "episode", season: 1, episode: 2 };
const PAGE = () => `test:${videoPageKey(location)}`;
const texts = (captions: Captions | { text: string }[]) => captions.map((cue) => cue.text);

// The playground's subtitle files, which the mock background serves as found files
const servePlaygroundSubs = () =>
  stubFetch({
    "/subs/": (url) =>
      new Response(readFileSync(resolve(import.meta.dirname, "../../../playground/public", url.slice(1)), "utf8")),
  });

function setup({
  service = {} as Partial<Service>,
  title = NIGHT_TRAIN as TTitleInfo | null,
  values = [] as [unknown, unknown][],
} = {}) {
  const streaming = createService({
    getSubsTracks: vi.fn(async () => [
      { label: "en", language: "en", kind: "subtitles" as const },
      { label: "es", language: "es", kind: "subtitles" as const },
    ]),
    getTitle: vi.fn(async () => title),
    ...service,
  });
  const scope = fork({
    values: [
      [$streaming, streaming],
      [$video, createVideo({ currentTime: 5 })],
      [$translateLanguage, "ru"],
      ...(values as never[]),
    ],
  });
  const showEnglish = () => allSettled(esSubsChanged, { scope, params: "en" });
  const search = async (language = "es") => {
    await allSettled(sheetOpened, { scope, params: { role: "second", language } });
    return scope.getState($results);
  };
  const load = (result: TFoundResult, role: "main" | "second") =>
    allSettled(loadRequested, { scope, params: { result, role } });
  return { scope, streaming, showEnglish, search, load };
}

const byId = (results: TFoundResult[], id: string) => results.find((result) => result.id.endsWith(id)) as TFoundResult;

beforeEach(() => {
  resetMockSubtitles();
  servePlaygroundSubs();
});

afterEach(() => {
  window.history.pushState({}, "", "/");
});

describe("searching", () => {
  it("reads the title playing, looks up its id and searches", async () => {
    const { scope, streaming, showEnglish, search } = setup();
    await showEnglish();

    const results = await search();

    expect(streaming.getTitle).toHaveBeenCalledTimes(1);
    expect(scope.getState($sheet)).toEqual({ role: "second", view: "search" });
    expect(scope.getState($query)).toMatchObject({ ...NIGHT_TRAIN, imdbId: NIGHT_TRAIN_IMDB_ID, language: "es" });
    expect(sentMessages("searchSubtitles")).toMatchObject([
      {
        query: { imdbId: NIGHT_TRAIN_IMDB_ID, season: 1, episode: 2, language: "es" },
        sources: ["opensubtitles", "gestdown", "subdl", "subsource", "jimaku"],
        mirror: true,
        limitReached: false,
      },
    ]);
    expect(results.map((result) => [result.source, result.id])).toEqual([
      // Trusted first, then by downloads; machine translations last
      ["opensubtitles", "1001"],
      ["gestdown", "a7-1002"],
      ["opensubtitles", "1003"],
      ["opensubtitles", "1004"],
    ]);
  });

  it("opens with the main subtitles' language for the main line, and reads the title once per video", async () => {
    const { scope, streaming, showEnglish } = setup();
    await showEnglish();

    await allSettled(sheetOpened, { scope, params: { role: "main" } });
    await allSettled(sheetOpened, { scope, params: { role: "main" } });

    expect(scope.getState($query).language).toBe("en");
    expect(streaming.getTitle).toHaveBeenCalledTimes(1);
  });
});

describe("the second line", () => {
  it("loads a file, turns the line on and syncs it to the main subtitles", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    const results = await search();

    await load(byId(results, "a7-1002"), "second");

    expect(scope.getState($secondarySubs)).toEqual({ language: "es" });
    expect(scope.getState($secondarySource)).toMatchObject({ type: "found", result: { id: "a7-1002" } });
    expect(scope.getState($found).second).toMatchObject({
      sync: "done",
      timing: { shift: -2.4, rate: 1 },
      before: { shift: 0, rate: 1 },
    });
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: "Casi. Solo tengo que buscar mis llaves.", pending: false },
    ]);
    // Addic7ed counts nothing
    expect(scope.getState($opensubtitlesQuota)).toBeNull();
  });

  it("undoes Auto-sync and moves by hand", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    await load(byId(await search(), "a7-1002"), "second");

    await allSettled(syncUndone, { scope, params: "second" });
    expect(scope.getState($found).second?.timing).toEqual({ shift: 0, rate: 1 });
    // 2.4 s late, each Spanish line pairs with the English one after it
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: "¡Hola! ¿Estás lista para salir?", pending: false },
    ]);

    await allSettled(shiftNudged, { scope, params: { role: "second", delta: -0.25 } });
    expect(scope.getState($found).second?.timing.shift).toBe(-0.25);
    await allSettled(autoSyncRequested, { scope, params: "second" });
    expect(scope.getState($found).second?.timing.shift).toBe(-2.4);
  });

  it("goes back to the chosen source when the file is removed", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    await load(byId(await search(), "a7-1002"), "second");

    await allSettled(foundRemoved, { scope, params: "second" });

    expect(scope.getState($secondarySource)).toMatchObject({ type: "track", track: { label: "es" } });
  });
});

describe("the main line", () => {
  it("replaces the service's subtitles, stretched for 25 fps, and keeps them when the service changes track", async () => {
    const { scope, streaming, showEnglish, search, load } = setup();
    await showEnglish();
    const results = await search();

    await load(byId(results, "1003"), "main");

    expect(scope.getState($found).main).toMatchObject({ sync: "done", timing: { shift: -1.67, rate: 25 / 23.976 } });
    expect(scope.getState($subsTitle)).toBe("found:opensubtitles:1003");
    expect(scope.getState($pinnedSubs)).toEqual({ label: "found:opensubtitles:1003", page: videoPageKey(location) });
    expect(texts(scope.getState($rawSubs))[0]).toBe("¡Hola! ¿Estás lista para salir?");
    expect(Number(scope.getState($rawSubs)[0].start)).toBeCloseTo(1000, -1);
    expect(scope.getState($opensubtitlesQuota)).toEqual({ remaining: 4, allowed: 5, resetAt: "" });

    vi.mocked(streaming.getSubs).mockClear();
    await allSettled(esSubsChanged, { scope, params: "es" });
    expect(streaming.getSubs).not.toHaveBeenCalledWith("es");
    expect(scope.getState($subsTitle)).toBe("found:opensubtitles:1003");
    expect(texts(scope.getState($rawSubs))[0]).toBe("¡Hola! ¿Estás lista para salir?");
  });

  it("skips Auto-sync for a release of the service itself", async () => {
    const { scope, showEnglish, search, load } = setup({ service: { name: "netflix" } });
    await showEnglish();

    await load(byId(await search(), "1001"), "main");

    expect(scope.getState($found).main).toMatchObject({ sync: "skipped", timing: { shift: 0, rate: 1 } });
  });

  it("goes back to the service's track when removed", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    await load(byId(await search(), "1003"), "main");

    await allSettled(foundRemoved, { scope, params: "main" });

    expect(scope.getState($pinnedSubs)).toBeNull();
    expect(scope.getState($subsTitle)).toBe("en");
    expect(texts(scope.getState($rawSubs))[1]).toBe("Almost. I just need to pick up my keys.");
  });

  it("takes a file the user opened", async () => {
    const { scope, showEnglish } = setup();
    await showEnglish();

    await allSettled(fileOpened, {
      scope,
      params: { name: "mine.srt", text: "1\n00:00:01,000 --> 00:00:09,000\nA line from my own file.\n", role: "main" },
    });

    expect(scope.getState($subsTitle)).toBe("found:file:mine.srt:57");
    expect(texts(scope.getState($rawSubs))).toEqual(["A line from my own file."]);
  });
});

describe("OpenSubtitles downloads", () => {
  it("count down, and when they're used the search goes through the mirror", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    const results = await search();
    const ids = ["1001", "1003", "1004"];

    for (let day = 0; day < 5; day++)
      await load({ ...byId(results, ids[day % 3]), id: `${ids[day % 3]}-${day}` }, "main");
    expect(scope.getState($opensubtitlesQuota)?.remaining).toBe(0);

    await load({ ...byId(results, "1001"), id: "1001-again" }, "main");

    expect(scope.getState($opensubtitlesQuota)).toMatchObject({ remaining: 0 });
    expect(sentMessages("searchSubtitles").at(-1)).toMatchObject({ limitReached: true });
    expect(scope.getState($searchMirrored)).toBe(true);
    expect(scope.getState($results).map((result) => result.source)).toContain("stremio");
  });

  it("loading a file again costs nothing", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();
    const result = byId(await search(), "1003");

    await load(result, "main");
    await load(result, "second");

    expect(sentMessages("downloadSubtitle")).toHaveLength(1);
    expect(scope.getState($found).second?.fromCache).toBe(true);
  });

  it("are 20 a day after signing in; the page learns only the username", async () => {
    const { scope, showEnglish, search, load } = setup();
    await showEnglish();

    await allSettled(loginFx, { scope, params: { username: "me", password: "secret" } });
    expect(scope.getState($opensubtitlesAccount)).toEqual({ username: "me" });
    await load(byId(await search(), "1001"), "main");

    expect(JSON.stringify(sentMessages("downloadSubtitle"))).not.toContain("token");
    expect(scope.getState($opensubtitlesQuota)).toEqual({ remaining: 19, allowed: 20, resetAt: "" });

    await allSettled(signedOut, { scope });
    expect(scope.getState($opensubtitlesAccount)).toBeNull();
    expect(sentMessages("opensubtitlesLogout")).toHaveLength(1);
  });
});

describe("another video", () => {
  it("doesn't get a file that arrives after it started", async () => {
    const { scope, showEnglish, search } = setup();
    await showEnglish();
    const result = byId(await search(), "1003");

    const loading = allSettled(loadRequested, { scope, params: { result, role: "main" } });
    window.history.pushState({}, "", "/next-video");
    await loading;

    expect(scope.getState($found).main).toBeNull();
    expect(scope.getState($pinnedSubs)).toBeNull();
  });

  it("moves found lines for the service's ad breaks", async () => {
    let adBreak = 0;
    const { scope, showEnglish, search, load } = setup({
      service: {
        adjustCaptions: (captions) =>
          captions.map((cue) => ({ ...cue, start: Number(cue.start) + adBreak, end: Number(cue.end) + adBreak })),
      },
    });
    await showEnglish();
    await load(byId(await search(), "1001"), "second");
    const before = Number(scope.getState($foundSecondCaptions)?.[0].start);

    adBreak = 30_000;
    await allSettled(subsReloadRequested, { scope });

    expect(Number(scope.getState($foundSecondCaptions)?.[0].start)).toBe(before + 30_000);
  });
});

describe("another visit of the video", () => {
  it("brings back what was loaded on it, with its timing, without downloading", async () => {
    const first = setup();
    await first.showEnglish();
    await first.load(byId(await first.search(), "1003"), "main");
    const saved = first.scope.getState($foundSubsByVideo);
    expect(saved[PAGE()]).toMatchObject({ main: { result: { id: "1003" }, shift: -1.67 } });

    const second = setup({ values: [[$foundSubsByVideo, saved]] });
    await second.showEnglish();
    await allSettled(second.scope);

    expect(second.scope.getState($found).main).toMatchObject({ sync: "restored", timing: { shift: -1.67 } });
    expect(second.scope.getState($subsTitle)).toBe("found:opensubtitles:1003");
    expect(sentMessages("downloadSubtitle")).toHaveLength(1);
  });
});

describe("the next episode", () => {
  const show = {
    title: "The Night Train",
    imdbId: NIGHT_TRAIN_IMDB_ID,
    season: 1,
    episode: 1,
    language: "es",
    role: "second" as const,
    source: "opensubtitles" as const,
    group: "NTb",
  };

  it("is offered when it starts, in the language and source of the last one", async () => {
    const { scope, showEnglish } = setup({ values: [[$foundSubsShows, { "the night train": show }]] });

    await showEnglish();

    expect(scope.getState($nextEpisodeOffer)).toMatchObject({
      role: "second",
      result: { id: "1001", release: "The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb" },
      episodeOf: { season: 1, episode: 2 },
    });

    await allSettled(nextEpisodeAccepted, { scope });
    expect(scope.getState($found).second?.result.id).toBe("1001");
    expect(scope.getState($nextEpisodeOffer)).toBeNull();
    expect(scope.getState($foundSubsShows)["the night train"]).toMatchObject({ episode: 2, group: "NTb" });
  });

  it("is loaded without a question when set to Load, and not looked for when Off", async () => {
    const load = setup({
      values: [
        [$foundSubsShows, { "the night train": show }],
        [$foundSubsNextEpisode, "load"],
      ],
    });
    await load.showEnglish();
    expect(load.scope.getState($found).second?.result.id).toBe("1001");

    const off = setup({
      values: [
        [$foundSubsShows, { "the night train": show }],
        [$foundSubsNextEpisode, "off"],
      ],
    });
    await off.showEnglish();
    expect(off.streaming.getTitle).not.toHaveBeenCalled();
  });

  it("isn't offered for an episode that doesn't follow", async () => {
    const { scope, showEnglish } = setup({
      values: [[$foundSubsShows, { "the night train": { ...show, episode: 5 } }]],
    });
    await showEnglish();
    expect(scope.getState($nextEpisodeOffer)).toBeNull();
  });
});
