import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="navigation">
          <a href="/" className="navigation-logo">
            <img src="images/logo.jpg" alt="logo" />
          </a>
          <div className="navigation-links">
            <a href="/" className="navigation-link">
              <i className="fa fa-compass" />
            </a>
            <a href="/" className="navigation-link">
              <i className="fa fa-heart-o" />
            </a>
            <a href="/" className="navigation-link">
              <i className="fa fa-user-o" />
            </a>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
