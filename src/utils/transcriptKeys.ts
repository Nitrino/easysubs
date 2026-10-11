import { transcriptToggled } from "@src/models/transcript";

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

// Shift+T opens or closes the transcript sidebar on every service (T alone is YouTube's theater mode)
export const transcriptKeyHandler = (event: KeyboardEvent) => {
  if (event.code !== "KeyT" || !event.shiftKey) return;
  if (event.ctrlKey || event.altKey || event.metaKey || isTyping(event.target)) return;
  event.stopPropagation();
  if (event.type === "keydown" && !event.repeat) transcriptToggled();
};

const keyboardEvents = ["keydown", "keyup", "keypress"] as const;

export const addTranscriptKeyListeners = () => {
  keyboardEvents.forEach((eventType) => document.addEventListener(eventType, transcriptKeyHandler, true));
};
