import { readFile, rm } from "node:fs/promises";
import { test, expect } from "./playground";

// Width and height from the PNG header (the IHDR chunk)
const pngSize = (png: Buffer) => ({ width: png.readUInt32BE(16), height: png.readUInt32BE(20) });

test.describe("screenshots", () => {
  test("captures the Web Store size with a word translation open", async ({ playground, page }) => {
    await playground.open();
    await page.getByLabel("Screenshot size").selectOption("store");
    await page.getByRole("button", { name: "1×", exact: true }).click();
    await playground.seek(5);
    await playground.word("keys").hover();
    await expect(playground.subs.locator(".es-popover--word .es-title")).toHaveText("[ru] keys");

    await page.keyboard.press("Alt+KeyS");

    const status = page.locator(".pg-shot-status");
    await expect(status).toHaveText(/^Saved /, { timeout: 30_000 });
    // The popover is still open: the shortcut doesn't move the pointer
    await expect(playground.subs.locator(".es-popover--word")).toBeVisible();
    const file = (await status.textContent()).replace("Saved ", "");
    try {
      expect(pngSize(await readFile(file))).toEqual({ width: 1280, height: 800 });
      // Nothing is drawn around the player window
      const cornerAlpha = await page.evaluate(
        async (url) => {
          const image = new Image();
          image.src = url;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, 1, 1).data[3];
        },
        file.replace(/^playground/, ""),
      );
      expect(cornerAlpha).toBe(0);
    } finally {
      await rm(file);
    }
  });

  test("keeps the EasySubs settings open when capturing from the Inspector", async ({ playground, page }) => {
    await playground.open();
    await playground.openSettings("General");

    await page.getByRole("button", { name: "Capture" }).click();

    const status = page.locator(".pg-shot-status");
    await expect(status).toHaveText(/^Saved /, { timeout: 30_000 });
    await expect(playground.settingsPanel).toBeVisible();
    const file = (await status.textContent()).replace("Saved ", "");
    const playerBox = await page.locator(".pg-player").boundingBox();
    try {
      // Player only, at 2×
      expect(pngSize(await readFile(file))).toEqual({
        width: Math.round(playerBox.width) * 2,
        height: Math.round(playerBox.height) * 2,
      });
    } finally {
      await rm(file);
    }
  });
});
