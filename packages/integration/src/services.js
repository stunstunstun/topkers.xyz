const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')
const moment = require('moment')
const Post = require('./Post')
const config = require('./config')

function createQuery(parameters) {
  return Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`)
    .join('&')
}

function request(endpoint, options) {
  const { method } = options
  let url = endpoint
  if (!['POST', 'PATCH', 'PUT'].includes(method)) {
    url = url.concat('?').concat(createQuery(Object.assign({}, options.params)))
    delete options.params
  }
  return fetch(url, options).then(response => {
    if (response.status >= 400) {
      throw new Error(`HTTP/1.1 ${response.status} ${method} ${url}`)
    }
    return response
  })
}

async function reddit(options) {
  const response = await request(config.api.reddit, options)
  const body = await response.json()
  return body.data.children.map(item => {
    const post = item.data
    return new Post(post.id, post.title, post.url, post.domain, post.author)
  })
}

async function githubRepos({ language, days = 30 }) {
  const daysAgo = moment()
    .subtract(days, 'days')
    .format('YYYY-MM-DD')
  const options = {
    method: 'GET',
    params: {
      q: `language:${language}+created:%3E${daysAgo}`,
      sort: 'stars',
      order: 'desc',
    },
  }
  const { repos } = config.api.github
  const response = await request(repos, options)
  const body = await response.json()
  return body.items.map(item => new Post(item.id, item.full_name, item.html_url, item.language, `🤩 ${item.stargazers_count}`))
}

async function githubTrending({ since = 'monthly' }) {
  const options = {
    method: 'GET',
    body: {
      since,
    },
  }
  const { trending } = config.api.github
  const response = await request(trending, options)
  const body = await response.text()
  const $ = cheerio.load(body)
  const repos = $('li', '.explore-content ol.repo-list')
  return repos
    .map((index, repo) => {
      const repoNode = $(repo)
      const name = repoNode
        .find('h3 a')
        .text()
        .trim()
      const desc = repoNode
        .find('.py-1 p')
        .text()
        .trim()
      const stars = repoNode
        .find('a svg.octicon-star')
        .parent()
        .text()
        .replace('Star', '🤩')
        .replace(/\n/g, '')
        .trim()
      const url = `https://github.com${repoNode.find('h3 a').attr('href')}`
      return new Post(name, name, url, desc, stars)
    })
    .get()
}

async function devblogs({ category, page = 0, size = 10 }) {
  const options = {
    method: 'GET',
    params: {
      page,
      size,
    },
  }
  const { personal, team } = config.api.devblogs
  const response = await request(category === 'team' ? team : personal, options)
  const res = await response.json()
  return res.map(item => new Post(item.author, item.title, item.link, item.description, item.author))
}

module.exports = {
  reddit,
  githubRepos,
  githubTrending,
  devblogs,
}
