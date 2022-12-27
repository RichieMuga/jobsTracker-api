const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statuscode: err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong '
  }
  if (err && err.code === 11000) {
    customError.msg = `Duplicate email entered for ${Object.keys(err.keyValue)} please choose another value`
    customError.statuscode = 400
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map((item) => item.message).join(', ')
    customError.statuscode = 400
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'CastError') {
    customError.msg = `Id not found, with the value ${err.value}`
    customError.statuscode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statuscode).json(customError.msg)

}

module.exports = errorHandlerMiddleware
