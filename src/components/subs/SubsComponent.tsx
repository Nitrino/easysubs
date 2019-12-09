import { useStore } from "effector-react";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { toggleShowFullSubTranslatePopup, toggleAutoPause, setSubsFontSize } from "../../event";
import { showFullSubTranslatePopupStore, subsStore, autoPauseStore, subsFontSizeStore } from "../../store";
import Subs from "../../subs";
import TranslateFullSubPopup from "./TranslateFullSubPopup";
import Word from "./Word";

function SubsComponent() {
  const subs = useStore(subsStore);
  const autoPause = useStore(autoPauseStore);
  const subsFontSize = useStore(subsFontSizeStore);
  const showFullSubTranslatePopup = useStore(showFullSubTranslatePopupStore);
  const [videoElement] = useState(document.querySelector("video"));
  const [fontSize, setFontSize] = useState(38);
  const [currentSubs, setCurrentSubs] = useState([]);
  const [subText, setSubText] = useState("");
  const subsContainer = useRef(null);

  useEffect(
    () => {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      };
    },
    [subs]
  );

  function updateSize() {
    setFontSize(videoElement.clientWidth / 100 * subsFontSize / 43);
  }

  useLayoutEffect(
    () => {
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    },
    [subsFontSize]
  );

  function handleTimeUpdate(event: any) {
    const subTextVtt = Subs.getCurrentSubText(videoElement, subs);
    setSubText(Subs.getCleanSubText(subTextVtt));
    setCurrentSubs(getSubsItems(subTextVtt));
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

  function handleOnClick() {
    toggleShowFullSubTranslatePopup(!showFullSubTranslatePopup);
  }

  function getSubsItems(subtitleText: string) {
    return Subs.subTextToChildNodesArray(subtitleText)
      .map((node: any, nodeIndex: number) => {
        return node.textContent.match(/[^ ]+/g).map((word: string, wordIndex: number) => {
          const tagName = !!node.tagName ? node.tagName.toLowerCase() : "span";
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
    <div className="easysubs-subtitles" style={{ fontSize: `${fontSize}px` }}>
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onClick={handleOnClick}
        ref={subsContainer}
      >
        {currentSubs}
      </div>
      {showFullSubTranslatePopup ? <TranslateFullSubPopup text={subText} /> : null}
    </div>
  );
}

(showFullSubTranslatePopupStore as any).on(toggleShowFullSubTranslatePopup, (state: any, isShow: boolean) => isShow);
(autoPauseStore as any).on(toggleAutoPause, (state: any, enable: boolean) => enable);

export default SubsComponent;
