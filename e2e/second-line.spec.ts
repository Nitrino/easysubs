import { test, expect, offlineTranslations } from "./playground";

const ALMOST = "Almost. I just need to pick up my keys.";
const SPANISH_ALMOST = "Casi. Solo tengo que buscar mis llaves.";
const russian = (line: string) => offlineTranslations("en-ru").lines[line];

test.describe("second subtitle line", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(ALMOST);
  });

  test("is off until it's turned on", async ({ playground }) => {
    await expect(playground.secondLine).toHaveCount(0);

    await playground.openSettings("Second line");
    await expect(playground.settingsRow("Second line")).toContainText("Off");
    await expect(playground.secondLineStatus()).toHaveText(
      "Pick a language to show a second line under the subtitles.",
    );
  });

  test("shows the video's Spanish track under the English subtitles", async ({ playground }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Spanish");

    await expect(playground.secondLineStatus()).toHaveText(
      "TrackSpanish subtitles from the playground. No translation needed.",
    );
    await expect(playground.settingsRow("Translator").locator("input")).toBeEnabled();
    await expect(playground.settingsPanel).toContainText("Used when the second line is translated.");
    await playground.closeSettings();

    await expect(playground.secondLine).toHaveText(SPANISH_ALMOST);
    expect(await playground.messages("translateBatch")).toHaveLength(0);

    // The Spanish track has no line for "She always says that…"
    await playground.seek(15);
    await expect(playground.secondLine).toHaveCount(0);
    await playground.seek(11);
    await expect(playground.secondLine).toHaveText("- Sí.\n- Entonces deberíamos irnos ya.");
  });

  test("translates into a language the video has no track for", async ({ playground }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Russian");

    await expect(playground.secondLineStatus()).toHaveText(
      "Auto-translateNo Russian subtitles in this video. Google Translate translates as you watch.",
    );
    await expect(playground.settingsPanel.locator(".es-settings-content__status--warning")).toHaveText(
      "Google may block frequent requests for a while. If lines stop translating, pick DeepL or ChatGPT.",
    );
    await playground.closeSettings();

    await expect(playground.secondLine).toHaveText(russian(ALMOST));
    const batches = await playground.messages("translateBatch");
    expect(batches).toHaveLength(1);
    expect(batches[0]).toMatchObject({ language: "ru", translator: "google" });
    expect(batches[0].texts).toContain("Did you turn off the lights in the kitchen?");

    await playground.seek(18);
    await expect(playground.secondLine).toHaveText(russian("Did you turn off the lights in the kitchen?"));
    expect(await playground.messages("translateBatch")).toHaveLength(1);
  });

  test("translates into a language the video has a track in, when picked to be translated", async ({ playground }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Spanish", "Google");

    await expect(playground.secondLineStatus()).toHaveText(
      "Auto-translateGoogle Translate translates as you watch, in place of the video's Spanish subtitles.",
    );
    await expect(playground.settingsRow("Second line")).toContainText("Spanish");
    await playground.closeSettings();

    await expect(playground.secondLine).toHaveText(offlineTranslations("en-es").lines[ALMOST]);
    expect(await playground.messages("translateBatch")).toMatchObject([{ language: "es" }]);
  });

  test("keeps the choice, and translates a video watched again without requests", async ({ playground, page }) => {
    await playground.changeSettings("Second line", () => playground.chooseSecondLine("Russian"));
    await expect(playground.secondLine).toHaveText(russian(ALMOST));

    await page.reload();
    await playground.seek(5);

    await expect(playground.secondLine).toHaveText(russian(ALMOST));
    expect(await playground.messages("translateBatch")).toHaveLength(0);
  });

  test("follows the translation language", async ({ playground }) => {
    // The browser of the tests speaks Russian
    await playground.changeSettings("Second line", () => playground.chooseSecondLine("Same as translation"));

    await expect(playground.secondLine).toHaveText(russian(ALMOST));
  });

  test("tells a failed translation", async ({ playground }) => {
    await playground.mockAnswer("translateBatch", { error: "Too many requests" });

    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Russian");

    await expect(playground.secondLineStatus()).toContainText("Google Translate failed: Too many requests");
  });

  test("asks for the key of DeepL picked as its translator", async ({ playground, page }) => {
    await playground.openSettings("Second line");
    await playground.chooseSecondLine("Russian");
    await playground.choose("Translator", "DeepL");

    await expect(page.getByText("DeepL API Key Configuration")).toBeVisible();
  });

  test("translates with Chrome's built-in translator, without requests", async ({ playground }) => {
    await playground.stubChromeTranslator();
    await playground.open();
    await playground.seek(5);

    await playground.openSettings("Second line");
    await playground.choose("Translator", "Chrome (on device)");
    await playground.chooseSecondLine("Russian");
    await expect(playground.secondLineStatus()).toContainText("Chrome (on device) translates as you watch.");
    await expect(playground.settingsPanel).toContainText("Translates on this device, free and without limits.");
    await playground.closeSettings();

    await expect(playground.secondLine).toHaveText(`[chrome:ru] ${ALMOST}`);
    expect(await playground.messages("translateBatch")).toEqual([]);
  });

  test("goes above the subtitles", async ({ playground }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.choose("Position", "Above the subtitles");
    });

    await expect(playground.subs.locator(".es-sub").first()).toHaveText(SPANISH_ALMOST);
    await expect(playground.subs.locator(".es-sub").last()).toHaveText(ALMOST);
  });

  test("goes to the top of the player, where it stays after dragging", async ({ playground, page }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.choose("Position", "Top of the player");
    });
    await expect(playground.topBlock).toHaveText(SPANISH_ALMOST);
    await expect(playground.subs).toHaveText(ALMOST);

    const box = await playground.topBlock.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2 + 60, { steps: 5 });
    await page.mouse.up();
    const offsets = await page.evaluate(() =>
      localStorage.getItem("easysubs-playground:persist:secondarySubsTopOffset"),
    );
    expect(JSON.parse(JSON.parse(offsets))).toEqual({ playground: { x: 40, y: 60 } });

    await page.reload();
    await playground.seek(5);
    await expect(playground.topBlock).toHaveCSS("transform", "matrix(1, 0, 0, 1, 40, 60)");
  });

  test("changes its size, color and background", async ({ playground }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.settingsRow("Size").getByLabel("Larger").click();
      await expect(playground.settingsRow("Size")).toContainText("80%");
      await playground.settingsRow("Color").getByLabel("White").click();
      await playground.settingsRow("Background").locator(".es-switch").click();
    });

    const fontSize = (locator: typeof playground.secondLine) =>
      locator.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    const ratio = (await fontSize(playground.secondLine)) / (await fontSize(playground.subs));
    expect(ratio).toBeCloseTo(0.8, 2);
    await expect(playground.secondLine).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(playground.secondLine).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("stays blurred until hovered", async ({ playground }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.choose("Show", "On hover");
    });

    await expect(playground.secondLine).toHaveCSS("filter", /blur/);
    await playground.subs.hover();
    await expect(playground.secondLine).toHaveCSS("filter", "none");
  });

  test("shows only while the video is paused", async ({ playground }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.choose("Show", "When paused");
    });
    await playground.seek(4);
    await expect(playground.secondLine).toHaveCSS("filter", "none");

    await playground.play();
    await expect(playground.secondLine).toHaveCSS("filter", /blur/);
  });

  test("hides with V and reveals while R is held", async ({ playground, page }) => {
    await playground.changeSettings("Second line", async () => {
      await playground.chooseSecondLine("Spanish");
      await playground.choose("Show", "On hover");
    });
    await page.mouse.move(5, 5);

    await page.keyboard.press("v");
    await expect(playground.secondLine).toHaveCount(0);
    await expect(page.locator(".es-secondary-notice")).toHaveText("Second line hidden. Press V to show it.");
    await page.keyboard.press("v");
    await expect(playground.secondLine).toHaveText(SPANISH_ALMOST);

    await page.keyboard.down("r");
    await expect(playground.secondLine).toHaveCSS("filter", "none");
    await page.keyboard.up("r");
    await expect(playground.secondLine).toHaveCSS("filter", /blur/);
  });

  test("leaves V and R to the player while it's off", async ({ page }) => {
    await page.evaluate(() => {
      Object.assign(window, { keys: [] as string[] });
      document.addEventListener("keydown", (event) => (window as unknown as { keys: string[] }).keys.push(event.code));
    });

    await page.keyboard.press("v");
    await page.keyboard.press("r");

    expect(await page.evaluate(() => (window as unknown as { keys: string[] }).keys)).toEqual(["KeyV", "KeyR"]);
    await expect(page.locator(".es-secondary-notice")).toHaveCount(0);
  });
});
