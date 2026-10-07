import { vi } from "vitest";
import { resetChromeTranslators } from "@src/utils/chromeTranslator";

type TPair = { sourceLanguage: string; targetLanguage: string };
type TOptions = {
  availability?: "unavailable" | "downloadable" | "downloading" | "available";
  // Chrome refuses to download a model without a user gesture; true makes create() fail like that
  refuseCreate?: boolean;
};

// Chrome's built-in Translator API (src/utils/chromeTranslator.ts) on `globalThis.Translator`: it translates into
// "[chrome:ru] text". Returns the API, so a test can check the pairs it was asked for.
export function stubChromeTranslator({ availability = "available", refuseCreate = false }: TOptions = {}) {
  resetChromeTranslators();
  const translate = vi.fn(async (text: string, pair: TPair) => `[chrome:${pair.targetLanguage}] ${text}`);
  const api = {
    availability: vi.fn(async (_pair: TPair) => availability),
    create: vi.fn(async (pair: TPair) => {
      if (refuseCreate) throw new DOMException("Requires a user gesture", "NotAllowedError");
      return { translate: (text: string) => translate(text, pair), destroy: vi.fn() };
    }),
    translate,
  };
  vi.stubGlobal("Translator", api);
  return api;
}
