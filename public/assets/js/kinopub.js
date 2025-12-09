// Wait for Vidstack player to be available
function initEasySubsKinopub() {
  const player = document.querySelector("media-player");

  if (!player) {
    // Retry after a short delay if player not found yet
    setTimeout(initEasySubsKinopub, 500);
    return;
  }

  console.debug("EasySubs: Vidstack player found, initializing...");

  // Listen for text track changes (caption/subtitle selection)
  player.addEventListener("text-track-change", (event) => {
    const track = event.detail; // TextTrack | null
    const label = track ? track.label : null;
    console.debug("EasySubs: Text track changed:", label);
    window.dispatchEvent(
      new CustomEvent("kinopubCaptionsChanged", { detail: label }),
    );
  });

  // Listen for when the media can start playing
  // This fires when the source is loaded and ready
  player.addEventListener("can-play", () => {
    const { source } = player.state;
    const playlistUrl = source?.src;
    console.debug("EasySubs: Media can play, source:", playlistUrl);
    if (playlistUrl) {
      window.dispatchEvent(
        new CustomEvent("kinopubFirstFrame", { detail: playlistUrl }),
      );
    }
  });

  // Also listen for provider setup as a fallback
  // This ensures we catch the source even if can-play already fired
  player.addEventListener("provider-setup", () => {
    const { source } = player.state;
    const playlistUrl = source?.src;
    console.debug("EasySubs: Provider setup, source:", playlistUrl);
    if (playlistUrl) {
      window.dispatchEvent(
        new CustomEvent("kinopubFirstFrame", { detail: playlistUrl }),
      );
    }
  });

  // Listen for source changes (when user switches videos)
  player.addEventListener("source-change", (event) => {
    const source = event.detail;
    const playlistUrl = source?.src;
    console.debug("EasySubs: Source changed:", playlistUrl);
    if (playlistUrl) {
      window.dispatchEvent(
        new CustomEvent("kinopubFirstFrame", { detail: playlistUrl }),
      );
    }
  });
}

// Start initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEasySubsKinopub);
} else {
  initEasySubsKinopub();
}
