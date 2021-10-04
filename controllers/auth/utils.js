const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const generatePasswordHash = async (password) => {
  return await bcrypt.hash(password, 12)
}

const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  )
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)

  const cookieOptions = {
    // 15 minutes
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE * 60 * 1000,
    ),
    httpOnly: true,
  }
  // cookie will be sent only over https in production
  if (process.env.NODE_ENV === 'prod') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  res.status(statusCode).json({
    status: statusCode < 400 ? 'success' : 'error',
    token,
  })
}

module.exports = {
  generatePasswordHash,
  createSendToken,
}