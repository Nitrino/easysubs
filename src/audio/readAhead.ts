import { readInit, segmentStart, type TInitInfo } from "./containers";
import { SAMPLE_RATE, toMono16k } from "./pcm";

// The audio a player buffered ahead of the playhead, copied from its Media Source Extensions appends by
// public/assets/js/mseTap.js and decoded here: the speech models get it before it plays, so their word times are ready
// when the line is shown. DRM-protected segments don't decode; the element's audio is all there is then.

type TTapMessage = {
  source: "es-mse";
  id: number;
  type: string;
  init: boolean;
  timestampOffset: number;
  data: ArrayBuffer;
};

// Segments that fail in a row before the tap gives up (encrypted audio)
const MAX_FAILURES = 4;

async function decode(init: Uint8Array, segment: Uint8Array): Promise<Float32Array> {
  const joined = new Uint8Array(init.length + segment.length);
  joined.set(init);
  joined.set(segment, init.length);
  const context = new OfflineAudioContext(1, 1, SAMPLE_RATE);
  const audio = await context.decodeAudioData(joined.buffer);
  const channels = Array.from({ length: audio.numberOfChannels }, (_, index) => audio.getChannelData(index));
  return toMono16k(channels, audio.sampleRate);
}

export function tapBufferedAudio(
  onChunk: (start: number, samples: Float32Array) => void,
  onFailure: (reason: string) => void,
): () => void {
  const inits = new Map<number, { bytes: Uint8Array; info: TInitInfo }>();
  let failures = 0;
  let stopped = false;
  let queue = Promise.resolve();

  const listener = (event: MessageEvent<TTapMessage>) => {
    if (event.source !== window || event.data?.source !== "es-mse") return;
    const { id, init, data, timestampOffset } = event.data;
    const bytes = new Uint8Array(data);
    if (init) {
      const info = readInit(bytes);
      if (info) inits.set(id, { bytes, info });
      return;
    }
    const known = inits.get(id);
    const start = known && segmentStart(bytes, known.info);
    if (start === null || start === undefined) return;

    queue = queue.then(async () => {
      if (stopped || failures >= MAX_FAILURES) return;
      try {
        const samples = await decode(known.bytes, bytes);
        failures = 0;
        onChunk(start + timestampOffset * 1000, samples);
      } catch {
        failures++;
        if (failures === MAX_FAILURES) onFailure("The buffered audio doesn't decode (DRM?)");
      }
    });
  };

  window.addEventListener("message", listener);
  window.postMessage({ source: "es-mse-control", enabled: true }, "*");
  return () => {
    stopped = true;
    window.removeEventListener("message", listener);
    window.postMessage({ source: "es-mse-control", enabled: false }, "*");
  };
}
