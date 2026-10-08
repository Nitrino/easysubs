// When a media segment that a player appends to Media Source Extensions starts, in ms of the media: fragmented MP4
// (tfdt of the sound track over its mdhd timescale) and WebM (the Cluster's Timecode times the TimecodeScale). The
// initialization segment gives the timescales.

export type TInitInfo =
  | { container: "mp4"; timescales: Record<number, number>; soundTracks: number[] }
  | { container: "webm"; timecodeScale: number };

export const isWebm = (bytes: Uint8Array) =>
  bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3;

const boxType = (bytes: Uint8Array, at: number) => String.fromCharCode(...bytes.subarray(at + 4, at + 8));

export function isInitSegment(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;
  if (isWebm(bytes)) return true;
  const type = boxType(bytes, 0);
  return type === "ftyp" || type === "moov";
}

// --- MP4 ---

type TBox = { type: string; start: number; body: number; end: number };

function* boxes(bytes: Uint8Array, from: number, to: number): Generator<TBox> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let at = from;
  while (at + 8 <= to) {
    let size = view.getUint32(at);
    let body = at + 8;
    if (size === 1) {
      size = Number(view.getBigUint64(at + 8));
      body = at + 16;
    } else if (size === 0) {
      size = to - at;
    }
    if (size < 8) return;
    yield { type: boxType(bytes, at), start: at, body, end: Math.min(to, at + size) };
    at += size;
  }
}

const child = (bytes: Uint8Array, box: TBox, type: string) =>
  [...boxes(bytes, box.body, box.end)].find((candidate) => candidate.type === type);

function mp4Init(bytes: Uint8Array): TInitInfo | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const moov = [...boxes(bytes, 0, bytes.length)].find((box) => box.type === "moov");
  if (!moov) return null;
  const timescales: Record<number, number> = {};
  const soundTracks: number[] = [];
  for (const trak of boxes(bytes, moov.body, moov.end)) {
    if (trak.type !== "trak") continue;
    const tkhd = child(bytes, trak, "tkhd");
    const mdia = child(bytes, trak, "mdia");
    const mdhd = mdia && child(bytes, mdia, "mdhd");
    const hdlr = mdia && child(bytes, mdia, "hdlr");
    if (!tkhd || !mdhd) continue;
    const trackId = view.getUint32(tkhd.body + (bytes[tkhd.body] === 1 ? 20 : 12));
    timescales[trackId] = view.getUint32(mdhd.body + (bytes[mdhd.body] === 1 ? 20 : 12));
    if (hdlr && boxType(bytes, hdlr.body + 4) === "soun") soundTracks.push(trackId);
  }
  return { container: "mp4", timescales, soundTracks };
}

function mp4Start(bytes: Uint8Array, init: Extract<TInitInfo, { container: "mp4" }>): number | null {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (const moof of boxes(bytes, 0, bytes.length)) {
    if (moof.type !== "moof") continue;
    for (const traf of boxes(bytes, moof.body, moof.end)) {
      if (traf.type !== "traf") continue;
      const tfhd = child(bytes, traf, "tfhd");
      const tfdt = child(bytes, traf, "tfdt");
      if (!tfhd || !tfdt) continue;
      const trackId = view.getUint32(tfhd.body + 4);
      if (init.soundTracks.length && !init.soundTracks.includes(trackId)) continue;
      const time = bytes[tfdt.body] === 1 ? Number(view.getBigUint64(tfdt.body + 4)) : view.getUint32(tfdt.body + 4);
      const timescale = init.timescales[trackId] ?? Object.values(init.timescales)[0];
      return timescale ? (time / timescale) * 1000 : null;
    }
  }
  return null;
}

// --- WebM (EBML) ---

const SEGMENT = 0x18538067;
const INFO = 0x1549a966;
const TIMECODE_SCALE = 0x2ad7b1;
const CLUSTER = 0x1f43b675;
const TIMECODE = 0xe7;

// An element's id (with its length marker, as ids are written) or size (without it); -1 size is unknown
function readVint(bytes: Uint8Array, at: number, keepMarker: boolean): { value: number; length: number } | null {
  const first = bytes[at];
  if (first === undefined || first === 0) return null;
  const length = Math.clz32(first) - 23;
  if (at + length > bytes.length) return null;
  let value = keepMarker ? first : first & (0xff >> length);
  let unknown = value === 0xff >> length;
  for (let i = 1; i < length; i++) {
    value = value * 256 + bytes[at + i];
    if (bytes[at + i] !== 0xff) unknown = false;
  }
  return { value: !keepMarker && unknown ? -1 : value, length };
}

type TElement = { id: number; body: number; end: number };

function* elements(bytes: Uint8Array, from: number, to: number): Generator<TElement> {
  let at = from;
  while (at < to) {
    const id = readVint(bytes, at, true);
    const size = id && readVint(bytes, at + id.length, false);
    if (!id || !size) return;
    const body = at + id.length + size.length;
    // Segments and clusters a player streams have no size: their children follow
    const end = size.value < 0 ? to : Math.min(to, body + size.value);
    yield { id: id.value, body, end };
    at = size.value < 0 ? body : end;
  }
}

const readUint = (bytes: Uint8Array, element: TElement) => {
  let value = 0;
  for (let i = element.body; i < element.end; i++) value = value * 256 + bytes[i];
  return value;
};

function webmInit(bytes: Uint8Array): TInitInfo {
  let timecodeScale = 1_000_000;
  for (const element of elements(bytes, 0, bytes.length)) {
    if (element.id !== SEGMENT) continue;
    for (const part of elements(bytes, element.body, element.end)) {
      if (part.id === CLUSTER) break;
      if (part.id !== INFO) continue;
      for (const field of elements(bytes, part.body, part.end)) {
        if (field.id === TIMECODE_SCALE) timecodeScale = readUint(bytes, field);
      }
    }
  }
  return { container: "webm", timecodeScale };
}

function webmStart(bytes: Uint8Array, init: Extract<TInitInfo, { container: "webm" }>): number | null {
  for (const element of elements(bytes, 0, bytes.length)) {
    if (element.id !== CLUSTER) continue;
    for (const field of elements(bytes, element.body, element.end)) {
      if (field.id === TIMECODE) return (readUint(bytes, field) * init.timecodeScale) / 1e6;
    }
  }
  return null;
}

export function readInit(bytes: Uint8Array): TInitInfo | null {
  return isWebm(bytes) ? webmInit(bytes) : mp4Init(bytes);
}

// The segment's start in the media's own time; add the SourceBuffer's timestampOffset for the video's time
export function segmentStart(bytes: Uint8Array, init: TInitInfo): number | null {
  return init.container === "webm" ? webmStart(bytes, init) : mp4Start(bytes, init);
}

// --- Splitting the stream into segments ---

const CLUSTER_ID = [0x1f, 0x43, 0xb6, 0x75];
const MOOF = [0x6d, 0x6f, 0x6f, 0x66];
// Boxes a fragmented MP4 stream has between its fragments
const MP4_BOXES = new Set(["moof", "mdat", "styp", "sidx", "prft", "emsg", "free", "skip", "ftyp", "moov"]);
// Larger than any segment: a size past it was read from bytes that aren't one
const MAX_SEGMENT_BYTES = 64 * 1024 * 1024;

function indexOf(bytes: Uint8Array, pattern: number[], from: number): number {
  for (let at = from; at <= bytes.length - pattern.length; at++) {
    if (pattern.every((byte, i) => bytes[at + i] === byte)) return at;
  }
  return -1;
}

function concat(first: Uint8Array, second: Uint8Array): Uint8Array {
  if (first.length === 0) return second.slice();
  const joined = new Uint8Array(first.length + second.length);
  joined.set(first);
  joined.set(second, first.length);
  return joined;
}

// Players append their stream in pieces of any size: YouTube appends whole clusters at first, then whatever it has
// downloaded. The splitter puts the pieces back together and gives the complete media segments: WebM clusters, and
// MP4 fragments (a moof with its mdat). A stream joined in the middle is picked up at its next segment.
export class SegmentSplitter {
  private pending: Uint8Array = new Uint8Array(0);

  constructor(private info: TInitInfo) {}

  push(bytes: Uint8Array): Uint8Array[] {
    this.pending = concat(this.pending, bytes);
    const segments: Uint8Array[] = [];
    for (let segment = this.next(); segment; segment = this.next()) segments.push(segment);
    return segments;
  }

  private take(length: number): Uint8Array {
    const segment = this.pending.slice(0, length);
    this.pending = this.pending.slice(length);
    return segment;
  }

  // Drops the bytes before `pattern`, keeping a tail that may be the start of it
  private skipTo(pattern: number[], offset: number): boolean {
    const at = indexOf(this.pending, pattern, 0);
    if (at < 0) {
      this.pending = this.pending.slice(Math.max(0, this.pending.length - pattern.length - offset));
      return false;
    }
    if (at - offset > 0) this.pending = this.pending.slice(at - offset);
    return true;
  }

  private next(): Uint8Array | null {
    return this.info.container === "webm" ? this.nextCluster() : this.nextFragment();
  }

  private nextCluster(): Uint8Array | null {
    if (!CLUSTER_ID.every((byte, i) => this.pending[i] === byte) && !this.skipTo(CLUSTER_ID, 0)) return null;
    const size = readVint(this.pending, CLUSTER_ID.length, false);
    // Up to 8 bytes of size, unless these aren't a cluster's
    if (!size && this.pending.length < CLUSTER_ID.length + 8) return null;
    if (!size || size.value > MAX_SEGMENT_BYTES) {
      this.pending = this.pending.slice(1);
      return this.nextCluster();
    }
    const body = CLUSTER_ID.length + size.length;
    // A cluster of unknown size ends where the next one starts
    const end = size.value < 0 ? indexOf(this.pending, CLUSTER_ID, body) : body + size.value;
    if (end < 0 || this.pending.length < end) return null;
    return this.take(end);
  }

  private nextFragment(): Uint8Array | null {
    for (;;) {
      if (this.pending.length < 16) return null;
      const view = new DataView(this.pending.buffer, this.pending.byteOffset, this.pending.byteLength);
      const type = boxType(this.pending, 0);
      const size =
        view.getUint32(0) === 1 && this.pending.length >= 16 ? Number(view.getBigUint64(8)) : view.getUint32(0);
      if (!MP4_BOXES.has(type) || size < 8 || size > MAX_SEGMENT_BYTES) {
        this.pending = this.pending.slice(1);
        if (!this.skipTo(MOOF, 4)) return null;
        continue;
      }
      if (this.pending.length < size) return null;
      if (type !== "moof") {
        this.take(size);
        continue;
      }
      if (this.pending.length < size + 8) return null;
      const mdatSize = view.getUint32(size);
      if (boxType(this.pending, size) !== "mdat") {
        this.take(size);
        continue;
      }
      if (this.pending.length < size + mdatSize) return null;
      return this.take(size + mdatSize);
    }
  }
}
