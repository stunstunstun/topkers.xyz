import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Provider } from './context'
import { ME } from '../queries'

class MeQuery extends Query {}

const withSession = props => {
  const { children, isLoggedIn } = props
  return (
    <MeQuery query={ME} skip={!isLoggedIn}>
      {({ data }) => <Provider value={{ session: data }}>{children}</Provider>}
    </MeQuery>
  )
}

withSession.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default withSession
