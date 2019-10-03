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

/***/ "./node_modules/@cospired/i18n-iso-languages/codes.json":
/*!**************************************************************!*\
  !*** ./node_modules/@cospired/i18n-iso-languages/codes.json ***!
  \**************************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, default */
/***/ (function(module) {

module.exports = JSON.parse("[[\"aa\",\"aar\",\"aar\",\"ISO 639-1:aa\"],[\"ab\",\"abk\",\"abk\",\"ISO 639-1:ab\"],[\"ae\",\"ave\",\"ave\",\"ISO 639-1:ae\"],[\"af\",\"afr\",\"afr\",\"ISO 639-1:af\"],[\"ak\",\"aka\",\"aka\",\"ISO 639-1:ak\"],[\"am\",\"amh\",\"amh\",\"ISO 639-1:am\"],[\"an\",\"arg\",\"arg\",\"ISO 639-1:an\"],[\"ar\",\"ara\",\"ara\",\"ISO 639-1:ar\"],[\"as\",\"asm\",\"asm\",\"ISO 639-1:as\"],[\"av\",\"ava\",\"ava\",\"ISO 639-1:av\"],[\"ay\",\"aym\",\"aym\",\"ISO 639-1:ay\"],[\"az\",\"aze\",\"aze\",\"ISO 639-1:az\"],[\"ba\",\"bak\",\"bak\",\"ISO 639-1:ba\"],[\"be\",\"bel\",\"bel\",\"ISO 639-1:be\"],[\"bg\",\"bul\",\"bul\",\"ISO 639-1:bg\"],[\"bh\",\"bih\",\"bih\",\"ISO 639-1:bh\"],[\"bi\",\"bis\",\"bis\",\"ISO 639-1:bi\"],[\"bm\",\"bam\",\"bam\",\"ISO 639-1:bm\"],[\"bn\",\"ben\",\"ben\",\"ISO 639-1:bn\"],[\"bo\",\"bod\",\"tib\",\"ISO 639-1:bo\"],[\"br\",\"bre\",\"bre\",\"ISO 639-1:br\"],[\"bs\",\"bos\",\"bos\",\"ISO 639-1:bs\"],[\"ca\",\"cat\",\"cat\",\"ISO 639-1:ca\"],[\"ce\",\"che\",\"che\",\"ISO 639-1:ce\"],[\"ch\",\"cha\",\"cha\",\"ISO 639-1:ch\"],[\"co\",\"cos\",\"cos\",\"ISO 639-1:co\"],[\"cr\",\"cre\",\"cre\",\"ISO 639-1:cr\"],[\"cs\",\"ces\",\"cze\",\"ISO 639-1:cs\"],[\"cu\",\"chu\",\"chu\",\"ISO 639-1:cu\"],[\"cv\",\"chv\",\"chv\",\"ISO 639-1:cv\"],[\"cy\",\"cym\",\"wel\",\"ISO 639-1:cy\"],[\"da\",\"dan\",\"dan\",\"ISO 639-1:da\"],[\"de\",\"deu\",\"ger\",\"ISO 639-1:de\"],[\"dv\",\"div\",\"div\",\"ISO 639-1:dv\"],[\"dz\",\"dzo\",\"dzo\",\"ISO 639-1:dz\"],[\"ee\",\"ewe\",\"ewe\",\"ISO 639-1:ee\"],[\"el\",\"ell\",\"gre\",\"ISO 639-1:el\"],[\"en\",\"eng\",\"eng\",\"ISO 639-1:en\"],[\"eo\",\"epo\",\"epo\",\"ISO 639-1:eo\"],[\"es\",\"spa\",\"spa\",\"ISO 639-1:es\"],[\"et\",\"est\",\"est\",\"ISO 639-1:et\"],[\"eu\",\"eus\",\"baq\",\"ISO 639-1:eu\"],[\"fa\",\"fas\",\"per\",\"ISO 639-1:fa\"],[\"ff\",\"ful\",\"ful\",\"ISO 639-1:ff\"],[\"fi\",\"fin\",\"fin\",\"ISO 639-1:fi\"],[\"fj\",\"fij\",\"fij\",\"ISO 639-1:fj\"],[\"fo\",\"fao\",\"fao\",\"ISO 639-1:fo\"],[\"fr\",\"fra\",\"fre\",\"ISO 639-1:fr\"],[\"fy\",\"fry\",\"fry\",\"ISO 639-1:fy\"],[\"ga\",\"gle\",\"gle\",\"ISO 639-1:ga\"],[\"gd\",\"gla\",\"gla\",\"ISO 639-1:gd\"],[\"gl\",\"glg\",\"glg\",\"ISO 639-1:gl\"],[\"gn\",\"grn\",\"grn\",\"ISO 639-1:gn\"],[\"gu\",\"guj\",\"guj\",\"ISO 639-1:gu\"],[\"gv\",\"glv\",\"glv\",\"ISO 639-1:gv\"],[\"ha\",\"hau\",\"hau\",\"ISO 639-1:ha\"],[\"he\",\"heb\",\"heb\",\"ISO 639-1:he\"],[\"hi\",\"hin\",\"hin\",\"ISO 639-1:hi\"],[\"ho\",\"hmo\",\"hmo\",\"ISO 639-1:ho\"],[\"hr\",\"hrv\",\"hrv\",\"ISO 639-1:hr\"],[\"ht\",\"hat\",\"hat\",\"ISO 639-1:ht\"],[\"hu\",\"hun\",\"hun\",\"ISO 639-1:hu\"],[\"hy\",\"hye\",\"arm\",\"ISO 639-1:hy\"],[\"hz\",\"her\",\"her\",\"ISO 639-1:hz\"],[\"ia\",\"ina\",\"ina\",\"ISO 639-1:ia\"],[\"id\",\"ind\",\"ind\",\"ISO 639-1:id\"],[\"ie\",\"ile\",\"ile\",\"ISO 639-1:ie\"],[\"ig\",\"ibo\",\"ibo\",\"ISO 639-1:ig\"],[\"ii\",\"iii\",\"iii\",\"ISO 639-1:ii\"],[\"ik\",\"ipk\",\"ipk\",\"ISO 639-1:ik\"],[\"io\",\"ido\",\"ido\",\"ISO 639-1:io\"],[\"is\",\"isl\",\"ice\",\"ISO 639-1:is\"],[\"it\",\"ita\",\"ita\",\"ISO 639-1:it\"],[\"iu\",\"iku\",\"iku\",\"ISO 639-1:iu\"],[\"ja\",\"jpn\",\"jpn\",\"ISO 639-1:ja\"],[\"jv\",\"jav\",\"jav\",\"ISO 639-1:jv\"],[\"ka\",\"kat\",\"geo\",\"ISO 639-1:ka\"],[\"kg\",\"kon\",\"kon\",\"ISO 639-1:kg\"],[\"ki\",\"kik\",\"kik\",\"ISO 639-1:ki\"],[\"kj\",\"kua\",\"kua\",\"ISO 639-1:kj\"],[\"kk\",\"kaz\",\"kaz\",\"ISO 639-1:kk\"],[\"kl\",\"kal\",\"kal\",\"ISO 639-1:kl\"],[\"km\",\"khm\",\"khm\",\"ISO 639-1:km\"],[\"kn\",\"kan\",\"kan\",\"ISO 639-1:kn\"],[\"ko\",\"kor\",\"kor\",\"ISO 639-1:ko\"],[\"kr\",\"kau\",\"kau\",\"ISO 639-1:kr\"],[\"ks\",\"kas\",\"kas\",\"ISO 639-1:ks\"],[\"ku\",\"kur\",\"kur\",\"ISO 639-1:ku\"],[\"kv\",\"kom\",\"kom\",\"ISO 639-1:kv\"],[\"kw\",\"cor\",\"cor\",\"ISO 639-1:kw\"],[\"ky\",\"kir\",\"kir\",\"ISO 639-1:ky\"],[\"la\",\"lat\",\"lat\",\"ISO 639-1:la\"],[\"lb\",\"ltz\",\"ltz\",\"ISO 639-1:lb\"],[\"lg\",\"lug\",\"lug\",\"ISO 639-1:lg\"],[\"li\",\"lim\",\"lim\",\"ISO 639-1:li\"],[\"ln\",\"lin\",\"lin\",\"ISO 639-1:ln\"],[\"lo\",\"lao\",\"lao\",\"ISO 639-1:lo\"],[\"lt\",\"lit\",\"lit\",\"ISO 639-1:lt\"],[\"lu\",\"lub\",\"lub\",\"ISO 639-1:lu\"],[\"lv\",\"lav\",\"lav\",\"ISO 639-1:lv\"],[\"mg\",\"mlg\",\"mlg\",\"ISO 639-1:mg\"],[\"mh\",\"mah\",\"mah\",\"ISO 639-1:mh\"],[\"mi\",\"mri\",\"mao\",\"ISO 639-1:mi\"],[\"mk\",\"mkd\",\"mac\",\"ISO 639-1:mk\"],[\"ml\",\"mal\",\"mal\",\"ISO 639-1:ml\"],[\"mn\",\"mon\",\"mon\",\"ISO 639-1:mn\"],[\"mr\",\"mar\",\"mar\",\"ISO 639-1:mr\"],[\"ms\",\"msa\",\"may\",\"ISO 639-1:ms\"],[\"mt\",\"mlt\",\"mlt\",\"ISO 639-1:mt\"],[\"my\",\"mya\",\"bur\",\"ISO 639-1:my\"],[\"na\",\"nau\",\"nau\",\"ISO 639-1:na\"],[\"nb\",\"nob\",\"nob\",\"ISO 639-1:nb\"],[\"nd\",\"nde\",\"nde\",\"ISO 639-1:nd\"],[\"ne\",\"nep\",\"nep\",\"ISO 639-1:ne\"],[\"ng\",\"ndo\",\"ndo\",\"ISO 639-1:ng\"],[\"nl\",\"nld\",\"dut\",\"ISO 639-1:nl\"],[\"nn\",\"nno\",\"nno\",\"ISO 639-1:nn\"],[\"no\",\"nor\",\"nor\",\"ISO 639-1:no\"],[\"nr\",\"nbl\",\"nbl\",\"ISO 639-1:nr\"],[\"nv\",\"nav\",\"nav\",\"ISO 639-1:nv\"],[\"ny\",\"nya\",\"nya\",\"ISO 639-1:ny\"],[\"oc\",\"oci\",\"oci\",\"ISO 639-1:oc\"],[\"oj\",\"oji\",\"oji\",\"ISO 639-1:oj\"],[\"om\",\"orm\",\"orm\",\"ISO 639-1:om\"],[\"or\",\"ori\",\"ori\",\"ISO 639-1:or\"],[\"os\",\"oss\",\"oss\",\"ISO 639-1:os\"],[\"pa\",\"pan\",\"pan\",\"ISO 639-1:pa\"],[\"pi\",\"pli\",\"pli\",\"ISO 639-1:pi\"],[\"pl\",\"pol\",\"pol\",\"ISO 639-1:pl\"],[\"ps\",\"pus\",\"pus\",\"ISO 639-1:ps\"],[\"pt\",\"por\",\"por\",\"ISO 639-1:pt\"],[\"qu\",\"que\",\"que\",\"ISO 639-1:qu\"],[\"rm\",\"roh\",\"roh\",\"ISO 639-1:rm\"],[\"rn\",\"run\",\"run\",\"ISO 639-1:rn\"],[\"ro\",\"ron\",\"rum\",\"ISO 639-1:ro\"],[\"ru\",\"rus\",\"rus\",\"ISO 639-1:ru\"],[\"rw\",\"kin\",\"kin\",\"ISO 639-1:rw\"],[\"sa\",\"san\",\"san\",\"ISO 639-1:sa\"],[\"sc\",\"srd\",\"srd\",\"ISO 639-1:sc\"],[\"sd\",\"snd\",\"snd\",\"ISO 639-1:sd\"],[\"se\",\"sme\",\"sme\",\"ISO 639-1:se\"],[\"sg\",\"sag\",\"sag\",\"ISO 639-1:sg\"],[\"si\",\"sin\",\"sin\",\"ISO 639-1:si\"],[\"sk\",\"slk\",\"slo\",\"ISO 639-1:sk\"],[\"sl\",\"slv\",\"slv\",\"ISO 639-1:sl\"],[\"sm\",\"smo\",\"smo\",\"ISO 639-1:sm\"],[\"sn\",\"sna\",\"sna\",\"ISO 639-1:sn\"],[\"so\",\"som\",\"som\",\"ISO 639-1:so\"],[\"sq\",\"sqi\",\"alb\",\"ISO 639-1:sq\"],[\"sr\",\"srp\",\"srp\",\"ISO 639-1:sr\"],[\"ss\",\"ssw\",\"ssw\",\"ISO 639-1:ss\"],[\"st\",\"sot\",\"sot\",\"ISO 639-1:st\"],[\"su\",\"sun\",\"sun\",\"ISO 639-1:su\"],[\"sv\",\"swe\",\"swe\",\"ISO 639-1:sv\"],[\"sw\",\"swa\",\"swa\",\"ISO 639-1:sw\"],[\"ta\",\"tam\",\"tam\",\"ISO 639-1:ta\"],[\"te\",\"tel\",\"tel\",\"ISO 639-1:te\"],[\"tg\",\"tgk\",\"tgk\",\"ISO 639-1:tg\"],[\"th\",\"tha\",\"tha\",\"ISO 639-1:th\"],[\"ti\",\"tir\",\"tir\",\"ISO 639-1:ti\"],[\"tk\",\"tuk\",\"tuk\",\"ISO 639-1:tk\"],[\"tl\",\"tgl\",\"tgl\",\"ISO 639-1:tl\"],[\"tn\",\"tsn\",\"tsn\",\"ISO 639-1:tn\"],[\"to\",\"ton\",\"ton\",\"ISO 639-1:to\"],[\"tr\",\"tur\",\"tur\",\"ISO 639-1:tr\"],[\"ts\",\"tso\",\"tso\",\"ISO 639-1:ts\"],[\"tt\",\"tat\",\"tat\",\"ISO 639-1:tt\"],[\"tw\",\"twi\",\"twi\",\"ISO 639-1:tw\"],[\"ty\",\"tah\",\"tah\",\"ISO 639-1:ty\"],[\"ug\",\"uig\",\"uig\",\"ISO 639-1:ug\"],[\"uk\",\"ukr\",\"ukr\",\"ISO 639-1:uk\"],[\"ur\",\"urd\",\"urd\",\"ISO 639-1:ur\"],[\"uz\",\"uzb\",\"uzb\",\"ISO 639-1:uz\"],[\"ve\",\"ven\",\"ven\",\"ISO 639-1:ve\"],[\"vi\",\"vie\",\"vie\",\"ISO 639-1:vi\"],[\"vo\",\"vol\",\"vol\",\"ISO 639-1:vo\"],[\"wa\",\"wln\",\"wln\",\"ISO 639-1:wa\"],[\"wo\",\"wol\",\"wol\",\"ISO 639-1:wo\"],[\"xh\",\"xho\",\"xho\",\"ISO 639-1:xh\"],[\"yi\",\"yid\",\"yid\",\"ISO 639-1:yi\"],[\"yo\",\"yor\",\"yor\",\"ISO 639-1:yo\"],[\"za\",\"zha\",\"zha\",\"ISO 639-1:za\"],[\"zh\",\"zho\",\"chi\",\"ISO 639-1:zh\"],[\"zu\",\"zul\",\"zul\",\"ISO 639-1:zu\"]]");

/***/ }),

/***/ "./node_modules/@cospired/i18n-iso-languages/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@cospired/i18n-iso-languages/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var codes = __webpack_require__(/*! ./codes.json */ "./node_modules/@cospired/i18n-iso-languages/codes.json");
var registeredLocales = {};

/*
 * All codes map to ISO 3166-1 alpha-2
 */
var alpha2 = {},
  alpha3T = {},
  alpha3B = {},
  invertedAlpha3B = {};

codes.forEach(function(codeInformation) {
  var s = codeInformation;
  alpha2[s[0]] = s[1];
  alpha3T[s[1]] = s[0];
  alpha3B[s[2]] = s[0];
  invertedAlpha3B[s[0]] = s[2];
});

function registerLocale(localeData) {
  if (!localeData.locale) {
    throw new TypeError('Missing localeData.locale');
  }

  if (!localeData.languages) {
    throw new TypeError('Missing localeData.languages');
  }

  registeredLocales[localeData.locale] = localeData.languages;
}

exports.registerLocale = registerLocale;

/*
 * @param code Alpha-3T code
 * @return Alpha-2 code or undefined
 */
function alpha3TToAlpha2(code) {

  return alpha3T[code];
}
exports.alpha3TToAlpha2 = alpha3TToAlpha2;

/*
 * @param code Alpha-3B code
 * @return Alpha-2 code or undefined
 */
function alpha3BToAlpha2(code) {

  return alpha3B[code];
}
exports.alpha3BToAlpha2 = alpha3BToAlpha2;

/*
 * @param code Alpha-2 code
 * @return Alpha-3T code or undefined
 */
function alpha2ToAlpha3T(code) {

  return alpha2[code];
}
exports.alpha2ToAlpha3T = alpha2ToAlpha3T;

/*
 * @param code Alpha-2 code
 * @return Alpha-3B code or undefined
 */
function alpha2ToAlpha3B(code) {

  return invertedAlpha3B[code];
}
exports.alpha2ToAlpha3B = alpha2ToAlpha3B;

/*
 * @param code ISO 639-1 alpha-2, ISO 639-2 alpha-3 T or B
 * @return ISO 639-2 alpha-3 T
 */
function toAlpha3T(code) {
  if (typeof code === "string") {
    if(code.length === 2) {

      return alpha2ToAlpha3T(code.toLowerCase());
    }
    if (code.length === 3) {

      if( alpha3T[code.toLowerCase()] ) {

        return code.toLowerCase();
      }
      if( alpha3BToAlpha2(code.toLowerCase()) ) {

        return alpha2ToAlpha3T(alpha3BToAlpha2(code.toLowerCase()));
      }
    }
  }

  return undefined;
}
exports.toAlpha3T = toAlpha3T;

/*
 * @param code ISO 639-1 alpha-2, ISO 639-2 alpha-3 T or B
 * @return ISO 639-2 alpha-3 B
 */
function toAlpha3B(code) {
  if (typeof code === "string") {
    if(code.length === 2) {

      return alpha2ToAlpha3B(code.toLowerCase());
    }
    if (code.length === 3) {

      if( alpha3B[code.toLowerCase()] ) {

        return code.toLowerCase();
      }
      if( alpha3T[code.toLowerCase()] ) {

        return alpha2ToAlpha3B(alpha3TToAlpha2(code.toLowerCase()));
      }
    }
  }

  return undefined;
}
exports.toAlpha3B = toAlpha3B;

/*
 * @param code ISO 639-1 alpha-2, ISO 639-2 alpha-3 T or B
 * @return ISO 639-1 alpha-2
 */
function toAlpha2(code) {
  if (typeof code === "string") {
    if (code.length === 2) {

      return code.toLowerCase();
    }
    if(code.length === 3) {

      if ( alpha3B[code.toLowerCase()]) {

        return alpha3BToAlpha2(code.toLowerCase());
      }
      if ( alpha3T[code.toLowerCase()]) {

        return alpha3TToAlpha2(code.toLowerCase());
      }
    }
  }

  return undefined;
}
exports.toAlpha2 = toAlpha2;

/*
 * @param code ISO 639-1 alpha-2, ISO 639-2 alpha-3 T or B
 * @param lang language for country name
 * @return name or undefined
 */
exports.getName = function(code, lang) {
  try {
    var d = registeredLocales[lang.toLowerCase()];
    return d[toAlpha2(code)];
  } catch (err) {
    return undefined;
  }
};

/*
 * @param lang language for language names
 * @return Object of language code mapped to language name
 */
exports.getNames = function(lang) {
  var d = registeredLocales[lang.toLowerCase()];
  if (d === undefined) {
    return {};
  }
  return d;
};

/*
 * @param name name
 * @param lang language for language name
 * @return ISO 639-1 alpha-2 or undefined
 */
exports.getAlpha2Code = function(name, lang) {
  try {
    var p, codenames = registeredLocales[lang.toLowerCase()];
    for (p in codenames) {
      if (codenames.hasOwnProperty(p)) {
        if (codenames[p].toLowerCase() === name.toLowerCase()) {
          return p;
        }
      }
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};

/*
 * @return Object of alpha-2 codes mapped to alpha-3 T codes
 */
exports.getAlpha2Codes = function() {
  return alpha2;
};

/*
 * @param name name
 * @param lang language for country name
 * @return ISO 639-2 alpha-3 T or undefined
 */
exports.getAlpha3TCode = function(name, lang) {
  var alpha2 = this.getAlpha2Code(name, lang);
  if (alpha2) {
    return this.toAlpha3T(alpha2);
  } else {
    return undefined;
  }
};

/*
 * @param name name
 * @param lang language for country name
 * @return ISO 639-2 alpha-3 B or undefined
 */
exports.getAlpha3BCode = function(name, lang) {
  var alpha2 = this.getAlpha2Code(name, lang);
  if (alpha2) {
    return this.toAlpha3B(alpha2);
  } else {
    return undefined;
  }
};

/*
 * @return Object of alpha-3 T codes mapped to alpha-2 codes
 */
exports.getAlpha3TCodes = function() {
  return alpha3T;
};

/*
 * @return Object of alpha-3 B codes mapped to alpha-2 codes
 */
exports.getAlpha3BCodes = function() {
  return alpha3B;
};

/*
 * @return Array of supported languages
 */
exports.langs = function() {
  return Object.keys(registeredLocales);
};

/*
 * @param code ISO 639-1 alpha-2, 639-2 alpha-3 T or B code
 * @return Boolean
 */
exports.isValid = function(code) {
  return this.toAlpha3T(code) !== undefined;
};


/***/ }),

/***/ "./node_modules/animejs/lib/anime.es.js":
/*!**********************************************!*\
  !*** ./node_modules/animejs/lib/anime.es.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * anime.js v3.1.0
 * (c) 2019 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
  rgb: function (a) { return /^rgb/.test(a); },
  hsl: function (a) { return /^hsl/.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; }
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.round(t * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  var eases = { linear: function () { return function (t) { return t; }; } };

  var functionEasings = {
    Sine: function () { return function (t) { return 1 - Math.cos(t * Math.PI / 2); }; },
    Circ: function () { return function (t) { return 1 - Math.sqrt(1 - t * t); }; },
    Back: function () { return function (t) { return t * t * (3 * t - 2); }; },
    Bounce: function () { return function (t) {
      var pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {}
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    }; },
    Elastic: function (amplitude, period) {
      if ( amplitude === void 0 ) amplitude = 1;
      if ( period === void 0 ) period = .5;

      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  };

  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () { return function (t) { return Math.pow(t, i + 2); }; };
  });

  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = function (a, b) { return function (t) { return 1 - easeIn(a, b)(1 - t); }; };
    eases['easeInOut' + name] = function (a, b) { return function (t) { return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 
      1 - easeIn(a, b)(t * -2 + 2) / 2; }; };
  });

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return applyArguments(ease, args);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) { return a.concat(is.arr(b) ? flattenArray(b) : b); }, []);
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) { return split[1]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (getAttribute(el, prop) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var reg  = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m; while (m = reg.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  if (/\s/g.test(val)) { return val; }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) { return unitLess + unit; }
  return unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) { break; }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width / viewBox[2],
    h: height / viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  switch (path.property) {
    case 'x': return (p.x - svg.x) * svg.w;
    case 'y': return (p.y - svg.y) * svg.h;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(rgx) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];
var pausedInstances = [];
var raf;

var engine = (function () {
  function play() { 
    raf = requestAnimationFrame(step);
  }
  function step(t) {
    var activeInstancesLength = activeInstances.length;
    if (activeInstancesLength) {
      var i = 0;
      while (i < activeInstancesLength) {
        var activeInstance = activeInstances[i];
        if (!activeInstance.paused) {
          activeInstance.tick(t);
        } else {
          var instanceIndex = activeInstances.indexOf(activeInstance);
          if (instanceIndex > -1) {
            activeInstances.splice(instanceIndex, 1);
            activeInstancesLength = activeInstances.length;
          }
        }
        i++;
      }
      play();
    } else {
      raf = cancelAnimationFrame(raf);
    }
  }
  return play;
})();

function handleVisibilityChange() {
  if (document.hidden) {
    activeInstances.forEach(function (ins) { return ins.pause(); });
    pausedInstances = activeInstances.slice(0);
    anime.running = activeInstances = [];
  } else {
    pausedInstances.forEach(function (ins) { return ins.play(); });
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) { return child.reversed = instance.reversed; });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekChild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekChild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekChild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;
        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    if (instance.completed) { instance.reset(); }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    if (!raf) { engine(); }
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargets(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    var animations = instance.animations;
    var children = instance.children;
    removeTargetsFromAnimations(targetsArray, animations);
    for (var c = children.length; c--;) {
      var child = children[c];
      var childAnimations = child.animations;
      removeTargetsFromAnimations(targetsArray, childAnimations);
      if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
    }
    if (!animations.length && !children.length) { instance.pause(); }
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.1.0';
anime.speed = 1;
anime.running = activeInstances;
anime.remove = removeTargets;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* harmony default export */ __webpack_exports__["default"] = (anime);


/***/ }),

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

/***/ "./src/events_handlers.ts":
/*!********************************!*\
  !*** ./src/events_handlers.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _video__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video */ "./src/video.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/ui.ts");
/* harmony import */ var _subs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subs */ "./src/subs.ts");




class EventsHandlers {
    constructor(videoElement, subs, subsElement, subsProgressBarElement) {
        this.videoElement = videoElement;
        this.subs = subs;
        this.subsElement = subsElement;
        this.subsProgressBarElement = subsProgressBarElement;
        this.resizeObserver = this.createResizeObserver();
        this.keyboardHandler = this.keyboardHandler.bind(this);
        this.subsWordMouseOver = this.subsWordMouseOver.bind(this);
        this.subsWordMouseOut = this.subsWordMouseOut.bind(this);
        this.videoOnTimeUpdate = this.videoOnTimeUpdate.bind(this);
        this.videoPause = this.videoPause.bind(this);
        this.createResizeObserver = this.createResizeObserver.bind(this);
        this.subsMouseEnter = this.subsMouseEnter.bind(this);
        this.subsMouseLeave = this.subsMouseLeave.bind(this);
        this.subsClick = this.subsClick.bind(this);
        this.translateOriginalElement = document.querySelector(".easysubs-translate-original");
        this.translateResultElement = document.querySelector(".easysubs-translate-result");
        this.translateContainerElement = document.querySelector(".easysubs-translate-container");
    }
    addEvents() {
        ["keyup", "keydown", "keypress"].forEach(eventType => {
            document.addEventListener(eventType, this.keyboardHandler, true);
        });
        this.subsElement.addEventListener("mouseenter", this.subsMouseEnter);
        this.subsElement.addEventListener("mouseleave", this.subsMouseLeave);
        document.addEventListener("mouseover", this.subsWordMouseOver);
        document.addEventListener("mouseout", this.subsWordMouseOut);
        this.videoElement.addEventListener("timeupdate", this.videoOnTimeUpdate);
        this.videoElement.addEventListener("pause", this.videoPause);
        this.resizeObserver.observe(this.subsProgressBarElement);
        this.subsElement.addEventListener("click", this.subsClick);
    }
    removeEvents() {
        ["keyup", "keydown", "keypress"].forEach(eventType => {
            document.removeEventListener(eventType, this.keyboardHandler, true);
        });
        this.subsElement.removeEventListener("mouseenter", this.subsMouseEnter);
        this.subsElement.removeEventListener("mouseleave", this.subsMouseLeave);
        document.removeEventListener("mouseover", this.subsWordMouseOver);
        document.removeEventListener("mouseout", this.subsWordMouseOut);
        this.videoElement.removeEventListener("timeupdate", this.videoOnTimeUpdate);
        this.videoElement.removeEventListener("pause", this.videoPause);
        this.resizeObserver.unobserve(this.subsProgressBarElement);
        this.subsElement.removeEventListener("click", this.subsClick);
    }
    keyboardHandler(event) {
        if (event.code == "ArrowLeft") {
            event.stopPropagation();
            if (event.type == "keydown") {
                _video__WEBPACK_IMPORTED_MODULE_0__["default"].moveToPrevSub(this.videoElement, this.subs, this.subsProgressBarElement);
            }
        }
        if (event.code == "ArrowRight") {
            event.stopPropagation();
            if (event.type == "keydown") {
                _video__WEBPACK_IMPORTED_MODULE_0__["default"].moveToNextSub(this.videoElement, this.subs, this.subsProgressBarElement);
            }
        }
    }
    subsMouseEnter() {
        this.videoElement.pause();
    }
    subsMouseLeave() {
        this.videoElement.play();
    }
    subsWordMouseOver(event) {
        let element = event.target;
        if (element.className === 'easysubs-word') {
            if (element.getElementsByClassName("easysubs-translate-container").length != 0) {
                return;
            }
            const word = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/)[0];
            chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: word, lang: "ru" }, (response) => {
                _ui__WEBPACK_IMPORTED_MODULE_2__["default"].setTranslation(this.translateContainerElement, this.translateOriginalElement, this.translateResultElement, word, response.data[0]);
            });
        }
    }
    subsWordMouseOut(event) {
        let element = event.target;
        if (element.className === 'easysubs-word') {
            this.translateContainerElement.style.display = "none";
        }
    }
    videoOnTimeUpdate(event) {
        const currentSub = _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubs(this.videoElement, this.subs, this.subsElement);
        _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs);
        if (currentSub == null && this.translateContainerElement.style.display != "none") {
            this.translateContainerElement.style.display = "none";
        }
    }
    videoPause(event) {
        _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, true);
    }
    createResizeObserver() {
        return new ResizeObserver(() => {
            _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, true);
        });
    }
    subsClick(event) {
        const text = this.subsElement.textContent;
        const element = event.target;
        if (element.getElementsByClassName("easysubs-word-translate").length != 0) {
            return;
        }
        chrome.runtime.sendMessage({ contentScriptQuery: 'translate', text: text, lang: "ru" }, (response) => {
            _utils__WEBPACK_IMPORTED_MODULE_1__["default"].removeAllElements(document.querySelectorAll(".easysubs-word-translate"));
            _ui__WEBPACK_IMPORTED_MODULE_2__["default"].setTranslation(this.translateContainerElement, this.translateOriginalElement, this.translateResultElement, text, response.data[0]);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (EventsHandlers);


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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui */ "./src/ui.ts");
/* harmony import */ var _events_handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events_handlers */ "./src/events_handlers.ts");




chrome.runtime.sendMessage({}, function (response) {
    const service = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].detectService();
    if (service == null) {
        return;
    }
    console.log("EasySubs initialized. Service: " + service.constructor.name);
    // ----------------------------------------------------------
    Object(_ready__WEBPACK_IMPORTED_MODULE_0__["ready"])('video', function (videoElement) {
        initialize(service, videoElement);
        let eventsHandler = null;
        let oldHref = document.location.href;
        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                    eventsHandler.removeEvents();
                    initialize(service, videoElement);
                    oldHref = document.location.href;
                }
            });
        });
        var config = { childList: true, subtree: true };
        observer.observe(document.querySelector("body"), config);
        function initialize(service, videoElement) {
            const playerContainerElement = service.playerContainerElement();
            let subsElement = _ui__WEBPACK_IMPORTED_MODULE_2__["default"].createSubsElement(playerContainerElement);
            let subsProgressBarElement = _ui__WEBPACK_IMPORTED_MODULE_2__["default"].createSubsProgressBarElement(playerContainerElement);
            service.getSubs("eng")
                .then(subs => {
                console.log("Subtitles loaded. subs count: " + subs.length);
                subsElement.textContent = ""; // Clear subs loading text
                eventsHandler = new _events_handlers__WEBPACK_IMPORTED_MODULE_3__["default"](videoElement, subs, subsElement, subsProgressBarElement);
                eventsHandler.addEvents();
            });
        }
    });
});


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

/***/ "./src/services/kinopub.ts":
/*!*********************************!*\
  !*** ./src/services/kinopub.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var subtitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! subtitle */ "./node_modules/subtitle/lib/index.js");

class KinoPub {
    getSubs(language) {
        return new Promise((resolve, reject) => {
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])("");
        });
    }
    playerContainerElement() {
        return document.createElement("div");
    }
}
/* harmony default export */ __webpack_exports__["default"] = (KinoPub);


/***/ }),

/***/ "./src/services/netflix.ts":
/*!*********************************!*\
  !*** ./src/services/netflix.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var subtitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! subtitle */ "./node_modules/subtitle/lib/index.js");

class Netflix {
    getSubs(language) {
        return new Promise((resolve, reject) => {
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])("");
        });
    }
    playerContainerElement() {
        return document.createElement("div");
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Netflix);


/***/ }),

/***/ "./src/services/onvix.ts":
/*!*******************************!*\
  !*** ./src/services/onvix.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var subtitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! subtitle */ "./node_modules/subtitle/lib/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Onvix {
    getSubs(language) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoType = window.location.pathname.split("/")[1];
            const base_pathname = "/api/v1/streaming/";
            const videoId = window.location.pathname.split("/")[2];
            const stream = window.location.search.split("&")[0].split("=")[1];
            const season = window.location.search.split("&")[1];
            const episode = window.location.search.split("&")[2];
            let url = `${window.location.origin}${base_pathname}${videoType}s/${videoId}/${stream}.json?`;
            if (videoType == "serial") {
                url = `${url}${season}&${episode}`;
            }
            const resp = yield fetch(url);
            const data = yield resp.json();
            const subs_url = data.media_files.vtt.find((el) => el.srclang === language).src;
            const resp_1 = yield fetch(subs_url);
            const text = yield resp_1.text();
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(text);
        });
    }
    playerContainerElement() {
        return document.querySelector(".fp-ui");
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Onvix);


/***/ }),

/***/ "./src/services/youtube.ts":
/*!*********************************!*\
  !*** ./src/services/youtube.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var subtitle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! subtitle */ "./node_modules/subtitle/lib/index.js");
/* harmony import */ var _cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cospired/i18n-iso-languages */ "./node_modules/@cospired/i18n-iso-languages/index.js");
/* harmony import */ var _cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class YouTube {
    getSubs(language) {
        return __awaiter(this, void 0, void 0, function* () {
            const videoId = this.getVideoId();
            const lang = Object(_cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__["alpha3TToAlpha2"])(language);
            const subItem = yield this.getVideoInfo(videoId, lang);
            const subUri = subItem.baseUrl + "&fmt=vtt";
            const resp = yield fetch(subUri);
            const text = yield resp.text();
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(text);
        });
    }
    playerContainerElement() {
        return document.querySelector(".html5-video-player");
    }
    getVideoId() {
        const regExpression = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = window.location.href.match(regExpression);
        if (match && match[2].length == 11) {
            return match[2];
        }
        else {
            console.error("Can't get youtube video id");
        }
    }
    getVideoInfo(videoId, lang) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(`https://youtube.com/get_video_info?video_id=${videoId}`);
            const text = yield resp.text();
            const data = decodeURIComponent(text);
            if (!data.includes('captionTracks'))
                throw new Error(`Could not find captions for video: ${videoId}`);
            const regex = /({"captionTracks":.*isTranslatable":(true|false)}])/;
            const [match] = regex.exec(data);
            const { captionTracks } = JSON.parse(`${match}}`);
            const subtitle = captionTracks.find((track) => { return track.vssId == `.${lang}`; }) ||
                captionTracks.find((track) => { return track.vssId == `a.${lang}`; }) ||
                captionTracks.find((track) => { return track.vssId.match(`.${lang}`); });
            if (!subtitle || (subtitle && !subtitle.baseUrl))
                throw new Error(`Could not find ${lang} captions for ${videoId}`);
            return subtitle;
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (YouTube);


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
/* harmony import */ var animejs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! animejs */ "./node_modules/animejs/lib/anime.es.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const subsAnimateDuration = 300;
const subsAnimateCompensationGap = subsAnimateDuration / 2; // Motion animation compensation
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
        return currentSub;
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
            return subs.find((sub, index) => {
                if (subs[index + 1] == null) {
                    return null;
                }
                return sub.end <= currentTime && subs[index + 1].start >= currentTime;
            });
        }
    }
    static getNextSub(subs, currentTime) {
        let currentSub = Subs.getCurrentSub(subs, currentTime);
        if (currentSub) {
            let indexCurrentSub = subs.findIndex(sub => sub == currentSub);
            return subs[indexCurrentSub + 1];
        }
        else {
            return subs.find(sub => sub.start >= currentTime);
        }
    }
    static updateSubsProgressBar(subsProgressBarElement, video, subs, hardMove = false) {
        const timePeriod = 30000; // 30 seconds
        const progressBarWidth = subsProgressBarElement.clientWidth;
        const msInPx = (progressBarWidth / timePeriod);
        const currentTime = _video__WEBPACK_IMPORTED_MODULE_0__["default"].getCurrentTime(video);
        const leftBorder = currentTime + timePeriod / 2;
        const rightBorder = currentTime - timePeriod / 2;
        const subsInDuration = subs.filter(sub => (sub.end > rightBorder && sub.end < leftBorder) ||
            (sub.start > rightBorder && sub.start < leftBorder));
        let currentSubsIds = [];
        if (hardMove) {
            document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => el.remove());
        }
        subsInDuration.forEach(sub => {
            const subId = "id" + sub.start + "-" + sub.end;
            currentSubsIds.push(subId);
            const currentSub = document.getElementById(subId);
            if (currentSub) {
                Object(animejs__WEBPACK_IMPORTED_MODULE_2__["default"])({
                    targets: currentSub,
                    translateX: msInPx * ((_utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.start) - rightBorder) - subsAnimateCompensationGap),
                    easing: 'linear',
                    duration: subsAnimateDuration
                });
            }
            else {
                const subWidth = msInPx * (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.end) - _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.start));
                let subDiv = document.createElement("div");
                subDiv.className = "easysubs-progress-bar-element";
                subDiv.id = subId;
                subDiv.style.width = subWidth.toFixed(0) + "px";
                subDiv.style.transform = 'translateX(' + msInPx * (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(sub.start) - rightBorder) + 'px)';
                subsProgressBarElement.appendChild(subDiv);
            }
        });
        function removeOldProgressBarElements(subsInDuration) {
            return __awaiter(this, void 0, void 0, function* () {
                document.querySelectorAll(".easysubs-progress-bar-element").forEach(el => {
                    if (currentSubsIds.includes(el.id) == false) {
                        el.remove();
                    }
                });
            });
        }
        removeOldProgressBarElements(subsInDuration);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Subs);


/***/ }),

/***/ "./src/ui.ts":
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class UI {
    static createSubsElement(playerContainerElement) {
        const subsContainerElementId = "easysubs";
        const prevSubsContainerElement = document.getElementById(subsContainerElementId);
        if (prevSubsContainerElement != null) {
            prevSubsContainerElement.remove();
        }
        let subsContainerElement = document.createElement("div");
        subsContainerElement.id = subsContainerElementId;
        let subsInnerElement = document.createElement("div");
        subsInnerElement.id = "easysubs-subtitles";
        subsContainerElement.appendChild(subsInnerElement);
        const textNode = document.createTextNode("Loading subtitles ...");
        subsInnerElement.appendChild(textNode);
        playerContainerElement.appendChild(subsContainerElement);
        this.createSubsTranslateElement(subsContainerElement);
        return subsInnerElement;
    }
    static createSubsTranslateElement(subsElement) {
        let translateTag = document.createElement("div");
        translateTag.className = "easysubs-translate-container";
        translateTag.innerHTML = "<span class='easysubs-translate-original'>test</span><hr><span class='easysubs-translate-result'>test translate</span>";
        subsElement.appendChild(translateTag);
    }
    static setTranslation(translateContainerElement, originalElement, resultElement, originalText, resultText) {
        translateContainerElement.style.display = "block";
        originalElement.innerHTML = originalText;
        resultElement.innerHTML = resultText;
    }
    static createSubsProgressBarElement(playerContainerElement) {
        let progressBarClass = "easysubs-progress-bar";
        const prevProgressBarElement = document.querySelector("." + progressBarClass);
        if (prevProgressBarElement != null) {
            prevProgressBarElement.remove();
        }
        let progressBarElement = document.createElement("div");
        progressBarElement.className = progressBarClass;
        playerContainerElement.appendChild(progressBarElement);
        return progressBarElement;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (UI);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_onvix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/onvix */ "./src/services/onvix.ts");
/* harmony import */ var _services_kinopub__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/kinopub */ "./src/services/kinopub.ts");
/* harmony import */ var _services_youtube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/youtube */ "./src/services/youtube.ts");
/* harmony import */ var _services_netflix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/netflix */ "./src/services/netflix.ts");




class Utils {
    static castSubTime(time) {
        return typeof time == "number" ? time : parseInt(time);
    }
    static detectService() {
        const titleContent = document.querySelector('title').textContent;
        if (titleContent.includes("YouTube") || window.location.host == "www.youtube.com") {
            document.querySelector('html').id = "youtube";
            return new _services_youtube__WEBPACK_IMPORTED_MODULE_2__["default"];
        }
        else if (titleContent.includes("Netflix") || window.location.host == "www.netflix.com") {
            document.querySelector('html').id = "netflix";
            return new _services_netflix__WEBPACK_IMPORTED_MODULE_3__["default"];
        }
        else if (titleContent.includes("Onvix") || document.querySelector('meta[content="ONVIX"]')) {
            document.querySelector('html').id = "onvix";
            return new _services_onvix__WEBPACK_IMPORTED_MODULE_0__["default"];
        }
        else if (titleContent.includes("Кинопаб") || document.querySelector('meta[content="Кинопаб"]')) {
            document.querySelector('html').id = "kinopub";
            return new _services_kinopub__WEBPACK_IMPORTED_MODULE_1__["default"];
        }
        else {
            return null;
        }
    }
    static removeAllElements(elms) {
        elms.forEach(el => el.remove());
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


const moveSubGap = 50; // Delay to display subtitles after rewinding
class Video {
    static getCurrentTime(video) {
        return Math.round(video.currentTime * 1000);
    }
    static moveToPrevSub(video, subs, subsProgressBarElement) {
        let currentTime = this.getCurrentTime(video);
        let prevSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getPrevSub(subs, currentTime);
        if (prevSub) {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(prevSub.start) - moveSubGap);
            _subs__WEBPACK_IMPORTED_MODULE_0__["default"].updateSubsProgressBar(subsProgressBarElement, video, subs, true);
        }
    }
    static moveToNextSub(video, subs, subsProgressBarElement) {
        let currentTime = this.getCurrentTime(video);
        let nextSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getNextSub(subs, currentTime);
        if (nextSub) {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(nextSub.start) - moveSubGap);
            _subs__WEBPACK_IMPORTED_MODULE_0__["default"].updateSubsProgressBar(subsProgressBarElement, video, subs, true);
        }
    }
    static moveToTime(video, time) {
        video.currentTime = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(time) / 1000;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Video);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuaW1lanMvbGliL2FuaW1lLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlVGltZXN0YW1wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3Jlc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeVZ0dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvTVMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1NydFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1Z0dFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3plcm8tZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzX2hhbmRsZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWR5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9raW5vcHViLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9uZXRmbGl4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9vbnZpeC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMveW91dHViZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vicy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy92aWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLDRFQUFjO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixjQUFjO0FBQ2QsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QixFQUFFLElBQW9CLEVBQUUsc0JBQW1DO1FBQ3JHLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQWlCLDZDQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLDhDQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDckUsNkNBQUksQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBdUIsRUFBRSxJQUFxQjtRQUM5RCxLQUFLLENBQUMsV0FBVyxHQUFHLDhDQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7SUFDcEQsQ0FBQztDQUNGO0FBQ2Msb0VBQUssRUFBQyIsImZpbGUiOiJpbmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmplY3QudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvZGVzID0gcmVxdWlyZShcIi4vY29kZXMuanNvblwiKTtcbnZhciByZWdpc3RlcmVkTG9jYWxlcyA9IHt9O1xuXG4vKlxuICogQWxsIGNvZGVzIG1hcCB0byBJU08gMzE2Ni0xIGFscGhhLTJcbiAqL1xudmFyIGFscGhhMiA9IHt9LFxuICBhbHBoYTNUID0ge30sXG4gIGFscGhhM0IgPSB7fSxcbiAgaW52ZXJ0ZWRBbHBoYTNCID0ge307XG5cbmNvZGVzLmZvckVhY2goZnVuY3Rpb24oY29kZUluZm9ybWF0aW9uKSB7XG4gIHZhciBzID0gY29kZUluZm9ybWF0aW9uO1xuICBhbHBoYTJbc1swXV0gPSBzWzFdO1xuICBhbHBoYTNUW3NbMV1dID0gc1swXTtcbiAgYWxwaGEzQltzWzJdXSA9IHNbMF07XG4gIGludmVydGVkQWxwaGEzQltzWzBdXSA9IHNbMl07XG59KTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGUobG9jYWxlRGF0YSkge1xuICBpZiAoIWxvY2FsZURhdGEubG9jYWxlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWlzc2luZyBsb2NhbGVEYXRhLmxvY2FsZScpO1xuICB9XG5cbiAgaWYgKCFsb2NhbGVEYXRhLmxhbmd1YWdlcykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NpbmcgbG9jYWxlRGF0YS5sYW5ndWFnZXMnKTtcbiAgfVxuXG4gIHJlZ2lzdGVyZWRMb2NhbGVzW2xvY2FsZURhdGEubG9jYWxlXSA9IGxvY2FsZURhdGEubGFuZ3VhZ2VzO1xufVxuXG5leHBvcnRzLnJlZ2lzdGVyTG9jYWxlID0gcmVnaXN0ZXJMb2NhbGU7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0zVCBjb2RlXG4gKiBAcmV0dXJuIEFscGhhLTIgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEzVFRvQWxwaGEyKGNvZGUpIHtcblxuICByZXR1cm4gYWxwaGEzVFtjb2RlXTtcbn1cbmV4cG9ydHMuYWxwaGEzVFRvQWxwaGEyID0gYWxwaGEzVFRvQWxwaGEyO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgQWxwaGEtM0IgY29kZVxuICogQHJldHVybiBBbHBoYS0yIGNvZGUgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGFscGhhM0JUb0FscGhhMihjb2RlKSB7XG5cbiAgcmV0dXJuIGFscGhhM0JbY29kZV07XG59XG5leHBvcnRzLmFscGhhM0JUb0FscGhhMiA9IGFscGhhM0JUb0FscGhhMjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTIgY29kZVxuICogQHJldHVybiBBbHBoYS0zVCBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTJUb0FscGhhM1QoY29kZSkge1xuXG4gIHJldHVybiBhbHBoYTJbY29kZV07XG59XG5leHBvcnRzLmFscGhhMlRvQWxwaGEzVCA9IGFscGhhMlRvQWxwaGEzVDtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTIgY29kZVxuICogQHJldHVybiBBbHBoYS0zQiBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTJUb0FscGhhM0IoY29kZSkge1xuXG4gIHJldHVybiBpbnZlcnRlZEFscGhhM0JbY29kZV07XG59XG5leHBvcnRzLmFscGhhMlRvQWxwaGEzQiA9IGFscGhhMlRvQWxwaGEzQjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgVFxuICovXG5mdW5jdGlvbiB0b0FscGhhM1QoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gYWxwaGEyVG9BbHBoYTNUKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICBpZiggYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkgKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzVChhbHBoYTNCVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMudG9BbHBoYTNUID0gdG9BbHBoYTNUO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBCXG4gKi9cbmZ1bmN0aW9uIHRvQWxwaGEzQihjb2RlKSB7XG4gIGlmICh0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmKGNvZGUubGVuZ3RoID09PSAyKSB7XG5cbiAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM0IoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gICAgaWYgKGNvZGUubGVuZ3RoID09PSAzKSB7XG5cbiAgICAgIGlmKCBhbHBoYTNCW2NvZGUudG9Mb3dlckNhc2UoKV0gKSB7XG5cbiAgICAgICAgcmV0dXJuIGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmKCBhbHBoYTNUW2NvZGUudG9Mb3dlckNhc2UoKV0gKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzQihhbHBoYTNUVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMudG9BbHBoYTNCID0gdG9BbHBoYTNCO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHJldHVybiBJU08gNjM5LTEgYWxwaGEtMlxuICovXG5mdW5jdGlvbiB0b0FscGhhMihjb2RlKSB7XG4gIGlmICh0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiAoIGFscGhhM0JbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTNCVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmICggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhM1RUb0FscGhhMihjb2RlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEyID0gdG9BbHBoYTI7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgSVNPIDYzOS0yIGFscGhhLTMgVCBvciBCXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgY291bnRyeSBuYW1lXG4gKiBAcmV0dXJuIG5hbWUgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0TmFtZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZCA9IHJlZ2lzdGVyZWRMb2NhbGVzW2xhbmcudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGRbdG9BbHBoYTIoY29kZSldO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGxhbmd1YWdlIG5hbWVzXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBsYW5ndWFnZSBjb2RlIG1hcHBlZCB0byBsYW5ndWFnZSBuYW1lXG4gKi9cbmV4cG9ydHMuZ2V0TmFtZXMgPSBmdW5jdGlvbihsYW5nKSB7XG4gIHZhciBkID0gcmVnaXN0ZXJlZExvY2FsZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcbiAgaWYgKGQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG5cbi8qXG4gKiBAcGFyYW0gbmFtZSBuYW1lXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgbGFuZ3VhZ2UgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTEgYWxwaGEtMiBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTJDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB0cnkge1xuICAgIHZhciBwLCBjb2RlbmFtZXMgPSByZWdpc3RlcmVkTG9jYWxlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuICAgIGZvciAocCBpbiBjb2RlbmFtZXMpIHtcbiAgICAgIGlmIChjb2RlbmFtZXMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgaWYgKGNvZGVuYW1lc1twXS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHJldHVybiBPYmplY3Qgb2YgYWxwaGEtMiBjb2RlcyBtYXBwZWQgdG8gYWxwaGEtMyBUIGNvZGVzXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEyQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhMjtcbn07XG5cbi8qXG4gKiBAcGFyYW0gbmFtZSBuYW1lXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgY291bnRyeSBuYW1lXG4gKiBAcmV0dXJuIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEzVENvZGUgPSBmdW5jdGlvbihuYW1lLCBsYW5nKSB7XG4gIHZhciBhbHBoYTIgPSB0aGlzLmdldEFscGhhMkNvZGUobmFtZSwgbGFuZyk7XG4gIGlmIChhbHBoYTIpIHtcbiAgICByZXR1cm4gdGhpcy50b0FscGhhM1QoYWxwaGEyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBCIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldEFscGhhM0JDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB2YXIgYWxwaGEyID0gdGhpcy5nZXRBbHBoYTJDb2RlKG5hbWUsIGxhbmcpO1xuICBpZiAoYWxwaGEyKSB7XG4gICAgcmV0dXJuIHRoaXMudG9BbHBoYTNCKGFscGhhMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEByZXR1cm4gT2JqZWN0IG9mIGFscGhhLTMgVCBjb2RlcyBtYXBwZWQgdG8gYWxwaGEtMiBjb2Rlc1xuICovXG5leHBvcnRzLmdldEFscGhhM1RDb2RlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYWxwaGEzVDtcbn07XG5cbi8qXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBhbHBoYS0zIEIgY29kZXMgbWFwcGVkIHRvIGFscGhhLTIgY29kZXNcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNCQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhM0I7XG59O1xuXG4vKlxuICogQHJldHVybiBBcnJheSBvZiBzdXBwb3J0ZWQgbGFuZ3VhZ2VzXG4gKi9cbmV4cG9ydHMubGFuZ3MgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHJlZ2lzdGVyZWRMb2NhbGVzKTtcbn07XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgNjM5LTIgYWxwaGEtMyBUIG9yIEIgY29kZVxuICogQHJldHVybiBCb29sZWFuXG4gKi9cbmV4cG9ydHMuaXNWYWxpZCA9IGZ1bmN0aW9uKGNvZGUpIHtcbiAgcmV0dXJuIHRoaXMudG9BbHBoYTNUKGNvZGUpICE9PSB1bmRlZmluZWQ7XG59O1xuIiwiLypcbiAqIGFuaW1lLmpzIHYzLjEuMFxuICogKGMpIDIwMTkgSnVsaWFuIEdhcm5pZXJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogYW5pbWVqcy5jb21cbiAqL1xuXG4vLyBEZWZhdWx0c1xuXG52YXIgZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MgPSB7XG4gIHVwZGF0ZTogbnVsbCxcbiAgYmVnaW46IG51bGwsXG4gIGxvb3BCZWdpbjogbnVsbCxcbiAgY2hhbmdlQmVnaW46IG51bGwsXG4gIGNoYW5nZTogbnVsbCxcbiAgY2hhbmdlQ29tcGxldGU6IG51bGwsXG4gIGxvb3BDb21wbGV0ZTogbnVsbCxcbiAgY29tcGxldGU6IG51bGwsXG4gIGxvb3A6IDEsXG4gIGRpcmVjdGlvbjogJ25vcm1hbCcsXG4gIGF1dG9wbGF5OiB0cnVlLFxuICB0aW1lbGluZU9mZnNldDogMFxufTtcblxudmFyIGRlZmF1bHRUd2VlblNldHRpbmdzID0ge1xuICBkdXJhdGlvbjogMTAwMCxcbiAgZGVsYXk6IDAsXG4gIGVuZERlbGF5OiAwLFxuICBlYXNpbmc6ICdlYXNlT3V0RWxhc3RpYygxLCAuNSknLFxuICByb3VuZDogMFxufTtcblxudmFyIHZhbGlkVHJhbnNmb3JtcyA9IFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonLCAncm90YXRlJywgJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJywgJ3NjYWxlJywgJ3NjYWxlWCcsICdzY2FsZVknLCAnc2NhbGVaJywgJ3NrZXcnLCAnc2tld1gnLCAnc2tld1knLCAncGVyc3BlY3RpdmUnXTtcblxuLy8gQ2FjaGluZ1xuXG52YXIgY2FjaGUgPSB7XG4gIENTUzoge30sXG4gIHNwcmluZ3M6IHt9XG59O1xuXG4vLyBVdGlsc1xuXG5mdW5jdGlvbiBtaW5NYXgodmFsLCBtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBtaW4pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdDb250YWlucyhzdHIsIHRleHQpIHtcbiAgcmV0dXJuIHN0ci5pbmRleE9mKHRleHQpID4gLTE7XG59XG5cbmZ1bmN0aW9uIGFwcGx5QXJndW1lbnRzKGZ1bmMsIGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG59XG5cbnZhciBpcyA9IHtcbiAgYXJyOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhKTsgfSxcbiAgb2JqOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gc3RyaW5nQ29udGFpbnMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpLCAnT2JqZWN0Jyk7IH0sXG4gIHB0aDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGlzLm9iaihhKSAmJiBhLmhhc093blByb3BlcnR5KCd0b3RhbExlbmd0aCcpOyB9LFxuICBzdmc6IGZ1bmN0aW9uIChhKSB7IHJldHVybiBhIGluc3RhbmNlb2YgU1ZHRWxlbWVudDsgfSxcbiAgaW5wOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ7IH0sXG4gIGRvbTogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEubm9kZVR5cGUgfHwgaXMuc3ZnKGEpOyB9LFxuICBzdHI6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ3N0cmluZyc7IH0sXG4gIGZuYzogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHR5cGVvZiBhID09PSAnZnVuY3Rpb24nOyB9LFxuICB1bmQ6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ3VuZGVmaW5lZCc7IH0sXG4gIGhleDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIC8oXiNbMC05QS1GXXs2fSQpfCheI1swLTlBLUZdezN9JCkvaS50ZXN0KGEpOyB9LFxuICByZ2I6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAvXnJnYi8udGVzdChhKTsgfSxcbiAgaHNsOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gL15oc2wvLnRlc3QoYSk7IH0sXG4gIGNvbDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChpcy5oZXgoYSkgfHwgaXMucmdiKGEpIHx8IGlzLmhzbChhKSk7IH0sXG4gIGtleTogZnVuY3Rpb24gKGEpIHsgcmV0dXJuICFkZWZhdWx0SW5zdGFuY2VTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShhKSAmJiAhZGVmYXVsdFR3ZWVuU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoYSkgJiYgYSAhPT0gJ3RhcmdldHMnICYmIGEgIT09ICdrZXlmcmFtZXMnOyB9XG59O1xuXG4vLyBFYXNpbmdzXG5cbmZ1bmN0aW9uIHBhcnNlRWFzaW5nUGFyYW1ldGVycyhzdHJpbmcpIHtcbiAgdmFyIG1hdGNoID0gL1xcKChbXildKylcXCkvLmV4ZWMoc3RyaW5nKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHApIHsgcmV0dXJuIHBhcnNlRmxvYXQocCk7IH0pIDogW107XG59XG5cbi8vIFNwcmluZyBzb2x2ZXIgaW5zcGlyZWQgYnkgV2Via2l0IENvcHlyaWdodCDCqSAyMDE2IEFwcGxlIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gaHR0cHM6Ly93ZWJraXQub3JnL2RlbW9zL3NwcmluZy9zcHJpbmcuanNcblxuZnVuY3Rpb24gc3ByaW5nKHN0cmluZywgZHVyYXRpb24pIHtcblxuICB2YXIgcGFyYW1zID0gcGFyc2VFYXNpbmdQYXJhbWV0ZXJzKHN0cmluZyk7XG4gIHZhciBtYXNzID0gbWluTWF4KGlzLnVuZChwYXJhbXNbMF0pID8gMSA6IHBhcmFtc1swXSwgLjEsIDEwMCk7XG4gIHZhciBzdGlmZm5lc3MgPSBtaW5NYXgoaXMudW5kKHBhcmFtc1sxXSkgPyAxMDAgOiBwYXJhbXNbMV0sIC4xLCAxMDApO1xuICB2YXIgZGFtcGluZyA9IG1pbk1heChpcy51bmQocGFyYW1zWzJdKSA/IDEwIDogcGFyYW1zWzJdLCAuMSwgMTAwKTtcbiAgdmFyIHZlbG9jaXR5ID0gIG1pbk1heChpcy51bmQocGFyYW1zWzNdKSA/IDAgOiBwYXJhbXNbM10sIC4xLCAxMDApO1xuICB2YXIgdzAgPSBNYXRoLnNxcnQoc3RpZmZuZXNzIC8gbWFzcyk7XG4gIHZhciB6ZXRhID0gZGFtcGluZyAvICgyICogTWF0aC5zcXJ0KHN0aWZmbmVzcyAqIG1hc3MpKTtcbiAgdmFyIHdkID0gemV0YSA8IDEgPyB3MCAqIE1hdGguc3FydCgxIC0gemV0YSAqIHpldGEpIDogMDtcbiAgdmFyIGEgPSAxO1xuICB2YXIgYiA9IHpldGEgPCAxID8gKHpldGEgKiB3MCArIC12ZWxvY2l0eSkgLyB3ZCA6IC12ZWxvY2l0eSArIHcwO1xuXG4gIGZ1bmN0aW9uIHNvbHZlcih0KSB7XG4gICAgdmFyIHByb2dyZXNzID0gZHVyYXRpb24gPyAoZHVyYXRpb24gKiB0KSAvIDEwMDAgOiB0O1xuICAgIGlmICh6ZXRhIDwgMSkge1xuICAgICAgcHJvZ3Jlc3MgPSBNYXRoLmV4cCgtcHJvZ3Jlc3MgKiB6ZXRhICogdzApICogKGEgKiBNYXRoLmNvcyh3ZCAqIHByb2dyZXNzKSArIGIgKiBNYXRoLnNpbih3ZCAqIHByb2dyZXNzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzID0gKGEgKyBiICogcHJvZ3Jlc3MpICogTWF0aC5leHAoLXByb2dyZXNzICogdzApO1xuICAgIH1cbiAgICBpZiAodCA9PT0gMCB8fCB0ID09PSAxKSB7IHJldHVybiB0OyB9XG4gICAgcmV0dXJuIDEgLSBwcm9ncmVzcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldER1cmF0aW9uKCkge1xuICAgIHZhciBjYWNoZWQgPSBjYWNoZS5zcHJpbmdzW3N0cmluZ107XG4gICAgaWYgKGNhY2hlZCkgeyByZXR1cm4gY2FjaGVkOyB9XG4gICAgdmFyIGZyYW1lID0gMS82O1xuICAgIHZhciBlbGFwc2VkID0gMDtcbiAgICB2YXIgcmVzdCA9IDA7XG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgZWxhcHNlZCArPSBmcmFtZTtcbiAgICAgIGlmIChzb2x2ZXIoZWxhcHNlZCkgPT09IDEpIHtcbiAgICAgICAgcmVzdCsrO1xuICAgICAgICBpZiAocmVzdCA+PSAxNikgeyBicmVhazsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdCA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkdXJhdGlvbiA9IGVsYXBzZWQgKiBmcmFtZSAqIDEwMDA7XG4gICAgY2FjaGUuc3ByaW5nc1tzdHJpbmddID0gZHVyYXRpb247XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgcmV0dXJuIGR1cmF0aW9uID8gc29sdmVyIDogZ2V0RHVyYXRpb247XG5cbn1cblxuLy8gQmFzaWMgc3RlcHMgZWFzaW5nIGltcGxlbWVudGF0aW9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0NTUy90cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblxuXG5mdW5jdGlvbiBzdGVwcyhzdGVwcykge1xuICBpZiAoIHN0ZXBzID09PSB2b2lkIDAgKSBzdGVwcyA9IDEwO1xuXG4gIHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gTWF0aC5yb3VuZCh0ICogc3RlcHMpICogKDEgLyBzdGVwcyk7IH07XG59XG5cbi8vIEJlemllckVhc2luZyBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmdcblxudmFyIGJlemllciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGtTcGxpbmVUYWJsZVNpemUgPSAxMTtcbiAgdmFyIGtTYW1wbGVTdGVwU2l6ZSA9IDEuMCAvIChrU3BsaW5lVGFibGVTaXplIC0gMS4wKTtcblxuICBmdW5jdGlvbiBBKGFBMSwgYUEyKSB7IHJldHVybiAxLjAgLSAzLjAgKiBhQTIgKyAzLjAgKiBhQTEgfVxuICBmdW5jdGlvbiBCKGFBMSwgYUEyKSB7IHJldHVybiAzLjAgKiBhQTIgLSA2LjAgKiBhQTEgfVxuICBmdW5jdGlvbiBDKGFBMSkgICAgICB7IHJldHVybiAzLjAgKiBhQTEgfVxuXG4gIGZ1bmN0aW9uIGNhbGNCZXppZXIoYVQsIGFBMSwgYUEyKSB7IHJldHVybiAoKEEoYUExLCBhQTIpICogYVQgKyBCKGFBMSwgYUEyKSkgKiBhVCArIEMoYUExKSkgKiBhVCB9XG4gIGZ1bmN0aW9uIGdldFNsb3BlKGFULCBhQTEsIGFBMikgeyByZXR1cm4gMy4wICogQShhQTEsIGFBMikgKiBhVCAqIGFUICsgMi4wICogQihhQTEsIGFBMikgKiBhVCArIEMoYUExKSB9XG5cbiAgZnVuY3Rpb24gYmluYXJ5U3ViZGl2aWRlKGFYLCBhQSwgYUIsIG1YMSwgbVgyKSB7XG4gICAgdmFyIGN1cnJlbnRYLCBjdXJyZW50VCwgaSA9IDA7XG4gICAgZG8ge1xuICAgICAgY3VycmVudFQgPSBhQSArIChhQiAtIGFBKSAvIDIuMDtcbiAgICAgIGN1cnJlbnRYID0gY2FsY0JlemllcihjdXJyZW50VCwgbVgxLCBtWDIpIC0gYVg7XG4gICAgICBpZiAoY3VycmVudFggPiAwLjApIHsgYUIgPSBjdXJyZW50VDsgfSBlbHNlIHsgYUEgPSBjdXJyZW50VDsgfVxuICAgIH0gd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRYKSA+IDAuMDAwMDAwMSAmJiArK2kgPCAxMCk7XG4gICAgcmV0dXJuIGN1cnJlbnRUO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGFHdWVzc1QsIG1YMSwgbVgyKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgIHZhciBjdXJyZW50U2xvcGUgPSBnZXRTbG9wZShhR3Vlc3NULCBtWDEsIG1YMik7XG4gICAgICBpZiAoY3VycmVudFNsb3BlID09PSAwLjApIHsgcmV0dXJuIGFHdWVzc1Q7IH1cbiAgICAgIHZhciBjdXJyZW50WCA9IGNhbGNCZXppZXIoYUd1ZXNzVCwgbVgxLCBtWDIpIC0gYVg7XG4gICAgICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuICAgIH1cbiAgICByZXR1cm4gYUd1ZXNzVDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlemllcihtWDEsIG1ZMSwgbVgyLCBtWTIpIHtcblxuICAgIGlmICghKDAgPD0gbVgxICYmIG1YMSA8PSAxICYmIDAgPD0gbVgyICYmIG1YMiA8PSAxKSkgeyByZXR1cm47IH1cbiAgICB2YXIgc2FtcGxlVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShrU3BsaW5lVGFibGVTaXplKTtcblxuICAgIGlmIChtWDEgIT09IG1ZMSB8fCBtWDIgIT09IG1ZMikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrU3BsaW5lVGFibGVTaXplOyArK2kpIHtcbiAgICAgICAgc2FtcGxlVmFsdWVzW2ldID0gY2FsY0JlemllcihpICoga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VEZvclgoYVgpIHtcblxuICAgICAgdmFyIGludGVydmFsU3RhcnQgPSAwO1xuICAgICAgdmFyIGN1cnJlbnRTYW1wbGUgPSAxO1xuICAgICAgdmFyIGxhc3RTYW1wbGUgPSBrU3BsaW5lVGFibGVTaXplIC0gMTtcblxuICAgICAgZm9yICg7IGN1cnJlbnRTYW1wbGUgIT09IGxhc3RTYW1wbGUgJiYgc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdIDw9IGFYOyArK2N1cnJlbnRTYW1wbGUpIHtcbiAgICAgICAgaW50ZXJ2YWxTdGFydCArPSBrU2FtcGxlU3RlcFNpemU7XG4gICAgICB9XG5cbiAgICAgIC0tY3VycmVudFNhbXBsZTtcblxuICAgICAgdmFyIGRpc3QgPSAoYVggLSBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0pIC8gKHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlICsgMV0gLSBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0pO1xuICAgICAgdmFyIGd1ZXNzRm9yVCA9IGludGVydmFsU3RhcnQgKyBkaXN0ICoga1NhbXBsZVN0ZXBTaXplO1xuICAgICAgdmFyIGluaXRpYWxTbG9wZSA9IGdldFNsb3BlKGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuXG4gICAgICBpZiAoaW5pdGlhbFNsb3BlID49IDAuMDAxKSB7XG4gICAgICAgIHJldHVybiBuZXd0b25SYXBoc29uSXRlcmF0ZShhWCwgZ3Vlc3NGb3JULCBtWDEsIG1YMik7XG4gICAgICB9IGVsc2UgaWYgKGluaXRpYWxTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgIHJldHVybiBndWVzc0ZvclQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYmluYXJ5U3ViZGl2aWRlKGFYLCBpbnRlcnZhbFN0YXJ0LCBpbnRlcnZhbFN0YXJ0ICsga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgIGlmIChtWDEgPT09IG1ZMSAmJiBtWDIgPT09IG1ZMikgeyByZXR1cm4geDsgfVxuICAgICAgaWYgKHggPT09IDAgfHwgeCA9PT0gMSkgeyByZXR1cm4geDsgfVxuICAgICAgcmV0dXJuIGNhbGNCZXppZXIoZ2V0VEZvclgoeCksIG1ZMSwgbVkyKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBiZXppZXI7XG5cbn0pKCk7XG5cbnZhciBwZW5uZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8vIEJhc2VkIG9uIGpRdWVyeSBVSSdzIGltcGxlbWVuYXRpb24gb2YgZWFzaW5nIGVxdWF0aW9ucyBmcm9tIFJvYmVydCBQZW5uZXIgKGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcpXG5cbiAgdmFyIGVhc2VzID0geyBsaW5lYXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0OyB9OyB9IH07XG5cbiAgdmFyIGZ1bmN0aW9uRWFzaW5ncyA9IHtcbiAgICBTaW5lOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gMSAtIE1hdGguY29zKHQgKiBNYXRoLlBJIC8gMik7IH07IH0sXG4gICAgQ2lyYzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIHQgKiB0KTsgfTsgfSxcbiAgICBCYWNrOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gdCAqIHQgKiAoMyAqIHQgLSAyKTsgfTsgfSxcbiAgICBCb3VuY2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICB2YXIgcG93MiwgYiA9IDQ7XG4gICAgICB3aGlsZSAodCA8ICgoIHBvdzIgPSBNYXRoLnBvdygyLCAtLWIpKSAtIDEpIC8gMTEpIHt9XG4gICAgICByZXR1cm4gMSAvIE1hdGgucG93KDQsIDMgLSBiKSAtIDcuNTYyNSAqIE1hdGgucG93KCggcG93MiAqIDMgLSAyICkgLyAyMiAtIHQsIDIpXG4gICAgfTsgfSxcbiAgICBFbGFzdGljOiBmdW5jdGlvbiAoYW1wbGl0dWRlLCBwZXJpb2QpIHtcbiAgICAgIGlmICggYW1wbGl0dWRlID09PSB2b2lkIDAgKSBhbXBsaXR1ZGUgPSAxO1xuICAgICAgaWYgKCBwZXJpb2QgPT09IHZvaWQgMCApIHBlcmlvZCA9IC41O1xuXG4gICAgICB2YXIgYSA9IG1pbk1heChhbXBsaXR1ZGUsIDEsIDEwKTtcbiAgICAgIHZhciBwID0gbWluTWF4KHBlcmlvZCwgLjEsIDIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAodCA9PT0gMCB8fCB0ID09PSAxKSA/IHQgOiBcbiAgICAgICAgICAtYSAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKiBNYXRoLnNpbigoKCh0IC0gMSkgLSAocCAvIChNYXRoLlBJICogMikgKiBNYXRoLmFzaW4oMSAvIGEpKSkgKiAoTWF0aC5QSSAqIDIpKSAvIHApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYmFzZUVhc2luZ3MgPSBbJ1F1YWQnLCAnQ3ViaWMnLCAnUXVhcnQnLCAnUXVpbnQnLCAnRXhwbyddO1xuXG4gIGJhc2VFYXNpbmdzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGkpIHtcbiAgICBmdW5jdGlvbkVhc2luZ3NbbmFtZV0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gTWF0aC5wb3codCwgaSArIDIpOyB9OyB9O1xuICB9KTtcblxuICBPYmplY3Qua2V5cyhmdW5jdGlvbkVhc2luZ3MpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZWFzZUluID0gZnVuY3Rpb25FYXNpbmdzW25hbWVdO1xuICAgIGVhc2VzWydlYXNlSW4nICsgbmFtZV0gPSBlYXNlSW47XG4gICAgZWFzZXNbJ2Vhc2VPdXQnICsgbmFtZV0gPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBlYXNlSW4oYSwgYikoMSAtIHQpOyB9OyB9O1xuICAgIGVhc2VzWydlYXNlSW5PdXQnICsgbmFtZV0gPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgPCAwLjUgPyBlYXNlSW4oYSwgYikodCAqIDIpIC8gMiA6IFxuICAgICAgMSAtIGVhc2VJbihhLCBiKSh0ICogLTIgKyAyKSAvIDI7IH07IH07XG4gIH0pO1xuXG4gIHJldHVybiBlYXNlcztcblxufSkoKTtcblxuZnVuY3Rpb24gcGFyc2VFYXNpbmdzKGVhc2luZywgZHVyYXRpb24pIHtcbiAgaWYgKGlzLmZuYyhlYXNpbmcpKSB7IHJldHVybiBlYXNpbmc7IH1cbiAgdmFyIG5hbWUgPSBlYXNpbmcuc3BsaXQoJygnKVswXTtcbiAgdmFyIGVhc2UgPSBwZW5uZXJbbmFtZV07XG4gIHZhciBhcmdzID0gcGFyc2VFYXNpbmdQYXJhbWV0ZXJzKGVhc2luZyk7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ3NwcmluZycgOiByZXR1cm4gc3ByaW5nKGVhc2luZywgZHVyYXRpb24pO1xuICAgIGNhc2UgJ2N1YmljQmV6aWVyJyA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhiZXppZXIsIGFyZ3MpO1xuICAgIGNhc2UgJ3N0ZXBzJyA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhzdGVwcywgYXJncyk7XG4gICAgZGVmYXVsdCA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhlYXNlLCBhcmdzKTtcbiAgfVxufVxuXG4vLyBTdHJpbmdzXG5cbmZ1bmN0aW9uIHNlbGVjdFN0cmluZyhzdHIpIHtcbiAgdHJ5IHtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN0cik7XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuLy8gQXJyYXlzXG5cbmZ1bmN0aW9uIGZpbHRlckFycmF5KGFyciwgY2FsbGJhY2spIHtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyID8gYXJndW1lbnRzWzFdIDogdm9pZCAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoaSBpbiBhcnIpIHtcbiAgICAgIHZhciB2YWwgPSBhcnJbaV07XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWwsIGksIGFycikpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkFycmF5KGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5jb25jYXQoaXMuYXJyKGIpID8gZmxhdHRlbkFycmF5KGIpIDogYik7IH0sIFtdKTtcbn1cblxuZnVuY3Rpb24gdG9BcnJheShvKSB7XG4gIGlmIChpcy5hcnIobykpIHsgcmV0dXJuIG87IH1cbiAgaWYgKGlzLnN0cihvKSkgeyBvID0gc2VsZWN0U3RyaW5nKG8pIHx8IG87IH1cbiAgaWYgKG8gaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBvIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHsgcmV0dXJuIFtdLnNsaWNlLmNhbGwobyk7IH1cbiAgcmV0dXJuIFtvXTtcbn1cblxuZnVuY3Rpb24gYXJyYXlDb250YWlucyhhcnIsIHZhbCkge1xuICByZXR1cm4gYXJyLnNvbWUoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgPT09IHZhbDsgfSk7XG59XG5cbi8vIE9iamVjdHNcblxuZnVuY3Rpb24gY2xvbmVPYmplY3Qobykge1xuICB2YXIgY2xvbmUgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBvKSB7IGNsb25lW3BdID0gb1twXTsgfVxuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VPYmplY3RQcm9wcyhvMSwgbzIpIHtcbiAgdmFyIG8gPSBjbG9uZU9iamVjdChvMSk7XG4gIGZvciAodmFyIHAgaW4gbzEpIHsgb1twXSA9IG8yLmhhc093blByb3BlcnR5KHApID8gbzJbcF0gOiBvMVtwXTsgfVxuICByZXR1cm4gbztcbn1cblxuZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG8xLCBvMikge1xuICB2YXIgbyA9IGNsb25lT2JqZWN0KG8xKTtcbiAgZm9yICh2YXIgcCBpbiBvMikgeyBvW3BdID0gaXMudW5kKG8xW3BdKSA/IG8yW3BdIDogbzFbcF07IH1cbiAgcmV0dXJuIG87XG59XG5cbi8vIENvbG9yc1xuXG5mdW5jdGlvbiByZ2JUb1JnYmEocmdiVmFsdWUpIHtcbiAgdmFyIHJnYiA9IC9yZ2JcXCgoXFxkKyxcXHMqW1xcZF0rLFxccypbXFxkXSspXFwpL2cuZXhlYyhyZ2JWYWx1ZSk7XG4gIHJldHVybiByZ2IgPyAoXCJyZ2JhKFwiICsgKHJnYlsxXSkgKyBcIiwxKVwiKSA6IHJnYlZhbHVlO1xufVxuXG5mdW5jdGlvbiBoZXhUb1JnYmEoaGV4VmFsdWUpIHtcbiAgdmFyIHJneCA9IC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2k7XG4gIHZhciBoZXggPSBoZXhWYWx1ZS5yZXBsYWNlKHJneCwgZnVuY3Rpb24gKG0sIHIsIGcsIGIpIHsgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjsgfSApO1xuICB2YXIgcmdiID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHZhciByID0gcGFyc2VJbnQocmdiWzFdLCAxNik7XG4gIHZhciBnID0gcGFyc2VJbnQocmdiWzJdLCAxNik7XG4gIHZhciBiID0gcGFyc2VJbnQocmdiWzNdLCAxNik7XG4gIHJldHVybiAoXCJyZ2JhKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiLDEpXCIpO1xufVxuXG5mdW5jdGlvbiBoc2xUb1JnYmEoaHNsVmFsdWUpIHtcbiAgdmFyIGhzbCA9IC9oc2xcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSVcXCkvZy5leGVjKGhzbFZhbHVlKSB8fCAvaHNsYVxcKChcXGQrKSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspXFwpL2cuZXhlYyhoc2xWYWx1ZSk7XG4gIHZhciBoID0gcGFyc2VJbnQoaHNsWzFdLCAxMCkgLyAzNjA7XG4gIHZhciBzID0gcGFyc2VJbnQoaHNsWzJdLCAxMCkgLyAxMDA7XG4gIHZhciBsID0gcGFyc2VJbnQoaHNsWzNdLCAxMCkgLyAxMDA7XG4gIHZhciBhID0gaHNsWzRdIHx8IDE7XG4gIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMCkgeyB0ICs9IDE7IH1cbiAgICBpZiAodCA+IDEpIHsgdCAtPSAxOyB9XG4gICAgaWYgKHQgPCAxLzYpIHsgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7IH1cbiAgICBpZiAodCA8IDEvMikgeyByZXR1cm4gcTsgfVxuICAgIGlmICh0IDwgMi8zKSB7IHJldHVybiBwICsgKHEgLSBwKSAqICgyLzMgLSB0KSAqIDY7IH1cbiAgICByZXR1cm4gcDtcbiAgfVxuICB2YXIgciwgZywgYjtcbiAgaWYgKHMgPT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGw7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxLzMpO1xuICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxLzMpO1xuICB9XG4gIHJldHVybiAoXCJyZ2JhKFwiICsgKHIgKiAyNTUpICsgXCIsXCIgKyAoZyAqIDI1NSkgKyBcIixcIiArIChiICogMjU1KSArIFwiLFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gY29sb3JUb1JnYih2YWwpIHtcbiAgaWYgKGlzLnJnYih2YWwpKSB7IHJldHVybiByZ2JUb1JnYmEodmFsKTsgfVxuICBpZiAoaXMuaGV4KHZhbCkpIHsgcmV0dXJuIGhleFRvUmdiYSh2YWwpOyB9XG4gIGlmIChpcy5oc2wodmFsKSkgeyByZXR1cm4gaHNsVG9SZ2JhKHZhbCk7IH1cbn1cblxuLy8gVW5pdHNcblxuZnVuY3Rpb24gZ2V0VW5pdCh2YWwpIHtcbiAgdmFyIHNwbGl0ID0gL1srLV0/XFxkKlxcLj9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/KCV8cHh8cHR8ZW18cmVtfGlufGNtfG1tfGV4fGNofHBjfHZ3fHZofHZtaW58dm1heHxkZWd8cmFkfHR1cm4pPyQvLmV4ZWModmFsKTtcbiAgaWYgKHNwbGl0KSB7IHJldHVybiBzcGxpdFsxXTsgfVxufVxuXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1Vbml0KHByb3BOYW1lKSB7XG4gIGlmIChzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3RyYW5zbGF0ZScpIHx8IHByb3BOYW1lID09PSAncGVyc3BlY3RpdmUnKSB7IHJldHVybiAncHgnOyB9XG4gIGlmIChzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3JvdGF0ZScpIHx8IHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAnc2tldycpKSB7IHJldHVybiAnZGVnJzsgfVxufVxuXG4vLyBWYWx1ZXNcblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb25WYWx1ZSh2YWwsIGFuaW1hdGFibGUpIHtcbiAgaWYgKCFpcy5mbmModmFsKSkgeyByZXR1cm4gdmFsOyB9XG4gIHJldHVybiB2YWwoYW5pbWF0YWJsZS50YXJnZXQsIGFuaW1hdGFibGUuaWQsIGFuaW1hdGFibGUudG90YWwpO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWwsIHByb3ApIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShwcm9wKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkge1xuICB2YXIgdmFsdWVVbml0ID0gZ2V0VW5pdCh2YWx1ZSk7XG4gIGlmIChhcnJheUNvbnRhaW5zKFt1bml0LCAnZGVnJywgJ3JhZCcsICd0dXJuJ10sIHZhbHVlVW5pdCkpIHsgcmV0dXJuIHZhbHVlOyB9XG4gIHZhciBjYWNoZWQgPSBjYWNoZS5DU1NbdmFsdWUgKyB1bml0XTtcbiAgaWYgKCFpcy51bmQoY2FjaGVkKSkgeyByZXR1cm4gY2FjaGVkOyB9XG4gIHZhciBiYXNlbGluZSA9IDEwMDtcbiAgdmFyIHRlbXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG4gIHZhciBwYXJlbnRFbCA9IChlbC5wYXJlbnROb2RlICYmIChlbC5wYXJlbnROb2RlICE9PSBkb2N1bWVudCkpID8gZWwucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gIHBhcmVudEVsLmFwcGVuZENoaWxkKHRlbXBFbCk7XG4gIHRlbXBFbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHRlbXBFbC5zdHlsZS53aWR0aCA9IGJhc2VsaW5lICsgdW5pdDtcbiAgdmFyIGZhY3RvciA9IGJhc2VsaW5lIC8gdGVtcEVsLm9mZnNldFdpZHRoO1xuICBwYXJlbnRFbC5yZW1vdmVDaGlsZCh0ZW1wRWwpO1xuICB2YXIgY29udmVydGVkVW5pdCA9IGZhY3RvciAqIHBhcnNlRmxvYXQodmFsdWUpO1xuICBjYWNoZS5DU1NbdmFsdWUgKyB1bml0XSA9IGNvbnZlcnRlZFVuaXQ7XG4gIHJldHVybiBjb252ZXJ0ZWRVbml0O1xufVxuXG5mdW5jdGlvbiBnZXRDU1NWYWx1ZShlbCwgcHJvcCwgdW5pdCkge1xuICBpZiAocHJvcCBpbiBlbC5zdHlsZSkge1xuICAgIHZhciB1cHBlcmNhc2VQcm9wTmFtZSA9IHByb3AucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdmFsdWUgPSBlbC5zdHlsZVtwcm9wXSB8fCBnZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHVwcGVyY2FzZVByb3BOYW1lKSB8fCAnMCc7XG4gICAgcmV0dXJuIHVuaXQgPyBjb252ZXJ0UHhUb1VuaXQoZWwsIHZhbHVlLCB1bml0KSA6IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFuaW1hdGlvblR5cGUoZWwsIHByb3ApIHtcbiAgaWYgKGlzLmRvbShlbCkgJiYgIWlzLmlucChlbCkgJiYgKGdldEF0dHJpYnV0ZShlbCwgcHJvcCkgfHwgKGlzLnN2ZyhlbCkgJiYgZWxbcHJvcF0pKSkgeyByZXR1cm4gJ2F0dHJpYnV0ZSc7IH1cbiAgaWYgKGlzLmRvbShlbCkgJiYgYXJyYXlDb250YWlucyh2YWxpZFRyYW5zZm9ybXMsIHByb3ApKSB7IHJldHVybiAndHJhbnNmb3JtJzsgfVxuICBpZiAoaXMuZG9tKGVsKSAmJiAocHJvcCAhPT0gJ3RyYW5zZm9ybScgJiYgZ2V0Q1NTVmFsdWUoZWwsIHByb3ApKSkgeyByZXR1cm4gJ2Nzcyc7IH1cbiAgaWYgKGVsW3Byb3BdICE9IG51bGwpIHsgcmV0dXJuICdvYmplY3QnOyB9XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRUcmFuc2Zvcm1zKGVsKSB7XG4gIGlmICghaXMuZG9tKGVsKSkgeyByZXR1cm47IH1cbiAgdmFyIHN0ciA9IGVsLnN0eWxlLnRyYW5zZm9ybSB8fCAnJztcbiAgdmFyIHJlZyAgPSAvKFxcdyspXFwoKFteKV0qKVxcKS9nO1xuICB2YXIgdHJhbnNmb3JtcyA9IG5ldyBNYXAoKTtcbiAgdmFyIG07IHdoaWxlIChtID0gcmVnLmV4ZWMoc3RyKSkgeyB0cmFuc2Zvcm1zLnNldChtWzFdLCBtWzJdKTsgfVxuICByZXR1cm4gdHJhbnNmb3Jtcztcbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtVmFsdWUoZWwsIHByb3BOYW1lLCBhbmltYXRhYmxlLCB1bml0KSB7XG4gIHZhciBkZWZhdWx0VmFsID0gc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICdzY2FsZScpID8gMSA6IDAgKyBnZXRUcmFuc2Zvcm1Vbml0KHByb3BOYW1lKTtcbiAgdmFyIHZhbHVlID0gZ2V0RWxlbWVudFRyYW5zZm9ybXMoZWwpLmdldChwcm9wTmFtZSkgfHwgZGVmYXVsdFZhbDtcbiAgaWYgKGFuaW1hdGFibGUpIHtcbiAgICBhbmltYXRhYmxlLnRyYW5zZm9ybXMubGlzdC5zZXQocHJvcE5hbWUsIHZhbHVlKTtcbiAgICBhbmltYXRhYmxlLnRyYW5zZm9ybXNbJ2xhc3QnXSA9IHByb3BOYW1lO1xuICB9XG4gIHJldHVybiB1bml0ID8gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZSh0YXJnZXQsIHByb3BOYW1lLCB1bml0LCBhbmltYXRhYmxlKSB7XG4gIHN3aXRjaCAoZ2V0QW5pbWF0aW9uVHlwZSh0YXJnZXQsIHByb3BOYW1lKSkge1xuICAgIGNhc2UgJ3RyYW5zZm9ybSc6IHJldHVybiBnZXRUcmFuc2Zvcm1WYWx1ZSh0YXJnZXQsIHByb3BOYW1lLCBhbmltYXRhYmxlLCB1bml0KTtcbiAgICBjYXNlICdjc3MnOiByZXR1cm4gZ2V0Q1NTVmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgdW5pdCk7XG4gICAgY2FzZSAnYXR0cmlidXRlJzogcmV0dXJuIGdldEF0dHJpYnV0ZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICBkZWZhdWx0OiByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXSB8fCAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJlbGF0aXZlVmFsdWUodG8sIGZyb20pIHtcbiAgdmFyIG9wZXJhdG9yID0gL14oXFwqPXxcXCs9fC09KS8uZXhlYyh0byk7XG4gIGlmICghb3BlcmF0b3IpIHsgcmV0dXJuIHRvOyB9XG4gIHZhciB1ID0gZ2V0VW5pdCh0bykgfHwgMDtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KGZyb20pO1xuICB2YXIgeSA9IHBhcnNlRmxvYXQodG8ucmVwbGFjZShvcGVyYXRvclswXSwgJycpKTtcbiAgc3dpdGNoIChvcGVyYXRvclswXVswXSkge1xuICAgIGNhc2UgJysnOiByZXR1cm4geCArIHkgKyB1O1xuICAgIGNhc2UgJy0nOiByZXR1cm4geCAtIHkgKyB1O1xuICAgIGNhc2UgJyonOiByZXR1cm4geCAqIHkgKyB1O1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWUodmFsLCB1bml0KSB7XG4gIGlmIChpcy5jb2wodmFsKSkgeyByZXR1cm4gY29sb3JUb1JnYih2YWwpOyB9XG4gIGlmICgvXFxzL2cudGVzdCh2YWwpKSB7IHJldHVybiB2YWw7IH1cbiAgdmFyIG9yaWdpbmFsVW5pdCA9IGdldFVuaXQodmFsKTtcbiAgdmFyIHVuaXRMZXNzID0gb3JpZ2luYWxVbml0ID8gdmFsLnN1YnN0cigwLCB2YWwubGVuZ3RoIC0gb3JpZ2luYWxVbml0Lmxlbmd0aCkgOiB2YWw7XG4gIGlmICh1bml0KSB7IHJldHVybiB1bml0TGVzcyArIHVuaXQ7IH1cbiAgcmV0dXJuIHVuaXRMZXNzO1xufVxuXG4vLyBnZXRUb3RhbExlbmd0aCgpIGVxdWl2YWxlbnQgZm9yIGNpcmNsZSwgcmVjdCwgcG9seWxpbmUsIHBvbHlnb24gYW5kIGxpbmUgc2hhcGVzXG4vLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vU2ViTGFtYmxhLzNlMDU1MGM0OTZjMjM2NzA5NzQ0XG5cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHAyLnggLSBwMS54LCAyKSArIE1hdGgucG93KHAyLnkgLSBwMS55LCAyKSk7XG59XG5cbmZ1bmN0aW9uIGdldENpcmNsZUxlbmd0aChlbCkge1xuICByZXR1cm4gTWF0aC5QSSAqIDIgKiBnZXRBdHRyaWJ1dGUoZWwsICdyJyk7XG59XG5cbmZ1bmN0aW9uIGdldFJlY3RMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIChnZXRBdHRyaWJ1dGUoZWwsICd3aWR0aCcpICogMikgKyAoZ2V0QXR0cmlidXRlKGVsLCAnaGVpZ2h0JykgKiAyKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChlbCkge1xuICByZXR1cm4gZ2V0RGlzdGFuY2UoXG4gICAge3g6IGdldEF0dHJpYnV0ZShlbCwgJ3gxJyksIHk6IGdldEF0dHJpYnV0ZShlbCwgJ3kxJyl9LCBcbiAgICB7eDogZ2V0QXR0cmlidXRlKGVsLCAneDInKSwgeTogZ2V0QXR0cmlidXRlKGVsLCAneTInKX1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9seWxpbmVMZW5ndGgoZWwpIHtcbiAgdmFyIHBvaW50cyA9IGVsLnBvaW50cztcbiAgdmFyIHRvdGFsTGVuZ3RoID0gMDtcbiAgdmFyIHByZXZpb3VzUG9zO1xuICBmb3IgKHZhciBpID0gMCA7IGkgPCBwb2ludHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRQb3MgPSBwb2ludHMuZ2V0SXRlbShpKTtcbiAgICBpZiAoaSA+IDApIHsgdG90YWxMZW5ndGggKz0gZ2V0RGlzdGFuY2UocHJldmlvdXNQb3MsIGN1cnJlbnRQb3MpOyB9XG4gICAgcHJldmlvdXNQb3MgPSBjdXJyZW50UG9zO1xuICB9XG4gIHJldHVybiB0b3RhbExlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0UG9seWdvbkxlbmd0aChlbCkge1xuICB2YXIgcG9pbnRzID0gZWwucG9pbnRzO1xuICByZXR1cm4gZ2V0UG9seWxpbmVMZW5ndGgoZWwpICsgZ2V0RGlzdGFuY2UocG9pbnRzLmdldEl0ZW0ocG9pbnRzLm51bWJlck9mSXRlbXMgLSAxKSwgcG9pbnRzLmdldEl0ZW0oMCkpO1xufVxuXG4vLyBQYXRoIGFuaW1hdGlvblxuXG5mdW5jdGlvbiBnZXRUb3RhbExlbmd0aChlbCkge1xuICBpZiAoZWwuZ2V0VG90YWxMZW5ndGgpIHsgcmV0dXJuIGVsLmdldFRvdGFsTGVuZ3RoKCk7IH1cbiAgc3dpdGNoKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6IHJldHVybiBnZXRDaXJjbGVMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ3JlY3QnOiByZXR1cm4gZ2V0UmVjdExlbmd0aChlbCk7XG4gICAgY2FzZSAnbGluZSc6IHJldHVybiBnZXRMaW5lTGVuZ3RoKGVsKTtcbiAgICBjYXNlICdwb2x5bGluZSc6IHJldHVybiBnZXRQb2x5bGluZUxlbmd0aChlbCk7XG4gICAgY2FzZSAncG9seWdvbic6IHJldHVybiBnZXRQb2x5Z29uTGVuZ3RoKGVsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREYXNob2Zmc2V0KGVsKSB7XG4gIHZhciBwYXRoTGVuZ3RoID0gZ2V0VG90YWxMZW5ndGgoZWwpO1xuICBlbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBwYXRoTGVuZ3RoKTtcbiAgcmV0dXJuIHBhdGhMZW5ndGg7XG59XG5cbi8vIE1vdGlvbiBwYXRoXG5cbmZ1bmN0aW9uIGdldFBhcmVudFN2Z0VsKGVsKSB7XG4gIHZhciBwYXJlbnRFbCA9IGVsLnBhcmVudE5vZGU7XG4gIHdoaWxlIChpcy5zdmcocGFyZW50RWwpKSB7XG4gICAgaWYgKCFpcy5zdmcocGFyZW50RWwucGFyZW50Tm9kZSkpIHsgYnJlYWs7IH1cbiAgICBwYXJlbnRFbCA9IHBhcmVudEVsLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIHBhcmVudEVsO1xufVxuXG5mdW5jdGlvbiBnZXRQYXJlbnRTdmcocGF0aEVsLCBzdmdEYXRhKSB7XG4gIHZhciBzdmcgPSBzdmdEYXRhIHx8IHt9O1xuICB2YXIgcGFyZW50U3ZnRWwgPSBzdmcuZWwgfHwgZ2V0UGFyZW50U3ZnRWwocGF0aEVsKTtcbiAgdmFyIHJlY3QgPSBwYXJlbnRTdmdFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHZpZXdCb3hBdHRyID0gZ2V0QXR0cmlidXRlKHBhcmVudFN2Z0VsLCAndmlld0JveCcpO1xuICB2YXIgd2lkdGggPSByZWN0LndpZHRoO1xuICB2YXIgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gIHZhciB2aWV3Qm94ID0gc3ZnLnZpZXdCb3ggfHwgKHZpZXdCb3hBdHRyID8gdmlld0JveEF0dHIuc3BsaXQoJyAnKSA6IFswLCAwLCB3aWR0aCwgaGVpZ2h0XSk7XG4gIHJldHVybiB7XG4gICAgZWw6IHBhcmVudFN2Z0VsLFxuICAgIHZpZXdCb3g6IHZpZXdCb3gsXG4gICAgeDogdmlld0JveFswXSAvIDEsXG4gICAgeTogdmlld0JveFsxXSAvIDEsXG4gICAgdzogd2lkdGggLyB2aWV3Qm94WzJdLFxuICAgIGg6IGhlaWdodCAvIHZpZXdCb3hbM11cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoKHBhdGgsIHBlcmNlbnQpIHtcbiAgdmFyIHBhdGhFbCA9IGlzLnN0cihwYXRoKSA/IHNlbGVjdFN0cmluZyhwYXRoKVswXSA6IHBhdGg7XG4gIHZhciBwID0gcGVyY2VudCB8fCAxMDA7XG4gIHJldHVybiBmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBlbDogcGF0aEVsLFxuICAgICAgc3ZnOiBnZXRQYXJlbnRTdmcocGF0aEVsKSxcbiAgICAgIHRvdGFsTGVuZ3RoOiBnZXRUb3RhbExlbmd0aChwYXRoRWwpICogKHAgLyAxMDApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhQcm9ncmVzcyhwYXRoLCBwcm9ncmVzcykge1xuICBmdW5jdGlvbiBwb2ludChvZmZzZXQpIHtcbiAgICBpZiAoIG9mZnNldCA9PT0gdm9pZCAwICkgb2Zmc2V0ID0gMDtcblxuICAgIHZhciBsID0gcHJvZ3Jlc3MgKyBvZmZzZXQgPj0gMSA/IHByb2dyZXNzICsgb2Zmc2V0IDogMDtcbiAgICByZXR1cm4gcGF0aC5lbC5nZXRQb2ludEF0TGVuZ3RoKGwpO1xuICB9XG4gIHZhciBzdmcgPSBnZXRQYXJlbnRTdmcocGF0aC5lbCwgcGF0aC5zdmcpO1xuICB2YXIgcCA9IHBvaW50KCk7XG4gIHZhciBwMCA9IHBvaW50KC0xKTtcbiAgdmFyIHAxID0gcG9pbnQoKzEpO1xuICBzd2l0Y2ggKHBhdGgucHJvcGVydHkpIHtcbiAgICBjYXNlICd4JzogcmV0dXJuIChwLnggLSBzdmcueCkgKiBzdmcudztcbiAgICBjYXNlICd5JzogcmV0dXJuIChwLnkgLSBzdmcueSkgKiBzdmcuaDtcbiAgICBjYXNlICdhbmdsZSc6IHJldHVybiBNYXRoLmF0YW4yKHAxLnkgLSBwMC55LCBwMS54IC0gcDAueCkgKiAxODAgLyBNYXRoLlBJO1xuICB9XG59XG5cbi8vIERlY29tcG9zZSB2YWx1ZVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VWYWx1ZSh2YWwsIHVuaXQpIHtcbiAgLy8gY29uc3Qgcmd4ID0gLy0/XFxkKlxcLj9cXGQrL2c7IC8vIGhhbmRsZXMgYmFzaWMgbnVtYmVyc1xuICAvLyBjb25zdCByZ3ggPSAvWystXT9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/L2c7IC8vIGhhbmRsZXMgZXhwb25lbnRzIG5vdGF0aW9uXG4gIHZhciByZ3ggPSAvWystXT9cXGQqXFwuP1xcZCsoPzpcXC5cXGQrKT8oPzpbZUVdWystXT9cXGQrKT8vZzsgLy8gaGFuZGxlcyBleHBvbmVudHMgbm90YXRpb25cbiAgdmFyIHZhbHVlID0gdmFsaWRhdGVWYWx1ZSgoaXMucHRoKHZhbCkgPyB2YWwudG90YWxMZW5ndGggOiB2YWwpLCB1bml0KSArICcnO1xuICByZXR1cm4ge1xuICAgIG9yaWdpbmFsOiB2YWx1ZSxcbiAgICBudW1iZXJzOiB2YWx1ZS5tYXRjaChyZ3gpID8gdmFsdWUubWF0Y2gocmd4KS5tYXAoTnVtYmVyKSA6IFswXSxcbiAgICBzdHJpbmdzOiAoaXMuc3RyKHZhbCkgfHwgdW5pdCkgPyB2YWx1ZS5zcGxpdChyZ3gpIDogW11cbiAgfVxufVxuXG4vLyBBbmltYXRhYmxlc1xuXG5mdW5jdGlvbiBwYXJzZVRhcmdldHModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0c0FycmF5ID0gdGFyZ2V0cyA/IChmbGF0dGVuQXJyYXkoaXMuYXJyKHRhcmdldHMpID8gdGFyZ2V0cy5tYXAodG9BcnJheSkgOiB0b0FycmF5KHRhcmdldHMpKSkgOiBbXTtcbiAgcmV0dXJuIGZpbHRlckFycmF5KHRhcmdldHNBcnJheSwgZnVuY3Rpb24gKGl0ZW0sIHBvcywgc2VsZikgeyByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBwb3M7IH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRhYmxlcyh0YXJnZXRzKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZVRhcmdldHModGFyZ2V0cyk7XG4gIHJldHVybiBwYXJzZWQubWFwKGZ1bmN0aW9uICh0LCBpKSB7XG4gICAgcmV0dXJuIHt0YXJnZXQ6IHQsIGlkOiBpLCB0b3RhbDogcGFyc2VkLmxlbmd0aCwgdHJhbnNmb3JtczogeyBsaXN0OiBnZXRFbGVtZW50VHJhbnNmb3Jtcyh0KSB9IH07XG4gIH0pO1xufVxuXG4vLyBQcm9wZXJ0aWVzXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BlcnR5VHdlZW5zKHByb3AsIHR3ZWVuU2V0dGluZ3MpIHtcbiAgdmFyIHNldHRpbmdzID0gY2xvbmVPYmplY3QodHdlZW5TZXR0aW5ncyk7XG4gIC8vIE92ZXJyaWRlIGR1cmF0aW9uIGlmIGVhc2luZyBpcyBhIHNwcmluZ1xuICBpZiAoL15zcHJpbmcvLnRlc3Qoc2V0dGluZ3MuZWFzaW5nKSkgeyBzZXR0aW5ncy5kdXJhdGlvbiA9IHNwcmluZyhzZXR0aW5ncy5lYXNpbmcpOyB9XG4gIGlmIChpcy5hcnIocHJvcCkpIHtcbiAgICB2YXIgbCA9IHByb3AubGVuZ3RoO1xuICAgIHZhciBpc0Zyb21UbyA9IChsID09PSAyICYmICFpcy5vYmoocHJvcFswXSkpO1xuICAgIGlmICghaXNGcm9tVG8pIHtcbiAgICAgIC8vIER1cmF0aW9uIGRpdmlkZWQgYnkgdGhlIG51bWJlciBvZiB0d2VlbnNcbiAgICAgIGlmICghaXMuZm5jKHR3ZWVuU2V0dGluZ3MuZHVyYXRpb24pKSB7IHNldHRpbmdzLmR1cmF0aW9uID0gdHdlZW5TZXR0aW5ncy5kdXJhdGlvbiAvIGw7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJhbnNmb3JtIFtmcm9tLCB0b10gdmFsdWVzIHNob3J0aGFuZCB0byBhIHZhbGlkIHR3ZWVuIHZhbHVlXG4gICAgICBwcm9wID0ge3ZhbHVlOiBwcm9wfTtcbiAgICB9XG4gIH1cbiAgdmFyIHByb3BBcnJheSA9IGlzLmFycihwcm9wKSA/IHByb3AgOiBbcHJvcF07XG4gIHJldHVybiBwcm9wQXJyYXkubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgdmFyIG9iaiA9IChpcy5vYmoodikgJiYgIWlzLnB0aCh2KSkgPyB2IDoge3ZhbHVlOiB2fTtcbiAgICAvLyBEZWZhdWx0IGRlbGF5IHZhbHVlIHNob3VsZCBvbmx5IGJlIGFwcGxpZWQgdG8gdGhlIGZpcnN0IHR3ZWVuXG4gICAgaWYgKGlzLnVuZChvYmouZGVsYXkpKSB7IG9iai5kZWxheSA9ICFpID8gdHdlZW5TZXR0aW5ncy5kZWxheSA6IDA7IH1cbiAgICAvLyBEZWZhdWx0IGVuZERlbGF5IHZhbHVlIHNob3VsZCBvbmx5IGJlIGFwcGxpZWQgdG8gdGhlIGxhc3QgdHdlZW5cbiAgICBpZiAoaXMudW5kKG9iai5lbmREZWxheSkpIHsgb2JqLmVuZERlbGF5ID0gaSA9PT0gcHJvcEFycmF5Lmxlbmd0aCAtIDEgPyB0d2VlblNldHRpbmdzLmVuZERlbGF5IDogMDsgfVxuICAgIHJldHVybiBvYmo7XG4gIH0pLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gbWVyZ2VPYmplY3RzKGssIHNldHRpbmdzKTsgfSk7XG59XG5cblxuZnVuY3Rpb24gZmxhdHRlbktleWZyYW1lcyhrZXlmcmFtZXMpIHtcbiAgdmFyIHByb3BlcnR5TmFtZXMgPSBmaWx0ZXJBcnJheShmbGF0dGVuQXJyYXkoa2V5ZnJhbWVzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBPYmplY3Qua2V5cyhrZXkpOyB9KSksIGZ1bmN0aW9uIChwKSB7IHJldHVybiBpcy5rZXkocCk7IH0pXG4gIC5yZWR1Y2UoZnVuY3Rpb24gKGEsYikgeyBpZiAoYS5pbmRleE9mKGIpIDwgMCkgeyBhLnB1c2goYik7IH0gcmV0dXJuIGE7IH0sIFtdKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB7fTtcbiAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGkgKSB7XG4gICAgdmFyIHByb3BOYW1lID0gcHJvcGVydHlOYW1lc1tpXTtcbiAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IGtleWZyYW1lcy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG5ld0tleSA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBrZXkpIHtcbiAgICAgICAgaWYgKGlzLmtleShwKSkge1xuICAgICAgICAgIGlmIChwID09IHByb3BOYW1lKSB7IG5ld0tleS52YWx1ZSA9IGtleVtwXTsgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0tleVtwXSA9IGtleVtwXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0tleTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIGxvb3AoIGkgKTtcbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnRpZXModHdlZW5TZXR0aW5ncywgcGFyYW1zKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gW107XG4gIHZhciBrZXlmcmFtZXMgPSBwYXJhbXMua2V5ZnJhbWVzO1xuICBpZiAoa2V5ZnJhbWVzKSB7IHBhcmFtcyA9IG1lcmdlT2JqZWN0cyhmbGF0dGVuS2V5ZnJhbWVzKGtleWZyYW1lcyksIHBhcmFtcyk7IH1cbiAgZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICBpZiAoaXMua2V5KHApKSB7XG4gICAgICBwcm9wZXJ0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBwLFxuICAgICAgICB0d2VlbnM6IG5vcm1hbGl6ZVByb3BlcnR5VHdlZW5zKHBhcmFtc1twXSwgdHdlZW5TZXR0aW5ncylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuLy8gVHdlZW5zXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR3ZWVuVmFsdWVzKHR3ZWVuLCBhbmltYXRhYmxlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gdHdlZW4pIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRGdW5jdGlvblZhbHVlKHR3ZWVuW3BdLCBhbmltYXRhYmxlKTtcbiAgICBpZiAoaXMuYXJyKHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGdldEZ1bmN0aW9uVmFsdWUodiwgYW5pbWF0YWJsZSk7IH0pO1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkgeyB2YWx1ZSA9IHZhbHVlWzBdOyB9XG4gICAgfVxuICAgIHRbcF0gPSB2YWx1ZTtcbiAgfVxuICB0LmR1cmF0aW9uID0gcGFyc2VGbG9hdCh0LmR1cmF0aW9uKTtcbiAgdC5kZWxheSA9IHBhcnNlRmxvYXQodC5kZWxheSk7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSkge1xuICB2YXIgcHJldmlvdXNUd2VlbjtcbiAgcmV0dXJuIHByb3AudHdlZW5zLm1hcChmdW5jdGlvbiAodCkge1xuICAgIHZhciB0d2VlbiA9IG5vcm1hbGl6ZVR3ZWVuVmFsdWVzKHQsIGFuaW1hdGFibGUpO1xuICAgIHZhciB0d2VlblZhbHVlID0gdHdlZW4udmFsdWU7XG4gICAgdmFyIHRvID0gaXMuYXJyKHR3ZWVuVmFsdWUpID8gdHdlZW5WYWx1ZVsxXSA6IHR3ZWVuVmFsdWU7XG4gICAgdmFyIHRvVW5pdCA9IGdldFVuaXQodG8pO1xuICAgIHZhciBvcmlnaW5hbFZhbHVlID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZShhbmltYXRhYmxlLnRhcmdldCwgcHJvcC5uYW1lLCB0b1VuaXQsIGFuaW1hdGFibGUpO1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNUd2VlbiA/IHByZXZpb3VzVHdlZW4udG8ub3JpZ2luYWwgOiBvcmlnaW5hbFZhbHVlO1xuICAgIHZhciBmcm9tID0gaXMuYXJyKHR3ZWVuVmFsdWUpID8gdHdlZW5WYWx1ZVswXSA6IHByZXZpb3VzVmFsdWU7XG4gICAgdmFyIGZyb21Vbml0ID0gZ2V0VW5pdChmcm9tKSB8fCBnZXRVbml0KG9yaWdpbmFsVmFsdWUpO1xuICAgIHZhciB1bml0ID0gdG9Vbml0IHx8IGZyb21Vbml0O1xuICAgIGlmIChpcy51bmQodG8pKSB7IHRvID0gcHJldmlvdXNWYWx1ZTsgfVxuICAgIHR3ZWVuLmZyb20gPSBkZWNvbXBvc2VWYWx1ZShmcm9tLCB1bml0KTtcbiAgICB0d2Vlbi50byA9IGRlY29tcG9zZVZhbHVlKGdldFJlbGF0aXZlVmFsdWUodG8sIGZyb20pLCB1bml0KTtcbiAgICB0d2Vlbi5zdGFydCA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLmVuZCA6IDA7XG4gICAgdHdlZW4uZW5kID0gdHdlZW4uc3RhcnQgKyB0d2Vlbi5kZWxheSArIHR3ZWVuLmR1cmF0aW9uICsgdHdlZW4uZW5kRGVsYXk7XG4gICAgdHdlZW4uZWFzaW5nID0gcGFyc2VFYXNpbmdzKHR3ZWVuLmVhc2luZywgdHdlZW4uZHVyYXRpb24pO1xuICAgIHR3ZWVuLmlzUGF0aCA9IGlzLnB0aCh0d2VlblZhbHVlKTtcbiAgICB0d2Vlbi5pc0NvbG9yID0gaXMuY29sKHR3ZWVuLmZyb20ub3JpZ2luYWwpO1xuICAgIGlmICh0d2Vlbi5pc0NvbG9yKSB7IHR3ZWVuLnJvdW5kID0gMTsgfVxuICAgIHByZXZpb3VzVHdlZW4gPSB0d2VlbjtcbiAgICByZXR1cm4gdHdlZW47XG4gIH0pO1xufVxuXG4vLyBUd2VlbiBwcm9ncmVzc1xuXG52YXIgc2V0UHJvZ3Jlc3NWYWx1ZSA9IHtcbiAgY3NzOiBmdW5jdGlvbiAodCwgcCwgdikgeyByZXR1cm4gdC5zdHlsZVtwXSA9IHY7IH0sXG4gIGF0dHJpYnV0ZTogZnVuY3Rpb24gKHQsIHAsIHYpIHsgcmV0dXJuIHQuc2V0QXR0cmlidXRlKHAsIHYpOyB9LFxuICBvYmplY3Q6IGZ1bmN0aW9uICh0LCBwLCB2KSB7IHJldHVybiB0W3BdID0gdjsgfSxcbiAgdHJhbnNmb3JtOiBmdW5jdGlvbiAodCwgcCwgdiwgdHJhbnNmb3JtcywgbWFudWFsKSB7XG4gICAgdHJhbnNmb3Jtcy5saXN0LnNldChwLCB2KTtcbiAgICBpZiAocCA9PT0gdHJhbnNmb3Jtcy5sYXN0IHx8IG1hbnVhbCkge1xuICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgdHJhbnNmb3Jtcy5saXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBwcm9wKSB7IHN0ciArPSBwcm9wICsgXCIoXCIgKyB2YWx1ZSArIFwiKSBcIjsgfSk7XG4gICAgICB0LnN0eWxlLnRyYW5zZm9ybSA9IHN0cjtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFNldCBWYWx1ZSBoZWxwZXJcblxuZnVuY3Rpb24gc2V0VGFyZ2V0c1ZhbHVlKHRhcmdldHMsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGFuaW1hdGFibGVzID0gZ2V0QW5pbWF0YWJsZXModGFyZ2V0cyk7XG4gIGFuaW1hdGFibGVzLmZvckVhY2goZnVuY3Rpb24gKGFuaW1hdGFibGUpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXRGdW5jdGlvblZhbHVlKHByb3BlcnRpZXNbcHJvcGVydHldLCBhbmltYXRhYmxlKTtcbiAgICAgIHZhciB0YXJnZXQgPSBhbmltYXRhYmxlLnRhcmdldDtcbiAgICAgIHZhciB2YWx1ZVVuaXQgPSBnZXRVbml0KHZhbHVlKTtcbiAgICAgIHZhciBvcmlnaW5hbFZhbHVlID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZVVuaXQsIGFuaW1hdGFibGUpO1xuICAgICAgdmFyIHVuaXQgPSB2YWx1ZVVuaXQgfHwgZ2V0VW5pdChvcmlnaW5hbFZhbHVlKTtcbiAgICAgIHZhciB0byA9IGdldFJlbGF0aXZlVmFsdWUodmFsaWRhdGVWYWx1ZSh2YWx1ZSwgdW5pdCksIG9yaWdpbmFsVmFsdWUpO1xuICAgICAgdmFyIGFuaW1UeXBlID0gZ2V0QW5pbWF0aW9uVHlwZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIHNldFByb2dyZXNzVmFsdWVbYW5pbVR5cGVdKHRhcmdldCwgcHJvcGVydHksIHRvLCBhbmltYXRhYmxlLnRyYW5zZm9ybXMsIHRydWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEFuaW1hdGlvbnNcblxuZnVuY3Rpb24gY3JlYXRlQW5pbWF0aW9uKGFuaW1hdGFibGUsIHByb3ApIHtcbiAgdmFyIGFuaW1UeXBlID0gZ2V0QW5pbWF0aW9uVHlwZShhbmltYXRhYmxlLnRhcmdldCwgcHJvcC5uYW1lKTtcbiAgaWYgKGFuaW1UeXBlKSB7XG4gICAgdmFyIHR3ZWVucyA9IG5vcm1hbGl6ZVR3ZWVucyhwcm9wLCBhbmltYXRhYmxlKTtcbiAgICB2YXIgbGFzdFR3ZWVuID0gdHdlZW5zW3R3ZWVucy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogYW5pbVR5cGUsXG4gICAgICBwcm9wZXJ0eTogcHJvcC5uYW1lLFxuICAgICAgYW5pbWF0YWJsZTogYW5pbWF0YWJsZSxcbiAgICAgIHR3ZWVuczogdHdlZW5zLFxuICAgICAgZHVyYXRpb246IGxhc3RUd2Vlbi5lbmQsXG4gICAgICBkZWxheTogdHdlZW5zWzBdLmRlbGF5LFxuICAgICAgZW5kRGVsYXk6IGxhc3RUd2Vlbi5lbmREZWxheVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25zKGFuaW1hdGFibGVzLCBwcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBmaWx0ZXJBcnJheShmbGF0dGVuQXJyYXkoYW5pbWF0YWJsZXMubWFwKGZ1bmN0aW9uIChhbmltYXRhYmxlKSB7XG4gICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQW5pbWF0aW9uKGFuaW1hdGFibGUsIHByb3ApO1xuICAgIH0pO1xuICB9KSksIGZ1bmN0aW9uIChhKSB7IHJldHVybiAhaXMudW5kKGEpOyB9KTtcbn1cblxuLy8gQ3JlYXRlIEluc3RhbmNlXG5cbmZ1bmN0aW9uIGdldEluc3RhbmNlVGltaW5ncyhhbmltYXRpb25zLCB0d2VlblNldHRpbmdzKSB7XG4gIHZhciBhbmltTGVuZ3RoID0gYW5pbWF0aW9ucy5sZW5ndGg7XG4gIHZhciBnZXRUbE9mZnNldCA9IGZ1bmN0aW9uIChhbmltKSB7IHJldHVybiBhbmltLnRpbWVsaW5lT2Zmc2V0ID8gYW5pbS50aW1lbGluZU9mZnNldCA6IDA7IH07XG4gIHZhciB0aW1pbmdzID0ge307XG4gIHRpbWluZ3MuZHVyYXRpb24gPSBhbmltTGVuZ3RoID8gTWF0aC5tYXguYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kdXJhdGlvbjsgfSkpIDogdHdlZW5TZXR0aW5ncy5kdXJhdGlvbjtcbiAgdGltaW5ncy5kZWxheSA9IGFuaW1MZW5ndGggPyBNYXRoLm1pbi5hcHBseShNYXRoLCBhbmltYXRpb25zLm1hcChmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gZ2V0VGxPZmZzZXQoYW5pbSkgKyBhbmltLmRlbGF5OyB9KSkgOiB0d2VlblNldHRpbmdzLmRlbGF5O1xuICB0aW1pbmdzLmVuZERlbGF5ID0gYW5pbUxlbmd0aCA/IHRpbWluZ3MuZHVyYXRpb24gLSBNYXRoLm1heC5hcHBseShNYXRoLCBhbmltYXRpb25zLm1hcChmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gZ2V0VGxPZmZzZXQoYW5pbSkgKyBhbmltLmR1cmF0aW9uIC0gYW5pbS5lbmREZWxheTsgfSkpIDogdHdlZW5TZXR0aW5ncy5lbmREZWxheTtcbiAgcmV0dXJuIHRpbWluZ3M7XG59XG5cbnZhciBpbnN0YW5jZUlEID0gMDtcblxuZnVuY3Rpb24gY3JlYXRlTmV3SW5zdGFuY2UocGFyYW1zKSB7XG4gIHZhciBpbnN0YW5jZVNldHRpbmdzID0gcmVwbGFjZU9iamVjdFByb3BzKGRlZmF1bHRJbnN0YW5jZVNldHRpbmdzLCBwYXJhbXMpO1xuICB2YXIgdHdlZW5TZXR0aW5ncyA9IHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0VHdlZW5TZXR0aW5ncywgcGFyYW1zKTtcbiAgdmFyIHByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0aWVzKHR3ZWVuU2V0dGluZ3MsIHBhcmFtcyk7XG4gIHZhciBhbmltYXRhYmxlcyA9IGdldEFuaW1hdGFibGVzKHBhcmFtcy50YXJnZXRzKTtcbiAgdmFyIGFuaW1hdGlvbnMgPSBnZXRBbmltYXRpb25zKGFuaW1hdGFibGVzLCBwcm9wZXJ0aWVzKTtcbiAgdmFyIHRpbWluZ3MgPSBnZXRJbnN0YW5jZVRpbWluZ3MoYW5pbWF0aW9ucywgdHdlZW5TZXR0aW5ncyk7XG4gIHZhciBpZCA9IGluc3RhbmNlSUQ7XG4gIGluc3RhbmNlSUQrKztcbiAgcmV0dXJuIG1lcmdlT2JqZWN0cyhpbnN0YW5jZVNldHRpbmdzLCB7XG4gICAgaWQ6IGlkLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBhbmltYXRhYmxlczogYW5pbWF0YWJsZXMsXG4gICAgYW5pbWF0aW9uczogYW5pbWF0aW9ucyxcbiAgICBkdXJhdGlvbjogdGltaW5ncy5kdXJhdGlvbixcbiAgICBkZWxheTogdGltaW5ncy5kZWxheSxcbiAgICBlbmREZWxheTogdGltaW5ncy5lbmREZWxheVxuICB9KTtcbn1cblxuLy8gQ29yZVxuXG52YXIgYWN0aXZlSW5zdGFuY2VzID0gW107XG52YXIgcGF1c2VkSW5zdGFuY2VzID0gW107XG52YXIgcmFmO1xuXG52YXIgZW5naW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gcGxheSgpIHsgXG4gICAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICB9XG4gIGZ1bmN0aW9uIHN0ZXAodCkge1xuICAgIHZhciBhY3RpdmVJbnN0YW5jZXNMZW5ndGggPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoO1xuICAgIGlmIChhY3RpdmVJbnN0YW5jZXNMZW5ndGgpIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoKSB7XG4gICAgICAgIHZhciBhY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlc1tpXTtcbiAgICAgICAgaWYgKCFhY3RpdmVJbnN0YW5jZS5wYXVzZWQpIHtcbiAgICAgICAgICBhY3RpdmVJbnN0YW5jZS50aWNrKHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpbnN0YW5jZUluZGV4ID0gYWN0aXZlSW5zdGFuY2VzLmluZGV4T2YoYWN0aXZlSW5zdGFuY2UpO1xuICAgICAgICAgIGlmIChpbnN0YW5jZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGFjdGl2ZUluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VJbmRleCwgMSk7XG4gICAgICAgICAgICBhY3RpdmVJbnN0YW5jZXNMZW5ndGggPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBwbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhZiA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgfVxuICB9XG4gIHJldHVybiBwbGF5O1xufSkoKTtcblxuZnVuY3Rpb24gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgIGFjdGl2ZUluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnMpIHsgcmV0dXJuIGlucy5wYXVzZSgpOyB9KTtcbiAgICBwYXVzZWRJbnN0YW5jZXMgPSBhY3RpdmVJbnN0YW5jZXMuc2xpY2UoMCk7XG4gICAgYW5pbWUucnVubmluZyA9IGFjdGl2ZUluc3RhbmNlcyA9IFtdO1xuICB9IGVsc2Uge1xuICAgIHBhdXNlZEluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnMpIHsgcmV0dXJuIGlucy5wbGF5KCk7IH0pO1xuICB9XG59XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKTtcbn1cblxuLy8gUHVibGljIEluc3RhbmNlXG5cbmZ1bmN0aW9uIGFuaW1lKHBhcmFtcykge1xuICBpZiAoIHBhcmFtcyA9PT0gdm9pZCAwICkgcGFyYW1zID0ge307XG5cblxuICB2YXIgc3RhcnRUaW1lID0gMCwgbGFzdFRpbWUgPSAwLCBub3cgPSAwO1xuICB2YXIgY2hpbGRyZW4sIGNoaWxkcmVuTGVuZ3RoID0gMDtcbiAgdmFyIHJlc29sdmUgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG1ha2VQcm9taXNlKGluc3RhbmNlKSB7XG4gICAgdmFyIHByb21pc2UgPSB3aW5kb3cuUHJvbWlzZSAmJiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoX3Jlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUgPSBfcmVzb2x2ZTsgfSk7XG4gICAgaW5zdGFuY2UuZmluaXNoZWQgPSBwcm9taXNlO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgdmFyIGluc3RhbmNlID0gY3JlYXRlTmV3SW5zdGFuY2UocGFyYW1zKTtcbiAgdmFyIHByb21pc2UgPSBtYWtlUHJvbWlzZShpbnN0YW5jZSk7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IGluc3RhbmNlLmRpcmVjdGlvbjtcbiAgICBpZiAoZGlyZWN0aW9uICE9PSAnYWx0ZXJuYXRlJykge1xuICAgICAgaW5zdGFuY2UuZGlyZWN0aW9uID0gZGlyZWN0aW9uICE9PSAnbm9ybWFsJyA/ICdub3JtYWwnIDogJ3JldmVyc2UnO1xuICAgIH1cbiAgICBpbnN0YW5jZS5yZXZlcnNlZCA9ICFpbnN0YW5jZS5yZXZlcnNlZDtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gY2hpbGQucmV2ZXJzZWQgPSBpbnN0YW5jZS5yZXZlcnNlZDsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGp1c3RUaW1lKHRpbWUpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UucmV2ZXJzZWQgPyBpbnN0YW5jZS5kdXJhdGlvbiAtIHRpbWUgOiB0aW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lKCkge1xuICAgIHN0YXJ0VGltZSA9IDA7XG4gICAgbGFzdFRpbWUgPSBhZGp1c3RUaW1lKGluc3RhbmNlLmN1cnJlbnRUaW1lKSAqICgxIC8gYW5pbWUuc3BlZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Vla0NoaWxkKHRpbWUsIGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkKSB7IGNoaWxkLnNlZWsodGltZSAtIGNoaWxkLnRpbWVsaW5lT2Zmc2V0KTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3luY0luc3RhbmNlQ2hpbGRyZW4odGltZSkge1xuICAgIGlmICghaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHsgc2Vla0NoaWxkKHRpbWUsIGNoaWxkcmVuW2ldKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpJDEgPSBjaGlsZHJlbkxlbmd0aDsgaSQxLS07KSB7IHNlZWtDaGlsZCh0aW1lLCBjaGlsZHJlbltpJDFdKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNUaW1lKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhbmltYXRpb25zID0gaW5zdGFuY2UuYW5pbWF0aW9ucztcbiAgICB2YXIgYW5pbWF0aW9uc0xlbmd0aCA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgYW5pbWF0aW9uc0xlbmd0aCkge1xuICAgICAgdmFyIGFuaW0gPSBhbmltYXRpb25zW2ldO1xuICAgICAgdmFyIGFuaW1hdGFibGUgPSBhbmltLmFuaW1hdGFibGU7XG4gICAgICB2YXIgdHdlZW5zID0gYW5pbS50d2VlbnM7XG4gICAgICB2YXIgdHdlZW5MZW5ndGggPSB0d2VlbnMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciB0d2VlbiA9IHR3ZWVuc1t0d2Vlbkxlbmd0aF07XG4gICAgICAvLyBPbmx5IGNoZWNrIGZvciBrZXlmcmFtZXMgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSB0d2VlblxuICAgICAgaWYgKHR3ZWVuTGVuZ3RoKSB7IHR3ZWVuID0gZmlsdGVyQXJyYXkodHdlZW5zLCBmdW5jdGlvbiAodCkgeyByZXR1cm4gKGluc1RpbWUgPCB0LmVuZCk7IH0pWzBdIHx8IHR3ZWVuOyB9XG4gICAgICB2YXIgZWxhcHNlZCA9IG1pbk1heChpbnNUaW1lIC0gdHdlZW4uc3RhcnQgLSB0d2Vlbi5kZWxheSwgMCwgdHdlZW4uZHVyYXRpb24pIC8gdHdlZW4uZHVyYXRpb247XG4gICAgICB2YXIgZWFzZWQgPSBpc05hTihlbGFwc2VkKSA/IDEgOiB0d2Vlbi5lYXNpbmcoZWxhcHNlZCk7XG4gICAgICB2YXIgc3RyaW5ncyA9IHR3ZWVuLnRvLnN0cmluZ3M7XG4gICAgICB2YXIgcm91bmQgPSB0d2Vlbi5yb3VuZDtcbiAgICAgIHZhciBudW1iZXJzID0gW107XG4gICAgICB2YXIgdG9OdW1iZXJzTGVuZ3RoID0gdHdlZW4udG8ubnVtYmVycy5sZW5ndGg7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAodm9pZCAwKTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdG9OdW1iZXJzTGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gKHZvaWQgMCk7XG4gICAgICAgIHZhciB0b051bWJlciA9IHR3ZWVuLnRvLm51bWJlcnNbbl07XG4gICAgICAgIHZhciBmcm9tTnVtYmVyID0gdHdlZW4uZnJvbS5udW1iZXJzW25dIHx8IDA7XG4gICAgICAgIGlmICghdHdlZW4uaXNQYXRoKSB7XG4gICAgICAgICAgdmFsdWUgPSBmcm9tTnVtYmVyICsgKGVhc2VkICogKHRvTnVtYmVyIC0gZnJvbU51bWJlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gZ2V0UGF0aFByb2dyZXNzKHR3ZWVuLnZhbHVlLCBlYXNlZCAqIHRvTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm91bmQpIHtcbiAgICAgICAgICBpZiAoISh0d2Vlbi5pc0NvbG9yICYmIG4gPiAyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICogcm91bmQpIC8gcm91bmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG51bWJlcnMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICAvLyBNYW51YWwgQXJyYXkucmVkdWNlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VzXG4gICAgICB2YXIgc3RyaW5nc0xlbmd0aCA9IHN0cmluZ3MubGVuZ3RoO1xuICAgICAgaWYgKCFzdHJpbmdzTGVuZ3RoKSB7XG4gICAgICAgIHByb2dyZXNzID0gbnVtYmVyc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gc3RyaW5nc1swXTtcbiAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBzdHJpbmdzTGVuZ3RoOyBzKyspIHtcbiAgICAgICAgICB2YXIgYSA9IHN0cmluZ3Nbc107XG4gICAgICAgICAgdmFyIGIgPSBzdHJpbmdzW3MgKyAxXTtcbiAgICAgICAgICB2YXIgbiQxID0gbnVtYmVyc1tzXTtcbiAgICAgICAgICBpZiAoIWlzTmFOKG4kMSkpIHtcbiAgICAgICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgICBwcm9ncmVzcyArPSBuJDEgKyAnICc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcm9ncmVzcyArPSBuJDEgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0UHJvZ3Jlc3NWYWx1ZVthbmltLnR5cGVdKGFuaW1hdGFibGUudGFyZ2V0LCBhbmltLnByb3BlcnR5LCBwcm9ncmVzcywgYW5pbWF0YWJsZS50cmFuc2Zvcm1zKTtcbiAgICAgIGFuaW0uY3VycmVudFZhbHVlID0gcHJvZ3Jlc3M7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaW5zdGFuY2VbY2JdICYmICFpbnN0YW5jZS5wYXNzVGhyb3VnaCkgeyBpbnN0YW5jZVtjYl0oaW5zdGFuY2UpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBjb3VudEl0ZXJhdGlvbigpIHtcbiAgICBpZiAoaW5zdGFuY2UucmVtYWluaW5nICYmIGluc3RhbmNlLnJlbWFpbmluZyAhPT0gdHJ1ZSkge1xuICAgICAgaW5zdGFuY2UucmVtYWluaW5nLS07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW5zdGFuY2VQcm9ncmVzcyhlbmdpbmVUaW1lKSB7XG4gICAgdmFyIGluc0R1cmF0aW9uID0gaW5zdGFuY2UuZHVyYXRpb247XG4gICAgdmFyIGluc0RlbGF5ID0gaW5zdGFuY2UuZGVsYXk7XG4gICAgdmFyIGluc0VuZERlbGF5ID0gaW5zRHVyYXRpb24gLSBpbnN0YW5jZS5lbmREZWxheTtcbiAgICB2YXIgaW5zVGltZSA9IGFkanVzdFRpbWUoZW5naW5lVGltZSk7XG4gICAgaW5zdGFuY2UucHJvZ3Jlc3MgPSBtaW5NYXgoKGluc1RpbWUgLyBpbnNEdXJhdGlvbikgKiAxMDAsIDAsIDEwMCk7XG4gICAgaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrID0gaW5zVGltZSA8IGluc3RhbmNlLmN1cnJlbnRUaW1lO1xuICAgIGlmIChjaGlsZHJlbikgeyBzeW5jSW5zdGFuY2VDaGlsZHJlbihpbnNUaW1lKTsgfVxuICAgIGlmICghaW5zdGFuY2UuYmVnYW4gJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICBpbnN0YW5jZS5iZWdhbiA9IHRydWU7XG4gICAgICBzZXRDYWxsYmFjaygnYmVnaW4nKTtcbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZS5sb29wQmVnYW4gJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICBpbnN0YW5jZS5sb29wQmVnYW4gPSB0cnVlO1xuICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BCZWdpbicpO1xuICAgIH1cbiAgICBpZiAoaW5zVGltZSA8PSBpbnNEZWxheSAmJiBpbnN0YW5jZS5jdXJyZW50VGltZSAhPT0gMCkge1xuICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKDApO1xuICAgIH1cbiAgICBpZiAoKGluc1RpbWUgPj0gaW5zRW5kRGVsYXkgJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgIT09IGluc0R1cmF0aW9uKSB8fCAhaW5zRHVyYXRpb24pIHtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNEdXJhdGlvbik7XG4gICAgfVxuICAgIGlmIChpbnNUaW1lID4gaW5zRGVsYXkgJiYgaW5zVGltZSA8IGluc0VuZERlbGF5KSB7XG4gICAgICBpZiAoIWluc3RhbmNlLmNoYW5nZUJlZ2FuKSB7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2VCZWdpbicpO1xuICAgICAgfVxuICAgICAgc2V0Q2FsbGJhY2soJ2NoYW5nZScpO1xuICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKGluc1RpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaW5zdGFuY2UuY2hhbmdlQmVnYW4pIHtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQmVnYW4gPSBmYWxzZTtcbiAgICAgICAgc2V0Q2FsbGJhY2soJ2NoYW5nZUNvbXBsZXRlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lID0gbWluTWF4KGluc1RpbWUsIDAsIGluc0R1cmF0aW9uKTtcbiAgICBpZiAoaW5zdGFuY2UuYmVnYW4pIHsgc2V0Q2FsbGJhY2soJ3VwZGF0ZScpOyB9XG4gICAgaWYgKGVuZ2luZVRpbWUgPj0gaW5zRHVyYXRpb24pIHtcbiAgICAgIGxhc3RUaW1lID0gMDtcbiAgICAgIGNvdW50SXRlcmF0aW9uKCk7XG4gICAgICBpZiAoIWluc3RhbmNlLnJlbWFpbmluZykge1xuICAgICAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIWluc3RhbmNlLmNvbXBsZXRlZCkge1xuICAgICAgICAgIGluc3RhbmNlLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BDb21wbGV0ZScpO1xuICAgICAgICAgIHNldENhbGxiYWNrKCdjb21wbGV0ZScpO1xuICAgICAgICAgIGlmICghaW5zdGFuY2UucGFzc1Rocm91Z2ggJiYgJ1Byb21pc2UnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1ha2VQcm9taXNlKGluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IG5vdztcbiAgICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BDb21wbGV0ZScpO1xuICAgICAgICBpbnN0YW5jZS5sb29wQmVnYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGluc3RhbmNlLmRpcmVjdGlvbiA9PT0gJ2FsdGVybmF0ZScpIHtcbiAgICAgICAgICB0b2dnbGVJbnN0YW5jZURpcmVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5zdGFuY2UucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGlyZWN0aW9uID0gaW5zdGFuY2UuZGlyZWN0aW9uO1xuICAgIGluc3RhbmNlLnBhc3NUaHJvdWdoID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY3VycmVudFRpbWUgPSAwO1xuICAgIGluc3RhbmNlLnByb2dyZXNzID0gMDtcbiAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgIGluc3RhbmNlLmJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY2hhbmdlQmVnYW4gPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5jaGFuZ2VDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5yZXZlcnNlUGxheWJhY2sgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5yZXZlcnNlZCA9IGRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnO1xuICAgIGluc3RhbmNlLnJlbWFpbmluZyA9IGluc3RhbmNlLmxvb3A7XG4gICAgY2hpbGRyZW4gPSBpbnN0YW5jZS5jaGlsZHJlbjtcbiAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gY2hpbGRyZW5MZW5ndGg7IGktLTspIHsgaW5zdGFuY2UuY2hpbGRyZW5baV0ucmVzZXQoKTsgfVxuICAgIGlmIChpbnN0YW5jZS5yZXZlcnNlZCAmJiBpbnN0YW5jZS5sb29wICE9PSB0cnVlIHx8IChkaXJlY3Rpb24gPT09ICdhbHRlcm5hdGUnICYmIGluc3RhbmNlLmxvb3AgPT09IDEpKSB7IGluc3RhbmNlLnJlbWFpbmluZysrOyB9XG4gICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKGluc3RhbmNlLnJldmVyc2VkID8gaW5zdGFuY2UuZHVyYXRpb24gOiAwKTtcbiAgfTtcblxuICAvLyBTZXQgVmFsdWUgaGVscGVyXG5cbiAgaW5zdGFuY2Uuc2V0ID0gZnVuY3Rpb24odGFyZ2V0cywgcHJvcGVydGllcykge1xuICAgIHNldFRhcmdldHNWYWx1ZSh0YXJnZXRzLCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgaW5zdGFuY2UudGljayA9IGZ1bmN0aW9uKHQpIHtcbiAgICBub3cgPSB0O1xuICAgIGlmICghc3RhcnRUaW1lKSB7IHN0YXJ0VGltZSA9IG5vdzsgfVxuICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoKG5vdyArIChsYXN0VGltZSAtIHN0YXJ0VGltZSkpICogYW5pbWUuc3BlZWQpO1xuICB9O1xuXG4gIGluc3RhbmNlLnNlZWsgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgc2V0SW5zdGFuY2VQcm9ncmVzcyhhZGp1c3RUaW1lKHRpbWUpKTtcbiAgfTtcblxuICBpbnN0YW5jZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIGluc3RhbmNlLnBhdXNlZCA9IHRydWU7XG4gICAgcmVzZXRUaW1lKCk7XG4gIH07XG5cbiAgaW5zdGFuY2UucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghaW5zdGFuY2UucGF1c2VkKSB7IHJldHVybjsgfVxuICAgIGlmIChpbnN0YW5jZS5jb21wbGV0ZWQpIHsgaW5zdGFuY2UucmVzZXQoKTsgfVxuICAgIGluc3RhbmNlLnBhdXNlZCA9IGZhbHNlO1xuICAgIGFjdGl2ZUluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbiAgICByZXNldFRpbWUoKTtcbiAgICBpZiAoIXJhZikgeyBlbmdpbmUoKTsgfVxuICB9O1xuXG4gIGluc3RhbmNlLnJldmVyc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0b2dnbGVJbnN0YW5jZURpcmVjdGlvbigpO1xuICAgIHJlc2V0VGltZSgpO1xuICB9O1xuXG4gIGluc3RhbmNlLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBpbnN0YW5jZS5yZXNldCgpO1xuICAgIGluc3RhbmNlLnBsYXkoKTtcbiAgfTtcblxuICBpbnN0YW5jZS5yZXNldCgpO1xuXG4gIGlmIChpbnN0YW5jZS5hdXRvcGxheSkgeyBpbnN0YW5jZS5wbGF5KCk7IH1cblxuICByZXR1cm4gaW5zdGFuY2U7XG5cbn1cblxuLy8gUmVtb3ZlIHRhcmdldHMgZnJvbSBhbmltYXRpb25cblxuZnVuY3Rpb24gcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgYW5pbWF0aW9ucykge1xuICBmb3IgKHZhciBhID0gYW5pbWF0aW9ucy5sZW5ndGg7IGEtLTspIHtcbiAgICBpZiAoYXJyYXlDb250YWlucyh0YXJnZXRzQXJyYXksIGFuaW1hdGlvbnNbYV0uYW5pbWF0YWJsZS50YXJnZXQpKSB7XG4gICAgICBhbmltYXRpb25zLnNwbGljZShhLCAxKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGFyZ2V0cyh0YXJnZXRzKSB7XG4gIHZhciB0YXJnZXRzQXJyYXkgPSBwYXJzZVRhcmdldHModGFyZ2V0cyk7XG4gIGZvciAodmFyIGkgPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoOyBpLS07KSB7XG4gICAgdmFyIGluc3RhbmNlID0gYWN0aXZlSW5zdGFuY2VzW2ldO1xuICAgIHZhciBhbmltYXRpb25zID0gaW5zdGFuY2UuYW5pbWF0aW9ucztcbiAgICB2YXIgY2hpbGRyZW4gPSBpbnN0YW5jZS5jaGlsZHJlbjtcbiAgICByZW1vdmVUYXJnZXRzRnJvbUFuaW1hdGlvbnModGFyZ2V0c0FycmF5LCBhbmltYXRpb25zKTtcbiAgICBmb3IgKHZhciBjID0gY2hpbGRyZW4ubGVuZ3RoOyBjLS07KSB7XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltjXTtcbiAgICAgIHZhciBjaGlsZEFuaW1hdGlvbnMgPSBjaGlsZC5hbmltYXRpb25zO1xuICAgICAgcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgY2hpbGRBbmltYXRpb25zKTtcbiAgICAgIGlmICghY2hpbGRBbmltYXRpb25zLmxlbmd0aCAmJiAhY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7IGNoaWxkcmVuLnNwbGljZShjLCAxKTsgfVxuICAgIH1cbiAgICBpZiAoIWFuaW1hdGlvbnMubGVuZ3RoICYmICFjaGlsZHJlbi5sZW5ndGgpIHsgaW5zdGFuY2UucGF1c2UoKTsgfVxuICB9XG59XG5cbi8vIFN0YWdnZXIgaGVscGVyc1xuXG5mdW5jdGlvbiBzdGFnZ2VyKHZhbCwgcGFyYW1zKSB7XG4gIGlmICggcGFyYW1zID09PSB2b2lkIDAgKSBwYXJhbXMgPSB7fTtcblxuICB2YXIgZGlyZWN0aW9uID0gcGFyYW1zLmRpcmVjdGlvbiB8fCAnbm9ybWFsJztcbiAgdmFyIGVhc2luZyA9IHBhcmFtcy5lYXNpbmcgPyBwYXJzZUVhc2luZ3MocGFyYW1zLmVhc2luZykgOiBudWxsO1xuICB2YXIgZ3JpZCA9IHBhcmFtcy5ncmlkO1xuICB2YXIgYXhpcyA9IHBhcmFtcy5heGlzO1xuICB2YXIgZnJvbUluZGV4ID0gcGFyYW1zLmZyb20gfHwgMDtcbiAgdmFyIGZyb21GaXJzdCA9IGZyb21JbmRleCA9PT0gJ2ZpcnN0JztcbiAgdmFyIGZyb21DZW50ZXIgPSBmcm9tSW5kZXggPT09ICdjZW50ZXInO1xuICB2YXIgZnJvbUxhc3QgPSBmcm9tSW5kZXggPT09ICdsYXN0JztcbiAgdmFyIGlzUmFuZ2UgPSBpcy5hcnIodmFsKTtcbiAgdmFyIHZhbDEgPSBpc1JhbmdlID8gcGFyc2VGbG9hdCh2YWxbMF0pIDogcGFyc2VGbG9hdCh2YWwpO1xuICB2YXIgdmFsMiA9IGlzUmFuZ2UgPyBwYXJzZUZsb2F0KHZhbFsxXSkgOiAwO1xuICB2YXIgdW5pdCA9IGdldFVuaXQoaXNSYW5nZSA/IHZhbFsxXSA6IHZhbCkgfHwgMDtcbiAgdmFyIHN0YXJ0ID0gcGFyYW1zLnN0YXJ0IHx8IDAgKyAoaXNSYW5nZSA/IHZhbDEgOiAwKTtcbiAgdmFyIHZhbHVlcyA9IFtdO1xuICB2YXIgbWF4VmFsdWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKGVsLCBpLCB0KSB7XG4gICAgaWYgKGZyb21GaXJzdCkgeyBmcm9tSW5kZXggPSAwOyB9XG4gICAgaWYgKGZyb21DZW50ZXIpIHsgZnJvbUluZGV4ID0gKHQgLSAxKSAvIDI7IH1cbiAgICBpZiAoZnJvbUxhc3QpIHsgZnJvbUluZGV4ID0gdCAtIDE7IH1cbiAgICBpZiAoIXZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0OyBpbmRleCsrKSB7XG4gICAgICAgIGlmICghZ3JpZCkge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKE1hdGguYWJzKGZyb21JbmRleCAtIGluZGV4KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGZyb21YID0gIWZyb21DZW50ZXIgPyBmcm9tSW5kZXglZ3JpZFswXSA6IChncmlkWzBdLTEpLzI7XG4gICAgICAgICAgdmFyIGZyb21ZID0gIWZyb21DZW50ZXIgPyBNYXRoLmZsb29yKGZyb21JbmRleC9ncmlkWzBdKSA6IChncmlkWzFdLTEpLzI7XG4gICAgICAgICAgdmFyIHRvWCA9IGluZGV4JWdyaWRbMF07XG4gICAgICAgICAgdmFyIHRvWSA9IE1hdGguZmxvb3IoaW5kZXgvZ3JpZFswXSk7XG4gICAgICAgICAgdmFyIGRpc3RhbmNlWCA9IGZyb21YIC0gdG9YO1xuICAgICAgICAgIHZhciBkaXN0YW5jZVkgPSBmcm9tWSAtIHRvWTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBNYXRoLnNxcnQoZGlzdGFuY2VYICogZGlzdGFuY2VYICsgZGlzdGFuY2VZICogZGlzdGFuY2VZKTtcbiAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7IHZhbHVlID0gLWRpc3RhbmNlWDsgfVxuICAgICAgICAgIGlmIChheGlzID09PSAneScpIHsgdmFsdWUgPSAtZGlzdGFuY2VZOyB9XG4gICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG1heFZhbHVlID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChlYXNpbmcpIHsgdmFsdWVzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBlYXNpbmcodmFsIC8gbWF4VmFsdWUpICogbWF4VmFsdWU7IH0pOyB9XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAncmV2ZXJzZScpIHsgdmFsdWVzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBheGlzID8gKHZhbCA8IDApID8gdmFsICogLTEgOiAtdmFsIDogTWF0aC5hYnMobWF4VmFsdWUgLSB2YWwpOyB9KTsgfVxuICAgIH1cbiAgICB2YXIgc3BhY2luZyA9IGlzUmFuZ2UgPyAodmFsMiAtIHZhbDEpIC8gbWF4VmFsdWUgOiB2YWwxO1xuICAgIHJldHVybiBzdGFydCArIChzcGFjaW5nICogKE1hdGgucm91bmQodmFsdWVzW2ldICogMTAwKSAvIDEwMCkpICsgdW5pdDtcbiAgfVxufVxuXG4vLyBUaW1lbGluZVxuXG5mdW5jdGlvbiB0aW1lbGluZShwYXJhbXMpIHtcbiAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IHt9O1xuXG4gIHZhciB0bCA9IGFuaW1lKHBhcmFtcyk7XG4gIHRsLmR1cmF0aW9uID0gMDtcbiAgdGwuYWRkID0gZnVuY3Rpb24oaW5zdGFuY2VQYXJhbXMsIHRpbWVsaW5lT2Zmc2V0KSB7XG4gICAgdmFyIHRsSW5kZXggPSBhY3RpdmVJbnN0YW5jZXMuaW5kZXhPZih0bCk7XG4gICAgdmFyIGNoaWxkcmVuID0gdGwuY2hpbGRyZW47XG4gICAgaWYgKHRsSW5kZXggPiAtMSkgeyBhY3RpdmVJbnN0YW5jZXMuc3BsaWNlKHRsSW5kZXgsIDEpOyB9XG4gICAgZnVuY3Rpb24gcGFzc1Rocm91Z2goaW5zKSB7IGlucy5wYXNzVGhyb3VnaCA9IHRydWU7IH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7IHBhc3NUaHJvdWdoKGNoaWxkcmVuW2ldKTsgfVxuICAgIHZhciBpbnNQYXJhbXMgPSBtZXJnZU9iamVjdHMoaW5zdGFuY2VQYXJhbXMsIHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0VHdlZW5TZXR0aW5ncywgcGFyYW1zKSk7XG4gICAgaW5zUGFyYW1zLnRhcmdldHMgPSBpbnNQYXJhbXMudGFyZ2V0cyB8fCBwYXJhbXMudGFyZ2V0cztcbiAgICB2YXIgdGxEdXJhdGlvbiA9IHRsLmR1cmF0aW9uO1xuICAgIGluc1BhcmFtcy5hdXRvcGxheSA9IGZhbHNlO1xuICAgIGluc1BhcmFtcy5kaXJlY3Rpb24gPSB0bC5kaXJlY3Rpb247XG4gICAgaW5zUGFyYW1zLnRpbWVsaW5lT2Zmc2V0ID0gaXMudW5kKHRpbWVsaW5lT2Zmc2V0KSA/IHRsRHVyYXRpb24gOiBnZXRSZWxhdGl2ZVZhbHVlKHRpbWVsaW5lT2Zmc2V0LCB0bER1cmF0aW9uKTtcbiAgICBwYXNzVGhyb3VnaCh0bCk7XG4gICAgdGwuc2VlayhpbnNQYXJhbXMudGltZWxpbmVPZmZzZXQpO1xuICAgIHZhciBpbnMgPSBhbmltZShpbnNQYXJhbXMpO1xuICAgIHBhc3NUaHJvdWdoKGlucyk7XG4gICAgY2hpbGRyZW4ucHVzaChpbnMpO1xuICAgIHZhciB0aW1pbmdzID0gZ2V0SW5zdGFuY2VUaW1pbmdzKGNoaWxkcmVuLCBwYXJhbXMpO1xuICAgIHRsLmRlbGF5ID0gdGltaW5ncy5kZWxheTtcbiAgICB0bC5lbmREZWxheSA9IHRpbWluZ3MuZW5kRGVsYXk7XG4gICAgdGwuZHVyYXRpb24gPSB0aW1pbmdzLmR1cmF0aW9uO1xuICAgIHRsLnNlZWsoMCk7XG4gICAgdGwucmVzZXQoKTtcbiAgICBpZiAodGwuYXV0b3BsYXkpIHsgdGwucGxheSgpOyB9XG4gICAgcmV0dXJuIHRsO1xuICB9O1xuICByZXR1cm4gdGw7XG59XG5cbmFuaW1lLnZlcnNpb24gPSAnMy4xLjAnO1xuYW5pbWUuc3BlZWQgPSAxO1xuYW5pbWUucnVubmluZyA9IGFjdGl2ZUluc3RhbmNlcztcbmFuaW1lLnJlbW92ZSA9IHJlbW92ZVRhcmdldHM7XG5hbmltZS5nZXQgPSBnZXRPcmlnaW5hbFRhcmdldFZhbHVlO1xuYW5pbWUuc2V0ID0gc2V0VGFyZ2V0c1ZhbHVlO1xuYW5pbWUuY29udmVydFB4ID0gY29udmVydFB4VG9Vbml0O1xuYW5pbWUucGF0aCA9IGdldFBhdGg7XG5hbmltZS5zZXREYXNob2Zmc2V0ID0gc2V0RGFzaG9mZnNldDtcbmFuaW1lLnN0YWdnZXIgPSBzdGFnZ2VyO1xuYW5pbWUudGltZWxpbmUgPSB0aW1lbGluZTtcbmFuaW1lLmVhc2luZyA9IHBhcnNlRWFzaW5ncztcbmFuaW1lLnBlbm5lciA9IHBlbm5lcjtcbmFuaW1lLnJhbmRvbSA9IGZ1bmN0aW9uIChtaW4sIG1heCkgeyByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjsgfTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWU7XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHRvTVMgfSBmcm9tICcuL3RvTVMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHRvU3J0VGltZSB9IGZyb20gJy4vdG9TcnRUaW1lJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1Z0dFRpbWUgfSBmcm9tICcuL3RvVnR0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5VnR0IH0gZnJvbSAnLi9zdHJpbmdpZnlWdHQnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3luYyB9IGZyb20gJy4vcmVzeW5jJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZVRpbWVzdGFtcHMgfSBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgcGFyc2VUaW1lc3RhbXBzIGZyb20gJy4vcGFyc2VUaW1lc3RhbXBzJ1xuXG4vKipcbiAqIFBhcnNlIGEgU1JUIG9yIFdlYlZUVCBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3J0T3JWdHRcbiAqIEByZXR1cm4ge0FycmF5fSBzdWJ0aXRsZXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZSAoc3J0T3JWdHQpIHtcbiAgaWYgKCFzcnRPclZ0dCkgcmV0dXJuIFtdXG5cbiAgY29uc3Qgc291cmNlID0gc3J0T3JWdHRcbiAgICAudHJpbSgpXG4gICAgLmNvbmNhdCgnXFxuJylcbiAgICAucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKVxuICAgIC5yZXBsYWNlKC9eV0VCVlRULipcXG4oPzouKjogLipcXG4pKlxcbi8sICcnKVxuICAgIC5zcGxpdCgnXFxuJylcblxuICByZXR1cm4gc291cmNlLnJlZHVjZSgoY2FwdGlvbnMsIHJvdywgaW5kZXgpID0+IHtcbiAgICBjb25zdCBjYXB0aW9uID0gY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMV1cblxuICAgIGlmICghY2FwdGlvbi5pbmRleCkge1xuICAgICAgaWYgKC9eXFxkKyQvLnRlc3Qocm93KSkge1xuICAgICAgICBjYXB0aW9uLmluZGV4ID0gcGFyc2VJbnQocm93LCAxMClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjYXB0aW9uLmhhc093blByb3BlcnR5KCdzdGFydCcpKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZVRpbWVzdGFtcHMocm93KVxuICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNhcHRpb24sIHRpbWVzdGFtcClcbiAgICAgIH0gZWxzZSBpZiAoY2FwdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICBjYXB0aW9uc1tjYXB0aW9ucy5sZW5ndGggLSAyXS50ZXh0ICs9ICdcXG4nICsgcm93XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FwdGlvbnNcbiAgICB9XG5cbiAgICBpZiAocm93ID09PSAnJykge1xuICAgICAgZGVsZXRlIGNhcHRpb24uaW5kZXhcbiAgICAgIGlmIChpbmRleCAhPT0gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY2FwdGlvbnMucHVzaCh7fSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi50ZXh0XG4gICAgICAgID8gY2FwdGlvbi50ZXh0ICsgJ1xcbicgKyByb3dcbiAgICAgICAgOiByb3dcbiAgICB9XG5cbiAgICByZXR1cm4gY2FwdGlvbnNcbiAgfSwgW3t9XSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogVGltZXN0YW1wIHJlZ2V4XG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG5cbmNvbnN0IFJFID0gL14oKD86XFxkezIsfTopP1xcZHsyfTpcXGR7Mn1bLC5dXFxkezN9KSAtLT4gKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkoPzogKC4qKSk/JC9cblxuLyoqXG4gKiBwYXJzZVRpbWVzdGFtcHNcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge3tzdGFydDogTnVtYmVyLCBlbmQ6IE51bWJlcn19XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBzICh2YWx1ZSkge1xuICBjb25zdCBtYXRjaCA9IFJFLmV4ZWModmFsdWUpXG4gIGlmIChtYXRjaCkge1xuICAgIGNvbnN0IGN1ZSA9IHtcbiAgICAgIHN0YXJ0OiB0b01TKG1hdGNoWzFdKSxcbiAgICAgIGVuZDogdG9NUyhtYXRjaFsyXSlcbiAgICB9XG4gICAgaWYgKG1hdGNoWzNdKSB7XG4gICAgICBjdWUuc2V0dGluZ3MgPSBtYXRjaFszXVxuICAgIH1cbiAgICByZXR1cm4gY3VlXG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogUmVzeW5jIHRoZSBnaXZlbiBzdWJ0aXRsZXMuXG4gKiBAcGFyYW0gY2FwdGlvbnNcbiAqIEBwYXJhbSB0aW1lXG4gKiBAcmV0dXJucyB7QXJyYXl8Kn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN5bmMgKGNhcHRpb25zLCB0aW1lKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoY2FwdGlvbiA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSB0b01TKGNhcHRpb24uc3RhcnQpICsgdGltZVxuICAgIGNvbnN0IGVuZCA9IHRvTVMoY2FwdGlvbi5lbmQpICsgdGltZVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNhcHRpb24sIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9TcnRUaW1lIGZyb20gJy4vdG9TcnRUaW1lJ1xuXG4vKipcbiAqIFN0cmluZ2lmeSB0aGUgZ2l2ZW4gYXJyYXkgb2YgY2FwdGlvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSBzcnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnkgKGNhcHRpb25zKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvU3J0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9TcnRUaW1lKGNhcHRpb24uZW5kKX1gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvVnR0VGltZSBmcm9tICcuL3RvVnR0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zIHRvIFdlYlZUVCBmb3JtYXQuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSB3ZWJWdHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnlWdHQgKGNhcHRpb25zKSB7XG4gIHJldHVybiAnV0VCVlRUXFxuXFxuJyArIGNhcHRpb25zLm1hcCgoY2FwdGlvbiwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdcXG4nIDogJycpICsgW1xuICAgICAgaW5kZXggKyAxLFxuICAgICAgYCR7dG9WdHRUaW1lKGNhcHRpb24uc3RhcnQpfSAtLT4gJHt0b1Z0dFRpbWUoY2FwdGlvbi5lbmQpfSR7Y2FwdGlvbi5zZXR0aW5ncyA/ICcgJyArIGNhcHRpb24uc2V0dGluZ3MgOiAnJ31gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gU1JUIHRpbWVzdGFtcCBhcyBtaWxsZXNlY29uZHMuXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHRpbWVzdGFtcFxuICogQHJldHVybnMge251bWJlcn0gbWlsbGlzZWNvbmRzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9NUyAodGltZXN0YW1wKSB7XG4gIGlmICghaXNOYU4odGltZXN0YW1wKSkge1xuICAgIHJldHVybiB0aW1lc3RhbXBcbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gdGltZXN0YW1wLm1hdGNoKC9eKD86KFxcZHsyLH0pOik/KFxcZHsyfSk6KFxcZHsyfSlbLC5dKFxcZHszfSkkLylcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFNSVCBvciBWVFQgdGltZSBmb3JtYXQ6IFwiJyArIHRpbWVzdGFtcCArICdcIicpXG4gIH1cblxuICBjb25zdCBob3VycyA9IG1hdGNoWzFdID8gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSAqIDM2MDAwMDAgOiAwXG4gIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChtYXRjaFsyXSwgMTApICogNjAwMDBcbiAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzNdLCAxMCkgKiAxMDAwXG4gIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzRdLCAxMClcblxuICByZXR1cm4gaG91cnMgKyBtaW51dGVzICsgc2Vjb25kcyArIG1pbGxpc2Vjb25kc1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgU1JUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9TcnRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30sJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgV2ViVlRUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9WdHRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwiLyoqXG4gKiBHaXZlbiBhIG51bWJlciwgcmV0dXJuIGEgemVyby1maWxsZWQgc3RyaW5nLlxuICogRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNjcyODMvXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9GaWxsICh3aWR0aCwgbnVtYmVyLCBwYWQpIHtcbiAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChudW1iZXIsIHBhZCkge1xuICAgICAgcmV0dXJuIHplcm9GaWxsKHdpZHRoLCBudW1iZXIsIHBhZClcbiAgICB9XG4gIH1cbiAgaWYgKHBhZCA9PT0gdW5kZWZpbmVkKSBwYWQgPSAnMCdcbiAgd2lkdGggLT0gbnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoXG4gIGlmICh3aWR0aCA+IDApIHJldHVybiBuZXcgQXJyYXkod2lkdGggKyAoL1xcLi8udGVzdChudW1iZXIpID8gMiA6IDEpKS5qb2luKHBhZCkgKyBudW1iZXJcbiAgcmV0dXJuIG51bWJlciArICcnXG59XG4iLCJpbXBvcnQgVmlkZW8gZnJvbSBcIi4vdmlkZW9cIlxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCBVSSBmcm9tIFwiLi91aVwiXG5pbXBvcnQgU3VicyBmcm9tIFwiLi9zdWJzXCJcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuXG5jbGFzcyBFdmVudHNIYW5kbGVycyB7XG4gIHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudDtcbiAgc3Viczogc3ViVGl0bGVUeXBlW107XG4gIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgdHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdHJhbnNsYXRlUmVzdWx0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10sIHN1YnNFbGVtZW50OiBIVE1MRWxlbWVudCwgc3Vic1Byb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLnZpZGVvRWxlbWVudCA9IHZpZGVvRWxlbWVudDtcbiAgICB0aGlzLnN1YnMgPSBzdWJzO1xuICAgIHRoaXMuc3Vic0VsZW1lbnQgPSBzdWJzRWxlbWVudDtcbiAgICB0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQgPSBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50O1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSB0aGlzLmNyZWF0ZVJlc2l6ZU9ic2VydmVyKClcbiAgICB0aGlzLmtleWJvYXJkSGFuZGxlciA9IHRoaXMua2V5Ym9hcmRIYW5kbGVyLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNXb3JkTW91c2VPdmVyID0gdGhpcy5zdWJzV29yZE1vdXNlT3Zlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzV29yZE1vdXNlT3V0ID0gdGhpcy5zdWJzV29yZE1vdXNlT3V0LmJpbmQodGhpcylcbiAgICB0aGlzLnZpZGVvT25UaW1lVXBkYXRlID0gdGhpcy52aWRlb09uVGltZVVwZGF0ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy52aWRlb1BhdXNlID0gdGhpcy52aWRlb1BhdXNlLmJpbmQodGhpcylcbiAgICB0aGlzLmNyZWF0ZVJlc2l6ZU9ic2VydmVyID0gdGhpcy5jcmVhdGVSZXNpemVPYnNlcnZlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzTW91c2VFbnRlciA9IHRoaXMuc3Vic01vdXNlRW50ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic01vdXNlTGVhdmUgPSB0aGlzLnN1YnNNb3VzZUxlYXZlLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNDbGljayA9IHRoaXMuc3Vic0NsaWNrLmJpbmQodGhpcylcbiAgICB0aGlzLnRyYW5zbGF0ZU9yaWdpbmFsRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWFzeXN1YnMtdHJhbnNsYXRlLW9yaWdpbmFsXCIpXG4gICAgdGhpcy50cmFuc2xhdGVSZXN1bHRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtcmVzdWx0XCIpXG4gICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtY29udGFpbmVyXCIpXG4gIH1cblxuICBhZGRFdmVudHMoKSB7XG4gICAgW1wia2V5dXBcIiwgXCJrZXlkb3duXCIsIFwia2V5cHJlc3NcIl0uZm9yRWFjaChldmVudFR5cGUgPT4ge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMua2V5Ym9hcmRIYW5kbGVyLCB0cnVlKTtcbiAgICB9KVxuICAgIHRoaXMuc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5zdWJzTW91c2VFbnRlcik7XG4gICAgdGhpcy5zdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLnN1YnNNb3VzZUxlYXZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHRoaXMuc3Vic1dvcmRNb3VzZU92ZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB0aGlzLnN1YnNXb3JkTW91c2VPdXQpO1xuICAgIHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIHRoaXMudmlkZW9PblRpbWVVcGRhdGUpO1xuICAgIHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCB0aGlzLnZpZGVvUGF1c2UpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQpO1xuICAgIHRoaXMuc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3Vic0NsaWNrKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50cygpIHtcbiAgICBbXCJrZXl1cFwiLCBcImtleWRvd25cIiwgXCJrZXlwcmVzc1wiXS5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5rZXlib2FyZEhhbmRsZXIsIHRydWUpO1xuICAgIH0pXG4gICAgdGhpcy5zdWJzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLnN1YnNNb3VzZUVudGVyKTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuc3Vic01vdXNlTGVhdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdGhpcy5zdWJzV29yZE1vdXNlT3Zlcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuc3Vic1dvcmRNb3VzZU91dCk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdGhpcy52aWRlb09uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIHRoaXMudmlkZW9QYXVzZSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1YnNDbGljayk7XG4gIH1cblxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5jb2RlID09IFwiQXJyb3dMZWZ0XCIpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gXCJrZXlkb3duXCIpIHsgVmlkZW8ubW92ZVRvUHJldlN1Yih0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQpIH1cbiAgICB9IGlmIChldmVudC5jb2RlID09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmIChldmVudC50eXBlID09IFwia2V5ZG93blwiKSB7IFZpZGVvLm1vdmVUb05leHRTdWIodGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3VicywgdGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KSB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzTW91c2VFbnRlcigpIHtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5wYXVzZSgpXG4gIH1cblxuICBwcml2YXRlIHN1YnNNb3VzZUxlYXZlKCkge1xuICAgIHRoaXMudmlkZW9FbGVtZW50LnBsYXkoKVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzV29yZE1vdXNlT3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09ICdlYXN5c3Vicy13b3JkJykge1xuICAgICAgaWYgKGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3lzdWJzLXRyYW5zbGF0ZS1jb250YWluZXJcIikubGVuZ3RoICE9IDApIHsgcmV0dXJuOyB9XG4gICAgICBjb25zdCB3b3JkID0gZWxlbWVudC50ZXh0Q29udGVudC5tYXRjaCgvW15cXFdcXGRdKFxcd3xbLSddezEsMn0oPz1cXHcpKSovKVswXVxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjb250ZW50U2NyaXB0UXVlcnk6ICd0cmFuc2xhdGUnLCB0ZXh0OiB3b3JkLCBsYW5nOiBcInJ1XCIgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIFVJLnNldFRyYW5zbGF0aW9uKFxuICAgICAgICAgIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZU9yaWdpbmFsRWxlbWVudCxcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQsXG4gICAgICAgICAgd29yZCxcbiAgICAgICAgICByZXNwb25zZS5kYXRhWzBdXG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic1dvcmRNb3VzZU91dChldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSAnZWFzeXN1YnMtd29yZCcpIHtcbiAgICAgIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2aWRlb09uVGltZVVwZGF0ZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50U3ViID0gU3Vicy51cGRhdGVTdWJzKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic0VsZW1lbnQpO1xuICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3Vicyk7XG4gICAgaWYgKGN1cnJlbnRTdWIgPT0gbnVsbCAmJiB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZGlzcGxheSAhPSBcIm5vbmVcIikge1xuICAgICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpZGVvUGF1c2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LCB0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0Jhcih0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgdGV4dCA9IHRoaXMuc3Vic0VsZW1lbnQudGV4dENvbnRlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikubGVuZ3RoICE9IDApIHsgcmV0dXJuOyB9XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjb250ZW50U2NyaXB0UXVlcnk6ICd0cmFuc2xhdGUnLCB0ZXh0OiB0ZXh0LCBsYW5nOiBcInJ1XCIgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBVdGlscy5yZW1vdmVBbGxFbGVtZW50cyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhc3lzdWJzLXdvcmQtdHJhbnNsYXRlXCIpKTtcbiAgICAgIFVJLnNldFRyYW5zbGF0aW9uKFxuICAgICAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50LFxuICAgICAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQsXG4gICAgICAgIHRleHQsXG4gICAgICAgIHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgIClcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudHNIYW5kbGVycztcbiIsImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4vcmVhZHlcIlxuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFVJIGZyb20gXCIuL3VpXCJcbmltcG9ydCBFdmVudHNIYW5kbGVycyBmcm9tIFwiLi9ldmVudHNfaGFuZGxlcnNcIlxuaW1wb3J0IFlvdVR1YmUgZnJvbSBcIi4vc2VydmljZXMveW91dHViZVwiO1xuaW1wb3J0IE5ldGZsaXggZnJvbSBcIi4vc2VydmljZXMvbmV0ZmxpeFwiO1xuaW1wb3J0IE9udml4IGZyb20gXCIuL3NlcnZpY2VzL29udml4XCI7XG5pbXBvcnQgS2lub1B1YiBmcm9tIFwiLi9zZXJ2aWNlcy9raW5vcHViXCI7XG5cbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHt9LCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgY29uc3Qgc2VydmljZSA9IFV0aWxzLmRldGVjdFNlcnZpY2UoKVxuICBpZiAoc2VydmljZSA9PSBudWxsKSB7IHJldHVybiB9XG5cbiAgY29uc29sZS5sb2coXCJFYXN5U3VicyBpbml0aWFsaXplZC4gU2VydmljZTogXCIgKyBzZXJ2aWNlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgcmVhZHkoJ3ZpZGVvJywgZnVuY3Rpb24gKHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgIGluaXRpYWxpemUoc2VydmljZSwgdmlkZW9FbGVtZW50KVxuICAgIGxldCBldmVudHNIYW5kbGVyOiBFdmVudHNIYW5kbGVycyA9IG51bGxcbiAgICBsZXQgb2xkSHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgIGlmIChvbGRIcmVmICE9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpIHtcbiAgICAgICAgICBldmVudHNIYW5kbGVyLnJlbW92ZUV2ZW50cygpO1xuICAgICAgICAgIGluaXRpYWxpemUoc2VydmljZSwgdmlkZW9FbGVtZW50KVxuICAgICAgICAgIG9sZEhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgY29uZmlnID0geyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLCBjb25maWcpO1xuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZShzZXJ2aWNlOiBZb3VUdWJlIHwgTmV0ZmxpeCB8IE9udml4IHwgS2lub1B1YiwgdmlkZW9FbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICBjb25zdCBwbGF5ZXJDb250YWluZXJFbGVtZW50ID0gc2VydmljZS5wbGF5ZXJDb250YWluZXJFbGVtZW50KClcblxuICAgICAgbGV0IHN1YnNFbGVtZW50ID0gVUkuY3JlYXRlU3Vic0VsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudCk7XG4gICAgICBsZXQgc3Vic1Byb2dyZXNzQmFyRWxlbWVudCA9IFVJLmNyZWF0ZVN1YnNQcm9ncmVzc0JhckVsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAgIHNlcnZpY2UuZ2V0U3VicyhcImVuZ1wiKVxuICAgICAgICAudGhlbihzdWJzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnRpdGxlcyBsb2FkZWQuIHN1YnMgY291bnQ6IFwiICsgc3Vicy5sZW5ndGgpXG5cbiAgICAgICAgICBzdWJzRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7IC8vIENsZWFyIHN1YnMgbG9hZGluZyB0ZXh0XG4gICAgICAgICAgZXZlbnRzSGFuZGxlciA9IG5ldyBFdmVudHNIYW5kbGVycyh2aWRlb0VsZW1lbnQsIHN1YnMsIHN1YnNFbGVtZW50LCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KVxuICAgICAgICAgIGV2ZW50c0hhbmRsZXIuYWRkRXZlbnRzKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICB9KTtcbn0pO1xuIiwiaW50ZXJmYWNlIExpc3RlbmVyIHtcbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgZm46IEZ1bmN0aW9uO1xufVxuXG5pbnRlcmZhY2UgRWxlbWVudE9iamVjdCB7XG4gIHJlYWR5OiBib29sZWFuXG59XG5sZXQgbGlzdGVuZXJzOiBMaXN0ZW5lcltdID0gW11cbmxldCBvYnNlcnZlclxuXG5mdW5jdGlvbiBjaGVjaygpIHtcbiAgLy8gQ2hlY2sgdGhlIERPTSBmb3IgZWxlbWVudHMgbWF0Y2hpbmcgYSBzdG9yZWQgc2VsZWN0b3JcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjogTnVtYmVyID0gbGlzdGVuZXJzLmxlbmd0aCwgbGlzdGVuZXI6IExpc3RlbmVyLCBlbGVtZW50czogRWxlbWVudE9iamVjdFtdOyBpIDwgbGVuOyBpKyspIHtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgICAvLyBRdWVyeSBmb3IgZWxlbWVudHMgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBzZWxlY3RvclxuICAgIGVsZW1lbnRzID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwobGlzdGVuZXIuc2VsZWN0b3IpIGFzIHVua25vd24gYXMgRWxlbWVudE9iamVjdFtdO1xuICAgIGZvciAodmFyIGogPSAwLCBqTGVuID0gZWxlbWVudHMubGVuZ3RoLCBlbGVtZW50OyBqIDwgakxlbjsgaisrKSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudHNbal07XG4gICAgICAvLyBNYWtlIHN1cmUgdGhlIGNhbGxiYWNrIGlzbid0IGludm9rZWQgd2l0aCB0aGUgXG4gICAgICAvLyBzYW1lIGVsZW1lbnQgbW9yZSB0aGFuIG9uY2VcbiAgICAgIGlmICghZWxlbWVudC5yZWFkeSkge1xuICAgICAgICBlbGVtZW50LnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgLy8gSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBlbGVtZW50XG4gICAgICAgIGxpc3RlbmVyLmZuLmNhbGwoZWxlbWVudCwgZWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkeShzZWxlY3Rvcjogc3RyaW5nLCBmbjogRnVuY3Rpb24pIHtcbiAgLy8gU3RvcmUgdGhlIHNlbGVjdG9yIGFuZCBjYWxsYmFjayB0byBiZSBtb25pdG9yZWRcbiAgbGlzdGVuZXJzLnB1c2goe1xuICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICBmbjogZm5cbiAgfSk7XG5cbiAgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihjaGVjayk7XG4gIG9ic2VydmVyLm9ic2VydmUod2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlXG4gIH0pO1xuXG4gIC8vIENoZWNrIGlmIHRoZSBlbGVtZW50IGlzIGN1cnJlbnRseSBpbiB0aGUgRE9NXG4gIGNoZWNrKCk7XG59XG4iLCJpbXBvcnQgU2VydmljZSBmcm9tICdzZXJ2aWNlJ1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlLCBwYXJzZSB9IGZyb20gJ3N1YnRpdGxlJ1xuY2xhc3MgS2lub1B1YiBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuICBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3ViVGl0bGVUeXBlW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJldHVybiBwYXJzZShcIlwiKVxuICAgIH0pO1xuICB9XG5cbiAgcGxheWVyQ29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaW5vUHViO1xuIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSAnc2VydmljZSdcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSwgcGFyc2UgfSBmcm9tICdzdWJ0aXRsZSdcbmNsYXNzIE5ldGZsaXggaW1wbGVtZW50cyBTZXJ2aWNlIHtcbiAgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN1YlRpdGxlVHlwZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2UoXCJcIilcbiAgICB9KTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV0ZmxpeDtcbiIsImltcG9ydCB7IHBhcnNlLCBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi4vdWlcIlxuXG5jbGFzcyBPbnZpeCB7XG4gIGFzeW5jIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZyk6IFByb21pc2U8c3ViVGl0bGVUeXBlW10+IHtcbiAgICBjb25zdCB2aWRlb1R5cGUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdXG4gICAgY29uc3QgYmFzZV9wYXRobmFtZSA9IFwiL2FwaS92MS9zdHJlYW1pbmcvXCJcbiAgICBjb25zdCB2aWRlb0lkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXVxuICAgIGNvbnN0IHN0cmVhbSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzBdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IHNlYXNvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzFdXG4gICAgY29uc3QgZXBpc29kZSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzJdXG5cbiAgICBsZXQgdXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VfcGF0aG5hbWV9JHt2aWRlb1R5cGV9cy8ke3ZpZGVvSWR9LyR7c3RyZWFtfS5qc29uP2BcbiAgICBpZiAodmlkZW9UeXBlID09IFwic2VyaWFsXCIpIHsgdXJsID0gYCR7dXJsfSR7c2Vhc29ufSYke2VwaXNvZGV9YCB9XG5cbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC5qc29uKCk7XG4gICAgY29uc3Qgc3Vic191cmwgPSBkYXRhLm1lZGlhX2ZpbGVzLnZ0dC5maW5kKChlbDogeyBzcmNsYW5nOiBzdHJpbmcgfSkgPT4gZWwuc3JjbGFuZyA9PT0gbGFuZ3VhZ2UpLnNyYztcbiAgICBjb25zdCByZXNwXzEgPSBhd2FpdCBmZXRjaChzdWJzX3VybCk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BfMS50ZXh0KCk7XG4gICAgcmV0dXJuIHBhcnNlKHRleHQpO1xuICB9XG5cbiAgcGxheWVyQ29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZnAtdWlcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPbnZpeDtcbiIsImltcG9ydCBTZXJ2aWNlIGZyb20gJ3NlcnZpY2UnXG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUsIHBhcnNlIH0gZnJvbSAnc3VidGl0bGUnXG5pbXBvcnQgeyBhbHBoYTNUVG9BbHBoYTIgfSBmcm9tIFwiQGNvc3BpcmVkL2kxOG4taXNvLWxhbmd1YWdlc1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuLi91aVwiXG5cbmludGVyZmFjZSBTdWJ0aXRsZSB7XG4gIGJhc2VVcmw6IHN0cmluZ1xuICBpc1RyYW5zbGF0YWJsZTogYm9vbGVhblxuICBsYW5ndWFnZUNvZGU6IHN0cmluZ1xuICBuYW1lOiB7IHNpbXBsZVRleHQ6IHN0cmluZyB9XG4gIHZzc0lkOiBzdHJpbmdcbn1cblxuY2xhc3MgWW91VHViZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuICBhc3luYyBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWRlb0lkID0gdGhpcy5nZXRWaWRlb0lkKClcbiAgICBjb25zdCBsYW5nID0gYWxwaGEzVFRvQWxwaGEyKGxhbmd1YWdlKVxuXG4gICAgY29uc3Qgc3ViSXRlbSA9IGF3YWl0IHRoaXMuZ2V0VmlkZW9JbmZvKHZpZGVvSWQsIGxhbmcpO1xuICAgIGNvbnN0IHN1YlVyaTogc3RyaW5nID0gc3ViSXRlbS5iYXNlVXJsICsgXCImZm10PXZ0dFwiO1xuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHN1YlVyaSk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpO1xuICAgIHJldHVybiBwYXJzZSh0ZXh0KTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh0bWw1LXZpZGVvLXBsYXllclwiKVxuICB9XG5cbiAgZ2V0VmlkZW9JZCgpIHtcbiAgICBjb25zdCByZWdFeHByZXNzaW9uID0gL14uKih5b3V0dVxcLmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XG4gICAgdmFyIG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2gocmVnRXhwcmVzc2lvbik7XG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xuICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2FuJ3QgZ2V0IHlvdXR1YmUgdmlkZW8gaWRcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRWaWRlb0luZm8odmlkZW9JZDogc3RyaW5nLCBsYW5nOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8veW91dHViZS5jb20vZ2V0X3ZpZGVvX2luZm8/dmlkZW9faWQ9JHt2aWRlb0lkfWApO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwLnRleHQoKTtcbiAgICBjb25zdCBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuXG4gICAgaWYgKCFkYXRhLmluY2x1ZGVzKCdjYXB0aW9uVHJhY2tzJykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGNhcHRpb25zIGZvciB2aWRlbzogJHt2aWRlb0lkfWApO1xuXG4gICAgY29uc3QgcmVnZXggPSAvKHtcImNhcHRpb25UcmFja3NcIjouKmlzVHJhbnNsYXRhYmxlXCI6KHRydWV8ZmFsc2UpfV0pLztcbiAgICBjb25zdCBbbWF0Y2hdID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBjb25zdCB7IGNhcHRpb25UcmFja3MgfSA9IEpTT04ucGFyc2UoYCR7bWF0Y2h9fWApO1xuXG4gICAgY29uc3Qgc3VidGl0bGU6IFN1YnRpdGxlID0gY2FwdGlvblRyYWNrcy5maW5kKCh0cmFjazogYW55KSA9PiB7IHJldHVybiB0cmFjay52c3NJZCA9PSBgLiR7bGFuZ31gOyB9KSB8fFxuICAgICAgY2FwdGlvblRyYWNrcy5maW5kKCh0cmFjazogYW55KSA9PiB7IHJldHVybiB0cmFjay52c3NJZCA9PSBgYS4ke2xhbmd9YDsgfSkgfHxcbiAgICAgIGNhcHRpb25UcmFja3MuZmluZCgodHJhY2s6IGFueSkgPT4geyByZXR1cm4gdHJhY2sudnNzSWQubWF0Y2goYC4ke2xhbmd9YCk7IH0pO1xuXG4gICAgaWYgKCFzdWJ0aXRsZSB8fCAoc3VidGl0bGUgJiYgIXN1YnRpdGxlLmJhc2VVcmwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke2xhbmd9IGNhcHRpb25zIGZvciAke3ZpZGVvSWR9YCk7XG5cbiAgICByZXR1cm4gc3VidGl0bGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW91VHViZTtcbiIsImltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5cbmNvbnN0IHN1YnNBbmltYXRlRHVyYXRpb246IG51bWJlciA9IDMwMDtcbmNvbnN0IHN1YnNBbmltYXRlQ29tcGVuc2F0aW9uR2FwOiBudW1iZXIgPSBzdWJzQW5pbWF0ZUR1cmF0aW9uIC8gMiAvLyBNb3Rpb24gYW5pbWF0aW9uIGNvbXBlbnNhdGlvblxuXG5jbGFzcyBTdWJzIHtcbiAgc3RhdGljIHVwZGF0ZVN1YnModmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSBWaWRlby5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSB0aGlzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBzdWJzRWxlbWVudC5pbm5lckhUTUwgPSBjdXJyZW50U3ViLnRleHQucmVwbGFjZShcbiAgICAgICAgLyhefDxcXC8/W14+XSs+fFxccyspKFteXFxzPF0rKS9nLFxuICAgICAgICAnJDE8c3BhbiBjbGFzcz1cImVhc3lzdWJzLXdvcmRcIj4kMjwvc3Bhbj4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFN1YlxuICB9XG5cbiAgc3RhdGljIGdldEN1cnJlbnRTdWIoc3Viczogc3ViVGl0bGVUeXBlW10sIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcbiAgICByZXR1cm4gc3Vicy5maW5kKChzdWI6IHN1YlRpdGxlVHlwZSkgPT4gc3ViLnN0YXJ0IDw9IGN1cnJlbnRUaW1lICYmIHN1Yi5lbmQgPj0gY3VycmVudFRpbWUpXG4gIH1cblxuICBzdGF0aWMgZ2V0UHJldlN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViIC0gMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZCgoc3ViLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoc3Vic1tpbmRleCArIDFdID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWIuZW5kIDw9IGN1cnJlbnRUaW1lICYmIHN1YnNbaW5kZXggKyAxXS5zdGFydCA+PSBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TmV4dFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViICsgMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZChzdWIgPT4gc3ViLnN0YXJ0ID49IGN1cnJlbnRUaW1lKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQsIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgaGFyZE1vdmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHRpbWVQZXJpb2QgPSAzMDAwMDsgLy8gMzAgc2Vjb25kc1xuICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IG1zSW5QeCA9IChwcm9ncmVzc0JhcldpZHRoIC8gdGltZVBlcmlvZClcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IFZpZGVvLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBjb25zdCBsZWZ0Qm9yZGVyID0gY3VycmVudFRpbWUgKyB0aW1lUGVyaW9kIC8gMjtcbiAgICBjb25zdCByaWdodEJvcmRlciA9IGN1cnJlbnRUaW1lIC0gdGltZVBlcmlvZCAvIDI7XG5cbiAgICBjb25zdCBzdWJzSW5EdXJhdGlvbiA9IHN1YnMuZmlsdGVyKHN1YiA9PlxuICAgICAgKHN1Yi5lbmQgPiByaWdodEJvcmRlciAmJiBzdWIuZW5kIDwgbGVmdEJvcmRlcikgfHxcbiAgICAgIChzdWIuc3RhcnQgPiByaWdodEJvcmRlciAmJiBzdWIuc3RhcnQgPCBsZWZ0Qm9yZGVyKVxuICAgICk7XG5cbiAgICBsZXQgY3VycmVudFN1YnNJZHM6IHN0cmluZ1tdID0gW11cbiAgICBpZiAoaGFyZE1vdmUpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyLWVsZW1lbnRcIikuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSlcbiAgICB9XG4gICAgc3Vic0luRHVyYXRpb24uZm9yRWFjaChzdWIgPT4ge1xuICAgICAgY29uc3Qgc3ViSWQgPSBcImlkXCIgKyBzdWIuc3RhcnQgKyBcIi1cIiArIHN1Yi5lbmRcbiAgICAgIGN1cnJlbnRTdWJzSWRzLnB1c2goc3ViSWQpXG4gICAgICBjb25zdCBjdXJyZW50U3ViID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3ViSWQpXG5cbiAgICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICAgIGFuaW1lKHtcbiAgICAgICAgICB0YXJnZXRzOiBjdXJyZW50U3ViLFxuICAgICAgICAgIHRyYW5zbGF0ZVg6IG1zSW5QeCAqICgoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLnN0YXJ0KSAtIHJpZ2h0Qm9yZGVyKSAtIHN1YnNBbmltYXRlQ29tcGVuc2F0aW9uR2FwKSxcbiAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgICAgICAgIGR1cmF0aW9uOiBzdWJzQW5pbWF0ZUR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3ViV2lkdGggPSBtc0luUHggKiAoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLmVuZCkgLSBVdGlscy5jYXN0U3ViVGltZShzdWIuc3RhcnQpKVxuICAgICAgICBsZXQgc3ViRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3ViRGl2LmNsYXNzTmFtZSA9IFwiZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyLWVsZW1lbnRcIlxuICAgICAgICBzdWJEaXYuaWQgPSBzdWJJZFxuICAgICAgICBzdWJEaXYuc3R5bGUud2lkdGggPSBzdWJXaWR0aC50b0ZpeGVkKDApICsgXCJweFwiXG4gICAgICAgIHN1YkRpdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgbXNJblB4ICogKFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5zdGFydCkgLSByaWdodEJvcmRlcikgKyAncHgpJztcbiAgICAgICAgc3Vic1Byb2dyZXNzQmFyRWxlbWVudC5hcHBlbmRDaGlsZChzdWJEaXYpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiByZW1vdmVPbGRQcm9ncmVzc0JhckVsZW1lbnRzKHN1YnNJbkR1cmF0aW9uOiBzdWJUaXRsZVR5cGVbXSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRTdWJzSWRzLmluY2x1ZGVzKGVsLmlkKSA9PSBmYWxzZSkge1xuICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVPbGRQcm9ncmVzc0JhckVsZW1lbnRzKHN1YnNJbkR1cmF0aW9uKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3VicztcbiIsImNsYXNzIFVJIHtcbiAgc3RhdGljIGNyZWF0ZVN1YnNFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3Qgc3Vic0NvbnRhaW5lckVsZW1lbnRJZCA9IFwiZWFzeXN1YnNcIjtcbiAgICBjb25zdCBwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJzQ29udGFpbmVyRWxlbWVudElkKVxuICAgIGlmIChwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgcHJldlN1YnNDb250YWluZXJFbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIGxldCBzdWJzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3Vic0NvbnRhaW5lckVsZW1lbnQuaWQgPSBzdWJzQ29udGFpbmVyRWxlbWVudElkO1xuXG4gICAgbGV0IHN1YnNJbm5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN1YnNJbm5lckVsZW1lbnQuaWQgPSBcImVhc3lzdWJzLXN1YnRpdGxlc1wiXG4gICAgc3Vic0NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Vic0lubmVyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTG9hZGluZyBzdWJ0aXRsZXMgLi4uXCIpO1xuICAgIHN1YnNJbm5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgcGxheWVyQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChzdWJzQ29udGFpbmVyRWxlbWVudCk7XG4gICAgdGhpcy5jcmVhdGVTdWJzVHJhbnNsYXRlRWxlbWVudChzdWJzQ29udGFpbmVyRWxlbWVudClcbiAgICByZXR1cm4gc3Vic0lubmVyRWxlbWVudDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTdWJzVHJhbnNsYXRlRWxlbWVudChzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgdHJhbnNsYXRlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0cmFuc2xhdGVUYWcuY2xhc3NOYW1lID0gXCJlYXN5c3Vicy10cmFuc2xhdGUtY29udGFpbmVyXCI7XG4gICAgdHJhbnNsYXRlVGFnLmlubmVySFRNTCA9IFwiPHNwYW4gY2xhc3M9J2Vhc3lzdWJzLXRyYW5zbGF0ZS1vcmlnaW5hbCc+dGVzdDwvc3Bhbj48aHI+PHNwYW4gY2xhc3M9J2Vhc3lzdWJzLXRyYW5zbGF0ZS1yZXN1bHQnPnRlc3QgdHJhbnNsYXRlPC9zcGFuPlwiXG4gICAgc3Vic0VsZW1lbnQuYXBwZW5kQ2hpbGQodHJhbnNsYXRlVGFnKTtcbiAgfVxuXG4gIHN0YXRpYyBzZXRUcmFuc2xhdGlvbih0cmFuc2xhdGVDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCwgb3JpZ2luYWxFbGVtZW50OiBIVE1MRWxlbWVudCwgcmVzdWx0RWxlbWVudDogSFRNTEVsZW1lbnQsIG9yaWdpbmFsVGV4dDogc3RyaW5nLCByZXN1bHRUZXh0OiBzdHJpbmcpIHtcbiAgICB0cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgb3JpZ2luYWxFbGVtZW50LmlubmVySFRNTCA9IG9yaWdpbmFsVGV4dFxuICAgIHJlc3VsdEVsZW1lbnQuaW5uZXJIVE1MID0gcmVzdWx0VGV4dFxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNQcm9ncmVzc0JhckVsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgcHJvZ3Jlc3NCYXJDbGFzcyA9IFwiZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyXCJcbiAgICBjb25zdCBwcmV2UHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5cIiArIHByb2dyZXNzQmFyQ2xhc3MpXG4gICAgaWYgKHByZXZQcm9ncmVzc0JhckVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgcHJldlByb2dyZXNzQmFyRWxlbWVudC5yZW1vdmUoKVxuICAgIH1cblxuICAgIGxldCBwcm9ncmVzc0JhckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2dyZXNzQmFyRWxlbWVudC5jbGFzc05hbWUgPSBwcm9ncmVzc0JhckNsYXNzO1xuICAgIHBsYXllckNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQocHJvZ3Jlc3NCYXJFbGVtZW50KVxuICAgIHJldHVybiBwcm9ncmVzc0JhckVsZW1lbnRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTtcbiIsImltcG9ydCBPbnZpeCBmcm9tICcuL3NlcnZpY2VzL29udml4JztcbmltcG9ydCBLaW5vUHViIGZyb20gJy4vc2VydmljZXMva2lub3B1Yic7XG5pbXBvcnQgWW91VHViZSBmcm9tICcuL3NlcnZpY2VzL3lvdXR1YmUnO1xuaW1wb3J0IE5ldGZsaXggZnJvbSAnLi9zZXJ2aWNlcy9uZXRmbGl4JztcblxuY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgY2FzdFN1YlRpbWUodGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aW1lID09IFwibnVtYmVyXCIgPyB0aW1lIDogcGFyc2VJbnQodGltZSlcbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3RTZXJ2aWNlKCk6IFlvdVR1YmUgfCBOZXRmbGl4IHwgT252aXggfCBLaW5vUHViIHtcbiAgICBjb25zdCB0aXRsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLnRleHRDb250ZW50XG4gICAgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcIllvdVR1YmVcIikgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QgPT0gXCJ3d3cueW91dHViZS5jb21cIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJ5b3V0dWJlXCJcbiAgICAgIHJldHVybiBuZXcgWW91VHViZVxuICAgIH1cbiAgICBlbHNlIGlmICh0aXRsZUNvbnRlbnQuaW5jbHVkZXMoXCJOZXRmbGl4XCIpIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09IFwid3d3Lm5ldGZsaXguY29tXCIpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwibmV0ZmxpeFwiXG4gICAgICByZXR1cm4gbmV3IE5ldGZsaXhcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGVDb250ZW50LmluY2x1ZGVzKFwiT252aXhcIikgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtjb250ZW50PVwiT05WSVhcIl0nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJvbnZpeFwiXG4gICAgICByZXR1cm4gbmV3IE9udml4XG4gICAgfVxuICAgIGVsc2UgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcItCa0LjQvdC+0L/QsNCxXCIpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbY29udGVudD1cItCa0LjQvdC+0L/QsNCxXCJdJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwia2lub3B1YlwiXG4gICAgICByZXR1cm4gbmV3IEtpbm9QdWJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVBbGxFbGVtZW50cyhlbG1zOiBOb2RlTGlzdE9mPEVsZW1lbnQ+KSB7XG4gICAgZWxtcy5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1xuIiwiaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiO1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgbW92ZVN1YkdhcCA9IDUwIC8vIERlbGF5IHRvIGRpc3BsYXkgc3VidGl0bGVzIGFmdGVyIHJld2luZGluZ1xuXG5jbGFzcyBWaWRlbyB7XG4gIHN0YXRpYyBnZXRDdXJyZW50VGltZSh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZpZGVvLmN1cnJlbnRUaW1lICogMTAwMClcbiAgfVxuXG4gIHN0YXRpYyBtb3ZlVG9QcmV2U3ViKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgc3Vic1Byb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSB0aGlzLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBsZXQgcHJldlN1Yjogc3ViVGl0bGVUeXBlID0gU3Vicy5nZXRQcmV2U3ViKHN1YnMsIGN1cnJlbnRUaW1lKTtcbiAgICBpZiAocHJldlN1Yikge1xuICAgICAgdGhpcy5tb3ZlVG9UaW1lKHZpZGVvLCBVdGlscy5jYXN0U3ViVGltZShwcmV2U3ViLnN0YXJ0KSAtIG1vdmVTdWJHYXApXG4gICAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0JhcihzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LCB2aWRlbywgc3VicywgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1vdmVUb05leHRTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBjdXJyZW50VGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBuZXh0U3ViOiBzdWJUaXRsZVR5cGUgPSBTdWJzLmdldE5leHRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChuZXh0U3ViKSB7XG4gICAgICB0aGlzLm1vdmVUb1RpbWUodmlkZW8sIFV0aWxzLmNhc3RTdWJUaW1lKG5leHRTdWIuc3RhcnQpIC0gbW92ZVN1YkdhcClcbiAgICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHZpZGVvLCBzdWJzLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbW92ZVRvVGltZSh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgdGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBVdGlscy5jYXN0U3ViVGltZSh0aW1lKSAvIDEwMDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iXSwic291cmNlUm9vdCI6IiJ9