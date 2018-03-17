import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/post'

function post(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        source: action.source,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        source: action.source,
        [action.source]: action.posts,
      }
    default:
      return state
  }
}

export default post
