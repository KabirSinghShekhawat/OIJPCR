const express = require('express')
const router = express.Router()
const editorController = require('../controllers/admin/editorController')

// router.route('/')
//   .get(editorController.getJournals)

router
  .get('/images/:name', editorController.getImageFile)

// router
//   .post('/fetchUrl', editorController.uploadByUrl)

module.exports = router