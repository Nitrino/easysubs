import { FC, useEffect, useState } from "react";

import { $currentSubs } from "@src/models/subs";
import { useStore, useUnit } from "effector-react";
import { $video } from "@src/models/videos";
import { TSub, TSubItem } from "@src/models/types";
import { $translateLanguage } from "@src/models/settings";

type TSubsProps = {};

export const Subs: FC<TSubsProps> = () => {
  const currentSubs = useStore($currentSubs);
  const video = useStore($video);
  const [showTranslation, setShowTranslation] = useState(false);
  // const [subsBackground, subsBackgroundOpacity] = useUnit($subsBackground);

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
      {currentSubs.map((sub) => (
        <div className="es-sub" onClick={() => setShowTranslation(true)} onMouseLeave={() => setShowTranslation(false)}>
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
  const translateLanguage = useStore($translateLanguage);

  const [quickTranslations, setQuickTranslations] = useState<string[]>();

  return (
    <div className="es-word-translation">
      <div className="es-word-translation-original">{text}</div>
      <br />
      <div className="es-word-quick-translations">
        {quickTranslations?.map((tr) => tr.replaceAll(" ", "\xa0")).join(", ")}
      </div>
    </div>
  );
};
