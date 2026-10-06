window.setInterval(() => {
  const player = document.getElementById("movie_player");
  const subsToggleElement = document.querySelector(".ytp-subtitles-button");

  if (player) {
    if (!window.isLoaded) {
      window.isLoaded = true;
      window.dispatchEvent(new CustomEvent("esYoutubeLoaded"));

      if (subsToggleElement && subsToggleElement.getAttribute("aria-pressed") === "true") {
        player.toggleSubtitles();
        player.toggleSubtitles();
      } else {
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: "" }));
      }
    }
  } else {
    window.isLoaded = false;
  }

  if (subsToggleElement) {
    if (window.subtitlesEnabled && subsToggleElement.getAttribute("aria-pressed") === "false") {
      window.subtitlesEnabled = false;
      window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: "" }));
    }
  }
}, 500);
((open) => {
  XMLHttpRequest.prototype.open = function (method, url) {
    if (url.match(/^http/g) !== null) {
      const urlObject = new URL(url);
      if (urlObject.pathname === "/api/timedtext") {
        window.subtitlesEnabled = true;
        const lang = urlObject.searchParams.get("tlang") || urlObject.searchParams.get("lang");
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsData", { detail: urlObject.href }));
        window.dispatchEvent(new CustomEvent("esYoutubeCaptionsChanged", { detail: lang }));
      }
    }
    open.call(this, method, url, true);
  };
})(XMLHttpRequest.prototype.open);

// The caption tracks of the current video for the second subtitle line, see getSubsTracks() in src/streamings/youtube.ts
window.addEventListener("esYoutubeGetTracks", () => {
  const player = document.getElementById("movie_player");
  const response = player && typeof player.getPlayerResponse === "function" ? player.getPlayerResponse() : null;
  const renderer = response?.captions?.playerCaptionsTracklistRenderer;
  const text = (value) => value?.simpleText ?? value?.runs?.map((run) => run.text).join("") ?? "";
  const list = {
    videoId: response?.videoDetails?.videoId ?? "",
    captionTracks: (renderer?.captionTracks ?? []).map((track) => ({
      languageCode: track.languageCode,
      kind: track.kind ?? "",
      name: text(track.name),
      isTranslatable: Boolean(track.isTranslatable),
    })),
    translationLanguages: (renderer?.translationLanguages ?? []).map((language) => ({
      languageCode: language.languageCode,
      name: text(language.languageName),
    })),
  };
  window.dispatchEvent(new CustomEvent("esYoutubeTracks", { detail: JSON.stringify(list) }));
});
