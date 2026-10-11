import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { useGate, useUnit } from "effector-react";
import { $learningService, $translateLanguage } from "@src/models/settings";

import { $currentWordTranslation, $wordTranslationsPendings, WordTranslationsGate } from "@src/models/translations";
import toast from "react-hot-toast";
import { SoundIcon } from "./assets/SoundIcon";
import { PlusIcon } from "./assets/PlusIcon";
import { joinTranslations } from "@src/utils/joinTranslations";

import ILearningService from "@src/learning-service/learningService";
import { TWordTranslationItem } from "@src/models/types";
import { $subsLanguage } from "@src/models/subs";
import { wordPronounced } from "@src/models/pronunciation";
import { addWordFx } from "@src/models/learning";
import { getLearningService } from "@src/utils/getLearningService";
import { TranslateSelect } from "../ui/TranslateSelect";
import { Popover } from "../ui/Popover";
import { Spinner } from "../ui/Spinner";
import { InLineBadge } from "./InLineBadge";
import { WordStatusPicker } from "./WordStatusPicker";
import { wordStatusChanged } from "@src/models/words";

const DICTIONARIES: [string, (word: string) => string][] = [
  ["Cambridge", (word) => `https://dictionary.cambridge.org/dictionary/english/${word}`],
  ["Forvo", (word) => `https://forvo.com/search/${word}`],
  ["Urban", (word) => `https://www.urbandictionary.com/define.php?term=${word}`],
  ["YouGlish", (word) => `https://youglish.com/pronounce/${word}/english`],
];

// The popover of a hovered word: `cueId` and `index` say where it is, for the line Anki keeps with the word
export const SubItemTranslation: FC<{ text: string; cueId: number; index: number }> = ({ text, cueId, index }) => {
  // Where the word is, for Bergamot's translation of it in its line
  const place = useMemo(() => ({ text, cueId, index }), [text, cueId, index]);
  useGate(WordTranslationsGate, place);
  const [
    currentWordTranslation,
    learningService,
    subsLanguage,
    translateLanguage,
    wordTranslationsPendings,
    pronounceWord,
    addWord,
  ] = useUnit([
    $currentWordTranslation,
    $learningService,
    $subsLanguage,
    $translateLanguage,
    $wordTranslationsPendings,
    wordPronounced,
    addWordFx,
  ]);

  const [service, setService] = useState<ILearningService>(null);

  useEffect(() => {
    setService(getLearningService(learningService));
  }, [learningService]);

  const source = text.toLowerCase();

  if (subsLanguage === translateLanguage) {
    return (
      <Popover variant="word">
        <div className="es-title es-title-small">{text}</div>
        <div className="es-note">Select the translation language:</div>
        <div className="es-picker">
          <TranslateSelect />
        </div>
      </Popover>
    );
  }

  // Translations are keyed by the lowercased word; a result for another word may still be in flight.
  if (currentWordTranslation?.source !== source) {
    if (!wordTranslationsPendings[source]) {
      return null;
    }
    return (
      <Popover variant="word">
        <div className="es-loading">
          <Spinner />
          <span className="es-loading-word">{text}</span>
        </div>
      </Popover>
    );
  }

  // "+" saves the word as learning with the line it's from (src/models/words), and adds it to the learning service
  // when one is picked
  const handleAddWord = (word: string, translation: TWordTranslationItem) => {
    wordStatusChanged({ text, status: "learning", translation: translation.word, cueId });
    if (!service) {
      toast.success(`Saved “${text.toLowerCase()}”`);
    } else {
      addWord({
        word: word.toLowerCase(),
        translation: translation.word,
        partOfSpeech: translation.partOfSpeech,
        cueId,
        indexes: [index],
      })
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handlePlaySound = () => pronounceWord(currentWordTranslation.source);

  if (currentWordTranslation.error) {
    return (
      <Popover variant="word">
        <div className="es-title es-title-small">{text}</div>
        <div className="es-note">{currentWordTranslation.error}</div>
        <WordStatusPicker text={text} cueId={cueId} />
      </Popover>
    );
  }

  const { transcription, inLine, lemma, translations } = currentWordTranslation;
  // Cards get the dictionary forms: "key — ключ" when "keys" was hovered and the line says "ключи"; the line itself
  // goes to Anki as the card's context
  const cardWord = lemma ?? currentWordTranslation.source;
  const titleTranslation: TWordTranslationItem =
    inLine && translations[0]
      ? translations[0]
      : { word: currentWordTranslation.mainTranslation, partOfSpeech: "unknown", popularity: 0, synonyms: [] };
  const showTranscription =
    typeof transcription === "string" && transcription && transcription.toLowerCase() !== source;

  return (
    <Popover variant="word">
      <div className="es-title es-addable" onClick={() => handleAddWord(cardWord, titleTranslation)}>
        <span className="es-add">
          <PlusIcon />
        </span>
        {/* The word as it's used in the line on top, its dictionary meanings below */}
        <span dir="auto">{inLine ?? currentWordTranslation.mainTranslation}</span>
        {inLine && <InLineBadge />}
      </div>
      <div className="es-src">
        <button className="es-speak" title="Pronounce" onClick={handlePlaySound}>
          <SoundIcon />
        </button>
        <span className="es-src-word" dir="auto">
          {source}
        </span>
        {showTranscription && <span className="es-translit">[{transcription}]</span>}
        {currentWordTranslation.lemma && (
          <span className="es-lemma" dir="auto">
            → {currentWordTranslation.lemma}
          </span>
        )}
      </div>
      {currentWordTranslation.translations.length > 0 && (
        <>
          <div className="es-sep" />
          <div className="es-alts">
            {currentWordTranslation.translations.map((translation) => (
              <Fragment key={`${translation.partOfSpeech}-${translation.word}`}>
                <span
                  className="es-alt-word es-addable"
                  dir="auto"
                  onClick={() => handleAddWord(cardWord, translation)}
                >
                  <span className="es-add">
                    <PlusIcon />
                  </span>
                  {translation.word}
                </span>
                <span className="es-alt-pos">
                  {translation.partOfSpeech === "unknown" ? "" : translation.partOfSpeech}
                </span>
                <span className="es-alt-back" dir="auto">
                  {joinTranslations(translation.synonyms)}
                  {translation.note && (
                    <span className="es-alt-note" title={translation.note}>
                      {translation.note}
                    </span>
                  )}
                </span>
              </Fragment>
            ))}
          </div>
        </>
      )}
      <WordStatusPicker text={text} cueId={cueId} translation={titleTranslation.word} />
      {subsLanguage === "en" && (
        <>
          <div className="es-sep" />
          <div className="es-links">
            {DICTIONARIES.map(([name, url]) => (
              <a key={name} className="es-link" href={url(encodeURIComponent(source))} target="_blank" rel="noreferrer">
                {name}
              </a>
            ))}
          </div>
        </>
      )}
    </Popover>
  );
};
