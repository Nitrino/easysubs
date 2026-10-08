import type { TAudioWorker, TAudioWorkerEvent } from "@src/audio/jobs";

// The speech models of the spoken-word experiment run in a Web Worker here: the playground has no offscreen document.
// src/audio/worker.ts takes this worker from the window. The models load on the first job.
export function setupAudioWorker() {
  window.easysubsAudioWorker = (): TAudioWorker => {
    const worker = new Worker(new URL("./audioModels.worker.ts", import.meta.url), { type: "module" });
    const listeners: ((event: TAudioWorkerEvent) => void)[] = [];
    const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void }>();
    let nextId = 1;

    worker.onmessage = (event: MessageEvent) => {
      const message = event.data;
      if (typeof message.id === "number") {
        const request = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) request?.reject(new Error(message.error));
        else request?.resolve(message.result);
        return;
      }
      listeners.forEach((listener) => listener(message));
    };

    return {
      request(job) {
        const id = nextId++;
        worker.postMessage({ id, ...job });
        return new Promise((resolve, reject) =>
          pending.set(id, { resolve: resolve as (value: unknown) => void, reject }),
        ) as never;
      },
      onEvent(listener) {
        listeners.push(listener);
      },
      close() {
        worker.terminate();
      },
    };
  };
}
