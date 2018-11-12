import React from 'react'
import { ApolloProvider } from 'react-apollo'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { withApollo } from '../libs'
import { Header, Footer } from '../components'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    let isLoggedIn = false
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const cookies = parseCookies(ctx)
    if (cookies['X-JWT'] !== null && cookies['X-JWT'] !== undefined) {
      isLoggedIn = true
    }
    return { pageProps, isLoggedIn }
  }

  render() {
    const { Component, pageProps, apollo, isLoggedIn } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Head>
            <title>GitHub Jobs Korea</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <header>
            <Header />
          </header>
          <main>
            <Component {...pageProps} isLoggedIn={isLoggedIn} />
          </main>
          <footer>
            <Footer />
          </footer>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
