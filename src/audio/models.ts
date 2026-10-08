import { AutoModel, AutoModelForCTC, AutoProcessor, env, pipeline, Tensor } from "@huggingface/transformers";

import type { TTimedWord, TWordTime } from "@src/models/types";
import { ctcAlignWords, logSoftmax, type TCtcVocab } from "./ctcAlign";
import type { TAudioJob, TAudioJobResult, TAudioWorkerEvent } from "./jobs";
import { decodePcm, SAMPLE_RATE, samplesToMs } from "./pcm";
import { SILERO_FRAME } from "./vad";

// The speech models, run by transformers.js on ONNX Runtime's WebAssembly build. They download from Hugging Face on
// first use and stay in the browser's cache: Silero VAD 2 MB, wav2vec2-base-960h 95 MB, Whisper base 77 MB. The
// runtime itself ships in the extension (assets/ort, copied by vite.config.ts): extensions can't load code from the
// internet.

const SILERO = "onnx-community/silero-vad";
const ALIGNER = "Xenova/wav2vec2-base-960h";
const WHISPER = "onnx-community/whisper-base_timestamped";
const SILERO_CONTEXT = 64;

// Where ort-wasm-simd-threaded.asyncify.{mjs,wasm} are served from
export function setRuntimePath(base: string) {
  env.allowLocalModels = false;
  const onnx = env.backends.onnx;
  if (onnx.wasm) {
    onnx.wasm.wasmPaths = {
      mjs: `${base}ort-wasm-simd-threaded.asyncify.mjs`,
      wasm: `${base}ort-wasm-simd-threaded.asyncify.wasm`,
    };
    // Threads need a cross-origin isolated page, which extension pages aren't
    onnx.wasm.numThreads = 1;
  }
}

type TStatus = (event: Extract<TAudioWorkerEvent, { type: "status" }>) => void;
type TProgress = { status: string; progress?: number; file?: string };

// Download progress of a model's files as one percentage
function reporter(model: "silero" | "whisper" | "aligner", report: TStatus) {
  const files: Record<string, number> = {};
  return (progress: TProgress) => {
    if (progress.status === "progress" && progress.file) {
      files[progress.file] = progress.progress ?? 0;
      const values = Object.values(files);
      const percent = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      report({ type: "status", model, status: `downloading ${percent}%` });
    }
    if (progress.status === "ready") report({ type: "status", model, status: "ready" });
  };
}

type TCallable = (inputs: Record<string, unknown>) => Promise<Record<string, Tensor>>;

let silero: Promise<TCallable> | null = null;
let aligner: Promise<{
  processor: (audio: Float32Array) => Promise<Record<string, unknown>>;
  model: TCallable;
  vocab: TCtcVocab;
}> | null = null;
let whisper: Promise<(audio: Float32Array, options: Record<string, unknown>) => Promise<unknown>> | null = null;

async function sileroProbabilities(samples: Float32Array, report: TStatus): Promise<number[]> {
  silero ??= AutoModel.from_pretrained(SILERO, {
    // The repository has the ONNX file only: no model type to look up
    config: { model_type: "custom" } as never,
    dtype: "fp32",
    progress_callback: reporter("silero", report),
  }) as unknown as Promise<TCallable>;
  const model = await silero;
  const sr = new Tensor("int64", BigInt64Array.from([BigInt(SAMPLE_RATE)]), []);
  let state = new Tensor("float32", new Float32Array(2 * 128), [2, 1, 128]);
  // Silero VAD v5 takes each frame with the last 64 samples before it, as its own Python wrapper passes them
  const frame = new Float32Array(SILERO_CONTEXT + SILERO_FRAME);
  const probabilities: number[] = [];
  for (let at = 0; at + SILERO_FRAME <= samples.length; at += SILERO_FRAME) {
    frame.set(at >= SILERO_CONTEXT ? samples.subarray(at - SILERO_CONTEXT, at) : new Float32Array(SILERO_CONTEXT));
    frame.set(samples.subarray(at, at + SILERO_FRAME), SILERO_CONTEXT);
    const input = new Tensor("float32", frame.slice(), [1, frame.length]);
    const { output, stateN } = await model({ input, sr, state });
    probabilities.push((output.data as Float32Array)[0]);
    state = stateN;
  }
  return probabilities;
}

async function alignWords(samples: Float32Array, words: string[], report: TStatus): Promise<(TWordTime | null)[]> {
  aligner ??= (async () => {
    const progress_callback = reporter("aligner", report);
    const [processor, model, vocab] = await Promise.all([
      AutoProcessor.from_pretrained(ALIGNER, { progress_callback }),
      AutoModelForCTC.from_pretrained(ALIGNER, { dtype: "q8", progress_callback }),
      fetch(`https://huggingface.co/${ALIGNER}/resolve/main/vocab.json`).then((response) => response.json()),
    ]);
    return {
      processor: processor as unknown as (audio: Float32Array) => Promise<Record<string, unknown>>,
      model: model as unknown as TCallable,
      vocab,
    };
  })();
  const { processor, model, vocab } = await aligner;
  const { logits } = await model(await processor(samples));
  const [, frames, classes] = logits.dims;
  const logProbs = logSoftmax(Float32Array.from(logits.data as Float32Array), frames, classes);
  return ctcAlignWords(logProbs, frames, classes, words, vocab, 0, samplesToMs(samples.length) / frames);
}

type TWhisperOutput = { chunks?: { text: string; timestamp: [number, number | null] }[] };

async function recognize(samples: Float32Array, language: string, report: TStatus): Promise<TTimedWord[]> {
  whisper ??= pipeline("automatic-speech-recognition", WHISPER, {
    dtype: "q8",
    device: "wasm",
    progress_callback: reporter("whisper", report),
  }) as unknown as Promise<(audio: Float32Array, options: Record<string, unknown>) => Promise<unknown>>;
  const asr = await whisper;
  const output = (await asr(samples, {
    return_timestamps: "word",
    language: language.split("-")[0],
    task: "transcribe",
    chunk_length_s: 30,
  })) as TWhisperOutput;
  return (output.chunks ?? [])
    .filter((chunk) => chunk.text.trim())
    .map((chunk) => ({
      text: chunk.text.trim(),
      start: chunk.timestamp[0] * 1000,
      end: (chunk.timestamp[1] ?? chunk.timestamp[0] + 0.3) * 1000,
    }));
}

export async function runAudioJob<Type extends TAudioJob["type"]>(
  job: Extract<TAudioJob, { type: Type }>,
  report: TStatus,
): Promise<TAudioJobResult[Type]> {
  const samples = decodePcm(job.pcm);
  switch (job.type) {
    case "vad":
      return (await sileroProbabilities(samples, report)) as TAudioJobResult[Type];
    case "align":
      return (await alignWords(
        samples,
        (job as Extract<TAudioJob, { type: "align" }>).words,
        report,
      )) as TAudioJobResult[Type];
    case "whisper":
      return (await recognize(
        samples,
        (job as Extract<TAudioJob, { type: "whisper" }>).language,
        report,
      )) as TAudioJobResult[Type];
  }
  throw new Error(`Unknown audio job: ${(job as TAudioJob).type}`);
}
