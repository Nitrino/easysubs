import { afterEach, describe, expect, it, vi } from "vitest";
import { strToU8, zipSync } from "fflate";

import { json, stubFetch } from "@root/test/fetch";
import { downloadFailure, downloadSubtitle, searchSubtitles } from ".";
import { opensubtitles, opensubtitlesLanguages, opensubtitlesLogin, opensubtitlesSearchParams } from "./opensubtitles";
import { mirrorLanguage, stremio } from "./stremio";
import { gestdown, pickShow } from "./gestdown";
import { subdl, subdlLanguage } from "./subdl";
import { subsource, subsourceLanguage } from "./subsource";
import { jimaku } from "./jimaku";
import { lookupTitle, pickCandidate } from "./cinemeta";
import { isSameServiceRelease, rankResults, releaseGroup } from "./rank";
import { SourceError, type TSubsQuery } from "./types";
import { readSession, sessionAuth, signIn, signOut } from "./session";
import type { TFoundResult } from "@src/models/types";

const SRT = "1\n00:00:01,000 --> 00:00:03,500\n¡Hola!\n";
const EPISODE: TSubsQuery = {
  title: "Dark",
  type: "episode",
  imdbId: "tt5753856",
  season: 1,
  episode: 2,
  language: "es",
};
const MOVIE: TSubsQuery = { title: "The Matrix", type: "movie", imdbId: "tt0133093", year: 1999, language: "en" };
const text = (body: string, status = 200) => new Response(body, { status });

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("OpenSubtitles", () => {
  const withKey = () => vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");

  it("asks with sorted parameters and the show's id for an episode", () => {
    expect(String(opensubtitlesSearchParams(EPISODE))).toBe(
      "episode_number=2&languages=es&parent_imdb_id=5753856&season_number=1",
    );
    expect(String(opensubtitlesSearchParams(MOVIE))).toBe("imdb_id=133093&languages=en");
    expect(String(opensubtitlesSearchParams({ title: "Dark", type: "episode", season: 1, language: "en" }))).toBe(
      "languages=en&query=dark&season_number=1&type=episode",
    );
  });

  it("names languages its way", () => {
    expect(opensubtitlesLanguages("pt")).toBe("pt-br,pt-pt");
    expect(opensubtitlesLanguages("zh-TW")).toBe("zh-tw");
    expect(opensubtitlesLanguages("zh-CN")).toBe("zh-cn");
  });

  it("isn't available without the app's key", async () => {
    expect(opensubtitles.isAvailable({})).toBe(false);
    await expect(opensubtitles.search(MOVIE, {})).rejects.toMatchObject({ kind: "unavailable" });
  });

  it("maps its results, flagging machine and AI translations", async () => {
    withKey();
    const fetchMock = stubFetch({
      "https://api.opensubtitles.com/api/v1/subtitles": () =>
        json({
          data: [
            {
              id: "1",
              attributes: {
                language: "es",
                release: "Dark.S01E02.1080p.NF.WEB-DL",
                download_count: 1200,
                hearing_impaired: false,
                ai_translated: true,
                fps: 23.976,
                from_trusted: true,
                files: [{ file_id: 777, file_name: "dark.srt" }],
              },
            },
            { id: "2", attributes: { language: "es", files: [] } },
          ],
        }),
    });

    expect(await opensubtitles.search(EPISODE, { opensubtitlesToken: "token" })).toEqual([
      {
        source: "opensubtitles",
        id: "777",
        language: "es",
        release: "Dark.S01E02.1080p.NF.WEB-DL",
        fps: 23.976,
        downloads: 1200,
        hearingImpaired: false,
        machineTranslated: true,
        trusted: true,
      },
    ]);
    const headers = fetchMock.mock.calls[0][1].headers as Record<string, string>;
    expect(headers).toMatchObject({
      "Api-Key": "app-key",
      "X-User-Agent": "EasySubs vdev",
      Authorization: "Bearer token",
    });
  });

  it("downloads through a temporary link and reports what's left today", async () => {
    withKey();
    const fetchMock = stubFetch({
      "https://vip-api.opensubtitles.com/api/v1/download": () =>
        json({
          link: "https://www.opensubtitles.com/download/abc/file.srt",
          remaining: 18,
          requests: 2,
          reset_time_utc: "2026-10-08T00:00:00Z",
        }),
      "https://www.opensubtitles.com/download/": () => text(SRT),
    });
    const result: TFoundResult = { source: "opensubtitles", id: "777", language: "es", release: "" };

    expect(await opensubtitles.download(result, { opensubtitlesBaseUrl: "vip-api.opensubtitles.com" })).toEqual({
      text: SRT,
      remaining: 18,
      allowed: 20,
      resetAt: "2026-10-08T00:00:00Z",
    });
    expect(JSON.parse(String(fetchMock.mock.calls[0][1].body))).toEqual({ file_id: 777 });
  });

  it("says when today's downloads are used", async () => {
    withKey();
    stubFetch({
      "https://api.opensubtitles.com/api/v1/download": () =>
        json(
          { message: "You have downloaded your allowed 5 subtitles", remaining: 0, requests: 5, reset_time_utc: "x" },
          406,
        ),
    });
    const error = await opensubtitles
      .download({ source: "opensubtitles", id: "1", language: "en", release: "" }, {})
      .catch((error) => error);
    expect(error).toBeInstanceOf(SourceError);
    expect(downloadFailure(error)).toEqual({
      error: "Today's OpenSubtitles downloads are used",
      kind: "limit",
      status: 406,
      remaining: 0,
      allowed: 5,
      resetAt: "x",
    });
  });

  it("signs in for a token and the host to use", async () => {
    withKey();
    stubFetch({
      "https://api.opensubtitles.com/api/v1/login": (_, init) => {
        const { password } = JSON.parse(String(init.body));
        return password === "secret"
          ? json({ token: "jwt", base_url: "vip-api.opensubtitles.com", user: { allowed_downloads: 1000 } })
          : json({ message: "Error, invalid username/password" }, 401);
      },
    });
    expect(await opensubtitlesLogin("me", "secret")).toEqual({
      token: "jwt",
      baseUrl: "vip-api.opensubtitles.com",
      allowed: 1000,
    });
    await expect(opensubtitlesLogin("me", "nope")).rejects.toThrow("Wrong username or password");
  });
});

describe("the Stremio mirror", () => {
  it("finds an episode by the show's id and keeps the language asked for", async () => {
    stubFetch({
      "https://opensubtitles-v3.strem.io/subtitles/series/tt5753856:1:2.json": () =>
        json({
          subtitles: [
            {
              id: "1",
              url: "https://subs5.strem.io/a",
              lang: "spa",
              movieReleaseName: "Dark S01E02 WEBRip x264-STRiFE",
              fpsMilli: 23976,
            },
            { id: "2", url: "https://subs5.strem.io/b", lang: "por" },
            { id: "3", url: "https://subs5.strem.io/c", lang: "pob", subtitleFileName: "dark.s01e02.srt" },
          ],
        }),
    });
    expect(await stremio.search(EPISODE, {})).toEqual([
      {
        source: "stremio",
        id: "1",
        language: "es",
        release: "Dark S01E02 WEBRip x264-STRiFE",
        fps: 23.976,
        url: "https://subs5.strem.io/a",
      },
    ]);
    expect(await stremio.search({ ...EPISODE, imdbId: undefined }, {})).toEqual([]);
  });

  it("knows the codes Google doesn't", () => {
    expect(mirrorLanguage("pob")).toBe("pt-BR");
    expect(mirrorLanguage("per")).toBe("fa");
    expect(mirrorLanguage("eng")).toBe("eng");
  });

  it("downloads the file the link points to", async () => {
    stubFetch({ "https://subs5.strem.io/a": () => text(SRT) });
    expect(
      await stremio.download(
        { source: "stremio", id: "1", language: "es", release: "", url: "https://subs5.strem.io/a" },
        {},
      ),
    ).toEqual({ text: SRT });
  });
});

describe("Addic7ed through Gestdown", () => {
  const SHOWS = [
    { id: "a", name: "Are You Afraid of the Dark (2019)" },
    { id: "b", name: "Dark" },
    { id: "c", name: "Doctor Who (2005)" },
    { id: "d", name: "Doctor Who" },
  ];

  it("picks the show of the title, of its year when Addic7ed has several", () => {
    expect(pickShow(SHOWS, "Dark")?.id).toBe("b");
    expect(pickShow(SHOWS, "doctor who", 2005)?.id).toBe("c");
    expect(pickShow(SHOWS, "Doctor Who")?.id).toBe("d");
    expect(pickShow(SHOWS, "Darkness")).toBeUndefined();
  });

  it("finds an episode's subtitles by show, season, episode and language", async () => {
    const fetchMock = stubFetch({
      "https://api.gestdown.info/shows/search/Dark": () => json({ shows: SHOWS }),
      "https://api.gestdown.info/subtitles/get/b/1/2/es": () =>
        json({
          matchingSubtitles: [
            {
              subtitleId: "s1",
              version: "WEBRip.x264-STRiFE",
              completed: true,
              hearingImpaired: false,
              downloadUri: "/subtitles/download/s1",
              downloadCount: 529,
            },
            { subtitleId: "s2", version: "WEB", completed: false, downloadUri: "/subtitles/download/s2" },
          ],
        }),
    });
    expect(await gestdown.search(EPISODE, {})).toEqual([
      {
        source: "gestdown",
        id: "s1",
        language: "es",
        release: "dark S01E02 WEBRip.x264-STRiFE",
        downloads: 529,
        hearingImpaired: false,
        url: "https://api.gestdown.info/subtitles/download/s1",
      },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(await gestdown.search(MOVIE, {})).toEqual([]);
  });

  it("explains a show being refreshed", async () => {
    stubFetch({
      "https://api.gestdown.info/shows/search/Dark": () => json({ shows: SHOWS }),
      "https://api.gestdown.info/subtitles/get/": () => json({}, 423),
    });
    await expect(gestdown.search(EPISODE, {})).rejects.toMatchObject({
      message: "Addic7ed is refreshing this show. Try again in a minute.",
      kind: "unavailable",
    });
  });
});

describe("SubDL", () => {
  it("names languages its way", () => {
    expect(subdlLanguage("es")).toBe("ES");
    expect(subdlLanguage("pt-BR")).toBe("BR_PT");
    expect(subdlLanguage("zh-TW")).toBe("ZH_BG");
  });

  it("searches only with the user's key, and unpacks the episode from a season ZIP", async () => {
    expect(subdl.isAvailable({})).toBe(false);
    const fetchMock = stubFetch({
      "https://api.subdl.com/api/v1/subtitles": () =>
        json({
          status: true,
          subtitles: [{ release_name: "Dark.S01.WEB", url: "/subtitle/1-2.zip", hi: false, season: 1, episode: null }],
        }),
      "https://dl.subdl.com/subtitle/1-2.zip": () =>
        new Response(
          zipSync({
            "Dark.S01E01.srt": strToU8("1\n00:00:01,000 --> 00:00:02,000\nUno\n"),
            "Dark.S01E02.srt": strToU8(SRT),
          }),
        ),
    });

    const [result] = await subdl.search(EPISODE, { subdlApiKey: "user-key" });
    expect(result).toMatchObject({
      source: "subdl",
      release: "Dark.S01.WEB",
      url: "https://dl.subdl.com/subtitle/1-2.zip",
      episode: 2,
    });
    const params = new URL(String(fetchMock.mock.calls[0][0])).searchParams;
    expect(Object.fromEntries(params)).toMatchObject({
      api_key: "user-key",
      languages: "ES",
      type: "tv",
      imdb_id: "tt5753856",
      season_number: "1",
      episode_number: "2",
    });
    expect((await subdl.download(result, {})).text).toBe(SRT);
  });
});

describe("SubSource", () => {
  it("names languages in English", () => {
    expect(subsourceLanguage("es")).toBe("spanish");
    expect(subsourceLanguage("pt-BR")).toBe("brazilian_portuguese");
    expect(subsourceLanguage("pt")).toBe("portuguese");
    expect(subsourceLanguage("fa")).toBe("farsi_persian");
  });

  it("looks the title up, then its subtitles for the episode", async () => {
    stubFetch({
      "https://api.subsource.net/api/v1/movies/search": () =>
        json({ data: [{ movieId: 42, title: "Dark", releaseYear: 2017 }] }),
      "https://api.subsource.net/api/v1/subtitles?": () =>
        json({
          data: [
            { subtitleId: 1, releaseInfo: ["Dark.S01E02.WEB"], downloads: 10 },
            { subtitleId: 2, releaseInfo: "Dark.S01E03.WEB" },
            { subtitleId: 3, releaseInfo: "Dark.S01.Complete" },
          ],
        }),
    });
    const results = await subsource.search(EPISODE, { subsourceApiKey: "user-key" });
    expect(results.map((result) => result.id)).toEqual(["1", "3"]);
  });
});

describe("Jimaku", () => {
  it("only looks for Japanese, with the user's key", async () => {
    const fetchMock = stubFetch({
      "https://jimaku.cc/api/entries/search": () =>
        json([{ id: 7, name: "Sousou no Frieren", english_name: "Frieren" }]),
      "https://jimaku.cc/api/entries/7/files?episode=3": () =>
        json([{ url: "https://jimaku.cc/entry/7/download/ep3.ass", name: "Frieren - 03.ass" }]),
    });
    const query: TSubsQuery = { title: "Frieren", type: "episode", season: 1, episode: 3, language: "ja" };

    expect(await jimaku.search({ ...query, language: "en" }, { jimakuApiKey: "k" })).toEqual([]);
    expect(await jimaku.search(query, { jimakuApiKey: "k" })).toEqual([
      {
        source: "jimaku",
        id: "https://jimaku.cc/entry/7/download/ep3.ass",
        language: "ja",
        release: "Frieren - 03.ass",
        url: "https://jimaku.cc/entry/7/download/ep3.ass",
        episode: 3,
      },
    ]);
    expect((fetchMock.mock.calls[0][1].headers as Record<string, string>).Authorization).toBe("k");
  });
});

describe("Cinemeta", () => {
  it("puts the exact title first, and tries the other catalogue when one has nothing", async () => {
    stubFetch({
      "https://v3-cinemeta.strem.io/catalog/movie/top/search=Dark.json": () => json({ metas: [] }),
      "https://v3-cinemeta.strem.io/catalog/series/top/search=Dark.json": () =>
        json({
          metas: [
            { id: "tt19231492", name: "Dark Matter", releaseInfo: "2024-" },
            { imdb_id: "tt5753856", name: "Dark", releaseInfo: "2017-2020" },
            { id: "kitsu:1", name: "Dark anime" },
          ],
        }),
    });
    const candidates = await lookupTitle({ title: "Dark", type: "movie" });
    expect(candidates).toEqual([
      { imdbId: "tt5753856", name: "Dark", year: 2017, type: "episode" },
      { imdbId: "tt19231492", name: "Dark Matter", year: 2024, type: "episode" },
    ]);
    expect(pickCandidate(candidates, "Dark")?.name).toBe("Dark");
    expect(pickCandidate(candidates, "dark matter!", 2024)?.name).toBe("Dark Matter");
    // A near name is another title: the search goes by the title instead
    expect(pickCandidate(candidates, "Darkness")).toBeUndefined();
  });
});

describe("ranking", () => {
  const result = (release: string, extra: Partial<TFoundResult> = {}): TFoundResult => ({
    source: "opensubtitles",
    id: release,
    language: "es",
    release,
    ...extra,
  });

  it("knows a service's own releases and release groups", () => {
    expect(isSameServiceRelease("The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb", "netflix")).toBe(true);
    expect(isSameServiceRelease("Inferno.2016.1080p.BluRay", "netflix")).toBe(false);
    expect(isSameServiceRelease("Show.S01E01.AMZN.WEB-DL", "amazon")).toBe(true);
    expect(releaseGroup("The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264-NTb")).toBe("NTb");
    expect(releaseGroup("Show S01E01 WEB")).toBeUndefined();
  });

  it("puts the service's release first, then the last group, human translations, trusted uploaders, downloads", () => {
    const ranked = rankResults(
      [
        result("A.BluRay-X", { downloads: 9000, machineTranslated: true }),
        result("B.WEB-Y", { downloads: 10 }),
        result("C.WEB-Z", { downloads: 500, trusted: true }),
        result("D.NF.WEB-DL-W", { downloads: 1 }),
        result("E.BluRay-NTb", { downloads: 2 }),
      ],
      { service: "netflix", group: "ntb" },
    );
    expect(ranked.map((item) => item.release)).toEqual([
      "D.NF.WEB-DL-W",
      "E.BluRay-NTb",
      "C.WEB-Z",
      "B.WEB-Y",
      "A.BluRay-X",
    ]);
  });
});

describe("searchSubtitles", () => {
  const MIRROR_URL = "https://opensubtitles-v3.strem.io/subtitles/series/tt5753856:1:2.json";
  const mirrorAnswer = () =>
    json({ subtitles: [{ id: "m1", url: "https://subs5.strem.io/m1", lang: "spa", movieReleaseName: "Dark.S01E02" }] });
  const openSubtitlesAnswer = () =>
    json({ data: [{ id: "1", attributes: { language: "es", release: "Dark.S01E02.NF", files: [{ file_id: 9 }] } }] });

  it("searches the sources turned on, at once", async () => {
    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    stubFetch({
      "https://api.opensubtitles.com/api/v1/subtitles": openSubtitlesAnswer,
      "https://api.gestdown.info/shows/search/Dark": () => json({ shows: [] }),
    });
    const answer = await searchSubtitles({
      query: EPISODE,
      sources: ["opensubtitles", "gestdown", "subdl"],
      auth: {},
      mirror: true,
    });
    expect(answer).toEqual({
      results: [expect.objectContaining({ source: "opensubtitles", id: "9" })],
      failed: [],
      mirrored: false,
    });
  });

  it("uses the mirror in place of OpenSubtitles when the day's downloads are used", async () => {
    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    stubFetch({ "https://api.opensubtitles.com/api/v1/subtitles": openSubtitlesAnswer, [MIRROR_URL]: mirrorAnswer });
    const answer = await searchSubtitles({
      query: EPISODE,
      sources: ["opensubtitles"],
      auth: {},
      mirror: true,
      limitReached: true,
    });
    expect(answer.results.map((result) => result.source)).toEqual(["stremio"]);
    expect(answer.mirrored).toBe(true);
  });

  it("uses the mirror when OpenSubtitles has no key or doesn't answer, and says what failed otherwise", async () => {
    stubFetch({ [MIRROR_URL]: mirrorAnswer });
    expect(await searchSubtitles({ query: EPISODE, sources: ["opensubtitles"], auth: {}, mirror: true })).toMatchObject(
      {
        results: [{ source: "stremio", id: "m1" }],
        failed: [],
        mirrored: true,
      },
    );

    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    stubFetch({ "https://api.opensubtitles.com/api/v1/subtitles": () => json({}, 503), [MIRROR_URL]: mirrorAnswer });
    expect(
      (await searchSubtitles({ query: EPISODE, sources: ["opensubtitles"], auth: {}, mirror: true })).mirrored,
    ).toBe(true);
    expect(await searchSubtitles({ query: EPISODE, sources: ["opensubtitles"], auth: {}, mirror: false })).toEqual({
      results: [],
      failed: [{ source: "opensubtitles", error: "OpenSubtitles answered 503" }],
      mirrored: false,
    });
  });

  it("downloads from the source of the result", async () => {
    stubFetch({ "https://subs5.strem.io/m1": () => text(SRT) });
    expect(
      await downloadSubtitle({
        result: { source: "stremio", id: "m1", language: "es", release: "", url: "https://subs5.strem.io/m1" },
        auth: {},
      }),
    ).toEqual({ text: SRT });
  });
});

describe("the OpenSubtitles account in the background", () => {
  const login = (token: string) => json({ token, base_url: "api.opensubtitles.com", user: { allowed_downloads: 20 } });

  it("keeps the password and token to itself, and the page gets the username", async () => {
    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    stubFetch({ "https://api.opensubtitles.com/api/v1/login": () => login("first") });

    expect(await signIn("me", "secret")).toEqual({ username: "me", allowed: 20 });
    expect(await readSession()).toMatchObject({ username: "me", password: "secret", token: "first" });
    expect(await sessionAuth()).toEqual({ opensubtitlesToken: "first", opensubtitlesBaseUrl: "api.opensubtitles.com" });

    await signOut();
    expect(await sessionAuth()).toEqual({});
  });

  it("renews a token about to expire with the stored password", async () => {
    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    let token = "first";
    stubFetch({ "https://api.opensubtitles.com/api/v1/login": () => login(token) });
    await signIn("me", "secret");
    const session = await readSession();
    await chrome.storage.local.set({ opensubtitlesSession: { ...session, expiresAt: Date.now() + 1000 } });

    token = "second";
    expect(await sessionAuth()).toMatchObject({ opensubtitlesToken: "second" });
    expect((await readSession())?.expiresAt).toBeGreaterThan(Date.now() + 60 * 60 * 1000);
  });

  it("searches and downloads with its token, renewing one that's refused", async () => {
    vi.stubEnv("VITE_OPENSUBTITLES_API_KEY", "app-key");
    let token = "first";
    const fetchMock = stubFetch({
      "https://api.opensubtitles.com/api/v1/login": () => login(token),
      "https://api.opensubtitles.com/api/v1/subtitles": () => json({ data: [] }),
      "https://api.opensubtitles.com/api/v1/download": (_, init) =>
        (init.headers as Record<string, string>).Authorization === "Bearer second"
          ? json({ link: "https://www.opensubtitles.com/download/x.srt", remaining: 19, requests: 1 })
          : json({ message: "invalid token" }, 401),
      "https://www.opensubtitles.com/download/": () => text(SRT),
    });
    await signIn("me", "secret");

    await searchSubtitles({ query: MOVIE, sources: ["opensubtitles"], auth: {}, mirror: false });
    const searchCall = fetchMock.mock.calls.find(([url]) => String(url).includes("/subtitles?"));
    expect((searchCall?.[1].headers as Record<string, string>).Authorization).toBe("Bearer first");

    token = "second";
    const downloaded = await downloadSubtitle({
      result: { source: "opensubtitles", id: "1", language: "en", release: "" },
      auth: {},
    });
    expect(downloaded).toMatchObject({ text: SRT, remaining: 19 });
  });
});
