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

const afterColon = (text: string) => text.slice(text.indexOf(":") + 1).trim();
const plural = (lines: number) => `${lines} ${lines === 1 ? "line" : "lines"}`;
