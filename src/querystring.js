export function queryString( queryParameters ) {
    return queryParameters
      ? Object.entries(queryParameters).reduce(
          (queryString, [key, val]) => {
            const symbol = queryString.length === 0 ? '?' : '&'
            queryString +=
              typeof val !== 'object' ? `${symbol}${key}=${val}` : ''
            return queryString
          },
          ''
        )
      : ''
  }