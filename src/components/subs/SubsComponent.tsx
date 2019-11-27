import React, { useEffect, useState } from "react";
import Word from "./Word";
import { subsStore } from "../../store";
import Subs from "../../subs";
import { useStore } from "effector-react";

function SubsComponent() {
  const subs = useStore(subsStore);
  const [videoElement, setVideoElement] = useState(
    document.querySelector("video")
  );
  const [currentSubs, setCurrentSubs] = useState([]);

  useEffect(() => {
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [subs]);

  function handleTimeUpdate(event: any) {
    const subText = Subs.getCurrentSubText(videoElement, subs);
    setCurrentSubs(getSubsItems(subText));
  }

  function handleOnMouseEnter(event: any) {
    videoElement.pause();
  }
  function handleOnMouseLeave(event: any) {
    videoElement.play();
  }

  function getSubsItems(subText: string) {
    return Subs.subTextToChildNodeList(subText)
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
    >
      {currentSubs}
    </div>
  );
}

export default SubsComponent;
