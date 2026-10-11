import { afterEach, describe, expect, it, vi } from "vitest";
import { allSettled, fork } from "effector";
import "@src/models/init";
import "@root/playground/src/mockBackground";
import { $transcriptLines, $transcriptOpen, $transcriptSecond, transcriptShownChanged, transcriptToggled } from ".";
import { esSubsChanged } from "../subs";
import { $streaming } from "../streamings";
import { $video } from "../videos";
import { $secondarySubs, $translateLanguage } from "../settings";
import type { TSecondaryChoice, TSubsTrack } from "../types";
import { offlineTranslations } from "@root/test/fixtures";
import { createService } from "@root/test/service";
import { createVideo } from "@root/test/video";
import { sentMessages } from "@root/test/chrome";

const PLAYGROUND_TRACKS: TSubsTrack[] = [
  { label: "en", language: "en", kind: "subtitles" },
  { label: "es", language: "es", kind: "subtitles" },
];
const ALMOST = "Almost. I just need to pick up my keys.";
const batches = () => sentMessages("translateBatch") as unknown as { texts: string[]; language: string }[];

function setup({ choice = { language: "off" } as TSecondaryChoice } = {}) {
  const streaming = createService({ getSubsTracks: vi.fn(async () => PLAYGROUND_TRACKS) });
  const scope = fork({
    values: [
      [$streaming, streaming],
      [$video, createVideo({ currentTime: 5, paused: true })],
      [$secondarySubs, choice],
      [$translateLanguage, "ru"],
    ],
  });
  const open = async () => {
    await allSettled(esSubsChanged, { scope, params: "en" });
    await allSettled(transcriptToggled, { scope });
    await allSettled(transcriptShownChanged, { scope, params: { from: 0, to: 10 } });
  };
  return { scope, open };
}

const lineOf = (lines: { text: string; second: string | null }[], text: string) =>
  lines.find((line) => line.text === text);

afterEach(() => {
  window.history.pushState({}, "", "/");
});

describe("transcript", () => {
  it("translates the lines it shows into the translation language while the second line is off", async () => {
    const { scope, open } = setup();

    await open();

    expect(scope.getState($transcriptOpen)).toBe(true);
    expect(scope.getState($transcriptSecond)).toEqual({ type: "translate", language: "ru" });
    expect(lineOf(scope.getState($transcriptLines), ALMOST)).toMatchObject({
      second: offlineTranslations("en-ru").lines[ALMOST],
      pending: false,
    });
    expect(batches()).toHaveLength(1);
    expect(batches()[0]).toMatchObject({ language: "ru" });
  });

  it("shows the second line's track, without translating", async () => {
    const { scope, open } = setup({ choice: { language: "es" } });

    await open();

    expect(scope.getState($transcriptSecond)).toEqual({ type: "track" });
    expect(lineOf(scope.getState($transcriptLines), ALMOST)?.second).toBe("Casi. Solo tengo que buscar mis llaves.");
    expect(batches()).toHaveLength(0);
  });

  it("has no second language when the subtitles are in the translation language", async () => {
    const { scope, open } = setup({ choice: { language: "en" } });

    await open();

    expect(scope.getState($transcriptSecond)).toEqual({ type: "none" });
    expect(lineOf(scope.getState($transcriptLines), ALMOST)?.second).toBeNull();
  });

  it("translates nothing while it's closed", async () => {
    const { scope } = setup();

    await allSettled(esSubsChanged, { scope, params: "en" });
    await allSettled(transcriptShownChanged, { scope, params: { from: 0, to: 10 } });

    expect(batches()).toHaveLength(0);
  });
});
