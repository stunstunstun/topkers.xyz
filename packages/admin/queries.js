import { gql } from 'apollo-boost'

export const ME = gql`
  query {
    me {
      id
      token
      userInfo
    }
  }
`
