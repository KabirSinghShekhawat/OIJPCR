const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
  const message = `Duplicate field value: ${value}. Please use another value.`
  return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message)
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

const handleJWTError = err =>
  new AppError(`Invalid Token: ${err.message}`, 401)

const handleJWTExpiredError = err =>
  new AppError(`Token Expired: ${err.message}`, 401)

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err, res) => {
  /* Operational error is trusted, send error message to client */
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    })
  }
  /* unknown error, send a very generic error message */
  // log error
  console.error('Error 💥', err)
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong.',
  })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'dev') {
    return sendErrorDev(err, res)
  }

  if (process.env.NODE_ENV === 'prod') {
    let error = { ...err }

    if (error.name === 'CastError')
      error = handleCastErrorDB(error)

    if (error.code === 11000)
      error = handleDuplicateFieldsDB(error)

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error)

    if (error.name === 'JsonWebTokenError')
      error = handleJWTError(error)

    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error)

    return sendErrorProd(error, res)
  }

  next()
}