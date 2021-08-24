const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')

const {
        generatePasswordHash,
        signToken,
      } = require('./utils')

require('dotenv').config()

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) token = req.headers.authorization.split(' ')[1]

  if (!token)
    return next(new AppError('Please log in to access this resource', 401))

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)

  if (!currentUser)
    return next(new AppError('This token is no longer valid', 401))

  req.user = currentUser
  return next()
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body

  if (!(username && password))
    return next(new AppError('Please provide username and password', 400))

  const user = await User.findOne({ username }).select('+password')

  if (
    !user ||
    !(await user.matchPassword(password, user.password))
  ) return next(new AppError('Incorrect username or password', 401))

  const token = signToken(user._id)

  req.user = user

  res.status(200).json({
    status: 'success',
    token,
  })
})

exports.logout = (req, res) => {
  req.user = null
  return res.status(200).json({
    status: 'success',
    isAdmin: false,
  })
}

exports.register = catchAsync(async (req, res, next) => {
  const { username, password, key } = req.body

  if (!key || key !== process.env.SECRET)
    return next(new AppError('Incorrect Key', 401))

  if (!(username && password))
    return next(new AppError('Please provide valid username and password', 400))

  const newUser = await createNewUser(username, password)

  if (!newUser)
    return next(new AppError('Could not create user: ' + username, 500))

  const token = signToken(newUser._id)

  res.status(201).json({
      status: 'success',
      msg: `User created successfully: ${username}`,
      isAdmin: true,
      token,
    },
  )
})

exports.deleteUser = catchAsync(async (req, res, next) => {
  if(!req.user)
    return next(new AppError('You need to be logged-in to do that', 401))

  const { _id: id } = req.user
  await User.findByIdAndDelete(id)
  res.status(204).json({ status: 'success' })
})

async function createNewUser (username, password) {
  const hash = await generatePasswordHash(password)
  const newUser = {
    username: username,
    password: hash,
  }

  const user = new User(newUser)
  await user.save()
  return user
}

