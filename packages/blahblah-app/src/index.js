import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchPosts } from './actions/reddit'
import configureStore from './store/index'
import App from './containers/App'
import './app.css'

const limit = 10
const store = configureStore({
  reddit: {
    today: [],
    week: [],
    month: [],
  },
})

store.dispatch(fetchPosts(limit, 'today'))
store.dispatch(fetchPosts(limit, 'week'))
store.dispatch(fetchPosts(limit, 'month'))

const render = () => {
  const rootElement = document.getElementById('root')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement,
  )
}

store.subscribe(render)
