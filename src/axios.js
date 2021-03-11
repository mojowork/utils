import { queryString as qs} from './querystring'
import { isObject } from './is'
import { createDataHub } from './datahub'
let db = createDataHub()
const GET  = 'GET',
    POST   = 'POST',
    PUT    = 'PUT',
    DELETE = 'DELETE',
    HEAD   = 'HEAD',
    OPTION = 'OPTION',
    PATCH  = 'PATCH'
 
function request({
    url ,
    method = GET,
    params = {},
    data   = {}
}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase()
        if(Object.keys(params).length){
            let querystring = qs(params)
            const symbol = ~url.indexOf('?') ? '&' : '?'
            url = `${url}${symbol}${querystring}`
        }
        
        const xhr = new XMLHttpRequest()
        // xhrReq.open(method, url, async, user, password);
        xhr.open(method, url, true)
        // xhr.setRequestHeader("Accept", "application/json, text/plain, */*")
        if(method === POST || method === PUT || method === PATCH){
            if(isObject(data)){
                xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
                xhr.send(JSON.stringify(data))
            }
        } else {
            xhr.send(null)
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return
            if(xhr.status >= 200 && xhr.status < 300){
                let response;
                try {
                    response = JSON.parse(xhr.response)
                } catch (e) {}
                resolve({
                    status: xhr.status,
                    msg: xhr.statusText,
                    data: response
                })
            } else {
                reject(new Error(`oops... someting happened, Fails code ${xhr.status}`))
            }
        }
    })
}


function guardRequest(config) {
    let chains = [request, undefined]
    let promese = Promise.resolve(config)

    ;(db.get('request') || []).forEach( element => {
        chains.unshift(element.resolved, element.rejected)
    })
    ;(db.get('response') || []).forEach( element => {
        chains.push(element.resolved, element.rejected)
    })

    while(chains.length){
        promese = promese.then(chains.shift(), chains.shift())
    }
    return promese
}




/* 请求和相应守卫 */
axios.requestEach = (resolved, rejected) => {
    db.set('request', {resolved, rejected})
}
axios.responseEach = (resolved, rejected) => {
    db.set('response', {resolved, rejected})
}



/* 函数对象添加语法糖 */
[GET, HEAD, DELETE, OPTION, /* 忽略data */ POST, PUT, PATCH ].forEach( method => {
    axios[method.toLowerCase()] = (url, options) => axios({
        ...Object.assign({}, options, {url, method})
    })
})

export function axios (config) {
    return guardRequest(config)
}