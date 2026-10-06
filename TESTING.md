# Testing

EasySubs has two test suites, both built on the playground's data: the subtitles in `playground/public/subs` and the
offline translations in `playground/fixtures/translations`.

| Suite       | Command         | Where              | What it runs                                                                              |
| ----------- | --------------- | ------------------ | ----------------------------------------------------------------------------------------- |
| Unit        | `pnpm test`     | `src/**/*.test.ts` | Models, utils, learning services and the background script in Vitest + jsdom              |
| Integration | `pnpm test:e2e` | `e2e/*.spec.ts`    | The whole content script in the playground page (`pnpm playground`), driven by Playwright |

`pnpm test` watches in a terminal and runs once in CI; `pnpm test:coverage` writes a coverage report to `coverage/`.
Run `pnpm exec playwright install chromium` once before the integration tests; they start the playground themselves
or reuse a running one.

## Unit tests

- `vitest.config.ts` — the aliases of `vite.config.ts`, jsdom, mocks reset before every test
- `test/chrome.ts` — `chrome.*`: storage in memory, `runtime.sendMessage` delivered to the `onMessage` listeners of the
  test file. Importing `src/pages/background` registers the real background, importing
  `playground/src/mockBackground` the offline one. A test answers a single message with
  `chromeMock.runtime.sendMessage.mockResolvedValueOnce(...)` and reads what was sent with `sentMessages(type)`
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
- `recordSpeech()` to record pronounced words, `messages(type)` to read what the content script sent

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
  translating again into a new language, line translation by every service, failures, phrasal verbs (English into
  Russian only) and the background's requests to Google, DeepL, Bing, Yandex and ChatGPT
- E2E: hovered word, alternatives with parts of speech, dictionary links (English only), pronunciation, one request
  per word, the language from the settings or asked for when it matches the subtitles, the whole line, phrasal verbs,
  Bing/DeepL/ChatGPT with their API key dialogs, a failing service, Spanish into English

**Second subtitle line**

- Unit: picking the source (track, YouTube auto-translate, translator, already in the language), anchoring a track to
  the main cues, the translation window and batch limits, batches by Google, DeepL and ChatGPT, the cache, the language
  picker and its status line, the settings, V and R, the services' track lists (Netflix, YouTube, Coursera, KinoPub),
  the model: loading, delay, reloads, translating as the video plays and after seeks, failures, hiding
- E2E: off by default, the Spanish track, translating into Russian in one request and from the cache after a reload,
  translating into Spanish in place of the Spanish track,
  Same as translation, a failed translation, the DeepL key dialog, above, top of the player and dragging, size, color
  and background, blurred until hover or pause, V and R

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
