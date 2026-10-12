import { $streaming } from "@src/models/streamings";
import { $rawSubs, subsDelayKeyPressed } from "@src/models/subs";
import { $enabled } from "@src/models/settings";

const keyboardEvents = ["keydown", "keyup", "keypress"] as const;

export const SUBS_DELAY_KEY_STEP = 0.25;
export const SUBS_DELAY_KEY_LARGE_STEP = 1;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

// Shortcuts of the subtitles delay, the keys VLC uses: G shows the subtitles earlier, H later, by a quarter of a
// second, or by a second with Shift. Holding the key keeps moving them. They only act while there are subtitles to
// move, and not on services that show their phrases live, so the player keeps these keys otherwise.
export const subsDelayKeyHandler = (event: KeyboardEvent) => {
  if (event.code !== "KeyG" && event.code !== "KeyH") return;
  if (event.ctrlKey || event.altKey || event.metaKey || isTyping(event.target)) return;
  if (!$enabled.getState() || $streaming.getState().isOnFlight() || $rawSubs.getState().length === 0) return;

  event.stopPropagation();
  if (event.type !== "keydown") return;
  const step = event.shiftKey ? SUBS_DELAY_KEY_LARGE_STEP : SUBS_DELAY_KEY_STEP;
  subsDelayKeyPressed(event.code === "KeyG" ? -step : step);
};

export const addSubsDelayKeyListeners = () => {
  keyboardEvents.forEach((eventType) => document.addEventListener(eventType, subsDelayKeyHandler, true));
};

export const removeSubsDelayKeyListeners = () => {
  keyboardEvents.forEach((eventType) => document.removeEventListener(eventType, subsDelayKeyHandler, true));
};
