import { test, expect } from "./playground";

test.describe("settings", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toBeVisible();
  });

  test("turns EasySubs off and on", async ({ playground, page }) => {
    await playground.openSettings("General");
    const toggle = playground.settingsRow("Enabled").locator(".es-switch");

    await toggle.click();
    await expect(page.locator("body")).not.toHaveClass(/\bes-enabled\b/);
    await expect(playground.subs).toBeHidden();

    await toggle.click();
    await expect(playground.subs).toBeVisible();
  });

  test("hides the subtitles progress bar", async ({ playground, page }) => {
    await expect(page.locator(".es-progress-bar")).toBeVisible();

    await playground.openSettings("General");
    await playground.settingsRow("Progress bar").locator(".es-switch").click();

    await expect(page.locator(".es-progress-bar")).toBeHidden();
  });

  test("keeps the subtitles size after a reload", async ({ playground, page }) => {
    const fontSize = () => playground.subs.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    const initialSize = await fontSize();

    await playground.openSettings("Subtitles");
    const sizeRow = playground.settingsRow("Subtitles size");
    await sizeRow.locator(".es-stepper__button").last().click();
    await expect(sizeRow.locator(".es-stepper__value")).toHaveText("105%");
    expect(await fontSize()).toBeGreaterThan(initialSize);

    await page.reload();
    await expect(playground.settingsButton).toBeVisible();
    await playground.openSettings("Subtitles");
    await expect(playground.settingsRow("Subtitles size").locator(".es-stepper__value")).toHaveText("105%");
  });

  test("shifts the subtitles by the delay", async ({ playground }) => {
    await playground.openSettings("Subtitles");
    const delayRow = playground.settingsRow("Subtitles delay");
    await delayRow.locator(".es-stepper__button").last().click();
    await playground.settingsPanel.getByLabel("Close").click();

    // Cue 2 is 4.0-6.8 s; delayed subtitles appear later
    await playground.seek(4.2);
    await expect(playground.subs).not.toContainText("pick up my keys");
    await playground.seek(6.9);
    await expect(playground.subs).toContainText("pick up my keys");
  });
});
