function getData(playerInstance) {
  return {
    lang: playerInstance.currentTrack()?.language || "",
    id: playerInstance.id_,
  };
}

const PLAYER_SELECTOR = ".video-js";
function waitForElement(selector, callBack) {
  window.setTimeout(function () {
    const player = document.querySelector(selector) && document.querySelector(selector).player;
    if (player) {
      callBack(player);
    } else {
      waitForElement(selector, callBack);
    }
  }, 500);
}

waitForElement(PLAYER_SELECTOR, function (player) {
  window.setInterval(function () {
    const player = document.querySelector(PLAYER_SELECTOR) && document.querySelector(PLAYER_SELECTOR).player;
    if (player) {
      window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getData(player) }));
    }
  }, 100);

  window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
  window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getData(player) }));

  player.on("loadeddata", () => {
    window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
    window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getData(player) }));
  });

  player.textTracks().on("change", () => {
    window.dispatchEvent(new CustomEvent("esCourseraRenderSettings"));
    window.dispatchEvent(new CustomEvent("esCourseraSubtitlesChanged", { detail: getData(player) }));
  });
});
