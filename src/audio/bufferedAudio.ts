import type { TMediaFile } from "@src/learning-service/learningService";
import { readInit, segmentStart, SegmentSplitter, type TInitInfo } from "./containers";
import type { TTapMessage } from "./readAhead";
import { encodeWav, toBase64 } from "./wav";

// The sound of a subtitle line for an Anki card, cut from the audio the player buffered: public/assets/js/mseTap.js
// copies what players append to Media Source Extensions, and it's kept here around the playhead. The line is buffered
// by the time a word in it is hovered, so nothing has to play again. Encrypted (DRM) audio doesn't decode, and players
// that don't stream through MSE leave nothing to cut.

const CONSUMER = "clips";
// Audio kept behind and ahead of the playhead
const KEEP_BEHIND_MS = 5 * 60_000;
const KEEP_AHEAD_MS = 10 * 60_000;
// Longer than any segment players stream: further from the line, the segments before it are missing
const MAX_SEGMENT_MS = 30_000;
export const CLIP_SAMPLE_RATE = 22_050;
// Sound kept before and after the line
export const CLIP_PAD_MS = 250;
// How far the sound may fall short of the line's ends
const TOLERANCE_MS = 150;

type TInit = { bytes: Uint8Array; info: TInitInfo; splitter: SegmentSplitter };
type TSegment = { start: number; bytes: Uint8Array; init: TInit };
export type TDecode = (bytes: Uint8Array, sampleRate: number) => Promise<Float32Array>;

// The browser's decoder, mixed down to mono at `sampleRate`
export async function decodeMono(bytes: Uint8Array, sampleRate: number): Promise<Float32Array> {
  const context = new OfflineAudioContext(1, 1, sampleRate);
  const audio = await context.decodeAudioData(bytes.slice().buffer);
  const mono = new Float32Array(audio.length);
  for (let channel = 0; channel < audio.numberOfChannels; channel++) {
    const data = audio.getChannelData(channel);
    for (let i = 0; i < data.length; i++) mono[i] += data[i] / audio.numberOfChannels;
  }
  return mono;
}

function join(parts: Uint8Array[]): Uint8Array {
  const joined = new Uint8Array(parts.reduce((length, part) => length + part.length, 0));
  let at = 0;
  for (const part of parts) {
    joined.set(part, at);
    at += part.length;
  }
  return joined;
}

// The segments from the one the clip starts in to the last one starting before its end, decoded together so their
// joins don't click
function segmentsFor(list: TSegment[], from: number, start: number, to: number): TSegment[] | null {
  let first = list.findLastIndex((segment) => segment.start <= from);
  if (first < 0 && list[0] && list[0].start <= start + TOLERANCE_MS) first = 0;
  if (first < 0 || list[first].start < from - MAX_SEGMENT_MS) return null;

  const run = [list[first]];
  for (let i = first + 1; i < list.length && list[i].start < to && list[i].init === run[0].init; i++) run.push(list[i]);
  return run;
}

export class BufferedAudio {
  // By the tap's id of each SourceBuffer; segments in order of their start
  private inits = new Map<number, TInit>();
  private segments = new Map<number, TSegment[]>();

  constructor(private decode: TDecode = decodeMono) {}

  // Keeps what the tap copies until the returned stop; `now` is the playhead in ms
  listen(now: () => number): () => void {
    const listener = (event: MessageEvent<TTapMessage>) => {
      if (event.source !== window || event.data?.source !== "es-mse") return;
      if (event.data.to && event.data.to !== CONSUMER) return;
      this.add(event.data);
      this.prune(now());
    };
    window.addEventListener("message", listener);
    window.postMessage({ source: "es-mse-control", consumer: CONSUMER, enabled: true }, "*");
    return () => {
      window.removeEventListener("message", listener);
      window.postMessage({ source: "es-mse-control", consumer: CONSUMER, enabled: false }, "*");
      this.inits.clear();
      this.segments.clear();
    };
  }

  add({ id, init, data, timestampOffset }: Pick<TTapMessage, "id" | "init" | "data" | "timestampOffset">) {
    const bytes = new Uint8Array(data);
    if (init) {
      const info = readInit(bytes);
      if (info) this.inits.set(id, { bytes, info, splitter: new SegmentSplitter(info) });
      return;
    }
    const known = this.inits.get(id);
    if (!known) return;
    for (const segmentBytes of known.splitter.push(bytes)) {
      const start = segmentStart(segmentBytes, known.info);
      if (start !== null) this.keep(id, { start: start + timestampOffset * 1000, bytes: segmentBytes, init: known });
    }
  }

  private keep(id: number, segment: TSegment) {
    // A segment the player appends again, after a seek or in another quality, takes the place of the one before
    const list = (this.segments.get(id) ?? []).filter((other) => other.start !== segment.start);
    list.push(segment);
    this.segments.set(
      id,
      list.sort((a, b) => a.start - b.start),
    );
  }

  prune(around: number) {
    for (const [id, list] of this.segments) {
      const kept = list.filter(
        (segment) => segment.start >= around - KEEP_BEHIND_MS && segment.start <= around + KEEP_AHEAD_MS,
      );
      this.segments.set(id, kept);
    }
  }

  // The sound from `start` to `end` (ms of the video) with a little before and after, as a WAV; null when the
  // player's buffer didn't have it or it doesn't decode
  async clip(start: number, end: number): Promise<TMediaFile | null> {
    const [from, to] = [start - CLIP_PAD_MS, end + CLIP_PAD_MS];
    // The newest buffers first: players make new ones after ads or for another codec
    for (const list of [...this.segments.values()].reverse()) {
      const run = segmentsFor(list, from, start, to);
      if (!run) continue;
      try {
        const samples = await this.decode(
          join([run[0].init.bytes, ...run.map((segment) => segment.bytes)]),
          CLIP_SAMPLE_RATE,
        );
        const first = run[0].start;
        const covered = first + (samples.length / CLIP_SAMPLE_RATE) * 1000;
        if (covered < end - TOLERANCE_MS) continue;

        const index = (ms: number) => Math.max(0, Math.round(((ms - first) / 1000) * CLIP_SAMPLE_RATE));
        const wav = encodeWav(samples.subarray(index(from), index(Math.min(to, covered))), CLIP_SAMPLE_RATE);
        return { data: toBase64(wav), extension: "wav" };
      } catch (error) {
        console.warn("The buffered audio doesn't decode:", error);
      }
    }
    return null;
  }
}
