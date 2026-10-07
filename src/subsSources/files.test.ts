import { describe, expect, it } from "vitest";
import { zipSync, strToU8 } from "fflate";
import { parse } from "subtitle";

import { assToSrt, decodeSubtitle, isZip, pickFromZip, toSubtitleText } from "./files";

const SRT = "1\n00:00:01,000 --> 00:00:03,500\nПривет!\n";
const windows1251 = (text: string) =>
  Uint8Array.from(text, (char) => {
    const code = char.charCodeAt(0);
    if (code >= 0x410 && code <= 0x44f) return code - 0x410 + 0xc0;
    return code;
  });

describe("decodeSubtitle", () => {
  it("reads UTF-8, with or without a byte order mark", () => {
    expect(decodeSubtitle(new TextEncoder().encode(SRT), "ru")).toBe(SRT);
    expect(decodeSubtitle(new Uint8Array([0xef, 0xbb, 0xbf, ...new TextEncoder().encode(SRT)]), "ru")).toBe(SRT);
  });

  it("reads an old Russian file in windows-1251", () => {
    expect(decodeSubtitle(windows1251(SRT), "ru")).toBe(SRT);
  });

  it("falls back to windows-1252 for languages without a code page of their own", () => {
    expect(decodeSubtitle(new Uint8Array([0x63, 0x61, 0x66, 0xe9]), "fr")).toBe("café");
  });
});

describe("ZIP archives", () => {
  const archive = zipSync({
    "Show.S01E01.srt": strToU8("1\n00:00:01,000 --> 00:00:02,000\nOne\n"),
    "Show.S01E02.srt": strToU8("1\n00:00:01,000 --> 00:00:02,000\nTwo\n"),
    "Show.S01E02.ass": strToU8("[Script Info]"),
    "__MACOSX/._Show.S01E02.srt": strToU8("junk"),
    "readme.txt": strToU8("Thanks for downloading"),
  });

  it("are recognised by their signature", () => {
    expect(isZip(archive)).toBe(true);
    expect(isZip(strToU8(SRT))).toBe(false);
  });

  it("give the episode's subtitles, SRT before ASS", () => {
    expect(pickFromZip(archive, 2)?.name).toBe("Show.S01E02.srt");
    expect(pickFromZip(archive)?.name).toBe("Show.S01E01.srt");
  });

  it("are unpacked by toSubtitleText", () => {
    expect(toSubtitleText(archive, { language: "en", episode: 2 })).toContain("Two");
  });

  it("without a subtitle file fail", () => {
    expect(() => toSubtitleText(zipSync({ "readme.txt": strToU8("hi") }), { language: "en" })).toThrow(
      "The archive has no subtitle file",
    );
  });
});

describe("assToSrt", () => {
  const ASS = [
    "[Script Info]",
    "Title: Test",
    "",
    "[V4+ Styles]",
    "Format: Name, Fontname",
    "Style: Default,Arial",
    "",
    "[Events]",
    "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text",
    "Dialogue: 0,0:00:05.00,0:00:07.50,Default,,0,0,0,,Second, with a comma",
    "Dialogue: 0,0:00:01.20,0:00:03.00,Default,,0,0,0,,{\\i1}First{\\i0}\\Nline two",
    "Dialogue: 0,0:00:04.00,0:00:05.00,Default,,0,0,0,,{\\p1}m 0 0 l 100 0 100 100",
  ].join("\n");

  it("keeps the dialogue in time order, without styling or drawings", () => {
    expect(parse(assToSrt(ASS))).toEqual([
      { start: 1200, end: 3000, text: "First\nline two" },
      { start: 5000, end: 7500, text: "Second, with a comma" },
    ]);
  });

  it("is applied to .ass files by toSubtitleText", () => {
    expect(toSubtitleText(strToU8(ASS), { name: "episode.ass", language: "ja" })).toContain("Second, with a comma");
  });
});
