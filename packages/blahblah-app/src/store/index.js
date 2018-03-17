import { createStore, compose, applyMiddleware } from 'redux'
import thuck from 'redux-thunk'
import reducer from '../reducers'

function configureStore(initialState = {}) {
  const enhancer = compose(applyMiddleware(thuck), window.devToolsExtension ? window.devToolsExtension() : f => f)
  return createStore(reducer, initialState, enhancer)
}

export default configureStore
