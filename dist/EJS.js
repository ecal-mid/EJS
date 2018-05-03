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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EJSList = __webpack_require__(1);

var _EJSList2 = _interopRequireDefault(_EJSList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Class-list polyfill
__webpack_require__(3);


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

var EJSElement = function () {
    function EJSElement(elem) {
        var _this = this;

        _classCallCheck(this, EJSElement);

        Object.defineProperty(this, 'elem', {
            get: function get() {
                return elem;
            }
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function _loop() {
                var attr = _step.value;

                if (attr.name !== 'class' && attr.name !== 'id' && attr.name !== 'length') {
                    Object.defineProperty(_this, attr.name, {
                        get: function get() {
                            return window.get(attr.value);
                        }
                    });
                }
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
    }

    _createClass(EJSElement, [{
        key: 'get',
        value: function get(query) {
            try {
                return new _EJSList2.default(this.elem.querySelectorAll(query));
            } catch (e) {
                console.error(e);
            }
        }
    }, {
        key: 'addClass',
        value: function addClass(className) {
            try {
                this.elem.classList.add(className);
            } catch (e) {
                console.error(e);
            }
            return this;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(className) {
            try {
                this.elem.classList.remove(className);
            } catch (e) {
                console.error(e);
            }
            return this;
        }
    }, {
        key: 'toggleClass',
        value: function toggleClass(className) {
            try {
                this.elem.classList.toggle(className);
            } catch (e) {
                console.error(e);
            }
            return this;
        }
    }, {
        key: 'setStyle',
        value: function setStyle(css) {
            if (css instanceof Object) {
                for (var prop in css) {
                    try {
                        this.elem.style[prop] = css[prop] + '';
                    } catch (e) {
                        console.error(e);
                    }
                }
            } else {
                console.error('The style is not an object');
            }
            return this;
        }
    }, {
        key: 'on',
        value: function on(event, fn) {
            try {
                addEvent(this.elem, event, fn.bind(this));
            } catch (e) {
                console.error(e);
            }
            return this;
        }
    }, {
        key: 'off',
        value: function off(event, fn) {
            try {
                removeEvent({
                    elem: this.elem,
                    event: event,
                    handler: fn
                });
            } catch (e) {
                console.error(e);
            }
            return this;
        }
    }, {
        key: 'html',
        get: function get() {
            return this.elem.innerHTML;
        },
        set: function set(value) {
            this.elem.innerHTML = value;
        }
    }]);

    return EJSElement;
}();

exports.default = EJSElement;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EJSElement = __webpack_require__(0);

var _EJSElement2 = _interopRequireDefault(_EJSElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Only way I found to extends built-in array
var EJSList = function EJSList(list) {
    var _this = this;

    var targets = {};
    for (var i = 0; i < list.length; i++) {
        this.add(new _EJSElement2.default(list[i]));
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = list[i].attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var attr = _step.value;

                if (attr.name !== 'class' && attr.name !== 'id' && attr.name !== 'length') {
                    if (!targets[attr.name]) targets[attr.name] = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = attr.value.split(',')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var value = _step2.value;

                            if (targets[attr.name].indexOf(value.trim()) === -1) {
                                targets[attr.name].push(value.trim());
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
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
    }

    var _loop = function _loop(target) {
        Object.defineProperty(_this, target, {
            get: function get() {
                return window.get(targets[target].join(','));
            }
        });
    };

    for (var target in targets) {
        _loop(target);
    }
    // HTML ACCESS
};
EJSList.prototype = new Array();

EJSList.prototype.add = function (value) {
    if (value instanceof _EJSElement2.default) {
        this.push(value);
    } else {
        console.error('Value is not an EJSElement');
    }

    return this;
};

EJSList.prototype.forEach = function (fn) {
    for (var i = 0; i < this.length; i++) {
        try {
            fn(this[i], i);
        } catch (e) {
            console.error(e);
        }
    }
    return this;
};

EJSList.prototype.addClass = function (className) {
    this.forEach(function (elem) {
        elem.addClass(className);
    });
    return this;
};

EJSList.prototype.removeClass = function (className) {
    this.forEach(function (elem) {
        elem.removeClass(className);
    });
    return this;
};

EJSList.prototype.toggleClass = function (className) {
    this.forEach(function (elem) {
        elem.toggleClass(className);
    });
    return this;
};

EJSList.prototype.setStyle = function (style) {
    this.forEach(function (elem) {
        elem.setStyle(style);
    });
    return this;
};

EJSList.prototype.on = function (event, fn) {
    this.forEach(function (elem) {
        elem.on(event, fn);
    });
    return this;
};

exports.default = EJSList;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _EJSElement = __webpack_require__(0);

var _EJSElement2 = _interopRequireDefault(_EJSElement);

var _EJSList = __webpack_require__(1);

var _EJSList2 = _interopRequireDefault(_EJSList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.EJS = {
    EJSElement: _EJSElement2.default,
    EJSList: _EJSList2.default
};

window.get = function (query) {
    return new _EJSList2.default(document.querySelectorAll(query));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {

		(function (view) {

			"use strict";

			if (!('Element' in view)) return;

			var classListProp = "classList",
			    protoProp = "prototype",
			    elemCtrProto = view.Element[protoProp],
			    objCtr = Object,
			    strTrim = String[protoProp].trim || function () {
				return this.replace(/^\s+|\s+$/g, "");
			},
			    arrIndexOf = Array[protoProp].indexOf || function (item) {
				var i = 0,
				    len = this.length;
				for (; i < len; i++) {
					if (i in this && this[i] === item) {
						return i;
					}
				}
				return -1;
			}
			// Vendors: please allow content code to instantiate DOMExceptions
			,
			    DOMEx = function DOMEx(type, message) {
				this.name = type;
				this.code = DOMException[type];
				this.message = message;
			},
			    checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
				if (token === "") {
					throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
				}
				if (/\s/.test(token)) {
					throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
				}
				return arrIndexOf.call(classList, token);
			},
			    ClassList = function ClassList(elem) {
				var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
				    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
				    i = 0,
				    len = classes.length;
				for (; i < len; i++) {
					this.push(classes[i]);
				}
				this._updateClassName = function () {
					elem.setAttribute("class", this.toString());
				};
			},
			    classListProto = ClassList[protoProp] = [],
			    classListGetter = function classListGetter() {
				return new ClassList(this);
			};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function (i) {
				return this[i] || null;
			};
			classListProto.contains = function (token) {
				token += "";
				return checkTokenAndGetIndex(this, token) !== -1;
			};
			classListProto.add = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false;
				do {
					token = tokens[i] + "";
					if (checkTokenAndGetIndex(this, token) === -1) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function () {
				var tokens = arguments,
				    i = 0,
				    l = tokens.length,
				    token,
				    updated = false,
				    index;
				do {
					token = tokens[i] + "";
					index = checkTokenAndGetIndex(this, token);
					while (index !== -1) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function (token, force) {
				token += "";

				var result = this.contains(token),
				    method = result ? force !== true && "remove" : force !== false && "add";

				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} else {
					return !result;
				}
			};
			classListProto.toString = function () {
				return this.join(" ");
			};

			if (objCtr.defineProperty) {
				var classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7FF5EC54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(window.self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function () {
		"use strict";

		var testElement = document.createElement("_");

		testElement.classList.add("c1", "c2");

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains("c2")) {
			var createMethod = function createMethod(method) {
				var original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function (token) {
					var i,
					    len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle("c3", false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains("c3")) {
			var _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function (token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} else {
					return _toggle.call(this, token);
				}
			};
		}

		testElement = null;
	})();
}

/***/ })
/******/ ]);