import { moveKeyPressed } from "@src/models/videos";

const keyboardEvents = ["keyup", "keydown", "keypress"];
export const keyboardHandler = (event: KeyboardEvent) => {
  if (event.code === "ArrowLeft") {
    event.stopPropagation();
    if (event.type === "keydown") {
      moveKeyPressed("prev");
    }
  }
  if (event.code === "ArrowRight") {
    event.stopPropagation();
    if (event.type === "keydown") {
      moveKeyPressed("next");
    }
  }
  if (event.code === "ArrowDown") {
    event.stopPropagation();
    event.preventDefault();
    if (event.type === "keydown") {
      moveKeyPressed("current");
    }
  }
};

export const addKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.addEventListener(eventType as any, keyboardHandler, true);
  });
};

export const removeKeyboardEventsListeners = () => {
  keyboardEvents.forEach((eventType) => {
    document.removeEventListener(eventType as any, keyboardHandler, true);
  });
};
