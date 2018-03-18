import { gitHubRepo, githubTrending, reddit, devblog } from 'blahblah-integration'

const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts(source) {
  return {
    type: REQUEST_POSTS,
    source,
  }
}

function receivePosts(source, posts) {
  return {
    type: RECEIVE_POSTS,
    source,
    posts,
    receivedAt: Date.now(),
  }
}

function fetchGitHubRepos(source, language) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await gitHubRepo(language)
    dispatch(receivePosts(source, posts))
  }
}

function fetchGitHubTrendings(source) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await githubTrending()
    dispatch(receivePosts(source, posts))
  }
}

function fetchRedditPosts(source) {
  return async dispatch => {
    const options = {
      method: 'GET',
      body: {
        limit: 25,
        t: 'week',
      },
    }
    dispatch(requestPosts(source))
    const posts = await reddit(options)
    dispatch(receivePosts(source, posts))
  }
}

function fetchDevblogPosts(source, start, end) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await devblog(start, end)
    dispatch(receivePosts(source, posts))
  }
}

export {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  fetchGitHubRepos,
  fetchGitHubTrendings,
  fetchRedditPosts,
  fetchDevblogPosts,
}
