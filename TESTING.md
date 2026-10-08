# Testing

EasySubs has two test suites, both built on the playground's data: the subtitles in `playground/public/subs` and the
offline translations in `playground/fixtures/translations`.

| Suite       | Command         | Where                                      | What it runs                                                                                            |
| ----------- | --------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Unit        | `pnpm test`     | `src/**/*.test.ts`, `scripts/**/*.test.ts` | Models, utils, learning services, the background script and the expression list build in Vitest + jsdom |
| Integration | `pnpm test:e2e` | `e2e/*.spec.ts`                            | The whole content script in the playground page (`pnpm playground`), driven by Playwright               |

`pnpm test` watches in a terminal and runs once in CI; `pnpm test:coverage` writes a coverage report to `coverage/`.
Run `pnpm exec playwright install chromium` once before the integration tests; they start the playground themselves
or reuse a running one.

## Unit tests

- `vitest.config.ts` — the aliases of `vite.config.ts`, jsdom, mocks reset before every test
- `test/chrome.ts` — `chrome.*`: storage in memory, `runtime.sendMessage` delivered to the `onMessage` listeners of the
  test file. Importing `src/pages/background` registers the real background, importing
  `playground/src/mockBackground` the offline one. A test answers a single message with
  `chromeMock.runtime.sendMessage.mockResolvedValueOnce(...)`, or the next message of a type with
  `answerNextMessage(type, answer)`, and reads what was sent with `sentMessages(type)`
- `test/chromeTranslator.ts` — `stubChromeTranslator()` puts Chrome's Translator API on `globalThis`, translating into
  `[chrome:ru] text`; `availability: "unavailable"` or `refuseCreate` make it fail like Chrome does
- `test/expressions.ts` — the expression lists of `public/expressions` as the background loads them
- `test/fixtures.ts` — the playground's subtitles (`playgroundCaptions("en")`, `playgroundSubs("en")`), its offline
  translations and `captions([start, end, text], ...)` for cues at chosen times
- `test/video.ts` and `test/service.ts` — a `<video>` that seeks and plays without media, a streaming service with the
  playground's tracks

Effector models are tested in scopes: `fork({ values: [[$video, video], [$translateLanguage, "ru"]] })`, then
`allSettled(event, { scope, params })` and `scope.getState($store)`. Store watchers (the `es-*` classes on `<body>`)
only run outside scopes, so tests of them call events directly.

## Integration tests

`e2e/playground.ts` is the page object. Besides opening the playground, seeking and reading the subtitles, it can:

- `choose("Learning service", "Anki")` in the settings, or `changeSettings(tab, change)` to open, change and close them
- `mockAnswer("translateFullText", { error: "..." })` to change what the offline background answers: by message type,
  or by AnkiConnect action (`"post:addNote"`)
- `loadSubtitles(srt)` to put cues at the times a test needs
- `openSearch()`, `result(release)` and `loadedFile()` for the search for subtitles online, in place of the settings
  panel
- `recordSpeech()` to record pronounced words, `messages(type)` to read what the content script sent
- `stubChromeTranslator()` before `open()` for Chrome's Translator API, which Playwright's Chromium has no models for

The tests start the playground on port 5180 or reuse the one running there. In a second checkout (a git worktree),
stop the other playground first, or the tests run against its code.

## Known bugs

A test of a known bug states the correct behavior and is marked `it.fails` (Vitest) or `test.fixme` (Playwright), with
a comment on the cause. When the bug is fixed, `it.fails` starts failing: turn it into `it`. There are none now.

## Coverage by feature

**Subtitles**

- Unit: parsing cues into words (punctuation, line breaks, italic/bold/underline, YouTube timing tags), the cue at a time, loading the
  player's track, turning subtitles off, files from the settings, reloading, on-flight services' repeated phrases,
  language detection, delay, auto pause
- E2E: the cue for the time and while playing, multi-line cues, italic and bold, following the player's track, files from the
  Inspector and from the settings, dragging, size following the player, the progress bar (cues around the time,
  seeking by click)

**Translation**

- Unit: Google's word answer (main translation, the five most common alternatives, synonyms), caching, pending state,
  translating again into a new language, line translation by every service, Chrome's translator and its fallback to
  Google, failures, and the background's requests to Google, DeepL, Bing, Yandex and ChatGPT
- E2E: hovered word, alternatives with parts of speech, dictionary links (English only), pronunciation, one request
  per word, the language from the settings or asked for when it matches the subtitles, the whole line,
  Bing/DeepL/ChatGPT with their API key dialogs, Chrome's translator (offered only where the browser has it), a
  failing service, Spanish into English

**Phrasal verbs and idioms**

- Unit: building the lists from Wiktionary records (kinds, forms, separable verbs, verb forms, merging), matching in
  English, German, Dutch, Spanish, French, Italian and Russian on the real lists (forms, an object before the
  particle, a particle at the end of the clause, placeholders, conjugated verb idioms, clause breaks), the
  background's lookup and loading, the model: one lookup per track once the language is known, new cues only,
  failures, hovering, translation by Google's dictionary, Chrome and ChatGPT (one request per cue), errors
- E2E: the popover with the expression, its translations and the word's own, one lookup message, a split phrasal
  verb, idioms, highlighting in the hovered cue only, ChatGPT's request for a line, adding one to Anki

**Second subtitle line**

- Unit: picking the source (track, YouTube auto-translate, translator, already in the language), anchoring a track to
  the main cues, the translation window and batch limits, batches by Google, DeepL, ChatGPT and Chrome, the cache, the language
  picker and its status line, the settings, V and R, the services' track lists (Netflix, YouTube, Coursera, KinoPub),
  the model: loading, delay, reloads, translating as the video plays and after seeks, failures, hiding
- E2E: off by default, the Spanish track, translating into Russian in one request and from the cache after a reload,
  translating into Spanish in place of the Spanish track,
  Same as translation, a failed translation, the DeepL key dialog, above, top of the player and dragging, size, color
  and background, blurred until hover or pause, V and R

**Subtitles found online**

- Unit: each source's requests and answers (OpenSubtitles with its limit and sign-in, the Stremio mirror, Addic7ed
  through Gestdown, SubDL, SubSource, Jimaku, Cinemeta), the mirror standing in for OpenSubtitles, ranking (the
  service's own release, the last release group), ZIPs, ASS and old code pages, cleaning ads and sound descriptions,
  Auto-sync (shift, 25 fps, too few lines), the file cache and the videos remembered, the services' titles (Netflix,
  InOriginal), the picker's Found online group, the model: searching for the title playing, loading on either line,
  Auto-sync on load, Undo and the shift, the service's track not replacing a found main line, removing, a file the
  user opened, the download count and the mirror after it, signing in and renewing the token, another visit of the
  video, the next episode (Ask, Load, Off)
- E2E: the search for the sample's episode, machine translations hidden, a Spanish second line synced −2.40 s, Undo,
  a 25 fps main line and back to the video's subtitles, the file back after a reload without a download, the mirror
  after the day's downloads, signing in, opening from the second line's picker and its status link, keys typed in the
  sheet kept from the player, a file opened from the settings, a file dropped with Shift

The mock background answers the sources from `playground/src/mockSubtitles.ts`: the sample is "The Night Train" S1 E2,
its English and Spanish files found as a Netflix release, an Addic7ed one 2.4 s late, a BluRay one timed for 25 fps and
a machine translation.

**Spoken word (experiment)**

- Unit: syllables and word weights, the speaking rate and the estimate (squeezing, pauses, two speakers, lines read off
  the page), YouTube's auto-generated words and line ends, WebVTT timestamps, times moving with a delayed line, matching
  another source's words to cues, fitting words into detected speech, the word at a time, Yandex's video addresses, the
  model: auto-generated captions loaded for the line's language, the source order, Yandex's answer and waiting; audio:
  16 kHz PCM, the timeline, speech by probabilities and loudness, MP4 and WebM segment times, CTC alignment, the job
  queue
- E2E: the estimated word lit while playing, WebVTT word timestamps, the comparison lanes with their errors, a picked
  source without times

**Navigation**

- Unit: next/previous/current cue, 5 s seeks when cues are far, Alt to force the jump, short YouTube cues, the
  keyboard handler (arrows only, once per press, off on on-flight services)
- E2E: ArrowRight/ArrowLeft/ArrowDown, Alt with far cues, the arrows back to the player when disabled

**Learning services**

- Unit: Anki (deck, note type, fields, duplicates, errors), LinguaLeo and Puzzle English answers, the background's
  requests to AnkiConnect, LinguaLeo and Puzzle English
- E2E: adding the main translation, an alternative and a phrasal verb to Anki; Anki duplicates and errors; LinguaLeo
  and its login hint; Puzzle English; no add buttons when disabled

**Settings and pausing**

- Unit: defaults, services, size, background opacity limits, API key dialogs, the `es-*` page classes, saving to
  `chrome.storage` under the settings' names and moving the ones v3.1.3 saved under unit ids
- E2E: turning EasySubs and the progress bar off, size and services after a reload, settings saved by v3.1.3, background and opacity, delay,
  auto pause, auto stop, pause while hovering and resume after, closing on a click outside

**Streaming services**

- Unit: detecting YouTube, Netflix, Coursera, KinoPub and Jellyfin, the stub elsewhere, Netflix's own seeking

## Not covered yet

- The streaming services' own code (subtitle downloads from YouTube, Netflix and others, their injected scripts): it
  needs recorded responses of each service. The second line's track lists are covered with made-up answers; whether
  YouTube still serves a track after its URL's `lang` or `tlang` changes, and whether Jellyfin exposes a second track
  with cues, needs the real services
- The extension popup (`src/pages/popup`)
- The playground with `?background=live`: it calls real translation services
- The subtitle sources against the real services (their answers are recorded by hand in the tests), Netflix's title in
  its player state and Jellyfin's item API
- Chrome's real Translator API: the tests stub it, Playwright's Chromium has no models. Whether a content script in a
  streaming site's frame may create translators needs desktop Chrome
