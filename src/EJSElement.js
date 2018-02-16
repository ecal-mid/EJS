// Class-list polyfill
require('classlist-polyfill')
import EJSList from './EJSList'

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

export default class EJSElement {

    constructor (elem) {
        if (elem instanceof HTMLElement) {
            Object.defineProperty(this, 'elem', {
                get() {
                    return elem
                }
            })
            for(const attr of elem.attributes) {
                if (attr.name !== 'class' && attr.name !== 'id' && attr.name !== 'length') {
                    Object.defineProperty(this, attr.name, {
                        get() {
                            return window.get(attr.value)
                        }
                    })
                }
            }
        }
    }

    get(query) {
        try {
            return new EJSList(this.elem.querySelectorAll(query))
        } catch (e) {
            console.error(e)
        }
    }

    addClass (className) {
        try {
            this.elem.classList.add(className)
        } catch (e) {
            console.error(e)
        }
        return this
    }

    removeClass(className) {
        try {
            this.elem.classList.remove(className)
        } catch (e) {
            console.error(e)
        }
        return this
    }

    toggleClass(className) {
        try {
            this.elem.classList.toggle(className)
        } catch (e) {
            console.error(e)
        }
        return this
    }

    setStyle(css) {
        if (css instanceof Object) {
            for (const prop in css) {
                try {
                    this.elem.style[prop] = css[prop] + ''
                } catch (e) {
                    console.error(e)
                }
            }
        } else {
            console.error('The style is not an object')
        }
        return this
    }

    on(event, fn) {
        try {
            addEvent(this.elem, event, fn.bind(this))
        } catch (e) {
            console.error(e)
        }
        return this
    }

    off(event, fn) {
        try {
            removeEvent({
                elem: this.elem,
                event: event,
                handler: fn
            })
        } catch (e) {
            console.error(e)
        }
        return this
    }
}