import { FC, Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useUnit } from "effector-react";
import Draggable from "react-draggable";

import { $currentSubs } from "@src/models/subs";
import { $video } from "@src/models/videos";
import { TSub, TSubItem } from "@src/models/types";
import {
  $moveBySubsEnabled,
  $secondarySubsPosition,
  $subsBackground,
  $subsBackgroundOpacity,
  $subsFontSize,
} from "@src/models/settings";
import { $currentSecondarySubs } from "@src/models/secondarySubs";
import {
  $findPhrasalVerbsPendings,
  subItemMouseEntered,
  subItemMouseLeft,
  $currentPhrasalVerb,
} from "@src/models/translations";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { SubItemTranslation } from "./SubItemTranslation";
import { PhrasalVerbTranslation } from "./PhrasalVerbTranslation";
import { SubFullTranslation } from "./SubFullTranslation";
import { SecondaryLine, SecondaryNotice, SecondarySubsTop } from "./SecondarySubs";
import { useHoverPause } from "./useHoverPause";

// The subtitles over the player; the second line goes under or above each cue, or into its own block in
// `topContainer` at the top of the player
export const Subs: FC<{ topContainer?: HTMLElement }> = ({ topContainer }) => {
  const [video, currentSubs, subsFontSize, moveBySubsEnabled, secondarySubs, secondaryPosition] = useUnit([
    $video,
    $currentSubs,
    $subsFontSize,
    $moveBySubsEnabled,
    $currentSecondarySubs,
    $secondarySubsPosition,
  ]);
  const draggableRef = useRef<HTMLDivElement>(null);
  const hoverPause = useHoverPause();

  useEffect(() => {
    if (moveBySubsEnabled) {
      addKeyboardEventsListeners();
    }
    return () => {
      removeKeyboardEventsListeners();
    };
  }, []);

  return (
    <>
      <Draggable nodeRef={draggableRef}>
        <div
          ref={draggableRef}
          id="es-subs"
          {...hoverPause}
          style={{ fontSize: `${((video.clientWidth / 100) * subsFontSize) / 43}px` }}
        >
          <SecondaryNotice />
          {currentSubs.map((sub, index) => (
            <Fragment key={index}>
              {secondaryPosition === "above" && <SecondaryLine line={secondarySubs[index]} />}
              <Sub sub={sub} />
              {secondaryPosition === "below" && <SecondaryLine line={secondarySubs[index]} />}
            </Fragment>
          ))}
        </div>
      </Draggable>
      {secondaryPosition === "top" &&
        topContainer &&
        createPortal(<SecondarySubsTop lines={secondarySubs} />, topContainer)}
    </>
  );
};

const Sub: FC<{ sub: TSub }> = ({ sub }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [subsBackground, subsBackgroundOpacity, findPhrasalVerbsPendings] = useUnit([
    $subsBackground,
    $subsBackgroundOpacity,
    $findPhrasalVerbsPendings,
  ]);

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowTranslation(true);
  };

  if (findPhrasalVerbsPendings[sub.text]) {
    return null;
  }

  return (
    <div
      className="es-sub"
      onClick={handleOnClick}
      onMouseLeave={() => setShowTranslation(false)}
      style={{
        background: `rgba(0, 0, 0, ${subsBackground ? subsBackgroundOpacity / 100 : 0})`,
      }}
    >
      {sub.items.map((item, index) => (
        <SubItem key={index} subItem={item} index={index} />
      ))}
      {showTranslation && <SubFullTranslation text={sub.cleanedText} />}
    </div>
  );
};

type TSubItemProps = {
  subItem: TSubItem;
  index: number;
};

const SubItem: FC<TSubItemProps> = ({ subItem, index }) => {
  const [currentPhrasalVerb, handleSubItemMouseEntered, handleSubItemMouseLeft, findPhrasalVerbsPendings] = useUnit([
    $currentPhrasalVerb,
    subItemMouseEntered,
    subItemMouseLeft,
    $findPhrasalVerbsPendings,
  ]);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleOnMouseLeave = () => {
    setShowTranslation(false);
    handleSubItemMouseLeft();
  };

  const handleOnMouseEnter = () => {
    setShowTranslation(true);
    handleSubItemMouseEntered(subItem.cleanedText);
  };

  const handleClick = () => {
    setShowTranslation(false);
    handleSubItemMouseLeft();
  };

  return (
    <>
      <pre
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={`es-sub-item ${subItem.tag} ${
          currentPhrasalVerb?.indexes?.includes(index) ? "es-sub-item-highlighted" : ""
        }`}
        onClick={handleClick}
      >
        {subItem.text}
        {!findPhrasalVerbsPendings[subItem.cleanedText] && showTranslation && (
          <>
            {currentPhrasalVerb ? (
              <PhrasalVerbTranslation phrasalVerb={currentPhrasalVerb} />
            ) : (
              <SubItemTranslation text={subItem.cleanedText} />
            )}
          </>
        )}
      </pre>
      <pre className="es-sub-item-space"> </pre>
    </>
  );
};
