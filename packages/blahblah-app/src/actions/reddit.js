import reddit from 'blahblah-integration'

const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts(limit, t) {
  return {
    type: REQUEST_POSTS,
    limit,
    t,
  }
}

function receivePosts(limit, t, posts) {
  return {
    type: RECEIVE_POSTS,
    limit,
    t,
    posts: posts.map(child => child.data),
    receivedAt: Date.now(),
  }
}

function fetchPosts(limit, t) {
  return async dispatch => {
    const options = {
      method: 'GET',
      body: {
        limit,
        t,
      },
    }
    dispatch(requestPosts(limit, t))
    const posts = await reddit(options)
    dispatch(receivePosts(limit, t, posts))
  }
}

export {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  fetchPosts,
}
