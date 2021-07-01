const bcrypt = require('bcrypt')
const User = require('./../../models/user')
require('dotenv').config()
const css = 'auth.css'

exports.isLoggedIn = (req, res, next) => {
  try {
    console.log(`Session Set`)
    if (!req.session.user_id)
      return res.redirect('/admin/login')
    return next()
  } catch (err) {
    req.flash('error', 'Not logged in')
    res.status(500).send('Login Failed')
  }
}

exports.loginPage = (req, res) => {
  const options = {
    title: 'Login',
    css: css,
  }
  res.render('auth/login', options)
}

exports.registerPage = (req, res) => {
  const options = {
    title: 'Register',
    css: css,
  }
  res.render('auth/register', options)
}

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    if (!isValidUser(username, password)) {
      req.flash('error', 'Invalid Credentials')
      return res.redirect('/admin/login')
    }

    if (!(await searchUser(username, password, req))) {
      req.flash('error', 'Invalid Credentials')
      return res.redirect('/admin/login')
    }

    req.flash('success', 'Successfully Logged In')
    res.redirect('/admin')
  } catch (err) {
    req.flash('error', 'Login Failed')
    res.redirect('/admin/login')
    throw new Error('Login Error ' + err.message)
  }
}

exports.logout = (req, res) => {
  req.session.user_id = null
  res.redirect('/admin/login')
}

exports.register = async (req, res) => {
  const { username, password, key } = req.body

  if (key !== process.env.SECRET) {
    req.flash('error', 'Incorrect Credentials')
    return res.redirect('/admin/register')
  }

  try {
    if (!isValidUser(username, password))
      return res.redirect('/admin/register')

    if ((await searchUser(username, password, req, res))) {
      req.flash('error', 'User already exists')
      console.log(`error: 'User Already Exists'`)
      return res.redirect('/admin/register')
    }

    await createUser(username, password, req, res)

    return res.redirect('/admin')
  } catch (err) {
    res.redirect('/admin/register')
    throw new Error('Could not Register ' + err.message)
  }
}

const createUser = async (username, password, req, res) => {
  try {
    const hash = await generatePasswordHash(password)
    const newUser = {
      username: username,
      password: hash,
    }
    const user = new User(newUser)
    await user.save()
    req.session.user_id = user._id
  } catch (err) {
    res.status(500).send('Error creating user')
    throw new Error('Error in Password Generation ' + err.message)
  }
}

const searchUser = async (username, password, req) => {
  try {
    // TODO: sanitize username
    const user = await User.findOne({ username })
    if (typeof user == 'undefined' || user == null) return false
    if (!(user.username && user.password)) return false

    const match = await bcrypt.compare(password, user.password)
    if (!match) return false

    req.session.user_id = user._id
    return true
  } catch (err) {
    throw new Error('Search User: ' + err.message)
  }
}

const isValidUser = (username, password) => {
  const usernameValid = typeof username !== 'undefined' && username
  const passwordValid = typeof password !== 'undefined' && password

  return passwordValid && usernameValid
}

const generatePasswordHash = async (password) => {
  return await bcrypt.hash(password, 10)
}