import React from "react";
import ReactDOM from "react-dom";
import SubsComponent from "./components/subs/SubsComponent";

class UI {
  static renderSubs(playerContainerElementSelector: string) {
    const playerContainerElement = document.querySelector(
      playerContainerElementSelector
    );
    const prevSubsContainerElement = document.getElementById("easysubs");
    if (prevSubsContainerElement != null) return;

    let subsContainerElement = document.createElement("div");
    subsContainerElement.id = "easysubs";
    playerContainerElement.appendChild(subsContainerElement);

    ReactDOM.render(<SubsComponent />, document.querySelector("#easysubs"));
  }

  static createSubsElement(playerContainerElement: HTMLElement) {
    const subsContainerElementId = "easysubs";
    const prevSubsContainerElement = document.getElementById(
      subsContainerElementId
    );
    if (prevSubsContainerElement != null) {
      prevSubsContainerElement.remove();
    }
    let subsContainerElement = document.createElement("div");
    subsContainerElement.id = subsContainerElementId;
    playerContainerElement.appendChild(subsContainerElement);

    ReactDOM.render(<SubsComponent />, subsContainerElement);
    // let subsInnerElement = document.createElement("div");
    // subsInnerElement.className = "easysubs-subtitles"
    // subsContainerElement.appendChild(subsInnerElement);

    // const textNode = document.createTextNode("Loading subtitles ...");
    // subsInnerElement.appendChild(textNode);

    // playerContainerElement.appendChild(subsContainerElement);
    // this.createSubsTranslateElement(subsContainerElement)
    // return subsInnerElement;
  }

  static createSubsTranslateElement(subsElement: HTMLElement) {
    let translateTag = document.createElement("div");
    translateTag.className = "easysubs-translate-container";
    translateTag.innerHTML = `
      <div class='easysubs-translate-result'>
        test translate
      </div>
      <hr>
      <div class='easysubs-translate-original'>
        test
      </div>
      <div class='easysubs-translate-alternative'>
        alternative translations
      </div>
    `;
    subsElement.prepend(translateTag);
  }

  static setTranslation(
    translateContainerElement: HTMLElement,
    originalElement: HTMLElement,
    resultElement: HTMLElement,
    originalText: string,
    resultText: string,
    translateAlternativeElement: HTMLElement,
    alternativeTranslations: Array<any>
  ) {
    if (window.showTranslation) {
      translateContainerElement.style.display = "block";
    }
    originalElement.innerHTML = originalText;
    resultElement.innerHTML = resultText;

    let alternativeTranslationsHtml = "";
    if (alternativeTranslations.length != 0) {
      alternativeTranslations.forEach(elem => {
        alternativeTranslationsHtml += `
          <p class='easysubs-translate-alternative-part-speech'>
            ${elem[0]}
          </p>
        `;
        elem[2].slice(0, 5).forEach((alternative: any) => {
          alternativeTranslationsHtml += `
            <div class="easysubs-translate-alternative-item">
              <div class="easysubs-translate-alternative-item-translate">
                ${alternative[0]}
              </div>
              <div class="easysubs-translate-alternative-item-original">
                ${alternative[1].slice(0, 3).join(", ")}
              </div>
              <div class="easysubs-translate-alternative-item-frequency">
                ${this.frequencyToDots(alternative[3])}
              </div>
            </div>
          `;
        });
      });
    }

    translateAlternativeElement.innerHTML = alternativeTranslationsHtml;
  }

  static createSubsProgressBarElement(playerContainerElement: HTMLElement) {
    let progressBarClass = "easysubs-progress-bar";
    const prevProgressBarElement = document.querySelector(
      "." + progressBarClass
    );
    if (prevProgressBarElement != null) {
      prevProgressBarElement.remove();
    }

    let progressBarElement = document.createElement("div");
    progressBarElement.className = progressBarClass;
    playerContainerElement.appendChild(progressBarElement);
    return progressBarElement;
  }

  static frequencyToDots(frequency: number) {
    const rate = frequency * 10000;
    if (rate >= 500) {
      return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
      `;
    } else if (rate < 500 && rate >= 30) {
      return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
      `;
    } else {
      return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
      `;
    }
  }
}

export default UI;
