import type { TAudioJob } from "./jobs";

// The models share one thread: jobs run one at a time, speech detection before the rest. It's cheap and comes every
// second, while an alignment or a Whisper window takes seconds.
export function createJobQueue<Job extends TAudioJob>(run: (job: Job) => Promise<void>) {
  const waiting: Job[] = [];
  let running = false;

  const next = async () => {
    if (running) return;
    const index = waiting.findIndex((job) => job.type === "vad");
    const [job] = waiting.splice(index >= 0 ? index : 0, 1);
    if (!job) return;
    running = true;
    try {
      await run(job);
    } finally {
      running = false;
      void next();
    }
  };

  return (job: Job) => {
    waiting.push(job);
    void next();
  };
}
