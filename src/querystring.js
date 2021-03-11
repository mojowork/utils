import { isObject } from './is'
const replace = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  }
function encode(str) {
  return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, match => replace[match])
}
export function queryString( queryParameters ) {
    if(!isObject(queryParameters)) return ''
    return Object.entries(queryParameters)
    .reduce(
        (snippets, [key, val]) => {
          const name = encode(key)
           if(Array.isArray(val)) {
            snippets.push(...val.map(element => `${name}[]=${encode(element)}`))
           } else {
            snippets.push(`${name}=${encode(val)}`)
           }
           return snippets
        }, [])
    .join('&')
  }