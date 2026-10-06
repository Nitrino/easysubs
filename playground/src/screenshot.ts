// Marketing screenshots of the player. The page is serialized as it is (DOM, styles and the current video frame) and
// the dev server renders that snapshot in headless Chromium at an exact size and pixel density, see the
// /__capture middleware in playground/vite.config.ts. PNGs are saved to playground/screenshots.

import { playerRoot, refreshSubtitles, video } from "./player";

type ShotSize = { id: string; label: string; width?: number; height?: number };
type ShotSettings = { size: string; frame: "window" | "bleed"; scale: 1 | 2; controls: boolean };

const SIZES: ShotSize[] = [
  { id: "player", label: "Player only" },
  { id: "store", label: "Web Store · 1280 × 800", width: 1280, height: 800 },
  { id: "marquee", label: "Marquee · 1400 × 560", width: 1400, height: 560 },
  { id: "website", label: "Website · 1920 × 1080", width: 1920, height: 1080 },
  { id: "social", label: "Social · 1200 × 630", width: 1200, height: 630 },
];
const SETTINGS_KEY = "easysubs-playground-screenshot";
const MAX_CAPTURES = 6;

const desktop = document.querySelector<HTMLElement>(".pg-desktop");
const stage = document.querySelector<HTMLElement>(".pg-stage");
const inspector = document.querySelector<HTMLElement>(".pg-inspector");
const sizeSelect = inspector.querySelector<HTMLSelectElement>("#pg-shot-size");
const controlsSwitch = inspector.querySelector<HTMLInputElement>("#pg-shot-controls");
const captureButton = inspector.querySelector<HTMLButtonElement>("#pg-shot-capture");
const status = inspector.querySelector<HTMLElement>(".pg-shot-status");
const captures = inspector.querySelector<HTMLElement>(".pg-captures");

let settings: ShotSettings = loadSettings();
let stageScale = 1;
let pointer: { clientX: number; clientY: number } | null = null;
let capturing = false;

function loadSettings(): ShotSettings {
  const defaults: ShotSettings = { size: "player", frame: "window", scale: 2, controls: true };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}") };
  } catch {
    return defaults;
  }
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Settings just aren't remembered
  }
}

const currentSize = () => SIZES.find((size) => size.id === settings.size) ?? SIZES[0];

// Fits the fixed-size canvas next to the Inspector. A transform keeps the layout inside it at the real size, so the
// extension measures the same player it will be rendered with.
function fitStage() {
  const { width, height } = currentSize();
  if (!width) return;
  const desktopStyle = getComputedStyle(desktop);
  const isStacked = desktopStyle.flexDirection === "column";
  const gap = parseFloat(desktopStyle.columnGap) || 0;
  const availableWidth =
    desktop.clientWidth -
    parseFloat(desktopStyle.paddingLeft) -
    parseFloat(desktopStyle.paddingRight) -
    (isStacked ? 0 : inspector.offsetWidth + gap);
  const availableHeight = window.innerHeight - parseFloat(desktopStyle.paddingTop) * 2;
  stageScale = Math.min(1, availableWidth / width, isStacked ? 1 : availableHeight / height);
  desktop.style.setProperty("--pg-shot-scale", String(stageScale));
}

function applySettings() {
  const { id, width, height } = currentSize();
  const hasCanvas = width !== undefined;
  desktop.classList.toggle("pg-desktop--shot", hasCanvas);
  desktop.classList.toggle("pg-desktop--bleed", hasCanvas && settings.frame === "bleed");
  desktop.style.setProperty("--pg-shot-width", String(width ?? 0));
  desktop.style.setProperty("--pg-shot-height", String(height ?? 0));
  playerRoot.classList.toggle("pg-player--bare", !settings.controls);
  if (!hasCanvas) stageScale = 1;
  fitStage();

  sizeSelect.value = id;
  controlsSwitch.checked = settings.controls;
  inspector.querySelectorAll<HTMLButtonElement>("[data-shot-frame]").forEach((button) => {
    const isActive = button.dataset.shotFrame === settings.frame;
    button.classList.toggle("pg-segmented__item--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = !hasCanvas;
  });
  inspector.querySelectorAll<HTMLButtonElement>("[data-shot-scale]").forEach((button) => {
    const isActive = Number(button.dataset.shotScale) === settings.scale;
    button.classList.toggle("pg-segmented__item--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateSettings(changes: Partial<ShotSettings>) {
  const affectsLayout = changes.size !== undefined || changes.frame !== undefined;
  settings = { ...settings, ...changes };
  saveSettings();
  applySettings();
  // The subtitles size follows the video width, which the extension only reads when it renders them
  if (affectsLayout) refreshSubtitles();
}

function captureVideoFrame() {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth || 1;
  canvas.height = video.videoHeight || 1;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

// Every stylesheet as text, including rules inserted through the CSSOM, which outerHTML would miss
function collectCss() {
  return Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules, (rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");
}

function serializePage(frozenPlayerSize: { width: number; height: number } | null) {
  const snapshot = document.documentElement.cloneNode(true) as HTMLElement;

  // Form state lives in properties, which cloning doesn't copy
  const liveFields = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select");
  snapshot.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select").forEach((field, index) => {
    const live = liveFields[index];
    if (live instanceof HTMLSelectElement) {
      field
        .querySelectorAll("option")
        .forEach((option, i) => option.toggleAttribute("selected", i === live.selectedIndex));
    } else if (live instanceof HTMLInputElement) {
      field.setAttribute("value", live.value);
      field.toggleAttribute("checked", live.checked);
    }
  });

  const frame = document.createElement("img");
  frame.className = video.className;
  frame.src = captureVideoFrame();
  snapshot.querySelector("video").replaceWith(frame);

  snapshot.querySelectorAll("script, style, link[rel='stylesheet']").forEach((element) => element.remove());
  const head = snapshot.querySelector("head");
  const base = document.createElement("base");
  base.href = `${location.origin}/`;
  const style = document.createElement("style");
  style.textContent = collectCss();
  head.prepend(base);
  head.append(style);

  snapshot.classList.add("pg-snapshot");
  if (frozenPlayerSize) {
    const player = snapshot.querySelector<HTMLElement>(".pg-player");
    player.style.width = `${frozenPlayerSize.width}px`;
    player.style.height = `${frozenPlayerSize.height}px`;
  }
  return `<!doctype html>\n${snapshot.outerHTML}`;
}

// Local time, e.g. 20261006-192435
const timestamp = () => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  return `${date}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

async function capture() {
  if (capturing) return;
  capturing = true;
  captureButton.disabled = true;
  status.textContent = "Capturing…";

  const size = currentSize();
  const target = size.width ? stage : playerRoot;
  const rect = target.getBoundingClientRect();
  const width = size.width ?? Math.round(rect.width);
  const height = size.height ?? Math.round(rect.height);
  // Replaying the pointer brings back :hover styles, such as the highlighted word under a translation
  const isPointerInside =
    pointer &&
    pointer.clientX >= rect.left &&
    pointer.clientX <= rect.right &&
    pointer.clientY >= rect.top &&
    pointer.clientY <= rect.bottom;

  try {
    const resp = await fetch("/__capture", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        html: serializePage(size.width ? null : { width, height }),
        width,
        height,
        scale: settings.scale,
        pointer: isPointerInside
          ? { x: (pointer.clientX - rect.left) / stageScale, y: (pointer.clientY - rect.top) / stageScale }
          : null,
        name: `easysubs-${size.id}-${width * settings.scale}x${height * settings.scale}-${timestamp()}`,
      }),
    });
    if (!resp.ok) throw new Error(await resp.text());
    const { file, url } = await resp.json();
    status.textContent = `Saved ${file}`;
    addCapture(url, `${width * settings.scale} × ${height * settings.scale}`);
  } catch (error) {
    status.textContent = `Capture failed: ${error instanceof Error ? error.message : error}`;
  } finally {
    capturing = false;
    captureButton.disabled = false;
  }
}

function addCapture(url: string, label: string) {
  const link = document.createElement("a");
  link.className = "pg-capture";
  link.href = url;
  link.target = "_blank";
  const image = document.createElement("img");
  image.src = url;
  image.alt = `Screenshot, ${label}`;
  const caption = document.createElement("span");
  caption.textContent = label;
  link.append(image, caption);
  captures.prepend(link);
  captures.querySelectorAll(".pg-capture").forEach((item, index) => index >= MAX_CAPTURES && item.remove());
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName));

export function setupScreenshots() {
  sizeSelect.replaceChildren(...SIZES.map((size) => new Option(size.label, size.id)));
  sizeSelect.addEventListener("change", () => updateSettings({ size: sizeSelect.value }));
  controlsSwitch.addEventListener("change", () => updateSettings({ controls: controlsSwitch.checked }));
  inspector.querySelectorAll<HTMLButtonElement>("[data-shot-frame]").forEach((button) => {
    button.addEventListener("click", () =>
      updateSettings({ frame: button.dataset.shotFrame as ShotSettings["frame"] }),
    );
  });
  inspector.querySelectorAll<HTMLButtonElement>("[data-shot-scale]").forEach((button) => {
    button.addEventListener("click", () => updateSettings({ scale: Number(button.dataset.shotScale) as 1 | 2 }));
  });
  captureButton.addEventListener("click", capture);

  // EasySubs closes its settings on any click outside of them; clicks in the Inspector shouldn't count
  inspector.addEventListener("click", (event) => event.stopPropagation());

  document.addEventListener("pointermove", (event) => (pointer = { clientX: event.clientX, clientY: event.clientY }));
  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyS" && event.altKey && !isTyping(event.target)) {
      event.preventDefault();
      capture();
    }
  });
  window.addEventListener("resize", fitStage);

  applySettings();
}
