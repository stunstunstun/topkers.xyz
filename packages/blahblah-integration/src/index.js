import fetch from 'isomorphic-fetch'
import Post from './Post'

const redditEndpoint = 'https://www.reddit.com/r/programming/top/.json'
const devblogEndpoint = 'https://awesome-devblog.herokuapp.com/feeds/domestic'

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

export async function reddit(options) {
  const body = await request(redditEndpoint, options)
  return body
    .data
    .children.map(item => {
      const post = item.data
      return new Post(post.id, post.title, post.url, post.domain, post.author)
    })
}

export async function devblog(options) {
  const body = await request(devblogEndpoint, options)
  return body
    .map(item => new Post(item.author, item.title, item.link, item.description, item.author))
}

export default Post
