import { useStore } from "effector-react";
import React, { useEffect, useRef, useState } from "react";
import { toggleShowFullSubTranslatePopup } from "../../event";
import { showFullSubTranslatePopupStore, subsStore } from "../../store";
import Subs from "../../subs";
import TranslateFullSubPopup from "./TranslateFullSubPopup";
import Word from "./Word";

function SubsComponent() {
  const subs = useStore(subsStore);
  const showFullSubTranslatePopup = useStore(showFullSubTranslatePopupStore);
  const [videoElement, setVideoElement] = useState(document.querySelector("video"));
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

  function handleTimeUpdate(event: any) {
    const subTextVtt = Subs.getCurrentSubText(videoElement, subs);
    setSubText(Subs.getCleanSubText(subTextVtt));
    setCurrentSubs(getSubsItems(subTextVtt));
    toggleShowFullSubTranslatePopup(false);
  }

  function handleOnMouseEnter() {
    videoElement.pause();
  }

  function handleOnMouseLeave() {
    videoElement.play();
    toggleShowFullSubTranslatePopup(false);
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
    <div
      className="easysubs-subtitles"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
      ref={subsContainer}
    >
      {currentSubs}
      {showFullSubTranslatePopup ? <TranslateFullSubPopup text={subText} /> : null}
    </div>
  );
}

showFullSubTranslatePopupStore.on(toggleShowFullSubTranslatePopup, (state: any, isShow: boolean) => isShow);

export default SubsComponent;
