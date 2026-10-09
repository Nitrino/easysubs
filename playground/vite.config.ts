import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { mkdir, readFile, writeFile } from "fs/promises";
import type { IncomingMessage } from "http";
import type { Browser } from "@playwright/test";
import addHmr from "../utils/plugins/add-hmr.ts";
import manifest from "../manifest.js";
import { ONNX_RUNTIME_FILES, onnxRuntimeDir } from "../utils/plugins/copy-onnx-runtime.ts";
import { BERGAMOT_FILES, bergamotDir } from "../utils/plugins/copy-bergamot.ts";

const rootDir = resolve(import.meta.dirname, "..");
const srcDir = resolve(rootDir, "src");
const screenshotsDir = resolve(import.meta.dirname, "screenshots");

// Services the background reaches without host_permissions, because they answer with CORS headers (Wiktionary's
// pronunciations, src/utils/tts/wiktionary.ts; the Stremio mirror's file host, src/subsSources/stremio.ts)
const CORS_ORIGINS = ["https://en.wiktionary.org", "https://upload.wikimedia.org", "https://subs5.strem.io"];

// Dev server for the playground page: it runs the extension's content and background code straight from
// src/, so every change is picked up by HMR without building or reloading the extension.
export default defineConfig({
  root: import.meta.dirname,
  // The extension's .env (VITE_OPENSUBTITLES_API_KEY), not one of the playground's own
  envDir: rootDir,
  resolve: {
    alias: {
      "@root": rootDir,
      "@src": srcDir,
      "@assets": resolve(srcDir, "assets"),
      "@pages": resolve(srcDir, "pages"),
      // Registers content scripts for user-granted hosts; there is no extension runtime in the playground
      "webext-dynamic-content-scripts": resolve(import.meta.dirname, "src/noop.ts"),
      // vot.js imports it outside a window (src/utils/yandexWordTimes.ts)
      "node:crypto": resolve(srcDir, "utils/webCrypto.ts"),
    },
  },
  css: {
    postcss: rootDir,
  },
  plugins: [
    react(),
    addHmr({ background: false, view: false }),
    extensionHostsProxy(),
    extensionFiles(),
    screenshotCapture(),
  ],
  server: {
    port: 5180,
    strictPort: true,
    fs: { allow: [rootDir] },
    watch: { ignored: [screenshotsDir] },
  },
});

// Hop-by-hop and browser-only headers that must not reach the upstream service
const SKIPPED_REQUEST_HEADERS = new Set([
  "host",
  "origin",
  "referer",
  "cookie",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
]);

/**
 * The extension's background script calls translation and learning services cross-origin, which only works
 * thanks to the manifest's host_permissions. In the playground the background code runs inside the page, so its
 * requests are routed through `/__proxy?url=...`. Only the hosts from host_permissions and CORS_ORIGINS are allowed.
 */
function extensionHostsProxy(): Plugin {
  const allowedOrigins = new Set([
    ...manifest.host_permissions.map((pattern) => new URL(pattern.replace("*", "")).origin),
    ...CORS_ORIGINS,
  ]);

  return {
    name: "easysubs-playground-proxy",
    configureServer(server) {
      server.middlewares.use("/__proxy", async (req, res) => {
        const target = new URL(req.url ?? "", "http://localhost").searchParams.get("url");
        const targetUrl = target ? URL.parse(target) : null;
        if (!targetUrl || !allowedOrigins.has(targetUrl.origin)) {
          res.statusCode = 403;
          res.end(`Host is not in the manifest host_permissions: ${target}`);
          return;
        }

        const headers = new Headers();
        for (const [name, value] of Object.entries(req.headers)) {
          if (SKIPPED_REQUEST_HEADERS.has(name) || name.startsWith("sec-") || value === undefined) continue;
          headers.set(name, Array.isArray(value) ? value.join(", ") : value);
        }

        try {
          const hasBody = req.method !== "GET" && req.method !== "HEAD";
          const upstream = await fetch(targetUrl, {
            method: req.method,
            headers,
            body: hasBody ? await readBody(req) : undefined,
          });
          res.statusCode = upstream.status;
          const contentType = upstream.headers.get("content-type");
          if (contentType) res.setHeader("content-type", contentType);
          res.end(Buffer.from(await upstream.arrayBuffer()));
        } catch (error) {
          res.statusCode = 502;
          res.end(`Proxy request to ${targetUrl.href} failed: ${error}`);
        }
      });
    },
  };
}

/**
 * The extension's own files the live background fetches with chrome.runtime.getURL(): the expression lists in
 * public/expressions and Bergamot's engine in assets/bergamot. The playground's public dir is its own. Also what the
 * extension downloads from GitHub releases: the Wiktionary dictionaries `pnpm dictionaries` built into dictionaries/
 * and the models `pnpm bergamot-models` mirrored into bergamot-models/.
 */
function extensionFiles(): Plugin {
  const expressionsDir = resolve(rootDir, "public/expressions");
  return {
    name: "easysubs-playground-extension-files",
    configureServer(server) {
      server.middlewares.use("/expressions", async (req, res) => {
        const name = (req.url ?? "").replace(/^\//, "").split("?")[0];
        if (!/^[a-z]{2}\.json$/.test(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        try {
          res.setHeader("content-type", "application/json");
          res.end(await readFile(resolve(expressionsDir, name)));
        } catch {
          res.statusCode = 404;
          res.end();
        }
      });
      server.middlewares.use("/assets/bergamot", async (req, res) => {
        const name = (req.url ?? "").replace(/^\//, "").split("?")[0];
        if (!BERGAMOT_FILES.includes(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader("content-type", name.endsWith(".wasm") ? "application/wasm" : "text/javascript");
        res.end(await readFile(resolve(bergamotDir(), name)));
      });
      server.middlewares.use("/dictionaries", async (req, res) => {
        const name = (req.url ?? "").replace(/^\//, "").split("?")[0];
        if (!/^[a-z]{2}-[a-z]{2}\.json\.gz$/.test(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        try {
          const data = await readFile(resolve(rootDir, "dictionaries", name));
          res.setHeader("content-type", "application/gzip");
          res.setHeader("content-length", data.length);
          res.end(data);
        } catch {
          res.statusCode = 404;
          res.end(`No ${name}: build it with pnpm dictionaries`);
        }
      });
      server.middlewares.use("/bergamot-models", async (req, res) => {
        const name = (req.url ?? "").replace(/^\//, "").split("?")[0];
        if (!/^[\w.-]+$/.test(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        try {
          const data = await readFile(resolve(rootDir, "bergamot-models", name));
          res.setHeader("content-type", name.endsWith(".json") ? "application/json" : "application/octet-stream");
          res.setHeader("content-length", data.length);
          res.end(data);
        } catch {
          res.statusCode = 404;
          res.end(`No ${name}: mirror the models with pnpm bergamot-models`);
        }
      });
      // ONNX Runtime for the speech models the playground runs in the page (playground/src/audioWorker.ts), from
      // where the extension has them in assets/ort
      server.middlewares.use("/ort", async (req, res) => {
        const name = (req.url ?? "").replace(/^\//, "").split("?")[0];
        if (!ONNX_RUNTIME_FILES.includes(name)) {
          res.statusCode = 404;
          res.end();
          return;
        }
        res.setHeader("content-type", name.endsWith(".wasm") ? "application/wasm" : "text/javascript");
        res.end(await readFile(resolve(onnxRuntimeDir(), name)));
      });
    },
  };
}

type CaptureRequest = {
  html: string;
  width: number;
  height: number;
  scale: number;
  pointer: { x: number; y: number } | null;
  name: string;
};

/**
 * `POST /__capture` renders a page snapshot from the playground (see playground/src/screenshot.ts) in headless
 * Chromium at an exact size and pixel density, and saves the PNG to playground/screenshots.
 */
function screenshotCapture(): Plugin {
  let browser: Promise<Browser> | null = null;

  return {
    name: "easysubs-playground-capture",
    configureServer(server) {
      server.httpServer?.once("close", () => browser?.then((instance) => instance.close()));

      server.middlewares.use("/__capture", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end();
          return;
        }

        const shot: CaptureRequest = JSON.parse(new TextDecoder().decode(await readBody(req)));
        const isValidSize = [shot.width, shot.height].every(
          (side) => Number.isInteger(side) && side > 0 && side <= 4096,
        );
        if (!isValidSize || ![1, 2].includes(shot.scale) || !/^[\w-]+$/.test(shot.name)) {
          res.statusCode = 400;
          res.end("Invalid screenshot size, scale or name");
          return;
        }

        try {
          // Launched on the first capture and kept for the next ones; a failed launch is retried next time
          browser ??= import("@playwright/test")
            .then(({ chromium }) => chromium.launch())
            .catch((error) => {
              browser = null;
              throw error;
            });
          const page = await (
            await browser
          ).newPage({
            viewport: { width: shot.width, height: shot.height },
            deviceScaleFactor: shot.scale,
          });
          try {
            await page.setContent(shot.html, { waitUntil: "load" });
            if (shot.pointer) await page.mouse.move(shot.pointer.x, shot.pointer.y);
            // Everything around the player, including its shadow, stays transparent
            const png = await page.screenshot({ animations: "disabled", omitBackground: true });
            await mkdir(screenshotsDir, { recursive: true });
            await writeFile(resolve(screenshotsDir, `${shot.name}.png`), png);
          } finally {
            await page.close();
          }
          res.setHeader("content-type", "application/json");
          res.end(
            JSON.stringify({ file: `playground/screenshots/${shot.name}.png`, url: `/screenshots/${shot.name}.png` }),
          );
        } catch (error) {
          res.statusCode = 500;
          res.end(`${error instanceof Error ? error.message : error}`);
        }
      });
    },
  };
}

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk);
  return new Uint8Array(Buffer.concat(chunks));
}
