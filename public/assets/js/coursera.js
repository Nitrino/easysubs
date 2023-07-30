function getLanguage(playerInstance) {
  return playerInstance.currentTrack()?.language || "";
}

function waitForElement(selector, callBack) {
  window.setTimeout(function () {
    const player = document.querySelector(selector).player;
    if (player) {
      callBack(player);
    } else {
      waitForElement(selector, callBack);
    }
  }, 500);
}

waitForElement(".video-js", function (player) {
  window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
  window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getLanguage(player) }));

  player.on("loadeddata", () => {
    window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
    window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getLanguage(player) }));
  });

  player.textTracks().on("change", () => {
    window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
    window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getLanguage(player) }));
  });
});
