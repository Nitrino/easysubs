import { $streaming } from "@src/models/streamings";
import { isSubtitleFileName, openSubtitleFile } from "./subtitleFiles";

// Dropping a subtitle file on the player loads it as the main line, or as the second line with Shift held. A drop
// target over the player says which while the file is dragged. Listens on the document in the capture phase, so the
// player's own drop handling doesn't get the file.

let overlay: HTMLDivElement | null = null;

const draggingFiles = (event: DragEvent) => Array.from(event.dataTransfer?.types ?? []).includes("Files");

function playerContainer(): HTMLElement | null {
  try {
    return $streaming.getState().getSubsContainer();
  } catch {
    return null;
  }
}

const isOverPlayer = (event: DragEvent, container: HTMLElement) => {
  const rect = container.getBoundingClientRect();
  return (
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom
  );
};

function showOverlay(container: HTMLElement, second: boolean) {
  if (!overlay || !overlay.isConnected) {
    overlay = document.createElement("div");
    overlay.className = "es-drop";
    overlay.innerHTML =
      '<div class="es-drop__zone"><span class="es-drop__title"></span><span class="es-drop__hint"></span></div>';
    container.appendChild(overlay);
  }
  overlay.querySelector(".es-drop__title")!.textContent = second
    ? "Drop to load as the second line"
    : "Drop to load as the main line";
  overlay.querySelector(".es-drop__hint")!.textContent = second
    ? "Release Shift to load it as the main line"
    : "Hold Shift to load it as the second line";
}

function hideOverlay() {
  overlay?.remove();
  overlay = null;
}

const handleDragOver = (event: DragEvent) => {
  const container = playerContainer();
  if (!draggingFiles(event) || !container || !isOverPlayer(event, container)) {
    hideOverlay();
    return;
  }
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
  showOverlay(container, event.shiftKey);
};

const handleDrop = (event: DragEvent) => {
  const container = playerContainer();
  const over = container && isOverPlayer(event, container);
  hideOverlay();
  const file = event.dataTransfer?.files?.[0];
  if (!over || !file || !isSubtitleFileName(file.name)) return;
  event.preventDefault();
  event.stopPropagation();
  openSubtitleFile(file, event.shiftKey ? "second" : "main").catch((error) => console.error(error));
};

// The drag left the window
const handleDragLeave = (event: DragEvent) => {
  if (event.relatedTarget === null) hideOverlay();
};

export function addSubtitleDropListeners() {
  document.addEventListener("dragover", handleDragOver, true);
  document.addEventListener("drop", handleDrop, true);
  document.addEventListener("dragleave", handleDragLeave, true);
}

export function removeSubtitleDropListeners() {
  document.removeEventListener("dragover", handleDragOver, true);
  document.removeEventListener("drop", handleDrop, true);
  document.removeEventListener("dragleave", handleDragLeave, true);
  hideOverlay();
}
