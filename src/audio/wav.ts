// A sound for a card as a WAV file: 16-bit mono PCM, which every Anki client plays

// Fades at the ends, so a cut in the middle of a sound doesn't click
const FADE_MS = 10;

export function encodeWav(samples: Float32Array, sampleRate: number): Uint8Array {
  const bytes = new Uint8Array(44 + samples.length * 2);
  const view = new DataView(bytes.buffer);
  const text = (at: number, value: string) =>
    [...value].forEach((char, i) => view.setUint8(at + i, char.charCodeAt(0)));

  text(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  text(8, "WAVE");
  text(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  text(36, "data");
  view.setUint32(40, samples.length * 2, true);

  const fade = Math.min(Math.floor(samples.length / 2), Math.round((FADE_MS / 1000) * sampleRate));
  samples.forEach((sample, i) => {
    const gain = Math.min(1, i / fade, (samples.length - 1 - i) / fade);
    const value = Math.max(-1, Math.min(1, sample * (fade > 0 ? gain : 1)));
    view.setInt16(44 + i * 2, value * 0x7fff, true);
  });
  return bytes;
}

export function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}
