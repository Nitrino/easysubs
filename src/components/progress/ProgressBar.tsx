import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { subsStore } from "../../store";

import { subTitleType } from "subtitle";
import Utils from "../../utils";
import Video from "../../video";

const timePeriod = 30000;

function ProgressBar() {
  const subs = useStore(subsStore);

  const [videoElement] = useState(document.querySelector("video"));
  const [progressBarElement] = useState(document.querySelector(".easysubs-progress-bar"));
  const [elements, updateElements] = useState([]);
  const animateRef: any = React.useRef(null);

  const animate = () => {
    if (subs.length === 0) return;
    updateProgressBar();
    animateRef.current = requestAnimationFrame(animate);
  };

  function updateProgressBar() {
    const time = Utils.getVideoCurrentTime(videoElement);
    const leftBorder = time + timePeriod / 2;
    const rightBorder = time - timePeriod / 2;
    const msInPx = progressBarElement.clientWidth / timePeriod;

    const subsInDuration = subs.filter(
      (sub: subTitleType) =>
        (sub.end > rightBorder && sub.end < leftBorder) || (sub.start > rightBorder && sub.start < leftBorder)
    );

    updateElements(
      subsInDuration.map((sub: subTitleType) => {
        const subWidth = msInPx * (Utils.castSubTime(sub.end) - Utils.castSubTime(sub.start));
        const x = msInPx * (Utils.castSubTime(sub.start) - rightBorder);
        return (
          <div
            className="easysubs-progress-bar-element"
            style={{ width: `${subWidth}px`, transform: `translateX(${x}px)` }}
            key={`id${sub.start}-${sub.end}-${sub.text}`}
          />
        );
      })
    );
  }

  function handleClick(event: any) {
    const time = Utils.getVideoCurrentTime(videoElement);
    const leftBorder = time - timePeriod / 2;
    const msInPx = timePeriod / progressBarElement.clientWidth;
    const moveTime = leftBorder + event.nativeEvent.offsetX * msInPx;
    Video.moveToTime(videoElement, moveTime);
  }

  useEffect(
    () => {
      animateRef.current = requestAnimationFrame(animate);
      Utils.addKeyboardEventsListeners();

      return () => {
        cancelAnimationFrame(animateRef.current);
        Utils.removeKeyboardEventsListeners();
        updateElements([]);
      };
    },
    [subs]
  );

  return (
    <div className="easysubs-progress-bar-container" onClick={handleClick}>
      {elements}
    </div>
  );
}

export default ProgressBar;
