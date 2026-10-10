/**
 * Mirrors Mozilla's Firefox Translations models that Bergamot (src/bergamot) uses into bergamot-models/, to be attached
 * to the GitHub release BERGAMOT_MODELS_RELEASE (see RELEASING.md): Mozilla's CDN refuses browsers other than Firefox.
 * Takes the newest desktop model of each direction between English and the languages asked for, and writes
 * models.json, the list the extension reads.
 *
 * Usage: pnpm bergamot-models [language...] [--out <dir>]
 *   language   Mozilla's codes ("ru", "zh-Hans"); MIRRORED_LANGUAGES by default
 *   --out dir  where the files go, bergamot-models/ by default; files already there aren't downloaded again
 *
 * The models are MPL-2.0 (https://github.com/mozilla/firefox-translations-models).
 */
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import {
  MIRRORED_LANGUAGES,
  MODELS_URL,
  mirroredName,
  pickModels,
  type TModelRecord,
  type TModelsIndex,
} from "../../src/bergamot/registry.ts";

const args = process.argv.slice(2);
let outDir = resolve(import.meta.dirname, "../../bergamot-models");
const languages: string[] = [];
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--out") outDir = resolve(args[++index]);
  else languages.push(args[index]);
}
const chosen = new Set(languages.length > 0 ? languages : MIRRORED_LANGUAGES);

const response = await fetch(MODELS_URL);
if (!response.ok) throw new Error(`${MODELS_URL}: ${response.status}`);
const models = [...pickModels(((await response.json()) as { data: TModelRecord[] }).data).values()].filter(
  (model) => (model.from === "en" && chosen.has(model.to)) || (model.to === "en" && chosen.has(model.from)),
);

mkdirSync(outDir, { recursive: true });
const index: TModelsIndex = {
  source: "Firefox Translations models by Mozilla (https://github.com/mozilla/firefox-translations-models)",
  license: "MPL-2.0 (https://mozilla.org/MPL/2.0/)",
  models: [],
};
for (const model of models) {
  const files = { model: model.model, lex: model.lex, vocabs: model.vocabs };
  for (const file of [files.model, files.lex, ...files.vocabs]) {
    const name = mirroredName(model.from, model.to, file.name);
    const target = resolve(outDir, name);
    if (existsSync(target) && statSync(target).size === file.size) continue;
    console.log(`Downloading ${name} (${(file.size / 1e6).toFixed(1)} MB)`);
    const download = await fetch(file.url);
    if (!download.ok || !download.body) throw new Error(`${file.url}: ${download.status}`);
    await pipeline(Readable.fromWeb(download.body), createWriteStream(target));
  }
  const entry = (file: { name: string; size: number }) => ({
    name: mirroredName(model.from, model.to, file.name),
    size: file.size,
  });
  index.models.push({
    from: model.from,
    to: model.to,
    version: model.version,
    model: entry(files.model),
    lex: entry(files.lex),
    vocabs: files.vocabs.map(entry),
  });
}
writeFileSync(resolve(outDir, "models.json"), JSON.stringify(index, null, 2));
const total = index.models.reduce(
  (sum, model) => sum + [model.model, model.lex, ...model.vocabs].reduce((size, file) => size + file.size, 0),
  0,
);
console.log(`${index.models.length} models, ${(total / 1e6).toFixed(0)} MB → ${outDir}`);
