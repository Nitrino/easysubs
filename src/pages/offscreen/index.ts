import { runAudioJob, setRuntimePath } from "@src/audio/models";
import type { TAudioJob, TAudioWorkerEvent } from "@src/audio/jobs";
import { createJobQueue } from "@src/audio/queue";
import { startTabCapture, stopTabCapture } from "./tabCapture";

// The offscreen document of the spoken-word experiment (Chrome): it runs the speech models for the content scripts,
// which reach it through a port named "es-audio", and captures a tab's sound when the popup asks for it. The
// background opens it (src/pages/background, "audioWorkerOpen").

setRuntimePath(chrome.runtime.getURL("assets/ort/"));

const ports = new Map<number, chrome.runtime.Port>();
type TPortJob = { id: number; port: chrome.runtime.Port } & TAudioJob;
const enqueue = createJobQueue<TPortJob>(async ({ port, ...message }) => {
  const report = (event: TAudioWorkerEvent) => port.postMessage(event);
  try {
    const result = await runAudioJob(message, report);
    port.postMessage({ id: message.id, result });
  } catch (error) {
    port.postMessage({ id: message.id, error: (error as Error).message });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== "es-audio") return;
  const tabId = port.sender?.tab?.id ?? -1;
  ports.set(tabId, port);
  port.onMessage.addListener((message: { id: number } & TAudioJob) => enqueue({ ...message, port }));
  port.onDisconnect.addListener(() => {
    if (ports.get(tabId) === port) ports.delete(tabId);
    stopTabCapture(tabId);
  });
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target !== "offscreen") return;
  if (message.type === "tabCaptureStart") {
    startTabCapture(message.tabId, message.streamId, (chunk) =>
      ports.get(message.tabId)?.postMessage({ type: "tabAudio", ...chunk }),
    )
      .then(() => sendResponse({ capturing: true }))
      .catch((error: Error) => sendResponse({ error: error.message }));
    return true;
  }
  if (message.type === "tabCaptureStop") {
    const stopped = stopTabCapture(message.tabId);
    ports.get(message.tabId)?.postMessage({ type: "tabCaptureEnded" });
    sendResponse({ stopped });
  }
  if (message.type === "tabCaptureStatus") {
    sendResponse({ connected: ports.has(message.tabId) });
  }
});
