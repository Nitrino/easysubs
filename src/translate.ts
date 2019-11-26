class Translate {
  static word(originalWord: string) {

    chrome.runtime.sendMessage({ contentScriptQuery: 'getSingleTranslation', text: words[0], lang: userLanguageStore.getState() }, (response) => {
      const mainTranslation = response[0][0][0]
      const alternativeTranslations = response[1] || []

      UI.setTranslation(
        this.translateContainerElement,
        this.translateOriginalElement,
        this.translateResultElement,
        words[0],
        mainTranslation,
        this.translateAlternativeElement,
        alternativeTranslations
      )
    });
  }
}
