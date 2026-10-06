import { describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $currentSubs,
  $rawSubs,
  $subs,
  $subsDelay,
  $subsLanguage,
  $subsTitle,
  ES_CUSTOM_SUB_LABEL,
  esSubsChanged,
  rawSubsAdded,
  subsDelayButtonPressed,
  subsReloadRequested,
  updateCustomSubsFx,
} from ".";
import { $streaming } from "../streamings";
import { $video, videoTimeUpdate } from "../videos";
import { $autoPause } from "../settings";
import { captions, playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { sentMessages } from "@root/test/chrome";

const texts = (subs: { text: string }[]) => subs.map((sub) => sub.text);

function setup({ currentTime = 5, autoPause = false, rawSubs = [] as ReturnType<typeof captions> } = {}) {
  const service = createService();
  const video = createVideo({ currentTime, paused: false });
  const scope = fork({
    values: [
      [$streaming, service],
      [$video, video],
      [$autoPause, autoPause],
      [$rawSubs, rawSubs],
    ],
  });
  return { scope, service, video };
}

describe("subtitles model", () => {
  it("loads the subtitles of the track the player shows", async () => {
    const { scope, service } = setup();

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(service.getSubs).toHaveBeenCalledWith("en");
    expect(scope.getState($subs)).toHaveLength(23);
    expect(scope.getState($subsTitle)).toBe("en");
  });

  it("shows the cue for the video time", async () => {
    const { scope, video } = setup({ currentTime: 5 });
    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(texts(scope.getState($currentSubs))).toEqual(["Almost. I just need to pick up my keys."]);

    video.currentTime = 22;
    await allSettled(videoTimeUpdate, { scope });
    expect(texts(scope.getState($currentSubs))).toEqual(["Yes. And I asked Sam to look after the cat."]);

    video.currentTime = 3.7;
    await allSettled(videoTimeUpdate, { scope });
    expect(scope.getState($currentSubs)).toEqual([]);
  });

  it("keeps the same cue object while the video plays through it", async () => {
    const { scope, video } = setup({ currentTime: 4.5 });
    await allSettled(esSubsChanged, { scope, params: "en" });
    const cue = scope.getState($currentSubs);

    video.currentTime = 5.5;
    await allSettled(videoTimeUpdate, { scope });

    expect(scope.getState($currentSubs)).toBe(cue);
  });

  it("clears the subtitles when the player turns them off", async () => {
    const { scope } = setup({ rawSubs: playgroundCaptions("en") });

    await allSettled(esSubsChanged, { scope, params: "" });

    expect(scope.getState($subs)).toEqual([]);
  });

  it("detects the language of the loaded subtitles", async () => {
    const { scope } = setup();

    await allSettled(esSubsChanged, { scope, params: "es" });

    expect(scope.getState($subsLanguage)).toBe("es");
    expect(sentMessages("getTextLanguage")).toHaveLength(1);
  });

  it("shows subtitles from a file without asking the service", async () => {
    const { scope, service } = setup({ rawSubs: playgroundCaptions("en") });

    await allSettled(updateCustomSubsFx, { scope, params: captions([1, 9, "A line from my own file."]) });
    await allSettled(esSubsChanged, { scope, params: ES_CUSTOM_SUB_LABEL });

    expect(service.getSubs).not.toHaveBeenCalled();
    expect(texts(scope.getState($subs))).toEqual(["A line from my own file."]);
    expect(scope.getState($subsTitle)).toBe(ES_CUSTOM_SUB_LABEL);
  });

  it("loads the current track again on request", async () => {
    const { scope, service } = setup();
    await allSettled(esSubsChanged, { scope, params: "en" });

    await allSettled(subsReloadRequested, { scope });

    expect(service.getSubs).toHaveBeenCalledTimes(2);
    expect(service.getSubs).toHaveBeenLastCalledWith("en");
  });

  it("doesn't reload before any subtitles are loaded", async () => {
    const { scope, service } = setup();

    await allSettled(subsReloadRequested, { scope });

    expect(service.getSubs).not.toHaveBeenCalled();
  });

  it("skips a phrase an on-flight service reports again", async () => {
    const { scope } = setup();
    await allSettled(rawSubsAdded, { scope, params: captions([1, 2, "Hello there!"]) });
    const rawSubs = scope.getState($rawSubs);

    await allSettled(rawSubsAdded, { scope, params: captions([1, 2.5, "Hello there!"]) });
    expect(scope.getState($rawSubs)).toBe(rawSubs);

    await allSettled(rawSubsAdded, { scope, params: captions([3, 4, "Are you ready?"]) });
    expect(texts(scope.getState($rawSubs))).toEqual(["Are you ready?"]);
  });
});

describe("subtitles delay", () => {
  it("shifts the subtitles by the delay", async () => {
    const { scope } = setup({ rawSubs: playgroundCaptions("en") });

    await allSettled(subsDelayButtonPressed, { scope, params: 0.25 });

    expect(scope.getState($subsDelay)).toBe(0.25);
    expect(scope.getState($subs)[1]).toMatchObject({ start: 4250, end: 7050 });
  });

  it("shifts by the difference when the delay changes again", async () => {
    const { scope } = setup({ rawSubs: playgroundCaptions("en") });

    await allSettled(subsDelayButtonPressed, { scope, params: 1 });
    await allSettled(subsDelayButtonPressed, { scope, params: -0.5 });

    expect(scope.getState($subsDelay)).toBe(-0.5);
    expect(scope.getState($subs)[1]).toMatchObject({ start: 3500, end: 6300 });
  });
});

describe("auto pause", () => {
  // Cue 2 of the playground subtitles ends at 6.8 s
  async function playTo(time: number, autoPause: boolean) {
    const { scope, video } = setup({ currentTime: 5, autoPause });
    await allSettled(esSubsChanged, { scope, params: "en" });
    video.currentTime = time;
    await allSettled(videoTimeUpdate, { scope });
    return video;
  }

  it("pauses the video at the end of a cue", async () => {
    const video = await playTo(6.7, true);

    expect(video.pause).toHaveBeenCalledOnce();
  });

  it("doesn't pause in the middle of a cue", async () => {
    const video = await playTo(6, true);

    expect(video.pause).not.toHaveBeenCalled();
  });

  it("doesn't pause when turned off", async () => {
    const video = await playTo(6.7, false);

    expect(video.pause).not.toHaveBeenCalled();
  });

  it("pauses without errors", async () => {
    vi.spyOn(console, "error");

    await playTo(6.7, true);

    expect(console.error).not.toHaveBeenCalled();
  });
});

describe("subtitles loading errors", () => {
  it("keeps working when the service fails to load a track", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { scope, service } = setup();
    vi.mocked(service.getSubs).mockRejectedValueOnce(new Error("Network error"));

    await allSettled(esSubsChanged, { scope, params: "en" });
    await allSettled(esSubsChanged, { scope, params: "es" });

    expect(texts(scope.getState($subs))).toEqual(texts(playgroundCaptions("es")));
    expect(scope.getState($subsLanguage)).toBe("es");
  });
});
