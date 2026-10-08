import { test, expect } from "./playground";

// A WebVTT line with a timestamp before every word, as YouTube's auto-generated captions come in WebVTT
const KARAOKE = `WEBVTT

00:00:01.000 --> 00:00:04.000
<c>One</c><00:00:02.000><c> two</c><00:00:03.000><c> three</c>
`;

test.describe("spoken word", () => {
  test.beforeEach(async ({ playground }) => {
    await playground.open();
    await playground.changeSettings("Experiments", async () => {
      await playground.settingsRow("Highlight spoken word").locator(".es-switch").click();
    });
  });

  test("lights the word being said, estimated from the line's time", async ({ playground, page }) => {
    const spoken = page.locator(".es-sub-item-spoken");

    await playground.seek(4.2);
    await expect(spoken).toHaveText("Almost.");

    await playground.seek(5.5);
    await expect(spoken).toHaveCount(1);
    await expect(spoken).not.toHaveText("Almost.");
  });

  test("follows the word timestamps of the subtitles", async ({ playground, page }) => {
    await playground.loadSubtitles(KARAOKE, "karaoke.vtt");
    const spoken = page.locator(".es-sub-item-spoken");

    await playground.seek(1.5);
    await expect(spoken).toHaveText("One");
    await playground.seek(2.5);
    await expect(spoken).toHaveText("two");
    await playground.seek(3.5);
    await expect(spoken).toHaveText("three");
  });

  test("shows every source's times for the line to compare them", async ({ playground, page }) => {
    await playground.changeSettings("Experiments", async () => {
      await playground.settingsRow("Compare sources").locator(".es-switch").click();
    });
    await playground.loadSubtitles(KARAOKE, "karaoke.vtt");
    await playground.seek(2.5);

    const compare = page.locator(".es-spoken-compare");
    const lane = (name: string) => compare.locator(".es-spoken-compare__lane", { hasText: name });
    await expect(lane("Subtitles").locator(".es-spoken-compare__word")).toHaveText(["One", "two", "three"]);
    await expect(lane("Subtitles").locator(".es-spoken-compare__error")).toHaveText("ref");
    await expect(lane("Estimate").locator(".es-spoken-compare__word")).toHaveCount(3);
    await expect(lane("Estimate").locator(".es-spoken-compare__error")).toHaveText(/^±\d+$/);
    await expect(lane("Yandex")).toContainText("—");
  });

  test("leaves the line unlit when the picked source has no times", async ({ playground, page }) => {
    await playground.changeSettings("Experiments", async () => {
      await playground.choose("Word times", "Yandex");
    });
    await playground.seek(4.2);

    await expect(playground.subs).toContainText("Almost.");
    await expect(page.locator(".es-sub-item-spoken")).toHaveCount(0);
  });
});
