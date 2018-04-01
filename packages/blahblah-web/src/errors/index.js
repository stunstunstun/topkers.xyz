import logger from '../logger'
import HttpError from './HttpError'

export async function clientErrorHandler(ctx, next) {
  if (['POST', 'PATCH', 'PUT'].includes(ctx.request.method) && !ctx.is('json')) {
    throw new HttpError('Unsupported media type', 415)
  }
  await next()
}

export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    let httpError
    if (err instanceof HttpError) {
      httpError = err
    } else if (['ValidationError', 'CastError'].includes(err.name)) {
      httpError = new HttpError(err.message || err.name, 422)
    } else {
      httpError = new HttpError(err.message)
      logger.error(err)
    }
    const { status, message } = httpError.response
    const body = {
      message,
    }
    ctx.status = status
    ctx.body = body
    logger[status === 500 ? 'error' : 'warn'](httpError.message)
  }
}

export async function notFoundHandler(ctx) {
  const msg = `${ctx.request.method} ${ctx.request.path}`
  throw new HttpError(`No endpoint matched your request: ${msg}`, 404)
}