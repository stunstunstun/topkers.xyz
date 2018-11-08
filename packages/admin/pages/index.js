import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import 'isomorphic-unfetch'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`
class App extends React.Component {
  static propTypes = {
    stars: PropTypes.number.isRequired,
    userAgent: PropTypes.string.isRequired,
  }

  static async getInitialProps({ req }) {
    const { headers } = req
    const userAgent = headers['user-agent']
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const { stargazers_count } = await res.json()
    return { stars: stargazers_count, userAgent }
  }

  render() {
    return (
      <>
        <Title>Next.js has {this.props.stars} ⭐️</Title>
        Click{' '}
        <Link prefetch href="/about">
          <a>About</a>
        </Link>{' '}
        To read more
        <p>{this.props.userAgent}</p>
      </>
    )
  }
}

export default App
