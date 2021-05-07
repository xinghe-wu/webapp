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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 481);
/******/ })
/************************************************************************/
/******/ ({

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_css_sm_min_css__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_assets_css_sm_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_assets_css_sm_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_public_public__ = __webpack_require__(458);



window.apiready = function () {
    var header = document.getElementById('header');
    var content = document.getElementById('content');
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_public_public__["a" /* fixStatusBar */])(header);
    var data = api.pageParam;
    var url = data.url;
    var title = data.title;
    document.getElementById('title').innerHTML = title;
    var pageload = 0;
    if (api.systemType == "ios") {
        api.openFrame({
            name: 'frame',
            url: url,
            rect: {
                x: 0,
                y: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_public_public__["b" /* getHeight */])('header'),
                w: 'auto',
                h: 'auto'
            },
            pageParam: data,
            bounces: false,
            vScrollBarEnabled: true,
            hScrollBarEnabled: true
        });
    } else {
        //viewappear事件在ios中首次打开不会调用，在安卓使用以避免切换时加载frame造成卡顿。
        api.addEventListener({
            name: 'viewappear'
        }, function (ret, err) {
            if (pageload < 1) {
                api.openFrame({
                    name: 'frame',
                    url: url,
                    rect: {
                        x: 0,
                        y: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_public_public__["b" /* getHeight */])('header'),
                        w: 'auto',
                        h: 'auto'
                    },
                    pageParam: data,
                    bounces: false,
                    vScrollBarEnabled: true,
                    hScrollBarEnabled: true
                });
            }
            pageload++;
        });
    }

    document.getElementById('back').addEventListener('tap', function () {
        api.closeWin();
    });
};

/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//常量
const HOST = "https://d.apicloud.com/";
/* unused harmony export HOST */

const ANI = {
    type: "movein",
    subType: "from_right",
    duration: 200
};
/* unused harmony export ANI */

const version = 1;
/* unused harmony export version */


//公共函数
const fixIos7Bar = function (t) {
    var e = api.systemType;
    if ("ios" == e) {
        var a = api.systemVersion,
            n = parseInt(a, 10),
            i = api.fullScreen,
            o = api.iOS7StatusBarAppearance;
        n >= 7 && !i && o && (t.style.paddingTop = "1rem", t.style.height = "3.2rem");
    }
};
/* unused harmony export fixIos7Bar */


const fixStatusBar = function (t) {
    var e = api.systemType;
    if ("ios" == e) fixIos7Bar(t);else if ("android" == e) {
        var a = api.systemVersion;
        a = parseFloat(a), a >= 4.4 && (t.style.paddingTop = "1.36rem", t.style.height = "3.56rem", t.style.lineHeight = "2.2rem");
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = fixStatusBar;


const fixContent = function (t) {
    var e = api.systemType;
    if ("ios" == e) t.style.top = "3.2rem";else if ("android" == e) {
        var a = api.systemVersion;
        a = parseFloat(a), a >= 4.4 && (t.style.top = "3.56rem");
    }
};
/* unused harmony export fixContent */


const getHeight = function (id) {
    return document.getElementById(id).offsetHeight;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getHeight;


const showLoading = function (state) {
    if (state == "on") {
        api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: '',
            text: "稍等一下哦…",
            modal: true
        });
    } else {
        api.hideProgress();
    }
};
/* unused harmony export showLoading */


/***/ }),

/***/ 464:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(457);


/***/ })

/******/ });
//# sourceMappingURL=win.js.map