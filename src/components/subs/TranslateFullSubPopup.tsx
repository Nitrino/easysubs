import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import { userLanguageStore } from "../../store";
import ga from '../../ga'

interface Props {
  text: string;
}

interface Translate {
  original: string;
  main: string;
}

function TranslateFullSubPopup(props: Props) {
  const [translation, changeTranslation] = useState<Translate>({
    main: "",
    original: ""
  });
  const language = useStore(userLanguageStore);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "translate",
        lang: language,
        text: props.text
      },
      response => {
        const main: string = response.data[0];
        changeTranslation({
          main: main,
          original: props.text
        });
        ga('easySubsTracker.send', 'event', "translate", "full-sub");
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
      </div>
    );
  }
  return null;
}

export default TranslateFullSubPopup;
