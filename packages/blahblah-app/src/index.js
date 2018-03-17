import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchRedditPosts, fetchDevblogPosts } from './actions/post'
import configureStore from './store/index'
import App from './containers/App'
import './app.css'

const store = configureStore({
  post: {
    reddit: [],
    devblog: [],
    awesomeblog: [],
  },
})

store.dispatch(fetchRedditPosts('reddit'))
store.dispatch(fetchDevblogPosts('devblog', 0, 10))
store.dispatch(fetchDevblogPosts('awesomeblog', 10, 20))

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
