import { ready } from './ready.js';
import Onvix from './onvix.js';
import Subs from './subs.js';

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js1");
      // ----------------------------------------------------------

      const subsElement = Onvix.createSubsElement();
      const video = document.querySelector('video');

      Onvix.getSubs("eng")
        .then(function (subs) {
          subsElement.textContent = ""; // Clear subs loading text
          ready('video', function (element) {
            element.ontimeupdate = (event) => {
              Subs.updateSubs(element, subs, subsElement);
            };
          });
        })
    }
  }, 1000);
});

