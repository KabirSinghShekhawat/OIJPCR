const bcrypt = require('bcrypt');
const User = require('./../../models/user')

const css = 'app.min.css'

exports.isLoggedIn = (req, res, next) => {
    try {
        console.log(`Session Set`)
        if (!req.session.user_id)
            res.redirect('/admin/login')
        return next()
    } catch (err) {
        console.log('is Logged In')
    }
}

exports.loginPage = (req, res) => {
    const options = {
        title: 'Login',
        css: css
    }
    res.render('auth/login', options)
}

exports.registerPage = (req, res) => {
    const options = {
        title: 'Register',
        css: css
    }
    res.render('auth/register', options)
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!isValidUser(username, password))
            res.redirect('/admin/login')

        if (!(await validCredentials(username, password, req)))
            res.redirect('/admin/login')

        res.redirect('/admin')
    } catch (err) {
        res.redirect('/admin/login')
        throw new Error('Login Error ' + err.message)
    }
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!isValidUser(username, password))
            res.redirect('/admin/register')

        await createUser(username, password, req)
        res.redirect('/admin')
    } catch (err) {
        res.redirect('/admin/register')
        throw new Error('Could not Register ' + err.message)
    }
}

const createUser = async (username, password, req) => {
    try {
        const hash = await generatePasswordHash(password)
        const newUser = {
            username: username,
            password: hash
        }
        const user = new User(newUser)
        await user.save()
        req.session.user_id = user._id
    } catch (err) {
        throw new Error('Error in Password Generation ' + err.message)
    }
}

const searchUser = async (username, password, req) => {
    try {
        const user = await User.findOne({ username })
        if (!(user?.username && user?.password)) return false

        const match = await bcrypt.compare(password, user.password)
        if (!match) return false

        req.session.user_id = user._id
        return true
    } catch (err) {
        throw new Error('Search User: ' + err.message)
    }
}

const validCredentials = async (username, password, req) => {
    try {
        const userFound = await searchUser(username, password, req)
        if (!userFound) return false
        return true
    } catch (err) {
        throw new Error(`valid credentials function: \n ${err.message}`)
    }
}

const isValidUser = (username, password) => {
    const usernameValid = typeof username !== 'undefined' && username
    const passwordValid = typeof password !== 'undefined' && password

    if (!usernameValid || !passwordValid)
        return false
    return true
}

const generatePasswordHash = async (password) => {
    const hash = await bcrypt.hash(password, 10)
    return hash
}