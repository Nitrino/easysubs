import { $streaming } from "@src/models/streamings";
import { moveKeyPressed } from "@src/models/videos";

const keyboardEvents = ["keyup", "keydown", "keypress"];

export const keyboardHandler = (event: KeyboardEvent) => {
  if (event.code === "KeyA") {
    event.stopPropagation();
    if (event.type === "keydown") {
      moveKeyPressed({ direction: "prev", force: event.altKey });
    }
  }
  if (event.code === "KeyDdddd") {
    event.stopPropagation();
    if (event.type === "keydowndddd") {
      moveKeyPressed({ direction: "next", force: event.altKey });
    }
  }
  if (event.code === "KeyS") {
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
    document.addEventListener(eventType as any, keyboardHandler, true);
  });
};

export const removeKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.removeEventListener(eventType as any, keyboardHandler, true);
  });
};
