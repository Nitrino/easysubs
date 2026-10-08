import { encodePcm, toMono16k } from "@src/audio/pcm";

// The tab's sound, captured with the stream id the background got from chrome.tabCapture after the user clicked
// "Listen to this tab" in the popup. Capturing takes the sound away from the tab, so it plays through here as well.
// Chunks are stamped with the clock: the content script turns that into video time.

type TCapture = { stream: MediaStream; context: AudioContext };
const captures = new Map<number, TCapture>();

export async function startTabCapture(
  tabId: number,
  streamId: string,
  onChunk: (chunk: { epochEnd: number; pcm: string }) => void,
): Promise<void> {
  stopTabCapture(tabId);
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { mandatory: { chromeMediaSource: "tab", chromeMediaSourceId: streamId } } as MediaTrackConstraints,
    video: false,
  });
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  source.connect(context.destination);

  const processor = context.createScriptProcessor(4096, 1, 1);
  const mute = context.createGain();
  mute.gain.value = 0;
  source.connect(processor);
  processor.connect(mute).connect(context.destination);
  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer;
    onChunk({ epochEnd: Date.now(), pcm: encodePcm(toMono16k([input.getChannelData(0)], input.sampleRate)) });
  };
  captures.set(tabId, { stream, context });
}

export function stopTabCapture(tabId: number) {
  const capture = captures.get(tabId);
  if (!capture) return false;
  capture.stream.getTracks().forEach((track) => track.stop());
  void capture.context.close();
  captures.delete(tabId);
  return true;
}
