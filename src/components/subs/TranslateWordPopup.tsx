import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { userLanguageStore } from "../../store";
import Utils from "../../utils";
import TranslateAlternatives from "./TranslateAlternatives";

interface Props {
  word: string;
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

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getSingleTranslation",
        lang: language,
        text: Utils.clearWord(props.word)
      },
      response => {
        const main: string = response[0][0][0];
        const alternatives: [] = response[1] || [];

        changeTranslation({
          alternatives: alternatives,
          main: main,
          original: Utils.clearWord(props.word)
        });
      }
    );
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
        <TranslateAlternatives alternativesGroups={translation.alternatives} word={props.word} />
      </div>
    );
  }
  return null;
}

export default TranslateWordPopup;
