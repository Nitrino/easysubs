import { subTitleType } from "subtitle";
import { updateSubs } from "./event";
import { subsStore } from "./store";

import KinoPub from "./services/kinopub";
import Netflix from "./services/netflix";
import Onvix from "./services/onvix";
import YouTube from "./services/youtube";
import UI from "./ui";
import Utils from "./utils";

const service = Utils.detectService() as KinoPub;
if (service) {
  console.log("EasySubs initialized. Service:", service.constructor.name);

  window.addEventListener("easysubsVideoReady", () => {
    console.log("TCL: EVENT", "easysubsVideoReady");

    window.addEventListener("easysubsSubtitlesChanged", (event: any) => {
      UI.renderSettings(service.settingSelector());
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

      service.getSubs(label).then(subs => {
        updateSubs(subs);

        //     console.log("Subtitles loaded. subs count: " + subs.length)
        //     if (eventsHandler) { eventsHandler.removeEvents(); }
        //     eventsHandler = new EventsHandlers(videoElement, subs, subsElement, subsProgressBarElement)
        //     eventsHandler.addEvents();
        //     window.initializeInProgress = false
      });
      // }
    });
  });
  service.init();

  (subsStore as any).on(updateSubs, (state: subTitleType[], subs: subTitleType[]) => subs);
}
