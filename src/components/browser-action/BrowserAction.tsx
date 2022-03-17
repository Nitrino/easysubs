function BrowserAction() {
  return (
    <div className="content">
      <div className="header">Easysubs</div>
      <menu>
        <li>
          <a target="_blank" href={chrome.i18n.getMessage('homePageUrl')} rel="noreferrer">
            {chrome.i18n.getMessage('homePage')}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs" rel="noreferrer">
            Github
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues" rel="noreferrer">
            {chrome.i18n.getMessage('reportBugs')}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/Nitrino/easysubs/issues" rel="noreferrer">
            {chrome.i18n.getMessage('suggestFeatures')}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://t.me/easysubs_ext" rel="noreferrer">
            {chrome.i18n.getMessage('supportChat')}
          </a>
        </li>
      </menu>
    </div>
  )
}

export default BrowserAction
