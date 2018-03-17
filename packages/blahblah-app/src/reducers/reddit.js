import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/reddit'

function reddit(state, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        sub: action.sub,
        limit: action.limit,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        sub: action.sub,
        limit: action.limit,
        [action.category]: action.posts,
      }
    default:
      return state
  }
}

export default reddit
