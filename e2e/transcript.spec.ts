import { test, expect, offlineTranslations } from "./playground";

const ALMOST = "Almost. I just need to pick up my keys.";
const KITCHEN = "Did you turn off the lights in the kitchen?";
const SPANISH_ALMOST = "Casi. Solo tengo que buscar mis llaves.";
const russian = (line: string) => offlineTranslations("en-ru").lines[line];

test.describe("transcript sidebar", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(ALMOST);
  });

  test("opens with Shift+T and shows every line with its translation", async ({ playground, page }) => {
    const transcript = page.locator(".es-transcript");
    await expect(transcript).toHaveCount(0);

    await page.keyboard.press("Shift+T");

    await expect(transcript).toBeVisible();
    const almost = transcript.locator(".es-transcript__line", { hasText: ALMOST });
    await expect(almost).toHaveClass(/es-transcript__line--current/);
    await expect(almost.locator(".es-transcript__time")).toHaveText("0:04");
    // The second line is off, so the lines are translated into the translation language (the browser's Russian)
    await expect(almost.locator(".es-transcript__second")).toHaveText(russian(ALMOST));
    expect(await playground.messages("translateBatch")).toMatchObject([{ language: "ru", translator: "google" }]);

    await page.keyboard.press("Shift+T");
    await expect(transcript).toHaveCount(0);
  });

  test("plays from a clicked line", async ({ playground, page }) => {
    await playground.changeSettings("General", () => playground.settingsRow("Transcript").locator("label").click());

    await page.locator(".es-transcript__line", { hasText: KITCHEN }).click();

    await expect.poll(() => playground.currentTime()).toBeCloseTo(17.5, 1);
    await expect(playground.subs.locator(".es-sub").first()).toHaveText(KITCHEN);
    await expect(page.locator(".es-transcript__line--current")).toContainText(KITCHEN);
  });

  test("finds lines in both languages", async ({ page }) => {
    await page.keyboard.press("Shift+T");
    const search = page.getByLabel("Search the transcript");
    const lines = page.locator(".es-transcript__line");

    await search.fill("kitchen");
    await expect(lines).toHaveCount(1);
    await expect(lines.locator("mark").first()).toHaveText("kitchen");
    await expect(page.locator(".es-transcript__count")).toHaveText("1 line");

    // Typing doesn't reach the player's shortcuts
    await search.press("ArrowLeft");
    await expect(page.locator(".es-transcript")).toBeVisible();

    await search.fill(russian(KITCHEN).split(" ").at(-1)!.replace(/\p{P}+$/u, ""));
    await expect(lines).toHaveCount(1);
    await expect(lines).toContainText(KITCHEN);

    await search.press("Escape");
    await expect(search).toHaveValue("");
    expect(await lines.count()).toBeGreaterThan(5);
  });

  test("shows the second line's track without translating", async ({ playground, page }) => {
    await playground.changeSettings("Second line", () => playground.chooseSecondLine("Spanish"));
    await page.keyboard.press("Shift+T");

    await expect(
      page.locator(".es-transcript__line", { hasText: ALMOST }).locator(".es-transcript__second"),
    ).toHaveText(SPANISH_ALMOST);
    expect(await playground.messages("translateBatch")).toHaveLength(0);
  });
});
