import { YandexTranslator } from "anylang/translators";

const SUPPORTED_LANGUAGES = [
  "af",
  "am",
  "ar",
  "az",
  "ba",
  "be",
  "bg",
  "bn",
  "bs",
  "ca",
  "ceb",
  "cs",
  "cv",
  "cy",
  "da",
  "de",
  "el",
  "emj",
  "en",
  "eo",
  "es",
  "et",
  "eu",
  "fa",
  "fi",
  "fr",
  "ga",
  "gd",
  "gl",
  "gu",
  "he",
  "hi",
  "hr",
  "ht",
  "hu",
  "hy",
  "id",
  "is",
  "it",
  "ja",
  "jv",
  "ka",
  "kazlat",
  "kk",
  "km",
  "kn",
  "ko",
  "ky",
  "la",
  "lb",
  "lo",
  "lt",
  "lv",
  "mg",
  "mhr",
  "mi",
  "mk",
  "ml",
  "mn",
  "mr",
  "mrj",
  "ms",
  "mt",
  "my",
  "ne",
  "nl",
  "no",
  "pa",
  "pap",
  "pl",
  "pt",
  "ro",
  "ru",
  "sah",
  "si",
  "sjn",
  "sk",
  "sl",
  "sq",
  "sr",
  "su",
  "sv",
  "sw",
  "ta",
  "te",
  "tg",
  "th",
  "tl",
  "tr",
  "tt",
  "udm",
  "uk",
  "ur",
  "uz",
  "uzbcyr",
  "vi",
  "xh",
  "yi",
  "zh",
  "zu",
] as const;

type TRequest = {
  text: string;
  lang: (typeof SUPPORTED_LANGUAGES)[number];
};

class YandexTranslateFetcher {
  #translator: YandexTranslator;

  constructor() {
    this.#translator = new YandexTranslator();
  }

  async getFullTextTranslation({ text, lang }: TRequest): Promise<string> {
    try {
      const response = await this.#translator.translate(text, "auto", lang);
      return response;
    } catch (error) {
      console.error("Yandex translation error:", error);
      throw error;
    }
  }
}

export const yandexTranslateFetcher = new YandexTranslateFetcher();
