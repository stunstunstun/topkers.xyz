import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchGitHubRepos, fetchRedditPosts, fetchDevblogPosts } from './actions/post'
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

const languages = ['javascript', 'java', 'python', 'swift']
const start = Math.floor(Math.random() * Math.floor(20))
const langIndex = Math.floor(Math.random() * Math.floor(4))
store.dispatch(fetchDevblogPosts('devblog', start, start + 25))
store.dispatch(fetchGitHubRepos('github', languages[langIndex]))
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
