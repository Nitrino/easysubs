import qs from "qs";

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

class GoogleTranslateBatchFetcher {
  #baseUrl: string;

  constructor() {
    this.#baseUrl = "https://translate.google.com";
  }

  // Get full text translation
  async getFullTextTranslation({ text, lang }: TRequest): Promise<string> {
    const resp = await this.get({ text, lang });
    const content = this.getResponseContent(resp);
    return this.getTextTranslate(content);
  }

  // Get one word translation
  async getWordTranslation({ text, lang }: TRequest): Promise<TWordTranslate> {
    const resp = await this.get({ text, lang });
    const content = this.getResponseContent(resp);
    return this.getWordTranslate(content, text, lang);
  }

  async getTextLanguage({ text, lang }: TRequest): Promise<TWordTranslate> {
    const resp = await this.get({ text, lang });
    const content = this.getResponseContent(resp);
    return content[2];
  }

  // Get one word full translation
  async getWordFullTranslation({ text, lang }: TRequest): Promise<unknown> {
    const resp = await this.get({ text, lang });
    return this.getResponseContent(resp);
  }

  async get({ text, lang }: TRequest): Promise<string> {
    const googleTranslatePageResp = await fetch(this.#baseUrl);
    const googleTranslatePageText = await googleTranslatePageResp.text();
    const data = {
      query: {
        rpcids: "MkEWBc",
        "source-path": "/",
        "f.sid": this.extract("FdrFJe", googleTranslatePageText),
        bl: this.extract("cfb2h", googleTranslatePageText),
        hl: "en",
        "soc-app": 1,
        "soc-platform": 1,
        "soc-device": 1,
        _reqid: Math.floor(100000 + Math.random() * 900000),
        rt: "c",
      },
      at: this.extract("SNlM0e", googleTranslatePageText),
    };
    const url = this.#baseUrl + "/_/TranslateWebserverUi/data/batchexecute?" + qs.stringify(data.query);
    const payload = JSON.stringify([[text, "auto", lang, 1], []]);
    const req = JSON.stringify([[["MkEWBc", payload, null, "generic"]]]);
    const body = "f.req=" + encodeURIComponent(req) + "&at=" + data.at;
    const headers = { "content-type": "application/x-www-form-urlencoded;charset=UTF-8" };

    const resp = await fetch(url, {
      method: "POST",
      body: body,
      headers: headers,
      referrerPolicy: "origin",
    });
    return await resp.text();
  }

  // Extract passed parameter from google translate page
  private extract(key: string, resp: string) {
    const re = new RegExp(`"${key}":".*?"`);
    const result = re.exec(resp);
    if (result !== null) {
      return result[0].replace(`"${key}":"`, "").slice(0, -1);
    }
    return "";
  }

  private getTextTranslate(content: any): string {
    return content[1][0][0][5].map((translate: any) => translate[0]).join(" ");
  }

  private getWordTranslate(content: any, original: string, lang: string): TWordTranslate {
    try {
      return {
        original: original,
        lang: lang,
        main: content[1][0][0][5][0][0],
        alternatives: content[3][5][0],
      };
    } catch {
      return {
        original: original,
        lang: lang,
        main: this.getTextTranslate(content),
        alternatives: [],
      };
    }
  }

  private getResponseContent(response: string) {
    response = response.slice(6);
    const response_items = response.split(/^\d+$/gm).slice(1);
    for (const json_item of response_items) {
      const parsed_item = JSON.parse(json_item);
      if (parsed_item[0][2]) {
        return JSON.parse(parsed_item[0][2]);
      }
    }
  }
}

export const googleTranslateBatchFetcher = new GoogleTranslateBatchFetcher();
