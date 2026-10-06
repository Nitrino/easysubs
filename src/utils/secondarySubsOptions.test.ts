import { describe, expect, it } from "vitest";
import {
  describeSecondarySource,
  secondarySubsChoice,
  secondarySubsOptions,
  secondarySubsValue,
} from "./secondarySubsOptions";
import type { TSubsTrack } from "@src/models/types";

const SPANISH: TSubsTrack = { label: "es", language: "es", kind: "subtitles" };
const SPANISH_CC: TSubsTrack = { label: "es[cc]", language: "es", kind: "cc" };
const SPANISH_FORCED: TSubsTrack = { label: "es-forced", language: "es", kind: "forced" };
const RUSSIAN_MACHINE: TSubsTrack = { label: "tlang:ru", language: "ru", kind: "machine" };
const SPANISH_MACHINE: TSubsTrack = { label: "tlang:es", language: "es", kind: "machine" };

const options = (params: Partial<Parameters<typeof secondarySubsOptions>[0]> = {}) =>
  secondarySubsOptions({
    tracks: [SPANISH],
    translateLanguage: "ru",
    subsLanguage: "en",
    translator: "google",
    service: "netflix",
    isOnFlight: false,
    ...params,
  });
const group = (groups: ReturnType<typeof options>, label: string) => groups.find((item) => item.label === label);

describe("the second line's language picker", () => {
  it("starts with Off and the translation language", () => {
    expect(options()[0].options).toEqual([
      { value: "off", label: "Off" },
      { value: "same", label: "Same as translation", hint: "Russian" },
    ]);
  });

  it("lists the video's tracks", () => {
    expect(group(options({ tracks: [SPANISH, SPANISH_CC, SPANISH_FORCED] }), "In this video").options).toEqual([
      { value: "track:es", label: "Spanish", tag: "Track", tagKind: "track" },
      { value: "track:es[cc]", label: "Spanish (CC)", tag: "Track", tagKind: "track" },
    ]);
  });

  it("offers every other language for the translator, those with a track too", () => {
    const translate = group(options(), "Auto-translate").options;

    expect(translate).toContainEqual({ value: "translate:ru", label: "Russian", tag: "Google", tagKind: "translate" });
    expect(translate).toContainEqual({ value: "translate:es", label: "Spanish", tag: "Google", tagKind: "translate" });
    // English is the subtitles' own language
    expect(translate.map((option) => option.value)).not.toContain("translate:en");
  });

  it("names the translator picked for the second line", () => {
    expect(group(options({ translator: "deepl" }), "Auto-translate").options[0].tag).toBe("DeepL");
  });

  it("lists YouTube's translations as tracks of the video", () => {
    const groups = options({
      service: "youtube",
      tracks: [SPANISH, SPANISH_MACHINE, RUSSIAN_MACHINE],
    });

    expect(group(groups, "In this video").options).toEqual([
      { value: "track:es", label: "Spanish", tag: "Track", tagKind: "track" },
      { value: "track:tlang:ru", label: "Russian", tag: "YouTube", tagKind: "track" },
    ]);
    expect(group(groups, "Auto-translate").options.map((option) => option.value)).toContain("translate:ru");
  });

  it("explains an empty group on services that show one line at a time", () => {
    expect(group(options({ tracks: [], service: "amazon", isOnFlight: true }), "In this video").options).toEqual([
      { value: "no-tracks", label: "Prime Video shows one track at a time", isDisabled: true },
    ]);
  });

  it("shows the track in use, or the language being translated", () => {
    const track = { type: "track", language: "es", track: SPANISH_CC } as const;
    const translated = { type: "translate", language: "zh-CN", mode: "window" } as const;

    expect(secondarySubsValue({ language: "off" }, { type: "off" })).toBe("off");
    expect(secondarySubsValue({ language: "same" }, track)).toBe("same");
    expect(secondarySubsValue({ language: "es", kind: "cc" }, track)).toBe("track:es[cc]");
    expect(secondarySubsValue({ language: "zh-Hans" }, translated)).toBe("translate:zh-CN");
    expect(secondarySubsValue({ language: "es", translate: true }, { ...translated, language: "es" })).toBe(
      "translate:es",
    );
  });

  it("saves a picked track as its language and kind", () => {
    expect(secondarySubsChoice("track:es[cc]", [SPANISH, SPANISH_CC])).toEqual({ language: "es", kind: "cc" });
    expect(secondarySubsChoice("translate:de", [])).toEqual({ language: "de", translate: true });
    expect(secondarySubsChoice("same", [])).toEqual({ language: "same" });
    expect(secondarySubsChoice("track:gone", [])).toBeNull();
  });
});

describe("the second line's status", () => {
  const describe_ = (source: Parameters<typeof describeSecondarySource>[0]["source"], extra = {}) =>
    describeSecondarySource({ source, service: "netflix", translator: "google", error: null, ...extra });

  it("says when a track of the video is used", () => {
    expect(describe_({ type: "track", language: "es", track: SPANISH })).toEqual({
      tag: "track",
      text: "Spanish subtitles from Netflix. No translation needed.",
    });
    expect(describe_({ type: "track", language: "ru", track: RUSSIAN_MACHINE }, { service: "youtube" })).toEqual({
      tag: "track",
      text: "Russian from YouTube auto-translate. No translation needed.",
    });
  });

  it("says when the line is translated, and by whom", () => {
    expect(describe_({ type: "translate", language: "de", mode: "window" }, { translator: "deepl" })).toEqual({
      tag: "translate",
      text: "No German subtitles in this video. DeepL translates as you watch.",
    });
    expect(describe_({ type: "translate", language: "es", mode: "window", instead: true }).text).toBe(
      "Google Translate translates as you watch, in place of the video's Spanish subtitles.",
    );
    expect(describe_({ type: "translate", language: "de", mode: "line" }, { service: "amazon" }).text).toBe(
      "Prime Video shows one line at a time, so Google Translate translates each line as it appears.",
    );
  });

  it("tells a failed translation", () => {
    expect(
      describe_({ type: "translate", language: "de", mode: "window" }, { error: "DeepL quota exceeded" }).text,
    ).toMatch(/Google Translate failed: DeepL quota exceeded$/);
  });

  it("says when the subtitles are already in the language", () => {
    expect(describe_({ type: "same", language: "en" })).toEqual({
      tag: null,
      text: "The subtitles are already in English.",
    });
  });
});
