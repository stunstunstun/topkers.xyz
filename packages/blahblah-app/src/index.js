import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchDevblogPosts, fetchGitHubTrendings, fetchRedditPosts } from './actions/post'
import configureStore from './store/index'
import App from './containers/App'
import './app.css'

const store = configureStore({
  post: {
    devblog: [],
    reddit: [],
    github: [],
  },
})

store.dispatch(fetchDevblogPosts('devblog'))
store.dispatch(fetchGitHubTrendings('github'))
store.dispatch(fetchRedditPosts('reddit'))

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
