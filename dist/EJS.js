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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Add event cross browser
function addEvent(elem, event, fn) {
    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler(e) {
        var ret = fn.apply(this, arguments);
        if (ret === false) {
            e.stopPropagation();
            e.preventDefault();
        }
        return ret;
    }

    function attachHandler() {
        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too
        var ret = fn.call(elem, window.event);
        if (ret === false) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }
        return ret;
    }

    if (elem.addEventListener) {
        elem.addEventListener(event, listenHandler, false);
        return { elem: elem, handler: listenHandler, event: event };
    } else {
        elem.attachEvent('on' + event, attachHandler);
        return { elem: elem, handler: attachHandler, event: event };
    }
}

function removeEvent(token) {
    if (token.elem.removeEventListener) {
        token.elem.removeEventListener(token.event, token.handler);
    } else {
        token.elem.detachEvent('on' + token.event, token.handler);
    }
}

// Global functions
window.get = function (className) {
    try {
        return document.querySelectorAll(className);
    } catch (e) {
        console.error(e);
    }
};

// HTMLElements prototypes
// QuerySelector with the current element as a parent
HTMLElement.prototype.get = function (query) {
    try {
        return this.querySelectorAll(query);
    } catch (e) {
        console.error(e);
    }
};

// Check if that element contains a certain class
HTMLElement.prototype.contains = function (className) {
    try {
        this.classList.contains(className);
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Add a certain class to the current element
HTMLElement.prototype.addClass = function (className) {
    try {
        this.classList.add(className);
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Remove a certain class to the current element
HTMLElement.prototype.removeClass = function (className) {
    try {
        this.classList.remove(className);
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Toggle a class on the current element
HTMLElement.prototype.toggleClass = function (className) {
    try {
        this.classList.toggle(className);
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Add an event on the current element
HTMLElement.prototype.on = function (event, fn) {
    try {
        addEvent(this, event, fn);
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Remove an event on the current element
HTMLElement.prototype.off = function (event, fn) {
    try {
        removeEvent({
            elem: this,
            event: event,
            handler: fn
        });
    } catch (e) {
        console.error(e);
    }
    return this;
};

// Get all attributes on the current element
HTMLElement.prototype.getAttributes = function () {
    return this.attributes;
};

// Object.defineProperty(HTMLElement.prototype, 'target', {
//     get: function () {
//         if (this.getAttribute('target')) {
//             return window.get(this.getAttribute('target'))
//         } else {
//             console.error('No target is defined!')
//         }
//     }
// })

Object.defineProperty(HTMLElement.prototype, 'css', {
    set: function set(css) {
        for (var prop in css) {
            this.style[prop] = css[prop] + '';
        }
    }
});

// Array & NodeList prototypes

Array.prototype.forEach = function (fn) {
    if (fn instanceof Function) {
        for (var i = 0; i < this.length; i++) {
            fn(this[i], i);
        }
    } else {
        console.error('fn is not a function');
    }
    return this;
};

NodeList.prototype.forEach = function (fn) {
    if (fn instanceof Function) {
        for (var i = 0; i < this.length; i++) {
            fn(this[i], i);
        }
    } else {
        console.error('fn is not a function');
    }
    return this;
};

NodeList.prototype.addClass = function (className) {
    if (typeof className == 'string') {
        for (var i = 0; i < this.length; i++) {
            this[i].addClass(className);
        }
    } else {
        console.error(className + ' is not a valid query!');
    }
    return this;
};

NodeList.prototype.removeClass = function (className) {
    if (typeof className == 'string') {
        for (var i = 0; i < this.length; i++) {
            this[i].removeClass(className);
        }
    } else {
        console.error(className + ' is not a valid query!');
    }
    return this;
};

NodeList.prototype.on = function (event, handler) {
    this.forEach(function (element) {
        element.on(event, handler);
    });
    return this;
};

NodeList.prototype.off = function (event, handler) {
    this.forEach(function (element) {
        element.off(event, handler);
    });
    return this;
};

NodeList.prototype.toggleClass = function (className) {
    this.forEach(function (element) {
        element.toggleClass(className);
    });
    return this;
};

window.onload = function () {
    window.get('body *').forEach(function (elem) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var attrib = _step.value;

                Object.defineProperty(elem, attrib.name, {
                    get: function get() {
                        return this.get(attrib.value);
                    }
                });
            };

            for (var _iterator = elem.attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    });
};

// Object.defineProperty()

/***/ })
/******/ ]);