import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $activePhrasalVerb, $currentSubs, activePhrasalVerbChanged } from "@src/models/subs";
import { $video, $wasPaused, wasPausedChanged } from "@src/models/videos";
import { TPhrasalVerb, TSub, TSubItem } from "@src/models/types";
import {
  $learningService,
  $moveBySubsEnabled,
  $subsBackground,
  $subsBackgroundOpacity,
  $subsFontSize,
} from "@src/models/settings";
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
import { findPhrasalVerbs } from "@src/utils/findPhrasalVerbs";
import { joinTranslations } from "@src/utils/joinTranslations";
import { PlusIcon } from "./assets/PlusIcon";
import { LinguaLeo } from "@src/learning-service/linguaLeo";
import { PuzzleEnglish } from "@src/learning-service/puzzleEnglish";
import ILearningService from "@src/learning-service/learningService";
import toast from "react-hot-toast";

type TSubsProps = {};

export const Subs: FC<TSubsProps> = () => {
  const [video, currentSubs, subsFontSize, moveBySubsEnabled, wasPaused, handleWasPausedChanged] = useUnit([
    $video,
    $currentSubs,
    $subsFontSize,
    $moveBySubsEnabled,
    $wasPaused,
    wasPausedChanged,
  ]);

  useEffect(() => {
    if (moveBySubsEnabled) {
      addKeyboardEventsListeners();
    }
    return () => {
      removeKeyboardEventsListeners();
    };
  }, []);

  const handleOnMouseLeave = () => {
    if (wasPaused) {
      video.play();
      console.log("handleWasPausedChanged false");
      handleWasPausedChanged(false);
    }
  };

  const handleOnMouseEnter = () => {
    if (!video.paused) {
      console.log("handleWasPausedChanged true");

      handleWasPausedChanged(true);
      video.pause();
    }
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
          <Sub sub={sub} />
        ))}
      </div>
    </Draggable>
  );
};

const Sub: FC<{ sub: TSub }> = ({ sub }) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [phrasalVerbs, setPhrasalVerbs] = useState<TPhrasalVerb[]>([]);
  const [subsBackground, subsBackgroundOpacity] = useUnit([$subsBackground, $subsBackgroundOpacity]);

  useEffect(() => {
    setPhrasalVerbs(findPhrasalVerbs(sub.text));
    return () => {
      setPhrasalVerbs([]);
    };
  }, [sub.cleanedText]);

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
        <SubItem subItem={item} index={index} phrasalVerbs={phrasalVerbs} />
      ))}
      {showTranslation && <SubFullTranslation text={sub.cleanedText} />}
    </div>
  );
};

type TSubItemProps = {
  subItem: TSubItem;
  index: number;
  phrasalVerbs: TPhrasalVerb[];
};

const SubItem: FC<TSubItemProps> = ({ subItem, phrasalVerbs, index }) => {
  const [activePhrasalVerb, handleActivePhrasalVerbChanged] = useUnit([$activePhrasalVerb, activePhrasalVerbChanged]);
  const [showTranslation, setShowTranslation] = useState(false);
  const [phrasalVerb, setPhrasalVerb] = useState<TPhrasalVerb>(null);

  useEffect(() => {
    setPhrasalVerb(getPhrasalVerb(subItem.cleanedText));
  }, [activePhrasalVerb, phrasalVerbs]);

  const getPhrasalVerb = (word: string): TPhrasalVerb | undefined => {
    return phrasalVerbs.find((phrasalVerb) => phrasalVerb.text.includes(word));
  };

  const handleOnMouseLeave = () => {
    setShowTranslation(false);
    handleActivePhrasalVerbChanged(null);
  };

  const handleOnMouseEnter = (phrasalVerb: TPhrasalVerb) => {
    setShowTranslation(true);
    handleActivePhrasalVerbChanged(phrasalVerb);
  };

  const handleClick = () => {
    setShowTranslation(false);
    handleActivePhrasalVerbChanged(null);
  };

  return (
    <>
      <pre
        onMouseEnter={() => handleOnMouseEnter(phrasalVerb)}
        onMouseLeave={handleOnMouseLeave}
        className={`es-sub-item ${subItem.tag} ${
          activePhrasalVerb?.indexes?.includes(index) ? "es-sub-item-highlighted" : ""
        }`}
        onClick={handleClick}
      >
        {subItem.text}
        {showTranslation && !phrasalVerb && <SubItemTranslation text={subItem.cleanedText} />}
        {showTranslation && phrasalVerb && <PhrasalVerbTranslation phrasalVerb={phrasalVerb} />}
      </pre>
      <pre className="es-sub-item-space"> </pre>
    </>
  );
};

const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  const [currentWordTranslation, learningService, handleRequestWordTranslation, handleCleanWordTranslation] = useUnit([
    $currentWordTranslation,
    $learningService,
    requestWordTranslation,
    cleanWordTranslation,
  ]);

  const [service, setService] = useState<ILearningService>(null);

  useEffect(() => {
    if (learningService === "lingualeo") {
      setService(new LinguaLeo());
    }
    if (learningService === "puzzle-english") {
      setService(new PuzzleEnglish());
    }
  }, [learningService]);

  useEffect(() => {
    handleRequestWordTranslation(text);
    return () => {
      handleCleanWordTranslation();
    };
  }, []);

  if (!currentWordTranslation) {
    return null;
  }

  const handleAddWord = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (service) {
      service
        .addWord(text.toLowerCase(), joinTranslations(currentWordTranslation.translations), {})
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div className="es-word-translation">
      <div className="es-word-translation-original">{text.toLowerCase()}</div>
      <hr />
      <div className="es-word-quick-translations">
        {service && (
          <button className="es-settings-button" onClick={handleAddWord}>
            <PlusIcon fill={service.color} />
          </button>
        )}
        <div className="es-word-quick-translations-values">{joinTranslations(currentWordTranslation.translations)}</div>
      </div>
    </div>
  );
};

const PhrasalVerbTranslation: FC<{ phrasalVerb: TPhrasalVerb }> = ({ phrasalVerb }) => {
  return (
    <div className="es-word-translation">
      <div className="es-word-translation-original">{phrasalVerb.text}</div>
      <hr />
      <div className="es-word-quick-translations">{joinTranslations(phrasalVerb.translations)}</div>
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
