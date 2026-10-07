import { afterEach, describe, expect, it, vi } from "vitest";
import Youtube, { youtubeTracks, type YoutubeTrackList } from "./youtube";
import { netflixTitleFromPage, netflixTrack } from "./netflix";
import { inoriginalTitle } from "./inoriginal";
import Coursera from "./coursera";
import KinoPub from "./kinopub";
import { json, stubFetch } from "@root/test/fetch";

// The second subtitle line loads other tracks of the video through each service; these are the services' track lists

describe("Netflix tracks", () => {
  it("reads the kind of a track from its title", () => {
    expect(netflixTrack("es")).toEqual({ label: "es", language: "es", kind: "subtitles" });
    expect(netflixTrack("en[cc]")).toEqual({ label: "en[cc]", language: "en", kind: "cc" });
    expect(netflixTrack("pt-BR-forced")).toEqual({ label: "pt-BR-forced", language: "pt-BR", kind: "forced" });
  });
});

describe("YouTube tracks", () => {
  const LIST: YoutubeTrackList = {
    videoId: "abcdefghijk",
    captionTracks: [
      { languageCode: "en", kind: "", name: "English", isTranslatable: true },
      { languageCode: "en", kind: "asr", name: "English (auto-generated)", isTranslatable: true },
      { languageCode: "es", kind: "", name: "Spanish", isTranslatable: true },
    ],
    translationLanguages: [
      { languageCode: "es", name: "Spanish" },
      { languageCode: "ru", name: "Russian" },
      { languageCode: "en", name: "English" },
    ],
  };
  const MAIN_URL = "https://www.youtube.com/api/timedtext?v=abcdefghijk&lang=en&fmt=json3&pot=token&name=Main&kind=asr";

  afterEach(() => window.history.pushState({}, "", "/"));

  it("lists the other tracks and YouTube's translations into the languages without one", () => {
    expect(youtubeTracks(LIST, { lang: "en", kind: "", tlang: "" })).toEqual([
      { label: "track:en:asr", language: "en", kind: "cc", name: "English (auto-generated)" },
      { label: "track:es", language: "es", kind: "subtitles", name: "Spanish" },
      { label: "tlang:ru", language: "ru", kind: "machine", name: "Russian" },
    ]);
  });

  it("lists the original track when the player shows YouTube's translation", () => {
    const tracks = youtubeTracks(LIST, { lang: "en", kind: "", tlang: "ru" });

    expect(tracks.map((track) => track.label)).toEqual(["track:en", "track:en:asr", "track:es"]);
  });

  it("offers no translations of a track YouTube can't translate", () => {
    const list = { ...LIST, captionTracks: LIST.captionTracks.map((track) => ({ ...track, isTranslatable: false })) };

    expect(youtubeTracks(list, { lang: "en", kind: "", tlang: "" }).map((track) => track.kind)).not.toContain(
      "machine",
    );
  });

  function watchVideo() {
    window.history.pushState({}, "", "/watch?v=abcdefghijk");
    const youtube = new Youtube();
    youtube.init();
    window.dispatchEvent(new CustomEvent("esYoutubeCaptionsData", { detail: MAIN_URL }));
    return youtube;
  }

  it("loads other tracks from the URL the player asked for the main one", async () => {
    const youtube = watchVideo();
    const fetchMock = stubFetch({ "https://www.youtube.com/api/timedtext": () => json({ events: [] }) });

    await youtube.getSubs("tlang:ru");
    await youtube.getSubs("track:es");

    const [translated, spanish] = fetchMock.mock.calls.map(([url]) => new URL(String(url)).searchParams);
    expect(Object.fromEntries(translated)).toMatchObject({ lang: "en", kind: "asr", tlang: "ru", pot: "token" });
    expect(Object.fromEntries(spanish)).toMatchObject({ lang: "es", pot: "token" });
    expect(spanish.has("kind")).toBe(false);
    expect(spanish.has("name")).toBe(false);
  });

  it("asks the page script for the tracks", async () => {
    const youtube = watchVideo();
    const answer = () => window.dispatchEvent(new CustomEvent("esYoutubeTracks", { detail: JSON.stringify(LIST) }));
    window.addEventListener("esYoutubeGetTracks", answer, { once: true });

    const tracks = await youtube.getSubsTracks();

    expect(tracks.map((track) => track.label)).toEqual(["track:en", "track:es", "tlang:ru"]);
  });

  it("lists nothing when the page script doesn't answer", async () => {
    vi.useFakeTimers();
    const youtube = watchVideo();

    const tracks = youtube.getSubsTracks();
    await vi.advanceTimersByTimeAsync(1000);

    expect(await tracks).toEqual([]);
    vi.useRealTimers();
  });
});

describe("Coursera tracks", () => {
  it("lists the languages of the player's tracks", async () => {
    document.body.innerHTML = `
      <video>
        <track srclang="en" label="English" src="/en.vtt">
        <track srclang="es" label="Spanish" src="/es.vtt">
        <track srclang="es" label="Spanish" src="/es-2.vtt">
      </video>`;

    expect(await new Coursera().getSubsTracks()).toEqual([
      { label: "en", language: "en", kind: "subtitles", name: "English" },
      { label: "es", language: "es", kind: "subtitles", name: "Spanish" },
    ]);
  });
});

describe("KinoPub tracks", () => {
  it("lists the subtitles of the HLS manifest by the names the player shows", async () => {
    stubFetch({
      "https://cdn.example/master.m3u8": () =>
        new Response(
          [
            "#EXTM3U",
            '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="sub",NAME="English",LANGUAGE="eng",URI="/en.m3u8"',
            '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="sub",NAME="Русские (форсированные)",LANGUAGE="rus",FORCED=YES,URI="/ru-f.m3u8"',
            '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="sub",NAME="Commentary",URI="/c.m3u8"',
            '#EXT-X-STREAM-INF:BANDWIDTH=1000,SUBTITLES="sub"',
            "/video.m3u8",
          ].join("\n"),
        ),
    });
    const kinopub = new KinoPub();
    Object.assign(kinopub, { videoPlaylistUrl: "https://cdn.example/master.m3u8" });

    expect(await kinopub.getSubsTracks()).toEqual([
      { label: "English", language: "en", kind: "subtitles", name: "English" },
      { label: "Русские (форсированные)", language: "ru", kind: "forced", name: "Русские (форсированные)" },
    ]);
  });
});

// What's playing, for the search for subtitles online
describe("titles", () => {
  const page = (html: string) => new DOMParser().parseFromString(html, "text/html");

  it("reads Netflix's title over the player", () => {
    expect(
      netflixTitleFromPage(page('<div data-uia="video-title"><h4>Dark</h4><span>S1:E2</span><span>Lies</span></div>')),
    ).toEqual({ title: "Dark", type: "episode", season: 1, episode: 2 });
    expect(netflixTitleFromPage(page('<div data-uia="video-title"><h4>Dark</h4><span>E3</span></div>'))).toEqual({
      title: "Dark",
      type: "episode",
      episode: 3,
    });
    expect(netflixTitleFromPage(page('<div data-uia="video-title"><h4>Roma</h4></div>'))).toEqual({
      title: "Roma",
      type: "movie",
    });
    expect(netflixTitleFromPage(page("<div></div>"))).toBeNull();
  });

  it("reads InOriginal's subtitle paths", () => {
    expect(inoriginalTitle("/../../uploads/subtitles/series/new-girl-2011/s1/e1/eng.vtt")).toEqual({
      title: "New Girl",
      type: "episode",
      year: 2011,
      season: 1,
      episode: 1,
    });
    expect(inoriginalTitle("/uploads/subtitles/films/the-matrix-1999/eng.vtt")).toEqual({
      title: "The Matrix",
      type: "movie",
      year: 1999,
    });
    expect(inoriginalTitle("/somewhere/else.vtt")).toBeNull();
  });
});
