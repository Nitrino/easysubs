// The languages EasySubs translates into, as Google Translate names them. Also the auto-translate languages of the
// second subtitle line.
export const LANGUAGES: { label: string; value: string }[] = [
  { label: "Afrikaans", value: "af" },
  { label: "Albanian", value: "sq" },
  { label: "Amharic", value: "am" },
  { label: "Arabic", value: "ar" },
  { label: "Armenian", value: "hy" },
  { label: "Azerbaijani", value: "az" },
  { label: "Basque", value: "eu" },
  { label: "Belarusian", value: "be" },
  { label: "Bengali", value: "bn" },
  { label: "Bosnian", value: "bs" },
  { label: "Bulgarian", value: "bg" },
  { label: "Catalan", value: "ca" },
  { label: "Cebuano", value: "ceb" },
  { label: "Chinese (Simplified)", value: "zh-CN" },
  { label: "Chinese (Traditional)", value: "zh-TW" },
  { label: "Corsican", value: "co" },
  { label: "Croatian", value: "hr" },
  { label: "Czech", value: "cs" },
  { label: "Danish", value: "da" },
  { label: "Dutch", value: "nl" },
  { label: "English", value: "en" },
  { label: "Esperanto", value: "eo" },
  { label: "Estonian", value: "et" },
  { label: "Finnish", value: "fi" },
  { label: "French", value: "fr" },
  { label: "Frisian", value: "fy" },
  { label: "Galician", value: "gl" },
  { label: "Georgian", value: "ka" },
  { label: "German", value: "de" },
  { label: "Greek", value: "el" },
  { label: "Gujarati", value: "gu" },
  { label: "Haitian Creole", value: "ht" },
  { label: "Hausa", value: "ha" },
  { label: "Hawaiian", value: "haw" },
  { label: "Hebrew", value: "he" },
  { label: "Hindi", value: "hi" },
  { label: "Hmong", value: "hmn" },
  { label: "Hungarian", value: "hu" },
  { label: "Icelandic", value: "is" },
  { label: "Igbo", value: "ig" },
  { label: "Indonesian", value: "id" },
  { label: "Irish", value: "ga" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Javanese", value: "jv" },
  { label: "Kannada", value: "kn" },
  { label: "Kazakh", value: "kk" },
  { label: "Khmer", value: "km" },
  { label: "Korean", value: "ko" },
  { label: "Kurdish", value: "ku" },
  { label: "Kyrgyz", value: "ky" },
  { label: "Lao", value: "lo" },
  { label: "Latin", value: "la" },
  { label: "Latvian", value: "lv" },
  { label: "Lithuanian", value: "lt" },
  { label: "Luxembourgish", value: "lb" },
  { label: "Macedonian", value: "mk" },
  { label: "Malagasy", value: "mg" },
  { label: "Malay", value: "ms" },
  { label: "Malayalam", value: "ml" },
  { label: "Maltese", value: "mt" },
  { label: "Maori", value: "mi" },
  { label: "Marathi", value: "mr" },
  { label: "Mongolian", value: "mn" },
  { label: "Myanmar (Burmese)", value: "my" },
  { label: "Nepali", value: "ne" },
  { label: "Norwegian", value: "no" },
  { label: "Nyanja (Chichewa)", value: "ny" },
  { label: "Pashto", value: "ps" },
  { label: "Persian", value: "fa" },
  { label: "Polish", value: "pl" },
  { label: "Portuguese (Portugal, Brazil)", value: "pt" },
  { label: "Punjabi", value: "pa" },
  { label: "Romanian", value: "ro" },
  { label: "Russian", value: "ru" },
  { label: "Samoan", value: "sm" },
  { label: "Scots Gaelic", value: "gd" },
  { label: "Serbian", value: "sr" },
  { label: "Sesotho", value: "st" },
  { label: "Shona", value: "sn" },
  { label: "Sindhi", value: "sd" },
  { label: "Sinhala (Sinhalese)", value: "si" },
  { label: "Slovak", value: "sk" },
  { label: "Slovenian", value: "sl" },
  { label: "Somali", value: "so" },
  { label: "Spanish", value: "es" },
  { label: "Sundanese", value: "su" },
  { label: "Swahili", value: "sw" },
  { label: "Swedish", value: "sv" },
  { label: "Tagalog (Filipino)", value: "tl" },
  { label: "Tajik", value: "tg" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Thai", value: "th" },
  { label: "Turkish", value: "tr" },
  { label: "Ukrainian", value: "uk" },
  { label: "Urdu", value: "ur" },
  { label: "Uzbek", value: "uz" },
  { label: "Vietnamese", value: "vi" },
  { label: "Welsh", value: "cy" },
  { label: "Xhosa", value: "xh" },
  { label: "Yiddish", value: "yi" },
  { label: "Yoruba", value: "yo" },
  { label: "Zulu", value: "zu" },
];

// ISO 639-2 codes HLS manifests and media files use ("eng", "rus"), and Google's old codes
const LANGUAGE_ALIASES: Record<string, string> = {
  ara: "ar",
  bul: "bg",
  ces: "cs",
  cze: "cs",
  chi: "zh",
  zho: "zh",
  dan: "da",
  deu: "de",
  ger: "de",
  ell: "el",
  gre: "el",
  eng: "en",
  est: "et",
  fin: "fi",
  fra: "fr",
  fre: "fr",
  heb: "he",
  iw: "he",
  hin: "hi",
  hrv: "hr",
  hun: "hu",
  ind: "id",
  in: "id",
  ita: "it",
  jpn: "ja",
  kat: "ka",
  geo: "ka",
  kaz: "kk",
  kor: "ko",
  lav: "lv",
  lit: "lt",
  nld: "nl",
  dut: "nl",
  nor: "no",
  nob: "no",
  nb: "no",
  pol: "pl",
  por: "pt",
  ron: "ro",
  rum: "ro",
  rus: "ru",
  slk: "sk",
  slo: "sk",
  slv: "sl",
  spa: "es",
  srp: "sr",
  swe: "sv",
  tha: "th",
  tur: "tr",
  ukr: "uk",
  vie: "vi",
  jw: "jv",
};

// Track names some players show instead of a language code
const LANGUAGE_NAMES: Record<string, string> = {
  english: "en",
  английский: "en",
  английские: "en",
  russian: "ru",
  русский: "ru",
  русские: "ru",
  ukrainian: "uk",
  украинский: "uk",
  украинские: "uk",
  українська: "uk",
  spanish: "es",
  испанский: "es",
  испанские: "es",
  español: "es",
  german: "de",
  немецкий: "de",
  немецкие: "de",
  deutsch: "de",
  french: "fr",
  французский: "fr",
  французские: "fr",
  français: "fr",
  italian: "it",
  итальянский: "it",
  italiano: "it",
  portuguese: "pt",
  португальский: "pt",
  português: "pt",
  japanese: "ja",
  японский: "ja",
  chinese: "zh",
  китайский: "zh",
  korean: "ko",
  корейский: "ko",
  polish: "pl",
  польский: "pl",
  turkish: "tr",
  турецкий: "tr",
};

// One spelling per language, so tracks and settings compare: lower case, the base language without its region,
// except Chinese, whose scripts read as different languages
export function normalizeLanguage(code: string): string {
  const [first, region = ""] = code.trim().toLowerCase().replace(/_/g, "-").split("-");
  const base = LANGUAGE_ALIASES[first] ?? first;
  if (base !== "zh") return base;
  return /^(tw|hk|mo|hant)$/.test(region) ? "zh-hant" : "zh-hans";
}

export const isSameLanguage = (a: string, b: string) => normalizeLanguage(a) === normalizeLanguage(b);

// A language code from a track's code or name: "eng", "en-US", "Русский (форсированные)"; null if it's not one we know
export function languageFromTrack(code: string | undefined, name?: string): string | null {
  if (code && code !== "und") return normalizeLanguage(code);
  const words = (name ?? "").toLowerCase().split(/[^\p{L}]+/u);
  // Only three-letter codes count in a name: "in" is an old code for Indonesian, but also an English word
  const known = words.find((word) => LANGUAGE_NAMES[word] || (word.length === 3 && LANGUAGE_ALIASES[word]));
  return known ? normalizeLanguage(LANGUAGE_NAMES[known] ?? known) : null;
}

// "Spanish" for "es", "Chinese (Traditional)" for "zh-Hant"; the code itself for languages Google doesn't list
export function languageName(code: string): string {
  const normalized = normalizeLanguage(code);
  const language = LANGUAGES.find((option) => normalizeLanguage(option.value) === normalized);
  if (language) return language.label;
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

// The code translators take for a language: Google's ("zh-CN" for a "zh-Hans" track), or the base language
export function translationLanguageCode(code: string): string {
  const normalized = normalizeLanguage(code);
  return LANGUAGES.find((option) => normalizeLanguage(option.value) === normalized)?.value ?? normalized;
}
