import { FC, Fragment, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useUnit } from "effector-react";
import Draggable from "react-draggable";

import { $currentSubs, $subsLanguage } from "@src/models/subs";
import { $video } from "@src/models/videos";
import { TSub, TSubItem } from "@src/models/types";
import {
  $moveBySubsEnabled,
  $secondarySubsPosition,
  $subsBackground,
  $subsBackgroundOpacity,
  $subsFontSize,
  $translateLanguage,
} from "@src/models/settings";
import { $currentSecondarySubs } from "@src/models/secondarySubs";
import { $currentExpression, wordHovered, wordLeft } from "@src/models/expressions";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { SubItemTranslation } from "./SubItemTranslation";
import { ExpressionTranslation } from "./ExpressionTranslation";
import { SubFullTranslation } from "./SubFullTranslation";
import { SecondaryLine, SecondaryNotice, SecondarySubsTop } from "./SecondarySubs";
import { useHoverPause } from "./useHoverPause";
import { NextEpisodePrompt } from "../FoundSubs/NextEpisodePrompt";

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
          <NextEpisodePrompt />
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
  const [subsBackground, subsBackgroundOpacity] = useUnit([$subsBackground, $subsBackgroundOpacity]);

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowTranslation(true);
  };

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
        <SubItem key={index} sub={sub} subItem={item} index={index} />
      ))}
      {showTranslation && <SubFullTranslation text={sub.cleanedText} />}
    </div>
  );
};

type TSubItemProps = {
  sub: TSub;
  subItem: TSubItem;
  index: number;
};

const SubItem: FC<TSubItemProps> = ({ sub, subItem, index }) => {
  const [currentExpression, handleWordHovered, handleWordLeft, subsLanguage, translateLanguage] = useUnit([
    $currentExpression,
    wordHovered,
    wordLeft,
    $subsLanguage,
    $translateLanguage,
  ]);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleOnMouseLeave = () => {
    setShowTranslation(false);
    handleWordLeft();
  };

  const handleOnMouseEnter = () => {
    setShowTranslation(true);
    handleWordHovered({ id: sub.id, cue: sub.text, index });
  };

  const handleClick = () => {
    setShowTranslation(false);
    handleWordLeft();
  };

  // The expression of the hovered word, highlighted in its own cue only
  const inExpression = currentExpression?.id === sub.id && currentExpression.indexes.includes(index);
  // Subtitles already in the translation language get the word popover, which asks for another language
  const showExpression = inExpression && subsLanguage !== translateLanguage;

  return (
    <>
      <pre
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={`es-sub-item ${subItem.tag} ${inExpression ? "es-sub-item-highlighted" : ""}`}
        onClick={handleClick}
      >
        {subItem.text}
        {showTranslation &&
          (showExpression ? (
            <ExpressionTranslation expression={currentExpression} word={subItem.cleanedText} />
          ) : (
            <SubItemTranslation text={subItem.cleanedText} />
          ))}
      </pre>
      <pre className="es-sub-item-space"> </pre>
    </>
  );
};
