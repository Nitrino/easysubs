import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { toggleShowFullSubTranslatePopup } from "../../event";
import { showFullSubTranslatePopupStore, subsStore } from "../../store";

import TranslateWordPopup from "./TranslateWordPopup";

interface Props {
  tagName: string;
  keyName: string;
  word: string;
}

function Word(props: Props) {
  const showFullSubTranslatePopup = useStore(showFullSubTranslatePopupStore);
  const [showTranslation, toggleShowTranslation] = useState(false);

  return React.createElement(
    props.tagName,
    {
      className: "easysubs-word",
      onClick: () => {
        toggleShowTranslation(false);
      },
      onMouseEnter: () => {
        if (!showFullSubTranslatePopup) {
          toggleShowTranslation(true);
        }
      },
      onMouseLeave: () => {
        toggleShowTranslation(false);
      }
    },
    props.word,
    // tslint:disable-next-line: jsx-self-close
    <span key={`space${props.keyName}`}> </span>,
    showTranslation ? <TranslateWordPopup word={props.word} /> : null
  );
}

export default Word;
