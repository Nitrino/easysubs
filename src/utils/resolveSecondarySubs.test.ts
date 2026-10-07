import { describe, expect, it } from "vitest";
import { resolveSecondarySubs, secondaryLanguage } from "./resolveSecondarySubs";
import type { TSubsTrack } from "@src/models/types";

const SPANISH: TSubsTrack = { label: "es", language: "es", kind: "subtitles" };
const SPANISH_CC: TSubsTrack = { label: "es[cc]", language: "es", kind: "cc" };
const SPANISH_FORCED: TSubsTrack = { label: "es-forced", language: "es", kind: "forced" };
const RUSSIAN_MACHINE: TSubsTrack = { label: "tlang:ru", language: "ru", kind: "machine" };

const resolve = (params: Partial<Parameters<typeof resolveSecondarySubs>[0]>) =>
  resolveSecondarySubs({
    choice: { language: "es" },
    tracks: [],
    translateLanguage: "ru",
    subsLanguage: "en",
    isOnFlight: false,
    ...params,
  });

describe("resolveSecondarySubs", () => {
  it("is off until a language is picked", () => {
    expect(resolve({ choice: { language: "off" }, tracks: [SPANISH] })).toEqual({ type: "off" });
  });

  it("uses the video's track in the language", () => {
    expect(resolve({ tracks: [SPANISH] })).toEqual({ type: "track", language: "es", track: SPANISH });
  });

  it("prefers subtitles to captions, and the kind picked in the settings", () => {
    expect(resolve({ tracks: [SPANISH_CC, SPANISH] })).toMatchObject({ track: SPANISH });
    expect(resolve({ choice: { language: "es", kind: "cc" }, tracks: [SPANISH, SPANISH_CC] })).toMatchObject({
      track: SPANISH_CC,
    });
  });

  it("matches a track by its base language", () => {
    const track: TSubsTrack = { label: "es-ES", language: "es-ES", kind: "subtitles" };

    expect(resolve({ tracks: [track] })).toMatchObject({ type: "track", track });
  });

  it("doesn't take a forced track, which only translates signs", () => {
    expect(resolve({ tracks: [SPANISH_FORCED] })).toEqual({ type: "translate", language: "es", mode: "window" });
  });

  it("translates a language picked for translation, even with a track in it", () => {
    expect(resolve({ choice: { language: "es", translate: true }, tracks: [SPANISH] })).toEqual({
      type: "translate",
      language: "es",
      mode: "window",
      instead: true,
    });
    expect(resolve({ choice: { language: "de", translate: true }, tracks: [SPANISH] })).toEqual({
      type: "translate",
      language: "de",
      mode: "window",
    });
  });

  it("counts YouTube's auto-translation as a track", () => {
    expect(resolve({ choice: { language: "ru" }, tracks: [RUSSIAN_MACHINE] })).toMatchObject({
      type: "track",
      track: RUSSIAN_MACHINE,
    });
  });

  it("translates when the video has no track in the language", () => {
    expect(resolve({ tracks: [SPANISH], choice: { language: "de" } })).toEqual({
      type: "translate",
      language: "de",
      mode: "window",
    });
  });

  it("translates line by line on services that show one line at a time", () => {
    expect(resolve({ isOnFlight: true })).toEqual({ type: "translate", language: "es", mode: "line" });
  });

  it("asks the translator in its own code for a track's language", () => {
    expect(resolve({ choice: { language: "zh-Hant" } })).toMatchObject({ type: "translate", language: "zh-TW" });
  });

  it("follows the translation language for Same as translation", () => {
    expect(resolve({ choice: { language: "same" }, translateLanguage: "de" })).toMatchObject({ language: "de" });
    expect(secondaryLanguage({ language: "same" }, "de")).toBe("de");
  });

  it("shows nothing when the subtitles are already in the language", () => {
    expect(resolve({ subsLanguage: "es", tracks: [SPANISH] })).toEqual({ type: "same", language: "es" });
  });

  it("doesn't wait for the subtitles' language to be detected", () => {
    expect(resolve({ subsLanguage: "auto", tracks: [SPANISH] })).toMatchObject({ type: "track" });
  });
});

describe("a file found for the video", () => {
  const FOUND = { source: "gestdown", id: "a", language: "es", release: "show S01E02 WEB" } as const;

  it("comes before the video's tracks and the translator, once the line is on", () => {
    expect(resolve({ tracks: [SPANISH], found: FOUND })).toEqual({ type: "found", language: "es", result: FOUND });
    expect(resolve({ choice: { language: "ru" }, found: FOUND })).toMatchObject({ type: "found", language: "es" });
    expect(resolve({ choice: { language: "off" }, found: FOUND })).toEqual({ type: "off" });
  });

  it("takes the chosen language for a file without one", () => {
    expect(resolve({ choice: { language: "same" }, found: { ...FOUND, source: "file", language: "" } })).toMatchObject({
      type: "found",
      language: "ru",
    });
  });
});
