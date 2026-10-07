/**
 * Builds the expression lists in public/expressions/<language>.json from Wiktionary, as extracted by Wiktextract and
 * published by kaikki.org: multi-word verbs, idioms and set phrases, and German and Dutch separable verbs, with the
 * inflected forms Wiktionary lists for them. See src/utils/expressions for how they're matched in subtitles.
 *
 * Usage: pnpm expressions [language...] [--cache <dir>]
 *   language     codes from LANGUAGES below; all of them by default
 *   --cache dir  keeps the downloaded dumps (100-500 MB each, gzipped) in dir and reuses them on the next run
 *
 * The data is CC BY-SA 4.0 (Wiktionary's license); every file says where it comes from.
 */
import { createReadStream, createWriteStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createGunzip } from "node:zlib";
import {
  headVerbForms,
  lexiconEntry,
  mergeEntries,
  serializeLexicon,
  verbForms,
  type TWiktextractRecord,
} from "./wiktextract.ts";
import type { TLexiconEntry } from "../../src/utils/expressions/lexicon.ts";

// Language codes and kaikki.org's names for them; keep in sync with EXPRESSION_LANGUAGES in lexicon.ts
const LANGUAGES: Record<string, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  nl: "Dutch",
};

const outDir = resolve(import.meta.dirname, "../../public/expressions");
const dumpUrl = (name: string) => `https://kaikki.org/dictionary/${name}/kaikki.org-dictionary-${name}.jsonl.gz`;

const args = process.argv.slice(2);
let cacheDir: string | null = null;
const languages: string[] = [];
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--cache") cacheDir = resolve(args[++index]);
  else languages.push(args[index]);
}
const chosen = languages.length > 0 ? languages : Object.keys(LANGUAGES);

for (const language of chosen) {
  if (!LANGUAGES[language])
    throw new Error(`Unknown language "${language}", expected one of ${Object.keys(LANGUAGES)}`);
}

// The dump as a gzipped stream: from the cache when it's there, downloaded (and cached) otherwise
async function openDump(name: string): Promise<Readable> {
  const cached = cacheDir && resolve(cacheDir, `kaikki-${name}.jsonl.gz`);
  if (cached && existsSync(cached)) return createReadStream(cached);

  console.log(`Downloading ${dumpUrl(name)}`);
  const response = await fetch(dumpUrl(name));
  if (!response.ok || !response.body) throw new Error(`${dumpUrl(name)}: ${response.status}`);
  const body = Readable.fromWeb(response.body);
  if (!cached) return body;

  mkdirSync(cacheDir, { recursive: true });
  await pipeline(body, createWriteStream(cached));
  return createReadStream(cached);
}

// The dump's records, one JSON object per line. Split on "\n" only: texts quoted in the records may contain other
// line separators, which readline would split on.
async function* readRecords(input: Readable): AsyncGenerator<TWiktextractRecord> {
  const decoder = new TextDecoder();
  let rest = "";
  for await (const chunk of input) {
    const lines = (rest + decoder.decode(chunk, { stream: true })).split("\n");
    rest = lines.pop() ?? "";
    for (const line of lines) if (line) yield JSON.parse(line);
  }
  if (rest) yield JSON.parse(rest);
}

async function build(language: string) {
  const name = LANGUAGES[language];
  const entries: TLexiconEntry[] = [];
  const verbs = new Map<string, string[]>();
  let records = 0;

  for await (const record of readRecords((await openDump(name)).pipe(createGunzip()))) {
    records++;
    if (record.lang_code !== language) continue;
    const entry = lexiconEntry(record);
    if (entry) entries.push(entry);
    const forms = verbForms(record);
    if (forms) verbs.set(forms[0], [...new Set([...(verbs.get(forms[0]) ?? []), ...forms[1]])]);
  }

  const expressions = mergeEntries(entries, language);
  const file = resolve(outDir, `${language}.json`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(
    file,
    serializeLexicon(
      {
        language,
        source: `Wiktionary (https://en.wiktionary.org), extracted by Wiktextract and published by kaikki.org (${dumpUrl(name)})`,
        license: "CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)",
      },
      expressions,
      headVerbForms(expressions, verbs, language),
    ),
  );
  console.log(`${language}: ${expressions.length} expressions from ${records} records → ${file}`);
}

for (const language of chosen) await build(language);
