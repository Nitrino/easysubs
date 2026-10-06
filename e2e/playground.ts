import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test as base, expect, type Locator, type Page } from "@playwright/test";
import type { TranslationFixture } from "../playground/src/translationPairs";

// The offline mock answers with these translations, e.g. offlineTranslations("en-ru").words.keys.main
export const offlineTranslations = (pair: string): TranslationFixture =>
  JSON.parse(readFileSync(resolve(import.meta.dirname, `../playground/fixtures/translations/${pair}.json`), "utf8"));

// Page object for playground/index.html with the extension running in it
export class Playground {
  readonly subs: Locator;
  readonly settingsButton: Locator;
  readonly settingsPanel: Locator;
  readonly trackSelect: Locator;

  constructor(readonly page: Page) {
    this.subs = page.locator("#es-subs");
    this.settingsButton = page.locator(".es-settings-icon");
    this.settingsPanel = page.locator(".es-settings-content");
    this.trackSelect = page.getByLabel("Subtitles", { exact: true });
  }

  // Opens the playground with the offline background at 0 s; `subs` picks the initial track ("" for none)
  async open({ subs = "en" }: { subs?: string } = {}) {
    await this.page.goto(`/?${new URLSearchParams({ background: "mock", subs, t: "0" })}`);
    await expect(this.settingsButton).toBeVisible();
    await this.page.waitForFunction(() => document.querySelector("video").readyState >= HTMLMediaElement.HAVE_METADATA);
    // Phrasal verbs depend on the detected language and are only looked up when the current cue changes
    if (subs) {
      await this.page.waitForFunction(() =>
        window.easysubsPlayground.messages.some(
          (message) => message.request.type === "getTextLanguage" && message.durationMs !== undefined,
        ),
      );
    }
  }

  async seek(seconds: number) {
    await this.page.evaluate((time) => {
      const video = document.querySelector("video");
      return new Promise((resolve) => {
        video.addEventListener("seeked", resolve, { once: true });
        video.currentTime = time;
      });
    }, seconds);
  }

  currentTime() {
    return this.page.evaluate(() => document.querySelector("video").currentTime);
  }

  isPaused() {
    return this.page.evaluate(() => document.querySelector("video").paused);
  }

  // A word of the current subtitles; items keep their punctuation ("keys."), so it is ignored
  word(text: string) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return this.subs.locator(".es-sub-item").getByText(new RegExp(`^\\W*${escaped}\\W*$`));
  }

  async openSettings(tab?: "General" | "Subtitles" | "Experiments") {
    await this.settingsButton.click();
    await expect(this.settingsPanel).toBeVisible();
    if (tab) await this.settingsPanel.locator(".es-settings-content__menu__item", { hasText: tab }).click();
  }

  settingsRow(label: string) {
    return this.settingsPanel.locator(".es-settings-content__element", {
      has: this.page.locator(".es-settings-content__element__left", { hasText: label }),
    });
  }

  // Messages the content script sent to the background, oldest first
  messages(type?: string) {
    return this.page.evaluate(
      (messageType) =>
        window.easysubsPlayground.messages
          .map((message) => message.request)
          .filter((request) => !messageType || request.type === messageType),
      type,
    );
  }
}

export const test = base.extend<{ playground: Playground }>({
  playground: async ({ page }, use) => {
    await use(new Playground(page));
  },
});

export { expect };
