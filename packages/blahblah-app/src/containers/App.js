import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

class App extends React.Component {
  render() {
    return (
      <div className="wrap">
        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}

export default App
