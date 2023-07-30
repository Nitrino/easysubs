const parseMock = JSON.parse;
const stringifyMock = JSON.stringify;
const jsonMock = JSON;

// Override the standard JSON.parse function.
// This is required to intercept subtitles from the server response.
JSON.parse = function () {
  const data = parseMock.apply(this, arguments);
  if (data && data.result && data.result.timedtexttracks) {
    // Sends subtitles from the site page to the extension via a browser event
    window.dispatchEvent(new CustomEvent("esNetflixData", { detail: data.result }));
  }
  return data;
};

// Override the standard JSON.stringify function.
// This is required for the Netflix server to respond with subtitles in vtt format.
// Also here we request all available audio tracks and subtitles, regardless of the region
JSON.stringify = function (response) {
  if (!response) return jsonMock.stringify.apply(this, arguments);
  const data = parseMock(stringifyMock.apply(this, arguments));

  let modified = false;
  if (data && data.params && data.params.showAllSubDubTracks != null) {
    data.params.showAllSubDubTracks = true;
    modified = true;
  }
  if (data && data.params && data.params.profiles) {
    data.params.profiles.push("webvtt-lssdh-ios8");
    modified = true;
  }

  return modified ? stringifyMock(data) : stringifyMock.apply(this, arguments);
};

// We find the global variable of the Netflix player to subscribe to its events and control the player
function getPlayer() {
  const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
  const sessionId = videoPlayer.getAllPlayerSessionIds()[0];
  return videoPlayer.getVideoPlayerBySessionId(sessionId);
}

function handleSeek(event) {
  console.log("handleSeek", event.detail);
  getPlayer().seek(event.detail);
}

window.addEventListener("esNetflixSeek", handleSeek);

function waitForElement(callBack) {
  window.setTimeout(function () {
    const player = getPlayer();
    if (player && document.querySelector(".watch-video--player-view")) {
      callBack(player);
    } else {
      waitForElement(callBack);
    }
  }, 500);
}

waitForElement(function (player) {
  window.isLoaded = true;
  // We send a message to the extension that the player has loaded and is ready to play
  window.dispatchEvent(new CustomEvent("esNetflixVideoReady"));

  if (window.currentLanguage !== player.getTimedTextTrack().bcp47) {
    window.currentLanguage = player.getTimedTextTrack().bcp47;
    // When changing subtitles, we send an event to the extension
    window.dispatchEvent(new CustomEvent("esNetflixSubtitlesChanged", { detail: window.currentLanguage }));
  }
});
