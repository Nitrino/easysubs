import React, { useState, useEffect } from "react";
import { useStore } from "effector-react";
import { subsStore } from "../../store";

import { subTitleType } from "subtitle";
import Utils from "../../utils";
import Video from "../../video";

const timePeriod = 30000;
const keyboardEvents = ["keyup", "keydown", "keypress"];

function ProgressBar() {
  const subs = useStore(subsStore);

  const [videoElement] = useState(document.querySelector("video"));
  const [progressBarElement] = useState(
    document.querySelector(".easysubs-progress-bar")
  );
  const [elements, updateElements] = useState([]);
  const animateRef: any = React.useRef(null);

  const animate = () => {
    if (subs.length == 0) return;
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
        (sub.end > rightBorder && sub.end < leftBorder) ||
        (sub.start > rightBorder && sub.start < leftBorder)
    );

    const elements = subsInDuration.map((sub: subTitleType) => {
      const subWidth =
        msInPx * (Utils.castSubTime(sub.end) - Utils.castSubTime(sub.start));
      const x = msInPx * (Utils.castSubTime(sub.start) - rightBorder);
      return (
        <div
          className="easysubs-progress-bar-element"
          style={{ width: subWidth + "px", transform: `translateX(${x}px)` }}
          key={"id" + sub.start + "-" + sub.end}
        />
      );
    });

    updateElements(elements);
  }

  function keyboardHandler(event: KeyboardEvent) {
    if (Utils.detectService().constructor.name == "Netflix") {
      return;
    }

    if (event.code == "ArrowLeft") {
      event.stopPropagation();
      if (event.type == "keydown") {
        Video.moveToPrevSub(videoElement, subs);
      }
    }
    if (event.code == "ArrowRight") {
      event.stopPropagation();
      if (event.type == "keydown") {
        Video.moveToNextSub(videoElement, subs);
      }
    }
  }

  useEffect(() => {
    animateRef.current = requestAnimationFrame(animate);
    keyboardEvents.forEach(eventType => {
      document.addEventListener(eventType, keyboardHandler, true);
    });

    return () => {
      cancelAnimationFrame(animateRef.current);
      keyboardEvents.forEach(eventType => {
        document.removeEventListener(eventType, keyboardHandler, true);
      });
    };
  }, [subs]);

  return <div>{elements}</div>;
}

export default ProgressBar;
