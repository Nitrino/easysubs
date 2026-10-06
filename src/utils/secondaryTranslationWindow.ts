import type { TSub } from "@src/models/types";

// Lines are translated about two minutes ahead of the playhead, in one request…
export const WINDOW_MS = 120_000;
// …once a line in the next 30 s has no translation yet, so the next window is ready before it's needed
export const LOOKAHEAD_MS = 30_000;
// Batch limits every translator accepts: DeepL takes 50 texts, Google about 5000 characters
export const MAX_BATCH_LINES = 50;
export const MAX_BATCH_CHARS = 4500;

type TWindowParams = {
  subs: TSub[];
  // Video time, ms
  time: number;
  // Translations by line text, and the lines being translated
  translations: Record<string, string>;
  pendings: Record<string, boolean>;
};

// The texts of the main lines to translate next: the untranslated lines of the window from the playhead, if one of
// the lines on screen or coming up soon needs a translation. After a seek the window starts at the new time.
export function nextTranslationBatch({ subs, time, translations, pendings }: TWindowParams): string[] {
  const needsTranslation = (sub: TSub) =>
    sub.cleanedText.trim() !== "" && !(sub.cleanedText in translations) && !pendings[sub.cleanedText];

  const comingUp = subs.some((sub) => sub.end > time && sub.start < time + LOOKAHEAD_MS && needsTranslation(sub));
  if (!comingUp) return [];

  const texts: string[] = [];
  let chars = 0;
  for (const sub of subs) {
    if (sub.end <= time || sub.start >= time + WINDOW_MS) continue;
    if (!needsTranslation(sub) || texts.includes(sub.cleanedText)) continue;
    if (texts.length === MAX_BATCH_LINES || (texts.length > 0 && chars + sub.cleanedText.length > MAX_BATCH_CHARS)) {
      break;
    }
    texts.push(sub.cleanedText);
    chars += sub.cleanedText.length;
  }
  return texts;
}
