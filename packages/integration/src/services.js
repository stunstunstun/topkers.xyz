const fetch = require('isomorphic-fetch')
const cheerio = require('cheerio')
const moment = require('moment')
const { SOURCE } = require('@githubjobs/domain')
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

async function reddit({ since = 'week', size }) {
  const options = {
    method: 'GET',
    params: {
      t: since,
      limit: size,
    },
  }
  const response = await request(config.api.reddit, options)
  const body = await response.json()
  return body.data.children.map(item => {
    const post = item.data
    const { id, title, url, domain, name, thumbnail } = post
    return new Post({
      id,
      source: SOURCE.REDDIT,
      title,
      desc: domain,
      link: url,
      author: name,
      avatar: thumbnail,
    })
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
  return body.items.map(item => {
    const { id, name, html_url, language, stargazers_count, owner } = item
    return new Post({
      id,
      source: SOURCE.GITHUB_REPOS,
      title: `${name}`,
      desc: `${language}  ⭐  ${stargazers_count}`,
      link: html_url,
      author: owner.login,
      avatar: owner.avatar_url,
    })
  })
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
        .replace('Star', '⭐')
        .replace(/\r\n/g, '')
        .replace(/\n/g, '')
        .trim()
      const url = `https://github.com${repoNode.find('h3 a').attr('href')}`
      return new Post({
        id: `${new Date().getTime()}${index}`,
        source: SOURCE.GITHUB_TRENDING,
        title: `${name} ${stars}`,
        desc,
        link: url,
      })
    })
    .get()
}

async function devblogs({ source, page = 0, size = 10 }) {
  const options = {
    method: 'GET',
    params: {
      page,
      size,
    },
  }
  const { personal, team } = config.api.devblogs
  const response = await request(source === SOURCE.DEVBLOGS_PERSONAL ? personal : team, options)
  const res = await response.json()
  return res.map(item => {
    const { _id, title, link, description, author, imgUrl } = item
    return new Post({
      id: _id,
      source,
      title,
      desc: description,
      link,
      author,
      avatar: imgUrl,
    })
  })
}

module.exports = {
  reddit,
  githubRepos,
  githubTrending,
  devblogs,
}
