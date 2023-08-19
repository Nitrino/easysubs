console.log("Netflix script loaded");
const parseMock = JSON.parse;
const stringifyMock = JSON.stringify;

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
  if (!response) return stringifyMock.apply(this, arguments);
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
    if (player && player.isReady() && document.querySelector(".watch-video--player-view")) {
      callBack(player);
    } else {
      waitForElement(callBack);
    }
  }, 1000);
}

const playerHandler = () => {
  waitForElement(function (player) {
    const handleHistoryChange = (data) => {
      console.log("history changed", data);
      playerHandler();
      window.netflix.appContext.state.history.removeChangeListener(handleHistoryChange);
    };

    window.netflix.appContext.state.history.addChangeListener(handleHistoryChange);
    window.dispatchEvent(new CustomEvent("esNetflixVideoReady"));
    window.dispatchEvent(new CustomEvent("esNetflixSubtitlesChanged", { detail: player.getTimedTextTrack() }));

    player.addEventListener("timedtexttrackchanged", (data) => {
      window.dispatchEvent(new CustomEvent("esNetflixSubtitlesChanged", { detail: player.getTimedTextTrack() }));
    });
  });
};

playerHandler();
