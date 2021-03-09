import { queryString as qs} from './querystring'
const GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'

export function axios({
    url,
    method = GET,
    params = {},
    data   = {}
}) {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase()
        if(Object.keys(params).length){
            let querystring = qs(params)
            url = ~url.indexOf('?') ? `${url}&${querystring.substring(1)}` : `${url}${querystring}`
        }
        
        const xhr = new XMLHttpRequest()
        // xhrReq.open(method, url, async, user, password);
        xhr.open(method, url, true)
        if(method === POST || method === PUT || method === DELETE){
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send(null)
        }
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return
            if(xhr.status >= 200 && xhr.status <= 299){
                let response
                try {
                    response = JSON.parse(xhr.response)
                } catch (error) {
                    response = xhr.response
                }
                resolve({
                    status: xhr.status,
                    msg: xhr.statusText,
                    data: response
                })
            } else {
                reject(new Error(`oops... someting happened`))
            }
        }
    })
}

axios.get = (url, options) => axios({
    ...Object.assign({}, options, {url, method: GET})
})
axios.post = (url, options) => axios({
    ...Object.assign({}, options, {url, method: POST})
})
axios.put = (url, options) => axios({
    ...Object.assign({}, options, {url, method: PUT})
})
axios.delete = (url, options) => axios({
    ...Object.assign({}, options, {url, method: DELETE})
})