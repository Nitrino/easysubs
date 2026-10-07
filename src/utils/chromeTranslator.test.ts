import { describe, expect, it, vi } from "vitest";
import {
  ChromeTranslatorUnavailableError,
  chromeTranslate,
  chromeTranslateBatch,
  isChromeTranslatorSupported,
  prepareChromeTranslator,
  resetChromeTranslators,
} from "./chromeTranslator";
import { stubChromeTranslator } from "@root/test/chromeTranslator";

describe("chromeTranslator", () => {
  it("is supported where the browser has the Translator API", () => {
    resetChromeTranslators();
    expect(isChromeTranslatorSupported()).toBe(false);

    stubChromeTranslator();
    expect(isChromeTranslatorSupported()).toBe(true);
  });

  it("translates with one translator per language pair", async () => {
    const api = stubChromeTranslator();

    expect(await chromeTranslate("pick up", "en", "ru")).toBe("[chrome:ru] pick up");
    expect(await chromeTranslate("give up", "en", "ru")).toBe("[chrome:ru] give up");
    expect(await chromeTranslate("give up", "en", "de")).toBe("[chrome:de] give up");

    expect(api.create.mock.calls.map(([pair]) => pair)).toEqual([
      { sourceLanguage: "en", targetLanguage: "ru" },
      { sourceLanguage: "en", targetLanguage: "de" },
    ]);
  });

  it("asks Chrome for languages in its codes", async () => {
    const api = stubChromeTranslator();

    await chromeTranslate("你好", "zh-CN", "iw");
    await chromeTranslate("你好", "zh-TW", "pt-BR");

    expect(api.create.mock.calls.map(([pair]) => pair)).toEqual([
      { sourceLanguage: "zh", targetLanguage: "he" },
      { sourceLanguage: "zh-Hant", targetLanguage: "pt" },
    ]);
  });

  it("translates lines one after another", async () => {
    stubChromeTranslator();

    expect(await chromeTranslateBatch(["One.", "Two."], "en", "ru")).toEqual(["[chrome:ru] One.", "[chrome:ru] Two."]);
  });

  it.each([
    ["without the API", () => resetChromeTranslators(), "This browser has no built-in translator"],
    ["for a pair Chrome can't translate", () => stubChromeTranslator({ availability: "unavailable" }), "Chrome can't"],
  ])("fails %s", async (_, stub, message) => {
    stub();

    const translation = chromeTranslate("pick up", "en", "ru");

    await expect(translation).rejects.toThrow(ChromeTranslatorUnavailableError);
    await expect(translation).rejects.toThrow(message);
  });

  it("fails while the subtitles' language isn't known", async () => {
    stubChromeTranslator();

    await expect(chromeTranslate("pick up", "auto", "ru")).rejects.toThrow("language isn't known");
  });

  it("asks again after Chrome refused to download a model", async () => {
    const api = stubChromeTranslator({ refuseCreate: true });
    await expect(chromeTranslate("pick up", "en", "ru")).rejects.toThrow("isn't ready");

    api.create.mockImplementation(async () => ({ translate: async (text: string) => `ok ${text}`, destroy: vi.fn() }));

    expect(await chromeTranslate("pick up", "en", "ru")).toBe("ok pick up");
  });

  it("starts downloading a pair ahead, without failing when it can't", async () => {
    const api = stubChromeTranslator({ availability: "downloadable" });

    prepareChromeTranslator("en", "ru");
    await vi.waitFor(() => expect(api.create).toHaveBeenCalledWith({ sourceLanguage: "en", targetLanguage: "ru" }));

    stubChromeTranslator({ availability: "unavailable" });
    expect(() => prepareChromeTranslator("en", "ja")).not.toThrow();
  });
});
