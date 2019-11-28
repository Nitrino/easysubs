import React, { useEffect, useState } from "react";
import TranslateWordPopup from "./TranslateWordPopup";

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
      onClick: () => {
        toggleShowTranslation(false);
      },
      onMouseEnter: () => {
        toggleShowTranslation(true);
      },
      onMouseLeave: () => {
        toggleShowTranslation(false);
      }
    },
    props.word,
    <span key={`space${props.keyName}`} />,
    showTranslation ? <TranslateWordPopup word={props.word} /> : null
  );
}

export default Word;
