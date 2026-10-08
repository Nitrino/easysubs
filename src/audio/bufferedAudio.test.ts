import { afterEach, describe, expect, it, vi } from "vitest";
import { BufferedAudio, CLIP_PAD_MS, CLIP_SAMPLE_RATE } from "./bufferedAudio";
import { encodeWav } from "./wav";
import { readInit, segmentStart, SegmentSplitter } from "./containers";

// WebM as players append it: an initialization segment, then clusters that start at a time
const ebml = (id: number[], body: Uint8Array, unknownSize = false) =>
  Uint8Array.from([
    ...id,
    ...(unknownSize ? [0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff] : [0x80 | body.length]),
    ...body,
  ]);
const CLUSTER_ID = [0x1f, 0x43, 0xb6, 0x75];
const INIT = Uint8Array.from([
  ...ebml([0x1a, 0x45, 0xdf, 0xa3], new Uint8Array(0)),
  ...ebml(
    [0x18, 0x53, 0x80, 0x67],
    ebml([0x15, 0x49, 0xa9, 0x66], ebml([0x2a, 0xd7, 0xb1], Uint8Array.from([0x0f, 0x42, 0x40]))),
    true,
  ),
]);
// A cluster at `ms` with its size, as YouTube streams them; `mark` tells one copy of it from another
const cluster = (ms: number, mark = 0) =>
  ebml(CLUSTER_ID, Uint8Array.from([...ebml([0xe7], Uint8Array.from([ms >> 8, ms & 0xff])), mark]));

const SEGMENT_MS = 5000;
// Decodes clusters one after another, as browsers do: each gives SEGMENT_MS of a ramp whose value is the time it was
// at in the cluster (ms / 100 000), times 2 for a marked copy
async function fakeDecode(bytes: Uint8Array, sampleRate: number): Promise<Float32Array> {
  const samples: number[] = [];
  for (let at = 0; at < bytes.length - 4; at++) {
    if (!CLUSTER_ID.every((byte, i) => bytes[at + i] === byte)) continue;
    const body = at + 4 + 1;
    const start = (bytes[body + 2] << 8) | bytes[body + 3];
    const scale = bytes[body + 4] ? 2 : 1;
    for (let i = 0; i < (SEGMENT_MS / 1000) * sampleRate; i++)
      samples.push(((start + (i / sampleRate) * 1000) / 1e5) * scale);
  }
  return Float32Array.from(samples);
}

// The WAV's samples back as numbers
function wavSamples(base64: string): number[] {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  return Array.from({ length: (bytes.length - 44) / 2 }, (_, i) => view.getInt16(44 + i * 2, true) / 0x7fff);
}

const tap = (data: Uint8Array, init = false, id = 1, timestampOffset = 0) => ({
  id,
  init,
  data: data.slice().buffer,
  timestampOffset,
});

function buffered(starts = [0, 5000, 10000, 15000], decode = vi.fn(fakeDecode)) {
  const audio = new BufferedAudio(decode);
  audio.add(tap(INIT, true));
  for (const start of starts) audio.add(tap(cluster(start)));
  return { audio, decode };
}

// The sample 20 ms into the clip, past the fade, and the clip's length in ms
async function clipOf(audio: BufferedAudio, start: number, end: number) {
  const clip = await audio.clip(start, end);
  if (!clip) return null;
  const samples = wavSamples(clip.data);
  return {
    extension: clip.extension,
    at20ms: samples[Math.round(0.02 * CLIP_SAMPLE_RATE)] * 1e5,
    ms: (samples.length / CLIP_SAMPLE_RATE) * 1000,
    samples,
  };
}

describe("BufferedAudio", () => {
  afterEach(() => vi.restoreAllMocks());

  it("cuts a line with a little before and after it from the segment it's in", async () => {
    const { audio, decode } = buffered();

    const clip = await clipOf(audio, 6200, 9100);

    expect(clip.extension).toBe("wav");
    expect(clip.ms).toBeCloseTo(9100 - 6200 + 2 * CLIP_PAD_MS, 0);
    expect(clip.at20ms).toBeCloseTo(6200 - CLIP_PAD_MS + 20, -1);
    // The initialization segment and the one cluster
    expect(decode).toHaveBeenCalledTimes(1);
    expect(decode.mock.calls[0][0]).toEqual(Uint8Array.from([...INIT, ...cluster(5000)]));
  });

  it("decodes the segments of a line that crosses into the next one together", async () => {
    const { audio, decode } = buffered();

    const clip = await clipOf(audio, 9000, 11000);

    expect(decode.mock.calls[0][0]).toEqual(Uint8Array.from([...INIT, ...cluster(5000), ...cluster(10000)]));
    expect(clip.ms).toBeCloseTo(2500, 0);
    const at = (ms: number) => clip.samples[Math.round(((ms - 8750) / 1000) * CLIP_SAMPLE_RATE)] * 1e5;
    expect(at(9900)).toBeCloseTo(9900, -1);
    expect(at(10100)).toBeCloseTo(10100, -1);
  });

  it("goes by the SourceBuffer's timestampOffset", async () => {
    const audio = new BufferedAudio(fakeDecode);
    audio.add(tap(INIT, true));
    audio.add(tap(cluster(0), false, 1, 60));

    const clip = await clipOf(audio, 61000, 62000);

    expect(clip.at20ms).toBeCloseTo(1000 - CLIP_PAD_MS + 20, -1);
  });

  it("takes a segment appended again in place of the one before", async () => {
    const { audio } = buffered();
    audio.add(tap(cluster(5000, 1)));

    const clip = await clipOf(audio, 6200, 9100);

    expect(clip.at20ms).toBeCloseTo((6200 - CLIP_PAD_MS + 20) * 2, -1);
  });

  it.each([
    ["after what's buffered", 30_000, 31_000],
    ["before it", -2000, -1000],
  ])("has nothing for a line %s", async (_, start, end) => {
    const { audio } = buffered();

    expect(await audio.clip(start, end)).toBeNull();
  });

  it("has nothing for a line in a gap of the buffer", async () => {
    const { audio } = buffered([0, 60_000]);

    expect(await audio.clip(40_000, 42_000)).toBeNull();
  });

  it("has nothing when the audio doesn't decode", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { audio } = buffered(
      undefined,
      vi.fn(async () => Promise.reject(new Error("EncodingError"))),
    );

    expect(await audio.clip(6200, 9100)).toBeNull();
  });

  it("lets go of the audio far from the playhead", async () => {
    const { audio } = buffered([0, 5000, 600_000]);

    audio.prune(600_000);

    expect(await audio.clip(1000, 2000)).toBeNull();
  });

  it("keeps the segments the tap copies while it listens, but not the ones replayed for another consumer", async () => {
    const audio = new BufferedAudio(fakeDecode);
    const posted = vi.spyOn(window, "postMessage").mockImplementation(() => {});
    const send = (data: object) =>
      window.dispatchEvent(new MessageEvent("message", { data: { source: "es-mse", ...data }, source: window }));

    const stop = audio.listen(() => 7000);
    send(tap(INIT, true));
    send({ ...tap(cluster(5000)), to: "readAhead" });
    expect(await audio.clip(6200, 9100)).toBeNull();
    send(tap(cluster(5000)));

    expect(await audio.clip(6200, 9100)).not.toBeNull();
    expect(posted).toHaveBeenCalledWith({ source: "es-mse-control", consumer: "clips", enabled: true }, "*");
    stop();
    expect(posted).toHaveBeenLastCalledWith({ source: "es-mse-control", consumer: "clips", enabled: false }, "*");
    expect(await audio.clip(6200, 9100)).toBeNull();
  });
});

describe("SegmentSplitter", () => {
  const webm = () => new SegmentSplitter(readInit(INIT));
  const starts = (segments: Uint8Array[]) => segments.map((segment) => segmentStart(segment, readInit(INIT)));

  it("puts clusters appended in pieces back together", () => {
    const splitter = webm();
    const stream = Uint8Array.from([...cluster(0), ...cluster(5000), ...cluster(10000)]);

    const segments = [3, 9, 14, 30].flatMap((end, i, ends) => splitter.push(stream.slice(ends[i - 1] ?? 0, end)));

    expect(starts(segments)).toEqual([0, 5000, 10000]);
    expect(segments[1]).toEqual(cluster(5000));
  });

  it("picks a stream joined in the middle up at its next cluster", () => {
    const stream = Uint8Array.from([...cluster(0), ...cluster(5000)]);

    expect(starts(webm().push(stream.slice(3)))).toEqual([5000]);
  });

  it("ends a cluster of unknown size where the next one starts", () => {
    const unsized = (ms: number) => ebml(CLUSTER_ID, ebml([0xe7], Uint8Array.from([ms >> 8, ms & 0xff])), true);
    const splitter = webm();

    expect(starts(splitter.push(Uint8Array.from([...unsized(0), ...unsized(5000)])))).toEqual([0]);
    expect(starts(splitter.push(unsized(10000)))).toEqual([5000]);
  });

  it("gives MP4 fragments, a moof with its mdat, whatever comes between them", () => {
    const box = (type: string, body: number[] = []) => {
      const bytes = new Uint8Array(8 + body.length);
      new DataView(bytes.buffer).setUint32(0, bytes.length);
      bytes.set(
        [...type].map((char) => char.charCodeAt(0)),
        4,
      );
      bytes.set(body, 8);
      return bytes;
    };
    const fragment = (mark: number) => [...box("moof", [mark]), ...box("mdat", [mark, mark])];
    const stream = Uint8Array.from([...box("styp"), ...fragment(1), ...box("prft", [0, 0]), ...fragment(2)]);
    const splitter = new SegmentSplitter({ container: "mp4", timescales: {}, soundTracks: [] });

    const segments = [5, 20, 33, 50, stream.length].flatMap((end, i, ends) =>
      splitter.push(stream.slice(ends[i - 1] ?? 0, end)),
    );

    expect(segments).toEqual([Uint8Array.from(fragment(1)), Uint8Array.from(fragment(2))]);
  });
});

describe("encodeWav", () => {
  it("writes 16-bit mono PCM that fades in and out", () => {
    const wav = encodeWav(new Float32Array(1000).fill(0.5), 22_050);
    const view = new DataView(wav.buffer);

    expect(String.fromCharCode(...wav.subarray(0, 4), ...wav.subarray(8, 12))).toBe("RIFFWAVE");
    expect(view.getUint16(22, true)).toBe(1);
    expect(view.getUint32(24, true)).toBe(22_050);
    expect(view.getUint32(40, true)).toBe(2000);
    expect(view.getInt16(44, true)).toBe(0);
    expect(view.getInt16(44 + 500 * 2, true) / 0x7fff).toBeCloseTo(0.5);
    expect(view.getInt16(44 + 999 * 2, true)).toBe(0);
  });
});
