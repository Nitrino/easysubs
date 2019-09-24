class UI {
  static createSubsElement(playerContainerElement: HTMLElement) {
    const subsElementId = "easysubs";
    const prevSubsElement = document.getElementById(subsElementId)
    if (prevSubsElement != null) {
      prevSubsElement.remove()
    }

    const textNode = document.createTextNode("Loading subtitles ...");
    let subsElement = document.createElement("div");
    subsElement.id = subsElementId;
    subsElement.appendChild(textNode);
    playerContainerElement.appendChild(subsElement);
    return subsElement;
  }

  static createSubsTranslateElement(subsElement: HTMLElement, originalText: string, translatedText: string) {
    let translateTag = document.createElement("div");
    translateTag.className = "easysubs-word-translate";
    translateTag.innerHTML = "<span class='easysubs-word-original'>" + originalText + "</span>" +
      "<hr>" + "<span class='easysubs-word-translated'>" + translatedText + "</span>"
    subsElement.appendChild(translateTag);
    return translateTag;
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
