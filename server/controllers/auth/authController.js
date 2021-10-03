const User = require('../../models/user')
const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')
const {
        isValidUser,
        generatePasswordHash,
        searchUser,
        authMessage,
      } = require('./utils')

require('dotenv').config()

exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({
      msg: 'Unauthorized access',
    })
  }

  console.log(`Session Set: ${req.session.user_id}`)
  return next()
}

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body

  if (!isValidUser(username, password)) {
    return res.status(401).json(
      authMessage(`Invalid credentials\n User: ${username}`)
    )
  }

  if (!(await searchUser(username, password, req))) {
    return res.status(401)
      .json(authMessage(`Invalid credentials\n User: ${username}`))
  }

  res.status(200).json(authMessage(
      'Logged in Successfully',
      true,
    ),
  )
})


exports.logout = (req, res) => {
  req.session.user_id = null
  res.status(200).json(
    authMessage('Logged out successfully')
  )
}


exports.register = catchAsync(async (req, res, next) => {
  const { username, password, key } = req.body

  if (key !== process.env.SECRET) {
    return res.status(401).json(
      authMessage(
        'Invalid username or password',
        false,
      ),
    )
  }

  if (!isValidUser(username, password))
    return res.redirect('/admin/register')

  if ((await searchUser(username, password, req, res))) {
    return res.status(409).json(
      authMessage(
        `User already exists: ${username}`,
        false,
      ),
    )
  }

  const user = await createUser(username, password, req)

  if (!user)
    return next(new AppError('Could not create user', 500))

  res.status(201).json(
    authMessage(
      `User created successfully: ${username}`,
      true,
    ),
  )
})

async function  createUser (username, password, req) {
  const hash = await generatePasswordHash(password)
  const newUser = {
    username: username,
    password: hash,
  }

  const user = new User(newUser)
  await user.save()
  if (!user) return

  req.session.user_id = user._id
  return user
}

