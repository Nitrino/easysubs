import React from "react";
import ReactDOM from "react-dom";
import { updateSubs } from "./event";
import { subsStore } from "./store";
import { subTitleType, parse } from 'subtitle'


import Utils from "./utils";
import UI from "./ui";
import YouTube from "./services/youtube";
import Netflix from "./services/netflix";
import Onvix from "./services/onvix";
import KinoPub from "./services/kinopub";
import Settings from "./settings";

const service = <KinoPub>Utils.detectService();
if (service) {
  console.log("EasySubs initialized. Service: " + service.constructor.name);

  window.addEventListener("easysubsVideoReady", () => {
    console.log("TCL: EVENT", "easysubsVideoReady");
    const settings = new Settings()

    window.addEventListener("easysubsSubtitlesChanged", (event: any) => {
      settings.render(service.settingSelector())

      console.log("TCL: EVENT", "easysubsSubtitlesChanged");

      const label = event.detail;
      console.log(label);

      // if (!label) {
      //   UI.createSubsElement(playerContainerElement)
      //   // .textContent = "";
      //   UI.createSubsProgressBarElement(playerContainerElement);
      //   return;
      // }
      // initialize(service, videoElement);

      // function initialize(service: YouTube | Netflix | Onvix | KinoPub, videoElement: HTMLVideoElement) {
      UI.renderSubs(service.playerContainerSelector());
      UI.renderProgressBar(service.playerContainerSelector());
      // ReactDOM.render(<SubsComponent />, subsContainerElement);
      // const subsProgressBarElement = UI.createSubsProgressBarElement(playerContainerElement);
      // subsElement.textContent = ""; // Clear subs loading text

      service.getSubs(label)
        .then(subs => {
          updateSubs(subs)

          //     console.log("Subtitles loaded. subs count: " + subs.length)
          //     if (eventsHandler) { eventsHandler.removeEvents(); }
          //     eventsHandler = new EventsHandlers(videoElement, subs, subsElement, subsProgressBarElement)
          //     eventsHandler.addEvents();
          //     window.initializeInProgress = false
        })
      // }
    });
  });
  service.init();

  subsStore.on(updateSubs, (state: subTitleType[], subs: subTitleType[]) => subs)
}
