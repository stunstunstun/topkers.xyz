import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <>
        <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=f019324be3bbc0bf8f53&redirect_uri=http://localhost:10000">Login with GitHub</a>
      </>
    )
  }
}

export default Header
