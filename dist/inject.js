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
        this.subsContainer = document.querySelector("#easysubs");
    }
    addEvents() {
        const subsContainer = document.querySelector("#easysubs");
        ["keyup", "keydown", "keypress"].forEach(eventType => {
            document.addEventListener(eventType, this.keyboardHandler, true);
        });
        this.subsContainer.addEventListener("mouseenter", this.subsMouseEnter);
        this.subsContainer.addEventListener("mouseleave", this.subsMouseLeave);
        this.subsContainer.addEventListener("mouseover", this.subsWordMouseOver);
        this.videoElement.addEventListener("timeupdate", this.videoOnTimeUpdate);
        this.videoElement.addEventListener("pause", this.videoPause);
        this.resizeObserver.observe(this.subsProgressBarElement);
        this.subsElement.addEventListener("click", this.subsClick);
    }
    removeEvents() {
        ["keyup", "keydown", "keypress"].forEach(eventType => {
            document.removeEventListener(eventType, this.keyboardHandler, true);
        });
        this.subsContainer.removeEventListener("mouseenter", this.subsMouseEnter);
        this.subsContainer.removeEventListener("mouseleave", this.subsMouseLeave);
        this.subsContainer.removeEventListener("mouseover", this.subsWordMouseOver);
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
        window.showTranslation = false;
        this.translateContainerElement.style.display = "none";
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
        const ccLanguageAlpha2 = languageAlpha2 + SUB_TYPES['closedcaptions'];
        const langKey = Object.keys(this.subCache).find(key => key == languageAlpha2 || key == ccLanguageAlpha2);
        const subUri = this.subCache[langKey];
        return fetch(subUri)
            .then(resp => resp.text())
            .then(data => Object(subtitle__WEBPACK_IMPORTED_MODULE_0__["parse"])(data));
    }
    playerContainerElement() {
        return document.querySelector(".VideoContainer");
    }
    processSubData(event) {
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
        subsElement.prepend(translateTag);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bjb3NwaXJlZC9pMThuLWlzby1sYW5ndWFnZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuaW1lanMvbGliL2FuaW1lLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tM3U4LXBhcnNlci9kaXN0L20zdTgtcGFyc2VyLmVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdWJ0aXRsZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3BhcnNlVGltZXN0YW1wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3Jlc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3N0cmluZ2lmeVZ0dC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VidGl0bGUvbGliL3RvTVMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1NydFRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1YnRpdGxlL2xpYi90b1Z0dFRpbWUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVyby1maWxsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ldmVudHNfaGFuZGxlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luamVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2tpbm9wdWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL25ldGZsaXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL29udml4LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy95b3V0dWJlLnRzIiwid2VicGFjazovLy8uL3NyYy9zdWJzLnRzIiwid2VicGFjazovLy8uL3NyYy91aS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsNEVBQWM7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGNBQWM7QUFDZCxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0wsa0RBQWtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWM7O0FBRWQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLOzs7QUFHTDtBQUNBLG9DQUFvQzs7QUFFcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLGlDQUFpQztBQUN0RDtBQUNBO0FBQ0E7QUFDQSxPQUFPOzs7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxPQUFPO0FBQ1A7OztBQUdBLDBDQUEwQzs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNB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aUIsNkNBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRS9ELElBQUksT0FBTyxJQUFJLDhDQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLEdBQUcsSUFBSSxFQUFFO1lBQ3BFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLDhDQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsOENBQUssQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsNkNBQUksQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQXVCLEVBQUUsSUFBcUI7UUFFOUQsS0FBSyxDQUFDLFdBQVcsR0FBRyw4Q0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO0lBQ3BELENBQUM7Q0FDRjtBQUNjLG9FQUFLLEVBQUMiLCJmaWxlIjoiaW5qZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5qZWN0LnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb2RlcyA9IHJlcXVpcmUoXCIuL2NvZGVzLmpzb25cIik7XG52YXIgcmVnaXN0ZXJlZExvY2FsZXMgPSB7fTtcblxuLypcbiAqIEFsbCBjb2RlcyBtYXAgdG8gSVNPIDMxNjYtMSBhbHBoYS0yXG4gKi9cbnZhciBhbHBoYTIgPSB7fSxcbiAgYWxwaGEzVCA9IHt9LFxuICBhbHBoYTNCID0ge30sXG4gIGludmVydGVkQWxwaGEzQiA9IHt9O1xuXG5jb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVJbmZvcm1hdGlvbikge1xuICB2YXIgcyA9IGNvZGVJbmZvcm1hdGlvbjtcbiAgYWxwaGEyW3NbMF1dID0gc1sxXTtcbiAgYWxwaGEzVFtzWzFdXSA9IHNbMF07XG4gIGFscGhhM0Jbc1syXV0gPSBzWzBdO1xuICBpbnZlcnRlZEFscGhhM0Jbc1swXV0gPSBzWzJdO1xufSk7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTG9jYWxlKGxvY2FsZURhdGEpIHtcbiAgaWYgKCFsb2NhbGVEYXRhLmxvY2FsZSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ01pc3NpbmcgbG9jYWxlRGF0YS5sb2NhbGUnKTtcbiAgfVxuXG4gIGlmICghbG9jYWxlRGF0YS5sYW5ndWFnZXMpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNaXNzaW5nIGxvY2FsZURhdGEubGFuZ3VhZ2VzJyk7XG4gIH1cblxuICByZWdpc3RlcmVkTG9jYWxlc1tsb2NhbGVEYXRhLmxvY2FsZV0gPSBsb2NhbGVEYXRhLmxhbmd1YWdlcztcbn1cblxuZXhwb3J0cy5yZWdpc3RlckxvY2FsZSA9IHJlZ2lzdGVyTG9jYWxlO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgQWxwaGEtM1QgY29kZVxuICogQHJldHVybiBBbHBoYS0yIGNvZGUgb3IgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGFscGhhM1RUb0FscGhhMihjb2RlKSB7XG5cbiAgcmV0dXJuIGFscGhhM1RbY29kZV07XG59XG5leHBvcnRzLmFscGhhM1RUb0FscGhhMiA9IGFscGhhM1RUb0FscGhhMjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIEFscGhhLTNCIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtMiBjb2RlIG9yIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBhbHBoYTNCVG9BbHBoYTIoY29kZSkge1xuXG4gIHJldHVybiBhbHBoYTNCW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTNCVG9BbHBoYTIgPSBhbHBoYTNCVG9BbHBoYTI7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0yIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtM1QgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEyVG9BbHBoYTNUKGNvZGUpIHtcblxuICByZXR1cm4gYWxwaGEyW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTJUb0FscGhhM1QgPSBhbHBoYTJUb0FscGhhM1Q7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBBbHBoYS0yIGNvZGVcbiAqIEByZXR1cm4gQWxwaGEtM0IgY29kZSBvciB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gYWxwaGEyVG9BbHBoYTNCKGNvZGUpIHtcblxuICByZXR1cm4gaW52ZXJ0ZWRBbHBoYTNCW2NvZGVdO1xufVxuZXhwb3J0cy5hbHBoYTJUb0FscGhhM0IgPSBhbHBoYTJUb0FscGhhM0I7XG5cbi8qXG4gKiBAcGFyYW0gY29kZSBJU08gNjM5LTEgYWxwaGEtMiwgSVNPIDYzOS0yIGFscGhhLTMgVCBvciBCXG4gKiBAcmV0dXJuIElTTyA2MzktMiBhbHBoYS0zIFRcbiAqL1xuZnVuY3Rpb24gdG9BbHBoYTNUKGNvZGUpIHtcbiAgaWYgKHR5cGVvZiBjb2RlID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYoY29kZS5sZW5ndGggPT09IDIpIHtcblxuICAgICAgcmV0dXJuIGFscGhhMlRvQWxwaGEzVChjb2RlLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cbiAgICBpZiAoY29kZS5sZW5ndGggPT09IDMpIHtcblxuICAgICAgaWYoIGFscGhhM1RbY29kZS50b0xvd2VyQ2FzZSgpXSApIHtcblxuICAgICAgICByZXR1cm4gY29kZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgICAgaWYoIGFscGhhM0JUb0FscGhhMihjb2RlLnRvTG93ZXJDYXNlKCkpICkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM1QoYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEzVCA9IHRvQWxwaGEzVDtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgQlxuICovXG5mdW5jdGlvbiB0b0FscGhhM0IoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZihjb2RlLmxlbmd0aCA9PT0gMikge1xuXG4gICAgICByZXR1cm4gYWxwaGEyVG9BbHBoYTNCKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMykge1xuXG4gICAgICBpZiggYWxwaGEzQltjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICBpZiggYWxwaGEzVFtjb2RlLnRvTG93ZXJDYXNlKCldICkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTJUb0FscGhhM0IoYWxwaGEzVFRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLnRvQWxwaGEzQiA9IHRvQWxwaGEzQjtcblxuLypcbiAqIEBwYXJhbSBjb2RlIElTTyA2MzktMSBhbHBoYS0yLCBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIEJcbiAqIEByZXR1cm4gSVNPIDYzOS0xIGFscGhhLTJcbiAqL1xuZnVuY3Rpb24gdG9BbHBoYTIoY29kZSkge1xuICBpZiAodHlwZW9mIGNvZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoY29kZS5sZW5ndGggPT09IDIpIHtcblxuICAgICAgcmV0dXJuIGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gICAgaWYoY29kZS5sZW5ndGggPT09IDMpIHtcblxuICAgICAgaWYgKCBhbHBoYTNCW2NvZGUudG9Mb3dlckNhc2UoKV0pIHtcblxuICAgICAgICByZXR1cm4gYWxwaGEzQlRvQWxwaGEyKGNvZGUudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgICBpZiAoIGFscGhhM1RbY29kZS50b0xvd2VyQ2FzZSgpXSkge1xuXG4gICAgICAgIHJldHVybiBhbHBoYTNUVG9BbHBoYTIoY29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0cy50b0FscGhhMiA9IHRvQWxwaGEyO1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIElTTyA2MzktMiBhbHBoYS0zIFQgb3IgQlxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBuYW1lIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldE5hbWUgPSBmdW5jdGlvbihjb2RlLCBsYW5nKSB7XG4gIHRyeSB7XG4gICAgdmFyIGQgPSByZWdpc3RlcmVkTG9jYWxlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBkW3RvQWxwaGEyKGNvZGUpXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIGZvciBsYW5ndWFnZSBuYW1lc1xuICogQHJldHVybiBPYmplY3Qgb2YgbGFuZ3VhZ2UgY29kZSBtYXBwZWQgdG8gbGFuZ3VhZ2UgbmFtZVxuICovXG5leHBvcnRzLmdldE5hbWVzID0gZnVuY3Rpb24obGFuZykge1xuICB2YXIgZCA9IHJlZ2lzdGVyZWRMb2NhbGVzW2xhbmcudG9Mb3dlckNhc2UoKV07XG4gIGlmIChkID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIGQ7XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGxhbmd1YWdlIG5hbWVcbiAqIEByZXR1cm4gSVNPIDYzOS0xIGFscGhhLTIgb3IgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEyQ29kZSA9IGZ1bmN0aW9uKG5hbWUsIGxhbmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgcCwgY29kZW5hbWVzID0gcmVnaXN0ZXJlZExvY2FsZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcbiAgICBmb3IgKHAgaW4gY29kZW5hbWVzKSB7XG4gICAgICBpZiAoY29kZW5hbWVzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgIGlmIChjb2RlbmFtZXNbcF0udG9Mb3dlckNhc2UoKSA9PT0gbmFtZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEByZXR1cm4gT2JqZWN0IG9mIGFscGhhLTIgY29kZXMgbWFwcGVkIHRvIGFscGhhLTMgVCBjb2Rlc1xuICovXG5leHBvcnRzLmdldEFscGhhMkNvZGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBhbHBoYTI7XG59O1xuXG4vKlxuICogQHBhcmFtIG5hbWUgbmFtZVxuICogQHBhcmFtIGxhbmcgbGFuZ3VhZ2UgZm9yIGNvdW50cnkgbmFtZVxuICogQHJldHVybiBJU08gNjM5LTIgYWxwaGEtMyBUIG9yIHVuZGVmaW5lZFxuICovXG5leHBvcnRzLmdldEFscGhhM1RDb2RlID0gZnVuY3Rpb24obmFtZSwgbGFuZykge1xuICB2YXIgYWxwaGEyID0gdGhpcy5nZXRBbHBoYTJDb2RlKG5hbWUsIGxhbmcpO1xuICBpZiAoYWxwaGEyKSB7XG4gICAgcmV0dXJuIHRoaXMudG9BbHBoYTNUKGFscGhhMik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufTtcblxuLypcbiAqIEBwYXJhbSBuYW1lIG5hbWVcbiAqIEBwYXJhbSBsYW5nIGxhbmd1YWdlIGZvciBjb3VudHJ5IG5hbWVcbiAqIEByZXR1cm4gSVNPIDYzOS0yIGFscGhhLTMgQiBvciB1bmRlZmluZWRcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNCQ29kZSA9IGZ1bmN0aW9uKG5hbWUsIGxhbmcpIHtcbiAgdmFyIGFscGhhMiA9IHRoaXMuZ2V0QWxwaGEyQ29kZShuYW1lLCBsYW5nKTtcbiAgaWYgKGFscGhhMikge1xuICAgIHJldHVybiB0aGlzLnRvQWxwaGEzQihhbHBoYTIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn07XG5cbi8qXG4gKiBAcmV0dXJuIE9iamVjdCBvZiBhbHBoYS0zIFQgY29kZXMgbWFwcGVkIHRvIGFscGhhLTIgY29kZXNcbiAqL1xuZXhwb3J0cy5nZXRBbHBoYTNUQ29kZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGFscGhhM1Q7XG59O1xuXG4vKlxuICogQHJldHVybiBPYmplY3Qgb2YgYWxwaGEtMyBCIGNvZGVzIG1hcHBlZCB0byBhbHBoYS0yIGNvZGVzXG4gKi9cbmV4cG9ydHMuZ2V0QWxwaGEzQkNvZGVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBhbHBoYTNCO1xufTtcblxuLypcbiAqIEByZXR1cm4gQXJyYXkgb2Ygc3VwcG9ydGVkIGxhbmd1YWdlc1xuICovXG5leHBvcnRzLmxhbmdzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhyZWdpc3RlcmVkTG9jYWxlcyk7XG59O1xuXG4vKlxuICogQHBhcmFtIGNvZGUgSVNPIDYzOS0xIGFscGhhLTIsIDYzOS0yIGFscGhhLTMgVCBvciBCIGNvZGVcbiAqIEByZXR1cm4gQm9vbGVhblxuICovXG5leHBvcnRzLmlzVmFsaWQgPSBmdW5jdGlvbihjb2RlKSB7XG4gIHJldHVybiB0aGlzLnRvQWxwaGEzVChjb2RlKSAhPT0gdW5kZWZpbmVkO1xufTtcbiIsIi8qXG4gKiBhbmltZS5qcyB2My4xLjBcbiAqIChjKSAyMDE5IEp1bGlhbiBHYXJuaWVyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGFuaW1lanMuY29tXG4gKi9cblxuLy8gRGVmYXVsdHNcblxudmFyIGRlZmF1bHRJbnN0YW5jZVNldHRpbmdzID0ge1xuICB1cGRhdGU6IG51bGwsXG4gIGJlZ2luOiBudWxsLFxuICBsb29wQmVnaW46IG51bGwsXG4gIGNoYW5nZUJlZ2luOiBudWxsLFxuICBjaGFuZ2U6IG51bGwsXG4gIGNoYW5nZUNvbXBsZXRlOiBudWxsLFxuICBsb29wQ29tcGxldGU6IG51bGwsXG4gIGNvbXBsZXRlOiBudWxsLFxuICBsb29wOiAxLFxuICBkaXJlY3Rpb246ICdub3JtYWwnLFxuICBhdXRvcGxheTogdHJ1ZSxcbiAgdGltZWxpbmVPZmZzZXQ6IDBcbn07XG5cbnZhciBkZWZhdWx0VHdlZW5TZXR0aW5ncyA9IHtcbiAgZHVyYXRpb246IDEwMDAsXG4gIGRlbGF5OiAwLFxuICBlbmREZWxheTogMCxcbiAgZWFzaW5nOiAnZWFzZU91dEVsYXN0aWMoMSwgLjUpJyxcbiAgcm91bmQ6IDBcbn07XG5cbnZhciB2YWxpZFRyYW5zZm9ybXMgPSBbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICd0cmFuc2xhdGVaJywgJ3JvdGF0ZScsICdyb3RhdGVYJywgJ3JvdGF0ZVknLCAncm90YXRlWicsICdzY2FsZScsICdzY2FsZVgnLCAnc2NhbGVZJywgJ3NjYWxlWicsICdza2V3JywgJ3NrZXdYJywgJ3NrZXdZJywgJ3BlcnNwZWN0aXZlJ107XG5cbi8vIENhY2hpbmdcblxudmFyIGNhY2hlID0ge1xuICBDU1M6IHt9LFxuICBzcHJpbmdzOiB7fVxufTtcblxuLy8gVXRpbHNcblxuZnVuY3Rpb24gbWluTWF4KHZhbCwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbn1cblxuZnVuY3Rpb24gc3RyaW5nQ29udGFpbnMoc3RyLCB0ZXh0KSB7XG4gIHJldHVybiBzdHIuaW5kZXhPZih0ZXh0KSA+IC0xO1xufVxuXG5mdW5jdGlvbiBhcHBseUFyZ3VtZW50cyhmdW5jLCBhcmdzKSB7XG4gIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuXG52YXIgaXMgPSB7XG4gIGFycjogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYSk7IH0sXG4gIG9iajogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHN0cmluZ0NvbnRhaW5zKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSwgJ09iamVjdCcpOyB9LFxuICBwdGg6IGZ1bmN0aW9uIChhKSB7IHJldHVybiBpcy5vYmooYSkgJiYgYS5oYXNPd25Qcm9wZXJ0eSgndG90YWxMZW5ndGgnKTsgfSxcbiAgc3ZnOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYSBpbnN0YW5jZW9mIFNWR0VsZW1lbnQ7IH0sXG4gIGlucDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50OyB9LFxuICBkb206IGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLm5vZGVUeXBlIHx8IGlzLnN2ZyhhKTsgfSxcbiAgc3RyOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gdHlwZW9mIGEgPT09ICdzdHJpbmcnOyB9LFxuICBmbmM6IGZ1bmN0aW9uIChhKSB7IHJldHVybiB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJzsgfSxcbiAgdW5kOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gdHlwZW9mIGEgPT09ICd1bmRlZmluZWQnOyB9LFxuICBoZXg6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAvKF4jWzAtOUEtRl17Nn0kKXwoXiNbMC05QS1GXXszfSQpL2kudGVzdChhKTsgfSxcbiAgcmdiOiBmdW5jdGlvbiAoYSkgeyByZXR1cm4gL15yZ2IvLnRlc3QoYSk7IH0sXG4gIGhzbDogZnVuY3Rpb24gKGEpIHsgcmV0dXJuIC9eaHNsLy50ZXN0KGEpOyB9LFxuICBjb2w6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAoaXMuaGV4KGEpIHx8IGlzLnJnYihhKSB8fCBpcy5oc2woYSkpOyB9LFxuICBrZXk6IGZ1bmN0aW9uIChhKSB7IHJldHVybiAhZGVmYXVsdEluc3RhbmNlU2V0dGluZ3MuaGFzT3duUHJvcGVydHkoYSkgJiYgIWRlZmF1bHRUd2VlblNldHRpbmdzLmhhc093blByb3BlcnR5KGEpICYmIGEgIT09ICd0YXJnZXRzJyAmJiBhICE9PSAna2V5ZnJhbWVzJzsgfVxufTtcblxuLy8gRWFzaW5nc1xuXG5mdW5jdGlvbiBwYXJzZUVhc2luZ1BhcmFtZXRlcnMoc3RyaW5nKSB7XG4gIHZhciBtYXRjaCA9IC9cXCgoW14pXSspXFwpLy5leGVjKHN0cmluZyk7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiBwYXJzZUZsb2F0KHApOyB9KSA6IFtdO1xufVxuXG4vLyBTcHJpbmcgc29sdmVyIGluc3BpcmVkIGJ5IFdlYmtpdCBDb3B5cmlnaHQgwqkgMjAxNiBBcHBsZSBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIGh0dHBzOi8vd2Via2l0Lm9yZy9kZW1vcy9zcHJpbmcvc3ByaW5nLmpzXG5cbmZ1bmN0aW9uIHNwcmluZyhzdHJpbmcsIGR1cmF0aW9uKSB7XG5cbiAgdmFyIHBhcmFtcyA9IHBhcnNlRWFzaW5nUGFyYW1ldGVycyhzdHJpbmcpO1xuICB2YXIgbWFzcyA9IG1pbk1heChpcy51bmQocGFyYW1zWzBdKSA/IDEgOiBwYXJhbXNbMF0sIC4xLCAxMDApO1xuICB2YXIgc3RpZmZuZXNzID0gbWluTWF4KGlzLnVuZChwYXJhbXNbMV0pID8gMTAwIDogcGFyYW1zWzFdLCAuMSwgMTAwKTtcbiAgdmFyIGRhbXBpbmcgPSBtaW5NYXgoaXMudW5kKHBhcmFtc1syXSkgPyAxMCA6IHBhcmFtc1syXSwgLjEsIDEwMCk7XG4gIHZhciB2ZWxvY2l0eSA9ICBtaW5NYXgoaXMudW5kKHBhcmFtc1szXSkgPyAwIDogcGFyYW1zWzNdLCAuMSwgMTAwKTtcbiAgdmFyIHcwID0gTWF0aC5zcXJ0KHN0aWZmbmVzcyAvIG1hc3MpO1xuICB2YXIgemV0YSA9IGRhbXBpbmcgLyAoMiAqIE1hdGguc3FydChzdGlmZm5lc3MgKiBtYXNzKSk7XG4gIHZhciB3ZCA9IHpldGEgPCAxID8gdzAgKiBNYXRoLnNxcnQoMSAtIHpldGEgKiB6ZXRhKSA6IDA7XG4gIHZhciBhID0gMTtcbiAgdmFyIGIgPSB6ZXRhIDwgMSA/ICh6ZXRhICogdzAgKyAtdmVsb2NpdHkpIC8gd2QgOiAtdmVsb2NpdHkgKyB3MDtcblxuICBmdW5jdGlvbiBzb2x2ZXIodCkge1xuICAgIHZhciBwcm9ncmVzcyA9IGR1cmF0aW9uID8gKGR1cmF0aW9uICogdCkgLyAxMDAwIDogdDtcbiAgICBpZiAoemV0YSA8IDEpIHtcbiAgICAgIHByb2dyZXNzID0gTWF0aC5leHAoLXByb2dyZXNzICogemV0YSAqIHcwKSAqIChhICogTWF0aC5jb3Mod2QgKiBwcm9ncmVzcykgKyBiICogTWF0aC5zaW4od2QgKiBwcm9ncmVzcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9ncmVzcyA9IChhICsgYiAqIHByb2dyZXNzKSAqIE1hdGguZXhwKC1wcm9ncmVzcyAqIHcwKTtcbiAgICB9XG4gICAgaWYgKHQgPT09IDAgfHwgdCA9PT0gMSkgeyByZXR1cm4gdDsgfVxuICAgIHJldHVybiAxIC0gcHJvZ3Jlc3M7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREdXJhdGlvbigpIHtcbiAgICB2YXIgY2FjaGVkID0gY2FjaGUuc3ByaW5nc1tzdHJpbmddO1xuICAgIGlmIChjYWNoZWQpIHsgcmV0dXJuIGNhY2hlZDsgfVxuICAgIHZhciBmcmFtZSA9IDEvNjtcbiAgICB2YXIgZWxhcHNlZCA9IDA7XG4gICAgdmFyIHJlc3QgPSAwO1xuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgIGVsYXBzZWQgKz0gZnJhbWU7XG4gICAgICBpZiAoc29sdmVyKGVsYXBzZWQpID09PSAxKSB7XG4gICAgICAgIHJlc3QrKztcbiAgICAgICAgaWYgKHJlc3QgPj0gMTYpIHsgYnJlYWs7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3QgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZHVyYXRpb24gPSBlbGFwc2VkICogZnJhbWUgKiAxMDAwO1xuICAgIGNhY2hlLnNwcmluZ3Nbc3RyaW5nXSA9IGR1cmF0aW9uO1xuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIHJldHVybiBkdXJhdGlvbiA/IHNvbHZlciA6IGdldER1cmF0aW9uO1xuXG59XG5cbi8vIEJhc2ljIHN0ZXBzIGVhc2luZyBpbXBsZW1lbnRhdGlvbiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9DU1MvdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25cblxuZnVuY3Rpb24gc3RlcHMoc3RlcHMpIHtcbiAgaWYgKCBzdGVwcyA9PT0gdm9pZCAwICkgc3RlcHMgPSAxMDtcblxuICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIE1hdGgucm91bmQodCAqIHN0ZXBzKSAqICgxIC8gc3RlcHMpOyB9O1xufVxuXG4vLyBCZXppZXJFYXNpbmcgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nXG5cbnZhciBiZXppZXIgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBrU3BsaW5lVGFibGVTaXplID0gMTE7XG4gIHZhciBrU2FtcGxlU3RlcFNpemUgPSAxLjAgLyAoa1NwbGluZVRhYmxlU2l6ZSAtIDEuMCk7XG5cbiAgZnVuY3Rpb24gQShhQTEsIGFBMikgeyByZXR1cm4gMS4wIC0gMy4wICogYUEyICsgMy4wICogYUExIH1cbiAgZnVuY3Rpb24gQihhQTEsIGFBMikgeyByZXR1cm4gMy4wICogYUEyIC0gNi4wICogYUExIH1cbiAgZnVuY3Rpb24gQyhhQTEpICAgICAgeyByZXR1cm4gMy4wICogYUExIH1cblxuICBmdW5jdGlvbiBjYWxjQmV6aWVyKGFULCBhQTEsIGFBMikgeyByZXR1cm4gKChBKGFBMSwgYUEyKSAqIGFUICsgQihhQTEsIGFBMikpICogYVQgKyBDKGFBMSkpICogYVQgfVxuICBmdW5jdGlvbiBnZXRTbG9wZShhVCwgYUExLCBhQTIpIHsgcmV0dXJuIDMuMCAqIEEoYUExLCBhQTIpICogYVQgKiBhVCArIDIuMCAqIEIoYUExLCBhQTIpICogYVQgKyBDKGFBMSkgfVxuXG4gIGZ1bmN0aW9uIGJpbmFyeVN1YmRpdmlkZShhWCwgYUEsIGFCLCBtWDEsIG1YMikge1xuICAgIHZhciBjdXJyZW50WCwgY3VycmVudFQsIGkgPSAwO1xuICAgIGRvIHtcbiAgICAgIGN1cnJlbnRUID0gYUEgKyAoYUIgLSBhQSkgLyAyLjA7XG4gICAgICBjdXJyZW50WCA9IGNhbGNCZXppZXIoY3VycmVudFQsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgaWYgKGN1cnJlbnRYID4gMC4wKSB7IGFCID0gY3VycmVudFQ7IH0gZWxzZSB7IGFBID0gY3VycmVudFQ7IH1cbiAgICB9IHdoaWxlIChNYXRoLmFicyhjdXJyZW50WCkgPiAwLjAwMDAwMDEgJiYgKytpIDwgMTApO1xuICAgIHJldHVybiBjdXJyZW50VDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld3RvblJhcGhzb25JdGVyYXRlKGFYLCBhR3Vlc3NULCBtWDEsIG1YMikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICB2YXIgY3VycmVudFNsb3BlID0gZ2V0U2xvcGUoYUd1ZXNzVCwgbVgxLCBtWDIpO1xuICAgICAgaWYgKGN1cnJlbnRTbG9wZSA9PT0gMC4wKSB7IHJldHVybiBhR3Vlc3NUOyB9XG4gICAgICB2YXIgY3VycmVudFggPSBjYWxjQmV6aWVyKGFHdWVzc1QsIG1YMSwgbVgyKSAtIGFYO1xuICAgICAgYUd1ZXNzVCAtPSBjdXJyZW50WCAvIGN1cnJlbnRTbG9wZTtcbiAgICB9XG4gICAgcmV0dXJuIGFHdWVzc1Q7XG4gIH1cblxuICBmdW5jdGlvbiBiZXppZXIobVgxLCBtWTEsIG1YMiwgbVkyKSB7XG5cbiAgICBpZiAoISgwIDw9IG1YMSAmJiBtWDEgPD0gMSAmJiAwIDw9IG1YMiAmJiBtWDIgPD0gMSkpIHsgcmV0dXJuOyB9XG4gICAgdmFyIHNhbXBsZVZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoa1NwbGluZVRhYmxlU2l6ZSk7XG5cbiAgICBpZiAobVgxICE9PSBtWTEgfHwgbVgyICE9PSBtWTIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga1NwbGluZVRhYmxlU2l6ZTsgKytpKSB7XG4gICAgICAgIHNhbXBsZVZhbHVlc1tpXSA9IGNhbGNCZXppZXIoaSAqIGtTYW1wbGVTdGVwU2l6ZSwgbVgxLCBtWDIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRGb3JYKGFYKSB7XG5cbiAgICAgIHZhciBpbnRlcnZhbFN0YXJ0ID0gMDtcbiAgICAgIHZhciBjdXJyZW50U2FtcGxlID0gMTtcbiAgICAgIHZhciBsYXN0U2FtcGxlID0ga1NwbGluZVRhYmxlU2l6ZSAtIDE7XG5cbiAgICAgIGZvciAoOyBjdXJyZW50U2FtcGxlICE9PSBsYXN0U2FtcGxlICYmIHNhbXBsZVZhbHVlc1tjdXJyZW50U2FtcGxlXSA8PSBhWDsgKytjdXJyZW50U2FtcGxlKSB7XG4gICAgICAgIGludGVydmFsU3RhcnQgKz0ga1NhbXBsZVN0ZXBTaXplO1xuICAgICAgfVxuXG4gICAgICAtLWN1cnJlbnRTYW1wbGU7XG5cbiAgICAgIHZhciBkaXN0ID0gKGFYIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKSAvIChzYW1wbGVWYWx1ZXNbY3VycmVudFNhbXBsZSArIDFdIC0gc2FtcGxlVmFsdWVzW2N1cnJlbnRTYW1wbGVdKTtcbiAgICAgIHZhciBndWVzc0ZvclQgPSBpbnRlcnZhbFN0YXJ0ICsgZGlzdCAqIGtTYW1wbGVTdGVwU2l6ZTtcbiAgICAgIHZhciBpbml0aWFsU2xvcGUgPSBnZXRTbG9wZShndWVzc0ZvclQsIG1YMSwgbVgyKTtcblxuICAgICAgaWYgKGluaXRpYWxTbG9wZSA+PSAwLjAwMSkge1xuICAgICAgICByZXR1cm4gbmV3dG9uUmFwaHNvbkl0ZXJhdGUoYVgsIGd1ZXNzRm9yVCwgbVgxLCBtWDIpO1xuICAgICAgfSBlbHNlIGlmIChpbml0aWFsU2xvcGUgPT09IDAuMCkge1xuICAgICAgICByZXR1cm4gZ3Vlc3NGb3JUO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGJpbmFyeVN1YmRpdmlkZShhWCwgaW50ZXJ2YWxTdGFydCwgaW50ZXJ2YWxTdGFydCArIGtTYW1wbGVTdGVwU2l6ZSwgbVgxLCBtWDIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICBpZiAobVgxID09PSBtWTEgJiYgbVgyID09PSBtWTIpIHsgcmV0dXJuIHg7IH1cbiAgICAgIGlmICh4ID09PSAwIHx8IHggPT09IDEpIHsgcmV0dXJuIHg7IH1cbiAgICAgIHJldHVybiBjYWxjQmV6aWVyKGdldFRGb3JYKHgpLCBtWTEsIG1ZMik7XG4gICAgfVxuXG4gIH1cblxuICByZXR1cm4gYmV6aWVyO1xuXG59KSgpO1xuXG52YXIgcGVubmVyID0gKGZ1bmN0aW9uICgpIHtcblxuICAvLyBCYXNlZCBvbiBqUXVlcnkgVUkncyBpbXBsZW1lbmF0aW9uIG9mIGVhc2luZyBlcXVhdGlvbnMgZnJvbSBSb2JlcnQgUGVubmVyIChodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vZWFzaW5nKVxuXG4gIHZhciBlYXNlcyA9IHsgbGluZWFyOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gdDsgfTsgfSB9O1xuXG4gIHZhciBmdW5jdGlvbkVhc2luZ3MgPSB7XG4gICAgU2luZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIDEgLSBNYXRoLmNvcyh0ICogTWF0aC5QSSAvIDIpOyB9OyB9LFxuICAgIENpcmM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSB0ICogdCk7IH07IH0sXG4gICAgQmFjazogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQgKiB0ICogKDMgKiB0IC0gMik7IH07IH0sXG4gICAgQm91bmNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgdmFyIHBvdzIsIGIgPSA0O1xuICAgICAgd2hpbGUgKHQgPCAoKCBwb3cyID0gTWF0aC5wb3coMiwgLS1iKSkgLSAxKSAvIDExKSB7fVxuICAgICAgcmV0dXJuIDEgLyBNYXRoLnBvdyg0LCAzIC0gYikgLSA3LjU2MjUgKiBNYXRoLnBvdygoIHBvdzIgKiAzIC0gMiApIC8gMjIgLSB0LCAyKVxuICAgIH07IH0sXG4gICAgRWxhc3RpYzogZnVuY3Rpb24gKGFtcGxpdHVkZSwgcGVyaW9kKSB7XG4gICAgICBpZiAoIGFtcGxpdHVkZSA9PT0gdm9pZCAwICkgYW1wbGl0dWRlID0gMTtcbiAgICAgIGlmICggcGVyaW9kID09PSB2b2lkIDAgKSBwZXJpb2QgPSAuNTtcblxuICAgICAgdmFyIGEgPSBtaW5NYXgoYW1wbGl0dWRlLCAxLCAxMCk7XG4gICAgICB2YXIgcCA9IG1pbk1heChwZXJpb2QsIC4xLCAyKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKHQgPT09IDAgfHwgdCA9PT0gMSkgPyB0IDogXG4gICAgICAgICAgLWEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICogTWF0aC5zaW4oKCgodCAtIDEpIC0gKHAgLyAoTWF0aC5QSSAqIDIpICogTWF0aC5hc2luKDEgLyBhKSkpICogKE1hdGguUEkgKiAyKSkgLyBwKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGJhc2VFYXNpbmdzID0gWydRdWFkJywgJ0N1YmljJywgJ1F1YXJ0JywgJ1F1aW50JywgJ0V4cG8nXTtcblxuICBiYXNlRWFzaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpKSB7XG4gICAgZnVuY3Rpb25FYXNpbmdzW25hbWVdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIE1hdGgucG93KHQsIGkgKyAyKTsgfTsgfTtcbiAgfSk7XG5cbiAgT2JqZWN0LmtleXMoZnVuY3Rpb25FYXNpbmdzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGVhc2VJbiA9IGZ1bmN0aW9uRWFzaW5nc1tuYW1lXTtcbiAgICBlYXNlc1snZWFzZUluJyArIG5hbWVdID0gZWFzZUluO1xuICAgIGVhc2VzWydlYXNlT3V0JyArIG5hbWVdID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiAxIC0gZWFzZUluKGEsIGIpKDEgLSB0KTsgfTsgfTtcbiAgICBlYXNlc1snZWFzZUluT3V0JyArIG5hbWVdID0gZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiB0IDwgMC41ID8gZWFzZUluKGEsIGIpKHQgKiAyKSAvIDIgOiBcbiAgICAgIDEgLSBlYXNlSW4oYSwgYikodCAqIC0yICsgMikgLyAyOyB9OyB9O1xuICB9KTtcblxuICByZXR1cm4gZWFzZXM7XG5cbn0pKCk7XG5cbmZ1bmN0aW9uIHBhcnNlRWFzaW5ncyhlYXNpbmcsIGR1cmF0aW9uKSB7XG4gIGlmIChpcy5mbmMoZWFzaW5nKSkgeyByZXR1cm4gZWFzaW5nOyB9XG4gIHZhciBuYW1lID0gZWFzaW5nLnNwbGl0KCcoJylbMF07XG4gIHZhciBlYXNlID0gcGVubmVyW25hbWVdO1xuICB2YXIgYXJncyA9IHBhcnNlRWFzaW5nUGFyYW1ldGVycyhlYXNpbmcpO1xuICBzd2l0Y2ggKG5hbWUpIHtcbiAgICBjYXNlICdzcHJpbmcnIDogcmV0dXJuIHNwcmluZyhlYXNpbmcsIGR1cmF0aW9uKTtcbiAgICBjYXNlICdjdWJpY0JlemllcicgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoYmV6aWVyLCBhcmdzKTtcbiAgICBjYXNlICdzdGVwcycgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoc3RlcHMsIGFyZ3MpO1xuICAgIGRlZmF1bHQgOiByZXR1cm4gYXBwbHlBcmd1bWVudHMoZWFzZSwgYXJncyk7XG4gIH1cbn1cblxuLy8gU3RyaW5nc1xuXG5mdW5jdGlvbiBzZWxlY3RTdHJpbmcoc3RyKSB7XG4gIHRyeSB7XG4gICAgdmFyIG5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzdHIpO1xuICAgIHJldHVybiBub2RlcztcbiAgfSBjYXRjaChlKSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbi8vIEFycmF5c1xuXG5mdW5jdGlvbiBmaWx0ZXJBcnJheShhcnIsIGNhbGxiYWNrKSB7XG4gIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMiA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGkgaW4gYXJyKSB7XG4gICAgICB2YXIgdmFsID0gYXJyW2ldO1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsLCBpLCBhcnIpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5BcnJheShhcnIpIHtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuY29uY2F0KGlzLmFycihiKSA/IGZsYXR0ZW5BcnJheShiKSA6IGIpOyB9LCBbXSk7XG59XG5cbmZ1bmN0aW9uIHRvQXJyYXkobykge1xuICBpZiAoaXMuYXJyKG8pKSB7IHJldHVybiBvOyB9XG4gIGlmIChpcy5zdHIobykpIHsgbyA9IHNlbGVjdFN0cmluZyhvKSB8fCBvOyB9XG4gIGlmIChvIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgbyBpbnN0YW5jZW9mIEhUTUxDb2xsZWN0aW9uKSB7IHJldHVybiBbXS5zbGljZS5jYWxsKG8pOyB9XG4gIHJldHVybiBbb107XG59XG5cbmZ1bmN0aW9uIGFycmF5Q29udGFpbnMoYXJyLCB2YWwpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhID09PSB2YWw7IH0pO1xufVxuXG4vLyBPYmplY3RzXG5cbmZ1bmN0aW9uIGNsb25lT2JqZWN0KG8pIHtcbiAgdmFyIGNsb25lID0ge307XG4gIGZvciAodmFyIHAgaW4gbykgeyBjbG9uZVtwXSA9IG9bcF07IH1cbiAgcmV0dXJuIGNsb25lO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlT2JqZWN0UHJvcHMobzEsIG8yKSB7XG4gIHZhciBvID0gY2xvbmVPYmplY3QobzEpO1xuICBmb3IgKHZhciBwIGluIG8xKSB7IG9bcF0gPSBvMi5oYXNPd25Qcm9wZXJ0eShwKSA/IG8yW3BdIDogbzFbcF07IH1cbiAgcmV0dXJuIG87XG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0cyhvMSwgbzIpIHtcbiAgdmFyIG8gPSBjbG9uZU9iamVjdChvMSk7XG4gIGZvciAodmFyIHAgaW4gbzIpIHsgb1twXSA9IGlzLnVuZChvMVtwXSkgPyBvMltwXSA6IG8xW3BdOyB9XG4gIHJldHVybiBvO1xufVxuXG4vLyBDb2xvcnNcblxuZnVuY3Rpb24gcmdiVG9SZ2JhKHJnYlZhbHVlKSB7XG4gIHZhciByZ2IgPSAvcmdiXFwoKFxcZCssXFxzKltcXGRdKyxcXHMqW1xcZF0rKVxcKS9nLmV4ZWMocmdiVmFsdWUpO1xuICByZXR1cm4gcmdiID8gKFwicmdiYShcIiArIChyZ2JbMV0pICsgXCIsMSlcIikgOiByZ2JWYWx1ZTtcbn1cblxuZnVuY3Rpb24gaGV4VG9SZ2JhKGhleFZhbHVlKSB7XG4gIHZhciByZ3ggPSAvXiM/KFthLWZcXGRdKShbYS1mXFxkXSkoW2EtZlxcZF0pJC9pO1xuICB2YXIgaGV4ID0gaGV4VmFsdWUucmVwbGFjZShyZ3gsIGZ1bmN0aW9uIChtLCByLCBnLCBiKSB7IHJldHVybiByICsgciArIGcgKyBnICsgYiArIGI7IH0gKTtcbiAgdmFyIHJnYiA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICB2YXIgciA9IHBhcnNlSW50KHJnYlsxXSwgMTYpO1xuICB2YXIgZyA9IHBhcnNlSW50KHJnYlsyXSwgMTYpO1xuICB2YXIgYiA9IHBhcnNlSW50KHJnYlszXSwgMTYpO1xuICByZXR1cm4gKFwicmdiYShcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIiwxKVwiKTtcbn1cblxuZnVuY3Rpb24gaHNsVG9SZ2JhKGhzbFZhbHVlKSB7XG4gIHZhciBoc2wgPSAvaHNsXFwoKFxcZCspLFxccyooW1xcZC5dKyklLFxccyooW1xcZC5dKyklXFwpL2cuZXhlYyhoc2xWYWx1ZSkgfHwgL2hzbGFcXCgoXFxkKyksXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKSUsXFxzKihbXFxkLl0rKVxcKS9nLmV4ZWMoaHNsVmFsdWUpO1xuICB2YXIgaCA9IHBhcnNlSW50KGhzbFsxXSwgMTApIC8gMzYwO1xuICB2YXIgcyA9IHBhcnNlSW50KGhzbFsyXSwgMTApIC8gMTAwO1xuICB2YXIgbCA9IHBhcnNlSW50KGhzbFszXSwgMTApIC8gMTAwO1xuICB2YXIgYSA9IGhzbFs0XSB8fCAxO1xuICBmdW5jdGlvbiBodWUycmdiKHAsIHEsIHQpIHtcbiAgICBpZiAodCA8IDApIHsgdCArPSAxOyB9XG4gICAgaWYgKHQgPiAxKSB7IHQgLT0gMTsgfVxuICAgIGlmICh0IDwgMS82KSB7IHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0OyB9XG4gICAgaWYgKHQgPCAxLzIpIHsgcmV0dXJuIHE7IH1cbiAgICBpZiAodCA8IDIvMykgeyByZXR1cm4gcCArIChxIC0gcCkgKiAoMi8zIC0gdCkgKiA2OyB9XG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgdmFyIHIsIGcsIGI7XG4gIGlmIChzID09IDApIHtcbiAgICByID0gZyA9IGIgPSBsO1xuICB9IGVsc2Uge1xuICAgIHZhciBxID0gbCA8IDAuNSA/IGwgKiAoMSArIHMpIDogbCArIHMgLSBsICogcztcbiAgICB2YXIgcCA9IDIgKiBsIC0gcTtcbiAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMS8zKTtcbiAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMS8zKTtcbiAgfVxuICByZXR1cm4gKFwicmdiYShcIiArIChyICogMjU1KSArIFwiLFwiICsgKGcgKiAyNTUpICsgXCIsXCIgKyAoYiAqIDI1NSkgKyBcIixcIiArIGEgKyBcIilcIik7XG59XG5cbmZ1bmN0aW9uIGNvbG9yVG9SZ2IodmFsKSB7XG4gIGlmIChpcy5yZ2IodmFsKSkgeyByZXR1cm4gcmdiVG9SZ2JhKHZhbCk7IH1cbiAgaWYgKGlzLmhleCh2YWwpKSB7IHJldHVybiBoZXhUb1JnYmEodmFsKTsgfVxuICBpZiAoaXMuaHNsKHZhbCkpIHsgcmV0dXJuIGhzbFRvUmdiYSh2YWwpOyB9XG59XG5cbi8vIFVuaXRzXG5cbmZ1bmN0aW9uIGdldFVuaXQodmFsKSB7XG4gIHZhciBzcGxpdCA9IC9bKy1dP1xcZCpcXC4/XFxkKyg/OlxcLlxcZCspPyg/OltlRV1bKy1dP1xcZCspPyglfHB4fHB0fGVtfHJlbXxpbnxjbXxtbXxleHxjaHxwY3x2d3x2aHx2bWlufHZtYXh8ZGVnfHJhZHx0dXJuKT8kLy5leGVjKHZhbCk7XG4gIGlmIChzcGxpdCkgeyByZXR1cm4gc3BsaXRbMV07IH1cbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNmb3JtVW5pdChwcm9wTmFtZSkge1xuICBpZiAoc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICd0cmFuc2xhdGUnKSB8fCBwcm9wTmFtZSA9PT0gJ3BlcnNwZWN0aXZlJykgeyByZXR1cm4gJ3B4JzsgfVxuICBpZiAoc3RyaW5nQ29udGFpbnMocHJvcE5hbWUsICdyb3RhdGUnKSB8fCBzdHJpbmdDb250YWlucyhwcm9wTmFtZSwgJ3NrZXcnKSkgeyByZXR1cm4gJ2RlZyc7IH1cbn1cblxuLy8gVmFsdWVzXG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uVmFsdWUodmFsLCBhbmltYXRhYmxlKSB7XG4gIGlmICghaXMuZm5jKHZhbCkpIHsgcmV0dXJuIHZhbDsgfVxuICByZXR1cm4gdmFsKGFuaW1hdGFibGUudGFyZ2V0LCBhbmltYXRhYmxlLmlkLCBhbmltYXRhYmxlLnRvdGFsKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlKGVsLCBwcm9wKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUocHJvcCk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRQeFRvVW5pdChlbCwgdmFsdWUsIHVuaXQpIHtcbiAgdmFyIHZhbHVlVW5pdCA9IGdldFVuaXQodmFsdWUpO1xuICBpZiAoYXJyYXlDb250YWlucyhbdW5pdCwgJ2RlZycsICdyYWQnLCAndHVybiddLCB2YWx1ZVVuaXQpKSB7IHJldHVybiB2YWx1ZTsgfVxuICB2YXIgY2FjaGVkID0gY2FjaGUuQ1NTW3ZhbHVlICsgdW5pdF07XG4gIGlmICghaXMudW5kKGNhY2hlZCkpIHsgcmV0dXJuIGNhY2hlZDsgfVxuICB2YXIgYmFzZWxpbmUgPSAxMDA7XG4gIHZhciB0ZW1wRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsLnRhZ05hbWUpO1xuICB2YXIgcGFyZW50RWwgPSAoZWwucGFyZW50Tm9kZSAmJiAoZWwucGFyZW50Tm9kZSAhPT0gZG9jdW1lbnQpKSA/IGVsLnBhcmVudE5vZGUgOiBkb2N1bWVudC5ib2R5O1xuICBwYXJlbnRFbC5hcHBlbmRDaGlsZCh0ZW1wRWwpO1xuICB0ZW1wRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICB0ZW1wRWwuc3R5bGUud2lkdGggPSBiYXNlbGluZSArIHVuaXQ7XG4gIHZhciBmYWN0b3IgPSBiYXNlbGluZSAvIHRlbXBFbC5vZmZzZXRXaWR0aDtcbiAgcGFyZW50RWwucmVtb3ZlQ2hpbGQodGVtcEVsKTtcbiAgdmFyIGNvbnZlcnRlZFVuaXQgPSBmYWN0b3IgKiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgY2FjaGUuQ1NTW3ZhbHVlICsgdW5pdF0gPSBjb252ZXJ0ZWRVbml0O1xuICByZXR1cm4gY29udmVydGVkVW5pdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q1NTVmFsdWUoZWwsIHByb3AsIHVuaXQpIHtcbiAgaWYgKHByb3AgaW4gZWwuc3R5bGUpIHtcbiAgICB2YXIgdXBwZXJjYXNlUHJvcE5hbWUgPSBwcm9wLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHZhbHVlID0gZWwuc3R5bGVbcHJvcF0gfHwgZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZSh1cHBlcmNhc2VQcm9wTmFtZSkgfHwgJzAnO1xuICAgIHJldHVybiB1bml0ID8gY29udmVydFB4VG9Vbml0KGVsLCB2YWx1ZSwgdW5pdCkgOiB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbmltYXRpb25UeXBlKGVsLCBwcm9wKSB7XG4gIGlmIChpcy5kb20oZWwpICYmICFpcy5pbnAoZWwpICYmIChnZXRBdHRyaWJ1dGUoZWwsIHByb3ApIHx8IChpcy5zdmcoZWwpICYmIGVsW3Byb3BdKSkpIHsgcmV0dXJuICdhdHRyaWJ1dGUnOyB9XG4gIGlmIChpcy5kb20oZWwpICYmIGFycmF5Q29udGFpbnModmFsaWRUcmFuc2Zvcm1zLCBwcm9wKSkgeyByZXR1cm4gJ3RyYW5zZm9ybSc7IH1cbiAgaWYgKGlzLmRvbShlbCkgJiYgKHByb3AgIT09ICd0cmFuc2Zvcm0nICYmIGdldENTU1ZhbHVlKGVsLCBwcm9wKSkpIHsgcmV0dXJuICdjc3MnOyB9XG4gIGlmIChlbFtwcm9wXSAhPSBudWxsKSB7IHJldHVybiAnb2JqZWN0JzsgfVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50VHJhbnNmb3JtcyhlbCkge1xuICBpZiAoIWlzLmRvbShlbCkpIHsgcmV0dXJuOyB9XG4gIHZhciBzdHIgPSBlbC5zdHlsZS50cmFuc2Zvcm0gfHwgJyc7XG4gIHZhciByZWcgID0gLyhcXHcrKVxcKChbXildKilcXCkvZztcbiAgdmFyIHRyYW5zZm9ybXMgPSBuZXcgTWFwKCk7XG4gIHZhciBtOyB3aGlsZSAobSA9IHJlZy5leGVjKHN0cikpIHsgdHJhbnNmb3Jtcy5zZXQobVsxXSwgbVsyXSk7IH1cbiAgcmV0dXJuIHRyYW5zZm9ybXM7XG59XG5cbmZ1bmN0aW9uIGdldFRyYW5zZm9ybVZhbHVlKGVsLCBwcm9wTmFtZSwgYW5pbWF0YWJsZSwgdW5pdCkge1xuICB2YXIgZGVmYXVsdFZhbCA9IHN0cmluZ0NvbnRhaW5zKHByb3BOYW1lLCAnc2NhbGUnKSA/IDEgOiAwICsgZ2V0VHJhbnNmb3JtVW5pdChwcm9wTmFtZSk7XG4gIHZhciB2YWx1ZSA9IGdldEVsZW1lbnRUcmFuc2Zvcm1zKGVsKS5nZXQocHJvcE5hbWUpIHx8IGRlZmF1bHRWYWw7XG4gIGlmIChhbmltYXRhYmxlKSB7XG4gICAgYW5pbWF0YWJsZS50cmFuc2Zvcm1zLmxpc3Quc2V0KHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgYW5pbWF0YWJsZS50cmFuc2Zvcm1zWydsYXN0J10gPSBwcm9wTmFtZTtcbiAgfVxuICByZXR1cm4gdW5pdCA/IGNvbnZlcnRQeFRvVW5pdChlbCwgdmFsdWUsIHVuaXQpIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgdW5pdCwgYW5pbWF0YWJsZSkge1xuICBzd2l0Y2ggKGdldEFuaW1hdGlvblR5cGUodGFyZ2V0LCBwcm9wTmFtZSkpIHtcbiAgICBjYXNlICd0cmFuc2Zvcm0nOiByZXR1cm4gZ2V0VHJhbnNmb3JtVmFsdWUodGFyZ2V0LCBwcm9wTmFtZSwgYW5pbWF0YWJsZSwgdW5pdCk7XG4gICAgY2FzZSAnY3NzJzogcmV0dXJuIGdldENTU1ZhbHVlKHRhcmdldCwgcHJvcE5hbWUsIHVuaXQpO1xuICAgIGNhc2UgJ2F0dHJpYnV0ZSc6IHJldHVybiBnZXRBdHRyaWJ1dGUodGFyZ2V0LCBwcm9wTmFtZSk7XG4gICAgZGVmYXVsdDogcmV0dXJuIHRhcmdldFtwcm9wTmFtZV0gfHwgMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRSZWxhdGl2ZVZhbHVlKHRvLCBmcm9tKSB7XG4gIHZhciBvcGVyYXRvciA9IC9eKFxcKj18XFwrPXwtPSkvLmV4ZWModG8pO1xuICBpZiAoIW9wZXJhdG9yKSB7IHJldHVybiB0bzsgfVxuICB2YXIgdSA9IGdldFVuaXQodG8pIHx8IDA7XG4gIHZhciB4ID0gcGFyc2VGbG9hdChmcm9tKTtcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KHRvLnJlcGxhY2Uob3BlcmF0b3JbMF0sICcnKSk7XG4gIHN3aXRjaCAob3BlcmF0b3JbMF1bMF0pIHtcbiAgICBjYXNlICcrJzogcmV0dXJuIHggKyB5ICsgdTtcbiAgICBjYXNlICctJzogcmV0dXJuIHggLSB5ICsgdTtcbiAgICBjYXNlICcqJzogcmV0dXJuIHggKiB5ICsgdTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVZhbHVlKHZhbCwgdW5pdCkge1xuICBpZiAoaXMuY29sKHZhbCkpIHsgcmV0dXJuIGNvbG9yVG9SZ2IodmFsKTsgfVxuICBpZiAoL1xccy9nLnRlc3QodmFsKSkgeyByZXR1cm4gdmFsOyB9XG4gIHZhciBvcmlnaW5hbFVuaXQgPSBnZXRVbml0KHZhbCk7XG4gIHZhciB1bml0TGVzcyA9IG9yaWdpbmFsVW5pdCA/IHZhbC5zdWJzdHIoMCwgdmFsLmxlbmd0aCAtIG9yaWdpbmFsVW5pdC5sZW5ndGgpIDogdmFsO1xuICBpZiAodW5pdCkgeyByZXR1cm4gdW5pdExlc3MgKyB1bml0OyB9XG4gIHJldHVybiB1bml0TGVzcztcbn1cblxuLy8gZ2V0VG90YWxMZW5ndGgoKSBlcXVpdmFsZW50IGZvciBjaXJjbGUsIHJlY3QsIHBvbHlsaW5lLCBwb2x5Z29uIGFuZCBsaW5lIHNoYXBlc1xuLy8gYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL1NlYkxhbWJsYS8zZTA1NTBjNDk2YzIzNjcwOTc0NFxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhwMi54IC0gcDEueCwgMikgKyBNYXRoLnBvdyhwMi55IC0gcDEueSwgMikpO1xufVxuXG5mdW5jdGlvbiBnZXRDaXJjbGVMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIE1hdGguUEkgKiAyICogZ2V0QXR0cmlidXRlKGVsLCAncicpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWN0TGVuZ3RoKGVsKSB7XG4gIHJldHVybiAoZ2V0QXR0cmlidXRlKGVsLCAnd2lkdGgnKSAqIDIpICsgKGdldEF0dHJpYnV0ZShlbCwgJ2hlaWdodCcpICogMik7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVMZW5ndGgoZWwpIHtcbiAgcmV0dXJuIGdldERpc3RhbmNlKFxuICAgIHt4OiBnZXRBdHRyaWJ1dGUoZWwsICd4MScpLCB5OiBnZXRBdHRyaWJ1dGUoZWwsICd5MScpfSwgXG4gICAge3g6IGdldEF0dHJpYnV0ZShlbCwgJ3gyJyksIHk6IGdldEF0dHJpYnV0ZShlbCwgJ3kyJyl9XG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFBvbHlsaW5lTGVuZ3RoKGVsKSB7XG4gIHZhciBwb2ludHMgPSBlbC5wb2ludHM7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG4gIHZhciBwcmV2aW91c1BvcztcbiAgZm9yICh2YXIgaSA9IDAgOyBpIDwgcG9pbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgIHZhciBjdXJyZW50UG9zID0gcG9pbnRzLmdldEl0ZW0oaSk7XG4gICAgaWYgKGkgPiAwKSB7IHRvdGFsTGVuZ3RoICs9IGdldERpc3RhbmNlKHByZXZpb3VzUG9zLCBjdXJyZW50UG9zKTsgfVxuICAgIHByZXZpb3VzUG9zID0gY3VycmVudFBvcztcbiAgfVxuICByZXR1cm4gdG90YWxMZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGdldFBvbHlnb25MZW5ndGgoZWwpIHtcbiAgdmFyIHBvaW50cyA9IGVsLnBvaW50cztcbiAgcmV0dXJuIGdldFBvbHlsaW5lTGVuZ3RoKGVsKSArIGdldERpc3RhbmNlKHBvaW50cy5nZXRJdGVtKHBvaW50cy5udW1iZXJPZkl0ZW1zIC0gMSksIHBvaW50cy5nZXRJdGVtKDApKTtcbn1cblxuLy8gUGF0aCBhbmltYXRpb25cblxuZnVuY3Rpb24gZ2V0VG90YWxMZW5ndGgoZWwpIHtcbiAgaWYgKGVsLmdldFRvdGFsTGVuZ3RoKSB7IHJldHVybiBlbC5nZXRUb3RhbExlbmd0aCgpOyB9XG4gIHN3aXRjaChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdjaXJjbGUnOiByZXR1cm4gZ2V0Q2lyY2xlTGVuZ3RoKGVsKTtcbiAgICBjYXNlICdyZWN0JzogcmV0dXJuIGdldFJlY3RMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ2xpbmUnOiByZXR1cm4gZ2V0TGluZUxlbmd0aChlbCk7XG4gICAgY2FzZSAncG9seWxpbmUnOiByZXR1cm4gZ2V0UG9seWxpbmVMZW5ndGgoZWwpO1xuICAgIGNhc2UgJ3BvbHlnb24nOiByZXR1cm4gZ2V0UG9seWdvbkxlbmd0aChlbCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0RGFzaG9mZnNldChlbCkge1xuICB2YXIgcGF0aExlbmd0aCA9IGdldFRvdGFsTGVuZ3RoKGVsKTtcbiAgZWwuc2V0QXR0cmlidXRlKCdzdHJva2UtZGFzaGFycmF5JywgcGF0aExlbmd0aCk7XG4gIHJldHVybiBwYXRoTGVuZ3RoO1xufVxuXG4vLyBNb3Rpb24gcGF0aFxuXG5mdW5jdGlvbiBnZXRQYXJlbnRTdmdFbChlbCkge1xuICB2YXIgcGFyZW50RWwgPSBlbC5wYXJlbnROb2RlO1xuICB3aGlsZSAoaXMuc3ZnKHBhcmVudEVsKSkge1xuICAgIGlmICghaXMuc3ZnKHBhcmVudEVsLnBhcmVudE5vZGUpKSB7IGJyZWFrOyB9XG4gICAgcGFyZW50RWwgPSBwYXJlbnRFbC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBwYXJlbnRFbDtcbn1cblxuZnVuY3Rpb24gZ2V0UGFyZW50U3ZnKHBhdGhFbCwgc3ZnRGF0YSkge1xuICB2YXIgc3ZnID0gc3ZnRGF0YSB8fCB7fTtcbiAgdmFyIHBhcmVudFN2Z0VsID0gc3ZnLmVsIHx8IGdldFBhcmVudFN2Z0VsKHBhdGhFbCk7XG4gIHZhciByZWN0ID0gcGFyZW50U3ZnRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciB2aWV3Qm94QXR0ciA9IGdldEF0dHJpYnV0ZShwYXJlbnRTdmdFbCwgJ3ZpZXdCb3gnKTtcbiAgdmFyIHdpZHRoID0gcmVjdC53aWR0aDtcbiAgdmFyIGhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICB2YXIgdmlld0JveCA9IHN2Zy52aWV3Qm94IHx8ICh2aWV3Qm94QXR0ciA/IHZpZXdCb3hBdHRyLnNwbGl0KCcgJykgOiBbMCwgMCwgd2lkdGgsIGhlaWdodF0pO1xuICByZXR1cm4ge1xuICAgIGVsOiBwYXJlbnRTdmdFbCxcbiAgICB2aWV3Qm94OiB2aWV3Qm94LFxuICAgIHg6IHZpZXdCb3hbMF0gLyAxLFxuICAgIHk6IHZpZXdCb3hbMV0gLyAxLFxuICAgIHc6IHdpZHRoIC8gdmlld0JveFsyXSxcbiAgICBoOiBoZWlnaHQgLyB2aWV3Qm94WzNdXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UGF0aChwYXRoLCBwZXJjZW50KSB7XG4gIHZhciBwYXRoRWwgPSBpcy5zdHIocGF0aCkgPyBzZWxlY3RTdHJpbmcocGF0aClbMF0gOiBwYXRoO1xuICB2YXIgcCA9IHBlcmNlbnQgfHwgMTAwO1xuICByZXR1cm4gZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcGVydHk6IHByb3BlcnR5LFxuICAgICAgZWw6IHBhdGhFbCxcbiAgICAgIHN2ZzogZ2V0UGFyZW50U3ZnKHBhdGhFbCksXG4gICAgICB0b3RhbExlbmd0aDogZ2V0VG90YWxMZW5ndGgocGF0aEVsKSAqIChwIC8gMTAwKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoUHJvZ3Jlc3MocGF0aCwgcHJvZ3Jlc3MpIHtcbiAgZnVuY3Rpb24gcG9pbnQob2Zmc2V0KSB7XG4gICAgaWYgKCBvZmZzZXQgPT09IHZvaWQgMCApIG9mZnNldCA9IDA7XG5cbiAgICB2YXIgbCA9IHByb2dyZXNzICsgb2Zmc2V0ID49IDEgPyBwcm9ncmVzcyArIG9mZnNldCA6IDA7XG4gICAgcmV0dXJuIHBhdGguZWwuZ2V0UG9pbnRBdExlbmd0aChsKTtcbiAgfVxuICB2YXIgc3ZnID0gZ2V0UGFyZW50U3ZnKHBhdGguZWwsIHBhdGguc3ZnKTtcbiAgdmFyIHAgPSBwb2ludCgpO1xuICB2YXIgcDAgPSBwb2ludCgtMSk7XG4gIHZhciBwMSA9IHBvaW50KCsxKTtcbiAgc3dpdGNoIChwYXRoLnByb3BlcnR5KSB7XG4gICAgY2FzZSAneCc6IHJldHVybiAocC54IC0gc3ZnLngpICogc3ZnLnc7XG4gICAgY2FzZSAneSc6IHJldHVybiAocC55IC0gc3ZnLnkpICogc3ZnLmg7XG4gICAgY2FzZSAnYW5nbGUnOiByZXR1cm4gTWF0aC5hdGFuMihwMS55IC0gcDAueSwgcDEueCAtIHAwLngpICogMTgwIC8gTWF0aC5QSTtcbiAgfVxufVxuXG4vLyBEZWNvbXBvc2UgdmFsdWVcblxuZnVuY3Rpb24gZGVjb21wb3NlVmFsdWUodmFsLCB1bml0KSB7XG4gIC8vIGNvbnN0IHJneCA9IC8tP1xcZCpcXC4/XFxkKy9nOyAvLyBoYW5kbGVzIGJhc2ljIG51bWJlcnNcbiAgLy8gY29uc3Qgcmd4ID0gL1srLV0/XFxkKyg/OlxcLlxcZCspPyg/OltlRV1bKy1dP1xcZCspPy9nOyAvLyBoYW5kbGVzIGV4cG9uZW50cyBub3RhdGlvblxuICB2YXIgcmd4ID0gL1srLV0/XFxkKlxcLj9cXGQrKD86XFwuXFxkKyk/KD86W2VFXVsrLV0/XFxkKyk/L2c7IC8vIGhhbmRsZXMgZXhwb25lbnRzIG5vdGF0aW9uXG4gIHZhciB2YWx1ZSA9IHZhbGlkYXRlVmFsdWUoKGlzLnB0aCh2YWwpID8gdmFsLnRvdGFsTGVuZ3RoIDogdmFsKSwgdW5pdCkgKyAnJztcbiAgcmV0dXJuIHtcbiAgICBvcmlnaW5hbDogdmFsdWUsXG4gICAgbnVtYmVyczogdmFsdWUubWF0Y2gocmd4KSA/IHZhbHVlLm1hdGNoKHJneCkubWFwKE51bWJlcikgOiBbMF0sXG4gICAgc3RyaW5nczogKGlzLnN0cih2YWwpIHx8IHVuaXQpID8gdmFsdWUuc3BsaXQocmd4KSA6IFtdXG4gIH1cbn1cblxuLy8gQW5pbWF0YWJsZXNcblxuZnVuY3Rpb24gcGFyc2VUYXJnZXRzKHRhcmdldHMpIHtcbiAgdmFyIHRhcmdldHNBcnJheSA9IHRhcmdldHMgPyAoZmxhdHRlbkFycmF5KGlzLmFycih0YXJnZXRzKSA/IHRhcmdldHMubWFwKHRvQXJyYXkpIDogdG9BcnJheSh0YXJnZXRzKSkpIDogW107XG4gIHJldHVybiBmaWx0ZXJBcnJheSh0YXJnZXRzQXJyYXksIGZ1bmN0aW9uIChpdGVtLCBwb3MsIHNlbGYpIHsgcmV0dXJuIHNlbGYuaW5kZXhPZihpdGVtKSA9PT0gcG9zOyB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QW5pbWF0YWJsZXModGFyZ2V0cykge1xuICB2YXIgcGFyc2VkID0gcGFyc2VUYXJnZXRzKHRhcmdldHMpO1xuICByZXR1cm4gcGFyc2VkLm1hcChmdW5jdGlvbiAodCwgaSkge1xuICAgIHJldHVybiB7dGFyZ2V0OiB0LCBpZDogaSwgdG90YWw6IHBhcnNlZC5sZW5ndGgsIHRyYW5zZm9ybXM6IHsgbGlzdDogZ2V0RWxlbWVudFRyYW5zZm9ybXModCkgfSB9O1xuICB9KTtcbn1cblxuLy8gUHJvcGVydGllc1xuXG5mdW5jdGlvbiBub3JtYWxpemVQcm9wZXJ0eVR3ZWVucyhwcm9wLCB0d2VlblNldHRpbmdzKSB7XG4gIHZhciBzZXR0aW5ncyA9IGNsb25lT2JqZWN0KHR3ZWVuU2V0dGluZ3MpO1xuICAvLyBPdmVycmlkZSBkdXJhdGlvbiBpZiBlYXNpbmcgaXMgYSBzcHJpbmdcbiAgaWYgKC9ec3ByaW5nLy50ZXN0KHNldHRpbmdzLmVhc2luZykpIHsgc2V0dGluZ3MuZHVyYXRpb24gPSBzcHJpbmcoc2V0dGluZ3MuZWFzaW5nKTsgfVxuICBpZiAoaXMuYXJyKHByb3ApKSB7XG4gICAgdmFyIGwgPSBwcm9wLmxlbmd0aDtcbiAgICB2YXIgaXNGcm9tVG8gPSAobCA9PT0gMiAmJiAhaXMub2JqKHByb3BbMF0pKTtcbiAgICBpZiAoIWlzRnJvbVRvKSB7XG4gICAgICAvLyBEdXJhdGlvbiBkaXZpZGVkIGJ5IHRoZSBudW1iZXIgb2YgdHdlZW5zXG4gICAgICBpZiAoIWlzLmZuYyh0d2VlblNldHRpbmdzLmR1cmF0aW9uKSkgeyBzZXR0aW5ncy5kdXJhdGlvbiA9IHR3ZWVuU2V0dGluZ3MuZHVyYXRpb24gLyBsOyB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyYW5zZm9ybSBbZnJvbSwgdG9dIHZhbHVlcyBzaG9ydGhhbmQgdG8gYSB2YWxpZCB0d2VlbiB2YWx1ZVxuICAgICAgcHJvcCA9IHt2YWx1ZTogcHJvcH07XG4gICAgfVxuICB9XG4gIHZhciBwcm9wQXJyYXkgPSBpcy5hcnIocHJvcCkgPyBwcm9wIDogW3Byb3BdO1xuICByZXR1cm4gcHJvcEFycmF5Lm1hcChmdW5jdGlvbiAodiwgaSkge1xuICAgIHZhciBvYmogPSAoaXMub2JqKHYpICYmICFpcy5wdGgodikpID8gdiA6IHt2YWx1ZTogdn07XG4gICAgLy8gRGVmYXVsdCBkZWxheSB2YWx1ZSBzaG91bGQgb25seSBiZSBhcHBsaWVkIHRvIHRoZSBmaXJzdCB0d2VlblxuICAgIGlmIChpcy51bmQob2JqLmRlbGF5KSkgeyBvYmouZGVsYXkgPSAhaSA/IHR3ZWVuU2V0dGluZ3MuZGVsYXkgOiAwOyB9XG4gICAgLy8gRGVmYXVsdCBlbmREZWxheSB2YWx1ZSBzaG91bGQgb25seSBiZSBhcHBsaWVkIHRvIHRoZSBsYXN0IHR3ZWVuXG4gICAgaWYgKGlzLnVuZChvYmouZW5kRGVsYXkpKSB7IG9iai5lbmREZWxheSA9IGkgPT09IHByb3BBcnJheS5sZW5ndGggLSAxID8gdHdlZW5TZXR0aW5ncy5lbmREZWxheSA6IDA7IH1cbiAgICByZXR1cm4gb2JqO1xuICB9KS5tYXAoZnVuY3Rpb24gKGspIHsgcmV0dXJuIG1lcmdlT2JqZWN0cyhrLCBzZXR0aW5ncyk7IH0pO1xufVxuXG5cbmZ1bmN0aW9uIGZsYXR0ZW5LZXlmcmFtZXMoa2V5ZnJhbWVzKSB7XG4gIHZhciBwcm9wZXJ0eU5hbWVzID0gZmlsdGVyQXJyYXkoZmxhdHRlbkFycmF5KGtleWZyYW1lcy5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gT2JqZWN0LmtleXMoa2V5KTsgfSkpLCBmdW5jdGlvbiAocCkgeyByZXR1cm4gaXMua2V5KHApOyB9KVxuICAucmVkdWNlKGZ1bmN0aW9uIChhLGIpIHsgaWYgKGEuaW5kZXhPZihiKSA8IDApIHsgYS5wdXNoKGIpOyB9IHJldHVybiBhOyB9LCBbXSk7XG4gIHZhciBwcm9wZXJ0aWVzID0ge307XG4gIHZhciBsb29wID0gZnVuY3Rpb24gKCBpICkge1xuICAgIHZhciBwcm9wTmFtZSA9IHByb3BlcnR5TmFtZXNbaV07XG4gICAgcHJvcGVydGllc1twcm9wTmFtZV0gPSBrZXlmcmFtZXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHZhciBuZXdLZXkgPSB7fTtcbiAgICAgIGZvciAodmFyIHAgaW4ga2V5KSB7XG4gICAgICAgIGlmIChpcy5rZXkocCkpIHtcbiAgICAgICAgICBpZiAocCA9PSBwcm9wTmFtZSkgeyBuZXdLZXkudmFsdWUgPSBrZXlbcF07IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdLZXlbcF0gPSBrZXlbcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdLZXk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0eU5hbWVzLmxlbmd0aDsgaSsrKSBsb29wKCBpICk7XG4gIHJldHVybiBwcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKHR3ZWVuU2V0dGluZ3MsIHBhcmFtcykge1xuICB2YXIgcHJvcGVydGllcyA9IFtdO1xuICB2YXIga2V5ZnJhbWVzID0gcGFyYW1zLmtleWZyYW1lcztcbiAgaWYgKGtleWZyYW1lcykgeyBwYXJhbXMgPSBtZXJnZU9iamVjdHMoZmxhdHRlbktleWZyYW1lcyhrZXlmcmFtZXMpLCBwYXJhbXMpOyB9XG4gIGZvciAodmFyIHAgaW4gcGFyYW1zKSB7XG4gICAgaWYgKGlzLmtleShwKSkge1xuICAgICAgcHJvcGVydGllcy5wdXNoKHtcbiAgICAgICAgbmFtZTogcCxcbiAgICAgICAgdHdlZW5zOiBub3JtYWxpemVQcm9wZXJ0eVR3ZWVucyhwYXJhbXNbcF0sIHR3ZWVuU2V0dGluZ3MpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHByb3BlcnRpZXM7XG59XG5cbi8vIFR3ZWVuc1xuXG5mdW5jdGlvbiBub3JtYWxpemVUd2VlblZhbHVlcyh0d2VlbiwgYW5pbWF0YWJsZSkge1xuICB2YXIgdCA9IHt9O1xuICBmb3IgKHZhciBwIGluIHR3ZWVuKSB7XG4gICAgdmFyIHZhbHVlID0gZ2V0RnVuY3Rpb25WYWx1ZSh0d2VlbltwXSwgYW5pbWF0YWJsZSk7XG4gICAgaWYgKGlzLmFycih2YWx1ZSkpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBnZXRGdW5jdGlvblZhbHVlKHYsIGFuaW1hdGFibGUpOyB9KTtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHsgdmFsdWUgPSB2YWx1ZVswXTsgfVxuICAgIH1cbiAgICB0W3BdID0gdmFsdWU7XG4gIH1cbiAgdC5kdXJhdGlvbiA9IHBhcnNlRmxvYXQodC5kdXJhdGlvbik7XG4gIHQuZGVsYXkgPSBwYXJzZUZsb2F0KHQuZGVsYXkpO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplVHdlZW5zKHByb3AsIGFuaW1hdGFibGUpIHtcbiAgdmFyIHByZXZpb3VzVHdlZW47XG4gIHJldHVybiBwcm9wLnR3ZWVucy5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICB2YXIgdHdlZW4gPSBub3JtYWxpemVUd2VlblZhbHVlcyh0LCBhbmltYXRhYmxlKTtcbiAgICB2YXIgdHdlZW5WYWx1ZSA9IHR3ZWVuLnZhbHVlO1xuICAgIHZhciB0byA9IGlzLmFycih0d2VlblZhbHVlKSA/IHR3ZWVuVmFsdWVbMV0gOiB0d2VlblZhbHVlO1xuICAgIHZhciB0b1VuaXQgPSBnZXRVbml0KHRvKTtcbiAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUoYW5pbWF0YWJsZS50YXJnZXQsIHByb3AubmFtZSwgdG9Vbml0LCBhbmltYXRhYmxlKTtcbiAgICB2YXIgcHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVHdlZW4gPyBwcmV2aW91c1R3ZWVuLnRvLm9yaWdpbmFsIDogb3JpZ2luYWxWYWx1ZTtcbiAgICB2YXIgZnJvbSA9IGlzLmFycih0d2VlblZhbHVlKSA/IHR3ZWVuVmFsdWVbMF0gOiBwcmV2aW91c1ZhbHVlO1xuICAgIHZhciBmcm9tVW5pdCA9IGdldFVuaXQoZnJvbSkgfHwgZ2V0VW5pdChvcmlnaW5hbFZhbHVlKTtcbiAgICB2YXIgdW5pdCA9IHRvVW5pdCB8fCBmcm9tVW5pdDtcbiAgICBpZiAoaXMudW5kKHRvKSkgeyB0byA9IHByZXZpb3VzVmFsdWU7IH1cbiAgICB0d2Vlbi5mcm9tID0gZGVjb21wb3NlVmFsdWUoZnJvbSwgdW5pdCk7XG4gICAgdHdlZW4udG8gPSBkZWNvbXBvc2VWYWx1ZShnZXRSZWxhdGl2ZVZhbHVlKHRvLCBmcm9tKSwgdW5pdCk7XG4gICAgdHdlZW4uc3RhcnQgPSBwcmV2aW91c1R3ZWVuID8gcHJldmlvdXNUd2Vlbi5lbmQgOiAwO1xuICAgIHR3ZWVuLmVuZCA9IHR3ZWVuLnN0YXJ0ICsgdHdlZW4uZGVsYXkgKyB0d2Vlbi5kdXJhdGlvbiArIHR3ZWVuLmVuZERlbGF5O1xuICAgIHR3ZWVuLmVhc2luZyA9IHBhcnNlRWFzaW5ncyh0d2Vlbi5lYXNpbmcsIHR3ZWVuLmR1cmF0aW9uKTtcbiAgICB0d2Vlbi5pc1BhdGggPSBpcy5wdGgodHdlZW5WYWx1ZSk7XG4gICAgdHdlZW4uaXNDb2xvciA9IGlzLmNvbCh0d2Vlbi5mcm9tLm9yaWdpbmFsKTtcbiAgICBpZiAodHdlZW4uaXNDb2xvcikgeyB0d2Vlbi5yb3VuZCA9IDE7IH1cbiAgICBwcmV2aW91c1R3ZWVuID0gdHdlZW47XG4gICAgcmV0dXJuIHR3ZWVuO1xuICB9KTtcbn1cblxuLy8gVHdlZW4gcHJvZ3Jlc3NcblxudmFyIHNldFByb2dyZXNzVmFsdWUgPSB7XG4gIGNzczogZnVuY3Rpb24gKHQsIHAsIHYpIHsgcmV0dXJuIHQuc3R5bGVbcF0gPSB2OyB9LFxuICBhdHRyaWJ1dGU6IGZ1bmN0aW9uICh0LCBwLCB2KSB7IHJldHVybiB0LnNldEF0dHJpYnV0ZShwLCB2KTsgfSxcbiAgb2JqZWN0OiBmdW5jdGlvbiAodCwgcCwgdikgeyByZXR1cm4gdFtwXSA9IHY7IH0sXG4gIHRyYW5zZm9ybTogZnVuY3Rpb24gKHQsIHAsIHYsIHRyYW5zZm9ybXMsIG1hbnVhbCkge1xuICAgIHRyYW5zZm9ybXMubGlzdC5zZXQocCwgdik7XG4gICAgaWYgKHAgPT09IHRyYW5zZm9ybXMubGFzdCB8fCBtYW51YWwpIHtcbiAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgIHRyYW5zZm9ybXMubGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgcHJvcCkgeyBzdHIgKz0gcHJvcCArIFwiKFwiICsgdmFsdWUgKyBcIikgXCI7IH0pO1xuICAgICAgdC5zdHlsZS50cmFuc2Zvcm0gPSBzdHI7XG4gICAgfVxuICB9XG59O1xuXG4vLyBTZXQgVmFsdWUgaGVscGVyXG5cbmZ1bmN0aW9uIHNldFRhcmdldHNWYWx1ZSh0YXJnZXRzLCBwcm9wZXJ0aWVzKSB7XG4gIHZhciBhbmltYXRhYmxlcyA9IGdldEFuaW1hdGFibGVzKHRhcmdldHMpO1xuICBhbmltYXRhYmxlcy5mb3JFYWNoKGZ1bmN0aW9uIChhbmltYXRhYmxlKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gcHJvcGVydGllcykge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0RnVuY3Rpb25WYWx1ZShwcm9wZXJ0aWVzW3Byb3BlcnR5XSwgYW5pbWF0YWJsZSk7XG4gICAgICB2YXIgdGFyZ2V0ID0gYW5pbWF0YWJsZS50YXJnZXQ7XG4gICAgICB2YXIgdmFsdWVVbml0ID0gZ2V0VW5pdCh2YWx1ZSk7XG4gICAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IGdldE9yaWdpbmFsVGFyZ2V0VmFsdWUodGFyZ2V0LCBwcm9wZXJ0eSwgdmFsdWVVbml0LCBhbmltYXRhYmxlKTtcbiAgICAgIHZhciB1bml0ID0gdmFsdWVVbml0IHx8IGdldFVuaXQob3JpZ2luYWxWYWx1ZSk7XG4gICAgICB2YXIgdG8gPSBnZXRSZWxhdGl2ZVZhbHVlKHZhbGlkYXRlVmFsdWUodmFsdWUsIHVuaXQpLCBvcmlnaW5hbFZhbHVlKTtcbiAgICAgIHZhciBhbmltVHlwZSA9IGdldEFuaW1hdGlvblR5cGUodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgICBzZXRQcm9ncmVzc1ZhbHVlW2FuaW1UeXBlXSh0YXJnZXQsIHByb3BlcnR5LCB0bywgYW5pbWF0YWJsZS50cmFuc2Zvcm1zLCB0cnVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBBbmltYXRpb25zXG5cbmZ1bmN0aW9uIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRhYmxlLCBwcm9wKSB7XG4gIHZhciBhbmltVHlwZSA9IGdldEFuaW1hdGlvblR5cGUoYW5pbWF0YWJsZS50YXJnZXQsIHByb3AubmFtZSk7XG4gIGlmIChhbmltVHlwZSkge1xuICAgIHZhciB0d2VlbnMgPSBub3JtYWxpemVUd2VlbnMocHJvcCwgYW5pbWF0YWJsZSk7XG4gICAgdmFyIGxhc3RUd2VlbiA9IHR3ZWVuc1t0d2VlbnMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IGFuaW1UeXBlLFxuICAgICAgcHJvcGVydHk6IHByb3AubmFtZSxcbiAgICAgIGFuaW1hdGFibGU6IGFuaW1hdGFibGUsXG4gICAgICB0d2VlbnM6IHR3ZWVucyxcbiAgICAgIGR1cmF0aW9uOiBsYXN0VHdlZW4uZW5kLFxuICAgICAgZGVsYXk6IHR3ZWVuc1swXS5kZWxheSxcbiAgICAgIGVuZERlbGF5OiBsYXN0VHdlZW4uZW5kRGVsYXlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0QW5pbWF0aW9ucyhhbmltYXRhYmxlcywgcHJvcGVydGllcykge1xuICByZXR1cm4gZmlsdGVyQXJyYXkoZmxhdHRlbkFycmF5KGFuaW1hdGFibGVzLm1hcChmdW5jdGlvbiAoYW5pbWF0YWJsZSkge1xuICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUFuaW1hdGlvbihhbmltYXRhYmxlLCBwcm9wKTtcbiAgICB9KTtcbiAgfSkpLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gIWlzLnVuZChhKTsgfSk7XG59XG5cbi8vIENyZWF0ZSBJbnN0YW5jZVxuXG5mdW5jdGlvbiBnZXRJbnN0YW5jZVRpbWluZ3MoYW5pbWF0aW9ucywgdHdlZW5TZXR0aW5ncykge1xuICB2YXIgYW5pbUxlbmd0aCA9IGFuaW1hdGlvbnMubGVuZ3RoO1xuICB2YXIgZ2V0VGxPZmZzZXQgPSBmdW5jdGlvbiAoYW5pbSkgeyByZXR1cm4gYW5pbS50aW1lbGluZU9mZnNldCA/IGFuaW0udGltZWxpbmVPZmZzZXQgOiAwOyB9O1xuICB2YXIgdGltaW5ncyA9IHt9O1xuICB0aW1pbmdzLmR1cmF0aW9uID0gYW5pbUxlbmd0aCA/IE1hdGgubWF4LmFwcGx5KE1hdGgsIGFuaW1hdGlvbnMubWFwKGZ1bmN0aW9uIChhbmltKSB7IHJldHVybiBnZXRUbE9mZnNldChhbmltKSArIGFuaW0uZHVyYXRpb247IH0pKSA6IHR3ZWVuU2V0dGluZ3MuZHVyYXRpb247XG4gIHRpbWluZ3MuZGVsYXkgPSBhbmltTGVuZ3RoID8gTWF0aC5taW4uYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kZWxheTsgfSkpIDogdHdlZW5TZXR0aW5ncy5kZWxheTtcbiAgdGltaW5ncy5lbmREZWxheSA9IGFuaW1MZW5ndGggPyB0aW1pbmdzLmR1cmF0aW9uIC0gTWF0aC5tYXguYXBwbHkoTWF0aCwgYW5pbWF0aW9ucy5tYXAoZnVuY3Rpb24gKGFuaW0pIHsgcmV0dXJuIGdldFRsT2Zmc2V0KGFuaW0pICsgYW5pbS5kdXJhdGlvbiAtIGFuaW0uZW5kRGVsYXk7IH0pKSA6IHR3ZWVuU2V0dGluZ3MuZW5kRGVsYXk7XG4gIHJldHVybiB0aW1pbmdzO1xufVxuXG52YXIgaW5zdGFuY2VJRCA9IDA7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld0luc3RhbmNlKHBhcmFtcykge1xuICB2YXIgaW5zdGFuY2VTZXR0aW5ncyA9IHJlcGxhY2VPYmplY3RQcm9wcyhkZWZhdWx0SW5zdGFuY2VTZXR0aW5ncywgcGFyYW1zKTtcbiAgdmFyIHR3ZWVuU2V0dGluZ3MgPSByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdFR3ZWVuU2V0dGluZ3MsIHBhcmFtcyk7XG4gIHZhciBwcm9wZXJ0aWVzID0gZ2V0UHJvcGVydGllcyh0d2VlblNldHRpbmdzLCBwYXJhbXMpO1xuICB2YXIgYW5pbWF0YWJsZXMgPSBnZXRBbmltYXRhYmxlcyhwYXJhbXMudGFyZ2V0cyk7XG4gIHZhciBhbmltYXRpb25zID0gZ2V0QW5pbWF0aW9ucyhhbmltYXRhYmxlcywgcHJvcGVydGllcyk7XG4gIHZhciB0aW1pbmdzID0gZ2V0SW5zdGFuY2VUaW1pbmdzKGFuaW1hdGlvbnMsIHR3ZWVuU2V0dGluZ3MpO1xuICB2YXIgaWQgPSBpbnN0YW5jZUlEO1xuICBpbnN0YW5jZUlEKys7XG4gIHJldHVybiBtZXJnZU9iamVjdHMoaW5zdGFuY2VTZXR0aW5ncywge1xuICAgIGlkOiBpZCxcbiAgICBjaGlsZHJlbjogW10sXG4gICAgYW5pbWF0YWJsZXM6IGFuaW1hdGFibGVzLFxuICAgIGFuaW1hdGlvbnM6IGFuaW1hdGlvbnMsXG4gICAgZHVyYXRpb246IHRpbWluZ3MuZHVyYXRpb24sXG4gICAgZGVsYXk6IHRpbWluZ3MuZGVsYXksXG4gICAgZW5kRGVsYXk6IHRpbWluZ3MuZW5kRGVsYXlcbiAgfSk7XG59XG5cbi8vIENvcmVcblxudmFyIGFjdGl2ZUluc3RhbmNlcyA9IFtdO1xudmFyIHBhdXNlZEluc3RhbmNlcyA9IFtdO1xudmFyIHJhZjtcblxudmFyIGVuZ2luZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHBsYXkoKSB7IFxuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgfVxuICBmdW5jdGlvbiBzdGVwKHQpIHtcbiAgICB2YXIgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDtcbiAgICBpZiAoYWN0aXZlSW5zdGFuY2VzTGVuZ3RoKSB7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IGFjdGl2ZUluc3RhbmNlc0xlbmd0aCkge1xuICAgICAgICB2YXIgYWN0aXZlSW5zdGFuY2UgPSBhY3RpdmVJbnN0YW5jZXNbaV07XG4gICAgICAgIGlmICghYWN0aXZlSW5zdGFuY2UucGF1c2VkKSB7XG4gICAgICAgICAgYWN0aXZlSW5zdGFuY2UudGljayh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaW5zdGFuY2VJbmRleCA9IGFjdGl2ZUluc3RhbmNlcy5pbmRleE9mKGFjdGl2ZUluc3RhbmNlKTtcbiAgICAgICAgICBpZiAoaW5zdGFuY2VJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBhY3RpdmVJbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlSW5kZXgsIDEpO1xuICAgICAgICAgICAgYWN0aXZlSW5zdGFuY2VzTGVuZ3RoID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgICAgcGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByYWYgPSBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGxheTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoKSB7XG4gIGlmIChkb2N1bWVudC5oaWRkZW4pIHtcbiAgICBhY3RpdmVJbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zKSB7IHJldHVybiBpbnMucGF1c2UoKTsgfSk7XG4gICAgcGF1c2VkSW5zdGFuY2VzID0gYWN0aXZlSW5zdGFuY2VzLnNsaWNlKDApO1xuICAgIGFuaW1lLnJ1bm5pbmcgPSBhY3RpdmVJbnN0YW5jZXMgPSBbXTtcbiAgfSBlbHNlIHtcbiAgICBwYXVzZWRJbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zKSB7IHJldHVybiBpbnMucGxheSgpOyB9KTtcbiAgfVxufVxuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSk7XG59XG5cbi8vIFB1YmxpYyBJbnN0YW5jZVxuXG5mdW5jdGlvbiBhbmltZShwYXJhbXMpIHtcbiAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IHt9O1xuXG5cbiAgdmFyIHN0YXJ0VGltZSA9IDAsIGxhc3RUaW1lID0gMCwgbm93ID0gMDtcbiAgdmFyIGNoaWxkcmVuLCBjaGlsZHJlbkxlbmd0aCA9IDA7XG4gIHZhciByZXNvbHZlID0gbnVsbDtcblxuICBmdW5jdGlvbiBtYWtlUHJvbWlzZShpbnN0YW5jZSkge1xuICAgIHZhciBwcm9taXNlID0gd2luZG93LlByb21pc2UgJiYgbmV3IFByb21pc2UoZnVuY3Rpb24gKF9yZXNvbHZlKSB7IHJldHVybiByZXNvbHZlID0gX3Jlc29sdmU7IH0pO1xuICAgIGluc3RhbmNlLmZpbmlzaGVkID0gcHJvbWlzZTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHZhciBpbnN0YW5jZSA9IGNyZWF0ZU5ld0luc3RhbmNlKHBhcmFtcyk7XG4gIHZhciBwcm9taXNlID0gbWFrZVByb21pc2UoaW5zdGFuY2UpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZUluc3RhbmNlRGlyZWN0aW9uKCkge1xuICAgIHZhciBkaXJlY3Rpb24gPSBpbnN0YW5jZS5kaXJlY3Rpb247XG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gJ2FsdGVybmF0ZScpIHtcbiAgICAgIGluc3RhbmNlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbiAhPT0gJ25vcm1hbCcgPyAnbm9ybWFsJyA6ICdyZXZlcnNlJztcbiAgICB9XG4gICAgaW5zdGFuY2UucmV2ZXJzZWQgPSAhaW5zdGFuY2UucmV2ZXJzZWQ7XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIGNoaWxkLnJldmVyc2VkID0gaW5zdGFuY2UucmV2ZXJzZWQ7IH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRqdXN0VGltZSh0aW1lKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLnJldmVyc2VkID8gaW5zdGFuY2UuZHVyYXRpb24gLSB0aW1lIDogdGltZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VGltZSgpIHtcbiAgICBzdGFydFRpbWUgPSAwO1xuICAgIGxhc3RUaW1lID0gYWRqdXN0VGltZShpbnN0YW5jZS5jdXJyZW50VGltZSkgKiAoMSAvIGFuaW1lLnNwZWVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlZWtDaGlsZCh0aW1lLCBjaGlsZCkge1xuICAgIGlmIChjaGlsZCkgeyBjaGlsZC5zZWVrKHRpbWUgLSBjaGlsZC50aW1lbGluZU9mZnNldCk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN5bmNJbnN0YW5jZUNoaWxkcmVuKHRpbWUpIHtcbiAgICBpZiAoIWluc3RhbmNlLnJldmVyc2VQbGF5YmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7IHNlZWtDaGlsZCh0aW1lLCBjaGlsZHJlbltpXSk7IH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSQxID0gY2hpbGRyZW5MZW5ndGg7IGkkMS0tOykgeyBzZWVrQ2hpbGQodGltZSwgY2hpbGRyZW5baSQxXSk7IH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoaW5zVGltZSkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGluc3RhbmNlLmFuaW1hdGlvbnM7XG4gICAgdmFyIGFuaW1hdGlvbnNMZW5ndGggPSBhbmltYXRpb25zLmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGFuaW1hdGlvbnNMZW5ndGgpIHtcbiAgICAgIHZhciBhbmltID0gYW5pbWF0aW9uc1tpXTtcbiAgICAgIHZhciBhbmltYXRhYmxlID0gYW5pbS5hbmltYXRhYmxlO1xuICAgICAgdmFyIHR3ZWVucyA9IGFuaW0udHdlZW5zO1xuICAgICAgdmFyIHR3ZWVuTGVuZ3RoID0gdHdlZW5zLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgdHdlZW4gPSB0d2VlbnNbdHdlZW5MZW5ndGhdO1xuICAgICAgLy8gT25seSBjaGVjayBmb3Iga2V5ZnJhbWVzIGlmIHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgdHdlZW5cbiAgICAgIGlmICh0d2Vlbkxlbmd0aCkgeyB0d2VlbiA9IGZpbHRlckFycmF5KHR3ZWVucywgZnVuY3Rpb24gKHQpIHsgcmV0dXJuIChpbnNUaW1lIDwgdC5lbmQpOyB9KVswXSB8fCB0d2VlbjsgfVxuICAgICAgdmFyIGVsYXBzZWQgPSBtaW5NYXgoaW5zVGltZSAtIHR3ZWVuLnN0YXJ0IC0gdHdlZW4uZGVsYXksIDAsIHR3ZWVuLmR1cmF0aW9uKSAvIHR3ZWVuLmR1cmF0aW9uO1xuICAgICAgdmFyIGVhc2VkID0gaXNOYU4oZWxhcHNlZCkgPyAxIDogdHdlZW4uZWFzaW5nKGVsYXBzZWQpO1xuICAgICAgdmFyIHN0cmluZ3MgPSB0d2Vlbi50by5zdHJpbmdzO1xuICAgICAgdmFyIHJvdW5kID0gdHdlZW4ucm91bmQ7XG4gICAgICB2YXIgbnVtYmVycyA9IFtdO1xuICAgICAgdmFyIHRvTnVtYmVyc0xlbmd0aCA9IHR3ZWVuLnRvLm51bWJlcnMubGVuZ3RoO1xuICAgICAgdmFyIHByb2dyZXNzID0gKHZvaWQgMCk7XG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHRvTnVtYmVyc0xlbmd0aDsgbisrKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9ICh2b2lkIDApO1xuICAgICAgICB2YXIgdG9OdW1iZXIgPSB0d2Vlbi50by5udW1iZXJzW25dO1xuICAgICAgICB2YXIgZnJvbU51bWJlciA9IHR3ZWVuLmZyb20ubnVtYmVyc1tuXSB8fCAwO1xuICAgICAgICBpZiAoIXR3ZWVuLmlzUGF0aCkge1xuICAgICAgICAgIHZhbHVlID0gZnJvbU51bWJlciArIChlYXNlZCAqICh0b051bWJlciAtIGZyb21OdW1iZXIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IGdldFBhdGhQcm9ncmVzcyh0d2Vlbi52YWx1ZSwgZWFzZWQgKiB0b051bWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdW5kKSB7XG4gICAgICAgICAgaWYgKCEodHdlZW4uaXNDb2xvciAmJiBuID4gMikpIHtcbiAgICAgICAgICAgIHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHJvdW5kKSAvIHJvdW5kO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBudW1iZXJzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgLy8gTWFudWFsIEFycmF5LnJlZHVjZSBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlc1xuICAgICAgdmFyIHN0cmluZ3NMZW5ndGggPSBzdHJpbmdzLmxlbmd0aDtcbiAgICAgIGlmICghc3RyaW5nc0xlbmd0aCkge1xuICAgICAgICBwcm9ncmVzcyA9IG51bWJlcnNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9ncmVzcyA9IHN0cmluZ3NbMF07XG4gICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgc3RyaW5nc0xlbmd0aDsgcysrKSB7XG4gICAgICAgICAgdmFyIGEgPSBzdHJpbmdzW3NdO1xuICAgICAgICAgIHZhciBiID0gc3RyaW5nc1tzICsgMV07XG4gICAgICAgICAgdmFyIG4kMSA9IG51bWJlcnNbc107XG4gICAgICAgICAgaWYgKCFpc05hTihuJDEpKSB7XG4gICAgICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gbiQxICsgJyAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgKz0gbiQxICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNldFByb2dyZXNzVmFsdWVbYW5pbS50eXBlXShhbmltYXRhYmxlLnRhcmdldCwgYW5pbS5wcm9wZXJ0eSwgcHJvZ3Jlc3MsIGFuaW1hdGFibGUudHJhbnNmb3Jtcyk7XG4gICAgICBhbmltLmN1cnJlbnRWYWx1ZSA9IHByb2dyZXNzO1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldENhbGxiYWNrKGNiKSB7XG4gICAgaWYgKGluc3RhbmNlW2NiXSAmJiAhaW5zdGFuY2UucGFzc1Rocm91Z2gpIHsgaW5zdGFuY2VbY2JdKGluc3RhbmNlKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gY291bnRJdGVyYXRpb24oKSB7XG4gICAgaWYgKGluc3RhbmNlLnJlbWFpbmluZyAmJiBpbnN0YW5jZS5yZW1haW5pbmcgIT09IHRydWUpIHtcbiAgICAgIGluc3RhbmNlLnJlbWFpbmluZy0tO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEluc3RhbmNlUHJvZ3Jlc3MoZW5naW5lVGltZSkge1xuICAgIHZhciBpbnNEdXJhdGlvbiA9IGluc3RhbmNlLmR1cmF0aW9uO1xuICAgIHZhciBpbnNEZWxheSA9IGluc3RhbmNlLmRlbGF5O1xuICAgIHZhciBpbnNFbmREZWxheSA9IGluc0R1cmF0aW9uIC0gaW5zdGFuY2UuZW5kRGVsYXk7XG4gICAgdmFyIGluc1RpbWUgPSBhZGp1c3RUaW1lKGVuZ2luZVRpbWUpO1xuICAgIGluc3RhbmNlLnByb2dyZXNzID0gbWluTWF4KChpbnNUaW1lIC8gaW5zRHVyYXRpb24pICogMTAwLCAwLCAxMDApO1xuICAgIGluc3RhbmNlLnJldmVyc2VQbGF5YmFjayA9IGluc1RpbWUgPCBpbnN0YW5jZS5jdXJyZW50VGltZTtcbiAgICBpZiAoY2hpbGRyZW4pIHsgc3luY0luc3RhbmNlQ2hpbGRyZW4oaW5zVGltZSk7IH1cbiAgICBpZiAoIWluc3RhbmNlLmJlZ2FuICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgaW5zdGFuY2UuYmVnYW4gPSB0cnVlO1xuICAgICAgc2V0Q2FsbGJhY2soJ2JlZ2luJyk7XG4gICAgfVxuICAgIGlmICghaW5zdGFuY2UubG9vcEJlZ2FuICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gdHJ1ZTtcbiAgICAgIHNldENhbGxiYWNrKCdsb29wQmVnaW4nKTtcbiAgICB9XG4gICAgaWYgKGluc1RpbWUgPD0gaW5zRGVsYXkgJiYgaW5zdGFuY2UuY3VycmVudFRpbWUgIT09IDApIHtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcygwKTtcbiAgICB9XG4gICAgaWYgKChpbnNUaW1lID49IGluc0VuZERlbGF5ICYmIGluc3RhbmNlLmN1cnJlbnRUaW1lICE9PSBpbnNEdXJhdGlvbikgfHwgIWluc0R1cmF0aW9uKSB7XG4gICAgICBzZXRBbmltYXRpb25zUHJvZ3Jlc3MoaW5zRHVyYXRpb24pO1xuICAgIH1cbiAgICBpZiAoaW5zVGltZSA+IGluc0RlbGF5ICYmIGluc1RpbWUgPCBpbnNFbmREZWxheSkge1xuICAgICAgaWYgKCFpbnN0YW5jZS5jaGFuZ2VCZWdhbikge1xuICAgICAgICBpbnN0YW5jZS5jaGFuZ2VCZWdhbiA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBzZXRDYWxsYmFjaygnY2hhbmdlQmVnaW4nKTtcbiAgICAgIH1cbiAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2UnKTtcbiAgICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnNUaW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGluc3RhbmNlLmNoYW5nZUJlZ2FuKSB7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gZmFsc2U7XG4gICAgICAgIHNldENhbGxiYWNrKCdjaGFuZ2VDb21wbGV0ZScpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5jdXJyZW50VGltZSA9IG1pbk1heChpbnNUaW1lLCAwLCBpbnNEdXJhdGlvbik7XG4gICAgaWYgKGluc3RhbmNlLmJlZ2FuKSB7IHNldENhbGxiYWNrKCd1cGRhdGUnKTsgfVxuICAgIGlmIChlbmdpbmVUaW1lID49IGluc0R1cmF0aW9uKSB7XG4gICAgICBsYXN0VGltZSA9IDA7XG4gICAgICBjb3VudEl0ZXJhdGlvbigpO1xuICAgICAgaWYgKCFpbnN0YW5jZS5yZW1haW5pbmcpIHtcbiAgICAgICAgaW5zdGFuY2UucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFpbnN0YW5jZS5jb21wbGV0ZWQpIHtcbiAgICAgICAgICBpbnN0YW5jZS5jb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIHNldENhbGxiYWNrKCdsb29wQ29tcGxldGUnKTtcbiAgICAgICAgICBzZXRDYWxsYmFjaygnY29tcGxldGUnKTtcbiAgICAgICAgICBpZiAoIWluc3RhbmNlLnBhc3NUaHJvdWdoICYmICdQcm9taXNlJyBpbiB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHByb21pc2UgPSBtYWtlUHJvbWlzZShpbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFRpbWUgPSBub3c7XG4gICAgICAgIHNldENhbGxiYWNrKCdsb29wQ29tcGxldGUnKTtcbiAgICAgICAgaW5zdGFuY2UubG9vcEJlZ2FuID0gZmFsc2U7XG4gICAgICAgIGlmIChpbnN0YW5jZS5kaXJlY3Rpb24gPT09ICdhbHRlcm5hdGUnKSB7XG4gICAgICAgICAgdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluc3RhbmNlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IGluc3RhbmNlLmRpcmVjdGlvbjtcbiAgICBpbnN0YW5jZS5wYXNzVGhyb3VnaCA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmN1cnJlbnRUaW1lID0gMDtcbiAgICBpbnN0YW5jZS5wcm9ncmVzcyA9IDA7XG4gICAgaW5zdGFuY2UucGF1c2VkID0gdHJ1ZTtcbiAgICBpbnN0YW5jZS5iZWdhbiA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmxvb3BCZWdhbiA9IGZhbHNlO1xuICAgIGluc3RhbmNlLmNoYW5nZUJlZ2FuID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY29tcGxldGVkID0gZmFsc2U7XG4gICAgaW5zdGFuY2UuY2hhbmdlQ29tcGxldGVkID0gZmFsc2U7XG4gICAgaW5zdGFuY2UucmV2ZXJzZVBsYXliYWNrID0gZmFsc2U7XG4gICAgaW5zdGFuY2UucmV2ZXJzZWQgPSBkaXJlY3Rpb24gPT09ICdyZXZlcnNlJztcbiAgICBpbnN0YW5jZS5yZW1haW5pbmcgPSBpbnN0YW5jZS5sb29wO1xuICAgIGNoaWxkcmVuID0gaW5zdGFuY2UuY2hpbGRyZW47XG4gICAgY2hpbGRyZW5MZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuTGVuZ3RoOyBpLS07KSB7IGluc3RhbmNlLmNoaWxkcmVuW2ldLnJlc2V0KCk7IH1cbiAgICBpZiAoaW5zdGFuY2UucmV2ZXJzZWQgJiYgaW5zdGFuY2UubG9vcCAhPT0gdHJ1ZSB8fCAoZGlyZWN0aW9uID09PSAnYWx0ZXJuYXRlJyAmJiBpbnN0YW5jZS5sb29wID09PSAxKSkgeyBpbnN0YW5jZS5yZW1haW5pbmcrKzsgfVxuICAgIHNldEFuaW1hdGlvbnNQcm9ncmVzcyhpbnN0YW5jZS5yZXZlcnNlZCA/IGluc3RhbmNlLmR1cmF0aW9uIDogMCk7XG4gIH07XG5cbiAgLy8gU2V0IFZhbHVlIGhlbHBlclxuXG4gIGluc3RhbmNlLnNldCA9IGZ1bmN0aW9uKHRhcmdldHMsIHByb3BlcnRpZXMpIHtcbiAgICBzZXRUYXJnZXRzVmFsdWUodGFyZ2V0cywgcHJvcGVydGllcyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIGluc3RhbmNlLnRpY2sgPSBmdW5jdGlvbih0KSB7XG4gICAgbm93ID0gdDtcbiAgICBpZiAoIXN0YXJ0VGltZSkgeyBzdGFydFRpbWUgPSBub3c7IH1cbiAgICBzZXRJbnN0YW5jZVByb2dyZXNzKChub3cgKyAobGFzdFRpbWUgLSBzdGFydFRpbWUpKSAqIGFuaW1lLnNwZWVkKTtcbiAgfTtcblxuICBpbnN0YW5jZS5zZWVrID0gZnVuY3Rpb24odGltZSkge1xuICAgIHNldEluc3RhbmNlUHJvZ3Jlc3MoYWRqdXN0VGltZSh0aW1lKSk7XG4gIH07XG5cbiAgaW5zdGFuY2UucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICBpbnN0YW5jZS5wYXVzZWQgPSB0cnVlO1xuICAgIHJlc2V0VGltZSgpO1xuICB9O1xuXG4gIGluc3RhbmNlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIWluc3RhbmNlLnBhdXNlZCkgeyByZXR1cm47IH1cbiAgICBpZiAoaW5zdGFuY2UuY29tcGxldGVkKSB7IGluc3RhbmNlLnJlc2V0KCk7IH1cbiAgICBpbnN0YW5jZS5wYXVzZWQgPSBmYWxzZTtcbiAgICBhY3RpdmVJbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG4gICAgcmVzZXRUaW1lKCk7XG4gICAgaWYgKCFyYWYpIHsgZW5naW5lKCk7IH1cbiAgfTtcblxuICBpbnN0YW5jZS5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG4gICAgdG9nZ2xlSW5zdGFuY2VEaXJlY3Rpb24oKTtcbiAgICByZXNldFRpbWUoKTtcbiAgfTtcblxuICBpbnN0YW5jZS5yZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5zdGFuY2UucmVzZXQoKTtcbiAgICBpbnN0YW5jZS5wbGF5KCk7XG4gIH07XG5cbiAgaW5zdGFuY2UucmVzZXQoKTtcblxuICBpZiAoaW5zdGFuY2UuYXV0b3BsYXkpIHsgaW5zdGFuY2UucGxheSgpOyB9XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xuXG59XG5cbi8vIFJlbW92ZSB0YXJnZXRzIGZyb20gYW5pbWF0aW9uXG5cbmZ1bmN0aW9uIHJlbW92ZVRhcmdldHNGcm9tQW5pbWF0aW9ucyh0YXJnZXRzQXJyYXksIGFuaW1hdGlvbnMpIHtcbiAgZm9yICh2YXIgYSA9IGFuaW1hdGlvbnMubGVuZ3RoOyBhLS07KSB7XG4gICAgaWYgKGFycmF5Q29udGFpbnModGFyZ2V0c0FycmF5LCBhbmltYXRpb25zW2FdLmFuaW1hdGFibGUudGFyZ2V0KSkge1xuICAgICAgYW5pbWF0aW9ucy5zcGxpY2UoYSwgMSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVRhcmdldHModGFyZ2V0cykge1xuICB2YXIgdGFyZ2V0c0FycmF5ID0gcGFyc2VUYXJnZXRzKHRhcmdldHMpO1xuICBmb3IgKHZhciBpID0gYWN0aXZlSW5zdGFuY2VzLmxlbmd0aDsgaS0tOykge1xuICAgIHZhciBpbnN0YW5jZSA9IGFjdGl2ZUluc3RhbmNlc1tpXTtcbiAgICB2YXIgYW5pbWF0aW9ucyA9IGluc3RhbmNlLmFuaW1hdGlvbnM7XG4gICAgdmFyIGNoaWxkcmVuID0gaW5zdGFuY2UuY2hpbGRyZW47XG4gICAgcmVtb3ZlVGFyZ2V0c0Zyb21BbmltYXRpb25zKHRhcmdldHNBcnJheSwgYW5pbWF0aW9ucyk7XG4gICAgZm9yICh2YXIgYyA9IGNoaWxkcmVuLmxlbmd0aDsgYy0tOykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5bY107XG4gICAgICB2YXIgY2hpbGRBbmltYXRpb25zID0gY2hpbGQuYW5pbWF0aW9ucztcbiAgICAgIHJlbW92ZVRhcmdldHNGcm9tQW5pbWF0aW9ucyh0YXJnZXRzQXJyYXksIGNoaWxkQW5pbWF0aW9ucyk7XG4gICAgICBpZiAoIWNoaWxkQW5pbWF0aW9ucy5sZW5ndGggJiYgIWNoaWxkLmNoaWxkcmVuLmxlbmd0aCkgeyBjaGlsZHJlbi5zcGxpY2UoYywgMSk7IH1cbiAgICB9XG4gICAgaWYgKCFhbmltYXRpb25zLmxlbmd0aCAmJiAhY2hpbGRyZW4ubGVuZ3RoKSB7IGluc3RhbmNlLnBhdXNlKCk7IH1cbiAgfVxufVxuXG4vLyBTdGFnZ2VyIGhlbHBlcnNcblxuZnVuY3Rpb24gc3RhZ2dlcih2YWwsIHBhcmFtcykge1xuICBpZiAoIHBhcmFtcyA9PT0gdm9pZCAwICkgcGFyYW1zID0ge307XG5cbiAgdmFyIGRpcmVjdGlvbiA9IHBhcmFtcy5kaXJlY3Rpb24gfHwgJ25vcm1hbCc7XG4gIHZhciBlYXNpbmcgPSBwYXJhbXMuZWFzaW5nID8gcGFyc2VFYXNpbmdzKHBhcmFtcy5lYXNpbmcpIDogbnVsbDtcbiAgdmFyIGdyaWQgPSBwYXJhbXMuZ3JpZDtcbiAgdmFyIGF4aXMgPSBwYXJhbXMuYXhpcztcbiAgdmFyIGZyb21JbmRleCA9IHBhcmFtcy5mcm9tIHx8IDA7XG4gIHZhciBmcm9tRmlyc3QgPSBmcm9tSW5kZXggPT09ICdmaXJzdCc7XG4gIHZhciBmcm9tQ2VudGVyID0gZnJvbUluZGV4ID09PSAnY2VudGVyJztcbiAgdmFyIGZyb21MYXN0ID0gZnJvbUluZGV4ID09PSAnbGFzdCc7XG4gIHZhciBpc1JhbmdlID0gaXMuYXJyKHZhbCk7XG4gIHZhciB2YWwxID0gaXNSYW5nZSA/IHBhcnNlRmxvYXQodmFsWzBdKSA6IHBhcnNlRmxvYXQodmFsKTtcbiAgdmFyIHZhbDIgPSBpc1JhbmdlID8gcGFyc2VGbG9hdCh2YWxbMV0pIDogMDtcbiAgdmFyIHVuaXQgPSBnZXRVbml0KGlzUmFuZ2UgPyB2YWxbMV0gOiB2YWwpIHx8IDA7XG4gIHZhciBzdGFydCA9IHBhcmFtcy5zdGFydCB8fCAwICsgKGlzUmFuZ2UgPyB2YWwxIDogMCk7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgdmFyIG1heFZhbHVlID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgaSwgdCkge1xuICAgIGlmIChmcm9tRmlyc3QpIHsgZnJvbUluZGV4ID0gMDsgfVxuICAgIGlmIChmcm9tQ2VudGVyKSB7IGZyb21JbmRleCA9ICh0IC0gMSkgLyAyOyB9XG4gICAgaWYgKGZyb21MYXN0KSB7IGZyb21JbmRleCA9IHQgLSAxOyB9XG4gICAgaWYgKCF2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoIWdyaWQpIHtcbiAgICAgICAgICB2YWx1ZXMucHVzaChNYXRoLmFicyhmcm9tSW5kZXggLSBpbmRleCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBmcm9tWCA9ICFmcm9tQ2VudGVyID8gZnJvbUluZGV4JWdyaWRbMF0gOiAoZ3JpZFswXS0xKS8yO1xuICAgICAgICAgIHZhciBmcm9tWSA9ICFmcm9tQ2VudGVyID8gTWF0aC5mbG9vcihmcm9tSW5kZXgvZ3JpZFswXSkgOiAoZ3JpZFsxXS0xKS8yO1xuICAgICAgICAgIHZhciB0b1ggPSBpbmRleCVncmlkWzBdO1xuICAgICAgICAgIHZhciB0b1kgPSBNYXRoLmZsb29yKGluZGV4L2dyaWRbMF0pO1xuICAgICAgICAgIHZhciBkaXN0YW5jZVggPSBmcm9tWCAtIHRvWDtcbiAgICAgICAgICB2YXIgZGlzdGFuY2VZID0gZnJvbVkgLSB0b1k7XG4gICAgICAgICAgdmFyIHZhbHVlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSk7XG4gICAgICAgICAgaWYgKGF4aXMgPT09ICd4JykgeyB2YWx1ZSA9IC1kaXN0YW5jZVg7IH1cbiAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7IHZhbHVlID0gLWRpc3RhbmNlWTsgfVxuICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBtYXhWYWx1ZSA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIHZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAoZWFzaW5nKSB7IHZhbHVlcyA9IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gZWFzaW5nKHZhbCAvIG1heFZhbHVlKSAqIG1heFZhbHVlOyB9KTsgfVxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnKSB7IHZhbHVlcyA9IHZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gYXhpcyA/ICh2YWwgPCAwKSA/IHZhbCAqIC0xIDogLXZhbCA6IE1hdGguYWJzKG1heFZhbHVlIC0gdmFsKTsgfSk7IH1cbiAgICB9XG4gICAgdmFyIHNwYWNpbmcgPSBpc1JhbmdlID8gKHZhbDIgLSB2YWwxKSAvIG1heFZhbHVlIDogdmFsMTtcbiAgICByZXR1cm4gc3RhcnQgKyAoc3BhY2luZyAqIChNYXRoLnJvdW5kKHZhbHVlc1tpXSAqIDEwMCkgLyAxMDApKSArIHVuaXQ7XG4gIH1cbn1cblxuLy8gVGltZWxpbmVcblxuZnVuY3Rpb24gdGltZWxpbmUocGFyYW1zKSB7XG4gIGlmICggcGFyYW1zID09PSB2b2lkIDAgKSBwYXJhbXMgPSB7fTtcblxuICB2YXIgdGwgPSBhbmltZShwYXJhbXMpO1xuICB0bC5kdXJhdGlvbiA9IDA7XG4gIHRsLmFkZCA9IGZ1bmN0aW9uKGluc3RhbmNlUGFyYW1zLCB0aW1lbGluZU9mZnNldCkge1xuICAgIHZhciB0bEluZGV4ID0gYWN0aXZlSW5zdGFuY2VzLmluZGV4T2YodGwpO1xuICAgIHZhciBjaGlsZHJlbiA9IHRsLmNoaWxkcmVuO1xuICAgIGlmICh0bEluZGV4ID4gLTEpIHsgYWN0aXZlSW5zdGFuY2VzLnNwbGljZSh0bEluZGV4LCAxKTsgfVxuICAgIGZ1bmN0aW9uIHBhc3NUaHJvdWdoKGlucykgeyBpbnMucGFzc1Rocm91Z2ggPSB0cnVlOyB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykgeyBwYXNzVGhyb3VnaChjaGlsZHJlbltpXSk7IH1cbiAgICB2YXIgaW5zUGFyYW1zID0gbWVyZ2VPYmplY3RzKGluc3RhbmNlUGFyYW1zLCByZXBsYWNlT2JqZWN0UHJvcHMoZGVmYXVsdFR3ZWVuU2V0dGluZ3MsIHBhcmFtcykpO1xuICAgIGluc1BhcmFtcy50YXJnZXRzID0gaW5zUGFyYW1zLnRhcmdldHMgfHwgcGFyYW1zLnRhcmdldHM7XG4gICAgdmFyIHRsRHVyYXRpb24gPSB0bC5kdXJhdGlvbjtcbiAgICBpbnNQYXJhbXMuYXV0b3BsYXkgPSBmYWxzZTtcbiAgICBpbnNQYXJhbXMuZGlyZWN0aW9uID0gdGwuZGlyZWN0aW9uO1xuICAgIGluc1BhcmFtcy50aW1lbGluZU9mZnNldCA9IGlzLnVuZCh0aW1lbGluZU9mZnNldCkgPyB0bER1cmF0aW9uIDogZ2V0UmVsYXRpdmVWYWx1ZSh0aW1lbGluZU9mZnNldCwgdGxEdXJhdGlvbik7XG4gICAgcGFzc1Rocm91Z2godGwpO1xuICAgIHRsLnNlZWsoaW5zUGFyYW1zLnRpbWVsaW5lT2Zmc2V0KTtcbiAgICB2YXIgaW5zID0gYW5pbWUoaW5zUGFyYW1zKTtcbiAgICBwYXNzVGhyb3VnaChpbnMpO1xuICAgIGNoaWxkcmVuLnB1c2goaW5zKTtcbiAgICB2YXIgdGltaW5ncyA9IGdldEluc3RhbmNlVGltaW5ncyhjaGlsZHJlbiwgcGFyYW1zKTtcbiAgICB0bC5kZWxheSA9IHRpbWluZ3MuZGVsYXk7XG4gICAgdGwuZW5kRGVsYXkgPSB0aW1pbmdzLmVuZERlbGF5O1xuICAgIHRsLmR1cmF0aW9uID0gdGltaW5ncy5kdXJhdGlvbjtcbiAgICB0bC5zZWVrKDApO1xuICAgIHRsLnJlc2V0KCk7XG4gICAgaWYgKHRsLmF1dG9wbGF5KSB7IHRsLnBsYXkoKTsgfVxuICAgIHJldHVybiB0bDtcbiAgfTtcbiAgcmV0dXJuIHRsO1xufVxuXG5hbmltZS52ZXJzaW9uID0gJzMuMS4wJztcbmFuaW1lLnNwZWVkID0gMTtcbmFuaW1lLnJ1bm5pbmcgPSBhY3RpdmVJbnN0YW5jZXM7XG5hbmltZS5yZW1vdmUgPSByZW1vdmVUYXJnZXRzO1xuYW5pbWUuZ2V0ID0gZ2V0T3JpZ2luYWxUYXJnZXRWYWx1ZTtcbmFuaW1lLnNldCA9IHNldFRhcmdldHNWYWx1ZTtcbmFuaW1lLmNvbnZlcnRQeCA9IGNvbnZlcnRQeFRvVW5pdDtcbmFuaW1lLnBhdGggPSBnZXRQYXRoO1xuYW5pbWUuc2V0RGFzaG9mZnNldCA9IHNldERhc2hvZmZzZXQ7XG5hbmltZS5zdGFnZ2VyID0gc3RhZ2dlcjtcbmFuaW1lLnRpbWVsaW5lID0gdGltZWxpbmU7XG5hbmltZS5lYXNpbmcgPSBwYXJzZUVhc2luZ3M7XG5hbmltZS5wZW5uZXIgPSBwZW5uZXI7XG5hbmltZS5yYW5kb20gPSBmdW5jdGlvbiAobWluLCBtYXgpIHsgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47IH07XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1lO1xuIiwidmFyIHdpbjtcblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW4gPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICB3aW4gPSBzZWxmO1xufSBlbHNlIHtcbiAgICB3aW4gPSB7fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3aW47XG4iLCIvKiEgQG5hbWUgbTN1OC1wYXJzZXIgQHZlcnNpb24gNC40LjAgQGxpY2Vuc2UgQXBhY2hlLTIuMCAqL1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcblxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufVxuXG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG4vKipcbiAqIEBmaWxlIHN0cmVhbS5qc1xuICovXG5cbi8qKlxuICogQSBsaWdodHdlaWdodCByZWFkYWJsZSBzdHJlYW0gaW1wbGVtZW50YXRpb24gdGhhdCBoYW5kbGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxuICpcbiAqIEBjbGFzcyBTdHJlYW1cbiAqL1xudmFyIFN0cmVhbSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9XG4gIC8qKlxuICAgKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBzcGVjaWZpZWQgZXZlbnQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgdGhlIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2hlbiBhbiBldmVudCBvZlxuICAgKiB0aGUgc3BlY2lmaWVkIHR5cGUgb2NjdXJzXG4gICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IFN0cmVhbS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm9uID0gZnVuY3Rpb24gb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIH1cblxuICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYSBsaXN0ZW5lciBmb3IgYSBzcGVjaWZpZWQgZXZlbnQgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgdGhlIGV2ZW50IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgIGEgZnVuY3Rpb24gcHJldmlvdXNseSByZWdpc3RlcmVkIGZvciB0aGlzXG4gICAqIHR5cGUgb2YgZXZlbnQgdGhyb3VnaCBgb25gXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IGlmIHdlIGNvdWxkIHR1cm4gaXQgb2ZmIG9yIG5vdFxuICAgKi9cbiAgO1xuXG4gIF9wcm90by5vZmYgPSBmdW5jdGlvbiBvZmYodHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gaW5kZXggPiAtMTtcbiAgfVxuICAvKipcbiAgICogVHJpZ2dlciBhbiBldmVudCBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgb24gdGhpcyBzdHJlYW0uIEFueSBhZGRpdGlvbmFsXG4gICAqIGFyZ3VtZW50cyB0byB0aGlzIGZ1bmN0aW9uIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycyB0byBldmVudCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIHRoZSBldmVudCBuYW1lXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLnRyaWdnZXIgPSBmdW5jdGlvbiB0cmlnZ2VyKHR5cGUpIHtcbiAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgdmFyIGk7XG4gICAgdmFyIGxlbmd0aDtcbiAgICB2YXIgYXJncztcblxuICAgIGlmICghY2FsbGJhY2tzKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBTbGljaW5nIHRoZSBhcmd1bWVudHMgb24gZXZlcnkgaW52b2NhdGlvbiBvZiB0aGlzIG1ldGhvZFxuICAgIC8vIGNhbiBhZGQgYSBzaWduaWZpY2FudCBhbW91bnQgb2Ygb3ZlcmhlYWQuIEF2b2lkIHRoZVxuICAgIC8vIGludGVybWVkaWF0ZSBvYmplY3QgY3JlYXRpb24gZm9yIHRoZSBjb21tb24gY2FzZSBvZiBhXG4gICAgLy8gc2luZ2xlIGNhbGxiYWNrIGFyZ3VtZW50XG5cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2FsbGJhY2tzW2ldLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogRGVzdHJveXMgdGhlIHN0cmVhbSBhbmQgY2xlYW5zIHVwLlxuICAgKi9cbiAgO1xuXG4gIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9XG4gIC8qKlxuICAgKiBGb3J3YXJkcyBhbGwgYGRhdGFgIGV2ZW50cyBvbiB0aGlzIHN0cmVhbSB0byB0aGUgZGVzdGluYXRpb24gc3RyZWFtLiBUaGVcbiAgICogZGVzdGluYXRpb24gc3RyZWFtIHNob3VsZCBwcm92aWRlIGEgbWV0aG9kIGBwdXNoYCB0byByZWNlaXZlIHRoZSBkYXRhXG4gICAqIGV2ZW50cyBhcyB0aGV5IGFycml2ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJlYW19IGRlc3RpbmF0aW9uIHRoZSBzdHJlYW0gdGhhdCB3aWxsIHJlY2VpdmUgYWxsIGBkYXRhYCBldmVudHNcbiAgICogQHNlZSBodHRwOi8vbm9kZWpzLm9yZy9hcGkvc3RyZWFtLmh0bWwjc3RyZWFtX3JlYWRhYmxlX3BpcGVfZGVzdGluYXRpb25fb3B0aW9uc1xuICAgKi9cbiAgO1xuXG4gIF9wcm90by5waXBlID0gZnVuY3Rpb24gcGlwZShkZXN0aW5hdGlvbikge1xuICAgIHRoaXMub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgZGVzdGluYXRpb24ucHVzaChkYXRhKTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gU3RyZWFtO1xufSgpO1xuXG4vKipcbiAqIEEgc3RyZWFtIHRoYXQgYnVmZmVycyBzdHJpbmcgaW5wdXQgYW5kIGdlbmVyYXRlcyBhIGBkYXRhYCBldmVudCBmb3IgZWFjaFxuICogbGluZS5cbiAqXG4gKiBAY2xhc3MgTGluZVN0cmVhbVxuICogQGV4dGVuZHMgU3RyZWFtXG4gKi9cblxudmFyIExpbmVTdHJlYW0gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9TdHJlYW0pIHtcbiAgX2luaGVyaXRzTG9vc2UoTGluZVN0cmVhbSwgX1N0cmVhbSk7XG5cbiAgZnVuY3Rpb24gTGluZVN0cmVhbSgpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9TdHJlYW0uY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmJ1ZmZlciA9ICcnO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICAvKipcbiAgICogQWRkIG5ldyBkYXRhIHRvIGJlIHBhcnNlZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgdGhlIHRleHQgdG8gcHJvY2Vzc1xuICAgKi9cblxuXG4gIHZhciBfcHJvdG8gPSBMaW5lU3RyZWFtLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucHVzaCA9IGZ1bmN0aW9uIHB1c2goZGF0YSkge1xuICAgIHZhciBuZXh0TmV3bGluZTtcbiAgICB0aGlzLmJ1ZmZlciArPSBkYXRhO1xuICAgIG5leHROZXdsaW5lID0gdGhpcy5idWZmZXIuaW5kZXhPZignXFxuJyk7XG5cbiAgICBmb3IgKDsgbmV4dE5ld2xpbmUgPiAtMTsgbmV4dE5ld2xpbmUgPSB0aGlzLmJ1ZmZlci5pbmRleE9mKCdcXG4nKSkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdkYXRhJywgdGhpcy5idWZmZXIuc3Vic3RyaW5nKDAsIG5leHROZXdsaW5lKSk7XG4gICAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuYnVmZmVyLnN1YnN0cmluZyhuZXh0TmV3bGluZSArIDEpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTGluZVN0cmVhbTtcbn0oU3RyZWFtKTtcblxuLyoqXG4gKiBcImZvcmdpdmluZ1wiIGF0dHJpYnV0ZSBsaXN0IHBzdWVkby1ncmFtbWFyOlxuICogYXR0cmlidXRlcyAtPiBrZXl2YWx1ZSAoJywnIGtleXZhbHVlKSpcbiAqIGtleXZhbHVlICAgLT4ga2V5ICc9JyB2YWx1ZVxuICoga2V5ICAgICAgICAtPiBbXj1dKlxuICogdmFsdWUgICAgICAtPiAnXCInIFteXCJdKiAnXCInIHwgW14sXSpcbiAqL1xuXG52YXIgYXR0cmlidXRlU2VwYXJhdG9yID0gZnVuY3Rpb24gYXR0cmlidXRlU2VwYXJhdG9yKCkge1xuICB2YXIga2V5ID0gJ1tePV0qJztcbiAgdmFyIHZhbHVlID0gJ1wiW15cIl0qXCJ8W14sXSonO1xuICB2YXIga2V5dmFsdWUgPSAnKD86JyArIGtleSArICcpPSg/OicgKyB2YWx1ZSArICcpJztcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJyg/Ol58LCkoJyArIGtleXZhbHVlICsgJyknKTtcbn07XG4vKipcbiAqIFBhcnNlIGF0dHJpYnV0ZXMgZnJvbSBhIGxpbmUgZ2l2ZW4gdGhlIHNlcGFyYXRvclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyaWJ1dGVzIHRoZSBhdHRyaWJ1dGUgbGluZSB0byBwYXJzZVxuICovXG5cblxudmFyIHBhcnNlQXR0cmlidXRlcyA9IGZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gIC8vIHNwbGl0IHRoZSBzdHJpbmcgdXNpbmcgYXR0cmlidXRlcyBhcyB0aGUgc2VwYXJhdG9yXG4gIHZhciBhdHRycyA9IGF0dHJpYnV0ZXMuc3BsaXQoYXR0cmlidXRlU2VwYXJhdG9yKCkpO1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpID0gYXR0cnMubGVuZ3RoO1xuICB2YXIgYXR0cjtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgLy8gZmlsdGVyIG91dCB1bm1hdGNoZWQgcG9ydGlvbnMgb2YgdGhlIHN0cmluZ1xuICAgIGlmIChhdHRyc1tpXSA9PT0gJycpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gLy8gc3BsaXQgdGhlIGtleSBhbmQgdmFsdWVcblxuXG4gICAgYXR0ciA9IC8oW149XSopPSguKikvLmV4ZWMoYXR0cnNbaV0pLnNsaWNlKDEpOyAvLyB0cmltIHdoaXRlc3BhY2UgYW5kIHJlbW92ZSBvcHRpb25hbCBxdW90ZXMgYXJvdW5kIHRoZSB2YWx1ZVxuXG4gICAgYXR0clswXSA9IGF0dHJbMF0ucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIGF0dHJbMV0gPSBhdHRyWzFdLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICBhdHRyWzFdID0gYXR0clsxXS5yZXBsYWNlKC9eWydcIl0oLiopWydcIl0kL2csICckMScpO1xuICAgIHJlc3VsdFthdHRyWzBdXSA9IGF0dHJbMV07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcbi8qKlxuICogQSBsaW5lLWxldmVsIE0zVTggcGFyc2VyIGV2ZW50IHN0cmVhbS4gSXQgZXhwZWN0cyB0byByZWNlaXZlIGlucHV0IG9uZVxuICogbGluZSBhdCBhIHRpbWUgYW5kIHBlcmZvcm1zIGEgY29udGV4dC1mcmVlIHBhcnNlIG9mIGl0cyBjb250ZW50cy4gQSBzdHJlYW1cbiAqIGludGVycHJldGF0aW9uIG9mIGEgbWFuaWZlc3QgY2FuIGJlIHVzZWZ1bCBpZiB0aGUgbWFuaWZlc3QgaXMgZXhwZWN0ZWQgdG9cbiAqIGJlIHRvbyBsYXJnZSB0byBmaXQgY29tZm9ydGFibHkgaW50byBtZW1vcnkgb3IgdGhlIGVudGlyZXR5IG9mIHRoZSBpbnB1dFxuICogaXMgbm90IGltbWVkaWF0ZWx5IGF2YWlsYWJsZS4gT3RoZXJ3aXNlLCBpdCdzIHByb2JhYmx5IG11Y2ggZWFzaWVyIHRvIHdvcmtcbiAqIHdpdGggYSByZWd1bGFyIGBQYXJzZXJgIG9iamVjdC5cbiAqXG4gKiBQcm9kdWNlcyBgZGF0YWAgZXZlbnRzIHdpdGggYW4gb2JqZWN0IHRoYXQgY2FwdHVyZXMgdGhlIHBhcnNlcidzXG4gKiBpbnRlcnByZXRhdGlvbiBvZiB0aGUgaW5wdXQuIFRoYXQgb2JqZWN0IGhhcyBhIHByb3BlcnR5IGB0YWdgIHRoYXQgaXMgb25lXG4gKiBvZiBgdXJpYCwgYGNvbW1lbnRgLCBvciBgdGFnYC4gVVJJcyBvbmx5IGhhdmUgYSBzaW5nbGUgYWRkaXRpb25hbFxuICogcHJvcGVydHksIGBsaW5lYCwgd2hpY2ggY2FwdHVyZXMgdGhlIGVudGlyZXR5IG9mIHRoZSBpbnB1dCB3aXRob3V0XG4gKiBpbnRlcnByZXRhdGlvbi4gQ29tbWVudHMgc2ltaWxhcmx5IGhhdmUgYSBzaW5nbGUgYWRkaXRpb25hbCBwcm9wZXJ0eVxuICogYHRleHRgIHdoaWNoIGlzIHRoZSBpbnB1dCB3aXRob3V0IHRoZSBsZWFkaW5nIGAjYC5cbiAqXG4gKiBUYWdzIGFsd2F5cyBoYXZlIGEgcHJvcGVydHkgYHRhZ1R5cGVgIHdoaWNoIGlzIHRoZSBsb3dlci1jYXNlZCB2ZXJzaW9uIG9mXG4gKiB0aGUgTTNVOCBkaXJlY3RpdmUgd2l0aG91dCB0aGUgYCNFWFRgIG9yIGAjRVhULVgtYCBwcmVmaXguIEZvciBpbnN0YW5jZSxcbiAqIGAjRVhULVgtTUVESUEtU0VRVUVOQ0VgIGJlY29tZXMgYG1lZGlhLXNlcXVlbmNlYCB3aGVuIHBhcnNlZC4gVW5yZWNvZ25pemVkXG4gKiB0YWdzIGFyZSBnaXZlbiB0aGUgdGFnIHR5cGUgYHVua25vd25gIGFuZCBhIHNpbmdsZSBhZGRpdGlvbmFsIHByb3BlcnR5XG4gKiBgZGF0YWAgd2l0aCB0aGUgcmVtYWluZGVyIG9mIHRoZSBpbnB1dC5cbiAqXG4gKiBAY2xhc3MgUGFyc2VTdHJlYW1cbiAqIEBleHRlbmRzIFN0cmVhbVxuICovXG5cblxudmFyIFBhcnNlU3RyZWFtID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfU3RyZWFtKSB7XG4gIF9pbmhlcml0c0xvb3NlKFBhcnNlU3RyZWFtLCBfU3RyZWFtKTtcblxuICBmdW5jdGlvbiBQYXJzZVN0cmVhbSgpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9TdHJlYW0uY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmN1c3RvbVBhcnNlcnMgPSBbXTtcbiAgICBfdGhpcy50YWdNYXBwZXJzID0gW107XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZXMgYW4gYWRkaXRpb25hbCBsaW5lIG9mIGlucHV0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbGluZSBhIHNpbmdsZSBsaW5lIG9mIGFuIE0zVTggZmlsZSB0byBwYXJzZVxuICAgKi9cblxuXG4gIHZhciBfcHJvdG8gPSBQYXJzZVN0cmVhbS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnB1c2ggPSBmdW5jdGlvbiBwdXNoKGxpbmUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciBtYXRjaDtcbiAgICB2YXIgZXZlbnQ7IC8vIHN0cmlwIHdoaXRlc3BhY2VcblxuICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcblxuICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gaWdub3JlIGVtcHR5IGxpbmVzXG4gICAgICByZXR1cm47XG4gICAgfSAvLyBVUklzXG5cblxuICAgIGlmIChsaW5lWzBdICE9PSAnIycpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignZGF0YScsIHtcbiAgICAgICAgdHlwZTogJ3VyaScsXG4gICAgICAgIHVyaTogbGluZVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBtYXAgdGFnc1xuXG5cbiAgICB2YXIgbmV3TGluZXMgPSB0aGlzLnRhZ01hcHBlcnMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIG1hcHBlcikge1xuICAgICAgdmFyIG1hcHBlZExpbmUgPSBtYXBwZXIobGluZSk7IC8vIHNraXAgaWYgdW5jaGFuZ2VkXG5cbiAgICAgIGlmIChtYXBwZWRMaW5lID09PSBsaW5lKSB7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2MuY29uY2F0KFttYXBwZWRMaW5lXSk7XG4gICAgfSwgW2xpbmVdKTtcbiAgICBuZXdMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChuZXdMaW5lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF90aGlzMi5jdXN0b21QYXJzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChfdGhpczIuY3VzdG9tUGFyc2Vyc1tpXS5jYWxsKF90aGlzMiwgbmV3TGluZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0gLy8gQ29tbWVudHNcblxuXG4gICAgICBpZiAobmV3TGluZS5pbmRleE9mKCcjRVhUJykgIT09IDApIHtcbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCB7XG4gICAgICAgICAgdHlwZTogJ2NvbW1lbnQnLFxuICAgICAgICAgIHRleHQ6IG5ld0xpbmUuc2xpY2UoMSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBzdHJpcCBvZmYgYW55IGNhcnJpYWdlIHJldHVybnMgaGVyZSBzbyB0aGUgcmVnZXggbWF0Y2hpbmdcbiAgICAgIC8vIGRvZXNuJ3QgaGF2ZSB0byBhY2NvdW50IGZvciB0aGVtLlxuXG5cbiAgICAgIG5ld0xpbmUgPSBuZXdMaW5lLnJlcGxhY2UoJ1xccicsICcnKTsgLy8gVGFnc1xuXG4gICAgICBtYXRjaCA9IC9eI0VYVE0zVS8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdtM3UnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFRJTkY6PyhbMC05XFwuXSopPyw/KC4qKT8kLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2luZidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5kdXJhdGlvbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgZXZlbnQudGl0bGUgPSBtYXRjaFsyXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1UQVJHRVREVVJBVElPTjo/KFswLTkuXSopPy8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICd0YXJnZXRkdXJhdGlvbidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5kdXJhdGlvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jWkVOLVRPVEFMLURVUkFUSU9OOj8oWzAtOS5dKik/Ly5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ3RvdGFsZHVyYXRpb24nXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuZHVyYXRpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLVZFUlNJT046PyhbMC05Ll0qKT8vLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAndmVyc2lvbidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC52ZXJzaW9uID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1NRURJQS1TRVFVRU5DRTo/KFxcLT9bMC05Ll0qKT8vLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnbWVkaWEtc2VxdWVuY2UnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQubnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1ESVNDT05USU5VSVRZLVNFUVVFTkNFOj8oXFwtP1swLTkuXSopPy8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdkaXNjb250aW51aXR5LXNlcXVlbmNlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50Lm51bWJlciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtUExBWUxJU1QtVFlQRTo/KC4qKT8kLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ3BsYXlsaXN0LXR5cGUnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQucGxheWxpc3RUeXBlID0gbWF0Y2hbMV07XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtQllURVJBTkdFOj8oWzAtOS5dKik/QD8oWzAtOS5dKik/Ly5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2J5dGVyYW5nZSdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5sZW5ndGggPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgZXZlbnQub2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hbMl0sIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1BTExPVy1DQUNIRTo/KFlFU3xOTyk/Ly5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2FsbG93LWNhY2hlJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmFsbG93ZWQgPSAhL05PLy50ZXN0KG1hdGNoWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1NQVA6PyguKikkLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ21hcCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICB2YXIgYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhtYXRjaFsxXSk7XG5cbiAgICAgICAgICBpZiAoYXR0cmlidXRlcy5VUkkpIHtcbiAgICAgICAgICAgIGV2ZW50LnVyaSA9IGF0dHJpYnV0ZXMuVVJJO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdHRyaWJ1dGVzLkJZVEVSQU5HRSkge1xuICAgICAgICAgICAgdmFyIF9hdHRyaWJ1dGVzJEJZVEVSQU5HRSA9IGF0dHJpYnV0ZXMuQllURVJBTkdFLnNwbGl0KCdAJyksXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gX2F0dHJpYnV0ZXMkQllURVJBTkdFWzBdLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IF9hdHRyaWJ1dGVzJEJZVEVSQU5HRVsxXTtcblxuICAgICAgICAgICAgZXZlbnQuYnl0ZXJhbmdlID0ge307XG5cbiAgICAgICAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXZlbnQuYnl0ZXJhbmdlLmxlbmd0aCA9IHBhcnNlSW50KGxlbmd0aCwgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgIGV2ZW50LmJ5dGVyYW5nZS5vZmZzZXQgPSBwYXJzZUludChvZmZzZXQsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtU1RSRUFNLUlORjo/KC4qKSQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnc3RyZWFtLWluZidcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzID0gcGFyc2VBdHRyaWJ1dGVzKG1hdGNoWzFdKTtcblxuICAgICAgICAgIGlmIChldmVudC5hdHRyaWJ1dGVzLlJFU09MVVRJT04pIHtcbiAgICAgICAgICAgIHZhciBzcGxpdCA9IGV2ZW50LmF0dHJpYnV0ZXMuUkVTT0xVVElPTi5zcGxpdCgneCcpO1xuICAgICAgICAgICAgdmFyIHJlc29sdXRpb24gPSB7fTtcblxuICAgICAgICAgICAgaWYgKHNwbGl0WzBdKSB7XG4gICAgICAgICAgICAgIHJlc29sdXRpb24ud2lkdGggPSBwYXJzZUludChzcGxpdFswXSwgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3BsaXRbMV0pIHtcbiAgICAgICAgICAgICAgcmVzb2x1dGlvbi5oZWlnaHQgPSBwYXJzZUludChzcGxpdFsxXSwgMTApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLlJFU09MVVRJT04gPSByZXNvbHV0aW9uO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChldmVudC5hdHRyaWJ1dGVzLkJBTkRXSURUSCkge1xuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5CQU5EV0lEVEggPSBwYXJzZUludChldmVudC5hdHRyaWJ1dGVzLkJBTkRXSURUSCwgMTApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChldmVudC5hdHRyaWJ1dGVzWydQUk9HUkFNLUlEJ10pIHtcbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXNbJ1BST0dSQU0tSUQnXSA9IHBhcnNlSW50KGV2ZW50LmF0dHJpYnV0ZXNbJ1BST0dSQU0tSUQnXSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1NRURJQTo/KC4qKSQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnbWVkaWEnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhtYXRjaFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtRU5ETElTVC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdlbmRsaXN0J1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtRElTQ09OVElOVUlUWS8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdkaXNjb250aW51aXR5J1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtUFJPR1JBTS1EQVRFLVRJTUU6PyguKikkLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ3Byb2dyYW0tZGF0ZS10aW1lJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmRhdGVUaW1lU3RyaW5nID0gbWF0Y2hbMV07XG4gICAgICAgICAgZXZlbnQuZGF0ZVRpbWVPYmplY3QgPSBuZXcgRGF0ZShtYXRjaFsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtS0VZOj8oLiopJC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdrZXknXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhtYXRjaFsxXSk7IC8vIHBhcnNlIHRoZSBJViBzdHJpbmcgaW50byBhIFVpbnQzMkFycmF5XG5cbiAgICAgICAgICBpZiAoZXZlbnQuYXR0cmlidXRlcy5JVikge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmF0dHJpYnV0ZXMuSVYuc3Vic3RyaW5nKDAsIDIpLnRvTG93ZXJDYXNlKCkgPT09ICcweCcpIHtcbiAgICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5JViA9IGV2ZW50LmF0dHJpYnV0ZXMuSVYuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLklWID0gZXZlbnQuYXR0cmlidXRlcy5JVi5tYXRjaCgvLns4fS9nKTtcbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuSVZbMF0gPSBwYXJzZUludChldmVudC5hdHRyaWJ1dGVzLklWWzBdLCAxNik7XG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLklWWzFdID0gcGFyc2VJbnQoZXZlbnQuYXR0cmlidXRlcy5JVlsxXSwgMTYpO1xuICAgICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5JVlsyXSA9IHBhcnNlSW50KGV2ZW50LmF0dHJpYnV0ZXMuSVZbMl0sIDE2KTtcbiAgICAgICAgICAgIGV2ZW50LmF0dHJpYnV0ZXMuSVZbM10gPSBwYXJzZUludChldmVudC5hdHRyaWJ1dGVzLklWWzNdLCAxNik7XG4gICAgICAgICAgICBldmVudC5hdHRyaWJ1dGVzLklWID0gbmV3IFVpbnQzMkFycmF5KGV2ZW50LmF0dHJpYnV0ZXMuSVYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMi50cmlnZ2VyKCdkYXRhJywgZXZlbnQpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbWF0Y2ggPSAvXiNFWFQtWC1TVEFSVDo/KC4qKSQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnc3RhcnQnXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgZXZlbnQuYXR0cmlidXRlcyA9IHBhcnNlQXR0cmlidXRlcyhtYXRjaFsxXSk7XG4gICAgICAgICAgZXZlbnQuYXR0cmlidXRlc1snVElNRS1PRkZTRVQnXSA9IHBhcnNlRmxvYXQoZXZlbnQuYXR0cmlidXRlc1snVElNRS1PRkZTRVQnXSk7XG4gICAgICAgICAgZXZlbnQuYXR0cmlidXRlcy5QUkVDSVNFID0gL1lFUy8udGVzdChldmVudC5hdHRyaWJ1dGVzLlBSRUNJU0UpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLUNVRS1PVVQtQ09OVDo/KC4qKT8kLy5leGVjKG5ld0xpbmUpO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgZXZlbnQgPSB7XG4gICAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgICAgdGFnVHlwZTogJ2N1ZS1vdXQtY29udCdcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICBldmVudC5kYXRhID0gbWF0Y2hbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZlbnQuZGF0YSA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ2RhdGEnLCBldmVudCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBtYXRjaCA9IC9eI0VYVC1YLUNVRS1PVVQ6PyguKik/JC8uZXhlYyhuZXdMaW5lKTtcblxuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGV2ZW50ID0ge1xuICAgICAgICAgIHR5cGU6ICd0YWcnLFxuICAgICAgICAgIHRhZ1R5cGU6ICdjdWUtb3V0J1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSBtYXRjaFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudC5kYXRhID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1hdGNoID0gL14jRVhULVgtQ1VFLUlOOj8oLiopPyQvLmV4ZWMobmV3TGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBldmVudCA9IHtcbiAgICAgICAgICB0eXBlOiAndGFnJyxcbiAgICAgICAgICB0YWdUeXBlOiAnY3VlLWluJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgIGV2ZW50LmRhdGEgPSBtYXRjaFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmVudC5kYXRhID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIGV2ZW50KTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIHVua25vd24gdGFnIHR5cGVcblxuXG4gICAgICBfdGhpczIudHJpZ2dlcignZGF0YScsIHtcbiAgICAgICAgdHlwZTogJ3RhZycsXG4gICAgICAgIGRhdGE6IG5ld0xpbmUuc2xpY2UoNClcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiBBZGQgYSBwYXJzZXIgZm9yIGN1c3RvbSBoZWFkZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIG9wdGlvbnMgICAgICAgICAgICAgIGEgbWFwIG9mIG9wdGlvbnMgZm9yIHRoZSBhZGRlZCBwYXJzZXJcbiAgICogQHBhcmFtIHtSZWdFeHB9ICAgb3B0aW9ucy5leHByZXNzaW9uICAgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggdGhlIGN1c3RvbSBoZWFkZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9ICAgb3B0aW9ucy5jdXN0b21UeXBlICAgdGhlIGN1c3RvbSB0eXBlIHRvIHJlZ2lzdGVyIHRvIHRoZSBvdXRwdXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZGF0YVBhcnNlcl0gZnVuY3Rpb24gdG8gcGFyc2UgdGhlIGxpbmUgaW50byBhbiBvYmplY3RcbiAgICogQHBhcmFtIHtib29sZWFufSAgW29wdGlvbnMuc2VnbWVudF0gICAgc2hvdWxkIHRhZyBkYXRhIGJlIGF0dGFjaGVkIHRvIHRoZSBzZWdtZW50IG9iamVjdFxuICAgKi9cbiAgO1xuXG4gIF9wcm90by5hZGRQYXJzZXIgPSBmdW5jdGlvbiBhZGRQYXJzZXIoX3JlZikge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdmFyIGV4cHJlc3Npb24gPSBfcmVmLmV4cHJlc3Npb24sXG4gICAgICAgIGN1c3RvbVR5cGUgPSBfcmVmLmN1c3RvbVR5cGUsXG4gICAgICAgIGRhdGFQYXJzZXIgPSBfcmVmLmRhdGFQYXJzZXIsXG4gICAgICAgIHNlZ21lbnQgPSBfcmVmLnNlZ21lbnQ7XG5cbiAgICBpZiAodHlwZW9mIGRhdGFQYXJzZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRhdGFQYXJzZXIgPSBmdW5jdGlvbiBkYXRhUGFyc2VyKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMuY3VzdG9tUGFyc2Vycy5wdXNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBleHByZXNzaW9uLmV4ZWMobGluZSk7XG5cbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBfdGhpczMudHJpZ2dlcignZGF0YScsIHtcbiAgICAgICAgICB0eXBlOiAnY3VzdG9tJyxcbiAgICAgICAgICBkYXRhOiBkYXRhUGFyc2VyKGxpbmUpLFxuICAgICAgICAgIGN1c3RvbVR5cGU6IGN1c3RvbVR5cGUsXG4gICAgICAgICAgc2VnbWVudDogc2VnbWVudFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKipcbiAgICogQWRkIGEgY3VzdG9tIGhlYWRlciBtYXBwZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgb3B0aW9uc1xuICAgKiBAcGFyYW0ge1JlZ0V4cH0gICBvcHRpb25zLmV4cHJlc3Npb24gICBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCB0aGUgY3VzdG9tIGhlYWRlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm1hcCAgICAgICAgICBmdW5jdGlvbiB0byB0cmFuc2xhdGUgdGFnIGludG8gYSBkaWZmZXJlbnQgdGFnXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLmFkZFRhZ01hcHBlciA9IGZ1bmN0aW9uIGFkZFRhZ01hcHBlcihfcmVmMikge1xuICAgIHZhciBleHByZXNzaW9uID0gX3JlZjIuZXhwcmVzc2lvbixcbiAgICAgICAgbWFwID0gX3JlZjIubWFwO1xuXG4gICAgdmFyIG1hcEZuID0gZnVuY3Rpb24gbWFwRm4obGluZSkge1xuICAgICAgaWYgKGV4cHJlc3Npb24udGVzdChsaW5lKSkge1xuICAgICAgICByZXR1cm4gbWFwKGxpbmUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGluZTtcbiAgICB9O1xuXG4gICAgdGhpcy50YWdNYXBwZXJzLnB1c2gobWFwRm4pO1xuICB9O1xuXG4gIHJldHVybiBQYXJzZVN0cmVhbTtcbn0oU3RyZWFtKTtcblxuZnVuY3Rpb24gZGVjb2RlQjY0VG9VaW50OEFycmF5KGI2NFRleHQpIHtcbiAgdmFyIGRlY29kZWRTdHJpbmcgPSB3aW5kb3cuYXRvYihiNjRUZXh0IHx8ICcnKTtcbiAgdmFyIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGVjb2RlZFN0cmluZy5sZW5ndGgpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGVjb2RlZFN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgIGFycmF5W2ldID0gZGVjb2RlZFN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICB9XG5cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgcGFyc2VyIGZvciBNM1U4IGZpbGVzLiBUaGUgY3VycmVudCBpbnRlcnByZXRhdGlvbiBvZiB0aGUgaW5wdXQgaXNcbiAqIGV4cG9zZWQgYXMgYSBwcm9wZXJ0eSBgbWFuaWZlc3RgIG9uIHBhcnNlciBvYmplY3RzLiBJdCdzIGp1c3QgdHdvIGxpbmVzIHRvXG4gKiBjcmVhdGUgYW5kIHBhcnNlIGEgbWFuaWZlc3Qgb25jZSB5b3UgaGF2ZSB0aGUgY29udGVudHMgYXZhaWxhYmxlIGFzIGEgc3RyaW5nOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcGFyc2VyID0gbmV3IG0zdTguUGFyc2VyKCk7XG4gKiBwYXJzZXIucHVzaCh4aHIucmVzcG9uc2VUZXh0KTtcbiAqIGBgYFxuICpcbiAqIE5ldyBpbnB1dCBjYW4gbGF0ZXIgYmUgYXBwbGllZCB0byB1cGRhdGUgdGhlIG1hbmlmZXN0IG9iamVjdCBieSBjYWxsaW5nXG4gKiBgcHVzaGAgYWdhaW4uXG4gKlxuICogVGhlIHBhcnNlciBhdHRlbXB0cyB0byBjcmVhdGUgYSB1c2FibGUgbWFuaWZlc3Qgb2JqZWN0IGV2ZW4gaWYgdGhlXG4gKiB1bmRlcmx5aW5nIGlucHV0IGlzIHNvbWV3aGF0IG5vbnNlbnNpY2FsLiBJdCBlbWl0cyBgaW5mb2AgYW5kIGB3YXJuaW5nYFxuICogZXZlbnRzIGR1cmluZyB0aGUgcGFyc2UgaWYgaXQgZW5jb3VudGVycyBpbnB1dCB0aGF0IHNlZW1zIGludmFsaWQgb3JcbiAqIHJlcXVpcmVzIHNvbWUgcHJvcGVydHkgb2YgdGhlIG1hbmlmZXN0IG9iamVjdCB0byBiZSBkZWZhdWx0ZWQuXG4gKlxuICogQGNsYXNzIFBhcnNlclxuICogQGV4dGVuZHMgU3RyZWFtXG4gKi9cblxudmFyIFBhcnNlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1N0cmVhbSkge1xuICBfaW5oZXJpdHNMb29zZShQYXJzZXIsIF9TdHJlYW0pO1xuXG4gIGZ1bmN0aW9uIFBhcnNlcigpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9TdHJlYW0uY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmxpbmVTdHJlYW0gPSBuZXcgTGluZVN0cmVhbSgpO1xuICAgIF90aGlzLnBhcnNlU3RyZWFtID0gbmV3IFBhcnNlU3RyZWFtKCk7XG5cbiAgICBfdGhpcy5saW5lU3RyZWFtLnBpcGUoX3RoaXMucGFyc2VTdHJlYW0pO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtdGhpcyAqL1xuXG5cbiAgICB2YXIgc2VsZiA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgIC8qIGVzbGludC1lbmFibGUgY29uc2lzdGVudC10aGlzICovXG5cblxuICAgIHZhciB1cmlzID0gW107XG4gICAgdmFyIGN1cnJlbnRVcmkgPSB7fTsgLy8gaWYgc3BlY2lmaWVkLCB0aGUgYWN0aXZlIEVYVC1YLU1BUCBkZWZpbml0aW9uXG5cbiAgICB2YXIgY3VycmVudE1hcDsgLy8gaWYgc3BlY2lmaWVkLCB0aGUgYWN0aXZlIGRlY3J5cHRpb24ga2V5XG5cbiAgICB2YXIgX2tleTtcblxuICAgIHZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG4gICAgdmFyIGRlZmF1bHRNZWRpYUdyb3VwcyA9IHtcbiAgICAgICdBVURJTyc6IHt9LFxuICAgICAgJ1ZJREVPJzoge30sXG4gICAgICAnQ0xPU0VELUNBUFRJT05TJzoge30sXG4gICAgICAnU1VCVElUTEVTJzoge31cbiAgICB9OyAvLyBUaGlzIGlzIHRoZSBXaWRldmluZSBVVUlEIGZyb20gREFTSCBJRiBJT1AuIFRoZSBzYW1lIGV4YWN0IHN0cmluZyBpc1xuICAgIC8vIHVzZWQgaW4gTVBEcyB3aXRoIFdpZGV2aW5lIGVuY3J5cHRlZCBzdHJlYW1zLlxuXG4gICAgdmFyIHdpZGV2aW5lVXVpZCA9ICd1cm46dXVpZDplZGVmOGJhOS03OWQ2LTRhY2UtYTNjOC0yN2RjZDUxZDIxZWQnOyAvLyBncm91cCBzZWdtZW50cyBpbnRvIG51bWJlcmVkIHRpbWVsaW5lcyBkZWxpbmVhdGVkIGJ5IGRpc2NvbnRpbnVpdGllc1xuXG4gICAgdmFyIGN1cnJlbnRUaW1lbGluZSA9IDA7IC8vIHRoZSBtYW5pZmVzdCBpcyBlbXB0eSB1bnRpbCB0aGUgcGFyc2Ugc3RyZWFtIGJlZ2lucyBkZWxpdmVyaW5nIGRhdGFcblxuICAgIF90aGlzLm1hbmlmZXN0ID0ge1xuICAgICAgYWxsb3dDYWNoZTogdHJ1ZSxcbiAgICAgIGRpc2NvbnRpbnVpdHlTdGFydHM6IFtdLFxuICAgICAgc2VnbWVudHM6IFtdXG4gICAgfTsgLy8gdXBkYXRlIHRoZSBtYW5pZmVzdCB3aXRoIHRoZSBtM3U4IGVudHJ5IGZyb20gdGhlIHBhcnNlIHN0cmVhbVxuXG4gICAgX3RoaXMucGFyc2VTdHJlYW0ub24oJ2RhdGEnLCBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgIHZhciBtZWRpYUdyb3VwO1xuICAgICAgdmFyIHJlbmRpdGlvbjtcbiAgICAgICh7XG4gICAgICAgIHRhZzogZnVuY3Rpb24gdGFnKCkge1xuICAgICAgICAgIC8vIHN3aXRjaCBiYXNlZCBvbiB0aGUgdGFnIHR5cGVcbiAgICAgICAgICAoKHtcbiAgICAgICAgICAgICdhbGxvdy1jYWNoZSc6IGZ1bmN0aW9uIGFsbG93Q2FjaGUoKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuYWxsb3dDYWNoZSA9IGVudHJ5LmFsbG93ZWQ7XG5cbiAgICAgICAgICAgICAgaWYgKCEoJ2FsbG93ZWQnIGluIGVudHJ5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignaW5mbycsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdkZWZhdWx0aW5nIGFsbG93Q2FjaGUgdG8gWUVTJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuYWxsb3dDYWNoZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBieXRlcmFuZ2U6IGZ1bmN0aW9uIGJ5dGVyYW5nZSgpIHtcbiAgICAgICAgICAgICAgdmFyIGJ5dGVyYW5nZSA9IHt9O1xuXG4gICAgICAgICAgICAgIGlmICgnbGVuZ3RoJyBpbiBlbnRyeSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRVcmkuYnl0ZXJhbmdlID0gYnl0ZXJhbmdlO1xuICAgICAgICAgICAgICAgIGJ5dGVyYW5nZS5sZW5ndGggPSBlbnRyeS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBpZiAoISgnb2Zmc2V0JyBpbiBlbnRyeSkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignaW5mbycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcgb2Zmc2V0IHRvIHplcm8nXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGVudHJ5Lm9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCdvZmZzZXQnIGluIGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFVyaS5ieXRlcmFuZ2UgPSBieXRlcmFuZ2U7XG4gICAgICAgICAgICAgICAgYnl0ZXJhbmdlLm9mZnNldCA9IGVudHJ5Lm9mZnNldDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZGxpc3Q6IGZ1bmN0aW9uIGVuZGxpc3QoKSB7XG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuZW5kTGlzdCA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5mOiBmdW5jdGlvbiBpbmYoKSB7XG4gICAgICAgICAgICAgIGlmICghKCdtZWRpYVNlcXVlbmNlJyBpbiB0aGlzLm1hbmlmZXN0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QubWVkaWFTZXF1ZW5jZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdpbmZvJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcgbWVkaWEgc2VxdWVuY2UgdG8gemVybydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghKCdkaXNjb250aW51aXR5U2VxdWVuY2UnIGluIHRoaXMubWFuaWZlc3QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5kaXNjb250aW51aXR5U2VxdWVuY2UgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignaW5mbycsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdkZWZhdWx0aW5nIGRpc2NvbnRpbnVpdHkgc2VxdWVuY2UgdG8gemVybydcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5kdXJhdGlvbiA+IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXJpLmR1cmF0aW9uID0gZW50cnkuZHVyYXRpb247XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VXJpLmR1cmF0aW9uID0gMC4wMTtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2luZm8nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAndXBkYXRpbmcgemVybyBzZWdtZW50IGR1cmF0aW9uIHRvIGEgc21hbGwgdmFsdWUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnNlZ21lbnRzID0gdXJpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBrZXk6IGZ1bmN0aW9uIGtleSgpIHtcbiAgICAgICAgICAgICAgaWYgKCFlbnRyeS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2lnbm9yaW5nIGtleSBkZWNsYXJhdGlvbiB3aXRob3V0IGF0dHJpYnV0ZSBsaXN0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfSAvLyBjbGVhciB0aGUgYWN0aXZlIGVuY3J5cHRpb24ga2V5XG5cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlcy5NRVRIT0QgPT09ICdOT05FJykge1xuICAgICAgICAgICAgICAgIF9rZXkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghZW50cnkuYXR0cmlidXRlcy5VUkkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaWdub3Jpbmcga2V5IGRlY2xhcmF0aW9uIHdpdGhvdXQgVVJJJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfSAvLyBjaGVjayBpZiB0aGUgY29udGVudCBpcyBlbmNyeXB0ZWQgZm9yIFdpZGV2aW5lXG4gICAgICAgICAgICAgIC8vIFdpZGV2aW5lL0hMUyBzcGVjOiBodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vd3Zkb2NzL1dpZGV2aW5lX0RSTV9ITFMucGRmXG5cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlcy5LRVlGT1JNQVQgPT09IHdpZGV2aW5lVXVpZCkge1xuICAgICAgICAgICAgICAgIHZhciBWQUxJRF9NRVRIT0RTID0gWydTQU1QTEUtQUVTJywgJ1NBTVBMRS1BRVMtQ1RSJywgJ1NBTVBMRS1BRVMtQ0VOQyddO1xuXG4gICAgICAgICAgICAgICAgaWYgKFZBTElEX01FVEhPRFMuaW5kZXhPZihlbnRyeS5hdHRyaWJ1dGVzLk1FVEhPRCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbnZhbGlkIGtleSBtZXRob2QgcHJvdmlkZWQgZm9yIFdpZGV2aW5lJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmF0dHJpYnV0ZXMuTUVUSE9EID09PSAnU0FNUExFLUFFUy1DRU5DJykge1xuICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCd3YXJuJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnU0FNUExFLUFFUy1DRU5DIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgU0FNUExFLUFFUy1DVFIgaW5zdGVhZCdcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLlVSSS5zdWJzdHJpbmcoMCwgMjMpICE9PSAnZGF0YTp0ZXh0L3BsYWluO2Jhc2U2NCwnKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbnZhbGlkIGtleSBVUkkgcHJvdmlkZWQgZm9yIFdpZGV2aW5lJ1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEoZW50cnkuYXR0cmlidXRlcy5LRVlJRCAmJiBlbnRyeS5hdHRyaWJ1dGVzLktFWUlELnN1YnN0cmluZygwLCAyKSA9PT0gJzB4JykpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ2ludmFsaWQga2V5IElEIHByb3ZpZGVkIGZvciBXaWRldmluZSdcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gLy8gaWYgV2lkZXZpbmUga2V5IGF0dHJpYnV0ZXMgYXJlIHZhbGlkLCBzdG9yZSB0aGVtIGFzIGBjb250ZW50UHJvdGVjdGlvbmBcbiAgICAgICAgICAgICAgICAvLyBvbiB0aGUgbWFuaWZlc3QgdG8gZW11bGF0ZSBXaWRldmluZSB0YWcgc3RydWN0dXJlIGluIGEgREFTSCBtcGRcblxuXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5jb250ZW50UHJvdGVjdGlvbiA9IHtcbiAgICAgICAgICAgICAgICAgICdjb20ud2lkZXZpbmUuYWxwaGEnOiB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBzY2hlbWVJZFVyaTogZW50cnkuYXR0cmlidXRlcy5LRVlGT1JNQVQsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlICcweCcgZnJvbSB0aGUga2V5IGlkIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgIGtleUlkOiBlbnRyeS5hdHRyaWJ1dGVzLktFWUlELnN1YnN0cmluZygyKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyBkZWNvZGUgdGhlIGJhc2U2NC1lbmNvZGVkIFBTU0ggYm94XG4gICAgICAgICAgICAgICAgICAgIHBzc2g6IGRlY29kZUI2NFRvVWludDhBcnJheShlbnRyeS5hdHRyaWJ1dGVzLlVSSS5zcGxpdCgnLCcpWzFdKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCFlbnRyeS5hdHRyaWJ1dGVzLk1FVEhPRCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdkZWZhdWx0aW5nIGtleSBtZXRob2QgdG8gQUVTLTEyOCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSAvLyBzZXR1cCBhbiBlbmNyeXB0aW9uIGtleSBmb3IgdXBjb21pbmcgc2VnbWVudHNcblxuXG4gICAgICAgICAgICAgIF9rZXkgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBlbnRyeS5hdHRyaWJ1dGVzLk1FVEhPRCB8fCAnQUVTLTEyOCcsXG4gICAgICAgICAgICAgICAgdXJpOiBlbnRyeS5hdHRyaWJ1dGVzLlVSSVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkuYXR0cmlidXRlcy5JViAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBfa2V5Lml2ID0gZW50cnkuYXR0cmlidXRlcy5JVjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdtZWRpYS1zZXF1ZW5jZSc6IGZ1bmN0aW9uIG1lZGlhU2VxdWVuY2UoKSB7XG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZW50cnkubnVtYmVyKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBpbnZhbGlkIG1lZGlhIHNlcXVlbmNlOiAnICsgZW50cnkubnVtYmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5tZWRpYVNlcXVlbmNlID0gZW50cnkubnVtYmVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdkaXNjb250aW51aXR5LXNlcXVlbmNlJzogZnVuY3Rpb24gZGlzY29udGludWl0eVNlcXVlbmNlKCkge1xuICAgICAgICAgICAgICBpZiAoIWlzRmluaXRlKGVudHJ5Lm51bWJlcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaWdub3JpbmcgaW52YWxpZCBkaXNjb250aW51aXR5IHNlcXVlbmNlOiAnICsgZW50cnkubnVtYmVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5kaXNjb250aW51aXR5U2VxdWVuY2UgPSBlbnRyeS5udW1iZXI7XG4gICAgICAgICAgICAgIGN1cnJlbnRUaW1lbGluZSA9IGVudHJ5Lm51bWJlcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncGxheWxpc3QtdHlwZSc6IGZ1bmN0aW9uIHBsYXlsaXN0VHlwZSgpIHtcbiAgICAgICAgICAgICAgaWYgKCEvVk9EfEVWRU5ULy50ZXN0KGVudHJ5LnBsYXlsaXN0VHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaWdub3JpbmcgdW5rbm93biBwbGF5bGlzdCB0eXBlOiAnICsgZW50cnkucGxheWxpc3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnBsYXlsaXN0VHlwZSA9IGVudHJ5LnBsYXlsaXN0VHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXA6IGZ1bmN0aW9uIG1hcCgpIHtcbiAgICAgICAgICAgICAgY3VycmVudE1hcCA9IHt9O1xuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS51cmkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TWFwLnVyaSA9IGVudHJ5LnVyaTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5ieXRlcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TWFwLmJ5dGVyYW5nZSA9IGVudHJ5LmJ5dGVyYW5nZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdzdHJlYW0taW5mJzogZnVuY3Rpb24gc3RyZWFtSW5mKCkge1xuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnBsYXlsaXN0cyA9IHVyaXM7XG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QubWVkaWFHcm91cHMgPSB0aGlzLm1hbmlmZXN0Lm1lZGlhR3JvdXBzIHx8IGRlZmF1bHRNZWRpYUdyb3VwcztcblxuICAgICAgICAgICAgICBpZiAoIWVudHJ5LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ3dhcm4nLCB7XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaWdub3JpbmcgZW1wdHkgc3RyZWFtLWluZiBhdHRyaWJ1dGVzJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghY3VycmVudFVyaS5hdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFVyaS5hdHRyaWJ1dGVzID0ge307XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBfZXh0ZW5kcyhjdXJyZW50VXJpLmF0dHJpYnV0ZXMsIGVudHJ5LmF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1lZGlhOiBmdW5jdGlvbiBtZWRpYSgpIHtcbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC5tZWRpYUdyb3VwcyA9IHRoaXMubWFuaWZlc3QubWVkaWFHcm91cHMgfHwgZGVmYXVsdE1lZGlhR3JvdXBzO1xuXG4gICAgICAgICAgICAgIGlmICghKGVudHJ5LmF0dHJpYnV0ZXMgJiYgZW50cnkuYXR0cmlidXRlcy5UWVBFICYmIGVudHJ5LmF0dHJpYnV0ZXNbJ0dST1VQLUlEJ10gJiYgZW50cnkuYXR0cmlidXRlcy5OQU1FKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBpbmNvbXBsZXRlIG9yIG1pc3NpbmcgbWVkaWEgZ3JvdXAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9IC8vIGZpbmQgdGhlIG1lZGlhIGdyb3VwLCBjcmVhdGluZyBkZWZhdWx0cyBhcyBuZWNlc3NhcnlcblxuXG4gICAgICAgICAgICAgIHZhciBtZWRpYUdyb3VwVHlwZSA9IHRoaXMubWFuaWZlc3QubWVkaWFHcm91cHNbZW50cnkuYXR0cmlidXRlcy5UWVBFXTtcbiAgICAgICAgICAgICAgbWVkaWFHcm91cFR5cGVbZW50cnkuYXR0cmlidXRlc1snR1JPVVAtSUQnXV0gPSBtZWRpYUdyb3VwVHlwZVtlbnRyeS5hdHRyaWJ1dGVzWydHUk9VUC1JRCddXSB8fCB7fTtcbiAgICAgICAgICAgICAgbWVkaWFHcm91cCA9IG1lZGlhR3JvdXBUeXBlW2VudHJ5LmF0dHJpYnV0ZXNbJ0dST1VQLUlEJ11dOyAvLyBjb2xsZWN0IHRoZSByZW5kaXRpb24gbWV0YWRhdGFcblxuICAgICAgICAgICAgICByZW5kaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogL3llcy9pLnRlc3QoZW50cnkuYXR0cmlidXRlcy5ERUZBVUxUKVxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmIChyZW5kaXRpb24uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5hdXRvc2VsZWN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kaXRpb24uYXV0b3NlbGVjdCA9IC95ZXMvaS50ZXN0KGVudHJ5LmF0dHJpYnV0ZXMuQVVUT1NFTEVDVCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlcy5MQU5HVUFHRSkge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5sYW5ndWFnZSA9IGVudHJ5LmF0dHJpYnV0ZXMuTEFOR1VBR0U7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlcy5VUkkpIHtcbiAgICAgICAgICAgICAgICByZW5kaXRpb24udXJpID0gZW50cnkuYXR0cmlidXRlcy5VUkk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZW50cnkuYXR0cmlidXRlc1snSU5TVFJFQU0tSUQnXSkge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5pbnN0cmVhbUlkID0gZW50cnkuYXR0cmlidXRlc1snSU5TVFJFQU0tSUQnXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLkNIQVJBQ1RFUklTVElDUykge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5jaGFyYWN0ZXJpc3RpY3MgPSBlbnRyeS5hdHRyaWJ1dGVzLkNIQVJBQ1RFUklTVElDUztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlbnRyeS5hdHRyaWJ1dGVzLkZPUkNFRCkge1xuICAgICAgICAgICAgICAgIHJlbmRpdGlvbi5mb3JjZWQgPSAveWVzL2kudGVzdChlbnRyeS5hdHRyaWJ1dGVzLkZPUkNFRCk7XG4gICAgICAgICAgICAgIH0gLy8gaW5zZXJ0IHRoZSBuZXcgcmVuZGl0aW9uXG5cblxuICAgICAgICAgICAgICBtZWRpYUdyb3VwW2VudHJ5LmF0dHJpYnV0ZXMuTkFNRV0gPSByZW5kaXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlzY29udGludWl0eTogZnVuY3Rpb24gZGlzY29udGludWl0eSgpIHtcbiAgICAgICAgICAgICAgY3VycmVudFRpbWVsaW5lICs9IDE7XG4gICAgICAgICAgICAgIGN1cnJlbnRVcmkuZGlzY29udGludWl0eSA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuZGlzY29udGludWl0eVN0YXJ0cy5wdXNoKHVyaXMubGVuZ3RoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAncHJvZ3JhbS1kYXRlLXRpbWUnOiBmdW5jdGlvbiBwcm9ncmFtRGF0ZVRpbWUoKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5tYW5pZmVzdC5kYXRlVGltZVN0cmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBQUk9HUkFNLURBVEUtVElNRSBpcyBhIG1lZGlhLXNlZ21lbnQgdGFnLCBidXQgZm9yIGJhY2t3YXJkc1xuICAgICAgICAgICAgICAgIC8vIGNvbXBhdGliaWxpdHksIHdlIGFkZCB0aGUgZmlyc3Qgb2NjdXJlbmNlIG9mIHRoZSBQUk9HUkFNLURBVEUtVElNRSB0YWdcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgbWFuaWZlc3Qgb2JqZWN0XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogQ29uc2lkZXIgcmVtb3ZpbmcgdGhpcyBpbiBmdXR1cmUgbWFqb3IgdmVyc2lvblxuICAgICAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuZGF0ZVRpbWVTdHJpbmcgPSBlbnRyeS5kYXRlVGltZVN0cmluZztcbiAgICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LmRhdGVUaW1lT2JqZWN0ID0gZW50cnkuZGF0ZVRpbWVPYmplY3Q7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjdXJyZW50VXJpLmRhdGVUaW1lU3RyaW5nID0gZW50cnkuZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgICAgICAgIGN1cnJlbnRVcmkuZGF0ZVRpbWVPYmplY3QgPSBlbnRyeS5kYXRlVGltZU9iamVjdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YXJnZXRkdXJhdGlvbjogZnVuY3Rpb24gdGFyZ2V0ZHVyYXRpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZW50cnkuZHVyYXRpb24pIHx8IGVudHJ5LmR1cmF0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBpbnZhbGlkIHRhcmdldCBkdXJhdGlvbjogJyArIGVudHJ5LmR1cmF0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhpcy5tYW5pZmVzdC50YXJnZXREdXJhdGlvbiA9IGVudHJ5LmR1cmF0aW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvdGFsZHVyYXRpb246IGZ1bmN0aW9uIHRvdGFsZHVyYXRpb24oKSB7XG4gICAgICAgICAgICAgIGlmICghaXNGaW5pdGUoZW50cnkuZHVyYXRpb24pIHx8IGVudHJ5LmR1cmF0aW9uIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBpbnZhbGlkIHRvdGFsIGR1cmF0aW9uOiAnICsgZW50cnkuZHVyYXRpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLm1hbmlmZXN0LnRvdGFsRHVyYXRpb24gPSBlbnRyeS5kdXJhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICAgIGlmICghZW50cnkuYXR0cmlidXRlcyB8fCBpc05hTihlbnRyeS5hdHRyaWJ1dGVzWydUSU1FLU9GRlNFVCddKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpZ25vcmluZyBzdGFydCBkZWNsYXJhdGlvbiB3aXRob3V0IGFwcHJvcHJpYXRlIGF0dHJpYnV0ZSBsaXN0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMubWFuaWZlc3Quc3RhcnQgPSB7XG4gICAgICAgICAgICAgICAgdGltZU9mZnNldDogZW50cnkuYXR0cmlidXRlc1snVElNRS1PRkZTRVQnXSxcbiAgICAgICAgICAgICAgICBwcmVjaXNlOiBlbnRyeS5hdHRyaWJ1dGVzLlBSRUNJU0VcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY3VlLW91dCc6IGZ1bmN0aW9uIGN1ZU91dCgpIHtcbiAgICAgICAgICAgICAgY3VycmVudFVyaS5jdWVPdXQgPSBlbnRyeS5kYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjdWUtb3V0LWNvbnQnOiBmdW5jdGlvbiBjdWVPdXRDb250KCkge1xuICAgICAgICAgICAgICBjdXJyZW50VXJpLmN1ZU91dENvbnQgPSBlbnRyeS5kYXRhO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjdWUtaW4nOiBmdW5jdGlvbiBjdWVJbigpIHtcbiAgICAgICAgICAgICAgY3VycmVudFVyaS5jdWVJbiA9IGVudHJ5LmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlbZW50cnkudGFnVHlwZV0gfHwgbm9vcCkuY2FsbChzZWxmKTtcbiAgICAgICAgfSxcbiAgICAgICAgdXJpOiBmdW5jdGlvbiB1cmkoKSB7XG4gICAgICAgICAgY3VycmVudFVyaS51cmkgPSBlbnRyeS51cmk7XG4gICAgICAgICAgdXJpcy5wdXNoKGN1cnJlbnRVcmkpOyAvLyBpZiBubyBleHBsaWNpdCBkdXJhdGlvbiB3YXMgZGVjbGFyZWQsIHVzZSB0aGUgdGFyZ2V0IGR1cmF0aW9uXG5cbiAgICAgICAgICBpZiAodGhpcy5tYW5pZmVzdC50YXJnZXREdXJhdGlvbiAmJiAhKCdkdXJhdGlvbicgaW4gY3VycmVudFVyaSkpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcignd2FybicsIHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ2RlZmF1bHRpbmcgc2VnbWVudCBkdXJhdGlvbiB0byB0aGUgdGFyZ2V0IGR1cmF0aW9uJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdXJyZW50VXJpLmR1cmF0aW9uID0gdGhpcy5tYW5pZmVzdC50YXJnZXREdXJhdGlvbjtcbiAgICAgICAgICB9IC8vIGFubm90YXRlIHdpdGggZW5jcnlwdGlvbiBpbmZvcm1hdGlvbiwgaWYgbmVjZXNzYXJ5XG5cblxuICAgICAgICAgIGlmIChfa2V5KSB7XG4gICAgICAgICAgICBjdXJyZW50VXJpLmtleSA9IF9rZXk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudFVyaS50aW1lbGluZSA9IGN1cnJlbnRUaW1lbGluZTsgLy8gYW5ub3RhdGUgd2l0aCBpbml0aWFsaXphdGlvbiBzZWdtZW50IGluZm9ybWF0aW9uLCBpZiBuZWNlc3NhcnlcblxuICAgICAgICAgIGlmIChjdXJyZW50TWFwKSB7XG4gICAgICAgICAgICBjdXJyZW50VXJpLm1hcCA9IGN1cnJlbnRNYXA7XG4gICAgICAgICAgfSAvLyBwcmVwYXJlIGZvciB0aGUgbmV4dCBVUklcblxuXG4gICAgICAgICAgY3VycmVudFVyaSA9IHt9O1xuICAgICAgICB9LFxuICAgICAgICBjb21tZW50OiBmdW5jdGlvbiBjb21tZW50KCkgey8vIGNvbW1lbnRzIGFyZSBub3QgaW1wb3J0YW50IGZvciBwbGF5YmFja1xuICAgICAgICB9LFxuICAgICAgICBjdXN0b206IGZ1bmN0aW9uIGN1c3RvbSgpIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIHNlZ21lbnQtbGV2ZWwgZGF0YSBhdHRhY2ggdGhlIG91dHB1dCB0byB0aGUgc2VnbWVudFxuICAgICAgICAgIGlmIChlbnRyeS5zZWdtZW50KSB7XG4gICAgICAgICAgICBjdXJyZW50VXJpLmN1c3RvbSA9IGN1cnJlbnRVcmkuY3VzdG9tIHx8IHt9O1xuICAgICAgICAgICAgY3VycmVudFVyaS5jdXN0b21bZW50cnkuY3VzdG9tVHlwZV0gPSBlbnRyeS5kYXRhOyAvLyBpZiB0aGlzIGlzIG1hbmlmZXN0LWxldmVsIGRhdGEgYXR0YWNoIHRvIHRoZSB0b3AgbGV2ZWwgbWFuaWZlc3Qgb2JqZWN0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWFuaWZlc3QuY3VzdG9tID0gdGhpcy5tYW5pZmVzdC5jdXN0b20gfHwge307XG4gICAgICAgICAgICB0aGlzLm1hbmlmZXN0LmN1c3RvbVtlbnRyeS5jdXN0b21UeXBlXSA9IGVudHJ5LmRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVtlbnRyeS50eXBlXS5jYWxsKHNlbGYpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgaW5wdXQgc3RyaW5nIGFuZCB1cGRhdGUgdGhlIG1hbmlmZXN0IG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNodW5rIGEgcG90ZW50aWFsbHkgaW5jb21wbGV0ZSBwb3J0aW9uIG9mIHRoZSBtYW5pZmVzdFxuICAgKi9cblxuXG4gIHZhciBfcHJvdG8gPSBQYXJzZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5wdXNoID0gZnVuY3Rpb24gcHVzaChjaHVuaykge1xuICAgIHRoaXMubGluZVN0cmVhbS5wdXNoKGNodW5rKTtcbiAgfVxuICAvKipcbiAgICogRmx1c2ggYW55IHJlbWFpbmluZyBpbnB1dC4gVGhpcyBjYW4gYmUgaGFuZHkgaWYgdGhlIGxhc3QgbGluZSBvZiBhbiBNM1U4XG4gICAqIG1hbmlmZXN0IGRpZCBub3QgY29udGFpbiBhIHRyYWlsaW5nIG5ld2xpbmUgYnV0IHRoZSBmaWxlIGhhcyBiZWVuXG4gICAqIGNvbXBsZXRlbHkgcmVjZWl2ZWQuXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLmVuZCA9IGZ1bmN0aW9uIGVuZCgpIHtcbiAgICAvLyBmbHVzaCBhbnkgYnVmZmVyZWQgaW5wdXRcbiAgICB0aGlzLmxpbmVTdHJlYW0ucHVzaCgnXFxuJyk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZCBhbiBhZGRpdGlvbmFsIHBhcnNlciBmb3Igbm9uLXN0YW5kYXJkIHRhZ3NcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgb3B0aW9ucyAgICAgICAgICAgICAgYSBtYXAgb2Ygb3B0aW9ucyBmb3IgdGhlIGFkZGVkIHBhcnNlclxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gICBvcHRpb25zLmV4cHJlc3Npb24gICBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCB0aGUgY3VzdG9tIGhlYWRlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gICBvcHRpb25zLnR5cGUgICAgICAgICB0aGUgdHlwZSB0byByZWdpc3RlciB0byB0aGUgb3V0cHV0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmRhdGFQYXJzZXJdIGZ1bmN0aW9uIHRvIHBhcnNlIHRoZSBsaW5lIGludG8gYW4gb2JqZWN0XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gIFtvcHRpb25zLnNlZ21lbnRdICAgIHNob3VsZCB0YWcgZGF0YSBiZSBhdHRhY2hlZCB0byB0aGUgc2VnbWVudCBvYmplY3RcbiAgICovXG4gIDtcblxuICBfcHJvdG8uYWRkUGFyc2VyID0gZnVuY3Rpb24gYWRkUGFyc2VyKG9wdGlvbnMpIHtcbiAgICB0aGlzLnBhcnNlU3RyZWFtLmFkZFBhcnNlcihvcHRpb25zKTtcbiAgfVxuICAvKipcbiAgICogQWRkIGEgY3VzdG9tIGhlYWRlciBtYXBwZXJcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9ICAgb3B0aW9uc1xuICAgKiBAcGFyYW0ge1JlZ0V4cH0gICBvcHRpb25zLmV4cHJlc3Npb24gICBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYXRjaCB0aGUgY3VzdG9tIGhlYWRlclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm1hcCAgICAgICAgICBmdW5jdGlvbiB0byB0cmFuc2xhdGUgdGFnIGludG8gYSBkaWZmZXJlbnQgdGFnXG4gICAqL1xuICA7XG5cbiAgX3Byb3RvLmFkZFRhZ01hcHBlciA9IGZ1bmN0aW9uIGFkZFRhZ01hcHBlcihvcHRpb25zKSB7XG4gICAgdGhpcy5wYXJzZVN0cmVhbS5hZGRUYWdNYXBwZXIob3B0aW9ucyk7XG4gIH07XG5cbiAgcmV0dXJuIFBhcnNlcjtcbn0oU3RyZWFtKTtcblxuZXhwb3J0IHsgTGluZVN0cmVhbSwgUGFyc2VTdHJlYW0sIFBhcnNlciB9O1xuIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB0b01TIH0gZnJvbSAnLi90b01TJ1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0b1NydFRpbWUgfSBmcm9tICcuL3RvU3J0VGltZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdG9WdHRUaW1lIH0gZnJvbSAnLi90b1Z0dFRpbWUnXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhcnNlIH0gZnJvbSAnLi9wYXJzZSdcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnknXG5leHBvcnQgeyBkZWZhdWx0IGFzIHN0cmluZ2lmeVZ0dCB9IGZyb20gJy4vc3RyaW5naWZ5VnR0J1xuZXhwb3J0IHsgZGVmYXVsdCBhcyByZXN5bmMgfSBmcm9tICcuL3Jlc3luYydcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VUaW1lc3RhbXBzIH0gZnJvbSAnLi9wYXJzZVRpbWVzdGFtcHMnXG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHBhcnNlVGltZXN0YW1wcyBmcm9tICcuL3BhcnNlVGltZXN0YW1wcydcblxuLyoqXG4gKiBQYXJzZSBhIFNSVCBvciBXZWJWVFQgc3RyaW5nLlxuICogQHBhcmFtIHtTdHJpbmd9IHNydE9yVnR0XG4gKiBAcmV0dXJuIHtBcnJheX0gc3VidGl0bGVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2UgKHNydE9yVnR0KSB7XG4gIGlmICghc3J0T3JWdHQpIHJldHVybiBbXVxuXG4gIGNvbnN0IHNvdXJjZSA9IHNydE9yVnR0XG4gICAgLnRyaW0oKVxuICAgIC5jb25jYXQoJ1xcbicpXG4gICAgLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJylcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCAnXFxuXFxuJylcbiAgICAucmVwbGFjZSgvXldFQlZUVC4qXFxuKD86Lio6IC4qXFxuKSpcXG4vLCAnJylcbiAgICAuc3BsaXQoJ1xcbicpXG5cbiAgcmV0dXJuIHNvdXJjZS5yZWR1Y2UoKGNhcHRpb25zLCByb3csIGluZGV4KSA9PiB7XG4gICAgY29uc3QgY2FwdGlvbiA9IGNhcHRpb25zW2NhcHRpb25zLmxlbmd0aCAtIDFdXG5cbiAgICBpZiAoIWNhcHRpb24uaW5kZXgpIHtcbiAgICAgIGlmICgvXlxcZCskLy50ZXN0KHJvdykpIHtcbiAgICAgICAgY2FwdGlvbi5pbmRleCA9IHBhcnNlSW50KHJvdywgMTApXG4gICAgICAgIHJldHVybiBjYXB0aW9uc1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2FwdGlvbi5oYXNPd25Qcm9wZXJ0eSgnc3RhcnQnKSkge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gcGFyc2VUaW1lc3RhbXBzKHJvdylcbiAgICAgIGlmICh0aW1lc3RhbXApIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjYXB0aW9uLCB0aW1lc3RhbXApXG4gICAgICB9IGVsc2UgaWYgKGNhcHRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY2FwdGlvbnNbY2FwdGlvbnMubGVuZ3RoIC0gMl0udGV4dCArPSAnXFxuJyArIHJvd1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNhcHRpb25zXG4gICAgfVxuXG4gICAgaWYgKHJvdyA9PT0gJycpIHtcbiAgICAgIGRlbGV0ZSBjYXB0aW9uLmluZGV4XG4gICAgICBpZiAoaW5kZXggIT09IHNvdXJjZS5sZW5ndGggLSAxKSB7XG4gICAgICAgIGNhcHRpb25zLnB1c2goe30pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24udGV4dFxuICAgICAgICA/IGNhcHRpb24udGV4dCArICdcXG4nICsgcm93XG4gICAgICAgIDogcm93XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zXG4gIH0sIFt7fV0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFRpbWVzdGFtcCByZWdleFxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xuXG5jb25zdCBSRSA9IC9eKCg/OlxcZHsyLH06KT9cXGR7Mn06XFxkezJ9WywuXVxcZHszfSkgLS0+ICgoPzpcXGR7Mix9Oik/XFxkezJ9OlxcZHsyfVssLl1cXGR7M30pKD86ICguKikpPyQvXG5cbi8qKlxuICogcGFyc2VUaW1lc3RhbXBzXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zIHt7c3RhcnQ6IE51bWJlciwgZW5kOiBOdW1iZXJ9fVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlVGltZXN0YW1wcyAodmFsdWUpIHtcbiAgY29uc3QgbWF0Y2ggPSBSRS5leGVjKHZhbHVlKVxuICBpZiAobWF0Y2gpIHtcbiAgICBjb25zdCBjdWUgPSB7XG4gICAgICBzdGFydDogdG9NUyhtYXRjaFsxXSksXG4gICAgICBlbmQ6IHRvTVMobWF0Y2hbMl0pXG4gICAgfVxuICAgIGlmIChtYXRjaFszXSkge1xuICAgICAgY3VlLnNldHRpbmdzID0gbWF0Y2hbM11cbiAgICB9XG4gICAgcmV0dXJuIGN1ZVxuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvTVMgZnJvbSAnLi90b01TJ1xuXG4vKipcbiAqIFJlc3luYyB0aGUgZ2l2ZW4gc3VidGl0bGVzLlxuICogQHBhcmFtIGNhcHRpb25zXG4gKiBAcGFyYW0gdGltZVxuICogQHJldHVybnMge0FycmF5fCp9XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzeW5jIChjYXB0aW9ucywgdGltZSkge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKGNhcHRpb24gPT4ge1xuICAgIGNvbnN0IHN0YXJ0ID0gdG9NUyhjYXB0aW9uLnN0YXJ0KSArIHRpbWVcbiAgICBjb25zdCBlbmQgPSB0b01TKGNhcHRpb24uZW5kKSArIHRpbWVcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjYXB0aW9uLCB7XG4gICAgICBzdGFydCxcbiAgICAgIGVuZFxuICAgIH0pXG4gIH0pXG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuaW1wb3J0IHRvU3J0VGltZSBmcm9tICcuL3RvU3J0VGltZSdcblxuLyoqXG4gKiBTdHJpbmdpZnkgdGhlIGdpdmVuIGFycmF5IG9mIGNhcHRpb25zLlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gc3J0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5IChjYXB0aW9ucykge1xuICByZXR1cm4gY2FwdGlvbnMubWFwKChjYXB0aW9uLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ1xcbicgOiAnJykgKyBbXG4gICAgICBpbmRleCArIDEsXG4gICAgICBgJHt0b1NydFRpbWUoY2FwdGlvbi5zdGFydCl9IC0tPiAke3RvU3J0VGltZShjYXB0aW9uLmVuZCl9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmltcG9ydCB0b1Z0dFRpbWUgZnJvbSAnLi90b1Z0dFRpbWUnXG5cbi8qKlxuICogU3RyaW5naWZ5IHRoZSBnaXZlbiBhcnJheSBvZiBjYXB0aW9ucyB0byBXZWJWVFQgZm9ybWF0LlxuICogQHBhcmFtIHtBcnJheX0gY2FwdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ30gd2ViVnR0XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5VnR0IChjYXB0aW9ucykge1xuICByZXR1cm4gJ1dFQlZUVFxcblxcbicgKyBjYXB0aW9ucy5tYXAoKGNhcHRpb24sIGluZGV4KSA9PiB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnXFxuJyA6ICcnKSArIFtcbiAgICAgIGluZGV4ICsgMSxcbiAgICAgIGAke3RvVnR0VGltZShjYXB0aW9uLnN0YXJ0KX0gLS0+ICR7dG9WdHRUaW1lKGNhcHRpb24uZW5kKX0ke2NhcHRpb24uc2V0dGluZ3MgPyAnICcgKyBjYXB0aW9uLnNldHRpbmdzIDogJyd9YCxcbiAgICAgIGNhcHRpb24udGV4dFxuICAgIF0uam9pbignXFxuJylcbiAgfSkuam9pbignXFxuJykgKyAnXFxuJ1xufVxuIiwiLyoqXG4gKiBSZXR1cm4gdGhlIGdpdmVuIFNSVCB0aW1lc3RhbXAgYXMgbWlsbGVzZWNvbmRzLlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSB0aW1lc3RhbXBcbiAqIEByZXR1cm5zIHtudW1iZXJ9IG1pbGxpc2Vjb25kc1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvTVMgKHRpbWVzdGFtcCkge1xuICBpZiAoIWlzTmFOKHRpbWVzdGFtcCkpIHtcbiAgICByZXR1cm4gdGltZXN0YW1wXG4gIH1cblxuICBjb25zdCBtYXRjaCA9IHRpbWVzdGFtcC5tYXRjaCgvXig/OihcXGR7Mix9KTopPyhcXGR7Mn0pOihcXGR7Mn0pWywuXShcXGR7M30pJC8pXG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBTUlQgb3IgVlRUIHRpbWUgZm9ybWF0OiBcIicgKyB0aW1lc3RhbXAgKyAnXCInKVxuICB9XG5cbiAgY29uc3QgaG91cnMgPSBtYXRjaFsxXSA/IHBhcnNlSW50KG1hdGNoWzFdLCAxMCkgKiAzNjAwMDAwIDogMFxuICBjb25zdCBtaW51dGVzID0gcGFyc2VJbnQobWF0Y2hbMl0sIDEwKSAqIDYwMDAwXG4gIGNvbnN0IHNlY29uZHMgPSBwYXJzZUludChtYXRjaFszXSwgMTApICogMTAwMFxuICBjb25zdCBtaWxsaXNlY29uZHMgPSBwYXJzZUludChtYXRjaFs0XSwgMTApXG5cbiAgcmV0dXJuIGhvdXJzICsgbWludXRlcyArIHNlY29uZHMgKyBtaWxsaXNlY29uZHNcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFNSVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvU3J0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LCR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5pbXBvcnQgemVyb0ZpbGwgZnJvbSAnemVyby1maWxsJ1xuXG4vKipcbiAqIFJldHVybiB0aGUgZ2l2ZW4gbWlsbGlzZWNvbmRzIGFzIFdlYlZUVCB0aW1lc3RhbXAuXG4gKiBAcGFyYW0gdGltZXN0YW1wXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvVnR0VGltZSAodGltZXN0YW1wKSB7XG4gIGlmIChpc05hTih0aW1lc3RhbXApKSB7XG4gICAgcmV0dXJuIHRpbWVzdGFtcFxuICB9XG5cbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIDAsIDAsIHRpbWVzdGFtcClcblxuICBjb25zdCBob3VycyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0SG91cnMoKSlcbiAgY29uc3QgbWludXRlcyA9IHplcm9GaWxsKDIsIGRhdGUuZ2V0TWludXRlcygpKVxuICBjb25zdCBzZWNvbmRzID0gemVyb0ZpbGwoMiwgZGF0ZS5nZXRTZWNvbmRzKCkpXG4gIGNvbnN0IG1zID0gdGltZXN0YW1wIC0gKChob3VycyAqIDM2MDAwMDApICsgKG1pbnV0ZXMgKiA2MDAwMCkgKyAoc2Vjb25kcyAqIDEwMDApKVxuXG4gIHJldHVybiBgJHtob3Vyc306JHttaW51dGVzfToke3NlY29uZHN9LiR7emVyb0ZpbGwoMywgbXMpfWBcbn1cbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIi8qKlxuICogR2l2ZW4gYSBudW1iZXIsIHJldHVybiBhIHplcm8tZmlsbGVkIHN0cmluZy5cbiAqIEZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjY3MjgzL1xuICogQHBhcmFtICB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtICB7bnVtYmVyfSBudW1iZXJcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB6ZXJvRmlsbCAod2lkdGgsIG51bWJlciwgcGFkKSB7XG4gIGlmIChudW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobnVtYmVyLCBwYWQpIHtcbiAgICAgIHJldHVybiB6ZXJvRmlsbCh3aWR0aCwgbnVtYmVyLCBwYWQpXG4gICAgfVxuICB9XG4gIGlmIChwYWQgPT09IHVuZGVmaW5lZCkgcGFkID0gJzAnXG4gIHdpZHRoIC09IG51bWJlci50b1N0cmluZygpLmxlbmd0aFxuICBpZiAod2lkdGggPiAwKSByZXR1cm4gbmV3IEFycmF5KHdpZHRoICsgKC9cXC4vLnRlc3QobnVtYmVyKSA/IDIgOiAxKSkuam9pbihwYWQpICsgbnVtYmVyXG4gIHJldHVybiBudW1iZXIgKyAnJ1xufVxuIiwiaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgVUkgZnJvbSBcIi4vdWlcIlxuaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiXG5pbXBvcnQgTmV0ZmxpeCBmcm9tIFwiLi9zZXJ2aWNlcy9uZXRmbGl4XCJcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuXG5jbGFzcyBFdmVudHNIYW5kbGVycyB7XG4gIHZpZGVvRWxlbWVudDogSFRNTFZpZGVvRWxlbWVudDtcbiAgc3Viczogc3ViVGl0bGVUeXBlW107XG4gIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgdHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgdHJhbnNsYXRlUmVzdWx0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICB0cmFuc2xhdGVBbHRlcm5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBzdWJzQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcih2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQsIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQgPSB2aWRlb0VsZW1lbnQ7XG4gICAgdGhpcy5zdWJzID0gc3VicztcbiAgICB0aGlzLnN1YnNFbGVtZW50ID0gc3Vic0VsZW1lbnQ7XG4gICAgdGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50ID0gc3Vic1Byb2dyZXNzQmFyRWxlbWVudDtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gdGhpcy5jcmVhdGVSZXNpemVPYnNlcnZlcigpXG4gICAgdGhpcy5rZXlib2FyZEhhbmRsZXIgPSB0aGlzLmtleWJvYXJkSGFuZGxlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzV29yZE1vdXNlT3ZlciA9IHRoaXMuc3Vic1dvcmRNb3VzZU92ZXIuYmluZCh0aGlzKVxuICAgIHRoaXMudmlkZW9PblRpbWVVcGRhdGUgPSB0aGlzLnZpZGVvT25UaW1lVXBkYXRlLmJpbmQodGhpcylcbiAgICB0aGlzLnZpZGVvUGF1c2UgPSB0aGlzLnZpZGVvUGF1c2UuYmluZCh0aGlzKVxuICAgIHRoaXMuY3JlYXRlUmVzaXplT2JzZXJ2ZXIgPSB0aGlzLmNyZWF0ZVJlc2l6ZU9ic2VydmVyLmJpbmQodGhpcylcbiAgICB0aGlzLnN1YnNNb3VzZUVudGVyID0gdGhpcy5zdWJzTW91c2VFbnRlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdWJzTW91c2VMZWF2ZSA9IHRoaXMuc3Vic01vdXNlTGVhdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc3Vic0NsaWNrID0gdGhpcy5zdWJzQ2xpY2suYmluZCh0aGlzKVxuICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtb3JpZ2luYWxcIilcbiAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVhc3lzdWJzLXRyYW5zbGF0ZS1yZXN1bHRcIilcbiAgICB0aGlzLnRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlXCIpXG4gICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lYXN5c3Vicy10cmFuc2xhdGUtY29udGFpbmVyXCIpXG4gICAgdGhpcy5zdWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlYXN5c3Vic1wiKTtcbiAgfVxuXG4gIGFkZEV2ZW50cygpIHtcbiAgICBjb25zdCBzdWJzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlYXN5c3Vic1wiKTtcbiAgICBbXCJrZXl1cFwiLCBcImtleWRvd25cIiwgXCJrZXlwcmVzc1wiXS5mb3JFYWNoKGV2ZW50VHlwZSA9PiB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdGhpcy5rZXlib2FyZEhhbmRsZXIsIHRydWUpO1xuICAgIH0pXG4gICAgdGhpcy5zdWJzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuc3Vic01vdXNlRW50ZXIpO1xuICAgIHRoaXMuc3Vic0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0aGlzLnN1YnNNb3VzZUxlYXZlKTtcbiAgICB0aGlzLnN1YnNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCB0aGlzLnN1YnNXb3JkTW91c2VPdmVyKTtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCB0aGlzLnZpZGVvT25UaW1lVXBkYXRlKTtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwicGF1c2VcIiwgdGhpcy52aWRlb1BhdXNlKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1YnNDbGljayk7XG4gIH1cblxuICByZW1vdmVFdmVudHMoKSB7XG4gICAgW1wia2V5dXBcIiwgXCJrZXlkb3duXCIsIFwia2V5cHJlc3NcIl0uZm9yRWFjaChldmVudFR5cGUgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIHRoaXMua2V5Ym9hcmRIYW5kbGVyLCB0cnVlKTtcbiAgICB9KVxuICAgIHRoaXMuc3Vic0NvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCB0aGlzLnN1YnNNb3VzZUVudGVyKTtcbiAgICB0aGlzLnN1YnNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgdGhpcy5zdWJzTW91c2VMZWF2ZSk7XG4gICAgdGhpcy5zdWJzQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdGhpcy5zdWJzV29yZE1vdXNlT3Zlcik7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgdGhpcy52aWRlb09uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhdXNlXCIsIHRoaXMudmlkZW9QYXVzZSk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KTtcbiAgICB0aGlzLnN1YnNFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN1YnNDbGljayk7XG4gIH1cblxuICBwcml2YXRlIGtleWJvYXJkSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIC8vIFRPRE86IFJlZmFjdG9yIHRvIHNlcnZpY2UgbWV0aG9kXG4gICAgaWYgKFV0aWxzLmRldGVjdFNlcnZpY2UoKS5jb25zdHJ1Y3Rvci5uYW1lID09IFwiTmV0ZmxpeFwiKSB7IHJldHVybiB9XG5cbiAgICBpZiAoZXZlbnQuY29kZSA9PSBcIkFycm93TGVmdFwiKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmIChldmVudC50eXBlID09IFwia2V5ZG93blwiKSB7IFZpZGVvLm1vdmVUb1ByZXZTdWIodGhpcy52aWRlb0VsZW1lbnQsIHRoaXMuc3VicywgdGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KSB9XG4gICAgfSBpZiAoZXZlbnQuY29kZSA9PSBcIkFycm93UmlnaHRcIikge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBpZiAoZXZlbnQudHlwZSA9PSBcImtleWRvd25cIikgeyBWaWRlby5tb3ZlVG9OZXh0U3ViKHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMuc3Vic1Byb2dyZXNzQmFyRWxlbWVudCkgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Vic01vdXNlRW50ZXIoKSB7XG4gICAgdGhpcy52aWRlb0VsZW1lbnQucGF1c2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBzdWJzTW91c2VMZWF2ZSgpIHtcbiAgICB0aGlzLnZpZGVvRWxlbWVudC5wbGF5KClcbiAgICB3aW5kb3cuc2hvd1RyYW5zbGF0aW9uID0gZmFsc2VcbiAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzV29yZE1vdXNlT3ZlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5jbGFzc05hbWUgPT09ICdlYXN5c3Vicy13b3JkJykge1xuICAgICAgY29uc3Qgd29yZHMgPSBlbGVtZW50LnRleHRDb250ZW50Lm1hdGNoKC9bXlxcV1xcZF0oXFx3fFstJ117MSwyfSg/PVxcdykpKi8pXG4gICAgICBpZiAod29yZHMgPT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICB3aW5kb3cuc2hvd1RyYW5zbGF0aW9uID0gdHJ1ZVxuXG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGNvbnRlbnRTY3JpcHRRdWVyeTogJ2dldFNpbmdsZVRyYW5zbGF0aW9uJywgdGV4dDogd29yZHNbMF0sIGxhbmc6IFwicnVcIiB9LCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgbWFpblRyYW5zbGF0aW9uID0gcmVzcG9uc2VbMF1bMF1bMF1cbiAgICAgICAgY29uc3QgYWx0ZXJuYXRpdmVUcmFuc2xhdGlvbnMgPSByZXNwb25zZVsxXSB8fCBbXVxuXG4gICAgICAgIFVJLnNldFRyYW5zbGF0aW9uKFxuICAgICAgICAgIHRoaXMudHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudCxcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZU9yaWdpbmFsRWxlbWVudCxcbiAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQsXG4gICAgICAgICAgd29yZHNbMF0sXG4gICAgICAgICAgbWFpblRyYW5zbGF0aW9uLFxuICAgICAgICAgIHRoaXMudHJhbnNsYXRlQWx0ZXJuYXRpdmVFbGVtZW50LFxuICAgICAgICAgIGFsdGVybmF0aXZlVHJhbnNsYXRpb25zXG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlkZW9PblRpbWVVcGRhdGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgY3VycmVudFN1YiA9IFN1YnMudXBkYXRlU3Vicyh0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0aGlzLnN1YnNFbGVtZW50KTtcbiAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0Jhcih0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRoaXMudmlkZW9FbGVtZW50LnBhdXNlZCk7XG4gICAgaWYgKGN1cnJlbnRTdWIgPT0gbnVsbCAmJiB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQuc3R5bGUuZGlzcGxheSAhPSBcIm5vbmVcIikge1xuICAgICAgdGhpcy50cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpZGVvUGF1c2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIodGhpcy5zdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LCB0aGlzLnZpZGVvRWxlbWVudCwgdGhpcy5zdWJzLCB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICBTdWJzLnVwZGF0ZVN1YnNQcm9ncmVzc0Jhcih0aGlzLnN1YnNQcm9ncmVzc0JhckVsZW1lbnQsIHRoaXMudmlkZW9FbGVtZW50LCB0aGlzLnN1YnMsIHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgdGV4dCA9IHRoaXMuc3Vic0VsZW1lbnQudGV4dENvbnRlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gPEhUTUxTcGFuRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICBpZiAoZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWFzeXN1YnMtd29yZC10cmFuc2xhdGVcIikubGVuZ3RoICE9IDApIHsgcmV0dXJuOyB9XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBjb250ZW50U2NyaXB0UXVlcnk6ICd0cmFuc2xhdGUnLCB0ZXh0OiB0ZXh0LCBsYW5nOiBcInJ1XCIgfSwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICBVdGlscy5yZW1vdmVBbGxFbGVtZW50cyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVhc3lzdWJzLXdvcmQtdHJhbnNsYXRlXCIpKTtcbiAgICAgIFVJLnNldFRyYW5zbGF0aW9uKFxuICAgICAgICB0aGlzLnRyYW5zbGF0ZUNvbnRhaW5lckVsZW1lbnQsXG4gICAgICAgIHRoaXMudHJhbnNsYXRlT3JpZ2luYWxFbGVtZW50LFxuICAgICAgICB0aGlzLnRyYW5zbGF0ZVJlc3VsdEVsZW1lbnQsXG4gICAgICAgIHRleHQsXG4gICAgICAgIHJlc3BvbnNlLmRhdGFbMF0sXG4gICAgICAgIHRoaXMudHJhbnNsYXRlQWx0ZXJuYXRpdmVFbGVtZW50LFxuICAgICAgICBbXVxuICAgICAgKVxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50c0hhbmRsZXJzO1xuIiwiaW1wb3J0IHsgcmVhZHkgfSBmcm9tIFwiLi9yZWFkeVwiXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgVUkgZnJvbSBcIi4vdWlcIlxuaW1wb3J0IEV2ZW50c0hhbmRsZXJzIGZyb20gXCIuL2V2ZW50c19oYW5kbGVyc1wiXG5pbXBvcnQgWW91VHViZSBmcm9tIFwiLi9zZXJ2aWNlcy95b3V0dWJlXCI7XG5pbXBvcnQgTmV0ZmxpeCBmcm9tIFwiLi9zZXJ2aWNlcy9uZXRmbGl4XCI7XG5pbXBvcnQgT252aXggZnJvbSBcIi4vc2VydmljZXMvb252aXhcIjtcbmltcG9ydCBLaW5vUHViIGZyb20gXCIuL3NlcnZpY2VzL2tpbm9wdWJcIjtcblxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe30sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICBjb25zdCBzZXJ2aWNlID0gVXRpbHMuZGV0ZWN0U2VydmljZSgpXG4gIGlmIChzZXJ2aWNlID09IG51bGwpIHsgcmV0dXJuIH1cblxuICBjb25zb2xlLmxvZyhcIkVhc3lTdWJzIGluaXRpYWxpemVkLiBTZXJ2aWNlOiBcIiArIHNlcnZpY2UuY29uc3RydWN0b3IubmFtZSk7XG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICB3aW5kb3cuaW5pdGlhbGl6ZUluUHJvZ3Jlc3MgPSBmYWxzZVxuXG4gIHJlYWR5KCd2aWRlbycsIGZ1bmN0aW9uICh2aWRlb0VsZW1lbnQ6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICBpbml0aWFsaXplKHNlcnZpY2UsIHZpZGVvRWxlbWVudClcbiAgICBsZXQgZXZlbnRzSGFuZGxlcjogRXZlbnRzSGFuZGxlcnMgPSBudWxsXG4gICAgbGV0IG9sZEhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICBpZiAob2xkSHJlZiAhPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmKSB7XG4gICAgICAgICAgaWYgKGV2ZW50c0hhbmRsZXIpIHsgZXZlbnRzSGFuZGxlci5yZW1vdmVFdmVudHMoKTsgfVxuICAgICAgICAgIGluaXRpYWxpemUoc2VydmljZSwgdmlkZW9FbGVtZW50KVxuICAgICAgICAgIG9sZEhyZWYgPSBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgY29uZmlnID0geyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLCBjb25maWcpO1xuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZShzZXJ2aWNlOiBZb3VUdWJlIHwgTmV0ZmxpeCB8IE9udml4IHwgS2lub1B1YiwgdmlkZW9FbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgICBpZiAod2luZG93LmluaXRpYWxpemVJblByb2dyZXNzKSB7IHJldHVybiB9XG4gICAgICB3aW5kb3cuaW5pdGlhbGl6ZUluUHJvZ3Jlc3MgPSB0cnVlXG4gICAgICB3aW5kb3cuc2hvd1RyYW5zbGF0aW9uID0gdHJ1ZVxuXG4gICAgICBjb25zdCBwbGF5ZXJDb250YWluZXJFbGVtZW50ID0gc2VydmljZS5wbGF5ZXJDb250YWluZXJFbGVtZW50KClcblxuICAgICAgbGV0IHN1YnNFbGVtZW50ID0gVUkuY3JlYXRlU3Vic0VsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudCk7XG4gICAgICBsZXQgc3Vic1Byb2dyZXNzQmFyRWxlbWVudCA9IFVJLmNyZWF0ZVN1YnNQcm9ncmVzc0JhckVsZW1lbnQocGxheWVyQ29udGFpbmVyRWxlbWVudCk7XG5cbiAgICAgIHNlcnZpY2UuZ2V0U3VicyhcImVuZ1wiKVxuICAgICAgICAudGhlbihzdWJzID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlN1YnRpdGxlcyBsb2FkZWQuIHN1YnMgY291bnQ6IFwiICsgc3Vicy5sZW5ndGgpXG5cbiAgICAgICAgICBzdWJzRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7IC8vIENsZWFyIHN1YnMgbG9hZGluZyB0ZXh0XG4gICAgICAgICAgZXZlbnRzSGFuZGxlciA9IG5ldyBFdmVudHNIYW5kbGVycyh2aWRlb0VsZW1lbnQsIHN1YnMsIHN1YnNFbGVtZW50LCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KVxuICAgICAgICAgIGV2ZW50c0hhbmRsZXIuYWRkRXZlbnRzKCk7XG4gICAgICAgICAgd2luZG93LmluaXRpYWxpemVJblByb2dyZXNzID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbnRlcmZhY2UgTGlzdGVuZXIge1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBmbjogRnVuY3Rpb247XG59XG5cbmludGVyZmFjZSBFbGVtZW50T2JqZWN0IHtcbiAgcmVhZHk6IGJvb2xlYW5cbn1cbmxldCBsaXN0ZW5lcnM6IExpc3RlbmVyW10gPSBbXVxubGV0IG9ic2VydmVyXG5cbmZ1bmN0aW9uIGNoZWNrKCkge1xuICAvLyBDaGVjayB0aGUgRE9NIGZvciBlbGVtZW50cyBtYXRjaGluZyBhIHN0b3JlZCBzZWxlY3RvclxuICBmb3IgKHZhciBpID0gMCwgbGVuOiBOdW1iZXIgPSBsaXN0ZW5lcnMubGVuZ3RoLCBsaXN0ZW5lcjogTGlzdGVuZXIsIGVsZW1lbnRzOiBFbGVtZW50T2JqZWN0W107IGkgPCBsZW47IGkrKykge1xuICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuICAgIC8vIFF1ZXJ5IGZvciBlbGVtZW50cyBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHNlbGVjdG9yXG4gICAgZWxlbWVudHMgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChsaXN0ZW5lci5zZWxlY3RvcikgYXMgdW5rbm93biBhcyBFbGVtZW50T2JqZWN0W107XG4gICAgZm9yICh2YXIgaiA9IDAsIGpMZW4gPSBlbGVtZW50cy5sZW5ndGgsIGVsZW1lbnQ7IGogPCBqTGVuOyBqKyspIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY2FsbGJhY2sgaXNuJ3QgaW52b2tlZCB3aXRoIHRoZSBcbiAgICAgIC8vIHNhbWUgZWxlbWVudCBtb3JlIHRoYW4gb25jZVxuICAgICAgaWYgKCFlbGVtZW50LnJlYWR5KSB7XG4gICAgICAgIGVsZW1lbnQucmVhZHkgPSB0cnVlO1xuICAgICAgICAvLyBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGVsZW1lbnRcbiAgICAgICAgbGlzdGVuZXIuZm4uY2FsbChlbGVtZW50LCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWR5KHNlbGVjdG9yOiBzdHJpbmcsIGZuOiBGdW5jdGlvbikge1xuICAvLyBTdG9yZSB0aGUgc2VsZWN0b3IgYW5kIGNhbGxiYWNrIHRvIGJlIG1vbml0b3JlZFxuICBsaXN0ZW5lcnMucHVzaCh7XG4gICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgIGZuOiBmblxuICB9KTtcblxuICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNoZWNrKTtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZSh3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbiAgfSk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSBET01cbiAgY2hlY2soKTtcbn1cbiIsImltcG9ydCBTZXJ2aWNlIGZyb20gJ3NlcnZpY2UnXG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUsIHBhcnNlIH0gZnJvbSAnc3VidGl0bGUnXG5pbXBvcnQgSGxzIGZyb20gXCJobHMuanNcIlxuaW1wb3J0IHsgUGFyc2VyIH0gZnJvbSAnbTN1OC1wYXJzZXInO1xuXG5pbnRlcmZhY2UgUGFyc2VyIHtcbn1cblxuY2xhc3MgS2lub1B1YiBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuICBhc3luYyBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZWFzb25BbmRFcGlzb2RlID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgIC5tYXRjaChuZXcgUmVnRXhwKFwiL2l0ZW0vdmlldy8uKi9cIiArIFwiKC4qKVwiKSlbMV1cbiAgICAgIC5tYXRjaChuZXcgUmVnRXhwKFwicyhbMC05XSspZShbMC05XSspXCIpKVxuXG4gICAgLy8gUHJldmVudCBleGNlcHRpb25zIG9uIGxvYWRlciB2aWRlbyBwYWdlXG4gICAgaWYgKHNlYXNvbkFuZEVwaXNvZGUgPT0gbnVsbCkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHBhcnNlKFwiXCIpKSB9XG4gICAgY29uc3Qgc2Vhc29uID0gc2Vhc29uQW5kRXBpc29kZVsxXVxuICAgIGNvbnN0IGVwaXNvZGUgPSBzZWFzb25BbmRFcGlzb2RlWzJdXG5cbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIikucXVlcnlTZWxlY3RvcihcInNjcmlwdFwiKVxuICAgIGNvbnN0IHBsYXlsaXN0ID0gZXZhbChzY3JpcHQuaW5uZXJIVE1MLnNwbGl0KFwidmFyIHBsYXlsaXN0ID0gXCIpWzFdKTtcbiAgICBjb25zdCBjdXJyZW50RXBpc29kZSA9IHBsYXlsaXN0LmZpbmQoKGVwOiB7IHNudW1iZXI6IG51bWJlciwgdm51bWJlcjogbnVtYmVyIH0pID0+IHtcbiAgICAgIHJldHVybiBlcC5zbnVtYmVyLnRvU3RyaW5nKCkgPT0gc2Vhc29uICYmIGVwLnZudW1iZXIudG9TdHJpbmcoKSA9PSBlcGlzb2RlXG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBmZXRjaChjdXJyZW50RXBpc29kZS5maWxlKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC50ZXh0KCk7XG5cbiAgICB2YXIgcGFyc2VyID0gbmV3ICg8YW55PlBhcnNlcikoKTtcbiAgICBwYXJzZXIucHVzaChkYXRhKTtcbiAgICBwYXJzZXIuZW5kO1xuICAgIGNvbnN0IHN1YnNTZWdtZW50cyA9IHBhcnNlci5tYW5pZmVzdC5tZWRpYUdyb3Vwcy5TVUJUSVRMRVMuc3ViO1xuICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHN1YnNTZWdtZW50cykuZmluZChrZXlfMSA9PiBrZXlfMS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGxhbmd1YWdlKSk7XG4gICAgY29uc3QgdXJpID0gXCJodHRwczovL2Nkbi5zdHJlYW1ib3guaW5cIiArIHN1YnNTZWdtZW50c1trZXldLnVyaTtcblxuICAgIGNvbnN0IHN1YnNTZWdtZW50c1Jlc3AgPSBhd2FpdCBmZXRjaCh1cmkpO1xuICAgIGNvbnN0IHN1YnNTZWdtZW50c0RhdGEgPSBhd2FpdCBzdWJzU2VnbWVudHNSZXNwLnRleHQoKTtcblxuICAgIHZhciBzdWJzU2VnbWVudHNQYXJzZXIgPSBuZXcgKDxhbnk+UGFyc2VyKSgpO1xuICAgIHN1YnNTZWdtZW50c1BhcnNlci5wdXNoKHN1YnNTZWdtZW50c0RhdGEpO1xuICAgIHN1YnNTZWdtZW50c1BhcnNlci5lbmQ7XG4gICAgY29uc3Qgc3ViUGF0aCA9IHN1YnNTZWdtZW50c1BhcnNlci5tYW5pZmVzdC5zZWdtZW50c1swXS51cmkubWF0Y2goLy4qXFwvaGxzXFwvKC4qKVxcL3NlZy4qLylbMV07XG4gICAgY29uc3Qgc3ViVXJpID0gXCJodHRwczovL2Nkbi5zdHJlYW1ib3guaW4vcGQvXCIgKyBzdWJQYXRoO1xuXG4gICAgY29uc3Qgc3Vic1Jlc3AgPSBhd2FpdCBmZXRjaChzdWJVcmkpO1xuICAgIGNvbnN0IHN1YnNEYXRhID0gYXdhaXQgc3Vic1Jlc3AudGV4dCgpO1xuICAgIHJldHVybiBwYXJzZShzdWJzRGF0YSk7XG4gIH1cblxuICBwbGF5ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwbGF5ZXJcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBLaW5vUHViO1xuIiwiaW1wb3J0IFNlcnZpY2UgZnJvbSAnc2VydmljZSdcbmltcG9ydCB7IHN1YlRpdGxlVHlwZSwgcGFyc2UgfSBmcm9tICdzdWJ0aXRsZSdcbmltcG9ydCB7IGFscGhhM1RUb0FscGhhMiB9IGZyb20gXCJAY29zcGlyZWQvaTE4bi1pc28tbGFuZ3VhZ2VzXCI7XG5cbmNvbnN0IFdFQlZUVCA9ICd3ZWJ2dHQtbHNzZGgtaW9zOCc7XG5jb25zdCBNQUlOX1RJVExFID0gJy5wbGF5ZXItc3RhdHVzLW1haW4tdGl0bGUsIC5lbGxpcHNpemUtdGV4dD5oNCwgLnZpZGVvLXRpdGxlPmg0JztcbmNvbnN0IFNVQl9UWVBFUyA9IHtcbiAgJ3N1YnRpdGxlcyc6ICcnLFxuICAnY2xvc2VkY2FwdGlvbnMnOiAnW2NjXSdcbn07XG5cbmludGVyZmFjZSBUcmFjayB7XG4gIGlzTm9uZVRyYWNrOiBib29sZWFuLFxuICBpc0ZvcmNlZE5hcnJhdGl2ZTogYm9vbGVhbixcbiAgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgcmF3VHJhY2tUeXBlOiBcInN1YnRpdGxlc1wiIHwgXCJjbG9zZWRjYXB0aW9uc1wiLFxuICB0dERvd25sb2FkYWJsZXM6IHtcbiAgICBcIndlYnZ0dC1sc3NkaC1pb3M4XCI6IHtcbiAgICAgIGRvd25sb2FkVXJsczoge31cbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgTmV0ZmxpeCBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuICBzdWJDYWNoZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3ViQ2FjaGUgPSB7fVxuICAgIHRoaXMucHJvY2Vzc1N1YkRhdGEgPSB0aGlzLnByb2Nlc3NTdWJEYXRhLmJpbmQodGhpcylcbiAgICB0aGlzLmluamVjdFNjcmlwdCgpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vhc3lzdWJzX2RhdGEnLCB0aGlzLnByb2Nlc3NTdWJEYXRhKVxuICB9XG5cbiAgZ2V0U3VicyhsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2VBbHBoYTIgPSBhbHBoYTNUVG9BbHBoYTIobGFuZ3VhZ2UpXG4gICAgY29uc3QgY2NMYW5ndWFnZUFscGhhMiA9IGxhbmd1YWdlQWxwaGEyICsgU1VCX1RZUEVTWydjbG9zZWRjYXB0aW9ucyddXG4gICAgY29uc3QgbGFuZ0tleSA9IE9iamVjdC5rZXlzKHRoaXMuc3ViQ2FjaGUpLmZpbmQoa2V5ID0+IGtleSA9PSBsYW5ndWFnZUFscGhhMiB8fCBrZXkgPT0gY2NMYW5ndWFnZUFscGhhMilcblxuICAgIGNvbnN0IHN1YlVyaSA9IHRoaXMuc3ViQ2FjaGVbbGFuZ0tleV1cbiAgICByZXR1cm4gZmV0Y2goc3ViVXJpKVxuICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLnRleHQoKSlcbiAgICAgIC50aGVuKGRhdGEgPT4gcGFyc2UoZGF0YSkpXG4gIH1cblxuICBwbGF5ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5WaWRlb0NvbnRhaW5lclwiKVxuICB9XG5cbiAgcHJpdmF0ZSBpbmplY3Rpb24gPSAoKSA9PiB7XG4gICAgY29uc3QgV0VCVlRUID0gXCJ3ZWJ2dHQtbHNzZGgtaW9zOFwiO1xuICAgIC8vIGhpamFjayBKU09OLnBhcnNlIGFuZCBKU09OLnN0cmluZ2lmeSBmdW5jdGlvbnNcbiAgICAoKHBhcnNlLCBzdHJpbmdpZnkpID0+IHtcbiAgICAgIEpTT04ucGFyc2UgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICBjb25zdCBkYXRhID0gcGFyc2UodGV4dCk7XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEucmVzdWx0ICYmIGRhdGEucmVzdWx0LnRpbWVkdGV4dHRyYWNrcyAmJiBkYXRhLnJlc3VsdC5tb3ZpZUlkKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdlYXN5c3Vic19kYXRhJywgeyBkZXRhaWw6IGRhdGEucmVzdWx0IH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH07XG4gICAgICBKU09OLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChkYXRhOiBhbnkpIHtcblxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnBhcmFtcyAmJiBkYXRhLnBhcmFtcy5wcm9maWxlcykge1xuICAgICAgICAgIGRhdGEucGFyYW1zLnByb2ZpbGVzLnVuc2hpZnQoV0VCVlRUKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgfTtcbiAgICB9KShKU09OLnBhcnNlLCBKU09OLnN0cmluZ2lmeSk7XG4gIH1cblxuICBwcml2YXRlIHJhbmRvbVByb3BlcnR5ID0gKG9iajogYW55KSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgcmV0dXJuIG9ialtrZXlzW2tleXMubGVuZ3RoICogTWF0aC5yYW5kb20oKSA8PCAwXV07XG4gIH07XG5cbiAgcHJpdmF0ZSBwcm9jZXNzU3ViRGF0YShldmVudDogYW55KSB7XG4gICAgaWYgKGV2ZW50LmRldGFpbC52aWV3YWJsZVR5cGUgIT0gXCJFUElTT0RFXCIpIHsgcmV0dXJuIH1cbiAgICBjb25zdCB0cmFja3M6IFRyYWNrW10gPSBldmVudC5kZXRhaWwudGltZWR0ZXh0dHJhY2tzO1xuXG4gICAgZm9yIChjb25zdCB0cmFjayBvZiB0cmFja3MpIHtcbiAgICAgIGlmICh0cmFjay5pc05vbmVUcmFjaykgeyBjb250aW51ZSB9XG5cbiAgICAgIGxldCB0eXBlID0gU1VCX1RZUEVTW3RyYWNrLnJhd1RyYWNrVHlwZV07XG4gICAgICBpZiAodHlwZW9mIHR5cGUgPT09ICd1bmRlZmluZWQnKVxuICAgICAgICB0eXBlID0gYFske3RyYWNrLnJhd1RyYWNrVHlwZX1dYDtcbiAgICAgIGNvbnN0IGxhbmcgPSB0cmFjay5sYW5ndWFnZSArIHR5cGUgKyAodHJhY2suaXNGb3JjZWROYXJyYXRpdmUgPyAnLWZvcmNlZCcgOiAnJyk7XG5cbiAgICAgIHRoaXMuc3ViQ2FjaGVbbGFuZ10gPSB0aGlzLnJhbmRvbVByb3BlcnR5KHRyYWNrLnR0RG93bmxvYWRhYmxlc1tXRUJWVFRdLmRvd25sb2FkVXJscyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbmplY3RTY3JpcHQoKSB7XG4gICAgY29uc3Qgc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICBzYy5pbm5lckhUTUwgPSAnKCcgKyB0aGlzLmluamVjdGlvbi50b1N0cmluZygpICsgJykoKSc7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzYyk7XG4gICAgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZChzYyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmV0ZmxpeDtcbiIsImltcG9ydCB7IHBhcnNlLCBzdWJUaXRsZVR5cGUgfSBmcm9tIFwic3VidGl0bGVcIjtcbmltcG9ydCBVSSBmcm9tIFwiLi4vdWlcIlxuXG5jbGFzcyBPbnZpeCB7XG4gIGFzeW5jIGdldFN1YnMobGFuZ3VhZ2U6IHN0cmluZyk6IFByb21pc2U8c3ViVGl0bGVUeXBlW10+IHtcbiAgICBjb25zdCB2aWRlb1R5cGUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzFdXG4gICAgY29uc3QgYmFzZV9wYXRobmFtZSA9IFwiL2FwaS92MS9zdHJlYW1pbmcvXCJcbiAgICBjb25zdCB2aWRlb0lkID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXVxuICAgIGNvbnN0IHN0cmVhbSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzBdLnNwbGl0KFwiPVwiKVsxXVxuICAgIGNvbnN0IHNlYXNvbiA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzFdXG4gICAgY29uc3QgZXBpc29kZSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoXCImXCIpWzJdXG5cbiAgICBsZXQgdXJsID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0ke2Jhc2VfcGF0aG5hbWV9JHt2aWRlb1R5cGV9cy8ke3ZpZGVvSWR9LyR7c3RyZWFtfS5qc29uP2BcbiAgICBpZiAodmlkZW9UeXBlID09IFwic2VyaWFsXCIpIHsgdXJsID0gYCR7dXJsfSR7c2Vhc29ufSYke2VwaXNvZGV9YCB9XG5cbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcC5qc29uKCk7XG4gICAgY29uc3Qgc3Vic191cmwgPSBkYXRhLm1lZGlhX2ZpbGVzLnZ0dC5maW5kKChlbDogeyBzcmNsYW5nOiBzdHJpbmcgfSkgPT4gZWwuc3JjbGFuZyA9PT0gbGFuZ3VhZ2UpLnNyYztcbiAgICBjb25zdCByZXNwXzEgPSBhd2FpdCBmZXRjaChzdWJzX3VybCk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3BfMS50ZXh0KCk7XG4gICAgcmV0dXJuIHBhcnNlKHRleHQpO1xuICB9XG5cbiAgcGxheWVyQ29udGFpbmVyRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZnAtdWlcIilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBPbnZpeDtcbiIsImltcG9ydCBTZXJ2aWNlIGZyb20gJ3NlcnZpY2UnXG5pbXBvcnQgeyBzdWJUaXRsZVR5cGUsIHBhcnNlIH0gZnJvbSAnc3VidGl0bGUnXG5pbXBvcnQgeyBhbHBoYTNUVG9BbHBoYTIgfSBmcm9tIFwiQGNvc3BpcmVkL2kxOG4taXNvLWxhbmd1YWdlc1wiO1xuaW1wb3J0IFVJIGZyb20gXCIuLi91aVwiXG5cbmludGVyZmFjZSBTdWJ0aXRsZSB7XG4gIGJhc2VVcmw6IHN0cmluZ1xuICBpc1RyYW5zbGF0YWJsZTogYm9vbGVhblxuICBsYW5ndWFnZUNvZGU6IHN0cmluZ1xuICBuYW1lOiB7IHNpbXBsZVRleHQ6IHN0cmluZyB9XG4gIHZzc0lkOiBzdHJpbmdcbn1cblxuY2xhc3MgWW91VHViZSBpbXBsZW1lbnRzIFNlcnZpY2Uge1xuICBhc3luYyBnZXRTdWJzKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB2aWRlb0lkID0gdGhpcy5nZXRWaWRlb0lkKClcbiAgICBjb25zdCBsYW5nID0gYWxwaGEzVFRvQWxwaGEyKGxhbmd1YWdlKVxuXG4gICAgY29uc3Qgc3ViSXRlbSA9IGF3YWl0IHRoaXMuZ2V0VmlkZW9JbmZvKHZpZGVvSWQsIGxhbmcpO1xuICAgIGNvbnN0IHN1YlVyaTogc3RyaW5nID0gc3ViSXRlbS5iYXNlVXJsICsgXCImZm10PXZ0dFwiO1xuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHN1YlVyaSk7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0IHJlc3AudGV4dCgpO1xuICAgIHJldHVybiBwYXJzZSh0ZXh0KTtcbiAgfVxuXG4gIHBsYXllckNvbnRhaW5lckVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh0bWw1LXZpZGVvLXBsYXllclwiKVxuICB9XG5cbiAgZ2V0VmlkZW9JZCgpIHtcbiAgICBjb25zdCByZWdFeHByZXNzaW9uID0gL14uKih5b3V0dVxcLmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dKikuKi87XG4gICAgdmFyIG1hdGNoID0gd2luZG93LmxvY2F0aW9uLmhyZWYubWF0Y2gocmVnRXhwcmVzc2lvbik7XG4gICAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCA9PSAxMSkge1xuICAgICAgcmV0dXJuIG1hdGNoWzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ2FuJ3QgZ2V0IHlvdXR1YmUgdmlkZW8gaWRcIik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRWaWRlb0luZm8odmlkZW9JZDogc3RyaW5nLCBsYW5nOiBzdHJpbmcpIHtcbiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8veW91dHViZS5jb20vZ2V0X3ZpZGVvX2luZm8/dmlkZW9faWQ9JHt2aWRlb0lkfWApO1xuICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwLnRleHQoKTtcbiAgICBjb25zdCBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KHRleHQpO1xuXG4gICAgaWYgKCFkYXRhLmluY2x1ZGVzKCdjYXB0aW9uVHJhY2tzJykpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGNhcHRpb25zIGZvciB2aWRlbzogJHt2aWRlb0lkfWApO1xuXG4gICAgY29uc3QgcmVnZXggPSAvKHtcImNhcHRpb25UcmFja3NcIjouKmlzVHJhbnNsYXRhYmxlXCI6KHRydWV8ZmFsc2UpfV0pLztcbiAgICBjb25zdCBbbWF0Y2hdID0gcmVnZXguZXhlYyhkYXRhKTtcbiAgICBjb25zdCB7IGNhcHRpb25UcmFja3MgfSA9IEpTT04ucGFyc2UoYCR7bWF0Y2h9fWApO1xuXG4gICAgY29uc3Qgc3VidGl0bGU6IFN1YnRpdGxlID0gY2FwdGlvblRyYWNrcy5maW5kKCh0cmFjazogYW55KSA9PiB7IHJldHVybiB0cmFjay52c3NJZCA9PSBgLiR7bGFuZ31gOyB9KSB8fFxuICAgICAgY2FwdGlvblRyYWNrcy5maW5kKCh0cmFjazogYW55KSA9PiB7IHJldHVybiB0cmFjay52c3NJZCA9PSBgYS4ke2xhbmd9YDsgfSkgfHxcbiAgICAgIGNhcHRpb25UcmFja3MuZmluZCgodHJhY2s6IGFueSkgPT4geyByZXR1cm4gdHJhY2sudnNzSWQubWF0Y2goYC4ke2xhbmd9YCk7IH0pO1xuXG4gICAgaWYgKCFzdWJ0aXRsZSB8fCAoc3VidGl0bGUgJiYgIXN1YnRpdGxlLmJhc2VVcmwpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCAke2xhbmd9IGNhcHRpb25zIGZvciAke3ZpZGVvSWR9YCk7XG5cbiAgICByZXR1cm4gc3VidGl0bGU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWW91VHViZTtcbiIsImltcG9ydCB7IHN1YlRpdGxlVHlwZSB9IGZyb20gXCJzdWJ0aXRsZVwiO1xuaW1wb3J0IFZpZGVvIGZyb20gXCIuL3ZpZGVvXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBhbmltZSBmcm9tIFwiYW5pbWVqc1wiXG5cbmNvbnN0IHN1YnNBbmltYXRlRHVyYXRpb246IG51bWJlciA9IDMwMDtcbmNvbnN0IHN1YnNBbmltYXRlQ29tcGVuc2F0aW9uR2FwOiBudW1iZXIgPSBzdWJzQW5pbWF0ZUR1cmF0aW9uIC8gMiAvLyBNb3Rpb24gYW5pbWF0aW9uIGNvbXBlbnNhdGlvblxuXG5jbGFzcyBTdWJzIHtcbiAgc3RhdGljIHVwZGF0ZVN1YnModmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzRWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSBWaWRlby5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSB0aGlzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBzdWJzRWxlbWVudC5pbm5lckhUTUwgPSBjdXJyZW50U3ViLnRleHQucmVwbGFjZShcbiAgICAgICAgLyhefDxcXC8/W14+XSs+fFxccyspKFteXFxzPF0rKS9nLFxuICAgICAgICAnJDE8c3BhbiBjbGFzcz1cImVhc3lzdWJzLXdvcmRcIj4kMjwvc3Bhbj4nXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJzRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudFN1YlxuICB9XG5cbiAgc3RhdGljIGdldEN1cnJlbnRTdWIoc3Viczogc3ViVGl0bGVUeXBlW10sIGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcbiAgICByZXR1cm4gc3Vicy5maW5kKChzdWI6IHN1YlRpdGxlVHlwZSkgPT4gc3ViLnN0YXJ0IDw9IGN1cnJlbnRUaW1lICYmIHN1Yi5lbmQgPj0gY3VycmVudFRpbWUpXG4gIH1cblxuICBzdGF0aWMgZ2V0UHJldlN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViIC0gMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZCgoc3ViLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoc3Vic1tpbmRleCArIDFdID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWIuZW5kIDw9IGN1cnJlbnRUaW1lICYmIHN1YnNbaW5kZXggKyAxXS5zdGFydCA+PSBjdXJyZW50VGltZVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TmV4dFN1YihzdWJzOiBzdWJUaXRsZVR5cGVbXSwgY3VycmVudFRpbWU6IG51bWJlcik6IHN1YlRpdGxlVHlwZSB7XG4gICAgbGV0IGN1cnJlbnRTdWIgPSBTdWJzLmdldEN1cnJlbnRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICBsZXQgaW5kZXhDdXJyZW50U3ViID0gc3Vicy5maW5kSW5kZXgoc3ViID0+IHN1YiA9PSBjdXJyZW50U3ViKVxuICAgICAgcmV0dXJuIHN1YnNbaW5kZXhDdXJyZW50U3ViICsgMV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnMuZmluZChzdWIgPT4gc3ViLnN0YXJ0ID49IGN1cnJlbnRUaW1lKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudDogSFRNTEVsZW1lbnQsIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBzdWJzOiBzdWJUaXRsZVR5cGVbXSwgaGFyZE1vdmU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IHRpbWVQZXJpb2QgPSAzMDAwMDsgLy8gMzAgc2Vjb25kc1xuICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGNvbnN0IG1zSW5QeCA9IChwcm9ncmVzc0JhcldpZHRoIC8gdGltZVBlcmlvZClcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IFZpZGVvLmdldEN1cnJlbnRUaW1lKHZpZGVvKTtcbiAgICBjb25zdCBsZWZ0Qm9yZGVyID0gY3VycmVudFRpbWUgKyB0aW1lUGVyaW9kIC8gMjtcbiAgICBjb25zdCByaWdodEJvcmRlciA9IGN1cnJlbnRUaW1lIC0gdGltZVBlcmlvZCAvIDI7XG5cbiAgICBjb25zdCBzdWJzSW5EdXJhdGlvbiA9IHN1YnMuZmlsdGVyKHN1YiA9PlxuICAgICAgKHN1Yi5lbmQgPiByaWdodEJvcmRlciAmJiBzdWIuZW5kIDwgbGVmdEJvcmRlcikgfHxcbiAgICAgIChzdWIuc3RhcnQgPiByaWdodEJvcmRlciAmJiBzdWIuc3RhcnQgPCBsZWZ0Qm9yZGVyKVxuICAgICk7XG5cbiAgICBsZXQgY3VycmVudFN1YnNJZHM6IHN0cmluZ1tdID0gW11cbiAgICBpZiAoaGFyZE1vdmUpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyLWVsZW1lbnRcIikuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSlcbiAgICB9XG4gICAgc3Vic0luRHVyYXRpb24uZm9yRWFjaChzdWIgPT4ge1xuICAgICAgY29uc3Qgc3ViSWQgPSBcImlkXCIgKyBzdWIuc3RhcnQgKyBcIi1cIiArIHN1Yi5lbmRcbiAgICAgIGN1cnJlbnRTdWJzSWRzLnB1c2goc3ViSWQpXG4gICAgICBjb25zdCBjdXJyZW50U3ViID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3ViSWQpXG5cbiAgICAgIGlmIChjdXJyZW50U3ViKSB7XG4gICAgICAgIGFuaW1lKHtcbiAgICAgICAgICB0YXJnZXRzOiBjdXJyZW50U3ViLFxuICAgICAgICAgIHRyYW5zbGF0ZVg6IG1zSW5QeCAqICgoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLnN0YXJ0KSAtIHJpZ2h0Qm9yZGVyKSAtIHN1YnNBbmltYXRlQ29tcGVuc2F0aW9uR2FwKSxcbiAgICAgICAgICBlYXNpbmc6ICdsaW5lYXInLFxuICAgICAgICAgIGR1cmF0aW9uOiBzdWJzQW5pbWF0ZUR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3ViV2lkdGggPSBtc0luUHggKiAoVXRpbHMuY2FzdFN1YlRpbWUoc3ViLmVuZCkgLSBVdGlscy5jYXN0U3ViVGltZShzdWIuc3RhcnQpKVxuICAgICAgICBsZXQgc3ViRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3ViRGl2LmNsYXNzTmFtZSA9IFwiZWFzeXN1YnMtcHJvZ3Jlc3MtYmFyLWVsZW1lbnRcIlxuICAgICAgICBzdWJEaXYuaWQgPSBzdWJJZFxuICAgICAgICBzdWJEaXYuc3R5bGUud2lkdGggPSBzdWJXaWR0aC50b0ZpeGVkKDApICsgXCJweFwiXG4gICAgICAgIHN1YkRpdi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgbXNJblB4ICogKFV0aWxzLmNhc3RTdWJUaW1lKHN1Yi5zdGFydCkgLSByaWdodEJvcmRlcikgKyAncHgpJztcbiAgICAgICAgc3Vic1Byb2dyZXNzQmFyRWxlbWVudC5hcHBlbmRDaGlsZChzdWJEaXYpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBhc3luYyBmdW5jdGlvbiByZW1vdmVPbGRQcm9ncmVzc0JhckVsZW1lbnRzKHN1YnNJbkR1cmF0aW9uOiBzdWJUaXRsZVR5cGVbXSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lYXN5c3Vicy1wcm9ncmVzcy1iYXItZWxlbWVudFwiKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKGN1cnJlbnRTdWJzSWRzLmluY2x1ZGVzKGVsLmlkKSA9PSBmYWxzZSkge1xuICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVPbGRQcm9ncmVzc0JhckVsZW1lbnRzKHN1YnNJbkR1cmF0aW9uKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3VicztcbiIsImNsYXNzIFVJIHtcbiAgc3RhdGljIGNyZWF0ZVN1YnNFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3Qgc3Vic0NvbnRhaW5lckVsZW1lbnRJZCA9IFwiZWFzeXN1YnNcIjtcbiAgICBjb25zdCBwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdWJzQ29udGFpbmVyRWxlbWVudElkKVxuICAgIGlmIChwcmV2U3Vic0NvbnRhaW5lckVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgcHJldlN1YnNDb250YWluZXJFbGVtZW50LnJlbW92ZSgpXG4gICAgfVxuICAgIGxldCBzdWJzQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3Vic0NvbnRhaW5lckVsZW1lbnQuaWQgPSBzdWJzQ29udGFpbmVyRWxlbWVudElkO1xuXG4gICAgbGV0IHN1YnNJbm5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN1YnNJbm5lckVsZW1lbnQuY2xhc3NOYW1lID0gXCJlYXN5c3Vicy1zdWJ0aXRsZXNcIlxuICAgIHN1YnNDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHN1YnNJbm5lckVsZW1lbnQpO1xuXG4gICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkxvYWRpbmcgc3VidGl0bGVzIC4uLlwiKTtcbiAgICBzdWJzSW5uZXJFbGVtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgIHBsYXllckNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Vic0NvbnRhaW5lckVsZW1lbnQpO1xuICAgIHRoaXMuY3JlYXRlU3Vic1RyYW5zbGF0ZUVsZW1lbnQoc3Vic0NvbnRhaW5lckVsZW1lbnQpXG4gICAgcmV0dXJuIHN1YnNJbm5lckVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlU3Vic1RyYW5zbGF0ZUVsZW1lbnQoc3Vic0VsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHRyYW5zbGF0ZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdHJhbnNsYXRlVGFnLmNsYXNzTmFtZSA9IFwiZWFzeXN1YnMtdHJhbnNsYXRlLWNvbnRhaW5lclwiO1xuICAgIHRyYW5zbGF0ZVRhZy5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPSdlYXN5c3Vicy10cmFuc2xhdGUtcmVzdWx0Jz5cbiAgICAgICAgdGVzdCB0cmFuc2xhdGVcbiAgICAgIDwvZGl2PlxuICAgICAgPGhyPlxuICAgICAgPGRpdiBjbGFzcz0nZWFzeXN1YnMtdHJhbnNsYXRlLW9yaWdpbmFsJz5cbiAgICAgICAgdGVzdFxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPSdlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUnPlxuICAgICAgICBhbHRlcm5hdGl2ZSB0cmFuc2xhdGlvbnNcbiAgICAgIDwvZGl2PlxuICAgIGBcbiAgICBzdWJzRWxlbWVudC5wcmVwZW5kKHRyYW5zbGF0ZVRhZyk7XG4gIH1cblxuICBzdGF0aWMgc2V0VHJhbnNsYXRpb24odHJhbnNsYXRlQ29udGFpbmVyRWxlbWVudDogSFRNTEVsZW1lbnQsIG9yaWdpbmFsRWxlbWVudDogSFRNTEVsZW1lbnQsIHJlc3VsdEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBvcmlnaW5hbFRleHQ6IHN0cmluZywgcmVzdWx0VGV4dDogc3RyaW5nLCB0cmFuc2xhdGVBbHRlcm5hdGl2ZUVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uczogQXJyYXk8YW55Pikge1xuICAgIGlmICh3aW5kb3cuc2hvd1RyYW5zbGF0aW9uKSB7XG4gICAgICB0cmFuc2xhdGVDb250YWluZXJFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuICAgIG9yaWdpbmFsRWxlbWVudC5pbm5lckhUTUwgPSBvcmlnaW5hbFRleHRcbiAgICByZXN1bHRFbGVtZW50LmlubmVySFRNTCA9IHJlc3VsdFRleHRcblxuICAgIGxldCBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgPSBcIlwiXG4gICAgaWYgKGFsdGVybmF0aXZlVHJhbnNsYXRpb25zLmxlbmd0aCAhPSAwKSB7XG4gICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9ucy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgKz0gYFxuICAgICAgICAgIDxwIGNsYXNzPSdlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtcGFydC1zcGVlY2gnPlxuICAgICAgICAgICAgJHtlbGVtWzBdfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgYFxuICAgICAgICBlbGVtWzJdLnNsaWNlKDAsIDUpLmZvckVhY2goKGFsdGVybmF0aXZlOiBhbnkpID0+IHtcbiAgICAgICAgICBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWwgKz0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtaXRlbS10cmFuc2xhdGVcIj5cbiAgICAgICAgICAgICAgICAke2FsdGVybmF0aXZlWzBdfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLW9yaWdpbmFsXCI+XG4gICAgICAgICAgICAgICAgJHthbHRlcm5hdGl2ZVsxXS5zbGljZSgwLCAzKS5qb2luKCcsICcpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeVwiPlxuICAgICAgICAgICAgICAgICR7dGhpcy5mcmVxdWVuY3lUb0RvdHMoYWx0ZXJuYXRpdmVbM10pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGBcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHRyYW5zbGF0ZUFsdGVybmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBhbHRlcm5hdGl2ZVRyYW5zbGF0aW9uc0h0bWxcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTdWJzUHJvZ3Jlc3NCYXJFbGVtZW50KHBsYXllckNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHByb2dyZXNzQmFyQ2xhc3MgPSBcImVhc3lzdWJzLXByb2dyZXNzLWJhclwiXG4gICAgY29uc3QgcHJldlByb2dyZXNzQmFyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBwcm9ncmVzc0JhckNsYXNzKVxuICAgIGlmIChwcmV2UHJvZ3Jlc3NCYXJFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgIHByZXZQcm9ncmVzc0JhckVsZW1lbnQucmVtb3ZlKClcbiAgICB9XG5cbiAgICBsZXQgcHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBwcm9ncmVzc0JhckVsZW1lbnQuY2xhc3NOYW1lID0gcHJvZ3Jlc3NCYXJDbGFzcztcbiAgICBwbGF5ZXJDb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZXNzQmFyRWxlbWVudClcbiAgICByZXR1cm4gcHJvZ3Jlc3NCYXJFbGVtZW50XG4gIH1cblxuICBzdGF0aWMgZnJlcXVlbmN5VG9Eb3RzKGZyZXF1ZW5jeTogbnVtYmVyKSB7XG4gICAgY29uc3QgcmF0ZSA9IGZyZXF1ZW5jeSAqIDEwMDAwXG4gICAgaWYgKHJhdGUgPj0gNTAwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgYFxuICAgIH0gZWxzZSBpZiAocmF0ZSA8IDUwMCAmJiByYXRlID49IDMwKSB7XG4gICAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZmlsbFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWFzeXN1YnMtdHJhbnNsYXRlLWFsdGVybmF0aXZlLWl0ZW0tZnJlcXVlbmN5LWRvdCAtZW1wdHlcIj48L2Rpdj5cbiAgICAgIGBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeS1kb3QgLWZpbGxcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImVhc3lzdWJzLXRyYW5zbGF0ZS1hbHRlcm5hdGl2ZS1pdGVtLWZyZXF1ZW5jeS1kb3QgLWVtcHR5XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJlYXN5c3Vicy10cmFuc2xhdGUtYWx0ZXJuYXRpdmUtaXRlbS1mcmVxdWVuY3ktZG90IC1lbXB0eVwiPjwvZGl2PlxuICAgICAgYFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVSTtcbiIsImltcG9ydCBPbnZpeCBmcm9tICcuL3NlcnZpY2VzL29udml4JztcbmltcG9ydCBLaW5vUHViIGZyb20gJy4vc2VydmljZXMva2lub3B1Yic7XG5pbXBvcnQgWW91VHViZSBmcm9tICcuL3NlcnZpY2VzL3lvdXR1YmUnO1xuaW1wb3J0IE5ldGZsaXggZnJvbSAnLi9zZXJ2aWNlcy9uZXRmbGl4JztcblxuY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgY2FzdFN1YlRpbWUodGltZTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aW1lID09IFwibnVtYmVyXCIgPyB0aW1lIDogcGFyc2VJbnQodGltZSlcbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3RTZXJ2aWNlKCk6IFlvdVR1YmUgfCBOZXRmbGl4IHwgT252aXggfCBLaW5vUHViIHtcbiAgICBjb25zdCB0aXRsZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLnRleHRDb250ZW50XG4gICAgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcIllvdVR1YmVcIikgfHwgd2luZG93LmxvY2F0aW9uLmhvc3QgPT0gXCJ3d3cueW91dHViZS5jb21cIikge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJ5b3V0dWJlXCJcbiAgICAgIHJldHVybiBuZXcgWW91VHViZVxuICAgIH1cbiAgICBlbHNlIGlmICh0aXRsZUNvbnRlbnQuaW5jbHVkZXMoXCJOZXRmbGl4XCIpIHx8IHdpbmRvdy5sb2NhdGlvbi5ob3N0ID09IFwid3d3Lm5ldGZsaXguY29tXCIpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwibmV0ZmxpeFwiXG4gICAgICByZXR1cm4gbmV3IE5ldGZsaXhcbiAgICB9XG4gICAgZWxzZSBpZiAodGl0bGVDb250ZW50LmluY2x1ZGVzKFwiT252aXhcIikgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtjb250ZW50PVwiT05WSVhcIl0nKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmlkID0gXCJvbnZpeFwiXG4gICAgICByZXR1cm4gbmV3IE9udml4XG4gICAgfVxuICAgIGVsc2UgaWYgKHRpdGxlQ29udGVudC5pbmNsdWRlcyhcItCa0LjQvdC+0L/QsNCxXCIpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbY29udGVudD1cItCa0LjQvdC+0L/QsNCxXCJdJykpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5pZCA9IFwia2lub3B1YlwiXG4gICAgICByZXR1cm4gbmV3IEtpbm9QdWJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVBbGxFbGVtZW50cyhlbG1zOiBOb2RlTGlzdE9mPEVsZW1lbnQ+KSB7XG4gICAgZWxtcy5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsc1xuIiwiaW1wb3J0IFN1YnMgZnJvbSBcIi4vc3Vic1wiO1xuaW1wb3J0IHsgc3ViVGl0bGVUeXBlIH0gZnJvbSBcInN1YnRpdGxlXCI7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgcmV3aW5kVGltZSA9IDUwMDBcblxuY2xhc3MgVmlkZW8ge1xuICBzdGF0aWMgZ2V0Q3VycmVudFRpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2aWRlby5jdXJyZW50VGltZSAqIDEwMDApXG4gIH1cblxuICBzdGF0aWMgbW92ZVRvUHJldlN1Yih2aWRlbzogSFRNTFZpZGVvRWxlbWVudCwgc3Viczogc3ViVGl0bGVUeXBlW10sIHN1YnNQcm9ncmVzc0JhckVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IGN1cnJlbnRUaW1lID0gdGhpcy5nZXRDdXJyZW50VGltZSh2aWRlbyk7XG4gICAgbGV0IHByZXZTdWI6IHN1YlRpdGxlVHlwZSA9IFN1YnMuZ2V0UHJldlN1YihzdWJzLCBjdXJyZW50VGltZSk7XG5cbiAgICBpZiAocHJldlN1YiAmJiBjdXJyZW50VGltZSAtIFV0aWxzLmNhc3RTdWJUaW1lKHByZXZTdWIuZW5kKSA8IDUwMDApIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUocHJldlN1Yi5zdGFydCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUoY3VycmVudFRpbWUgLSByZXdpbmRUaW1lKSlcbiAgICB9XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdmlkZW8sIHN1YnMsIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIG1vdmVUb05leHRTdWIodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHN1YnM6IHN1YlRpdGxlVHlwZVtdLCBzdWJzUHJvZ3Jlc3NCYXJFbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGxldCBjdXJyZW50VGltZSA9IHRoaXMuZ2V0Q3VycmVudFRpbWUodmlkZW8pO1xuICAgIGxldCBuZXh0U3ViOiBzdWJUaXRsZVR5cGUgPSBTdWJzLmdldE5leHRTdWIoc3VicywgY3VycmVudFRpbWUpO1xuXG4gICAgaWYgKG5leHRTdWIgJiYgVXRpbHMuY2FzdFN1YlRpbWUobmV4dFN1Yi5zdGFydCkgLSBjdXJyZW50VGltZSA8IDUwMDApIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUobmV4dFN1Yi5zdGFydCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZVRvVGltZSh2aWRlbywgVXRpbHMuY2FzdFN1YlRpbWUoY3VycmVudFRpbWUgKyByZXdpbmRUaW1lKSlcbiAgICB9XG4gICAgU3Vicy51cGRhdGVTdWJzUHJvZ3Jlc3NCYXIoc3Vic1Byb2dyZXNzQmFyRWxlbWVudCwgdmlkZW8sIHN1YnMsIHRydWUpO1xuICB9XG5cbiAgc3RhdGljIG1vdmVUb1RpbWUodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIHRpbWU6IG51bWJlciB8IHN0cmluZykge1xuXG4gICAgdmlkZW8uY3VycmVudFRpbWUgPSBVdGlscy5jYXN0U3ViVGltZSh0aW1lKSAvIDEwMDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iXSwic291cmNlUm9vdCI6IiJ9