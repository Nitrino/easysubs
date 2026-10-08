import type { TSpeechDetector, TSpokenWordAudio, TSub, TTimedWord, TWordTime } from "@src/models/types";
import { isOpenEnded } from "@src/utils/wordTiming/estimate";
import type { TInterval } from "@src/utils/wordTiming/speech";
import { captureElementAudio } from "./elementCapture";
import type { TAudioWorker } from "./jobs";
import { decodePcm, encodePcm, samplesToMs } from "./pcm";
import { tapBufferedAudio } from "./readAhead";
import { PcmTimeline } from "./timeline";
import { EnergyDetector, SILERO_FRAME, speechIntervals, ENERGY_FRAME, frameMs } from "./vad";
import { connectAudioWorker } from "./worker";

// Listening to the video for the spoken-word experiment: the audio comes from the element while it plays, from what
// the player buffered ahead, or from the tab (the popup's "Listen to this tab"), all onto one timeline by video time.
// Speech detection runs on every chunk; wav2vec2 aligns the cues whose audio is in, Whisper recognizes 20 s windows.

export type TAudioSessionOptions = {
  audio: Exclude<TSpokenWordAudio, "off">;
  detector: TSpeechDetector;
  whisper: boolean;
  aligner: boolean;
};

export type TAudioSessionCallbacks = {
  speechHeard(found: { speech: TInterval[]; heard: TInterval }): void;
  cueAligned(cue: { sub: TSub; times: (TWordTime | null)[] }): void;
  wordsRecognized(window: { from: number; to: number; words: TTimedWord[] }): void;
  status(source: "speech" | "whisper" | "aligned", status: string): void;
  subs(): TSub[];
  language(): string;
};

type TSourceName = "element" | "ahead" | "tab";

// Silero VAD gets audio in blocks of about a second, each with half a second before it to settle its state on: it
// starts every block afresh and misses the first words otherwise
const VAD_BLOCK_MS = 1024;
const VAD_WARMUP_FRAMES = 16;
// Cues aligned and windows recognized from this far behind the playhead to this far ahead
const BEHIND_MS = 30_000;
const AHEAD_MS = 150_000;
const WHISPER_WINDOW_MS = 20_000;
// Speech a little before and after a cue still belongs to it
const CUE_PAD_MS = 300;
// While the tab's audio comes in, the element's is left out
const TAB_PREFERRED_MS = 1500;

export class AudioSession {
  private timeline = new PcmTimeline();
  private worker: TAudioWorker | null = null;
  private stops: (() => void)[] = [];
  private streams = new Map<
    TSourceName,
    { energy: EnergyDetector; end: number; block: Float32Array[]; blockStart: number }
  >();
  private aligned = new Set<string>();
  private recognized = new Set<number>();
  private busy = { aligner: false, whisper: false };
  private silero = false;
  private lastTabChunk = 0;
  private stopped = false;
  // The speech found, for debug()
  private found: TInterval[] = [];

  constructor(
    private video: HTMLVideoElement,
    private options: TAudioSessionOptions,
    private callbacks: TAudioSessionCallbacks,
  ) {}

  // What it heard and did, for looking into the experiment from the console (window.easysubsAudioSession.debug())
  debug() {
    return {
      covered: this.timeline.covered(),
      aligned: [...this.aligned],
      recognized: [...this.recognized],
      speech: this.found.map((interval) => `${Math.round(interval.start)}–${Math.round(interval.end)}`),
      busy: { ...this.busy },
      silero: this.silero,
      worker: Boolean(this.worker),
    };
  }

  async start() {
    (window as unknown as { easysubsAudioSession?: AudioSession }).easysubsAudioSession = this;
    try {
      this.stops.push(captureElementAudio(this.video, (start, samples) => this.chunk("element", start, samples)));
      this.callbacks.status("speech", "listening");
    } catch (error) {
      this.callbacks.status("speech", `no audio from the video: ${(error as Error).message}`);
    }
    if (this.options.audio === "ahead") {
      this.stops.push(
        tapBufferedAudio(
          (start, samples) => this.chunk("ahead", start, samples),
          (reason) => this.callbacks.status("speech", reason),
        ),
      );
    }

    const timer = setInterval(() => this.tick(), 500);
    this.stops.push(() => clearInterval(timer));

    try {
      this.worker = await connectAudioWorker();
      if (this.stopped) return this.worker.close();
      this.silero = this.options.detector === "silero";
      this.worker.onEvent((event) => {
        if (event.type === "status") {
          const source = event.model === "silero" ? "speech" : event.model === "aligner" ? "aligned" : "whisper";
          this.callbacks.status(source, event.status);
        }
        if (event.type === "tabAudio") this.tabChunk(event.epochEnd, event.pcm);
        if (event.type === "tabCaptureEnded") this.callbacks.status("speech", "tab capture ended");
      });
    } catch (error) {
      const reason = `no speech models: ${(error as Error).message}`;
      if (this.options.detector === "silero") this.callbacks.status("speech", reason);
      if (this.options.whisper) this.callbacks.status("whisper", reason);
      if (this.options.aligner) this.callbacks.status("aligned", reason);
    }
  }

  stop() {
    this.stopped = true;
    this.stops.forEach((stop) => stop());
    this.stops = [];
    this.worker?.close();
    this.timeline.clear();
  }

  private chunk(source: TSourceName, start: number, samples: Float32Array) {
    if (this.stopped || !Number.isFinite(start)) return;
    if (source === "element" && Date.now() - this.lastTabChunk < TAB_PREFERRED_MS) return;
    this.timeline.add(start, samples);

    let stream = this.streams.get(source);
    if (!stream) {
      stream = { energy: new EnergyDetector(), end: start, block: [], blockStart: start };
      this.streams.set(source, stream);
    }
    const continuous = Math.abs(start - stream.end) < 100;
    stream.end = start + samplesToMs(samples.length);

    if (!this.silero) {
      if (!continuous) stream.energy.reset();
      const probabilities = stream.energy.probabilities(samples);
      this.heard(speechIntervals(probabilities, start, frameMs(ENERGY_FRAME)), { start, end: stream.end });
      return;
    }

    if (!continuous && stream.block.length) this.flushVad(stream);
    if (stream.block.length === 0) stream.blockStart = start;
    stream.block.push(samples);
    if (stream.end - stream.blockStart >= VAD_BLOCK_MS) this.flushVad(stream);
  }

  private heard(speech: TInterval[], heard: TInterval) {
    this.found.push(...speech);
    this.callbacks.speechHeard({ speech, heard });
  }

  private flushVad(stream: { block: Float32Array[]; blockStart: number }) {
    const length = stream.block.reduce((sum, part) => sum + part.length, 0);
    const samples = new Float32Array(length);
    let at = 0;
    for (const part of stream.block) {
      samples.set(part, at);
      at += part.length;
    }
    const start = stream.blockStart;
    stream.block = [];
    const warmupMs = frameMs(SILERO_FRAME * VAD_WARMUP_FRAMES);
    const warmup = this.timeline.read(start - warmupMs, start);
    const input = warmup ? new Float32Array(warmup.length + samples.length) : samples;
    if (warmup) {
      input.set(warmup);
      input.set(samples, warmup.length);
    }
    this.worker
      ?.request({ type: "vad", pcm: encodePcm(input) })
      .then((all) => {
        if (this.stopped) return;
        const probabilities = warmup ? all.slice(Math.round(warmup.length / SILERO_FRAME)) : all;
        this.heard(speechIntervals(probabilities, start, frameMs(SILERO_FRAME)), {
          start,
          end: start + samplesToMs(Math.floor(length / SILERO_FRAME) * SILERO_FRAME),
        });
      })
      .catch((error: Error) => this.callbacks.status("speech", `Silero failed: ${error.message}`));
  }

  // The tab's audio is stamped with the clock when it was heard: the playhead was that much earlier
  private tabChunk(epochEnd: number, pcm: string) {
    if (this.video.paused || this.video.seeking) return;
    this.lastTabChunk = Date.now();
    const samples = decodePcm(pcm);
    const rate = this.video.playbackRate || 1;
    const end = this.video.currentTime * 1000 - (Date.now() - epochEnd) * rate;
    this.chunk("tab", end - samplesToMs(samples.length) * rate, samples);
  }

  private tick() {
    if (this.stopped) return;
    const now = this.video.currentTime * 1000;
    this.timeline.prune(now);
    if (this.options.aligner && this.worker && !this.busy.aligner) this.alignNext(now);
    if (this.options.whisper && this.worker && !this.busy.whisper) this.recognizeNext(now);
  }

  // The cue nearest the playhead whose audio is in, ahead first
  private alignNext(now: number) {
    if (!this.callbacks.language().startsWith("en")) {
      this.callbacks.status("aligned", "English only");
      return;
    }
    const candidates = this.callbacks
      .subs()
      .filter((sub) => !isOpenEnded(sub) && sub.end > now - BEHIND_MS && sub.start < now + AHEAD_MS)
      .filter((sub) => !this.aligned.has(`${sub.start}|${sub.text}`))
      .filter((sub) => this.timeline.covers(sub.start - CUE_PAD_MS, sub.end + CUE_PAD_MS))
      .sort(
        (a, b) =>
          Math.abs(a.start - now) +
          (a.start < now ? 10_000 : 0) -
          (Math.abs(b.start - now) + (b.start < now ? 10_000 : 0)),
      );
    const sub = candidates[0];
    if (!sub) return;

    const from = sub.start - CUE_PAD_MS;
    const samples = this.timeline.read(from, sub.end + CUE_PAD_MS);
    if (!samples) return;
    this.aligned.add(`${sub.start}|${sub.text}`);
    this.busy.aligner = true;
    this.worker
      .request({ type: "align", pcm: encodePcm(samples), words: sub.items.map((item) => item.text) })
      .then((times) => {
        if (this.stopped) return;
        const shifted = times.map((time) => (time ? { start: time.start + from, end: time.end + from } : null));
        this.callbacks.cueAligned({ sub, times: shifted });
        this.callbacks.status("aligned", "ready");
      })
      .catch((error: Error) => this.callbacks.status("aligned", `failed: ${error.message}`))
      .finally(() => (this.busy.aligner = false));
  }

  // 20 s windows of the video, the one with the playhead first, then the ones ahead
  private recognizeNext(now: number) {
    const current = Math.floor(now / WHISPER_WINDOW_MS);
    const order = [
      current,
      ...Array.from({ length: AHEAD_MS / WHISPER_WINDOW_MS }, (_, i) => current + i + 1),
      current - 1,
    ];
    const index = order.find((candidate) => {
      if (candidate < 0 || this.recognized.has(candidate)) return false;
      return this.timeline.covers(candidate * WHISPER_WINDOW_MS, (candidate + 1) * WHISPER_WINDOW_MS);
    });
    if (index === undefined) return;

    const from = index * WHISPER_WINDOW_MS;
    const to = from + WHISPER_WINDOW_MS;
    const samples = this.timeline.read(from, to);
    if (!samples) return;
    this.recognized.add(index);
    this.busy.whisper = true;
    this.callbacks.status("whisper", "recognizing");
    this.worker
      .request({ type: "whisper", pcm: encodePcm(samples), language: this.callbacks.language() })
      .then((words) => {
        if (this.stopped) return;
        const shifted = words.map((word) => ({ ...word, start: word.start + from, end: word.end + from }));
        this.callbacks.wordsRecognized({ from, to, words: shifted });
        this.callbacks.status("whisper", "ready");
      })
      .catch((error: Error) => this.callbacks.status("whisper", `failed: ${error.message}`))
      .finally(() => (this.busy.whisper = false));
  }
}
