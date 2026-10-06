import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import "@src/models/init";
import { fetchCurrentStreamingFx } from "@src/models/streamings";
import { moveKeyPressed } from "@src/models/videos";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "./keyboardHandler";
import { createService } from "@root/test/service";

const press = (code: string, init: KeyboardEventInit = {}, type = "keydown") => {
  const event = new KeyboardEvent(type, { code, bubbles: true, cancelable: true, ...init });
  document.body.dispatchEvent(event);
  return event;
};

describe("keyboard navigation by subtitles", () => {
  const moves = vi.fn();
  const pageListener = vi.fn();

  beforeAll(async () => {
    moveKeyPressed.watch(moves);
    fetchCurrentStreamingFx.use(() => createService());
    await fetchCurrentStreamingFx();
  });

  afterEach(() => {
    removeKeyboardEventsListeners();
    document.removeEventListener("keydown", pageListener);
  });

  it("moves by subtitles with the arrows", () => {
    addKeyboardEventsListeners();

    press("ArrowRight");
    press("ArrowLeft");
    press("ArrowDown");

    expect(moves.mock.calls.map(([move]) => move)).toEqual([
      { direction: "next", force: false },
      { direction: "prev", force: false },
      { direction: "current", force: false },
    ]);
  });

  it("forces the move with Alt", () => {
    addKeyboardEventsListeners();

    press("ArrowRight", { altKey: true });
    press("ArrowLeft", { altKey: true });

    expect(moves.mock.calls.map(([move]) => move)).toEqual([
      { direction: "next", force: true },
      { direction: "prev", force: true },
    ]);
  });

  it("keeps the arrows from the page's own player", () => {
    document.addEventListener("keydown", pageListener);
    addKeyboardEventsListeners();

    press("ArrowRight");
    const arrowDown = press("ArrowDown");

    expect(pageListener).not.toHaveBeenCalled();
    expect(arrowDown.defaultPrevented).toBe(true);
  });

  it("moves once per key press", () => {
    addKeyboardEventsListeners();

    press("ArrowRight", {}, "keydown");
    press("ArrowRight", {}, "keypress");
    press("ArrowRight", {}, "keyup");

    expect(moves).toHaveBeenCalledOnce();
  });

  it("leaves other keys to the page", () => {
    document.addEventListener("keydown", pageListener);
    addKeyboardEventsListeners();

    press("Space");

    expect(moves).not.toHaveBeenCalled();
    expect(pageListener).toHaveBeenCalledOnce();
  });

  it("stops listening when removed", () => {
    addKeyboardEventsListeners();
    removeKeyboardEventsListeners();

    press("ArrowRight");

    expect(moves).not.toHaveBeenCalled();
  });

  it("doesn't listen on services that show their own subtitles", async () => {
    fetchCurrentStreamingFx.use(() => createService({ isOnFlight: () => true }));
    await fetchCurrentStreamingFx();

    addKeyboardEventsListeners();
    press("ArrowRight");

    expect(moves).not.toHaveBeenCalled();
  });
});
