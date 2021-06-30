const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const testController = require('../controllers/testController')

router.route('/editorJS')
  .get(testController.getJournals)
  .post(testController.saveArticle)

router.post('/uploadFile', upload.single('image'),
  testController.uploadImageFile)
router.get('/uploads/:name', testController.getImageFile)
router.post('/fetchUrl', testController.uploadByUrl)

router.get('/api', testController.apiData)

module.exports = router