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
        this.translateContainerElement.style.display = "none";
    }
    videoOnTimeUpdate(event) {
        _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubs(this.videoElement, this.subs, this.subsElement);
        _subs__WEBPACK_IMPORTED_MODULE_3__["default"].updateSubsProgressBar(this.subsProgressBarElement, this.videoElement, this.subs);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuaW1lanMvbGliL2FuaW1lLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlVGltZXN0YW1wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3Jlc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeVZ0dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvTVMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1NydFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1Z0dFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3plcm8tZmlsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnRzX2hhbmRsZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWR5LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9raW5vcHViLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9uZXRmbGl4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9vbnZpeC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMveW91dHViZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Vicy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdWkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy92aWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLDRFQUFjO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixjQUFjO0FBQ2QsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LEdBQWlCLDZDQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvRCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLDhDQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDckUsNkNBQUksQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBdUIsRUFBRSxJQUFvQixFQUFFLHNCQUFtQztRQUNyRyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFpQiw2Q0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSw4Q0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQ3JFLDZDQUFJLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQXVCLEVBQUUsSUFBcUI7UUFDOUQsS0FBSyxDQUFDLFdBQVcsR0FBRyw4Q0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO0lBQ3BELENBQUM7Q0FDRjtBQUNjLG9FQUFLLEVBQUMiLCJmaWxlIjoiaW5qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5qZWN0LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb2RlcyA9IHJlcXVpcmUoXCIuL2NvZGVzLmpzb25cIik7XG52YXIgcmVnaXN0ZXJlZExvY2FsZXMgPSB7fTtcblxuLypcbiAqIEFsbCBjb2RlcyBtYXAgdG8gSVNPIDMxNjYtMSBhbHBoYS0yXG4gKi9cbnZhciBhbHBoYTIgPSB7fSxcbiAgYWxwaGEzVCA9IHt9LFxuICBhbHBoYTNCID0ge30sXG4gIGludmVydGVkQWxwaGEzQiA9IHt9O1xuXG5jb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVJbmZvcm1hdGlvbikge1xuICB2YXIgcyA9IGNvZGVJbmZvcm1hdGlvbjtcbiAgYWxwaGEyW3NbMF1dID0gc1sxXTtcbiAgYWxwaGEzVFtzWzFdXSA9IHNbMF07XG4gIGFscGhhM0Jbc1syXV0gPSBzWzBdO1xuICBpbnZlcnRlZEFscGhhM0Jbc1swXV0gPSBzWzJdO1xufSk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZURhdGEpIHtcbiAgaWYgKCFsb2NhbGVEYXRhLmxvY2FsZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NpbmcgbG9jYWxlRGF0YS5sb2NhbGUnKTtcbiAgfVxuXG4gIGlmICghbG9jYWxlRGF0YS5sYW5ndWFnZXMpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNaXNzaW5nIGxvY2FsZURhdGEubGFuZ3VhZ2VzJyk7XG4gIH1cblxuICByZWdpc3RlcmVkTG9jYWxlc1tsb2NhbGVEYXRhLmxvY2FsZV0gPSBsb2NhbGVEYXRhLmxhbmd1YWdlcztcbn1cblxuZXhwb3J0cy5yZWdpc3RlckxvY2FsZSA9IHJlZ2lzdGVyTG9jYWxlO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgQWxwaGEtM1QgY29kZVxuICogQHJldHVybiBBbHBoYS0yIGNvZGUgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGFscGhhM1RUb0FscGhhMihjb2RlKSB7XG5cbiAgcmV0dXJuIGFscGhhM1RbY29kZV07XG59XG5leHBvcnRzLmFscGhhM1RUb0FscGhhMiA9IGFscGhhM1RUb0FscGhhMjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTNCIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtMiBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTNCVG9BbHBoYTIoY29kZSkge1xuXG4gIHJldHVybiBhbHBoYTNCW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTNCVG9BbHBoYTIgPSBhbHBoYTNCVG9BbHBoYTI7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0yIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtM1QgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEyVG9BbHBoYTNUKGNvZGUpIHtcblxuICByZXR1cm4gYWxwaGEyW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTJUb0FscGhhM1QgPSBhbHBoYTJUb0FscGhhM1Q7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0yIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtM0IgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEyVG9BbHBoYTNCKGNvZGUpIHtcblxuICByZXR1cm4gaW52ZXJ0ZWRBbHBoYTNCW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTJUb0FscGhhM0IgPSBhbHBoYTJUb0FscGhhM0I7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgSVNPIDYzOS0yIGFscGhhLTMgVCBvciBCXG4gKiBAcmV0dXJuIElTTyA2MzktMiBhbHBoYS0zIFRcbiAqL1xuZnVuY3Rpb24gdG9BbHBoYTNUKGNvZGUpIHtcbiAgaWYgKHR5cGVvZiBjb2RlID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYoY29kZS5sZW5ndGggPT09IDIpIHtcblxuICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzVChjb2RlLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cbiAgICBpZiAoY29kZS5sZW5ndGggPT09IDMpIHtcblxuICAgICAgaWYoIGFscGhhM1RbY29kZS50b0xvd2VyQ2FzZSgpXSApIHtcblxuICAgICAgICByZXR1cm4gY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgaWYoIGFscGhhM0JUb0FscGhhMihjb2RlLnRvTG93ZXJDYXNlKCkpICkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM1QoYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEzVCA9IHRvQWxwaGEzVDtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgQlxuICovXG5mdW5jdGlvbiB0b0FscGhhM0IoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gYWxwaGEyVG9BbHBoYTNCKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiggYWxwaGEzQltjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICBpZiggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM0IoYWxwaGEzVFRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEzQiA9IHRvQWxwaGEzQjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0xIGFscGhhLTJcbiAqL1xuZnVuY3Rpb24gdG9BbHBoYTIoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoY29kZS5sZW5ndGggPT09IDIpIHtcblxuICAgICAgcmV0dXJuIGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgaWYoY29kZS5sZW5ndGggPT09IDMpIHtcblxuICAgICAgaWYgKCBhbHBoYTNCW2NvZGUudG9Mb3dlckNhc2UoKV0pIHtcblxuICAgICAgICByZXR1cm4gYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgICBpZiAoIGFscGhhM1RbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTNUVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0cy50b0FscGhhMiA9IHRvQWxwaGEyO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBuYW1lIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldE5hbWUgPSBmdW5jdGlvbihjb2RlLCBsYW5nKSB7XG4gIHRyeSB7XG4gICAgdmFyIGQgPSByZWdpc3RlcmVkTG9jYWxlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBkW3RvQWxwaGEyKGNvZGUpXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIGZvciBsYW5ndWFnZSBuYW1lc1xuICogQHJldHVybiBPYmplY3Qgb2YgbGFuZ3VhZ2UgY29kZSBtYXBwZWQgdG8gbGFuZ3VhZ2UgbmFtZVxuICovXG5leHBvcnRzLmdldE5hbWVzID0gZnVuY3Rpb24obGFuZykge1xuICB2YXIgZCA9IHJlZ2lzdGVyZWRMb2NhbGVzW2xhbmcudG9Mb3dlckNhc2UoKV07XG4gIGlmIChkID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGxhbmd1YWdlIG5hbWVcbiAqIEByZXR1cm4gSVNPIDYzOS0xIGFscGhhLTIgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEyQ29kZSA9IGZ1bmN0aW9uKG5hbWUsIGxhbmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgcCwgY29kZW5hbWVzID0gcmVnaXN0ZXJlZExvY2FsZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcbiAgICBmb3IgKHAgaW4gY29kZW5hbWVzKSB7XG4gICAgICBpZiAoY29kZW5hbWVzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgIGlmIChjb2RlbmFtZXNbcF0udG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEByZXR1cm4gT2JqZWN0IG9mIGFscGhhLTIgY29kZXMgbWFwcGVkIHRvIGFscGhhLTMgVCBjb2Rlc1xuICovXG5leHBvcnRzLmdldEFscGhhMkNvZGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBhbHBoYTI7XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldEFscGhhM1RDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB2YXIgYWxwaGEyID0gdGhpcy5nZXRBbHBoYTJDb2RlKG5hbWUsIGxhbmcpO1xuICBpZiAoYWxwaGEyKSB7XG4gICAgcmV0dXJuIHRoaXMudG9BbHBoYTNUKGFscGhhMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEBwYXJhbSBuYW1lIG5hbWVcbiAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIGZvciBjb3VudHJ5IG5hbWVcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgQiBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNCQ29kZSA9IGZ1bmN0aW9uKG5hbWUsIGxhbmcpIHtcbiAgdmFyIGFscGhhMiA9IHRoaXMuZ2V0QWxwaGEyQ29kZShuYW1lLCBsYW5nKTtcbiAgaWYgKGFscGhhMikge1xuICAgIHJldHVybiB0aGlzLnRvQWxwaGEzQihhbHBoYTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8qXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBhbHBoYS0zIFQgY29kZXMgbWFwcGVkIHRvIGFscGhhLTIgY29kZXNcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNUQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhM1Q7XG59O1xuXG4vKlxuICogQHJldHVybiBPYmplY3Qgb2YgYWxwaGEtMyBCIGNvZGVzIG1hcHBlZCB0byBhbHBoYS0yIGNvZGVzXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEzQkNvZGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBhbHBoYTNCO1xufTtcblxuLypcbiAqIEByZXR1cm4gQXJyYXkgb2Ygc3VwcG9ydGVkIGxhbmd1YWdlc1xuICovXG5leHBvcnRzLmxhbmdzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhyZWdpc3RlcmVkTG9jYWxlcyk7XG59O1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIDYzOS0yIGFscGhhLTMgVCBvciBCIGNvZGVcbiAqIEByZXR1cm4gQm9vbGVhblxuICovXG5leHBvcnRzLmlzVmFsaWQgPSBmdW5jdGlvbihjb2RlKSB7XG4gIHJldHVybiB0aGlzLnRvQWxwaGEzVChjb2RlKSAhPT0gdW5kZWZpbmVkO1xufTtcbiIsIi8qXG4gKiBhbmltZS5qcyB2My4xLjBcbiAqIChjKSAyMDE5IEp1bGlhbiBHYXJuaWVyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGFuaW1lanMuY29tXG4gKi9cblxuLy8gRGVmYXVsdHNcblxudmFyIGRlZmF1bHRJbnN0YW5jZVNldHRpbmdzID0ge1xuICB1cGRhdGU6IG51bGwsXG4gIGJlZ2luOiBudWxsLFxuICBsb29wQmVnaW46IG51bGwsXG4gIGNoYW5nZUJlZ2luOiBudWxsLFxuICBjaGFuZ2U6IG51bGwsXG4gIGNoYW5nZUNvbXBsZXRlOiBudWxsLFxuICBsb29wQ29tcGxldGU6IG51bGwsXG4gIGNvbXBsZXRlOiBudWxsLFxuICBsb29wOiAxLFxuICBkaXJlY3Rpb246ICdub3JtYWwnLFxuICBhdXRvcGxheTogdHJ1ZSxcbiAgdGltZWxpbmVPZmZzZXQ6IDBcbn07XG5cbnZhciBkZWZhdWx0VHdlZW5TZXR0aW5ncyA9IHtcbiAgZHVyYXRpb246IDEwMDAsXG4gIGRlbGF5OiAwLFxuICBlbmREZWxheTogMCxcbiAgZWFzaW5nOiAnZWFzZU91dEVsYXN0aWMoMSwgLjUpJyxcbiAgcm91bmQ6IDBcbn07XG5cbnZhciB2YWxpZFRyYW5zZm9ybXMgPSBbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICd0cmFuc2xhdGVaJywgJ3JvdGF0ZScsICdyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWicsICdzY2FsZScsICdzY2FsZVgnLCAnc2NhbGVZJywgJ3NjYWxlWicsICdza2V3JywgJ3NrZXdYJywgJ3NrZXdZJywgJ3BlcnNwZWN0aXZlJ107XG5cbi8vIENhY2hpbmdcblxudmFyIGNhY2hlID0ge1xuICBDU1M6IHt9LFxuICBzcHJpbmdzOiB7fVxufTtcblxuLy8gVXRpbHNcblxuZnVuY3Rpb24gbWluTWF4KHZhbCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gc3RyaW5nQ29udGFpbnMoc3RyLCB0ZXh0KSB7XG4gIHJldHVybiBzdHIuaW5kZXhPZih0ZXh0KSA+IC0xO1xufVxuXG5mdW5jdGlvbiBhcHBseUFyZ3VtZW50cyhmdW5jLCBhcmdzKSB7XG4gIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuXG52YXIgaXMgPSB7XG4gIGFycjogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSk7IH0sXG4gIG9iajogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHN0cmluZ0NvbnRhaW5zKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSwgJ09iamVjdCcpOyB9LFxuICBwdGg6IGZ1bmN0aW9uIChhKSB7IHJldHVybiBpcy5vYmooYSkgJiYgYS5oYXNPd25Qcm9wZXJ0eSgndG90YWxMZW5ndGgnKTsgfSxcbiAgc3ZnOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQ7IH0sXG4gIGlucDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50OyB9LFxuICBkb206IGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLm5vZGVUeXBlIHx8IGlzLnN2ZyhhKTsgfSxcbiAgc3RyOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gdHlwZW9mIGEgPT09ICdzdHJpbmcnOyB9LFxuICBmbmM6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJzsgfSxcbiAgdW5kOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnOyB9LFxuICBoZXg6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAvKF4jWzAtOUEtRl17Nn0kKXwoXiNbMC05QS1GXXszfSQpL2kudGVzdChhKTsgfSxcbiAgcmdiOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gL15yZ2IvLnRlc3QoYSk7IH0sXG4gIGhzbDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIC9eaHNsLy50ZXN0KGEpOyB9LFxuICBjb2w6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAoaXMuaGV4KGEpIHx8IGlzLnJnYihhKSB8fCBpcy5oc2woYSkpOyB9LFxuICBrZXk6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAhZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoYSkgJiYgIWRlZmF1bHRUd2VlblNldHRpbmdzLmhhc093blByb3BlcnR5KGEpICYmIGEgIT09ICd0YXJnZXRzJyAmJiBhICE9PSAna2V5ZnJhbWVzJzsgfVxufTtcblxuLy8gRWFzaW5nc1xuXG5mdW5jdGlvbiBwYXJzZUVhc2luZ1BhcmFtZXRlcnMoc3RyaW5nKSB7XG4gIHZhciBtYXRjaCA9IC9cXCgoW14pXSspXFwpLy5leGVjKHN0cmluZyk7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiBwYXJzZUZsb2F0KHApOyB9KSA6IFtdO1xufVxuXG4vLyBTcHJpbmcgc29sdmVyIGluc3BpcmVkIGJ5IFdlYmtpdCBDb3B5cmlnaHQgwqkgMjAxNiBBcHBsZSBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIGh0dHBzOi8vd2Via2l0Lm9yZy9kZW1vcy9zcHJpbmcvc3ByaW5nLmpzXG5cbmZ1bmN0aW9uIHNwcmluZyhzdHJpbmcsIGR1cmF0aW9uKSB7XG5cbiAgdmFyIHBhcmFtcyA9IHBhcnNlRWFzaW5nUGFyYW1ldGVycyhzdHJpbmcpO1xuICB2YXIgbWFzcyA9IG1pbk1heChpcy51bmQocGFyYW1zWzBdKSA/IDEgOiBwYXJhbXNbMF0sIC4xLCAxMDApO1xuICB2YXIgc3RpZmZuZXNzID0gbWluTWF4KGlzLnVuZChwYXJhbXNbMV0pID8gMTAwIDogcGFyYW1zWzFdLCAuMSwgMTAwKTtcbiAgdmFyIGRhbXBpbmcgPSBtaW5NYXgoaXMudW5kKHBhcmFtc1syXSkgPyAxMCA6IHBhcmFtc1syXSwgLjEsIDEwMCk7XG4gIHZhciB2ZWxvY2l0eSA9ICBtaW5NYXgoaXMudW5kKHBhcmFtc1szXSkgPyAwIDogcGFyYW1zWzNdLCAuMSwgMTAwKTtcbiAgdmFyIHcwID0gTWF0aC5zcXJ0KHN0aWZmbmVzcyAvIG1hc3MpO1xuICB2YXIgemV0YSA9IGRhbXBpbmcgLyAoMiAqIE1hdGguc3FydChzdGlmZm5lc3MgKiBtYXNzKSk7XG4gIHZhciB3ZCA9IHpldGEgPCAxID8gdzAgKiBNYXRoLnNxcnQoMSAtIHpldGEgKiB6ZXRhKSA6IDA7XG4gIHZhciBhID0gMTtcbiAgdmFyIGIgPSB6ZXRhIDwgMSA/ICh6ZXRhICogdzAgKyAtdmVsb2NpdHkpIC8gd2QgOiAtdmVsb2NpdHkgKyB3MDtcblxuICBmdW5jdGlvbiBzb2x2ZXIodCkge1xuICAgIHZhciBwcm9ncmVzcyA9IGR1cmF0aW9uID8gKGR1cmF0aW9uICogdCkgLyAxMDAwIDogdDtcbiAgICBpZiAoemV0YSA8IDEpIHtcbiAgICAgIHByb2dyZXNzID0gTWF0aC5leHAoLXByb2dyZXNzICogemV0YSAqIHcwKSAqIChhICogTWF0aC5jb3Mod2QgKiBwcm9ncmVzcykgKyBiICogTWF0aC5zaW4od2QgKiBwcm9ncmVzcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9ncmVzcyA9IChhICsgYiAqIHByb2dyZXNzKSAqIE1hdGguZXhwKC1wcm9ncmVzcyAqIHcwKTtcbiAgICB9XG4gICAgaWYgKHQgPT09IDAgfHwgdCA9PT0gMSkgeyByZXR1cm4gdDsgfVxuICAgIHJldHVybiAxIC0gcHJvZ3Jlc3M7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREdXJhdGlvbigpIHtcbiAgICB2YXIgY2FjaGVkID0gY2FjaGUuc3ByaW5nc1tzdHJpbmddO1xuICAgIGlmIChjYWNoZWQpIHsgcmV0dXJuIGNhY2hlZDsgfVxuICAgIHZhciBmcmFtZSA9IDEvNjtcbiAgICB2YXIgZWxhcHNlZCA9IDA7XG4gICAgdmFyIHJlc3QgPSAwO1xuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIGVsYXBzZWQgKz0gZnJhbWU7XG4gICAgICBpZiAoc29sdmVyKGVsYXBzZWQpID09PSAxKSB7XG4gICAgICAgIHJlc3QrKztcbiAgICAgICAgaWYgKHJlc3QgPj0gMTYpIHsgYnJlYWs7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3QgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZHVyYXRpb24gPSBlbGFwc2VkICogZnJhbWUgKiAxMDAwO1xuICAgIGNhY2hlLnNwcmluZ3Nbc3RyaW5nXSA9IGR1cmF0aW9uO1xuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIHJldHVybiBkdXJhdGlvbiA/IHNvbHZlciA6IGdldER1cmF0aW9uO1xuXG59XG5cbi8vIEJhc2ljIHN0ZXBzIGVhc2luZyBpbXBsZW1lbnRhdGlvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9DU1MvdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cblxuZnVuY3Rpb24gc3RlcHMoc3RlcHMpIHtcbiAgaWYgKCBzdGVwcyA9PT0gdm9pZCAwICkgc3RlcHMgPSAxMDtcblxuICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIE1hdGgucm91bmQodCAqIHN0ZXBzKSAqICgxIC8gc3RlcHMpOyB9O1xufVxuXG4vLyBCZXppZXJFYXNpbmcgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nXG5cbnZhciBiZXppZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBrU3BsaW5lVGFibGVTaXplID0gMTE7XG4gIHZhciBrU2FtcGxlU3RlcFNpemUgPSAxLjAgLyAoa1NwbGluZVRhYmxlU2l6ZSAtIDEuMCk7XG5cbiAgZnVuY3Rpb24gQShhQTEsIGFBMikgeyByZXR1cm4gMS4wIC0gMy4wICogYUEyICsgMy4wICogYUExIH1cbiAgZnVuY3Rpb24gQihhQTEsIGFBMikgeyByZXR1cm4gMy4wICogYUEyIC0gNi4wICogYUExIH1cbiAgZnVuY3Rpb24gQyhhQTEpICAgICAgeyByZXR1cm4gMy4wICogYUExIH1cblxuICBmdW5jdGlvbiBjYWxjQmV6aWVyKGFULCBhQTEsIGFBMikgeyByZXR1cm4gKChBKGFBMSwgYUEyKSAqIGFUICsgQihhQTEsIGFBMikpICogYVQgKyBDKGFBMSkpICogYVQgfVxuICBmdW5jdGlvbiBnZXRTbG9wZShhVCwgYUExLCBhQTIpIHsgcmV0dXJuIDMuMCAqIEEoYUExLCBhQTIpICogYVQgKiBhVCArIDIuMCAqIEIoYUExLCBhQTIpICogYVQgKyBDKGFBMSkgfVxuXG4gIGZ1bmN0aW9uIGJpbmFyeVN1YmRpdmlkZShhWCwgYUEsIGFCLCBtWDEsIG1YMikge1xuICAgIHZhciBjdXJyZW50WCwgY3VycmVudFQsIGkgPSAwO1xuICAgIGRvIHtcbiAgICAgIGN1cnJlbnRUID0gYUEgKyAoYUIgLSBhQSkgLyAyLjA7XG4gICAgICBjdXJyZW50WCA9IGNhbGNCZXppZXIoY3VycmVudFQsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgaWYgKGN1cnJlbnRYID4gMC4wKSB7IGFCID0gY3VycmVudFQ7IH0gZWxzZSB7IGFBID0gY3VycmVudFQ7IH1cbiAgICB9IHdoaWxlIChNYXRoLmFicyhjdXJyZW50WCkgPiAwLjAwMDAwMDEgJiYgKytpIDwgMTApO1xuICAgIHJldHVybiBjdXJyZW50VDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld3RvblJhcGhzb25JdGVyYXRlKGFYLCBhR3Vlc3NULCBtWDEsIG1YMikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICB2YXIgY3VycmVudFNsb3BlID0gZ2V0U2xvcGUoYUd1ZXNzVCwgbVgxLCBtWDIpO1xuICAgICAgaWYgKGN1cnJlbnRTbG9wZSA9PT0gMC4wKSB7IHJldHVybiBhR3Vlc3NUOyB9XG4gICAgICB2YXIgY3VycmVudFggPSBjYWxjQmV6aWVyKGFHdWVzc1QsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgYUd1ZXNzVCAtPSBjdXJyZW50WCAvIGN1cnJlbnRTbG9wZTtcbiAgICB9XG4gICAgcmV0dXJuIGFHdWVzc1Q7XG4gIH1cblxuICBmdW5jdGlvbiBiZXppZXIobVgxLCBtWTEsIG1YMiwgbVkyKSB7XG5cbiAgICBpZiAoISgwIDw9IG1YMSAmJiBtWDEgPD0gMSAmJiAwIDw9IG1YMiAmJiBtWDIgPD0gMSkpIHsgcmV0dXJuOyB9XG4gICAgdmFyIHNhbXBsZVZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoa1NwbGluZVRhYmxlU2l6ZSk7XG5cbiAgICBpZiAobVgxICE9PSBtWTEgfHwgbVgyICE9PSBtWTIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga1NwbGluZVRhYmxlU2l6ZTsgKytpKSB7XG4gICAgICAgIHNhbXBsZVZhbHVlc1tpXSA9IGNhbGNCZXppZXIoaSAqIGtTYW1wbGVTdGVwU2l6ZSwgbVgxLCBtWDIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRGb3JYKGFYKSB7XG5cbiAgICAgIHZhciBpbnRlcnZhbFN0YXJ0ID0gMDtcbiAgICAgIHZhciBjdXJyZW50U2FtcGxlID0gMTtcbiAgICAgIHZhciBsYXN0U2FtcGxlID0ga1NwbGluZVRhYmxlU2l6ZSAtIDE7XG5cbiAgICAgIGZvciAoOyBjdXJyZW50U2FtcGxlICE9PSBsYXN0U2FtcGxlICYmIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSA8PSBhWDsgKytjdXJyZW50U2FtcGxlKSB7XG4gICAgICAgIGludGVydmFsU3RhcnQgKz0ga1NhbXBsZVN0ZXBTaXplO1xuICAgICAgfVxuXG4gICAgICAtLWN1cnJlbnRTYW1wbGU7XG5cbiAgICAgIHZhciBkaXN0ID0gKGFYIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKSAvIChzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZSArIDFdIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKTtcbiAgICAgIHZhciBndWVzc0ZvclQgPSBpbnRlcnZhbFN0YXJ0ICsgZGlzdCAqIGtTYW1wbGVTdGVwU2l6ZTtcbiAgICAgIHZhciBpbml0aWFsU2xvcGUgPSBnZXRTbG9wZShndWVzc0ZvclQsIG1YMSwgbVgyKTtcblxuICAgICAgaWYgKGluaXRpYWxTbG9wZSA+PSAwLjAwMSkge1xuICAgICAgICByZXR1cm4gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgICAgfSBlbHNlIGlmIChpbml0aWFsU2xvcGUgPT09IDAuMCkge1xuICAgICAgICByZXR1cm4gZ3Vlc3NGb3JUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGJpbmFyeVN1YmRpdmlkZShhWCwgaW50ZXJ2YWxTdGFydCwgaW50ZXJ2YWxTdGFydCArIGtTYW1wbGVTdGVwU2l6ZSwgbVgxLCBtWDIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICBpZiAobVgxID09PSBtWTEgJiYgbVgyID09PSBtWTIpIHsgcmV0dXJuIHg7IH1cbiAgICAgIGlmICh4ID09PSAwIHx8IHggPT09IDEpIHsgcmV0dXJuIHg7IH1cbiAgICAgIHJldHVybiBjYWxjQmV6aWVyKGdldFRGb3JYKHgpLCBtWTEsIG1ZMik7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gYmV6aWVyO1xuXG59KSgpO1xuXG52YXIgcGVubmVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAvLyBCYXNlZCBvbiBqUXVlcnkgVUkncyBpbXBsZW1lbmF0aW9uIG9mIGVhc2luZyBlcXVhdGlvbnMgZnJvbSBSb2JlcnQgUGVubmVyIChodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vZWFzaW5nKVxuXG4gIHZhciBlYXNlcyA9IHsgbGluZWFyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gdDsgfTsgfSB9O1xuXG4gIHZhciBmdW5jdGlvbkVhc2luZ3MgPSB7XG4gICAgU2luZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBNYXRoLmNvcyh0ICogTWF0aC5QSSAvIDIpOyB9OyB9LFxuICAgIENpcmM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSB0ICogdCk7IH07IH0sXG4gICAgQmFjazogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgKiB0ICogKDMgKiB0IC0gMik7IH07IH0sXG4gICAgQm91bmNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgdmFyIHBvdzIsIGIgPSA0O1xuICAgICAgd2hpbGUgKHQgPCAoKCBwb3cyID0gTWF0aC5wb3coMiwgLS1iKSkgLSAxKSAvIDExKSB7fVxuICAgICAgcmV0dXJuIDEgLyBNYXRoLnBvdyg0LCAzIC0gYikgLSA3LjU2MjUgKiBNYXRoLnBvdygoIHBvdzIgKiAzIC0gMiApIC8gMjIgLSB0LCAyKVxuICAgIH07IH0sXG4gICAgRWxhc3RpYzogZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgICBpZiAoIGFtcGxpdHVkZSA9PT0gdm9pZCAwICkgYW1wbGl0dWRlID0gMTtcbiAgICAgIGlmICggcGVyaW9kID09PSB2b2lkIDAgKSBwZXJpb2QgPSAuNTtcblxuICAgICAgdmFyIGEgPSBtaW5NYXgoYW1wbGl0dWRlLCAxLCAxMCk7XG4gICAgICB2YXIgcCA9IG1pbk1heChwZXJpb2QsIC4xLCAyKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKHQgPT09IDAgfHwgdCA9PT0gMSkgPyB0IDogXG4gICAgICAgICAgLWEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICogTWF0aC5zaW4oKCgodCAtIDEpIC0gKHAgLyAoTWF0aC5QSSAqIDIpICogTWF0aC5hc2luKDEgLyBhKSkpICogKE1hdGguUEkgKiAyKSkgLyBwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGJhc2VFYXNpbmdzID0gWydRdWFkJywgJ0N1YmljJywgJ1F1YXJ0JywgJ1F1aW50JywgJ0V4cG8nXTtcblxuICBiYXNlRWFzaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpKSB7XG4gICAgZnVuY3Rpb25FYXNpbmdzW25hbWVdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIE1hdGgucG93KHQsIGkgKyAyKTsgfTsgfTtcbiAgfSk7XG5cbiAgT2JqZWN0LmtleXMoZnVuY3Rpb25FYXNpbmdzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGVhc2VJbiA9IGZ1bmN0aW9uRWFzaW5nc1tuYW1lXTtcbiAgICBlYXNlc1snZWFzZUluJyArIG5hbWVdID0gZWFzZUluO1xuICAgIGVhc2VzWydlYXNlT3V0JyArIG5hbWVdID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiAxIC0gZWFzZUluKGEsIGIpKDEgLSB0KTsgfTsgfTtcbiAgICBlYXNlc1snZWFzZUluT3V0JyArIG5hbWVdID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0IDwgMC41ID8gZWFzZUluKGEsIGIpKHQgKiAyKSAvIDIgOiBcbiAgICAgIDEgLSBlYXNlSW4oYSwgYikodCAqIC0yICsgMikgLyAyOyB9OyB9O1xuICB9KTtcblxuICByZXR1cm4gZWFzZXM7XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIHBhcnNlRWFzaW5ncyhlYXNpbmcsIGR1cmF0aW9uKSB7XG4gIGlmIChpcy5mbmMoZWFzaW5nKSkgeyByZXR1cm4gZWFzaW5nOyB9XG4gIHZhciBuYW1lID0gZWFzaW5nLnNwbGl0KCcoJylbMF07XG4gIHZhciBlYXNlID0gcGVubmVyW25hbWVdO1xuICB2YXIgYXJncyA9IHBhcnNlRWFzaW5nUGFyYW1ldGVycyhlYXNpbmcpO1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdzcHJpbmcnIDogcmV0dXJuIHNwcmluZyhlYXNpbmcsIGR1cmF0aW9uKTtcbiAgICBjYXNlICdjdWJpY0JlemllcicgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoYmV6aWVyLCBhcmdzKTtcbiAgICBjYXNlICdzdGVwcycgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoc3RlcHMsIGFyZ3MpO1xuICAgIGRlZmF1bHQgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoZWFzZSwgYXJncyk7XG4gIH1cbn1cblxuLy8gU3RyaW5nc1xuXG5mdW5jdGlvbiBzZWxlY3RTdHJpbmcoc3RyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzdHIpO1xuICAgIHJldHVybiBub2RlcztcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbi8vIEFycmF5c1xuXG5mdW5jdGlvbiBmaWx0ZXJBcnJheShhcnIsIGNhbGxiYWNrKSB7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGkgaW4gYXJyKSB7XG4gICAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsLCBpLCBhcnIpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5BcnJheShhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuY29uY2F0KGlzLmFycihiKSA/IGZsYXR0ZW5BcnJheShiKSA6IGIpOyB9LCBbXSk7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkobykge1xuICBpZiAoaXMuYXJyKG8pKSB7IHJldHVybiBvOyB9XG4gIGlmIChpcy5zdHIobykpIHsgbyA9IHNlbGVjdFN0cmluZyhvKSB8fCBvOyB9XG4gIGlmIChvIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgbyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKSB7IHJldHVybiBbXS5zbGljZS5jYWxsKG8pOyB9XG4gIHJldHVybiBbb107XG59XG5cbmZ1bmN0aW9uIGFycmF5Q29udGFpbnMoYXJyLCB2YWwpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhID09PSB2YWw7IH0pO1xufVxuXG4vLyBPYmplY3RzXG5cbmZ1bmN0aW9uIGNsb25lT2JqZWN0KG8pIHtcbiAgdmFyIGNsb25lID0ge307XG4gIGZvciAodmFyIHAgaW4gbykgeyBjbG9uZVtwXSA9IG9bcF07IH1cbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlT2JqZWN0UHJvcHMobzEsIG8yKSB7XG4gIHZhciBvID0gY2xvbmVPYmplY3QobzEpO1xuICBmb3IgKHZhciBwIGluIG8xKSB7IG9bcF0gPSBvMi5oYXNPd25Qcm9wZXJ0eShwKSA/IG8yW3BdIDogbzFbcF07IH1cbiAgcmV0dXJuIG87XG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvMSwgbzIpIHtcbiAgdmFyIG8gPSBjbG9uZU9iamVjdChvMSk7XG4gIGZvciAodmFyIHAgaW4gbzIpIHsgb1twXSA9IGlzLnVuZChvMVtwXSkgPyBvMltwXSA6IG8xW3BdOyB9XG4gIHJldHVybiBvO1xufVxuXG4vLyBDb2xvcnNcblxuZnVuY3Rpb24gcmdiVG9SZ2JhKHJnYlZhbHVlKSB7XG4gIHZhciByZ2IgPSAvcmdiXFwoKFxcZCssXFxzKltcXGRdKyxcXHMqW1xcZF0rKVxcKS9nLmV4ZWMocmdiVmFsdWUpO1xuICByZXR1cm4gcmdiID8gKFwicmdiYShcIiArIChyZ2JbMV0pICsgXCIsMSlcIikgOiByZ2JWYWx1ZTtcbn1cblxuZnVuY3Rpb24gaGV4VG9SZ2JhKGhleFZhbHVlKSB7XG4gIHZhciByZ3ggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICB2YXIgaGV4ID0gaGV4VmFsdWUucmVwbGFjZShyZ3gsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7IHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7IH0gKTtcbiAgdmFyIHJnYiA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICB2YXIgciA9IHBhcnNlSW50KHJnYlsxXSwgMTYpO1xuICB2YXIgZyA9IHBhcnNlSW50KHJnYlsyXSwgMTYpO1xuICB2YXIgYiA9IHBhcnNlSW50KHJnYlszXSwgMTYpO1xuICByZXR1cm4gKFwicmdiYShcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIiwxKVwiKTtcbn1cblxuZnVuY3Rpb24gaHNsVG9SZ2JhKGhzbFZhbHVlKSB7XG4gIHZhciBoc2wgPSAvaHNsXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklXFwpL2cuZXhlYyhoc2xWYWx1ZSkgfHwgL2hzbGFcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKVxcKS9nLmV4ZWMoaHNsVmFsdWUpO1xuICB2YXIgaCA9IHBhcnNlSW50KGhzbFsxXSwgMTApIC8gMzYwO1xuICB2YXIgcyA9IHBhcnNlSW50KGhzbFsyXSwgMTApIC8gMTAwO1xuICB2YXIgbCA9IHBhcnNlSW50KGhzbFszXSwgMTApIC8gMTAwO1xuICB2YXIgYSA9IGhzbFs0XSB8fCAxO1xuICBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHsgdCArPSAxOyB9XG4gICAgaWYgKHQgPiAxKSB7IHQgLT0gMTsgfVxuICAgIGlmICh0IDwgMS82KSB7IHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0OyB9XG4gICAgaWYgKHQgPCAxLzIpIHsgcmV0dXJuIHE7IH1cbiAgICBpZiAodCA8IDIvMykgeyByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2OyB9XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgdmFyIHIsIGcsIGI7XG4gIGlmIChzID09IDApIHtcbiAgICByID0gZyA9IGIgPSBsO1xuICB9IGVsc2Uge1xuICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICB2YXIgcCA9IDIgKiBsIC0gcTtcbiAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMS8zKTtcbiAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMS8zKTtcbiAgfVxuICByZXR1cm4gKFwicmdiYShcIiArIChyICogMjU1KSArIFwiLFwiICsgKGcgKiAyNTUpICsgXCIsXCIgKyAoYiAqIDI1NSkgKyBcIixcIiArIGEgKyBcIilcIik7XG59XG5cbmZ1bmN0aW9uIGNvbG9yVG9SZ2IodmFsKSB7XG4gIGlmIChpcy5yZ2IodmFsKSkgeyByZXR1cm4gcmdiVG9SZ2JhKHZhbCk7IH1cbiAgaWYgKGlzLmhleCh2YWwpKSB7IHJldHVybiBoZXhUb1JnYmEodmFsKTsgfVxuICBpZiAoaXMuaHNsKHZhbCkpIHsgcmV0dXJuIGhzbFRvUmdiYSh2YWwpOyB9XG59XG5cbi8vIFVuaXRzXG5cbmZ1bmN0aW9uIGdldFVuaXQodmFsKSB7XG4gIHZhciBzcGxpdCA9IC9bKy1dP1xcZCpcXC4/XFxkKyg/OlxcLlxcZCspPyg/OltlRV1bKy1dP1xcZCspPyglfHB4fHB0fGVtfHJlbXxpbnxjbXxtbXxleHxjaHxwY3x2d3x2aHx2bWlufHZtYXh8ZGVnfHJhZHx0dXJuKT8kLy5leGVjKHZhbCk7XG4gIGlmIChzcGxpdCkgeyByZXR1cm4gc3BsaXRbMV07IH1cbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtVW5pdChwcm9wTmFtZSkge1xuICBpZiAoc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICd0cmFuc2xhdGUnKSB8fCBwcm9wTmFtZSA9PT0gJ3BlcnNwZWN0aXZlJykgeyByZXR1cm4gJ3B4JzsgfVxuICBpZiAoc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICdyb3RhdGUnKSB8fCBzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3NrZXcnKSkgeyByZXR1cm4gJ2RlZyc7IH1cbn1cblxuLy8gVmFsdWVzXG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uVmFsdWUodmFsLCBhbmltYXRhYmxlKSB7XG4gIGlmICghaXMuZm5jKHZhbCkpIHsgcmV0dXJuIHZhbDsgfVxuICByZXR1cm4gdmFsKGFuaW1hdGFibGUudGFyZ2V0LCBhbmltYXRhYmxlLmlkLCBhbmltYXRhYmxlLnRvdGFsKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlKGVsLCBwcm9wKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUocHJvcCk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRQeFRvVW5pdChlbCwgdmFsdWUsIHVuaXQpIHtcbiAgdmFyIHZhbHVlVW5pdCA9IGdldFVuaXQodmFsdWUpO1xuICBpZiAoYXJyYXlDb250YWlucyhbdW5pdCwgJ2RlZycsICdyYWQnLCAndHVybiddLCB2YWx1ZVVuaXQpKSB7IHJldHVybiB2YWx1ZTsgfVxuICB2YXIgY2FjaGVkID0gY2FjaGUuQ1NTW3ZhbHVlICsgdW5pdF07XG4gIGlmICghaXMudW5kKGNhY2hlZCkpIHsgcmV0dXJuIGNhY2hlZDsgfVxuICB2YXIgYmFzZWxpbmUgPSAxMDA7XG4gIHZhciB0ZW1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuICB2YXIgcGFyZW50RWwgPSAoZWwucGFyZW50Tm9kZSAmJiAoZWwucGFyZW50Tm9kZSAhPT0gZG9jdW1lbnQpKSA/IGVsLnBhcmVudE5vZGUgOiBkb2N1bWVudC5ib2R5O1xuICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh0ZW1wRWwpO1xuICB0ZW1wRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICB0ZW1wRWwuc3R5bGUud2lkdGggPSBiYXNlbGluZSArIHVuaXQ7XG4gIHZhciBmYWN0b3IgPSBiYXNlbGluZSAvIHRlbXBFbC5vZmZzZXRXaWR0aDtcbiAgcGFyZW50RWwucmVtb3ZlQ2hpbGQodGVtcEVsKTtcbiAgdmFyIGNvbnZlcnRlZFVuaXQgPSBmYWN0b3IgKiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgY2FjaGUuQ1NTW3ZhbHVlICsgdW5pdF0gPSBjb252ZXJ0ZWRVbml0O1xuICByZXR1cm4gY29udmVydGVkVW5pdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q1NTVmFsdWUoZWwsIHByb3AsIHVuaXQpIHtcbiAgaWYgKHByb3AgaW4gZWwuc3R5bGUpIHtcbiAgICB2YXIgdXBwZXJjYXNlUHJvcE5hbWUgPSBwcm9wLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHZhbHVlID0gZWwuc3R5bGVbcHJvcF0gfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZSh1cHBlcmNhc2VQcm9wTmFtZSkgfHwgJzAnO1xuICAgIHJldHVybiB1bml0ID8gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkgOiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25UeXBlKGVsLCBwcm9wKSB7XG4gIGlmIChpcy5kb20oZWwpICYmICFpcy5pbnAoZWwpICYmIChnZXRBdHRyaWJ1dGUoZWwsIHByb3ApIHx8IChpcy5zdmcoZWwpICYmIGVsW3Byb3BdKSkpIHsgcmV0dXJuICdhdHRyaWJ1dGUnOyB9XG4gIGlmIChpcy5kb20oZWwpICYmIGFycmF5Q29udGFpbnModmFsaWRUcmFuc2Zvcm1zLCBwcm9wKSkgeyByZXR1cm4gJ3RyYW5zZm9ybSc7IH1cbiAgaWYgKGlzLmRvbShlbCkgJiYgKHByb3AgIT09ICd0cmFuc2Zvcm0nICYmIGdldENTU1ZhbHVlKGVsLCBwcm9wKSkpIHsgcmV0dXJuICdjc3MnOyB9XG4gIGlmIChlbFtwcm9wXSAhPSBudWxsKSB7IHJldHVybiAnb2JqZWN0JzsgfVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50VHJhbnNmb3JtcyhlbCkge1xuICBpZiAoIWlzLmRvbShlbCkpIHsgcmV0dXJuOyB9XG4gIHZhciBzdHIgPSBlbC5zdHlsZS50cmFuc2Zvcm0gfHwgJyc7XG4gIHZhciByZWcgID0gLyhcXHcrKVxcKChbXildKilcXCkvZztcbiAgdmFyIHRyYW5zZm9ybXMgPSBuZXcgTWFwKCk7XG4gIHZhciBtOyB3aGlsZSAobSA9IHJlZy5leGVjKHN0cikpIHsgdHJhbnNmb3Jtcy5zZXQobVsxXSwgbVsyXSk7IH1cbiAgcmV0dXJuIHRyYW5zZm9ybXM7XG59XG5cbmZ1bmN0aW9uIGdldFRyYW5zZm9ybVZhbHVlKGVsLCBwcm9wTmFtZSwgYW5pbWF0YWJsZSwgdW5pdCkge1xuICB2YXIgZGVmYXVsdFZhbCA9IHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAnc2NhbGUnKSA/IDEgOiAwICsgZ2V0VHJhbnNmb3JtVW5pdChwcm9wTmFtZSk7XG4gIHZhciB2YWx1ZSA9IGdldEVsZW1lbnRUcmFuc2Zvcm1zKGVsKS5nZXQocHJvcE5hbWUpIHx8IGRlZmF1bHRWYWw7XG4gIGlmIChhbmltYXRhYmxlKSB7XG4gICAgYW5pbWF0YWJsZS50cmFuc2Zvcm1zLmxpc3Quc2V0KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgYW5pbWF0YWJsZS50cmFuc2Zvcm1zWydsYXN0J10gPSBwcm9wTmFtZTtcbiAgfVxuICByZXR1cm4gdW5pdCA/IGNvbnZlcnRQeFRvVW5pdChlbCwgdmFsdWUsIHVuaXQpIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgdW5pdCwgYW5pbWF0YWJsZSkge1xuICBzd2l0Y2ggKGdldEFuaW1hdGlvblR5cGUodGFyZ2V0LCBwcm9wTmFtZSkpIHtcbiAgICBjYXNlICd0cmFuc2Zvcm0nOiByZXR1cm4gZ2V0VHJhbnNmb3JtVmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgYW5pbWF0YWJsZSwgdW5pdCk7XG4gICAgY2FzZSAnY3NzJzogcmV0dXJuIGdldENTU1ZhbHVlKHRhcmdldCwgcHJvcE5hbWUsIHVuaXQpO1xuICAgIGNhc2UgJ2F0dHJpYnV0ZSc6IHJldHVybiBnZXRBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wTmFtZSk7XG4gICAgZGVmYXVsdDogcmV0dXJuIHRhcmdldFtwcm9wTmFtZV0gfHwgMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSZWxhdGl2ZVZhbHVlKHRvLCBmcm9tKSB7XG4gIHZhciBvcGVyYXRvciA9IC9eKFxcKj18XFwrPXwtPSkvLmV4ZWModG8pO1xuICBpZiAoIW9wZXJhdG9yKSB7IHJldHVybiB0bzsgfVxuICB2YXIgdSA9IGdldFVuaXQodG8pIHx8IDA7XG4gIHZhciB4ID0gcGFyc2VGbG9hdChmcm9tKTtcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KHRvLnJlcGxhY2Uob3BlcmF0b3JbMF0sICcnKSk7XG4gIHN3aXRjaCAob3BlcmF0b3JbMF1bMF0pIHtcbiAgICBjYXNlICcrJzogcmV0dXJuIHggKyB5ICsgdTtcbiAgICBjYXNlICctJzogcmV0dXJuIHggLSB5ICsgdTtcbiAgICBjYXNlICcqJzogcmV0dXJuIHggKiB5ICsgdTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbCwgdW5pdCkge1xuICBpZiAoaXMuY29sKHZhbCkpIHsgcmV0dXJuIGNvbG9yVG9SZ2IodmFsKTsgfVxuICBpZiAoL1xccy9nLnRlc3QodmFsKSkgeyByZXR1cm4gdmFsOyB9XG4gIHZhciBvcmlnaW5hbFVuaXQgPSBnZXRVbml0KHZhbCk7XG4gIHZhciB1bml0TGVzcyA9IG9yaWdpbmFsVW5pdCA/IHZhbC5zdWJzdHIoMCwgdmFsLmxlbmd0aCAtIG9yaWdpbmFsVW5pdC5sZW5ndGgpIDogdmFsO1xuICBpZiAodW5pdCkgeyByZXR1cm4gdW5pdExlc3MgKyB1bml0OyB9XG4gIHJldHVybiB1bml0TGVzcztcbn1cblxuLy8gZ2V0VG90YWxMZW5ndGgoKSBlcXVpdmFsZW50IGZvciBjaXJjbGUsIHJlY3QsIHBvbHlsaW5lLCBwb2x5Z29uIGFuZCBsaW5lIHNoYXBlc1xuLy8gYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL1NlYkxhbWJsYS8zZTA1NTBjNDk2YzIzNjcwOTc0NFxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhwMi54IC0gcDEueCwgMikgKyBNYXRoLnBvdyhwMi55IC0gcDEueSwgMikpO1xufVxuXG5mdW5jdGlvbiBnZXRDaXJjbGVMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIE1hdGguUEkgKiAyICogZ2V0QXR0cmlidXRlKGVsLCAncicpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWN0TGVuZ3RoKGVsKSB7XG4gIHJldHVybiAoZ2V0QXR0cmlidXRlKGVsLCAnd2lkdGgnKSAqIDIpICsgKGdldEF0dHJpYnV0ZShlbCwgJ2hlaWdodCcpICogMik7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIGdldERpc3RhbmNlKFxuICAgIHt4OiBnZXRBdHRyaWJ1dGUoZWwsICd4MScpLCB5OiBnZXRBdHRyaWJ1dGUoZWwsICd5MScpfSwgXG4gICAge3g6IGdldEF0dHJpYnV0ZShlbCwgJ3gyJyksIHk6IGdldEF0dHJpYnV0ZShlbCwgJ3kyJyl9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFBvbHlsaW5lTGVuZ3RoKGVsKSB7XG4gIHZhciBwb2ludHMgPSBlbC5wb2ludHM7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG4gIHZhciBwcmV2aW91c1BvcztcbiAgZm9yICh2YXIgaSA9IDAgOyBpIDwgcG9pbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgIHZhciBjdXJyZW50UG9zID0gcG9pbnRzLmdldEl0ZW0oaSk7XG4gICAgaWYgKGkgPiAwKSB7IHRvdGFsTGVuZ3RoICs9IGdldERpc3RhbmNlKHByZXZpb3VzUG9zLCBjdXJyZW50UG9zKTsgfVxuICAgIHByZXZpb3VzUG9zID0gY3VycmVudFBvcztcbiAgfVxuICByZXR1cm4gdG90YWxMZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldFBvbHlnb25MZW5ndGgoZWwpIHtcbiAgdmFyIHBvaW50cyA9IGVsLnBvaW50cztcbiAgcmV0dXJuIGdldFBvbHlsaW5lTGVuZ3RoKGVsKSArIGdldERpc3RhbmNlKHBvaW50cy5nZXRJdGVtKHBvaW50cy5udW1iZXJPZkl0ZW1zIC0gMSksIHBvaW50cy5nZXRJdGVtKDApKTtcbn1cblxuLy8gUGF0aCBhbmltYXRpb25cblxuZnVuY3Rpb24gZ2V0VG90YWxMZW5ndGgoZWwpIHtcbiAgaWYgKGVsLmdldFRvdGFsTGVuZ3RoKSB7IHJldHVybiBlbC5nZXRUb3RhbExlbmd0aCgpOyB9XG4gIHN3aXRjaChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdjaXJjbGUnOiByZXR1cm4gZ2V0Q2lyY2xlTGVuZ3RoKGVsKTtcbiAgICBjYXNlICdyZWN0JzogcmV0dXJuIGdldFJlY3RMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ2xpbmUnOiByZXR1cm4gZ2V0TGluZUxlbmd0aChlbCk7XG4gICAgY2FzZSAncG9seWxpbmUnOiByZXR1cm4gZ2V0UG9seWxpbmVMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ3BvbHlnb24nOiByZXR1cm4gZ2V0UG9seWdvbkxlbmd0aChlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RGFzaG9mZnNldChlbCkge1xuICB2YXIgcGF0aExlbmd0aCA9IGdldFRvdGFsTGVuZ3RoKGVsKTtcbiAgZWwuc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5JywgcGF0aExlbmd0aCk7XG4gIHJldHVybiBwYXRoTGVuZ3RoO1xufVxuXG4vLyBNb3Rpb24gcGF0aFxuXG5mdW5jdGlvbiBnZXRQYXJlbnRTdmdFbChlbCkge1xuICB2YXIgcGFyZW50RWwgPSBlbC5wYXJlbnROb2RlO1xuICB3aGlsZSAoaXMuc3ZnKHBhcmVudEVsKSkge1xuICAgIGlmICghaXMuc3ZnKHBhcmVudEVsLnBhcmVudE5vZGUpKSB7IGJyZWFrOyB9XG4gICAgcGFyZW50RWwgPSBwYXJlbnRFbC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBwYXJlbnRFbDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50U3ZnKHBhdGhFbCwgc3ZnRGF0YSkge1xuICB2YXIgc3ZnID0gc3ZnRGF0YSB8fCB7fTtcbiAgdmFyIHBhcmVudFN2Z0VsID0gc3ZnLmVsIHx8IGdldFBhcmVudFN2Z0VsKHBhdGhFbCk7XG4gIHZhciByZWN0ID0gcGFyZW50U3ZnRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciB2aWV3Qm94QXR0ciA9IGdldEF0dHJpYnV0ZShwYXJlbnRTdmdFbCwgJ3ZpZXdCb3gnKTtcbiAgdmFyIHdpZHRoID0gcmVjdC53aWR0aDtcbiAgdmFyIGhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICB2YXIgdmlld0JveCA9IHN2Zy52aWV3Qm94IHx8ICh2aWV3Qm94QXR0ciA/IHZpZXdCb3hBdHRyLnNwbGl0KCcgJykgOiBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuICByZXR1cm4ge1xuICAgIGVsOiBwYXJlbnRTdmdFbCxcbiAgICB2aWV3Qm94OiB2aWV3Qm94LFxuICAgIHg6IHZpZXdCb3hbMF0gLyAxLFxuICAgIHk6IHZpZXdCb3hbMV0gLyAxLFxuICAgIHc6IHdpZHRoIC8gdmlld0JveFsyXSxcbiAgICBoOiBoZWlnaHQgLyB2aWV3Qm94WzNdXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UGF0aChwYXRoLCBwZXJjZW50KSB7XG4gIHZhciBwYXRoRWwgPSBpcy5zdHIocGF0aCkgPyBzZWxlY3RTdHJpbmcocGF0aClbMF0gOiBwYXRoO1xuICB2YXIgcCA9IHBlcmNlbnQgfHwgMTAwO1xuICByZXR1cm4gZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgZWw6IHBhdGhFbCxcbiAgICAgIHN2ZzogZ2V0UGFyZW50U3ZnKHBhdGhFbCksXG4gICAgICB0b3RhbExlbmd0aDogZ2V0VG90YWxMZW5ndGgocGF0aEVsKSAqIChwIC8gMTAwKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoUHJvZ3Jlc3MocGF0aCwgcHJvZ3Jlc3MpIHtcbiAgZnVuY3Rpb24gcG9pbnQob2Zmc2V0KSB7XG4gICAgaWYgKCBvZmZzZXQgPT09IHZvaWQgMCApIG9mZnNldCA9IDA7XG5cbiAgICB2YXIgbCA9IHByb2dyZXNzICsgb2Zmc2V0ID49IDEgPyBwcm9ncmVzcyArIG9mZnNldCA6IDA7XG4gICAgcmV0dXJuIHBhdGguZWwuZ2V0UG9pbnRBdExlbmd0aChsKTtcbiAgfVxuICB2YXIgc3ZnID0gZ2V0UGFyZW50U3ZnKHBhdGguZWwsIHBhdGguc3ZnKTtcbiAgdmFyIHAgPSBwb2ludCgpO1xuICB2YXIgcDAgPSBwb2ludCgtMSk7XG4gIHZhciBwMSA9IHBvaW50KCsxKTtcbiAgc3dpdGNoIChwYXRoLnByb3BlcnR5KSB7XG4gICAgY2FzZSAneCc6IHJldHVybiAocC54IC0gc3ZnLngpICogc3ZnLnc7XG4gICAgY2FzZSAneSc6IHJldHVybiAocC55IC0gc3ZnLnkpICogc3ZnLmg7XG4gICAgY2FzZSAnYW5nbGUnOiByZXR1cm4gTWF0aC5hdGFuMihwMS55IC0gcDAueSwgcDEueCAtIHAwLngpICogMTgwIC8gTWF0aC5QSTtcbiAgfVxufVxuXG4vLyBEZWNvbXBvc2UgdmFsdWVcblxuZnVuY3Rpb24gZGVjb21wb3NlVmFsdWUodmFsLCB1bml0KSB7XG4gIC8vIGNvbnN0IHJneCA9IC8tP1xcZCpcXC4/XFxkKy9nOyAvLyBoYW5kbGVzIGJhc2ljIG51bWJlcnNcbiAgLy8gY29uc3Qgcmd4ID0gL1srLV0/XFxkKyg/OlxcLlxcZCspPyg/OltlRV1bKy1dP1xcZCspPy9nOyAvLyBoYW5kbGVzIGV4cG9uZW50cyBub3RhdGlvblxuICB2YXIgcmd4ID0gL1srLV0/XFxkKlxcLj9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/L2c7IC8vIGhhbmRsZXMgZXhwb25lbnRzIG5vdGF0aW9uXG4gIHZhciB2YWx1ZSA9IHZhbGlkYXRlVmFsdWUoKGlzLnB0aCh2YWwpID8gdmFsLnRvdGFsTGVuZ3RoIDogdmFsKSwgdW5pdCkgKyAnJztcbiAgcmV0dXJuIHtcbiAgICBvcmlnaW5hbDogdmFsdWUsXG4gICAgbnVtYmVyczogdmFsdWUubWF0Y2gocmd4KSA/IHZhbHVlLm1hdGNoKHJneCkubWFwKE51bWJlcikgOiBbMF0sXG4gICAgc3RyaW5nczogKGlzLnN0cih2YWwpIHx8IHVuaXQpID8gdmFsdWUuc3BsaXQocmd4KSA6IFtdXG4gIH1cbn1cblxuLy8gQW5pbWF0YWJsZXNcblxuZnVuY3Rpb24gcGFyc2VUYXJnZXRzKHRhcmdldHMpIHtcbiAgdmFyIHRhcmdldHNBcnJheSA9IHRhcmdldHMgPyAoZmxhdHRlbkFycmF5KGlzLmFycih0YXJnZXRzKSA/IHRhcmdldHMubWFwKHRvQXJyYXkpIDogdG9BcnJheSh0YXJnZXRzKSkpIDogW107XG4gIHJldHVybiBmaWx0ZXJBcnJheSh0YXJnZXRzQXJyYXksIGZ1bmN0aW9uIChpdGVtLCBwb3MsIHNlbGYpIHsgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gcG9zOyB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QW5pbWF0YWJsZXModGFyZ2V0cykge1xuICB2YXIgcGFyc2VkID0gcGFyc2VUYXJnZXRzKHRhcmdldHMpO1xuICByZXR1cm4gcGFyc2VkLm1hcChmdW5jdGlvbiAodCwgaSkge1xuICAgIHJldHVybiB7dGFyZ2V0OiB0LCBpZDogaSwgdG90YWw6IHBhcnNlZC5sZW5ndGgsIHRyYW5zZm9ybXM6IHsgbGlzdDogZ2V0RWxlbWVudFRyYW5zZm9ybXModCkgfSB9O1xuICB9KTtcbn1cblxuLy8gUHJvcGVydGllc1xuXG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eVR3ZWVucyhwcm9wLCB0d2VlblNldHRpbmdzKSB7XG4gIHZhciBzZXR0aW5ncyA9IGNsb25lT2JqZWN0KHR3ZWVuU2V0dGluZ3MpO1xuICAvLyBPdmVycmlkZSBkdXJhdGlvbiBpZiBlYXNpbmcgaXMgYSBzcHJpbmdcbiAgaWYgKC9ec3ByaW5nLy50ZXN0KHNldHRpbmdzLmVhc2luZykpIHsgc2V0dGluZ3MuZHVyYXRpb24gPSBzcHJpbmcoc2V0dGluZ3MuZWFzaW5nKTsgfVxuICBpZiAoaXMuYXJyKHByb3ApKSB7XG4gICAgdmFyIGwgPSBwcm9wLmxlbmd0aDtcbiAgICB2YXIgaXNGcm9tVG8gPSAobCA9PT0gMiAmJiAhaXMub2JqKHByb3BbMF0pKTtcbiAgICBpZiAoIWlzRnJvbVRvKSB7XG4gICAgICAvLyBEdXJhdGlvbiBkaXZpZGVkIGJ5IHRoZSBudW1iZXIgb2YgdHdlZW5zXG4gICAgICBpZiAoIWlzLmZuYyh0d2VlblNldHRpbmdzLmR1cmF0aW9uKSkgeyBzZXR0aW5ncy5kdXJhdGlvbiA9IHR3ZWVuU2V0dGluZ3MuZHVyYXRpb24gLyBsOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyYW5zZm9ybSBbZnJvbSwgdG9dIHZhbHVlcyBzaG9ydGhhbmQgdG8gYSB2YWxpZCB0d2VlbiB2YWx1ZVxuICAgICAgcHJvcCA9IHt2YWx1ZTogcHJvcH07XG4gICAgfVxuICB9XG4gIHZhciBwcm9wQXJyYXkgPSBpcy5hcnIocHJvcCkgPyBwcm9wIDogW3Byb3BdO1xuICByZXR1cm4gcHJvcEFycmF5Lm1hcChmdW5jdGlvbiAodiwgaSkge1xuICAgIHZhciBvYmogPSAoaXMub2JqKHYpICYmICFpcy5wdGgodikpID8gdiA6IHt2YWx1ZTogdn07XG4gICAgLy8gRGVmYXVsdCBkZWxheSB2YWx1ZSBzaG91bGQgb25seSBiZSBhcHBsaWVkIHRvIHRoZSBmaXJzdCB0d2VlblxuICAgIGlmIChpcy51bmQob2JqLmRlbGF5KSkgeyBvYmouZGVsYXkgPSAhaSA/IHR3ZWVuU2V0dGluZ3MuZGVsYXkgOiAwOyB9XG4gICAgLy8gRGVmYXVsdCBlbmREZWxheSB2YWx1ZSBzaG91bGQgb25seSBiZSBhcHBsaWVkIHRvIHRoZSBsYXN0IHR3ZWVuXG4gICAgaWYgKGlzLnVuZChvYmouZW5kRGVsYXkpKSB7IG9iai5lbmREZWxheSA9IGkgPT09IHByb3BBcnJheS5sZW5ndGggLSAxID8gdHdlZW5TZXR0aW5ncy5lbmREZWxheSA6IDA7IH1cbiAgICByZXR1cm4gb2JqO1xuICB9KS5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIG1lcmdlT2JqZWN0cyhrLCBzZXR0aW5ncyk7IH0pO1xufVxuXG5cbmZ1bmN0aW9uIGZsYXR0ZW5LZXlmcmFtZXMoa2V5ZnJhbWVzKSB7XG4gIHZhciBwcm9wZXJ0eU5hbWVzID0gZmlsdGVyQXJyYXkoZmxhdHRlbkFycmF5KGtleWZyYW1lcy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gT2JqZWN0LmtleXMoa2V5KTsgfSkpLCBmdW5jdGlvbiAocCkgeyByZXR1cm4gaXMua2V5KHApOyB9KVxuICAucmVkdWNlKGZ1bmN0aW9uIChhLGIpIHsgaWYgKGEuaW5kZXhPZihiKSA8IDApIHsgYS5wdXNoKGIpOyB9IHJldHVybiBhOyB9LCBbXSk7XG4gIHZhciBwcm9wZXJ0aWVzID0ge307XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBpICkge1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZXNbaV07XG4gICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBrZXlmcmFtZXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBuZXdLZXkgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4ga2V5KSB7XG4gICAgICAgIGlmIChpcy5rZXkocCkpIHtcbiAgICAgICAgICBpZiAocCA9PSBwcm9wTmFtZSkgeyBuZXdLZXkudmFsdWUgPSBrZXlbcF07IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdLZXlbcF0gPSBrZXlbcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdLZXk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSBsb29wKCBpICk7XG4gIHJldHVybiBwcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKHR3ZWVuU2V0dGluZ3MsIHBhcmFtcykge1xuICB2YXIgcHJvcGVydGllcyA9IFtdO1xuICB2YXIga2V5ZnJhbWVzID0gcGFyYW1zLmtleWZyYW1lcztcbiAgaWYgKGtleWZyYW1lcykgeyBwYXJhbXMgPSBtZXJnZU9iamVjdHMoZmxhdHRlbktleWZyYW1lcyhrZXlmcmFtZXMpLCBwYXJhbXMpOyB9XG4gIGZvciAodmFyIHAgaW4gcGFyYW1zKSB7XG4gICAgaWYgKGlzLmtleShwKSkge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgbmFtZTogcCxcbiAgICAgICAgdHdlZW5zOiBub3JtYWxpemVQcm9wZXJ0eVR3ZWVucyhwYXJhbXNbcF0sIHR3ZWVuU2V0dGluZ3MpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbi8vIFR3ZWVuc1xuXG5mdW5jdGlvbiBub3JtYWxpemVUd2VlblZhbHVlcyh0d2VlbiwgYW5pbWF0YWJsZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHR3ZWVuKSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0RnVuY3Rpb25WYWx1ZSh0d2VlbltwXSwgYW5pbWF0YWJsZSk7XG4gICAgaWYgKGlzLmFycih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBnZXRGdW5jdGlvblZhbHVlKHYsIGFuaW1hdGFibGUpOyB9KTtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHsgdmFsdWUgPSB2YWx1ZVswXTsgfVxuICAgIH1cbiAgICB0W3BdID0gdmFsdWU7XG4gIH1cbiAgdC5kdXJhdGlvbiA9IHBhcnNlRmxvYXQodC5kdXJhdGlvbik7XG4gIHQuZGVsYXkgPSBwYXJzZUZsb2F0KHQuZGVsYXkpO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVHdlZW5zKHByb3AsIGFuaW1hdGFibGUpIHtcbiAgdmFyIHByZXZpb3VzVHdlZW47XG4gIHJldHVybiBwcm9wLnR3ZWVucy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICB2YXIgdHdlZW4gPSBub3JtYWxpemVUd2VlblZhbHVlcyh0LCBhbmltYXRhYmxlKTtcbiAgICB2YXIgdHdlZW5WYWx1ZSA9IHR3ZWVuLnZhbHVlO1xuICAgIHZhciB0byA9IGlzLmFycih0d2VlblZhbHVlKSA/IHR3ZWVuVmFsdWVbMV0gOiB0d2VlblZhbHVlO1xuICAgIHZhciB0b1VuaXQgPSBnZXRVbml0KHRvKTtcbiAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUoYW5pbWF0YWJsZS50YXJnZXQsIHByb3AubmFtZSwgdG9Vbml0LCBhbmltYXRhYmxlKTtcbiAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLnRvLm9yaWdpbmFsIDogb3JpZ2luYWxWYWx1ZTtcbiAgICB2YXIgZnJvbSA9IGlzLmFycih0d2VlblZhbHVlKSA/IHR3ZWVuVmFsdWVbMF0gOiBwcmV2aW91c1ZhbHVlO1xuICAgIHZhciBmcm9tVW5pdCA9IGdldFVuaXQoZnJvbSkgfHwgZ2V0VW5pdChvcmlnaW5hbFZhbHVlKTtcbiAgICB2YXIgdW5pdCA9IHRvVW5pdCB8fCBmcm9tVW5pdDtcbiAgICBpZiAoaXMudW5kKHRvKSkgeyB0byA9IHByZXZpb3VzVmFsdWU7IH1cbiAgICB0d2Vlbi5mcm9tID0gZGVjb21wb3NlVmFsdWUoZnJvbSwgdW5pdCk7XG4gICAgdHdlZW4udG8gPSBkZWNvbXBvc2VWYWx1ZShnZXRSZWxhdGl2ZVZhbHVlKHRvLCBmcm9tKSwgdW5pdCk7XG4gICAgdHdlZW4uc3RhcnQgPSBwcmV2aW91c1R3ZWVuID8gcHJldmlvdXNUd2Vlbi5lbmQgOiAwO1xuICAgIHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0ICsgdHdlZW4uZGVsYXkgKyB0d2Vlbi5kdXJhdGlvbiArIHR3ZWVuLmVuZERlbGF5O1xuICAgIHR3ZWVuLmVhc2luZyA9IHBhcnNlRWFzaW5ncyh0d2Vlbi5lYXNpbmcsIHR3ZWVuLmR1cmF0aW9uKTtcbiAgICB0d2Vlbi5pc1BhdGggPSBpcy5wdGgodHdlZW5WYWx1ZSk7XG4gICAgdHdlZW4uaXNDb2xvciA9IGlzLmNvbCh0d2Vlbi5mcm9tLm9yaWdpbmFsKTtcbiAgICBpZiAodHdlZW4uaXNDb2xvcikgeyB0d2Vlbi5yb3VuZCA9IDE7IH1cbiAgICBwcmV2aW91c1R3ZWVuID0gdHdlZW47XG4gICAgcmV0dXJuIHR3ZWVuO1xuICB9KTtcbn1cblxuLy8gVHdlZW4gcHJvZ3Jlc3NcblxudmFyIHNldFByb2dyZXNzVmFsdWUgPSB7XG4gIGNzczogZnVuY3Rpb24gKHQsIHAsIHYpIHsgcmV0dXJuIHQuc3R5bGVbcF0gPSB2OyB9LFxuICBhdHRyaWJ1dGU6IGZ1bmN0aW9uICh0LCBwLCB2KSB7IHJldHVybiB0LnNldEF0dHJpYnV0ZShwLCB2KTsgfSxcbiAgb2JqZWN0OiBmdW5jdGlvbiAodCwgcCwgdikgeyByZXR1cm4gdFtwXSA9IHY7IH0sXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKHQsIHAsIHYsIHRyYW5zZm9ybXMsIG1hbnVhbCkge1xuICAgIHRyYW5zZm9ybXMubGlzdC5zZXQocCwgdik7XG4gICAgaWYgKHAgPT09IHRyYW5zZm9ybXMubGFzdCB8fCBtYW51YWwpIHtcbiAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgIHRyYW5zZm9ybXMubGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkgeyBzdHIgKz0gcHJvcCArIFwiKFwiICsgdmFsdWUgKyBcIikgXCI7IH0pO1xuICAgICAgdC5zdHlsZS50cmFuc2Zvcm0gPSBzdHI7XG4gICAgfVxuICB9XG59O1xuXG4vLyBTZXQgVmFsdWUgaGVscGVyXG5cbmZ1bmN0aW9uIHNldFRhcmdldHNWYWx1ZSh0YXJnZXRzLCBwcm9wZXJ0aWVzKSB7XG4gIHZhciBhbmltYXRhYmxlcyA9IGdldEFuaW1hdGFibGVzKHRhcmdldHMpO1xuICBhbmltYXRhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltYXRhYmxlKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0RnVuY3Rpb25WYWx1ZShwcm9wZXJ0aWVzW3Byb3BlcnR5XSwgYW5pbWF0YWJsZSk7XG4gICAgICB2YXIgdGFyZ2V0ID0gYW5pbWF0YWJsZS50YXJnZXQ7XG4gICAgICB2YXIgdmFsdWVVbml0ID0gZ2V0VW5pdCh2YWx1ZSk7XG4gICAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWVVbml0LCBhbmltYXRhYmxlKTtcbiAgICAgIHZhciB1bml0ID0gdmFsdWVVbml0IHx8IGdldFVuaXQob3JpZ2luYWxWYWx1ZSk7XG4gICAgICB2YXIgdG8gPSBnZXRSZWxhdGl2ZVZhbHVlKHZhbGlkYXRlVmFsdWUodmFsdWUsIHVuaXQpLCBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIHZhciBhbmltVHlwZSA9IGdldEFuaW1hdGlvblR5cGUodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBzZXRQcm9ncmVzc1ZhbHVlW2FuaW1UeXBlXSh0YXJnZXQsIHByb3BlcnR5LCB0bywgYW5pbWF0YWJsZS50cmFuc2Zvcm1zLCB0cnVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBBbmltYXRpb25zXG5cbmZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRhYmxlLCBwcm9wKSB7XG4gIHZhciBhbmltVHlwZSA9IGdldEFuaW1hdGlvblR5cGUoYW5pbWF0YWJsZS50YXJnZXQsIHByb3AubmFtZSk7XG4gIGlmIChhbmltVHlwZSkge1xuICAgIHZhciB0d2VlbnMgPSBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSk7XG4gICAgdmFyIGxhc3RUd2VlbiA9IHR3ZWVuc1t0d2VlbnMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGFuaW1UeXBlLFxuICAgICAgcHJvcGVydHk6IHByb3AubmFtZSxcbiAgICAgIGFuaW1hdGFibGU6IGFuaW1hdGFibGUsXG4gICAgICB0d2VlbnM6IHR3ZWVucyxcbiAgICAgIGR1cmF0aW9uOiBsYXN0VHdlZW4uZW5kLFxuICAgICAgZGVsYXk6IHR3ZWVuc1swXS5kZWxheSxcbiAgICAgIGVuZERlbGF5OiBsYXN0VHdlZW4uZW5kRGVsYXlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9ucyhhbmltYXRhYmxlcywgcHJvcGVydGllcykge1xuICByZXR1cm4gZmlsdGVyQXJyYXkoZmxhdHRlbkFycmF5KGFuaW1hdGFibGVzLm1hcChmdW5jdGlvbiAoYW5pbWF0YWJsZSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRhYmxlLCBwcm9wKTtcbiAgICB9KTtcbiAgfSkpLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gIWlzLnVuZChhKTsgfSk7XG59XG5cbi8vIENyZWF0ZSBJbnN0YW5jZVxuXG5mdW5jdGlvbiBnZXRJbnN0YW5jZVRpbWluZ3MoYW5pbWF0aW9ucywgdHdlZW5TZXR0aW5ncykge1xuICB2YXIgYW5pbUxlbmd0aCA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuICB2YXIgZ2V0VGxPZmZzZXQgPSBmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gYW5pbS50aW1lbGluZU9mZnNldCA/IGFuaW0udGltZWxpbmVPZmZzZXQgOiAwOyB9O1xuICB2YXIgdGltaW5ncyA9IHt9O1xuICB0aW1pbmdzLmR1cmF0aW9uID0gYW5pbUxlbmd0aCA/IE1hdGgubWF4LmFwcGx5KE1hdGgsIGFuaW1hdGlvbnMubWFwKGZ1bmN0aW9uIChhbmltKSB7IHJldHVybiBnZXRUbE9mZnNldChhbmltKSArIGFuaW0uZHVyYXRpb247IH0pKSA6IHR3ZWVuU2V0dGluZ3MuZHVyYXRpb247XG4gIHRpbWluZ3MuZGVsYXkgPSBhbmltTGVuZ3RoID8gTWF0aC5taW4uYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kZWxheTsgfSkpIDogdHdlZW5TZXR0aW5ncy5kZWxheTtcbiAgdGltaW5ncy5lbmREZWxheSA9IGFuaW1MZW5ndGggPyB0aW1pbmdzLmR1cmF0aW9uIC0gTWF0aC5tYXguYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kdXJhdGlvbiAtIGFuaW0uZW5kRGVsYXk7IH0pKSA6IHR3ZWVuU2V0dGluZ3MuZW5kRGVsYXk7XG4gIHJldHVybiB0aW1pbmdzO1xufVxuXG52YXIgaW5zdGFuY2VJRCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld0luc3RhbmNlKHBhcmFtcykge1xuICB2YXIgaW5zdGFuY2VTZXR0aW5ncyA9IHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0SW5zdGFuY2VTZXR0aW5ncywgcGFyYW1zKTtcbiAgdmFyIHR3ZWVuU2V0dGluZ3MgPSByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdFR3ZWVuU2V0dGluZ3MsIHBhcmFtcyk7XG4gIHZhciBwcm9wZXJ0aWVzID0gZ2V0UHJvcGVydGllcyh0d2VlblNldHRpbmdzLCBwYXJhbXMpO1xuICB2YXIgYW5pbWF0YWJsZXMgPSBnZXRBbmltYXRhYmxlcyhwYXJhbXMudGFyZ2V0cyk7XG4gIHZhciBhbmltYXRpb25zID0gZ2V0QW5pbWF0aW9ucyhhbmltYXRhYmxlcywgcHJvcGVydGllcyk7XG4gIHZhciB0aW1pbmdzID0gZ2V0SW5zdGFuY2VUaW1pbmdzKGFuaW1hdGlvbnMsIHR3ZWVuU2V0dGluZ3MpO1xuICB2YXIgaWQgPSBpbnN0YW5jZUlEO1xuICBpbnN0YW5jZUlEKys7XG4gIHJldHVybiBtZXJnZU9iamVjdHMoaW5zdGFuY2VTZXR0aW5ncywge1xuICAgIGlkOiBpZCxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgYW5pbWF0YWJsZXM6IGFuaW1hdGFibGVzLFxuICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMsXG4gICAgZHVyYXRpb246IHRpbWluZ3MuZHVyYXRpb24sXG4gICAgZGVsYXk6IHRpbWluZ3MuZGVsYXksXG4gICAgZW5kRGVsYXk6IHRpbWluZ3MuZW5kRGVsYXlcbiAgfSk7XG59XG5cbi8vIENvcmVcblxudmFyIGFjdGl2ZUluc3RhbmNlcyA9IFtdO1xudmFyIHBhdXNlZEluc3RhbmNlcyA9IFtdO1xudmFyIHJhZjtcblxudmFyIGVuZ2luZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHBsYXkoKSB7IFxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgfVxuICBmdW5jdGlvbiBzdGVwKHQpIHtcbiAgICB2YXIgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDtcbiAgICBpZiAoYWN0aXZlSW5zdGFuY2VzTGVuZ3RoKSB7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IGFjdGl2ZUluc3RhbmNlc0xlbmd0aCkge1xuICAgICAgICB2YXIgYWN0aXZlSW5zdGFuY2UgPSBhY3RpdmVJbnN0YW5jZXNbaV07XG4gICAgICAgIGlmICghYWN0aXZlSW5zdGFuY2UucGF1c2VkKSB7XG4gICAgICAgICAgYWN0aXZlSW5zdGFuY2UudGljayh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbmRleCA9IGFjdGl2ZUluc3RhbmNlcy5pbmRleE9mKGFjdGl2ZUluc3RhbmNlKTtcbiAgICAgICAgICBpZiAoaW5zdGFuY2VJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBhY3RpdmVJbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlSW5kZXgsIDEpO1xuICAgICAgICAgICAgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgcGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYWYgPSBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGxheTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICBhY3RpdmVJbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zKSB7IHJldHVybiBpbnMucGF1c2UoKTsgfSk7XG4gICAgcGF1c2VkSW5zdGFuY2VzID0gYWN0aXZlSW5zdGFuY2VzLnNsaWNlKDApO1xuICAgIGFuaW1lLnJ1bm5pbmcgPSBhY3RpdmVJbnN0YW5jZXMgPSBbXTtcbiAgfSBlbHNlIHtcbiAgICBwYXVzZWRJbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zKSB7IHJldHVybiBpbnMucGxheSgpOyB9KTtcbiAgfVxufVxuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSk7XG59XG5cbi8vIFB1YmxpYyBJbnN0YW5jZVxuXG5mdW5jdGlvbiBhbmltZShwYXJhbXMpIHtcbiAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IHt9O1xuXG5cbiAgdmFyIHN0YXJ0VGltZSA9IDAsIGxhc3RUaW1lID0gMCwgbm93ID0gMDtcbiAgdmFyIGNoaWxkcmVuLCBjaGlsZHJlbkxlbmd0aCA9IDA7XG4gIHZhciByZXNvbHZlID0gbnVsbDtcblxuICBmdW5jdGlvbiBtYWtlUHJvbWlzZShpbnN0YW5jZSkge1xuICAgIHZhciBwcm9taXNlID0gd2luZG93LlByb21pc2UgJiYgbmV3IFByb21pc2UoZnVuY3Rpb24gKF9yZXNvbHZlKSB7IHJldHVybiByZXNvbHZlID0gX3Jlc29sdmU7IH0pO1xuICAgIGluc3RhbmNlLmZpbmlzaGVkID0gcHJvbWlzZTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHZhciBpbnN0YW5jZSA9IGNyZWF0ZU5ld0luc3RhbmNlKHBhcmFtcyk7XG4gIHZhciBwcm9taXNlID0gbWFrZVByb21pc2UoaW5zdGFuY2UpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZUluc3RhbmNlRGlyZWN0aW9uKCkge1xuICAgIHZhciBkaXJlY3Rpb24gPSBpbnN0YW5jZS5kaXJlY3Rpb247XG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gJ2FsdGVybmF0ZScpIHtcbiAgICAgIGluc3RhbmNlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbiAhPT0gJ25vcm1hbCcgPyAnbm9ybWFsJyA6ICdyZXZlcnNlJztcbiAgICB9XG4gICAgaW5zdGFuY2UucmV2ZXJzZWQgPSAhaW5zdGFuY2UucmV2ZXJzZWQ7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIGNoaWxkLnJldmVyc2VkID0gaW5zdGFuY2UucmV2ZXJzZWQ7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRqdXN0VGltZSh0aW1lKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLnJldmVyc2VkID8gaW5zdGFuY2UuZHVyYXRpb24gLSB0aW1lIDogdGltZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZSgpIHtcbiAgICBzdGFydFRpbWUgPSAwO1xuICAgIGxhc3RUaW1lID0gYWRqdXN0VGltZShpbnN0YW5jZS5jdXJyZW50VGltZSkgKiAoMSAvIGFuaW1lLnNwZWVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlZWtDaGlsZCh0aW1lLCBjaGlsZCkge1xuICAgIGlmIChjaGlsZCkgeyBjaGlsZC5zZWVrKHRpbWUgLSBjaGlsZC50aW1lbGluZU9mZnNldCk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN5bmNJbnN0YW5jZUNoaWxkcmVuKHRpbWUpIHtcbiAgICBpZiAoIWluc3RhbmNlLnJldmVyc2VQbGF5YmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7IHNlZWtDaGlsZCh0aW1lLCBjaGlsZHJlbltpXSk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSQxID0gY2hpbGRyZW5MZW5ndGg7IGkkMS0tOykgeyBzZWVrQ2hpbGQodGltZSwgY2hpbGRyZW5baSQxXSk7IH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoaW5zVGltZSkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGluc3RhbmNlLmFuaW1hdGlvbnM7XG4gICAgdmFyIGFuaW1hdGlvbnNMZW5ndGggPSBhbmltYXRpb25zLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGFuaW1hdGlvbnNMZW5ndGgpIHtcbiAgICAgIHZhciBhbmltID0gYW5pbWF0aW9uc1tpXTtcbiAgICAgIHZhciBhbmltYXRhYmxlID0gYW5pbS5hbmltYXRhYmxlO1xuICAgICAgdmFyIHR3ZWVucyA9IGFuaW0udHdlZW5zO1xuICAgICAgdmFyIHR3ZWVuTGVuZ3RoID0gdHdlZW5zLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgdHdlZW4gPSB0d2VlbnNbdHdlZW5MZW5ndGhdO1xuICAgICAgLy8gT25seSBjaGVjayBmb3Iga2V5ZnJhbWVzIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgdHdlZW5cbiAgICAgIGlmICh0d2Vlbkxlbmd0aCkgeyB0d2VlbiA9IGZpbHRlckFycmF5KHR3ZWVucywgZnVuY3Rpb24gKHQpIHsgcmV0dXJuIChpbnNUaW1lIDwgdC5lbmQpOyB9KVswXSB8fCB0d2VlbjsgfVxuICAgICAgdmFyIGVsYXBzZWQgPSBtaW5NYXgoaW5zVGltZSAtIHR3ZWVuLnN0YXJ0IC0gdHdlZW4uZGVsYXksIDAsIHR3ZWVuLmR1cmF0aW9uKSAvIHR3ZWVuLmR1cmF0aW9uO1xuICAgICAgdmFyIGVhc2VkID0gaXNOYU4oZWxhcHNlZCkgPyAxIDogdHdlZW4uZWFzaW5nKGVsYXBzZWQpO1xuICAgICAgdmFyIHN0cmluZ3MgPSB0d2Vlbi50by5zdHJpbmdzO1xuICAgICAgdmFyIHJvdW5kID0gdHdlZW4ucm91bmQ7XG4gICAgICB2YXIgbnVtYmVycyA9IFtdO1xuICAgICAgdmFyIHRvTnVtYmVyc0xlbmd0aCA9IHR3ZWVuLnRvLm51bWJlcnMubGVuZ3RoO1xuICAgICAgdmFyIHByb2dyZXNzID0gKHZvaWQgMCk7XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRvTnVtYmVyc0xlbmd0aDsgbisrKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICh2b2lkIDApO1xuICAgICAgICB2YXIgdG9OdW1iZXIgPSB0d2Vlbi50by5udW1iZXJzW25dO1xuICAgICAgICB2YXIgZnJvbU51bWJlciA9IHR3ZWVuLmZyb20ubnVtYmVyc1tuXSB8fCAwO1xuICAgICAgICBpZiAoIXR3ZWVuLmlzUGF0aCkge1xuICAgICAgICAgIHZhbHVlID0gZnJvbU51bWJlciArIChlYXNlZCAqICh0b051bWJlciAtIGZyb21OdW1iZXIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGdldFBhdGhQcm9ncmVzcyh0d2Vlbi52YWx1ZSwgZWFzZWQgKiB0b051bWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdW5kKSB7XG4gICAgICAgICAgaWYgKCEodHdlZW4uaXNDb2xvciAmJiBuID4gMikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHJvdW5kKSAvIHJvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXJzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgLy8gTWFudWFsIEFycmF5LnJlZHVjZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlc1xuICAgICAgdmFyIHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aDtcbiAgICAgIGlmICghc3RyaW5nc0xlbmd0aCkge1xuICAgICAgICBwcm9ncmVzcyA9IG51bWJlcnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9ncmVzcyA9IHN0cmluZ3NbMF07XG4gICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgc3RyaW5nc0xlbmd0aDsgcysrKSB7XG4gICAgICAgICAgdmFyIGEgPSBzdHJpbmdzW3NdO1xuICAgICAgICAgIHZhciBiID0gc3RyaW5nc1tzICsgMV07XG4gICAgICAgICAgdmFyIG4kMSA9IG51bWJlcnNbc107XG4gICAgICAgICAgaWYgKCFpc05hTihuJDEpKSB7XG4gICAgICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gbiQxICsgJyAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gbiQxICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFByb2dyZXNzVmFsdWVbYW5pbS50eXBlXShhbmltYXRhYmxlLnRhcmdldCwgYW5pbS5wcm9wZXJ0eSwgcHJvZ3Jlc3MsIGFuaW1hdGFibGUudHJhbnNmb3Jtcyk7XG4gICAgICBhbmltLmN1cnJlbnRWYWx1ZSA9IHByb2dyZXNzO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhbGxiYWNrKGNiKSB7XG4gICAgaWYgKGluc3RhbmNlW2NiXSAmJiAhaW5zdGFuY2UucGFzc1Rocm91Z2gpIHsgaW5zdGFuY2VbY2JdKGluc3RhbmNlKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gY291bnRJdGVyYXRpb24oKSB7XG4gICAgaWYgKGluc3RhbmNlLnJlbWFpbmluZyAmJiBpbnN0YW5jZS5yZW1haW5pbmcgIT09IHRydWUpIHtcbiAgICAgIGluc3RhbmNlLnJlbWFpbmluZy0tO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEluc3RhbmNlUHJvZ3Jlc3MoZW5naW5lVGltZSkge1xuICAgIHZhciBpbnNEdXJhdGlvbiA9IGluc3RhbmNlLmR1cmF0aW9uO1xuICAgIHZhciBpbnNEZWxheSA9IGluc3RhbmNlLmRlbGF5O1xuICAgIHZhciBpbnNFbmREZWxheSA9IGluc0R1cmF0aW9uIC0gaW5zdGFuY2UuZW5kRGVsYXk7XG4gICAgdmFyIGluc1RpbWUgPSBhZGp1c3RUaW1lKGVuZ2luZVRpbWUpO1xuICAgIGluc3RhbmNlLnByb2dyZXNzID0gbWluTWF4KChpbnNUaW1lIC8gaW5zRHVyYXRpb24pICogMTAwLCAwLCAxMDApO1xuICAgIGluc3RhbmNlLnJldmVyc2VQbGF5YmFjayA9IGluc1RpbWUgPCBpbnN0YW5jZS5jdXJyZW50VGltZTtcbiAgICBpZiAoY2hpbGRyZW4pIHsgc3luY0luc3RhbmNlQ2hpbGRyZW4oaW5zVGltZSk7IH1cbiAgICBpZiAoIWluc3RhbmNlLmJlZ2FuICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgaW5zdGFuY2UuYmVnYW4gPSB0cnVlO1xuICAgICAgc2V0Q2FsbGJhY2soJ2JlZ2luJyk7XG4gICAgfVxuICAgIGlmICghaW5zdGFuY2UubG9vcEJlZ2FuICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gdHJ1ZTtcbiAgICAgIHNldENhbGxiYWNrKCdsb29wQmVnaW4nKTtcbiAgICB9XG4gICAgaWYgKGluc1RpbWUgPD0gaW5zRGVsYXkgJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgIT09IDApIHtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcygwKTtcbiAgICB9XG4gICAgaWYgKChpbnNUaW1lID49IGluc0VuZERlbGF5ICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lICE9PSBpbnNEdXJhdGlvbikgfHwgIWluc0R1cmF0aW9uKSB7XG4gICAgICBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoaW5zRHVyYXRpb24pO1xuICAgIH1cbiAgICBpZiAoaW5zVGltZSA+IGluc0RlbGF5ICYmIGluc1RpbWUgPCBpbnNFbmREZWxheSkge1xuICAgICAgaWYgKCFpbnN0YW5jZS5jaGFuZ2VCZWdhbikge1xuICAgICAgICBpbnN0YW5jZS5jaGFuZ2VCZWdhbiA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBzZXRDYWxsYmFjaygnY2hhbmdlQmVnaW4nKTtcbiAgICAgIH1cbiAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2UnKTtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNUaW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGluc3RhbmNlLmNoYW5nZUJlZ2FuKSB7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gZmFsc2U7XG4gICAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2VDb21wbGV0ZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5jdXJyZW50VGltZSA9IG1pbk1heChpbnNUaW1lLCAwLCBpbnNEdXJhdGlvbik7XG4gICAgaWYgKGluc3RhbmNlLmJlZ2FuKSB7IHNldENhbGxiYWNrKCd1cGRhdGUnKTsgfVxuICAgIGlmIChlbmdpbmVUaW1lID49IGluc0R1cmF0aW9uKSB7XG4gICAgICBsYXN0VGltZSA9IDA7XG4gICAgICBjb3VudEl0ZXJhdGlvbigpO1xuICAgICAgaWYgKCFpbnN0YW5jZS5yZW1haW5pbmcpIHtcbiAgICAgICAgaW5zdGFuY2UucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgICBpbnN0YW5jZS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIHNldENhbGxiYWNrKCdsb29wQ29tcGxldGUnKTtcbiAgICAgICAgICBzZXRDYWxsYmFjaygnY29tcGxldGUnKTtcbiAgICAgICAgICBpZiAoIWluc3RhbmNlLnBhc3NUaHJvdWdoICYmICdQcm9taXNlJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYWtlUHJvbWlzZShpbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFRpbWUgPSBub3c7XG4gICAgICAgIHNldENhbGxiYWNrKCdsb29wQ29tcGxldGUnKTtcbiAgICAgICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gZmFsc2U7XG4gICAgICAgIGlmIChpbnN0YW5jZS5kaXJlY3Rpb24gPT09ICdhbHRlcm5hdGUnKSB7XG4gICAgICAgICAgdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluc3RhbmNlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IGluc3RhbmNlLmRpcmVjdGlvbjtcbiAgICBpbnN0YW5jZS5wYXNzVGhyb3VnaCA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lID0gMDtcbiAgICBpbnN0YW5jZS5wcm9ncmVzcyA9IDA7XG4gICAgaW5zdGFuY2UucGF1c2VkID0gdHJ1ZTtcbiAgICBpbnN0YW5jZS5iZWdhbiA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmxvb3BCZWdhbiA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gZmFsc2U7XG4gICAgaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrID0gZmFsc2U7XG4gICAgaW5zdGFuY2UucmV2ZXJzZWQgPSBkaXJlY3Rpb24gPT09ICdyZXZlcnNlJztcbiAgICBpbnN0YW5jZS5yZW1haW5pbmcgPSBpbnN0YW5jZS5sb29wO1xuICAgIGNoaWxkcmVuID0gaW5zdGFuY2UuY2hpbGRyZW47XG4gICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuTGVuZ3RoOyBpLS07KSB7IGluc3RhbmNlLmNoaWxkcmVuW2ldLnJlc2V0KCk7IH1cbiAgICBpZiAoaW5zdGFuY2UucmV2ZXJzZWQgJiYgaW5zdGFuY2UubG9vcCAhPT0gdHJ1ZSB8fCAoZGlyZWN0aW9uID09PSAnYWx0ZXJuYXRlJyAmJiBpbnN0YW5jZS5sb29wID09PSAxKSkgeyBpbnN0YW5jZS5yZW1haW5pbmcrKzsgfVxuICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnN0YW5jZS5yZXZlcnNlZCA/IGluc3RhbmNlLmR1cmF0aW9uIDogMCk7XG4gIH07XG5cbiAgLy8gU2V0IFZhbHVlIGhlbHBlclxuXG4gIGluc3RhbmNlLnNldCA9IGZ1bmN0aW9uKHRhcmdldHMsIHByb3BlcnRpZXMpIHtcbiAgICBzZXRUYXJnZXRzVmFsdWUodGFyZ2V0cywgcHJvcGVydGllcyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIGluc3RhbmNlLnRpY2sgPSBmdW5jdGlvbih0KSB7XG4gICAgbm93ID0gdDtcbiAgICBpZiAoIXN0YXJ0VGltZSkgeyBzdGFydFRpbWUgPSBub3c7IH1cbiAgICBzZXRJbnN0YW5jZVByb2dyZXNzKChub3cgKyAobGFzdFRpbWUgLSBzdGFydFRpbWUpKSAqIGFuaW1lLnNwZWVkKTtcbiAgfTtcblxuICBpbnN0YW5jZS5zZWVrID0gZnVuY3Rpb24odGltZSkge1xuICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoYWRqdXN0VGltZSh0aW1lKSk7XG4gIH07XG5cbiAgaW5zdGFuY2UucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgIHJlc2V0VGltZSgpO1xuICB9O1xuXG4gIGluc3RhbmNlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWluc3RhbmNlLnBhdXNlZCkgeyByZXR1cm47IH1cbiAgICBpZiAoaW5zdGFuY2UuY29tcGxldGVkKSB7IGluc3RhbmNlLnJlc2V0KCk7IH1cbiAgICBpbnN0YW5jZS5wYXVzZWQgPSBmYWxzZTtcbiAgICBhY3RpdmVJbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG4gICAgcmVzZXRUaW1lKCk7XG4gICAgaWYgKCFyYWYpIHsgZW5naW5lKCk7IH1cbiAgfTtcblxuICBpbnN0YW5jZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKTtcbiAgICByZXNldFRpbWUoKTtcbiAgfTtcblxuICBpbnN0YW5jZS5yZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5zdGFuY2UucmVzZXQoKTtcbiAgICBpbnN0YW5jZS5wbGF5KCk7XG4gIH07XG5cbiAgaW5zdGFuY2UucmVzZXQoKTtcblxuICBpZiAoaW5zdGFuY2UuYXV0b3BsYXkpIHsgaW5zdGFuY2UucGxheSgpOyB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xuXG59XG5cbi8vIFJlbW92ZSB0YXJnZXRzIGZyb20gYW5pbWF0aW9uXG5cbmZ1bmN0aW9uIHJlbW92ZVRhcmdldHNGcm9tQW5pbWF0aW9ucyh0YXJnZXRzQXJyYXksIGFuaW1hdGlvbnMpIHtcbiAgZm9yICh2YXIgYSA9IGFuaW1hdGlvbnMubGVuZ3RoOyBhLS07KSB7XG4gICAgaWYgKGFycmF5Q29udGFpbnModGFyZ2V0c0FycmF5LCBhbmltYXRpb25zW2FdLmFuaW1hdGFibGUudGFyZ2V0KSkge1xuICAgICAgYW5pbWF0aW9ucy5zcGxpY2UoYSwgMSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhcmdldHModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0c0FycmF5ID0gcGFyc2VUYXJnZXRzKHRhcmdldHMpO1xuICBmb3IgKHZhciBpID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDsgaS0tOykge1xuICAgIHZhciBpbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlc1tpXTtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGluc3RhbmNlLmFuaW1hdGlvbnM7XG4gICAgdmFyIGNoaWxkcmVuID0gaW5zdGFuY2UuY2hpbGRyZW47XG4gICAgcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgYW5pbWF0aW9ucyk7XG4gICAgZm9yICh2YXIgYyA9IGNoaWxkcmVuLmxlbmd0aDsgYy0tOykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5bY107XG4gICAgICB2YXIgY2hpbGRBbmltYXRpb25zID0gY2hpbGQuYW5pbWF0aW9ucztcbiAgICAgIHJlbW92ZVRhcmdldHNGcm9tQW5pbWF0aW9ucyh0YXJnZXRzQXJyYXksIGNoaWxkQW5pbWF0aW9ucyk7XG4gICAgICBpZiAoIWNoaWxkQW5pbWF0aW9ucy5sZW5ndGggJiYgIWNoaWxkLmNoaWxkcmVuLmxlbmd0aCkgeyBjaGlsZHJlbi5zcGxpY2UoYywgMSk7IH1cbiAgICB9XG4gICAgaWYgKCFhbmltYXRpb25zLmxlbmd0aCAmJiAhY2hpbGRyZW4ubGVuZ3RoKSB7IGluc3RhbmNlLnBhdXNlKCk7IH1cbiAgfVxufVxuXG4vLyBTdGFnZ2VyIGhlbHBlcnNcblxuZnVuY3Rpb24gc3RhZ2dlcih2YWwsIHBhcmFtcykge1xuICBpZiAoIHBhcmFtcyA9PT0gdm9pZCAwICkgcGFyYW1zID0ge307XG5cbiAgdmFyIGRpcmVjdGlvbiA9IHBhcmFtcy5kaXJlY3Rpb24gfHwgJ25vcm1hbCc7XG4gIHZhciBlYXNpbmcgPSBwYXJhbXMuZWFzaW5nID8gcGFyc2VFYXNpbmdzKHBhcmFtcy5lYXNpbmcpIDogbnVsbDtcbiAgdmFyIGdyaWQgPSBwYXJhbXMuZ3JpZDtcbiAgdmFyIGF4aXMgPSBwYXJhbXMuYXhpcztcbiAgdmFyIGZyb21JbmRleCA9IHBhcmFtcy5mcm9tIHx8IDA7XG4gIHZhciBmcm9tRmlyc3QgPSBmcm9tSW5kZXggPT09ICdmaXJzdCc7XG4gIHZhciBmcm9tQ2VudGVyID0gZnJvbUluZGV4ID09PSAnY2VudGVyJztcbiAgdmFyIGZyb21MYXN0ID0gZnJvbUluZGV4ID09PSAnbGFzdCc7XG4gIHZhciBpc1JhbmdlID0gaXMuYXJyKHZhbCk7XG4gIHZhciB2YWwxID0gaXNSYW5nZSA/IHBhcnNlRmxvYXQodmFsWzBdKSA6IHBhcnNlRmxvYXQodmFsKTtcbiAgdmFyIHZhbDIgPSBpc1JhbmdlID8gcGFyc2VGbG9hdCh2YWxbMV0pIDogMDtcbiAgdmFyIHVuaXQgPSBnZXRVbml0KGlzUmFuZ2UgPyB2YWxbMV0gOiB2YWwpIHx8IDA7XG4gIHZhciBzdGFydCA9IHBhcmFtcy5zdGFydCB8fCAwICsgKGlzUmFuZ2UgPyB2YWwxIDogMCk7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgdmFyIG1heFZhbHVlID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgaSwgdCkge1xuICAgIGlmIChmcm9tRmlyc3QpIHsgZnJvbUluZGV4ID0gMDsgfVxuICAgIGlmIChmcm9tQ2VudGVyKSB7IGZyb21JbmRleCA9ICh0IC0gMSkgLyAyOyB9XG4gICAgaWYgKGZyb21MYXN0KSB7IGZyb21JbmRleCA9IHQgLSAxOyB9XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoIWdyaWQpIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaChNYXRoLmFicyhmcm9tSW5kZXggLSBpbmRleCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBmcm9tWCA9ICFmcm9tQ2VudGVyID8gZnJvbUluZGV4JWdyaWRbMF0gOiAoZ3JpZFswXS0xKS8yO1xuICAgICAgICAgIHZhciBmcm9tWSA9ICFmcm9tQ2VudGVyID8gTWF0aC5mbG9vcihmcm9tSW5kZXgvZ3JpZFswXSkgOiAoZ3JpZFsxXS0xKS8yO1xuICAgICAgICAgIHZhciB0b1ggPSBpbmRleCVncmlkWzBdO1xuICAgICAgICAgIHZhciB0b1kgPSBNYXRoLmZsb29yKGluZGV4L2dyaWRbMF0pO1xuICAgICAgICAgIHZhciBkaXN0YW5jZVggPSBmcm9tWCAtIHRvWDtcbiAgICAgICAgICB2YXIgZGlzdGFuY2VZID0gZnJvbVkgLSB0b1k7XG4gICAgICAgICAgdmFyIHZhbHVlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSk7XG4gICAgICAgICAgaWYgKGF4aXMgPT09ICd4JykgeyB2YWx1ZSA9IC1kaXN0YW5jZVg7IH1cbiAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7IHZhbHVlID0gLWRpc3RhbmNlWTsgfVxuICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBtYXhWYWx1ZSA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAoZWFzaW5nKSB7IHZhbHVlcyA9IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gZWFzaW5nKHZhbCAvIG1heFZhbHVlKSAqIG1heFZhbHVlOyB9KTsgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnKSB7IHZhbHVlcyA9IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gYXhpcyA/ICh2YWwgPCAwKSA/IHZhbCAqIC0xIDogLXZhbCA6IE1hdGguYWJzKG1heFZhbHVlIC0gdmFsKTsgfSk7IH1cbiAgICB9XG4gICAgdmFyIHNwYWNpbmcgPSBpc1JhbmdlID8gKHZhbDIgLSB2YWwxKSAvIG1heFZhbHVlIDogdmFsMTtcbiAgICByZXR1cm4gc3RhcnQgKyAoc3BhY2luZyAqIChNYXRoLnJvdW5kKHZhbHVlc1tpXSAqIDEwMCkgLyAxMDApKSArIHVuaXQ7XG4gIH1cbn1cblxuLy8gVGltZWxpbmVcblxuZnVuY3Rpb24gdGltZWxpbmUocGFyYW1zKSB7XG4gIGlmICggcGFyYW1zID09PSB2b2lkIDAgKSBwYXJhbXMgPSB7fTtcblxuICB2YXIgdGwgPSBhbmltZShwYXJhbXMpO1xuICB0bC5kdXJhdGlvbiA9IDA7XG4gIHRsLmFkZCA9IGZ1bmN0aW9uKGluc3RhbmNlUGFyYW1zLCB0aW1lbGluZU9mZnNldCkge1xuICAgIHZhciB0bEluZGV4ID0gYWN0aXZlSW5zdGFuY2VzLmluZGV4T2YodGwpO1xuICAgIHZhciBjaGlsZHJlbiA9IHRsLmNoaWxkcmVuO1xuICAgIGlmICh0bEluZGV4ID4gLTEpIHsgYWN0aXZlSW5zdGFuY2VzLnNwbGljZSh0bEluZGV4LCAxKTsgfVxuICAgIGZ1bmN0aW9uIHBhc3NUaHJvdWdoKGlucykgeyBpbnMucGFzc1Rocm91Z2ggPSB0cnVlOyB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykgeyBwYXNzVGhyb3VnaChjaGlsZHJlbltpXSk7IH1cbiAgICB2YXIgaW5zUGFyYW1zID0gbWVyZ2VPYmplY3RzKGluc3RhbmNlUGFyYW1zLCByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdFR3ZWVuU2V0dGluZ3MsIHBhcmFtcykpO1xuICAgIGluc1BhcmFtcy50YXJnZXRzID0gaW5zUGFyYW1zLnRhcmdldHMgfHwgcGFyYW1zLnRhcmdldHM7XG4gICAgdmFyIHRsRHVyYXRpb24gPSB0bC5kdXJhdGlvbjtcbiAgICBpbnNQYXJhbXMuYXV0b3BsYXkgPSBmYWxzZTtcbiAgICBpbnNQYXJhbXMuZGlyZWN0aW9uID0gdGwuZGlyZWN0aW9uO1xuICAgIGluc1BhcmFtcy50aW1lbGluZU9mZnNldCA9IGlzLnVuZCh0aW1lbGluZU9mZnNldCkgPyB0bER1cmF0aW9uIDogZ2V0UmVsYXRpdmVWYWx1ZSh0aW1lbGluZU9mZnNldCwgdGxEdXJhdGlvbik7XG4gICAgcGFzc1Rocm91Z2godGwpO1xuICAgIHRsLnNlZWsoaW5zUGFyYW1zLnRpbWVsaW5lT2Zmc2V0KTtcbiAgICB2YXIgaW5zID0gYW5pbWUoaW5zUGFyYW1zKTtcbiAgICBwYXNzVGhyb3VnaChpbnMpO1xuICAgIGNoaWxkcmVuLnB1c2goaW5zKTtcbiAgICB2YXIgdGltaW5ncyA9IGdldEluc3RhbmNlVGltaW5ncyhjaGlsZHJlbiwgcGFyYW1zKTtcbiAgICB0bC5kZWxheSA9IHRpbWluZ3MuZGVsYXk7XG4gICAgdGwuZW5kRGVsYXkgPSB0aW1pbmdzLmVuZERlbGF5O1xuICAgIHRsLmR1cmF0aW9uID0gdGltaW5ncy5kdXJhdGlvbjtcbiAgICB0bC5zZWVrKDApO1xuICAgIHRsLnJlc2V0KCk7XG4gICAgaWYgKHRsLmF1dG9wbGF5KSB7IHRsLnBsYXkoKTsgfVxuICAgIHJldHVybiB0bDtcbiAgfTtcbiAgcmV0dXJuIHRsO1xufVxuXG5hbmltZS52ZXJzaW9uID0gJzMuMS4wJztcbmFuaW1lLnNwZWVkID0gMTtcbmFuaW1lLnJ1bm5pbmcgPSBhY3RpdmVJbnN0YW5jZXM7XG5hbmltZS5yZW1vdmUgPSByZW1vdmVUYXJnZXRzO1xuYW5pbWUuZ2V0ID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZTtcbmFuaW1lLnNldCA9IHNldFRhcmdldHNWYWx1ZTtcbmFuaW1lLmNvbnZlcnRQeCA9IGNvbnZlcnRQeFRvVW5pdDtcbmFuaW1lLnBhdGggPSBnZXRQYXRoO1xuYW5pbWUuc2V0RGFzaG9mZnNldCA9IHNldERhc2hvZmZzZXQ7XG5hbmltZS5zdGFnZ2VyID0gc3RhZ2dlcjtcbmFuaW1lLnRpbWVsaW5lID0gdGltZWxpbmU7XG5hbmltZS5lYXNpbmcgPSBwYXJzZUVhc2luZ3M7XG5hbmltZS5wZW5uZXIgPSBwZW5uZXI7XG5hbmltZS5yYW5kb20gPSBmdW5jdGlvbiAobWluLCBtYXgpIHsgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47IH07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1lO1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB0b01TIH0gZnJvbSAnLi90b01TJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1NydFRpbWUgfSBmcm9tICcuL3RvU3J0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdG9WdHRUaW1lIH0gZnJvbSAnLi90b1Z0dFRpbWUnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlIH0gZnJvbSAnLi9wYXJzZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnknXG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeVZ0dCB9IGZyb20gJy4vc3RyaW5naWZ5VnR0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyByZXN5bmMgfSBmcm9tICcuL3Jlc3luYydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VUaW1lc3RhbXBzIH0gZnJvbSAnLi9wYXJzZVRpbWVzdGFtcHMnXG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHBhcnNlVGltZXN0YW1wcyBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcblxuLyoqXG4gKiBQYXJzZSBhIFNSVCBvciBXZWJWVFQgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHNydE9yVnR0XG4gKiBAcmV0dXJuIHtBcnJheX0gc3VidGl0bGVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UgKHNydE9yVnR0KSB7XG4gIGlmICghc3J0T3JWdHQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHNvdXJjZSA9IHNydE9yVnR0XG4gICAgLnRyaW0oKVxuICAgIC5jb25jYXQoJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJylcbiAgICAucmVwbGFjZSgvXldFQlZUVC4qXFxuKD86Lio6IC4qXFxuKSpcXG4vLCAnJylcbiAgICAuc3BsaXQoJ1xcbicpXG5cbiAgcmV0dXJuIHNvdXJjZS5yZWR1Y2UoKGNhcHRpb25zLCByb3csIGluZGV4KSA9PiB7XG4gICAgY29uc3QgY2FwdGlvbiA9IGNhcHRpb25zW2NhcHRpb25zLmxlbmd0aCAtIDFdXG5cbiAgICBpZiAoIWNhcHRpb24uaW5kZXgpIHtcbiAgICAgIGlmICgvXlxcZCskLy50ZXN0KHJvdykpIHtcbiAgICAgICAgY2FwdGlvbi5pbmRleCA9IHBhcnNlSW50KHJvdywgMTApXG4gICAgICAgIHJldHVybiBjYXB0aW9uc1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2FwdGlvbi5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gcGFyc2VUaW1lc3RhbXBzKHJvdylcbiAgICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjYXB0aW9uLCB0aW1lc3RhbXApXG4gICAgICB9IGVsc2UgaWYgKGNhcHRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMl0udGV4dCArPSAnXFxuJyArIHJvd1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgfVxuXG4gICAgaWYgKHJvdyA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSBjYXB0aW9uLmluZGV4XG4gICAgICBpZiAoaW5kZXggIT09IHNvdXJjZS5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNhcHRpb25zLnB1c2goe30pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24udGV4dFxuICAgICAgICA/IGNhcHRpb24udGV4dCArICdcXG4nICsgcm93XG4gICAgICAgIDogcm93XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zXG4gIH0sIFt7fV0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFRpbWVzdGFtcCByZWdleFxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xuXG5jb25zdCBSRSA9IC9eKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkgLS0+ICgoPzpcXGR7Mix9Oik/XFxkezJ9OlxcZHsyfVssLl1cXGR7M30pKD86ICguKikpPyQvXG5cbi8qKlxuICogcGFyc2VUaW1lc3RhbXBzXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHt7c3RhcnQ6IE51bWJlciwgZW5kOiBOdW1iZXJ9fVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlVGltZXN0YW1wcyAodmFsdWUpIHtcbiAgY29uc3QgbWF0Y2ggPSBSRS5leGVjKHZhbHVlKVxuICBpZiAobWF0Y2gpIHtcbiAgICBjb25zdCBjdWUgPSB7XG4gICAgICBzdGFydDogdG9NUyhtYXRjaFsxXSksXG4gICAgICBlbmQ6IHRvTVMobWF0Y2hbMl0pXG4gICAgfVxuICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgY3VlLnNldHRpbmdzID0gbWF0Y2hbM11cbiAgICB9XG4gICAgcmV0dXJuIGN1ZVxuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFJlc3luYyB0aGUgZ2l2ZW4gc3VidGl0bGVzLlxuICogQHBhcmFtIGNhcHRpb25zXG4gKiBAcGFyYW0gdGltZVxuICogQHJldHVybnMge0FycmF5fCp9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzeW5jIChjYXB0aW9ucywgdGltZSkge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKGNhcHRpb24gPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gdG9NUyhjYXB0aW9uLnN0YXJ0KSArIHRpbWVcbiAgICBjb25zdCBlbmQgPSB0b01TKGNhcHRpb24uZW5kKSArIHRpbWVcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjYXB0aW9uLCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0pXG4gIH0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvU3J0VGltZSBmcm9tICcuL3RvU3J0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zLlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gc3J0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5IChjYXB0aW9ucykge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKChjYXB0aW9uLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ1xcbicgOiAnJykgKyBbXG4gICAgICBpbmRleCArIDEsXG4gICAgICBgJHt0b1NydFRpbWUoY2FwdGlvbi5zdGFydCl9IC0tPiAke3RvU3J0VGltZShjYXB0aW9uLmVuZCl9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b1Z0dFRpbWUgZnJvbSAnLi90b1Z0dFRpbWUnXG5cbi8qKlxuICogU3RyaW5naWZ5IHRoZSBnaXZlbiBhcnJheSBvZiBjYXB0aW9ucyB0byBXZWJWVFQgZm9ybWF0LlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gd2ViVnR0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5VnR0IChjYXB0aW9ucykge1xuICByZXR1cm4gJ1dFQlZUVFxcblxcbicgKyBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvVnR0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9WdHRUaW1lKGNhcHRpb24uZW5kKX0ke2NhcHRpb24uc2V0dGluZ3MgPyAnICcgKyBjYXB0aW9uLnNldHRpbmdzIDogJyd9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBSZXR1cm4gdGhlIGdpdmVuIFNSVCB0aW1lc3RhbXAgYXMgbWlsbGVzZWNvbmRzLlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTVMgKHRpbWVzdGFtcCkge1xuICBpZiAoIWlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHRpbWVzdGFtcC5tYXRjaCgvXig/OihcXGR7Mix9KTopPyhcXGR7Mn0pOihcXGR7Mn0pWywuXShcXGR7M30pJC8pXG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBTUlQgb3IgVlRUIHRpbWUgZm9ybWF0OiBcIicgKyB0aW1lc3RhbXAgKyAnXCInKVxuICB9XG5cbiAgY29uc3QgaG91cnMgPSBtYXRjaFsxXSA/IHBhcnNlSW50KG1hdGNoWzFdLCAxMCkgKiAzNjAwMDAwIDogMFxuICBjb25zdCBtaW51dGVzID0gcGFyc2VJbnQobWF0Y2hbMl0sIDEwKSAqIDYwMDAwXG4gIGNvbnN0IHNlY29uZHMgPSBwYXJzZUludChtYXRjaFszXSwgMTApICogMTAwMFxuICBjb25zdCBtaWxsaXNlY29uZHMgPSBwYXJzZUludChtYXRjaFs0XSwgMTApXG5cbiAgcmV0dXJuIGhvdXJzICsgbWludXRlcyArIHNlY29uZHMgKyBtaWxsaXNlY29uZHNcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFNSVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvU3J0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LCR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFdlYlZUVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVnR0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LiR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsIi8qKlxuICogR2l2ZW4gYSBudW1iZXIsIHJldHVybiBhIHplcm8tZmlsbGVkIHN0cmluZy5cbiAqIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjY3MjgzL1xuICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtICB7bnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB6ZXJvRmlsbCAod2lkdGgsIG51bWJlciwgcGFkKSB7XG4gIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobnVtYmVyLCBwYWQpIHtcbiAgICAgIHJldHVybiB6ZXJvRmlsbCh3aWR0aCwgbnVtYmVyLCBwYWQpXG4gICAgfVxuICB9XG4gIGlmIChwYWQgPT09IHVuZGVmaW5lZCkgcGFkID0gJzAnXG4gIHdpZHRoIC09IG51bWJlci50b1N0cmluZygpLmxlbmd0aFxuICBpZiAod2lkdGggPiAwKSByZXR1cm4gbmV3IEFycmF5KHdpZHRoICsgKC9cXC4vLnRlc3QobnVtYmVyKSA/IDIgOiAxKSkuam9pbihwYWQpICsgbnVtYmVyXG4gIHJldHVybiBudW1iZXIgKyAnJ1xufVxuIiwiaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgVUkgZnJvbSBcIi4vdWlcIlxuaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiXG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcblxuY2xhc3MgRXZlbnRzSGFuZGxlcnMge1xuICB2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIHN1YnM6IHN1YlRpdGxlVHlwZVtdO1xuICBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gIHRyYW5zbGF0ZU9yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB0cmFuc2xhdGVDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQsIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQgPSB2aWRlb0VsZW1lbnQ7XG4gICAgdGhpcy5zdWJzID0gc3VicztcbiAgICB0aGlzLnN1YnNFbGVtZW50ID0gc3Vic0VsZW1lbnQ7XG4gICAgdGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50ID0gc3Vic1Byb2dyZXNzQmFyRWxlbWVudDtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gdGhpcy5jcmVhdGVSZXNpemVPYnNlcnZlcigpXG4gICAgdGhpcy5rZXlib2FyZEhhbmRsZXIgPSB0aGlzLmtleWJvYXJkSGFuZGxlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzV29yZE1vdXNlT3ZlciA9IHRoaXMuc3Vic1dvcmRNb3VzZU92ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic1dvcmRNb3VzZU91dCA9IHRoaXMuc3Vic1dvcmRNb3VzZU91dC5iaW5kKHRoaXMpXG4gICAgdGhpcy52aWRlb09uVGltZVVwZGF0ZSA9IHRoaXMudmlkZW9PblRpbWVVcGRhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMuY3JlYXRlUmVzaXplT2JzZXJ2ZXIgPSB0aGlzLmNyZWF0ZVJlc2l6ZU9ic2VydmVyLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNNb3VzZUVudGVyID0gdGhpcy5zdWJzTW91c2VFbnRlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzTW91c2VMZWF2ZSA9IHRoaXMuc3Vic01vdXNlTGVhdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic0NsaWNrID0gdGhpcy5zdWJzQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtb3JpZ2luYWxcIilcbiAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVhc3lzdWJzLXRyYW5zbGF0ZS1yZXN1bHRcIilcbiAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVhc3lzdWJzLXRyYW5zbGF0ZS1jb250YWluZXJcIilcbiAgfVxuXG4gIGFkZEV2ZW50cygpIHtcbiAgICBbXCJrZXl1cFwiLCBcImtleWRvd25cIiwgXCJrZXlwcmVzc1wiXS5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5rZXlib2FyZEhhbmRsZXIsIHRydWUpO1xuICAgIH0pXG4gICAgdGhpcy5zdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLnN1YnNNb3VzZUVudGVyKTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuc3Vic01vdXNlTGVhdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdGhpcy5zdWJzV29yZE1vdXNlT3Zlcik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuc3Vic1dvcmRNb3VzZU91dCk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdGhpcy52aWRlb09uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCk7XG4gICAgdGhpcy5zdWJzRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5zdWJzQ2xpY2spO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRzKCkge1xuICAgIFtcImtleXVwXCIsIFwia2V5ZG93blwiLCBcImtleXByZXNzXCJdLmZvckVhY2goZXZlbnRUeXBlID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB0aGlzLmtleWJvYXJkSGFuZGxlciwgdHJ1ZSk7XG4gICAgfSlcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuc3Vic01vdXNlRW50ZXIpO1xuICAgIHRoaXMuc3Vic0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5zdWJzTW91c2VMZWF2ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCB0aGlzLnN1YnNXb3JkTW91c2VPdmVyKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy5zdWJzV29yZE1vdXNlT3V0KTtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCB0aGlzLnZpZGVvT25UaW1lVXBkYXRlKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQpO1xuICAgIHRoaXMuc3Vic0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuc3Vic0NsaWNrKTtcbiAgfVxuXG4gIHByaXZhdGUga2V5Ym9hcmRIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmNvZGUgPT0gXCJBcnJvd0xlZnRcIikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PSBcImtleWRvd25cIikgeyBWaWRlby5tb3ZlVG9QcmV2U3ViKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCkgfVxuICAgIH0gaWYgKGV2ZW50LmNvZGUgPT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgaWYgKGV2ZW50LnR5cGUgPT0gXCJrZXlkb3duXCIpIHsgVmlkZW8ubW92ZVRvTmV4dFN1Yih0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQpIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN1YnNNb3VzZUVudGVyKCkge1xuICAgIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlKClcbiAgfVxuXG4gIHByaXZhdGUgc3Vic01vdXNlTGVhdmUoKSB7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucGxheSgpXG4gIH1cblxuICBwcml2YXRlIHN1YnNXb3JkTW91c2VPdmVyKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGVsZW1lbnQgPSA8SFRNTFNwYW5FbGVtZW50PmV2ZW50LnRhcmdldDtcblxuICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ2Vhc3lzdWJzLXdvcmQnKSB7XG4gICAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzeXN1YnMtdHJhbnNsYXRlLWNvbnRhaW5lclwiKS5sZW5ndGggIT0gMCkgeyByZXR1cm47IH1cbiAgICAgIGNvbnN0IHdvcmQgPSBlbGVtZW50LnRleHRDb250ZW50Lm1hdGNoKC9bXlxcV1xcZF0oXFx3fFstJ117MSwyfSg/PVxcdykpKi8pWzBdXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNvbnRlbnRTY3JpcHRRdWVyeTogJ3RyYW5zbGF0ZScsIHRleHQ6IHdvcmQsIGxhbmc6IFwicnVcIiB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgVUkuc2V0VHJhbnNsYXRpb24oXG4gICAgICAgICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50LFxuICAgICAgICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50LFxuICAgICAgICAgIHRoaXMudHJhbnNsYXRlUmVzdWx0RWxlbWVudCxcbiAgICAgICAgICB3b3JkLFxuICAgICAgICAgIHJlc3BvbnNlLmRhdGFbMF1cbiAgICAgICAgKVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzV29yZE1vdXNlT3V0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIHByaXZhdGUgdmlkZW9PblRpbWVVcGRhdGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgU3Vicy51cGRhdGVTdWJzKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic0VsZW1lbnQpO1xuICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3Vicyk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlc2l6ZU9ic2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LCB0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic0NsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLnN1YnNFbGVtZW50LnRleHRDb250ZW50XG4gICAgY29uc3QgZWxlbWVudCA9IDxIVE1MU3BhbkVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuXG4gICAgaWYgKGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVhc3lzdWJzLXdvcmQtdHJhbnNsYXRlXCIpLmxlbmd0aCAhPSAwKSB7IHJldHVybjsgfVxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgY29udGVudFNjcmlwdFF1ZXJ5OiAndHJhbnNsYXRlJywgdGV4dDogdGV4dCwgbGFuZzogXCJydVwiIH0sIChyZXNwb25zZSkgPT4ge1xuICAgICAgVXRpbHMucmVtb3ZlQWxsRWxlbWVudHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy13b3JkLXRyYW5zbGF0ZVwiKSk7XG4gICAgICBVSS5zZXRUcmFuc2xhdGlvbihcbiAgICAgICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50LFxuICAgICAgICB0aGlzLnRyYW5zbGF0ZU9yaWdpbmFsRWxlbWVudCxcbiAgICAgICAgdGhpcy50cmFuc2xhdGVSZXN1bHRFbGVtZW50LFxuICAgICAgICB0ZXh0LFxuICAgICAgICByZXNwb25zZS5kYXRhWzBdXG4gICAgICApXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRzSGFuZGxlcnM7XG4iLCJpbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuL3JlYWR5XCJcbmltcG9ydCBVdGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBVSSBmcm9tIFwiLi91aVwiXG5pbXBvcnQgRXZlbnRzSGFuZGxlcnMgZnJvbSBcIi4vZXZlbnRzX2hhbmRsZXJzXCJcbmltcG9ydCBZb3VUdWJlIGZyb20gXCIuL3NlcnZpY2VzL3lvdXR1YmVcIjtcbmltcG9ydCBOZXRmbGl4IGZyb20gXCIuL3NlcnZpY2VzL25ldGZsaXhcIjtcbmltcG9ydCBPbnZpeCBmcm9tIFwiLi9zZXJ2aWNlcy9vbnZpeFwiO1xuaW1wb3J0IEtpbm9QdWIgZnJvbSBcIi4vc2VydmljZXMva2lub3B1YlwiO1xuXG5jaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7fSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIGNvbnN0IHNlcnZpY2UgPSBVdGlscy5kZXRlY3RTZXJ2aWNlKClcbiAgaWYgKHNlcnZpY2UgPT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gIGNvbnNvbGUubG9nKFwiRWFzeVN1YnMgaW5pdGlhbGl6ZWQuIFNlcnZpY2U6IFwiICsgc2VydmljZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHJlYWR5KCd2aWRlbycsIGZ1bmN0aW9uICh2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICBpbml0aWFsaXplKHNlcnZpY2UsIHZpZGVvRWxlbWVudClcbiAgICBsZXQgZXZlbnRzSGFuZGxlcjogRXZlbnRzSGFuZGxlcnMgPSBudWxsXG4gICAgbGV0IG9sZEhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICBpZiAob2xkSHJlZiAhPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmKSB7XG4gICAgICAgICAgZXZlbnRzSGFuZGxlci5yZW1vdmVFdmVudHMoKTtcbiAgICAgICAgICBpbml0aWFsaXplKHNlcnZpY2UsIHZpZGVvRWxlbWVudClcbiAgICAgICAgICBvbGRIcmVmID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGNvbmZpZyA9IHsgY2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKSwgY29uZmlnKTtcblxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoc2VydmljZTogWW91VHViZSB8IE5ldGZsaXggfCBPbnZpeCB8IEtpbm9QdWIsIHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgICAgY29uc3QgcGxheWVyQ29udGFpbmVyRWxlbWVudCA9IHNlcnZpY2UucGxheWVyQ29udGFpbmVyRWxlbWVudCgpXG5cbiAgICAgIGxldCBzdWJzRWxlbWVudCA9IFVJLmNyZWF0ZVN1YnNFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQpO1xuICAgICAgbGV0IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQgPSBVSS5jcmVhdGVTdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQpO1xuXG4gICAgICBzZXJ2aWNlLmdldFN1YnMoXCJlbmdcIilcbiAgICAgICAgLnRoZW4oc3VicyA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJTdWJ0aXRsZXMgbG9hZGVkLiBzdWJzIGNvdW50OiBcIiArIHN1YnMubGVuZ3RoKVxuXG4gICAgICAgICAgc3Vic0VsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiOyAvLyBDbGVhciBzdWJzIGxvYWRpbmcgdGV4dFxuICAgICAgICAgIGV2ZW50c0hhbmRsZXIgPSBuZXcgRXZlbnRzSGFuZGxlcnModmlkZW9FbGVtZW50LCBzdWJzLCBzdWJzRWxlbWVudCwgc3Vic1Byb2dyZXNzQmFyRWxlbWVudClcbiAgICAgICAgICBldmVudHNIYW5kbGVyLmFkZEV2ZW50cygpO1xuICAgICAgICB9KVxuICAgIH1cbiAgfSk7XG59KTtcbiIsImludGVyZmFjZSBMaXN0ZW5lciB7XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGZuOiBGdW5jdGlvbjtcbn1cblxuaW50ZXJmYWNlIEVsZW1lbnRPYmplY3Qge1xuICByZWFkeTogYm9vbGVhblxufVxubGV0IGxpc3RlbmVyczogTGlzdGVuZXJbXSA9IFtdXG5sZXQgb2JzZXJ2ZXJcblxuZnVuY3Rpb24gY2hlY2soKSB7XG4gIC8vIENoZWNrIHRoZSBET00gZm9yIGVsZW1lbnRzIG1hdGNoaW5nIGEgc3RvcmVkIHNlbGVjdG9yXG4gIGZvciAodmFyIGkgPSAwLCBsZW46IE51bWJlciA9IGxpc3RlbmVycy5sZW5ndGgsIGxpc3RlbmVyOiBMaXN0ZW5lciwgZWxlbWVudHM6IEVsZW1lbnRPYmplY3RbXTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgLy8gUXVlcnkgZm9yIGVsZW1lbnRzIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgc2VsZWN0b3JcbiAgICBlbGVtZW50cyA9IHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGxpc3RlbmVyLnNlbGVjdG9yKSBhcyB1bmtub3duIGFzIEVsZW1lbnRPYmplY3RbXTtcbiAgICBmb3IgKHZhciBqID0gMCwgakxlbiA9IGVsZW1lbnRzLmxlbmd0aCwgZWxlbWVudDsgaiA8IGpMZW47IGorKykge1xuICAgICAgZWxlbWVudCA9IGVsZW1lbnRzW2pdO1xuICAgICAgLy8gTWFrZSBzdXJlIHRoZSBjYWxsYmFjayBpc24ndCBpbnZva2VkIHdpdGggdGhlIFxuICAgICAgLy8gc2FtZSBlbGVtZW50IG1vcmUgdGhhbiBvbmNlXG4gICAgICBpZiAoIWVsZW1lbnQucmVhZHkpIHtcbiAgICAgICAgZWxlbWVudC5yZWFkeSA9IHRydWU7XG4gICAgICAgIC8vIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgZWxlbWVudFxuICAgICAgICBsaXN0ZW5lci5mbi5jYWxsKGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkoc2VsZWN0b3I6IHN0cmluZywgZm46IEZ1bmN0aW9uKSB7XG4gIC8vIFN0b3JlIHRoZSBzZWxlY3RvciBhbmQgY2FsbGJhY2sgdG8gYmUgbW9uaXRvcmVkXG4gIGxpc3RlbmVycy5wdXNoKHtcbiAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgZm46IGZuXG4gIH0pO1xuXG4gIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2hlY2spO1xuICBvYnNlcnZlci5vYnNlcnZlKHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZVxuICB9KTtcblxuICAvLyBDaGVjayBpZiB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgaW4gdGhlIERPTVxuICBjaGVjaygpO1xufVxuIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSAnc2VydmljZSdcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSwgcGFyc2UgfSBmcm9tICdzdWJ0aXRsZSdcbmNsYXNzIEtpbm9QdWIgaW1wbGVtZW50cyBTZXJ2aWNlIHtcbiAgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN1YlRpdGxlVHlwZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2UoXCJcIilcbiAgICB9KTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS2lub1B1YjtcbiIsImltcG9ydCBTZXJ2aWNlIGZyb20gJ3NlcnZpY2UnXG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUsIHBhcnNlIH0gZnJvbSAnc3VidGl0bGUnXG5jbGFzcyBOZXRmbGl4IGltcGxlbWVudHMgU2VydmljZSB7XG4gIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdWJUaXRsZVR5cGVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgcmV0dXJuIHBhcnNlKFwiXCIpXG4gICAgfSk7XG4gIH1cblxuICBwbGF5ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5ldGZsaXg7XG4iLCJpbXBvcnQgeyBwYXJzZSwgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4uL3VpXCJcblxuY2xhc3MgT252aXgge1xuICBhc3luYyBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpOiBQcm9taXNlPHN1YlRpdGxlVHlwZVtdPiB7XG4gICAgY29uc3QgdmlkZW9UeXBlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsxXVxuICAgIGNvbnN0IGJhc2VfcGF0aG5hbWUgPSBcIi9hcGkvdjEvc3RyZWFtaW5nL1wiXG4gICAgY29uc3QgdmlkZW9JZCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl1cbiAgICBjb25zdCBzdHJlYW0gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVswXS5zcGxpdChcIj1cIilbMV1cbiAgICBjb25zdCBzZWFzb24gPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVsxXVxuICAgIGNvbnN0IGVwaXNvZGUgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KFwiJlwiKVsyXVxuXG4gICAgbGV0IHVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHtiYXNlX3BhdGhuYW1lfSR7dmlkZW9UeXBlfXMvJHt2aWRlb0lkfS8ke3N0cmVhbX0uanNvbj9gXG4gICAgaWYgKHZpZGVvVHlwZSA9PSBcInNlcmlhbFwiKSB7IHVybCA9IGAke3VybH0ke3NlYXNvbn0mJHtlcGlzb2RlfWAgfVxuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3AuanNvbigpO1xuICAgIGNvbnN0IHN1YnNfdXJsID0gZGF0YS5tZWRpYV9maWxlcy52dHQuZmluZCgoZWw6IHsgc3JjbGFuZzogc3RyaW5nIH0pID0+IGVsLnNyY2xhbmcgPT09IGxhbmd1YWdlKS5zcmM7XG4gICAgY29uc3QgcmVzcF8xID0gYXdhaXQgZmV0Y2goc3Vic191cmwpO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwXzEudGV4dCgpO1xuICAgIHJldHVybiBwYXJzZSh0ZXh0KTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZwLXVpXCIpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT252aXg7XG4iLCJpbXBvcnQgU2VydmljZSBmcm9tICdzZXJ2aWNlJ1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlLCBwYXJzZSB9IGZyb20gJ3N1YnRpdGxlJ1xuaW1wb3J0IHsgYWxwaGEzVFRvQWxwaGEyIH0gZnJvbSBcIkBjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXNcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi4vdWlcIlxuXG5pbnRlcmZhY2UgU3VidGl0bGUge1xuICBiYXNlVXJsOiBzdHJpbmdcbiAgaXNUcmFuc2xhdGFibGU6IGJvb2xlYW5cbiAgbGFuZ3VhZ2VDb2RlOiBzdHJpbmdcbiAgbmFtZTogeyBzaW1wbGVUZXh0OiBzdHJpbmcgfVxuICB2c3NJZDogc3RyaW5nXG59XG5cbmNsYXNzIFlvdVR1YmUgaW1wbGVtZW50cyBTZXJ2aWNlIHtcbiAgYXN5bmMgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdmlkZW9JZCA9IHRoaXMuZ2V0VmlkZW9JZCgpXG4gICAgY29uc3QgbGFuZyA9IGFscGhhM1RUb0FscGhhMihsYW5ndWFnZSlcblxuICAgIGNvbnN0IHN1Ykl0ZW0gPSBhd2FpdCB0aGlzLmdldFZpZGVvSW5mbyh2aWRlb0lkLCBsYW5nKTtcbiAgICBjb25zdCBzdWJVcmk6IHN0cmluZyA9IHN1Ykl0ZW0uYmFzZVVybCArIFwiJmZtdD12dHRcIjtcblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChzdWJVcmkpO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwLnRleHQoKTtcbiAgICByZXR1cm4gcGFyc2UodGV4dCk7XG4gIH1cblxuICBwbGF5ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odG1sNS12aWRlby1wbGF5ZXJcIilcbiAgfVxuXG4gIGdldFZpZGVvSWQoKSB7XG4gICAgY29uc3QgcmVnRXhwcmVzc2lvbiA9IC9eLiooeW91dHVcXC5iZVxcL3x2XFwvfHVcXC9cXHdcXC98ZW1iZWRcXC98d2F0Y2hcXD92PXxcXCZ2PSkoW14jXFwmXFw/XSopLiovO1xuICAgIHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKHJlZ0V4cHJlc3Npb24pO1xuICAgIGlmIChtYXRjaCAmJiBtYXRjaFsyXS5sZW5ndGggPT0gMTEpIHtcbiAgICAgIHJldHVybiBtYXRjaFsyXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGdldCB5b3V0dWJlIHZpZGVvIGlkXCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0VmlkZW9JbmZvKHZpZGVvSWQ6IHN0cmluZywgbGFuZzogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL3lvdXR1YmUuY29tL2dldF92aWRlb19pbmZvP3ZpZGVvX2lkPSR7dmlkZW9JZH1gKTtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcC50ZXh0KCk7XG4gICAgY29uc3QgZGF0YSA9IGRlY29kZVVSSUNvbXBvbmVudCh0ZXh0KTtcblxuICAgIGlmICghZGF0YS5pbmNsdWRlcygnY2FwdGlvblRyYWNrcycpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBjYXB0aW9ucyBmb3IgdmlkZW86ICR7dmlkZW9JZH1gKTtcblxuICAgIGNvbnN0IHJlZ2V4ID0gLyh7XCJjYXB0aW9uVHJhY2tzXCI6Lippc1RyYW5zbGF0YWJsZVwiOih0cnVlfGZhbHNlKX1dKS87XG4gICAgY29uc3QgW21hdGNoXSA9IHJlZ2V4LmV4ZWMoZGF0YSk7XG4gICAgY29uc3QgeyBjYXB0aW9uVHJhY2tzIH0gPSBKU09OLnBhcnNlKGAke21hdGNofX1gKTtcblxuICAgIGNvbnN0IHN1YnRpdGxlOiBTdWJ0aXRsZSA9IGNhcHRpb25UcmFja3MuZmluZCgodHJhY2s6IGFueSkgPT4geyByZXR1cm4gdHJhY2sudnNzSWQgPT0gYC4ke2xhbmd9YDsgfSkgfHxcbiAgICAgIGNhcHRpb25UcmFja3MuZmluZCgodHJhY2s6IGFueSkgPT4geyByZXR1cm4gdHJhY2sudnNzSWQgPT0gYGEuJHtsYW5nfWA7IH0pIHx8XG4gICAgICBjYXB0aW9uVHJhY2tzLmZpbmQoKHRyYWNrOiBhbnkpID0+IHsgcmV0dXJuIHRyYWNrLnZzc0lkLm1hdGNoKGAuJHtsYW5nfWApOyB9KTtcblxuICAgIGlmICghc3VidGl0bGUgfHwgKHN1YnRpdGxlICYmICFzdWJ0aXRsZS5iYXNlVXJsKSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgJHtsYW5nfSBjYXB0aW9ucyBmb3IgJHt2aWRlb0lkfWApO1xuXG4gICAgcmV0dXJuIHN1YnRpdGxlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlvdVR1YmU7XG4iLCJpbXBvcnQgeyBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcbmltcG9ydCBWaWRlbyBmcm9tIFwiLi92aWRlb1wiO1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgYW5pbWUgZnJvbSBcImFuaW1lanNcIlxuXG5jb25zdCBzdWJzQW5pbWF0ZUR1cmF0aW9uOiBudW1iZXIgPSAzMDA7XG5jb25zdCBzdWJzQW5pbWF0ZUNvbXBlbnNhdGlvbkdhcDogbnVtYmVyID0gc3Vic0FuaW1hdGVEdXJhdGlvbiAvIDIgLy8gTW90aW9uIGFuaW1hdGlvbiBjb21wZW5zYXRpb25cblxuY2xhc3MgU3VicyB7XG4gIHN0YXRpYyB1cGRhdGVTdWJzKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gVmlkZW8uZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBjdXJyZW50U3ViID0gdGhpcy5nZXRDdXJyZW50U3ViKHN1YnMsIGN1cnJlbnRUaW1lKTtcbiAgICBpZiAoY3VycmVudFN1Yikge1xuICAgICAgc3Vic0VsZW1lbnQuaW5uZXJIVE1MID0gY3VycmVudFN1Yi50ZXh0LnJlcGxhY2UoXG4gICAgICAgIC8oXnw8XFwvP1tePl0rPnxcXHMrKShbXlxcczxdKykvZyxcbiAgICAgICAgJyQxPHNwYW4gY2xhc3M9XCJlYXN5c3Vicy13b3JkXCI+JDI8L3NwYW4+J1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3Vic0VsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0Q3VycmVudFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcikge1xuICAgIHJldHVybiBzdWJzLmZpbmQoKHN1Yjogc3ViVGl0bGVUeXBlKSA9PiBzdWIuc3RhcnQgPD0gY3VycmVudFRpbWUgJiYgc3ViLmVuZCA+PSBjdXJyZW50VGltZSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRQcmV2U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgLSAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKChzdWIsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChzdWJzW2luZGV4ICsgMV0gPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1Yi5lbmQgPD0gY3VycmVudFRpbWUgJiYgc3Vic1tpbmRleCArIDFdLnN0YXJ0ID49IGN1cnJlbnRUaW1lXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXROZXh0U3ViKHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBjdXJyZW50VGltZTogbnVtYmVyKTogc3ViVGl0bGVUeXBlIHtcbiAgICBsZXQgY3VycmVudFN1YiA9IFN1YnMuZ2V0Q3VycmVudFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgIGxldCBpbmRleEN1cnJlbnRTdWIgPSBzdWJzLmZpbmRJbmRleChzdWIgPT4gc3ViID09IGN1cnJlbnRTdWIpXG4gICAgICByZXR1cm4gc3Vic1tpbmRleEN1cnJlbnRTdWIgKyAxXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Vicy5maW5kKHN1YiA9PiBzdWIuc3RhcnQgPj0gY3VycmVudFRpbWUpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVN1YnNQcm9ncmVzc0JhcihzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCwgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBoYXJkTW92ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgdGltZVBlcmlvZCA9IDMwMDAwOyAvLyAzMCBzZWNvbmRzXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9IHN1YnNQcm9ncmVzc0JhckVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgY29uc3QgbXNJblB4ID0gKHByb2dyZXNzQmFyV2lkdGggLyB0aW1lUGVyaW9kKVxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gVmlkZW8uZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBjdXJyZW50VGltZSArIHRpbWVQZXJpb2QgLyAyO1xuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gY3VycmVudFRpbWUgLSB0aW1lUGVyaW9kIC8gMjtcblxuICAgIGNvbnN0IHN1YnNJbkR1cmF0aW9uID0gc3Vicy5maWx0ZXIoc3ViID0+XG4gICAgICAoc3ViLmVuZCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5lbmQgPCBsZWZ0Qm9yZGVyKSB8fFxuICAgICAgKHN1Yi5zdGFydCA+IHJpZ2h0Qm9yZGVyICYmIHN1Yi5zdGFydCA8IGxlZnRCb3JkZXIpXG4gICAgKTtcblxuICAgIGxldCBjdXJyZW50U3Vic0lkczogc3RyaW5nW10gPSBbXVxuICAgIGlmIChoYXJkTW92ZSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiKS5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKVxuICAgIH1cbiAgICBzdWJzSW5EdXJhdGlvbi5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICBjb25zdCBzdWJJZCA9IFwiaWRcIiArIHN1Yi5zdGFydCArIFwiLVwiICsgc3ViLmVuZFxuICAgICAgY3VycmVudFN1YnNJZHMucHVzaChzdWJJZClcbiAgICAgIGNvbnN0IGN1cnJlbnRTdWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJJZClcblxuICAgICAgaWYgKGN1cnJlbnRTdWIpIHtcbiAgICAgICAgYW5pbWUoe1xuICAgICAgICAgIHRhcmdldHM6IGN1cnJlbnRTdWIsXG4gICAgICAgICAgdHJhbnNsYXRlWDogbXNJblB4ICogKChVdGlscy5jYXN0U3ViVGltZShzdWIuc3RhcnQpIC0gcmlnaHRCb3JkZXIpIC0gc3Vic0FuaW1hdGVDb21wZW5zYXRpb25HYXApLFxuICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgZHVyYXRpb246IHN1YnNBbmltYXRlRHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdWJXaWR0aCA9IG1zSW5QeCAqIChVdGlscy5jYXN0U3ViVGltZShzdWIuZW5kKSAtIFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5zdGFydCkpXG4gICAgICAgIGxldCBzdWJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzdWJEaXYuY2xhc3NOYW1lID0gXCJlYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiXG4gICAgICAgIHN1YkRpdi5pZCA9IHN1YklkXG4gICAgICAgIHN1YkRpdi5zdHlsZS53aWR0aCA9IHN1YldpZHRoLnRvRml4ZWQoMCkgKyBcInB4XCJcbiAgICAgICAgc3ViRGl2LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyBtc0luUHggKiAoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLnN0YXJ0KSAtIHJpZ2h0Qm9yZGVyKSArICdweCknO1xuICAgICAgICBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LmFwcGVuZENoaWxkKHN1YkRpdilcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbW92ZU9sZFByb2dyZXNzQmFyRWxlbWVudHMoc3Vic0luRHVyYXRpb246IHN1YlRpdGxlVHlwZVtdKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhc3lzdWJzLXByb2dyZXNzLWJhci1lbGVtZW50XCIpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAoY3VycmVudFN1YnNJZHMuaW5jbHVkZXMoZWwuaWQpID09IGZhbHNlKSB7XG4gICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZU9sZFByb2dyZXNzQmFyRWxlbWVudHMoc3Vic0luRHVyYXRpb24pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdWJzO1xuIiwiY2xhc3MgVUkge1xuICBzdGF0aWMgY3JlYXRlU3Vic0VsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCBzdWJzQ29udGFpbmVyRWxlbWVudElkID0gXCJlYXN5c3Vic1wiO1xuICAgIGNvbnN0IHByZXZTdWJzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHN1YnNDb250YWluZXJFbGVtZW50SWQpXG4gICAgaWYgKHByZXZTdWJzQ29udGFpbmVyRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG4gICAgbGV0IHN1YnNDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzdWJzQ29udGFpbmVyRWxlbWVudC5pZCA9IHN1YnNDb250YWluZXJFbGVtZW50SWQ7XG5cbiAgICBsZXQgc3Vic0lubmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3Vic0lubmVyRWxlbWVudC5pZCA9IFwiZWFzeXN1YnMtc3VidGl0bGVzXCJcbiAgICBzdWJzQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChzdWJzSW5uZXJFbGVtZW50KTtcblxuICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJMb2FkaW5nIHN1YnRpdGxlcyAuLi5cIik7XG4gICAgc3Vic0lubmVyRWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG5cbiAgICBwbGF5ZXJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHN1YnNDb250YWluZXJFbGVtZW50KTtcbiAgICB0aGlzLmNyZWF0ZVN1YnNUcmFuc2xhdGVFbGVtZW50KHN1YnNDb250YWluZXJFbGVtZW50KVxuICAgIHJldHVybiBzdWJzSW5uZXJFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVN1YnNUcmFuc2xhdGVFbGVtZW50KHN1YnNFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCB0cmFuc2xhdGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRyYW5zbGF0ZVRhZy5jbGFzc05hbWUgPSBcImVhc3lzdWJzLXRyYW5zbGF0ZS1jb250YWluZXJcIjtcbiAgICB0cmFuc2xhdGVUYWcuaW5uZXJIVE1MID0gXCI8c3BhbiBjbGFzcz0nZWFzeXN1YnMtdHJhbnNsYXRlLW9yaWdpbmFsJz50ZXN0PC9zcGFuPjxocj48c3BhbiBjbGFzcz0nZWFzeXN1YnMtdHJhbnNsYXRlLXJlc3VsdCc+dGVzdCB0cmFuc2xhdGU8L3NwYW4+XCJcbiAgICBzdWJzRWxlbWVudC5hcHBlbmRDaGlsZCh0cmFuc2xhdGVUYWcpO1xuICB9XG5cbiAgc3RhdGljIHNldFRyYW5zbGF0aW9uKHRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcmlnaW5hbEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByZXN1bHRFbGVtZW50OiBIVE1MRWxlbWVudCwgb3JpZ2luYWxUZXh0OiBzdHJpbmcsIHJlc3VsdFRleHQ6IHN0cmluZykge1xuICAgIHRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBvcmlnaW5hbEVsZW1lbnQuaW5uZXJIVE1MID0gb3JpZ2luYWxUZXh0XG4gICAgcmVzdWx0RWxlbWVudC5pbm5lckhUTUwgPSByZXN1bHRUZXh0XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlU3Vic1Byb2dyZXNzQmFyRWxlbWVudChwbGF5ZXJDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBwcm9ncmVzc0JhckNsYXNzID0gXCJlYXN5c3Vicy1wcm9ncmVzcy1iYXJcIlxuICAgIGNvbnN0IHByZXZQcm9ncmVzc0JhckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgcHJvZ3Jlc3NCYXJDbGFzcylcbiAgICBpZiAocHJldlByb2dyZXNzQmFyRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICBwcmV2UHJvZ3Jlc3NCYXJFbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuXG4gICAgbGV0IHByb2dyZXNzQmFyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvZ3Jlc3NCYXJFbGVtZW50LmNsYXNzTmFtZSA9IHByb2dyZXNzQmFyQ2xhc3M7XG4gICAgcGxheWVyQ29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChwcm9ncmVzc0JhckVsZW1lbnQpXG4gICAgcmV0dXJuIHByb2dyZXNzQmFyRWxlbWVudFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVJO1xuIiwiaW1wb3J0IE9udml4IGZyb20gJy4vc2VydmljZXMvb252aXgnO1xuaW1wb3J0IEtpbm9QdWIgZnJvbSAnLi9zZXJ2aWNlcy9raW5vcHViJztcbmltcG9ydCBZb3VUdWJlIGZyb20gJy4vc2VydmljZXMveW91dHViZSc7XG5pbXBvcnQgTmV0ZmxpeCBmcm9tICcuL3NlcnZpY2VzL25ldGZsaXgnO1xuXG5jbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBjYXN0U3ViVGltZSh0aW1lOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRpbWUgPT0gXCJudW1iZXJcIiA/IHRpbWUgOiBwYXJzZUludCh0aW1lKVxuICB9XG5cbiAgc3RhdGljIGRldGVjdFNlcnZpY2UoKTogWW91VHViZSB8IE5ldGZsaXggfCBPbnZpeCB8IEtpbm9QdWIge1xuICAgIGNvbnN0IHRpdGxlQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpdGxlJykudGV4dENvbnRlbnRcbiAgICBpZiAodGl0bGVDb250ZW50LmluY2x1ZGVzKFwiWW91VHViZVwiKSB8fCB3aW5kb3cubG9jYXRpb24uaG9zdCA9PSBcInd3dy55b3V0dWJlLmNvbVwiKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuaWQgPSBcInlvdXR1YmVcIlxuICAgICAgcmV0dXJuIG5ldyBZb3VUdWJlXG4gICAgfVxuICAgIGVsc2UgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcIk5ldGZsaXhcIikgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QgPT0gXCJ3d3cubmV0ZmxpeC5jb21cIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJuZXRmbGl4XCJcbiAgICAgIHJldHVybiBuZXcgTmV0ZmxpeFxuICAgIH1cbiAgICBlbHNlIGlmICh0aXRsZUNvbnRlbnQuaW5jbHVkZXMoXCJPbnZpeFwiKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW2NvbnRlbnQ9XCJPTlZJWFwiXScpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuaWQgPSBcIm9udml4XCJcbiAgICAgIHJldHVybiBuZXcgT252aXhcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGVDb250ZW50LmluY2x1ZGVzKFwi0JrQuNC90L7Qv9Cw0LFcIikgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtjb250ZW50PVwi0JrQuNC90L7Qv9Cw0LFcIl0nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJraW5vcHViXCJcbiAgICAgIHJldHVybiBuZXcgS2lub1B1YlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlbW92ZUFsbEVsZW1lbnRzKGVsbXM6IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgICBlbG1zLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzXG4iLCJpbXBvcnQgU3VicyBmcm9tIFwiLi9zdWJzXCI7XG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBtb3ZlU3ViR2FwID0gNTAgLy8gRGVsYXkgdG8gZGlzcGxheSBzdWJ0aXRsZXMgYWZ0ZXIgcmV3aW5kaW5nXG5cbmNsYXNzIFZpZGVvIHtcbiAgc3RhdGljIGdldEN1cnJlbnRUaW1lKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQodmlkZW8uY3VycmVudFRpbWUgKiAxMDAwKVxuICB9XG5cbiAgc3RhdGljIG1vdmVUb1ByZXZTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBjdXJyZW50VGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBwcmV2U3ViOiBzdWJUaXRsZVR5cGUgPSBTdWJzLmdldFByZXZTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChwcmV2U3ViKSB7XG4gICAgICB0aGlzLm1vdmVUb1RpbWUodmlkZW8sIFV0aWxzLmNhc3RTdWJUaW1lKHByZXZTdWIuc3RhcnQpIC0gbW92ZVN1YkdhcClcbiAgICAgIFN1YnMudXBkYXRlU3Vic1Byb2dyZXNzQmFyKHN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHZpZGVvLCBzdWJzLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbW92ZVRvTmV4dFN1Yih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10sIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IG5leHRTdWI6IHN1YlRpdGxlVHlwZSA9IFN1YnMuZ2V0TmV4dFN1YihzdWJzLCBjdXJyZW50VGltZSk7XG4gICAgaWYgKG5leHRTdWIpIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUobmV4dFN1Yi5zdGFydCkgLSBtb3ZlU3ViR2FwKVxuICAgICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdmlkZW8sIHN1YnMsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBtb3ZlVG9UaW1lKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCB0aW1lOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IFV0aWxzLmNhc3RTdWJUaW1lKHRpbWUpIC8gMTAwMFxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBWaWRlbztcbiJdLCJzb3VyY2VSb290IjoiIn0=