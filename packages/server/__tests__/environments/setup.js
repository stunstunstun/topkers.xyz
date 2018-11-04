module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('It does not make a sense to test in production!')
  }
}
