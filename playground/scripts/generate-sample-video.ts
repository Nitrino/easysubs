/**
 * Renders playground/public/media/sample.webm: a silent 90 s clip with a large timecode, so subtitle timing is easy
 * to check by eye. VP8/WebM plays in Playwright's Chromium, which ships without H.264.
 *
 * Usage: node playground/scripts/generate-sample-video.ts
 * Needs ffmpeg with libvpx: $FFMPEG, the one from `pnpm exec playwright install ffmpeg`, or ffmpeg on PATH.
 */
import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";

const DURATION_S = 90;
const FPS = 15;
const WIDTH = 640;
const HEIGHT = 360;
const FRAMES_PER_BATCH = 45;
const output = resolve(import.meta.dirname, "../public/media/sample.webm");

function findPlaywrightFfmpeg() {
  const cacheDir =
    process.env.PLAYWRIGHT_BROWSERS_PATH ??
    {
      darwin: join(homedir(), "Library/Caches/ms-playwright"),
      win32: join(process.env.LOCALAPPDATA ?? "", "ms-playwright"),
    }[process.platform] ??
    join(homedir(), ".cache/ms-playwright");
  if (!existsSync(cacheDir)) return null;

  for (const dir of readdirSync(cacheDir).filter((name) => name.startsWith("ffmpeg-"))) {
    for (const binary of ["ffmpeg-mac", "ffmpeg-linux", "ffmpeg-win64.exe"]) {
      if (existsSync(join(cacheDir, dir, binary))) return join(cacheDir, dir, binary);
    }
  }
  return null;
}

// Runs in the browser: draws one frame and returns it as a base64 JPEG
function renderFrames({ from, to, fps, width, height, duration }) {
  const canvas =
    (window as unknown as { frameCanvas?: HTMLCanvasElement }).frameCanvas ?? document.createElement("canvas");
  (window as unknown as { frameCanvas: HTMLCanvasElement }).frameCanvas = canvas;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const frames: string[] = [];

  for (let frame = from; frame < to; frame++) {
    const time = frame / fps;
    const hue = (time / duration) * 300;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `hsl(${hue}, 45%, 22%)`);
    gradient.addColorStop(1, `hsl(${hue + 40}, 45%, 10%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // A dot circling once per second makes playback and pauses obvious
    const angle = (time % 1) * Math.PI * 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.beginPath();
    ctx.arc(width / 2 + Math.cos(angle) * 110, 128 + Math.sin(angle) * 22, 6, 0, Math.PI * 2);
    ctx.fill();

    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toFixed(1).padStart(4, "0");
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "600 88px ui-monospace, Menlo, monospace";
    ctx.fillText(`${minutes}:${seconds}`, width / 2, 158);
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.font = "500 18px -apple-system, system-ui, sans-serif";
    ctx.fillText("EasySubs Playground", width / 2, 52);

    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fillRect(40, 200, width - 80, 4);
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(40, 200, ((width - 80) * time) / duration, 4);

    frames.push(canvas.toDataURL("image/jpeg", 0.9).split(",")[1]);
  }
  return frames;
}

const ffmpegPath = process.env.FFMPEG ?? findPlaywrightFfmpeg() ?? "ffmpeg";
// libvpx options mirror Playwright's own screencast encoder; -g keeps keyframes 2 s apart for fast seeking
const ffmpeg = spawn(
  ffmpegPath,
  ["-y", "-loglevel", "error", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", String(FPS), "-i", "pipe:0"]
    .concat(["-c:v", "libvpx", "-b:v", "100k", "-crf", "36", "-g", String(FPS * 2), "-deadline", "good"])
    .concat(["-cpu-used", "2", "-pix_fmt", "yuv420p", "-an", output]),
  { stdio: ["pipe", "inherit", "inherit"] },
);
const finished = new Promise<void>((resolveExit, reject) =>
  ffmpeg.on("exit", (code) => (code === 0 ? resolveExit() : reject(new Error(`ffmpeg exited with ${code}`)))),
);

const browser = await chromium.launch();
const page = await browser.newPage();
const totalFrames = DURATION_S * FPS;
for (let from = 0; from < totalFrames; from += FRAMES_PER_BATCH) {
  const to = Math.min(from + FRAMES_PER_BATCH, totalFrames);
  const frames = await page.evaluate(renderFrames, {
    from,
    to,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
    duration: DURATION_S,
  });
  for (const frame of frames) {
    if (!ffmpeg.stdin.write(Buffer.from(frame, "base64"))) {
      await new Promise((resolveDrain) => ffmpeg.stdin.once("drain", resolveDrain));
    }
  }
}
ffmpeg.stdin.end();
await browser.close();
await finished;
console.log(`Wrote ${output}`);
