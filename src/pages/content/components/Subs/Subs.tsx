import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $currentSubs } from "@src/models/subs";
import { $video } from "@src/models/videos";
import { TSubItem } from "@src/models/types";
import { $moveBySubsEnabled, $subsBackground, $subsBackgroundOpacity, $subsFontSize } from "@src/models/settings";
import {
  requestWordTranslation,
  $currentWordTranslation,
  cleanWordTranslation,
  $currentSubTranslation,
  requestSubTranslation,
  cleanSubTranslation,
} from "@src/models/translations";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import Draggable from "react-draggable";

type TSubsProps = {};

export const Subs: FC<TSubsProps> = () => {
  const [video, currentSubs, subsBackground, subsBackgroundOpacity, subsFontSize, moveBySubsEnabled] = useUnit([
    $video,
    $currentSubs,
    $subsBackground,
    $subsBackgroundOpacity,
    $subsFontSize,
    $moveBySubsEnabled,
  ]);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    if (moveBySubsEnabled) {
      addKeyboardEventsListeners();
    }
    return () => {
      removeKeyboardEventsListeners();
    };
  }, []);

  const handleOnMouseLeave = () => {
    video.play();
  };

  const handleOnMouseEnter = () => {
    if (!video.paused) {
      video.pause();
    }
  };

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowTranslation(true);
  };

  return (
    <Draggable>
      <div
        id="es-subs"
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={handleOnMouseEnter}
        style={{ fontSize: `${((video.clientWidth / 100) * subsFontSize) / 43}px` }}
      >
        {currentSubs.map((sub) => (
          <div
            className="es-sub"
            onClick={handleOnClick}
            onMouseLeave={() => setShowTranslation(false)}
            style={{
              background: `rgba(0, 0, 0, ${subsBackground ? subsBackgroundOpacity / 100 : 0})`,
            }}
          >
            {sub.items.map((item) => (
              <SubItem subItem={item} />
            ))}
            {showTranslation && <SubFullTranslation text={sub.cleanedText} />}
          </div>
        ))}
      </div>
    </Draggable>
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
      <div className="es-word-translation-original">{text.toLowerCase()}</div>
      <hr />
      <div className="es-word-quick-translations">
        {currentWordTranslation.translations.map((tr) => tr.replaceAll(" ", "\xa0").toLowerCase()).join(", ")}
      </div>
    </div>
  );
};

const SubFullTranslation: FC<{ text: string }> = ({ text }) => {
  const [currentSubTranslation, handleRequestSubTranslation, handleCleanSubTranslation] = useUnit([
    $currentSubTranslation,
    requestSubTranslation,
    cleanSubTranslation,
  ]);

  useEffect(() => {
    console.log("SubFullTranslation", text);

    handleRequestSubTranslation(text);
    return () => {
      handleCleanSubTranslation();
    };
  }, []);

  if (!currentSubTranslation) {
    return null;
  }

  return <div className="es-full-translation">{currentSubTranslation}</div>;
};
