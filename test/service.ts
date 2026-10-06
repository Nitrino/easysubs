import { vi } from "vitest";
import type Service from "@src/streamings/service";
import { playgroundCaptions } from "./fixtures";

// A streaming service with the playground's subtitle tracks, see playground/src/playgroundService.ts
export function createService(overrides: Partial<Service> = {}): Service {
  const container = document.createElement("div");
  return {
    name: "test",
    init: vi.fn(),
    getSubs: vi.fn(async (language: string) => playgroundCaptions(language as "en" | "es")),
    getSubsContainer: () => container,
    getSettingsButtonContainer: () => container,
    getSettingsContentContainer: () => container,
    isOnFlight: () => false,
    ...overrides,
  };
}
