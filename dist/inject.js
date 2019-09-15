/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/subtitle/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/subtitle/lib/index.js ***!
  \********************************************/
/*! exports provided: toMS, toSrtTime, toVttTime, parse, stringify, stringifyVtt, resync, parseTimestamps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toMS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toMS */ "./node_modules/subtitle/lib/toMS.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toMS", function() { return _toMS__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _toSrtTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toSrtTime */ "./node_modules/subtitle/lib/toSrtTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toSrtTime", function() { return _toSrtTime__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _toVttTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toVttTime */ "./node_modules/subtitle/lib/toVttTime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toVttTime", function() { return _toVttTime__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse */ "./node_modules/subtitle/lib/parse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return _parse__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _stringify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stringify */ "./node_modules/subtitle/lib/stringify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return _stringify__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _stringifyVtt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./stringifyVtt */ "./node_modules/subtitle/lib/stringifyVtt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringifyVtt", function() { return _stringifyVtt__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _resync__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resync */ "./node_modules/subtitle/lib/resync.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resync", function() { return _resync__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _parseTimestamps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./parseTimestamps */ "./node_modules/subtitle/lib/parseTimestamps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseTimestamps", function() { return _parseTimestamps__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ }),

/***/ "./node_modules/subtitle/lib/parse.js":
/*!********************************************!*\
  !*** ./node_modules/subtitle/lib/parse.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parse; });
/* harmony import */ var _parseTimestamps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseTimestamps */ "./node_modules/subtitle/lib/parseTimestamps.js");
/**
 * Module dependencies.
 */



/**
 * Parse a SRT or WebVTT string.
 * @param {String} srtOrVtt
 * @return {Array} subtitles
 */

function parse (srtOrVtt) {
  if (!srtOrVtt) return []

  const source = srtOrVtt
    .trim()
    .concat('\n')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^WEBVTT.*\n(?:.*: .*\n)*\n/, '')
    .split('\n')

  return source.reduce((captions, row, index) => {
    const caption = captions[captions.length - 1]

    if (!caption.index) {
      if (/^\d+$/.test(row)) {
        caption.index = parseInt(row, 10)
        return captions
      }
    }

    if (!caption.hasOwnProperty('start')) {
      const timestamp = Object(_parseTimestamps__WEBPACK_IMPORTED_MODULE_0__["default"])(row)
      if (timestamp) {
        Object.assign(caption, timestamp)
      } else if (captions.length > 1) {
        captions[captions.length - 2].text += '\n' + row
      }
      return captions
    }

    if (row === '') {
      delete caption.index
      if (index !== source.length - 1) {
        captions.push({})
      }
    } else {
      caption.text = caption.text
        ? caption.text + '\n' + row
        : row
    }

    return captions
  }, [{}])
}


/***/ }),

/***/ "./node_modules/subtitle/lib/parseTimestamps.js":
/*!******************************************************!*\
  !*** ./node_modules/subtitle/lib/parseTimestamps.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseTimestamps; });
/* harmony import */ var _toMS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toMS */ "./node_modules/subtitle/lib/toMS.js");
/**
 * Module dependencies.
 */



/**
 * Timestamp regex
 * @type {RegExp}
 */

const RE = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/

/**
 * parseTimestamps
 * @param value
 * @returns {{start: Number, end: Number}}
 */

function parseTimestamps (value) {
  const match = RE.exec(value)
  if (match) {
    const cue = {
      start: Object(_toMS__WEBPACK_IMPORTED_MODULE_0__["default"])(match[1]),
      end: Object(_toMS__WEBPACK_IMPORTED_MODULE_0__["default"])(match[2])
    }
    if (match[3]) {
      cue.settings = match[3]
    }
    return cue
  }
}


/***/ }),

/***/ "./node_modules/subtitle/lib/resync.js":
/*!*********************************************!*\
  !*** ./node_modules/subtitle/lib/resync.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resync; });
/* harmony import */ var _toMS__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toMS */ "./node_modules/subtitle/lib/toMS.js");
/**
 * Module dependencies.
 */



/**
 * Resync the given subtitles.
 * @param captions
 * @param time
 * @returns {Array|*}
 */

function resync (captions, time) {
  return captions.map(caption => {
    const start = Object(_toMS__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.start) + time
    const end = Object(_toMS__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.end) + time

    return Object.assign({}, caption, {
      start,
      end
    })
  })
}


/***/ }),

/***/ "./node_modules/subtitle/lib/stringify.js":
/*!************************************************!*\
  !*** ./node_modules/subtitle/lib/stringify.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stringify; });
/* harmony import */ var _toSrtTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toSrtTime */ "./node_modules/subtitle/lib/toSrtTime.js");
/**
 * Module dependencies.
 */



/**
 * Stringify the given array of captions.
 * @param {Array} captions
 * @return {String} srt
 */

function stringify (captions) {
  return captions.map((caption, index) => {
    return (index > 0 ? '\n' : '') + [
      index + 1,
      `${Object(_toSrtTime__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.start)} --> ${Object(_toSrtTime__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.end)}`,
      caption.text
    ].join('\n')
  }).join('\n') + '\n'
}


/***/ }),

/***/ "./node_modules/subtitle/lib/stringifyVtt.js":
/*!***************************************************!*\
  !*** ./node_modules/subtitle/lib/stringifyVtt.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return stringifyVtt; });
/* harmony import */ var _toVttTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toVttTime */ "./node_modules/subtitle/lib/toVttTime.js");
/**
 * Module dependencies.
 */



/**
 * Stringify the given array of captions to WebVTT format.
 * @param {Array} captions
 * @return {String} webVtt
 */

function stringifyVtt (captions) {
  return 'WEBVTT\n\n' + captions.map((caption, index) => {
    return (index > 0 ? '\n' : '') + [
      index + 1,
      `${Object(_toVttTime__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.start)} --> ${Object(_toVttTime__WEBPACK_IMPORTED_MODULE_0__["default"])(caption.end)}${caption.settings ? ' ' + caption.settings : ''}`,
      caption.text
    ].join('\n')
  }).join('\n') + '\n'
}


/***/ }),

/***/ "./node_modules/subtitle/lib/toMS.js":
/*!*******************************************!*\
  !*** ./node_modules/subtitle/lib/toMS.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toMS; });
/**
 * Return the given SRT timestamp as milleseconds.
 * @param {string|number} timestamp
 * @returns {number} milliseconds
 */

function toMS (timestamp) {
  if (!isNaN(timestamp)) {
    return timestamp
  }

  const match = timestamp.match(/^(?:(\d{2,}):)?(\d{2}):(\d{2})[,.](\d{3})$/)

  if (!match) {
    throw new Error('Invalid SRT or VTT time format: "' + timestamp + '"')
  }

  const hours = match[1] ? parseInt(match[1], 10) * 3600000 : 0
  const minutes = parseInt(match[2], 10) * 60000
  const seconds = parseInt(match[3], 10) * 1000
  const milliseconds = parseInt(match[4], 10)

  return hours + minutes + seconds + milliseconds
}


/***/ }),

/***/ "./node_modules/subtitle/lib/toSrtTime.js":
/*!************************************************!*\
  !*** ./node_modules/subtitle/lib/toSrtTime.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toSrtTime; });
/* harmony import */ var zero_fill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zero-fill */ "./node_modules/zero-fill/index.js");
/* harmony import */ var zero_fill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zero_fill__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Module dependencies.
 */



/**
 * Return the given milliseconds as SRT timestamp.
 * @param timestamp
 * @returns {string}
 */

function toSrtTime (timestamp) {
  if (isNaN(timestamp)) {
    return timestamp
  }

  const date = new Date(0, 0, 0, 0, 0, 0, timestamp)

  const hours = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getHours())
  const minutes = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getMinutes())
  const seconds = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getSeconds())
  const ms = timestamp - ((hours * 3600000) + (minutes * 60000) + (seconds * 1000))

  return `${hours}:${minutes}:${seconds},${zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(3, ms)}`
}


/***/ }),

/***/ "./node_modules/subtitle/lib/toVttTime.js":
/*!************************************************!*\
  !*** ./node_modules/subtitle/lib/toVttTime.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toVttTime; });
/* harmony import */ var zero_fill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zero-fill */ "./node_modules/zero-fill/index.js");
/* harmony import */ var zero_fill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zero_fill__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Module dependencies.
 */



/**
 * Return the given milliseconds as WebVTT timestamp.
 * @param timestamp
 * @returns {string}
 */

function toVttTime (timestamp) {
  if (isNaN(timestamp)) {
    return timestamp
  }

  const date = new Date(0, 0, 0, 0, 0, 0, timestamp)

  const hours = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getHours())
  const minutes = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getMinutes())
  const seconds = zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(2, date.getSeconds())
  const ms = timestamp - ((hours * 3600000) + (minutes * 60000) + (seconds * 1000))

  return `${hours}:${minutes}:${seconds}.${zero_fill__WEBPACK_IMPORTED_MODULE_0___default()(3, ms)}`
}


/***/ }),

/***/ "./node_modules/zero-fill/index.js":
/*!*****************************************!*\
  !*** ./node_modules/zero-fill/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Given a number, return a zero-filled string.
 * From http://stackoverflow.com/questions/1267283/
 * @param  {number} width
 * @param  {number} number
 * @return {string}
 */
module.exports = function zeroFill (width, number, pad) {
  if (number === undefined) {
    return function (number, pad) {
      return zeroFill(width, number, pad)
    }
  }
  if (pad === undefined) pad = '0'
  width -= number.toString().length
  if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
  return number + ''
}


/***/ }),

/***/ "./src/inject.ts":
/*!***********************!*\
  !*** ./src/inject.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ready */ "./src/ready.ts");
/* harmony import */ var _onvix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./onvix */ "./src/onvix.ts");
/* harmony import */ var _subs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subs */ "./src/subs.ts");
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./video */ "./src/video.ts");




chrome.runtime.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("EasySubs initialized");
            // ----------------------------------------------------------
            const video = document.querySelector('.fp-player video');
            Object(_ready__WEBPACK_IMPORTED_MODULE_0__["ready"])('video', function (videoElement) {
                const subsElement = _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].createSubsElement();
                const subsProgressBarElement = _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].createSubsProgressBarElement();
                _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].getSubs("eng")
                    .then(function (subs) {
                    subsElement.textContent = ""; // Clear subs loading text
                    videoElement.ontimeupdate = (event) => {
                        _subs__WEBPACK_IMPORTED_MODULE_2__["default"].updateSubs(videoElement, subs, subsElement);
                        _subs__WEBPACK_IMPORTED_MODULE_2__["default"].updateSubsProgressBar(subsProgressBarElement, videoElement, subs);
                    };
                    subsElement.addEventListener("mouseenter", () => {
                        videoElement.pause();
                    });
                    subsElement.addEventListener("mouseleave", () => {
                        videoElement.play();
                    });
                    document.addEventListener("keyup", (event) => {
                        event.stopPropagation();
                        if (event.code == "ArrowLeft") {
                            _video__WEBPACK_IMPORTED_MODULE_3__["default"].moveToPrevSub(videoElement, subs);
                        }
                        if (event.code == "ArrowRight") {
                            _video__WEBPACK_IMPORTED_MODULE_3__["default"].moveToNextSub(videoElement, subs);
                        }
                    }, true);
                    document.addEventListener("mouseover", (event) => {
                        let element = event.target;
                        if (element.className === 'easysubs-word') {
                            if (element.getElementsByClassName("easysubs-word-translate").length != 0) {
                                return;
                            }
                            chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: element.textContent, lang: "ru" }, (response) => {
                                removeElements(document.querySelectorAll(".easysubs-word-translate"));
                                _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].createSubsTranslateElement(element, element.textContent, response.data[0]);
                            });
                        }
                    });
                    document.addEventListener("mouseout", (event) => {
                        let element = event.target;
                        if (element.className === 'easysubs-word') {
                            if (element.getElementsByClassName("easysubs-word-translate").length === 0) {
                                return;
                            }
                            removeElements(document.querySelectorAll(".easysubs-word-translate"));
                        }
                    });
                });
            });
            function removeElements(elms) {
                elms.forEach(el => el.remove());
            }
        }
    }, 1000);
});


/***/ }),

/***/ "./src/onvix.ts":
/*!**********************!*\
  !*** ./src/onvix.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var subtitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! subtitle */ "./node_modules/subtitle/lib/index.js");

class Onvix {
    static getSubs(language) {
        const base_path = "https://ageofultron.site/api/v1/streaming/serials/";
        const serial = window.location.pathname.split("/")[2];
        const stream = window.location.search.split("&")[0].split("=")[1];
        const season = window.location.search.split("&")[1];
        const episode = window.location.search.split("&")[2];
        // https://ageofultron.site/api/v1/streaming/serials/046cae0eeec8e111/a070a81585fa7856.json?season=7&episode=1
        const url = base_path + serial + "/" + stream + ".json?" + season + "&" + episode;
        return fetch(url)
            .then((resp) => resp.json())
            .then(function (data) {
            const subs_url = data.media_files.vtt.find((el) => el.srclang === language).src;
            return fetch(subs_url).then((resp) => resp.text());
        })
            .then(function (text) {
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(text);
        });
    }
    static createSubsElement() {
        const playerElement = document.querySelector(".fp-ui");
        let pTag = document.createElement("p");
        pTag.id = "easysubs";
        const textNode = document.createTextNode("Loading subtitles ...");
        pTag.appendChild(textNode);
        playerElement.appendChild(pTag);
        return pTag;
    }
    static createSubsTranslateElement(subs, originalText, translatedText) {
        let translateTag = document.createElement("div");
        translateTag.className = "easysubs-word-translate";
        translateTag.innerHTML = "<span class='easysubs-word-original'>" + originalText + "</span>" +
            "<hr>" + "<span class='easysubs-word-translated'>" + translatedText + "</span>";
        subs.appendChild(translateTag);
        return translateTag;
    }
    static createSubsProgressBarElement() {
        let progressBarTag = document.createElement("div");
        progressBarTag.className = "easysubs-progress-bar";
        let playerContainerElement = document.querySelector(".fp-ui");
        playerContainerElement.appendChild(progressBarTag);
        return progressBarTag;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Onvix);


/***/ }),

/***/ "./src/ready.ts":
/*!**********************!*\
  !*** ./src/ready.ts ***!
  \**********************/
/*! exports provided: ready */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return ready; });
let listeners = [];
let observer;
function check() {
    // Check the DOM for elements matching a stored selector
    for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
        listener = listeners[i];
        // Query for elements matching the specified selector
        elements = window.document.querySelectorAll(listener.selector);
        for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
            element = elements[j];
            // Make sure the callback isn't invoked with the 
            // same element more than once
            if (!element.ready) {
                element.ready = true;
                // Invoke the callback with the element
                listener.fn.call(element, element);
            }
        }
    }
}
function ready(selector, fn) {
    // Store the selector and callback to be monitored
    listeners.push({
        selector: selector,
        fn: fn
    });
    observer = new MutationObserver(check);
    observer.observe(window.document.documentElement, {
        childList: true,
        subtree: true
    });
    // Check if the element is currently in the DOM
    check();
}


/***/ }),

/***/ "./src/subs.ts":
/*!*********************!*\
  !*** ./src/subs.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video */ "./src/video.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


class Subs {
    static updateSubs(video, subs, subsElement) {
        let currentTime = _video__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTime(video);
        let currentSub = this.getCurrentSub(subs, currentTime);
        if (currentSub) {
            subsElement.innerHTML = currentSub.text.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="easysubs-word">$2</span>');
        }
        else {
            subsElement.innerHTML = "";
        }
    }
    static getCurrentSub(subs, currentTime) {
        return subs.find((sub) => sub.start <= currentTime && sub.end >= currentTime);
    }
    static getPrevSub(subs, currentTime) {
        let currentSub = Subs.getCurrentSub(subs, currentTime);
        if (currentSub) {
            let indexCurrentSub = subs.findIndex(sub => sub == currentSub);
            return subs[indexCurrentSub - 1];
        }
        else {
            return subs.find((sub, index) => sub.end <= currentTime && subs[index + 1].start >= currentTime);
        }
    }
    static getNextSub(subs, currentTime) {
        let currentSub = Subs.getCurrentSub(subs, currentTime);
        if (currentSub) {
            let indexCurrentSub = subs.findIndex(sub => sub == currentSub);
            return subs[indexCurrentSub + 1];
        }
        else {
            return subs.find((sub, index) => sub.start > currentTime && subs[index - 1].end >= currentTime);
        }
    }
    static updateSubsProgressBar(subsProgressBarElement, video, subs) {
        document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => el.remove());
        const timePeriod = 30000; // 30 seconds
        const progressBarWidth = subsProgressBarElement.clientWidth;
        const msInPx = (progressBarWidth / timePeriod);
        const currentTime = _video__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTime(video);
        const leftBorder = currentTime + timePeriod / 2;
        const rightBorder = currentTime - timePeriod / 2;
        const subsInDuration = subs.filter(sub => (sub.end > rightBorder && sub.end < leftBorder) ||
            (sub.start > rightBorder && sub.start < leftBorder));
        subsInDuration.forEach(sub => {
            const subWidth = msInPx * (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.end) - _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.start));
            let subDiv = document.createElement("div");
            subDiv.className = "easysubs-progress-bar-element";
            subDiv.style.width = subWidth + "px";
            subDiv.style.left = msInPx * (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.start) - rightBorder) + "px";
            subsProgressBarElement.appendChild(subDiv);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Subs);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Utils {
    static castSubTime(time) {
        return typeof time == "number" ? time : parseInt(time);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Utils);


/***/ }),

/***/ "./src/video.ts":
/*!**********************!*\
  !*** ./src/video.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _subs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subs */ "./src/subs.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");


class Video {
    static getCurrentTime(video) {
        return Math.round(video.currentTime * 1000);
    }
    static moveToPrevSub(video, subs) {
        let currentTime = this.getCurrentTime(video);
        let prevSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getPrevSub(subs, currentTime);
        this.moveToTime(video, prevSub.start);
    }
    static moveToNextSub(video, subs) {
        let currentTime = this.getCurrentTime(video);
        let nextSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getNextSub(subs, currentTime);
        this.moveToTime(video, nextSub.start);
    }
    static moveToTime(video, time) {
        video.currentTime = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(time) / 1000;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Video);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcGFyc2VUaW1lc3RhbXBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcmVzeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5VnR0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvdG9NUy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvU3J0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvVnR0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVyby1maWxsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29udml4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vicy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFF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Q0FBQyxjQUFjLENBQUMsS0FBdUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQXVCLEVBQUUsSUFBb0I7UUFDaEUsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBaUIsNkNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDdkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBdUIsRUFBRSxJQUFvQjtRQUNoRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFpQiw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUF1QixFQUFFLElBQXFCO1FBQzlELEtBQUssQ0FBQyxXQUFXLEdBQUcsOENBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtJQUNwRCxDQUFDO0NBQ0Y7QUFDYyxvRUFBSyxFQUFDIiwiZmlsZSI6ImluamVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luamVjdC50c1wiKTtcbiIsImV4cG9ydCB7IGRlZmF1bHQgYXMgdG9NUyB9IGZyb20gJy4vdG9NUydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdG9TcnRUaW1lIH0gZnJvbSAnLi90b1NydFRpbWUnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHRvVnR0VGltZSB9IGZyb20gJy4vdG9WdHRUaW1lJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZSB9IGZyb20gJy4vcGFyc2UnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnlWdHQgfSBmcm9tICcuL3N0cmluZ2lmeVZ0dCdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcmVzeW5jIH0gZnJvbSAnLi9yZXN5bmMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlVGltZXN0YW1wcyB9IGZyb20gJy4vcGFyc2VUaW1lc3RhbXBzJ1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCBwYXJzZVRpbWVzdGFtcHMgZnJvbSAnLi9wYXJzZVRpbWVzdGFtcHMnXG5cbi8qKlxuICogUGFyc2UgYSBTUlQgb3IgV2ViVlRUIHN0cmluZy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzcnRPclZ0dFxuICogQHJldHVybiB7QXJyYXl9IHN1YnRpdGxlc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlIChzcnRPclZ0dCkge1xuICBpZiAoIXNydE9yVnR0KSByZXR1cm4gW11cblxuICBjb25zdCBzb3VyY2UgPSBzcnRPclZ0dFxuICAgIC50cmltKClcbiAgICAuY29uY2F0KCdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcbnszLH0vZywgJ1xcblxcbicpXG4gICAgLnJlcGxhY2UoL15XRUJWVFQuKlxcbig/Oi4qOiAuKlxcbikqXFxuLywgJycpXG4gICAgLnNwbGl0KCdcXG4nKVxuXG4gIHJldHVybiBzb3VyY2UucmVkdWNlKChjYXB0aW9ucywgcm93LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGNhcHRpb24gPSBjYXB0aW9uc1tjYXB0aW9ucy5sZW5ndGggLSAxXVxuXG4gICAgaWYgKCFjYXB0aW9uLmluZGV4KSB7XG4gICAgICBpZiAoL15cXGQrJC8udGVzdChyb3cpKSB7XG4gICAgICAgIGNhcHRpb24uaW5kZXggPSBwYXJzZUludChyb3csIDEwKVxuICAgICAgICByZXR1cm4gY2FwdGlvbnNcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNhcHRpb24uaGFzT3duUHJvcGVydHkoJ3N0YXJ0JykpIHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IHBhcnNlVGltZXN0YW1wcyhyb3cpXG4gICAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY2FwdGlvbiwgdGltZXN0YW1wKVxuICAgICAgfSBlbHNlIGlmIChjYXB0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNhcHRpb25zW2NhcHRpb25zLmxlbmd0aCAtIDJdLnRleHQgKz0gJ1xcbicgKyByb3dcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYXB0aW9uc1xuICAgIH1cblxuICAgIGlmIChyb3cgPT09ICcnKSB7XG4gICAgICBkZWxldGUgY2FwdGlvbi5pbmRleFxuICAgICAgaWYgKGluZGV4ICE9PSBzb3VyY2UubGVuZ3RoIC0gMSkge1xuICAgICAgICBjYXB0aW9ucy5wdXNoKHt9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLnRleHRcbiAgICAgICAgPyBjYXB0aW9uLnRleHQgKyAnXFxuJyArIHJvd1xuICAgICAgICA6IHJvd1xuICAgIH1cblxuICAgIHJldHVybiBjYXB0aW9uc1xuICB9LCBbe31dKVxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b01TIGZyb20gJy4vdG9NUydcblxuLyoqXG4gKiBUaW1lc3RhbXAgcmVnZXhcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cblxuY29uc3QgUkUgPSAvXigoPzpcXGR7Mix9Oik/XFxkezJ9OlxcZHsyfVssLl1cXGR7M30pIC0tPiAoKD86XFxkezIsfTopP1xcZHsyfTpcXGR7Mn1bLC5dXFxkezN9KSg/OiAoLiopKT8kL1xuXG4vKipcbiAqIHBhcnNlVGltZXN0YW1wc1xuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJucyB7e3N0YXJ0OiBOdW1iZXIsIGVuZDogTnVtYmVyfX1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZVRpbWVzdGFtcHMgKHZhbHVlKSB7XG4gIGNvbnN0IG1hdGNoID0gUkUuZXhlYyh2YWx1ZSlcbiAgaWYgKG1hdGNoKSB7XG4gICAgY29uc3QgY3VlID0ge1xuICAgICAgc3RhcnQ6IHRvTVMobWF0Y2hbMV0pLFxuICAgICAgZW5kOiB0b01TKG1hdGNoWzJdKVxuICAgIH1cbiAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgIGN1ZS5zZXR0aW5ncyA9IG1hdGNoWzNdXG4gICAgfVxuICAgIHJldHVybiBjdWVcbiAgfVxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b01TIGZyb20gJy4vdG9NUydcblxuLyoqXG4gKiBSZXN5bmMgdGhlIGdpdmVuIHN1YnRpdGxlcy5cbiAqIEBwYXJhbSBjYXB0aW9uc1xuICogQHBhcmFtIHRpbWVcbiAqIEByZXR1cm5zIHtBcnJheXwqfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlc3luYyAoY2FwdGlvbnMsIHRpbWUpIHtcbiAgcmV0dXJuIGNhcHRpb25zLm1hcChjYXB0aW9uID0+IHtcbiAgICBjb25zdCBzdGFydCA9IHRvTVMoY2FwdGlvbi5zdGFydCkgKyB0aW1lXG4gICAgY29uc3QgZW5kID0gdG9NUyhjYXB0aW9uLmVuZCkgKyB0aW1lXG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgY2FwdGlvbiwge1xuICAgICAgc3RhcnQsXG4gICAgICBlbmRcbiAgICB9KVxuICB9KVxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b1NydFRpbWUgZnJvbSAnLi90b1NydFRpbWUnXG5cbi8qKlxuICogU3RyaW5naWZ5IHRoZSBnaXZlbiBhcnJheSBvZiBjYXB0aW9ucy5cbiAqIEBwYXJhbSB7QXJyYXl9IGNhcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHNydFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmluZ2lmeSAoY2FwdGlvbnMpIHtcbiAgcmV0dXJuIGNhcHRpb25zLm1hcCgoY2FwdGlvbiwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdcXG4nIDogJycpICsgW1xuICAgICAgaW5kZXggKyAxLFxuICAgICAgYCR7dG9TcnRUaW1lKGNhcHRpb24uc3RhcnQpfSAtLT4gJHt0b1NydFRpbWUoY2FwdGlvbi5lbmQpfWAsXG4gICAgICBjYXB0aW9uLnRleHRcbiAgICBdLmpvaW4oJ1xcbicpXG4gIH0pLmpvaW4oJ1xcbicpICsgJ1xcbidcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9WdHRUaW1lIGZyb20gJy4vdG9WdHRUaW1lJ1xuXG4vKipcbiAqIFN0cmluZ2lmeSB0aGUgZ2l2ZW4gYXJyYXkgb2YgY2FwdGlvbnMgdG8gV2ViVlRUIGZvcm1hdC5cbiAqIEBwYXJhbSB7QXJyYXl9IGNhcHRpb25zXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHdlYlZ0dFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmluZ2lmeVZ0dCAoY2FwdGlvbnMpIHtcbiAgcmV0dXJuICdXRUJWVFRcXG5cXG4nICsgY2FwdGlvbnMubWFwKChjYXB0aW9uLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ1xcbicgOiAnJykgKyBbXG4gICAgICBpbmRleCArIDEsXG4gICAgICBgJHt0b1Z0dFRpbWUoY2FwdGlvbi5zdGFydCl9IC0tPiAke3RvVnR0VGltZShjYXB0aW9uLmVuZCl9JHtjYXB0aW9uLnNldHRpbmdzID8gJyAnICsgY2FwdGlvbi5zZXR0aW5ncyA6ICcnfWAsXG4gICAgICBjYXB0aW9uLnRleHRcbiAgICBdLmpvaW4oJ1xcbicpXG4gIH0pLmpvaW4oJ1xcbicpICsgJ1xcbidcbn1cbiIsIi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBTUlQgdGltZXN0YW1wIGFzIG1pbGxlc2Vjb25kcy5cbiAqIEBwYXJhbSB7c3RyaW5nfG51bWJlcn0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBtaWxsaXNlY29uZHNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b01TICh0aW1lc3RhbXApIHtcbiAgaWYgKCFpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSB0aW1lc3RhbXAubWF0Y2goL14oPzooXFxkezIsfSk6KT8oXFxkezJ9KTooXFxkezJ9KVssLl0oXFxkezN9KSQvKVxuXG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgU1JUIG9yIFZUVCB0aW1lIGZvcm1hdDogXCInICsgdGltZXN0YW1wICsgJ1wiJylcbiAgfVxuXG4gIGNvbnN0IGhvdXJzID0gbWF0Y2hbMV0gPyBwYXJzZUludChtYXRjaFsxXSwgMTApICogMzYwMDAwMCA6IDBcbiAgY29uc3QgbWludXRlcyA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCkgKiA2MDAwMFxuICBjb25zdCBzZWNvbmRzID0gcGFyc2VJbnQobWF0Y2hbM10sIDEwKSAqIDEwMDBcbiAgY29uc3QgbWlsbGlzZWNvbmRzID0gcGFyc2VJbnQobWF0Y2hbNF0sIDEwKVxuXG4gIHJldHVybiBob3VycyArIG1pbnV0ZXMgKyBzZWNvbmRzICsgbWlsbGlzZWNvbmRzXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHplcm9GaWxsIGZyb20gJ3plcm8tZmlsbCdcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGdpdmVuIG1pbGxpc2Vjb25kcyBhcyBTUlQgdGltZXN0YW1wLlxuICogQHBhcmFtIHRpbWVzdGFtcFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1NydFRpbWUgKHRpbWVzdGFtcCkge1xuICBpZiAoaXNOYU4odGltZXN0YW1wKSkge1xuICAgIHJldHVybiB0aW1lc3RhbXBcbiAgfVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwLCAwLCAwLCAwLCAwLCAwLCB0aW1lc3RhbXApXG5cbiAgY29uc3QgaG91cnMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldEhvdXJzKCkpXG4gIGNvbnN0IG1pbnV0ZXMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldE1pbnV0ZXMoKSlcbiAgY29uc3Qgc2Vjb25kcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0U2Vjb25kcygpKVxuICBjb25zdCBtcyA9IHRpbWVzdGFtcCAtICgoaG91cnMgKiAzNjAwMDAwKSArIChtaW51dGVzICogNjAwMDApICsgKHNlY29uZHMgKiAxMDAwKSlcblxuICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfSwke3plcm9GaWxsKDMsIG1zKX1gXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHplcm9GaWxsIGZyb20gJ3plcm8tZmlsbCdcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGdpdmVuIG1pbGxpc2Vjb25kcyBhcyBXZWJWVFQgdGltZXN0YW1wLlxuICogQHBhcmFtIHRpbWVzdGFtcFxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1Z0dFRpbWUgKHRpbWVzdGFtcCkge1xuICBpZiAoaXNOYU4odGltZXN0YW1wKSkge1xuICAgIHJldHVybiB0aW1lc3RhbXBcbiAgfVxuXG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwLCAwLCAwLCAwLCAwLCAwLCB0aW1lc3RhbXApXG5cbiAgY29uc3QgaG91cnMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldEhvdXJzKCkpXG4gIGNvbnN0IG1pbnV0ZXMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldE1pbnV0ZXMoKSlcbiAgY29uc3Qgc2Vjb25kcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0U2Vjb25kcygpKVxuICBjb25zdCBtcyA9IHRpbWVzdGFtcCAtICgoaG91cnMgKiAzNjAwMDAwKSArIChtaW51dGVzICogNjAwMDApICsgKHNlY29uZHMgKiAxMDAwKSlcblxuICByZXR1cm4gYCR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfS4ke3plcm9GaWxsKDMsIG1zKX1gXG59XG4iLCIvKipcbiAqIEdpdmVuIGEgbnVtYmVyLCByZXR1cm4gYSB6ZXJvLWZpbGxlZCBzdHJpbmcuXG4gKiBGcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTI2NzI4My9cbiAqIEBwYXJhbSAge251bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSAge251bWJlcn0gbnVtYmVyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gemVyb0ZpbGwgKHdpZHRoLCBudW1iZXIsIHBhZCkge1xuICBpZiAobnVtYmVyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG51bWJlciwgcGFkKSB7XG4gICAgICByZXR1cm4gemVyb0ZpbGwod2lkdGgsIG51bWJlciwgcGFkKVxuICAgIH1cbiAgfVxuICBpZiAocGFkID09PSB1bmRlZmluZWQpIHBhZCA9ICcwJ1xuICB3aWR0aCAtPSBudW1iZXIudG9TdHJpbmcoKS5sZW5ndGhcbiAgaWYgKHdpZHRoID4gMCkgcmV0dXJuIG5ldyBBcnJheSh3aWR0aCArICgvXFwuLy50ZXN0KG51bWJlcikgPyAyIDogMSkpLmpvaW4ocGFkKSArIG51bWJlclxuICByZXR1cm4gbnVtYmVyICsgJydcbn1cbiIsImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4vcmVhZHlcIlxuaW1wb3J0IE9udml4IGZyb20gJy4vb252aXgnO1xuaW1wb3J0IFN1YnMgZnJvbSAnLi9zdWJzJztcbmltcG9ydCBWaWRlbyBmcm9tICcuL3ZpZGVvJztcblxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe30sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICB2YXIgcmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgY2xlYXJJbnRlcnZhbChyZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCk7XG5cbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgIC8vIFRoaXMgcGFydCBvZiB0aGUgc2NyaXB0IHRyaWdnZXJzIHdoZW4gcGFnZSBpcyBkb25lIGxvYWRpbmdcbiAgICAgIGNvbnNvbGUubG9nKFwiRWFzeVN1YnMgaW5pdGlhbGl6ZWRcIik7XG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgIGNvbnN0IHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZwLXBsYXllciB2aWRlbycpO1xuICAgICAgcmVhZHkoJ3ZpZGVvJywgZnVuY3Rpb24gKHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgICBjb25zdCBzdWJzRWxlbWVudCA9IE9udml4LmNyZWF0ZVN1YnNFbGVtZW50KCk7XG4gICAgICAgIGNvbnN0IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQgPSBPbnZpeC5jcmVhdGVTdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KCk7XG4gICAgICAgIFxuICAgICAgICBPbnZpeC5nZXRTdWJzKFwiZW5nXCIpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHN1YnMpIHtcbiAgICAgICAgICAgIHN1YnNFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjsgLy8gQ2xlYXIgc3VicyBsb2FkaW5nIHRleHRcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5vbnRpbWV1cGRhdGUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgU3Vicy51cGRhdGVTdWJzKHZpZGVvRWxlbWVudCwgc3Vicywgc3Vic0VsZW1lbnQpO1xuICAgICAgICAgICAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0JhcihzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LCB2aWRlb0VsZW1lbnQsIHN1YnMpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICB2aWRlb0VsZW1lbnQucGF1c2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICB2aWRlb0VsZW1lbnQucGxheSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgICAgICAgICAgICBWaWRlby5tb3ZlVG9QcmV2U3ViKHZpZGVvRWxlbWVudCwgc3Vicyk7XG4gICAgICAgICAgICAgIH0gaWYgKGV2ZW50LmNvZGUgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgICAgICAgICBWaWRlby5tb3ZlVG9OZXh0U3ViKHZpZGVvRWxlbWVudCwgc3Vicyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHRydWUpO1xuXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSAnZWFzeXN1YnMtd29yZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNvbnRlbnRTY3JpcHRRdWVyeTogJ3RyYW5zbGF0ZScsIHRleHQ6IGVsZW1lbnQudGV4dENvbnRlbnQsIGxhbmc6IFwicnVcIiB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUVsZW1lbnRzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikpO1xuICAgICAgICAgICAgICAgICAgT252aXguY3JlYXRlU3Vic1RyYW5zbGF0ZUVsZW1lbnQoZWxlbWVudCwgZWxlbWVudC50ZXh0Q29udGVudCwgcmVzcG9uc2UuZGF0YVswXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ2Vhc3lzdWJzLXdvcmQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3lzdWJzLXdvcmQtdHJhbnNsYXRlXCIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlbW92ZUVsZW1lbnRzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUVsZW1lbnRzKGVsbXM6IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgICAgICAgZWxtcy5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIDEwMDApO1xufSk7XG5cbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5cbmNsYXNzIE9udml4IHtcbiAgc3RhdGljIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IGJhc2VfcGF0aCA9IFwiaHR0cHM6Ly9hZ2VvZnVsdHJvbi5zaXRlL2FwaS92MS9zdHJlYW1pbmcvc2VyaWFscy9cIlxuICAgIGNvbnN0IHNlcmlhbCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl1cbiAgICBjb25zdCBzdHJlYW0gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVswXS5zcGxpdChcIj1cIilbMV1cbiAgICBjb25zdCBzZWFzb24gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVsxXVxuICAgIGNvbnN0IGVwaXNvZGUgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVsyXVxuICAgIC8vIGh0dHBzOi8vYWdlb2Z1bHRyb24uc2l0ZS9hcGkvdjEvc3RyZWFtaW5nL3NlcmlhbHMvMDQ2Y2FlMGVlZWM4ZTExMS9hMDcwYTgxNTg1ZmE3ODU2Lmpzb24/c2Vhc29uPTcmZXBpc29kZT0xXG4gICAgY29uc3QgdXJsID0gYmFzZV9wYXRoICsgc2VyaWFsICsgXCIvXCIgKyBzdHJlYW0gKyBcIi5qc29uP1wiICsgc2Vhc29uICsgXCImXCIgKyBlcGlzb2RlXG5cbiAgICByZXR1cm4gZmV0Y2godXJsKVxuICAgICAgLnRoZW4oKHJlc3ApID0+IHJlc3AuanNvbigpKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29uc3Qgc3Vic191cmwgPSBkYXRhLm1lZGlhX2ZpbGVzLnZ0dC5maW5kKChlbDogeyBzcmNsYW5nOiBzdHJpbmcgfSkgPT4gZWwuc3JjbGFuZyA9PT0gbGFuZ3VhZ2UpLnNyY1xuICAgICAgICByZXR1cm4gZmV0Y2goc3Vic191cmwpLnRoZW4oKHJlc3ApID0+IHJlc3AudGV4dCgpKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHJldHVybiBwYXJzZSh0ZXh0KVxuICAgICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTdWJzRWxlbWVudCgpIHtcbiAgICBjb25zdCBwbGF5ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mcC11aVwiKTtcbiAgICBsZXQgcFRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHBUYWcuaWQgPSBcImVhc3lzdWJzXCI7XG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkxvYWRpbmcgc3VidGl0bGVzIC4uLlwiKTtcbiAgICBwVGFnLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBwbGF5ZXJFbGVtZW50LmFwcGVuZENoaWxkKHBUYWcpO1xuICAgIHJldHVybiBwVGFnO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNUcmFuc2xhdGVFbGVtZW50KHN1YnM6IEhUTUxFbGVtZW50LCBvcmlnaW5hbFRleHQ6IHN0cmluZywgdHJhbnNsYXRlZFRleHQ6IHN0cmluZykge1xuICAgIGxldCB0cmFuc2xhdGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRyYW5zbGF0ZVRhZy5jbGFzc05hbWUgPSBcImVhc3lzdWJzLXdvcmQtdHJhbnNsYXRlXCI7XG4gICAgdHJhbnNsYXRlVGFnLmlubmVySFRNTCA9IFwiPHNwYW4gY2xhc3M9J2Vhc3lzdWJzLXdvcmQtb3JpZ2luYWwnPlwiICsgb3JpZ2luYWxUZXh0ICsgXCI8L3NwYW4+XCIgK1xuICAgICAgXCI8aHI+XCIgKyBcIjxzcGFuIGNsYXNzPSdlYXN5c3Vicy13b3JkLXRyYW5zbGF0ZWQnPlwiICsgdHJhbnNsYXRlZFRleHQgKyBcIjwvc3Bhbj5cIlxuICAgIHN1YnMuYXBwZW5kQ2hpbGQodHJhbnNsYXRlVGFnKTtcbiAgICByZXR1cm4gdHJhbnNsYXRlVGFnO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNQcm9ncmVzc0JhckVsZW1lbnQoKSB7XG4gICAgbGV0IHByb2dyZXNzQmFyVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9ncmVzc0JhclRhZy5jbGFzc05hbWUgPSBcImVhc3lzdWJzLXByb2dyZXNzLWJhclwiO1xuICAgIGxldCBwbGF5ZXJDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mcC11aVwiKVxuICAgIHBsYXllckNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3Jlc3NCYXJUYWcpXG4gICAgcmV0dXJuIHByb2dyZXNzQmFyVGFnXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT252aXg7XG4iLCJpbnRlcmZhY2UgTGlzdGVuZXIge1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBmbjogRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBFbGVtZW50T2JqZWN0IHtcbiAgcmVhZHk6IGJvb2xlYW5cbn1cbmxldCBsaXN0ZW5lcnM6IExpc3RlbmVyW10gPSBbXVxubGV0IG9ic2VydmVyXG5cbmZ1bmN0aW9uIGNoZWNrKCkge1xuICAvLyBDaGVjayB0aGUgRE9NIGZvciBlbGVtZW50cyBtYXRjaGluZyBhIHN0b3JlZCBzZWxlY3RvclxuICBmb3IgKHZhciBpID0gMCwgbGVuOiBOdW1iZXIgPSBsaXN0ZW5lcnMubGVuZ3RoLCBsaXN0ZW5lcjogTGlzdGVuZXIsIGVsZW1lbnRzOiBFbGVtZW50T2JqZWN0W107IGkgPCBsZW47IGkrKykge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgIC8vIFF1ZXJ5IGZvciBlbGVtZW50cyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yXG4gICAgZWxlbWVudHMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChsaXN0ZW5lci5zZWxlY3RvcikgYXMgdW5rbm93biBhcyBFbGVtZW50T2JqZWN0W107XG4gICAgZm9yICh2YXIgaiA9IDAsIGpMZW4gPSBlbGVtZW50cy5sZW5ndGgsIGVsZW1lbnQ7IGogPCBqTGVuOyBqKyspIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY2FsbGJhY2sgaXNuJ3QgaW52b2tlZCB3aXRoIHRoZSBcbiAgICAgIC8vIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZVxuICAgICAgaWYgKCFlbGVtZW50LnJlYWR5KSB7XG4gICAgICAgIGVsZW1lbnQucmVhZHkgPSB0cnVlO1xuICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGVsZW1lbnRcbiAgICAgICAgbGlzdGVuZXIuZm4uY2FsbChlbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KHNlbGVjdG9yOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAvLyBTdG9yZSB0aGUgc2VsZWN0b3IgYW5kIGNhbGxiYWNrIHRvIGJlIG1vbml0b3JlZFxuICBsaXN0ZW5lcnMucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGZuOiBmblxuICB9KTtcblxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNoZWNrKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSBET01cbiAgY2hlY2soKTtcbn1cbiIsImltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU3VicyB7XG4gIHN0YXRpYyB1cGRhdGVTdWJzKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gVmlkZW8uZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBjdXJyZW50U3ViID0gdGhpcy5nZXRDdXJyZW50U3ViKHN1YnMsIGN1cnJlbnRUaW1lKTtcbiAgICBpZiAoY3VycmVudFN1Yikge1xuICAgICAgc3Vic0VsZW1lbnQuaW5uZXJIVE1MID0gY3VycmVudFN1Yi50ZXh0LnJlcGxhY2UoXG4gICAgICAgIC8oXnw8XFwvP1tePl0rPnxcXHMrKShbXlxcczxdKykvZyxcbiAgICAgICAgJyQxPHNwYW4gY2xhc3M9XCJlYXN5c3Vicy13b3JkXCI+JDI8L3NwYW4+J1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic0VsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0Q3VycmVudFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcikge1xuICAgIHJldHVybiBzdWJzLmZpbmQoKHN1Yjogc3ViVGl0bGVUeXBlKSA9PiBzdWIuc3RhcnQgPD0gY3VycmVudFRpbWUgJiYgc3ViLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcmV2U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgLSAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKChzdWIsIGluZGV4KSA9PiBzdWIuZW5kIDw9IGN1cnJlbnRUaW1lICYmIHN1YnNbaW5kZXggKyAxXS5zdGFydCA+PSBjdXJyZW50VGltZSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TmV4dFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViICsgMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZCgoc3ViLCBpbmRleCkgPT4gc3ViLnN0YXJ0ID4gY3VycmVudFRpbWUgJiYgc3Vic1tpbmRleCAtIDFdLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlU3Vic1Byb2dyZXNzQmFyKHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50LCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhc3lzdWJzLXByb2dyZXNzLWJhci1lbGVtZW50XCIpLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuXG4gICAgY29uc3QgdGltZVBlcmlvZCA9IDMwMDAwOyAvLyAzMCBzZWNvbmRzXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgbXNJblB4ID0gKHByb2dyZXNzQmFyV2lkdGggLyB0aW1lUGVyaW9kKVxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gVmlkZW8uZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjdXJyZW50VGltZSArIHRpbWVQZXJpb2QgLyAyO1xuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3VycmVudFRpbWUgLSB0aW1lUGVyaW9kIC8gMjtcblxuICAgIGNvbnN0IHN1YnNJbkR1cmF0aW9uID0gc3Vicy5maWx0ZXIoc3ViID0+XG4gICAgICAoc3ViLmVuZCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5lbmQgPCBsZWZ0Qm9yZGVyKSB8fFxuICAgICAgKHN1Yi5zdGFydCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5zdGFydCA8IGxlZnRCb3JkZXIpXG4gICAgKTtcblxuICAgIHN1YnNJbkR1cmF0aW9uLmZvckVhY2goc3ViID0+IHtcbiAgICAgIGNvbnN0IHN1YldpZHRoID0gbXNJblB4ICogKFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5lbmQpIC0gVXRpbHMuY2FzdFN1YlRpbWUoc3ViLnN0YXJ0KSlcbiAgICAgIGxldCBzdWJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgc3ViRGl2LmNsYXNzTmFtZSA9IFwiZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyLWVsZW1lbnRcIlxuICAgICAgc3ViRGl2LnN0eWxlLndpZHRoID0gc3ViV2lkdGggKyBcInB4XCJcbiAgICAgIHN1YkRpdi5zdHlsZS5sZWZ0ID0gbXNJblB4ICogKFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5zdGFydCkgLSByaWdodEJvcmRlcikgKyBcInB4XCJcbiAgICAgIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3ViRGl2KVxuICAgIH0pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdWJzO1xuIiwiY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgY2FzdFN1YlRpbWUodGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aW1lID09IFwibnVtYmVyXCIgPyB0aW1lIDogcGFyc2VJbnQodGltZSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1xuIiwiaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiO1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgVmlkZW8ge1xuICBzdGF0aWMgZ2V0Q3VycmVudFRpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSAqIDEwMDApXG4gIH1cblxuICBzdGF0aWMgbW92ZVRvUHJldlN1Yih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10pIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSB0aGlzLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBsZXQgcHJldlN1Yjogc3ViVGl0bGVUeXBlID0gU3Vicy5nZXRQcmV2U3ViKHN1YnMsIGN1cnJlbnRUaW1lKTtcbiAgICB0aGlzLm1vdmVUb1RpbWUodmlkZW8sIHByZXZTdWIuc3RhcnQpXG4gIH1cblxuICBzdGF0aWMgbW92ZVRvTmV4dFN1Yih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10pIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSB0aGlzLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBsZXQgbmV4dFN1Yjogc3ViVGl0bGVUeXBlID0gU3Vicy5nZXROZXh0U3ViKHN1YnMsIGN1cnJlbnRUaW1lKTtcbiAgICB0aGlzLm1vdmVUb1RpbWUodmlkZW8sIG5leHRTdWIuc3RhcnQpXG4gIH1cblxuICBzdGF0aWMgbW92ZVRvVGltZSh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgdGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBVdGlscy5jYXN0U3ViVGltZSh0aW1lKSAvIDEwMDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iXSwic291cmNlUm9vdCI6IiJ9