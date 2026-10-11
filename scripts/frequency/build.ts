/**
 * Builds the word frequency lists in public/frequency/<language>.json: how often each word is said in subtitles, by
 * its dictionary form, for the known words (src/models/words). The counts are the OpenSubtitles 2018 lists of
 * hermitdave/FrequencyWords; the forms come from the Wiktionary dictionaries of the GitHub release
 * DICTIONARIES_RELEASE ("went" → "go", "keys" → "key"), so a word is known with all its forms.
 *
 * Usage: pnpm frequency [language...] [--cache <dir>]
 *   language     codes from FREQUENCY_LANGUAGES; all of them by default
 *   --cache dir  keeps the downloaded lists and dictionaries in dir and reuses them on the next run
 *
 * The counts are CC BY-SA 4.0 (FrequencyWords' content), the forms CC BY-SA 4.0 (Wiktionary's license).
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { gunzipSync } from "node:zlib";
import { DICTIONARIES_URL, dictionaryFile, type TDictionary } from "../../src/utils/dictionary/format.ts";
import { FREQUENCY_LANGUAGES, frequencyPath } from "../../src/utils/frequency/format.ts";
import { buildFrequency } from "./frequency.ts";

// The most said words of each list; rarer ones are new to almost everyone
const WORDS = 50_000;
const listUrl = (language: string) =>
  `https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/${language}/${language}_50k.txt`;
// The dictionary with the language's words on the left: English into Russian for English, the others into English
const dictionaryOf = (language: string) =>
  language === "en" ? dictionaryFile("en", "ru") : dictionaryFile(language, "en");

const args = process.argv.slice(2);
let cacheDir: string | null = null;
const languages: string[] = [];
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--cache") cacheDir = resolve(args[++index]);
  else languages.push(args[index]);
}
const chosen = languages.length > 0 ? languages : FREQUENCY_LANGUAGES;
for (const language of chosen) {
  if (!FREQUENCY_LANGUAGES.includes(language))
    throw new Error(`Unknown language "${language}", expected one of ${FREQUENCY_LANGUAGES}`);
}

async function download(url: string, name: string): Promise<Buffer> {
  const cached = cacheDir && resolve(cacheDir, name);
  if (cached && existsSync(cached)) return readFileSync(cached);
  console.log(`Downloading ${url}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (cached) {
    mkdirSync(cacheDir!, { recursive: true });
    writeFileSync(cached, data);
  }
  return data;
}

const outDir = resolve(import.meta.dirname, "../../public");
for (const language of chosen) {
  const list = (await download(listUrl(language), `frequency-${language}.txt`)).toString("utf8");
  const counts: [string, number][] = list
    .split("\n")
    .map((line) => line.trim().split(" "))
    .filter(([word, count]) => word && Number(count) > 0)
    .slice(0, WORDS)
    .map(([word, count]) => [word, Number(count)]);
  const file = dictionaryOf(language);
  const dictionary: TDictionary = JSON.parse(
    gunzipSync(await download(DICTIONARIES_URL + file, `dictionary-${file}`)).toString("utf8"),
  );
  const frequency = buildFrequency(language, counts, dictionary);
  const path = resolve(outDir, frequencyPath(language));
  mkdirSync(resolve(path, ".."), { recursive: true });
  writeFileSync(path, JSON.stringify(frequency));
  console.log(`${path}: ${frequency.lemmas.length} words, ${Object.keys(frequency.forms).length} forms`);
}
