import * as locale from "@cospired/i18n-iso-languages/langs/en.json";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { setUserLanguage } from "../../event";
import { userLanguageStore } from "../../store";

const options: object[] = Object.keys(locale.languages).map((key: string) => {
  return { value: key, label: locale.languages[key] };
});

function Language() {
  const userLanguage = useStore(userLanguageStore);

  return (
    <div className="easysubs-settings-language">
      <span>Language: </span>
      <select value={userLanguage} onChange={e => setUserLanguage(e.target.value)}>
        {options.map((language: { value: string; label: string }, index) => {
          return (
            <option value={language.value} key={index}>
              {language.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
userLanguageStore.on(setUserLanguage, (state: any, language: object) => language);

export default Language;
