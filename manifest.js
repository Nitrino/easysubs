import fs from "node:fs";
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));

// The streaming services EasySubs runs on
const MATCHES = [
  "https://www.netflix.com/*",
  "https://www.youtube.com/*",
  "https://www.coursera.org/*",
  "https://kinopub.net/*",
  "https://kino.watch/*",
  "https://kinopub.cc/*",
  "https://app.plex.tv/*",
  "https://plex.ukrapka.tech/*",
  "https://www.udemy.com/course/*/learn/lecture/*",
  "https://hd.kinopoisk.ru/*",
  "https://www.amazon.de/Amazon-Video/*",
  "https://www.primevideo.com/*",
  "https://www.amazon.de/*/video/*",
  "https://inoriginal.online/*",
];

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */

const manifest = {
  manifest_version: 3,
  default_locale: "en",
  name: "__MSG_appName__",
  version: packageJson.version,
  description: "__MSG_appDescription__",
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-128.png",
  },
  icons: {
    128: "icon-128.png",
  },
  content_scripts: [
    {
      matches: MATCHES,
      js: ["src/pages/contentInjected/index.js"],
      // KEY for cache invalidation
      css: ["assets/css/contentStyle<KEY>.chunk.css"],
    },
    // Copies the audio players append to Media Source Extensions while the spoken-word experiment listens ahead
    // (src/audio/readAhead.ts); it has to patch MediaSource before the player starts
    {
      matches: MATCHES,
      js: ["assets/js/mseTap.js"],
      run_at: "document_start",
      world: "MAIN",
    },
  ],
  // unlimitedStorage: found subtitle files and translations are kept on the device
  // offscreen: the speech models of the spoken-word experiment (src/pages/offscreen)
  permissions: ["scripting", "storage", "unlimitedStorage", "activeTab", "offscreen"],
  optional_host_permissions: ["*://*/*"],
  // tabCapture: "Listen to this tab" in the popup, asked for on first use, as it warns of reading all websites
  optional_permissions: ["tabCapture"],
  host_permissions: [
    "https://translate.google.com/*",
    "http://localhost:8765/*",
    "https://api.lingualeo.com/*",
    "https://puzzle-english.com/*",
    "https://api-free.deepl.com/*",
    "https://api.deepl.com/*",
    "https://www2.deepl.com/*",
    "https://www.bing.com/*",
    "https://api-edge.cognitive.microsofttranslator.com/*",
    "https://translate.yandex.net/*",
    "https://api.openai.com/*",
    "https://dict.youdao.com/*",
    // Subtitles found online (src/subsSources): OpenSubtitles, its file host, the Stremio mirror and Cinemeta,
    // Addic7ed through Gestdown, SubDL, SubSource and Jimaku
    "https://api.opensubtitles.com/*",
    "https://vip-api.opensubtitles.com/*",
    "https://www.opensubtitles.com/*",
    "https://opensubtitles-v3.strem.io/*",
    "https://v3-cinemeta.strem.io/*",
    "https://api.gestdown.info/*",
    "https://api.subdl.com/*",
    "https://dl.subdl.com/*",
    "https://api.subsource.net/*",
    "https://jimaku.cc/*",
    // Yandex's recognition of the video for the spoken-word experiment (src/utils/yandexWordTimes.ts): the VOT proxy
    // and Yandex's subtitle files
    "https://vot-worker.eu.cc/*",
    "https://brosubs.s3-private.mds.yandex.net/*",
  ],
  content_security_policy: {
    // WebAssembly for ONNX Runtime in the offscreen document
    extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'",
  },
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "icon-128.png", "icon-34.png"],
      matches: ["*://*/*"],
    },
  ],
  browser_specific_settings: {
    gecko: {
      id: "{4077aa9d-b753-4913-8e52-27ef408d4c82}",
    },
  },
};

export default manifest;
