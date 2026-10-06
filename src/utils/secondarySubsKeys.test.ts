import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@src/models/init";
import { secondarySubsChanged } from "@src/models/settings";
import { $secondaryHidden, $secondaryRevealed } from "@src/models/secondarySubs";
import { addSecondarySubsKeyListeners, removeSecondarySubsKeyListeners } from "./secondarySubsKeys";

const press = (code: string, init: KeyboardEventInit = {}, type = "keydown", target: Element = document.body) => {
  const event = new KeyboardEvent(type, { code, bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
};

// Store watchers and events outside scopes: the handler calls the events directly, as in the extension
describe("second line shortcuts", () => {
  const pageListener = vi.fn();

  beforeEach(() => {
    secondarySubsChanged({ language: "es" });
    addSecondarySubsKeyListeners();
    document.addEventListener("keydown", pageListener);
  });

  afterEach(() => {
    secondarySubsChanged({ language: "es" });
    if ($secondaryHidden.getState()) press("KeyV");
    press("KeyR", {}, "keyup");
    removeSecondarySubsKeyListeners();
    document.removeEventListener("keydown", pageListener);
    secondarySubsChanged({ language: "off" });
  });

  it("hides and shows the second line with V", () => {
    press("KeyV");
    expect($secondaryHidden.getState()).toBe(true);

    press("KeyV", {}, "keyup");
    press("KeyV");
    expect($secondaryHidden.getState()).toBe(false);
  });

  it("toggles once while V is held", () => {
    press("KeyV");
    press("KeyV", { repeat: true });
    press("KeyV", { repeat: true });

    expect($secondaryHidden.getState()).toBe(true);
  });

  it("reveals the second line while R is held", () => {
    press("KeyR");
    press("KeyR", { repeat: true });
    expect($secondaryRevealed.getState()).toBe(true);

    press("KeyR", {}, "keyup");
    expect($secondaryRevealed.getState()).toBe(false);
  });

  it("stops revealing when the window loses focus", () => {
    press("KeyR");
    window.dispatchEvent(new Event("blur"));

    expect($secondaryRevealed.getState()).toBe(false);
  });

  it("keeps the keys from the player", () => {
    press("KeyV");
    press("KeyR");

    expect(pageListener).not.toHaveBeenCalled();
  });

  it("leaves the keys alone while the second line is off", () => {
    secondarySubsChanged({ language: "off" });
    press("KeyV");

    expect($secondaryHidden.getState()).toBe(false);
    expect(pageListener).toHaveBeenCalledOnce();
  });

  it("leaves typing and shortcuts with modifiers alone", () => {
    const input = document.body.appendChild(document.createElement("input"));

    press("KeyV", {}, "keydown", input);
    press("KeyV", { metaKey: true });
    press("KeyR", { ctrlKey: true });

    expect($secondaryHidden.getState()).toBe(false);
    expect($secondaryRevealed.getState()).toBe(false);
    expect(pageListener).toHaveBeenCalledTimes(3);
  });

  it("leaves other keys to the player", () => {
    press("KeyK");

    expect(pageListener).toHaveBeenCalledOnce();
  });
});
