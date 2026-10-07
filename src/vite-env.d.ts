/// <reference types="vite/client" />

interface ImportMetaEnv {
  // EasySubs' own OpenSubtitles API key; without it OpenSubtitles is skipped and its files come from the Stremio mirror
  readonly VITE_OPENSUBTITLES_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
