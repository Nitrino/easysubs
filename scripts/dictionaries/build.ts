/**
 * Builds the dictionaries hovered words are looked up in on the device (src/utils/dictionary) from Wiktionary, as
 * extracted by Wiktextract and published by kaikki.org: English words with the translations of their senses into
 * another language, and the words of another language with their English glosses. One gzipped file per pair goes
 * into dictionaries/, to be attached to the GitHub release DICTIONARIES_RELEASE (see RELEASING.md).
 *
 * Usage: pnpm dictionaries [pair...] [--cache <dir>] [--out <dir>]
 *   pair         "en-ru", "es-en": pairs from DICTIONARY_PAIRS; all of them by default
 *   --cache dir  keeps the downloaded dumps (100-500 MB each, gzipped) in dir and reuses them on the next run, the
 *                same files as `pnpm expressions --cache dir`
 *   --out dir    where the files go, dictionaries/ by default
 *
 * The data is CC BY-SA 4.0 (Wiktionary's license); every file says where it comes from.
 */
import { createReadStream, createWriteStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createGunzip, gzipSync } from "node:zlib";
import {
  backTranslations,
  buildDictionary,
  collectBackTranslations,
  dictionaryKey,
  dictionaryWord,
  formsOf,
  type TBackTranslations,
  type TWiktextractRecord,
} from "./wiktextract.ts";
import { DICTIONARY_PAIRS, dictionaryFile, type TDictionaryWord } from "../../src/utils/dictionary/format.ts";

// Language codes and kaikki.org's names for the dumps of their words
const DUMPS: Record<string, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  nl: "Dutch",
  uk: "Ukrainian",
  pl: "Polish",
  tr: "Turkish",
  ja: "Japanese",
  zh: "Chinese",
  ko: "Korean",
};

const dumpUrl = (name: string) => `https://kaikki.org/dictionary/${name}/kaikki.org-dictionary-${name}.jsonl.gz`;

const args = process.argv.slice(2);
let cacheDir: string | null = null;
let outDir = resolve(import.meta.dirname, "../../dictionaries");
const pairs: string[] = [];
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--cache") cacheDir = resolve(args[++index]);
  else if (args[index] === "--out") outDir = resolve(args[++index]);
  else pairs.push(args[index]);
}
const chosen = pairs.length > 0 ? pairs : DICTIONARY_PAIRS;
for (const pair of chosen) {
  if (!DICTIONARY_PAIRS.includes(pair)) throw new Error(`Unknown pair "${pair}", expected one of ${DICTIONARY_PAIRS}`);
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

const SOURCE = (name: string) =>
  `Wiktionary (https://en.wiktionary.org), extracted by Wiktextract and published by kaikki.org (${dumpUrl(name)})`;
const LICENSE = "CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)";

type TWords = Map<string, TDictionaryWord[]>;
type TForms = Map<string, Set<string>>;
// All the forms, and those declared by their own entries (formsOf)
type TFormSets = { all: TForms; declared: TForms };
const addForm = ({ all, declared }: TFormSets, [form, word, isDeclared]: [string, string, boolean]) => {
  all.set(form, (all.get(form) ?? new Set()).add(word));
  if (isDeclared) declared.set(form, (declared.get(form) ?? new Set()).add(word));
};
const formSets = (): TFormSets => ({ all: new Map(), declared: new Map() });

function write(from: string, to: string, words: TWords, forms: TFormSets, records: number) {
  const meta = { from, to, source: SOURCE(DUMPS[from]), license: LICENSE };
  const dictionary = buildDictionary(meta, words, forms.all, forms.declared);
  mkdirSync(outDir, { recursive: true });
  const file = resolve(outDir, dictionaryFile(from, to));
  const data = gzipSync(JSON.stringify(dictionary), { level: 9 });
  writeFileSync(file, data);
  const wordCount = Object.keys(dictionary.words).length;
  const formCount = Object.keys(dictionary.forms).length;
  const size = (data.length / 1e6).toFixed(1);
  console.log(`${from}-${to}: ${wordCount} words, ${formCount} forms from ${records} records → ${file} (${size} MB)`);
}

const addWord = (words: TWords, key: string, word: TDictionaryWord) =>
  key && words.set(key, [...(words.get(key) ?? []), word]);

// One pass over the dump of a language other than English: its words glossed in English for the pair into English,
// and the back translations of English words for the pair from English
async function readLanguage(language: string, glossed: boolean): Promise<TBackTranslations> {
  const words: TWords = new Map();
  const forms = formSets();
  const back: ReturnType<typeof backTranslations> = [];
  let records = 0;
  for await (const record of readRecords((await openDump(DUMPS[language])).pipe(createGunzip()))) {
    records++;
    if (record.lang_code !== language) continue;
    back.push(...backTranslations(record, language));
    if (!glossed) continue;
    for (const form of formsOf(record, language)) addForm(forms, form);
    const word = dictionaryWord(record, language, "en");
    if (word) addWord(words, dictionaryKey(record.word, language), word);
  }
  if (glossed) write(language, "en", words, forms, records);
  return collectBackTranslations(back);
}

// One pass over the English dump fills every pair from English
async function readEnglish(targets: string[], back: Map<string, TBackTranslations>) {
  const words = new Map<string, TWords>(targets.map((to) => [to, new Map()]));
  const forms = formSets();
  let records = 0;
  for await (const record of readRecords((await openDump(DUMPS.en)).pipe(createGunzip()))) {
    records++;
    if (record.lang_code !== "en") continue;
    for (const form of formsOf(record, "en")) addForm(forms, form);
    const key = dictionaryKey(record.word, "en");
    for (const to of targets) {
      const word = dictionaryWord(record, "en", to, back.get(to));
      if (word) addWord(words.get(to)!, key, word);
    }
  }
  for (const to of targets) write("en", to, words.get(to)!, forms, records);
}

const split = chosen.map((pair) => pair.split("-") as [string, string]);
const targets = split.filter(([from]) => from === "en").map(([, to]) => to);
// Languages whose dumps are read: for their pair into English, or for the back translations of their pair from it
const others = [...new Set(split.map(([from, to]) => (from === "en" ? to : from)))];
const back = new Map<string, TBackTranslations>();
for (const language of others) {
  back.set(language, await readLanguage(language, chosen.includes(`${language}-en`)));
}
if (targets.length > 0) await readEnglish(targets, back);
