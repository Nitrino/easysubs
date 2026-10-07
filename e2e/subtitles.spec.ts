import { test, expect } from "./playground";

test.describe("subtitles", () => {
  test("shows the cue for the current time", async ({ playground }) => {
    await playground.open();

    await playground.seek(5);
    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.");

    await playground.seek(22);
    await expect(playground.subs).toHaveText("Yes. And I asked Sam to look after the cat.");
  });

  test("hides subtitles between cues", async ({ playground }) => {
    await playground.open();
    await playground.seek(5);
    await expect(playground.subs.locator(".es-sub")).toHaveCount(1);

    await playground.seek(3.7);
    await expect(playground.subs.locator(".es-sub")).toHaveCount(0);
  });

  test("renders every line of a multi-line cue", async ({ playground }) => {
    await playground.open();
    await playground.seek(11);

    await expect(playground.subs).toHaveText("- Right. - Then we should set off now.");
  });

  test("keeps italic and bold markup", async ({ playground }) => {
    await playground.open();

    await playground.seek(15);
    await expect(playground.word("always")).toHaveClass(/\bi\b/);
    await expect(playground.word("always")).toHaveCSS("font-style", "italic");

    await playground.seek(52);
    await expect(playground.word("Next")).toHaveClass(/\bb\b/);
    await expect(playground.word("Next")).toHaveCSS("font-weight", "700");
    await expect(playground.word("coast")).not.toHaveClass(/\bb\b/);
  });

  test("follows the player's subtitle track", async ({ playground }) => {
    await playground.open();
    await playground.seek(2);
    await expect(playground.subs).toHaveText("Hello there! Are you ready to go?");

    await playground.trackSelect.selectOption("es");
    await expect(playground.subs).toHaveText("¡Hola! ¿Estás lista para salir?");

    await playground.trackSelect.selectOption("");
    await expect(playground.subs.locator(".es-sub")).toHaveCount(0);
  });

  test("loads a subtitle file picked by the user", async ({ playground, page }) => {
    await playground.open();
    await page.locator("#pg-subs-file").setInputFiles({
      name: "custom.srt",
      mimeType: "text/plain",
      buffer: Buffer.from("1\n00:00:01,000 --> 00:00:09,000\nA line from my own file.\n"),
    });

    await playground.seek(3);
    await expect(playground.subs).toHaveText("A line from my own file.");
  });

  test("changes the cue while the video plays", async ({ playground }) => {
    await playground.open();
    await playground.seek(3.2);
    await expect(playground.subs).toHaveText("Hello there! Are you ready to go?");

    await playground.play();

    await expect(playground.subs).toHaveText("Almost. I just need to pick up my keys.", { timeout: 3000 });
  });

  test("moves by dragging", async ({ playground, page }) => {
    await playground.open();
    await playground.seek(5);
    const before = await playground.subs.boundingBox();

    // From the background next to the words
    const sub = await playground.subs.locator(".es-sub").boundingBox();
    await page.mouse.move(sub.x + 2, sub.y + sub.height / 2);
    await page.mouse.down();
    await page.mouse.move(sub.x + 2, sub.y + sub.height / 2 - 100, { steps: 5 });
    await page.mouse.up();

    const after = await playground.subs.boundingBox();
    expect(after.y).toBeCloseTo(before.y - 100, 0);
    expect(after.x).toBeCloseTo(before.x, 0);
  });

  test("scales with the player", async ({ playground, page }) => {
    await playground.open();
    await playground.seek(5);
    const fontSize = () => playground.subs.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    const initialSize = await fontSize();

    await page.setViewportSize({ width: 1600, height: 1000 });
    // The size is computed when subtitles render, e.g. on the next cue
    await playground.seek(8);

    await expect.poll(fontSize).toBeGreaterThan(initialSize);
  });

  test("detects the subtitles language", async ({ playground }) => {
    await playground.open();

    await expect.poll(() => playground.messages("getTextLanguage")).toHaveLength(1);
  });
});
