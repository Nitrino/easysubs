import { ReactElement, useEffect, useState, useRef, FC, MouseEvent } from "react";
import { useUnit } from "effector-react";

import { $video, moveToTimeRequested } from "@src/models/videos";
import { $subs } from "@src/models/subs";
import { $enabled, $progressBarEnabled } from "@src/models/settings";
import { getCurrentVideoTime } from "@src/utils/getCurrentVideoTime";

const TIME_PERIOD = 30000;

export const ProgressBar: FC = () => {
  const [video, subs, enabled, progressBarEnabled] = useUnit([$video, $subs, $enabled, $progressBarEnabled]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [elements, updateElements] = useState<ReactElement[]>([]);
  const animateRef = useRef<number | undefined>(undefined);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!video || !progressBarRef.current) {
      return;
    }
    const time = getCurrentVideoTime(video);
    const leftBorder = time - TIME_PERIOD / 2;
    const msInPx = TIME_PERIOD / progressBarRef.current.clientWidth;
    const moveTime = leftBorder + event.nativeEvent.offsetX * msInPx;
    moveToTimeRequested(moveTime);
  }

  // Updating the rendering state of the progress bar
  const updateProgressBar = (): void => {
    if (!video || !progressBarRef.current) {
      return;
    }

    const time = getCurrentVideoTime(video);
    const leftBorder = time + TIME_PERIOD / 2;
    const rightBorder = time - TIME_PERIOD / 2;
    const msInPx = progressBarRef.current.parentElement.clientWidth / TIME_PERIOD;

    const subsInDuration = subs.filter(
      (sub) => (sub.end > rightBorder && sub.end < leftBorder) || (sub.start > rightBorder && sub.start < leftBorder),
    );

    updateElements(
      subsInDuration.map((sub) => {
        const subWidth = msInPx * (sub.end - sub.start);
        const x = msInPx * (sub.start - rightBorder);
        return (
          <div
            className="es-progress-bar-element"
            style={{ width: `${subWidth}px`, transform: `translateX(${x}px)` }}
            key={`id${sub.start}-${sub.end}-${sub.text}`}
          />
        );
      }),
    );
  };

  const animate = (): void => {
    if (subs.length === 0) return;
    updateProgressBar();
    animateRef.current = requestAnimationFrame(animate);
  };

  // We use requestAnimationFrame for performance animation
  useEffect(() => {
    // Hidden with CSS while off, so nothing to draw
    if (!enabled || !progressBarEnabled) return;
    animateRef.current = requestAnimationFrame(animate);
    // addKeyboardEventsListeners();

    return () => {
      if (animateRef.current) cancelAnimationFrame(animateRef.current);
      // removeKeyboardEventsListeners();
      updateElements([]);
    };
  }, [subs, progressBarRef.current, video, enabled, progressBarEnabled]);

  return (
    <div className="es-progress-bar-container" onClick={handleClick} ref={progressBarRef}>
      {elements}
    </div>
  );
};
