const express = require('express')
const { parse } = require('url')
const next = require('next')
const getRoutes = require('./routes')

const routes = getRoutes()
const port = process.env.PORT || 10000
const app = next({
  dev: process.env.NODE_ENV !== 'production',
})
const requestHandler = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.get('*', (req, res) => {
    const { pathname, query } = parse(req.url, true)
    const route = routes[pathname]
    if (route) {
      return app.render(req, res, route.page, query)
    }
    return requestHandler(req, res)
  })
  server.listen(port, err => {
    if (err) throw err
  })
})
