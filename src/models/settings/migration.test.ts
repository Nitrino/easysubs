import { describe, expect, it, vi } from "vitest";
import { storedItems } from "@root/test/chrome";

// Keys of v3.1.3 and earlier: the ids effector gave the settings stores, read from the built extension
const V3_1_3_SETTINGS = {
  "persist:202": "false", // enabled
  "persist:284": '"de"', // translateLanguage
  "persist:302": '"anki"', // learningService
  "persist:320": '"deepl"', // translationService
  "persist:338": '"test-deepl-key:fx"', // deeplApiKey
  "persist:402": "120", // subsFontSize
  "persist:456": "true", // autoPause
};

describe("settings saved by v3.1.3", () => {
  it("are restored and moved under the settings' names", async () => {
    await chrome.storage.local.set(V3_1_3_SETTINGS);

    const settings = await import(".");

    await vi.waitFor(() => expect(settings.$learningService.getState()).toBe("anki"));
    expect(settings.$enabled.getState()).toBe(false);
    expect(settings.$translateLanguage.getState()).toBe("de");
    expect(settings.$translationService.getState()).toBe("deepl");
    expect(settings.$deeplApiKey.getState()).toBe("test-deepl-key:fx");
    expect(settings.$subsFontSize.getState()).toBe(120);
    expect(settings.$autoPause.getState()).toBe(true);
    // Settings that weren't saved keep their defaults
    expect(settings.$subsBackgroundOpacity.getState()).toBe(50);

    await vi.waitFor(() => expect(Object.keys(storedItems()).some((key) => /^persist:\d+$/.test(key))).toBe(false));
    expect(storedItems()).toMatchObject({
      "persist:enabled": "false",
      "persist:learningService": '"anki"',
      "persist:subsFontSize": "120",
    });
  });
});
