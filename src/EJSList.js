import EJSElement from './EJSElement'

// Only way I found to extends built-in array
const EJSList = function(list){
    const targets = {}
    for (let i = 0; i < list.length; i ++) {
        this.add(new EJSElement(list[i]))
        for (const attr of list[i].attributes) {
            if (attr.name !== 'class' && attr.name !== 'id' && attr.name !== 'length') {
                if (!targets[attr.name]) targets[attr.name] = []
                for (const value of attr.value.split(',')) {
                    if (targets[attr.name].indexOf(value.trim()) === -1) {
                        targets[attr.name].push(value.trim())
                    }
                }
            }
        }
    }
    for (const target in targets) {
        Object.defineProperty(this, target, {
            get() {
                return window.get(targets[target].join(','))
            }
        })
    }
}
EJSList.prototype = new Array()

EJSList.prototype.add = function (value) {
    if (value instanceof EJSElement) {
        this.push(value)
    } else {
        console.error('Value is not an EJSElement')
    }

    return this
}

EJSList.prototype.forEach = function (fn) {
    for(let i = 0; i < this.length; i ++) {
        try {
            fn(this[i], i)
        } catch (e) {
            console.error(e)
        }
    }
    return this
}

EJSList.prototype.addClass = function (className) {
    this.forEach(elem => {
        elem.addClass(className)
    })
    return this
}

EJSList.prototype.removeClass = function (className) {
    this.forEach(elem => {
        elem.removeClass(className)
    })
    return this
}

EJSList.prototype.toggleClass = function (className) {
    this.forEach(elem => {
        elem.toggleClass(className)
    })
    return this
}

EJSList.prototype.setStyle = function (style) {
    this.forEach(elem => {
        elem.setStyle(style)
    })
    return this
}

EJSList.prototype.on = function (event, fn) {
    this.forEach(elem => {
        elem.on(event, fn)
    })
    return this
}

export default EJSList
