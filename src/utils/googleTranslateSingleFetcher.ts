export type TWordTranslate = {
  original: string;
  lang: string;
  main: string;
  alternatives: [];
};

type TRequest = {
  text: string;
  lang: string;
};

class GoogleTranslateSingleFetcher {
  #baseUrl: string;

  constructor() {
    this.#baseUrl = "https://translate.google.com/translate_a/single?client=at&dt=t&dt=rm&dj=1";
  }

  async getFullTextTranslation({ text, lang }: TRequest): Promise<string> {
    return await this.get({ text, lang });
  }

  async get({ text, lang }: TRequest): Promise<string> {
    const body = new URLSearchParams({
      sl: "auto",
      tl: lang,
      q: text,
    }).toString();

    const headers = { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" };

    const resp = await fetch(this.#baseUrl, {
      method: "POST",
      body: body,
      headers: headers,
    });
    return await resp.text();
  }
}

export const googleTranslateSingleFetcher = new GoogleTranslateSingleFetcher();
