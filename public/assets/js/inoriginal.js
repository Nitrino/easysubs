function getConfig() {
  const playerScript = document.querySelector(".content script");
  if (playerScript) {
    const config = playerScript.innerHTML.match(/file:\s?([{[\s\S]*}])/)[1];
    window.dispatchEvent(new CustomEvent("esInoriginalPlayerConfig", { detail: config }));
  }
}

getConfig();

window.addEventListener("message", function ({ data }) {
  if (data.event === "new") {
    getConfig();
    window.dispatchEvent(new CustomEvent("esInoriginalVideoId", { detail: data.id }));
  }
  if (data.event === "started") {
    const label = window.playerjs.api("subtitle");
    window.dispatchEvent(new CustomEvent("esInoriginalVideoStarted", { detail: label }));
  }

  if (["subtitles", "subtitle"].includes(data.event)) {
    window.dispatchEvent(new CustomEvent("esInoriginalSubtitlesChanged", { detail: data.data }));
  }
});
