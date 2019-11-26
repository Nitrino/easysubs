import React, { useEffect, useState } from "react";
import TranslatePopup from "./TranslatePopup";
import { userLanguageStore } from "../../store";
import { useStore } from "effector-react";

interface Props {
  tagName: string;
  keyName: string;
  word: string;
}

function Word(props: Props) {
  const [showTranslation, toggleShowTranslation] = useState(false);

  return React.createElement(
    props.tagName,
    {
      className: "easysubs-word",
      onMouseEnter: () => {
        toggleShowTranslation(true);
      },
      onMouseLeave: () => {
        toggleShowTranslation(false);
      }
    },
    props.word,
    <span key={"space" + props.keyName}> </span>,
    showTranslation ? <TranslatePopup word={props.word} /> : null
  );
}

export default Word;
