import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="navigation">
          <a className="navigation-logo">
            <img src="images/logo.png" alt="logo" />
          </a>
          <div className="navigation-links">
            <a className="navigation-link">
              <i className="fa fa-compass" />
            </a>
            <a className="navigation-link">
              <i className="fa fa-heart-o" />
            </a>
            <a className="navigation-link">
              <i className="fa fa-user-o" />
            </a>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
