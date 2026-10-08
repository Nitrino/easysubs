// Runs in the page before its player (a MAIN-world content script at document_start, see manifest.js). Players stream
// through Media Source Extensions: they append the audio they downloaded, often a minute ahead of the playhead. While
// the spoken-word experiment listens ahead (src/audio/readAhead.ts), every audio segment is copied to the content
// script, which decodes it to find the speech before it plays. Initialization segments are kept to send them first.
(() => {
  if (window.__esMseTap || typeof SourceBuffer === "undefined") return;
  window.__esMseTap = true;

  const AUDIO_CODECS = /mp4a|opus|vorbis|ac-3|ec-3|flac|audio\//i;
  const buffers = new Map(); // SourceBuffer → { id, type, init }
  let nextId = 1;
  let enabled = false;

  const isInit = (bytes) => {
    if (bytes.length < 8) return false;
    if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return true;
    const type = String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]);
    return type === "ftyp" || type === "moov";
  };

  const send = (entry, buffer, bytes, init) => {
    const copy = bytes.slice();
    window.postMessage(
      {
        source: "es-mse",
        id: entry.id,
        type: entry.type,
        init,
        timestampOffset: buffer.timestampOffset || 0,
        data: copy.buffer,
      },
      "*",
      [copy.buffer],
    );
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
        if (init) entry.init = bytes.slice();
        if (enabled) send(entry, this, bytes, init);
      } catch {
        // The player's append must go on whatever happens here
      }
    }
    return appendBuffer.call(this, data);
  };

  window.addEventListener("message", (event) => {
    if (event.source !== window || event.data?.source !== "es-mse-control") return;
    enabled = Boolean(event.data.enabled);
    if (!enabled) return;
    for (const [buffer, entry] of buffers) if (entry.init) send(entry, buffer, entry.init, true);
  });
})();
