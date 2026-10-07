import { normalizeLanguage } from "./languages";

// Chrome's built-in Translator API (desktop Chrome 138+): free, on-device, one model per language pair, downloaded the
// first time the pair is used. It isn't available in workers, so the content script calls it, not the background.
// Where it can't translate (another browser, an unsupported pair, a frame not allowed to), callers fall back to
// Google, see ChromeTranslatorUnavailableError.

type TAvailability = "unavailable" | "downloadable" | "downloading" | "available";
type TLanguagePair = { sourceLanguage: string; targetLanguage: string };
type TTranslator = { translate(text: string): Promise<string>; destroy?(): void };
type TTranslatorFactory = {
  availability(options: TLanguagePair): Promise<TAvailability>;
  create(options: TLanguagePair): Promise<TTranslator>;
};

export class ChromeTranslatorUnavailableError extends Error {
  name = "ChromeTranslatorUnavailableError";
}

const factory = () => (globalThis as { Translator?: TTranslatorFactory }).Translator;

export const isChromeTranslatorSupported = () => factory() !== undefined;

// Chrome takes BCP 47 codes: "zh-Hant" rather than Google's "zh-TW", "he" rather than "iw"
function chromeLanguage(code: string) {
  const normalized = normalizeLanguage(code);
  return normalized === "zh-hans" ? "zh" : normalized === "zh-hant" ? "zh-Hant" : normalized;
}

const translators = new Map<string, Promise<TTranslator>>();

function translatorFor(source: string, target: string): Promise<TTranslator> {
  const api = factory();
  if (!api) return Promise.reject(new ChromeTranslatorUnavailableError("This browser has no built-in translator"));
  if (!source || source === "auto") {
    return Promise.reject(new ChromeTranslatorUnavailableError("The subtitles' language isn't known yet"));
  }
  const pair = { sourceLanguage: chromeLanguage(source), targetLanguage: chromeLanguage(target) };
  const key = `${pair.sourceLanguage}:${pair.targetLanguage}`;
  if (!translators.has(key)) {
    const translator = (async () => {
      if ((await api.availability(pair)) === "unavailable") {
        throw new ChromeTranslatorUnavailableError(`Chrome can't translate ${source} into ${target}`);
      }
      // Downloading a pair's model needs a click or key press on the page; without one Chrome refuses
      try {
        return await api.create(pair);
      } catch (error) {
        throw new ChromeTranslatorUnavailableError(`Chrome's ${key} translator isn't ready: ${error}`);
      }
    })();
    // Tried again next time: the model may have downloaded since, or the next call follows a click
    translator.catch(() => translators.delete(key));
    translators.set(key, translator);
  }
  return translators.get(key);
}

// Starts downloading a pair's model while the page has a user gesture, e.g. right after the translator was picked.
// Resolves once Chrome has the translator or refused it; translating later tries again.
export function prepareChromeTranslator(source: string, target: string): Promise<void> {
  return translatorFor(source, target).then(
    () => {},
    () => {},
  );
}

export async function chromeTranslate(text: string, source: string, target: string): Promise<string> {
  const translator = await translatorFor(source, target);
  return translator.translate(text);
}

// Chrome translates one text at a time anyway, so the lines go one by one
export async function chromeTranslateBatch(texts: string[], source: string, target: string): Promise<string[]> {
  const translator = await translatorFor(source, target);
  const translations: string[] = [];
  for (const text of texts) translations.push(await translator.translate(text));
  return translations;
}

// Forgets the translators, so a test starts without models
export function resetChromeTranslators() {
  translators.clear();
}
