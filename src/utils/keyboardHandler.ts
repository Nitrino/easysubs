import { $streaming } from "@src/models/streamings";
import { moveKeyPressed } from "@src/models/videos";

const keyboardEvents = ["keyup", "keydown", "keypress"] as const;

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export const keyboardHandler = (event: KeyboardEvent) => {
  // The search sheet's fields
  if (isTyping(event.target)) return;
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
