// What the AI subtitles' card says (src/models/aiSubs): the model's download, transcribing, how many lines are in, or
// why nothing comes

export function describeAiStatus(status: { whisper: string; audio: string }, lines: number): string {
  const { whisper, audio } = status;
  if (whisper.startsWith("no speech models")) return `Can't run the speech model here: ${afterColon(whisper)}`;
  if (whisper.startsWith("failed")) return `Transcribing failed: ${afterColon(whisper)}`;
  if (audio.startsWith("no audio from the video") || audio.includes("DRM")) {
    return lines > 0
      ? `Transcribed ${plural(lines)}. The video's audio is protected: try "Listen to this tab" in the EasySubs toolbar menu`
      : `Can't hear this video (protected?): try "Listen to this tab" in the EasySubs toolbar menu`;
  }
  if (audio && audio !== "listening") return audio;
  const downloading = /^downloading (\d+)%/.exec(whisper);
  if (downloading) return `Downloading the speech model (77 MB, once): ${downloading[1]}%`;
  if (whisper === "recognizing") return lines > 0 ? `${plural(lines)}, transcribing more…` : "Transcribing…";
  if (lines > 0) return `${plural(lines)} so far, more as the video plays`;
  if (whisper === "ready") return "No speech heard yet";
  if (audio === "listening") return "Listening to the video…";
  return "Waiting for the video's audio: play it";
}

// Over the player while the moment playing isn't transcribed yet: the model's download with its percentage, then a
// spinner while Whisper works, or why nothing comes
export function describeAiProgress(status: { whisper: string; audio: string }): {
  text: string;
  percent?: number;
  problem?: boolean;
} {
  // Loading the model from the browser's cache reports 100% at once: nothing to show for that
  const downloading = /^downloading (\d+)%/.exec(status.whisper);
  if (downloading && Number(downloading[1]) < 100) {
    return { text: "Downloading the speech model…", percent: Number(downloading[1]) };
  }
  const problem =
    status.whisper.startsWith("no speech models") ||
    status.whisper.startsWith("failed") ||
    (status.audio !== "" && status.audio !== "listening");
  if (problem) return { text: describeAiStatus(status, 0), problem: true };
  return { text: "Making subtitles…" };
}

// "3:20", "1:02:05"
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const parts = [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60];
  const [hours, minutes, rest] = parts;
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${minutes}:${pad(rest)}`;
}

const afterColon = (text: string) => text.slice(text.indexOf(":") + 1).trim();
const plural = (lines: number) => `${lines} ${lines === 1 ? "line" : "lines"}`;
