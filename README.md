<p align="center">
  <img height="80" src="./logo.png">
</p>
<p align="center">
  <h2 align="center">Learn languages with fun 🎉</h2>
</p>

Browser extension to learn languages by watching movies and TV shows.

## Installation

The extension supports Chrome, Firefox, Opera and Yandex. It should also work in other browsers that have WebExtensions API support, but it hasn't been tested yet.

**Release version available on [Chrome Web Store](https://chrome.google.com/webstore/detail/easysubs/ocelmccppkcibiflhhepafdjjomimddf?utm_source=github&utm_medium=social&utm_campaign=github) and [Firefox Browser Add-ons](https://addons.mozilla.org/en-US/firefox/addon/easysubs/?utm_source=github&utm_medium=social&utm_campaign=github).**

<a href="https://chrome.google.com/webstore/detail/easysubs/ocelmccppkcibiflhhepafdjjomimddf?utm_source=github&utm_medium=social&utm_campaign=github" target="_blank">
  <img src="./docs/img/chrome-store.png" alt="chrome store" width="220px">
</a>
<span><img width="30px"></img></span>
<a href="https://addons.mozilla.org/en-US/firefox/addon/easysubs/?utm_source=github&utm_medium=social&utm_campaign=github"
  class="btn -store cover__store" target="_blank">
  <img src="./docs/img/firefox-store.svg" alt="firefox store" width="220px">
</a>

## Build

1. Install node 12+
2. Clone repo `git clone git@github.com:Nitrino/easysubs.git`
3. Go to folder and install dependencies `cd easysubs && npm i`
4. Build extension `npm run build`

## Manual install

1. Download and unzip [latest version](https://github.com/Nitrino/easysubs/releases)
2. Open extensions page in browser:
    * For Chrome: `chrome://extensions/`
    * For Firefox: `about:debugging#/runtime/this-firefox`
    * For Opera: `opera://extensions`
    * For Yandex browser: `browser://tune/`
3. Turn on developer mode (for all except Yandex browser)
4. Load unpacked extension:
    * For Chrome and Opera: Click to `Load unpacked` button and select folder
    * For Firefox: Click to `Load temporary Add-on...` button and select folder
    * For Yandex browser: Drag and drop folder to extensions page

## Features

### Integration with multiple video services

The list of services will expand at the request of users.  
To use the plugin, you must have a subscription to the desired service.

**Now supported:**

- [Youtube (videos and originals)](https://www.youtube.com)
- [Netflix](https://www.netflix.com)
- [KinoPub](https://kino.pub)
- [Coursera](https://www.coursera.org)
- [English With Fun](https://english-with-fun.com)

### Word and full subtitle translation

Just hover over the word that you want to translate. The video will automatically pause and then start playing when you remove the cursor from the subtitles.  
In the translation popup of the word, you can see alternative translations with the frequency of use.
![word translation](screenshots/word.png)

Click on the subtitles to translate the whole sentence.
![word translation](screenshots/full-sub.png)

### Export words to learning services

The list of services will expand at the request of users.

**Now supported:**

- [LinguaLeo](https://lingualeo.com),
- [Puzzle English](https://puzzle-english.com)

For the export to work, you must be logged in to the learning service that you want to use (make sure it's the same browser). Then select the desired service in the extension settings.

![word translation](screenshots/select-service.png)

After which a ➕(plus) icon will appear near the words of the translation, by clicking on which the word is exported to the selected service.

![word translation](screenshots/export-to-service.png)

### Rewind to previous and next subtitle

Rewind to the previous sentence by pressing ⬅️ (left arrow).  
Rewind to the next sentence by pressing ➡️ (right arrow).

Rewind only works if the next/previous sentence is less than 5 seconds apart from the current sentence. Otherwise it'll rewinds 5 seconds.  
To force rewinding to the next/previous sentence use `alt (option for macOS) + arrow button`.

![word translation](screenshots/navigation.png)

### Subtitle progress bar

At the bottom of the player, there is a subtitles progress bar to simplify navigation between subtitles.  
Click on the progress bar to rewind the video to the desired spot.

![word translation](screenshots/progressbar.png)

### Subtitle settings and custom subtitles

The extension allows you to adjust the size of the subtitles and their delay.
The default subtitle delay step is 0.25 seconds.  
`alt (option for macOS) + click the ➕ or ➖ buttons` changes the delay by 1 second.  
`shift + click the ➕ or ➖ buttons` changes the delay by 5 seconds.

You can also upload your own custom subtitles. Supported are `srt` and `vtt` formats.

![word translation](screenshots/subtitles-settings.png)

### Additional features

- Show all available audio tracks and subtitles on Netflix regardless of region.

## Contributing

We are open to community help.  
To report a bug or feature offer, create [issue](https://github.com/Nitrino/easysubs/issues) and describe the question in detail.

You can also implement the desired feature and send a [pull request](https://github.com/Nitrino/easysubs/pulls). We recommend discussing the feature in issues tracker before implementation. This will help reduce your time.
