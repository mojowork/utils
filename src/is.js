
const toString = Object.prototype.toString

export function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }
  
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}

export function isObject(val) {
    return val !== null && typeof val === 'object';
  }