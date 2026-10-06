import { test, expect } from "./playground";

test.describe("player", () => {
  test("starts muted and toggles the sound", async ({ playground, page }) => {
    await playground.open();
    const isMuted = () => page.evaluate(() => document.querySelector("video").muted);
    const muteButton = page.getByRole("button", { name: "Mute", exact: true });

    expect(await isMuted()).toBe(true);
    await expect(muteButton).toHaveAttribute("aria-pressed", "true");

    await muteButton.click();
    expect(await isMuted()).toBe(false);
    await expect(muteButton).toHaveAttribute("aria-pressed", "false");

    await page.keyboard.press("m");
    expect(await isMuted()).toBe(true);
  });
});
