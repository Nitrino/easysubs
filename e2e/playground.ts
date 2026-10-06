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
  readonly wordPopover: Locator;
  readonly linePopover: Locator;
  readonly progressBar: Locator;
  readonly settingsButton: Locator;
  readonly settingsPanel: Locator;
  readonly trackSelect: Locator;
  readonly toast: Locator;

  constructor(readonly page: Page) {
    this.subs = page.locator("#es-subs");
    this.wordPopover = this.subs.locator(".es-popover--word");
    this.linePopover = this.subs.locator(".es-popover--line");
    this.progressBar = page.locator(".es-progress-bar");
    this.settingsButton = page.locator(".es-settings-icon");
    this.settingsPanel = page.locator(".es-settings-content");
    this.trackSelect = page.getByLabel("Subtitles", { exact: true });
    this.toast = page.locator(".es-toast").getByRole("status");
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

  async play() {
    await this.page.getByLabel("Play or pause").click();
    await expect.poll(() => this.isPaused()).toBe(false);
  }

  // Shows a subtitle file picked in the inspector, e.g. to have cues at the times a test needs
  async loadSubtitles(srt: string, name = "custom.srt") {
    await this.page.locator("#pg-subs-file").setInputFiles({ name, mimeType: "text/plain", buffer: Buffer.from(srt) });
  }

  // Replaces what the mock background answers: by message type ("translateFullText") or, for AnkiConnect, by
  // action ("post:addNote"); see playground/src/mockBackground.ts
  async mockAnswer(key: string, answer: unknown) {
    await this.page.evaluate(([name, value]) => (window.easysubsPlayground.mockAnswers[name as string] = value), [
      key,
      answer,
    ] as const);
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

  async closeSettings() {
    await this.settingsPanel.getByLabel("Close").click();
    await expect(this.settingsPanel).toBeHidden();
  }

  settingsRow(label: string) {
    return this.settingsPanel.locator(".es-settings-content__element", {
      has: this.page.locator(".es-settings-content__element__left", { hasText: label }),
    });
  }

  // Picks an option of a settings pop-up button, e.g. choose("Learning service", "Anki")
  async choose(label: string, option: string) {
    await this.settingsRow(label).locator(".es-select").click();
    await this.page.getByRole("option", { name: option, exact: true }).click();
  }

  // Opens the settings, changes them and closes the panel again
  async changeSettings(tab: "General" | "Subtitles" | "Experiments", change: () => Promise<void>) {
    await this.openSettings(tab);
    await change();
    await this.closeSettings();
  }

  // Records what speechSynthesis is asked to say instead of saying it; call before open()
  async recordSpeech() {
    await this.page.addInitScript(() => {
      const spoken: { text: string; lang: string; rate: number }[] = [];
      Object.assign(window, { spoken });
      speechSynthesis.speak = (utterance) =>
        void spoken.push({ text: utterance.text, lang: utterance.lang, rate: utterance.rate });
    });
  }

  spoken() {
    return this.page.evaluate(() => (window as unknown as { spoken: unknown[] }).spoken);
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
