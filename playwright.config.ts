import { defineConfig, devices } from "@playwright/test";

const PORT = 5180;

// Integration tests run against the playground (pnpm playground): the extension code from src/ in a page with a
// local video player and the offline mock background, so they need neither a build nor network access.
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    viewport: { width: 1280, height: 800 },
    // Translations into Russian keep the subtitle language (en) apart from the target one
    locale: "ru-RU",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } }],
  webServer: {
    command: "pnpm playground",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
