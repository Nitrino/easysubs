import { ready } from './ready.js';
import Onvix from './onvix.js';

chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js1");
      // ----------------------------------------------------------

      const playerElement = document.querySelector(".fp-ui")
      let pTag = document.createElement("p");
      pTag.id = "ext-subs";
      const textNode = document.createTextNode("Loading subtitles ...");
      pTag.appendChild(textNode);
      playerElement.appendChild(pTag);

      Onvix.getSubs("eng")
        .then(function (data) {
          console.log(data);
        })

      const video = document.querySelector('video');
      ready('video', function (element) {
        element.ontimeupdate = (event) => {
          console.log(element.currentTime);
        };
      });
    }
  }, 1000);
});

