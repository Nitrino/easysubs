import { test, expect } from "./playground";

test.describe("settings saved by v3.1.3", () => {
  test("are kept", async ({ playground, page }) => {
    // v3.1.3 saved settings under the ids effector gave the stores; the playground keeps chrome.storage in
    // localStorage
    await page.addInitScript(() => {
      if (sessionStorage.getItem("seeded")) return;
      sessionStorage.setItem("seeded", "1");
      localStorage.setItem("easysubs-playground:persist:302", JSON.stringify('"anki"'));
      localStorage.setItem("easysubs-playground:persist:402", JSON.stringify("120"));
    });
    await playground.open();

    await playground.openSettings("General");
    await expect(playground.settingsRow("Learning service")).toContainText("Anki");
    await playground.settingsPanel.locator(".es-settings-content__menu__item", { hasText: "Subtitles" }).click();
    await expect(playground.settingsRow("Subtitles size").locator(".es-stepper__value")).toHaveText("120%");

    const keys = await page.evaluate(() => Object.keys(localStorage));
    expect(keys).toContain("easysubs-playground:persist:learningService");
    expect(keys).not.toContain("easysubs-playground:persist:302");
  });
});

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

  test("hides the subtitles progress bar", async ({ playground }) => {
    await expect(playground.progressBar).toBeVisible();

    await playground.openSettings("General");
    await playground.settingsRow("Progress bar").locator(".es-switch").click();

    await expect(playground.progressBar).toBeHidden();
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

  test("hides the subtitles background", async ({ playground }) => {
    const sub = playground.subs.locator(".es-sub");
    await expect(sub).toHaveCSS("background-color", "rgba(0, 0, 0, 0.5)");

    await playground.openSettings("Subtitles");
    await playground.settingsRow("Show background").locator(".es-switch").click();

    await expect(sub).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("changes the background opacity up to 100%", async ({ playground }) => {
    await playground.openSettings("Subtitles");
    const opacityRow = playground.settingsRow("Background opacity");
    const increase = opacityRow.locator(".es-stepper__button").last();

    await increase.click();
    await expect(opacityRow.locator(".es-stepper__value")).toHaveText("55%");
    await expect(playground.subs.locator(".es-sub")).toHaveCSS("background-color", "rgba(0, 0, 0, 0.55)");

    for (let step = 0; step < 10; step++) await increase.click();
    await expect(opacityRow.locator(".es-stepper__value")).toHaveText("100%");
  });

  test("pauses at the end of every cue with auto pause", async ({ playground }) => {
    await playground.changeSettings("General", () =>
      playground.settingsRow("Auto pause").locator(".es-switch").click(),
    );

    // Cue 2 ends at 6.8 s
    await playground.seek(6);
    await playground.play();

    await expect.poll(() => playground.isPaused(), { timeout: 3000 }).toBe(true);
    const time = await playground.currentTime();
    expect(time).toBeGreaterThan(6.4);
    expect(time).toBeLessThan(6.8);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");
  });

  test("keeps the chosen services and tab after a reload", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.choose("Learning service", "Anki");
    await playground.choose("Translation service", "Yandex Translate");
    await playground.choose("Pronunciation", "Wiktionary");
    await playground.settingsPanel.locator(".es-settings-content__menu__item", { hasText: "Experiments" }).click();

    await page.reload();
    await expect(playground.settingsButton).toBeVisible();
    await playground.openSettings();

    await expect(playground.settingsPanel.locator(".es-settings-content__menu__item--active")).toHaveText(
      "Experiments",
    );
    await playground.settingsPanel.locator(".es-settings-content__menu__item", { hasText: "General" }).click();
    await expect(playground.settingsRow("Learning service")).toContainText("Anki");
    await expect(playground.settingsRow("Translation service")).toContainText("Yandex Translate");
    await expect(playground.settingsRow("Pronunciation")).toContainText("Wiktionary");
  });

  test("closes on a click outside", async ({ playground, page }) => {
    await playground.openSettings("General");

    await page.mouse.click(5, 5);

    await expect(playground.settingsPanel).toBeHidden();
  });

  test("stays open while a pop-up menu is used", async ({ playground }) => {
    await playground.openSettings("General");

    await playground.choose("Learning service", "Anki");

    await expect(playground.settingsPanel).toBeVisible();
  });

  test("shifts the subtitles by the delay", async ({ playground }) => {
    await playground.openSettings("Subtitles");
    const delayRow = playground.settingsRow("Subtitles delay");
    await delayRow.locator(".es-stepper__button").last().click();
    await playground.closeSettings();

    // Cue 2 is 4.0-6.8 s; delayed subtitles appear later
    await playground.seek(4.2);
    await expect(playground.subs).not.toContainText("pick up my keys");
    await playground.seek(6.9);
    await expect(playground.subs).toContainText("pick up my keys");
  });
});
