import { afterEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import {
  $aiStatus,
  $aiSubs,
  aiLanguagePicked,
  aiStatusChanged,
  aiSubsRequested,
  aiSubsStopped,
  aiWordsRecognized,
  startAiSessionFx,
  stopAiSessionFx,
} from ".";
import {
  $pinnedSubs,
  $rawSubs,
  $subsTitle,
  AI_SUBS_LABEL,
  esSubsChanged,
  ownSubsLoaded,
  subsDelayButtonPressed,
} from "../subs";
import { $streaming } from "../streamings";
import { $video } from "../videos";
import { $aiSubsLanguage } from "../settings";
import type { TTimedWord } from "../types";
import { playgroundCaptions } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";

const said = (text: string, start: number): TTimedWord[] =>
  text.split(" ").map((word, index) => ({ text: word, start: start + index * 400, end: start + index * 400 + 300 }));

function setup() {
  const streaming = createService({ getSubs: vi.fn(async () => playgroundCaptions("en")) });
  const start = vi.fn();
  const stop = vi.fn();
  const scope = fork({
    values: [
      [$streaming, streaming],
      [$video, createVideo({ currentTime: 5 })],
      [$aiSubsLanguage, "es"],
    ],
    handlers: [
      [startAiSessionFx, start],
      [stopAiSessionFx, stop],
    ],
  });
  return { scope, streaming, start, stop };
}

afterEach(() => {
  window.history.pushState({}, "", "/");
});

describe("AI subtitles", () => {
  it("listens in the picked language and puts Whisper's words on the main line as they come", async () => {
    const { scope, start } = setup();
    await allSettled(esSubsChanged, { scope, params: "en" });
    expect(scope.getState($rawSubs).length).toBeGreaterThan(0);

    await allSettled(aiSubsRequested, { scope });

    expect(start).toHaveBeenCalledWith(expect.objectContaining({ language: "es" }));
    expect(scope.getState($subsTitle)).toBe(AI_SUBS_LABEL);
    expect(scope.getState($rawSubs)).toEqual([]);
    expect(scope.getState($pinnedSubs)?.label).toBe(AI_SUBS_LABEL);

    await allSettled(aiWordsRecognized, {
      scope,
      params: { from: 0, to: 20_000, words: said("Hola, ¿qué tal?", 1000) },
    });
    expect(scope.getState($rawSubs)).toEqual([expect.objectContaining({ start: 1000, text: "Hola, ¿qué tal?" })]);

    // A window again replaces its words; the next one adds to them
    await allSettled(aiWordsRecognized, {
      scope,
      params: { from: 0, to: 20_000, words: said("Hola, ¿qué tal?", 1100) },
    });
    await allSettled(aiWordsRecognized, {
      scope,
      params: { from: 20_000, to: 40_000, words: said("Muy bien.", 21_000) },
    });
    expect(scope.getState($rawSubs).map((cue) => [cue.start, cue.text])).toEqual([
      [1100, "Hola, ¿qué tal?"],
      [21_000, "Muy bien."],
    ]);
  });

  it("keeps its lines when the service announces its track again", async () => {
    const { scope, streaming } = setup();
    await allSettled(aiSubsRequested, { scope });
    await allSettled(aiWordsRecognized, { scope, params: { from: 0, to: 20_000, words: said("Hola", 1000) } });
    streaming.getSubs = vi.fn(async () => playgroundCaptions("en"));

    await allSettled(esSubsChanged, { scope, params: "en" });

    expect(streaming.getSubs).not.toHaveBeenCalled();
    expect(scope.getState($rawSubs).map((cue) => cue.text)).toEqual(["Hola"]);
  });

  it("moves its lines with the delay buttons, new ones too", async () => {
    const { scope } = setup();
    await allSettled(aiSubsRequested, { scope });
    await allSettled(aiWordsRecognized, { scope, params: { from: 0, to: 20_000, words: said("Hola", 1000) } });

    await allSettled(subsDelayButtonPressed, { scope, params: 0.5 });
    await allSettled(aiWordsRecognized, { scope, params: { from: 20_000, to: 40_000, words: said("Adiós", 21_000) } });

    expect(scope.getState($rawSubs).map((cue) => cue.start)).toEqual([1500, 21_500]);
  });

  it("starts over in another language", async () => {
    const { scope, start } = setup();
    await allSettled(aiSubsRequested, { scope });
    await allSettled(aiWordsRecognized, { scope, params: { from: 0, to: 20_000, words: said("Hola", 1000) } });

    await allSettled(aiLanguagePicked, { scope, params: "pt" });

    expect(scope.getState($aiSubsLanguage)).toBe("pt");
    expect(start).toHaveBeenLastCalledWith(expect.objectContaining({ language: "pt" }));
    expect(scope.getState($rawSubs)).toEqual([]);
  });

  it("goes back to the service's track when removed", async () => {
    const { scope, stop } = setup();
    await allSettled(esSubsChanged, { scope, params: "en" });
    await allSettled(aiSubsRequested, { scope });

    await allSettled(aiSubsStopped, { scope });

    expect(stop).toHaveBeenCalled();
    expect(scope.getState($aiSubs)).toBeNull();
    expect(scope.getState($pinnedSubs)).toBeNull();
    expect(scope.getState($subsTitle)).toBe("en");
    expect(scope.getState($rawSubs)).toEqual(playgroundCaptions("en"));
  });

  it("gives way to a file put on the main line", async () => {
    const { scope, stop } = setup();
    await allSettled(aiSubsRequested, { scope });

    await allSettled(ownSubsLoaded, { scope, params: { label: "found:file:1", captions: playgroundCaptions("en") } });

    expect(stop).toHaveBeenCalled();
    expect(scope.getState($aiSubs)).toBeNull();
  });

  it("stops on another video and clears its lines", async () => {
    const { scope, stop } = setup();
    await allSettled(aiSubsRequested, { scope });
    await allSettled(aiWordsRecognized, { scope, params: { from: 0, to: 20_000, words: said("Hola", 1000) } });

    window.history.pushState({}, "", "/next-video");
    await allSettled(esSubsChanged, { scope, params: "" });

    expect(stop).toHaveBeenCalled();
    expect(scope.getState($aiSubs)).toBeNull();
    expect(scope.getState($rawSubs)).toEqual([]);
  });

  it("keeps the model's progress and problems hearing the video", async () => {
    const { scope } = setup();
    await allSettled(aiSubsRequested, { scope });

    await allSettled(aiStatusChanged, { scope, params: { source: "whisper", status: "downloading 30%" } });
    await allSettled(aiStatusChanged, { scope, params: { source: "speech", status: "no audio from the video: EME" } });
    expect(scope.getState($aiStatus)).toEqual({ whisper: "downloading 30%", audio: "no audio from the video: EME" });

    await allSettled(aiStatusChanged, { scope, params: { source: "speech", status: "listening" } });
    expect(scope.getState($aiStatus).audio).toBe("");
  });
});
