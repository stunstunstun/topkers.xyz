import path from 'path'
import fetch from 'isomorphic-fetch'
import convert from 'xml-to-json-promise'
import Post from './Post'
import feeds from './feeds'

const redditEndpoint = 'https://www.reddit.com/r/programming/top/.json'
// const devblogEndpoint = 'https://awesome-devblog.herokuapp.com/feeds/domestic'
// const awesomeblogEndpoint = 'https://awesome-blogs.petabytes.org/feeds'

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
      if (response.status >= 400) {
        throw new Error(`HTTP reponse is not OK. ${response.status} ${url}`)
      }
      return response
    })
}

export async function reddit(options) {
  const response = await request(redditEndpoint, options)
  const body = await response.json()
  return body
    .data
    .children.map(item => {
      const post = item.data
      return new Post(post.id, post.title, post.url, post.domain, post.author)
    })
}

export async function devblog() {
  return feeds
    .map(item => new Post(item.author, item.title, item.link, item.description, item.author))
}

export async function awesomeblog() {
  const response = await convert.xmlFileToJSON(path.join(__dirname, '/', 'feeds.xml'))
  const body = response.feed.entry
  return body
    .map(item => {
      const { id, title, author } = item
      return new Post(id[0], title[0], id[0], author[0].name[0], author[0].name[0])
    })
}

export default Post
