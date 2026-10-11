import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $aiStatus, $aiSubs, $aiTranscribed, isTranscribed } from "@src/models/aiSubs";
import { $video } from "@src/models/videos";
import { describeAiProgress } from "@src/utils/aiSubs/status";
import { Spinner } from "../ui/Spinner";

// Where the subtitles go, while AI subtitles are on and the moment playing isn't transcribed yet: the speech model's
// download, then a spinner until Whisper gets there (src/models/aiSubs)
export const AiSubsProgress: FC = () => {
  const [ai, status, transcribed, video] = useUnit([$aiSubs, $aiStatus, $aiTranscribed, $video]);
  const now = useVideoTime(video);

  if (!ai || !video || isTranscribed(transcribed, now)) return null;
  const { text, percent, problem } = describeAiProgress(status);
  return (
    <div className="es-ai-progress" role="status">
      <div className="es-ai-progress__row">
        {!problem && percent === undefined && <Spinner />}
        <span>{text}</span>
        {percent !== undefined && <span className="es-ai-progress__percent">{percent}%</span>}
      </div>
      {percent !== undefined && (
        <div className="es-ai-progress__bar">
          <div style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  );
};

// The playhead in ms, as the video plays and seeks
function useVideoTime(video: HTMLVideoElement | null) {
  const [time, setTime] = useState(() => (video?.currentTime ?? 0) * 1000);
  useEffect(() => {
    if (!video) return;
    const update = () => setTime(video.currentTime * 1000);
    video.addEventListener("timeupdate", update);
    video.addEventListener("seeked", update);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("seeked", update);
    };
  }, [video]);
  return time;
}
