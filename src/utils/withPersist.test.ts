import { describe, expect, it } from "vitest";
import { createEvent, createStore } from "effector";
import { withPersist } from "./withPersist";
import { storedItems } from "@root/test/chrome";

// chrome.storage answers on the next task
const storageAnswered = () => new Promise((resolve) => setTimeout(resolve));

describe("withPersist", () => {
  it("saves every state of the store to chrome.storage as JSON under the store's name", async () => {
    const changed = createEvent<number>();
    const $size = withPersist(createStore(100, { name: "size" }).on(changed, (_, size) => size));

    changed(105);
    await storageAnswered();

    expect($size.getState()).toBe(105);
    expect(storedItems()).toEqual({ "persist:size": "105" });
  });

  it("restores the saved state once chrome.storage answers", async () => {
    await chrome.storage.local.set({ "persist:language": JSON.stringify("de") });

    const $language = withPersist(createStore("en", { name: "language" }));
    expect($language.getState()).toBe("en");
    await storageAnswered();

    expect($language.getState()).toBe("de");
  });

  it("keeps the default state when nothing is saved", async () => {
    const $enabled = withPersist(createStore(true, { name: "enabled" }));
    await storageAnswered();

    expect($enabled.getState()).toBe(true);
  });

  it("uses the key prefix from the config", async () => {
    withPersist(createStore("google", { name: "service" }), { key: "settings" });
    await storageAnswered();

    expect(storedItems()).toEqual({ "settings:service": '"google"' });
  });
});

describe("withPersist with a legacy key", () => {
  it("restores the state from the legacy key and moves it to the current one", async () => {
    await chrome.storage.local.set({ "persist:17": '"anki"' });

    const $service = withPersist(createStore("disabled", { name: "service" }), { legacyKey: "persist:17" });
    await storageAnswered();
    await storageAnswered();

    expect($service.getState()).toBe("anki");
    expect(storedItems()).toEqual({ "persist:service": '"anki"' });
  });

  it("prefers the current key", async () => {
    await chrome.storage.local.set({ "persist:service": '"lingualeo"', "persist:17": '"anki"' });

    const $service = withPersist(createStore("disabled", { name: "service" }), { legacyKey: "persist:17" });
    await storageAnswered();

    expect($service.getState()).toBe("lingualeo");
  });
});
