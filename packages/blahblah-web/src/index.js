import combineRouters from 'koa-combine-routers'
import HttpError from './errors/HttpError'
import logger from './logger'
import apps from './apps'
import posts from './apps/posts'
import { clientErrorHandler, errorHandler, notFoundHandler } from './errors'

const routes = combineRouters([apps, posts])

export { routes as default, clientErrorHandler, errorHandler, logger, notFoundHandler, HttpError }
