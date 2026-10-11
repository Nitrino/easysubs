import { test, expect, type Playground } from "./playground";

const CUE = "Almost. I just need to pick up my keys.";

// A1 knows the 500 words said most: "almost" (472) is known, "pick" (519) and "keys" (key, 614) are new
async function setLevel(playground: Playground, level = "A1") {
  await playground.openSettings("Words");
  await playground.settingsPanel.getByRole("button", { name: "Set level" }).click();
  await playground.settingsPanel.getByRole("group", { name: "Levels" }).getByRole("button", { name: level }).click();
  await playground.closeSettings();
}

test.describe("known words", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toHaveText(CUE);
  });

  test("asks for the level before coloring new words, then colors the ones past it", async ({ playground }) => {
    await expect(playground.subs.locator(".es-sub-item-new")).toHaveCount(0);

    await playground.openSettings("Words");
    await expect(playground.settingsPanel.locator(".es-words-level-prompt")).toContainText(
      "What's your level in English?",
    );
    await playground.settingsPanel.getByRole("button", { name: "Set level" }).click();
    await expect(playground.settingsPanel.locator(".es-found__title")).toHaveText("Your level");
    await playground.settingsPanel.getByRole("group", { name: "Levels" }).getByRole("button", { name: "A1" }).click();

    await expect(playground.settingsRow("Level in English")).toContainText("A1 · 500 words");
    await expect(playground.settingsPanel.locator(".es-words-score")).toContainText(/You know \d+% of this episode/);
    await playground.closeSettings();

    await expect(playground.word("keys")).toHaveClass(/es-sub-item-new/);
    await expect(playground.word("pick")).toHaveClass(/es-sub-item-new/);
    await expect(playground.word("Almost.")).not.toHaveClass(/es-sub-item-new/);
  });

  test("estimates the level from the words tapped as known", async ({ playground }) => {
    await playground.openSettings("Words");
    await playground.settingsPanel.getByRole("button", { name: "Set level" }).click();
    await playground.settingsPanel.getByRole("button", { name: "Not sure? Check in a minute" }).click();

    const words = playground.settingsPanel.getByRole("group", { name: "Words to check" }).getByRole("button");
    await expect(words).toHaveCount(42);
    for (let index = 0; index < 10; index++) await words.nth(index).click();
    await expect(playground.settingsPanel.locator(".es-downloads__foot")).toContainText("10 words known");
    await playground.settingsPanel.getByRole("button", { name: "Done", exact: true }).click();

    await expect(playground.settingsPanel.locator(".es-words-level__result")).toContainText(
      /You know about [\d,]+ words/,
    );
    await playground.settingsPanel.getByRole("button", { name: "Use this level" }).click();
    await expect(playground.settingsRow("Level in English")).toBeVisible();
  });

  test("marks a word in the popover by its dictionary form", async ({ playground, page }) => {
    await setLevel(playground);

    await playground.word("my").hover();
    const status = playground.wordPopover.locator(".es-word-status");
    await expect(status).toContainText("Known by your level");
    await expect(status.getByRole("button", { name: "✓ Know" })).toBeDisabled();
    await page.mouse.move(0, 0);

    await playground.word("keys").hover();
    await expect(status).toContainText("New");
    await expect(status.locator(".es-word-status__rank")).toHaveText("Top 1k");
    await status.getByRole("button", { name: "+ Learn" }).click();
    await page.mouse.move(0, 0);
    await expect(playground.word("keys")).toHaveClass(/es-sub-item-learning/);

    await playground.word("keys").hover();
    await expect(status.getByRole("button", { name: "+ Learn" })).toHaveAttribute("aria-pressed", "true");
    await status.getByRole("button", { name: "✓ Know" }).click();
    await page.mouse.move(0, 0);
    await expect(playground.word("keys")).not.toHaveClass(/es-sub-item-(new|learning)/);
  });

  test("tells how much of the episode is known and marks the rest known", async ({ playground }) => {
    await setLevel(playground);
    await playground.openSettings("Words");
    const score = playground.settingsPanel.locator(".es-words-score");
    await expect(score).not.toContainText("You know 100% of this episode");

    await playground.settingsRow("Words of this episode").getByRole("button", { name: "All are known" }).click();
    await playground
      .settingsRow("Words of this episode")
      .getByRole("button", { name: /^Mark [\d,]+ words? known$/ })
      .click();

    await expect(score).toContainText("You know 100% of this episode");
    await expect(score).toContainText("0 new words");
    await playground.closeSettings();
    await expect(playground.subs.locator(".es-sub-item-new")).toHaveCount(0);
  });

  test("turns the colors off", async ({ playground }) => {
    await setLevel(playground);
    await playground.changeSettings("Words", () => playground.choose("Color words", "Off"));
    await expect(playground.subs.locator(".es-sub-item-new")).toHaveCount(0);
  });

  test("lists saved words, reviews them and exports a CSV file", async ({ playground, page }) => {
    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();
    await page.mouse.move(0, 0);
    // Learning words are colored before the level is set
    await expect(playground.word("keys")).toHaveClass(/es-sub-item-learning/);

    await playground.openSettings("Words");
    await playground.settingsRow("Saved words").getByRole("button").click();
    const sheet = playground.settingsPanel.locator(".es-found");
    await expect(sheet.locator(".es-found__title")).toHaveText("Saved words");
    await expect(sheet.locator(".es-words__row")).toHaveCount(1);
    await expect(sheet.locator(".es-words__word")).toContainText("key");
    await expect(sheet.locator(".es-words__context")).toHaveText(CUE);
    await expect(sheet.locator(".es-words__context b")).toHaveText("keys.");

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      sheet.getByRole("button", { name: "Export CSV" }).click(),
    ]);
    const csv = (await (await download.createReadStream()).toArray()).join("");
    expect(csv).toContain("word,translation,part of speech,status,language,context,source,url,added");
    expect(csv).toContain("key,");
    expect(csv).toContain(CUE);

    await sheet.getByRole("button", { name: "Review 1" }).click();
    await expect(sheet.locator(".es-words-review__word")).toHaveText("key");
    await sheet.getByRole("button", { name: "Show translation" }).click();
    await sheet.getByRole("button", { name: "Got it" }).click();
    await expect(sheet.locator(".es-words-review__word")).toHaveText("Done");
    await sheet.getByRole("button", { name: "Back to the list" }).click();
    await expect(sheet.getByRole("button", { name: "Nothing to review" })).toBeDisabled();

    await sheet.getByRole("button", { name: "Known", exact: true }).click();
    await expect(sheet.locator(".es-words__row")).toHaveCount(0);
    await sheet.getByRole("radio", { name: "Known 1" }).click();
    await expect(sheet.locator(".es-words__row")).toHaveCount(1);
  });
});
