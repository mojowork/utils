(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/axios.js":
/*!**********************!*\
  !*** ./src/axios.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "axios": () => (/* binding */ axios)
/* harmony export */ });
/* harmony import */ var _querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./querystring */ "./src/querystring.js");

const GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'

function axios({
    url,
    method = GET,
    params = {},
    data   = {}
}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase()
        if(Object.keys(params).length){
            let querystring = (0,_querystring__WEBPACK_IMPORTED_MODULE_0__.queryString)(params)
            url = ~url.indexOf('?') ? `${url}&${querystring.substring(1)}` : `${url}${querystring}`
        }
        
        const xhr = new XMLHttpRequest()
        // xhrReq.open(method, url, async, user, password);
        xhr.open(method, url, true)
        if(method === POST || method === PUT || method === DELETE){
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send(null)
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return
            if(xhr.status >= 200 && xhr.status <= 299){
                let response
                try {
                    response = JSON.parse(xhr.response)
                } catch (error) {
                    response = xhr.response
                }
                resolve({
                    status: xhr.status,
                    msg: xhr.statusText,
                    data: response
                })
            } else {
                reject(new Error(`oops... someting happened`))
            }
        }
    })
}

axios.get = (url, options) => axios({
    ...Object.assign({}, options, {url, method: GET})
})
axios.post = (url, options) => axios({
    ...Object.assign({}, options, {url, method: POST})
})
axios.put = (url, options) => axios({
    ...Object.assign({}, options, {url, method: PUT})
})
axios.delete = (url, options) => axios({
    ...Object.assign({}, options, {url, method: DELETE})
})

/***/ }),

/***/ "./src/debounce.js":
/*!*************************!*\
  !*** ./src/debounce.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debounce": () => (/* binding */ debounce)
/* harmony export */ });
function debounce (fn, ms) {
    let timer = null
    return function(...arg) {
        clearTimeout(timer) 
        timer = setTimeout(() => fn.apply(this, arg), ms)
    }
}

/***/ }),

/***/ "./src/deepClone.js":
/*!**************************!*\
  !*** ./src/deepClone.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deepClone": () => (/* binding */ deepClone)
/* harmony export */ });
function deepClone(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }
    let clone = Object.assign({}, target) // [1, 2 , 3] => {1:1, 2:2, 3: 3}
    Object.keys(clone).forEach(key => {
        clone[key] = deepClone(target[key])
    })
    if(Array.isArray(target)){
        clone.length = target.length
        clone = Array.from(clone)
    }
    return clone
}

/***/ }),

/***/ "./src/demo.js":
/*!*********************!*\
  !*** ./src/demo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "demo": () => (/* binding */ demo)
/* harmony export */ });
function demo() {
    console.log('demo')
}

/***/ }),

/***/ "./src/querystring.js":
/*!****************************!*\
  !*** ./src/querystring.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "queryString": () => (/* binding */ queryString)
/* harmony export */ });
function queryString( queryParameters ) {
    return queryParameters
      ? Object.entries(queryParameters).reduce(
          (queryString, [key, val]) => {
            const symbol = queryString.length === 0 ? '?' : '&'
            queryString +=
              typeof val !== 'object' ? `${symbol}${key}=${val}` : ''
            return queryString
          },
          ''
        )
      : ''
  }

/***/ }),

/***/ "./src/throttle.js":
/*!*************************!*\
  !*** ./src/throttle.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throttle": () => (/* binding */ throttle)
/* harmony export */ });
function throttle(fn, ms) {
    let startTime = Date.now()
    return function(...arg) {
        if(Date.now() - startTime >= ms) {
            startTime = Date.now()
            return fn.apply(this, arg)
        }
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "demo": () => (/* reexport safe */ _demo__WEBPACK_IMPORTED_MODULE_0__.demo),
/* harmony export */   "deepClone": () => (/* reexport safe */ _deepClone__WEBPACK_IMPORTED_MODULE_1__.deepClone),
/* harmony export */   "axios": () => (/* reexport safe */ _axios__WEBPACK_IMPORTED_MODULE_2__.axios),
/* harmony export */   "queryString": () => (/* reexport safe */ _querystring__WEBPACK_IMPORTED_MODULE_3__.queryString),
/* harmony export */   "debounce": () => (/* reexport safe */ _debounce__WEBPACK_IMPORTED_MODULE_4__.debounce),
/* harmony export */   "throttle": () => (/* reexport safe */ _throttle__WEBPACK_IMPORTED_MODULE_5__.throttle)
/* harmony export */ });
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo */ "./src/demo.js");
/* harmony import */ var _deepClone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepClone */ "./src/deepClone.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./axios */ "./src/axios.js");
/* harmony import */ var _querystring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./querystring */ "./src/querystring.js");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debounce */ "./src/debounce.js");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./throttle */ "./src/throttle.js");






})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=utils.js.map