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
  // The second subtitle line: under or above the cues, or in its own block at the top of the player
  readonly secondLine: Locator;
  readonly topBlock: Locator;
  // The search for subtitles online, in place of the settings panel
  readonly sheet: Locator;

  constructor(readonly page: Page) {
    this.subs = page.locator("#es-subs");
    this.secondLine = page.locator(".es-sub--secondary");
    this.topBlock = page.locator("#es-top-subs");
    this.sheet = page.locator(".es-found");
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
    // Phrasal verbs and idioms are looked up for the whole track once its language is detected
    if (subs) {
      await this.page.waitForFunction(() =>
        ["getTextLanguage", "findExpressions"].every((type) =>
          window.easysubsPlayground.messages.some(
            (message) => message.request.type === type && message.durationMs !== undefined,
          ),
        ),
      );
    }
  }

  // Chrome's built-in Translator API, translating into "[chrome:ru] text"; call before open(). Playwright's Chromium
  // has no models of its own.
  async stubChromeTranslator({ availability = "available" } = {}) {
    await this.page.addInitScript((answer) => {
      const created: unknown[] = [];
      Object.assign(window, {
        chromeTranslators: created,
        Translator: {
          availability: async () => answer,
          create: async (pair: { sourceLanguage: string; targetLanguage: string }) => {
            created.push(pair);
            return { translate: async (text: string) => `[chrome:${pair.targetLanguage}] ${text}` };
          },
        },
      });
    }, availability);
  }

  // The language pairs Chrome's translator was created for
  chromeTranslators() {
    return this.page.evaluate(() => (window as unknown as { chromeTranslators: unknown[] }).chromeTranslators);
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

  async openSettings(tab?: SettingsTab) {
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

  // Picks the second line's language: its options also name their source ("Spanish Track", "Spanish Google"), the
  // first one unless `source` says which
  async chooseSecondLine(language: string, source = "") {
    await this.settingsRow("Second line").locator(".es-select").click();
    await this.page
      .getByRole("option", { name: new RegExp(`^${language}.*${source}`) })
      .first()
      .click();
  }

  // The line under the Second line picker naming where the line comes from
  secondLineStatus() {
    return this.settingsPanel.locator(".es-settings-content__status").first();
  }

  // Opens the search for subtitles from the Subtitles tab ("Subtitles from" → Find subtitles…), for the main line
  async openSearch() {
    await this.openSettings("Subtitles");
    await this.choose("Subtitles from", "Find subtitles…");
    await expect(this.sheet).toBeVisible();
  }

  // A result of the search by its release name
  result(release: string) {
    return this.sheet.locator(".es-found__result", { has: this.page.getByText(release, { exact: true }) });
  }

  // The file loaded on the line the sheet loads to: name, release, how it was synced
  loadedFile() {
    return this.sheet.locator(".es-found__loaded");
  }

  // Opens the settings, changes them and closes the panel again
  async changeSettings(tab: SettingsTab, change: () => Promise<void>) {
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

  // Records the sounds played through Web Audio (the pronunciation services' audio), still playing them; call before
  // open()
  async recordAudio() {
    await this.page.addInitScript(() => {
      const played: { duration: number }[] = [];
      Object.assign(window, { played });
      const start = AudioBufferSourceNode.prototype.start;
      AudioBufferSourceNode.prototype.start = function (...args) {
        played.push({ duration: this.buffer?.duration ?? 0 });
        return start.apply(this, args);
      };
    });
  }

  played() {
    return this.page.evaluate(() => (window as unknown as { played: { duration: number }[] }).played);
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

type SettingsTab = "General" | "Subtitles" | "Second line" | "Experiments";

export const test = base.extend<{ playground: Playground }>({
  playground: async ({ page }, use) => {
    await use(new Playground(page));
  },
});

export { expect };
