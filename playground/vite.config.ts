import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { mkdir, writeFile } from "fs/promises";
import type { IncomingMessage } from "http";
import type { Browser } from "@playwright/test";
import addHmr from "../utils/plugins/add-hmr.ts";
import manifest from "../manifest.js";

const rootDir = resolve(import.meta.dirname, "..");
const srcDir = resolve(rootDir, "src");
const screenshotsDir = resolve(import.meta.dirname, "screenshots");

// Dev server for the playground page: it runs the extension's content and background code straight from
// src/, so every change is picked up by HMR without building or reloading the extension.
export default defineConfig({
  root: import.meta.dirname,
  resolve: {
    alias: {
      "@root": rootDir,
      "@src": srcDir,
      "@assets": resolve(srcDir, "assets"),
      "@pages": resolve(srcDir, "pages"),
      // Registers content scripts for user-granted hosts; there is no extension runtime in the playground
      "webext-dynamic-content-scripts": resolve(import.meta.dirname, "src/noop.ts"),
    },
  },
  css: {
    postcss: rootDir,
  },
  plugins: [react(), addHmr({ background: false, view: false }), extensionHostsProxy(), screenshotCapture()],
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
 * requests are routed through `/__proxy?url=...`. Only the hosts from host_permissions are allowed.
 */
function extensionHostsProxy(): Plugin {
  const allowedOrigins = new Set(manifest.host_permissions.map((pattern) => new URL(pattern.replace("*", "")).origin));

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
