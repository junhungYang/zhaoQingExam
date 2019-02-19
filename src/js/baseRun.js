
/**
 * ClassList
 * */
HTMLCollection.prototype.forEach = function (cb) {  // 给html元素集对象添加forEach遍历方法
    [].slice.call(this).forEach(cb)
}
window.hasClass = function (el, cls) {
    if (typeof document.body.classList != 'undefined') {
        window.hasClass = function (el, cls) {
            return el.classList.contains(cls)
        }
        window.addClass = function (el, cls) {
            if (el instanceof  HTMLCollection) {
                el.forEach(function (e) {
                    e.classList.add(cls)
                })
                return
            }
            el.classList.add(cls)
        }
        window.removeClass = function (el, cls) {
            if (el instanceof  HTMLCollection) {
                el.forEach(function (e) {
                    e.classList.remove(cls)
                })
                return
            }
            el.classList.remove(cls)
        }
        window.toggleClass = function (el, cls) {
            if (el instanceof  HTMLCollection) {
                el.forEach(function (e) {
                    e.classList.toggle(cls)
                })
                return
            }
            el.classList.toggle(cls)
        }
    } else {
        window.hasClass = function () {
            return new RegExp('\\b'+cls+'\\b').test(el.className)
        }
    }
    return hasClass(el, cls)
}
window.addClass = function (el, cls) {
    if (el instanceof  HTMLCollection) {
        el.forEach(function (e) {
            addClass(e, cls)
        })
        return
    }
    el.className = el.className ? !hasClass(el, cls) ? (el.className + ' ' + cls) : el.className : cls
}
window.removeClass = function (el, cls) {
    if (el instanceof  HTMLCollection) {
        el.forEach(function (e) {
            removeClass(e, cls)
        })
        return
    }
    el.className = hasClass(el, cls) ? el.className.replace(new RegExp('\\b'+cls+'\\b'),'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ') : el.className
}
window.toggleClass = function (el, cls) {
    if (el instanceof  HTMLCollection) {
        el.forEach(function (e) {
            toggleClass(e, cls)
        })
        return
    }
    hasClass(el, cls) ? removeClass(el, cls) : addClass(el, cls)
}
