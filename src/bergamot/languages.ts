import { normalizeLanguage } from "@src/utils/languages";

// Mozilla's code for a language: "zh-Hans" and "zh-Hant" for the Chinese scripts, "nb" for Norwegian
export function bergamotLanguage(code: string): string {
  const normalized = normalizeLanguage(code);
  if (normalized === "zh-hans") return "zh-Hans";
  if (normalized === "zh-hant") return "zh-Hant";
  if (normalized === "no") return "nb";
  return normalized;
}
