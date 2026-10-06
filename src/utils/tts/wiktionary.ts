import { baseLanguage, readSpeech, TSpeechRequest } from "./speech";

const API_URL = "https://en.wiktionary.org/w/api.php";
// Browsers don't let pages set User-Agent, so MediaWiki asks them to introduce themselves with Api-User-Agent
const API_USER_AGENT = "EasySubs (https://easysubs.cc)";

// Lingua Libre names its recordings "LL-Q1860 (eng)-Speaker-word.wav", by ISO 639-3 codes
const ISO_639_3: Record<string, string> = {
  ar: "ara",
  bg: "bul",
  cs: "ces",
  da: "dan",
  de: "deu",
  el: "ell",
  en: "eng",
  es: "spa",
  fi: "fin",
  fr: "fra",
  he: "heb",
  hi: "hin",
  hu: "hun",
  it: "ita",
  ja: "jpn",
  ko: "kor",
  nb: "nob",
  nl: "nld",
  pl: "pol",
  pt: "por",
  ro: "ron",
  ru: "rus",
  sv: "swe",
  tr: "tur",
  uk: "ukr",
  zh: "cmn",
};

const AUDIO_FILE = /\.(ogg|oga|opus|wav|mp3|flac)$/;

type TFilePage = {
  title: string;
  imageinfo?: { url: string; mime: string }[];
};

// Recordings are named after their language: "En-us-word.ogg", "EN-AU ck1 word.ogg", "De-Haus.ogg" or Lingua Libre's
// "LL-Q1860 (eng)-Speaker-word.wav". A page also has recordings of the same word in other languages, they're skipped.
// Lower is better; undefined is not a recording in the language.
export function rankRecording(fileTitle: string, text: string, lang: string): number | undefined {
  const name = fileTitle.replace(/^File:/, "").toLowerCase();
  if (!AUDIO_FILE.test(name)) return undefined;

  let rank: number | undefined;
  if (lang === "en" && name.startsWith("en-us")) rank = 0;
  else if (name.startsWith(`${lang}-`) || name.startsWith(`${lang} `)) rank = 1;
  else if (ISO_639_3[lang] && name.match(/^ll-q\d+ \((\w+)\)/)?.[1] === ISO_639_3[lang]) rank = 2;
  if (rank === undefined) return undefined;

  // A page can also have recordings of other forms ("De-Häuser.ogg" on "Haus")
  return name.includes(text.toLowerCase()) ? rank : rank + 3;
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// Recordings by people, from the word's page on the English Wiktionary, which has entries in every language
export async function fetchWiktionarySpeech({ text, lang }: TSpeechRequest) {
  const language = baseLanguage(lang);
  // Titles are case-sensitive: "Haus" for German nouns, "run" for the rest
  const titles = [...new Set([text, text.toLowerCase(), capitalize(text.toLowerCase())])];
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    origin: "*",
    titles: titles.join("|"),
    generator: "images",
    gimlimit: "50",
    prop: "imageinfo",
    iiprop: "url|mime",
  });
  const response = await fetch(`${API_URL}?${params}`, { headers: { "Api-User-Agent": API_USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Wiktionary answered ${response.status}`);
  }
  const pages: TFilePage[] = (await response.json()).query?.pages ?? [];

  const [recording] = pages
    .map((page) => ({ url: page.imageinfo?.[0]?.url, rank: rankRecording(page.title, text, language) }))
    .filter((file) => file.url && file.rank !== undefined)
    .sort((a, b) => a.rank - b.rank);
  if (!recording) {
    throw new Error(`Wiktionary has no pronunciation of "${text}"`);
  }
  return readSpeech(await fetch(recording.url), "Wiktionary", text);
}
