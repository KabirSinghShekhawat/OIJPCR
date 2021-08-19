const express = require('express');
const router = express.Router({mergeParams: true});
const adminController = require('../controllers/adminController');
const authController = require('../controllers/auth/authController');
const volumeRoute = require('./Admin/volume')
const editorRoute = require('./Admin/editor')
/**
 * Routes
 */
router.use('/volume', volumeRoute)
router.use('/editor', editorRoute)

// deprecated
router.route('/')
.get(authController.isLoggedIn, adminController.admin);

router.route('/login')
.get(authController.loginPage)
.post(authController.login)

router.route('/register')
.get(authController.registerPage)
.post(authController.register)

router.route('/logout')
.post(authController.logout)

// Journals

router.route('/journal')
.get(authController.isLoggedIn, adminController.addJournal)
.post(authController.isLoggedIn, adminController.postJournal)

router.route('/journal/:id')
.get(authController.isLoggedIn, adminController.editJournal)
.put(authController.isLoggedIn, adminController.putJournal)
.delete(authController.isLoggedIn, adminController.deleteJournal)


module.exports = router;