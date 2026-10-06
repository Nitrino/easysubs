import { test, expect, offlineTranslations } from "./playground";

// The mock background answers from playground/fixtures/translations
const enRu = offlineTranslations("en-ru");

test.describe("translation", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");
  });

  test("translates a hovered word", async ({ playground }) => {
    await playground.word("keys").hover();

    const popover = playground.subs.locator(".es-popover--word");
    await expect(popover.locator(".es-title")).toHaveText(enRu.words.keys.main);
    expect(await playground.messages("translateWordFull")).toContainEqual(
      expect.objectContaining({ text: "keys", language: "ru" }),
    );
  });

  test("translates the whole line on click", async ({ playground }) => {
    await playground.word("need").click();

    await expect(playground.subs.locator(".es-popover--line")).toHaveText(
      enRu.lines["Almost. I just need to pick up my keys."],
    );
  });

  test("highlights a phrasal verb and shows its dictionary translation", async ({ playground }) => {
    await playground.word("pick").hover();

    await expect(playground.word("up")).toHaveClass(/es-sub-item-highlighted/);
    await expect(playground.subs.locator(".es-popover--word")).toContainText("pick up");
    expect(await playground.messages("translateWordFull")).toHaveLength(0);
  });

  test("pauses while the pointer is over the subtitles", async ({ playground, page }) => {
    await page.getByLabel("Play or pause").click();
    await expect.poll(() => playground.isPaused()).toBe(false);

    await playground.word("keys").hover();
    await expect.poll(() => playground.isPaused()).toBe(true);

    await page.mouse.move(0, 0);
    await expect.poll(() => playground.isPaused()).toBe(false);
  });

  test("adds a word to Anki", async ({ playground, page }) => {
    await playground.openSettings("General");
    await playground.settingsRow("Learning service").click();
    await page.getByRole("option", { name: "Anki" }).click();
    await playground.settingsPanel.getByLabel("Close").click();

    await playground.word("keys").hover();
    await playground.subs.locator(".es-popover--word .es-title.es-addable").click();

    await expect(page.locator(".es-toast").getByRole("status")).toHaveText("Word added to Anki");
    const ankiActions = (await playground.messages("post")).map(
      (message) => (message.data as { action: string }).action,
    );
    expect(ankiActions).toEqual(["createDeck", "modelNames", "addNote"]);
  });
});
