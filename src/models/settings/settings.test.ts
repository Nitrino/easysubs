import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { allSettled, fork, type StoreWritable } from "effector";
import "@src/models/init";
import {
  $autoPause,
  $chatGPTApiKeyModalOpen,
  $deeplApiKey,
  $deeplApiKeyModalOpen,
  $enabled,
  $learningService,
  $moveBySubsEnabled,
  $progressBarEnabled,
  $subsBackground,
  $subsBackgroundOpacity,
  $subsFontSize,
  $translateLanguage,
  $translationService,
  $activeSettingsTab,
  $autoStopEnabled,
  $chatGPTApiKey,
  $chatGPTModel,
  $netflixOnFlightEnabled,
  $ttsService,
  $secondarySubs,
  $secondarySubsBackground,
  $secondarySubsColor,
  $secondarySubsPosition,
  $secondarySubsReveal,
  $secondarySubsSize,
  $secondarySubsTopOffset,
  $secondarySubsTranslator,
  SECONDARY_SUBS_COLORS,
  deeplApiKeyChanged,
  deeplApiKeyModalClosed,
  enableToggleChanged,
  learningServiceChanged,
  moveBySubsEnabledChanged,
  progressBarEnabledChanged,
  subsBackgroundOpacityButtonPressed,
  subsFontSizeButtonPressed,
  translationServiceChanged,
  ttsServiceChanged,
  secondarySubsSizeButtonPressed,
  secondarySubsTopMoved,
  secondarySubsTranslatorChanged,
  translateLanguageChanged,
} from ".";
import { fetchCurrentStreamingFx } from "../streamings";
import { $subsLanguage } from "../subs";
import { moveKeyPressed } from "../videos";
import { createService } from "@root/test/service";
import { storedItems } from "@root/test/chrome";
import { stubChromeTranslator } from "@root/test/chromeTranslator";

const PERSISTED_SETTINGS: Record<string, StoreWritable<unknown>> = {
  $enabled,
  $activeSettingsTab,
  $progressBarEnabled,
  $autoStopEnabled,
  $netflixOnFlightEnabled,
  $moveBySubsEnabled,
  $translateLanguage,
  $learningService,
  $translationService,
  $ttsService,
  $deeplApiKey,
  $chatGPTApiKey,
  $chatGPTModel,
  $subsFontSize,
  $subsBackground,
  $subsBackgroundOpacity,
  $autoPause,
  $secondarySubs,
  $secondarySubsTranslator,
  $secondarySubsPosition,
  $secondarySubsSize,
  $secondarySubsColor,
  $secondarySubsBackground,
  $secondarySubsReveal,
  $secondarySubsTopOffset,
};

describe("settings defaults", () => {
  it("starts with EasySubs, the progress bar and moving by subtitles on", () => {
    expect($enabled.defaultState).toBe(true);
    expect($progressBarEnabled.defaultState).toBe(true);
    expect($moveBySubsEnabled.defaultState).toBe(true);
    expect($autoStopEnabled.defaultState).toBe(true);
    expect($autoPause.defaultState).toBe(false);
  });

  it("translates into the browser language with Google and no learning service", () => {
    expect(navigator.language).toBe("en-US");
    expect($translateLanguage.defaultState).toBe("en");
    expect($translationService.defaultState).toBe("google");
    expect($learningService.defaultState).toBe("disabled");
  });

  it("pronounces words with Google", () => {
    expect($ttsService.defaultState).toBe("google");
  });

  it("shows subtitles at 100% on a 50% background", () => {
    expect($subsFontSize.defaultState).toBe(100);
    expect($subsBackground.defaultState).toBe(true);
    expect($subsBackgroundOpacity.defaultState).toBe(50);
  });

  it("keeps the second line off, and translated by Google once on", () => {
    expect($secondarySubs.defaultState).toEqual({ language: "off" });
    expect($secondarySubsTranslator.defaultState).toBe("google");
  });

  it("shows the second line under the subtitles at 75%, in amber, on a background, always", () => {
    expect($secondarySubsPosition.defaultState).toBe("below");
    expect($secondarySubsSize.defaultState).toBe(75);
    expect($secondarySubsColor.defaultState).toBe(SECONDARY_SUBS_COLORS[0].value);
    expect($secondarySubsBackground.defaultState).toBe(true);
    expect($secondarySubsReveal.defaultState).toBe("always");
  });
});

describe("settings changes", () => {
  it("saves the chosen services", async () => {
    const scope = fork();

    await allSettled(learningServiceChanged, { scope, params: "anki" });
    await allSettled(translationServiceChanged, { scope, params: "bing" });

    expect(scope.getState($learningService)).toBe("anki");
    expect(scope.getState($translationService)).toBe("bing");
  });

  it("changes the subtitles size in steps", async () => {
    const scope = fork();

    await allSettled(subsFontSizeButtonPressed, { scope, params: 105 });

    expect(scope.getState($subsFontSize)).toBe(105);
  });

  it("keeps the background opacity between 0 and 100%", async () => {
    const scope = fork({ values: [[$subsBackgroundOpacity, 100]] });

    await allSettled(subsBackgroundOpacityButtonPressed, { scope, params: 105 });
    expect(scope.getState($subsBackgroundOpacity)).toBe(100);

    await allSettled(subsBackgroundOpacityButtonPressed, { scope, params: 0 });
    await allSettled(subsBackgroundOpacityButtonPressed, { scope, params: -5 });
    expect(scope.getState($subsBackgroundOpacity)).toBe(0);
  });

  it("asks for a DeepL API key when DeepL is chosen", async () => {
    const scope = fork();

    await allSettled(translationServiceChanged, { scope, params: "deepl" });
    expect(scope.getState($deeplApiKeyModalOpen)).toBe(true);
    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(false);

    await allSettled(deeplApiKeyChanged, { scope, params: "key:fx" });
    await allSettled(deeplApiKeyModalClosed, { scope });
    expect(scope.getState($deeplApiKey)).toBe("key:fx");
    expect(scope.getState($deeplApiKeyModalOpen)).toBe(false);
  });

  it("asks for a ChatGPT API key when ChatGPT is chosen", async () => {
    const scope = fork();

    await allSettled(translationServiceChanged, { scope, params: "chatgpt" });

    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(true);
    expect(scope.getState($deeplApiKeyModalOpen)).toBe(false);
  });

  it("asks for a ChatGPT API key when ChatGPT pronunciation is chosen without one", async () => {
    const scope = fork();

    await allSettled(ttsServiceChanged, { scope, params: "chatgpt" });

    expect(scope.getState($ttsService)).toBe("chatgpt");
    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(true);
  });

  it("uses the saved ChatGPT API key for pronunciation", async () => {
    const scope = fork({ values: [[$chatGPTApiKey, "sk-test"]] });

    await allSettled(ttsServiceChanged, { scope, params: "chatgpt" });

    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(false);
  });

  it("keeps the second line between 50 and 100% of the subtitles", async () => {
    const scope = fork({ values: [[$secondarySubsSize, 100]] });

    await allSettled(secondarySubsSizeButtonPressed, { scope, params: 105 });
    expect(scope.getState($secondarySubsSize)).toBe(100);

    await allSettled(secondarySubsSizeButtonPressed, { scope, params: 50 });
    await allSettled(secondarySubsSizeButtonPressed, { scope, params: 45 });
    expect(scope.getState($secondarySubsSize)).toBe(50);
  });

  it("asks for the key of a paid translator picked for the second line", async () => {
    const scope = fork({ values: [[$chatGPTApiKey, "sk-test"]] });

    await allSettled(secondarySubsTranslatorChanged, { scope, params: "deepl" });
    expect(scope.getState($secondarySubsTranslator)).toBe("deepl");
    expect(scope.getState($deeplApiKeyModalOpen)).toBe(true);

    await allSettled(deeplApiKeyModalClosed, { scope });
    await allSettled(secondarySubsTranslatorChanged, { scope, params: "chatgpt" });
    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(false);
  });

  it("doesn't change the word translator with the second line's", async () => {
    const scope = fork();

    await allSettled(secondarySubsTranslatorChanged, { scope, params: "chatgpt" });

    expect(scope.getState($translationService)).toBe("google");
  });

  it("keeps where the second line's top block was dropped for each service", async () => {
    const scope = fork();

    await allSettled(secondarySubsTopMoved, { scope, params: { service: "netflix", x: 10, y: 40 } });
    await allSettled(secondarySubsTopMoved, { scope, params: { service: "youtube", x: -5, y: 0 } });
    await allSettled(secondarySubsTopMoved, { scope, params: { service: "netflix", x: 12, y: 30 } });

    expect(scope.getState($secondarySubsTopOffset)).toEqual({ netflix: { x: 12, y: 30 }, youtube: { x: -5, y: 0 } });
  });

  it("asks for no key for the other services", async () => {
    const scope = fork();

    await allSettled(translationServiceChanged, { scope, params: "yandex" });
    await allSettled(ttsServiceChanged, { scope, params: "wiktionary" });

    expect(scope.getState($deeplApiKeyModalOpen)).toBe(false);
    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(false);
  });
});

// Chrome downloads a pair's model only during a click, so picking it starts the download
describe("Chrome's built-in translator", () => {
  const pairs = (api: ReturnType<typeof stubChromeTranslator>) => api.create.mock.calls.map(([pair]) => pair);

  it("prepares the pair of the subtitles on screen when it's picked for translation or the second line", async () => {
    const api = stubChromeTranslator({ availability: "downloadable" });
    const scope = fork({
      values: [
        [$subsLanguage, "en"],
        [$translateLanguage, "ru"],
      ],
    });

    await allSettled(translationServiceChanged, { scope, params: "chrome" });
    await allSettled(secondarySubsTranslatorChanged, { scope, params: "chrome" });

    expect(pairs(api)).toEqual([{ sourceLanguage: "en", targetLanguage: "ru" }]);
    expect(scope.getState($deeplApiKeyModalOpen)).toBe(false);
  });

  it("prepares the new pair when the language changes while it's picked", async () => {
    const api = stubChromeTranslator({ availability: "downloadable" });
    const scope = fork({
      values: [
        [$subsLanguage, "en"],
        [$translateLanguage, "ru"],
        [$secondarySubsTranslator, "chrome"],
      ],
    });

    await allSettled(translateLanguageChanged, { scope, params: "de" });

    expect(pairs(api)).toEqual([{ sourceLanguage: "en", targetLanguage: "de" }]);
  });

  it("prepares nothing for other translators or before the subtitles' language is known", async () => {
    const api = stubChromeTranslator({ availability: "downloadable" });

    await allSettled(translationServiceChanged, { scope: fork({ values: [[$subsLanguage, "en"]] }), params: "deepl" });
    await allSettled(translationServiceChanged, { scope: fork(), params: "chrome" });
    await allSettled(translateLanguageChanged, { scope: fork({ values: [[$subsLanguage, "en"]] }), params: "de" });

    expect(api.create).not.toHaveBeenCalled();
  });
});

// The page styles hide EasySubs parts by these classes; store watchers only run outside scopes
describe("settings classes on the page", () => {
  const moves = vi.fn();

  beforeAll(async () => {
    moveKeyPressed.watch(moves);
    fetchCurrentStreamingFx.use(() => createService());
    await fetchCurrentStreamingFx();
  });

  afterAll(() => {
    enableToggleChanged(true);
    progressBarEnabledChanged(true);
    moveBySubsEnabledChanged(true);
  });

  it("marks the page while EasySubs is enabled", async () => {
    enableToggleChanged(false);
    await vi.waitFor(() => expect(document.body.classList).not.toContain("es-enabled"));

    enableToggleChanged(true);
    await vi.waitFor(() => expect(document.body.classList).toContain("es-enabled"));
  });

  it("marks the page while the progress bar is enabled", async () => {
    progressBarEnabledChanged(false);
    await vi.waitFor(() => expect(document.body.classList).not.toContain("es-progress-bar-enabled"));

    progressBarEnabledChanged(true);
    await vi.waitFor(() => expect(document.body.classList).toContain("es-progress-bar-enabled"));
  });

  it("takes the arrows only while moving by subtitles is on", async () => {
    const pressArrow = () => document.body.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowRight" }));

    moveBySubsEnabledChanged(false);
    await vi.waitFor(() => expect(document.body.classList).not.toContain("es-move-by-subs-enabled"));
    pressArrow();
    expect(moves).not.toHaveBeenCalled();

    moveBySubsEnabledChanged(true);
    await vi.waitFor(() => expect(document.body.classList).toContain("es-move-by-subs-enabled"));
    pressArrow();
    expect(moves).toHaveBeenCalledOnce();
  });
});

describe("settings storage", () => {
  it("saves a setting to chrome.storage under its name", async () => {
    learningServiceChanged("puzzle-english");

    await vi.waitFor(() => expect(storedItems()).toMatchObject({ "persist:learningService": '"puzzle-english"' }));
    learningServiceChanged("disabled");
  });

  // Keys used to be unit ids, which change with the order units are created in
  it("names every saved setting", () => {
    for (const [variable, store] of Object.entries(PERSISTED_SETTINGS)) {
      expect(store.shortName).toBe(variable.slice(1));
    }
  });
});
