import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { fetchRedditPosts } from './actions/post'
import configureStore from './store/index'
import App from './containers/App'
import './app.css'

const store = configureStore({
  post: {
    today: [],
    week: [],
    month: [],
  },
})

store.dispatch(fetchRedditPosts('today'))
store.dispatch(fetchRedditPosts('week'))
store.dispatch(fetchRedditPosts('month'))

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
