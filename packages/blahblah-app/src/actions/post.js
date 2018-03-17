import { reddit, devblog } from 'blahblah-integration'

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

function fetchRedditPosts(source) {
  return async dispatch => {
    const options = {
      method: 'GET',
      body: {
        limit: 10,
        t: source,
      },
    }
    dispatch(requestPosts(source))
    const posts = await reddit(options)
    dispatch(receivePosts(source, posts))
  }
}

function fetchDevblogPosts() {
  return async dispatch => {
    const source = 'devblog'
    const options = {
      method: 'GET',
    }
    dispatch(requestPosts(source))
    const posts = await devblog(options)
    dispatch(receivePosts(source, posts))
  }
}

export {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  fetchRedditPosts,
  fetchDevblogPosts,
}
