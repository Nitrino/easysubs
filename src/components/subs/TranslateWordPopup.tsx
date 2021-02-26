import { useStore } from "effector-react";
import React, { useEffect, useState, useRef } from "react";
import { userLanguageStore } from "../../store";
import { customSiteStore } from "../../store";
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
  const isUnmounted = useRef(false);
  const urlTemplate = useStore(customSiteStore)

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getSingleTranslation",
        lang: language,
        text: Utils.clearWord(props.word)
      },
      response => {
        if (isUnmounted.current) return;

        const { main, alternatives } = response;
        changeTranslation({
          alternatives: alternatives,
          main: main,
          original: Utils.clearWord(props.word)
        });
      }
    );

    return () => {
      isUnmounted.current = true;
    };
  }, []);

  function getUrl(word: String) {
    return urlTemplate.replace("${word}", word)
  }

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
        {urlTemplate && <div><a href={getUrl(translation.original)} target="_blank">open</a></div>}
        <TranslateAlternatives alternativesGroups={translation.alternatives} word={props.word} context={props.context} />
      </div>
    );
  }
  return null;
}

export default TranslateWordPopup;
