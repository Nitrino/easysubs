import { query } from "@ifyour/deeplx";

export const SUPPORTED_LANGUAGES = [
  "el",
  "bg",
  "lv",
  "ko",
  "lt",
  "id",
  "uk",
  "sl",
  "sk",
  "tr",
  "ro",
  "cs",
  "et",
  "fi",
  "da",
  "hu",
  "sv",
  "nb",
  "ru",
  "pl",
  "pt",
  "nl",
  "it",
  "es",
  "fr",
  "de",
  "ja",
  "en",
  "zh",
] as const;

type TRequest = {
  text: string;
  lang: (typeof SUPPORTED_LANGUAGES)[number];
};

class DeepLTranslateFetcher {
  #baseUrl: string;
  #apiKey: string | null;

  constructor() {
    this.#baseUrl = "https://api-free.deepl.com/v2/translate";
    this.#apiKey = null;
  }

  setApiKey(apiKey: string) {
    this.#apiKey = apiKey;
    this.#baseUrl = apiKey.endsWith(":fx")
      ? "https://api-free.deepl.com/v2/translate"
      : "https://api.deepl.com/v2/translate";
  }

  async getFullTextTranslation({ text, lang }: TRequest): Promise<string> {
    if (!this.#apiKey || !this.#apiKey.length) {
      const response = await query({
        text,
        source_lang: "auto",
        target_lang: lang,
      });

      if (response.code === 200) {
        return response.data;
      } else {
        throw new Error(`DeepL API error: ${response}`);
      }
    }

    try {
      const response = await fetch(this.#baseUrl, {
        method: "POST",
        headers: {
          Authorization: `DeepL-Auth-Key ${this.#apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: [text],
          target_lang: lang,
        }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Invalid DeepL API key or quota exceeded");
        }
        throw new Error(`DeepL API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.translations && data.translations.length > 0) {
        return data.translations[0].text;
      }

      throw new Error("No translation received from DeepL");
    } catch (error) {
      console.error("DeepL translation error:", error);
      throw error;
    }
  }

  // Several texts in one request, answered in the same order. The API takes up to 50 texts; without an API key the
  // free endpoint takes one text, so the lines go as one text and are split back, or one by one if that fails.
  async getBatchTranslation({ texts, lang }: { texts: string[]; lang: TRequest["lang"] }): Promise<string[]> {
    if (!this.#apiKey || !this.#apiKey.length) {
      const joined = await this.getFullTextTranslation({ text: texts.join("\n"), lang });
      const lines = joined.split("\n");
      if (lines.length === texts.length) return lines.map((line) => line.trim());
      const translations: string[] = [];
      for (const text of texts) translations.push(await this.getFullTextTranslation({ text, lang }));
      return translations;
    }

    const response = await fetch(this.#baseUrl, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${this.#apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: texts, target_lang: lang }),
    });

    if (!response.ok) {
      if (response.status === 403) throw new Error("Invalid DeepL API key or quota exceeded");
      if (response.status === 456) throw new Error("DeepL quota exceeded");
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data: { translations?: { text: string }[] } = await response.json();
    if (data.translations?.length !== texts.length) throw new Error("No translation received from DeepL");
    return data.translations.map((translation) => translation.text);
  }

  private getDeepLLanguageCode(googleLangCode: string): string {
    const langMap: Record<string, string> = {
      zh: "ZH",
      "zh-cn": "ZH",
      "zh-tw": "ZH-HANT",
      en: "EN-US",
      de: "DE",
      fr: "FR",
      it: "IT",
      ja: "JA",
      es: "ES",
      nl: "NL",
      pl: "PL",
      ru: "RU",
      pt: "PT-PT",
      sv: "SV",
      da: "DA",
      fi: "FI",
      el: "EL",
      cs: "CS",
      et: "ET",
      hu: "HU",
      lv: "LV",
      lt: "LT",
      sk: "SK",
      sl: "SL",
      bg: "BG",
      ro: "RO",
      ko: "KO",
      id: "ID",
      tr: "TR",
      uk: "UK",
      nb: "NB",
      ar: "AR",
    };
    return langMap[googleLangCode.toLowerCase()] || "EN-US";
  }
}

export const deeplTranslateFetcher = new DeepLTranslateFetcher();
