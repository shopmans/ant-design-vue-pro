import jsonp from 'fetch-jsonp'
import querystring from 'querystring'

let timeout
let currentValue

export function fetch (value, callback, url) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    currentValue = value

    function fake () {
      const str = querystring.encode({
        code: 'utf-8',
        q: value
      })
      jsonp(url + `?${str}`)
        .then(response => response.json())
        .then(d => {
          if (currentValue === value) {
            const result = d.result
            if (result === undefined) {
              return
            }
            const data = []
            result.forEach(r => {
              data.push({
                value: r[1],
                text: r[0]
              })
            })
            callback(data)
          }
        })
    }

    timeout = setTimeout(fake, 300)
}
