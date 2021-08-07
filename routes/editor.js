const express = require('express')
const router = express.Router()
const Editor = require('../controllers/editorController')

router.route('/')
  .get(Editor.getJournals)
  .post(Editor.saveArticle)

router
  .route('/:id')
  .patch(Editor.editArticle)

router
  .delete('/:id/:imageName', Editor.deleteArticle)
  .delete('/:imageName', Editor.deleteImage)

router
  .post('/uploadFile', Editor.uploadImage, Editor.uploadImageFile)

router
  .get('/images/:name', Editor.getImageFile)

// router
//   .post('/fetchUrl', editorJSController.uploadByUrl)

module.exports = router