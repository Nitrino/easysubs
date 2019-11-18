import Utils from './utils';
import UI from "./ui"
import EventsHandlers from "./events_handlers"
import YouTube from "./services/youtube";
import Netflix from "./services/netflix";
import Onvix from "./services/onvix";
import KinoPub from "./services/kinopub";
import Settings from "./settings";

const service = <YouTube>Utils.detectService()
console.log("EasySubs initialized. Service: " + service.constructor.name);

window.addEventListener('easysubsVideoReady', () => {
  console.log("TCL: EVENT", "easysubsVideoReady")
  const settings = new Settings()
  settings.render(service.settingSelector())

  const playerContainerElement = service.playerContainerElement()
  let eventsHandler: EventsHandlers = null
  const videoElement = document.querySelector("video")

  window.addEventListener('easysubsSubtitlesChanged', (event: any) => {
    console.log("TCL: EVENT", "easysubsSubtitlesChanged")
    console.log(event.detail);

    const label = event.detail
    if (!label) {
      UI.createSubsElement(playerContainerElement).textContent = "";
      UI.createSubsProgressBarElement(playerContainerElement);
      return;
    }
    initialize(service, videoElement)


    // window.initializeInProgress = false
    // const videoElement = document.querySelector("video")
    // initialize(service, videoElement)
    // let eventsHandler: EventsHandlers = null
    // if (eventsHandler) { eventsHandler.removeEvents(); }
    // let oldHref = document.location.href;
    // let observer = new MutationObserver(function (mutations) {
    //   mutations.forEach(function (mutation) {
    //     if (oldHref != document.location.href) {
    //       if (eventsHandler) { eventsHandler.removeEvents(); }
    //       initialize(service, videoElement)
    //       oldHref = document.location.href;
    //     }
    //   });
    // });
    // var config = { childList: true, subtree: true };
    // observer.observe(document.querySelector("body"), config);

    function initialize(service: YouTube | Netflix | Onvix | KinoPub, videoElement: HTMLVideoElement) {
      // if (window.initializeInProgress) { return }
      // window.initializeInProgress = true
      // window.showTranslation = true

      // const settings = new Settings()
      // settings.render(service.settingSelector())

      // const playerContainerElement = service.playerContainerElement()

      const subsElement = UI.createSubsElement(playerContainerElement);
      const subsProgressBarElement = UI.createSubsProgressBarElement(playerContainerElement);
      subsElement.textContent = ""; // Clear subs loading text

      service.getSubs(label)
        .then(subs => {
          console.log("Subtitles loaded. subs count: " + subs.length)
          if (eventsHandler) { eventsHandler.removeEvents(); }
          eventsHandler = new EventsHandlers(videoElement, subs, subsElement, subsProgressBarElement)
          eventsHandler.addEvents();
          window.initializeInProgress = false
        })
    }
  })
});

service.init();

