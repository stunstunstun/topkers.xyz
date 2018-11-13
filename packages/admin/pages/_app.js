import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Cookie from 'js-cookie'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { withApollo, withSession as WithSession } from '../libs'
import { Header, Footer } from '../components'
import { COOKIE_NAME, DOMAIN } from '../configs'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    let isLoggedIn = false
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const cookies = parseCookies(ctx)
    if (cookies[COOKIE_NAME] !== null && cookies[COOKIE_NAME] !== undefined) {
      isLoggedIn = true
    }
    return { pageProps, isLoggedIn }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: props.isLoggedIn,
    }
  }

  onLogin = data => {
    const { token } = data.signup
    Cookie.set(COOKIE_NAME, token, { domain: DOMAIN })
    this.setState({
      isLoggedIn: true,
    })
  }

  render() {
    const { Component, pageProps, apollo } = this.props
    const { isLoggedIn } = this.state
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Head>
            <title>GitHub Jobs Korea</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <WithSession isLoggedIn={isLoggedIn}>
            <header>
              <Header isLoggedIn={isLoggedIn} />
            </header>
            <main>
              <Component {...pageProps} isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
            </main>
            <footer>
              <Footer />
            </footer>
          </WithSession>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
