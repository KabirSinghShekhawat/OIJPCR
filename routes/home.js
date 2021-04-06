const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/', homeController.homepage);
router.get('/api', homeController.apiData);

module.exports = router;