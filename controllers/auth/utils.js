const bcrypt = require('bcrypt')
const User = require('../../models/user')
const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')

const isValidUser = (username, password) => {
  const usernameValid = typeof username !== 'undefined' && username
  const passwordValid = typeof password !== 'undefined' && password

  return passwordValid && usernameValid
}

const generatePasswordHash = async (password) => {
  return await bcrypt.hash(password, 12)
}

function authMessage (msg = '', isAdmin = false) {
  return {
    msg,
    isAdmin,
  }
}

const searchUser = async (username, password, req) => {
  // TODO: sanitize username
  if (typeof username !== 'string' || !username)
    return false

  const user = await User.findOne({ username })

  // Check if users exists
  if (!user || !(user.username && user.password))
    return false

  // match the password
  const match = await bcrypt.compare(password, user.password)
  if (!match) return false

  // set session to user id if everything matches
  req.session.user_id = user._id
  return true
}

module.exports = {
  isValidUser,
  generatePasswordHash,
  searchUser,
  authMessage,
}