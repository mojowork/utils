export function deepClone(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }
    let clone = Object.assign({}, target) // [1, 2 , 3] => {1:1, 2:2, 3: 3}
    Object.keys(clone).forEach(key => {
        clone[key] = deepClone(target[key])
    })
    if(Array.isArray(target)){
        clone.length = target.length
        clone = Array.from(clone)
    }
    return clone
}