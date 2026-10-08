import { describe, expect, it } from "vitest";

import { decodePcm, encodePcm, SAMPLE_RATE, toMono16k } from "./pcm";
import { PcmTimeline } from "./timeline";
import { EnergyDetector, ENERGY_FRAME, frameMs, speechIntervals } from "./vad";
import { isInitSegment, readInit, segmentStart } from "./containers";
import { ctcAlignWords, logSoftmax } from "./ctcAlign";
import { createJobQueue } from "./queue";
import type { TAudioJob } from "./jobs";

const tone = (seconds: number, amplitude = 0.5, rate = SAMPLE_RATE) =>
  Float32Array.from(
    { length: Math.round(seconds * rate) },
    (_, i) => amplitude * Math.sin((2 * Math.PI * 440 * i) / rate),
  );

describe("pcm", () => {
  it("mixes channels down and resamples to 16 kHz", () => {
    const left = tone(1, 0.5, 48_000);
    const right = new Float32Array(left.length);
    const mono = toMono16k([left, right], 48_000);

    expect(mono.length).toBe(16_000);
    expect(Math.max(...mono)).toBeCloseTo(0.25, 2);
  });

  it("passes audio through messages as 16-bit samples", () => {
    const samples = Float32Array.from([0, 0.5, -0.5, 1, -1, 0.25]);
    const decoded = decodePcm(encodePcm(samples));

    decoded.forEach((sample, i) => expect(sample).toBeCloseTo(samples[i], 3));
  });
});

describe("PcmTimeline", () => {
  it("reads a window across stretches and says what it covers", () => {
    const timeline = new PcmTimeline();
    timeline.add(
      1000,
      Float32Array.from({ length: 16_000 }, () => 0.1),
    );
    timeline.add(
      2000,
      Float32Array.from({ length: 16_000 }, () => 0.2),
    );

    expect(timeline.covered()).toEqual([{ start: 1000, end: 3000 }]);
    const window = timeline.read(1500, 2500);
    expect(window.length).toBe(16_000);
    expect(window[0]).toBeCloseTo(0.1);
    expect(window.at(-1)).toBeCloseTo(0.2);
    expect(timeline.read(500, 1500)).toBeNull();
  });

  it("fills a few milliseconds between live chunks", () => {
    const timeline = new PcmTimeline();
    timeline.add(0, new Float32Array(1600));
    timeline.add(150, new Float32Array(1600));

    expect(timeline.covers(0, 250)).toBe(true);
  });

  it("forgets audio far from the playhead", () => {
    const timeline = new PcmTimeline();
    timeline.add(0, new Float32Array(16_000));
    timeline.add(20 * 60_000, new Float32Array(16_000));
    timeline.prune(20 * 60_000);

    expect(timeline.covers(0, 1000)).toBe(false);
    expect(timeline.covers(20 * 60_000, 20 * 60_000 + 1000)).toBe(true);
  });
});

describe("speech detection", () => {
  it("turns probabilities into speech with a hangover", () => {
    const probabilities = [0, 0.9, 0.9, 0.4, 0.2, 0.9, 0, 0, 0, 0, 0, 0, 0];

    expect(speechIntervals(probabilities, 1000, 20)).toEqual([{ start: 1020, end: 1120 }]);
  });

  it("hears a loud stretch over silence", () => {
    const detector = new EnergyDetector();
    const audio = new Float32Array(SAMPLE_RATE * 3);
    audio.set(tone(1), SAMPLE_RATE);
    const speech = speechIntervals(detector.probabilities(audio), 0, frameMs(ENERGY_FRAME));

    expect(speech).toHaveLength(1);
    expect(speech[0].start).toBeGreaterThanOrEqual(980);
    expect(speech[0].start).toBeLessThan(1100);
    expect(speech[0].end).toBeGreaterThan(1900);
    expect(speech[0].end).toBeLessThan(2200);
  });
});

// Bytes of MP4 boxes and EBML elements, enough for the parsers
const box = (type: string, ...children: Uint8Array[]) => {
  const body = concat(...children);
  const bytes = new Uint8Array(8 + body.length);
  new DataView(bytes.buffer).setUint32(0, bytes.length);
  bytes.set(
    [...type].map((char) => char.charCodeAt(0)),
    4,
  );
  bytes.set(body, 8);
  return bytes;
};
const uint32 = (...values: number[]) => {
  const bytes = new Uint8Array(values.length * 4);
  values.forEach((value, i) => new DataView(bytes.buffer).setUint32(i * 4, value));
  return bytes;
};
const concat = (...parts: Uint8Array[]) => {
  const bytes = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
  let at = 0;
  for (const part of parts) {
    bytes.set(part, at);
    at += part.length;
  }
  return bytes;
};
const ebml = (id: number[], body: Uint8Array, unknownSize = false) =>
  concat(
    Uint8Array.from(id),
    unknownSize
      ? Uint8Array.from([0x01, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])
      : Uint8Array.from([0x80 | body.length]),
    body,
  );

describe("containers", () => {
  it("finds when a fragmented MP4 segment starts by its sound track's timescale", () => {
    const trak = (id: number, timescale: number, handler: string) =>
      box(
        "trak",
        box("tkhd", uint32(0, 0, 0, id)),
        box(
          "mdia",
          box("mdhd", uint32(0, 0, 0, timescale)),
          box("hdlr", uint32(0, 0), Uint8Array.from([...handler].map((c) => c.charCodeAt(0)))),
        ),
      );
    const init = concat(box("ftyp", uint32(0)), box("moov", trak(1, 90_000, "vide"), trak(2, 48_000, "soun")));
    const segment = box(
      "moof",
      box("traf", box("tfhd", uint32(0, 1)), box("tfdt", uint32(0, 900_000))),
      box("traf", box("tfhd", uint32(0, 2)), box("tfdt", uint32(0, 480_000))),
    );

    expect(isInitSegment(init)).toBe(true);
    expect(isInitSegment(segment)).toBe(false);
    expect(segmentStart(segment, readInit(init))).toBe(10_000);
  });

  it("finds when a WebM cluster starts", () => {
    const header = ebml([0x1a, 0x45, 0xdf, 0xa3], new Uint8Array(0));
    const info = ebml([0x15, 0x49, 0xa9, 0x66], ebml([0x2a, 0xd7, 0xb1], Uint8Array.from([0x0f, 0x42, 0x40])));
    const init = concat(header, ebml([0x18, 0x53, 0x80, 0x67], info, true));
    const cluster = ebml([0x1f, 0x43, 0xb6, 0x75], ebml([0xe7], Uint8Array.from([0x30, 0x39])), true);

    expect(isInitSegment(init)).toBe(true);
    expect(readInit(init)).toEqual({ container: "webm", timecodeScale: 1_000_000 });
    expect(segmentStart(cluster, readInit(init))).toBe(12_345);
  });
});

describe("ctcAlignWords", () => {
  it("finds the frames of each word on the model's most likely path", () => {
    const vocab = { "<pad>": 0, "|": 1, H: 2, I: 3 };
    // 10 frames: blank, H, I, word separator, blank, blank, H, H, I, blank
    const path = [0, 2, 3, 1, 0, 0, 2, 2, 3, 0];
    const logits = new Float32Array(path.length * 4);
    path.forEach((token, frame) => (logits[frame * 4 + token] = 10));

    const times = ctcAlignWords(logSoftmax(logits, path.length, 4), path.length, 4, ["Hi,", "hi"], vocab, 1000);

    expect(times).toEqual([
      { start: 1020, end: 1060 },
      { start: 1120, end: 1180 },
    ]);
  });

  it("leaves words it has no letters for", () => {
    const vocab = { "<pad>": 0, "|": 1, A: 2 };
    const logits = new Float32Array(3 * 3);
    [0, 2, 0].forEach((token, frame) => (logits[frame * 3 + token] = 10));

    expect(ctcAlignWords(logSoftmax(logits, 3, 3), 3, 3, ["20", "a"], vocab, 0)).toEqual([
      null,
      { start: 20, end: 40 },
    ]);
  });
});

describe("createJobQueue", () => {
  it("runs one job at a time, speech detection first", async () => {
    const order: string[] = [];
    let release: () => void = () => undefined;
    const enqueue = createJobQueue<TAudioJob>(async (job) => {
      order.push(job.type);
      if (order.length === 1) await new Promise<void>((resolve) => (release = resolve));
    });

    enqueue({ type: "whisper", pcm: "", language: "en" });
    enqueue({ type: "align", pcm: "", words: [] });
    enqueue({ type: "vad", pcm: "" });
    release();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(order).toEqual(["whisper", "vad", "align"]);
  });
});
