import type { TWordTime } from "@src/models/types";

// Forced alignment of known text to audio with a CTC model (wav2vec2): the model gives every 20 ms frame a
// probability for each character; the Viterbi path through the transcript's characters says which frames say which
// character, and so when each word starts and ends. As in torchaudio's forced alignment tutorial.

export const CTC_FRAME_MS = 20;

export type TCtcVocab = Record<string, number>;

// The characters wav2vec2-base-960h knows: upper-case letters and the apostrophe, "|" between words
export const ctcText = (word: string) =>
  word
    .toUpperCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[^A-Z']/g, "");

// Log-softmax of every frame's logits, in place
export function logSoftmax(logits: Float32Array, frames: number, classes: number): Float32Array {
  for (let t = 0; t < frames; t++) {
    let max = -Infinity;
    for (let c = 0; c < classes; c++) max = Math.max(max, logits[t * classes + c]);
    let sum = 0;
    for (let c = 0; c < classes; c++) sum += Math.exp(logits[t * classes + c] - max);
    const log = max + Math.log(sum);
    for (let c = 0; c < classes; c++) logits[t * classes + c] -= log;
  }
  return logits;
}

// Times of the words in the window, from the frames' log-probabilities ([frames × classes]); null for words with no
// characters the model knows ("20", "♪") and for all of them when the text doesn't fit the audio
export function ctcAlignWords(
  logProbs: Float32Array,
  frames: number,
  classes: number,
  words: string[],
  vocab: TCtcVocab,
  windowStart: number,
  frameMs = CTC_FRAME_MS,
): (TWordTime | null)[] {
  const blank = vocab["<pad>"] ?? 0;
  const separator = vocab["|"];
  // The transcript's tokens and the word each belongs to (-1 for separators)
  const tokens: number[] = [];
  const owners: number[] = [];
  words.forEach((word, index) => {
    const chars = [...ctcText(word)].filter((char) => vocab[char] !== undefined);
    if (chars.length === 0) return;
    if (tokens.length && separator !== undefined) {
      tokens.push(separator);
      owners.push(-1);
    }
    for (const char of chars) {
      tokens.push(vocab[char]);
      owners.push(index);
    }
  });
  const empty = words.map(() => null);
  if (tokens.length === 0 || tokens.length > frames) return empty;

  // trellis[t][j]: the best log-probability of having said the first j tokens after t frames
  const width = tokens.length + 1;
  const trellis = new Float32Array((frames + 1) * width).fill(-Infinity);
  trellis[0] = 0;
  for (let t = 1; t <= frames; t++) trellis[t * width] = trellis[(t - 1) * width] + logProbs[(t - 1) * classes + blank];
  for (let t = 1; t <= frames; t++) {
    for (let j = 1; j < width; j++) {
      const stay = trellis[(t - 1) * width + j] + logProbs[(t - 1) * classes + blank];
      const step = trellis[(t - 1) * width + j - 1] + logProbs[(t - 1) * classes + tokens[j - 1]];
      // Staying on a character (it lasts several frames) is as good as a blank
      const hold = trellis[(t - 1) * width + j] + logProbs[(t - 1) * classes + tokens[j - 1]];
      trellis[t * width + j] = Math.max(stay, step, hold);
    }
  }
  if (!Number.isFinite(trellis[frames * width + tokens.length])) return empty;

  // Back from the end: the frames of each token
  const firstFrame = new Array<number>(tokens.length).fill(-1);
  const lastFrame = new Array<number>(tokens.length).fill(-1);
  let j = tokens.length;
  for (let t = frames; t > 0 && j > 0; t--) {
    // The move that gave this cell its value: entering the token, holding it, or a blank
    const step = trellis[(t - 1) * width + j - 1] + logProbs[(t - 1) * classes + tokens[j - 1]];
    const hold = trellis[(t - 1) * width + j] + logProbs[(t - 1) * classes + tokens[j - 1]];
    const stay = trellis[(t - 1) * width + j] + logProbs[(t - 1) * classes + blank];
    const best = Math.max(step, hold, stay);
    if (best === stay) continue;
    if (lastFrame[j - 1] < 0) lastFrame[j - 1] = t - 1;
    firstFrame[j - 1] = t - 1;
    if (best === step) j--;
  }

  const times: (TWordTime | null)[] = [...empty];
  tokens.forEach((_, index) => {
    const owner = owners[index];
    if (owner < 0 || firstFrame[index] < 0) return;
    const start = windowStart + firstFrame[index] * frameMs;
    const end = windowStart + (lastFrame[index] + 1) * frameMs;
    const time = times[owner];
    times[owner] = time ? { start: Math.min(time.start, start), end: Math.max(time.end, end) } : { start, end };
  });
  return times;
}
