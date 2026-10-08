// Runs in the page before its player (a MAIN-world content script at document_start, see manifest.js). Players stream
// through Media Source Extensions: they append the audio they downloaded, often a minute ahead of the playhead. While
// a consumer in the content script listens, every audio segment is copied to it: the spoken-word experiment decodes
// them to find the speech before it plays (src/audio/readAhead.ts), Anki cards get the sound of a line
// (src/audio/bufferedAudio.ts). Initialization segments and the latest segments are kept for a consumer that starts
// after the player buffered ahead.
(() => {
  if (window.__esMseTap || typeof SourceBuffer === "undefined") return;
  window.__esMseTap = true;

  const AUDIO_CODECS = /mp4a|opus|vorbis|ac-3|ec-3|flac|audio\//i;
  const BACKLOG_BYTES = 2_000_000;
  const buffers = new Map(); // SourceBuffer → { id, type, init }
  const consumers = new Set();
  const backlog = []; // { entry, timestampOffset, bytes }
  let backlogBytes = 0;
  let nextId = 1;

  const isInit = (bytes) => {
    if (bytes.length < 8) return false;
    if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return true;
    const type = String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]);
    return type === "ftyp" || type === "moov";
  };

  // `to` names the consumer a replay of kept segments is for; segments as they come go to every consumer
  const send = (entry, timestampOffset, bytes, init, to) => {
    const copy = bytes.slice();
    window.postMessage(
      { source: "es-mse", id: entry.id, type: entry.type, init, timestampOffset, data: copy.buffer, to },
      "*",
      [copy.buffer],
    );
  };

  const keep = (entry, timestampOffset, bytes) => {
    backlog.push({ entry, timestampOffset, bytes: bytes.slice() });
    backlogBytes += bytes.length;
    while (backlogBytes > BACKLOG_BYTES && backlog.length > 1) backlogBytes -= backlog.shift().bytes.length;
  };

  for (const Source of [window.MediaSource, window.ManagedMediaSource].filter(Boolean)) {
    const addSourceBuffer = Source.prototype.addSourceBuffer;
    Source.prototype.addSourceBuffer = function (type) {
      const buffer = addSourceBuffer.call(this, type);
      if (AUDIO_CODECS.test(type)) buffers.set(buffer, { id: nextId++, type, init: null });
      return buffer;
    };
  }

  const appendBuffer = SourceBuffer.prototype.appendBuffer;
  SourceBuffer.prototype.appendBuffer = function (data) {
    const entry = buffers.get(this);
    if (entry) {
      try {
        const bytes =
          data instanceof ArrayBuffer
            ? new Uint8Array(data)
            : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        const init = isInit(bytes);
        const timestampOffset = this.timestampOffset || 0;
        if (init) entry.init = bytes.slice();
        else keep(entry, timestampOffset, bytes);
        if (consumers.size > 0) send(entry, timestampOffset, bytes, init);
      } catch {
        // The player's append must go on whatever happens here
      }
    }
    return appendBuffer.call(this, data);
  };

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.source !== "es-mse-control") return;
    const consumer = event.data.consumer ?? "default";
    if (!event.data.enabled) {
      consumers.delete(consumer);
      return;
    }
    if (consumers.has(consumer)) return;
    consumers.add(consumer);
    for (const entry of buffers.values()) if (entry.init) send(entry, 0, entry.init, true, consumer);
    for (const kept of backlog) send(kept.entry, kept.timestampOffset, kept.bytes, false, consumer);
  });
})();
