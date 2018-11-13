import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import Cookie from 'js-cookie'
import { COOKIE_NAME, GRAPHQL_ENDPOINT } from '../configs'

export default withApollo(() => {
  const token = Cookie.get(COOKIE_NAME)
  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  })
})
