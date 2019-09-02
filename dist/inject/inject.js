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



chrome.runtime.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was sent from scripts/inject.js1");
            // ----------------------------------------------------------
            const subsElement = _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].createSubsElement();
            const video = document.querySelector('video');
            _onvix__WEBPACK_IMPORTED_MODULE_1__["default"].getSubs("eng")
                .then(function (subs) {
                subsElement.textContent = ""; // Clear subs loading text
                Object(_ready__WEBPACK_IMPORTED_MODULE_0__["ready"])('video', function (element) {
                    element.ontimeupdate = (event) => {
                        _subs__WEBPACK_IMPORTED_MODULE_2__["default"].updateSubs(element, subs, subsElement);
                    };
                });
            });
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
        pTag.id = "ext-subs";
        const textNode = document.createTextNode("Loading subtitles ...");
        pTag.appendChild(textNode);
        playerElement.appendChild(pTag);
        return pTag;
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
class Subs {
    static updateSubs(video, subs, subsElement) {
        let currentTime = Math.round(video.currentTime * 1000);
        let currentSub = subs.find(sub => sub.start <= currentTime && sub.end >= currentTime);
        if (currentSub) {
            subsElement.textContent = currentSub.text;
        }
        else {
            subsElement.textContent = "";
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Subs);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcGFyc2VUaW1lc3RhbXBzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvcmVzeW5jLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvc3RyaW5naWZ5VnR0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvdG9NUy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvU3J0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvVnR0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVyby1maWxsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29udml4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vicy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FB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QUFDLElBQUksQ0FBQztRQUNiLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLEVBQUUsRUFBRSxFQUFFO0tBQ1AsQ0FBQyxDQUFDO0lBRUgsUUFBUSxHQUFHLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUNoRCxTQUFTLEVBQUUsSUFBSTtRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0lBRUgsK0NBQStDO0lBQy9DLEtBQUssRUFBRSxDQUFDO0FBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzVDRDtBQUFBLE1BQU0sSUFBSTtJQUNSLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBdUIsRUFBRSxJQUFvQixFQUFFLFdBQXdCO1FBQ3ZGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksV0FBVyxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDO1FBQ3JGLElBQUksVUFBVSxFQUFFO1lBQ2QsV0FBVyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1NBQzNDO2FBQU07WUFDTCxXQUFXLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7Q0FDRjtBQUNjLG1FQUFJLEVBQUMiLCJmaWxlIjoiaW5qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5qZWN0LnRzXCIpO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB0b01TIH0gZnJvbSAnLi90b01TJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1NydFRpbWUgfSBmcm9tICcuL3RvU3J0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdG9WdHRUaW1lIH0gZnJvbSAnLi90b1Z0dFRpbWUnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlIH0gZnJvbSAnLi9wYXJzZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnknXG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeVZ0dCB9IGZyb20gJy4vc3RyaW5naWZ5VnR0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyByZXN5bmMgfSBmcm9tICcuL3Jlc3luYydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VUaW1lc3RhbXBzIH0gZnJvbSAnLi9wYXJzZVRpbWVzdGFtcHMnXG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHBhcnNlVGltZXN0YW1wcyBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcblxuLyoqXG4gKiBQYXJzZSBhIFNSVCBvciBXZWJWVFQgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHNydE9yVnR0XG4gKiBAcmV0dXJuIHtBcnJheX0gc3VidGl0bGVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UgKHNydE9yVnR0KSB7XG4gIGlmICghc3J0T3JWdHQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHNvdXJjZSA9IHNydE9yVnR0XG4gICAgLnRyaW0oKVxuICAgIC5jb25jYXQoJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJylcbiAgICAucmVwbGFjZSgvXldFQlZUVC4qXFxuKD86Lio6IC4qXFxuKSpcXG4vLCAnJylcbiAgICAuc3BsaXQoJ1xcbicpXG5cbiAgcmV0dXJuIHNvdXJjZS5yZWR1Y2UoKGNhcHRpb25zLCByb3csIGluZGV4KSA9PiB7XG4gICAgY29uc3QgY2FwdGlvbiA9IGNhcHRpb25zW2NhcHRpb25zLmxlbmd0aCAtIDFdXG5cbiAgICBpZiAoIWNhcHRpb24uaW5kZXgpIHtcbiAgICAgIGlmICgvXlxcZCskLy50ZXN0KHJvdykpIHtcbiAgICAgICAgY2FwdGlvbi5pbmRleCA9IHBhcnNlSW50KHJvdywgMTApXG4gICAgICAgIHJldHVybiBjYXB0aW9uc1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2FwdGlvbi5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gcGFyc2VUaW1lc3RhbXBzKHJvdylcbiAgICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjYXB0aW9uLCB0aW1lc3RhbXApXG4gICAgICB9IGVsc2UgaWYgKGNhcHRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMl0udGV4dCArPSAnXFxuJyArIHJvd1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgfVxuXG4gICAgaWYgKHJvdyA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSBjYXB0aW9uLmluZGV4XG4gICAgICBpZiAoaW5kZXggIT09IHNvdXJjZS5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNhcHRpb25zLnB1c2goe30pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24udGV4dFxuICAgICAgICA/IGNhcHRpb24udGV4dCArICdcXG4nICsgcm93XG4gICAgICAgIDogcm93XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zXG4gIH0sIFt7fV0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFRpbWVzdGFtcCByZWdleFxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xuXG5jb25zdCBSRSA9IC9eKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkgLS0+ICgoPzpcXGR7Mix9Oik/XFxkezJ9OlxcZHsyfVssLl1cXGR7M30pKD86ICguKikpPyQvXG5cbi8qKlxuICogcGFyc2VUaW1lc3RhbXBzXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHt7c3RhcnQ6IE51bWJlciwgZW5kOiBOdW1iZXJ9fVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlVGltZXN0YW1wcyAodmFsdWUpIHtcbiAgY29uc3QgbWF0Y2ggPSBSRS5leGVjKHZhbHVlKVxuICBpZiAobWF0Y2gpIHtcbiAgICBjb25zdCBjdWUgPSB7XG4gICAgICBzdGFydDogdG9NUyhtYXRjaFsxXSksXG4gICAgICBlbmQ6IHRvTVMobWF0Y2hbMl0pXG4gICAgfVxuICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgY3VlLnNldHRpbmdzID0gbWF0Y2hbM11cbiAgICB9XG4gICAgcmV0dXJuIGN1ZVxuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFJlc3luYyB0aGUgZ2l2ZW4gc3VidGl0bGVzLlxuICogQHBhcmFtIGNhcHRpb25zXG4gKiBAcGFyYW0gdGltZVxuICogQHJldHVybnMge0FycmF5fCp9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzeW5jIChjYXB0aW9ucywgdGltZSkge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKGNhcHRpb24gPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gdG9NUyhjYXB0aW9uLnN0YXJ0KSArIHRpbWVcbiAgICBjb25zdCBlbmQgPSB0b01TKGNhcHRpb24uZW5kKSArIHRpbWVcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjYXB0aW9uLCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0pXG4gIH0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvU3J0VGltZSBmcm9tICcuL3RvU3J0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zLlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gc3J0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5IChjYXB0aW9ucykge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKChjYXB0aW9uLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ1xcbicgOiAnJykgKyBbXG4gICAgICBpbmRleCArIDEsXG4gICAgICBgJHt0b1NydFRpbWUoY2FwdGlvbi5zdGFydCl9IC0tPiAke3RvU3J0VGltZShjYXB0aW9uLmVuZCl9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b1Z0dFRpbWUgZnJvbSAnLi90b1Z0dFRpbWUnXG5cbi8qKlxuICogU3RyaW5naWZ5IHRoZSBnaXZlbiBhcnJheSBvZiBjYXB0aW9ucyB0byBXZWJWVFQgZm9ybWF0LlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gd2ViVnR0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5VnR0IChjYXB0aW9ucykge1xuICByZXR1cm4gJ1dFQlZUVFxcblxcbicgKyBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvVnR0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9WdHRUaW1lKGNhcHRpb24uZW5kKX0ke2NhcHRpb24uc2V0dGluZ3MgPyAnICcgKyBjYXB0aW9uLnNldHRpbmdzIDogJyd9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBSZXR1cm4gdGhlIGdpdmVuIFNSVCB0aW1lc3RhbXAgYXMgbWlsbGVzZWNvbmRzLlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTVMgKHRpbWVzdGFtcCkge1xuICBpZiAoIWlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHRpbWVzdGFtcC5tYXRjaCgvXig/OihcXGR7Mix9KTopPyhcXGR7Mn0pOihcXGR7Mn0pWywuXShcXGR7M30pJC8pXG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBTUlQgb3IgVlRUIHRpbWUgZm9ybWF0OiBcIicgKyB0aW1lc3RhbXAgKyAnXCInKVxuICB9XG5cbiAgY29uc3QgaG91cnMgPSBtYXRjaFsxXSA/IHBhcnNlSW50KG1hdGNoWzFdLCAxMCkgKiAzNjAwMDAwIDogMFxuICBjb25zdCBtaW51dGVzID0gcGFyc2VJbnQobWF0Y2hbMl0sIDEwKSAqIDYwMDAwXG4gIGNvbnN0IHNlY29uZHMgPSBwYXJzZUludChtYXRjaFszXSwgMTApICogMTAwMFxuICBjb25zdCBtaWxsaXNlY29uZHMgPSBwYXJzZUludChtYXRjaFs0XSwgMTApXG5cbiAgcmV0dXJuIGhvdXJzICsgbWludXRlcyArIHNlY29uZHMgKyBtaWxsaXNlY29uZHNcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFNSVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvU3J0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LCR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFdlYlZUVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVnR0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LiR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsIi8qKlxuICogR2l2ZW4gYSBudW1iZXIsIHJldHVybiBhIHplcm8tZmlsbGVkIHN0cmluZy5cbiAqIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjY3MjgzL1xuICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtICB7bnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB6ZXJvRmlsbCAod2lkdGgsIG51bWJlciwgcGFkKSB7XG4gIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobnVtYmVyLCBwYWQpIHtcbiAgICAgIHJldHVybiB6ZXJvRmlsbCh3aWR0aCwgbnVtYmVyLCBwYWQpXG4gICAgfVxuICB9XG4gIGlmIChwYWQgPT09IHVuZGVmaW5lZCkgcGFkID0gJzAnXG4gIHdpZHRoIC09IG51bWJlci50b1N0cmluZygpLmxlbmd0aFxuICBpZiAod2lkdGggPiAwKSByZXR1cm4gbmV3IEFycmF5KHdpZHRoICsgKC9cXC4vLnRlc3QobnVtYmVyKSA/IDIgOiAxKSkuam9pbihwYWQpICsgbnVtYmVyXG4gIHJldHVybiBudW1iZXIgKyAnJ1xufVxuIiwiaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi9yZWFkeVwiXG5pbXBvcnQgT252aXggZnJvbSAnLi9vbnZpeCc7XG5pbXBvcnQgU3VicyBmcm9tICcuL3N1YnMnO1xuXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIHZhciByZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICBjbGVhckludGVydmFsKHJlYWR5U3RhdGVDaGVja0ludGVydmFsKTtcblxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgLy8gVGhpcyBwYXJ0IG9mIHRoZSBzY3JpcHQgdHJpZ2dlcnMgd2hlbiBwYWdlIGlzIGRvbmUgbG9hZGluZ1xuICAgICAgY29uc29sZS5sb2coXCJIZWxsby4gVGhpcyBtZXNzYWdlIHdhcyBzZW50IGZyb20gc2NyaXB0cy9pbmplY3QuanMxXCIpO1xuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICBjb25zdCBzdWJzRWxlbWVudCA9IE9udml4LmNyZWF0ZVN1YnNFbGVtZW50KCk7XG4gICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG5cbiAgICAgIE9udml4LmdldFN1YnMoXCJlbmdcIilcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHN1YnMpIHtcbiAgICAgICAgICBzdWJzRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7IC8vIENsZWFyIHN1YnMgbG9hZGluZyB0ZXh0XG4gICAgICAgICAgcmVhZHkoJ3ZpZGVvJywgZnVuY3Rpb24gKGVsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQub250aW1ldXBkYXRlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIFN1YnMudXBkYXRlU3VicyhlbGVtZW50LCBzdWJzLCBzdWJzRWxlbWVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgfSwgMTAwMCk7XG59KTtcblxuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwic3VidGl0bGVcIjtcblxuY2xhc3MgT252aXgge1xuICBzdGF0aWMgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgYmFzZV9wYXRoID0gXCJodHRwczovL2FnZW9mdWx0cm9uLnNpdGUvYXBpL3YxL3N0cmVhbWluZy9zZXJpYWxzL1wiXG4gICAgY29uc3Qgc2VyaWFsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXVxuICAgIGNvbnN0IHN0cmVhbSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzBdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IHNlYXNvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzFdXG4gICAgY29uc3QgZXBpc29kZSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzJdXG4gICAgLy8gaHR0cHM6Ly9hZ2VvZnVsdHJvbi5zaXRlL2FwaS92MS9zdHJlYW1pbmcvc2VyaWFscy8wNDZjYWUwZWVlYzhlMTExL2EwNzBhODE1ODVmYTc4NTYuanNvbj9zZWFzb249NyZlcGlzb2RlPTFcbiAgICBjb25zdCB1cmwgPSBiYXNlX3BhdGggKyBzZXJpYWwgKyBcIi9cIiArIHN0cmVhbSArIFwiLmpzb24/XCIgKyBzZWFzb24gKyBcIiZcIiArIGVwaXNvZGVcblxuICAgIHJldHVybiBmZXRjaCh1cmwpXG4gICAgICAudGhlbigocmVzcCkgPT4gcmVzcC5qc29uKCkpXG4gICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjb25zdCBzdWJzX3VybCA9IGRhdGEubWVkaWFfZmlsZXMudnR0LmZpbmQoKGVsOiB7IHNyY2xhbmc6IHN0cmluZyB9KSA9PiBlbC5zcmNsYW5nID09PSBsYW5ndWFnZSkuc3JjXG4gICAgICAgIHJldHVybiBmZXRjaChzdWJzX3VybCkudGhlbigocmVzcCkgPT4gcmVzcC50ZXh0KCkpXG4gICAgICB9KVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlKHRleHQpXG4gICAgICB9KVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNFbGVtZW50KCkge1xuICAgIGNvbnN0IHBsYXllckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZwLXVpXCIpO1xuICAgIGxldCBwVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcFRhZy5pZCA9IFwiZXh0LXN1YnNcIjtcbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTG9hZGluZyBzdWJ0aXRsZXMgLi4uXCIpO1xuICAgIHBUYWcuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIHBsYXllckVsZW1lbnQuYXBwZW5kQ2hpbGQocFRhZyk7XG4gICAgcmV0dXJuIHBUYWc7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT252aXg7XG4iLCJpbnRlcmZhY2UgTGlzdGVuZXIge1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBmbjogRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBFbGVtZW50T2JqZWN0IHtcbiAgcmVhZHk6IGJvb2xlYW5cbn1cbmxldCBsaXN0ZW5lcnM6IExpc3RlbmVyW10gPSBbXVxubGV0IG9ic2VydmVyXG5cbmZ1bmN0aW9uIGNoZWNrKCkge1xuICAvLyBDaGVjayB0aGUgRE9NIGZvciBlbGVtZW50cyBtYXRjaGluZyBhIHN0b3JlZCBzZWxlY3RvclxuICBmb3IgKHZhciBpID0gMCwgbGVuOiBOdW1iZXIgPSBsaXN0ZW5lcnMubGVuZ3RoLCBsaXN0ZW5lcjogTGlzdGVuZXIsIGVsZW1lbnRzOiBFbGVtZW50T2JqZWN0W107IGkgPCBsZW47IGkrKykge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgIC8vIFF1ZXJ5IGZvciBlbGVtZW50cyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yXG4gICAgZWxlbWVudHMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChsaXN0ZW5lci5zZWxlY3RvcikgYXMgdW5rbm93biBhcyBFbGVtZW50T2JqZWN0W107XG4gICAgZm9yICh2YXIgaiA9IDAsIGpMZW4gPSBlbGVtZW50cy5sZW5ndGgsIGVsZW1lbnQ7IGogPCBqTGVuOyBqKyspIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY2FsbGJhY2sgaXNuJ3QgaW52b2tlZCB3aXRoIHRoZSBcbiAgICAgIC8vIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZVxuICAgICAgaWYgKCFlbGVtZW50LnJlYWR5KSB7XG4gICAgICAgIGVsZW1lbnQucmVhZHkgPSB0cnVlO1xuICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGVsZW1lbnRcbiAgICAgICAgbGlzdGVuZXIuZm4uY2FsbChlbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KHNlbGVjdG9yOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAvLyBTdG9yZSB0aGUgc2VsZWN0b3IgYW5kIGNhbGxiYWNrIHRvIGJlIG1vbml0b3JlZFxuICBsaXN0ZW5lcnMucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGZuOiBmblxuICB9KTtcblxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNoZWNrKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSBET01cbiAgY2hlY2soKTtcbn1cbiIsImltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuY2xhc3MgU3VicyB7XG4gIHN0YXRpYyB1cGRhdGVTdWJzKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSAqIDEwMDApXG4gICAgbGV0IGN1cnJlbnRTdWIgPSBzdWJzLmZpbmQoc3ViID0+IHN1Yi5zdGFydCA8PSBjdXJyZW50VGltZSAmJiBzdWIuZW5kID49IGN1cnJlbnRUaW1lKVxuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBzdWJzRWxlbWVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRTdWIudGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic0VsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3VicztcbiJdLCJzb3VyY2VSb290IjoiIn0=