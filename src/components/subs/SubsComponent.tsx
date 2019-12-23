import { useStore } from "effector-react";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { toggleShowFullSubTranslatePopup, toggleAutoPause } from "../../event";
import {
  showFullSubTranslatePopupStore,
  subsStore,
  autoPauseStore,
  subsFontSizeStore
} from "../../store";
import Subs from "../../subs";
import Word from "./Word";
import SubComponent from "./SubComponent";

function SubsComponent() {
  const subs = useStore(subsStore);
  const autoPause = useStore(autoPauseStore);
  const subsFontSize = useStore(subsFontSizeStore);
  const [videoElement] = useState(document.querySelector("video"));
  const [fontSize, setFontSize] = useState(38);
  const [currentSubs, setCurrentSubs] = useState([]);

  useEffect(() => {
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    handleTimeUpdate();

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [subs]);

  function updateSize() {
    setFontSize(((videoElement.clientWidth / 100) * subsFontSize) / 43);
  }

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [subsFontSize]);

  function handleTimeUpdate() {
    const subsTextsVtt = Subs.getCurrentSubsTexts(videoElement, subs);
    setCurrentSubs(
      subsTextsVtt.map((subTextVtt: string, index: number) => {
        const subWordsNodes = getSubWordsNodes(subTextVtt);
        const cleanSubText = Subs.getCleanSubText(subTextVtt);
        return (
          <SubComponent text={cleanSubText} words={subWordsNodes} key={index} />
        );
      })
    );

    toggleShowFullSubTranslatePopup(false);
  }

  function handleOnMouseEnter() {
    if (!videoElement.paused) {
      toggleAutoPause(true);
      videoElement.pause();
    }
  }

  function handleOnMouseLeave() {
    toggleShowFullSubTranslatePopup(false);
    if (autoPause) {
      toggleAutoPause(false);
      videoElement.play();
    }
  }

  function getSubWordsNodes(subtitleText: string) {
    return Subs.subTextToChildNodesArray(subtitleText)
      .map((node: any, nodeIndex: number) => {
        if (node.textContent.match(/[^ ]/g) == null) {
          return false;
        }
        return node.textContent
          .match(/[^ ]+/g)
          .map((word: string, wordIndex: number) => {
            const tagName = !!node.tagName
              ? node.tagName.toLowerCase()
              : "span";
            return (
              <Word
                tagName={tagName}
                word={word}
                key={word + nodeIndex + wordIndex}
                keyName={word + nodeIndex + wordIndex}
              />
            );
          });
      })
      .flat();
  }

  return (
    <div
      className="easysubs-subtitles"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      style={{ fontSize: `${fontSize}px` }}
    >
      {currentSubs}
    </div>
  );
}

(showFullSubTranslatePopupStore as any).on(
  toggleShowFullSubTranslatePopup,
  (state: any, isShow: boolean) => isShow
);
(autoPauseStore as any).on(
  toggleAutoPause,
  (state: any, enable: boolean) => enable
);

export default SubsComponent;
