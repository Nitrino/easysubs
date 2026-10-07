import { fileOpened } from "@src/models/foundSubs";
import type { TFoundRole } from "@src/models/types";
import { toSubtitleText } from "@src/subsSources/files";

// Subtitle files the user opens from the settings or drops on the player: SRT, WebVTT, or ASS converted to SRT, in
// UTF-8 or an old code page

export const SUBTITLE_FILE_ACCEPT = ".srt,.vtt,.ass,.ssa";
export const isSubtitleFileName = (name: string) => /\.(srt|vtt|ass|ssa)$/i.test(name);

export async function readSubtitleFile(file: File): Promise<string> {
  return toSubtitleText(new Uint8Array(await file.arrayBuffer()), { name: file.name, language: "" });
}

export async function openSubtitleFile(file: File, role: TFoundRole) {
  fileOpened({ name: file.name, text: await readSubtitleFile(file), role });
}

// The system file picker, for a menu option that has no input of its own
export function pickSubtitleFile(role: TFoundRole) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = SUBTITLE_FILE_ACCEPT;
  input.className = "es-input";
  // Its click mustn't reach the document, where it would close the settings panel as a click outside it
  input.addEventListener("click", (event) => event.stopPropagation());
  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (file) openSubtitleFile(file, role).catch((error) => console.error(error));
    input.remove();
  });
  // In the page, so tests and browsers that want a connected input find it
  document.body.appendChild(input);
  input.click();
}
