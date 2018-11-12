import { gql } from 'apollo-boost'

export const SIGN_UP = gql`
  mutation signup($code: String) {
    signup(type: GITHUB, code: $code) {
      id
      token
      userInfo
    }
  }
`
