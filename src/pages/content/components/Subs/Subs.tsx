import { FC, useEffect, useState } from "react";

import { $currentSubs } from "@src/models/subs";
import { useUnit } from "effector-react";
import { $video } from "@src/models/videos";
import { TSubItem, TWordTranslation } from "@src/models/types";
import { $subsBackground, $subsBackgroundOpacity, $subsFontSize } from "@src/models/settings";
import { requestWordTranslation, $currentWordTranslation, cleanWordTranslation } from "@src/models/translations";

type TSubsProps = {};

export const Subs: FC<TSubsProps> = () => {
  const [video, currentSubs, subsBackground, subsBackgroundOpacity, subsFontSize] = useUnit([
    $video,
    $currentSubs,
    $subsBackground,
    $subsBackgroundOpacity,
    $subsFontSize,
  ]);
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
    <div
      id="es-subs"
      onMouseLeave={handleOnMouseLeave}
      onMouseEnter={handleOnMouseEnter}
      style={{ fontSize: `${((video.clientWidth / 100) * subsFontSize) / 43}px` }}
    >
      {currentSubs.map((sub) => (
        <div
          className="es-sub"
          onClick={() => setShowTranslation(true)}
          onMouseLeave={() => setShowTranslation(false)}
          style={{
            background: `rgba(0, 0, 0, ${subsBackground ? subsBackgroundOpacity / 100 : 0})`,
          }}
        >
          {sub.items.map((item) => (
            <SubItem subItem={item} />
          ))}

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

  return (
    <>
      <pre
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={`es-sub-item ${subItem.tag}`}
        onClick={handleClick}
      >
        {subItem.text}
        {showTranslation && <SubItemTranslation text={subItem.cleanedText} />}
      </pre>
      <pre className="es-sub-item-space"> </pre>
    </>
  );
};

const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  const [currentWordTranslation, handleRequestWordTranslation, handleCleanWordTranslation] = useUnit([
    $currentWordTranslation,
    requestWordTranslation,
    cleanWordTranslation,
  ]);

  useEffect(() => {
    handleRequestWordTranslation(text);
    return () => {
      handleCleanWordTranslation();
    };
  }, []);

  if (!currentWordTranslation) {
    return null;
  }

  return (
    <div className="es-word-translation">
      <div className="es-word-translation-original">{text}</div>
      <br />
      <div className="es-word-quick-translations">
        {/* {currentWordTranslation.quick_translations?.map((tr) => tr.replaceAll(" ", "\xa0")).join(", ")} */}
        {currentWordTranslation?.main}
      </div>
    </div>
  );
};
