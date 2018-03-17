import fetch from 'isomorphic-fetch'

const redditEndpoint = 'https://www.reddit.com/r/programming/top/.json'

function createQuery(parameters) {
  return Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`)
    .join('&')
}

function request(endpoint, options) {
  const { method } = options
  let url = endpoint
  if (method === 'GET') {
    url = url.concat('?').concat(createQuery(Object.assign({}, options.body)))
    delete options.body
  }
  return fetch(url, options)
    .then(response => {
      const body = response.json()
      if (response.status >= 400) {
        throw new Error(`HTTP reponse is not OK. ${response.status} ${url} ${JSON.stringify(body, null, 2)}`)
      }
      return body
    })
}

export default async function reddit(options) {
  const body = await request(redditEndpoint, options)
  return body.data.children
}
