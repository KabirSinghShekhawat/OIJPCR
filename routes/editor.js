const express = require('express')
const router = express.Router()
const editorController = require('../controllers/admin/editorController')

router
  .get('/images/:name', editorController.getImageFile)

module.exports = router