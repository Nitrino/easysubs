import { useStore } from "effector-react";
import React, { useRef, useState } from "react";
import { toggleShowFullSubTranslatePopup } from "../../event";
import { showFullSubTranslatePopupStore } from "../../store";
import TranslateFullSubPopup from "./TranslateFullSubPopup";

function SubComponent(props: { text: string; words: any[] }) {
  const showFullSubTranslatePopup = useStore(showFullSubTranslatePopupStore);
  const [showCurrentFullSubTranslatePopup, setShowCurrentFullSubTranslatePopup] = useState(false);
  const subsContainer = useRef(null);

  function handleOnClick() {
    setShowCurrentFullSubTranslatePopup(!showCurrentFullSubTranslatePopup);
    toggleShowFullSubTranslatePopup(!showFullSubTranslatePopup);
  }

  function handleOnMouseLeave() {
    setShowCurrentFullSubTranslatePopup(false);
    toggleShowFullSubTranslatePopup(false);
  }

  return (
    <div className="easysubs-subtitles__sub">
      <div onClick={handleOnClick} onMouseLeave={handleOnMouseLeave} ref={subsContainer}>
        {props.words}
      </div>
      {showCurrentFullSubTranslatePopup && showFullSubTranslatePopup
        ? <TranslateFullSubPopup text={props.text} />
        : null}
    </div>
  );
}

export default SubComponent;
