let context: AudioContext | undefined;
let playing: AudioBufferSourceNode | undefined;

function dataUrlToArrayBuffer(dataUrl: string) {
  const binary = atob(dataUrl.slice(dataUrl.indexOf(",") + 1));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// Through Web Audio rather than an <audio> element: the element would load the data: URL under the site's
// Content-Security-Policy (media-src), which streaming sites restrict. A new sound stops the one still playing.
export async function playAudio(dataUrl: string) {
  context ??= new AudioContext();
  if (context.state === "suspended") {
    await context.resume();
  }
  const buffer = await context.decodeAudioData(dataUrlToArrayBuffer(dataUrl));

  playing?.stop();
  playing = context.createBufferSource();
  playing.buffer = buffer;
  playing.connect(context.destination);
  playing.start();
}
