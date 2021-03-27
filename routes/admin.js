const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController');
const authController = require('./../controllers/authController');
/**
 * Routes
 */

router.route('/')
.get(adminController.admin);

router.route('/login')
.get(authController.loginPage)
.post(authController.login)

router.route('/register')
.get(authController.registerPage)
.post(authController.register)

// Journals

router.route('/journal')
.get(adminController.addJournal)
.post(adminController.postJournal)

router.route('/journal/:id')
.get(adminController.editJournal)
.put(adminController.putJournal)
.delete(adminController.deleteJournal)

// Podcasts

router.route('/podcast')
.get(adminController.addPodcast)
.post(adminController.postPodcast)

router.route('/podcast/list')
.get(adminController.podcastList)

router.route('/podcast/:id')
.get(adminController.editPodcast)
.put(adminController.putPodcast)
.delete(adminController.deletePodcast)

module.exports = router;