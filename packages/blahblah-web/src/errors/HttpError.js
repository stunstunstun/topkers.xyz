export default class HttpError extends Error {
  constructor(message, status = 500) {
    super(message)
    this.message = message
    this.status = status
  }
  get response() {
    return {
      message: this.message,
      status: this.status,
    }
  }
}
