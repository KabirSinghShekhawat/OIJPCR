const express = require('express')
const router = express.Router()
const authorController = require('../../controllers/admin/authorController')

router.route('/:id')
  .get(authorController.getAuthor)

router.route('/')
  .post(authorController.saveAuthor)

// router
//   .route('/:id')
//   .patch(editorController.editArticle)
//
// router
//   .delete('/:id/:imageName', editorController.deleteArticle)
//   .delete('/:imageName', editorController.deleteImage)
//
// router
//   .post('/uploadFile', editorController.uploadImage, editorController.uploadImageFile)
//
// router
//   .get('/images/:name', editorController.getImageFile)


module.exports = router