const bcrypt = require('bcrypt');
const User = require('./../models/user')

const css = 'app.min.css'

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
    const {username, password} = req.body
    try {
        if(!isValidUser(username, password))
            res.redirect('/admin/login')
        if(!(await validCredentials(username, password)))
            res.redirect('/admin/login')
        res.redirect('/admin')
    } catch (err) {
        res.redirect('/admin/login')
        throw new Error(err.message)
    }
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!isValidUser(username, password))
            res.redirect('/admin/register')
        await createUser(username, password)
        res.redirect('/admin')
    } catch (err) {
        res.redirect('/admin/register')
        throw new Error(err.message)
    }
}

const createUser = async (username, password) => {
    try {
        const hash = await generatePasswordHash(password)
        const newUser = {
            username: username,
            password: hash
        }
        const user = new User(newUser)
        await user.save()
    } catch (err) {
        console.log('Error in Password Generation')
    }
}

const searchUser = async (username, password) => {
    try {
        const user = await User.findOne({username})
        if(!isValidUser(user.username, user.password))
            return false

        const match = await bcrypt.compare(password, user.password)

        if(!match)
            return false

        return true
    } catch (err) {
        throw new Error(err.message)
    }
}

const validCredentials = async (username, password) => {
    const userFound = await searchUser(username, password)    
    if(!userFound)
        return false
    return true
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