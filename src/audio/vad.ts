import type { TInterval } from "@src/utils/wordTiming/speech";
import { SAMPLE_RATE } from "./pcm";

// Telling speech from silence in the audio: a frame's probability of speech, from loudness here or from Silero VAD
// (src/pages/offscreen), turned into intervals of speech.

export const ENERGY_FRAME = 320; // 20 ms
export const SILERO_FRAME = 512; // 32 ms, what Silero VAD v5 takes at 16 kHz

// Speech starts above `on` and lasts until the probability stays under `off` for `hangoverMs`
export function speechIntervals(
  probabilities: ArrayLike<number>,
  start: number,
  frameMs: number,
  { on = 0.5, off = 0.35, hangoverMs = 120, minSpeechMs = 60 } = {},
): TInterval[] {
  const intervals: TInterval[] = [];
  let speechStart: number | null = null;
  let lastSpeech = 0;
  for (let i = 0; i < probabilities.length; i++) {
    const time = start + i * frameMs;
    const probability = probabilities[i];
    if (speechStart === null) {
      if (probability >= on) {
        speechStart = time;
        lastSpeech = time + frameMs;
      }
    } else if (probability >= off) {
      lastSpeech = time + frameMs;
    } else if (time - lastSpeech >= hangoverMs) {
      if (lastSpeech - speechStart >= minSpeechMs) intervals.push({ start: speechStart, end: lastSpeech });
      speechStart = null;
    }
  }
  if (speechStart !== null && lastSpeech - speechStart >= minSpeechMs) {
    intervals.push({ start: speechStart, end: lastSpeech });
  }
  return intervals;
}

// Speech by loudness in the voice band, over a noise floor that follows the soundtrack: loud music passes for speech,
// which is what Silero VAD is for. Keeps the floor between blocks of one stream.
export class EnergyDetector {
  private floor = -60;
  private previous = 0;

  reset() {
    this.floor = -60;
    this.previous = 0;
  }

  probabilities(samples: Float32Array): Float32Array {
    const frames = Math.floor(samples.length / ENERGY_FRAME);
    const result = new Float32Array(frames);
    for (let frame = 0; frame < frames; frame++) {
      let energy = 0;
      for (let i = frame * ENERGY_FRAME; i < (frame + 1) * ENERGY_FRAME; i++) {
        // A first-order high-pass takes out the rumble and bass under the voices
        const sample = samples[i] - 0.95 * this.previous;
        this.previous = samples[i];
        energy += sample * sample;
      }
      const db = 10 * Math.log10(energy / ENERGY_FRAME + 1e-10);
      // The floor drops fast to quiet frames and creeps up through loud ones
      this.floor = db < this.floor ? this.floor * 0.7 + db * 0.3 : this.floor + (db - this.floor) * 0.004;
      const above = db - Math.max(this.floor, -70);
      result[frame] = db < -55 ? 0 : 1 / (1 + Math.exp(-(above - 9) / 2));
    }
    return result;
  }
}

export const frameMs = (frame: number) => (frame / SAMPLE_RATE) * 1000;
