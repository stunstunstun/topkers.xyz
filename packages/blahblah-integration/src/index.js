import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
import moment from 'moment'
import config from 'blahblah-config'
import Post from './Post'

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
        throw new Error(`HTTP/1.1 ${response.status} ${method} ${url}`)
      }
      return response
    })
}

export async function reddit(options) {
  const response = await request(config.api.reddits, options)
  const body = await response.json()
  return body.data
    .children.map(item => {
      const post = item.data
      return new Post(post.id, post.title, post.url, post.domain, post.author)
    })
}

export async function gitHubRepo(languages) {
  const aMonthAgo = moment().subtract(30, 'days').format('YYYY-MM-DD')
  const options = {
    method: 'GET',
    body: {
      q: `language:${languages}+created:%3E${aMonthAgo}`,
      sort: 'stars',
      order: 'desc',
    },
  }
  const response = await request(config.api.githubRepos, options)
  const body = await response.json()
  return body.items
    .map(item => new Post(
      item.id,
      item.full_name,
      item.html_url,
      item.language,
      `🤩 ${item.stargazers_count}`,
    ))
}

export async function githubTrending() {
  const options = {
    method: 'GET',
    body: {
      since: 'weekly',
    },
  }
  const response = await request(config.api.githubTrends, options)
  const body = await response.text()
  const $ = cheerio.load(body)
  const repos = $('li', '.explore-content ol.repo-list')
  return repos.map((index, repo) => {
    const repoNode = $(repo)
    const name = repoNode.find('h3 a').text().trim()
    const desc = repoNode.find('.py-1 p').text().trim()
    const stars = repoNode.find('a svg.octicon-star').parent().text()
      .replace('Star', '🤩')
      .replace(/\n/g, '')
      .trim()
    const url = `https://github.com${repoNode.find('h3 a').attr('href')}`
    return new Post(name, name, url, desc, stars)
  }).get()
}

export async function devblog(start, end) {
  const options = {
    method: 'GET',
  }
  const response = await request(config.api.blogs, options)
  const res = await response.json()
  return res
    .slice(start, end)
    .map(item => new Post(item.author, item.title, item.link, item.description, item.author))
}

export default Post
