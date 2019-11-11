import { ready } from "./ready"
import Utils from './utils';
import UI from "./ui"
import EventsHandlers from "./events_handlers"
import YouTube from "./services/youtube";
import Netflix from "./services/netflix";
import Onvix from "./services/onvix";
import KinoPub from "./services/kinopub";
import Settings from "./settings";

chrome.runtime.sendMessage({}, function (response) {
  const service = Utils.detectService()
  if (service == null) { return }

  console.log("EasySubs initialized. Service: " + service.constructor.name);
  // ----------------------------------------------------------

  window.initializeInProgress = false

  ready('video', function (videoElement: HTMLVideoElement) {
    initialize(service, videoElement)
    let eventsHandler: EventsHandlers = null
    let oldHref = document.location.href;
    let observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          if (eventsHandler) { eventsHandler.removeEvents(); }
          initialize(service, videoElement)
          oldHref = document.location.href;
        }
      });
    });
    var config = { childList: true, subtree: true };
    observer.observe(document.querySelector("body"), config);

    function initialize(service: YouTube | Netflix | Onvix | KinoPub, videoElement: HTMLVideoElement) {
      if (window.initializeInProgress) { return }
      window.initializeInProgress = true
      window.showTranslation = true

      const settings = new Settings()
      settings.render(service.settingSelector())

      const playerContainerElement = service.playerContainerElement()

      let subsElement = UI.createSubsElement(playerContainerElement);
      let subsProgressBarElement = UI.createSubsProgressBarElement(playerContainerElement);

      service.getSubs("eng")
        .then(subs => {
          console.log("Subtitles loaded. subs count: " + subs.length)

          subsElement.textContent = ""; // Clear subs loading text
          eventsHandler = new EventsHandlers(videoElement, subs, subsElement, subsProgressBarElement)
          eventsHandler.addEvents();
          window.initializeInProgress = false
        })
    }
  });
});
