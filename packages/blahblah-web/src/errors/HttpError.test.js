import HttpError from './HttpError'

describe('HttpError', () => {
  test('Should be matched HttpError with default constructor', () => {
    const httpError = new HttpError()
    expect(httpError instanceof HttpError).toBeTruthy()
    expect(httpError.response.status).toEqual(500)
  })
  test('Should be matched HttpError with message', () => {
    const message = 'Server error'
    const httpError = new HttpError(message)
    expect(httpError.response).toEqual({
      message,
      status: 500,
    })
  })
  test('Should be matched HttpError with message and status', () => {
    const message = 'Bad request'
    const status = 400
    const httpError = new HttpError(message, 400)
    expect(httpError.response).toEqual({
      message,
      status,
    })
  })
})
