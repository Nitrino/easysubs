import { useSyncExternalStore } from "react";

// Pointer events the player under a portal must not get: a click on a menu option would also pause the video
const PLAYER_EVENTS = ["click", "dblclick", "mousedown", "mouseup", "pointerdown", "pointerup", "wheel"] as const;

const containers = new WeakMap<HTMLElement, HTMLElement>();

// Where menus, dialogs and toasts are portaled. In fullscreen only the fullscreen element is painted, so they go into
// a container inside it instead of the body. A fullscreen <video> can't hold them, and nothing of EasySubs shows over
// it anyway.
const portalTarget = (): HTMLElement => {
  const fullscreen = document.fullscreenElement;
  if (!(fullscreen instanceof HTMLElement) || fullscreen instanceof HTMLMediaElement) return document.body;

  let container = containers.get(fullscreen);
  if (!container?.isConnected || container.parentElement !== fullscreen) {
    container = document.createElement("div");
    container.className = "es-portal";
    PLAYER_EVENTS.forEach((type) => container.addEventListener(type, (event) => event.stopPropagation()));
    fullscreen.appendChild(container);
    containers.set(fullscreen, container);
  }
  return container;
};

const subscribe = (onChange: () => void) => {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
};

export const usePortalTarget = () => useSyncExternalStore(subscribe, portalTarget);
