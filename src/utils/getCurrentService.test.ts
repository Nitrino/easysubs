import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentService } from "./getCurrentService";

const setTitle = (title: string) => {
  document.title = title;
};

describe("getCurrentService", () => {
  beforeEach(() => {
    // Netflix and Jellyfin watch their players with intervals
    vi.useFakeTimers();
    document.head.replaceChildren();
    document.documentElement.removeAttribute("id");
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("detects YouTube by the page title and marks the page for its styles", () => {
    setTitle("Some video - YouTube");

    expect(getCurrentService().name).toBe("youtube");
    expect(document.documentElement.id).toBe("youtube");
  });

  it("marks the new YouTube player design", () => {
    setTitle("Some video - YouTube");
    document.body.append(Object.assign(document.createElement("div"), { className: "ytp-delhi-modern" }));

    getCurrentService();

    expect(document.body.classList).toContain("es-youtube-delphi");
  });

  it("detects Netflix by the page title", () => {
    setTitle("Netflix");

    expect(getCurrentService().name).toBe("netflix");
    expect(document.documentElement.id).toBe("netflix");
  });

  it("detects Coursera by the page title", () => {
    setTitle("Lecture 1 | Coursera");

    expect(getCurrentService().name).toBe("coursera");
  });

  it("detects KinoPub by its meta tag", () => {
    setTitle("Фильм");
    document.head.innerHTML = '<meta content="Кинопаб">';

    expect(getCurrentService().name).toBe("kinopub");
  });

  it("detects Jellyfin by its application name", () => {
    setTitle("Jellyfin");
    document.head.innerHTML = '<meta name="application-name" content="Jellyfin">';

    expect(getCurrentService().name).toBe("jellyfin");
  });

  it("gives the stub on other sites, so detection is retried", () => {
    setTitle("Some page");

    expect(getCurrentService().name).toBe("stub");
  });
});
