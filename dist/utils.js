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
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is */ "./src/is.js");
/* harmony import */ var _datahub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datahub */ "./src/datahub.js");



let db = (0,_datahub__WEBPACK_IMPORTED_MODULE_2__.createDataHub)()
const GET  = 'GET',
    POST   = 'POST',
    PUT    = 'PUT',
    DELETE = 'DELETE',
    HEAD   = 'HEAD',
    OPTION = 'OPTION',
    PATCH  = 'PATCH'
 
function request({
    url ,
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
        // xhr.setRequestHeader("Accept", "application/json, text/plain, */*")
        if(method === POST || method === PUT || method === PATCH){
            if((0,_is__WEBPACK_IMPORTED_MODULE_1__.isObject)(data)){
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
                xhr.send(JSON.stringify(data))
            }
        } else {
            xhr.send(null)
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return
            if(xhr.status >= 200 && xhr.status < 300){
                let response;
                try {
                    response = JSON.parse(xhr.response)
                } catch (e) {}
                resolve({
                    status: xhr.status,
                    msg: xhr.statusText,
                    data: response
                })
            } else {
                reject(new Error(`oops... someting happened, Fails code ${xhr.status}`))
            }
        }
    })
}


function guardRequest(config) {
    let chains = [request, undefined]
    let promese = Promise.resolve(config)

    ;(db.get('request') || []).forEach( element => {
        chains.unshift(element.resolved, element.rejected)
    })
    ;(db.get('response') || []).forEach( element => {
        chains.push(element.resolved, element.rejected)
    })

    while(chains.length){
        promese = promese.then(chains.shift(), chains.shift())
    }
    return promese
}




/* 请求和相应守卫 */
axios.requestEach = (resolved, rejected) => {
    db.set('request', {resolved, rejected})
}
axios.responseEach = (resolved, rejected) => {
    db.set('response', {resolved, rejected})
}



/* 函数对象添加语法糖 */
[GET, HEAD, DELETE, OPTION, /* 忽略data */ POST, PUT, PATCH ].forEach( method => {
    axios[method.toLowerCase()] = (url, options) => axios({
        ...Object.assign({}, options, {url, method})
    })
})

function axios (config) {
    return guardRequest(config)
}

/***/ }),

/***/ "./src/datahub.js":
/*!************************!*\
  !*** ./src/datahub.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDataHub": () => (/* binding */ createDataHub)
/* harmony export */ });
function createDataHub () {
    return {
        hub: {},
        set(symbol, data) {
            if(!this.hub[symbol]){
                this.hub[symbol] = []
            }
            this.hub[symbol].push(data)
            return this.hub[symbol].length - 1
        },
        get(symbol, id) {
            if(!this.hub[symbol]) return
            if(id == null){
                return this.hub[symbol].filters(Boolean)
            } else {
                return this.hub[symbol][id]
            }
            
        },
        eject(symbol, id) {
            if(!this.hub[symbol]) return
            if(id == null){
                delete this.hub[symbol]
            } else {
                this.hub[symbol][id] = null
            }
        },
        clean() {
            this.hub = {}
        }

    }
}

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

/***/ "./src/eventbus.js":
/*!*************************!*\
  !*** ./src/eventbus.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEventBus": () => (/* binding */ createEventBus)
/* harmony export */ });
function createEventBus() {
    return {
        hub: {},
        emit (symbol, data) {
            if(!this.hub[symbol]) return
            this.hub[symbol].forEach(handler => handler(data));
        },
        on (symbol, handler) {
            if(!this.hub[symbol]){
                this.hub[symbol] = []
            }
            this.hub[symbol].push(handler)
        },
        off (symbol, cancelHandler) {
            if(!this.hub[symbol]) return
            if(!cancelHandler){
                delete this.hub[symbol]
            } else {
                let index = this.hub[symbol].findIndex(handler => cancelHandler === handler)
                if(index > -1) this.hub[symbol].splice(index, 1)
            }
        }

    }
}

/***/ }),

/***/ "./src/is.js":
/*!*******************!*\
  !*** ./src/is.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPlainObject": () => (/* binding */ isPlainObject),
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });

const toString = Object.prototype.toString

function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }
  
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}

function isObject(val) {
    return val !== null && typeof val === 'object';
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
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/is.js");

const replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  }
function encode(str) {
  return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, match => replace[match])
}
function queryString( queryParameters ) {
    if(!(0,_is__WEBPACK_IMPORTED_MODULE_0__.isObject)(queryParameters)) return ''
    return Object.entries(queryParameters)
    .reduce(
        (snippets, [key, val]) => {
          const name = encode(key)
           if(Array.isArray(val)) {
            snippets.push(...val.map(element => `${name}[]=${encode(element)}`))
           } else {
            snippets.push(`${name}=${encode(val)}`)
           }
           return snippets
        }, [])
    .join('&')
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
/* harmony export */   "throttle": () => (/* reexport safe */ _throttle__WEBPACK_IMPORTED_MODULE_5__.throttle),
/* harmony export */   "createEventBus": () => (/* reexport safe */ _eventbus__WEBPACK_IMPORTED_MODULE_6__.createEventBus),
/* harmony export */   "createDataHub": () => (/* reexport safe */ _datahub__WEBPACK_IMPORTED_MODULE_7__.createDataHub),
/* harmony export */   "isPlainObject": () => (/* reexport safe */ _is__WEBPACK_IMPORTED_MODULE_8__.isPlainObject),
/* harmony export */   "isObject": () => (/* reexport safe */ _is__WEBPACK_IMPORTED_MODULE_8__.isObject)
/* harmony export */ });
/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo */ "./src/demo.js");
/* harmony import */ var _deepClone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./deepClone */ "./src/deepClone.js");
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./axios */ "./src/axios.js");
/* harmony import */ var _querystring__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./querystring */ "./src/querystring.js");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./debounce */ "./src/debounce.js");
/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./throttle */ "./src/throttle.js");
/* harmony import */ var _eventbus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eventbus */ "./src/eventbus.js");
/* harmony import */ var _datahub__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./datahub */ "./src/datahub.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./is */ "./src/is.js");









})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=utils.js.map