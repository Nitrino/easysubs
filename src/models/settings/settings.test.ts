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
  deeplApiKeyChanged,
  deeplApiKeyModalClosed,
  enableToggleChanged,
  learningServiceChanged,
  moveBySubsEnabledChanged,
  progressBarEnabledChanged,
  subsBackgroundOpacityButtonPressed,
  subsFontSizeButtonPressed,
  translationServiceChanged,
} from ".";
import { fetchCurrentStreamingFx } from "../streamings";
import { moveKeyPressed } from "../videos";
import { createService } from "@root/test/service";
import { storedItems } from "@root/test/chrome";

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
  $deeplApiKey,
  $chatGPTApiKey,
  $chatGPTModel,
  $subsFontSize,
  $subsBackground,
  $subsBackgroundOpacity,
  $autoPause,
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

  it("shows subtitles at 100% on a 50% background", () => {
    expect($subsFontSize.defaultState).toBe(100);
    expect($subsBackground.defaultState).toBe(true);
    expect($subsBackgroundOpacity.defaultState).toBe(50);
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

  it("asks for no key for the other services", async () => {
    const scope = fork();

    await allSettled(translationServiceChanged, { scope, params: "yandex" });

    expect(scope.getState($deeplApiKeyModalOpen)).toBe(false);
    expect(scope.getState($chatGPTApiKeyModalOpen)).toBe(false);
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
