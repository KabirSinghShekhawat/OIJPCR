const express = require('express')
const router = express.Router()
const editorController = require('../controllers/editorController')

router.route('/')
  .get(editorController.getJournals)
  .post(editorController.saveArticle)

router
  .route('/:id')
  .patch(editorController.editArticle)

router
  .delete('/:id/:imageName', editorController.deleteArticle)
  .delete('/:imageName', editorController.deleteImage)

router
  .post('/uploadFile', editorController.uploadImage, editorController.uploadImageFile)

router
  .get('/images/:name', editorController.getImageFile)

// router
//   .post('/fetchUrl', editorController.uploadByUrl)

module.exports = router