import Service from "service";
import { parse, resync } from "subtitle";
import { ready } from "../ready";
import { ttml2srt } from "ttml2srt";

const languagesList = [
  { name: "Dansk", code: "da-dk" },
  { name: "Deutsch", code: "de-de" },
  { name: "EnglishCC", code: "en-us" },
  { name: "English [CC]", code: "en-us" },
  { name: "Español (España)", code: "es-es" },
  { name: "Español (Latinoamérica)", code: "es-419" },
  { name: "Français", code: "fr-fr" },
  { name: "Indonesia", code: "id-id" },
  { name: "Italiano", code: "it-it" },
  { name: "Nederlands", code: "nl-nl" },
  { name: "Norsk Bokmål", code: "nb-no" },
  { name: "Polski", code: "pl-pl" },
  { name: "Português (Brasil)", code: "pt-br" },
  { name: "Português (Portugal)", code: "pt-pt" },
  { name: "Suomi", code: "fi-fi" },
  { name: "Svenska", code: "sv-se" },
  { name: "Türkçe", code: "tr-tr" },
  { name: "Русский", code: "ru-ru" },
  { name: "עברית", code: "he-il" },
  { name: "العربية", code: "ar-eg" },
  { name: "ไทย", code: "th-th" },
  { name: "中文（简体）", code: "zh-hans" },
  { name: "中文（繁體）", code: "zh-hant" },
  { name: "한국어", code: "ko-kr" }
];

class AmazonPrime implements Service {
  private subCache: any[];

  constructor() {
    this.subCache = [];
  }

  public init() {
    window.addEventListener("easysubs_data", (event: any) => {
      this.subCache = event.detail;
    });

    ready("video", () => {
      if (this.subCache.length === 0) return;
      window.dispatchEvent(new CustomEvent("easysubsVideoReady"));
      (document.querySelector(".subtitlesAndAudioButton") as HTMLDivElement).click();
      const label = document.querySelector(".subtitles .checkbox.checked .text").textContent;
      const langCode = languagesList.find((lang: any) => lang.name === label).code;
      window.dispatchEvent(new CustomEvent("easysubsSubtitlesChanged", { detail: langCode }));
    });

    this.injectScript();
  }

  public async getSubs(language: string) {
    if (language === "") return parse("");

    const sub = this.subCache.find((subtitle: any) => subtitle.languageCode === language);
    const resp = await fetch(sub.url);
    const data = await resp.text();
    const srt = ttml2srt(data);
    return resync(parse(srt), 10000);
  }

  public playerContainerSelector(): string {
    return ".webPlayer";
  }

  public settingSelector(): string {
    return ".imageButtonWrapper.fullscreenButtonWrapper";
  }

  private injection = () => {
    // window.setInterval(() => {
    //   if (!window.isLoaded && document.querySelector(".subtitlesAndAudioButton")) {
    //     (document.querySelector(".subtitlesAndAudioButton") as HTMLDivElement).click();
    //     (document.querySelector(".subtitlesAndAudioButton") as HTMLDivElement).click();
    //     console.log("++++++++", document.querySelector(".subtitles .checkbox.checked .text").textContent);
    //     window.isLoaded = true;
    //   }
    // }, 500);

    const parseMock = JSON.parse;

    JSON.parse = function() {
      const data = parseMock.apply(this, arguments);
      if (data && data.subtitleUrls && data.subtitleUrls[0].format === "TTMLv2") {
        window.dispatchEvent(new CustomEvent("easysubs_data", { detail: data.subtitleUrls }));
      }
      return data;
    };
  };

  private injectScript() {
    const sc = document.createElement("script");
    sc.innerHTML = `(${this.injection.toString()})()`;
    document.head.appendChild(sc);
    document.head.removeChild(sc);
  }
}

export default AmazonPrime;
