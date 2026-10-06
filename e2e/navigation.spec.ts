import { test, expect } from "./playground";

// Cue timings come from playground/public/subs/en.srt
test.describe("keyboard navigation by subtitles", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
  });

  test("ArrowRight jumps to the next cue", async ({ playground, page }) => {
    await playground.seek(5);
    await expect(playground.subs).toContainText("pick up my keys");

    await page.keyboard.press("ArrowRight");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(7.2);
    await expect(playground.subs).toContainText("Hold on");
  });

  test("ArrowLeft jumps to the previous cue", async ({ playground, page }) => {
    await playground.seek(8);
    await expect(playground.subs).toContainText("Hold on");

    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(4);
  });

  test("ArrowDown replays the current cue", async ({ playground, page }) => {
    await playground.seek(9);
    await expect(playground.subs).toContainText("Hold on");

    await page.keyboard.press("ArrowDown");
    await expect.poll(() => playground.currentTime()).toBeGreaterThanOrEqual(7.2);
    expect(await playground.currentTime()).toBeLessThan(8.5);
    expect(await playground.isPaused()).toBe(false);
  });

  test("leaves the arrows to the player when disabled", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.settingsRow("Move by subs").locator(".es-switch").click();
    await playground.settingsPanel.getByLabel("Close").click();

    await playground.seek(5);
    await page.keyboard.press("ArrowRight");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(10);
  });
});
