const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const generatePasswordHash = async (password) => {
  return await bcrypt.hash(password, 12)
}


signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  )
}

module.exports = {
  generatePasswordHash,
  signToken,
}