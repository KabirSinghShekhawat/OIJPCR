const express = require('express')
const router = express.Router({ mergeParams: true })
const authController = require('../controllers/auth/authController')
const volumeRoute = require('./Admin/volume')
const editorRoute = require('./Admin/editor')

router.use('/volume', authController.isLoggedIn, volumeRoute)
router.use('/editor', authController.isLoggedIn, editorRoute)

router.route('/login')
  .post(authController.login)

router.route('/signup')
  .post(authController.signup)

router.route('/logout')
  .get(authController.logout)

router.route('/user')
  .delete(authController.isLoggedIn, authController.deleteUser)

module.exports = router