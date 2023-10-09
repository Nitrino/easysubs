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
  getPlayer().seek(event.detail);
}

function getAdBreaks() {
  const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
  const sessionId = videoPlayer.getAllPlayerSessionIds()[0];
  videoPlayer.getPlaybackStateBySessionId(sessionId);
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
  }, 300);
}
function getCurrentBreak(player) {
  const videoPlayer = window.netflix.appContext.state.playerApp.getAPI().videoPlayer;
  const sessionId = videoPlayer.getAllPlayerSessionIds()[0];
  const adBreaks = videoPlayer.getPlaybackStateBySessionId(sessionId).adBreaks;
  const currentTime = player.getCurrentTime();
  const currentBreak = adBreaks.findLast((ad) => ad.locationMs <= currentTime);
  return currentBreak;
}

const playerHandler = () => {
  waitForElement(function (player) {
    const handleHistoryChange = (data) => {
      playerHandler();
      window.netflix.appContext.state.history.removeChangeListener(handleHistoryChange);
    };

    window.netflix.appContext.state.history.addChangeListener(handleHistoryChange);
    window.dispatchEvent(new CustomEvent("esNetflixVideoReady"));
    window.dispatchEvent(new CustomEvent("esNetflixSubtitlesChanged", { detail: player.getTimedTextTrack() }));
    const currentBreak = getCurrentBreak(player);
    if (currentBreak && currentBreak.ads) {
      window.dispatchEvent(new CustomEvent("esNetflixAddStateChanged", { detail: { currentBreak: currentBreak } }));
    }

    player.addEventListener("adsstatechanged", (data) => {
      const currentBreak = getCurrentBreak(player);
      if (currentBreak && currentBreak.ads) {
        window.dispatchEvent(new CustomEvent("esNetflixAddStateChanged", { detail: { currentBreak: currentBreak } }));
      }
    });
    player.addEventListener("timedtexttrackchanged", (data) => {
      window.dispatchEvent(new CustomEvent("esNetflixSubtitlesChanged", { detail: player.getTimedTextTrack() }));
    });
  });
};

playerHandler();

const observer = new MutationObserver((mutations, obs) => {
  const adDiv = document.querySelector(".watch-video--adsInfo-container");
  if (adDiv && !window.adShowed) {
    window.adShowed = true;
    document.body.classList.toggle("es-netflix-ad-showing");
  }
  if (!adDiv && window.adShowed) {
    window.adShowed = false;
    document.body.classList.toggle("es-netflix-ad-showing");
    const currentTime = document.querySelector("video").currentTime * 1000;
    window.dispatchEvent(new CustomEvent("esNetflixAddHide", { detail: currentTime }));
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
