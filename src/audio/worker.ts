import type { TAudioJob, TAudioJobResult, TAudioWorker, TAudioWorkerEvent } from "./jobs";

// The content script's way to the speech models: a port to the offscreen document the background opens
// (src/pages/offscreen). The playground puts a worker of its own on the window, running the models in the page.

declare global {
  interface Window {
    easysubsAudioWorker?: () => TAudioWorker;
  }
}

type TReply = { id: number; result?: unknown; error?: string };

export async function connectAudioWorker(): Promise<TAudioWorker> {
  if (window.easysubsAudioWorker) return window.easysubsAudioWorker();

  const answer = await chrome.runtime.sendMessage({ type: "audioWorkerOpen" });
  if (answer?.error) throw new Error(answer.error);
  const port = chrome.runtime.connect({ name: "es-audio" });

  let nextId = 1;
  const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
  const listeners: ((event: TAudioWorkerEvent) => void)[] = [];

  port.onMessage.addListener((message: TReply | TAudioWorkerEvent) => {
    if ("id" in message) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) request?.reject(new Error(message.error));
      else request?.resolve(message.result);
      return;
    }
    listeners.forEach((listener) => listener(message));
  });
  port.onDisconnect.addListener(() => {
    pending.forEach((request) => request.reject(new Error("The audio worker closed")));
    pending.clear();
  });

  return {
    request<Type extends TAudioJob["type"]>(job: Extract<TAudioJob, { type: Type }>) {
      const id = nextId++;
      port.postMessage({ id, ...job });
      return new Promise<TAudioJobResult[Type]>((resolve, reject) =>
        pending.set(id, { resolve: resolve as (value: unknown) => void, reject }),
      );
    },
    onEvent(listener) {
      listeners.push(listener);
    },
    close() {
      port.disconnect();
    },
  };
}
