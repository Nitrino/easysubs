import { toMono16k } from "./pcm";

// The video's audio while it plays, from its element: captureStream() gives the decoded sound without changing what
// the user hears. Chrome and Firefox refuse it for DRM-protected video ("not supported with EME"); video from another
// origin without CORS comes through silent.

type TCapturable = HTMLVideoElement & { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream };

// About 85 ms at 48 kHz: ScriptProcessorNode is deprecated but runs everywhere without a worklet file, which pages'
// CSP can block
const BUFFER_SIZE = 4096;
// Further than this from the playhead, the audio clock and the video went apart (a stall): start over from the playhead
const MAX_DRIFT_MS = 1000;

export function captureElementAudio(
  video: HTMLVideoElement,
  onChunk: (start: number, samples: Float32Array) => void,
): () => void {
  const element = video as TCapturable;
  const firefox = !element.captureStream && Boolean(element.mozCaptureStream);
  const stream = element.captureStream ? element.captureStream() : element.mozCaptureStream?.();
  if (!stream) throw new Error("This browser can't capture the video's audio");

  const context = new AudioContext();
  const processor = context.createScriptProcessor(BUFFER_SIZE, 1, 1);
  const mute = context.createGain();
  mute.gain.value = 0;
  processor.connect(mute).connect(context.destination);

  let source: MediaStreamAudioSourceNode | null = null;
  const connect = () => {
    if (source || stream.getAudioTracks().length === 0) return;
    source = context.createMediaStreamSource(stream);
    source.connect(processor);
    // Firefox's mozCaptureStream takes the sound away from the element: it plays through here instead
    if (firefox) source.connect(context.destination);
  };
  connect();
  stream.addEventListener("addtrack", connect);

  // Chunks are timed by the audio clock, offset to video time. Each callback says where the playhead is when it runs,
  // which is never earlier than its buffer's end but often later (callbacks run late and in bursts when the page is
  // busy): the smallest offset seen since playback (re)started is the closest.
  let offset: number | null = null;
  const restart = () => (offset = null);
  video.addEventListener("play", restart);
  video.addEventListener("seeked", restart);
  video.addEventListener("ratechange", restart);

  processor.onaudioprocess = (event) => {
    if (video.paused || video.seeking) return;
    const input = event.inputBuffer;
    const rate = video.playbackRate || 1;
    const length = input.duration * 1000 * rate;
    const clock = event.playbackTime * 1000 * rate;
    const seen = video.currentTime * 1000 - length - clock;
    if (offset !== null && Math.abs(seen - offset) > MAX_DRIFT_MS) offset = null;
    offset = offset === null ? seen : Math.min(offset, seen);
    onChunk(clock + offset, toMono16k([input.getChannelData(0)], input.sampleRate));
  };

  // The page's autoplay policy keeps a new AudioContext suspended until the user interacts
  const resume = () => void context.resume();
  resume();
  video.addEventListener("play", resume);
  document.addEventListener("click", resume, true);

  return () => {
    video.removeEventListener("play", restart);
    video.removeEventListener("seeked", restart);
    video.removeEventListener("ratechange", restart);
    video.removeEventListener("play", resume);
    document.removeEventListener("click", resume, true);
    stream.removeEventListener("addtrack", connect);
    processor.onaudioprocess = null;
    source?.disconnect();
    processor.disconnect();
    void context.close();
  };
}
