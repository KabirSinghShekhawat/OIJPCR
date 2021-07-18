const express = require('express')
const router = express.Router()
const editorJSController = require('../controllers/editorJSController')

router.route('/')
  .get(editorJSController.getJournals)
  .post(editorJSController.saveArticle)

router
  .route('/:id')
  .patch(editorJSController.editArticle)
  .delete(editorJSController.deleteArticle)

router.post('/uploadFile', editorJSController.uploadImage, editorJSController.uploadImageFile)

router.get('/images/:name', editorJSController.getImageFile)
router.post('/fetchUrl', editorJSController.uploadByUrl)

module.exports = router