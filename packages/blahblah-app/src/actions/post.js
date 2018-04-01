import axios from 'axios'

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

function fetchGitHubTrendings(source) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await axios.get('/api/providers/github/posts')
    dispatch(receivePosts(source, posts))
  }
}

function fetchRedditPosts(source) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await axios.get('/api/providers/reddit/posts')
    dispatch(receivePosts(source, posts))
  }
}

function fetchDevblogPosts(source) {
  return async dispatch => {
    dispatch(requestPosts(source))
    const posts = await axios.get('/api/providers/devlog/posts')
    dispatch(receivePosts(source, posts))
  }
}

export {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  fetchGitHubTrendings,
  fetchRedditPosts,
  fetchDevblogPosts,
}
