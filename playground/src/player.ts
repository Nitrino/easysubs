// A small HTML5 player in a macOS window: the title over the video and a full-width glass control bar, after the
// Video.js player, that hide while the video plays. The native subtitles are left to the extension.

export type SubtitleTrack = { id: string; label: string; url: string };

export const FILE_TRACK_ID = "file";

const tracks: SubtitleTrack[] = [
  { id: "en", label: "English", url: "/subs/en.srt" },
  { id: "es", label: "Español", url: "/subs/es.srt" },
];

const PLAYBACK_RATES = [1, 1.25, 1.5, 2, 0.5, 0.75];
const IDLE_DELAY_MS = 2500;
// Telling a click (play/pause) from a double-click (full screen), as IINA does
const DOUBLE_CLICK_MS = 220;

export const playerRoot = document.querySelector<HTMLElement>(".pg-player");
export const video = playerRoot.querySelector("video");
export const trackSelect = playerRoot.querySelector<HTMLSelectElement>(".pg-tracks");
// The capsule around the subtitles menu: EasySubs inserts its button right before it
export const trackMenu = playerRoot.querySelector<HTMLElement>(".pg-menu");
const osc = playerRoot.querySelector<HTMLElement>(".pg-osc");
const title = playerRoot.querySelector<HTMLElement>(".pg-titlebar__title");
const seekInput = playerRoot.querySelector<HTMLInputElement>(".pg-seek__input");
const seekTooltip = playerRoot.querySelector<HTMLElement>(".pg-seek__tooltip");
const currentTimeLabel = playerRoot.querySelector<HTMLElement>(".pg-time--current");
const endTimeButton = playerRoot.querySelector<HTMLButtonElement>(".pg-time--end");
const speedButton = playerRoot.querySelector<HTMLButtonElement>(".pg-speed");

const trackListeners = new Set<(track: SubtitleTrack | null) => void>();

export const getTrack = (id: string) => tracks.find((track) => track.id === id) ?? null;
export const getActiveTrack = () => getTrack(trackSelect.value);

export function onTrackChange(listener: (track: SubtitleTrack | null) => void) {
  trackListeners.add(listener);
  return () => trackListeners.delete(listener);
}

function selectTrack(id: string) {
  trackSelect.value = id;
  const track = getActiveTrack();
  showTrackState(track);
  trackListeners.forEach((listener) => listener(track));
}

// Renders the current subtitles again, e.g. after the player was resized
export const refreshSubtitles = () => selectTrack(trackSelect.value);

// The menu shows only an icon, so the track name goes to its tooltip
function showTrackState(track: SubtitleTrack | null) {
  trackMenu.classList.toggle("pg-menu--off", !track);
  trackMenu.title = track ? `Subtitles: ${track.label}` : "Subtitles off";
}

// Adds a subtitle file picked in the inspector and switches to it
export function setFileTrack(label: string, url: string) {
  const existing = getTrack(FILE_TRACK_ID);
  if (existing) {
    URL.revokeObjectURL(existing.url);
    tracks.splice(tracks.indexOf(existing), 1);
  }
  tracks.push({ id: FILE_TRACK_ID, label, url });
  renderTrackOptions();
  selectTrack(FILE_TRACK_ID);
}

export function openVideoFile(file: File) {
  if (video.src.startsWith("blob:")) URL.revokeObjectURL(video.src);
  video.src = URL.createObjectURL(file);
  title.textContent = file.name;
}

function renderTrackOptions() {
  const selected = trackSelect.value;
  trackSelect.replaceChildren(
    new Option("Subtitles off", ""),
    ...tracks.map((track) => new Option(track.label, track.id)),
  );
  trackSelect.value = selected;
}

const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(seconds, 0) : 0;
  return `${Math.floor(safe / 60)}:${Math.floor(safe % 60)
    .toString()
    .padStart(2, "0")}`;
};

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else playerRoot.requestFullscreen();
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName));

function setupTimeline() {
  let showRemaining = true;
  const percentOfDuration = (time: number) => `${video.duration ? (time / video.duration) * 100 : 0}%`;

  const update = () => {
    const { currentTime, duration } = video;
    currentTimeLabel.textContent = formatTime(currentTime);
    endTimeButton.textContent = showRemaining ? `-${formatTime(duration - currentTime)}` : formatTime(duration);
    seekInput.max = String(duration || 0);
    seekInput.value = String(currentTime);
    seekInput.style.setProperty("--pg-progress", percentOfDuration(currentTime));
  };
  video.addEventListener("timeupdate", update);
  video.addEventListener("loadedmetadata", update);

  // The loaded part of the video, drawn lighter on the track
  video.addEventListener("progress", () => {
    const { buffered } = video;
    const end = buffered.length ? buffered.end(buffered.length - 1) : 0;
    seekInput.style.setProperty("--pg-buffered", percentOfDuration(end));
  });

  endTimeButton.addEventListener("click", () => {
    showRemaining = !showRemaining;
    update();
  });

  seekInput.addEventListener("input", () => {
    video.currentTime = Number(seekInput.value);
    update();
  });
  seekInput.addEventListener("pointermove", (event) => {
    const rect = seekInput.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    seekTooltip.textContent = formatTime(ratio * video.duration);
    seekTooltip.style.left = `${ratio * 100}%`;
  });
}

// The title bar and the controls fade out while the video plays and the pointer rests
function setupAutoHide() {
  let idleTimer: number | undefined;
  const isHovered = () => osc.matches(":hover") || playerRoot.querySelector(".es-settings-content:hover") !== null;
  const hide = () => {
    if (!video.paused && !isHovered()) playerRoot.classList.add("pg-player--idle");
  };
  const show = () => {
    playerRoot.classList.remove("pg-player--idle");
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(hide, IDLE_DELAY_MS);
  };

  playerRoot.addEventListener("pointermove", show);
  playerRoot.addEventListener("pointerleave", hide);
  video.addEventListener("play", show);
  video.addEventListener("pause", show);
  document.addEventListener("keydown", show);
}

export function setupPlayer() {
  renderTrackOptions();
  const requestedTrack = new URLSearchParams(location.search).get("subs");
  trackSelect.value =
    requestedTrack !== null && (requestedTrack === "" || getTrack(requestedTrack)) ? requestedTrack : "en";
  showTrackState(getActiveTrack());
  trackSelect.addEventListener("change", () => selectTrack(trackSelect.value));

  setupTimeline();
  setupAutoHide();

  video.addEventListener("play", () => playerRoot.classList.add("pg-player--playing"));
  video.addEventListener("pause", () => playerRoot.classList.remove("pg-player--playing"));
  playerRoot.querySelector(".pg-play").addEventListener("click", togglePlay);
  playerRoot.querySelectorAll(".pg-fullscreen").forEach((button) => button.addEventListener("click", toggleFullscreen));

  speedButton.addEventListener("click", () => {
    const next = PLAYBACK_RATES[(PLAYBACK_RATES.indexOf(video.playbackRate) + 1) % PLAYBACK_RATES.length];
    video.playbackRate = next;
    speedButton.textContent = `${next}×`;
  });

  let clickTimer: number | undefined;
  video.addEventListener("click", () => {
    window.clearTimeout(clickTimer);
    clickTimer = window.setTimeout(togglePlay, DOUBLE_CLICK_MS);
  });
  video.addEventListener("dblclick", () => {
    window.clearTimeout(clickTimer);
    toggleFullscreen();
  });

  // EasySubs takes the arrows in the capture phase when "move by subtitles" is on; otherwise they seek by 5 s
  document.addEventListener("keydown", (event) => {
    if (isTyping(event.target)) return;
    if (event.code === "Space") {
      event.preventDefault();
      togglePlay();
    } else if (event.code === "ArrowLeft") {
      video.currentTime -= 5;
    } else if (event.code === "ArrowRight") {
      video.currentTime += 5;
    }
  });
}
