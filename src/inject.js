import { ready } from './ready.js';
import Subtitles from './subtitles.js';

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js1");
		// ----------------------------------------------------------

    let eng_subs = new Subtitles("eng")
    eng_subs.getFile()

    console.log(eng_subs)
    console.log(eng_subs.file())
    
    const video = document.querySelector('video');
    ready('video', function(element) {
      element.ontimeupdate = (event) => {
        console.log(element.currentTime);
      };
    });
	}
  }, 1000);
});

