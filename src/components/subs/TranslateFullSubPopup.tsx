import React, { useEffect, useState } from "react";
import { userLanguageStore } from "../../store";
import { useStore } from "effector-react";

interface Props {
  text: string;
}

interface Translate {
  original: string;
  main: string;
}

function TranslateFullSubPopup(props: Props) {
  const [translation, changeTranslation] = useState<Translate>({
    original: "",
    main: ""
  });
  const language = useStore(userLanguageStore);

  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        contentScriptQuery: "translate",
        text: props.text,
        lang: language
      },
      response => {
        const main: string = response.data[0];
        changeTranslation({
          original: props.text,
          main: main
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
      </div>
    );
  } else {
    return null;
  }
}

export default TranslateFullSubPopup;
