import { describe, expect, it } from "vitest";
import { MAX_CACHED_VIDEOS, readTranslationCache, videoPageKey, writeTranslationCache } from "./translationCache";
import { storedItems } from "@root/test/chrome";

describe("translation cache", () => {
  it("reads nothing for a new video", async () => {
    expect(await readTranslationCache("netflix:watch/1:en:ru:google")).toEqual({});
  });

  it("keeps the translations of a video", async () => {
    await writeTranslationCache("netflix:watch/1:en:ru:google", { Hello: "Привет" });

    expect(await readTranslationCache("netflix:watch/1:en:ru:google")).toEqual({ Hello: "Привет" });
    expect(await readTranslationCache("netflix:watch/1:en:de:google")).toEqual({});
  });

  it("keeps only the most recently translated videos", async () => {
    for (let video = 0; video <= MAX_CACHED_VIDEOS; video++) {
      await writeTranslationCache(`video ${video}`, { line: `${video}` });
    }

    expect(await readTranslationCache("video 0")).toEqual({});
    expect(await readTranslationCache("video 1")).toEqual({ line: "1" });
    expect(storedItems()["secondarySubsCache:index"]).toHaveLength(MAX_CACHED_VIDEOS);
  });

  it("moves a video translated again to the front", async () => {
    for (let video = 0; video < MAX_CACHED_VIDEOS; video++) {
      await writeTranslationCache(`video ${video}`, { line: `${video}` });
    }
    await writeTranslationCache("video 0", { line: "0", more: "0" });
    await writeTranslationCache("one more", {});

    expect(await readTranslationCache("video 0")).toEqual({ line: "0", more: "0" });
    expect(await readTranslationCache("video 1")).toEqual({});
  });
});

describe("videoPageKey", () => {
  const at = (url: string) => videoPageKey(new URL(url) as unknown as Location);

  it("leaves out what changes while the video plays", () => {
    expect(at("https://www.netflix.com/watch/81234?trackId=1&tctx=2")).toBe("www.netflix.com/watch/81234");
    expect(at("https://www.youtube.com/watch?v=abc123&t=42s")).toBe("www.youtube.com/watch?v=abc123");
  });
});
