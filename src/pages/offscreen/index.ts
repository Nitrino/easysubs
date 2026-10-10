import { runAudioJob, setRuntimePath } from "@src/audio/models";
import type { TAudioJob, TAudioWorkerEvent } from "@src/audio/jobs";
import { createJobQueue } from "@src/audio/queue";
import { startTabCapture, stopTabCapture } from "./tabCapture";
import { BERGAMOT_WORKER, createBergamotEngine, runBergamotRequest, type TBergamotEngine } from "@src/bergamot/engine";

// The offscreen document (Chrome): it runs the speech models of the spoken-word experiment for the content scripts,
// which reach it through a port named "es-audio", captures a tab's sound when the popup asks for it, and runs
// Bergamot's worker for the background (src/bergamot/client.ts). The background opens it
// (src/pages/background/offscreen.ts).

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

let bergamot: TBergamotEngine | null = null;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target !== "offscreen") return;
  if (message.type === "bergamot") {
    bergamot ??= createBergamotEngine(chrome.runtime.getURL(BERGAMOT_WORKER));
    runBergamotRequest(bergamot, message.request)
      .then((result) => sendResponse({ result }))
      .catch((error: Error) => sendResponse({ error: error.message }));
    return true;
  }
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
