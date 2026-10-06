import { $secondarySubs } from "@src/models/settings";
import { secondaryLineToggled, secondaryRevealHeld } from "@src/models/secondarySubs";

const keyboardEvents = ["keydown", "keyup", "keypress"] as const;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

// Shortcuts of the second subtitle line: V shows or hides it for the current video, holding R reveals it while it's
// blurred until hover or pause. Unlike the arrows of keyboardHandler they work on every service, and only once the
// second line is turned on, so the player keeps these keys otherwise.
export const secondarySubsKeyHandler = (event: KeyboardEvent) => {
  if (event.code !== "KeyV" && event.code !== "KeyR") return;
  if (event.ctrlKey || event.altKey || event.metaKey || isTyping(event.target)) return;
  if ($secondarySubs.getState().language === "off") return;

  event.stopPropagation();
  if (event.code === "KeyV" && event.type === "keydown" && !event.repeat) secondaryLineToggled();
  if (event.code === "KeyR" && event.type !== "keypress" && !event.repeat) {
    secondaryRevealHeld(event.type === "keydown");
  }
};

const releaseReveal = () => secondaryRevealHeld(false);

export const addSecondarySubsKeyListeners = () => {
  keyboardEvents.forEach((eventType) => document.addEventListener(eventType, secondarySubsKeyHandler, true));
  // The key-up never comes when the window loses focus while R is held
  window.addEventListener("blur", releaseReveal);
};

export const removeSecondarySubsKeyListeners = () => {
  keyboardEvents.forEach((eventType) => document.removeEventListener(eventType, secondarySubsKeyHandler, true));
  window.removeEventListener("blur", releaseReveal);
};
