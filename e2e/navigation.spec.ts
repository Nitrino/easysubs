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

  test("ArrowLeft jumps to the cue that has just ended from a pause between cues", async ({ playground, page }) => {
    await playground.seek(7);
    await expect(playground.subs.locator(".es-sub")).toHaveCount(0);

    await page.keyboard.press("ArrowLeft");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(4);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");
  });

  test("leaves the arrows to the player when disabled", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.settingsRow("Move by subs").locator(".es-switch").click();
    await playground.closeSettings();

    await playground.seek(5);
    await page.keyboard.press("ArrowRight");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(10);
  });
});

// Two cues 18 s apart, farther than the 5 s an arrow seeks
const FAR_APART = `1
00:00:01,000 --> 00:00:02,000
First line.

2
00:00:20,000 --> 00:00:22,000
Second line.
`;

test.describe("keyboard navigation by far subtitles", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.loadSubtitles(FAR_APART);
  });

  test("ArrowRight seeks 5 s when the next cue is farther", async ({ playground, page }) => {
    await playground.seek(1.5);
    await expect(playground.subs).toHaveText("First line.");

    await page.keyboard.press("ArrowRight");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(6.5);
  });

  test("Alt+ArrowRight jumps to a far next cue", async ({ playground, page }) => {
    await playground.seek(1.5);
    await expect(playground.subs).toHaveText("First line.");

    await page.keyboard.press("Alt+ArrowRight");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(20);
    await expect(playground.subs).toHaveText("Second line.");
  });

  test("Alt+ArrowLeft jumps to a far previous cue", async ({ playground, page }) => {
    await playground.seek(21);
    await expect(playground.subs).toHaveText("Second line.");

    await page.keyboard.press("Alt+ArrowLeft");
    await expect.poll(() => playground.currentTime()).toBeCloseTo(1);
    await expect(playground.subs).toHaveText("First line.");
  });
});
