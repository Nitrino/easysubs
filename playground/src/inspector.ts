import type { MessageLogEntry } from "./chromeShim";
import {
  FILE_TRACK_ID,
  VIDEO_SOURCES,
  getVideoSource,
  isVideoAvailable,
  openVideoFile,
  setFileTrack,
  switchVideoSource,
  type VideoSource,
} from "./player";

const MAX_LOG_ROWS = 50;

const inspector = document.querySelector<HTMLElement>(".pg-inspector");

function setupBackgroundSwitch() {
  const { backgroundMode } = window.easysubsPlayground;
  inspector.querySelectorAll<HTMLAnchorElement>("[data-background]").forEach((link) => {
    const url = new URL(location.href);
    url.searchParams.set("background", link.dataset.background);
    link.href = url.href;
    const isActive = link.dataset.background === backgroundMode;
    link.classList.toggle("pg-segmented__item--active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
  });
}

const videoSelect = inspector.querySelector<HTMLSelectElement>("#pg-video-source");
const mediaNote = inspector.querySelector<HTMLElement>(".pg-media-note");

function showMediaNote(content: (string | Node)[] | null) {
  mediaNote.hidden = !content;
  mediaNote.replaceChildren(...(content ?? []));
}

// Movies have to be credited wherever a screenshot with them is published
function showCredit(source: VideoSource) {
  if (!source.movie) return showMediaNote(null);
  const link = document.createElement("a");
  link.className = "pg-link";
  link.href = source.movie.creditUrl;
  link.target = "_blank";
  link.textContent = source.movie.credit;
  showMediaNote(["Credit next to published screenshots: ", link]);
}

function showMissing(source: VideoSource) {
  const command = document.createElement("code");
  command.textContent = "pnpm playground:movies";
  showMediaNote([`${source.title} isn't downloaded yet. Run `, command, ", then pick it again."]);
}

function renderVideoOptions() {
  const current = getVideoSource();
  const options = VIDEO_SOURCES.map((source) => new Option(source.title, source.id));
  if (current.id === FILE_TRACK_ID) options.push(new Option(current.title, FILE_TRACK_ID));
  videoSelect.replaceChildren(...options);
  videoSelect.value = current.id;
}

function setupVideoPicker() {
  renderVideoOptions();
  showCredit(getVideoSource());

  videoSelect.addEventListener("change", async () => {
    const source = VIDEO_SOURCES.find((item) => item.id === videoSelect.value);
    if (!source) return;
    if (!(await isVideoAvailable(source))) {
      videoSelect.value = getVideoSource().id;
      showMissing(source);
      return;
    }
    switchVideoSource(source);
    renderVideoOptions();
    showCredit(source);
  });

  window.addEventListener("easysubs-playground:missing-video", (event: CustomEvent<VideoSource>) => {
    renderVideoOptions();
    showMissing(event.detail);
  });
}

function setupFilePickers() {
  inspector.querySelector<HTMLInputElement>("#pg-video-file").addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    openVideoFile(file);
    renderVideoOptions();
    showMediaNote(null);
  });

  inspector.querySelector<HTMLInputElement>("#pg-subs-file").addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    setFileTrack(file.name, URL.createObjectURL(file));
    inspector.querySelector("#pg-subs-name").textContent = file.name;
  });
}

function setupResetSettings() {
  inspector.querySelector("#pg-reset-settings").addEventListener("click", async () => {
    await window.easysubsPlayground.clearStorage();
    location.reload();
  });
}

const formatJson = (value: unknown) => JSON.stringify(value, null, 2) ?? "undefined";

function renderMessage(entry: MessageLogEntry) {
  const row = document.createElement("details");
  row.className = "pg-log__row";
  row.dataset.id = String(entry.id);

  const summary = document.createElement("summary");
  const type = document.createElement("span");
  type.className = "pg-log__type";
  type.textContent = entry.request.type ?? "message";
  const text = document.createElement("span");
  text.className = "pg-log__text";
  text.textContent = String(entry.request.text ?? entry.request.word ?? entry.request.url ?? "");
  const status = document.createElement("span");
  const failed = (entry.response as { error?: unknown })?.error !== undefined;
  status.className = failed ? "pg-log__status pg-log__status--error" : "pg-log__status";
  status.textContent = entry.durationMs === undefined ? "…" : `${entry.durationMs} ms`;
  summary.append(type, text, status);

  const body = document.createElement("pre");
  body.textContent = `request: ${formatJson(entry.request)}\n\nresponse: ${formatJson(entry.response)}`;
  row.append(summary, body);
  return row;
}

function setupMessageLog() {
  const log = inspector.querySelector<HTMLElement>(".pg-log");
  window.addEventListener("easysubs:message", (event: CustomEvent<MessageLogEntry>) => {
    const row = renderMessage(event.detail);
    const existing = log.querySelector<HTMLDetailsElement>(`[data-id="${event.detail.id}"]`);
    if (existing) {
      row.open = existing.open;
      existing.replaceWith(row);
    } else {
      log.prepend(row);
      log.querySelectorAll(".pg-log__row").forEach((item, index) => index >= MAX_LOG_ROWS && item.remove());
    }
  });
  inspector.querySelector("#pg-clear-log").addEventListener("click", () => log.replaceChildren());
}

export function setupInspector() {
  setupBackgroundSwitch();
  setupVideoPicker();
  setupFilePickers();
  setupResetSettings();
  setupMessageLog();
}
