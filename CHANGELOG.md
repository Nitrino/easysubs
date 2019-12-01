# Changelog

## Unreleased

Global change: template rendering rewritten to React

### Enhancements

- Remove Onvix. Service no longer works.
- Add support words learning services and support LinguaLeo
- Add support English With Fun
- Translate popup now appears near the word, and not on top of the subtitles
- Rewrite template rendering to React

### Bugs

## 0.4.0

Global change of the extension initialization model. Now initialization occurs by sending custom events from services.

### Enhancements

- KinoPub: add support subtitle selection
- Add automatic reload Netflix video page for load subtitles
- Add enable/disable button to settings page
- Add settings page

### Bugs

- Fix Netflix movies subtitles
- Fix bug with subtitles containing `<c>` tag

## 0.3.0

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
