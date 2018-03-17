const REQUEST_POSTS = 'REQUEST_POSTS'
const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts(sub, limit, category) {
  return {
    type: REQUEST_POSTS,
    sub: sub,
    limit: limit,
    category: category,
  }
}

function receivePosts(sub, limit, category, json) {
  return {
    type: RECEIVE_POSTS,
    sub: sub,
    limit: limit,
    category: category,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  }
}

function fetchPosts(sub, limit, category) {
  return async dispatch => {
    dispatch(requestPosts(sub, limit, category))
    const response = await fetch(`https://www.reddit.com/r/${sub}/top/.json?limit=${limit}&t=${category}`)
    const json = await response.json()
    dispatch(receivePosts(sub, limit, category, json))
  }
}

export { REQUEST_POSTS, RECEIVE_POSTS, fetchPosts }
