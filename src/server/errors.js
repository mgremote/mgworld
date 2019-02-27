const { log } = require('./log')
const { inherits } = require('util')

function HttpError (message, status = 500) {
  this.name = this.constructor.name
  this.status = status
  this.message = message
  Error.captureStackTrace(this, this.constructor)
}
inherits(HttpError, Error)

function handleApiError (err, req, res, next) {
  log.error('An api error occurred: %s', err.stack)
  const status = err instanceof HttpError ? err.status : 500
  const message = err instanceof HttpError
    ? err.message : 'Internal Server Error'
  res.status(status).json({ error: message })
}

function handleViewError (err, req, res, next) {
  log.error('A view error occurred: %s', err.stack)
  res.status(500).send('An unexpected error has occurred')
}

module.exports = { handleApiError, handleViewError, HttpError }
