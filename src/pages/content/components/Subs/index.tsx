import { FC, useEffect, useState } from "react";

import { $subs } from "@src/models/subs";
import { useStore } from "effector-react";
import { $video } from "@src/models/videos";
import { TSub, TSubItem } from "@src/models/types";
import { $translateLanguage } from "@src/models/settings";

type TSubsProps = {};

export const Subs: FC<TSubsProps> = () => {
  const subs = useStore($subs);
  const video = useStore($video);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleOnMouseLeave = () => {
    video.play();
  };

  const handleOnMouseEnter = () => {
    if (!video.paused) {
      video.pause();
    }
  };

  return (
    <div id="es-subs" onMouseLeave={handleOnMouseLeave} onMouseEnter={handleOnMouseEnter}>
      {subs.map((sub) => (
        <div className="es-sub" onClick={() => setShowTranslation(true)} onMouseLeave={() => setShowTranslation(false)}>
          {/* {
            sub.items.map((item) => (<SubItem subItem={subItem} />)
          } */}
          {/* <For each={props.sub.items}>{(subItem) => <SubItem subItem={subItem} />}</For>
        <Show when={showTranslation()}>
          <SubFullTranslation text={props.sub.cleanedText} />
        </Show> */}
        </div>
      ))}
    </div>
  );
};

const SubItem: FC<{ subItem: TSubItem }> = ({ subItem }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  const handleOnMouseLeave = () => {
    setShowTranslation(false);
  };

  const handleOnMouseEnter = () => {
    setShowTranslation(true);
  };

  const handleClick = () => {
    setShowTranslation(false);
  };

  const textClass = () => {
    switch (subItem.tag) {
      case "b":
        return "font-bold";
      case "i":
        return "italic";
      case "u":
        return "underline";
      default:
        return "";
    }
  };

  return (
    <>
      <span className="es-sub-item" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <pre className={textClass()} onClick={handleClick}>
          {subItem.text}
        </pre>
        {showTranslation && <SubItemTranslation text={subItem.cleanedText} />}
      </span>
      <pre className="inline"> </pre>
    </>
  );
};

const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  const translateLanguage = useStore($translateLanguage);

  const [quickTranslations, setQuickTranslations] = useState<string[]>();

  return (
    <div>
      <div>{text}</div>
      <br />
      <div>{quickTranslations?.map((tr) => tr.replaceAll(" ", "\xa0")).join(", ")}</div>
    </div>
  );
};
