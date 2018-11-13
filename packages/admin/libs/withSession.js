import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Provider } from './context'
import { ME } from '../queries'

const withSession = props => {
  const { children, isLoggedIn } = props
  return (
    <Query query={ME} skip={!isLoggedIn}>
      {({ data }) => <Provider value={{ session: data }}>{children}</Provider>}
    </Query>
  )
}

withSession.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default withSession
