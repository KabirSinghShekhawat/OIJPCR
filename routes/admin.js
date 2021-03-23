const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/adminController');

/**
 * Routes
 */

router.route('/')
.get(adminController.admin);

// Journals

router.route('/journal')
.get(adminController.addJournal)
.post(adminController.postJournal);

router.route('/journal/:id')
.get(adminController.editJournal)
.put(adminController.putJournal)
.delete(adminController.deleteJournal);

// Podcasts

router.route('/podcast')
.get(adminController.addPodcast)
.post(adminController.postPodcast);

router.route('/podcast/list')
.get(adminController.podcastList);

router.route('/podcast/:id')
.get(adminController.editPodcast)
.put(adminController.putPodcast)
.delete(adminController.deletePodcast);

module.exports = router;