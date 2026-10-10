import { combinedProgress, isCached, onDeviceFile, type TOnDeviceStatus } from "@src/utils/onDeviceFiles";
import {
  BERGAMOT_MODELS_URL,
  mirroredModels,
  modelSize,
  pairKey,
  planTranslation,
  type TModelsIndex,
  type TPairModel,
} from "./registry";
import { bergamotLanguage } from "./languages";

// Bergamot, the translation engine of Firefox Translations, in a Web Worker: @browsermt/bergamot-translator's worker
// script, its Emscripten glue and its WebAssembly, copied into assets/bergamot by utils/plugins/copy-bergamot.ts.
// It runs where a page can start workers: Chrome's offscreen document, Firefox's background page, the playground.
// Mozilla's models download from EasySubs' mirror (src/bergamot/registry.ts) once per direction and stay on the
// device; three stay loaded in the worker.

declare global {
  var easysubsBergamotModelsUrl: string | undefined;
}

// The playground serves the models it mirrored itself
const modelsUrl = () => globalThis.easysubsBergamotModelsUrl ?? BERGAMOT_MODELS_URL;

// Where the worker script is, relative to the extension's root
export const BERGAMOT_WORKER = "assets/bergamot/translator-worker.js";

const LIST_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_LOADED_MODELS = 3;

export type TBergamotRequest =
  // `html`: the texts are HTML, and their tags go to the words of the translation they became (src/utils/wordInLine.ts)
  | { type: "translate"; texts: string[]; from: string; to: string; html?: boolean }
  | { type: "status"; from: string; to: string }
  // Downloads and loads the models of the pair ahead of the first line
  | { type: "prepare"; from: string; to: string }
  // Lets the worker go, after its models were deleted from the device: the next translation downloads them again
  | { type: "reset" };

type TCall = (name: string, args: unknown[], transfer?: Transferable[]) => Promise<unknown>;
type TWorker = { call: TCall; terminate: () => void };

// The worker's protocol: { id, name, args } calls a method of its BergamotTranslatorWorker, { id, result | error }
// answers
async function startWorker(url: string): Promise<TWorker> {
  const worker = new Worker(url);
  let nextId = 1;
  const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
  worker.onmessage = ({ data }: MessageEvent<{ id: number; result?: unknown; error?: { message?: string } }>) => {
    const request = pending.get(data.id);
    pending.delete(data.id);
    if (data.error) request?.reject(new Error(data.error.message ?? "Bergamot failed"));
    else request?.resolve(data.result);
  };
  worker.onerror = (event) => {
    pending.forEach(({ reject }) => reject(new Error(event.message || "Bergamot's worker failed")));
    pending.clear();
  };
  const call: TCall = (name, args, transfer = []) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      worker.postMessage({ id, name, args }, transfer);
    });
  // The WebAssembly does the matrix maths itself, unless Firefox offers its faster builtin
  await call("initialize", [{ cacheSize: 0, useNativeIntGemm: true }]);
  const terminate = () => {
    worker.terminate();
    pending.forEach(({ reject }) => reject(new Error("Bergamot's models were deleted")));
    pending.clear();
  };
  return { call, terminate };
}

export function createBergamotEngine(workerUrl: string) {
  let worker: Promise<TWorker> | null = null;
  let list: { at: number; models: Promise<Map<string, TPairModel>> } | null = null;
  // Models in the worker, the most recently used last
  const loaded: string[] = [];
  const loading = new Map<string, Promise<void>>();
  // Downloads and failures by the pair asked for
  const downloads = new Map<string, { loaded: number; total: number }>();
  const errors = new Map<string, string>();
  let queue: Promise<unknown> = Promise.resolve();

  const startedWorker = () => {
    worker ??= startWorker(workerUrl);
    worker.catch(() => (worker = null));
    return worker.then(({ call }) => call);
  };

  function models(): Promise<Map<string, TPairModel>> {
    if (!list || Date.now() - list.at > LIST_TTL_MS) {
      const index = new URL("models.json", modelsUrl()).href;
      const models = fetch(index)
        .then((response) => {
          if (!response.ok) throw new Error(`The list of models answered ${response.status}`);
          return response.json();
        })
        .then((answer: TModelsIndex) => mirroredModels(answer, index));
      models.catch(() => (list = null));
      list = { at: Date.now(), models };
    }
    return list.models;
  }

  async function plan(from: string, to: string) {
    const steps = planTranslation(bergamotLanguage(from), bergamotLanguage(to), await models());
    if (!steps) throw new Error(`There's no model for ${from} → ${to}`);
    return steps;
  }

  async function load(model: TPairModel, onProgress: (loaded: number, total: number) => void) {
    const key = pairKey(model.from, model.to);
    if (loaded.includes(key)) {
      loaded.splice(loaded.indexOf(key), 1);
      loaded.push(key);
      return;
    }
    if (!loading.has(key)) {
      const files = [model.model, model.lex, ...model.vocabs];
      const progress = combinedProgress(
        files.map((file) => file.size),
        onProgress,
      );
      const job = (async () => {
        const [modelData, lexData, ...vocabData] = await Promise.all(
          files.map((file, index) => onDeviceFile(file.url, progress(index), file.size)),
        );
        const call = await startedWorker();
        await call(
          "loadTranslationModel",
          [
            { from: model.from, to: model.to },
            { model: modelData, shortlist: lexData, vocabs: vocabData },
          ],
          [modelData, lexData, ...vocabData],
        );
        loaded.push(key);
        while (loaded.length > MAX_LOADED_MODELS) {
          const [from, to] = loaded.shift()!.split(":");
          await call("freeTranslationModel", [{ from, to }]);
        }
      })().finally(() => loading.delete(key));
      loading.set(key, job);
    }
    await loading.get(key);
  }

  async function prepare(from: string, to: string) {
    const key = pairKey(from, to);
    errors.delete(key);
    try {
      const steps = await plan(from, to);
      const progress = combinedProgress(
        steps.map((step) => modelSize([step])),
        (bytes, total) => downloads.set(key, { loaded: bytes, total }),
      );
      for (const [index, step] of steps.entries()) await load(step, progress(index));
      return steps;
    } catch (error) {
      errors.set(key, (error as Error).message);
      throw error;
    } finally {
      downloads.delete(key);
    }
  }

  return {
    // One translation per text, in the same order; one batch at a time, as the worker translates one
    translate(texts: string[], from: string, to: string, html = false): Promise<string[]> {
      const run = queue.then(async () => {
        if (texts.length === 0) return [];
        const steps = await prepare(from, to);
        const call = await startedWorker();
        const responses = (await call("translate", [
          {
            models: steps.map((step) => ({ from: step.from, to: step.to })),
            texts: texts.map((text) => ({ text, html })),
          },
        ])) as { target: { text: string } }[];
        return responses.map((response) => response.target.text);
      });
      queue = run.catch(() => {});
      return run;
    },

    prepare(from: string, to: string): Promise<void> {
      return prepare(from, to).then(() => {});
    },

    async reset(): Promise<void> {
      const running = worker;
      worker = null;
      loaded.length = 0;
      errors.clear();
      (await running?.catch(() => null))?.terminate();
    },

    async status(from: string, to: string): Promise<TOnDeviceStatus> {
      const key = pairKey(from, to);
      const download = downloads.get(key);
      if (download) return { state: "downloading", ...download };
      let steps: TPairModel[] | null;
      try {
        steps = planTranslation(bergamotLanguage(from), bergamotLanguage(to), await models());
      } catch (error) {
        return { state: "error", error: (error as Error).message };
      }
      if (!steps) return { state: "unavailable" };
      if (errors.has(key)) return { state: "error", error: errors.get(key)! };
      const files = steps.flatMap((step) => [step.model, step.lex, ...step.vocabs]);
      const cached = await Promise.all(files.map((file) => isCached(file.url)));
      return cached.every(Boolean) ? { state: "ready" } : { state: "missing", size: modelSize(steps) };
    },
  };
}

export type TBergamotEngine = ReturnType<typeof createBergamotEngine>;

export function runBergamotRequest(engine: TBergamotEngine, request: TBergamotRequest): Promise<unknown> {
  switch (request.type) {
    case "translate":
      return engine.translate(request.texts, request.from, request.to, request.html);
    case "prepare":
      return engine.prepare(request.from, request.to);
    case "status":
      return engine.status(request.from, request.to);
    case "reset":
      return engine.reset();
  }
}
