# Changelog

## v3.0.3 (09.01.2025)

### Enhancements

- Add save word button to main translation

## v3.0.2 (13.08.2024)

### Bugs

- Remove unused cookies permission

## v3.0.1 (12.08.2024)

### Bugs

- Fix LinguaLeo integration

## v3.0.0 (25.06.2024) 🎉🎉🎉

**The new Easysubs chapter!**

It's been a long journey of developing a new version and finally meet, a completely from scratch rewritten version. Hopefully all your favourite features are still in place and the annoying bugs are gone.

P.S. v2.0 failed to reach release 😅

## v1.5.7 (25.05.2022)

### Bugs

- Fix kinopub cdn

## v1.5.6 (11.09.2021)

### Enhancements

- Global code refactoring and update dependencies

### Bugs

- Fix work of the extension in Firefox 90+
- Fix work of the extension with Netflix after redesign
- Fix rewind with overlap subs and add disable rewind by subs config
- Fix response handler for add new word to puzzle-english.com service

## v1.5.5 (17.04.2021)

### Enhancements

- Fixed kinopub support
- Improved multi-line translation

## v1.5.4 (23.02.2021)

### Enhancements

- Netflix: fix detect current video id

## v1.5.3

### Enhancements

- Translations of one word should no longer cause errors related to rate limit
- Add more icon resolutions

### Bugs

- Fix UTF-8 characters for safari

## v1.5.2

### Enhancements

- Fix full sub translation

## v1.5.1

### Enhancements

- Fix single word translation. Full sub translation not working yet

## v1.5.0

### Enhancements

- Remove google analytics
- Support Coursera
- Support Safari 13

### Bugs

- Fix settings selectors on Netflix
- Fix long subtitles overflow

## v1.4.3

### Bugs

- Fix puzzle english and show service error
- Fix add words to lingualeo
- Fix Firefox selectors background color

## v1.4.2

### Enhancements

- Remove Google Analytics from `content_security_policy`

## v1.4.1

### Enhancements

- Remove Google Analytics collect data in Mozilla Firefox

## v1.4.0

### Enhancements

- Make subtitles white on youtube. Thanks @xamgore
- Rewrite remote GA script to local ga-lite script
- Add privacy policy

### Bugs

- Fix Adguard block elements with \*\_right classes (#162)

## v1.3.0

### Enhancements

- Add the ability to drag subtitles to any position on video
- Add subtitles backgrounds toggle to settings
- Add support youtube auto-translate subtitles

### Bugs

- Fix adding a word to lingualeo with new API
- Fix show youtube subs when disabled by default
- Fix CVE-2020-7598 and CVE-2019-20149

## v1.2.0

Starting from this version we support Chrome, Firefox, Opera and Yandex browsers.

### Enhancements

- Improve google analytics integration
- Support only google translation languages
- Support Firefox browser
- Support Opera browser
- Support Yandex browser
- Change `storage.sync` to `storage.local`
- Remove options page
- Improve promotional image

### Bugs

- Fix translating from languages with special characters
- Fix small font-size in full screen on YouTube

## v1.1.0

### Enhancements

- Remove contextMenus permissions and add all_urls
- Add Russian localization

### Bugs

- Fix icons border
- Fix subtitle rewind with overlapping subtitles
- Fix slice error when don't have alternative translations

## v1.0.1

### Enhancements

- Fix hosts permissions for non https urls
- Unification Easysubs spelling
- Fix youtube logo on landing for users with adblock
- Update extension description

## v1.0.0

Yippee! The long-awaited release.
The basic set of features is completed and will continue to focus on improving stability and communicating with the community.
The extension will be available soon in the chrome web store.

### Enhancements

- Remove `console.log` in production version
- Add stylization of scrollbar of alternative translations
- Remove activeTab permission
- Add project landing page
- Auto detect source language
- Close setting popup on outside click
- Add increase subs delay to 1 sec by press alt + click and 5 sec by press shift + click
- Add the ability to force rewind to subs even if they are further than 5 seconds
- Add production config
- Add support multiple subs at one time
- Improve readme and add Russian version

### Bugs

- Fix setting icon styles on netflix
- Fix subs delay freezes with frequent button presses
- Fix auto play after show full sentence translation
- Fix react state update on an unmounted component
- Fix rewind by 5 seconds if have a current sub

## v0.7.0

Additional subtitle features and general interface enhancements.

### Enhancements

- Add the ability to upload custom subtitles
- Add subtitles delay settings
- Add subtitles size settings
- Fix setting popup size and styles
- Fix subtitles responsive styles
- Add google analytics

### Bugs

- Fix rewinding after disable extension
- Fix closing popup translation of the full sentence after manually stopping the video

## v0.6.1

### Bugs

- Remove jekyll config since it conflicts with chrome

## v0.6.0

The main functionality is implemented, ahead of the testing phase and bringing to production status.

### Enhancements

- Add global extension menu
- Improve settings styles
- Add ability to disable progress bar
- Disable auto playback after manually stopping the video
- Kinopub: fix styles after update video player
- Add translate word highlight
- Youtube: add support subtitle selection
- Netflix: add support subtitle selection
- Netflix: add the ability to rewind by subs
- Netflix: show all available audio tracks and subtitles regardless of region
- Netflix: load subtitles without reloading page
- Rewind by click on the subtitles progress bar

### Bugs

- Netflix: Fix freezes after rewind page

## v0.5.0

Global change: template rendering rewritten to React.

### Enhancements

- Remove Onvix. Service no longer works.
- Add support words learning services
- Add support Puzzle English learning service
- Add support LinguaLeo learning service
- Add support English With Fun
- Translate popup now appears near the word, and not on top of the subtitles
- Improve subtitles position
- Rewrite template rendering to React

### Bugs

- Fix frequency points are not always displayed on the right
- Fix blocks of different parts of speech may not be aligned evenly
- Fix impossible to move the cursor to the pop-up translation of a word from the second line
- Fix injecting js when supported service is not detected
- Kinopub: Fix start when player loads before extension

## v0.4.0

Global change of the extension initialization model. Now initialization occurs by sending custom events from services.

### Enhancements

- KinoPub: add support subtitle selection
- Add automatic reload Netflix video page for load subtitles
- Add enable/disable button to settings page
- Add settings page

### Bugs

- Fix Netflix movies subtitles
- Fix bug with subtitles containing `<c>` tag

## v0.3.0

### Enhancements

- Fix styles for translate block with long text
- Don’t hide translate popup on mouseover
- Add Netflix base integration (only after refresh on video page and without rewind to sub)
- Increase font size in fullscreen
- Fix youtube fullscreen styles
- Add support [kino.pub](https://kino.pub)
- Rewind only 5 seconds if the next phrase is more than 5 seconds

### Bugs

- Fix youtube fullscreen styles

## v0.2.1

### Bugs

- Fix styles sentence translation and subs wrap
- Fix bug with frequent translation requests

## v0.2.0

### Enhancements

- Show alternative translations
- Add translate full sentence by click
- Load subtitles for Onvix films
- Add extension icon

### Bugs

- Fix long subtitles background
- Fix translation position with multiline subtitles
- Fix slow stop progress bar
- Fix error when trying to translate non-text symbols
- Fix hide translation when subtitle ended

## v0.1.0

This is the first release and the beginning of a long journey.  
MVP is already working but may contain many bug and limitations.

### Features

- Support [onvix](http://onvix.co) serials
- Support Youtube videos and premium
- Word translation when cursor hover
- Rewind to previous and next sub
- Subtitles progress bar

### Limitations

- Support for translation only from English into Russian
- You must manually select the original soundtrack
- The extension cannot be turned off and shows endless loading of subtitles on other audio tracks
