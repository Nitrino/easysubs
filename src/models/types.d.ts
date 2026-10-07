import type { subTitleType } from "subtitle";

export type TMoveDirection = "next" | "prev" | "current";

export type TSubItem = {
  text: string;
  cleanedText: string;
  tag: "span" | "b" | "i" | "u";
  type: "word" | "phrasal-verb" | "punctuation";
};

export type TSub = {
  id: number;
  start: number;
  end: number;
  text: string;
  cleanedText: string;
  items: TSubItem[];
};

type FullTranslationItemDefinition = {
  meaning: string;
  example: string;
  synonyms: string[];
};

type FullTranslationItem = {
  word: string;
  translations: string[];
  popularity: number;
  definitions: FullTranslationItemDefinition[];
};

type FullTranslation = {
  part_of_speech: string;
  items: FullTranslationItem[];
};

export type TTranslateAlternativeItem = [string, null, string[], number, boolean];
export type TTranslateAlternative = [string, TTranslateAlternativeItem[], string, string, number];
export type TPartOfSpeach =
  | "noun"
  | "pronoun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "conjunction"
  | "interjection"
  | "abbreviation"
  | "prefix"
  | "article"
  | "numeral"
  | "auxiliary verb"
  | "particle"
  | "unknown";

return `unknown number ${val}`;

export type TWordTranslationItem = {
  word: string;
  partOfSpeech: TPartOfSpeach;
  synonyms: string[];
  popularity: number;
};

export type TWordTranslation = {
  source: string;
  mainTranslation: string;
  targetLanguage: string;
  translations: TWordTranslationItem[];
  transcription: string;
};

export type TGoogleTranslation = unknown;

export type TLearningService = "anki" | "lingualeo" | "puzzle-english" | "disabled";

export type TTranslationService = "google" | "deepl" | "bing" | "yandex" | "chatgpt";

export type TTtsService = "google" | "youdao" | "wiktionary" | "chatgpt" | "browser";

export type Captions = subTitleType[];

// A subtitle track a service can load besides the one its player shows, see Service.getSubsTracks()
export type TSubsTrackKind = "subtitles" | "cc" | "forced" | "machine";
export type TSubsTrack = {
  // What the service's getSubs() takes: "en[cc]" on Netflix, a track name on KinoPub
  label: string;
  // A language code: "en", "pt-BR", "zh-Hans"
  language: string;
  kind: TSubsTrackKind;
  // How the player names the track, when it has a name of its own
  name?: string;
};

// The second subtitle line picked in the settings: "off", "same" (the translation language) or a language code; the
// kind of track when one was picked from the video's own tracks, or `translate` when the language was picked to be
// translated even where the video has a track in it
export type TSecondaryChoice = { language: string; kind?: TSubsTrackKind; translate?: boolean };

export type TSecondaryTranslator = "google" | "deepl" | "chatgpt";
export type TSecondaryPosition = "below" | "above" | "top";
export type TSecondaryReveal = "always" | "hover" | "paused";

// Where the second line comes from for the current video
export type TSecondarySource =
  | { type: "off" }
  // The main subtitles are already in the chosen language
  | { type: "same"; language: string }
  | { type: "track"; language: string; track: TSubsTrack }
  // A file found online or opened by the user for this video, see src/models/foundSubs
  | { type: "found"; language: string; result: TFoundResult }
  // Translated by the extension: ahead of the playhead, or line by line on services that show one line at a time.
  // `instead` when the video has a track in the language, but translation was picked.
  | { type: "translate"; language: string; mode: "window" | "line"; instead?: boolean };

// ---- Subtitles found online (src/subsSources, src/models/foundSubs) ----

// Where a found file comes from; "file" is one the user opened or dropped on the player
export type TFoundSource = "opensubtitles" | "stremio" | "gestdown" | "subdl" | "subsource" | "jimaku" | "file";

// What a service knows about the title playing, see Service.getTitle()
export type TTitleInfo = {
  title: string;
  year?: number;
  type: "movie" | "episode";
  season?: number;
  episode?: number;
  // "tt0133093"; for an episode, the show's id
  imdbId?: string;
};

// One subtitle file in the search results
export type TFoundResult = {
  source: TFoundSource;
  // The file's id at its source: OpenSubtitles' file_id, Gestdown's subtitleId…
  id: string;
  language: string;
  // The release the file was timed for: "The.Night.Train.S01E02.1080p.NF.WEB-DL.DDP5.1.H.264"
  release: string;
  fps?: number;
  downloads?: number;
  hearingImpaired?: boolean;
  // OpenSubtitles marks machine and AI translations
  machineTranslated?: boolean;
  trusted?: boolean;
  // Where download() fetches the file when the source gives a direct link
  url?: string;
  // The episode to take out of an archive that holds a whole season
  episode?: number;
};

// Which line a found file is loaded on
export type TFoundRole = "main" | "second";

// What happens when an episode starts after one that had a found file
export type TNextEpisodeMode = "off" | "ask" | "load";

export type TOpenSubtitlesSession = {
  username: string;
  // Kept in chrome.storage.local only, to renew the token that lasts 24 hours
  password: string;
  token: string;
  // ms since the epoch
  expiresAt: number;
  // The API host /login returned: vip-api.opensubtitles.com for VIP accounts
  baseUrl: string;
};

// Downloads left today, as the last OpenSubtitles answer said
export type TOpenSubtitlesQuota = { remaining: number; allowed: number; resetAt: string };

// A found file loaded on a line: where it's from, and how it was moved to fit the video
export type TFoundChoice = { result: TFoundResult; shift: number; rate: number };

// What was loaded on a video, saved under "service:page"
export type TFoundVideo = { main?: TFoundChoice; second?: TFoundChoice; at: number };

// The last found file of a show, for its next episode
export type TFoundShow = {
  title: string;
  imdbId?: string;
  season: number;
  episode: number;
  language: string;
  role: TFoundRole;
  source: TFoundSource;
  // The release group of the last file, preferred for the next one ("NTb")
  group?: string;
};

export type TPhrasalVerb = {
  key: string;
  text: string;
  indexes: number[];
  translations: string[];
};
