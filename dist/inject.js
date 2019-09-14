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
                _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].getSubs("eng")
                    .then(function (subs) {
                    subsElement.textContent = ""; // Clear subs loading text
                    videoElement.ontimeupdate = (event) => {
                        _subs__WEBPACK_IMPORTED_MODULE_2__["default"].updateSubs(videoElement, subs, subsElement);
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

class Subs {
    static updateSubs(video, subs, subsElement) {
        let currentTime = _video__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTime(video);
        let currentSub = this.getCurrentSub(subs, currentTime);
        if (currentSub) {
            subsElement.innerHTML = currentSub.text.replace(/\b(\w+)\b/g, "<span class='easysubs-word'>$1</span>");
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
}
/* harmony default export */ __webpack_exports__["default"] = (Subs);


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
        if (typeof time == "number") {
            video.currentTime = time / 1000;
        }
        else {
            video.currentTime = parseInt(time) / 1000;
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Video);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcGFyc2VUaW1lc3RhbXBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcmVzeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5VnR0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvdG9NUy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvU3J0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvVnR0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVyby1maWxsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29udml4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vicy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Es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Y2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmplY3QudHNcIik7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHRvTVMgfSBmcm9tICcuL3RvTVMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHRvU3J0VGltZSB9IGZyb20gJy4vdG9TcnRUaW1lJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1Z0dFRpbWUgfSBmcm9tICcuL3RvVnR0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5VnR0IH0gZnJvbSAnLi9zdHJpbmdpZnlWdHQnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3luYyB9IGZyb20gJy4vcmVzeW5jJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZVRpbWVzdGFtcHMgfSBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgcGFyc2VUaW1lc3RhbXBzIGZyb20gJy4vcGFyc2VUaW1lc3RhbXBzJ1xuXG4vKipcbiAqIFBhcnNlIGEgU1JUIG9yIFdlYlZUVCBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3J0T3JWdHRcbiAqIEByZXR1cm4ge0FycmF5fSBzdWJ0aXRsZXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZSAoc3J0T3JWdHQpIHtcbiAgaWYgKCFzcnRPclZ0dCkgcmV0dXJuIFtdXG5cbiAgY29uc3Qgc291cmNlID0gc3J0T3JWdHRcbiAgICAudHJpbSgpXG4gICAgLmNvbmNhdCgnXFxuJylcbiAgICAucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKVxuICAgIC5yZXBsYWNlKC9eV0VCVlRULipcXG4oPzouKjogLipcXG4pKlxcbi8sICcnKVxuICAgIC5zcGxpdCgnXFxuJylcblxuICByZXR1cm4gc291cmNlLnJlZHVjZSgoY2FwdGlvbnMsIHJvdywgaW5kZXgpID0+IHtcbiAgICBjb25zdCBjYXB0aW9uID0gY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMV1cblxuICAgIGlmICghY2FwdGlvbi5pbmRleCkge1xuICAgICAgaWYgKC9eXFxkKyQvLnRlc3Qocm93KSkge1xuICAgICAgICBjYXB0aW9uLmluZGV4ID0gcGFyc2VJbnQocm93LCAxMClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjYXB0aW9uLmhhc093blByb3BlcnR5KCdzdGFydCcpKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZVRpbWVzdGFtcHMocm93KVxuICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNhcHRpb24sIHRpbWVzdGFtcClcbiAgICAgIH0gZWxzZSBpZiAoY2FwdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICBjYXB0aW9uc1tjYXB0aW9ucy5sZW5ndGggLSAyXS50ZXh0ICs9ICdcXG4nICsgcm93XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FwdGlvbnNcbiAgICB9XG5cbiAgICBpZiAocm93ID09PSAnJykge1xuICAgICAgZGVsZXRlIGNhcHRpb24uaW5kZXhcbiAgICAgIGlmIChpbmRleCAhPT0gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY2FwdGlvbnMucHVzaCh7fSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi50ZXh0XG4gICAgICAgID8gY2FwdGlvbi50ZXh0ICsgJ1xcbicgKyByb3dcbiAgICAgICAgOiByb3dcbiAgICB9XG5cbiAgICByZXR1cm4gY2FwdGlvbnNcbiAgfSwgW3t9XSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogVGltZXN0YW1wIHJlZ2V4XG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG5cbmNvbnN0IFJFID0gL14oKD86XFxkezIsfTopP1xcZHsyfTpcXGR7Mn1bLC5dXFxkezN9KSAtLT4gKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkoPzogKC4qKSk/JC9cblxuLyoqXG4gKiBwYXJzZVRpbWVzdGFtcHNcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge3tzdGFydDogTnVtYmVyLCBlbmQ6IE51bWJlcn19XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBzICh2YWx1ZSkge1xuICBjb25zdCBtYXRjaCA9IFJFLmV4ZWModmFsdWUpXG4gIGlmIChtYXRjaCkge1xuICAgIGNvbnN0IGN1ZSA9IHtcbiAgICAgIHN0YXJ0OiB0b01TKG1hdGNoWzFdKSxcbiAgICAgIGVuZDogdG9NUyhtYXRjaFsyXSlcbiAgICB9XG4gICAgaWYgKG1hdGNoWzNdKSB7XG4gICAgICBjdWUuc2V0dGluZ3MgPSBtYXRjaFszXVxuICAgIH1cbiAgICByZXR1cm4gY3VlXG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogUmVzeW5jIHRoZSBnaXZlbiBzdWJ0aXRsZXMuXG4gKiBAcGFyYW0gY2FwdGlvbnNcbiAqIEBwYXJhbSB0aW1lXG4gKiBAcmV0dXJucyB7QXJyYXl8Kn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN5bmMgKGNhcHRpb25zLCB0aW1lKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoY2FwdGlvbiA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSB0b01TKGNhcHRpb24uc3RhcnQpICsgdGltZVxuICAgIGNvbnN0IGVuZCA9IHRvTVMoY2FwdGlvbi5lbmQpICsgdGltZVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNhcHRpb24sIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9TcnRUaW1lIGZyb20gJy4vdG9TcnRUaW1lJ1xuXG4vKipcbiAqIFN0cmluZ2lmeSB0aGUgZ2l2ZW4gYXJyYXkgb2YgY2FwdGlvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSBzcnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnkgKGNhcHRpb25zKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvU3J0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9TcnRUaW1lKGNhcHRpb24uZW5kKX1gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvVnR0VGltZSBmcm9tICcuL3RvVnR0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zIHRvIFdlYlZUVCBmb3JtYXQuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSB3ZWJWdHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnlWdHQgKGNhcHRpb25zKSB7XG4gIHJldHVybiAnV0VCVlRUXFxuXFxuJyArIGNhcHRpb25zLm1hcCgoY2FwdGlvbiwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdcXG4nIDogJycpICsgW1xuICAgICAgaW5kZXggKyAxLFxuICAgICAgYCR7dG9WdHRUaW1lKGNhcHRpb24uc3RhcnQpfSAtLT4gJHt0b1Z0dFRpbWUoY2FwdGlvbi5lbmQpfSR7Y2FwdGlvbi5zZXR0aW5ncyA/ICcgJyArIGNhcHRpb24uc2V0dGluZ3MgOiAnJ31gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gU1JUIHRpbWVzdGFtcCBhcyBtaWxsZXNlY29uZHMuXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHRpbWVzdGFtcFxuICogQHJldHVybnMge251bWJlcn0gbWlsbGlzZWNvbmRzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9NUyAodGltZXN0YW1wKSB7XG4gIGlmICghaXNOYU4odGltZXN0YW1wKSkge1xuICAgIHJldHVybiB0aW1lc3RhbXBcbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gdGltZXN0YW1wLm1hdGNoKC9eKD86KFxcZHsyLH0pOik/KFxcZHsyfSk6KFxcZHsyfSlbLC5dKFxcZHszfSkkLylcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFNSVCBvciBWVFQgdGltZSBmb3JtYXQ6IFwiJyArIHRpbWVzdGFtcCArICdcIicpXG4gIH1cblxuICBjb25zdCBob3VycyA9IG1hdGNoWzFdID8gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSAqIDM2MDAwMDAgOiAwXG4gIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChtYXRjaFsyXSwgMTApICogNjAwMDBcbiAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzNdLCAxMCkgKiAxMDAwXG4gIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzRdLCAxMClcblxuICByZXR1cm4gaG91cnMgKyBtaW51dGVzICsgc2Vjb25kcyArIG1pbGxpc2Vjb25kc1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgU1JUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9TcnRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30sJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgV2ViVlRUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9WdHRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwiLyoqXG4gKiBHaXZlbiBhIG51bWJlciwgcmV0dXJuIGEgemVyby1maWxsZWQgc3RyaW5nLlxuICogRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNjcyODMvXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9GaWxsICh3aWR0aCwgbnVtYmVyLCBwYWQpIHtcbiAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChudW1iZXIsIHBhZCkge1xuICAgICAgcmV0dXJuIHplcm9GaWxsKHdpZHRoLCBudW1iZXIsIHBhZClcbiAgICB9XG4gIH1cbiAgaWYgKHBhZCA9PT0gdW5kZWZpbmVkKSBwYWQgPSAnMCdcbiAgd2lkdGggLT0gbnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoXG4gIGlmICh3aWR0aCA+IDApIHJldHVybiBuZXcgQXJyYXkod2lkdGggKyAoL1xcLi8udGVzdChudW1iZXIpID8gMiA6IDEpKS5qb2luKHBhZCkgKyBudW1iZXJcbiAgcmV0dXJuIG51bWJlciArICcnXG59XG4iLCJpbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuL3JlYWR5XCJcbmltcG9ydCBPbnZpeCBmcm9tICcuL29udml4JztcbmltcG9ydCBTdWJzIGZyb20gJy4vc3Vicyc7XG5pbXBvcnQgVmlkZW8gZnJvbSAnLi92aWRlbyc7XG5cbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHt9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgdmFyIHJlYWR5U3RhdGVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocmVhZHlTdGF0ZUNoZWNrSW50ZXJ2YWwpO1xuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAvLyBUaGlzIHBhcnQgb2YgdGhlIHNjcmlwdCB0cmlnZ2VycyB3aGVuIHBhZ2UgaXMgZG9uZSBsb2FkaW5nXG4gICAgICBjb25zb2xlLmxvZyhcIkVhc3lTdWJzIGluaXRpYWxpemVkXCIpO1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICBjb25zdCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcC1wbGF5ZXIgdmlkZW8nKTtcbiAgICAgIHJlYWR5KCd2aWRlbycsIGZ1bmN0aW9uICh2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3Vic0VsZW1lbnQgPSBPbnZpeC5jcmVhdGVTdWJzRWxlbWVudCgpO1xuXG4gICAgICAgIE9udml4LmdldFN1YnMoXCJlbmdcIilcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoc3Vicykge1xuICAgICAgICAgICAgc3Vic0VsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiOyAvLyBDbGVhciBzdWJzIGxvYWRpbmcgdGV4dFxuICAgICAgICAgICAgdmlkZW9FbGVtZW50Lm9udGltZXVwZGF0ZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBTdWJzLnVwZGF0ZVN1YnModmlkZW9FbGVtZW50LCBzdWJzLCBzdWJzRWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHZpZGVvRWxlbWVudC5wYXVzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHZpZGVvRWxlbWVudC5wbGF5KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgICAgICAgICAgIFZpZGVvLm1vdmVUb1ByZXZTdWIodmlkZW9FbGVtZW50LCBzdWJzKTtcbiAgICAgICAgICAgICAgfSBpZiAoZXZlbnQuY29kZSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgICAgICAgICAgIFZpZGVvLm1vdmVUb05leHRTdWIodmlkZW9FbGVtZW50LCBzdWJzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG5cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcblxuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09ICdlYXN5c3Vicy13b3JkJykge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN5c3Vicy13b3JkLXRyYW5zbGF0ZVwiKS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgY29udGVudFNjcmlwdFF1ZXJ5OiAndHJhbnNsYXRlJywgdGV4dDogZWxlbWVudC50ZXh0Q29udGVudCwgbGFuZzogXCJydVwiIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy13b3JkLXRyYW5zbGF0ZVwiKSk7XG4gICAgICAgICAgICAgICAgICBPbnZpeC5jcmVhdGVTdWJzVHJhbnNsYXRlRWxlbWVudChlbGVtZW50LCBlbGVtZW50LnRleHRDb250ZW50LCByZXNwb25zZS5kYXRhWzBdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSAnZWFzeXN1YnMtd29yZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlRWxlbWVudHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy13b3JkLXRyYW5zbGF0ZVwiKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pXG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlRWxlbWVudHMoZWxtczogTm9kZUxpc3RPZjxFbGVtZW50Pikge1xuICAgICAgICBlbG1zLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgMTAwMCk7XG59KTtcblxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwic3VidGl0bGVcIjtcblxuY2xhc3MgT252aXgge1xuICBzdGF0aWMgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYmFzZV9wYXRoID0gXCJodHRwczovL2FnZW9mdWx0cm9uLnNpdGUvYXBpL3YxL3N0cmVhbWluZy9zZXJpYWxzL1wiXG4gICAgY29uc3Qgc2VyaWFsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXVxuICAgIGNvbnN0IHN0cmVhbSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzBdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IHNlYXNvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzFdXG4gICAgY29uc3QgZXBpc29kZSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzJdXG4gICAgLy8gaHR0cHM6Ly9hZ2VvZnVsdHJvbi5zaXRlL2FwaS92MS9zdHJlYW1pbmcvc2VyaWFscy8wNDZjYWUwZWVlYzhlMTExL2EwNzBhODE1ODVmYTc4NTYuanNvbj9zZWFzb249NyZlcGlzb2RlPTFcbiAgICBjb25zdCB1cmwgPSBiYXNlX3BhdGggKyBzZXJpYWwgKyBcIi9cIiArIHN0cmVhbSArIFwiLmpzb24/XCIgKyBzZWFzb24gKyBcIiZcIiArIGVwaXNvZGVcblxuICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAudGhlbigocmVzcCkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjb25zdCBzdWJzX3VybCA9IGRhdGEubWVkaWFfZmlsZXMudnR0LmZpbmQoKGVsOiB7IHNyY2xhbmc6IHN0cmluZyB9KSA9PiBlbC5zcmNsYW5nID09PSBsYW5ndWFnZSkuc3JjXG4gICAgICAgIHJldHVybiBmZXRjaChzdWJzX3VybCkudGhlbigocmVzcCkgPT4gcmVzcC50ZXh0KCkpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlKHRleHQpXG4gICAgICB9KVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNFbGVtZW50KCkge1xuICAgIGNvbnN0IHBsYXllckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZwLXVpXCIpO1xuICAgIGxldCBwVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcFRhZy5pZCA9IFwiZWFzeXN1YnNcIjtcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTG9hZGluZyBzdWJ0aXRsZXMgLi4uXCIpO1xuICAgIHBUYWcuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIHBsYXllckVsZW1lbnQuYXBwZW5kQ2hpbGQocFRhZyk7XG4gICAgcmV0dXJuIHBUYWc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlU3Vic1RyYW5zbGF0ZUVsZW1lbnQoc3ViczogSFRNTEVsZW1lbnQsIG9yaWdpbmFsVGV4dDogc3RyaW5nLCB0cmFuc2xhdGVkVGV4dDogc3RyaW5nKSB7XG4gICAgbGV0IHRyYW5zbGF0ZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdHJhbnNsYXRlVGFnLmNsYXNzTmFtZSA9IFwiZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIjtcbiAgICB0cmFuc2xhdGVUYWcuaW5uZXJIVE1MID0gXCI8c3BhbiBjbGFzcz0nZWFzeXN1YnMtd29yZC1vcmlnaW5hbCc+XCIgKyBvcmlnaW5hbFRleHQgKyBcIjwvc3Bhbj5cIiArXG4gICAgICBcIjxocj5cIiArIFwiPHNwYW4gY2xhc3M9J2Vhc3lzdWJzLXdvcmQtdHJhbnNsYXRlZCc+XCIgKyB0cmFuc2xhdGVkVGV4dCArIFwiPC9zcGFuPlwiXG4gICAgc3Vicy5hcHBlbmRDaGlsZCh0cmFuc2xhdGVUYWcpO1xuICAgIHJldHVybiB0cmFuc2xhdGVUYWc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT252aXg7XG4iLCJpbnRlcmZhY2UgTGlzdGVuZXIge1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBmbjogRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBFbGVtZW50T2JqZWN0IHtcbiAgcmVhZHk6IGJvb2xlYW5cbn1cbmxldCBsaXN0ZW5lcnM6IExpc3RlbmVyW10gPSBbXVxubGV0IG9ic2VydmVyXG5cbmZ1bmN0aW9uIGNoZWNrKCkge1xuICAvLyBDaGVjayB0aGUgRE9NIGZvciBlbGVtZW50cyBtYXRjaGluZyBhIHN0b3JlZCBzZWxlY3RvclxuICBmb3IgKHZhciBpID0gMCwgbGVuOiBOdW1iZXIgPSBsaXN0ZW5lcnMubGVuZ3RoLCBsaXN0ZW5lcjogTGlzdGVuZXIsIGVsZW1lbnRzOiBFbGVtZW50T2JqZWN0W107IGkgPCBsZW47IGkrKykge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgIC8vIFF1ZXJ5IGZvciBlbGVtZW50cyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yXG4gICAgZWxlbWVudHMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChsaXN0ZW5lci5zZWxlY3RvcikgYXMgdW5rbm93biBhcyBFbGVtZW50T2JqZWN0W107XG4gICAgZm9yICh2YXIgaiA9IDAsIGpMZW4gPSBlbGVtZW50cy5sZW5ndGgsIGVsZW1lbnQ7IGogPCBqTGVuOyBqKyspIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY2FsbGJhY2sgaXNuJ3QgaW52b2tlZCB3aXRoIHRoZSBcbiAgICAgIC8vIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZVxuICAgICAgaWYgKCFlbGVtZW50LnJlYWR5KSB7XG4gICAgICAgIGVsZW1lbnQucmVhZHkgPSB0cnVlO1xuICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGVsZW1lbnRcbiAgICAgICAgbGlzdGVuZXIuZm4uY2FsbChlbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KHNlbGVjdG9yOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAvLyBTdG9yZSB0aGUgc2VsZWN0b3IgYW5kIGNhbGxiYWNrIHRvIGJlIG1vbml0b3JlZFxuICBsaXN0ZW5lcnMucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGZuOiBmblxuICB9KTtcblxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNoZWNrKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSBET01cbiAgY2hlY2soKTtcbn1cbiIsImltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCI7XG5jbGFzcyBTdWJzIHtcbiAgc3RhdGljIHVwZGF0ZVN1YnModmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSBWaWRlby5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSB0aGlzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBzdWJzRWxlbWVudC5pbm5lckhUTUwgPSBjdXJyZW50U3ViLnRleHQucmVwbGFjZSgvXFxiKFxcdyspXFxiL2csIFwiPHNwYW4gY2xhc3M9J2Vhc3lzdWJzLXdvcmQnPiQxPC9zcGFuPlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic0VsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0Q3VycmVudFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcikge1xuICAgIHJldHVybiBzdWJzLmZpbmQoKHN1Yjogc3ViVGl0bGVUeXBlKSA9PiBzdWIuc3RhcnQgPD0gY3VycmVudFRpbWUgJiYgc3ViLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcmV2U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgLSAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKChzdWIsIGluZGV4KSA9PiBzdWIuZW5kIDw9IGN1cnJlbnRUaW1lICYmIHN1YnNbaW5kZXggKyAxXS5zdGFydCA+PSBjdXJyZW50VGltZSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TmV4dFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViICsgMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZCgoc3ViLCBpbmRleCkgPT4gc3ViLnN0YXJ0ID4gY3VycmVudFRpbWUgJiYgc3Vic1tpbmRleCAtIDFdLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFN1YnM7XG4iLCJpbXBvcnQgU3VicyBmcm9tIFwiLi9zdWJzXCI7XG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcbmNsYXNzIFZpZGVvIHtcbiAgc3RhdGljIGdldEN1cnJlbnRUaW1lKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUgKiAxMDAwKVxuICB9XG5cbiAgc3RhdGljIG1vdmVUb1ByZXZTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdKSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IHByZXZTdWI6IHN1YlRpdGxlVHlwZSA9IFN1YnMuZ2V0UHJldlN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgdGhpcy5tb3ZlVG9UaW1lKHZpZGVvLCBwcmV2U3ViLnN0YXJ0KVxuICB9XG5cbiAgc3RhdGljIG1vdmVUb05leHRTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdKSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IG5leHRTdWI6IHN1YlRpdGxlVHlwZSA9IFN1YnMuZ2V0TmV4dFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgdGhpcy5tb3ZlVG9UaW1lKHZpZGVvLCBuZXh0U3ViLnN0YXJ0KVxuICB9XG5cbiAgc3RhdGljIG1vdmVUb1RpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHRpbWU6IG51bWJlciB8IHN0cmluZykge1xuICAgIGlmICh0eXBlb2YgdGltZSA9PSBcIm51bWJlclwiKSB7XG4gICAgICB2aWRlby5jdXJyZW50VGltZSA9IHRpbWUgLyAxMDAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gcGFyc2VJbnQodGltZSkgLyAxMDAwXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBWaWRlbztcbiJdLCJzb3VyY2VSb290IjoiIn0=