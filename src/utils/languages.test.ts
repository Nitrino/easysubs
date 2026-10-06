import { describe, expect, it } from "vitest";
import {
  isSameLanguage,
  languageFromTrack,
  languageName,
  normalizeLanguage,
  translationLanguageCode,
} from "./languages";

describe("languages", () => {
  it("compares languages without their region", () => {
    expect(isSameLanguage("es", "es-ES")).toBe(true);
    expect(isSameLanguage("pt-BR", "pt")).toBe(true);
    expect(isSameLanguage("en_US", "EN")).toBe(true);
    expect(isSameLanguage("es", "en")).toBe(false);
  });

  it("tells the Chinese scripts apart", () => {
    expect(normalizeLanguage("zh-CN")).toBe("zh-hans");
    expect(normalizeLanguage("zh-Hans")).toBe("zh-hans");
    expect(normalizeLanguage("zh")).toBe("zh-hans");
    expect(normalizeLanguage("zh-TW")).toBe("zh-hant");
    expect(normalizeLanguage("zh-Hant-HK")).toBe("zh-hant");
    expect(isSameLanguage("zh-TW", "zh-CN")).toBe(false);
  });

  it("reads three-letter and old codes", () => {
    expect(normalizeLanguage("eng")).toBe("en");
    expect(normalizeLanguage("rus")).toBe("ru");
    expect(normalizeLanguage("iw")).toBe("he");
    expect(normalizeLanguage("nb")).toBe("no");
  });

  it("finds the language of a track by its code or name", () => {
    expect(languageFromTrack("eng")).toBe("en");
    expect(languageFromTrack("und", "Русские (форсированные)")).toBe("ru");
    expect(languageFromTrack(undefined, "Английские eng")).toBe("en");
    expect(languageFromTrack(undefined, "Subtitles in English")).toBe("en");
    expect(languageFromTrack(undefined, "Director's commentary")).toBeNull();
  });

  it("names languages", () => {
    expect(languageName("es")).toBe("Spanish");
    expect(languageName("es-419")).toBe("Spanish");
    expect(languageName("zh-Hant")).toBe("Chinese (Traditional)");
    expect(languageName("fil")).toBe("Filipino");
  });

  it("gives the code translators take", () => {
    expect(translationLanguageCode("zh-Hans")).toBe("zh-CN");
    expect(translationLanguageCode("pt-BR")).toBe("pt");
    expect(translationLanguageCode("es")).toBe("es");
  });
});
