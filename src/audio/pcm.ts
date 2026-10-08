// Audio for the speech models: mono at 16 kHz, what Silero VAD, Whisper and wav2vec2 take

export const SAMPLE_RATE = 16_000;

// Mixes the channels down and resamples them to 16 kHz, by linear interpolation
export function toMono16k(channels: Float32Array[], sampleRate: number): Float32Array {
  const length = channels[0]?.length ?? 0;
  let mono = channels[0] ?? new Float32Array();
  if (channels.length > 1) {
    mono = new Float32Array(length);
    for (const channel of channels) for (let i = 0; i < length; i++) mono[i] += channel[i] / channels.length;
  }
  if (sampleRate === SAMPLE_RATE) return mono.slice();

  const ratio = sampleRate / SAMPLE_RATE;
  const output = new Float32Array(Math.floor(length / ratio));
  for (let i = 0; i < output.length; i++) {
    const position = i * ratio;
    const index = Math.floor(position);
    const next = Math.min(index + 1, length - 1);
    output[i] = mono[index] + (mono[next] - mono[index]) * (position - index);
  }
  return output;
}

// 16-bit samples in base64, to pass audio through extension messages (they take JSON only)
export function encodePcm(samples: Float32Array): string {
  const bytes = new Uint8Array(samples.length * 2);
  const view = new DataView(bytes.buffer);
  samples.forEach((sample, i) => view.setInt16(i * 2, Math.max(-1, Math.min(1, sample)) * 0x7fff, true));
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export function decodePcm(text: string): Float32Array {
  const binary = atob(text);
  const samples = new Float32Array(binary.length / 2);
  for (let i = 0; i < samples.length; i++) {
    const value = binary.charCodeAt(i * 2) | (binary.charCodeAt(i * 2 + 1) << 8);
    samples[i] = (value > 0x7fff ? value - 0x10000 : value) / 0x7fff;
  }
  return samples;
}

export const samplesToMs = (samples: number) => (samples / SAMPLE_RATE) * 1000;
export const msToSamples = (ms: number) => Math.round((ms / 1000) * SAMPLE_RATE);
