const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});
const homeController = require('../controllers/homeController');


router.get('/', homeController.homepage);
router.get('/api', homeController.apiData);
router.post('/uploadFile', upload.single('image'), homeController.uploadImageFile);
router.get('/uploads/:name', homeController.getImageFile);
router.post('/fetchUrl', homeController.uploadByUrl);

module.exports = router;