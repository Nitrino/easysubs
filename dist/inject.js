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

/***/ "./node_modules/global/window.js":
/*!***************************************!*\
  !*** ./node_modules/global/window.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/m3u8-parser/dist/m3u8-parser.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/m3u8-parser/dist/m3u8-parser.es.js ***!
  \*********************************************************/
/*! exports provided: LineStream, ParseStream, Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineStream", function() { return LineStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParseStream", function() { return ParseStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! global/window */ "./node_modules/global/window.js");
/* harmony import */ var global_window__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(global_window__WEBPACK_IMPORTED_MODULE_0__);
/*! @name m3u8-parser @version 4.4.0 @license Apache-2.0 */


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * @file stream.js
 */

/**
 * A lightweight readable stream implementation that handles event dispatching.
 *
 * @class Stream
 */
var Stream =
/*#__PURE__*/
function () {
  function Stream() {
    this.listeners = {};
  }
  /**
   * Add a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener the callback to be invoked when an event of
   * the specified type occurs
   */


  var _proto = Stream.prototype;

  _proto.on = function on(type, listener) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(listener);
  }
  /**
   * Remove a listener for a specified event type.
   *
   * @param {string} type the event name
   * @param {Function} listener  a function previously registered for this
   * type of event through `on`
   * @return {boolean} if we could turn it off or not
   */
  ;

  _proto.off = function off(type, listener) {
    if (!this.listeners[type]) {
      return false;
    }

    var index = this.listeners[type].indexOf(listener);
    this.listeners[type].splice(index, 1);
    return index > -1;
  }
  /**
   * Trigger an event of the specified type on this stream. Any additional
   * arguments to this function are passed as parameters to event listeners.
   *
   * @param {string} type the event name
   */
  ;

  _proto.trigger = function trigger(type) {
    var callbacks = this.listeners[type];
    var i;
    var length;
    var args;

    if (!callbacks) {
      return;
    } // Slicing the arguments on every invocation of this method
    // can add a significant amount of overhead. Avoid the
    // intermediate object creation for the common case of a
    // single callback argument


    if (arguments.length === 2) {
      length = callbacks.length;

      for (i = 0; i < length; ++i) {
        callbacks[i].call(this, arguments[1]);
      }
    } else {
      args = Array.prototype.slice.call(arguments, 1);
      length = callbacks.length;

      for (i = 0; i < length; ++i) {
        callbacks[i].apply(this, args);
      }
    }
  }
  /**
   * Destroys the stream and cleans up.
   */
  ;

  _proto.dispose = function dispose() {
    this.listeners = {};
  }
  /**
   * Forwards all `data` events on this stream to the destination stream. The
   * destination stream should provide a method `push` to receive the data
   * events as they arrive.
   *
   * @param {Stream} destination the stream that will receive all `data` events
   * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
   */
  ;

  _proto.pipe = function pipe(destination) {
    this.on('data', function (data) {
      destination.push(data);
    });
  };

  return Stream;
}();

/**
 * A stream that buffers string input and generates a `data` event for each
 * line.
 *
 * @class LineStream
 * @extends Stream
 */

var LineStream =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(LineStream, _Stream);

  function LineStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.buffer = '';
    return _this;
  }
  /**
   * Add new data to be parsed.
   *
   * @param {string} data the text to process
   */


  var _proto = LineStream.prototype;

  _proto.push = function push(data) {
    var nextNewline;
    this.buffer += data;
    nextNewline = this.buffer.indexOf('\n');

    for (; nextNewline > -1; nextNewline = this.buffer.indexOf('\n')) {
      this.trigger('data', this.buffer.substring(0, nextNewline));
      this.buffer = this.buffer.substring(nextNewline + 1);
    }
  };

  return LineStream;
}(Stream);

/**
 * "forgiving" attribute list psuedo-grammar:
 * attributes -> keyvalue (',' keyvalue)*
 * keyvalue   -> key '=' value
 * key        -> [^=]*
 * value      -> '"' [^"]* '"' | [^,]*
 */

var attributeSeparator = function attributeSeparator() {
  var key = '[^=]*';
  var value = '"[^"]*"|[^,]*';
  var keyvalue = '(?:' + key + ')=(?:' + value + ')';
  return new RegExp('(?:^|,)(' + keyvalue + ')');
};
/**
 * Parse attributes from a line given the separator
 *
 * @param {string} attributes the attribute line to parse
 */


var parseAttributes = function parseAttributes(attributes) {
  // split the string using attributes as the separator
  var attrs = attributes.split(attributeSeparator());
  var result = {};
  var i = attrs.length;
  var attr;

  while (i--) {
    // filter out unmatched portions of the string
    if (attrs[i] === '') {
      continue;
    } // split the key and value


    attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1); // trim whitespace and remove optional quotes around the value

    attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
    attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
    result[attr[0]] = attr[1];
  }

  return result;
};
/**
 * A line-level M3U8 parser event stream. It expects to receive input one
 * line at a time and performs a context-free parse of its contents. A stream
 * interpretation of a manifest can be useful if the manifest is expected to
 * be too large to fit comfortably into memory or the entirety of the input
 * is not immediately available. Otherwise, it's probably much easier to work
 * with a regular `Parser` object.
 *
 * Produces `data` events with an object that captures the parser's
 * interpretation of the input. That object has a property `tag` that is one
 * of `uri`, `comment`, or `tag`. URIs only have a single additional
 * property, `line`, which captures the entirety of the input without
 * interpretation. Comments similarly have a single additional property
 * `text` which is the input without the leading `#`.
 *
 * Tags always have a property `tagType` which is the lower-cased version of
 * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
 * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
 * tags are given the tag type `unknown` and a single additional property
 * `data` with the remainder of the input.
 *
 * @class ParseStream
 * @extends Stream
 */


var ParseStream =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(ParseStream, _Stream);

  function ParseStream() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.customParsers = [];
    _this.tagMappers = [];
    return _this;
  }
  /**
   * Parses an additional line of input.
   *
   * @param {string} line a single line of an M3U8 file to parse
   */


  var _proto = ParseStream.prototype;

  _proto.push = function push(line) {
    var _this2 = this;

    var match;
    var event; // strip whitespace

    line = line.trim();

    if (line.length === 0) {
      // ignore empty lines
      return;
    } // URIs


    if (line[0] !== '#') {
      this.trigger('data', {
        type: 'uri',
        uri: line
      });
      return;
    } // map tags


    var newLines = this.tagMappers.reduce(function (acc, mapper) {
      var mappedLine = mapper(line); // skip if unchanged

      if (mappedLine === line) {
        return acc;
      }

      return acc.concat([mappedLine]);
    }, [line]);
    newLines.forEach(function (newLine) {
      for (var i = 0; i < _this2.customParsers.length; i++) {
        if (_this2.customParsers[i].call(_this2, newLine)) {
          return;
        }
      } // Comments


      if (newLine.indexOf('#EXT') !== 0) {
        _this2.trigger('data', {
          type: 'comment',
          text: newLine.slice(1)
        });

        return;
      } // strip off any carriage returns here so the regex matching
      // doesn't have to account for them.


      newLine = newLine.replace('\r', ''); // Tags

      match = /^#EXTM3U/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'm3u'
        });

        return;
      }

      match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'inf'
        };

        if (match[1]) {
          event.duration = parseFloat(match[1]);
        }

        if (match[2]) {
          event.title = match[2];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'targetduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'totalduration'
        };

        if (match[1]) {
          event.duration = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'version'
        };

        if (match[1]) {
          event.version = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'discontinuity-sequence'
        };

        if (match[1]) {
          event.number = parseInt(match[1], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'playlist-type'
        };

        if (match[1]) {
          event.playlistType = match[1];
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'byterange'
        };

        if (match[1]) {
          event.length = parseInt(match[1], 10);
        }

        if (match[2]) {
          event.offset = parseInt(match[2], 10);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'allow-cache'
        };

        if (match[1]) {
          event.allowed = !/NO/.test(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'map'
        };

        if (match[1]) {
          var attributes = parseAttributes(match[1]);

          if (attributes.URI) {
            event.uri = attributes.URI;
          }

          if (attributes.BYTERANGE) {
            var _attributes$BYTERANGE = attributes.BYTERANGE.split('@'),
                length = _attributes$BYTERANGE[0],
                offset = _attributes$BYTERANGE[1];

            event.byterange = {};

            if (length) {
              event.byterange.length = parseInt(length, 10);
            }

            if (offset) {
              event.byterange.offset = parseInt(offset, 10);
            }
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'stream-inf'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);

          if (event.attributes.RESOLUTION) {
            var split = event.attributes.RESOLUTION.split('x');
            var resolution = {};

            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }

            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }

            event.attributes.RESOLUTION = resolution;
          }

          if (event.attributes.BANDWIDTH) {
            event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
          }

          if (event.attributes['PROGRAM-ID']) {
            event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'media'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-ENDLIST/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'endlist'
        });

        return;
      }

      match = /^#EXT-X-DISCONTINUITY/.exec(newLine);

      if (match) {
        _this2.trigger('data', {
          type: 'tag',
          tagType: 'discontinuity'
        });

        return;
      }

      match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'program-date-time'
        };

        if (match[1]) {
          event.dateTimeString = match[1];
          event.dateTimeObject = new Date(match[1]);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'key'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]); // parse the IV string into a Uint32Array

          if (event.attributes.IV) {
            if (event.attributes.IV.substring(0, 2).toLowerCase() === '0x') {
              event.attributes.IV = event.attributes.IV.substring(2);
            }

            event.attributes.IV = event.attributes.IV.match(/.{8}/g);
            event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
            event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
            event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
            event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
            event.attributes.IV = new Uint32Array(event.attributes.IV);
          }
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-START:?(.*)$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'start'
        };

        if (match[1]) {
          event.attributes = parseAttributes(match[1]);
          event.attributes['TIME-OFFSET'] = parseFloat(event.attributes['TIME-OFFSET']);
          event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out-cont'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-out'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      }

      match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);

      if (match) {
        event = {
          type: 'tag',
          tagType: 'cue-in'
        };

        if (match[1]) {
          event.data = match[1];
        } else {
          event.data = '';
        }

        _this2.trigger('data', event);

        return;
      } // unknown tag type


      _this2.trigger('data', {
        type: 'tag',
        data: newLine.slice(4)
      });
    });
  }
  /**
   * Add a parser for custom headers
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.customType   the custom type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(_ref) {
    var _this3 = this;

    var expression = _ref.expression,
        customType = _ref.customType,
        dataParser = _ref.dataParser,
        segment = _ref.segment;

    if (typeof dataParser !== 'function') {
      dataParser = function dataParser(line) {
        return line;
      };
    }

    this.customParsers.push(function (line) {
      var match = expression.exec(line);

      if (match) {
        _this3.trigger('data', {
          type: 'custom',
          data: dataParser(line),
          customType: customType,
          segment: segment
        });

        return true;
      }
    });
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(_ref2) {
    var expression = _ref2.expression,
        map = _ref2.map;

    var mapFn = function mapFn(line) {
      if (expression.test(line)) {
        return map(line);
      }

      return line;
    };

    this.tagMappers.push(mapFn);
  };

  return ParseStream;
}(Stream);

function decodeB64ToUint8Array(b64Text) {
  var decodedString = global_window__WEBPACK_IMPORTED_MODULE_0___default.a.atob(b64Text || '');
  var array = new Uint8Array(decodedString.length);

  for (var i = 0; i < decodedString.length; i++) {
    array[i] = decodedString.charCodeAt(i);
  }

  return array;
}

/**
 * A parser for M3U8 files. The current interpretation of the input is
 * exposed as a property `manifest` on parser objects. It's just two lines to
 * create and parse a manifest once you have the contents available as a string:
 *
 * ```js
 * var parser = new m3u8.Parser();
 * parser.push(xhr.responseText);
 * ```
 *
 * New input can later be applied to update the manifest object by calling
 * `push` again.
 *
 * The parser attempts to create a usable manifest object even if the
 * underlying input is somewhat nonsensical. It emits `info` and `warning`
 * events during the parse if it encounters input that seems invalid or
 * requires some property of the manifest object to be defaulted.
 *
 * @class Parser
 * @extends Stream
 */

var Parser =
/*#__PURE__*/
function (_Stream) {
  _inheritsLoose(Parser, _Stream);

  function Parser() {
    var _this;

    _this = _Stream.call(this) || this;
    _this.lineStream = new LineStream();
    _this.parseStream = new ParseStream();

    _this.lineStream.pipe(_this.parseStream);
    /* eslint-disable consistent-this */


    var self = _assertThisInitialized(_this);
    /* eslint-enable consistent-this */


    var uris = [];
    var currentUri = {}; // if specified, the active EXT-X-MAP definition

    var currentMap; // if specified, the active decryption key

    var _key;

    var noop = function noop() {};

    var defaultMediaGroups = {
      'AUDIO': {},
      'VIDEO': {},
      'CLOSED-CAPTIONS': {},
      'SUBTITLES': {}
    }; // This is the Widevine UUID from DASH IF IOP. The same exact string is
    // used in MPDs with Widevine encrypted streams.

    var widevineUuid = 'urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed'; // group segments into numbered timelines delineated by discontinuities

    var currentTimeline = 0; // the manifest is empty until the parse stream begins delivering data

    _this.manifest = {
      allowCache: true,
      discontinuityStarts: [],
      segments: []
    }; // update the manifest with the m3u8 entry from the parse stream

    _this.parseStream.on('data', function (entry) {
      var mediaGroup;
      var rendition;
      ({
        tag: function tag() {
          // switch based on the tag type
          (({
            'allow-cache': function allowCache() {
              this.manifest.allowCache = entry.allowed;

              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            byterange: function byterange() {
              var byterange = {};

              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  this.trigger('info', {
                    message: 'defaulting offset to zero'
                  });
                  entry.offset = 0;
                }
              }

              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }
            },
            endlist: function endlist() {
              this.manifest.endList = true;
            },
            inf: function inf() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }

              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }

              if (entry.duration > 0) {
                currentUri.duration = entry.duration;
              }

              if (entry.duration === 0) {
                currentUri.duration = 0.01;
                this.trigger('info', {
                  message: 'updating zero segment duration to a small value'
                });
              }

              this.manifest.segments = uris;
            },
            key: function key() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              } // clear the active encryption key


              if (entry.attributes.METHOD === 'NONE') {
                _key = null;
                return;
              }

              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              } // check if the content is encrypted for Widevine
              // Widevine/HLS spec: https://storage.googleapis.com/wvdocs/Widevine_DRM_HLS.pdf


              if (entry.attributes.KEYFORMAT === widevineUuid) {
                var VALID_METHODS = ['SAMPLE-AES', 'SAMPLE-AES-CTR', 'SAMPLE-AES-CENC'];

                if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                  this.trigger('warn', {
                    message: 'invalid key method provided for Widevine'
                  });
                  return;
                }

                if (entry.attributes.METHOD === 'SAMPLE-AES-CENC') {
                  this.trigger('warn', {
                    message: 'SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead'
                  });
                }

                if (entry.attributes.URI.substring(0, 23) !== 'data:text/plain;base64,') {
                  this.trigger('warn', {
                    message: 'invalid key URI provided for Widevine'
                  });
                  return;
                }

                if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === '0x')) {
                  this.trigger('warn', {
                    message: 'invalid key ID provided for Widevine'
                  });
                  return;
                } // if Widevine key attributes are valid, store them as `contentProtection`
                // on the manifest to emulate Widevine tag structure in a DASH mpd


                this.manifest.contentProtection = {
                  'com.widevine.alpha': {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: decodeB64ToUint8Array(entry.attributes.URI.split(',')[1])
                  }
                };
                return;
              }

              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              } // setup an encryption key for upcoming segments


              _key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (typeof entry.attributes.IV !== 'undefined') {
                _key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function mediaSequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }

              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function discontinuitySequence() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }

              this.manifest.discontinuitySequence = entry.number;
              currentTimeline = entry.number;
            },
            'playlist-type': function playlistType() {
              if (!/VOD|EVENT/.test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }

              this.manifest.playlistType = entry.playlistType;
            },
            map: function map() {
              currentMap = {};

              if (entry.uri) {
                currentMap.uri = entry.uri;
              }

              if (entry.byterange) {
                currentMap.byterange = entry.byterange;
              }
            },
            'stream-inf': function streamInf() {
              this.manifest.playlists = uris;
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }

              _extends(currentUri.attributes, entry.attributes);
            },
            media: function media() {
              this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;

              if (!(entry.attributes && entry.attributes.TYPE && entry.attributes['GROUP-ID'] && entry.attributes.NAME)) {
                this.trigger('warn', {
                  message: 'ignoring incomplete or missing media group'
                });
                return;
              } // find the media group, creating defaults as necessary


              var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
              mediaGroupType[entry.attributes['GROUP-ID']] = mediaGroupType[entry.attributes['GROUP-ID']] || {};
              mediaGroup = mediaGroupType[entry.attributes['GROUP-ID']]; // collect the rendition metadata

              rendition = {
                default: /yes/i.test(entry.attributes.DEFAULT)
              };

              if (rendition.default) {
                rendition.autoselect = true;
              } else {
                rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
              }

              if (entry.attributes.LANGUAGE) {
                rendition.language = entry.attributes.LANGUAGE;
              }

              if (entry.attributes.URI) {
                rendition.uri = entry.attributes.URI;
              }

              if (entry.attributes['INSTREAM-ID']) {
                rendition.instreamId = entry.attributes['INSTREAM-ID'];
              }

              if (entry.attributes.CHARACTERISTICS) {
                rendition.characteristics = entry.attributes.CHARACTERISTICS;
              }

              if (entry.attributes.FORCED) {
                rendition.forced = /yes/i.test(entry.attributes.FORCED);
              } // insert the new rendition


              mediaGroup[entry.attributes.NAME] = rendition;
            },
            discontinuity: function discontinuity() {
              currentTimeline += 1;
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'program-date-time': function programDateTime() {
              if (typeof this.manifest.dateTimeString === 'undefined') {
                // PROGRAM-DATE-TIME is a media-segment tag, but for backwards
                // compatibility, we add the first occurence of the PROGRAM-DATE-TIME tag
                // to the manifest object
                // TODO: Consider removing this in future major version
                this.manifest.dateTimeString = entry.dateTimeString;
                this.manifest.dateTimeObject = entry.dateTimeObject;
              }

              currentUri.dateTimeString = entry.dateTimeString;
              currentUri.dateTimeObject = entry.dateTimeObject;
            },
            targetduration: function targetduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }

              this.manifest.targetDuration = entry.duration;
            },
            totalduration: function totalduration() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }

              this.manifest.totalDuration = entry.duration;
            },
            start: function start() {
              if (!entry.attributes || isNaN(entry.attributes['TIME-OFFSET'])) {
                this.trigger('warn', {
                  message: 'ignoring start declaration without appropriate attribute list'
                });
                return;
              }

              this.manifest.start = {
                timeOffset: entry.attributes['TIME-OFFSET'],
                precise: entry.attributes.PRECISE
              };
            },
            'cue-out': function cueOut() {
              currentUri.cueOut = entry.data;
            },
            'cue-out-cont': function cueOutCont() {
              currentUri.cueOutCont = entry.data;
            },
            'cue-in': function cueIn() {
              currentUri.cueIn = entry.data;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function uri() {
          currentUri.uri = entry.uri;
          uris.push(currentUri); // if no explicit duration was declared, use the target duration

          if (this.manifest.targetDuration && !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          } // annotate with encryption information, if necessary


          if (_key) {
            currentUri.key = _key;
          }

          currentUri.timeline = currentTimeline; // annotate with initialization segment information, if necessary

          if (currentMap) {
            currentUri.map = currentMap;
          } // prepare for the next URI


          currentUri = {};
        },
        comment: function comment() {// comments are not important for playback
        },
        custom: function custom() {
          // if this is segment-level data attach the output to the segment
          if (entry.segment) {
            currentUri.custom = currentUri.custom || {};
            currentUri.custom[entry.customType] = entry.data; // if this is manifest-level data attach to the top level manifest object
          } else {
            this.manifest.custom = this.manifest.custom || {};
            this.manifest.custom[entry.customType] = entry.data;
          }
        }
      })[entry.type].call(self);
    });

    return _this;
  }
  /**
   * Parse the input string and update the manifest object.
   *
   * @param {string} chunk a potentially incomplete portion of the manifest
   */


  var _proto = Parser.prototype;

  _proto.push = function push(chunk) {
    this.lineStream.push(chunk);
  }
  /**
   * Flush any remaining input. This can be handy if the last line of an M3U8
   * manifest did not contain a trailing newline but the file has been
   * completely received.
   */
  ;

  _proto.end = function end() {
    // flush any buffered input
    this.lineStream.push('\n');
  }
  /**
   * Add an additional parser for non-standard tags
   *
   * @param {Object}   options              a map of options for the added parser
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {string}   options.type         the type to register to the output
   * @param {Function} [options.dataParser] function to parse the line into an object
   * @param {boolean}  [options.segment]    should tag data be attached to the segment object
   */
  ;

  _proto.addParser = function addParser(options) {
    this.parseStream.addParser(options);
  }
  /**
   * Add a custom header mapper
   *
   * @param {Object}   options
   * @param {RegExp}   options.expression   a regular expression to match the custom header
   * @param {Function} options.map          function to translate tag into a different tag
   */
  ;

  _proto.addTagMapper = function addTagMapper(options) {
    this.parseStream.addTagMapper(options);
  };

  return Parser;
}(Stream);




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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


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
        this.translateAlternativeElement = document.querySelector(".easysubs-translate-alternative");
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
        // TODO: Refactor to service method
        if (_utils__WEBPACK_IMPORTED_MODULE_1__["default"].detectService().constructor.name == "Netflix") {
            return;
        }
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
            const words = element.textContent.match(/[^\W\d](\w|[-']{1,2}(?=\w))*/);
            if (words == null) {
                return;
            }
            window.showTranslation = true;
            chrome.runtime.sendMessage({ contentScriptQuery: 'getSingleTranslation', text: words[0], lang: "ru" }, (response) => {
                const mainTranslation = response[0][0][0];
                const alternativeTranslations = response[1] || [];
                _ui__WEBPACK_IMPORTED_MODULE_2__["default"].setTranslation(this.translateContainerElement, this.translateOriginalElement, this.translateResultElement, words[0], mainTranslation, this.translateAlternativeElement, alternativeTranslations);
            });
        }
    }
    subsWordMouseOut(event) {
        let element = event.target;
        if (element.className === "easysubs-word" || element.id === "easysubs") {
            window.showTranslation = false;
            this.translateContainerElement.style.display = "none";
        }
    }
    videoOnTimeUpdate(event) {
        const currentSub = _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubs(this.videoElement, this.subs, this.subsElement);
        _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs, this.videoElement.paused);
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
            _ui__WEBPACK_IMPORTED_MODULE_2__["default"].setTranslation(this.translateContainerElement, this.translateOriginalElement, this.translateResultElement, text, response.data[0], this.translateAlternativeElement, []);
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
    window.initializeInProgress = false;
    Object(_ready__WEBPACK_IMPORTED_MODULE_0__["ready"])('video', function (videoElement) {
        initialize(service, videoElement);
        let eventsHandler = null;
        let oldHref = document.location.href;
        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (oldHref != document.location.href) {
                    if (eventsHandler) {
                        eventsHandler.removeEvents();
                    }
                    initialize(service, videoElement);
                    oldHref = document.location.href;
                }
            });
        });
        var config = { childList: true, subtree: true };
        observer.observe(document.querySelector("body"), config);
        function initialize(service, videoElement) {
            if (window.initializeInProgress) {
                return;
            }
            window.initializeInProgress = true;
            window.showTranslation = true;
            const playerContainerElement = service.playerContainerElement();
            let subsElement = _ui__WEBPACK_IMPORTED_MODULE_2__["default"].createSubsElement(playerContainerElement);
            let subsProgressBarElement = _ui__WEBPACK_IMPORTED_MODULE_2__["default"].createSubsProgressBarElement(playerContainerElement);
            service.getSubs("eng")
                .then(subs => {
                console.log("Subtitles loaded. subs count: " + subs.length);
                subsElement.textContent = ""; // Clear subs loading text
                eventsHandler = new _events_handlers__WEBPACK_IMPORTED_MODULE_3__["default"](videoElement, subs, subsElement, subsProgressBarElement);
                eventsHandler.addEvents();
                window.initializeInProgress = false;
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
/* harmony import */ var m3u8_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! m3u8-parser */ "./node_modules/m3u8-parser/dist/m3u8-parser.es.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class KinoPub {
    getSubs(language) {
        return __awaiter(this, void 0, void 0, function* () {
            const seasonAndEpisode = document.location.pathname
                .match(new RegExp("/item/view/.*/" + "(.*)"))[1]
                .match(new RegExp("s([0-9]+)e([0-9]+)"));
            // Prevent exceptions on loader video page
            if (seasonAndEpisode == null) {
                return Promise.resolve(Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(""));
            }
            const season = seasonAndEpisode[1];
            const episode = seasonAndEpisode[2];
            const script = document.querySelector("#content").querySelector("script");
            const playlist = eval(script.innerHTML.split("var playlist = ")[1]);
            const currentEpisode = playlist.find((ep) => {
                return ep.snumber.toString() == season && ep.vnumber.toString() == episode;
            });
            const resp = yield fetch(currentEpisode.file);
            const data = yield resp.text();
            var parser = new m3u8_parser__WEBPACK_IMPORTED_MODULE_1__["Parser"]();
            parser.push(data);
            parser.end;
            const subsSegments = parser.manifest.mediaGroups.SUBTITLES.sub;
            const key = Object.keys(subsSegments).find(key_1 => key_1.toLowerCase().includes(language));
            const uri = "https://cdn.streambox.in" + subsSegments[key].uri;
            const subsSegmentsResp = yield fetch(uri);
            const subsSegmentsData = yield subsSegmentsResp.text();
            var subsSegmentsParser = new m3u8_parser__WEBPACK_IMPORTED_MODULE_1__["Parser"]();
            subsSegmentsParser.push(subsSegmentsData);
            subsSegmentsParser.end;
            const subPath = subsSegmentsParser.manifest.segments[0].uri.match(/.*\/hls\/(.*)\/seg.*/)[1];
            const subUri = "https://cdn.streambox.in/pd/" + subPath;
            const subsResp = yield fetch(subUri);
            const subsData = yield subsResp.text();
            return Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(subsData);
        });
    }
    playerContainerElement() {
        return document.querySelector("#player");
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
/* harmony import */ var _cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cospired/i18n-iso-languages */ "./node_modules/@cospired/i18n-iso-languages/index.js");
/* harmony import */ var _cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__);


const WEBVTT = 'webvtt-lssdh-ios8';
const MAIN_TITLE = '.player-status-main-title, .ellipsize-text>h4, .video-title>h4';
const SUB_TYPES = {
    'subtitles': '',
    'closedcaptions': '[cc]'
};
class Netflix {
    constructor() {
        this.injection = () => {
            const WEBVTT = "webvtt-lssdh-ios8";
            // hijack JSON.parse and JSON.stringify functions
            ((parse, stringify) => {
                JSON.parse = function (text) {
                    const data = parse(text);
                    if (data && data.result && data.result.timedtexttracks && data.result.movieId) {
                        window.dispatchEvent(new CustomEvent('easysubs_data', { detail: data.result }));
                    }
                    return data;
                };
                JSON.stringify = function (data) {
                    if (data && data.params && data.params.profiles) {
                        data.params.profiles.unshift(WEBVTT);
                    }
                    return stringify(data);
                };
            })(JSON.parse, JSON.stringify);
        };
        this.randomProperty = (obj) => {
            const keys = Object.keys(obj);
            return obj[keys[keys.length * Math.random() << 0]];
        };
        this.subCache = {};
        this.processSubData = this.processSubData.bind(this);
        this.injectScript();
        window.addEventListener('easysubs_data', this.processSubData);
    }
    getSubs(language) {
        const languageAlpha2 = Object(_cospired_i18n_iso_languages__WEBPACK_IMPORTED_MODULE_1__["alpha3TToAlpha2"])(language);
        const langKey = Object.keys(this.subCache).find(key => key.includes(languageAlpha2));
        const subUri = this.subCache[langKey];
        return fetch(subUri)
            .then(resp => resp.text())
            .then(data => Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(data));
    }
    playerContainerElement() {
        return document.querySelector(".VideoContainer");
    }
    processSubData(event) {
        console.log("++++++++++++");
        if (event.detail.viewableType != "EPISODE") {
            return;
        }
        const tracks = event.detail.timedtexttracks;
        for (const track of tracks) {
            if (track.isNoneTrack) {
                continue;
            }
            let type = SUB_TYPES[track.rawTrackType];
            if (typeof type === 'undefined')
                type = `[${track.rawTrackType}]`;
            const lang = track.language + type + (track.isForcedNarrative ? '-forced' : '');
            this.subCache[lang] = this.randomProperty(track.ttDownloadables[WEBVTT].downloadUrls);
        }
    }
    injectScript() {
        const sc = document.createElement('script');
        sc.innerHTML = '(' + this.injection.toString() + ')()';
        document.head.appendChild(sc);
        document.head.removeChild(sc);
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
        subsInnerElement.className = "easysubs-subtitles";
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
        translateTag.innerHTML = `
      <div class='easysubs-translate-result'>
        test translate
      </div>
      <hr>
      <div class='easysubs-translate-original'>
        test
      </div>
      <div class='easysubs-translate-alternative'>
        alternative translations
      </div>
    `;
        subsElement.appendChild(translateTag);
    }
    static setTranslation(translateContainerElement, originalElement, resultElement, originalText, resultText, translateAlternativeElement, alternativeTranslations) {
        if (window.showTranslation) {
            translateContainerElement.style.display = "block";
        }
        originalElement.innerHTML = originalText;
        resultElement.innerHTML = resultText;
        let alternativeTranslationsHtml = "";
        if (alternativeTranslations.length != 0) {
            alternativeTranslations.forEach(elem => {
                alternativeTranslationsHtml += `
          <p class='easysubs-translate-alternative-part-speech'>
            ${elem[0]}
          </p>
        `;
                elem[2].slice(0, 5).forEach((alternative) => {
                    alternativeTranslationsHtml += `
            <div class="easysubs-translate-alternative-item">
              <div class="easysubs-translate-alternative-item-translate">
                ${alternative[0]}
              </div>
              <div class="easysubs-translate-alternative-item-original">
                ${alternative[1].slice(0, 3).join(', ')}
              </div>
              <div class="easysubs-translate-alternative-item-frequency">
                ${this.frequencyToDots(alternative[3])}
              </div>
            </div>
          `;
                });
            });
        }
        translateAlternativeElement.innerHTML = alternativeTranslationsHtml;
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
    static frequencyToDots(frequency) {
        const rate = frequency * 10000;
        if (rate >= 500) {
            return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
      `;
        }
        else if (rate < 500 && rate >= 30) {
            return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
      `;
        }
        else {
            return `
        <div class="easysubs-translate-alternative-item-frequency-dot -fill"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
        <div class="easysubs-translate-alternative-item-frequency-dot -empty"></div>
      `;
        }
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


const rewindTime = 5000;
class Video {
    static getCurrentTime(video) {
        return Math.round(video.currentTime * 1000);
    }
    static moveToPrevSub(video, subs, subsProgressBarElement) {
        let currentTime = this.getCurrentTime(video);
        let prevSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getPrevSub(subs, currentTime);
        if (prevSub && currentTime - _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(prevSub.end) < 5000) {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(prevSub.start));
        }
        else {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(currentTime - rewindTime));
        }
        _subs__WEBPACK_IMPORTED_MODULE_0__["default"].updateSubsProgressBar(subsProgressBarElement, video, subs, true);
    }
    static moveToNextSub(video, subs, subsProgressBarElement) {
        let currentTime = this.getCurrentTime(video);
        let nextSub = _subs__WEBPACK_IMPORTED_MODULE_0__["default"].getNextSub(subs, currentTime);
        if (nextSub && _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(nextSub.start) - currentTime < 5000) {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(nextSub.start));
        }
        else {
            this.moveToTime(video, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(currentTime + rewindTime));
        }
        _subs__WEBPACK_IMPORTED_MODULE_0__["default"].updateSubsProgressBar(subsProgressBarElement, video, subs, true);
    }
    static moveToTime(video, time) {
        video.currentTime = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].castSubTime(time) / 1000;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Video);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuaW1lanMvbGliL2FuaW1lLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tM3U4LXBhcnNlci9kaXN0L20zdTgtcGFyc2VyLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlVGltZXN0YW1wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3Jlc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeVZ0dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvTVMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1NydFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1Z0dFRpbWUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVyby1maWxsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHNfaGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2tpbm9wdWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL25ldGZsaXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL29udml4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy95b3V0dWJlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdWJzLnRzIiwid2VicGFjazovLy8uL3NyYy91aS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsNEVBQWM7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGNBQWM7QUFDZCxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0wsa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLOzs7QUFHTDtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxPQUFPOzs7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxPQUFPO0FBQ1A7OztBQUdBLDBDQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNB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QixDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBdUIsRUFBRSxJQUFvQixFQUFFLHNCQUFtQztRQUNyRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFpQiw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFL0QsSUFBSSxPQUFPLElBQUksOENBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsR0FBRyxJQUFJLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsOENBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSw4Q0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLENBQUM7U0FDcEU7UUFDRCw2Q0FBSSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBdUIsRUFBRSxJQUFxQjtRQUU5RCxLQUFLLENBQUMsV0FBVyxHQUFHLDhDQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7SUFDcEQsQ0FBQztDQUNGO0FBQ2Msb0VBQUssRUFBQyIsImZpbGUiOiJpbmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmplY3QudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGNvZGVzID0gcmVxdWlyZShcIi4vY29kZXMuanNvblwiKTtcbnZhciByZWdpc3RlcmVkTG9jYWxlcyA9IHt9O1xuXG4vKlxuICogQWxsIGNvZGVzIG1hcCB0byBJU08gMzE2Ni0xIGFscGhhLTJcbiAqL1xudmFyIGFscGhhMiA9IHt9LFxuICBhbHBoYTNUID0ge30sXG4gIGFscGhhM0IgPSB7fSxcbiAgaW52ZXJ0ZWRBbHBoYTNCID0ge307XG5cbmNvZGVzLmZvckVhY2goZnVuY3Rpb24oY29kZUluZm9ybWF0aW9uKSB7XG4gIHZhciBzID0gY29kZUluZm9ybWF0aW9uO1xuICBhbHBoYTJbc1swXV0gPSBzWzFdO1xuICBhbHBoYTNUW3NbMV1dID0gc1swXTtcbiAgYWxwaGEzQltzWzJdXSA9IHNbMF07XG4gIGludmVydGVkQWxwaGEzQltzWzBdXSA9IHNbMl07XG59KTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGUobG9jYWxlRGF0YSkge1xuICBpZiAoIWxvY2FsZURhdGEubG9jYWxlKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTWlzc2luZyBsb2NhbGVEYXRhLmxvY2FsZScpO1xuICB9XG5cbiAgaWYgKCFsb2NhbGVEYXRhLmxhbmd1YWdlcykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NpbmcgbG9jYWxlRGF0YS5sYW5ndWFnZXMnKTtcbiAgfVxuXG4gIHJlZ2lzdGVyZWRMb2NhbGVzW2xvY2FsZURhdGEubG9jYWxlXSA9IGxvY2FsZURhdGEubGFuZ3VhZ2VzO1xufVxuXG5leHBvcnRzLnJlZ2lzdGVyTG9jYWxlID0gcmVnaXN0ZXJMb2NhbGU7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0zVCBjb2RlXG4gKiBAcmV0dXJuIEFscGhhLTIgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEzVFRvQWxwaGEyKGNvZGUpIHtcblxuICByZXR1cm4gYWxwaGEzVFtjb2RlXTtcbn1cbmV4cG9ydHMuYWxwaGEzVFRvQWxwaGEyID0gYWxwaGEzVFRvQWxwaGEyO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgQWxwaGEtM0IgY29kZVxuICogQHJldHVybiBBbHBoYS0yIGNvZGUgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGFscGhhM0JUb0FscGhhMihjb2RlKSB7XG5cbiAgcmV0dXJuIGFscGhhM0JbY29kZV07XG59XG5leHBvcnRzLmFscGhhM0JUb0FscGhhMiA9IGFscGhhM0JUb0FscGhhMjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTIgY29kZVxuICogQHJldHVybiBBbHBoYS0zVCBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTJUb0FscGhhM1QoY29kZSkge1xuXG4gIHJldHVybiBhbHBoYTJbY29kZV07XG59XG5leHBvcnRzLmFscGhhMlRvQWxwaGEzVCA9IGFscGhhMlRvQWxwaGEzVDtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTIgY29kZVxuICogQHJldHVybiBBbHBoYS0zQiBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTJUb0FscGhhM0IoY29kZSkge1xuXG4gIHJldHVybiBpbnZlcnRlZEFscGhhM0JbY29kZV07XG59XG5leHBvcnRzLmFscGhhMlRvQWxwaGEzQiA9IGFscGhhMlRvQWxwaGEzQjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgVFxuICovXG5mdW5jdGlvbiB0b0FscGhhM1QoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gYWxwaGEyVG9BbHBoYTNUKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICBpZiggYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkgKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzVChhbHBoYTNCVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMudG9BbHBoYTNUID0gdG9BbHBoYTNUO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBCXG4gKi9cbmZ1bmN0aW9uIHRvQWxwaGEzQihjb2RlKSB7XG4gIGlmICh0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmKGNvZGUubGVuZ3RoID09PSAyKSB7XG5cbiAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM0IoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gICAgaWYgKGNvZGUubGVuZ3RoID09PSAzKSB7XG5cbiAgICAgIGlmKCBhbHBoYTNCW2NvZGUudG9Mb3dlckNhc2UoKV0gKSB7XG5cbiAgICAgICAgcmV0dXJuIGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIGlmKCBhbHBoYTNUW2NvZGUudG9Mb3dlckNhc2UoKV0gKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzQihhbHBoYTNUVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMudG9BbHBoYTNCID0gdG9BbHBoYTNCO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHJldHVybiBJU08gNjM5LTEgYWxwaGEtMlxuICovXG5mdW5jdGlvbiB0b0FscGhhMihjb2RlKSB7XG4gIGlmICh0eXBlb2YgY29kZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiAoIGFscGhhM0JbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTNCVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICAgIGlmICggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldKSB7XG5cbiAgICAgICAgcmV0dXJuIGFscGhhM1RUb0FscGhhMihjb2RlLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEyID0gdG9BbHBoYTI7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgSVNPIDYzOS0yIGFscGhhLTMgVCBvciBCXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgY291bnRyeSBuYW1lXG4gKiBAcmV0dXJuIG5hbWUgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0TmFtZSA9IGZ1bmN0aW9uKGNvZGUsIGxhbmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgZCA9IHJlZ2lzdGVyZWRMb2NhbGVzW2xhbmcudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGRbdG9BbHBoYTIoY29kZSldO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGxhbmd1YWdlIG5hbWVzXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBsYW5ndWFnZSBjb2RlIG1hcHBlZCB0byBsYW5ndWFnZSBuYW1lXG4gKi9cbmV4cG9ydHMuZ2V0TmFtZXMgPSBmdW5jdGlvbihsYW5nKSB7XG4gIHZhciBkID0gcmVnaXN0ZXJlZExvY2FsZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcbiAgaWYgKGQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICByZXR1cm4gZDtcbn07XG5cbi8qXG4gKiBAcGFyYW0gbmFtZSBuYW1lXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgbGFuZ3VhZ2UgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTEgYWxwaGEtMiBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTJDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB0cnkge1xuICAgIHZhciBwLCBjb2RlbmFtZXMgPSByZWdpc3RlcmVkTG9jYWxlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuICAgIGZvciAocCBpbiBjb2RlbmFtZXMpIHtcbiAgICAgIGlmIChjb2RlbmFtZXMuaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgICAgaWYgKGNvZGVuYW1lc1twXS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHJldHVybiBPYmplY3Qgb2YgYWxwaGEtMiBjb2RlcyBtYXBwZWQgdG8gYWxwaGEtMyBUIGNvZGVzXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEyQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhMjtcbn07XG5cbi8qXG4gKiBAcGFyYW0gbmFtZSBuYW1lXG4gKiBAcGFyYW0gbGFuZyBsYW5ndWFnZSBmb3IgY291bnRyeSBuYW1lXG4gKiBAcmV0dXJuIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEzVENvZGUgPSBmdW5jdGlvbihuYW1lLCBsYW5nKSB7XG4gIHZhciBhbHBoYTIgPSB0aGlzLmdldEFscGhhMkNvZGUobmFtZSwgbGFuZyk7XG4gIGlmIChhbHBoYTIpIHtcbiAgICByZXR1cm4gdGhpcy50b0FscGhhM1QoYWxwaGEyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBCIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldEFscGhhM0JDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB2YXIgYWxwaGEyID0gdGhpcy5nZXRBbHBoYTJDb2RlKG5hbWUsIGxhbmcpO1xuICBpZiAoYWxwaGEyKSB7XG4gICAgcmV0dXJuIHRoaXMudG9BbHBoYTNCKGFscGhhMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEByZXR1cm4gT2JqZWN0IG9mIGFscGhhLTMgVCBjb2RlcyBtYXBwZWQgdG8gYWxwaGEtMiBjb2Rlc1xuICovXG5leHBvcnRzLmdldEFscGhhM1RDb2RlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gYWxwaGEzVDtcbn07XG5cbi8qXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBhbHBoYS0zIEIgY29kZXMgbWFwcGVkIHRvIGFscGhhLTIgY29kZXNcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNCQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhM0I7XG59O1xuXG4vKlxuICogQHJldHVybiBBcnJheSBvZiBzdXBwb3J0ZWQgbGFuZ3VhZ2VzXG4gKi9cbmV4cG9ydHMubGFuZ3MgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHJlZ2lzdGVyZWRMb2NhbGVzKTtcbn07XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgNjM5LTIgYWxwaGEtMyBUIG9yIEIgY29kZVxuICogQHJldHVybiBCb29sZWFuXG4gKi9cbmV4cG9ydHMuaXNWYWxpZCA9IGZ1bmN0aW9uKGNvZGUpIHtcbiAgcmV0dXJuIHRoaXMudG9BbHBoYTNUKGNvZGUpICE9PSB1bmRlZmluZWQ7XG59O1xuIiwiLypcbiAqIGFuaW1lLmpzIHYzLjEuMFxuICogKGMpIDIwMTkgSnVsaWFuIEdhcm5pZXJcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogYW5pbWVqcy5jb21cbiAqL1xuXG4vLyBEZWZhdWx0c1xuXG52YXIgZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MgPSB7XG4gIHVwZGF0ZTogbnVsbCxcbiAgYmVnaW46IG51bGwsXG4gIGxvb3BCZWdpbjogbnVsbCxcbiAgY2hhbmdlQmVnaW46IG51bGwsXG4gIGNoYW5nZTogbnVsbCxcbiAgY2hhbmdlQ29tcGxldGU6IG51bGwsXG4gIGxvb3BDb21wbGV0ZTogbnVsbCxcbiAgY29tcGxldGU6IG51bGwsXG4gIGxvb3A6IDEsXG4gIGRpcmVjdGlvbjogJ25vcm1hbCcsXG4gIGF1dG9wbGF5OiB0cnVlLFxuICB0aW1lbGluZU9mZnNldDogMFxufTtcblxudmFyIGRlZmF1bHRUd2VlblNldHRpbmdzID0ge1xuICBkdXJhdGlvbjogMTAwMCxcbiAgZGVsYXk6IDAsXG4gIGVuZERlbGF5OiAwLFxuICBlYXNpbmc6ICdlYXNlT3V0RWxhc3RpYygxLCAuNSknLFxuICByb3VuZDogMFxufTtcblxudmFyIHZhbGlkVHJhbnNmb3JtcyA9IFsndHJhbnNsYXRlWCcsICd0cmFuc2xhdGVZJywgJ3RyYW5zbGF0ZVonLCAncm90YXRlJywgJ3JvdGF0ZVgnLCAncm90YXRlWScsICdyb3RhdGVaJywgJ3NjYWxlJywgJ3NjYWxlWCcsICdzY2FsZVknLCAnc2NhbGVaJywgJ3NrZXcnLCAnc2tld1gnLCAnc2tld1knLCAncGVyc3BlY3RpdmUnXTtcblxuLy8gQ2FjaGluZ1xuXG52YXIgY2FjaGUgPSB7XG4gIENTUzoge30sXG4gIHNwcmluZ3M6IHt9XG59O1xuXG4vLyBVdGlsc1xuXG5mdW5jdGlvbiBtaW5NYXgodmFsLCBtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsLCBtaW4pLCBtYXgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdDb250YWlucyhzdHIsIHRleHQpIHtcbiAgcmV0dXJuIHN0ci5pbmRleE9mKHRleHQpID4gLTE7XG59XG5cbmZ1bmN0aW9uIGFwcGx5QXJndW1lbnRzKGZ1bmMsIGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG59XG5cbnZhciBpcyA9IHtcbiAgYXJyOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhKTsgfSxcbiAgb2JqOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gc3RyaW5nQ29udGFpbnMoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpLCAnT2JqZWN0Jyk7IH0sXG4gIHB0aDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGlzLm9iaihhKSAmJiBhLmhhc093blByb3BlcnR5KCd0b3RhbExlbmd0aCcpOyB9LFxuICBzdmc6IGZ1bmN0aW9uIChhKSB7IHJldHVybiBhIGluc3RhbmNlb2YgU1ZHRWxlbWVudDsgfSxcbiAgaW5wOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQ7IH0sXG4gIGRvbTogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEubm9kZVR5cGUgfHwgaXMuc3ZnKGEpOyB9LFxuICBzdHI6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ3N0cmluZyc7IH0sXG4gIGZuYzogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHR5cGVvZiBhID09PSAnZnVuY3Rpb24nOyB9LFxuICB1bmQ6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ3VuZGVmaW5lZCc7IH0sXG4gIGhleDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIC8oXiNbMC05QS1GXXs2fSQpfCheI1swLTlBLUZdezN9JCkvaS50ZXN0KGEpOyB9LFxuICByZ2I6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAvXnJnYi8udGVzdChhKTsgfSxcbiAgaHNsOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gL15oc2wvLnRlc3QoYSk7IH0sXG4gIGNvbDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIChpcy5oZXgoYSkgfHwgaXMucmdiKGEpIHx8IGlzLmhzbChhKSk7IH0sXG4gIGtleTogZnVuY3Rpb24gKGEpIHsgcmV0dXJuICFkZWZhdWx0SW5zdGFuY2VTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShhKSAmJiAhZGVmYXVsdFR3ZWVuU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoYSkgJiYgYSAhPT0gJ3RhcmdldHMnICYmIGEgIT09ICdrZXlmcmFtZXMnOyB9XG59O1xuXG4vLyBFYXNpbmdzXG5cbmZ1bmN0aW9uIHBhcnNlRWFzaW5nUGFyYW1ldGVycyhzdHJpbmcpIHtcbiAgdmFyIG1hdGNoID0gL1xcKChbXildKylcXCkvLmV4ZWMoc3RyaW5nKTtcbiAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0uc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHApIHsgcmV0dXJuIHBhcnNlRmxvYXQocCk7IH0pIDogW107XG59XG5cbi8vIFNwcmluZyBzb2x2ZXIgaW5zcGlyZWQgYnkgV2Via2l0IENvcHlyaWdodCDCqSAyMDE2IEFwcGxlIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gaHR0cHM6Ly93ZWJraXQub3JnL2RlbW9zL3NwcmluZy9zcHJpbmcuanNcblxuZnVuY3Rpb24gc3ByaW5nKHN0cmluZywgZHVyYXRpb24pIHtcblxuICB2YXIgcGFyYW1zID0gcGFyc2VFYXNpbmdQYXJhbWV0ZXJzKHN0cmluZyk7XG4gIHZhciBtYXNzID0gbWluTWF4KGlzLnVuZChwYXJhbXNbMF0pID8gMSA6IHBhcmFtc1swXSwgLjEsIDEwMCk7XG4gIHZhciBzdGlmZm5lc3MgPSBtaW5NYXgoaXMudW5kKHBhcmFtc1sxXSkgPyAxMDAgOiBwYXJhbXNbMV0sIC4xLCAxMDApO1xuICB2YXIgZGFtcGluZyA9IG1pbk1heChpcy51bmQocGFyYW1zWzJdKSA/IDEwIDogcGFyYW1zWzJdLCAuMSwgMTAwKTtcbiAgdmFyIHZlbG9jaXR5ID0gIG1pbk1heChpcy51bmQocGFyYW1zWzNdKSA/IDAgOiBwYXJhbXNbM10sIC4xLCAxMDApO1xuICB2YXIgdzAgPSBNYXRoLnNxcnQoc3RpZmZuZXNzIC8gbWFzcyk7XG4gIHZhciB6ZXRhID0gZGFtcGluZyAvICgyICogTWF0aC5zcXJ0KHN0aWZmbmVzcyAqIG1hc3MpKTtcbiAgdmFyIHdkID0gemV0YSA8IDEgPyB3MCAqIE1hdGguc3FydCgxIC0gemV0YSAqIHpldGEpIDogMDtcbiAgdmFyIGEgPSAxO1xuICB2YXIgYiA9IHpldGEgPCAxID8gKHpldGEgKiB3MCArIC12ZWxvY2l0eSkgLyB3ZCA6IC12ZWxvY2l0eSArIHcwO1xuXG4gIGZ1bmN0aW9uIHNvbHZlcih0KSB7XG4gICAgdmFyIHByb2dyZXNzID0gZHVyYXRpb24gPyAoZHVyYXRpb24gKiB0KSAvIDEwMDAgOiB0O1xuICAgIGlmICh6ZXRhIDwgMSkge1xuICAgICAgcHJvZ3Jlc3MgPSBNYXRoLmV4cCgtcHJvZ3Jlc3MgKiB6ZXRhICogdzApICogKGEgKiBNYXRoLmNvcyh3ZCAqIHByb2dyZXNzKSArIGIgKiBNYXRoLnNpbih3ZCAqIHByb2dyZXNzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzID0gKGEgKyBiICogcHJvZ3Jlc3MpICogTWF0aC5leHAoLXByb2dyZXNzICogdzApO1xuICAgIH1cbiAgICBpZiAodCA9PT0gMCB8fCB0ID09PSAxKSB7IHJldHVybiB0OyB9XG4gICAgcmV0dXJuIDEgLSBwcm9ncmVzcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldER1cmF0aW9uKCkge1xuICAgIHZhciBjYWNoZWQgPSBjYWNoZS5zcHJpbmdzW3N0cmluZ107XG4gICAgaWYgKGNhY2hlZCkgeyByZXR1cm4gY2FjaGVkOyB9XG4gICAgdmFyIGZyYW1lID0gMS82O1xuICAgIHZhciBlbGFwc2VkID0gMDtcbiAgICB2YXIgcmVzdCA9IDA7XG4gICAgd2hpbGUodHJ1ZSkge1xuICAgICAgZWxhcHNlZCArPSBmcmFtZTtcbiAgICAgIGlmIChzb2x2ZXIoZWxhcHNlZCkgPT09IDEpIHtcbiAgICAgICAgcmVzdCsrO1xuICAgICAgICBpZiAocmVzdCA+PSAxNikgeyBicmVhazsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdCA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkdXJhdGlvbiA9IGVsYXBzZWQgKiBmcmFtZSAqIDEwMDA7XG4gICAgY2FjaGUuc3ByaW5nc1tzdHJpbmddID0gZHVyYXRpb247XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgcmV0dXJuIGR1cmF0aW9uID8gc29sdmVyIDogZ2V0RHVyYXRpb247XG5cbn1cblxuLy8gQmFzaWMgc3RlcHMgZWFzaW5nIGltcGxlbWVudGF0aW9uIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0NTUy90cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvblxuXG5mdW5jdGlvbiBzdGVwcyhzdGVwcykge1xuICBpZiAoIHN0ZXBzID09PSB2b2lkIDAgKSBzdGVwcyA9IDEwO1xuXG4gIHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gTWF0aC5yb3VuZCh0ICogc3RlcHMpICogKDEgLyBzdGVwcyk7IH07XG59XG5cbi8vIEJlemllckVhc2luZyBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmdcblxudmFyIGJlemllciA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGtTcGxpbmVUYWJsZVNpemUgPSAxMTtcbiAgdmFyIGtTYW1wbGVTdGVwU2l6ZSA9IDEuMCAvIChrU3BsaW5lVGFibGVTaXplIC0gMS4wKTtcblxuICBmdW5jdGlvbiBBKGFBMSwgYUEyKSB7IHJldHVybiAxLjAgLSAzLjAgKiBhQTIgKyAzLjAgKiBhQTEgfVxuICBmdW5jdGlvbiBCKGFBMSwgYUEyKSB7IHJldHVybiAzLjAgKiBhQTIgLSA2LjAgKiBhQTEgfVxuICBmdW5jdGlvbiBDKGFBMSkgICAgICB7IHJldHVybiAzLjAgKiBhQTEgfVxuXG4gIGZ1bmN0aW9uIGNhbGNCZXppZXIoYVQsIGFBMSwgYUEyKSB7IHJldHVybiAoKEEoYUExLCBhQTIpICogYVQgKyBCKGFBMSwgYUEyKSkgKiBhVCArIEMoYUExKSkgKiBhVCB9XG4gIGZ1bmN0aW9uIGdldFNsb3BlKGFULCBhQTEsIGFBMikgeyByZXR1cm4gMy4wICogQShhQTEsIGFBMikgKiBhVCAqIGFUICsgMi4wICogQihhQTEsIGFBMikgKiBhVCArIEMoYUExKSB9XG5cbiAgZnVuY3Rpb24gYmluYXJ5U3ViZGl2aWRlKGFYLCBhQSwgYUIsIG1YMSwgbVgyKSB7XG4gICAgdmFyIGN1cnJlbnRYLCBjdXJyZW50VCwgaSA9IDA7XG4gICAgZG8ge1xuICAgICAgY3VycmVudFQgPSBhQSArIChhQiAtIGFBKSAvIDIuMDtcbiAgICAgIGN1cnJlbnRYID0gY2FsY0JlemllcihjdXJyZW50VCwgbVgxLCBtWDIpIC0gYVg7XG4gICAgICBpZiAoY3VycmVudFggPiAwLjApIHsgYUIgPSBjdXJyZW50VDsgfSBlbHNlIHsgYUEgPSBjdXJyZW50VDsgfVxuICAgIH0gd2hpbGUgKE1hdGguYWJzKGN1cnJlbnRYKSA+IDAuMDAwMDAwMSAmJiArK2kgPCAxMCk7XG4gICAgcmV0dXJuIGN1cnJlbnRUO1xuICB9XG5cbiAgZnVuY3Rpb24gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGFHdWVzc1QsIG1YMSwgbVgyKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyArK2kpIHtcbiAgICAgIHZhciBjdXJyZW50U2xvcGUgPSBnZXRTbG9wZShhR3Vlc3NULCBtWDEsIG1YMik7XG4gICAgICBpZiAoY3VycmVudFNsb3BlID09PSAwLjApIHsgcmV0dXJuIGFHdWVzc1Q7IH1cbiAgICAgIHZhciBjdXJyZW50WCA9IGNhbGNCZXppZXIoYUd1ZXNzVCwgbVgxLCBtWDIpIC0gYVg7XG4gICAgICBhR3Vlc3NUIC09IGN1cnJlbnRYIC8gY3VycmVudFNsb3BlO1xuICAgIH1cbiAgICByZXR1cm4gYUd1ZXNzVDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlemllcihtWDEsIG1ZMSwgbVgyLCBtWTIpIHtcblxuICAgIGlmICghKDAgPD0gbVgxICYmIG1YMSA8PSAxICYmIDAgPD0gbVgyICYmIG1YMiA8PSAxKSkgeyByZXR1cm47IH1cbiAgICB2YXIgc2FtcGxlVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShrU3BsaW5lVGFibGVTaXplKTtcblxuICAgIGlmIChtWDEgIT09IG1ZMSB8fCBtWDIgIT09IG1ZMikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrU3BsaW5lVGFibGVTaXplOyArK2kpIHtcbiAgICAgICAgc2FtcGxlVmFsdWVzW2ldID0gY2FsY0JlemllcihpICoga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VEZvclgoYVgpIHtcblxuICAgICAgdmFyIGludGVydmFsU3RhcnQgPSAwO1xuICAgICAgdmFyIGN1cnJlbnRTYW1wbGUgPSAxO1xuICAgICAgdmFyIGxhc3RTYW1wbGUgPSBrU3BsaW5lVGFibGVTaXplIC0gMTtcblxuICAgICAgZm9yICg7IGN1cnJlbnRTYW1wbGUgIT09IGxhc3RTYW1wbGUgJiYgc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdIDw9IGFYOyArK2N1cnJlbnRTYW1wbGUpIHtcbiAgICAgICAgaW50ZXJ2YWxTdGFydCArPSBrU2FtcGxlU3RlcFNpemU7XG4gICAgICB9XG5cbiAgICAgIC0tY3VycmVudFNhbXBsZTtcblxuICAgICAgdmFyIGRpc3QgPSAoYVggLSBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0pIC8gKHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlICsgMV0gLSBzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZV0pO1xuICAgICAgdmFyIGd1ZXNzRm9yVCA9IGludGVydmFsU3RhcnQgKyBkaXN0ICoga1NhbXBsZVN0ZXBTaXplO1xuICAgICAgdmFyIGluaXRpYWxTbG9wZSA9IGdldFNsb3BlKGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuXG4gICAgICBpZiAoaW5pdGlhbFNsb3BlID49IDAuMDAxKSB7XG4gICAgICAgIHJldHVybiBuZXd0b25SYXBoc29uSXRlcmF0ZShhWCwgZ3Vlc3NGb3JULCBtWDEsIG1YMik7XG4gICAgICB9IGVsc2UgaWYgKGluaXRpYWxTbG9wZSA9PT0gMC4wKSB7XG4gICAgICAgIHJldHVybiBndWVzc0ZvclQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYmluYXJ5U3ViZGl2aWRlKGFYLCBpbnRlcnZhbFN0YXJ0LCBpbnRlcnZhbFN0YXJ0ICsga1NhbXBsZVN0ZXBTaXplLCBtWDEsIG1YMik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgIGlmIChtWDEgPT09IG1ZMSAmJiBtWDIgPT09IG1ZMikgeyByZXR1cm4geDsgfVxuICAgICAgaWYgKHggPT09IDAgfHwgeCA9PT0gMSkgeyByZXR1cm4geDsgfVxuICAgICAgcmV0dXJuIGNhbGNCZXppZXIoZ2V0VEZvclgoeCksIG1ZMSwgbVkyKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiBiZXppZXI7XG5cbn0pKCk7XG5cbnZhciBwZW5uZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gIC8vIEJhc2VkIG9uIGpRdWVyeSBVSSdzIGltcGxlbWVuYXRpb24gb2YgZWFzaW5nIGVxdWF0aW9ucyBmcm9tIFJvYmVydCBQZW5uZXIgKGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcpXG5cbiAgdmFyIGVhc2VzID0geyBsaW5lYXI6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0OyB9OyB9IH07XG5cbiAgdmFyIGZ1bmN0aW9uRWFzaW5ncyA9IHtcbiAgICBTaW5lOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gMSAtIE1hdGguY29zKHQgKiBNYXRoLlBJIC8gMik7IH07IH0sXG4gICAgQ2lyYzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIHQgKiB0KTsgfTsgfSxcbiAgICBCYWNrOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gdCAqIHQgKiAoMyAqIHQgLSAyKTsgfTsgfSxcbiAgICBCb3VuY2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICB2YXIgcG93MiwgYiA9IDQ7XG4gICAgICB3aGlsZSAodCA8ICgoIHBvdzIgPSBNYXRoLnBvdygyLCAtLWIpKSAtIDEpIC8gMTEpIHt9XG4gICAgICByZXR1cm4gMSAvIE1hdGgucG93KDQsIDMgLSBiKSAtIDcuNTYyNSAqIE1hdGgucG93KCggcG93MiAqIDMgLSAyICkgLyAyMiAtIHQsIDIpXG4gICAgfTsgfSxcbiAgICBFbGFzdGljOiBmdW5jdGlvbiAoYW1wbGl0dWRlLCBwZXJpb2QpIHtcbiAgICAgIGlmICggYW1wbGl0dWRlID09PSB2b2lkIDAgKSBhbXBsaXR1ZGUgPSAxO1xuICAgICAgaWYgKCBwZXJpb2QgPT09IHZvaWQgMCApIHBlcmlvZCA9IC41O1xuXG4gICAgICB2YXIgYSA9IG1pbk1heChhbXBsaXR1ZGUsIDEsIDEwKTtcbiAgICAgIHZhciBwID0gbWluTWF4KHBlcmlvZCwgLjEsIDIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiAodCA9PT0gMCB8fCB0ID09PSAxKSA/IHQgOiBcbiAgICAgICAgICAtYSAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKiBNYXRoLnNpbigoKCh0IC0gMSkgLSAocCAvIChNYXRoLlBJICogMikgKiBNYXRoLmFzaW4oMSAvIGEpKSkgKiAoTWF0aC5QSSAqIDIpKSAvIHApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYmFzZUVhc2luZ3MgPSBbJ1F1YWQnLCAnQ3ViaWMnLCAnUXVhcnQnLCAnUXVpbnQnLCAnRXhwbyddO1xuXG4gIGJhc2VFYXNpbmdzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGkpIHtcbiAgICBmdW5jdGlvbkVhc2luZ3NbbmFtZV0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gTWF0aC5wb3codCwgaSArIDIpOyB9OyB9O1xuICB9KTtcblxuICBPYmplY3Qua2V5cyhmdW5jdGlvbkVhc2luZ3MpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZWFzZUluID0gZnVuY3Rpb25FYXNpbmdzW25hbWVdO1xuICAgIGVhc2VzWydlYXNlSW4nICsgbmFtZV0gPSBlYXNlSW47XG4gICAgZWFzZXNbJ2Vhc2VPdXQnICsgbmFtZV0gPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBlYXNlSW4oYSwgYikoMSAtIHQpOyB9OyB9O1xuICAgIGVhc2VzWydlYXNlSW5PdXQnICsgbmFtZV0gPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgPCAwLjUgPyBlYXNlSW4oYSwgYikodCAqIDIpIC8gMiA6IFxuICAgICAgMSAtIGVhc2VJbihhLCBiKSh0ICogLTIgKyAyKSAvIDI7IH07IH07XG4gIH0pO1xuXG4gIHJldHVybiBlYXNlcztcblxufSkoKTtcblxuZnVuY3Rpb24gcGFyc2VFYXNpbmdzKGVhc2luZywgZHVyYXRpb24pIHtcbiAgaWYgKGlzLmZuYyhlYXNpbmcpKSB7IHJldHVybiBlYXNpbmc7IH1cbiAgdmFyIG5hbWUgPSBlYXNpbmcuc3BsaXQoJygnKVswXTtcbiAgdmFyIGVhc2UgPSBwZW5uZXJbbmFtZV07XG4gIHZhciBhcmdzID0gcGFyc2VFYXNpbmdQYXJhbWV0ZXJzKGVhc2luZyk7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ3NwcmluZycgOiByZXR1cm4gc3ByaW5nKGVhc2luZywgZHVyYXRpb24pO1xuICAgIGNhc2UgJ2N1YmljQmV6aWVyJyA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhiZXppZXIsIGFyZ3MpO1xuICAgIGNhc2UgJ3N0ZXBzJyA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhzdGVwcywgYXJncyk7XG4gICAgZGVmYXVsdCA6IHJldHVybiBhcHBseUFyZ3VtZW50cyhlYXNlLCBhcmdzKTtcbiAgfVxufVxuXG4vLyBTdHJpbmdzXG5cbmZ1bmN0aW9uIHNlbGVjdFN0cmluZyhzdHIpIHtcbiAgdHJ5IHtcbiAgICB2YXIgbm9kZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHN0cik7XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9IGNhdGNoKGUpIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuLy8gQXJyYXlzXG5cbmZ1bmN0aW9uIGZpbHRlckFycmF5KGFyciwgY2FsbGJhY2spIHtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciB0aGlzQXJnID0gYXJndW1lbnRzLmxlbmd0aCA+PSAyID8gYXJndW1lbnRzWzFdIDogdm9pZCAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoaSBpbiBhcnIpIHtcbiAgICAgIHZhciB2YWwgPSBhcnJbaV07XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWwsIGksIGFycikpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkFycmF5KGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5jb25jYXQoaXMuYXJyKGIpID8gZmxhdHRlbkFycmF5KGIpIDogYik7IH0sIFtdKTtcbn1cblxuZnVuY3Rpb24gdG9BcnJheShvKSB7XG4gIGlmIChpcy5hcnIobykpIHsgcmV0dXJuIG87IH1cbiAgaWYgKGlzLnN0cihvKSkgeyBvID0gc2VsZWN0U3RyaW5nKG8pIHx8IG87IH1cbiAgaWYgKG8gaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBvIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHsgcmV0dXJuIFtdLnNsaWNlLmNhbGwobyk7IH1cbiAgcmV0dXJuIFtvXTtcbn1cblxuZnVuY3Rpb24gYXJyYXlDb250YWlucyhhcnIsIHZhbCkge1xuICByZXR1cm4gYXJyLnNvbWUoZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgPT09IHZhbDsgfSk7XG59XG5cbi8vIE9iamVjdHNcblxuZnVuY3Rpb24gY2xvbmVPYmplY3Qobykge1xuICB2YXIgY2xvbmUgPSB7fTtcbiAgZm9yICh2YXIgcCBpbiBvKSB7IGNsb25lW3BdID0gb1twXTsgfVxuICByZXR1cm4gY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VPYmplY3RQcm9wcyhvMSwgbzIpIHtcbiAgdmFyIG8gPSBjbG9uZU9iamVjdChvMSk7XG4gIGZvciAodmFyIHAgaW4gbzEpIHsgb1twXSA9IG8yLmhhc093blByb3BlcnR5KHApID8gbzJbcF0gOiBvMVtwXTsgfVxuICByZXR1cm4gbztcbn1cblxuZnVuY3Rpb24gbWVyZ2VPYmplY3RzKG8xLCBvMikge1xuICB2YXIgbyA9IGNsb25lT2JqZWN0KG8xKTtcbiAgZm9yICh2YXIgcCBpbiBvMikgeyBvW3BdID0gaXMudW5kKG8xW3BdKSA/IG8yW3BdIDogbzFbcF07IH1cbiAgcmV0dXJuIG87XG59XG5cbi8vIENvbG9yc1xuXG5mdW5jdGlvbiByZ2JUb1JnYmEocmdiVmFsdWUpIHtcbiAgdmFyIHJnYiA9IC9yZ2JcXCgoXFxkKyxcXHMqW1xcZF0rLFxccypbXFxkXSspXFwpL2cuZXhlYyhyZ2JWYWx1ZSk7XG4gIHJldHVybiByZ2IgPyAoXCJyZ2JhKFwiICsgKHJnYlsxXSkgKyBcIiwxKVwiKSA6IHJnYlZhbHVlO1xufVxuXG5mdW5jdGlvbiBoZXhUb1JnYmEoaGV4VmFsdWUpIHtcbiAgdmFyIHJneCA9IC9eIz8oW2EtZlxcZF0pKFthLWZcXGRdKShbYS1mXFxkXSkkL2k7XG4gIHZhciBoZXggPSBoZXhWYWx1ZS5yZXBsYWNlKHJneCwgZnVuY3Rpb24gKG0sIHIsIGcsIGIpIHsgcmV0dXJuIHIgKyByICsgZyArIGcgKyBiICsgYjsgfSApO1xuICB2YXIgcmdiID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHZhciByID0gcGFyc2VJbnQocmdiWzFdLCAxNik7XG4gIHZhciBnID0gcGFyc2VJbnQocmdiWzJdLCAxNik7XG4gIHZhciBiID0gcGFyc2VJbnQocmdiWzNdLCAxNik7XG4gIHJldHVybiAoXCJyZ2JhKFwiICsgciArIFwiLFwiICsgZyArIFwiLFwiICsgYiArIFwiLDEpXCIpO1xufVxuXG5mdW5jdGlvbiBoc2xUb1JnYmEoaHNsVmFsdWUpIHtcbiAgdmFyIGhzbCA9IC9oc2xcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSVcXCkvZy5leGVjKGhzbFZhbHVlKSB8fCAvaHNsYVxcKChcXGQrKSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspJSxcXHMqKFtcXGQuXSspXFwpL2cuZXhlYyhoc2xWYWx1ZSk7XG4gIHZhciBoID0gcGFyc2VJbnQoaHNsWzFdLCAxMCkgLyAzNjA7XG4gIHZhciBzID0gcGFyc2VJbnQoaHNsWzJdLCAxMCkgLyAxMDA7XG4gIHZhciBsID0gcGFyc2VJbnQoaHNsWzNdLCAxMCkgLyAxMDA7XG4gIHZhciBhID0gaHNsWzRdIHx8IDE7XG4gIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMCkgeyB0ICs9IDE7IH1cbiAgICBpZiAodCA+IDEpIHsgdCAtPSAxOyB9XG4gICAgaWYgKHQgPCAxLzYpIHsgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHQ7IH1cbiAgICBpZiAodCA8IDEvMikgeyByZXR1cm4gcTsgfVxuICAgIGlmICh0IDwgMi8zKSB7IHJldHVybiBwICsgKHEgLSBwKSAqICgyLzMgLSB0KSAqIDY7IH1cbiAgICByZXR1cm4gcDtcbiAgfVxuICB2YXIgciwgZywgYjtcbiAgaWYgKHMgPT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGw7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgIHZhciBwID0gMiAqIGwgLSBxO1xuICAgIHIgPSBodWUycmdiKHAsIHEsIGggKyAxLzMpO1xuICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgIGIgPSBodWUycmdiKHAsIHEsIGggLSAxLzMpO1xuICB9XG4gIHJldHVybiAoXCJyZ2JhKFwiICsgKHIgKiAyNTUpICsgXCIsXCIgKyAoZyAqIDI1NSkgKyBcIixcIiArIChiICogMjU1KSArIFwiLFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gY29sb3JUb1JnYih2YWwpIHtcbiAgaWYgKGlzLnJnYih2YWwpKSB7IHJldHVybiByZ2JUb1JnYmEodmFsKTsgfVxuICBpZiAoaXMuaGV4KHZhbCkpIHsgcmV0dXJuIGhleFRvUmdiYSh2YWwpOyB9XG4gIGlmIChpcy5oc2wodmFsKSkgeyByZXR1cm4gaHNsVG9SZ2JhKHZhbCk7IH1cbn1cblxuLy8gVW5pdHNcblxuZnVuY3Rpb24gZ2V0VW5pdCh2YWwpIHtcbiAgdmFyIHNwbGl0ID0gL1srLV0/XFxkKlxcLj9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/KCV8cHh8cHR8ZW18cmVtfGlufGNtfG1tfGV4fGNofHBjfHZ3fHZofHZtaW58dm1heHxkZWd8cmFkfHR1cm4pPyQvLmV4ZWModmFsKTtcbiAgaWYgKHNwbGl0KSB7IHJldHVybiBzcGxpdFsxXTsgfVxufVxuXG5mdW5jdGlvbiBnZXRUcmFuc2Zvcm1Vbml0KHByb3BOYW1lKSB7XG4gIGlmIChzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3RyYW5zbGF0ZScpIHx8IHByb3BOYW1lID09PSAncGVyc3BlY3RpdmUnKSB7IHJldHVybiAncHgnOyB9XG4gIGlmIChzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3JvdGF0ZScpIHx8IHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAnc2tldycpKSB7IHJldHVybiAnZGVnJzsgfVxufVxuXG4vLyBWYWx1ZXNcblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb25WYWx1ZSh2YWwsIGFuaW1hdGFibGUpIHtcbiAgaWYgKCFpcy5mbmModmFsKSkgeyByZXR1cm4gdmFsOyB9XG4gIHJldHVybiB2YWwoYW5pbWF0YWJsZS50YXJnZXQsIGFuaW1hdGFibGUuaWQsIGFuaW1hdGFibGUudG90YWwpO1xufVxuXG5mdW5jdGlvbiBnZXRBdHRyaWJ1dGUoZWwsIHByb3ApIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShwcm9wKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkge1xuICB2YXIgdmFsdWVVbml0ID0gZ2V0VW5pdCh2YWx1ZSk7XG4gIGlmIChhcnJheUNvbnRhaW5zKFt1bml0LCAnZGVnJywgJ3JhZCcsICd0dXJuJ10sIHZhbHVlVW5pdCkpIHsgcmV0dXJuIHZhbHVlOyB9XG4gIHZhciBjYWNoZWQgPSBjYWNoZS5DU1NbdmFsdWUgKyB1bml0XTtcbiAgaWYgKCFpcy51bmQoY2FjaGVkKSkgeyByZXR1cm4gY2FjaGVkOyB9XG4gIHZhciBiYXNlbGluZSA9IDEwMDtcbiAgdmFyIHRlbXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWwudGFnTmFtZSk7XG4gIHZhciBwYXJlbnRFbCA9IChlbC5wYXJlbnROb2RlICYmIChlbC5wYXJlbnROb2RlICE9PSBkb2N1bWVudCkpID8gZWwucGFyZW50Tm9kZSA6IGRvY3VtZW50LmJvZHk7XG4gIHBhcmVudEVsLmFwcGVuZENoaWxkKHRlbXBFbCk7XG4gIHRlbXBFbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHRlbXBFbC5zdHlsZS53aWR0aCA9IGJhc2VsaW5lICsgdW5pdDtcbiAgdmFyIGZhY3RvciA9IGJhc2VsaW5lIC8gdGVtcEVsLm9mZnNldFdpZHRoO1xuICBwYXJlbnRFbC5yZW1vdmVDaGlsZCh0ZW1wRWwpO1xuICB2YXIgY29udmVydGVkVW5pdCA9IGZhY3RvciAqIHBhcnNlRmxvYXQodmFsdWUpO1xuICBjYWNoZS5DU1NbdmFsdWUgKyB1bml0XSA9IGNvbnZlcnRlZFVuaXQ7XG4gIHJldHVybiBjb252ZXJ0ZWRVbml0O1xufVxuXG5mdW5jdGlvbiBnZXRDU1NWYWx1ZShlbCwgcHJvcCwgdW5pdCkge1xuICBpZiAocHJvcCBpbiBlbC5zdHlsZSkge1xuICAgIHZhciB1cHBlcmNhc2VQcm9wTmFtZSA9IHByb3AucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdmFsdWUgPSBlbC5zdHlsZVtwcm9wXSB8fCBnZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKHVwcGVyY2FzZVByb3BOYW1lKSB8fCAnMCc7XG4gICAgcmV0dXJuIHVuaXQgPyBjb252ZXJ0UHhUb1VuaXQoZWwsIHZhbHVlLCB1bml0KSA6IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFuaW1hdGlvblR5cGUoZWwsIHByb3ApIHtcbiAgaWYgKGlzLmRvbShlbCkgJiYgIWlzLmlucChlbCkgJiYgKGdldEF0dHJpYnV0ZShlbCwgcHJvcCkgfHwgKGlzLnN2ZyhlbCkgJiYgZWxbcHJvcF0pKSkgeyByZXR1cm4gJ2F0dHJpYnV0ZSc7IH1cbiAgaWYgKGlzLmRvbShlbCkgJiYgYXJyYXlDb250YWlucyh2YWxpZFRyYW5zZm9ybXMsIHByb3ApKSB7IHJldHVybiAndHJhbnNmb3JtJzsgfVxuICBpZiAoaXMuZG9tKGVsKSAmJiAocHJvcCAhPT0gJ3RyYW5zZm9ybScgJiYgZ2V0Q1NTVmFsdWUoZWwsIHByb3ApKSkgeyByZXR1cm4gJ2Nzcyc7IH1cbiAgaWYgKGVsW3Byb3BdICE9IG51bGwpIHsgcmV0dXJuICdvYmplY3QnOyB9XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRUcmFuc2Zvcm1zKGVsKSB7XG4gIGlmICghaXMuZG9tKGVsKSkgeyByZXR1cm47IH1cbiAgdmFyIHN0ciA9IGVsLnN0eWxlLnRyYW5zZm9ybSB8fCAnJztcbiAgdmFyIHJlZyAgPSAvKFxcdyspXFwoKFteKV0qKVxcKS9nO1xuICB2YXIgdHJhbnNmb3JtcyA9IG5ldyBNYXAoKTtcbiAgdmFyIG07IHdoaWxlIChtID0gcmVnLmV4ZWMoc3RyKSkgeyB0cmFuc2Zvcm1zLnNldChtWzFdLCBtWzJdKTsgfVxuICByZXR1cm4gdHJhbnNmb3Jtcztcbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtVmFsdWUoZWwsIHByb3BOYW1lLCBhbmltYXRhYmxlLCB1bml0KSB7XG4gIHZhciBkZWZhdWx0VmFsID0gc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICdzY2FsZScpID8gMSA6IDAgKyBnZXRUcmFuc2Zvcm1Vbml0KHByb3BOYW1lKTtcbiAgdmFyIHZhbHVlID0gZ2V0RWxlbWVudFRyYW5zZm9ybXMoZWwpLmdldChwcm9wTmFtZSkgfHwgZGVmYXVsdFZhbDtcbiAgaWYgKGFuaW1hdGFibGUpIHtcbiAgICBhbmltYXRhYmxlLnRyYW5zZm9ybXMubGlzdC5zZXQocHJvcE5hbWUsIHZhbHVlKTtcbiAgICBhbmltYXRhYmxlLnRyYW5zZm9ybXNbJ2xhc3QnXSA9IHByb3BOYW1lO1xuICB9XG4gIHJldHVybiB1bml0ID8gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZSh0YXJnZXQsIHByb3BOYW1lLCB1bml0LCBhbmltYXRhYmxlKSB7XG4gIHN3aXRjaCAoZ2V0QW5pbWF0aW9uVHlwZSh0YXJnZXQsIHByb3BOYW1lKSkge1xuICAgIGNhc2UgJ3RyYW5zZm9ybSc6IHJldHVybiBnZXRUcmFuc2Zvcm1WYWx1ZSh0YXJnZXQsIHByb3BOYW1lLCBhbmltYXRhYmxlLCB1bml0KTtcbiAgICBjYXNlICdjc3MnOiByZXR1cm4gZ2V0Q1NTVmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgdW5pdCk7XG4gICAgY2FzZSAnYXR0cmlidXRlJzogcmV0dXJuIGdldEF0dHJpYnV0ZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICBkZWZhdWx0OiByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXSB8fCAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldFJlbGF0aXZlVmFsdWUodG8sIGZyb20pIHtcbiAgdmFyIG9wZXJhdG9yID0gL14oXFwqPXxcXCs9fC09KS8uZXhlYyh0byk7XG4gIGlmICghb3BlcmF0b3IpIHsgcmV0dXJuIHRvOyB9XG4gIHZhciB1ID0gZ2V0VW5pdCh0bykgfHwgMDtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KGZyb20pO1xuICB2YXIgeSA9IHBhcnNlRmxvYXQodG8ucmVwbGFjZShvcGVyYXRvclswXSwgJycpKTtcbiAgc3dpdGNoIChvcGVyYXRvclswXVswXSkge1xuICAgIGNhc2UgJysnOiByZXR1cm4geCArIHkgKyB1O1xuICAgIGNhc2UgJy0nOiByZXR1cm4geCAtIHkgKyB1O1xuICAgIGNhc2UgJyonOiByZXR1cm4geCAqIHkgKyB1O1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWUodmFsLCB1bml0KSB7XG4gIGlmIChpcy5jb2wodmFsKSkgeyByZXR1cm4gY29sb3JUb1JnYih2YWwpOyB9XG4gIGlmICgvXFxzL2cudGVzdCh2YWwpKSB7IHJldHVybiB2YWw7IH1cbiAgdmFyIG9yaWdpbmFsVW5pdCA9IGdldFVuaXQodmFsKTtcbiAgdmFyIHVuaXRMZXNzID0gb3JpZ2luYWxVbml0ID8gdmFsLnN1YnN0cigwLCB2YWwubGVuZ3RoIC0gb3JpZ2luYWxVbml0Lmxlbmd0aCkgOiB2YWw7XG4gIGlmICh1bml0KSB7IHJldHVybiB1bml0TGVzcyArIHVuaXQ7IH1cbiAgcmV0dXJuIHVuaXRMZXNzO1xufVxuXG4vLyBnZXRUb3RhbExlbmd0aCgpIGVxdWl2YWxlbnQgZm9yIGNpcmNsZSwgcmVjdCwgcG9seWxpbmUsIHBvbHlnb24gYW5kIGxpbmUgc2hhcGVzXG4vLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vU2ViTGFtYmxhLzNlMDU1MGM0OTZjMjM2NzA5NzQ0XG5cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHAyLnggLSBwMS54LCAyKSArIE1hdGgucG93KHAyLnkgLSBwMS55LCAyKSk7XG59XG5cbmZ1bmN0aW9uIGdldENpcmNsZUxlbmd0aChlbCkge1xuICByZXR1cm4gTWF0aC5QSSAqIDIgKiBnZXRBdHRyaWJ1dGUoZWwsICdyJyk7XG59XG5cbmZ1bmN0aW9uIGdldFJlY3RMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIChnZXRBdHRyaWJ1dGUoZWwsICd3aWR0aCcpICogMikgKyAoZ2V0QXR0cmlidXRlKGVsLCAnaGVpZ2h0JykgKiAyKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGluZUxlbmd0aChlbCkge1xuICByZXR1cm4gZ2V0RGlzdGFuY2UoXG4gICAge3g6IGdldEF0dHJpYnV0ZShlbCwgJ3gxJyksIHk6IGdldEF0dHJpYnV0ZShlbCwgJ3kxJyl9LCBcbiAgICB7eDogZ2V0QXR0cmlidXRlKGVsLCAneDInKSwgeTogZ2V0QXR0cmlidXRlKGVsLCAneTInKX1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9seWxpbmVMZW5ndGgoZWwpIHtcbiAgdmFyIHBvaW50cyA9IGVsLnBvaW50cztcbiAgdmFyIHRvdGFsTGVuZ3RoID0gMDtcbiAgdmFyIHByZXZpb3VzUG9zO1xuICBmb3IgKHZhciBpID0gMCA7IGkgPCBwb2ludHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgdmFyIGN1cnJlbnRQb3MgPSBwb2ludHMuZ2V0SXRlbShpKTtcbiAgICBpZiAoaSA+IDApIHsgdG90YWxMZW5ndGggKz0gZ2V0RGlzdGFuY2UocHJldmlvdXNQb3MsIGN1cnJlbnRQb3MpOyB9XG4gICAgcHJldmlvdXNQb3MgPSBjdXJyZW50UG9zO1xuICB9XG4gIHJldHVybiB0b3RhbExlbmd0aDtcbn1cblxuZnVuY3Rpb24gZ2V0UG9seWdvbkxlbmd0aChlbCkge1xuICB2YXIgcG9pbnRzID0gZWwucG9pbnRzO1xuICByZXR1cm4gZ2V0UG9seWxpbmVMZW5ndGgoZWwpICsgZ2V0RGlzdGFuY2UocG9pbnRzLmdldEl0ZW0ocG9pbnRzLm51bWJlck9mSXRlbXMgLSAxKSwgcG9pbnRzLmdldEl0ZW0oMCkpO1xufVxuXG4vLyBQYXRoIGFuaW1hdGlvblxuXG5mdW5jdGlvbiBnZXRUb3RhbExlbmd0aChlbCkge1xuICBpZiAoZWwuZ2V0VG90YWxMZW5ndGgpIHsgcmV0dXJuIGVsLmdldFRvdGFsTGVuZ3RoKCk7IH1cbiAgc3dpdGNoKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6IHJldHVybiBnZXRDaXJjbGVMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ3JlY3QnOiByZXR1cm4gZ2V0UmVjdExlbmd0aChlbCk7XG4gICAgY2FzZSAnbGluZSc6IHJldHVybiBnZXRMaW5lTGVuZ3RoKGVsKTtcbiAgICBjYXNlICdwb2x5bGluZSc6IHJldHVybiBnZXRQb2x5bGluZUxlbmd0aChlbCk7XG4gICAgY2FzZSAncG9seWdvbic6IHJldHVybiBnZXRQb2x5Z29uTGVuZ3RoKGVsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXREYXNob2Zmc2V0KGVsKSB7XG4gIHZhciBwYXRoTGVuZ3RoID0gZ2V0VG90YWxMZW5ndGgoZWwpO1xuICBlbC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCBwYXRoTGVuZ3RoKTtcbiAgcmV0dXJuIHBhdGhMZW5ndGg7XG59XG5cbi8vIE1vdGlvbiBwYXRoXG5cbmZ1bmN0aW9uIGdldFBhcmVudFN2Z0VsKGVsKSB7XG4gIHZhciBwYXJlbnRFbCA9IGVsLnBhcmVudE5vZGU7XG4gIHdoaWxlIChpcy5zdmcocGFyZW50RWwpKSB7XG4gICAgaWYgKCFpcy5zdmcocGFyZW50RWwucGFyZW50Tm9kZSkpIHsgYnJlYWs7IH1cbiAgICBwYXJlbnRFbCA9IHBhcmVudEVsLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIHBhcmVudEVsO1xufVxuXG5mdW5jdGlvbiBnZXRQYXJlbnRTdmcocGF0aEVsLCBzdmdEYXRhKSB7XG4gIHZhciBzdmcgPSBzdmdEYXRhIHx8IHt9O1xuICB2YXIgcGFyZW50U3ZnRWwgPSBzdmcuZWwgfHwgZ2V0UGFyZW50U3ZnRWwocGF0aEVsKTtcbiAgdmFyIHJlY3QgPSBwYXJlbnRTdmdFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHZpZXdCb3hBdHRyID0gZ2V0QXR0cmlidXRlKHBhcmVudFN2Z0VsLCAndmlld0JveCcpO1xuICB2YXIgd2lkdGggPSByZWN0LndpZHRoO1xuICB2YXIgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gIHZhciB2aWV3Qm94ID0gc3ZnLnZpZXdCb3ggfHwgKHZpZXdCb3hBdHRyID8gdmlld0JveEF0dHIuc3BsaXQoJyAnKSA6IFswLCAwLCB3aWR0aCwgaGVpZ2h0XSk7XG4gIHJldHVybiB7XG4gICAgZWw6IHBhcmVudFN2Z0VsLFxuICAgIHZpZXdCb3g6IHZpZXdCb3gsXG4gICAgeDogdmlld0JveFswXSAvIDEsXG4gICAgeTogdmlld0JveFsxXSAvIDEsXG4gICAgdzogd2lkdGggLyB2aWV3Qm94WzJdLFxuICAgIGg6IGhlaWdodCAvIHZpZXdCb3hbM11cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoKHBhdGgsIHBlcmNlbnQpIHtcbiAgdmFyIHBhdGhFbCA9IGlzLnN0cihwYXRoKSA/IHNlbGVjdFN0cmluZyhwYXRoKVswXSA6IHBhdGg7XG4gIHZhciBwID0gcGVyY2VudCB8fCAxMDA7XG4gIHJldHVybiBmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICBlbDogcGF0aEVsLFxuICAgICAgc3ZnOiBnZXRQYXJlbnRTdmcocGF0aEVsKSxcbiAgICAgIHRvdGFsTGVuZ3RoOiBnZXRUb3RhbExlbmd0aChwYXRoRWwpICogKHAgLyAxMDApXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhQcm9ncmVzcyhwYXRoLCBwcm9ncmVzcykge1xuICBmdW5jdGlvbiBwb2ludChvZmZzZXQpIHtcbiAgICBpZiAoIG9mZnNldCA9PT0gdm9pZCAwICkgb2Zmc2V0ID0gMDtcblxuICAgIHZhciBsID0gcHJvZ3Jlc3MgKyBvZmZzZXQgPj0gMSA/IHByb2dyZXNzICsgb2Zmc2V0IDogMDtcbiAgICByZXR1cm4gcGF0aC5lbC5nZXRQb2ludEF0TGVuZ3RoKGwpO1xuICB9XG4gIHZhciBzdmcgPSBnZXRQYXJlbnRTdmcocGF0aC5lbCwgcGF0aC5zdmcpO1xuICB2YXIgcCA9IHBvaW50KCk7XG4gIHZhciBwMCA9IHBvaW50KC0xKTtcbiAgdmFyIHAxID0gcG9pbnQoKzEpO1xuICBzd2l0Y2ggKHBhdGgucHJvcGVydHkpIHtcbiAgICBjYXNlICd4JzogcmV0dXJuIChwLnggLSBzdmcueCkgKiBzdmcudztcbiAgICBjYXNlICd5JzogcmV0dXJuIChwLnkgLSBzdmcueSkgKiBzdmcuaDtcbiAgICBjYXNlICdhbmdsZSc6IHJldHVybiBNYXRoLmF0YW4yKHAxLnkgLSBwMC55LCBwMS54IC0gcDAueCkgKiAxODAgLyBNYXRoLlBJO1xuICB9XG59XG5cbi8vIERlY29tcG9zZSB2YWx1ZVxuXG5mdW5jdGlvbiBkZWNvbXBvc2VWYWx1ZSh2YWwsIHVuaXQpIHtcbiAgLy8gY29uc3Qgcmd4ID0gLy0/XFxkKlxcLj9cXGQrL2c7IC8vIGhhbmRsZXMgYmFzaWMgbnVtYmVyc1xuICAvLyBjb25zdCByZ3ggPSAvWystXT9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/L2c7IC8vIGhhbmRsZXMgZXhwb25lbnRzIG5vdGF0aW9uXG4gIHZhciByZ3ggPSAvWystXT9cXGQqXFwuP1xcZCsoPzpcXC5cXGQrKT8oPzpbZUVdWystXT9cXGQrKT8vZzsgLy8gaGFuZGxlcyBleHBvbmVudHMgbm90YXRpb25cbiAgdmFyIHZhbHVlID0gdmFsaWRhdGVWYWx1ZSgoaXMucHRoKHZhbCkgPyB2YWwudG90YWxMZW5ndGggOiB2YWwpLCB1bml0KSArICcnO1xuICByZXR1cm4ge1xuICAgIG9yaWdpbmFsOiB2YWx1ZSxcbiAgICBudW1iZXJzOiB2YWx1ZS5tYXRjaChyZ3gpID8gdmFsdWUubWF0Y2gocmd4KS5tYXAoTnVtYmVyKSA6IFswXSxcbiAgICBzdHJpbmdzOiAoaXMuc3RyKHZhbCkgfHwgdW5pdCkgPyB2YWx1ZS5zcGxpdChyZ3gpIDogW11cbiAgfVxufVxuXG4vLyBBbmltYXRhYmxlc1xuXG5mdW5jdGlvbiBwYXJzZVRhcmdldHModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0c0FycmF5ID0gdGFyZ2V0cyA/IChmbGF0dGVuQXJyYXkoaXMuYXJyKHRhcmdldHMpID8gdGFyZ2V0cy5tYXAodG9BcnJheSkgOiB0b0FycmF5KHRhcmdldHMpKSkgOiBbXTtcbiAgcmV0dXJuIGZpbHRlckFycmF5KHRhcmdldHNBcnJheSwgZnVuY3Rpb24gKGl0ZW0sIHBvcywgc2VsZikgeyByZXR1cm4gc2VsZi5pbmRleE9mKGl0ZW0pID09PSBwb3M7IH0pO1xufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRhYmxlcyh0YXJnZXRzKSB7XG4gIHZhciBwYXJzZWQgPSBwYXJzZVRhcmdldHModGFyZ2V0cyk7XG4gIHJldHVybiBwYXJzZWQubWFwKGZ1bmN0aW9uICh0LCBpKSB7XG4gICAgcmV0dXJuIHt0YXJnZXQ6IHQsIGlkOiBpLCB0b3RhbDogcGFyc2VkLmxlbmd0aCwgdHJhbnNmb3JtczogeyBsaXN0OiBnZXRFbGVtZW50VHJhbnNmb3Jtcyh0KSB9IH07XG4gIH0pO1xufVxuXG4vLyBQcm9wZXJ0aWVzXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVByb3BlcnR5VHdlZW5zKHByb3AsIHR3ZWVuU2V0dGluZ3MpIHtcbiAgdmFyIHNldHRpbmdzID0gY2xvbmVPYmplY3QodHdlZW5TZXR0aW5ncyk7XG4gIC8vIE92ZXJyaWRlIGR1cmF0aW9uIGlmIGVhc2luZyBpcyBhIHNwcmluZ1xuICBpZiAoL15zcHJpbmcvLnRlc3Qoc2V0dGluZ3MuZWFzaW5nKSkgeyBzZXR0aW5ncy5kdXJhdGlvbiA9IHNwcmluZyhzZXR0aW5ncy5lYXNpbmcpOyB9XG4gIGlmIChpcy5hcnIocHJvcCkpIHtcbiAgICB2YXIgbCA9IHByb3AubGVuZ3RoO1xuICAgIHZhciBpc0Zyb21UbyA9IChsID09PSAyICYmICFpcy5vYmoocHJvcFswXSkpO1xuICAgIGlmICghaXNGcm9tVG8pIHtcbiAgICAgIC8vIER1cmF0aW9uIGRpdmlkZWQgYnkgdGhlIG51bWJlciBvZiB0d2VlbnNcbiAgICAgIGlmICghaXMuZm5jKHR3ZWVuU2V0dGluZ3MuZHVyYXRpb24pKSB7IHNldHRpbmdzLmR1cmF0aW9uID0gdHdlZW5TZXR0aW5ncy5kdXJhdGlvbiAvIGw7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVHJhbnNmb3JtIFtmcm9tLCB0b10gdmFsdWVzIHNob3J0aGFuZCB0byBhIHZhbGlkIHR3ZWVuIHZhbHVlXG4gICAgICBwcm9wID0ge3ZhbHVlOiBwcm9wfTtcbiAgICB9XG4gIH1cbiAgdmFyIHByb3BBcnJheSA9IGlzLmFycihwcm9wKSA/IHByb3AgOiBbcHJvcF07XG4gIHJldHVybiBwcm9wQXJyYXkubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgdmFyIG9iaiA9IChpcy5vYmoodikgJiYgIWlzLnB0aCh2KSkgPyB2IDoge3ZhbHVlOiB2fTtcbiAgICAvLyBEZWZhdWx0IGRlbGF5IHZhbHVlIHNob3VsZCBvbmx5IGJlIGFwcGxpZWQgdG8gdGhlIGZpcnN0IHR3ZWVuXG4gICAgaWYgKGlzLnVuZChvYmouZGVsYXkpKSB7IG9iai5kZWxheSA9ICFpID8gdHdlZW5TZXR0aW5ncy5kZWxheSA6IDA7IH1cbiAgICAvLyBEZWZhdWx0IGVuZERlbGF5IHZhbHVlIHNob3VsZCBvbmx5IGJlIGFwcGxpZWQgdG8gdGhlIGxhc3QgdHdlZW5cbiAgICBpZiAoaXMudW5kKG9iai5lbmREZWxheSkpIHsgb2JqLmVuZERlbGF5ID0gaSA9PT0gcHJvcEFycmF5Lmxlbmd0aCAtIDEgPyB0d2VlblNldHRpbmdzLmVuZERlbGF5IDogMDsgfVxuICAgIHJldHVybiBvYmo7XG4gIH0pLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gbWVyZ2VPYmplY3RzKGssIHNldHRpbmdzKTsgfSk7XG59XG5cblxuZnVuY3Rpb24gZmxhdHRlbktleWZyYW1lcyhrZXlmcmFtZXMpIHtcbiAgdmFyIHByb3BlcnR5TmFtZXMgPSBmaWx0ZXJBcnJheShmbGF0dGVuQXJyYXkoa2V5ZnJhbWVzLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBPYmplY3Qua2V5cyhrZXkpOyB9KSksIGZ1bmN0aW9uIChwKSB7IHJldHVybiBpcy5rZXkocCk7IH0pXG4gIC5yZWR1Y2UoZnVuY3Rpb24gKGEsYikgeyBpZiAoYS5pbmRleE9mKGIpIDwgMCkgeyBhLnB1c2goYik7IH0gcmV0dXJuIGE7IH0sIFtdKTtcbiAgdmFyIHByb3BlcnRpZXMgPSB7fTtcbiAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoIGkgKSB7XG4gICAgdmFyIHByb3BOYW1lID0gcHJvcGVydHlOYW1lc1tpXTtcbiAgICBwcm9wZXJ0aWVzW3Byb3BOYW1lXSA9IGtleWZyYW1lcy5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG5ld0tleSA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBrZXkpIHtcbiAgICAgICAgaWYgKGlzLmtleShwKSkge1xuICAgICAgICAgIGlmIChwID09IHByb3BOYW1lKSB7IG5ld0tleS52YWx1ZSA9IGtleVtwXTsgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0tleVtwXSA9IGtleVtwXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0tleTtcbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIGxvb3AoIGkgKTtcbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnRpZXModHdlZW5TZXR0aW5ncywgcGFyYW1zKSB7XG4gIHZhciBwcm9wZXJ0aWVzID0gW107XG4gIHZhciBrZXlmcmFtZXMgPSBwYXJhbXMua2V5ZnJhbWVzO1xuICBpZiAoa2V5ZnJhbWVzKSB7IHBhcmFtcyA9IG1lcmdlT2JqZWN0cyhmbGF0dGVuS2V5ZnJhbWVzKGtleWZyYW1lcyksIHBhcmFtcyk7IH1cbiAgZm9yICh2YXIgcCBpbiBwYXJhbXMpIHtcbiAgICBpZiAoaXMua2V5KHApKSB7XG4gICAgICBwcm9wZXJ0aWVzLnB1c2goe1xuICAgICAgICBuYW1lOiBwLFxuICAgICAgICB0d2VlbnM6IG5vcm1hbGl6ZVByb3BlcnR5VHdlZW5zKHBhcmFtc1twXSwgdHdlZW5TZXR0aW5ncylcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcGVydGllcztcbn1cblxuLy8gVHdlZW5zXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR3ZWVuVmFsdWVzKHR3ZWVuLCBhbmltYXRhYmxlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gdHdlZW4pIHtcbiAgICB2YXIgdmFsdWUgPSBnZXRGdW5jdGlvblZhbHVlKHR3ZWVuW3BdLCBhbmltYXRhYmxlKTtcbiAgICBpZiAoaXMuYXJyKHZhbHVlKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGdldEZ1bmN0aW9uVmFsdWUodiwgYW5pbWF0YWJsZSk7IH0pO1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkgeyB2YWx1ZSA9IHZhbHVlWzBdOyB9XG4gICAgfVxuICAgIHRbcF0gPSB2YWx1ZTtcbiAgfVxuICB0LmR1cmF0aW9uID0gcGFyc2VGbG9hdCh0LmR1cmF0aW9uKTtcbiAgdC5kZWxheSA9IHBhcnNlRmxvYXQodC5kZWxheSk7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSkge1xuICB2YXIgcHJldmlvdXNUd2VlbjtcbiAgcmV0dXJuIHByb3AudHdlZW5zLm1hcChmdW5jdGlvbiAodCkge1xuICAgIHZhciB0d2VlbiA9IG5vcm1hbGl6ZVR3ZWVuVmFsdWVzKHQsIGFuaW1hdGFibGUpO1xuICAgIHZhciB0d2VlblZhbHVlID0gdHdlZW4udmFsdWU7XG4gICAgdmFyIHRvID0gaXMuYXJyKHR3ZWVuVmFsdWUpID8gdHdlZW5WYWx1ZVsxXSA6IHR3ZWVuVmFsdWU7XG4gICAgdmFyIHRvVW5pdCA9IGdldFVuaXQodG8pO1xuICAgIHZhciBvcmlnaW5hbFZhbHVlID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZShhbmltYXRhYmxlLnRhcmdldCwgcHJvcC5uYW1lLCB0b1VuaXQsIGFuaW1hdGFibGUpO1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNUd2VlbiA/IHByZXZpb3VzVHdlZW4udG8ub3JpZ2luYWwgOiBvcmlnaW5hbFZhbHVlO1xuICAgIHZhciBmcm9tID0gaXMuYXJyKHR3ZWVuVmFsdWUpID8gdHdlZW5WYWx1ZVswXSA6IHByZXZpb3VzVmFsdWU7XG4gICAgdmFyIGZyb21Vbml0ID0gZ2V0VW5pdChmcm9tKSB8fCBnZXRVbml0KG9yaWdpbmFsVmFsdWUpO1xuICAgIHZhciB1bml0ID0gdG9Vbml0IHx8IGZyb21Vbml0O1xuICAgIGlmIChpcy51bmQodG8pKSB7IHRvID0gcHJldmlvdXNWYWx1ZTsgfVxuICAgIHR3ZWVuLmZyb20gPSBkZWNvbXBvc2VWYWx1ZShmcm9tLCB1bml0KTtcbiAgICB0d2Vlbi50byA9IGRlY29tcG9zZVZhbHVlKGdldFJlbGF0aXZlVmFsdWUodG8sIGZyb20pLCB1bml0KTtcbiAgICB0d2Vlbi5zdGFydCA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLmVuZCA6IDA7XG4gICAgdHdlZW4uZW5kID0gdHdlZW4uc3RhcnQgKyB0d2Vlbi5kZWxheSArIHR3ZWVuLmR1cmF0aW9uICsgdHdlZW4uZW5kRGVsYXk7XG4gICAgdHdlZW4uZWFzaW5nID0gcGFyc2VFYXNpbmdzKHR3ZWVuLmVhc2luZywgdHdlZW4uZHVyYXRpb24pO1xuICAgIHR3ZWVuLmlzUGF0aCA9IGlzLnB0aCh0d2VlblZhbHVlKTtcbiAgICB0d2Vlbi5pc0NvbG9yID0gaXMuY29sKHR3ZWVuLmZyb20ub3JpZ2luYWwpO1xuICAgIGlmICh0d2Vlbi5pc0NvbG9yKSB7IHR3ZWVuLnJvdW5kID0gMTsgfVxuICAgIHByZXZpb3VzVHdlZW4gPSB0d2VlbjtcbiAgICByZXR1cm4gdHdlZW47XG4gIH0pO1xufVxuXG4vLyBUd2VlbiBwcm9ncmVzc1xuXG52YXIgc2V0UHJvZ3Jlc3NWYWx1ZSA9IHtcbiAgY3NzOiBmdW5jdGlvbiAodCwgcCwgdikgeyByZXR1cm4gdC5zdHlsZVtwXSA9IHY7IH0sXG4gIGF0dHJpYnV0ZTogZnVuY3Rpb24gKHQsIHAsIHYpIHsgcmV0dXJuIHQuc2V0QXR0cmlidXRlKHAsIHYpOyB9LFxuICBvYmplY3Q6IGZ1bmN0aW9uICh0LCBwLCB2KSB7IHJldHVybiB0W3BdID0gdjsgfSxcbiAgdHJhbnNmb3JtOiBmdW5jdGlvbiAodCwgcCwgdiwgdHJhbnNmb3JtcywgbWFudWFsKSB7XG4gICAgdHJhbnNmb3Jtcy5saXN0LnNldChwLCB2KTtcbiAgICBpZiAocCA9PT0gdHJhbnNmb3Jtcy5sYXN0IHx8IG1hbnVhbCkge1xuICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgdHJhbnNmb3Jtcy5saXN0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBwcm9wKSB7IHN0ciArPSBwcm9wICsgXCIoXCIgKyB2YWx1ZSArIFwiKSBcIjsgfSk7XG4gICAgICB0LnN0eWxlLnRyYW5zZm9ybSA9IHN0cjtcbiAgICB9XG4gIH1cbn07XG5cbi8vIFNldCBWYWx1ZSBoZWxwZXJcblxuZnVuY3Rpb24gc2V0VGFyZ2V0c1ZhbHVlKHRhcmdldHMsIHByb3BlcnRpZXMpIHtcbiAgdmFyIGFuaW1hdGFibGVzID0gZ2V0QW5pbWF0YWJsZXModGFyZ2V0cyk7XG4gIGFuaW1hdGFibGVzLmZvckVhY2goZnVuY3Rpb24gKGFuaW1hdGFibGUpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIgdmFsdWUgPSBnZXRGdW5jdGlvblZhbHVlKHByb3BlcnRpZXNbcHJvcGVydHldLCBhbmltYXRhYmxlKTtcbiAgICAgIHZhciB0YXJnZXQgPSBhbmltYXRhYmxlLnRhcmdldDtcbiAgICAgIHZhciB2YWx1ZVVuaXQgPSBnZXRVbml0KHZhbHVlKTtcbiAgICAgIHZhciBvcmlnaW5hbFZhbHVlID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZSh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZVVuaXQsIGFuaW1hdGFibGUpO1xuICAgICAgdmFyIHVuaXQgPSB2YWx1ZVVuaXQgfHwgZ2V0VW5pdChvcmlnaW5hbFZhbHVlKTtcbiAgICAgIHZhciB0byA9IGdldFJlbGF0aXZlVmFsdWUodmFsaWRhdGVWYWx1ZSh2YWx1ZSwgdW5pdCksIG9yaWdpbmFsVmFsdWUpO1xuICAgICAgdmFyIGFuaW1UeXBlID0gZ2V0QW5pbWF0aW9uVHlwZSh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICAgIHNldFByb2dyZXNzVmFsdWVbYW5pbVR5cGVdKHRhcmdldCwgcHJvcGVydHksIHRvLCBhbmltYXRhYmxlLnRyYW5zZm9ybXMsIHRydWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEFuaW1hdGlvbnNcblxuZnVuY3Rpb24gY3JlYXRlQW5pbWF0aW9uKGFuaW1hdGFibGUsIHByb3ApIHtcbiAgdmFyIGFuaW1UeXBlID0gZ2V0QW5pbWF0aW9uVHlwZShhbmltYXRhYmxlLnRhcmdldCwgcHJvcC5uYW1lKTtcbiAgaWYgKGFuaW1UeXBlKSB7XG4gICAgdmFyIHR3ZWVucyA9IG5vcm1hbGl6ZVR3ZWVucyhwcm9wLCBhbmltYXRhYmxlKTtcbiAgICB2YXIgbGFzdFR3ZWVuID0gdHdlZW5zW3R3ZWVucy5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogYW5pbVR5cGUsXG4gICAgICBwcm9wZXJ0eTogcHJvcC5uYW1lLFxuICAgICAgYW5pbWF0YWJsZTogYW5pbWF0YWJsZSxcbiAgICAgIHR3ZWVuczogdHdlZW5zLFxuICAgICAgZHVyYXRpb246IGxhc3RUd2Vlbi5lbmQsXG4gICAgICBkZWxheTogdHdlZW5zWzBdLmRlbGF5LFxuICAgICAgZW5kRGVsYXk6IGxhc3RUd2Vlbi5lbmREZWxheVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25zKGFuaW1hdGFibGVzLCBwcm9wZXJ0aWVzKSB7XG4gIHJldHVybiBmaWx0ZXJBcnJheShmbGF0dGVuQXJyYXkoYW5pbWF0YWJsZXMubWFwKGZ1bmN0aW9uIChhbmltYXRhYmxlKSB7XG4gICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQW5pbWF0aW9uKGFuaW1hdGFibGUsIHByb3ApO1xuICAgIH0pO1xuICB9KSksIGZ1bmN0aW9uIChhKSB7IHJldHVybiAhaXMudW5kKGEpOyB9KTtcbn1cblxuLy8gQ3JlYXRlIEluc3RhbmNlXG5cbmZ1bmN0aW9uIGdldEluc3RhbmNlVGltaW5ncyhhbmltYXRpb25zLCB0d2VlblNldHRpbmdzKSB7XG4gIHZhciBhbmltTGVuZ3RoID0gYW5pbWF0aW9ucy5sZW5ndGg7XG4gIHZhciBnZXRUbE9mZnNldCA9IGZ1bmN0aW9uIChhbmltKSB7IHJldHVybiBhbmltLnRpbWVsaW5lT2Zmc2V0ID8gYW5pbS50aW1lbGluZU9mZnNldCA6IDA7IH07XG4gIHZhciB0aW1pbmdzID0ge307XG4gIHRpbWluZ3MuZHVyYXRpb24gPSBhbmltTGVuZ3RoID8gTWF0aC5tYXguYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kdXJhdGlvbjsgfSkpIDogdHdlZW5TZXR0aW5ncy5kdXJhdGlvbjtcbiAgdGltaW5ncy5kZWxheSA9IGFuaW1MZW5ndGggPyBNYXRoLm1pbi5hcHBseShNYXRoLCBhbmltYXRpb25zLm1hcChmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gZ2V0VGxPZmZzZXQoYW5pbSkgKyBhbmltLmRlbGF5OyB9KSkgOiB0d2VlblNldHRpbmdzLmRlbGF5O1xuICB0aW1pbmdzLmVuZERlbGF5ID0gYW5pbUxlbmd0aCA/IHRpbWluZ3MuZHVyYXRpb24gLSBNYXRoLm1heC5hcHBseShNYXRoLCBhbmltYXRpb25zLm1hcChmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gZ2V0VGxPZmZzZXQoYW5pbSkgKyBhbmltLmR1cmF0aW9uIC0gYW5pbS5lbmREZWxheTsgfSkpIDogdHdlZW5TZXR0aW5ncy5lbmREZWxheTtcbiAgcmV0dXJuIHRpbWluZ3M7XG59XG5cbnZhciBpbnN0YW5jZUlEID0gMDtcblxuZnVuY3Rpb24gY3JlYXRlTmV3SW5zdGFuY2UocGFyYW1zKSB7XG4gIHZhciBpbnN0YW5jZVNldHRpbmdzID0gcmVwbGFjZU9iamVjdFByb3BzKGRlZmF1bHRJbnN0YW5jZVNldHRpbmdzLCBwYXJhbXMpO1xuICB2YXIgdHdlZW5TZXR0aW5ncyA9IHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0VHdlZW5TZXR0aW5ncywgcGFyYW1zKTtcbiAgdmFyIHByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0aWVzKHR3ZWVuU2V0dGluZ3MsIHBhcmFtcyk7XG4gIHZhciBhbmltYXRhYmxlcyA9IGdldEFuaW1hdGFibGVzKHBhcmFtcy50YXJnZXRzKTtcbiAgdmFyIGFuaW1hdGlvbnMgPSBnZXRBbmltYXRpb25zKGFuaW1hdGFibGVzLCBwcm9wZXJ0aWVzKTtcbiAgdmFyIHRpbWluZ3MgPSBnZXRJbnN0YW5jZVRpbWluZ3MoYW5pbWF0aW9ucywgdHdlZW5TZXR0aW5ncyk7XG4gIHZhciBpZCA9IGluc3RhbmNlSUQ7XG4gIGluc3RhbmNlSUQrKztcbiAgcmV0dXJuIG1lcmdlT2JqZWN0cyhpbnN0YW5jZVNldHRpbmdzLCB7XG4gICAgaWQ6IGlkLFxuICAgIGNoaWxkcmVuOiBbXSxcbiAgICBhbmltYXRhYmxlczogYW5pbWF0YWJsZXMsXG4gICAgYW5pbWF0aW9uczogYW5pbWF0aW9ucyxcbiAgICBkdXJhdGlvbjogdGltaW5ncy5kdXJhdGlvbixcbiAgICBkZWxheTogdGltaW5ncy5kZWxheSxcbiAgICBlbmREZWxheTogdGltaW5ncy5lbmREZWxheVxuICB9KTtcbn1cblxuLy8gQ29yZVxuXG52YXIgYWN0aXZlSW5zdGFuY2VzID0gW107XG52YXIgcGF1c2VkSW5zdGFuY2VzID0gW107XG52YXIgcmFmO1xuXG52YXIgZW5naW5lID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gcGxheSgpIHsgXG4gICAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICB9XG4gIGZ1bmN0aW9uIHN0ZXAodCkge1xuICAgIHZhciBhY3RpdmVJbnN0YW5jZXNMZW5ndGggPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoO1xuICAgIGlmIChhY3RpdmVJbnN0YW5jZXNMZW5ndGgpIHtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoKSB7XG4gICAgICAgIHZhciBhY3RpdmVJbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlc1tpXTtcbiAgICAgICAgaWYgKCFhY3RpdmVJbnN0YW5jZS5wYXVzZWQpIHtcbiAgICAgICAgICBhY3RpdmVJbnN0YW5jZS50aWNrKHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpbnN0YW5jZUluZGV4ID0gYWN0aXZlSW5zdGFuY2VzLmluZGV4T2YoYWN0aXZlSW5zdGFuY2UpO1xuICAgICAgICAgIGlmIChpbnN0YW5jZUluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIGFjdGl2ZUluc3RhbmNlcy5zcGxpY2UoaW5zdGFuY2VJbmRleCwgMSk7XG4gICAgICAgICAgICBhY3RpdmVJbnN0YW5jZXNMZW5ndGggPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgICBwbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhZiA9IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgfVxuICB9XG4gIHJldHVybiBwbGF5O1xufSkoKTtcblxuZnVuY3Rpb24gaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSgpIHtcbiAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgIGFjdGl2ZUluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnMpIHsgcmV0dXJuIGlucy5wYXVzZSgpOyB9KTtcbiAgICBwYXVzZWRJbnN0YW5jZXMgPSBhY3RpdmVJbnN0YW5jZXMuc2xpY2UoMCk7XG4gICAgYW5pbWUucnVubmluZyA9IGFjdGl2ZUluc3RhbmNlcyA9IFtdO1xuICB9IGVsc2Uge1xuICAgIHBhdXNlZEluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnMpIHsgcmV0dXJuIGlucy5wbGF5KCk7IH0pO1xuICB9XG59XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKTtcbn1cblxuLy8gUHVibGljIEluc3RhbmNlXG5cbmZ1bmN0aW9uIGFuaW1lKHBhcmFtcykge1xuICBpZiAoIHBhcmFtcyA9PT0gdm9pZCAwICkgcGFyYW1zID0ge307XG5cblxuICB2YXIgc3RhcnRUaW1lID0gMCwgbGFzdFRpbWUgPSAwLCBub3cgPSAwO1xuICB2YXIgY2hpbGRyZW4sIGNoaWxkcmVuTGVuZ3RoID0gMDtcbiAgdmFyIHJlc29sdmUgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIG1ha2VQcm9taXNlKGluc3RhbmNlKSB7XG4gICAgdmFyIHByb21pc2UgPSB3aW5kb3cuUHJvbWlzZSAmJiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoX3Jlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUgPSBfcmVzb2x2ZTsgfSk7XG4gICAgaW5zdGFuY2UuZmluaXNoZWQgPSBwcm9taXNlO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgdmFyIGluc3RhbmNlID0gY3JlYXRlTmV3SW5zdGFuY2UocGFyYW1zKTtcbiAgdmFyIHByb21pc2UgPSBtYWtlUHJvbWlzZShpbnN0YW5jZSk7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IGluc3RhbmNlLmRpcmVjdGlvbjtcbiAgICBpZiAoZGlyZWN0aW9uICE9PSAnYWx0ZXJuYXRlJykge1xuICAgICAgaW5zdGFuY2UuZGlyZWN0aW9uID0gZGlyZWN0aW9uICE9PSAnbm9ybWFsJyA/ICdub3JtYWwnIDogJ3JldmVyc2UnO1xuICAgIH1cbiAgICBpbnN0YW5jZS5yZXZlcnNlZCA9ICFpbnN0YW5jZS5yZXZlcnNlZDtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gY2hpbGQucmV2ZXJzZWQgPSBpbnN0YW5jZS5yZXZlcnNlZDsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGp1c3RUaW1lKHRpbWUpIHtcbiAgICByZXR1cm4gaW5zdGFuY2UucmV2ZXJzZWQgPyBpbnN0YW5jZS5kdXJhdGlvbiAtIHRpbWUgOiB0aW1lO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUaW1lKCkge1xuICAgIHN0YXJ0VGltZSA9IDA7XG4gICAgbGFzdFRpbWUgPSBhZGp1c3RUaW1lKGluc3RhbmNlLmN1cnJlbnRUaW1lKSAqICgxIC8gYW5pbWUuc3BlZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2Vla0NoaWxkKHRpbWUsIGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkKSB7IGNoaWxkLnNlZWsodGltZSAtIGNoaWxkLnRpbWVsaW5lT2Zmc2V0KTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3luY0luc3RhbmNlQ2hpbGRyZW4odGltZSkge1xuICAgIGlmICghaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHsgc2Vla0NoaWxkKHRpbWUsIGNoaWxkcmVuW2ldKTsgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpJDEgPSBjaGlsZHJlbkxlbmd0aDsgaSQxLS07KSB7IHNlZWtDaGlsZCh0aW1lLCBjaGlsZHJlbltpJDFdKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNUaW1lKSB7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBhbmltYXRpb25zID0gaW5zdGFuY2UuYW5pbWF0aW9ucztcbiAgICB2YXIgYW5pbWF0aW9uc0xlbmd0aCA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgYW5pbWF0aW9uc0xlbmd0aCkge1xuICAgICAgdmFyIGFuaW0gPSBhbmltYXRpb25zW2ldO1xuICAgICAgdmFyIGFuaW1hdGFibGUgPSBhbmltLmFuaW1hdGFibGU7XG4gICAgICB2YXIgdHdlZW5zID0gYW5pbS50d2VlbnM7XG4gICAgICB2YXIgdHdlZW5MZW5ndGggPSB0d2VlbnMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciB0d2VlbiA9IHR3ZWVuc1t0d2Vlbkxlbmd0aF07XG4gICAgICAvLyBPbmx5IGNoZWNrIGZvciBrZXlmcmFtZXMgaWYgdGhlcmUgaXMgbW9yZSB0aGFuIG9uZSB0d2VlblxuICAgICAgaWYgKHR3ZWVuTGVuZ3RoKSB7IHR3ZWVuID0gZmlsdGVyQXJyYXkodHdlZW5zLCBmdW5jdGlvbiAodCkgeyByZXR1cm4gKGluc1RpbWUgPCB0LmVuZCk7IH0pWzBdIHx8IHR3ZWVuOyB9XG4gICAgICB2YXIgZWxhcHNlZCA9IG1pbk1heChpbnNUaW1lIC0gdHdlZW4uc3RhcnQgLSB0d2Vlbi5kZWxheSwgMCwgdHdlZW4uZHVyYXRpb24pIC8gdHdlZW4uZHVyYXRpb247XG4gICAgICB2YXIgZWFzZWQgPSBpc05hTihlbGFwc2VkKSA/IDEgOiB0d2Vlbi5lYXNpbmcoZWxhcHNlZCk7XG4gICAgICB2YXIgc3RyaW5ncyA9IHR3ZWVuLnRvLnN0cmluZ3M7XG4gICAgICB2YXIgcm91bmQgPSB0d2Vlbi5yb3VuZDtcbiAgICAgIHZhciBudW1iZXJzID0gW107XG4gICAgICB2YXIgdG9OdW1iZXJzTGVuZ3RoID0gdHdlZW4udG8ubnVtYmVycy5sZW5ndGg7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAodm9pZCAwKTtcbiAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdG9OdW1iZXJzTGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gKHZvaWQgMCk7XG4gICAgICAgIHZhciB0b051bWJlciA9IHR3ZWVuLnRvLm51bWJlcnNbbl07XG4gICAgICAgIHZhciBmcm9tTnVtYmVyID0gdHdlZW4uZnJvbS5udW1iZXJzW25dIHx8IDA7XG4gICAgICAgIGlmICghdHdlZW4uaXNQYXRoKSB7XG4gICAgICAgICAgdmFsdWUgPSBmcm9tTnVtYmVyICsgKGVhc2VkICogKHRvTnVtYmVyIC0gZnJvbU51bWJlcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gZ2V0UGF0aFByb2dyZXNzKHR3ZWVuLnZhbHVlLCBlYXNlZCAqIHRvTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm91bmQpIHtcbiAgICAgICAgICBpZiAoISh0d2Vlbi5pc0NvbG9yICYmIG4gPiAyKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICogcm91bmQpIC8gcm91bmQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG51bWJlcnMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICAvLyBNYW51YWwgQXJyYXkucmVkdWNlIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VzXG4gICAgICB2YXIgc3RyaW5nc0xlbmd0aCA9IHN0cmluZ3MubGVuZ3RoO1xuICAgICAgaWYgKCFzdHJpbmdzTGVuZ3RoKSB7XG4gICAgICAgIHByb2dyZXNzID0gbnVtYmVyc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2dyZXNzID0gc3RyaW5nc1swXTtcbiAgICAgICAgZm9yICh2YXIgcyA9IDA7IHMgPCBzdHJpbmdzTGVuZ3RoOyBzKyspIHtcbiAgICAgICAgICB2YXIgYSA9IHN0cmluZ3Nbc107XG4gICAgICAgICAgdmFyIGIgPSBzdHJpbmdzW3MgKyAxXTtcbiAgICAgICAgICB2YXIgbiQxID0gbnVtYmVyc1tzXTtcbiAgICAgICAgICBpZiAoIWlzTmFOKG4kMSkpIHtcbiAgICAgICAgICAgIGlmICghYikge1xuICAgICAgICAgICAgICBwcm9ncmVzcyArPSBuJDEgKyAnICc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwcm9ncmVzcyArPSBuJDEgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2V0UHJvZ3Jlc3NWYWx1ZVthbmltLnR5cGVdKGFuaW1hdGFibGUudGFyZ2V0LCBhbmltLnByb3BlcnR5LCBwcm9ncmVzcywgYW5pbWF0YWJsZS50cmFuc2Zvcm1zKTtcbiAgICAgIGFuaW0uY3VycmVudFZhbHVlID0gcHJvZ3Jlc3M7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0Q2FsbGJhY2soY2IpIHtcbiAgICBpZiAoaW5zdGFuY2VbY2JdICYmICFpbnN0YW5jZS5wYXNzVGhyb3VnaCkgeyBpbnN0YW5jZVtjYl0oaW5zdGFuY2UpOyB9XG4gIH1cblxuICBmdW5jdGlvbiBjb3VudEl0ZXJhdGlvbigpIHtcbiAgICBpZiAoaW5zdGFuY2UucmVtYWluaW5nICYmIGluc3RhbmNlLnJlbWFpbmluZyAhPT0gdHJ1ZSkge1xuICAgICAgaW5zdGFuY2UucmVtYWluaW5nLS07XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW5zdGFuY2VQcm9ncmVzcyhlbmdpbmVUaW1lKSB7XG4gICAgdmFyIGluc0R1cmF0aW9uID0gaW5zdGFuY2UuZHVyYXRpb247XG4gICAgdmFyIGluc0RlbGF5ID0gaW5zdGFuY2UuZGVsYXk7XG4gICAgdmFyIGluc0VuZERlbGF5ID0gaW5zRHVyYXRpb24gLSBpbnN0YW5jZS5lbmREZWxheTtcbiAgICB2YXIgaW5zVGltZSA9IGFkanVzdFRpbWUoZW5naW5lVGltZSk7XG4gICAgaW5zdGFuY2UucHJvZ3Jlc3MgPSBtaW5NYXgoKGluc1RpbWUgLyBpbnNEdXJhdGlvbikgKiAxMDAsIDAsIDEwMCk7XG4gICAgaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrID0gaW5zVGltZSA8IGluc3RhbmNlLmN1cnJlbnRUaW1lO1xuICAgIGlmIChjaGlsZHJlbikgeyBzeW5jSW5zdGFuY2VDaGlsZHJlbihpbnNUaW1lKTsgfVxuICAgIGlmICghaW5zdGFuY2UuYmVnYW4gJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICBpbnN0YW5jZS5iZWdhbiA9IHRydWU7XG4gICAgICBzZXRDYWxsYmFjaygnYmVnaW4nKTtcbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZS5sb29wQmVnYW4gJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgPiAwKSB7XG4gICAgICBpbnN0YW5jZS5sb29wQmVnYW4gPSB0cnVlO1xuICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BCZWdpbicpO1xuICAgIH1cbiAgICBpZiAoaW5zVGltZSA8PSBpbnNEZWxheSAmJiBpbnN0YW5jZS5jdXJyZW50VGltZSAhPT0gMCkge1xuICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKDApO1xuICAgIH1cbiAgICBpZiAoKGluc1RpbWUgPj0gaW5zRW5kRGVsYXkgJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgIT09IGluc0R1cmF0aW9uKSB8fCAhaW5zRHVyYXRpb24pIHtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNEdXJhdGlvbik7XG4gICAgfVxuICAgIGlmIChpbnNUaW1lID4gaW5zRGVsYXkgJiYgaW5zVGltZSA8IGluc0VuZERlbGF5KSB7XG4gICAgICBpZiAoIWluc3RhbmNlLmNoYW5nZUJlZ2FuKSB7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2VCZWdpbicpO1xuICAgICAgfVxuICAgICAgc2V0Q2FsbGJhY2soJ2NoYW5nZScpO1xuICAgICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKGluc1RpbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaW5zdGFuY2UuY2hhbmdlQmVnYW4pIHtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgaW5zdGFuY2UuY2hhbmdlQmVnYW4gPSBmYWxzZTtcbiAgICAgICAgc2V0Q2FsbGJhY2soJ2NoYW5nZUNvbXBsZXRlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lID0gbWluTWF4KGluc1RpbWUsIDAsIGluc0R1cmF0aW9uKTtcbiAgICBpZiAoaW5zdGFuY2UuYmVnYW4pIHsgc2V0Q2FsbGJhY2soJ3VwZGF0ZScpOyB9XG4gICAgaWYgKGVuZ2luZVRpbWUgPj0gaW5zRHVyYXRpb24pIHtcbiAgICAgIGxhc3RUaW1lID0gMDtcbiAgICAgIGNvdW50SXRlcmF0aW9uKCk7XG4gICAgICBpZiAoIWluc3RhbmNlLnJlbWFpbmluZykge1xuICAgICAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIWluc3RhbmNlLmNvbXBsZXRlZCkge1xuICAgICAgICAgIGluc3RhbmNlLmNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BDb21wbGV0ZScpO1xuICAgICAgICAgIHNldENhbGxiYWNrKCdjb21wbGV0ZScpO1xuICAgICAgICAgIGlmICghaW5zdGFuY2UucGFzc1Rocm91Z2ggJiYgJ1Byb21pc2UnIGluIHdpbmRvdykge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgcHJvbWlzZSA9IG1ha2VQcm9taXNlKGluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IG5vdztcbiAgICAgICAgc2V0Q2FsbGJhY2soJ2xvb3BDb21wbGV0ZScpO1xuICAgICAgICBpbnN0YW5jZS5sb29wQmVnYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKGluc3RhbmNlLmRpcmVjdGlvbiA9PT0gJ2FsdGVybmF0ZScpIHtcbiAgICAgICAgICB0b2dnbGVJbnN0YW5jZURpcmVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5zdGFuY2UucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGlyZWN0aW9uID0gaW5zdGFuY2UuZGlyZWN0aW9uO1xuICAgIGluc3RhbmNlLnBhc3NUaHJvdWdoID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY3VycmVudFRpbWUgPSAwO1xuICAgIGluc3RhbmNlLnByb2dyZXNzID0gMDtcbiAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgIGluc3RhbmNlLmJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY2hhbmdlQmVnYW4gPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5jb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5jaGFuZ2VDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5yZXZlcnNlUGxheWJhY2sgPSBmYWxzZTtcbiAgICBpbnN0YW5jZS5yZXZlcnNlZCA9IGRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnO1xuICAgIGluc3RhbmNlLnJlbWFpbmluZyA9IGluc3RhbmNlLmxvb3A7XG4gICAgY2hpbGRyZW4gPSBpbnN0YW5jZS5jaGlsZHJlbjtcbiAgICBjaGlsZHJlbkxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gY2hpbGRyZW5MZW5ndGg7IGktLTspIHsgaW5zdGFuY2UuY2hpbGRyZW5baV0ucmVzZXQoKTsgfVxuICAgIGlmIChpbnN0YW5jZS5yZXZlcnNlZCAmJiBpbnN0YW5jZS5sb29wICE9PSB0cnVlIHx8IChkaXJlY3Rpb24gPT09ICdhbHRlcm5hdGUnICYmIGluc3RhbmNlLmxvb3AgPT09IDEpKSB7IGluc3RhbmNlLnJlbWFpbmluZysrOyB9XG4gICAgc2V0QW5pbWF0aW9uc1Byb2dyZXNzKGluc3RhbmNlLnJldmVyc2VkID8gaW5zdGFuY2UuZHVyYXRpb24gOiAwKTtcbiAgfTtcblxuICAvLyBTZXQgVmFsdWUgaGVscGVyXG5cbiAgaW5zdGFuY2Uuc2V0ID0gZnVuY3Rpb24odGFyZ2V0cywgcHJvcGVydGllcykge1xuICAgIHNldFRhcmdldHNWYWx1ZSh0YXJnZXRzLCBwcm9wZXJ0aWVzKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgaW5zdGFuY2UudGljayA9IGZ1bmN0aW9uKHQpIHtcbiAgICBub3cgPSB0O1xuICAgIGlmICghc3RhcnRUaW1lKSB7IHN0YXJ0VGltZSA9IG5vdzsgfVxuICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoKG5vdyArIChsYXN0VGltZSAtIHN0YXJ0VGltZSkpICogYW5pbWUuc3BlZWQpO1xuICB9O1xuXG4gIGluc3RhbmNlLnNlZWsgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgc2V0SW5zdGFuY2VQcm9ncmVzcyhhZGp1c3RUaW1lKHRpbWUpKTtcbiAgfTtcblxuICBpbnN0YW5jZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIGluc3RhbmNlLnBhdXNlZCA9IHRydWU7XG4gICAgcmVzZXRUaW1lKCk7XG4gIH07XG5cbiAgaW5zdGFuY2UucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghaW5zdGFuY2UucGF1c2VkKSB7IHJldHVybjsgfVxuICAgIGlmIChpbnN0YW5jZS5jb21wbGV0ZWQpIHsgaW5zdGFuY2UucmVzZXQoKTsgfVxuICAgIGluc3RhbmNlLnBhdXNlZCA9IGZhbHNlO1xuICAgIGFjdGl2ZUluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcbiAgICByZXNldFRpbWUoKTtcbiAgICBpZiAoIXJhZikgeyBlbmdpbmUoKTsgfVxuICB9O1xuXG4gIGluc3RhbmNlLnJldmVyc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0b2dnbGVJbnN0YW5jZURpcmVjdGlvbigpO1xuICAgIHJlc2V0VGltZSgpO1xuICB9O1xuXG4gIGluc3RhbmNlLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBpbnN0YW5jZS5yZXNldCgpO1xuICAgIGluc3RhbmNlLnBsYXkoKTtcbiAgfTtcblxuICBpbnN0YW5jZS5yZXNldCgpO1xuXG4gIGlmIChpbnN0YW5jZS5hdXRvcGxheSkgeyBpbnN0YW5jZS5wbGF5KCk7IH1cblxuICByZXR1cm4gaW5zdGFuY2U7XG5cbn1cblxuLy8gUmVtb3ZlIHRhcmdldHMgZnJvbSBhbmltYXRpb25cblxuZnVuY3Rpb24gcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgYW5pbWF0aW9ucykge1xuICBmb3IgKHZhciBhID0gYW5pbWF0aW9ucy5sZW5ndGg7IGEtLTspIHtcbiAgICBpZiAoYXJyYXlDb250YWlucyh0YXJnZXRzQXJyYXksIGFuaW1hdGlvbnNbYV0uYW5pbWF0YWJsZS50YXJnZXQpKSB7XG4gICAgICBhbmltYXRpb25zLnNwbGljZShhLCAxKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlVGFyZ2V0cyh0YXJnZXRzKSB7XG4gIHZhciB0YXJnZXRzQXJyYXkgPSBwYXJzZVRhcmdldHModGFyZ2V0cyk7XG4gIGZvciAodmFyIGkgPSBhY3RpdmVJbnN0YW5jZXMubGVuZ3RoOyBpLS07KSB7XG4gICAgdmFyIGluc3RhbmNlID0gYWN0aXZlSW5zdGFuY2VzW2ldO1xuICAgIHZhciBhbmltYXRpb25zID0gaW5zdGFuY2UuYW5pbWF0aW9ucztcbiAgICB2YXIgY2hpbGRyZW4gPSBpbnN0YW5jZS5jaGlsZHJlbjtcbiAgICByZW1vdmVUYXJnZXRzRnJvbUFuaW1hdGlvbnModGFyZ2V0c0FycmF5LCBhbmltYXRpb25zKTtcbiAgICBmb3IgKHZhciBjID0gY2hpbGRyZW4ubGVuZ3RoOyBjLS07KSB7XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltjXTtcbiAgICAgIHZhciBjaGlsZEFuaW1hdGlvbnMgPSBjaGlsZC5hbmltYXRpb25zO1xuICAgICAgcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgY2hpbGRBbmltYXRpb25zKTtcbiAgICAgIGlmICghY2hpbGRBbmltYXRpb25zLmxlbmd0aCAmJiAhY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7IGNoaWxkcmVuLnNwbGljZShjLCAxKTsgfVxuICAgIH1cbiAgICBpZiAoIWFuaW1hdGlvbnMubGVuZ3RoICYmICFjaGlsZHJlbi5sZW5ndGgpIHsgaW5zdGFuY2UucGF1c2UoKTsgfVxuICB9XG59XG5cbi8vIFN0YWdnZXIgaGVscGVyc1xuXG5mdW5jdGlvbiBzdGFnZ2VyKHZhbCwgcGFyYW1zKSB7XG4gIGlmICggcGFyYW1zID09PSB2b2lkIDAgKSBwYXJhbXMgPSB7fTtcblxuICB2YXIgZGlyZWN0aW9uID0gcGFyYW1zLmRpcmVjdGlvbiB8fCAnbm9ybWFsJztcbiAgdmFyIGVhc2luZyA9IHBhcmFtcy5lYXNpbmcgPyBwYXJzZUVhc2luZ3MocGFyYW1zLmVhc2luZykgOiBudWxsO1xuICB2YXIgZ3JpZCA9IHBhcmFtcy5ncmlkO1xuICB2YXIgYXhpcyA9IHBhcmFtcy5heGlzO1xuICB2YXIgZnJvbUluZGV4ID0gcGFyYW1zLmZyb20gfHwgMDtcbiAgdmFyIGZyb21GaXJzdCA9IGZyb21JbmRleCA9PT0gJ2ZpcnN0JztcbiAgdmFyIGZyb21DZW50ZXIgPSBmcm9tSW5kZXggPT09ICdjZW50ZXInO1xuICB2YXIgZnJvbUxhc3QgPSBmcm9tSW5kZXggPT09ICdsYXN0JztcbiAgdmFyIGlzUmFuZ2UgPSBpcy5hcnIodmFsKTtcbiAgdmFyIHZhbDEgPSBpc1JhbmdlID8gcGFyc2VGbG9hdCh2YWxbMF0pIDogcGFyc2VGbG9hdCh2YWwpO1xuICB2YXIgdmFsMiA9IGlzUmFuZ2UgPyBwYXJzZUZsb2F0KHZhbFsxXSkgOiAwO1xuICB2YXIgdW5pdCA9IGdldFVuaXQoaXNSYW5nZSA/IHZhbFsxXSA6IHZhbCkgfHwgMDtcbiAgdmFyIHN0YXJ0ID0gcGFyYW1zLnN0YXJ0IHx8IDAgKyAoaXNSYW5nZSA/IHZhbDEgOiAwKTtcbiAgdmFyIHZhbHVlcyA9IFtdO1xuICB2YXIgbWF4VmFsdWUgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gKGVsLCBpLCB0KSB7XG4gICAgaWYgKGZyb21GaXJzdCkgeyBmcm9tSW5kZXggPSAwOyB9XG4gICAgaWYgKGZyb21DZW50ZXIpIHsgZnJvbUluZGV4ID0gKHQgLSAxKSAvIDI7IH1cbiAgICBpZiAoZnJvbUxhc3QpIHsgZnJvbUluZGV4ID0gdCAtIDE7IH1cbiAgICBpZiAoIXZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0OyBpbmRleCsrKSB7XG4gICAgICAgIGlmICghZ3JpZCkge1xuICAgICAgICAgIHZhbHVlcy5wdXNoKE1hdGguYWJzKGZyb21JbmRleCAtIGluZGV4KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGZyb21YID0gIWZyb21DZW50ZXIgPyBmcm9tSW5kZXglZ3JpZFswXSA6IChncmlkWzBdLTEpLzI7XG4gICAgICAgICAgdmFyIGZyb21ZID0gIWZyb21DZW50ZXIgPyBNYXRoLmZsb29yKGZyb21JbmRleC9ncmlkWzBdKSA6IChncmlkWzFdLTEpLzI7XG4gICAgICAgICAgdmFyIHRvWCA9IGluZGV4JWdyaWRbMF07XG4gICAgICAgICAgdmFyIHRvWSA9IE1hdGguZmxvb3IoaW5kZXgvZ3JpZFswXSk7XG4gICAgICAgICAgdmFyIGRpc3RhbmNlWCA9IGZyb21YIC0gdG9YO1xuICAgICAgICAgIHZhciBkaXN0YW5jZVkgPSBmcm9tWSAtIHRvWTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBNYXRoLnNxcnQoZGlzdGFuY2VYICogZGlzdGFuY2VYICsgZGlzdGFuY2VZICogZGlzdGFuY2VZKTtcbiAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7IHZhbHVlID0gLWRpc3RhbmNlWDsgfVxuICAgICAgICAgIGlmIChheGlzID09PSAneScpIHsgdmFsdWUgPSAtZGlzdGFuY2VZOyB9XG4gICAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIG1heFZhbHVlID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgdmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChlYXNpbmcpIHsgdmFsdWVzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBlYXNpbmcodmFsIC8gbWF4VmFsdWUpICogbWF4VmFsdWU7IH0pOyB9XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAncmV2ZXJzZScpIHsgdmFsdWVzID0gdmFsdWVzLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBheGlzID8gKHZhbCA8IDApID8gdmFsICogLTEgOiAtdmFsIDogTWF0aC5hYnMobWF4VmFsdWUgLSB2YWwpOyB9KTsgfVxuICAgIH1cbiAgICB2YXIgc3BhY2luZyA9IGlzUmFuZ2UgPyAodmFsMiAtIHZhbDEpIC8gbWF4VmFsdWUgOiB2YWwxO1xuICAgIHJldHVybiBzdGFydCArIChzcGFjaW5nICogKE1hdGgucm91bmQodmFsdWVzW2ldICogMTAwKSAvIDEwMCkpICsgdW5pdDtcbiAgfVxufVxuXG4vLyBUaW1lbGluZVxuXG5mdW5jdGlvbiB0aW1lbGluZShwYXJhbXMpIHtcbiAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IHt9O1xuXG4gIHZhciB0bCA9IGFuaW1lKHBhcmFtcyk7XG4gIHRsLmR1cmF0aW9uID0gMDtcbiAgdGwuYWRkID0gZnVuY3Rpb24oaW5zdGFuY2VQYXJhbXMsIHRpbWVsaW5lT2Zmc2V0KSB7XG4gICAgdmFyIHRsSW5kZXggPSBhY3RpdmVJbnN0YW5jZXMuaW5kZXhPZih0bCk7XG4gICAgdmFyIGNoaWxkcmVuID0gdGwuY2hpbGRyZW47XG4gICAgaWYgKHRsSW5kZXggPiAtMSkgeyBhY3RpdmVJbnN0YW5jZXMuc3BsaWNlKHRsSW5kZXgsIDEpOyB9XG4gICAgZnVuY3Rpb24gcGFzc1Rocm91Z2goaW5zKSB7IGlucy5wYXNzVGhyb3VnaCA9IHRydWU7IH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7IHBhc3NUaHJvdWdoKGNoaWxkcmVuW2ldKTsgfVxuICAgIHZhciBpbnNQYXJhbXMgPSBtZXJnZU9iamVjdHMoaW5zdGFuY2VQYXJhbXMsIHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0VHdlZW5TZXR0aW5ncywgcGFyYW1zKSk7XG4gICAgaW5zUGFyYW1zLnRhcmdldHMgPSBpbnNQYXJhbXMudGFyZ2V0cyB8fCBwYXJhbXMudGFyZ2V0cztcbiAgICB2YXIgdGxEdXJhdGlvbiA9IHRsLmR1cmF0aW9uO1xuICAgIGluc1BhcmFtcy5hdXRvcGxheSA9IGZhbHNlO1xuICAgIGluc1BhcmFtcy5kaXJlY3Rpb24gPSB0bC5kaXJlY3Rpb247XG4gICAgaW5zUGFyYW1zLnRpbWVsaW5lT2Zmc2V0ID0gaXMudW5kKHRpbWVsaW5lT2Zmc2V0KSA/IHRsRHVyYXRpb24gOiBnZXRSZWxhdGl2ZVZhbHVlKHRpbWVsaW5lT2Zmc2V0LCB0bER1cmF0aW9uKTtcbiAgICBwYXNzVGhyb3VnaCh0bCk7XG4gICAgdGwuc2VlayhpbnNQYXJhbXMudGltZWxpbmVPZmZzZXQpO1xuICAgIHZhciBpbnMgPSBhbmltZShpbnNQYXJhbXMpO1xuICAgIHBhc3NUaHJvdWdoKGlucyk7XG4gICAgY2hpbGRyZW4ucHVzaChpbnMpO1xuICAgIHZhciB0aW1pbmdzID0gZ2V0SW5zdGFuY2VUaW1pbmdzKGNoaWxkcmVuLCBwYXJhbXMpO1xuICAgIHRsLmRlbGF5ID0gdGltaW5ncy5kZWxheTtcbiAgICB0bC5lbmREZWxheSA9IHRpbWluZ3MuZW5kRGVsYXk7XG4gICAgdGwuZHVyYXRpb24gPSB0aW1pbmdzLmR1cmF0aW9uO1xuICAgIHRsLnNlZWsoMCk7XG4gICAgdGwucmVzZXQoKTtcbiAgICBpZiAodGwuYXV0b3BsYXkpIHsgdGwucGxheSgpOyB9XG4gICAgcmV0dXJuIHRsO1xuICB9O1xuICByZXR1cm4gdGw7XG59XG5cbmFuaW1lLnZlcnNpb24gPSAnMy4xLjAnO1xuYW5pbWUuc3BlZWQgPSAxO1xuYW5pbWUucnVubmluZyA9IGFjdGl2ZUluc3RhbmNlcztcbmFuaW1lLnJlbW92ZSA9IHJlbW92ZVRhcmdldHM7XG5hbmltZS5nZXQgPSBnZXRPcmlnaW5hbFRhcmdldFZhbHVlO1xuYW5pbWUuc2V0ID0gc2V0VGFyZ2V0c1ZhbHVlO1xuYW5pbWUuY29udmVydFB4ID0gY29udmVydFB4VG9Vbml0O1xuYW5pbWUucGF0aCA9IGdldFBhdGg7XG5hbmltZS5zZXREYXNob2Zmc2V0ID0gc2V0RGFzaG9mZnNldDtcbmFuaW1lLnN0YWdnZXIgPSBzdGFnZ2VyO1xuYW5pbWUudGltZWxpbmUgPSB0aW1lbGluZTtcbmFuaW1lLmVhc2luZyA9IHBhcnNlRWFzaW5ncztcbmFuaW1lLnBlbm5lciA9IHBlbm5lcjtcbmFuaW1lLnJhbmRvbSA9IGZ1bmN0aW9uIChtaW4sIG1heCkgeyByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjsgfTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWU7XG4iLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsIi8qISBAbmFtZSBtM3U4LXBhcnNlciBAdmVyc2lvbiA0LjQuMCBAbGljZW5zZSBBcGFjaGUtMi4wICovXG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbi8qKlxuICogQGZpbGUgc3RyZWFtLmpzXG4gKi9cblxuLyoqXG4gKiBBIGxpZ2h0d2VpZ2h0IHJlYWRhYmxlIHN0cmVhbSBpbXBsZW1lbnRhdGlvbiB0aGF0IGhhbmRsZXMgZXZlbnQgZGlzcGF0Y2hpbmcuXG4gKlxuICogQGNsYXNzIFN0cmVhbVxuICovXG52YXIgU3RyZWFtID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3RyZWFtKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIHNwZWNpZmllZCBldmVudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciB0aGUgY2FsbGJhY2sgdG8gYmUgaW52b2tlZCB3aGVuIGFuIGV2ZW50IG9mXG4gICAqIHRoZSBzcGVjaWZpZWQgdHlwZSBvY2N1cnNcbiAgICovXG5cblxuICB2YXIgX3Byb3RvID0gU3RyZWFtLnByb3RvdHlwZTtcblxuICBfcHJvdG8ub24gPSBmdW5jdGlvbiBvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbdHlwZV0pIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGxpc3RlbmVyIGZvciBhIHNwZWNpZmllZCBldmVudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSB0aGUgZXZlbnQgbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciAgYSBmdW5jdGlvbiBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgZm9yIHRoaXNcbiAgICogdHlwZSBvZiBldmVudCB0aHJvdWdoIGBvbmBcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gaWYgd2UgY291bGQgdHVybiBpdCBvZmYgb3Igbm90XG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLm9mZiA9IGZ1bmN0aW9uIG9mZih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbdHlwZV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiBpbmRleCA+IC0xO1xuICB9XG4gIC8qKlxuICAgKiBUcmlnZ2VyIGFuIGV2ZW50IG9mIHRoZSBzcGVjaWZpZWQgdHlwZSBvbiB0aGlzIHN0cmVhbS4gQW55IGFkZGl0aW9uYWxcbiAgICogYXJndW1lbnRzIHRvIHRoaXMgZnVuY3Rpb24gYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzIHRvIGV2ZW50IGxpc3RlbmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIGV2ZW50IG5hbWVcbiAgICovXG4gIDtcblxuICBfcHJvdG8udHJpZ2dlciA9IGZ1bmN0aW9uIHRyaWdnZXIodHlwZSkge1xuICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICB2YXIgaTtcbiAgICB2YXIgbGVuZ3RoO1xuICAgIHZhciBhcmdzO1xuXG4gICAgaWYgKCFjYWxsYmFja3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFNsaWNpbmcgdGhlIGFyZ3VtZW50cyBvbiBldmVyeSBpbnZvY2F0aW9uIG9mIHRoaXMgbWV0aG9kXG4gICAgLy8gY2FuIGFkZCBhIHNpZ25pZmljYW50IGFtb3VudCBvZiBvdmVyaGVhZC4gQXZvaWQgdGhlXG4gICAgLy8gaW50ZXJtZWRpYXRlIG9iamVjdCBjcmVhdGlvbiBmb3IgdGhlIGNvbW1vbiBjYXNlIG9mIGFcbiAgICAvLyBzaW5nbGUgY2FsbGJhY2sgYXJndW1lbnRcblxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxlbmd0aCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICBjYWxsYmFja3NbaV0uY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGxlbmd0aCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBEZXN0cm95cyB0aGUgc3RyZWFtIGFuZCBjbGVhbnMgdXAuXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH1cbiAgLyoqXG4gICAqIEZvcndhcmRzIGFsbCBgZGF0YWAgZXZlbnRzIG9uIHRoaXMgc3RyZWFtIHRvIHRoZSBkZXN0aW5hdGlvbiBzdHJlYW0uIFRoZVxuICAgKiBkZXN0aW5hdGlvbiBzdHJlYW0gc2hvdWxkIHByb3ZpZGUgYSBtZXRob2QgYHB1c2hgIHRvIHJlY2VpdmUgdGhlIGRhdGFcbiAgICogZXZlbnRzIGFzIHRoZXkgYXJyaXZlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmVhbX0gZGVzdGluYXRpb24gdGhlIHN0cmVhbSB0aGF0IHdpbGwgcmVjZWl2ZSBhbGwgYGRhdGFgIGV2ZW50c1xuICAgKiBAc2VlIGh0dHA6Ly9ub2RlanMub3JnL2FwaS9zdHJlYW0uaHRtbCNzdHJlYW1fcmVhZGFibGVfcGlwZV9kZXN0aW5hdGlvbl9vcHRpb25zXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLnBpcGUgPSBmdW5jdGlvbiBwaXBlKGRlc3RpbmF0aW9uKSB7XG4gICAgdGhpcy5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBkZXN0aW5hdGlvbi5wdXNoKGRhdGEpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBTdHJlYW07XG59KCk7XG5cbi8qKlxuICogQSBzdHJlYW0gdGhhdCBidWZmZXJzIHN0cmluZyBpbnB1dCBhbmQgZ2VuZXJhdGVzIGEgYGRhdGFgIGV2ZW50IGZvciBlYWNoXG4gKiBsaW5lLlxuICpcbiAqIEBjbGFzcyBMaW5lU3RyZWFtXG4gKiBAZXh0ZW5kcyBTdHJlYW1cbiAqL1xuXG52YXIgTGluZVN0cmVhbSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1N0cmVhbSkge1xuICBfaW5oZXJpdHNMb29zZShMaW5lU3RyZWFtLCBfU3RyZWFtKTtcblxuICBmdW5jdGlvbiBMaW5lU3RyZWFtKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1N0cmVhbS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMuYnVmZmVyID0gJyc7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgbmV3IGRhdGEgdG8gYmUgcGFyc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSB0aGUgdGV4dCB0byBwcm9jZXNzXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IExpbmVTdHJlYW0ucHJvdG90eXBlO1xuXG4gIF9wcm90by5wdXNoID0gZnVuY3Rpb24gcHVzaChkYXRhKSB7XG4gICAgdmFyIG5leHROZXdsaW5lO1xuICAgIHRoaXMuYnVmZmVyICs9IGRhdGE7XG4gICAgbmV4dE5ld2xpbmUgPSB0aGlzLmJ1ZmZlci5pbmRleE9mKCdcXG4nKTtcblxuICAgIGZvciAoOyBuZXh0TmV3bGluZSA+IC0xOyBuZXh0TmV3bGluZSA9IHRoaXMuYnVmZmVyLmluZGV4T2YoJ1xcbicpKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2RhdGEnLCB0aGlzLmJ1ZmZlci5zdWJzdHJpbmcoMCwgbmV4dE5ld2xpbmUpKTtcbiAgICAgIHRoaXMuYnVmZmVyID0gdGhpcy5idWZmZXIuc3Vic3RyaW5nKG5leHROZXdsaW5lICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBMaW5lU3RyZWFtO1xufShTdHJlYW0pO1xuXG4vKipcbiAqIFwiZm9yZ2l2aW5nXCIgYXR0cmlidXRlIGxpc3QgcHN1ZWRvLWdyYW1tYXI6XG4gKiBhdHRyaWJ1dGVzIC0+IGtleXZhbHVlICgnLCcga2V5dmFsdWUpKlxuICoga2V5dmFsdWUgICAtPiBrZXkgJz0nIHZhbHVlXG4gKiBrZXkgICAgICAgIC0+IFtePV0qXG4gKiB2YWx1ZSAgICAgIC0+ICdcIicgW15cIl0qICdcIicgfCBbXixdKlxuICovXG5cbnZhciBhdHRyaWJ1dGVTZXBhcmF0b3IgPSBmdW5jdGlvbiBhdHRyaWJ1dGVTZXBhcmF0b3IoKSB7XG4gIHZhciBrZXkgPSAnW149XSonO1xuICB2YXIgdmFsdWUgPSAnXCJbXlwiXSpcInxbXixdKic7XG4gIHZhciBrZXl2YWx1ZSA9ICcoPzonICsga2V5ICsgJyk9KD86JyArIHZhbHVlICsgJyknO1xuICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnwsKSgnICsga2V5dmFsdWUgKyAnKScpO1xufTtcbi8qKlxuICogUGFyc2UgYXR0cmlidXRlcyBmcm9tIGEgbGluZSBnaXZlbiB0aGUgc2VwYXJhdG9yXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZXMgdGhlIGF0dHJpYnV0ZSBsaW5lIHRvIHBhcnNlXG4gKi9cblxuXG52YXIgcGFyc2VBdHRyaWJ1dGVzID0gZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgLy8gc3BsaXQgdGhlIHN0cmluZyB1c2luZyBhdHRyaWJ1dGVzIGFzIHRoZSBzZXBhcmF0b3JcbiAgdmFyIGF0dHJzID0gYXR0cmlidXRlcy5zcGxpdChhdHRyaWJ1dGVTZXBhcmF0b3IoKSk7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGkgPSBhdHRycy5sZW5ndGg7XG4gIHZhciBhdHRyO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICAvLyBmaWx0ZXIgb3V0IHVubWF0Y2hlZCBwb3J0aW9ucyBvZiB0aGUgc3RyaW5nXG4gICAgaWYgKGF0dHJzW2ldID09PSAnJykge1xuICAgICAgY29udGludWU7XG4gICAgfSAvLyBzcGxpdCB0aGUga2V5IGFuZCB2YWx1ZVxuXG5cbiAgICBhdHRyID0gLyhbXj1dKik9KC4qKS8uZXhlYyhhdHRyc1tpXSkuc2xpY2UoMSk7IC8vIHRyaW0gd2hpdGVzcGFjZSBhbmQgcmVtb3ZlIG9wdGlvbmFsIHF1b3RlcyBhcm91bmQgdGhlIHZhbHVlXG5cbiAgICBhdHRyWzBdID0gYXR0clswXS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgYXR0clsxXSA9IGF0dHJbMV0ucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIGF0dHJbMV0gPSBhdHRyWzFdLnJlcGxhY2UoL15bJ1wiXSguKilbJ1wiXSQvZywgJyQxJyk7XG4gICAgcmVzdWx0W2F0dHJbMF1dID0gYXR0clsxXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuLyoqXG4gKiBBIGxpbmUtbGV2ZWwgTTNVOCBwYXJzZXIgZXZlbnQgc3RyZWFtLiBJdCBleHBlY3RzIHRvIHJlY2VpdmUgaW5wdXQgb25lXG4gKiBsaW5lIGF0IGEgdGltZSBhbmQgcGVyZm9ybXMgYSBjb250ZXh0LWZyZWUgcGFyc2Ugb2YgaXRzIGNvbnRlbnRzLiBBIHN0cmVhbVxuICogaW50ZXJwcmV0YXRpb24gb2YgYSBtYW5pZmVzdCBjYW4gYmUgdXNlZnVsIGlmIHRoZSBtYW5pZmVzdCBpcyBleHBlY3RlZCB0b1xuICogYmUgdG9vIGxhcmdlIHRvIGZpdCBjb21mb3J0YWJseSBpbnRvIG1lbW9yeSBvciB0aGUgZW50aXJldHkgb2YgdGhlIGlucHV0XG4gKiBpcyBub3QgaW1tZWRpYXRlbHkgYXZhaWxhYmxlLiBPdGhlcndpc2UsIGl0J3MgcHJvYmFibHkgbXVjaCBlYXNpZXIgdG8gd29ya1xuICogd2l0aCBhIHJlZ3VsYXIgYFBhcnNlcmAgb2JqZWN0LlxuICpcbiAqIFByb2R1Y2VzIGBkYXRhYCBldmVudHMgd2l0aCBhbiBvYmplY3QgdGhhdCBjYXB0dXJlcyB0aGUgcGFyc2VyJ3NcbiAqIGludGVycHJldGF0aW9uIG9mIHRoZSBpbnB1dC4gVGhhdCBvYmplY3QgaGFzIGEgcHJvcGVydHkgYHRhZ2AgdGhhdCBpcyBvbmVcbiAqIG9mIGB1cmlgLCBgY29tbWVudGAsIG9yIGB0YWdgLiBVUklzIG9ubHkgaGF2ZSBhIHNpbmdsZSBhZGRpdGlvbmFsXG4gKiBwcm9wZXJ0eSwgYGxpbmVgLCB3aGljaCBjYXB0dXJlcyB0aGUgZW50aXJldHkgb2YgdGhlIGlucHV0IHdpdGhvdXRcbiAqIGludGVycHJldGF0aW9uLiBDb21tZW50cyBzaW1pbGFybHkgaGF2ZSBhIHNpbmdsZSBhZGRpdGlvbmFsIHByb3BlcnR5XG4gKiBgdGV4dGAgd2hpY2ggaXMgdGhlIGlucHV0IHdpdGhvdXQgdGhlIGxlYWRpbmcgYCNgLlxuICpcbiAqIFRhZ3MgYWx3YXlzIGhhdmUgYSBwcm9wZXJ0eSBgdGFnVHlwZWAgd2hpY2ggaXMgdGhlIGxvd2VyLWNhc2VkIHZlcnNpb24gb2ZcbiAqIHRoZSBNM1U4IGRpcmVjdGl2ZSB3aXRob3V0IHRoZSBgI0VYVGAgb3IgYCNFWFQtWC1gIHByZWZpeC4gRm9yIGluc3RhbmNlLFxuICogYCNFWFQtWC1NRURJQS1TRVFVRU5DRWAgYmVjb21lcyBgbWVkaWEtc2VxdWVuY2VgIHdoZW4gcGFyc2VkLiBVbnJlY29nbml6ZWRcbiAqIHRhZ3MgYXJlIGdpdmVuIHRoZSB0YWcgdHlwZSBgdW5rbm93bmAgYW5kIGEgc2luZ2xlIGFkZGl0aW9uYWwgcHJvcGVydHlcbiAqIGBkYXRhYCB3aXRoIHRoZSByZW1haW5kZXIgb2YgdGhlIGlucHV0LlxuICpcbiAqIEBjbGFzcyBQYXJzZVN0cmVhbVxuICogQGV4dGVuZHMgU3RyZWFtXG4gKi9cblxuXG52YXIgUGFyc2VTdHJlYW0gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9TdHJlYW0pIHtcbiAgX2luaGVyaXRzTG9vc2UoUGFyc2VTdHJlYW0sIF9TdHJlYW0pO1xuXG4gIGZ1bmN0aW9uIFBhcnNlU3RyZWFtKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1N0cmVhbS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMuY3VzdG9tUGFyc2VycyA9IFtdO1xuICAgIF90aGlzLnRhZ01hcHBlcnMgPSBbXTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXG4gICAqIFBhcnNlcyBhbiBhZGRpdGlvbmFsIGxpbmUgb2YgaW5wdXQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lIGEgc2luZ2xlIGxpbmUgb2YgYW4gTTNVOCBmaWxlIHRvIHBhcnNlXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IFBhcnNlU3RyZWFtLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucHVzaCA9IGZ1bmN0aW9uIHB1c2gobGluZSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgdmFyIG1hdGNoO1xuICAgIHZhciBldmVudDsgLy8gc3RyaXAgd2hpdGVzcGFjZVxuXG4gICAgbGluZSA9IGxpbmUudHJpbSgpO1xuXG4gICAgaWYgKGxpbmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBpZ25vcmUgZW1wdHkgbGluZXNcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIFVSSXNcblxuXG4gICAgaWYgKGxpbmVbMF0gIT09ICcjJykge1xuICAgICAgdGhpcy50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICB0eXBlOiAndXJpJyxcbiAgICAgICAgdXJpOiBsaW5lXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIG1hcCB0YWdzXG5cblxuICAgIHZhciBuZXdMaW5lcyA9IHRoaXMudGFnTWFwcGVycy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgbWFwcGVyKSB7XG4gICAgICB2YXIgbWFwcGVkTGluZSA9IG1hcHBlcihsaW5lKTsgLy8gc2tpcCBpZiB1bmNoYW5nZWRcblxuICAgICAgaWYgKG1hcHBlZExpbmUgPT09IGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW21hcHBlZExpbmVdKTtcbiAgICB9LCBbbGluZV0pO1xuICAgIG5ld0xpbmVzLmZvckVhY2goZnVuY3Rpb24gKG5ld0xpbmUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMyLmN1c3RvbVBhcnNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKF90aGlzMi5jdXN0b21QYXJzZXJzW2ldLmNhbGwoX3RoaXMyLCBuZXdMaW5lKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSAvLyBDb21tZW50c1xuXG5cbiAgICAgIGlmIChuZXdMaW5lLmluZGV4T2YoJyNFWFQnKSAhPT0gMCkge1xuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIHtcbiAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICAgICAgdGV4dDogbmV3TGluZS5zbGljZSgxKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIHN0cmlwIG9mZiBhbnkgY2FycmlhZ2UgcmV0dXJucyBoZXJlIHNvIHRoZSByZWdleCBtYXRjaGluZ1xuICAgICAgLy8gZG9lc24ndCBoYXZlIHRvIGFjY291bnQgZm9yIHRoZW0uXG5cblxuICAgICAgbmV3TGluZSA9IG5ld0xpbmUucmVwbGFjZSgnXFxyJywgJycpOyAvLyBUYWdzXG5cbiAgICAgIG1hdGNoID0gL14jRVhUTTNVLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ20zdSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVElORjo/KFswLTlcXC5dKik/LD8oLiopPyQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnaW5mJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmR1cmF0aW9uID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICBldmVudC50aXRsZSA9IG1hdGNoWzJdO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLVRBUkdFVERVUkFUSU9OOj8oWzAtOS5dKik/Ly5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ3RhcmdldGR1cmF0aW9uJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmR1cmF0aW9uID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNaRU4tVE9UQUwtRFVSQVRJT046PyhbMC05Ll0qKT8vLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAndG90YWxkdXJhdGlvbidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5kdXJhdGlvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtVkVSU0lPTjo/KFswLTkuXSopPy8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICd2ZXJzaW9uJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LnZlcnNpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLU1FRElBLVNFUVVFTkNFOj8oXFwtP1swLTkuXSopPy8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdtZWRpYS1zZXF1ZW5jZSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5udW1iZXIgPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLURJU0NPTlRJTlVJVFktU0VRVUVOQ0U6PyhcXC0/WzAtOS5dKik/Ly5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2Rpc2NvbnRpbnVpdHktc2VxdWVuY2UnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQubnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1QTEFZTElTVC1UWVBFOj8oLiopPyQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAncGxheWxpc3QtdHlwZSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5wbGF5bGlzdFR5cGUgPSBtYXRjaFsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1CWVRFUkFOR0U6PyhbMC05Ll0qKT9APyhbMC05Ll0qKT8vLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnYnl0ZXJhbmdlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50Lmxlbmd0aCA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICBldmVudC5vZmZzZXQgPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLUFMTE9XLUNBQ0hFOj8oWUVTfE5PKT8vLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnYWxsb3ctY2FjaGUnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuYWxsb3dlZCA9ICEvTk8vLnRlc3QobWF0Y2hbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLU1BUDo/KC4qKSQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnbWFwJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIHZhciBhdHRyaWJ1dGVzID0gcGFyc2VBdHRyaWJ1dGVzKG1hdGNoWzFdKTtcblxuICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLlVSSSkge1xuICAgICAgICAgICAgZXZlbnQudXJpID0gYXR0cmlidXRlcy5VUkk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHJpYnV0ZXMuQllURVJBTkdFKSB7XG4gICAgICAgICAgICB2YXIgX2F0dHJpYnV0ZXMkQllURVJBTkdFID0gYXR0cmlidXRlcy5CWVRFUkFOR0Uuc3BsaXQoJ0AnKSxcbiAgICAgICAgICAgICAgICBsZW5ndGggPSBfYXR0cmlidXRlcyRCWVRFUkFOR0VbMF0sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gX2F0dHJpYnV0ZXMkQllURVJBTkdFWzFdO1xuXG4gICAgICAgICAgICBldmVudC5ieXRlcmFuZ2UgPSB7fTtcblxuICAgICAgICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICAgICAgICBldmVudC5ieXRlcmFuZ2UubGVuZ3RoID0gcGFyc2VJbnQobGVuZ3RoLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgICAgZXZlbnQuYnl0ZXJhbmdlLm9mZnNldCA9IHBhcnNlSW50KG9mZnNldCwgMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1TVFJFQU0tSU5GOj8oLiopJC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdzdHJlYW0taW5mJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMgPSBwYXJzZUF0dHJpYnV0ZXMobWF0Y2hbMV0pO1xuXG4gICAgICAgICAgaWYgKGV2ZW50LmF0dHJpYnV0ZXMuUkVTT0xVVElPTikge1xuICAgICAgICAgICAgdmFyIHNwbGl0ID0gZXZlbnQuYXR0cmlidXRlcy5SRVNPTFVUSU9OLnNwbGl0KCd4Jyk7XG4gICAgICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IHt9O1xuXG4gICAgICAgICAgICBpZiAoc3BsaXRbMF0pIHtcbiAgICAgICAgICAgICAgcmVzb2x1dGlvbi53aWR0aCA9IHBhcnNlSW50KHNwbGl0WzBdLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzcGxpdFsxXSkge1xuICAgICAgICAgICAgICByZXNvbHV0aW9uLmhlaWdodCA9IHBhcnNlSW50KHNwbGl0WzFdLCAxMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuUkVTT0xVVElPTiA9IHJlc29sdXRpb247XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LmF0dHJpYnV0ZXMuQkFORFdJRFRIKSB7XG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLkJBTkRXSURUSCA9IHBhcnNlSW50KGV2ZW50LmF0dHJpYnV0ZXMuQkFORFdJRFRILCAxMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LmF0dHJpYnV0ZXNbJ1BST0dSQU0tSUQnXSkge1xuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlc1snUFJPR1JBTS1JRCddID0gcGFyc2VJbnQoZXZlbnQuYXR0cmlidXRlc1snUFJPR1JBTS1JRCddLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLU1FRElBOj8oLiopJC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdtZWRpYSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzID0gcGFyc2VBdHRyaWJ1dGVzKG1hdGNoWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1FTkRMSVNULy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2VuZGxpc3QnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1ESVNDT05USU5VSVRZLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2Rpc2NvbnRpbnVpdHknXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1QUk9HUkFNLURBVEUtVElNRTo/KC4qKSQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAncHJvZ3JhbS1kYXRlLXRpbWUnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuZGF0ZVRpbWVTdHJpbmcgPSBtYXRjaFsxXTtcbiAgICAgICAgICBldmVudC5kYXRlVGltZU9iamVjdCA9IG5ldyBEYXRlKG1hdGNoWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1LRVk6PyguKikkLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2tleSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzID0gcGFyc2VBdHRyaWJ1dGVzKG1hdGNoWzFdKTsgLy8gcGFyc2UgdGhlIElWIHN0cmluZyBpbnRvIGEgVWludDMyQXJyYXlcblxuICAgICAgICAgIGlmIChldmVudC5hdHRyaWJ1dGVzLklWKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuYXR0cmlidXRlcy5JVi5zdWJzdHJpbmcoMCwgMikudG9Mb3dlckNhc2UoKSA9PT0gJzB4Jykge1xuICAgICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLklWID0gZXZlbnQuYXR0cmlidXRlcy5JVi5zdWJzdHJpbmcoMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuSVYgPSBldmVudC5hdHRyaWJ1dGVzLklWLm1hdGNoKC8uezh9L2cpO1xuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5JVlswXSA9IHBhcnNlSW50KGV2ZW50LmF0dHJpYnV0ZXMuSVZbMF0sIDE2KTtcbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuSVZbMV0gPSBwYXJzZUludChldmVudC5hdHRyaWJ1dGVzLklWWzFdLCAxNik7XG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLklWWzJdID0gcGFyc2VJbnQoZXZlbnQuYXR0cmlidXRlcy5JVlsyXSwgMTYpO1xuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5JVlszXSA9IHBhcnNlSW50KGV2ZW50LmF0dHJpYnV0ZXMuSVZbM10sIDE2KTtcbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuSVYgPSBuZXcgVWludDMyQXJyYXkoZXZlbnQuYXR0cmlidXRlcy5JVik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLVNUQVJUOj8oLiopJC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdzdGFydCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzID0gcGFyc2VBdHRyaWJ1dGVzKG1hdGNoWzFdKTtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzWydUSU1FLU9GRlNFVCddID0gcGFyc2VGbG9hdChldmVudC5hdHRyaWJ1dGVzWydUSU1FLU9GRlNFVCddKTtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLlBSRUNJU0UgPSAvWUVTLy50ZXN0KGV2ZW50LmF0dHJpYnV0ZXMuUFJFQ0lTRSk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtQ1VFLU9VVC1DT05UOj8oLiopPyQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnY3VlLW91dC1jb250J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSBtYXRjaFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudC5kYXRhID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtQ1VFLU9VVDo/KC4qKT8kLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2N1ZS1vdXQnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuZGF0YSA9IG1hdGNoWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1DVUUtSU46PyguKik/JC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdjdWUtaW4nXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuZGF0YSA9IG1hdGNoWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gdW5rbm93biB0YWcgdHlwZVxuXG5cbiAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgZGF0YTogbmV3TGluZS5zbGljZSg0KVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBhIHBhcnNlciBmb3IgY3VzdG9tIGhlYWRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgb3B0aW9ucyAgICAgICAgICAgICAgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgdGhlIGFkZGVkIHBhcnNlclxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gICBvcHRpb25zLmV4cHJlc3Npb24gICBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCB0aGUgY3VzdG9tIGhlYWRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gICBvcHRpb25zLmN1c3RvbVR5cGUgICB0aGUgY3VzdG9tIHR5cGUgdG8gcmVnaXN0ZXIgdG8gdGhlIG91dHB1dFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5kYXRhUGFyc2VyXSBmdW5jdGlvbiB0byBwYXJzZSB0aGUgbGluZSBpbnRvIGFuIG9iamVjdFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59ICBbb3B0aW9ucy5zZWdtZW50XSAgICBzaG91bGQgdGFnIGRhdGEgYmUgYXR0YWNoZWQgdG8gdGhlIHNlZ21lbnQgb2JqZWN0XG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLmFkZFBhcnNlciA9IGZ1bmN0aW9uIGFkZFBhcnNlcihfcmVmKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgZXhwcmVzc2lvbiA9IF9yZWYuZXhwcmVzc2lvbixcbiAgICAgICAgY3VzdG9tVHlwZSA9IF9yZWYuY3VzdG9tVHlwZSxcbiAgICAgICAgZGF0YVBhcnNlciA9IF9yZWYuZGF0YVBhcnNlcixcbiAgICAgICAgc2VnbWVudCA9IF9yZWYuc2VnbWVudDtcblxuICAgIGlmICh0eXBlb2YgZGF0YVBhcnNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGF0YVBhcnNlciA9IGZ1bmN0aW9uIGRhdGFQYXJzZXIobGluZSkge1xuICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5jdXN0b21QYXJzZXJzLnB1c2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgIHZhciBtYXRjaCA9IGV4cHJlc3Npb24uZXhlYyhsaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIF90aGlzMy50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICAgIHR5cGU6ICdjdXN0b20nLFxuICAgICAgICAgIGRhdGE6IGRhdGFQYXJzZXIobGluZSksXG4gICAgICAgICAgY3VzdG9tVHlwZTogY3VzdG9tVHlwZSxcbiAgICAgICAgICBzZWdtZW50OiBzZWdtZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgYSBjdXN0b20gaGVhZGVyIG1hcHBlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gICBvcHRpb25zXG4gICAqIEBwYXJhbSB7UmVnRXhwfSAgIG9wdGlvbnMuZXhwcmVzc2lvbiAgIGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHRoZSBjdXN0b20gaGVhZGVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMubWFwICAgICAgICAgIGZ1bmN0aW9uIHRvIHRyYW5zbGF0ZSB0YWcgaW50byBhIGRpZmZlcmVudCB0YWdcbiAgICovXG4gIDtcblxuICBfcHJvdG8uYWRkVGFnTWFwcGVyID0gZnVuY3Rpb24gYWRkVGFnTWFwcGVyKF9yZWYyKSB7XG4gICAgdmFyIGV4cHJlc3Npb24gPSBfcmVmMi5leHByZXNzaW9uLFxuICAgICAgICBtYXAgPSBfcmVmMi5tYXA7XG5cbiAgICB2YXIgbWFwRm4gPSBmdW5jdGlvbiBtYXBGbihsaW5lKSB7XG4gICAgICBpZiAoZXhwcmVzc2lvbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgIHJldHVybiBtYXAobGluZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsaW5lO1xuICAgIH07XG5cbiAgICB0aGlzLnRhZ01hcHBlcnMucHVzaChtYXBGbik7XG4gIH07XG5cbiAgcmV0dXJuIFBhcnNlU3RyZWFtO1xufShTdHJlYW0pO1xuXG5mdW5jdGlvbiBkZWNvZGVCNjRUb1VpbnQ4QXJyYXkoYjY0VGV4dCkge1xuICB2YXIgZGVjb2RlZFN0cmluZyA9IHdpbmRvdy5hdG9iKGI2NFRleHQgfHwgJycpO1xuICB2YXIgYXJyYXkgPSBuZXcgVWludDhBcnJheShkZWNvZGVkU3RyaW5nLmxlbmd0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWNvZGVkU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJyYXlbaV0gPSBkZWNvZGVkU3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBwYXJzZXIgZm9yIE0zVTggZmlsZXMuIFRoZSBjdXJyZW50IGludGVycHJldGF0aW9uIG9mIHRoZSBpbnB1dCBpc1xuICogZXhwb3NlZCBhcyBhIHByb3BlcnR5IGBtYW5pZmVzdGAgb24gcGFyc2VyIG9iamVjdHMuIEl0J3MganVzdCB0d28gbGluZXMgdG9cbiAqIGNyZWF0ZSBhbmQgcGFyc2UgYSBtYW5pZmVzdCBvbmNlIHlvdSBoYXZlIHRoZSBjb250ZW50cyBhdmFpbGFibGUgYXMgYSBzdHJpbmc6XG4gKlxuICogYGBganNcbiAqIHZhciBwYXJzZXIgPSBuZXcgbTN1OC5QYXJzZXIoKTtcbiAqIHBhcnNlci5wdXNoKHhoci5yZXNwb25zZVRleHQpO1xuICogYGBgXG4gKlxuICogTmV3IGlucHV0IGNhbiBsYXRlciBiZSBhcHBsaWVkIHRvIHVwZGF0ZSB0aGUgbWFuaWZlc3Qgb2JqZWN0IGJ5IGNhbGxpbmdcbiAqIGBwdXNoYCBhZ2Fpbi5cbiAqXG4gKiBUaGUgcGFyc2VyIGF0dGVtcHRzIHRvIGNyZWF0ZSBhIHVzYWJsZSBtYW5pZmVzdCBvYmplY3QgZXZlbiBpZiB0aGVcbiAqIHVuZGVybHlpbmcgaW5wdXQgaXMgc29tZXdoYXQgbm9uc2Vuc2ljYWwuIEl0IGVtaXRzIGBpbmZvYCBhbmQgYHdhcm5pbmdgXG4gKiBldmVudHMgZHVyaW5nIHRoZSBwYXJzZSBpZiBpdCBlbmNvdW50ZXJzIGlucHV0IHRoYXQgc2VlbXMgaW52YWxpZCBvclxuICogcmVxdWlyZXMgc29tZSBwcm9wZXJ0eSBvZiB0aGUgbWFuaWZlc3Qgb2JqZWN0IHRvIGJlIGRlZmF1bHRlZC5cbiAqXG4gKiBAY2xhc3MgUGFyc2VyXG4gKiBAZXh0ZW5kcyBTdHJlYW1cbiAqL1xuXG52YXIgUGFyc2VyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfU3RyZWFtKSB7XG4gIF9pbmhlcml0c0xvb3NlKFBhcnNlciwgX1N0cmVhbSk7XG5cbiAgZnVuY3Rpb24gUGFyc2VyKCkge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX1N0cmVhbS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMubGluZVN0cmVhbSA9IG5ldyBMaW5lU3RyZWFtKCk7XG4gICAgX3RoaXMucGFyc2VTdHJlYW0gPSBuZXcgUGFyc2VTdHJlYW0oKTtcblxuICAgIF90aGlzLmxpbmVTdHJlYW0ucGlwZShfdGhpcy5wYXJzZVN0cmVhbSk7XG4gICAgLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC10aGlzICovXG5cblxuICAgIHZhciBzZWxmID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBjb25zaXN0ZW50LXRoaXMgKi9cblxuXG4gICAgdmFyIHVyaXMgPSBbXTtcbiAgICB2YXIgY3VycmVudFVyaSA9IHt9OyAvLyBpZiBzcGVjaWZpZWQsIHRoZSBhY3RpdmUgRVhULVgtTUFQIGRlZmluaXRpb25cblxuICAgIHZhciBjdXJyZW50TWFwOyAvLyBpZiBzcGVjaWZpZWQsIHRoZSBhY3RpdmUgZGVjcnlwdGlvbiBrZXlcblxuICAgIHZhciBfa2V5O1xuXG4gICAgdmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKCkge307XG5cbiAgICB2YXIgZGVmYXVsdE1lZGlhR3JvdXBzID0ge1xuICAgICAgJ0FVRElPJzoge30sXG4gICAgICAnVklERU8nOiB7fSxcbiAgICAgICdDTE9TRUQtQ0FQVElPTlMnOiB7fSxcbiAgICAgICdTVUJUSVRMRVMnOiB7fVxuICAgIH07IC8vIFRoaXMgaXMgdGhlIFdpZGV2aW5lIFVVSUQgZnJvbSBEQVNIIElGIElPUC4gVGhlIHNhbWUgZXhhY3Qgc3RyaW5nIGlzXG4gICAgLy8gdXNlZCBpbiBNUERzIHdpdGggV2lkZXZpbmUgZW5jcnlwdGVkIHN0cmVhbXMuXG5cbiAgICB2YXIgd2lkZXZpbmVVdWlkID0gJ3Vybjp1dWlkOmVkZWY4YmE5LTc5ZDYtNGFjZS1hM2M4LTI3ZGNkNTFkMjFlZCc7IC8vIGdyb3VwIHNlZ21lbnRzIGludG8gbnVtYmVyZWQgdGltZWxpbmVzIGRlbGluZWF0ZWQgYnkgZGlzY29udGludWl0aWVzXG5cbiAgICB2YXIgY3VycmVudFRpbWVsaW5lID0gMDsgLy8gdGhlIG1hbmlmZXN0IGlzIGVtcHR5IHVudGlsIHRoZSBwYXJzZSBzdHJlYW0gYmVnaW5zIGRlbGl2ZXJpbmcgZGF0YVxuXG4gICAgX3RoaXMubWFuaWZlc3QgPSB7XG4gICAgICBhbGxvd0NhY2hlOiB0cnVlLFxuICAgICAgZGlzY29udGludWl0eVN0YXJ0czogW10sXG4gICAgICBzZWdtZW50czogW11cbiAgICB9OyAvLyB1cGRhdGUgdGhlIG1hbmlmZXN0IHdpdGggdGhlIG0zdTggZW50cnkgZnJvbSB0aGUgcGFyc2Ugc3RyZWFtXG5cbiAgICBfdGhpcy5wYXJzZVN0cmVhbS5vbignZGF0YScsIGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgdmFyIG1lZGlhR3JvdXA7XG4gICAgICB2YXIgcmVuZGl0aW9uO1xuICAgICAgKHtcbiAgICAgICAgdGFnOiBmdW5jdGlvbiB0YWcoKSB7XG4gICAgICAgICAgLy8gc3dpdGNoIGJhc2VkIG9uIHRoZSB0YWcgdHlwZVxuICAgICAgICAgICgoe1xuICAgICAgICAgICAgJ2FsbG93LWNhY2hlJzogZnVuY3Rpb24gYWxsb3dDYWNoZSgpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5hbGxvd0NhY2hlID0gZW50cnkuYWxsb3dlZDtcblxuICAgICAgICAgICAgICBpZiAoISgnYWxsb3dlZCcgaW4gZW50cnkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdpbmZvJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcgYWxsb3dDYWNoZSB0byBZRVMnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5hbGxvd0NhY2hlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJ5dGVyYW5nZTogZnVuY3Rpb24gYnl0ZXJhbmdlKCkge1xuICAgICAgICAgICAgICB2YXIgYnl0ZXJhbmdlID0ge307XG5cbiAgICAgICAgICAgICAgaWYgKCdsZW5ndGgnIGluIGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFVyaS5ieXRlcmFuZ2UgPSBieXRlcmFuZ2U7XG4gICAgICAgICAgICAgICAgYnl0ZXJhbmdlLmxlbmd0aCA9IGVudHJ5Lmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGlmICghKCdvZmZzZXQnIGluIGVudHJ5KSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdpbmZvJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnZGVmYXVsdGluZyBvZmZzZXQgdG8gemVybydcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgZW50cnkub2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoJ29mZnNldCcgaW4gZW50cnkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXJpLmJ5dGVyYW5nZSA9IGJ5dGVyYW5nZTtcbiAgICAgICAgICAgICAgICBieXRlcmFuZ2Uub2Zmc2V0ID0gZW50cnkub2Zmc2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5kbGlzdDogZnVuY3Rpb24gZW5kbGlzdCgpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5lbmRMaXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmY6IGZ1bmN0aW9uIGluZigpIHtcbiAgICAgICAgICAgICAgaWYgKCEoJ21lZGlhU2VxdWVuY2UnIGluIHRoaXMubWFuaWZlc3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5tZWRpYVNlcXVlbmNlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2luZm8nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnZGVmYXVsdGluZyBtZWRpYSBzZXF1ZW5jZSB0byB6ZXJvJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCEoJ2Rpc2NvbnRpbnVpdHlTZXF1ZW5jZScgaW4gdGhpcy5tYW5pZmVzdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LmRpc2NvbnRpbnVpdHlTZXF1ZW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdpbmZvJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcgZGlzY29udGludWl0eSBzZXF1ZW5jZSB0byB6ZXJvJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LmR1cmF0aW9uID4gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRVcmkuZHVyYXRpb24gPSBlbnRyeS5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5kdXJhdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRVcmkuZHVyYXRpb24gPSAwLjAxO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignaW5mbycsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICd1cGRhdGluZyB6ZXJvIHNlZ21lbnQgZHVyYXRpb24gdG8gYSBzbWFsbCB2YWx1ZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3Quc2VnbWVudHMgPSB1cmlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGtleTogZnVuY3Rpb24ga2V5KCkge1xuICAgICAgICAgICAgICBpZiAoIWVudHJ5LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaWdub3Jpbmcga2V5IGRlY2xhcmF0aW9uIHdpdGhvdXQgYXR0cmlidXRlIGxpc3QnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9IC8vIGNsZWFyIHRoZSBhY3RpdmUgZW5jcnlwdGlvbiBrZXlcblxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLk1FVEhPRCA9PT0gJ05PTkUnKSB7XG4gICAgICAgICAgICAgICAgX2tleSA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFlbnRyeS5hdHRyaWJ1dGVzLlVSSSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBrZXkgZGVjbGFyYXRpb24gd2l0aG91dCBVUkknXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9IC8vIGNoZWNrIGlmIHRoZSBjb250ZW50IGlzIGVuY3J5cHRlZCBmb3IgV2lkZXZpbmVcbiAgICAgICAgICAgICAgLy8gV2lkZXZpbmUvSExTIHNwZWM6IGh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS93dmRvY3MvV2lkZXZpbmVfRFJNX0hMUy5wZGZcblxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLktFWUZPUk1BVCA9PT0gd2lkZXZpbmVVdWlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIFZBTElEX01FVEhPRFMgPSBbJ1NBTVBMRS1BRVMnLCAnU0FNUExFLUFFUy1DVFInLCAnU0FNUExFLUFFUy1DRU5DJ107XG5cbiAgICAgICAgICAgICAgICBpZiAoVkFMSURfTUVUSE9EUy5pbmRleE9mKGVudHJ5LmF0dHJpYnV0ZXMuTUVUSE9EKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2ludmFsaWQga2V5IG1ldGhvZCBwcm92aWRlZCBmb3IgV2lkZXZpbmUnXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlcy5NRVRIT0QgPT09ICdTQU1QTEUtQUVTLUNFTkMnKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdTQU1QTEUtQUVTLUNFTkMgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBTQU1QTEUtQUVTLUNUUiBpbnN0ZWFkJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmF0dHJpYnV0ZXMuVVJJLnN1YnN0cmluZygwLCAyMykgIT09ICdkYXRhOnRleHQvcGxhaW47YmFzZTY0LCcpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2ludmFsaWQga2V5IFVSSSBwcm92aWRlZCBmb3IgV2lkZXZpbmUnXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShlbnRyeS5hdHRyaWJ1dGVzLktFWUlEICYmIGVudHJ5LmF0dHJpYnV0ZXMuS0VZSUQuc3Vic3RyaW5nKDAsIDIpID09PSAnMHgnKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW52YWxpZCBrZXkgSUQgcHJvdmlkZWQgZm9yIFdpZGV2aW5lJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfSAvLyBpZiBXaWRldmluZSBrZXkgYXR0cmlidXRlcyBhcmUgdmFsaWQsIHN0b3JlIHRoZW0gYXMgYGNvbnRlbnRQcm90ZWN0aW9uYFxuICAgICAgICAgICAgICAgIC8vIG9uIHRoZSBtYW5pZmVzdCB0byBlbXVsYXRlIFdpZGV2aW5lIHRhZyBzdHJ1Y3R1cmUgaW4gYSBEQVNIIG1wZFxuXG5cbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LmNvbnRlbnRQcm90ZWN0aW9uID0ge1xuICAgICAgICAgICAgICAgICAgJ2NvbS53aWRldmluZS5hbHBoYSc6IHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICAgIHNjaGVtZUlkVXJpOiBlbnRyeS5hdHRyaWJ1dGVzLktFWUZPUk1BVCxcbiAgICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgJzB4JyBmcm9tIHRoZSBrZXkgaWQgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAga2V5SWQ6IGVudHJ5LmF0dHJpYnV0ZXMuS0VZSUQuc3Vic3RyaW5nKDIpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlY29kZSB0aGUgYmFzZTY0LWVuY29kZWQgUFNTSCBib3hcbiAgICAgICAgICAgICAgICAgICAgcHNzaDogZGVjb2RlQjY0VG9VaW50OEFycmF5KGVudHJ5LmF0dHJpYnV0ZXMuVVJJLnNwbGl0KCcsJylbMV0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIWVudHJ5LmF0dHJpYnV0ZXMuTUVUSE9EKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcga2V5IG1ldGhvZCB0byBBRVMtMTI4J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IC8vIHNldHVwIGFuIGVuY3J5cHRpb24ga2V5IGZvciB1cGNvbWluZyBzZWdtZW50c1xuXG5cbiAgICAgICAgICAgICAgX2tleSA9IHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IGVudHJ5LmF0dHJpYnV0ZXMuTUVUSE9EIHx8ICdBRVMtMTI4JyxcbiAgICAgICAgICAgICAgICB1cmk6IGVudHJ5LmF0dHJpYnV0ZXMuVVJJXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRyeS5hdHRyaWJ1dGVzLklWICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF9rZXkuaXYgPSBlbnRyeS5hdHRyaWJ1dGVzLklWO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ21lZGlhLXNlcXVlbmNlJzogZnVuY3Rpb24gbWVkaWFTZXF1ZW5jZSgpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShlbnRyeS5udW1iZXIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIGludmFsaWQgbWVkaWEgc2VxdWVuY2U6ICcgKyBlbnRyeS5udW1iZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0Lm1lZGlhU2VxdWVuY2UgPSBlbnRyeS5udW1iZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2Rpc2NvbnRpbnVpdHktc2VxdWVuY2UnOiBmdW5jdGlvbiBkaXNjb250aW51aXR5U2VxdWVuY2UoKSB7XG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZW50cnkubnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBpbnZhbGlkIGRpc2NvbnRpbnVpdHkgc2VxdWVuY2U6ICcgKyBlbnRyeS5udW1iZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LmRpc2NvbnRpbnVpdHlTZXF1ZW5jZSA9IGVudHJ5Lm51bWJlcjtcbiAgICAgICAgICAgICAgY3VycmVudFRpbWVsaW5lID0gZW50cnkubnVtYmVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwbGF5bGlzdC10eXBlJzogZnVuY3Rpb24gcGxheWxpc3RUeXBlKCkge1xuICAgICAgICAgICAgICBpZiAoIS9WT0R8RVZFTlQvLnRlc3QoZW50cnkucGxheWxpc3RUeXBlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyB1bmtub3duIHBsYXlsaXN0IHR5cGU6ICcgKyBlbnRyeS5wbGF5bGlzdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QucGxheWxpc3RUeXBlID0gZW50cnkucGxheWxpc3RUeXBlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hcDogZnVuY3Rpb24gbWFwKCkge1xuICAgICAgICAgICAgICBjdXJyZW50TWFwID0ge307XG5cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LnVyaSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRNYXAudXJpID0gZW50cnkudXJpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LmJ5dGVyYW5nZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRNYXAuYnl0ZXJhbmdlID0gZW50cnkuYnl0ZXJhbmdlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3N0cmVhbS1pbmYnOiBmdW5jdGlvbiBzdHJlYW1JbmYoKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QucGxheWxpc3RzID0gdXJpcztcbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5tZWRpYUdyb3VwcyA9IHRoaXMubWFuaWZlc3QubWVkaWFHcm91cHMgfHwgZGVmYXVsdE1lZGlhR3JvdXBzO1xuXG4gICAgICAgICAgICAgIGlmICghZW50cnkuYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBlbXB0eSBzdHJlYW0taW5mIGF0dHJpYnV0ZXMnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFjdXJyZW50VXJpLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXJpLmF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIF9leHRlbmRzKGN1cnJlbnRVcmkuYXR0cmlidXRlcywgZW50cnkuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWVkaWE6IGZ1bmN0aW9uIG1lZGlhKCkge1xuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0Lm1lZGlhR3JvdXBzID0gdGhpcy5tYW5pZmVzdC5tZWRpYUdyb3VwcyB8fCBkZWZhdWx0TWVkaWFHcm91cHM7XG5cbiAgICAgICAgICAgICAgaWYgKCEoZW50cnkuYXR0cmlidXRlcyAmJiBlbnRyeS5hdHRyaWJ1dGVzLlRZUEUgJiYgZW50cnkuYXR0cmlidXRlc1snR1JPVVAtSUQnXSAmJiBlbnRyeS5hdHRyaWJ1dGVzLk5BTUUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIGluY29tcGxldGUgb3IgbWlzc2luZyBtZWRpYSBncm91cCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH0gLy8gZmluZCB0aGUgbWVkaWEgZ3JvdXAsIGNyZWF0aW5nIGRlZmF1bHRzIGFzIG5lY2Vzc2FyeVxuXG5cbiAgICAgICAgICAgICAgdmFyIG1lZGlhR3JvdXBUeXBlID0gdGhpcy5tYW5pZmVzdC5tZWRpYUdyb3Vwc1tlbnRyeS5hdHRyaWJ1dGVzLlRZUEVdO1xuICAgICAgICAgICAgICBtZWRpYUdyb3VwVHlwZVtlbnRyeS5hdHRyaWJ1dGVzWydHUk9VUC1JRCddXSA9IG1lZGlhR3JvdXBUeXBlW2VudHJ5LmF0dHJpYnV0ZXNbJ0dST1VQLUlEJ11dIHx8IHt9O1xuICAgICAgICAgICAgICBtZWRpYUdyb3VwID0gbWVkaWFHcm91cFR5cGVbZW50cnkuYXR0cmlidXRlc1snR1JPVVAtSUQnXV07IC8vIGNvbGxlY3QgdGhlIHJlbmRpdGlvbiBtZXRhZGF0YVxuXG4gICAgICAgICAgICAgIHJlbmRpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAveWVzL2kudGVzdChlbnRyeS5hdHRyaWJ1dGVzLkRFRkFVTFQpXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgaWYgKHJlbmRpdGlvbi5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVuZGl0aW9uLmF1dG9zZWxlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5hdXRvc2VsZWN0ID0gL3llcy9pLnRlc3QoZW50cnkuYXR0cmlidXRlcy5BVVRPU0VMRUNUKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLkxBTkdVQUdFKSB7XG4gICAgICAgICAgICAgICAgcmVuZGl0aW9uLmxhbmd1YWdlID0gZW50cnkuYXR0cmlidXRlcy5MQU5HVUFHRTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLlVSSSkge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi51cmkgPSBlbnRyeS5hdHRyaWJ1dGVzLlVSSTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzWydJTlNUUkVBTS1JRCddKSB7XG4gICAgICAgICAgICAgICAgcmVuZGl0aW9uLmluc3RyZWFtSWQgPSBlbnRyeS5hdHRyaWJ1dGVzWydJTlNUUkVBTS1JRCddO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LmF0dHJpYnV0ZXMuQ0hBUkFDVEVSSVNUSUNTKSB7XG4gICAgICAgICAgICAgICAgcmVuZGl0aW9uLmNoYXJhY3RlcmlzdGljcyA9IGVudHJ5LmF0dHJpYnV0ZXMuQ0hBUkFDVEVSSVNUSUNTO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVudHJ5LmF0dHJpYnV0ZXMuRk9SQ0VEKSB7XG4gICAgICAgICAgICAgICAgcmVuZGl0aW9uLmZvcmNlZCA9IC95ZXMvaS50ZXN0KGVudHJ5LmF0dHJpYnV0ZXMuRk9SQ0VEKTtcbiAgICAgICAgICAgICAgfSAvLyBpbnNlcnQgdGhlIG5ldyByZW5kaXRpb25cblxuXG4gICAgICAgICAgICAgIG1lZGlhR3JvdXBbZW50cnkuYXR0cmlidXRlcy5OQU1FXSA9IHJlbmRpdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNjb250aW51aXR5OiBmdW5jdGlvbiBkaXNjb250aW51aXR5KCkge1xuICAgICAgICAgICAgICBjdXJyZW50VGltZWxpbmUgKz0gMTtcbiAgICAgICAgICAgICAgY3VycmVudFVyaS5kaXNjb250aW51aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5kaXNjb250aW51aXR5U3RhcnRzLnB1c2godXJpcy5sZW5ndGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdwcm9ncmFtLWRhdGUtdGltZSc6IGZ1bmN0aW9uIHByb2dyYW1EYXRlVGltZSgpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1hbmlmZXN0LmRhdGVUaW1lU3RyaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIFBST0dSQU0tREFURS1USU1FIGlzIGEgbWVkaWEtc2VnbWVudCB0YWcsIGJ1dCBmb3IgYmFja3dhcmRzXG4gICAgICAgICAgICAgICAgLy8gY29tcGF0aWJpbGl0eSwgd2UgYWRkIHRoZSBmaXJzdCBvY2N1cmVuY2Ugb2YgdGhlIFBST0dSQU0tREFURS1USU1FIHRhZ1xuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBtYW5pZmVzdCBvYmplY3RcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBDb25zaWRlciByZW1vdmluZyB0aGlzIGluIGZ1dHVyZSBtYWpvciB2ZXJzaW9uXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5kYXRlVGltZVN0cmluZyA9IGVudHJ5LmRhdGVUaW1lU3RyaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuZGF0ZVRpbWVPYmplY3QgPSBlbnRyeS5kYXRlVGltZU9iamVjdDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGN1cnJlbnRVcmkuZGF0ZVRpbWVTdHJpbmcgPSBlbnRyeS5kYXRlVGltZVN0cmluZztcbiAgICAgICAgICAgICAgY3VycmVudFVyaS5kYXRlVGltZU9iamVjdCA9IGVudHJ5LmRhdGVUaW1lT2JqZWN0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhcmdldGR1cmF0aW9uOiBmdW5jdGlvbiB0YXJnZXRkdXJhdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShlbnRyeS5kdXJhdGlvbikgfHwgZW50cnkuZHVyYXRpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIGludmFsaWQgdGFyZ2V0IGR1cmF0aW9uOiAnICsgZW50cnkuZHVyYXRpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnRhcmdldER1cmF0aW9uID0gZW50cnkuZHVyYXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG90YWxkdXJhdGlvbjogZnVuY3Rpb24gdG90YWxkdXJhdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc0Zpbml0ZShlbnRyeS5kdXJhdGlvbikgfHwgZW50cnkuZHVyYXRpb24gPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIGludmFsaWQgdG90YWwgZHVyYXRpb246ICcgKyBlbnRyeS5kdXJhdGlvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QudG90YWxEdXJhdGlvbiA9IGVudHJ5LmR1cmF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgICAgaWYgKCFlbnRyeS5hdHRyaWJ1dGVzIHx8IGlzTmFOKGVudHJ5LmF0dHJpYnV0ZXNbJ1RJTUUtT0ZGU0VUJ10pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIHN0YXJ0IGRlY2xhcmF0aW9uIHdpdGhvdXQgYXBwcm9wcmlhdGUgYXR0cmlidXRlIGxpc3QnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5zdGFydCA9IHtcbiAgICAgICAgICAgICAgICB0aW1lT2Zmc2V0OiBlbnRyeS5hdHRyaWJ1dGVzWydUSU1FLU9GRlNFVCddLFxuICAgICAgICAgICAgICAgIHByZWNpc2U6IGVudHJ5LmF0dHJpYnV0ZXMuUFJFQ0lTRVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjdWUtb3V0JzogZnVuY3Rpb24gY3VlT3V0KCkge1xuICAgICAgICAgICAgICBjdXJyZW50VXJpLmN1ZU91dCA9IGVudHJ5LmRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2N1ZS1vdXQtY29udCc6IGZ1bmN0aW9uIGN1ZU91dENvbnQoKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRVcmkuY3VlT3V0Q29udCA9IGVudHJ5LmRhdGE7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2N1ZS1pbic6IGZ1bmN0aW9uIGN1ZUluKCkge1xuICAgICAgICAgICAgICBjdXJyZW50VXJpLmN1ZUluID0gZW50cnkuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVtlbnRyeS50YWdUeXBlXSB8fCBub29wKS5jYWxsKHNlbGYpO1xuICAgICAgICB9LFxuICAgICAgICB1cmk6IGZ1bmN0aW9uIHVyaSgpIHtcbiAgICAgICAgICBjdXJyZW50VXJpLnVyaSA9IGVudHJ5LnVyaTtcbiAgICAgICAgICB1cmlzLnB1c2goY3VycmVudFVyaSk7IC8vIGlmIG5vIGV4cGxpY2l0IGR1cmF0aW9uIHdhcyBkZWNsYXJlZCwgdXNlIHRoZSB0YXJnZXQgZHVyYXRpb25cblxuICAgICAgICAgIGlmICh0aGlzLm1hbmlmZXN0LnRhcmdldER1cmF0aW9uICYmICEoJ2R1cmF0aW9uJyBpbiBjdXJyZW50VXJpKSkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnZGVmYXVsdGluZyBzZWdtZW50IGR1cmF0aW9uIHRvIHRoZSB0YXJnZXQgZHVyYXRpb24nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN1cnJlbnRVcmkuZHVyYXRpb24gPSB0aGlzLm1hbmlmZXN0LnRhcmdldER1cmF0aW9uO1xuICAgICAgICAgIH0gLy8gYW5ub3RhdGUgd2l0aCBlbmNyeXB0aW9uIGluZm9ybWF0aW9uLCBpZiBuZWNlc3NhcnlcblxuXG4gICAgICAgICAgaWYgKF9rZXkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmkua2V5ID0gX2tleTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50VXJpLnRpbWVsaW5lID0gY3VycmVudFRpbWVsaW5lOyAvLyBhbm5vdGF0ZSB3aXRoIGluaXRpYWxpemF0aW9uIHNlZ21lbnQgaW5mb3JtYXRpb24sIGlmIG5lY2Vzc2FyeVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnRNYXApIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmkubWFwID0gY3VycmVudE1hcDtcbiAgICAgICAgICB9IC8vIHByZXBhcmUgZm9yIHRoZSBuZXh0IFVSSVxuXG5cbiAgICAgICAgICBjdXJyZW50VXJpID0ge307XG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1lbnQ6IGZ1bmN0aW9uIGNvbW1lbnQoKSB7Ly8gY29tbWVudHMgYXJlIG5vdCBpbXBvcnRhbnQgZm9yIHBsYXliYWNrXG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbTogZnVuY3Rpb24gY3VzdG9tKCkge1xuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgc2VnbWVudC1sZXZlbCBkYXRhIGF0dGFjaCB0aGUgb3V0cHV0IHRvIHRoZSBzZWdtZW50XG4gICAgICAgICAgaWYgKGVudHJ5LnNlZ21lbnQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRVcmkuY3VzdG9tID0gY3VycmVudFVyaS5jdXN0b20gfHwge307XG4gICAgICAgICAgICBjdXJyZW50VXJpLmN1c3RvbVtlbnRyeS5jdXN0b21UeXBlXSA9IGVudHJ5LmRhdGE7IC8vIGlmIHRoaXMgaXMgbWFuaWZlc3QtbGV2ZWwgZGF0YSBhdHRhY2ggdG8gdGhlIHRvcCBsZXZlbCBtYW5pZmVzdCBvYmplY3RcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5jdXN0b20gPSB0aGlzLm1hbmlmZXN0LmN1c3RvbSB8fCB7fTtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuY3VzdG9tW2VudHJ5LmN1c3RvbVR5cGVdID0gZW50cnkuZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pW2VudHJ5LnR5cGVdLmNhbGwoc2VsZik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSBpbnB1dCBzdHJpbmcgYW5kIHVwZGF0ZSB0aGUgbWFuaWZlc3Qgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY2h1bmsgYSBwb3RlbnRpYWxseSBpbmNvbXBsZXRlIHBvcnRpb24gb2YgdGhlIG1hbmlmZXN0XG4gICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IFBhcnNlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnB1c2ggPSBmdW5jdGlvbiBwdXNoKGNodW5rKSB7XG4gICAgdGhpcy5saW5lU3RyZWFtLnB1c2goY2h1bmspO1xuICB9XG4gIC8qKlxuICAgKiBGbHVzaCBhbnkgcmVtYWluaW5nIGlucHV0LiBUaGlzIGNhbiBiZSBoYW5keSBpZiB0aGUgbGFzdCBsaW5lIG9mIGFuIE0zVThcbiAgICogbWFuaWZlc3QgZGlkIG5vdCBjb250YWluIGEgdHJhaWxpbmcgbmV3bGluZSBidXQgdGhlIGZpbGUgaGFzIGJlZW5cbiAgICogY29tcGxldGVseSByZWNlaXZlZC5cbiAgICovXG4gIDtcblxuICBfcHJvdG8uZW5kID0gZnVuY3Rpb24gZW5kKCkge1xuICAgIC8vIGZsdXNoIGFueSBidWZmZXJlZCBpbnB1dFxuICAgIHRoaXMubGluZVN0cmVhbS5wdXNoKCdcXG4nKTtcbiAgfVxuICAvKipcbiAgICogQWRkIGFuIGFkZGl0aW9uYWwgcGFyc2VyIGZvciBub24tc3RhbmRhcmQgdGFnc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gICBvcHRpb25zICAgICAgICAgICAgICBhIG1hcCBvZiBvcHRpb25zIGZvciB0aGUgYWRkZWQgcGFyc2VyXG4gICAqIEBwYXJhbSB7UmVnRXhwfSAgIG9wdGlvbnMuZXhwcmVzc2lvbiAgIGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHRoZSBjdXN0b20gaGVhZGVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgIG9wdGlvbnMudHlwZSAgICAgICAgIHRoZSB0eXBlIHRvIHJlZ2lzdGVyIHRvIHRoZSBvdXRwdXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZGF0YVBhcnNlcl0gZnVuY3Rpb24gdG8gcGFyc2UgdGhlIGxpbmUgaW50byBhbiBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSAgW29wdGlvbnMuc2VnbWVudF0gICAgc2hvdWxkIHRhZyBkYXRhIGJlIGF0dGFjaGVkIHRvIHRoZSBzZWdtZW50IG9iamVjdFxuICAgKi9cbiAgO1xuXG4gIF9wcm90by5hZGRQYXJzZXIgPSBmdW5jdGlvbiBhZGRQYXJzZXIob3B0aW9ucykge1xuICAgIHRoaXMucGFyc2VTdHJlYW0uYWRkUGFyc2VyKG9wdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgYSBjdXN0b20gaGVhZGVyIG1hcHBlclxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gICBvcHRpb25zXG4gICAqIEBwYXJhbSB7UmVnRXhwfSAgIG9wdGlvbnMuZXhwcmVzc2lvbiAgIGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hdGNoIHRoZSBjdXN0b20gaGVhZGVyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMubWFwICAgICAgICAgIGZ1bmN0aW9uIHRvIHRyYW5zbGF0ZSB0YWcgaW50byBhIGRpZmZlcmVudCB0YWdcbiAgICovXG4gIDtcblxuICBfcHJvdG8uYWRkVGFnTWFwcGVyID0gZnVuY3Rpb24gYWRkVGFnTWFwcGVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlU3RyZWFtLmFkZFRhZ01hcHBlcihvcHRpb25zKTtcbiAgfTtcblxuICByZXR1cm4gUGFyc2VyO1xufShTdHJlYW0pO1xuXG5leHBvcnQgeyBMaW5lU3RyZWFtLCBQYXJzZVN0cmVhbSwgUGFyc2VyIH07XG4iLCJleHBvcnQgeyBkZWZhdWx0IGFzIHRvTVMgfSBmcm9tICcuL3RvTVMnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHRvU3J0VGltZSB9IGZyb20gJy4vdG9TcnRUaW1lJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1Z0dFRpbWUgfSBmcm9tICcuL3RvVnR0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2UgfSBmcm9tICcuL3BhcnNlJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5VnR0IH0gZnJvbSAnLi9zdHJpbmdpZnlWdHQnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHJlc3luYyB9IGZyb20gJy4vcmVzeW5jJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZVRpbWVzdGFtcHMgfSBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgcGFyc2VUaW1lc3RhbXBzIGZyb20gJy4vcGFyc2VUaW1lc3RhbXBzJ1xuXG4vKipcbiAqIFBhcnNlIGEgU1JUIG9yIFdlYlZUVCBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gc3J0T3JWdHRcbiAqIEByZXR1cm4ge0FycmF5fSBzdWJ0aXRsZXNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZSAoc3J0T3JWdHQpIHtcbiAgaWYgKCFzcnRPclZ0dCkgcmV0dXJuIFtdXG5cbiAgY29uc3Qgc291cmNlID0gc3J0T3JWdHRcbiAgICAudHJpbSgpXG4gICAgLmNvbmNhdCgnXFxuJylcbiAgICAucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKVxuICAgIC5yZXBsYWNlKC9cXG57Myx9L2csICdcXG5cXG4nKVxuICAgIC5yZXBsYWNlKC9eV0VCVlRULipcXG4oPzouKjogLipcXG4pKlxcbi8sICcnKVxuICAgIC5zcGxpdCgnXFxuJylcblxuICByZXR1cm4gc291cmNlLnJlZHVjZSgoY2FwdGlvbnMsIHJvdywgaW5kZXgpID0+IHtcbiAgICBjb25zdCBjYXB0aW9uID0gY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMV1cblxuICAgIGlmICghY2FwdGlvbi5pbmRleCkge1xuICAgICAgaWYgKC9eXFxkKyQvLnRlc3Qocm93KSkge1xuICAgICAgICBjYXB0aW9uLmluZGV4ID0gcGFyc2VJbnQocm93LCAxMClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjYXB0aW9uLmhhc093blByb3BlcnR5KCdzdGFydCcpKSB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBwYXJzZVRpbWVzdGFtcHMocm93KVxuICAgICAgaWYgKHRpbWVzdGFtcCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGNhcHRpb24sIHRpbWVzdGFtcClcbiAgICAgIH0gZWxzZSBpZiAoY2FwdGlvbnMubGVuZ3RoID4gMSkge1xuICAgICAgICBjYXB0aW9uc1tjYXB0aW9ucy5sZW5ndGggLSAyXS50ZXh0ICs9ICdcXG4nICsgcm93XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FwdGlvbnNcbiAgICB9XG5cbiAgICBpZiAocm93ID09PSAnJykge1xuICAgICAgZGVsZXRlIGNhcHRpb24uaW5kZXhcbiAgICAgIGlmIChpbmRleCAhPT0gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgY2FwdGlvbnMucHVzaCh7fSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi50ZXh0XG4gICAgICAgID8gY2FwdGlvbi50ZXh0ICsgJ1xcbicgKyByb3dcbiAgICAgICAgOiByb3dcbiAgICB9XG5cbiAgICByZXR1cm4gY2FwdGlvbnNcbiAgfSwgW3t9XSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogVGltZXN0YW1wIHJlZ2V4XG4gKiBAdHlwZSB7UmVnRXhwfVxuICovXG5cbmNvbnN0IFJFID0gL14oKD86XFxkezIsfTopP1xcZHsyfTpcXGR7Mn1bLC5dXFxkezN9KSAtLT4gKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkoPzogKC4qKSk/JC9cblxuLyoqXG4gKiBwYXJzZVRpbWVzdGFtcHNcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnMge3tzdGFydDogTnVtYmVyLCBlbmQ6IE51bWJlcn19XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VUaW1lc3RhbXBzICh2YWx1ZSkge1xuICBjb25zdCBtYXRjaCA9IFJFLmV4ZWModmFsdWUpXG4gIGlmIChtYXRjaCkge1xuICAgIGNvbnN0IGN1ZSA9IHtcbiAgICAgIHN0YXJ0OiB0b01TKG1hdGNoWzFdKSxcbiAgICAgIGVuZDogdG9NUyhtYXRjaFsyXSlcbiAgICB9XG4gICAgaWYgKG1hdGNoWzNdKSB7XG4gICAgICBjdWUuc2V0dGluZ3MgPSBtYXRjaFszXVxuICAgIH1cbiAgICByZXR1cm4gY3VlXG4gIH1cbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9NUyBmcm9tICcuL3RvTVMnXG5cbi8qKlxuICogUmVzeW5jIHRoZSBnaXZlbiBzdWJ0aXRsZXMuXG4gKiBAcGFyYW0gY2FwdGlvbnNcbiAqIEBwYXJhbSB0aW1lXG4gKiBAcmV0dXJucyB7QXJyYXl8Kn1cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXN5bmMgKGNhcHRpb25zLCB0aW1lKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoY2FwdGlvbiA9PiB7XG4gICAgY29uc3Qgc3RhcnQgPSB0b01TKGNhcHRpb24uc3RhcnQpICsgdGltZVxuICAgIGNvbnN0IGVuZCA9IHRvTVMoY2FwdGlvbi5lbmQpICsgdGltZVxuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNhcHRpb24sIHtcbiAgICAgIHN0YXJ0LFxuICAgICAgZW5kXG4gICAgfSlcbiAgfSlcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgdG9TcnRUaW1lIGZyb20gJy4vdG9TcnRUaW1lJ1xuXG4vKipcbiAqIFN0cmluZ2lmeSB0aGUgZ2l2ZW4gYXJyYXkgb2YgY2FwdGlvbnMuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSBzcnRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnkgKGNhcHRpb25zKSB7XG4gIHJldHVybiBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvU3J0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9TcnRUaW1lKGNhcHRpb24uZW5kKX1gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvVnR0VGltZSBmcm9tICcuL3RvVnR0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zIHRvIFdlYlZUVCBmb3JtYXQuXG4gKiBAcGFyYW0ge0FycmF5fSBjYXB0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfSB3ZWJWdHRcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHJpbmdpZnlWdHQgKGNhcHRpb25zKSB7XG4gIHJldHVybiAnV0VCVlRUXFxuXFxuJyArIGNhcHRpb25zLm1hcCgoY2FwdGlvbiwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdcXG4nIDogJycpICsgW1xuICAgICAgaW5kZXggKyAxLFxuICAgICAgYCR7dG9WdHRUaW1lKGNhcHRpb24uc3RhcnQpfSAtLT4gJHt0b1Z0dFRpbWUoY2FwdGlvbi5lbmQpfSR7Y2FwdGlvbi5zZXR0aW5ncyA/ICcgJyArIGNhcHRpb24uc2V0dGluZ3MgOiAnJ31gLFxuICAgICAgY2FwdGlvbi50ZXh0XG4gICAgXS5qb2luKCdcXG4nKVxuICB9KS5qb2luKCdcXG4nKSArICdcXG4nXG59XG4iLCIvKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gU1JUIHRpbWVzdGFtcCBhcyBtaWxsZXNlY29uZHMuXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHRpbWVzdGFtcFxuICogQHJldHVybnMge251bWJlcn0gbWlsbGlzZWNvbmRzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9NUyAodGltZXN0YW1wKSB7XG4gIGlmICghaXNOYU4odGltZXN0YW1wKSkge1xuICAgIHJldHVybiB0aW1lc3RhbXBcbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gdGltZXN0YW1wLm1hdGNoKC9eKD86KFxcZHsyLH0pOik/KFxcZHsyfSk6KFxcZHsyfSlbLC5dKFxcZHszfSkkLylcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFNSVCBvciBWVFQgdGltZSBmb3JtYXQ6IFwiJyArIHRpbWVzdGFtcCArICdcIicpXG4gIH1cblxuICBjb25zdCBob3VycyA9IG1hdGNoWzFdID8gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKSAqIDM2MDAwMDAgOiAwXG4gIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChtYXRjaFsyXSwgMTApICogNjAwMDBcbiAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzNdLCAxMCkgKiAxMDAwXG4gIGNvbnN0IG1pbGxpc2Vjb25kcyA9IHBhcnNlSW50KG1hdGNoWzRdLCAxMClcblxuICByZXR1cm4gaG91cnMgKyBtaW51dGVzICsgc2Vjb25kcyArIG1pbGxpc2Vjb25kc1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgU1JUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9TcnRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30sJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB6ZXJvRmlsbCBmcm9tICd6ZXJvLWZpbGwnXG5cbi8qKlxuICogUmV0dXJuIHRoZSBnaXZlbiBtaWxsaXNlY29uZHMgYXMgV2ViVlRUIHRpbWVzdGFtcC5cbiAqIEBwYXJhbSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9WdHRUaW1lICh0aW1lc3RhbXApIHtcbiAgaWYgKGlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgMCwgMCwgdGltZXN0YW1wKVxuXG4gIGNvbnN0IGhvdXJzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRIb3VycygpKVxuICBjb25zdCBtaW51dGVzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRNaW51dGVzKCkpXG4gIGNvbnN0IHNlY29uZHMgPSB6ZXJvRmlsbCgyLCBkYXRlLmdldFNlY29uZHMoKSlcbiAgY29uc3QgbXMgPSB0aW1lc3RhbXAgLSAoKGhvdXJzICogMzYwMDAwMCkgKyAobWludXRlcyAqIDYwMDAwKSArIChzZWNvbmRzICogMTAwMCkpXG5cbiAgcmV0dXJuIGAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHt6ZXJvRmlsbCgzLCBtcyl9YFxufVxuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLyoqXG4gKiBHaXZlbiBhIG51bWJlciwgcmV0dXJuIGEgemVyby1maWxsZWQgc3RyaW5nLlxuICogRnJvbSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEyNjcyODMvXG4gKiBAcGFyYW0gIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bWJlclxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHplcm9GaWxsICh3aWR0aCwgbnVtYmVyLCBwYWQpIHtcbiAgaWYgKG51bWJlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChudW1iZXIsIHBhZCkge1xuICAgICAgcmV0dXJuIHplcm9GaWxsKHdpZHRoLCBudW1iZXIsIHBhZClcbiAgICB9XG4gIH1cbiAgaWYgKHBhZCA9PT0gdW5kZWZpbmVkKSBwYWQgPSAnMCdcbiAgd2lkdGggLT0gbnVtYmVyLnRvU3RyaW5nKCkubGVuZ3RoXG4gIGlmICh3aWR0aCA+IDApIHJldHVybiBuZXcgQXJyYXkod2lkdGggKyAoL1xcLi8udGVzdChudW1iZXIpID8gMiA6IDEpKS5qb2luKHBhZCkgKyBudW1iZXJcbiAgcmV0dXJuIG51bWJlciArICcnXG59XG4iLCJpbXBvcnQgVmlkZW8gZnJvbSBcIi4vdmlkZW9cIlxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCBVSSBmcm9tIFwiLi91aVwiXG5pbXBvcnQgU3VicyBmcm9tIFwiLi9zdWJzXCJcbmltcG9ydCBOZXRmbGl4IGZyb20gXCIuL3NlcnZpY2VzL25ldGZsaXhcIlxuaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5cbmNsYXNzIEV2ZW50c0hhbmRsZXJzIHtcbiAgdmlkZW9FbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50O1xuICBzdWJzOiBzdWJUaXRsZVR5cGVbXTtcbiAgc3Vic1Byb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHN1YnNFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuICB0cmFuc2xhdGVPcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB0cmFuc2xhdGVSZXN1bHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IodmlkZW9FbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50LCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIHRoaXMudmlkZW9FbGVtZW50ID0gdmlkZW9FbGVtZW50O1xuICAgIHRoaXMuc3VicyA9IHN1YnM7XG4gICAgdGhpcy5zdWJzRWxlbWVudCA9IHN1YnNFbGVtZW50O1xuICAgIHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCA9IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IHRoaXMuY3JlYXRlUmVzaXplT2JzZXJ2ZXIoKVxuICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVyID0gdGhpcy5rZXlib2FyZEhhbmRsZXIuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic1dvcmRNb3VzZU92ZXIgPSB0aGlzLnN1YnNXb3JkTW91c2VPdmVyLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNXb3JkTW91c2VPdXQgPSB0aGlzLnN1YnNXb3JkTW91c2VPdXQuYmluZCh0aGlzKVxuICAgIHRoaXMudmlkZW9PblRpbWVVcGRhdGUgPSB0aGlzLnZpZGVvT25UaW1lVXBkYXRlLmJpbmQodGhpcylcbiAgICB0aGlzLnZpZGVvUGF1c2UgPSB0aGlzLnZpZGVvUGF1c2UuYmluZCh0aGlzKVxuICAgIHRoaXMuY3JlYXRlUmVzaXplT2JzZXJ2ZXIgPSB0aGlzLmNyZWF0ZVJlc2l6ZU9ic2VydmVyLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNNb3VzZUVudGVyID0gdGhpcy5zdWJzTW91c2VFbnRlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzTW91c2VMZWF2ZSA9IHRoaXMuc3Vic01vdXNlTGVhdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic0NsaWNrID0gdGhpcy5zdWJzQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtb3JpZ2luYWxcIilcbiAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVhc3lzdWJzLXRyYW5zbGF0ZS1yZXN1bHRcIilcbiAgICB0aGlzLnRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlXCIpXG4gICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtY29udGFpbmVyXCIpXG4gIH1cblxuICBhZGRFdmVudHMoKSB7XG4gICAgW1wia2V5dXBcIiwgXCJrZXlkb3duXCIsIFwia2V5cHJlc3NcIl0uZm9yRWFjaChldmVudFR5cGUgPT4ge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMua2V5Ym9hcmRIYW5kbGVyLCB0cnVlKTtcbiAgICB9KVxuICAgIHRoaXMuc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgdGhpcy5zdWJzTW91c2VFbnRlcik7XG4gICAgdGhpcy5zdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLnN1YnNNb3VzZUxlYXZlKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIHRoaXMuc3Vic1dvcmRNb3VzZU92ZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB0aGlzLnN1YnNXb3JkTW91c2VPdXQpO1xuICAgIHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIHRoaXMudmlkZW9PblRpbWVVcGRhdGUpO1xuICAgIHRoaXMudmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwYXVzZVwiLCB0aGlzLnZpZGVvUGF1c2UpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQpO1xuICAgIHRoaXMuc3Vic0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3Vic0NsaWNrKTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50cygpIHtcbiAgICBbXCJrZXl1cFwiLCBcImtleWRvd25cIiwgXCJrZXlwcmVzc1wiXS5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5rZXlib2FyZEhhbmRsZXIsIHRydWUpO1xuICAgIH0pXG4gICAgdGhpcy5zdWJzRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLnN1YnNNb3VzZUVudGVyKTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuc3Vic01vdXNlTGVhdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdGhpcy5zdWJzV29yZE1vdXNlT3Zlcik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuc3Vic1dvcmRNb3VzZU91dCk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdGhpcy52aWRlb09uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIHRoaXMudmlkZW9QYXVzZSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1YnNDbGljayk7XG4gIH1cblxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIHNlcnZpY2UgbWV0aG9kXG4gICAgaWYgKFV0aWxzLmRldGVjdFNlcnZpY2UoKS5jb25zdHJ1Y3Rvci5uYW1lID09IFwiTmV0ZmxpeFwiKSB7IHJldHVybiB9XG5cbiAgICBpZiAoZXZlbnQuY29kZSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmIChldmVudC50eXBlID09IFwia2V5ZG93blwiKSB7IFZpZGVvLm1vdmVUb1ByZXZTdWIodGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3VicywgdGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KSB9XG4gICAgfSBpZiAoZXZlbnQuY29kZSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PSBcImtleWRvd25cIikgeyBWaWRlby5tb3ZlVG9OZXh0U3ViKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCkgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic01vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5wbGF5KClcbiAgfVxuXG4gIHByaXZhdGUgc3Vic1dvcmRNb3VzZU92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgZWxlbWVudCA9IDxIVE1MU3BhbkVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lID09PSAnZWFzeXN1YnMtd29yZCcpIHtcbiAgICAgIGNvbnN0IHdvcmRzID0gZWxlbWVudC50ZXh0Q29udGVudC5tYXRjaCgvW15cXFdcXGRdKFxcd3xbLSddezEsMn0oPz1cXHcpKSovKVxuICAgICAgaWYgKHdvcmRzID09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgd2luZG93LnNob3dUcmFuc2xhdGlvbiA9IHRydWVcblxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjb250ZW50U2NyaXB0UXVlcnk6ICdnZXRTaW5nbGVUcmFuc2xhdGlvbicsIHRleHQ6IHdvcmRzWzBdLCBsYW5nOiBcInJ1XCIgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IG1haW5UcmFuc2xhdGlvbiA9IHJlc3BvbnNlWzBdWzBdWzBdXG4gICAgICAgIGNvbnN0IGFsdGVybmF0aXZlVHJhbnNsYXRpb25zID0gcmVzcG9uc2VbMV0gfHwgW11cblxuICAgICAgICBVSS5zZXRUcmFuc2xhdGlvbihcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgICAgdGhpcy50cmFuc2xhdGVPcmlnaW5hbEVsZW1lbnQsXG4gICAgICAgICAgdGhpcy50cmFuc2xhdGVSZXN1bHRFbGVtZW50LFxuICAgICAgICAgIHdvcmRzWzBdLFxuICAgICAgICAgIG1haW5UcmFuc2xhdGlvbixcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudCxcbiAgICAgICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc1xuICAgICAgICApXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNXb3JkTW91c2VPdXQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgZWxlbWVudCA9IDxIVE1MU3BhbkVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZSA9PT0gXCJlYXN5c3Vicy13b3JkXCIgfHwgZWxlbWVudC5pZCA9PT0gXCJlYXN5c3Vic1wiKSB7XG4gICAgICB3aW5kb3cuc2hvd1RyYW5zbGF0aW9uID0gZmFsc2VcbiAgICAgIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2aWRlb09uVGltZVVwZGF0ZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBjdXJyZW50U3ViID0gU3Vicy51cGRhdGVTdWJzKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic0VsZW1lbnQpO1xuICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3VicywgdGhpcy52aWRlb0VsZW1lbnQucGF1c2VkKTtcbiAgICBpZiAoY3VycmVudFN1YiA9PSBudWxsICYmIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudC5zdHlsZS5kaXNwbGF5ICE9IFwibm9uZVwiKSB7XG4gICAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlkZW9QYXVzZShldmVudDogRXZlbnQpIHtcbiAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0Jhcih0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVSZXNpemVPYnNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3VicywgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNDbGljayhldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCB0ZXh0ID0gdGhpcy5zdWJzRWxlbWVudC50ZXh0Q29udGVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcblxuICAgIGlmIChlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlYXN5c3Vicy13b3JkLXRyYW5zbGF0ZVwiKS5sZW5ndGggIT0gMCkgeyByZXR1cm47IH1cbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNvbnRlbnRTY3JpcHRRdWVyeTogJ3RyYW5zbGF0ZScsIHRleHQ6IHRleHQsIGxhbmc6IFwicnVcIiB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgIFV0aWxzLnJlbW92ZUFsbEVsZW1lbnRzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikpO1xuICAgICAgVUkuc2V0VHJhbnNsYXRpb24oXG4gICAgICAgIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgdGhpcy50cmFuc2xhdGVPcmlnaW5hbEVsZW1lbnQsXG4gICAgICAgIHRoaXMudHJhbnNsYXRlUmVzdWx0RWxlbWVudCxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgcmVzcG9uc2UuZGF0YVswXSxcbiAgICAgICAgdGhpcy50cmFuc2xhdGVBbHRlcm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIFtdXG4gICAgICApXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzSGFuZGxlcnM7XG4iLCJpbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuL3JlYWR5XCJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBVSSBmcm9tIFwiLi91aVwiXG5pbXBvcnQgRXZlbnRzSGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRzX2hhbmRsZXJzXCJcbmltcG9ydCBZb3VUdWJlIGZyb20gXCIuL3NlcnZpY2VzL3lvdXR1YmVcIjtcbmltcG9ydCBOZXRmbGl4IGZyb20gXCIuL3NlcnZpY2VzL25ldGZsaXhcIjtcbmltcG9ydCBPbnZpeCBmcm9tIFwiLi9zZXJ2aWNlcy9vbnZpeFwiO1xuaW1wb3J0IEtpbm9QdWIgZnJvbSBcIi4vc2VydmljZXMva2lub3B1YlwiO1xuXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHNlcnZpY2UgPSBVdGlscy5kZXRlY3RTZXJ2aWNlKClcbiAgaWYgKHNlcnZpY2UgPT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gIGNvbnNvbGUubG9nKFwiRWFzeVN1YnMgaW5pdGlhbGl6ZWQuIFNlcnZpY2U6IFwiICsgc2VydmljZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHdpbmRvdy5pbml0aWFsaXplSW5Qcm9ncmVzcyA9IGZhbHNlXG5cbiAgcmVhZHkoJ3ZpZGVvJywgZnVuY3Rpb24gKHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgIGluaXRpYWxpemUoc2VydmljZSwgdmlkZW9FbGVtZW50KVxuICAgIGxldCBldmVudHNIYW5kbGVyOiBFdmVudHNIYW5kbGVycyA9IG51bGxcbiAgICBsZXQgb2xkSHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgIGlmIChvbGRIcmVmICE9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpIHtcbiAgICAgICAgICBpZiAoZXZlbnRzSGFuZGxlcikgeyBldmVudHNIYW5kbGVyLnJlbW92ZUV2ZW50cygpOyB9XG4gICAgICAgICAgaW5pdGlhbGl6ZShzZXJ2aWNlLCB2aWRlb0VsZW1lbnQpXG4gICAgICAgICAgb2xkSHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBjb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9O1xuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIiksIGNvbmZpZyk7XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKHNlcnZpY2U6IFlvdVR1YmUgfCBOZXRmbGl4IHwgT252aXggfCBLaW5vUHViLCB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICAgIGlmICh3aW5kb3cuaW5pdGlhbGl6ZUluUHJvZ3Jlc3MpIHsgcmV0dXJuIH1cbiAgICAgIHdpbmRvdy5pbml0aWFsaXplSW5Qcm9ncmVzcyA9IHRydWVcbiAgICAgIHdpbmRvdy5zaG93VHJhbnNsYXRpb24gPSB0cnVlXG5cbiAgICAgIGNvbnN0IHBsYXllckNvbnRhaW5lckVsZW1lbnQgPSBzZXJ2aWNlLnBsYXllckNvbnRhaW5lckVsZW1lbnQoKVxuXG4gICAgICBsZXQgc3Vic0VsZW1lbnQgPSBVSS5jcmVhdGVTdWJzRWxlbWVudChwbGF5ZXJDb250YWluZXJFbGVtZW50KTtcbiAgICAgIGxldCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50ID0gVUkuY3JlYXRlU3Vic1Byb2dyZXNzQmFyRWxlbWVudChwbGF5ZXJDb250YWluZXJFbGVtZW50KTtcblxuICAgICAgc2VydmljZS5nZXRTdWJzKFwiZW5nXCIpXG4gICAgICAgIC50aGVuKHN1YnMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VidGl0bGVzIGxvYWRlZC4gc3VicyBjb3VudDogXCIgKyBzdWJzLmxlbmd0aClcblxuICAgICAgICAgIHN1YnNFbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjsgLy8gQ2xlYXIgc3VicyBsb2FkaW5nIHRleHRcbiAgICAgICAgICBldmVudHNIYW5kbGVyID0gbmV3IEV2ZW50c0hhbmRsZXJzKHZpZGVvRWxlbWVudCwgc3Vicywgc3Vic0VsZW1lbnQsIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQpXG4gICAgICAgICAgZXZlbnRzSGFuZGxlci5hZGRFdmVudHMoKTtcbiAgICAgICAgICB3aW5kb3cuaW5pdGlhbGl6ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuICAgICAgICB9KVxuICAgIH1cbiAgfSk7XG59KTtcbiIsImludGVyZmFjZSBMaXN0ZW5lciB7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGZuOiBGdW5jdGlvbjtcbn1cblxuaW50ZXJmYWNlIEVsZW1lbnRPYmplY3Qge1xuICByZWFkeTogYm9vbGVhblxufVxubGV0IGxpc3RlbmVyczogTGlzdGVuZXJbXSA9IFtdXG5sZXQgb2JzZXJ2ZXJcblxuZnVuY3Rpb24gY2hlY2soKSB7XG4gIC8vIENoZWNrIHRoZSBET00gZm9yIGVsZW1lbnRzIG1hdGNoaW5nIGEgc3RvcmVkIHNlbGVjdG9yXG4gIGZvciAodmFyIGkgPSAwLCBsZW46IE51bWJlciA9IGxpc3RlbmVycy5sZW5ndGgsIGxpc3RlbmVyOiBMaXN0ZW5lciwgZWxlbWVudHM6IEVsZW1lbnRPYmplY3RbXTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgLy8gUXVlcnkgZm9yIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3JcbiAgICBlbGVtZW50cyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGxpc3RlbmVyLnNlbGVjdG9yKSBhcyB1bmtub3duIGFzIEVsZW1lbnRPYmplY3RbXTtcbiAgICBmb3IgKHZhciBqID0gMCwgakxlbiA9IGVsZW1lbnRzLmxlbmd0aCwgZWxlbWVudDsgaiA8IGpMZW47IGorKykge1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnRzW2pdO1xuICAgICAgLy8gTWFrZSBzdXJlIHRoZSBjYWxsYmFjayBpc24ndCBpbnZva2VkIHdpdGggdGhlIFxuICAgICAgLy8gc2FtZSBlbGVtZW50IG1vcmUgdGhhbiBvbmNlXG4gICAgICBpZiAoIWVsZW1lbnQucmVhZHkpIHtcbiAgICAgICAgZWxlbWVudC5yZWFkeSA9IHRydWU7XG4gICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgZWxlbWVudFxuICAgICAgICBsaXN0ZW5lci5mbi5jYWxsKGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoc2VsZWN0b3I6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gIC8vIFN0b3JlIHRoZSBzZWxlY3RvciBhbmQgY2FsbGJhY2sgdG8gYmUgbW9uaXRvcmVkXG4gIGxpc3RlbmVycy5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZm46IGZuXG4gIH0pO1xuXG4gIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2hlY2spO1xuICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZVxuICB9KTtcblxuICAvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgaW4gdGhlIERPTVxuICBjaGVjaygpO1xufVxuIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSAnc2VydmljZSdcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSwgcGFyc2UgfSBmcm9tICdzdWJ0aXRsZSdcbmltcG9ydCBIbHMgZnJvbSBcImhscy5qc1wiXG5pbXBvcnQgeyBQYXJzZXIgfSBmcm9tICdtM3U4LXBhcnNlcic7XG5cbmludGVyZmFjZSBQYXJzZXIge1xufVxuXG5jbGFzcyBLaW5vUHViIGltcGxlbWVudHMgU2VydmljZSB7XG4gIGFzeW5jIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IHNlYXNvbkFuZEVwaXNvZGUgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgLm1hdGNoKG5ldyBSZWdFeHAoXCIvaXRlbS92aWV3Ly4qL1wiICsgXCIoLiopXCIpKVsxXVxuICAgICAgLm1hdGNoKG5ldyBSZWdFeHAoXCJzKFswLTldKyllKFswLTldKylcIikpXG5cbiAgICAvLyBQcmV2ZW50IGV4Y2VwdGlvbnMgb24gbG9hZGVyIHZpZGVvIHBhZ2VcbiAgICBpZiAoc2Vhc29uQW5kRXBpc29kZSA9PSBudWxsKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUocGFyc2UoXCJcIikpIH1cbiAgICBjb25zdCBzZWFzb24gPSBzZWFzb25BbmRFcGlzb2RlWzFdXG4gICAgY29uc3QgZXBpc29kZSA9IHNlYXNvbkFuZEVwaXNvZGVbMl1cblxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGVudFwiKS5xdWVyeVNlbGVjdG9yKFwic2NyaXB0XCIpXG4gICAgY29uc3QgcGxheWxpc3QgPSBldmFsKHNjcmlwdC5pbm5lckhUTUwuc3BsaXQoXCJ2YXIgcGxheWxpc3QgPSBcIilbMV0pO1xuICAgIGNvbnN0IGN1cnJlbnRFcGlzb2RlID0gcGxheWxpc3QuZmluZCgoZXA6IHsgc251bWJlcjogbnVtYmVyLCB2bnVtYmVyOiBudW1iZXIgfSkgPT4ge1xuICAgICAgcmV0dXJuIGVwLnNudW1iZXIudG9TdHJpbmcoKSA9PSBzZWFzb24gJiYgZXAudm51bWJlci50b1N0cmluZygpID09IGVwaXNvZGVcbiAgICB9KVxuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKGN1cnJlbnRFcGlzb2RlLmZpbGUpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLnRleHQoKTtcblxuICAgIHZhciBwYXJzZXIgPSBuZXcgKDxhbnk+UGFyc2VyKSgpO1xuICAgIHBhcnNlci5wdXNoKGRhdGEpO1xuICAgIHBhcnNlci5lbmQ7XG4gICAgY29uc3Qgc3Vic1NlZ21lbnRzID0gcGFyc2VyLm1hbmlmZXN0Lm1lZGlhR3JvdXBzLlNVQlRJVExFUy5zdWI7XG4gICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXMoc3Vic1NlZ21lbnRzKS5maW5kKGtleV8xID0+IGtleV8xLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobGFuZ3VhZ2UpKTtcbiAgICBjb25zdCB1cmkgPSBcImh0dHBzOi8vY2RuLnN0cmVhbWJveC5pblwiICsgc3Vic1NlZ21lbnRzW2tleV0udXJpO1xuXG4gICAgY29uc3Qgc3Vic1NlZ21lbnRzUmVzcCA9IGF3YWl0IGZldGNoKHVyaSk7XG4gICAgY29uc3Qgc3Vic1NlZ21lbnRzRGF0YSA9IGF3YWl0IHN1YnNTZWdtZW50c1Jlc3AudGV4dCgpO1xuXG4gICAgdmFyIHN1YnNTZWdtZW50c1BhcnNlciA9IG5ldyAoPGFueT5QYXJzZXIpKCk7XG4gICAgc3Vic1NlZ21lbnRzUGFyc2VyLnB1c2goc3Vic1NlZ21lbnRzRGF0YSk7XG4gICAgc3Vic1NlZ21lbnRzUGFyc2VyLmVuZDtcbiAgICBjb25zdCBzdWJQYXRoID0gc3Vic1NlZ21lbnRzUGFyc2VyLm1hbmlmZXN0LnNlZ21lbnRzWzBdLnVyaS5tYXRjaCgvLipcXC9obHNcXC8oLiopXFwvc2VnLiovKVsxXTtcbiAgICBjb25zdCBzdWJVcmkgPSBcImh0dHBzOi8vY2RuLnN0cmVhbWJveC5pbi9wZC9cIiArIHN1YlBhdGg7XG5cbiAgICBjb25zdCBzdWJzUmVzcCA9IGF3YWl0IGZldGNoKHN1YlVyaSk7XG4gICAgY29uc3Qgc3Vic0RhdGEgPSBhd2FpdCBzdWJzUmVzcC50ZXh0KCk7XG4gICAgcmV0dXJuIHBhcnNlKHN1YnNEYXRhKTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYXllclwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtpbm9QdWI7XG4iLCJpbXBvcnQgU2VydmljZSBmcm9tICdzZXJ2aWNlJ1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlLCBwYXJzZSB9IGZyb20gJ3N1YnRpdGxlJ1xuaW1wb3J0IHsgYWxwaGEzVFRvQWxwaGEyIH0gZnJvbSBcIkBjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXNcIjtcblxuY29uc3QgV0VCVlRUID0gJ3dlYnZ0dC1sc3NkaC1pb3M4JztcbmNvbnN0IE1BSU5fVElUTEUgPSAnLnBsYXllci1zdGF0dXMtbWFpbi10aXRsZSwgLmVsbGlwc2l6ZS10ZXh0Pmg0LCAudmlkZW8tdGl0bGU+aDQnO1xuY29uc3QgU1VCX1RZUEVTID0ge1xuICAnc3VidGl0bGVzJzogJycsXG4gICdjbG9zZWRjYXB0aW9ucyc6ICdbY2NdJ1xufTtcblxuaW50ZXJmYWNlIFRyYWNrIHtcbiAgaXNOb25lVHJhY2s6IGJvb2xlYW4sXG4gIGlzRm9yY2VkTmFycmF0aXZlOiBib29sZWFuLFxuICBsYW5ndWFnZTogc3RyaW5nLFxuICByYXdUcmFja1R5cGU6IFwic3VidGl0bGVzXCIgfCBcImNsb3NlZGNhcHRpb25zXCIsXG4gIHR0RG93bmxvYWRhYmxlczoge1xuICAgIFwid2VidnR0LWxzc2RoLWlvczhcIjoge1xuICAgICAgZG93bmxvYWRVcmxzOiB7fVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBOZXRmbGl4IGltcGxlbWVudHMgU2VydmljZSB7XG4gIHN1YkNhY2hlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdWJDYWNoZSA9IHt9XG4gICAgdGhpcy5wcm9jZXNzU3ViRGF0YSA9IHRoaXMucHJvY2Vzc1N1YkRhdGEuYmluZCh0aGlzKVxuICAgIHRoaXMuaW5qZWN0U2NyaXB0KClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZWFzeXN1YnNfZGF0YScsIHRoaXMucHJvY2Vzc1N1YkRhdGEpXG4gIH1cblxuICBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBsYW5ndWFnZUFscGhhMiA9IGFscGhhM1RUb0FscGhhMihsYW5ndWFnZSlcbiAgICBjb25zdCBsYW5nS2V5ID0gT2JqZWN0LmtleXModGhpcy5zdWJDYWNoZSkuZmluZChrZXkgPT4ga2V5LmluY2x1ZGVzKGxhbmd1YWdlQWxwaGEyKSlcbiAgICBjb25zdCBzdWJVcmkgPSB0aGlzLnN1YkNhY2hlW2xhbmdLZXldXG4gICAgcmV0dXJuIGZldGNoKHN1YlVyaSlcbiAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC50ZXh0KCkpXG4gICAgICAudGhlbihkYXRhID0+IHBhcnNlKGRhdGEpKVxuICB9XG5cbiAgcGxheWVyQ29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuVmlkZW9Db250YWluZXJcIilcbiAgfVxuXG4gIHByaXZhdGUgaW5qZWN0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IFdFQlZUVCA9IFwid2VidnR0LWxzc2RoLWlvczhcIjtcbiAgICAvLyBoaWphY2sgSlNPTi5wYXJzZSBhbmQgSlNPTi5zdHJpbmdpZnkgZnVuY3Rpb25zXG4gICAgKChwYXJzZSwgc3RyaW5naWZ5KSA9PiB7XG4gICAgICBKU09OLnBhcnNlID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHBhcnNlKHRleHQpO1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnJlc3VsdCAmJiBkYXRhLnJlc3VsdC50aW1lZHRleHR0cmFja3MgJiYgZGF0YS5yZXN1bHQubW92aWVJZCkge1xuICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnZWFzeXN1YnNfZGF0YScsIHsgZGV0YWlsOiBkYXRhLnJlc3VsdCB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9O1xuICAgICAgSlNPTi5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoZGF0YTogYW55KSB7XG5cbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5wYXJhbXMgJiYgZGF0YS5wYXJhbXMucHJvZmlsZXMpIHtcbiAgICAgICAgICBkYXRhLnBhcmFtcy5wcm9maWxlcy51bnNoaWZ0KFdFQlZUVCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmluZ2lmeShkYXRhKTtcbiAgICAgIH07XG4gICAgfSkoSlNPTi5wYXJzZSwgSlNPTi5zdHJpbmdpZnkpO1xuICB9XG5cbiAgcHJpdmF0ZSByYW5kb21Qcm9wZXJ0eSA9IChvYmo6IGFueSkgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIHJldHVybiBvYmpba2V5c1trZXlzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkgPDwgMF1dO1xuICB9O1xuXG4gIHByaXZhdGUgcHJvY2Vzc1N1YkRhdGEoZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKFwiKysrKysrKysrKysrXCIpO1xuXG4gICAgaWYgKGV2ZW50LmRldGFpbC52aWV3YWJsZVR5cGUgIT0gXCJFUElTT0RFXCIpIHsgcmV0dXJuIH1cbiAgICBjb25zdCB0cmFja3M6IFRyYWNrW10gPSBldmVudC5kZXRhaWwudGltZWR0ZXh0dHJhY2tzO1xuXG4gICAgZm9yIChjb25zdCB0cmFjayBvZiB0cmFja3MpIHtcblxuICAgICAgaWYgKHRyYWNrLmlzTm9uZVRyYWNrKSB7IGNvbnRpbnVlIH1cblxuICAgICAgbGV0IHR5cGUgPSBTVUJfVFlQRVNbdHJhY2sucmF3VHJhY2tUeXBlXTtcbiAgICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIHR5cGUgPSBgWyR7dHJhY2sucmF3VHJhY2tUeXBlfV1gO1xuICAgICAgY29uc3QgbGFuZyA9IHRyYWNrLmxhbmd1YWdlICsgdHlwZSArICh0cmFjay5pc0ZvcmNlZE5hcnJhdGl2ZSA/ICctZm9yY2VkJyA6ICcnKTtcblxuICAgICAgdGhpcy5zdWJDYWNoZVtsYW5nXSA9IHRoaXMucmFuZG9tUHJvcGVydHkodHJhY2sudHREb3dubG9hZGFibGVzW1dFQlZUVF0uZG93bmxvYWRVcmxzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluamVjdFNjcmlwdCgpIHtcbiAgICBjb25zdCBzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjLmlubmVySFRNTCA9ICcoJyArIHRoaXMuaW5qZWN0aW9uLnRvU3RyaW5nKCkgKyAnKSgpJztcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjKTtcbiAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKHNjKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOZXRmbGl4O1xuIiwiaW1wb3J0IHsgcGFyc2UsIHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuaW1wb3J0IFVJIGZyb20gXCIuLi91aVwiXG5cbmNsYXNzIE9udml4IHtcbiAgYXN5bmMgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKTogUHJvbWlzZTxzdWJUaXRsZVR5cGVbXT4ge1xuICAgIGNvbnN0IHZpZGVvVHlwZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMV1cbiAgICBjb25zdCBiYXNlX3BhdGhuYW1lID0gXCIvYXBpL3YxL3N0cmVhbWluZy9cIlxuICAgIGNvbnN0IHZpZGVvSWQgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdXG4gICAgY29uc3Qgc3RyZWFtID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIiZcIilbMF0uc3BsaXQoXCI9XCIpWzFdXG4gICAgY29uc3Qgc2Vhc29uID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIiZcIilbMV1cbiAgICBjb25zdCBlcGlzb2RlID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIiZcIilbMl1cblxuICAgIGxldCB1cmwgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7YmFzZV9wYXRobmFtZX0ke3ZpZGVvVHlwZX1zLyR7dmlkZW9JZH0vJHtzdHJlYW19Lmpzb24/YFxuICAgIGlmICh2aWRlb1R5cGUgPT0gXCJzZXJpYWxcIikgeyB1cmwgPSBgJHt1cmx9JHtzZWFzb259JiR7ZXBpc29kZX1gIH1cblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKTtcbiAgICBjb25zdCBzdWJzX3VybCA9IGRhdGEubWVkaWFfZmlsZXMudnR0LmZpbmQoKGVsOiB7IHNyY2xhbmc6IHN0cmluZyB9KSA9PiBlbC5zcmNsYW5nID09PSBsYW5ndWFnZSkuc3JjO1xuICAgIGNvbnN0IHJlc3BfMSA9IGF3YWl0IGZldGNoKHN1YnNfdXJsKTtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcF8xLnRleHQoKTtcbiAgICByZXR1cm4gcGFyc2UodGV4dCk7XG4gIH1cblxuICBwbGF5ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mcC11aVwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9udml4O1xuIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSAnc2VydmljZSdcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSwgcGFyc2UgfSBmcm9tICdzdWJ0aXRsZSdcbmltcG9ydCB7IGFscGhhM1RUb0FscGhhMiB9IGZyb20gXCJAY29zcGlyZWQvaTE4bi1pc28tbGFuZ3VhZ2VzXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4uL3VpXCJcblxuaW50ZXJmYWNlIFN1YnRpdGxlIHtcbiAgYmFzZVVybDogc3RyaW5nXG4gIGlzVHJhbnNsYXRhYmxlOiBib29sZWFuXG4gIGxhbmd1YWdlQ29kZTogc3RyaW5nXG4gIG5hbWU6IHsgc2ltcGxlVGV4dDogc3RyaW5nIH1cbiAgdnNzSWQ6IHN0cmluZ1xufVxuXG5jbGFzcyBZb3VUdWJlIGltcGxlbWVudHMgU2VydmljZSB7XG4gIGFzeW5jIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZGVvSWQgPSB0aGlzLmdldFZpZGVvSWQoKVxuICAgIGNvbnN0IGxhbmcgPSBhbHBoYTNUVG9BbHBoYTIobGFuZ3VhZ2UpXG5cbiAgICBjb25zdCBzdWJJdGVtID0gYXdhaXQgdGhpcy5nZXRWaWRlb0luZm8odmlkZW9JZCwgbGFuZyk7XG4gICAgY29uc3Qgc3ViVXJpOiBzdHJpbmcgPSBzdWJJdGVtLmJhc2VVcmwgKyBcIiZmbXQ9dnR0XCI7XG5cbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goc3ViVXJpKTtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcC50ZXh0KCk7XG4gICAgcmV0dXJuIHBhcnNlKHRleHQpO1xuICB9XG5cbiAgcGxheWVyQ29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHRtbDUtdmlkZW8tcGxheWVyXCIpXG4gIH1cblxuICBnZXRWaWRlb0lkKCkge1xuICAgIGNvbnN0IHJlZ0V4cHJlc3Npb24gPSAvXi4qKHlvdXR1XFwuYmVcXC98dlxcL3x1XFwvXFx3XFwvfGVtYmVkXFwvfHdhdGNoXFw/dj18XFwmdj0pKFteI1xcJlxcP10qKS4qLztcbiAgICB2YXIgbWF0Y2ggPSB3aW5kb3cubG9jYXRpb24uaHJlZi5tYXRjaChyZWdFeHByZXNzaW9uKTtcbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0ubGVuZ3RoID09IDExKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDYW4ndCBnZXQgeW91dHViZSB2aWRlbyBpZFwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFZpZGVvSW5mbyh2aWRlb0lkOiBzdHJpbmcsIGxhbmc6IHN0cmluZykge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly95b3V0dWJlLmNvbS9nZXRfdmlkZW9faW5mbz92aWRlb19pZD0ke3ZpZGVvSWR9YCk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpO1xuICAgIGNvbnN0IGRhdGEgPSBkZWNvZGVVUklDb21wb25lbnQodGV4dCk7XG5cbiAgICBpZiAoIWRhdGEuaW5jbHVkZXMoJ2NhcHRpb25UcmFja3MnKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgY2FwdGlvbnMgZm9yIHZpZGVvOiAke3ZpZGVvSWR9YCk7XG5cbiAgICBjb25zdCByZWdleCA9IC8oe1wiY2FwdGlvblRyYWNrc1wiOi4qaXNUcmFuc2xhdGFibGVcIjoodHJ1ZXxmYWxzZSl9XSkvO1xuICAgIGNvbnN0IFttYXRjaF0gPSByZWdleC5leGVjKGRhdGEpO1xuICAgIGNvbnN0IHsgY2FwdGlvblRyYWNrcyB9ID0gSlNPTi5wYXJzZShgJHttYXRjaH19YCk7XG5cbiAgICBjb25zdCBzdWJ0aXRsZTogU3VidGl0bGUgPSBjYXB0aW9uVHJhY2tzLmZpbmQoKHRyYWNrOiBhbnkpID0+IHsgcmV0dXJuIHRyYWNrLnZzc0lkID09IGAuJHtsYW5nfWA7IH0pIHx8XG4gICAgICBjYXB0aW9uVHJhY2tzLmZpbmQoKHRyYWNrOiBhbnkpID0+IHsgcmV0dXJuIHRyYWNrLnZzc0lkID09IGBhLiR7bGFuZ31gOyB9KSB8fFxuICAgICAgY2FwdGlvblRyYWNrcy5maW5kKCh0cmFjazogYW55KSA9PiB7IHJldHVybiB0cmFjay52c3NJZC5tYXRjaChgLiR7bGFuZ31gKTsgfSk7XG5cbiAgICBpZiAoIXN1YnRpdGxlIHx8IChzdWJ0aXRsZSAmJiAhc3VidGl0bGUuYmFzZVVybCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kICR7bGFuZ30gY2FwdGlvbnMgZm9yICR7dmlkZW9JZH1gKTtcblxuICAgIHJldHVybiBzdWJ0aXRsZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZb3VUdWJlO1xuIiwiaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVmlkZW8gZnJvbSBcIi4vdmlkZW9cIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IGFuaW1lIGZyb20gXCJhbmltZWpzXCJcblxuY29uc3Qgc3Vic0FuaW1hdGVEdXJhdGlvbjogbnVtYmVyID0gMzAwO1xuY29uc3Qgc3Vic0FuaW1hdGVDb21wZW5zYXRpb25HYXA6IG51bWJlciA9IHN1YnNBbmltYXRlRHVyYXRpb24gLyAyIC8vIE1vdGlvbiBhbmltYXRpb24gY29tcGVuc2F0aW9uXG5cbmNsYXNzIFN1YnMge1xuICBzdGF0aWMgdXBkYXRlU3Vicyh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10sIHN1YnNFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBjdXJyZW50VGltZSA9IFZpZGVvLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBsZXQgY3VycmVudFN1YiA9IHRoaXMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIHN1YnNFbGVtZW50LmlubmVySFRNTCA9IGN1cnJlbnRTdWIudGV4dC5yZXBsYWNlKFxuICAgICAgICAvKF58PFxcLz9bXj5dKz58XFxzKykoW15cXHM8XSspL2csXG4gICAgICAgICckMTxzcGFuIGNsYXNzPVwiZWFzeXN1YnMtd29yZFwiPiQyPC9zcGFuPidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YnNFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50U3ViXG4gIH1cblxuICBzdGF0aWMgZ2V0Q3VycmVudFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcikge1xuICAgIHJldHVybiBzdWJzLmZpbmQoKHN1Yjogc3ViVGl0bGVUeXBlKSA9PiBzdWIuc3RhcnQgPD0gY3VycmVudFRpbWUgJiYgc3ViLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcmV2U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgLSAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKChzdWIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChzdWJzW2luZGV4ICsgMV0gPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Yi5lbmQgPD0gY3VycmVudFRpbWUgJiYgc3Vic1tpbmRleCArIDFdLnN0YXJ0ID49IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXROZXh0U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgKyAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKHN1YiA9PiBzdWIuc3RhcnQgPj0gY3VycmVudFRpbWUpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVN1YnNQcm9ncmVzc0JhcihzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCwgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBoYXJkTW92ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgdGltZVBlcmlvZCA9IDMwMDAwOyAvLyAzMCBzZWNvbmRzXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgbXNJblB4ID0gKHByb2dyZXNzQmFyV2lkdGggLyB0aW1lUGVyaW9kKVxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gVmlkZW8uZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjdXJyZW50VGltZSArIHRpbWVQZXJpb2QgLyAyO1xuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3VycmVudFRpbWUgLSB0aW1lUGVyaW9kIC8gMjtcblxuICAgIGNvbnN0IHN1YnNJbkR1cmF0aW9uID0gc3Vicy5maWx0ZXIoc3ViID0+XG4gICAgICAoc3ViLmVuZCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5lbmQgPCBsZWZ0Qm9yZGVyKSB8fFxuICAgICAgKHN1Yi5zdGFydCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5zdGFydCA8IGxlZnRCb3JkZXIpXG4gICAgKTtcblxuICAgIGxldCBjdXJyZW50U3Vic0lkczogc3RyaW5nW10gPSBbXVxuICAgIGlmIChoYXJkTW92ZSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiKS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKVxuICAgIH1cbiAgICBzdWJzSW5EdXJhdGlvbi5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBjb25zdCBzdWJJZCA9IFwiaWRcIiArIHN1Yi5zdGFydCArIFwiLVwiICsgc3ViLmVuZFxuICAgICAgY3VycmVudFN1YnNJZHMucHVzaChzdWJJZClcbiAgICAgIGNvbnN0IGN1cnJlbnRTdWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJJZClcblxuICAgICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgICAgYW5pbWUoe1xuICAgICAgICAgIHRhcmdldHM6IGN1cnJlbnRTdWIsXG4gICAgICAgICAgdHJhbnNsYXRlWDogbXNJblB4ICogKChVdGlscy5jYXN0U3ViVGltZShzdWIuc3RhcnQpIC0gcmlnaHRCb3JkZXIpIC0gc3Vic0FuaW1hdGVDb21wZW5zYXRpb25HYXApLFxuICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgZHVyYXRpb246IHN1YnNBbmltYXRlRHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdWJXaWR0aCA9IG1zSW5QeCAqIChVdGlscy5jYXN0U3ViVGltZShzdWIuZW5kKSAtIFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5zdGFydCkpXG4gICAgICAgIGxldCBzdWJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzdWJEaXYuY2xhc3NOYW1lID0gXCJlYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiXG4gICAgICAgIHN1YkRpdi5pZCA9IHN1YklkXG4gICAgICAgIHN1YkRpdi5zdHlsZS53aWR0aCA9IHN1YldpZHRoLnRvRml4ZWQoMCkgKyBcInB4XCJcbiAgICAgICAgc3ViRGl2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBtc0luUHggKiAoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLnN0YXJ0KSAtIHJpZ2h0Qm9yZGVyKSArICdweCknO1xuICAgICAgICBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LmFwcGVuZENoaWxkKHN1YkRpdilcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbW92ZU9sZFByb2dyZXNzQmFyRWxlbWVudHMoc3Vic0luRHVyYXRpb246IHN1YlRpdGxlVHlwZVtdKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhc3lzdWJzLXByb2dyZXNzLWJhci1lbGVtZW50XCIpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFN1YnNJZHMuaW5jbHVkZXMoZWwuaWQpID09IGZhbHNlKSB7XG4gICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZU9sZFByb2dyZXNzQmFyRWxlbWVudHMoc3Vic0luRHVyYXRpb24pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdWJzO1xuIiwiY2xhc3MgVUkge1xuICBzdGF0aWMgY3JlYXRlU3Vic0VsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzdWJzQ29udGFpbmVyRWxlbWVudElkID0gXCJlYXN5c3Vic1wiO1xuICAgIGNvbnN0IHByZXZTdWJzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN1YnNDb250YWluZXJFbGVtZW50SWQpXG4gICAgaWYgKHByZXZTdWJzQ29udGFpbmVyRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gICAgbGV0IHN1YnNDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzdWJzQ29udGFpbmVyRWxlbWVudC5pZCA9IHN1YnNDb250YWluZXJFbGVtZW50SWQ7XG5cbiAgICBsZXQgc3Vic0lubmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3Vic0lubmVyRWxlbWVudC5jbGFzc05hbWUgPSBcImVhc3lzdWJzLXN1YnRpdGxlc1wiXG4gICAgc3Vic0NvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Vic0lubmVyRWxlbWVudCk7XG5cbiAgICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiTG9hZGluZyBzdWJ0aXRsZXMgLi4uXCIpO1xuICAgIHN1YnNJbm5lckVsZW1lbnQuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgcGxheWVyQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChzdWJzQ29udGFpbmVyRWxlbWVudCk7XG4gICAgdGhpcy5jcmVhdGVTdWJzVHJhbnNsYXRlRWxlbWVudChzdWJzQ29udGFpbmVyRWxlbWVudClcbiAgICByZXR1cm4gc3Vic0lubmVyRWxlbWVudDtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTdWJzVHJhbnNsYXRlRWxlbWVudChzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgdHJhbnNsYXRlVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0cmFuc2xhdGVUYWcuY2xhc3NOYW1lID0gXCJlYXN5c3Vicy10cmFuc2xhdGUtY29udGFpbmVyXCI7XG4gICAgdHJhbnNsYXRlVGFnLmlubmVySFRNTCA9IGBcbiAgICAgIDxkaXYgY2xhc3M9J2Vhc3lzdWJzLXRyYW5zbGF0ZS1yZXN1bHQnPlxuICAgICAgICB0ZXN0IHRyYW5zbGF0ZVxuICAgICAgPC9kaXY+XG4gICAgICA8aHI+XG4gICAgICA8ZGl2IGNsYXNzPSdlYXN5c3Vicy10cmFuc2xhdGUtb3JpZ2luYWwnPlxuICAgICAgICB0ZXN0XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9J2Vhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZSc+XG4gICAgICAgIGFsdGVybmF0aXZlIHRyYW5zbGF0aW9uc1xuICAgICAgPC9kaXY+XG4gICAgYFxuICAgIHN1YnNFbGVtZW50LmFwcGVuZENoaWxkKHRyYW5zbGF0ZVRhZyk7XG4gIH1cblxuICBzdGF0aWMgc2V0VHJhbnNsYXRpb24odHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQsIG9yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQsIHJlc3VsdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcmlnaW5hbFRleHQ6IHN0cmluZywgcmVzdWx0VGV4dDogc3RyaW5nLCB0cmFuc2xhdGVBbHRlcm5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uczogQXJyYXk8YW55Pikge1xuICAgIGlmICh3aW5kb3cuc2hvd1RyYW5zbGF0aW9uKSB7XG4gICAgICB0cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIG9yaWdpbmFsRWxlbWVudC5pbm5lckhUTUwgPSBvcmlnaW5hbFRleHRcbiAgICByZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IHJlc3VsdFRleHRcblxuICAgIGxldCBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgPSBcIlwiXG4gICAgaWYgKGFsdGVybmF0aXZlVHJhbnNsYXRpb25zLmxlbmd0aCAhPSAwKSB7XG4gICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9ucy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgKz0gYFxuICAgICAgICAgIDxwIGNsYXNzPSdlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtcGFydC1zcGVlY2gnPlxuICAgICAgICAgICAgJHtlbGVtWzBdfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgYFxuICAgICAgICBlbGVtWzJdLnNsaWNlKDAsIDUpLmZvckVhY2goKGFsdGVybmF0aXZlOiBhbnkpID0+IHtcbiAgICAgICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtaXRlbS10cmFuc2xhdGVcIj5cbiAgICAgICAgICAgICAgICAke2FsdGVybmF0aXZlWzBdfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLW9yaWdpbmFsXCI+XG4gICAgICAgICAgICAgICAgJHthbHRlcm5hdGl2ZVsxXS5zbGljZSgwLCAzKS5qb2luKCcsICcpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeVwiPlxuICAgICAgICAgICAgICAgICR7dGhpcy5mcmVxdWVuY3lUb0RvdHMoYWx0ZXJuYXRpdmVbM10pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWxcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHByb2dyZXNzQmFyQ2xhc3MgPSBcImVhc3lzdWJzLXByb2dyZXNzLWJhclwiXG4gICAgY29uc3QgcHJldlByb2dyZXNzQmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBwcm9ncmVzc0JhckNsYXNzKVxuICAgIGlmIChwcmV2UHJvZ3Jlc3NCYXJFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHByZXZQcm9ncmVzc0JhckVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG5cbiAgICBsZXQgcHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9ncmVzc0JhckVsZW1lbnQuY2xhc3NOYW1lID0gcHJvZ3Jlc3NCYXJDbGFzcztcbiAgICBwbGF5ZXJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZXNzQmFyRWxlbWVudClcbiAgICByZXR1cm4gcHJvZ3Jlc3NCYXJFbGVtZW50XG4gIH1cblxuICBzdGF0aWMgZnJlcXVlbmN5VG9Eb3RzKGZyZXF1ZW5jeTogbnVtYmVyKSB7XG4gICAgY29uc3QgcmF0ZSA9IGZyZXF1ZW5jeSAqIDEwMDAwXG4gICAgaWYgKHJhdGUgPj0gNTAwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgYFxuICAgIH0gZWxzZSBpZiAocmF0ZSA8IDUwMCAmJiByYXRlID49IDMwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZW1wdHlcIj48L2Rpdj5cbiAgICAgIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeS1kb3QgLWZpbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeS1kb3QgLWVtcHR5XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtaXRlbS1mcmVxdWVuY3ktZG90IC1lbXB0eVwiPjwvZGl2PlxuICAgICAgYFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTtcbiIsImltcG9ydCBPbnZpeCBmcm9tICcuL3NlcnZpY2VzL29udml4JztcbmltcG9ydCBLaW5vUHViIGZyb20gJy4vc2VydmljZXMva2lub3B1Yic7XG5pbXBvcnQgWW91VHViZSBmcm9tICcuL3NlcnZpY2VzL3lvdXR1YmUnO1xuaW1wb3J0IE5ldGZsaXggZnJvbSAnLi9zZXJ2aWNlcy9uZXRmbGl4JztcblxuY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgY2FzdFN1YlRpbWUodGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aW1lID09IFwibnVtYmVyXCIgPyB0aW1lIDogcGFyc2VJbnQodGltZSlcbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3RTZXJ2aWNlKCk6IFlvdVR1YmUgfCBOZXRmbGl4IHwgT252aXggfCBLaW5vUHViIHtcbiAgICBjb25zdCB0aXRsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLnRleHRDb250ZW50XG4gICAgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcIllvdVR1YmVcIikgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QgPT0gXCJ3d3cueW91dHViZS5jb21cIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJ5b3V0dWJlXCJcbiAgICAgIHJldHVybiBuZXcgWW91VHViZVxuICAgIH1cbiAgICBlbHNlIGlmICh0aXRsZUNvbnRlbnQuaW5jbHVkZXMoXCJOZXRmbGl4XCIpIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09IFwid3d3Lm5ldGZsaXguY29tXCIpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwibmV0ZmxpeFwiXG4gICAgICByZXR1cm4gbmV3IE5ldGZsaXhcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGVDb250ZW50LmluY2x1ZGVzKFwiT252aXhcIikgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtjb250ZW50PVwiT05WSVhcIl0nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJvbnZpeFwiXG4gICAgICByZXR1cm4gbmV3IE9udml4XG4gICAgfVxuICAgIGVsc2UgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcItCa0LjQvdC+0L/QsNCxXCIpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbY29udGVudD1cItCa0LjQvdC+0L/QsNCxXCJdJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwia2lub3B1YlwiXG4gICAgICByZXR1cm4gbmV3IEtpbm9QdWJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVBbGxFbGVtZW50cyhlbG1zOiBOb2RlTGlzdE9mPEVsZW1lbnQ+KSB7XG4gICAgZWxtcy5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1xuIiwiaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiO1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgcmV3aW5kVGltZSA9IDUwMDBcblxuY2xhc3MgVmlkZW8ge1xuICBzdGF0aWMgZ2V0Q3VycmVudFRpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSAqIDEwMDApXG4gIH1cblxuICBzdGF0aWMgbW92ZVRvUHJldlN1Yih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10sIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IHByZXZTdWI6IHN1YlRpdGxlVHlwZSA9IFN1YnMuZ2V0UHJldlN1YihzdWJzLCBjdXJyZW50VGltZSk7XG5cbiAgICBpZiAocHJldlN1YiAmJiBjdXJyZW50VGltZSAtIFV0aWxzLmNhc3RTdWJUaW1lKHByZXZTdWIuZW5kKSA8IDUwMDApIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUocHJldlN1Yi5zdGFydCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUoY3VycmVudFRpbWUgLSByZXdpbmRUaW1lKSlcbiAgICB9XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdmlkZW8sIHN1YnMsIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIG1vdmVUb05leHRTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBjdXJyZW50VGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBuZXh0U3ViOiBzdWJUaXRsZVR5cGUgPSBTdWJzLmdldE5leHRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuXG4gICAgaWYgKG5leHRTdWIgJiYgVXRpbHMuY2FzdFN1YlRpbWUobmV4dFN1Yi5zdGFydCkgLSBjdXJyZW50VGltZSA8IDUwMDApIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUobmV4dFN1Yi5zdGFydCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUoY3VycmVudFRpbWUgKyByZXdpbmRUaW1lKSlcbiAgICB9XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdmlkZW8sIHN1YnMsIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIG1vdmVUb1RpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHRpbWU6IG51bWJlciB8IHN0cmluZykge1xuXG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBVdGlscy5jYXN0U3ViVGltZSh0aW1lKSAvIDEwMDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iXSwic291cmNlUm9vdCI6IiJ9