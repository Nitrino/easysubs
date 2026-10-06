/**
 * Downloads the open movies from playground/src/movies.ts with their subtitles into playground/public/movies, where
 * the playground's video menu finds them. Files that are already there are skipped.
 *
 * Usage: pnpm playground:movies
 */
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { MOVIES, movieSubtitlesPath, movieVideoPath } from "../src/movies.ts";

const publicDir = resolve(import.meta.dirname, "../public");
// Wikimedia asks clients to identify themselves
const USER_AGENT = "easysubs-playground/1.0 (https://github.com/Nitrino/easysubs)";

async function download(url: string, path: string) {
  const target = resolve(publicDir, path);
  if (existsSync(target)) {
    console.log(`  ${path} is already there`);
    return;
  }

  const resp = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!resp.ok || !resp.body) throw new Error(`${url} answered ${resp.status}`);

  const total = Number(resp.headers.get("content-length")) || 0;
  let received = 0;
  let lastReport = 0;
  const reportProgress = async function* (chunks: AsyncIterable<Buffer>) {
    for await (const chunk of chunks) {
      received += chunk.length;
      if (total && process.stdout.isTTY && Date.now() - lastReport > 500) {
        lastReport = Date.now();
        process.stdout.write(`\r  ${path}: ${Math.round((received / total) * 100)}%`);
      }
      yield chunk;
    }
  };

  // A partial file must not look like a finished download on the next run
  await mkdir(dirname(target), { recursive: true });
  await pipeline(Readable.fromWeb(resp.body), reportProgress, createWriteStream(`${target}.part`));
  await rename(`${target}.part`, target);
  if (process.stdout.isTTY) process.stdout.write("\r");
  console.log(`  ${path}: ${(received / 1024 / 1024).toFixed(1)} MB`);
}

for (const movie of MOVIES) {
  console.log(`${movie.title} (${movie.credit})`);
  for (const track of movie.subtitles) await download(track.source, movieSubtitlesPath(movie, track.id));
  await download(movie.videoSource, movieVideoPath(movie));
}
