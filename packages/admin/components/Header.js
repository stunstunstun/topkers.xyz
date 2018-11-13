import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../libs/context'
import { CLIENT_ID, HOME } from '../configs'

class Header extends React.Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <Consumer>
        {({ session }) => {
          if (!isLoggedIn) {
            const OAuthUri = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${CLIENT_ID}&redirect_uri=${HOME}`
            return <a href={OAuthUri}>Login with GitHub</a>
          }
          return session && session.me && <div>Hello! {session.me.userInfo.name}</div>
        }}
      </Consumer>
    )
  }
}

export default Header
