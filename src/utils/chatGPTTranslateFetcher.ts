import { ChatGPTLLMTranslator } from "anylang/translators";

export const SUPPORTED_LANGUAGES = [
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "as",
  "az",
  "bn",
  "ba",
  "eu",
  "be",
  "bs",
  "bg",
  "yue",
  "ca",
  "ceb",
  "zh-Hans",
  "zh-Hant",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "fo",
  "fj",
  "fil",
  "fi",
  "fr",
  "fy",
  "gl",
  "ka",
  "de",
  "el",
  "gu",
  "ht",
  "ha",
  "he",
  "hi",
  "hu",
  "is",
  "ig",
  "id",
  "ga",
  "it",
  "ja",
  "jv",
  "kn",
  "kk",
  "km",
  "rw",
  "ko",
  "ku",
  "ky",
  "lo",
  "la",
  "lv",
  "li",
  "lt",
  "lb",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mr",
  "mn",
  "my",
  "ne",
  "no",
  "ny",
  "or",
  "ps",
  "fa",
  "pl",
  "pt",
  "pa",
  "ro",
  "ru",
  "sm",
  "gd",
  "sr",
  "st",
  "sn",
  "sd",
  "si",
  "sk",
  "sl",
  "so",
  "es",
  "su",
  "sw",
  "sv",
  "tl",
  "tg",
  "ta",
  "tt",
  "te",
  "th",
  "bo",
  "tr",
  "tk",
  "uk",
  "ur",
  "ug",
  "uz",
  "vi",
  "cy",
  "xh",
  "yi",
  "yo",
  "zu",
] as const;

type TRequest = {
  text: string;
  lang: (typeof SUPPORTED_LANGUAGES)[number];
};

class ChatGPTTranslateFetcher {
  #translator: ChatGPTLLMTranslator | null;
  #apiKey: string | null;
  #model: string | null;

  constructor() {
    this.#translator = null;
    this.#apiKey = null;
    this.#model = null;
  }

  setApiKey(apiKey: string, model?: string) {
    this.#apiKey = apiKey;
    this.#model = model || "gpt-4o-mini";
    if (apiKey) {
      this.#translator = new ChatGPTLLMTranslator({
        apiKey,
        model: this.#model,
      });
    } else {
      this.#translator = null;
    }
  }

  async getFullTextTranslation({ text, lang }: TRequest): Promise<string> {
    if (!this.#translator || !this.#apiKey) {
      throw new Error("ChatGPT API key is required for translation");
    }

    try {
      const response = await this.#translator.translate(text, "auto", lang);
      return response;
    } catch (error) {
      console.error("ChatGPT translation error:", error);
      throw error;
    }
  }

  // Several lines in one prompt: the model sees the neighbouring lines, and answers an array of the same length
  async getBatchTranslation({ texts, lang }: { texts: string[]; lang: TRequest["lang"] }): Promise<string[]> {
    if (!this.#translator || !this.#apiKey) {
      throw new Error("ChatGPT API key is required for translation");
    }
    const translations = await this.#translator.translateBatch(texts, "auto", lang);
    return translations.map((translation) => translation ?? "");
  }
}

export const chatGPTTranslateFetcher = new ChatGPTTranslateFetcher();
