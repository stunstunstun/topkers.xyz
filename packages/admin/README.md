## SSR with server be generated automatically

## Automatic code splitting

Next.js의 Automatic code splitting은 SSR와 함께 사용되면 매우 강력합니다. 이후에 설명할 server에서 동작하게 되는 `getInitialProps`를 사용할 때 이전 경험만 있어도 안전하다는 생각이 듭니다. 예를 들어 React Component에서 mongodb에 쿼리를 직접 호출해 데이터를 가져올 수 있다는 것을 상상이나 해보셨나요?

```javascript
import cowsay from 'cowsay-browser'

export default () => (
  <pre>
    {cowsay.say({ text: 'hi there!' })}
  </pre>
)
```

## Easy to export static resources

## CSS-in-JS

```
$ yarn add styled-components
$ yarn add babel-plugin-styled-components --dev
```

`.babelrc`
```javascript
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    "styled-components"
  ]
}
```

## Custom `<Document>`

```javascript
// pages/_document.js
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  render () {
    return (
      <html>
        <Head>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

## Fetch data

```javascript
$ yarn add isomorphic-unfetch
```

`getInitialProps` static function is awesome!

```javascript
// index.js
import React from 'react'
import PropTypes from 'prop-types'
import 'isomorphic-unfetch'

class App extends React.Component {
  static propTypes = {
    stars: PropTypes.number.isRequired,
  }

  static async getInitialProps () {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    <>
      <h1>Next.js has {this.props.stars} ⭐️</h1>
      <Link prefetch href='/about'><a>About</a></Link>
    </>      
  }
}
```
> Note: use <Link prefetch> for maximum performance, to link and prefetch in the background at the same time

## File-System Routing

```javascript
// pages/about.js
import React from 'react'

const About = () => <p>Welcome to About!</p>

export default About
```
