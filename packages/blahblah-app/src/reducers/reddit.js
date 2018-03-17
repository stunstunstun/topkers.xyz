import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/reddit'

function reddit(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        limit: action.limit,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        limit: action.limit,
        [action.t]: action.posts,
      }
    default:
      return state
  }
}

export default reddit
