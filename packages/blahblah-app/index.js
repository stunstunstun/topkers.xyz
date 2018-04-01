import path from 'path'
import { createServer } from 'http'
import Koa from 'koa'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import koaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import routes, { clientErrorHandler, errorHandler, notFoundHandler, HttpError } from 'blahblah-web'

const zlib = require('zlib')

const app = new Koa()
app
  .use(serve(path.join(process.cwd(), 'build')))
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
server.listen(10080)
