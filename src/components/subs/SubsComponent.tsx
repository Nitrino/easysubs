import React, { useEffect, useState } from "react";
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

  function getSubsItems(subText: string) {
    return Subs.subTextToChildNodeList(subText)
      .map((node: any, nodeIndex: number) => {
        return node.textContent
          .match(/[^ ]+/g)
          .map((word: string, wordIndex: number) => {
            const tagName = !!node.tagName
              ? node.tagName.toLowerCase()
              : "span";
            return React.createElement(
              tagName,
              { key: word + nodeIndex + wordIndex, className: "easysubs-word" },
              word + " "
            );
          });
      })
      .flat();
  }

  return <div className="easysubs-subtitles">{currentSubs}</div>;
}

export default SubsComponent;
