import EJSElement from './EJSElement'
import EJSList from './EJSList'

window.EJS = {
    EJSElement,
    EJSList
}

window.get = function (query) {
    return new EJSList(document.querySelectorAll(query))
}
