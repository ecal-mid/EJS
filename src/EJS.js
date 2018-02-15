// Class-list polyfill
require('classlist-polyfill')

// Add event cross browser
function addEvent(elem, event, fn) {
    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions
    function listenHandler(e) {
        var ret = fn.apply(this, arguments)
        if (ret === false) {
            e.stopPropagation()
            e.preventDefault()
        }
        return(ret)
    }

    function attachHandler() {
        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too
        var ret = fn.call(elem, window.event)   
        if (ret === false) {
            window.event.returnValue = false
            window.event.cancelBubble = true
        }
        return(ret)
    }

    if (elem.addEventListener) {
        elem.addEventListener(event, listenHandler, false)
        return {elem: elem, handler: listenHandler, event: event}
    } else {
        elem.attachEvent('on' + event, attachHandler)
        return {elem: elem, handler: attachHandler, event: event}
    }
}

function removeEvent(token) {
    if (token.elem.removeEventListener) {
        token.elem.removeEventListener(token.event, token.handler)
    } else {
        token.elem.detachEvent('on' + token.event, token.handler)
    }
}

// Global functions
window.get = function (className) {
    try {
        return document.querySelectorAll(className)
    } catch (e) {
        console.error(e)
    }
}

// HTMLElements prototypes
// QuerySelector with the current element as a parent
HTMLElement.prototype.get = function (query) {
    try {
        return this.querySelectorAll(query)
    } catch (e) {
        console.error(e)
    }
}

// Check if that element contains a certain class
HTMLElement.prototype.contains = function (className) {
    try {
        this.classList.contains(className)
    } catch (e) {
        console.error(e)
    }
    return this
}

// Add a certain class to the current element
HTMLElement.prototype.addClass = function (className) {
    try {
        this.classList.add(className)
    } catch (e) {
        console.error(e)
    }
    return this
}

// Remove a certain class to the current element
HTMLElement.prototype.removeClass = function (className) {
    try {
        this.classList.remove(className)
    } catch (e) {
        console.error(e)
    }
    return this
}

// Toggle a class on the current element
HTMLElement.prototype.toggleClass = function (className) {
    try {
        this.classList.toggle(className)
    } catch (e) {
        console.error(e)
    }
    return this
}

// Add an event on the current element
HTMLElement.prototype.on = function (event, fn) {
    try  {
        addEvent(this, event, fn)
    } catch (e) {
        console.error(e)
    }
    return this
}

// Remove an event on the current element
HTMLElement.prototype.off = function (event, fn) {
    try  {
        removeEvent({
            elem: this,
            event: event,
            handler: fn
        })
    } catch (e) {
        console.error(e)
    }
    return this
}

// Get all attributes on the current element
HTMLElement.prototype.getAttributes = function () {
    return this.attributes
}

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
    set: function (css) {
        for (const prop in css) {
            this.style[prop] = css[prop] + ''
        }
    }
})

// Array & NodeList prototypes

Array.prototype.forEach = function (fn) {
    if (fn instanceof Function) {
        for (let i = 0; i < this.length; i ++) {
            fn(this[i], i)
        }
    } else {
        console.error('fn is not a function')
    }
    return this
}

NodeList.prototype.forEach = function (fn) {
    if (fn instanceof Function) {
        for (let i = 0; i < this.length; i ++) {
            fn(this[i], i)
        }
    } else {
        console.error('fn is not a function')
    }
    return this
}

NodeList.prototype.addClass = function (className) {
    if (typeof className == 'string') {
        for (let i = 0; i < this.length; i++) {
            this[i].addClass(className)
        }
    } else {
        console.error(`${className} is not a valid query!`)
    }
    return this
}

NodeList.prototype.removeClass = function (className) {
    if (typeof className == 'string') {
        for (let i = 0; i < this.length; i++) {
            this[i].removeClass(className)
        }
    } else {
        console.error(`${className} is not a valid query!`)
    }
    return this
}

NodeList.prototype.on = function (event, handler) {
    this.forEach(function (element) {
        element.on(event, handler)
    })
    return this
}

NodeList.prototype.off = function (event, handler) {
    this.forEach(function (element) {
        element.off(event, handler)
    })
    return this
}

NodeList.prototype.toggleClass = function (className) {
    this.forEach(function (element) {
        element.toggleClass(className)
    })
    return this
}

window.onload = function () {
    window.get('body *').forEach(function (elem) {
        for (const attrib of elem.attributes) {
            Object.defineProperty(elem, attrib.name, {
                get: function () {
                    return this.get(attrib.value)
                }
            })
        }
    })
}

// Object.defineProperty()
