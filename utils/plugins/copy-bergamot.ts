import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import type { PluginOption } from "vite";

// Bergamot, the translation engine of Firefox Translations (src/bergamot/engine.ts): the worker script of
// @browsermt/bergamot-translator, its Emscripten glue and its WebAssembly, loaded by the worker from its own folder.
// Extensions can't load code from the internet, so they ship in assets/bergamot.
export const BERGAMOT_FILES = [
  "translator-worker.js",
  "bergamot-translator-worker.js",
  "bergamot-translator-worker.wasm",
];

export function bergamotDir(): string {
  return resolve(
    dirname(createRequire(import.meta.url).resolve("@browsermt/bergamot-translator/package.json")),
    "worker",
  );
}

export default function copyBergamot(outDir: string): PluginOption {
  return {
    name: "copy-bergamot",
    writeBundle() {
      const target = resolve(outDir, "assets", "bergamot");
      mkdirSync(target, { recursive: true });
      for (const file of BERGAMOT_FILES) copyFileSync(resolve(bergamotDir(), file), resolve(target, file));
    },
  };
}
