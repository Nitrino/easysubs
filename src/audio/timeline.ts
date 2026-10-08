import { addInterval, type TInterval } from "@src/utils/wordTiming/speech";
import { msToSamples, samplesToMs, SAMPLE_RATE } from "./pcm";

// The video's audio heard so far, by video time: stretches of 16 kHz samples from the element while it plays, from
// what the player buffered ahead, or from the tab. The speech models read windows of it (a cue, 20 s for Whisper).

type TStretch = { start: number; samples: Float32Array };

// Holes this short in a window are filled with silence: live chunks are timed by the playhead, a few ms off
const MAX_HOLE_MS = 120;
// Audio kept around the playhead
const KEEP_MS = 10 * 60_000;

export class PcmTimeline {
  private stretches: TStretch[] = [];
  private coverage: TInterval[] = [];

  add(start: number, samples: Float32Array) {
    if (samples.length === 0) return;
    const end = start + samplesToMs(samples.length);
    // Newer audio of the same time replaces what was there
    this.stretches = this.stretches.filter((stretch) => !(stretch.start >= start && this.end(stretch) <= end));
    this.stretches.push({ start, samples });
    this.stretches.sort((a, b) => a.start - b.start);
    this.coverage = addInterval(this.coverage, { start, end }, MAX_HOLE_MS);
  }

  covered(): TInterval[] {
    return this.coverage;
  }

  covers(start: number, end: number): boolean {
    return this.coverage.some((interval) => interval.start <= start && interval.end >= end);
  }

  // The samples from `start` to `end`, null if the timeline doesn't cover them
  read(start: number, end: number): Float32Array | null {
    if (!this.covers(start, end)) return null;
    const output = new Float32Array(msToSamples(end - start));
    for (const stretch of this.stretches) {
      if (this.end(stretch) <= start || stretch.start >= end) continue;
      // Where the stretch's first sample falls in the output, possibly before it
      const offset = msToSamples(stretch.start - start);
      const from = Math.max(0, offset);
      const to = Math.min(output.length, offset + stretch.samples.length);
      if (to > from) output.set(stretch.samples.subarray(from - offset, to - offset), from);
    }
    return output;
  }

  // Drops audio far from the playhead
  prune(around: number) {
    this.stretches = this.stretches.filter(
      (stretch) => this.end(stretch) > around - KEEP_MS && stretch.start < around + KEEP_MS,
    );
    this.coverage = this.coverage
      .map((interval) => ({
        start: Math.max(interval.start, around - KEEP_MS),
        end: Math.min(interval.end, around + KEEP_MS),
      }))
      .filter((interval) => interval.end > interval.start);
  }

  clear() {
    this.stretches = [];
    this.coverage = [];
  }

  private end(stretch: TStretch) {
    return stretch.start + (stretch.samples.length / SAMPLE_RATE) * 1000;
  }
}
