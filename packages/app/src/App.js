import React, { Component } from 'react'
import logo from './logo.svg'
import styles from './App.module.scss'

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.Header}>
          <img src={logo} className={styles.Logo} alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className={styles.Link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
