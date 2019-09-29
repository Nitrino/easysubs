class UI {
  static createSubsElement(playerContainerElement: HTMLElement) {
    const subsContainerElementId = "easysubs";
    const prevSubsContainerElement = document.getElementById(subsContainerElementId)
    if (prevSubsContainerElement != null) {
      prevSubsContainerElement.remove()
    }
    let subsContainerElement = document.createElement("div");
    subsContainerElement.id = subsContainerElementId;

    let subsInnerElement = document.createElement("div");
    subsInnerElement.id = "easysubs-subtitles"
    subsContainerElement.appendChild(subsInnerElement);

    const textNode = document.createTextNode("Loading subtitles ...");
    subsInnerElement.appendChild(textNode);

    playerContainerElement.appendChild(subsContainerElement);
    this.createSubsTranslateElement(subsContainerElement)
    return subsInnerElement;
  }

  static createSubsTranslateElement(subsElement: HTMLElement) {
    let translateTag = document.createElement("div");
    translateTag.className = "easysubs-translate-container";
    translateTag.innerHTML = "<span class='easysubs-translate-original'>test</span><hr><span class='easysubs-translate-result'>test translate</span>"
    subsElement.appendChild(translateTag);
  }

  static setTranslation(translateContainerElement: HTMLElement, originalElement: HTMLElement, resultElement: HTMLElement, originalText: string, resultText: string) {
    translateContainerElement.style.display = "block";
    originalElement.innerHTML = originalText
    resultElement.innerHTML = resultText
  }

  static createSubsProgressBarElement(playerContainerElement: HTMLElement) {
    let progressBarClass = "easysubs-progress-bar"
    const prevProgressBarElement = document.querySelector("." + progressBarClass)
    if (prevProgressBarElement != null) {
      prevProgressBarElement.remove()
    }

    let progressBarElement = document.createElement("div");
    progressBarElement.className = progressBarClass;
    playerContainerElement.appendChild(progressBarElement)
    return progressBarElement
  }
}

export default UI;
