import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import "@src/models/init";
import { fetchCurrentStreamingFx } from "@src/models/streamings";
import { rawSubsAdded, resetSubs, subsDelayKeyPressed } from "@src/models/subs";
import { addSubsDelayKeyListeners, removeSubsDelayKeyListeners } from "./subsDelayKeys";
import { createService } from "@root/test/service";
import { captions } from "@root/test/fixtures";

const press = (code: string, init: KeyboardEventInit = {}, type = "keydown", target: Element = document.body) => {
  const event = new KeyboardEvent(type, { code, bubbles: true, cancelable: true, ...init });
  target.dispatchEvent(event);
  return event;
};

describe("subtitles delay shortcuts", () => {
  const steps = vi.fn();
  const pageListener = vi.fn();

  beforeAll(async () => {
    subsDelayKeyPressed.watch(steps);
    fetchCurrentStreamingFx.use(() => createService());
    await fetchCurrentStreamingFx();
  });

  beforeEach(() => {
    rawSubsAdded(captions([1000, 2000, "Are you ready?"]));
    addSubsDelayKeyListeners();
  });

  afterEach(() => {
    removeSubsDelayKeyListeners();
    document.removeEventListener("keydown", pageListener);
    resetSubs("");
    steps.mockClear();
    pageListener.mockClear();
  });

  it("shows the subtitles earlier with G and later with H", () => {
    press("KeyG");
    press("KeyH");

    expect(steps.mock.calls.map(([step]) => step)).toEqual([-0.25, 0.25]);
  });

  it("moves them by a second with Shift", () => {
    press("KeyG", { shiftKey: true });
    press("KeyH", { shiftKey: true });

    expect(steps.mock.calls.map(([step]) => step)).toEqual([-1, 1]);
  });

  it("moves once per key press and keeps the keys from the page", () => {
    document.addEventListener("keydown", pageListener);

    press("KeyH", {}, "keydown");
    press("KeyH", {}, "keypress");
    press("KeyH", {}, "keyup");

    expect(steps).toHaveBeenCalledOnce();
    expect(pageListener).not.toHaveBeenCalled();
  });

  it("leaves the keys to the page with Ctrl, Alt or Cmd", () => {
    document.addEventListener("keydown", pageListener);

    press("KeyG", { ctrlKey: true });
    press("KeyH", { altKey: true });
    press("KeyH", { metaKey: true });

    expect(steps).not.toHaveBeenCalled();
    expect(pageListener).toHaveBeenCalledTimes(3);
  });

  it("doesn't act while typing", () => {
    const input = document.createElement("input");
    document.body.append(input);

    press("KeyH", {}, "keydown", input);

    expect(steps).not.toHaveBeenCalled();
    input.remove();
  });

  it("leaves the keys to the page without subtitles", () => {
    document.addEventListener("keydown", pageListener);
    resetSubs("");

    press("KeyH");

    expect(steps).not.toHaveBeenCalled();
    expect(pageListener).toHaveBeenCalledOnce();
  });

  it("stops listening when removed", () => {
    removeSubsDelayKeyListeners();

    press("KeyH");

    expect(steps).not.toHaveBeenCalled();
  });

  it("doesn't act on services that show their phrases live", async () => {
    fetchCurrentStreamingFx.use(() => createService({ isOnFlight: () => true }));
    await fetchCurrentStreamingFx();

    press("KeyH");

    expect(steps).not.toHaveBeenCalled();
    fetchCurrentStreamingFx.use(() => createService());
    await fetchCurrentStreamingFx();
  });
});
