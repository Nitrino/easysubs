import { useStore } from 'effector-react'

import { setUserLanguage } from '../../event'
import { userLanguageStore } from '../../store'
import { languages } from './languages'

function Language() {
  const userLanguage = useStore(userLanguageStore)

  function changeLanguage(language: string) {
    setUserLanguage(language)
  }

  return (
    <div className="easysubs-settings-language easysubs-settings__item">
      <div className="easysubs-settings__item__left-side">
        <span>{chrome.i18n.getMessage('translationLanguage')}</span>
      </div>
      <div className="easysubs-settings__item__right-side">
        <select
          className="easysubs-settings__select"
          value={userLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {languages.map((language: { value: string; label: string }, index) => {
            return (
              <option value={language.value} key={index}>
                {language.label}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
userLanguageStore.on(setUserLanguage, (_, language: string) => language)

export default Language
