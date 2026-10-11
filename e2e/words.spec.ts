import { test, expect } from "./playground";

const CUE = "Almost. I just need to pick up my keys.";

test.describe("known words", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toHaveText(CUE);
  });

  test("colors new words and the ones marked in the popover", async ({ playground, page }) => {
    await expect(playground.word("keys")).toHaveClass(/es-sub-item-new/);

    await playground.word("keys").hover();
    const status = playground.wordPopover.getByRole("radiogroup", { name: "Word status" });
    await expect(status.getByRole("radio", { name: "New" })).toHaveAttribute("aria-checked", "true");

    await status.getByRole("radio", { name: "Learning" }).click();
    await page.mouse.move(0, 0);
    await expect(playground.word("keys")).toHaveClass(/es-sub-item-learning/);

    await playground.word("keys").hover();
    await status.getByRole("radio", { name: "Known" }).click();
    await page.mouse.move(0, 0);
    await expect(playground.word("keys")).not.toHaveClass(/es-sub-item-(new|learning)/);
  });

  test("tells how much of the episode is known and marks the rest known", async ({ playground }) => {
    await playground.openSettings("Words");
    const score = playground.settingsPanel.locator(".es-words-score");
    await expect(score).toContainText("You know 0% of this episode");

    await playground.settingsRow("Words of this episode").getByRole("button", { name: "New ones are known" }).click();
    await playground
      .settingsRow("Words of this episode")
      .getByRole("button", { name: /^Mark \d+ words known$/ })
      .click();

    await expect(score).toContainText("You know 100% of this episode");
    await expect(score).toContainText("0 new words");
    await playground.closeSettings();
    await expect(playground.subs.locator(".es-sub-item-new")).toHaveCount(0);
  });

  test("turns the colors off", async ({ playground }) => {
    await playground.changeSettings("Words", () => playground.choose("Color words", "Off"));
    await expect(playground.subs.locator(".es-sub-item-new")).toHaveCount(0);
  });

  test("lists saved words, reviews them and exports a CSV file", async ({ playground, page }) => {
    await playground.word("keys").hover();
    await playground.wordPopover.locator(".es-title.es-addable").click();

    await playground.openSettings("Words");
    await playground.settingsRow("Saved words").getByRole("button").click();
    const sheet = playground.settingsPanel.locator(".es-found");
    await expect(sheet.locator(".es-found__title")).toHaveText("Saved words");
    await expect(sheet.locator(".es-words__row")).toHaveCount(1);
    await expect(sheet.locator(".es-words__context")).toHaveText(CUE);

    const [download] = await Promise.all([
      page.waitForEvent("download"),
      sheet.getByRole("button", { name: "Export CSV" }).click(),
    ]);
    const csv = (await (await download.createReadStream()).toArray()).join("");
    expect(csv).toContain("word,translation,status,language,context,source,url,added");
    expect(csv).toContain(`keys,`);
    expect(csv).toContain(CUE);

    await sheet.getByRole("button", { name: "Review 1" }).click();
    await expect(sheet.locator(".es-words-review__word")).toHaveText("keys");
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
