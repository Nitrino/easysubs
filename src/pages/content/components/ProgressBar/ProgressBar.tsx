import { ReactElement, useEffect, useState, useRef, FC } from "react";
import { useUnit } from "effector-react";

import { $video, moveToTimeRequested } from "@src/models/videos";
import { $subs } from "@src/models/subs";
import { getCurrentVideoTime } from "@src/utils/getCurrentVideoTime";

type TProgressBarProps = {};
const TIME_PERIOD = 30000;

export const ProgressBar: FC<TProgressBarProps> = () => {
  const [video, subs] = useUnit([$video, $subs]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [elements, updateElements] = useState<ReactElement[]>([]);
  const animateRef = useRef<number>();

  function handleClick(event: any) {
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
      (sub) => (sub.end > rightBorder && sub.end < leftBorder) || (sub.start > rightBorder && sub.start < leftBorder)
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
      })
    );
  };

  const animate = (): void => {
    if (subs.length === 0) return;
    updateProgressBar();
    animateRef.current = requestAnimationFrame(animate);
  };

  // We use requestAnimationFrame for performance animation
  useEffect(() => {
    animateRef.current = requestAnimationFrame(animate);
    // addKeyboardEventsListeners();

    return () => {
      animateRef.current && cancelAnimationFrame(animateRef.current);
      // removeKeyboardEventsListeners();
      updateElements([]);
    };
  }, [subs, progressBarRef.current, video]);

  return (
    <div className="es-progress-bar-container" onClick={handleClick} ref={progressBarRef}>
      {elements}
    </div>
  );
};
