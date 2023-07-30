if (window.playerInstance) {
  window.playerInstance.on("captionsChanged", () => {
    const track = window.playerInstance.getConfig().captionsTrack;
    const label = track ? track.label : null;
    window.dispatchEvent(new CustomEvent("kinopubCaptionsChanged", { detail: label }));
  });

  window.playerInstance.on("firstFrame", () => {
    const playlistUrl = window.playerInstance.getConfig().playlistItem.file;
    window.dispatchEvent(new CustomEvent("kinopubFirstFrame", { detail: playlistUrl }));
  });
}
