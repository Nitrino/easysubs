/**
 * Lists the words and lines the extension asks to translate for every subtitle track in the playground, using the
 * extension's own tokenizer (convertRawSubs) in a headless page, and reports which of them are missing from the
 * offline translations in playground/fixtures/translations.
 *
 * Usage: pnpm playground:translations [--write-missing]
 *   --write-missing  writes the missing keys to playground/fixtures/translations/missing.json
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";
import { createServer } from "vite";
import { TRANSLATION_PAIRS, type TranslationFixture } from "../src/translationPairs.ts";

type TrackText = { language: string; lines: string[]; words: string[] };

const rootDir = resolve(import.meta.dirname, "../..");
const fixturesDir = resolve(import.meta.dirname, "../fixtures/translations");

const server = await createServer({
  configFile: resolve(import.meta.dirname, "../vite.config.ts"),
  server: { port: 0, strictPort: false },
  logLevel: "error",
});
await server.listen();
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  await page.goto(`${server.resolvedUrls.local[0]}?background=mock`);
  await page.locator(".es-settings-icon").waitFor();

  // The page imports the playground's own modules from the dev server, so they're passed as URLs
  const modules = {
    player: "/src/player.ts",
    service: "/src/playgroundService.ts",
    convertRawSubs: `/@fs${resolve(rootDir, "src/utils/convertRawSubs.ts")}`,
  };
  const tracks: TrackText[] = await page.evaluate(async (urls) => {
    const { VIDEO_SOURCES, isVideoAvailable } = await import(urls.player);
    const { loadCaptions } = await import(urls.service);
    const { convertRawSubs } = await import(urls.convertRawSubs);
    const result: TrackText[] = [];
    for (const source of VIDEO_SOURCES) {
      if (source.movie && !(await isVideoAvailable(source))) continue;
      for (const track of source.tracks) {
        const subs: { cleanedText: string; items: { cleanedText: string }[] }[] = convertRawSubs(
          await loadCaptions(track.url),
        );
        // The same keys the content script sends: cleanedText for lines, lowercased cleanedText for words
        const words = subs.flatMap((sub) => sub.items.map((item) => item.cleanedText.toLowerCase()));
        result.push({ language: track.id, lines: subs.map((sub) => sub.cleanedText), words: words.filter(Boolean) });
      }
    }
    return result;
  }, modules);

  const missing: Record<string, { lines: string[]; words: string[] }> = {};
  for (const [source, target] of TRANSLATION_PAIRS) {
    const pair = `${source}-${target}`;
    const file = resolve(fixturesDir, `${pair}.json`);
    const fixture: TranslationFixture = existsSync(file)
      ? JSON.parse(readFileSync(file, "utf8"))
      : { lines: {}, words: {} };
    const texts = tracks.filter((track) => track.language === source);
    const lines = [...new Set(texts.flatMap((track) => track.lines))].filter((line) => !(line in fixture.lines));
    const words = [...new Set(texts.flatMap((track) => track.words))].filter((word) => !(word in fixture.words));
    missing[pair] = { lines, words };
    console.log(`${pair}: ${lines.length} lines and ${words.length} words missing`);
  }

  if (process.argv.includes("--write-missing")) {
    writeFileSync(resolve(fixturesDir, "missing.json"), `${JSON.stringify(missing, null, 2)}\n`);
    console.log(`Wrote ${resolve(fixturesDir, "missing.json")}`);
  }
} finally {
  await browser.close();
  await server.close();
}
