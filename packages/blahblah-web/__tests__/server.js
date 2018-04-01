import { createServer } from 'http'
import Koa from 'koa'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import koaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import config from 'blahblah-config'
import routes from '../src'
import { clientErrorHandler, errorHandler, notFoundHandler } from '../src/errors'
import HttpError from '../src/errors/HttpError'

const zlib = require('zlib')

const app = new Koa()
app
  .use(koaLogger())
  .use(
    compress({
      threshold: 2048,
      flush: zlib.Z_SYNC_FLUSH,
    }),
  )
  .use(helmet())
  .use(errorHandler)
  .use(clientErrorHandler)
  .use(
    bodyParser({
      onerror: err => {
        throw new HttpError(err.message, 400)
      },
    }),
  )

app.use(routes)
app.use(notFoundHandler)

const server = createServer(app.callback())
server.listen(config.port)

export default server