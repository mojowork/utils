export function throttle(fn, ms) {
    let startTime = Date.now()
    return function(...arg) {
        if(Date.now() - startTime >= ms) {
            startTime = Date.now()
            return fn.apply(this, arg)
        }
    }
}