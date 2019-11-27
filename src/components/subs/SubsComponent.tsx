import React, { useEffect, useState, useRef } from "react";
import Word from "./Word";
import TranslateFullSubPopup from "./TranslateFullSubPopup";
import { subsStore } from "../../store";
import Subs from "../../subs";
import { useStore } from "effector-react";

function SubsComponent() {
  const subs = useStore(subsStore);
  const [videoElement, setVideoElement] = useState(
    document.querySelector("video")
  );
  const [currentSubs, setCurrentSubs] = useState([]);
  const [subText, setSubText] = useState("");
  const [showTranslation, toggleShowTranslation] = useState(false);
  const subsContainer = useRef(null);

  useEffect(() => {
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [subs]);

  function handleTimeUpdate(event: any) {
    const subTextVtt = Subs.getCurrentSubText(videoElement, subs);
    setSubText(Subs.getCleanSubText(subTextVtt));
    setCurrentSubs(getSubsItems(subTextVtt));
    toggleShowTranslation(false);
  }

  function handleOnMouseEnter() {
    videoElement.pause();
  }

  function handleOnMouseLeave() {
    videoElement.play();
    toggleShowTranslation(false);
  }

  function handleOnClick() {
    toggleShowTranslation(true);
  }

  function getSubsItems(subText: string) {
    return Subs.subTextToChildNodesArray(subText)
      .map((node: any, nodeIndex: number) => {
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
      onClick={handleOnClick}
      ref={subsContainer}
    >
      {currentSubs}
      {showTranslation ? <TranslateFullSubPopup text={subText} /> : null}
    </div>
  );
}

export default SubsComponent;
