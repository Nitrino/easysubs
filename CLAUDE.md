# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasySubs is a browser extension that helps users learn languages by watching movies and TV shows. It provides word translation, subtitle features, and integration with learning services like Anki, LinguaLeo, and Puzzle English. The extension supports multiple streaming platforms including YouTube, Netflix, KinoPub, and Coursera.

## Development Commands

- `pnpm build` - Build extension for Chrome (includes TypeScript check)
- `pnpm build:firefox` - Build extension for Firefox
- `pnpm dev` - Start development with hot reload and watch mode
- `pnpm dev:firefox` - Start Firefox development mode
- `pnpm playground` - Start the playground at http://localhost:5180 (local video player running the extension from `src/` with HMR)
- `pnpm test:e2e` - Run the Playwright integration tests from `e2e/` against the playground
- `pnpm test` - Run the Vitest unit tests (`src/**/*.test.ts`); `pnpm test:coverage` for a coverage report
- `pnpm lint` - Run ESLint on TypeScript/JavaScript files
- `pnpm lint:fix` - Auto-fix linting issues
- `pnpm prettier` - Format code with Prettier
- `pnpm expressions [language...] [--cache <dir>]` - Rebuild the phrasal verb and idiom lists in `public/expressions` from Wiktionary (see Expressions below)
- `pnpm dictionaries [pair...] [--cache <dir>]` - Build the Wiktionary dictionaries for hovered words into `dictionaries/` (see On-Device Translation below)
- `pnpm bergamot-models [language...]` - Mirror Mozilla's Firefox Translations models into `bergamot-models/` (see On-Device Translation below)

## Testing

How the unit and integration tests are set up, their helpers, the known bugs they mark and what they cover: [TESTING.md](TESTING.md).

## Releasing

To cut a new release (version bump, changelog, release commit, GitHub release, build + versioned zip), follow the step-by-step guide in [RELEASING.md](RELEASING.md).

## Architecture

### State Management

Uses Effector for state management with these main models:

- `src/models/streamings/` - Current streaming service detection and management
- `src/models/settings/` - Extension settings and preferences
- `src/models/subs/` - Subtitle data and operations
- `src/models/translations/` - Translation data and caching
- `src/models/expressions/` - Phrasal verbs, idioms and other expressions in the subtitles (see below)
- `src/models/videos/` - Video player state and time tracking
- `src/models/secondarySubs/` - The second subtitle line (see below)
- `src/models/foundSubs/` - Subtitles found online or opened from a file (see below)
- `src/models/spokenWord/` - Highlighting the word being said, an experiment (see below)
- `src/models/learning/` - Adding a word to the learning service, with its line for Anki (see Anki Cards below)

### Browser Extension Structure

- `src/pages/content/` - Content scripts injected into streaming websites
- `src/pages/background/` - Service worker/background script
- `src/pages/popup/` - Extension popup interface
- `src/pages/offscreen/` - Offscreen document (Chrome) running the speech models and tab capture of the spoken-word experiment
- `public/` - Static assets including manifest and localization files

### Streaming Service Integration

Each streaming service implements the `Service` interface defined in `src/streamings/service.ts`:

- `getSubs()` - Fetch subtitles for a language
- `getSubsContainer()` - DOM element for subtitle rendering
- `getSettingsButtonContainer()` - Where to inject settings button
- `getSettingsContentContainer()` - Where to render settings panel
- `isOnFlight()` - Check if service is live/streaming
- `init()` - Initialize service-specific functionality
- `getSubsTracks()` (optional) - The video's other subtitle tracks that `getSubs()` can load, for the second line. Services that read lines off the page (Amazon, Kinopoisk, Plex, Udemy, Netflix on-flight) don't have it
- `getVideoKey()` (optional) - The video playing where the page's address doesn't change between videos (Jellyfin's item id, InOriginal's episode id), for what's remembered per video (`src/utils/videoKey.ts`)
- `adjustCaptions()` (optional) - Moves found subtitle files the way the service moves its own tracks (Netflix's ad breaks)
- `getTitle()` (optional) - What's playing (title, year, season and episode, IMDb id when known), for the search for subtitles online. Netflix (its player state through `public/assets/js/netflix.js`, else the title over the player), InOriginal (the subtitle paths), Jellyfin (its item API) and the playground have it

### Second Subtitle Line

A second line under or above the subtitles, or in its own draggable block at the top of the player (`#es-top`), set up in the settings' Second line tab and off by default:

- `src/utils/resolveSecondarySubs.ts` picks the source for the chosen language: a track of the video (YouTube's `tlang` auto-translate counts as one), the translator otherwise, or nothing when the subtitles are already in that language. A language picked under Auto-translate is always translated, even where the video has a track in it (`translate: true` in the saved choice)
- A track is anchored to the main cues by overlap (`src/utils/anchorSubs.ts`); the delay buttons and Netflix ad reloads move both tracks
- Translation runs about two minutes ahead of the playhead in batches (`src/utils/secondaryTranslationWindow.ts`) through the background's `translateBatch` message (`src/utils/translateBatch.ts`: Google with lines joined by newlines, DeepL as a list, ChatGPT through anylang's `translateBatch`), line by line on services that show one line at a time, and is cached in `chrome.storage` per video, track, language and translator (`src/utils/translationCache.ts`)
- The second line uses Google unless DeepL, ChatGPT or Chrome is picked for it in the Translator row. Chrome's translator runs in the content script and waits for the subtitles' language
- `src/utils/secondarySubsKeys.ts`: V shows or hides the line for the current video, holding R reveals it when it's blurred until hover or pause; both only while the line is on

### Subtitles Found Online

A search sheet in place of the settings panel finds subtitles for the video and loads them as the main line or the second line. It opens from the Subtitles tab's "Subtitles from" row, the second line's picker (Found online group) and the link under a translated second line:

- `src/subsSources/` runs in the background (`lookupTitle`, `searchSubtitles`, `downloadSubtitle`, `opensubtitlesLogin` messages): OpenSubtitles.com (EasySubs' key from `VITE_OPENSUBTITLES_API_KEY` at build time; users may sign in; `session.ts` keeps the password and the 24-hour token in the background, pages only get the username), the Stremio mirror of OpenSubtitles (no key, used when the day's downloads are used or OpenSubtitles can't be reached), Addic7ed through Gestdown, SubDL/SubSource/Jimaku with the user's own keys, and Cinemeta for a title's IMDb id. `files.ts` unzips, decodes old code pages and converts ASS; `rank.ts` puts the service's own release first (NF on Netflix)
- `src/models/foundSubs/` keeps what's loaded on the current page. A found main line goes through `ownSubsLoaded` and is pinned (`$pinnedSubs`): the service's track changes don't replace it until "From <service>" is picked. A found second line is a `found` source of the second line, anchored like a track
- Auto-sync (`src/utils/alignSubs.ts`) runs on load when the video has a track: it tries shifts up to ±60 s and the 25 ↔ 23.976 fps stretch against the main line (or, for a found main line, the service's track), and is skipped for releases of the service itself; the sheet shows the shift with Undo
- What's loaded on a video is remembered with its timing (`$foundSubsByVideo`) and the files are kept on the device (`src/utils/foundSubsCache.ts`), so a reload costs no download. The last file of a show is offered for its next episode (Off/Ask/Load under Sources)
- Files are also opened from the settings or dropped on the player (`src/utils/subtitleDrop.ts`, Shift for the second line); ads and, if asked, sound descriptions are removed (`src/utils/cleanFoundSubs.ts`)

### Spoken Word Highlight (experiment)

The word being said lights up in the subtitles. Off by default; everything is in the Experiments tab, built to compare where word times come from and keep the best:

- Sources (`TWordTimingSource`, `src/models/spokenWord`): `file` (the subtitles' own times: YouTube's auto-generated json3 `segs`, kept as `words` relative to the cue in `src/streamings/youtube.ts`, and WebVTT `<00:00:01.500>` timestamps, `src/utils/wordTiming/fileWords.ts`), `captions` (the video's auto-generated track in the same language matched to the cues by words, `transfer.ts`), `yandex`, `whisper`, `aligned` (wav2vec2), `speech` (the estimate fitted into detected speech, `speech.ts`) and `estimate` (the line's words at the video's learned speaking rate, `estimate.ts`). "Best available" takes them in that order; a picked source leaves lines without its times unlit
- Compare sources shows every source's times for the line on screen with the playhead and each one's average start error against the most precise available (`SpokenWordCompare.tsx`)
- Yandex (`src/utils/yandexWordTimes.ts`, background `yandexWordTimes` message): Yandex Browser's video subtitles with timed tokens through vot.js and the VOT proxy `vot-worker.eu.cc` (Yandex answers 402 to direct requests); public videos only
- Audio (`src/audio/session.ts`): the `<video>` element's `captureStream()` (refused for DRM), audio players buffered ahead copied from Media Source Extensions by the MAIN-world `public/assets/js/mseTap.js` and decoded with their container times (`containers.ts`, `readAhead.ts`), or the tab from the popup's "Listen to this tab" (`chrome.tabCapture`, an optional permission). All go onto one timeline by video time; live chunks are timed by the audio clock
- Speech detection by loudness in the page or Silero VAD; wav2vec2 alignment of each cue's audio (English, `ctcAlign.ts`) and Whisper word timestamps for 20 s windows run in the offscreen document with transformers.js (`src/audio/models.ts`), models downloaded from Hugging Face on first use, ONNX Runtime's WebAssembly shipped in `assets/ort` (`utils/plugins/copy-onnx-runtime.ts`). In the playground they run in a Web Worker (`playground/src/audioWorker.ts`)
- `window.easysubsAudioSession.debug()` shows what the audio analysis covered and did

### Playground and Integration Tests

`playground/` is a Vite page that runs the real content and background scripts without the extension runtime:

- `playground/src/chromeShim.ts` - `chrome.storage` on localStorage, `chrome.runtime.sendMessage` straight to the background listeners in the same page
- `playground/src/playgroundService.ts` - `Service` for the local player; `main.ts` swaps it in for `getCurrentService()`
- `?background=mock` (default) uses `playground/src/mockBackground.ts`, which answers from the offline translations in `playground/fixtures/translations` (every direction between en, ru, es and de, written for the playground's subtitles; `pnpm playground:translations` lists missing words and lines; expressions like "pick up" are among the words) and falls back to `[ru] text`, and finds expressions with the real lists and matcher (the dictionary, Bergamot and Ollama answer from the same fixtures); `?background=live` runs `src/pages/background` with cross-origin requests proxied by the dev server (only `host_permissions` hosts) and `/expressions/*.json` served from `public/expressions`
- `?subs=en|es|` picks the subtitle track (the player's tracks are also the second line's, see `getSubsTracks()` in `playgroundService.ts`) and `?t=` the start time (20 s by default); fixtures live in `playground/public/subs`, the video is generated by `playground/scripts/generate-sample-video.ts`
- `playground/src/movies.ts` lists open movies (Sprite Fright, CC BY 4.0) that `pnpm playground:movies` downloads with subtitles into `playground/public/movies/` (gitignored); `?video=<id>` opens one
- `playground/src/screenshot.ts` serializes the page (DOM, CSS, current video frame) and posts it to the dev server's `/__capture`, which renders it with Playwright at the chosen size and scale into `playground/screenshots/` (gitignored)
- `e2e/playground.ts` is the Playwright page object; `window.easysubsPlayground.messages` records every background message and `window.easysubsPlayground.mockAnswers` replaces answers of the mock background
- The mock background answers the subtitle sources from `playground/src/mockSubtitles.ts`: the sample is "The Night Train" S1 E2 (`getTitle()` in `playgroundService.ts`), found in English and Spanish as differently timed releases
- Unit tests use `test/chrome.ts` for `chrome.*` and can import `playground/src/mockBackground.ts` to get the same offline answers

### Component Architecture

- React components use TypeScript and SCSS for styling
- Main UI components: `Settings`, `Subs`, `ProgressBar`
- Uses React Draggable for moveable subtitles
- Tailwind CSS for utility classes

### Translation System

- Google Translate integration for word and phrase translation
- Batch and single word translation fetchers
- Chrome's built-in Translator API (`src/utils/chromeTranslator.ts`) as the "Chrome (on device)" translation service and second line translator: offered only where the browser has it, called from the content script (it isn't available in workers), Google where it can't translate a pair. Chrome downloads a pair's model only during a click, so picking it starts the download (`src/models/settings/init.ts`)
- Hovered words go to the Dictionary row's service (`$dictionaryService`). Google's dictionary, a Wiktionary dictionary on the device, ChatGPT and Ollama give a word's meanings with parts of speech (ChatGPT and Ollama answer the JSON prompt of `src/utils/llmWord.ts`); DeepL, Bing, Yandex, Chrome and Bergamot give one translation, the word translated as text. The menu tags each (`DICTIONARY_DETAILS` in `src/utils/dictionaries.ts`). Expressions follow the row too, unless ChatGPT or Ollama is the translation service, which translates them in context. Bergamot and Ollama are also translation services and second line translators, see On-Device Translation below
- Phrasal verbs, idioms and set phrases, see Expressions below
- Export to learning services (Anki, LinguaLeo, Puzzle English), see Anki Cards below
- Word pronunciation from the service chosen in the settings (`$ttsService`): the background fetches Google, Youdao, Wiktionary or ChatGPT audio (`src/utils/tts/`, falling back to Google) and answers the `pronounce` message with a data: URL; `src/models/pronunciation` plays it through Web Audio and falls back to the browser's `speechSynthesis`

### On-Device Translation

Translation without online services, each for the languages it has:

- Wiktionary dictionaries (`src/utils/dictionary`): a gzipped file per pair, English and one of ru, uk, es, de, fr, it, pt, nl, pl, tr, ja, zh, ko into it, and ru, es, de, fr, it, pt, nl into English (`DICTIONARY_PAIRS`). `scripts/dictionaries/build.ts` builds them from the kaikki.org dumps the expressions use: an English word's meanings with their translation tables (ordered by Wiktextract's sense scores, the target language's words glossed with it first when the main sense has no table, like "dog"), another language's words with their English glosses, and the inflected forms that lead to the dictionary form ("went" → "go"). The background downloads a pair from the GitHub release `DICTIONARIES_RELEASE` when the subtitles' language is known, keeps it with the Cache API (`src/utils/onDeviceFiles.ts`) and answers `dictionaryLookup`; words it lacks go to the translation service (Google's dictionary when that's Google). The popover shows each meaning's note and the dictionary form. Expressions use it too
- Bergamot (`src/bergamot`), the engine of Firefox Translations: `@browsermt/bergamot-translator`'s worker, glue and WebAssembly ship in `assets/bergamot` (`utils/plugins/copy-bergamot.ts`). Mozilla's models (MPL-2.0) come from EasySubs' mirror, the GitHub release `BERGAMOT_MODELS_RELEASE` with its `models.json`, made by `scripts/bergamot-models/mirror.ts`: Mozilla's CDN refuses browsers other than Firefox. Between English and another language one model, through English otherwise; three stay loaded. A service worker can't start workers, so in Chrome it runs in the offscreen document (`src/bergamot/client.ts`); Firefox's background page runs it itself. The `bergamot` message translates, tells a pair's status and prepares it; Google translates what it can't. A hovered word or expression is translated as it's used in its line (`src/utils/wordInLine.ts`): its words are marked with `<b>` and the line translated in Bergamot's HTML mode, which moves the marks to the words they became ("pick up" → "взять" in "I just need to pick up my keys"). With Bergamot as the Dictionary the word is translated alone and in its line in one request, and both show when they differ ("leaves" → "уходит" in its line, "листья" alone); with Wiktionary as the Dictionary and Bergamot as the translation service it's the popover's title over Wiktionary's meanings (`TWordTranslation.inLine`, with a quiet "In this line" badge), unless it only repeats the first meaning in another form (`repeatsTranslation`). ChatGPT and Ollama as the Dictionary get the line too and answer the same `inLine`. "+" adds the dictionary forms (the word's lemma and the first meaning), the line goes to Anki as context. Translations for a line are kept per line (`TWordTranslation.context`)
- Ollama (`src/utils/ollama.ts`): the user's own server through its OpenAI-compatible API (anylang's ChatGPT translator with another origin), for lines, the second line, expressions in context and words as a dictionary (`ollamaWord`, JSON). Ollama refuses extension origins unless `OLLAMA_ORIGINS` allows them, so a declarativeNetRequest session rule sets the Origin of the extension's requests to it (not pages', `tabIds: [-1]`). The address and model are set in `OllamaModal.tsx`
- `OnDeviceStatus.tsx` shows under the settings rows what a pair needs and starts its download; the playground serves `dictionaries/` and `bergamot-models/` built locally instead of the releases

### Anki Cards

The word stays what a card teaches; the subtitle line it was added from comes with it. Each part is a toggle under the Learning service row when Anki is picked (`$ankiContext`):

- `addWordFx` (`src/models/learning`) collects the line with the word or the expression's words in bold (`src/utils/wordContext.ts`), its translation (the second line when it shows the translation language, the translation service otherwise), the frame on screen (`src/utils/videoFrame.ts`, none for DRM video, which draws black), the line's sound and where it's from (the service's title or the page's, linked back to the moment on YouTube)
- The sound is cut from the audio the player buffered: `public/assets/js/mseTap.js` copies what players append to Media Source Extensions to consumers by name (`clips`, `readAhead`), keeping the latest 2 MB for one that starts late; `src/audio/bufferedAudio.ts` puts the pieces back into segments (`SegmentSplitter` in `containers.ts`: YouTube appends whole clusters at first, then any piece), keeps them around the playhead and decodes the line ±250 ms into a 22.05 kHz WAV. Players that don't stream through MSE (the playground) and DRM audio give no sound
- `src/learning-service/ankiNote.ts` is the Easysubs note type (Word, Translation, Part of Speech, Context, Context Translation, Picture, Audio, Source, Examples) and its templates. Picture and sound go to Anki's media with `storeMediaFile`. A note type of the first version gets the new fields with `modelFieldAdd` and the new templates (a schema change: Anki asks for a full sync once)
- Adding a word that's in Anki puts the new line on the front of its card and the one before among the examples on the back, up to 3 lines; the examples' sounds are `<audio>` players, as Anki plays every `[sound:]` of a side. A line the card has already isn't added again

### Expressions

Phrasal verbs, idioms, set phrases and German and Dutch separable verbs, in any subtitle language with a list (`EXPRESSION_LANGUAGES` in `src/utils/expressions/lexicon.ts`: en, de, es, fr, it, pt, ru, nl), translated into any language:

- `public/expressions/<language>.json` is built by `scripts/expressions/build.ts` (`pnpm expressions`) from kaikki.org's Wiktextract dumps of Wiktionary (CC BY-SA 4.0): each expression with its kind and inflected forms, and the forms of verbs that start expressions without forms of their own ("бить баклуши" → "бьёт баклуши", `src/utils/expressions/verbHeads.ts`). The pure transforms are in `scripts/expressions/wiktextract.ts`
- `src/utils/expressions/findExpressions.ts` indexes every form by its first word and matches a cue's words with per-language rules: an English object before the particle ("pick the box up"), a German or Dutch verb with its particle at the end of the clause ("rufe dich morgen an"), placeholders like `one's` and `someone`. `normalize.ts` is shared with the build
- The background's `findExpressions` message loads a language's list once and answers for a batch of cues; `src/models/expressions` sends the whole track once its language is detected, then only new cues
- Hovering a word of an expression shows it in `ExpressionTranslation.tsx` with the hovered word's own translation under it. Expressions are translated with Google's dictionary (`translateWordFull` on the dictionary form), with Chrome's translator when it's the translation service, and by ChatGPT when it's the translation service: one `translateExpressions` request per cue for all its expressions, in context (`src/utils/chatGPTExpressions.ts`)

### Build System

- Vite for bundling with custom plugins for manifest generation
- Separate builds for Chrome and Firefox
- Hot module replacement for development
- TypeScript compilation with strict checking

## Key Files to Understand

- `src/pages/content/main.tsx` - Main content script entry point that sets up streaming service detection and UI rendering
- `src/models/init.ts` - Initializes all Effector models
- `manifest.js` - Dynamic manifest generation for different browsers
- `vite.config.ts` - Build configuration with extension-specific plugins
