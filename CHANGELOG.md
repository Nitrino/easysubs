# Changelog

## Unreleased

### Enhancements

- Add stylization of scrollbar of alternative translations
- Remove activeTab permission
- Add project landing page
- Auto detect source language
- Close setting popup on outside click
- Add increase subs delay to 1 sec by press alt + click and 5 sec by press shift + click
- Add the ability to force rewind to subs even if they are further than 5 seconds
- Add production config
- Add support multiple subs at one time

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
