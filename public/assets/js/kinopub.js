console.log("kinopub.js loaded");
if (window.playerInstance) {
  console.log("kinopub.js playerInstance exists");
  window.playerInstance.on("captionsChanged", () => {
    const track = window.playerInstance.getConfig().captionsTrack;
    const label = track ? track.label : null;
    window.dispatchEvent(
      new CustomEvent("kinopubCaptionsChanged", { detail: label })
    );
  });

  window.playerInstance.on("firstFrame", () => {
    const playlistUrl = window.playerInstance.getConfig().playlistItem.file;
    console.log("kinopubFirstFrame+++++++++++");
    window.dispatchEvent(
      new CustomEvent("kinopubFirstFrame", { detail: playlistUrl })
    );
  });
}
