import { test, expect } from "./playground";

// AI subtitles from the video's audio. The playground's video has no speech, so a stand-in for the speech models
// reports what Whisper would; the lines Whisper's words make are covered by src/models/aiSubs/aiSubs.test.ts.

test.describe("AI subtitles", () => {
  test.beforeEach(async ({ playground, page }) => {
    await playground.open({ subs: "" });
    await page.evaluate(() => {
      const listeners: ((event: unknown) => void)[] = [];
      Object.assign(window, {
        aiWorkerEvent: (event: unknown) => listeners.forEach((listener) => listener(event)),
        easysubsAudioWorker: () => ({
          request: () => new Promise(() => {}),
          onEvent: (listener: (event: unknown) => void) => listeners.push(listener),
          close: () => {},
        }),
      });
    });
  });

  test("makes the main line from the video's audio in the language picked", async ({ playground, page }) => {
    await playground.openSettings("Subtitles");
    await playground.settingsRow("Subtitles from").locator(".es-select").click();
    await page.getByRole("option", { name: /^AI subtitles/ }).click();

    const card = playground.settingsPanel.locator(".es-ai-subs");
    await expect(card).toContainText("Waiting for the video's audio");
    await expect(playground.settingsRow("Subtitles from")).toContainText("AI subtitles");

    await page.evaluate(() =>
      (window as unknown as { aiWorkerEvent: (event: unknown) => void }).aiWorkerEvent({
        type: "status",
        model: "whisper",
        status: "downloading 40%",
      }),
    );
    await expect(card).toContainText("Downloading the speech model (77 MB, once): 40%");

    await card.locator(".es-select").click();
    await page.getByRole("option", { name: "Spanish", exact: true }).click();
    await expect(card.locator(".es-select")).toContainText("Spanish");

    await card.getByRole("button", { name: "Remove" }).click();
    await expect(card).toBeHidden();
    await expect(playground.settingsRow("Subtitles from")).toContainText("From the playground");
  });
});
