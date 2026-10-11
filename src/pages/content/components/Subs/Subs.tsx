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
import {
  $currentExpression,
  $selectedWords,
  selectionCleared,
  wordHovered,
  wordLeft,
  wordSelected,
} from "@src/models/expressions";
import { $spokenWord } from "@src/models/spokenWord";
import { $newWordsColored, $wordColoring, $wordsState } from "@src/models/words";
import { learningExpressionWords, viewWord } from "@src/utils/words";
import { $expressions } from "@src/models/expressions";
import type { TWordStatus } from "@src/models/types";
import { addKeyboardEventsListeners, removeKeyboardEventsListeners } from "@src/utils/keyboardHandler";
import { SubItemTranslation } from "./SubItemTranslation";
import { ExpressionTranslation } from "./ExpressionTranslation";
import { SubFullTranslation } from "./SubFullTranslation";
import { SecondaryLine, SecondaryNotice, SecondarySubsTop } from "./SecondarySubs";
import { DelayNotice } from "./DelayNotice";
import { useHoverPause } from "./useHoverPause";
import { NextEpisodePrompt } from "../FoundSubs/NextEpisodePrompt";
import { SpokenWordCompare } from "./SpokenWordCompare";
import { AiSubsProgress } from "./AiSubsProgress";

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
          <DelayNotice />
          <NextEpisodePrompt />
          {currentSubs.length === 0 && <AiSubsProgress />}
          {currentSubs.map((sub, index) => (
            <Fragment key={index}>
              {secondaryPosition === "above" && <SecondaryLine line={secondarySubs[index]} />}
              <Sub sub={sub} />
              {secondaryPosition === "below" && <SecondaryLine line={secondarySubs[index]} />}
            </Fragment>
          ))}
          <SpokenWordCompare />
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
  const [subsBackground, subsBackgroundOpacity, spokenWord, wordsState, newWordsColored, wordColoring, expressions] =
    useUnit([
      $subsBackground,
      $subsBackgroundOpacity,
      $spokenWord,
      $wordsState,
      $newWordsColored,
      $wordColoring,
      $expressions,
    ]);
  const spokenIndex = spokenWord?.cueId === sub.id ? spokenWord.index : -1;
  // Words colored by what the user knows (src/models/words); known and rare ones stay as they are
  const learningExpressions =
    wordColoring !== "off" && wordsState
      ? learningExpressionWords(wordsState, expressions.cues[sub.text] ?? [])
      : new Set<number>();
  const statusOf = (item: TSubItem, index: number): TWordStatus | null => {
    if (wordColoring === "off" || !wordsState) return null;
    if (learningExpressions.has(index)) return "learning";
    const status = viewWord(wordsState, item.text)?.status;
    return status === "learning" || (status === "new" && newWordsColored) ? status : null;
  };

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
        <SubItem
          key={index}
          sub={sub}
          subItem={item}
          index={index}
          spoken={index === spokenIndex}
          status={statusOf(item, index)}
        />
      ))}
      {showTranslation && <SubFullTranslation text={sub.cleanedText} />}
    </div>
  );
};

type TSubItemProps = {
  sub: TSub;
  subItem: TSubItem;
  index: number;
  // The word being said, see src/models/spokenWord
  spoken: boolean;
  // How the word is colored: new or learning, none for known words and with coloring off
  status: TWordStatus | null;
};

const SubItem: FC<TSubItemProps> = ({ sub, subItem, index, spoken, status }) => {
  const [
    currentExpression,
    selectedWords,
    handleWordHovered,
    handleWordLeft,
    handleWordSelected,
    handleSelectionCleared,
    subsLanguage,
    translateLanguage,
  ] = useUnit([
    $currentExpression,
    $selectedWords,
    wordHovered,
    wordLeft,
    wordSelected,
    selectionCleared,
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

  // Shift+click picks words to translate together, keeping the popover open on the picked words; a plain click
  // translates the line and drops the picked words
  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    // Shift+click would select the page's text otherwise
    if (event.shiftKey) event.preventDefault();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.shiftKey) {
      event.stopPropagation();
      handleWordSelected({ id: sub.id, cue: sub.text, index, word: subItem.cleanedText });
      return;
    }
    setShowTranslation(false);
    handleWordLeft();
    handleSelectionCleared();
  };

  // The expression of the hovered word, highlighted in its own cue only
  const inExpression = currentExpression?.id === sub.id && currentExpression.indexes.includes(index);
  const selected = selectedWords?.id === sub.id && selectedWords.words.some((word) => word.index === index);
  // Subtitles already in the translation language get the word popover, which asks for another language
  const showExpression = inExpression && subsLanguage !== translateLanguage;

  return (
    <>
      <pre
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={`es-sub-item ${subItem.tag} ${inExpression ? "es-sub-item-highlighted" : ""} ${selected ? "es-sub-item-selected" : ""} ${spoken ? "es-sub-item-spoken" : ""} ${status ? `es-sub-item-${status}` : ""}`}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {subItem.text}
        {showTranslation &&
          (showExpression ? (
            <ExpressionTranslation expression={currentExpression} word={subItem.cleanedText} />
          ) : (
            <SubItemTranslation text={subItem.cleanedText} cueId={sub.id} index={index} />
          ))}
      </pre>
      <pre className="es-sub-item-space"> </pre>
    </>
  );
};
