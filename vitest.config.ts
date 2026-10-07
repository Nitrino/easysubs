import { defineConfig } from "vitest/config";
import { resolve } from "path";
import addHmr from "./utils/plugins/add-hmr.ts";

const rootDir = resolve(import.meta.dirname);
const srcDir = resolve(rootDir, "src");

// Unit tests for the extension code in src/ (models, utils, learning services, the background script), run in jsdom
// with the chrome.* mock from test/chrome.ts. The whole extension is tested in the playground by e2e/ (pnpm test:e2e).
export default defineConfig({
  // No .env: tests don't depend on local keys (VITE_OPENSUBTITLES_API_KEY), they stub what they need
  envDir: resolve(rootDir, "test"),
  resolve: {
    alias: {
      "@root": rootDir,
      "@src": srcDir,
      "@assets": resolve(srcDir, "assets"),
      "@pages": resolve(srcDir, "pages"),
      // Registers content scripts for user-granted hosts; there is no extension runtime in the tests
      "webext-dynamic-content-scripts": resolve(rootDir, "playground/src/noop.ts"),
    },
  },
  plugins: [addHmr({ background: false, view: false })],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["test/setup.ts"],
    mockReset: true,
    restoreMocks: true,
    unstubGlobals: true,
    // patronum's debug() in the models logs every update, and effector suggests its plugin along with errors
    onConsoleLog: (log) => (/^\[(store|event|effect)\]|^Add effector's Babel/.test(log) ? false : undefined),
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/**/*.d.ts", "src/utils/phrasalVerbs.ts"],
    },
  },
});
