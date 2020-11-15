import { useStore } from "effector-react";
import React, { useEffect, useState, useRef } from "react";
import { userLanguageStore, translationsStore } from "../../store";
import { updateTranslations } from "../../event";
import Utils from "../../utils";
import TranslateAlternatives from "./TranslateAlternatives";

interface Props {
  word: string;
  context: string;
}

interface Translate {
  original: string;
  main: string;
  alternatives: [];
}

function TranslateWordPopup(props: Props) {
  const [translation, changeTranslation] = useState<Translate>({
    alternatives: [],
    main: "",
    original: ""
  });
  const language = useStore(userLanguageStore);
  const translations = useStore(translationsStore);
  const isUnmounted = useRef(false);

  useEffect(() => {
    const word = Utils.clearWord(props.word)
    const localTranslation = translations[word]

    // Try get translation from local cache
    if(localTranslation) {
      return changeTranslation({
        alternatives: localTranslation.alternatives,
        main: localTranslation.main,
        original: word
      });
    }

    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getSingleTranslation",
        lang: language,
        text: word
      },
      response => {
        
        if (isUnmounted.current) return;

        const main: string = response[0][0][0];
        const alternatives: [] = response[1] || [];

        changeTranslation({
          alternatives: alternatives,
          main: main,
          original: word
        });

        // Save translation to local cache
        updateTranslations({[word]: {main: main, alternatives: alternatives}})
      }
    );

    return () => {
      isUnmounted.current = true;
    };
  }, []);

  if (translation.original !== "") {
    return (
      <div className="easysubs-translate-container">
        <div className="easysubs-translate-result">
          {translation.main}
        </div>
        <hr />
        <div className="easysubs-translate-original">
          {translation.original}
        </div>
        <TranslateAlternatives alternativesGroups={translation.alternatives} word={props.word} context={props.context} />
      </div>
    );
  }
  return null;
}

(translationsStore as any).on(
  updateTranslations, 
  (state: {}, newWord: {}) => {
    return {...state, ...newWord}
  }
);

export default TranslateWordPopup;
