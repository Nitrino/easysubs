import { useUnit } from "effector-react";

import { $autoStopEnabled } from "@src/models/settings";
import { $video, $wasPaused, wasPausedChanged } from "@src/models/videos";

// Auto stop: the video pauses while the pointer is over the subtitles and plays again when it leaves, if it was
// playing before
export function useHoverPause() {
  const [video, wasPaused, handleWasPausedChanged, autoStopEnabled] = useUnit([
    $video,
    $wasPaused,
    wasPausedChanged,
    $autoStopEnabled,
  ]);

  const onMouseLeave = () => {
    if (wasPaused) {
      video.play();
      handleWasPausedChanged(false);
    }
  };

  const onMouseEnter = () => {
    if (!autoStopEnabled) {
      return;
    }
    if (!video.paused) {
      handleWasPausedChanged(true);
      video.pause();
    }
  };

  return { onMouseEnter, onMouseLeave };
}
