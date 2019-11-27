import React, { useEffect, useState } from "react";
import Utils from "../../utils";
import { userLanguageStore } from "../../store";
import { useStore } from "effector-react";
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
    original: "",
    main: "",
    alternatives: []
  });
  const language = useStore(userLanguageStore);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "getSingleTranslation",
        text: Utils.clearWord(props.word),
        lang: language
      },
      response => {
        const main: string = response[0][0][0];
        const alternatives: [] = response[1] || [];

        changeTranslation({
          original: Utils.clearWord(props.word),
          main: main,
          alternatives: alternatives
        });
      }
    );
  }, []);

  if (translation.original != "") {
    return (
      <div className="easysubs-translate-container">
        <div className="easysubs-translate-result">{translation.main}</div>
        <hr />
        <div className="easysubs-translate-original">
          {translation.original}
        </div>
        <TranslateAlternatives alternativesGroups={translation.alternatives} />
      </div>
    );
  } else {
    return null;
  }
}

export default TranslateWordPopup;
