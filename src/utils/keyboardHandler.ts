import { $streaming } from "@src/models/streamings";
import { $enabled, $moveBySubsEnabled } from "@src/models/settings";
import { moveKeyPressed } from "@src/models/videos";

const keyboardEvents = ["keyup", "keydown", "keypress"] as const;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export const keyboardHandler = (event: KeyboardEvent) => {
  // The search sheet's fields; with EasySubs or moving by subtitles off the player keeps its arrows
  if (isTyping(event.target) || !$enabled.getState() || !$moveBySubsEnabled.getState()) return;
  if ($streaming.getState().isOnFlight()) return;
  if (event.code === "ArrowLeft") {
    event.stopPropagation();
    if (event.type === "keydown") {
      moveKeyPressed({ direction: "prev", force: event.altKey });
    }
  }
  if (event.code === "ArrowRight") {
    event.stopPropagation();
    if (event.type === "keydown") {
      moveKeyPressed({ direction: "next", force: event.altKey });
    }
  }
  if (event.code === "ArrowDown") {
    event.stopPropagation();
    event.preventDefault();
    if (event.type === "keydown") {
      moveKeyPressed({ direction: "current", force: false });
    }
  }
};

export const addKeyboardEventsListeners = () => {
  if ($streaming.getState().isOnFlight()) {
    return;
  }
  keyboardEvents.forEach((eventType) => {
    document.addEventListener(eventType, keyboardHandler, true);
  });
};

export const removeKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.removeEventListener(eventType, keyboardHandler, true);
  });
};
