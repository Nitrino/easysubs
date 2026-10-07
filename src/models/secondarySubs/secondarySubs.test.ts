import { afterEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $currentSecondarySubs,
  $otherTracks,
  $secondaryError,
  $secondaryHidden,
  $secondaryRawSubs,
  $secondarySource,
  secondaryLineToggled,
} from ".";
import { esSubsChanged, rawSubsAdded, subsDelayButtonPressed, subsReloadRequested } from "../subs";
import { $streaming } from "../streamings";
import { $video, videoTimeUpdate } from "../videos";
import { $secondarySubs, $secondarySubsTranslator, $translateLanguage, secondarySubsChanged } from "../settings";
import type { Captions, TSecondaryChoice, TSubsTrack } from "../types";
import { captions, offlineTranslations, playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { chromeMock, sentMessages } from "@root/test/chrome";
import { stubChromeTranslator } from "@root/test/chromeTranslator";
import type Service from "@src/streamings/service";

const PLAYGROUND_TRACKS: TSubsTrack[] = [
  { label: "en", language: "en", kind: "subtitles" },
  { label: "es", language: "es", kind: "subtitles" },
];

const russian = (line: string) => offlineTranslations("en-ru").lines[line];
const texts = (lines: { text: string }[]) => lines.map((line) => line.text);
const batches = () => sentMessages("translateBatch") as unknown as { texts: string[]; language: string }[];

// A cue every 3 s for 10 minutes
const LONG_FILM: Captions = Array.from({ length: 200 }, (_, index) => ({
  start: index * 3000,
  end: index * 3000 + 2500,
  text: `Line number ${index}`,
}));

function setup({
  choice = { language: "es" } as TSecondaryChoice,
  currentTime = 5,
  service = {} as Partial<Service>,
} = {}) {
  const streaming = createService({ getSubsTracks: vi.fn(async () => PLAYGROUND_TRACKS), ...service });
  const video = createVideo({ currentTime, paused: false });
  const scope = fork({
    values: [
      [$streaming, streaming],
      [$video, video],
      [$secondarySubs, choice],
      [$translateLanguage, "ru"],
    ],
  });
  const showEnglish = () => allSettled(esSubsChanged, { scope, params: "en" });
  return { scope, streaming, video, showEnglish };
}

afterEach(() => {
  vi.useRealTimers();
  window.history.pushState({}, "", "/");
});

describe("second line from a track of the video", () => {
  it("shows the Spanish track under the English subtitles", async () => {
    const { scope, streaming, showEnglish } = setup();

    await showEnglish();

    expect(streaming.getSubs).toHaveBeenCalledWith("es");
    expect(scope.getState($secondarySource)).toMatchObject({ type: "track", track: { label: "es" } });
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: "Casi. Solo tengo que buscar mis llaves.", pending: false },
    ]);
    expect(batches()).toHaveLength(0);
  });

  it("follows the video time, empty where the track has no line", async () => {
    const { scope, video, showEnglish } = setup();
    await showEnglish();

    video.currentTime = 15;
    await allSettled(videoTimeUpdate, { scope });

    // "She always says that…" has no Spanish line
    expect(scope.getState($currentSecondarySubs)).toEqual([{ text: "", pending: false }]);
  });

  it("leaves the main track out of the video's other tracks", async () => {
    const { scope, showEnglish } = setup();

    await showEnglish();

    expect(scope.getState($otherTracks)).toEqual([PLAYGROUND_TRACKS[1]]);
  });

  it("loads the second track again with the main one", async () => {
    const { scope, streaming, showEnglish } = setup();
    await showEnglish();

    await allSettled(subsReloadRequested, { scope });

    expect(vi.mocked(streaming.getSubs).mock.calls.filter(([label]) => label === "es")).toHaveLength(2);
  });

  it("moves both tracks with the delay buttons", async () => {
    const { scope, showEnglish } = setup();
    await showEnglish();

    await allSettled(subsDelayButtonPressed, { scope, params: 1 });

    expect(scope.getState($secondaryRawSubs)[0].start).toBe(Number(playgroundCaptions("es")[0].start) + 1000);
  });

  it("gives a track picked after a delay the same delay", async () => {
    const { scope, showEnglish } = setup({ choice: { language: "off" } });
    await showEnglish();
    await allSettled(subsDelayButtonPressed, { scope, params: 2 });

    await allSettled(secondarySubsChanged, { scope, params: { language: "es" } });

    expect(scope.getState($secondaryRawSubs)[0].start).toBe(Number(playgroundCaptions("es")[0].start) + 2000);
  });

  it("shows nothing when the subtitles are already in the language", async () => {
    const { scope, showEnglish } = setup({ choice: { language: "en" } });

    await showEnglish();

    expect(scope.getState($secondarySource)).toEqual({ type: "same", language: "en" });
    expect(texts(scope.getState($currentSecondarySubs))).toEqual([""]);
  });

  it("tells a track that couldn't load", async () => {
    const { scope, showEnglish } = setup({
      service: {
        getSubs: vi.fn(async (label: string) => {
          if (label === "es") throw new Error("Forbidden");
          return playgroundCaptions("en");
        }),
      },
    });

    await showEnglish();

    expect(scope.getState($secondaryError)).toBe("Forbidden");
  });
});

describe("second line translated as the video plays", () => {
  it("translates the lines ahead in one request", async () => {
    const { scope, showEnglish } = setup({ choice: { language: "ru" } });

    await showEnglish();

    expect(batches()).toHaveLength(1);
    expect(batches()[0]).toMatchObject({ language: "ru", translator: "google" });
    expect(batches()[0].texts[0]).toBe("Almost. I just need to pick up my keys.");
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: russian("Almost. I just need to pick up my keys."), pending: false },
    ]);
  });

  it("uses the translator picked for the second line", async () => {
    const { scope, showEnglish } = setup({ choice: { language: "ru" } });
    await allSettled($secondarySubsTranslator, { scope, params: "deepl" });

    await showEnglish();

    expect(batches()[0]).toMatchObject({ translator: "deepl" });
  });

  it("translates with Chrome's built-in translator in the page, from the subtitles' language", async () => {
    const translator = stubChromeTranslator();
    const { scope, showEnglish } = setup({ choice: { language: "ru" } });
    await allSettled($secondarySubsTranslator, { scope, params: "chrome" });

    await showEnglish();

    expect(batches()).toEqual([]);
    expect(translator.create).toHaveBeenCalledWith({ sourceLanguage: "en", targetLanguage: "ru" });
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: "[chrome:ru] Almost. I just need to pick up my keys.", pending: false },
    ]);
  });

  it("translates with Google where Chrome can't", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    stubChromeTranslator({ availability: "unavailable" });
    const { scope, showEnglish } = setup({ choice: { language: "ru" } });
    await allSettled($secondarySubsTranslator, { scope, params: "chrome" });

    await showEnglish();

    expect(batches()[0]).toMatchObject({ translator: "google", language: "ru" });
    expect(batches()[0]).not.toHaveProperty("sourceLanguage");
    expect(scope.getState($currentSecondarySubs)).toEqual([
      { text: russian("Almost. I just need to pick up my keys."), pending: false },
    ]);
  });

  it("asks for the next window when the playhead nears its end", async () => {
    const { scope, video, showEnglish } = setup({
      choice: { language: "ru" },
      currentTime: 0,
      service: { getSubs: vi.fn(async () => LONG_FILM) },
    });
    await showEnglish();
    expect(batches()).toHaveLength(1);

    video.currentTime = 60;
    await allSettled(videoTimeUpdate, { scope });
    expect(batches()).toHaveLength(1);

    video.currentTime = 95;
    await allSettled(videoTimeUpdate, { scope });
    expect(batches()).toHaveLength(2);
    expect(batches()[1].texts[0]).toBe("Line number 40");
  });

  it("starts a new window after a seek", async () => {
    const { scope, video, showEnglish } = setup({
      choice: { language: "ru" },
      currentTime: 0,
      service: { getSubs: vi.fn(async () => LONG_FILM) },
    });
    await showEnglish();

    video.currentTime = 400;
    await allSettled(videoTimeUpdate, { scope });

    expect(batches()[1].texts[0]).toBe("Line number 133");
    expect(scope.getState($currentSecondarySubs)).toEqual([{ text: "[ru] Line number 133", pending: false }]);
  });

  it("uses the translations of an earlier visit", async () => {
    await setup({ choice: { language: "ru" } }).showEnglish();
    expect(batches()).toHaveLength(1);

    const again = setup({ choice: { language: "ru" } });
    await again.showEnglish();

    expect(batches()).toHaveLength(1);
    expect(texts(again.scope.getState($currentSecondarySubs))).toEqual([
      russian("Almost. I just need to pick up my keys."),
    ]);
  });

  it("starts over in another language", async () => {
    const { scope, showEnglish } = setup({ choice: { language: "ru" } });
    await showEnglish();

    await allSettled(secondarySubsChanged, { scope, params: { language: "de" } });

    expect(batches().map((batch) => batch.language)).toEqual(["ru", "de"]);
    expect(texts(scope.getState($currentSecondarySubs))).toEqual([
      offlineTranslations("en-de").lines["Almost. I just need to pick up my keys."],
    ]);
  });

  it("waits a moment after a failed request", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const answer = chromeMock.runtime.sendMessage.getMockImplementation();
    chromeMock.runtime.sendMessage.mockImplementation((message, callback) =>
      message.type === "translateBatch" ? Promise.resolve({ error: "Too many requests" }) : answer(message, callback),
    );
    const { scope, video, showEnglish } = setup({ choice: { language: "ru" } });
    await showEnglish();

    expect(scope.getState($secondaryError)).toBe("Too many requests");
    video.currentTime = 6;
    await allSettled(videoTimeUpdate, { scope });
    expect(batches()).toHaveLength(1);

    chromeMock.runtime.sendMessage.mockImplementation(answer);
    vi.setSystemTime(Date.now() + 16_000);
    await allSettled(videoTimeUpdate, { scope });
    expect(batches()).toHaveLength(2);
    expect(scope.getState($secondaryError)).toBeNull();
  });

  it("translates each line as it appears on services that show one line at a time", async () => {
    // Like Amazon: no track to download, each line comes off the page
    const { scope } = setup({
      choice: { language: "ru" },
      service: { isOnFlight: () => true, getSubs: vi.fn(async () => []), getSubsTracks: undefined },
    });
    await allSettled(esSubsChanged, { scope, params: "en" });

    await allSettled(rawSubsAdded, { scope, params: captions([5, 105, "Almost. I just need to pick up my keys."]) });

    expect(scope.getState($secondarySource)).toMatchObject({ type: "translate", mode: "line" });
    expect(batches().at(-1).texts).toEqual(["Almost. I just need to pick up my keys."]);
    expect(texts(scope.getState($currentSecondarySubs))).toEqual([russian("Almost. I just need to pick up my keys.")]);
  });
});

describe("hiding the second line", () => {
  it("hides it until another video", async () => {
    const { scope, showEnglish } = setup();
    await showEnglish();

    await allSettled(secondaryLineToggled, { scope });
    expect(scope.getState($secondaryHidden)).toBe(true);
    await allSettled(subsReloadRequested, { scope });
    expect(scope.getState($secondaryHidden)).toBe(true);

    window.history.pushState({}, "", "/another-video");
    await showEnglish();
    expect(scope.getState($secondaryHidden)).toBe(false);
  });

  it("doesn't translate while it's hidden", async () => {
    const { scope, video, showEnglish } = setup({
      choice: { language: "ru" },
      currentTime: 0,
      service: { getSubs: vi.fn(async () => LONG_FILM) },
    });
    await showEnglish();
    await allSettled(secondaryLineToggled, { scope });

    video.currentTime = 400;
    await allSettled(videoTimeUpdate, { scope });
    expect(batches()).toHaveLength(1);

    await allSettled(secondaryLineToggled, { scope });
    expect(batches()).toHaveLength(2);
  });
});
