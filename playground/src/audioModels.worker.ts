import { runAudioJob, setRuntimePath } from "@src/audio/models";
import type { TAudioJob, TAudioWorkerEvent } from "@src/audio/jobs";
import { createJobQueue } from "@src/audio/queue";

// The speech models off the page's thread, as the offscreen document keeps them off the content script's
setRuntimePath(`${self.location.origin}/ort/`);

const report = (status: TAudioWorkerEvent) => self.postMessage(status);
const enqueue = createJobQueue<{ id: number } & TAudioJob>(async (job) => {
  try {
    self.postMessage({ id: job.id, result: await runAudioJob(job, report) });
  } catch (error) {
    self.postMessage({ id: job.id, error: (error as Error).message });
  }
});
self.onmessage = (event: MessageEvent<{ id: number } & TAudioJob>) => enqueue(event.data);
