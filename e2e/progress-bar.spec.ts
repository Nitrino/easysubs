import { test, expect } from "./playground";

// The progress bar shows the cues 15 s around the current time; cue timings come from playground/public/subs/en.srt
test.describe("subtitles progress bar", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
  });

  test("marks the cues around the current time", async ({ playground }) => {
    // Cues 1-6 start or end between -10 s and 20 s
    await expect(playground.progressBar.locator(".es-progress-bar-element")).toHaveCount(6);

    await playground.seek(40);
    // Cues 8-16 start or end between 25 s and 55 s
    await expect(playground.progressBar.locator(".es-progress-bar-element")).toHaveCount(9);
  });

  test("seeks to the clicked time", async ({ playground }) => {
    const container = playground.progressBar.locator(".es-progress-bar-container");
    const { width, height } = await container.boundingBox();

    // Three quarters of 30 s from 5 s - 15 s
    await container.click({ position: { x: width * 0.75, y: height / 2 } });

    await expect.poll(() => playground.currentTime()).toBeCloseTo(12.5, 0);
    await expect(playground.subs).toHaveText("- Right. - Then we should set off now.");
  });

  test("is empty without subtitles", async ({ playground }) => {
    await playground.trackSelect.selectOption("");

    await expect(playground.progressBar.locator(".es-progress-bar-element")).toHaveCount(0);
  });
});
