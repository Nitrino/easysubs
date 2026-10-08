import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import type { PluginOption } from "vite";

// ONNX Runtime's WebAssembly build for the speech models of the offscreen document (src/audio/models.ts): extensions
// can't load code from the internet, so the files transformers.js would take from a CDN ship in assets/ort
export const ONNX_RUNTIME_FILES = ["ort-wasm-simd-threaded.asyncify.mjs", "ort-wasm-simd-threaded.asyncify.wasm"];

// onnxruntime-web's dist folder: a dependency of transformers.js, not of EasySubs itself
export function onnxRuntimeDir(): string {
  const transformers = createRequire(import.meta.url).resolve("@huggingface/transformers");
  return dirname(createRequire(transformers).resolve("onnxruntime-web"));
}

export default function copyOnnxRuntime(outDir: string): PluginOption {
  return {
    name: "copy-onnx-runtime",
    // onnxruntime-web also points at its .wasm by `new URL()`, which Vite emits as a second copy; src/audio/models.ts
    // always sets the paths to assets/ort, so that copy goes
    generateBundle(_, bundle) {
      for (const name of Object.keys(bundle)) {
        if (/ort-wasm-simd-threaded.*\.wasm$/.test(name)) delete bundle[name];
      }
    },
    writeBundle() {
      const target = resolve(outDir, "assets", "ort");
      mkdirSync(target, { recursive: true });
      const source = onnxRuntimeDir();
      for (const file of ONNX_RUNTIME_FILES) copyFileSync(resolve(source, file), resolve(target, file));
    },
  };
}
