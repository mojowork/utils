export function debounce (fn, ms) {
    let timer = null
    return function(...arg) {
        clearTimeout(timer) 
        timer = setTimeout(() => fn.apply(this, arg), ms)
    }
}